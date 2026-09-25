import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enquiry from "@/models/Enquiry";

export async function GET() {
    try {
        await dbConnect();
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, enquiries });
    } catch (error) {
        console.error("Fetch Enquiries Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Enquiry ID required" },
                { status: 400 }
            );
        }

        await Enquiry.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Enquiry deleted" });
    } catch (error) {
        console.error("Delete Enquiry Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete enquiry" },
            { status: 500 }
        );
    }
}
