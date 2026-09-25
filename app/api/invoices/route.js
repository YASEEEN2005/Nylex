import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";

export async function GET() {
    try {
        await dbConnect();
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, invoices });
    } catch (error) {
        console.error("Fetch Invoices Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch invoices" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        if (!data.clientName) {
            return NextResponse.json(
                { success: false, error: "Client name is required" },
                { status: 400 }
            );
        }

        // Generate unique invoice number if not provided
        if (!data.invoiceNumber) {
            const count = await Invoice.countDocuments();
            const nextNum = (count + 1).toString().padStart(3, "0");
            const year = new Date().getFullYear();
            data.invoiceNumber = `NYL-${year}-${nextNum}`;
        }

        // Calculate subtotal and total if items provided
        if (data.items && Array.isArray(data.items)) {
            const subtotal = data.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
            data.subtotal = subtotal;
            const tax = Number(data.tax) || 0;
            const discount = Number(data.discount) || 0;
            data.total = Math.max(0, subtotal + tax - discount);
        }

        const invoice = await Invoice.create(data);
        return NextResponse.json({ success: true, invoice }, { status: 201 });
    } catch (error) {
        console.error("Create Invoice Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create invoice" },
            { status: 500 }
        );
    }
}
