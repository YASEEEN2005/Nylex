import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, name, company, email, phone, logo_url, logo_public_id, status, total_billed, notes, created_at
      FROM clients
      ORDER BY id DESC;
    `;
    return NextResponse.json({ success: true, clients: rows });
  } catch (err) {
    console.error("Clients GET error:", err);
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
      name,
      company = "",
      email = "",
      phone = "",
      logo_url = "",
      logo_public_id = "",
      status = "Active",
      notes = "",
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Client name is required." }, { status: 400 });
    }

    const sql = getDb();
    const rows = await sql`
      INSERT INTO clients (
        name, company, email, phone, logo_url, logo_public_id, status, notes
      ) VALUES (
        ${name.trim()}, ${company}, ${email}, ${phone}, ${logo_url}, ${logo_public_id}, ${status}, ${notes}
      )
      RETURNING *;
    `;

    return NextResponse.json({ success: true, client: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("Clients POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

