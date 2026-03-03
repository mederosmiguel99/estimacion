import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('projectsDB');

        const projects = await db
            .collection('projects')
            .find({ isDeleted: false, isCompleted: false, })
            .sort({ createdAt: 1 })
            .toArray();

        return Response.json(projects);
    } catch (error) {
        return Response.json({ error: 'Error al obtener proyectos' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        // Validación básica
        if (!body.name || !body.requestDate || !body.expirationDate) {
            return Response.json({ error: 'Faltan campos' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const newProject = {
            name: body.name,
            requestDate: new Date(body.requestDate),
            expirationDate: new Date(body.expirationDate),
            isCompleted: false,
            quotations: [],
            createdAt: new Date(),
            isDeleted: false,
            deletedAt: null,
        };

        const result = await db.collection('projects').insertOne(newProject);

        return Response.json({
            message: 'Proyecto creado',
            _id: result.insertedId,
            name: body.name,
            requestDate: new Date(body.requestDate),
            expirationDate: new Date(body.expirationDate),
            isCompleted: false,
            quotations: [],
            createdAt: new Date(),
            isDeleted: false,
            deletedAt: null,
        });
    } catch (error) {
        return Response.json({ error: 'Error al crear proyecto' }, { status: 500 });
    }
}