import clientPromise from '@/lib/mongodb';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('projectsDB');

        const projects = await db
            .collection('projects')
            .find({
                isDeleted: false,
                isCompleted: false,
            })
            .toArray();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let sentCount = 0;

        for (const project of projects) {
            const exp = new Date(project.expirationDate);
            exp.setHours(0, 0, 0, 0);

            const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

            // 🟡 2 días antes
            if (diffDays === 2 && !project?.alertStatus?.twoDaysBefore) {
                await sendWhatsAppMessage(
                    `🟡 Reminder: Project "${project.name}" expires in 2 days (${exp.toDateString()})`
                );

                await db.collection('projects').updateOne(
                    { _id: project._id },
                    { $set: { "alertStatus.twoDaysBefore": true } }
                );

                sentCount++;
            }

            // 🔴 mismo día
            if (diffDays === 0 && !project?.alertStatus?.sameDay) {
                await sendWhatsAppMessage(
                    `🔴 URGENT: Project "${project.name}" expires TODAY (${exp.toDateString()})`
                );

                await db.collection('projects').updateOne(
                    { _id: project._id },
                    { $set: { "alertStatus.sameDay": true } }
                );

                sentCount++;
            }
        }

        return Response.json({
            success: true,
            alertsSent: sentCount,
        });

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Error sending alerts" },
            { status: 500 }
        );
    }
}