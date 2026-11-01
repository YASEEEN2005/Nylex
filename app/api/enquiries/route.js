import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT id, name, email, phone, service, message, is_read, created_at
      FROM enquiries
      ORDER BY id DESC;
    `;

    return NextResponse.json({ success: true, enquiries: rows });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email = "", phone = "", service = "webdev", message = "" } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }

    if (!email.trim() && !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide either an email or phone number." },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      INSERT INTO enquiries (name, email, phone, service, message)
      VALUES (${name.trim()}, ${email.trim()}, ${phone.trim()}, ${service}, ${message.trim()})
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received. Our team will contact you shortly.",
      enquiry: rows[0],
    }, { status: 201 });
  } catch (err) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json({ success: false, error: "Failed to submit enquiry." }, { status: 500 });
  }
}

