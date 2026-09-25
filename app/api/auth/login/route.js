import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nylex_fallback_secret_key_2026";

export async function POST(req) {
    try {
        await dbConnect();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        // Auto-seed default admin if database has no admin records yet
        let admin = await Admin.findOne({ username });
        if (!admin) {
            const defaultUser = process.env.ADMIN_USERNAME || "admin";
            const defaultPass = process.env.ADMIN_PASSWORD || "nylexadmin2026";

            if (username === defaultUser && password === defaultPass) {
                const hashedPassword = await bcrypt.hash(defaultPass, 10);
                admin = await Admin.create({
                    username: defaultUser,
                    password: hashedPassword,
                });
            } else {
                return NextResponse.json(
                    { error: "Invalid username or password" },
                    { status: 401 }
                );
            }
        } else {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                // Check if matching default env credentials if bcrypt compare fails
                const defaultUser = process.env.ADMIN_USERNAME || "admin";
                const defaultPass = process.env.ADMIN_PASSWORD || "nylexadmin2026";
                if (username === defaultUser && password === defaultPass) {
                    const newHash = await bcrypt.hash(defaultPass, 10);
                    admin.password = newHash;
                    await admin.save();
                } else {
                    return NextResponse.json(
                        { error: "Invalid username or password" },
                        { status: 401 }
                    );
                }
            }
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            { success: true, message: "Logged in successfully", username: admin.username },
            { status: 200 }
        );

        // Set HTTP-Only Cookie
        response.cookies.set({
            name: "nylex_admin_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Server error during authentication" },
            { status: 500 }
        );
    }
}
