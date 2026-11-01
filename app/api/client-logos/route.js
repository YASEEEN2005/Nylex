import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get("all") === "true";
    const sql = getDb();

    if (showAll) {
      const session = await getAdminSession();
      if (session) {
        const rows = await sql`
          SELECT id, client_name, image_url, cloudinary_public_id, alt_text, display_order, is_active, created_at, updated_at
          FROM client_logos
          ORDER BY display_order ASC, id ASC;
        `;
        return NextResponse.json({ success: true, logos: rows });
      }
    }

    // Public request: Return only active client logos
    const rows = await sql`
      SELECT id, client_name, image_url, cloudinary_public_id, alt_text, display_order, is_active
      FROM client_logos
      WHERE is_active = true
      ORDER BY display_order ASC, id ASC;
    `;
    return NextResponse.json({ success: true, logos: rows });
  } catch (err) {
    console.error("Client Logos GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const body = await req.json();
    const {
      client_name,
      image_url,
      cloudinary_public_id = "",
      alt_text = "",
      display_order,
      is_active = true,
    } = body;

    if (!client_name || !client_name.trim()) {
      return NextResponse.json({ success: false, error: "Client or business name is required." }, { status: 400 });
    }

    if (!image_url || !image_url.trim()) {
      return NextResponse.json({ success: false, error: "Logo image URL is required." }, { status: 400 });
    }

    const sql = getDb();

    // Auto calculate display order if not specified
    let finalOrder = parseInt(display_order, 10);
    if (isNaN(finalOrder)) {
      const maxOrderRes = await sql`SELECT COALESCE(MAX(display_order), 0)::int as max_order FROM client_logos;`;
      finalOrder = (maxOrderRes[0]?.max_order || 0) + 1;
    }

    const cleanAlt = (alt_text || client_name).trim();

    const rows = await sql`
      INSERT INTO client_logos (
        client_name,
        image_url,
        cloudinary_public_id,
        alt_text,
        display_order,
        is_active
      ) VALUES (
        ${client_name.trim()},
        ${image_url.trim()},
        ${cloudinary_public_id || ""},
        ${cleanAlt},
        ${finalOrder},
        ${Boolean(is_active)}
      )
      RETURNING *;
    `;

    return NextResponse.json({ success: true, logo: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("Client Logos POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

