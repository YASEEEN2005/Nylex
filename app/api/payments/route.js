import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const {
      invoice_id,
      amount,
      payment_method = "Bank Transfer",
      transaction_reference = "",
      receipt_url = "",
      receipt_public_id = "",
      notes = "",
    } = body;

    const paymentAmount = Number(amount);
    if (!invoice_id || isNaN(paymentAmount) || paymentAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid invoice ID and positive payment amount are required." },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Check invoice existence and current totals
    const invRows = await sql`SELECT id, total, paid_amount FROM invoices WHERE id = ${invoice_id} LIMIT 1;`;
    if (invRows.length === 0) {
      return NextResponse.json({ success: false, error: "Invoice not found." }, { status: 404 });
    }

    const inv = invRows[0];
    const updatedPaid = Number(inv.paid_amount || 0) + paymentAmount;
    const invTotal = Number(inv.total || 0);

    const newStatus = updatedPaid >= invTotal ? "Paid" : updatedPaid > 0 ? "Partial" : "Pending";

    // Insert payment record
    const payRows = await sql`
      INSERT INTO payments (
        invoice_id, amount, payment_method, transaction_reference, receipt_url, receipt_public_id, notes
      ) VALUES (
        ${invoice_id}, ${paymentAmount}, ${payment_method}, ${transaction_reference}, ${receipt_url}, ${receipt_public_id}, ${notes}
      )
      RETURNING *;
    `;

    // Update invoice paid amount and status
    await sql`
      UPDATE invoices SET
        paid_amount = ${updatedPaid},
        status = ${newStatus},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${invoice_id};
    `;

    return NextResponse.json({
      success: true,
      payment: payRows[0],
      invoice: {
        id: invoice_id,
        paid_amount: updatedPaid,
        status: newStatus,
      },
    });
  } catch (err) {
    console.error("Payment error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

