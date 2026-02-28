import { NextResponse } from "next/server";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    
    // Determine the base URL dynamically based on where this is running
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // User might have denied access
    if (!code) {
      return NextResponse.redirect(new URL(`${baseUrl}/admin/dashboard?error=GoogleAuthFailed`));
    }

    // Exchange the auth code for a token pack
    const { tokens } = await oauth2Client.getToken(code);
    
    // Only update if we actually got a refresh token
    // Google only sends this the FIRST time the user consents, or if we forced prompt: 'consent'
    if (tokens.refresh_token) {
      await prisma.adminSettings.upsert({
        where: { id: 1 },
        update: { googleRefreshToken: tokens.refresh_token },
        create: { id: 1, googleRefreshToken: tokens.refresh_token },
      });
    }

    // Return to the dashboard with a success flag
    return NextResponse.redirect(new URL(`${baseUrl}/admin/dashboard?success=GoogleAuthComplete`));
    
  } catch (error) {
    console.error("Error exchanging Google Auth code:", error);
    
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    
    return NextResponse.redirect(new URL(`${baseUrl}/admin/dashboard?error=GoogleServerAuthFailed`));
  }
}
