import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function DELETE(req) {
  try {
    // 1. Enforce admin authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Administrator privileges required." },
        { status: 401 }
      );
    }

    // 2. Validate exact confirmation phrase from request body
    const body = await req.json().catch(() => ({}));
    const { confirmation } = body;

    if (confirmation !== "DELETE ALL ANALYTICS") {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid confirmation phrase. You must enter "DELETE ALL ANALYTICS" to proceed.',
        },
        { status: 400 }
      );
    }

    // 3. Purge only website_analytics records (preserves all projects, invoices, clients, enquiries, admin accounts)
    const sql = getDb();
    await sql`DELETE FROM website_analytics;`;

    return NextResponse.json({
      success: true,
      message: "All website analytics telemetry and visitor logs have been permanently deleted.",
    });
  } catch (err) {
    console.error("Analytics clear error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to purge analytics records. Please try again." },
      { status: 500 }
    );
  }
}

// Reject any GET / POST / PUT requests
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Analytics deletion must use an authenticated DELETE request." },
    { status: 405 }
  );
}

