import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, projects });
    } catch (error) {
        console.error("Fetch Projects Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        if (!data.title) {
            return NextResponse.json(
                { success: false, error: "Title is required" },
                { status: 400 }
            );
        }

        const project = await Project.create(data);
        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error) {
        console.error("Create Project Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create project" },
            { status: 500 }
        );
    }
}
