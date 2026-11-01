import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body; // Array of { id: number, display_order: number }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "Array of items with id and display_order required." }, { status: 400 });
    }

    const sql = getDb();

    // Batch update order
    for (const item of items) {
      if (item.id && typeof item.display_order === "number") {
        await sql`
          UPDATE client_logos
          SET display_order = ${item.display_order},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${item.id};
        `;
      }
    }

    return NextResponse.json({ success: true, message: "Client logos display order updated successfully." });
  } catch (err) {
    console.error("Client Logos reorder error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

