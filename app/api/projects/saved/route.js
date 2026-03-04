import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('projectsDB');

        const projects = await db
            .collection('projects')
            .find({ isDeleted: false, isCompleted: true, })
            .sort({ expirationDate: 1 })
            .toArray();

        return Response.json(projects);
    } catch (error) {
        return Response.json({ error: 'Error al obtener proyectos' }, { status: 500 });
    }
}