import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const sql = getDb();

    // Fetch invoice
    const invRows = await sql`
      SELECT * FROM invoices WHERE id = ${params.id} OR invoice_number = ${params.id} LIMIT 1;
    `;
    if (invRows.length === 0) {
      return NextResponse.json({ success: false, error: "Invoice not found." }, { status: 404 });
    }

    const invoice = invRows[0];

    // Fetch line items
    const items = await sql`
      SELECT * FROM invoice_items WHERE invoice_id = ${invoice.id} ORDER BY id ASC;
    `;

    // Fetch payments
    const payments = await sql`
      SELECT * FROM payments WHERE invoice_id = ${invoice.id} ORDER BY payment_date DESC;
    `;

    return NextResponse.json({
      success: true,
      invoice: {
        ...invoice,
        items,
        payments,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params: paramsPromise }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const params = await paramsPromise;
    const body = await req.json();
    const {
      invoice_number,
      client_name,
      client_email,
      client_phone,
      client_company,
      issue_date,
      due_date,
      status,
      notes,
      items,
      tax,
      discount,
      paid_amount,
      meta,
    } = body;

    const sql = getDb();

    // Check if invoice exists
    const invRows = await sql`
      SELECT * FROM invoices WHERE id = ${params.id} OR invoice_number = ${params.id} LIMIT 1;
    `;
    if (invRows.length === 0) {
      return NextResponse.json({ success: false, error: "Invoice not found." }, { status: 404 });
    }
    const currentInv = invRows[0];
    const targetId = currentInv.id;

    // If items are provided, calculate subtotal and update line items
    let subtotal = Number(currentInv.subtotal) || 0;
    if (items && Array.isArray(items)) {
      subtotal = 0;
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

      // Clear existing items and re-insert
      await sql`DELETE FROM invoice_items WHERE invoice_id = ${targetId};`;
      for (const it of sanitizedItems) {
        await sql`
          INSERT INTO invoice_items (invoice_id, description, subtitle, icon, quantity, price, amount)
          VALUES (${targetId}, ${it.description}, ${it.subtitle}, ${it.icon}, ${it.quantity}, ${it.price}, ${it.amount});
        `;
      }
    }

    const taxAmount = tax !== undefined ? Number(tax) : Number(currentInv.tax) || 0;
    const discountAmount = discount !== undefined ? Number(discount) : Number(currentInv.discount) || 0;
    const total = Math.max(0, subtotal + taxAmount - discountAmount);

    let calculatedPaid = paid_amount !== undefined ? Number(paid_amount) : Number(currentInv.paid_amount) || 0;
    if (meta?.payment_breakdown && Array.isArray(meta.payment_breakdown) && meta.payment_breakdown.length > 0) {
      calculatedPaid = meta.payment_breakdown.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    }

    const finalStatus =
      status ||
      (calculatedPaid >= total && total > 0 ? "Paid" : calculatedPaid > 0 ? "Partial" : currentInv.status || "Pending");

    const mergedMeta = meta !== undefined ? meta : currentInv.meta || {};

    const rows = await sql`
      UPDATE invoices SET
        invoice_number = COALESCE(${invoice_number || null}, invoice_number),
        client_name = COALESCE(${client_name || null}, client_name),
        client_email = COALESCE(${client_email !== undefined ? client_email : null}, client_email),
        client_phone = COALESCE(${client_phone !== undefined ? client_phone : null}, client_phone),
        client_company = COALESCE(${client_company !== undefined ? client_company : null}, client_company),
        issue_date = COALESCE(${issue_date ? new Date(issue_date) : null}, issue_date),
        due_date = COALESCE(${due_date ? new Date(due_date) : null}, due_date),
        subtotal = ${subtotal},
        tax = ${taxAmount},
        discount = ${discountAmount},
        total = ${total},
        paid_amount = ${calculatedPaid},
        status = ${finalStatus},
        notes = COALESCE(${notes !== undefined ? notes : null}, notes),
        meta = ${JSON.stringify(mergedMeta)},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${targetId}
      RETURNING *;
    `;

    return NextResponse.json({ success: true, invoice: rows[0] });
  } catch (err) {
    console.error("Invoices PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params: paramsPromise }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const params = await paramsPromise;
    const sql = getDb();

    await sql`DELETE FROM invoices WHERE id = ${params.id};`;

    return NextResponse.json({ success: true, message: "Invoice deleted successfully." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

