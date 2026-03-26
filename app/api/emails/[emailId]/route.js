import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
    try {
        const { emailId } = await params;
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const updateData = {
            ...(body.name && { name: body.name })
        };

        const result = await db.collection('emails').updateOne(
            { _id: new ObjectId(emailId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            console.log({ error: 'Email no encontrado' });
            return Response.json({ error: 'Email no encontrado' }, { status: 404 });
        }

        return Response.json({ message: 'Email actualizado' });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error al actualizar' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { emailId } = await params;

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const result = await db.collection('emails').updateOne(
            { _id: new ObjectId(emailId) },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            console.log({ error: 'Email no encontrado' });
            return Response.json({ error: 'Email no encontrado' }, { status: 404 });
        }

        return Response.json({ message: 'Email eliminado (soft)' });
    } catch (error) {
        console.log(error, { status: 500 });
        return Response.json({ error: 'Error al eliminar' }, { status: 500 });
    }
}