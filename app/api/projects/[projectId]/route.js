import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const project = await db.collection('projects').findOne({
            _id: new ObjectId(id)
        });

        if (!project) {
            return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
        }

        return Response.json(project);
    } catch (error) {
        return Response.json({ error: 'Error al obtener proyecto' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { projectId } = await params;
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const updateData = {
            ...(body.name && { name: body.name }),
            ...(body.requestDate && { requestDate: new Date(body.requestDate) }),
            ...(body.alertDate && { alertDate: new Date(body.alertDate) }),
            ...(body.expirationDate && { expirationDate: new Date(body.expirationDate) }),
            ...(typeof body.isCompleted === 'boolean' && { isCompleted: body.isCompleted }),
            ...(typeof body.isEmailSend === 'boolean' && { isEmailSend: body.isEmailSend }),
            updatedAt: new Date()
        };

        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            console.log({ error: 'Proyecto no encontrado' });
            return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
        }

        return Response.json({ message: 'Proyecto actualizado' });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error al actualizar' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { projectId } = await params;

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            }
        );

        console.log(params);

        if (result.matchedCount === 0) {
            console.log({ error: 'Proyecto no encontrado' });
            return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
        }

        return Response.json({ message: 'Proyecto eliminado (soft)' });
    } catch (error) {
        console.log(error, { status: 500 });
        return Response.json({ error: 'Error al eliminar' }, { status: 500 });
    }
}