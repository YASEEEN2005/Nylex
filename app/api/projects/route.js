import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const sql = getDb();

    // Query projects with aggregated gallery images from project_gallery table
    const rows = await sql`
      SELECT
        p.id, p.title, p.slug, p.link, p.category, p.type, p.description,
        p.image_url, p.image_public_id, p.tags, p.result, p.featured, p.order_index, p.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', g.id,
              'image_url', g.image_url,
              'public_id', g.public_id,
              'caption', g.caption,
              'order_index', g.order_index
            ) ORDER BY g.order_index ASC, g.id ASC
          ) FILTER (WHERE g.id IS NOT NULL),
          '[]'
        ) as gallery
      FROM projects p
      LEFT JOIN project_gallery g ON g.project_id = p.id
      GROUP BY p.id
      ORDER BY p.order_index ASC, p.id DESC;
    `;

    return NextResponse.json({ success: true, projects: rows });
  } catch (err) {
    console.error("Projects GET error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve projects." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      link = "",
      category = "webdev",
      type = "Web Development",
      description = "",
      image_url = "",
      image_public_id = "",
      gallery = [], // Array of { image_url, public_id, caption }
      tags = [],
      result = "",
      featured = true,
      order_index = 0,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Project title is required." },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      INSERT INTO projects (
        title, link, category, type, description, image_url, image_public_id, tags, result, featured, order_index
      ) VALUES (
        ${title.trim()}, ${link}, ${category}, ${type}, ${description}, ${image_url}, ${image_public_id}, ${tags}, ${result}, ${featured}, ${Number(order_index) || 0}
      )
      RETURNING *;
    `;

    const newProject = rows[0];

    // Insert additional gallery images into project_gallery if provided
    if (Array.isArray(gallery) && gallery.length > 0) {
      for (let i = 0; i < gallery.length; i++) {
        const item = gallery[i];
        if (item.image_url) {
          await sql`
            INSERT INTO project_gallery (project_id, image_url, public_id, caption, order_index)
            VALUES (${newProject.id}, ${item.image_url}, ${item.public_id || ""}, ${item.caption || ""}, ${i});
          `;
        }
      }
    }

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err) {
    console.error("Projects POST error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create project." },
      { status: 500 }
    );
  }
}
