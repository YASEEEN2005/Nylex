import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PUT(req, { params: paramsPromise }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const params = await paramsPromise;
    const body = await req.json();
    const { is_read } = body;

    const sql = getDb();
    const rows = await sql`
      UPDATE enquiries SET is_read = ${Boolean(is_read)} WHERE id = ${params.id} RETURNING *;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: rows[0] });
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
    await sql`DELETE FROM enquiries WHERE id = ${params.id};`;

    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

