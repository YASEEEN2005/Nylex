import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const data = await req.json();

        const client = await Client.findByIdAndUpdate(id, data, { new: true });
        if (!client) {
            return NextResponse.json(
                { success: false, error: "Client not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, client });
    } catch (error) {
        console.error("Update Client Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update client" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const client = await Client.findByIdAndDelete(id);
        if (!client) {
            return NextResponse.json(
                { success: false, error: "Client not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Client deleted" });
    } catch (error) {
        console.error("Delete Client Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete client" },
            { status: 500 }
        );
    }
}
