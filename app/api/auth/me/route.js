import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ authenticated: false, admin: null });
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: session.id,
        username: session.username,
        role: session.role,
      },
    });
  } catch (err) {
    console.error("Auth Me GET error:", err);
    return NextResponse.json({ authenticated: false, admin: null });
  }
}

