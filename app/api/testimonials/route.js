import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get("all") === "true";
    const session = await getAdminSession();

    const sql = getDb();

    let rows;
    if (showAll && session) {
      // Admin view: all reviews
      rows = await sql`SELECT * FROM testimonials ORDER BY id DESC;`;
    } else {
      // Public view: approved reviews only
      rows = await sql`SELECT * FROM testimonials WHERE is_approved = true ORDER BY id DESC;`;
    }

    return NextResponse.json({ success: true, testimonials: rows });
  } catch (err) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      role = "Client",
      company = "",
      quote,
      avatar_url = "",
      avatar_public_id = "",
      rating = 5,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Your name is required." }, { status: 400 });
    }

    if (!quote || !quote.trim()) {
      return NextResponse.json({ success: false, error: "Review text is required." }, { status: 400 });
    }

    const numRating = Math.min(5, Math.max(1, Number(rating) || 5));
    const isApprovedBool = typeof body.is_approved === "boolean" ? body.is_approved : true;

    const sql = getDb();
    const rows = await sql`
      INSERT INTO testimonials (
        name, role, company, quote, avatar_url, avatar_public_id, rating, is_approved
      ) VALUES (
        ${name.trim()}, ${role.trim()}, ${company.trim()}, ${quote.trim()}, ${avatar_url}, ${avatar_public_id}, ${numRating}, ${isApprovedBool}
      )
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: "Thank you for your review! It has been posted successfully.",
      testimonial: rows[0],
    }, { status: 201 });
  } catch (err) {
    console.error("Testimonials POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

