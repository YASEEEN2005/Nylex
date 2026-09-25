import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nylex_fallback_secret_key_2026";

export async function GET(req) {
    try {
        const token = req.cookies.get("nylex_admin_token")?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({
            authenticated: true,
            user: { username: decoded.username, role: decoded.role },
        });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
