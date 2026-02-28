import { NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a secure auth URL to ask the admin for Calendar access
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline", // Essential to get a refresh token
      prompt: "consent",      // Force consent to guarantee we get a refresh token
      scope: [
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/calendar.readonly"
      ]
    });

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
