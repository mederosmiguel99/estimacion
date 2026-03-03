import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('projectsDB');

        const projects = await db
            .collection('projects')
            .find({ isDeleted: false })
            .toArray();

        // 🔥 Validación defensiva
        if (!Array.isArray(projects)) {
            return Response.json([], { status: 200 });
        }

        // 🔥 Extraer cotizaciones guardadas
        const savedQuotations = projects.flatMap(project =>
            (project.quotations || [])
                .filter(q => q.isSaved && !q.isDeleted)
                .map(q => ({
                    ...q,
                    projectId: project._id,
                    projectName: project.name,
                }))
        );

        return Response.json(savedQuotations);

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: 'Error fetching saved quotations' },
            { status: 500 }
        );
    }
}