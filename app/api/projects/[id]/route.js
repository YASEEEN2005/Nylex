import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const data = await req.json();

        const project = await Project.findByIdAndUpdate(id, data, { new: true });
        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error("Update Project Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update project" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Project deleted" });
    } catch (error) {
        console.error("Delete Project Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete project" },
            { status: 500 }
        );
    }
}
