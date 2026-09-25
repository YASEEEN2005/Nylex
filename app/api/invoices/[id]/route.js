import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return NextResponse.json(
                { success: false, error: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, invoice });
    } catch (error) {
        console.error("Fetch Single Invoice Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch invoice" },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const data = await req.json();

        if (data.items && Array.isArray(data.items)) {
            const subtotal = data.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
            data.subtotal = subtotal;
            const tax = Number(data.tax) || 0;
            const discount = Number(data.discount) || 0;
            data.total = Math.max(0, subtotal + tax - discount);
        }

        const invoice = await Invoice.findByIdAndUpdate(id, data, { new: true });
        if (!invoice) {
            return NextResponse.json(
                { success: false, error: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, invoice });
    } catch (error) {
        console.error("Update Invoice Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update invoice" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const invoice = await Invoice.findByIdAndDelete(id);
        if (!invoice) {
            return NextResponse.json(
                { success: false, error: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Invoice deleted" });
    } catch (error) {
        console.error("Delete Invoice Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete invoice" },
            { status: 500 }
        );
    }
}
