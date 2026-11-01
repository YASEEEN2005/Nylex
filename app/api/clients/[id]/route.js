import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(req, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const sql = getDb();
    const rows = await sql`SELECT * FROM clients WHERE id = ${params.id} LIMIT 1;`;
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Client not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, client: rows[0] });
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
    const { name, company, email, phone, logo_url, logo_public_id, status, notes } = body;

    const sql = getDb();
    const rows = await sql`
      UPDATE clients SET
        name = COALESCE(${name}, name),
        company = COALESCE(${company}, company),
        email = COALESCE(${email}, email),
        phone = COALESCE(${phone}, phone),
        logo_url = COALESCE(${logo_url}, logo_url),
        logo_public_id = COALESCE(${logo_public_id}, logo_public_id),
        status = COALESCE(${status}, status),
        notes = COALESCE(${notes}, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Client not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, client: rows[0] });
  } catch (err) {
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

    const existing = await sql`SELECT logo_public_id FROM clients WHERE id = ${params.id} LIMIT 1;`;
    if (existing.length > 0 && existing[0].logo_public_id) {
      await deleteFromCloudinary(existing[0].logo_public_id).catch(() => {});
    }

    await sql`DELETE FROM clients WHERE id = ${params.id};`;

    return NextResponse.json({ success: true, message: "Client deleted successfully." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

