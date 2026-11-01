import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const sql = getDb();

    // Query invoices with aggregated line items count and payments
    const invoices = await sql`
      SELECT
        i.*,
        COALESCE(json_agg(DISTINCT it.*) FILTER (WHERE it.id IS NOT NULL), '[]') as items,
        COALESCE(json_agg(DISTINCT p.*) FILTER (WHERE p.id IS NOT NULL), '[]') as payments
      FROM invoices i
      LEFT JOIN invoice_items it ON it.invoice_id = i.id
      LEFT JOIN payments p ON p.invoice_id = i.id
      GROUP BY i.id
      ORDER BY i.id DESC;
    `;

    return NextResponse.json({ success: true, invoices });
  } catch (err) {
    console.error("Invoices GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const {
      client_id = null,
      invoice_number: customInvoiceNumber,
      client_name,
      client_email = "",
      client_phone = "",
      client_company = "",
      issue_date,
      due_date,
      items = [],
      tax = 0,
      discount = 0,
      paid_amount: customPaid,
      status: customStatus,
      notes = "Thank you for partnering with NYLEX DIGITAL STUDIO.",
      meta = {},
    } = body;

    if (!client_name || !client_name.trim()) {
      return NextResponse.json({ success: false, error: "Client name is required." }, { status: 400 });
    }

    const sql = getDb();

    // Use custom invoice number if provided, otherwise auto-generate
    let invoice_number = customInvoiceNumber && customInvoiceNumber.trim();
    if (!invoice_number) {
      const countRows = await sql`SELECT COUNT(*)::int as count FROM invoices;`;
      const nextSeq = (countRows[0]?.count || 0) + 1;
      invoice_number = `INX-FP-${String(nextSeq).padStart(3, "0")}`;
    }

    // Calculate subtotal and total
    let subtotal = 0;
    const sanitizedItems = items.map((item) => {
      const qty = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      const amount = qty * price;
      subtotal += amount;
      return {
        description: item.description || "Service Delivery",
        subtitle: item.subtitle || "",
        icon: item.icon || "code",
        quantity: qty,
        price,
        amount,
      };
    });

    const taxAmount = Number(tax) || 0;
    const discountAmount = Number(discount) || 0;
    const total = Math.max(0, subtotal + taxAmount - discountAmount);

    // Calculate paid amount from installments if provided
    let calculatedPaid = Number(customPaid) || 0;
    if (meta?.payment_breakdown && Array.isArray(meta.payment_breakdown) && meta.payment_breakdown.length > 0) {
      calculatedPaid = meta.payment_breakdown.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    }

    const finalStatus = customStatus || (calculatedPaid >= total && total > 0 ? "Paid" : calculatedPaid > 0 ? "Partial" : "Pending");

    // Insert Invoice
    const invoiceRows = await sql`
      INSERT INTO invoices (
        invoice_number, client_id, client_name, client_email, client_phone, client_company,
        issue_date, due_date, subtotal, tax, discount, total, paid_amount, status, notes, meta
      ) VALUES (
        ${invoice_number}, ${client_id}, ${client_name}, ${client_email}, ${client_phone}, ${client_company},
        ${issue_date ? new Date(issue_date) : new Date()},
        ${due_date ? new Date(due_date) : new Date(Date.now() + 14 * 86400000)},
        ${subtotal}, ${taxAmount}, ${discountAmount}, ${total}, ${calculatedPaid}, ${finalStatus}, ${notes}, ${JSON.stringify(meta)}
      )
      RETURNING *;
    `;

    const newInvoice = invoiceRows[0];

    // Insert line items
    for (const it of sanitizedItems) {
      await sql`
        INSERT INTO invoice_items (invoice_id, description, subtitle, icon, quantity, price, amount)
        VALUES (${newInvoice.id}, ${it.description}, ${it.subtitle}, ${it.icon}, ${it.quantity}, ${it.price}, ${it.amount});
      `;
    }

    return NextResponse.json({ success: true, invoice: newInvoice }, { status: 201 });
  } catch (err) {
    console.error("Invoices POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

