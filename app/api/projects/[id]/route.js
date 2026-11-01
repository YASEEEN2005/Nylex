import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(req, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const sql = getDb();
    const rows = await sql`
      SELECT
        p.*,
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
      WHERE p.id = ${params.id}
      GROUP BY p.id
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, project: rows[0] });
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
    const {
      title,
      link = "",
      category = "webdev",
      type = "Web Development",
      description = "",
      image_url,
      image_public_id,
      gallery, // Optional updated array of { image_url, public_id, caption }
      tags = [],
      result = "",
      featured = true,
      order_index = 0,
    } = body;

    const sql = getDb();

    // 1. Fetch current project to check if cover image is being replaced
    const currentRows = await sql`SELECT image_public_id FROM projects WHERE id = ${params.id} LIMIT 1;`;
    if (currentRows.length === 0) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }

    const oldCoverPublicId = currentRows[0].image_public_id;
    if (oldCoverPublicId && image_public_id && oldCoverPublicId !== image_public_id) {
      // Safe replacement: delete the old Cloudinary asset
      await deleteFromCloudinary(oldCoverPublicId).catch((err) => {
        console.warn("Could not delete old Cloudinary image:", err);
      });
    }

    // 2. Update project main record
    const updatedRows = await sql`
      UPDATE projects SET
        title = ${title},
        link = ${link},
        category = ${category},
        type = ${type},
        description = ${description},
        image_url = COALESCE(${image_url}, image_url),
        image_public_id = COALESCE(${image_public_id}, image_public_id),
        tags = ${tags},
        result = ${result},
        featured = ${featured},
        order_index = ${Number(order_index) || 0},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *;
    `;

    // 3. Update gallery images if provided
    if (Array.isArray(gallery)) {
      // Find existing gallery images to clean up deleted ones from Cloudinary
      const existingGallery = await sql`
        SELECT id, public_id FROM project_gallery WHERE project_id = ${params.id};
      `;

      const newPublicIds = new Set(gallery.map((g) => g.public_id).filter(Boolean));

      // Delete removed images from Cloudinary
      for (const item of existingGallery) {
        if (item.public_id && !newPublicIds.has(item.public_id)) {
          await deleteFromCloudinary(item.public_id).catch(() => { });
        }
      }

      // Re-sync gallery table
      await sql`DELETE FROM project_gallery WHERE project_id = ${params.id};`;

      for (let i = 0; i < gallery.length; i++) {
        const item = gallery[i];
        if (item.image_url) {
          await sql`
            INSERT INTO project_gallery (project_id, image_url, public_id, caption, order_index)
            VALUES (${params.id}, ${item.image_url}, ${item.public_id || ""}, ${item.caption || ""}, ${i});
          `;
        }
      }
    }

    return NextResponse.json({ success: true, project: updatedRows[0] });
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

    // 1. Delete main cover image from Cloudinary
    const existing = await sql`SELECT image_public_id FROM projects WHERE id = ${params.id} LIMIT 1;`;
    if (existing.length > 0 && existing[0].image_public_id) {
      await deleteFromCloudinary(existing[0].image_public_id).catch(() => { });
    }

    // 2. Delete all gallery images from Cloudinary
    const galleryItems = await sql`SELECT public_id FROM project_gallery WHERE project_id = ${params.id};`;
    for (const g of galleryItems) {
      if (g.public_id) {
        await deleteFromCloudinary(g.public_id).catch(() => { });
      }
    }

    // 3. Delete from database (cascade deletes project_gallery rows)
    await sql`DELETE FROM projects WHERE id = ${params.id};`;

    return NextResponse.json({ success: true, message: "Project and associated Cloudinary assets deleted." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
