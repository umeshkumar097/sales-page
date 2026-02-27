import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            await jwtVerify(token, secretKey);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // Fetch leads ordered by newest first, include generated meetings
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            include: { meetings: true }
        });

        return NextResponse.json({ leads });
    } catch (error) {
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
