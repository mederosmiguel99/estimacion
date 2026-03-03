import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({
      isDeleted: false,
    });

    // 🔥 extraer solo las cotizaciones guardadas
    const savedQuotations = projects.flatMap(project =>
      (project.quotations || [])
        .filter(q => q.isSaved && !q.isDeleted)
        .map(q => ({
          ...q.toObject(),
          projectId: project._id,
          projectName: project.name
        }))
    );

    return NextResponse.json(savedQuotations);

  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching saved quotations" },
      { status: 500 }
    );
  }
}