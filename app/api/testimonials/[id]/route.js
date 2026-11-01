import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function PUT(req, { params: paramsPromise }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const params = await paramsPromise;
    const body = await req.json();
    const { is_approved, quote, name, role, company, rating, avatar_url } = body;

    const sql = getDb();
    const rows = await sql`
      UPDATE testimonials SET
        is_approved = COALESCE(${is_approved !== undefined ? is_approved : null}, is_approved),
        quote = COALESCE(${quote !== undefined ? quote.trim() : null}, quote),
        name = COALESCE(${name !== undefined ? name.trim() : null}, name),
        role = COALESCE(${role !== undefined ? role.trim() : null}, role),
        company = COALESCE(${company !== undefined ? company.trim() : null}, company),
        avatar_url = COALESCE(${avatar_url !== undefined ? avatar_url.trim() : null}, avatar_url),
        rating = COALESCE(${rating !== undefined && rating !== null ? Math.min(5, Math.max(1, Number(rating))) : null}, rating),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, testimonial: rows[0] });
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

    const existing = await sql`SELECT avatar_public_id FROM testimonials WHERE id = ${params.id} LIMIT 1;`;
    if (existing.length > 0 && existing[0].avatar_public_id) {
      await deleteFromCloudinary(existing[0].avatar_public_id).catch(() => {});
    }

    await sql`DELETE FROM testimonials WHERE id = ${params.id};`;

    return NextResponse.json({ success: true, message: "Testimonial deleted." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
