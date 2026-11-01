import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/jpg",
];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") || "nylex/uploads").toString();

    let result;
    if (typeof file === "string" && file.startsWith("data:image/")) {
      // Base64 Data URI from Canvas / Background Remover
      const matches = file.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      if (!matches || !ALLOWED_MIME_TYPES.includes(matches[1])) {
        return NextResponse.json(
          { success: false, error: "Invalid data URI format or disallowed image type." },
          { status: 400 }
        );
      }
      result = await uploadToCloudinary(file, folder);
    } else if (file && typeof file !== "string") {
      // Standard File / Blob
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid file type (${file.type}). Allowed types: JPG, PNG, WEBP, SVG.`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
          },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      result = await uploadToCloudinary(buffer, folder);
    } else {
      return NextResponse.json(
        { success: false, error: "No valid image file or data URI provided." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { public_id } = await req.json();
    if (!public_id) {
      return NextResponse.json(
        { success: false, error: "public_id is required." },
        { status: 400 }
      );
    }

    await deleteFromCloudinary(public_id);
    return NextResponse.json({ success: true, message: "Image removed from Cloudinary." });
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete image." },
      { status: 500 }
    );
  }
}

