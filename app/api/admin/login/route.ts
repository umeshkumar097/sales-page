import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Verify against .env credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            // Create JWT
            const token = await new SignJWT({ email })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("24h")
                .sign(secretKey);

            // Set HTTP-Only Cookie
            const cookieStore = await cookies();
            cookieStore.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
