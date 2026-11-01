import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(req, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const sql = getDb();
    const rows = await sql`SELECT * FROM client_logos WHERE id = ${params.id} LIMIT 1;`;
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Client logo not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, logo: rows[0] });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params: paramsPromise }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const params = await paramsPromise;
    const body = await req.json();
    const {
      client_name,
      image_url,
      cloudinary_public_id,
      old_public_id,
      alt_text,
      display_order,
      is_active,
    } = body;

    const sql = getDb();

    // 1. Update Neon PostgreSQL record first
    const rows = await sql`
      UPDATE client_logos SET
        client_name = COALESCE(${client_name}, client_name),
        image_url = COALESCE(${image_url}, image_url),
        cloudinary_public_id = COALESCE(${cloudinary_public_id}, cloudinary_public_id),
        alt_text = COALESCE(${alt_text}, alt_text),
        display_order = COALESCE(${display_order !== undefined ? parseInt(display_order, 10) : null}, display_order),
        is_active = COALESCE(${is_active !== undefined ? Boolean(is_active) : null}, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Client logo not found." }, { status: 404 });
    }

    // 2. Safe Asset Replacement: Clean up previous Cloudinary asset only after DB update succeeds
    if (
      old_public_id &&
      cloudinary_public_id &&
      old_public_id !== cloudinary_public_id
    ) {
      try {
        await deleteFromCloudinary(old_public_id);
      } catch (cloudErr) {
        console.warn("Failed to delete superseded Cloudinary asset:", old_public_id, cloudErr);
      }
    }

    return NextResponse.json({ success: true, logo: rows[0] });
  } catch (err) {
    console.error("Client Logo PUT error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params: paramsPromise }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const params = await paramsPromise;
    const sql = getDb();

    // Fetch existing public_id before deletion
    const existing = await sql`SELECT cloudinary_public_id FROM client_logos WHERE id = ${params.id} LIMIT 1;`;
    if (existing.length === 0) {
      return NextResponse.json({ success: false, error: "Client logo not found." }, { status: 404 });
    }

    const publicId = existing[0]?.cloudinary_public_id;

    // Delete database record
    await sql`DELETE FROM client_logos WHERE id = ${params.id};`;

    // Safely delete associated Cloudinary asset
    if (publicId && publicId.trim()) {
      try {
        await deleteFromCloudinary(publicId);
      } catch (cloudErr) {
        console.warn("Warning: Cloudinary asset deletion encountered issue:", cloudErr);
      }
    }

    return NextResponse.json({ success: true, message: "Client logo deleted successfully." });
  } catch (err) {
    console.error("Client Logo DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

