import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('projectsDB');

        const projects = await db
            .collection('emails')
            .find({ isDeleted: false })
            .toArray();

        return Response.json(projects);
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error al obtener proyectos' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        // Validación básica
        if (!body.name) {
            return Response.json({ error: 'Faltan campos' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('projectsDB');

        const newProject = {
            name: body.name,
            createdAt: new Date(),
            isDeleted: false
        };

        const result = await db.collection('emails').insertOne(newProject);

        return Response.json({
            message: 'Email creado',
            _id: result.insertedId,
            name: body.name
        });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error al crear email' }, { status: 500 });
    }
}