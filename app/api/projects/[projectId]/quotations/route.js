import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
    try {
        const { projectId } = params;

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const project = await db.collection('projects').findOne(
            { _id: new ObjectId(projectId) },
            { projection: { quotations: 1 } }
        );

        if (!project) {
            return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
        }

        return Response.json(project.quotations || []);
    } catch (error) {
        return Response.json({ error: 'Error al obtener cotizaciones' }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const { projectId } = await params;
        const body = await req.json();

        if (!body.name || !body.requestDate || !body.responseDate || body.price == null) {
            return Response.json({ error: 'Faltan campos' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const newQuotation = {
            _id: new ObjectId(),
            name: body.name,
            isReceived: false,
            requestDate: new Date(body.requestDate),
            responseDate: new Date(body.responseDate),
            price: Number(body.price),
            isSaved: false,
            createdAt: new Date(),
            isDeleted: false,
            deletedAt: null,
        };

        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            { $push: { quotations: newQuotation } }
        );

        if (result.matchedCount === 0) {
            return Response.json({ error: 'Proyecto no encontrado' }, { status: 404 });
        }

        return Response.json({
            message: 'Cotización creada',
            quotation: newQuotation
        });
    } catch (error) {
        return Response.json({ error: 'Error al crear cotización' }, { status: 500 });
    }
}