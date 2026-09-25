import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Client from "@/models/Client";

export async function GET() {
    try {
        await dbConnect();
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, clients });
    } catch (error) {
        console.error("Fetch Clients Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch clients" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        if (!data.name) {
            return NextResponse.json(
                { success: false, error: "Client name is required" },
                { status: 400 }
            );
        }

        const client = await Client.create(data);
        return NextResponse.json({ success: true, client }, { status: 201 });
    } catch (error) {
        console.error("Create Client Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create client" },
            { status: 500 }
        );
    }
}
