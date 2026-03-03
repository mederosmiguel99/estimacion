import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
    try {
        const { projectId, quotationId } = await params;

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const project = await db.collection('projects').findOne({
            _id: new ObjectId(projectId),
            "quotations._id": new ObjectId(quotationId)
        });

        if (!project) {
            return Response.json({ error: 'Cotización no encontrada' }, { status: 404 });
        }

        const quotation = project.quotations.find(q =>
            q._id.toString() === quotationId
        );

        return Response.json(quotation);
    } catch (error) {
        return Response.json({ error: 'Error al obtener cotización' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { projectId, quotationId } = await params;
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const updateFields = {};

        if (body.name) updateFields["quotations.$.name"] = body.name;
        if (body.price != null) updateFields["quotations.$.price"] = Number(body.price);
        if (typeof body.isReceived === 'boolean') {
            updateFields["quotations.$.isReceived"] = body.isReceived;
            if (body.isReceived) {
                updateFields["quotations.$.responseDate"] = new Date();
            }
        }
        if (typeof body.isSaved === 'boolean') {
            updateFields["quotations.$.isSaved"] = body.isSaved;
        }

        const result = await db.collection('projects').updateOne(
            {
                _id: new ObjectId(projectId),
                "quotations._id": new ObjectId(quotationId)
            },
            {
                $set: updateFields
            }
        );

        if (result.matchedCount === 0) {
            return Response.json({ error: 'Cotización no encontrada' }, { status: 404 });
        }

        return Response.json({ message: 'Cotización actualizada' });
    } catch (error) {
        return Response.json({ error: 'Error al actualizar cotización' }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    try {
        const { projectId, quotationId } = await params;

        const client = await clientPromise;
        const db = client.db('projectsDB');

        console.log(projectId);

        const result = await db.collection('projects').updateOne(
            {
                _id: new ObjectId(projectId),
                "quotations._id": new ObjectId(quotationId)
            },
            {
                $set: {
                    "quotations.$.isDeleted": true,
                    "quotations.$.deletedAt": new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            console.log({ error: 'Cotización no encontrada' });
            return Response.json({ error: 'Cotización no encontrada' }, { status: 404 });
        }

        return Response.json({ message: 'Cotización eliminada (soft)' });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error al eliminar cotización' }, { status: 500 });
    }
}