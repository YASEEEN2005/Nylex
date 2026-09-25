import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enquiry from "@/models/Enquiry";

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        if (!data.name || !data.phone) {
            return NextResponse.json(
                { success: false, error: "Name and Phone number are required" },
                { status: 400 }
            );
        }

        const enquiry = await Enquiry.create(data);

        return NextResponse.json({
            success: true,
            message: "Enquiry submitted successfully!",
            id: enquiry._id,
        });
    } catch (error) {
        console.error("Contact Form Error:", error);
        return NextResponse.json(
            { success: false, error: "Server error handling submission" },
            { status: 500 }
        );
    }
}
