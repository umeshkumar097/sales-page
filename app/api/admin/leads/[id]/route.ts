import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import * as jose from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');

async function verifyAuth(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value || request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) return false;

    try {
        await jose.jwtVerify(token, JWT_SECRET);
        return true;
    } catch (err) {
        return false;
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        
        // 1. Verify Admin Authentication
        const isAuthenticated = await verifyAuth(request);
        if (!isAuthenticated) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const leadId = parseInt(id, 10);
        if (isNaN(leadId)) {
            return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
        }

        // 2. Delete the lead
        await prisma.lead.delete({
            where: { id: leadId }
        });

        return NextResponse.json({ success: true, message: "Lead deleted successfully" });

    } catch (error: any) {
        console.error("Error deleting lead:", error);
        
        // Handle case where lead doesn't exist
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        return NextResponse.json(
            { error: "Failed to delete lead", details: error.message },
            { status: 500 }
        );
    }
}
