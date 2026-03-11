import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";

const getRedirectUri = () => {
    let uri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/admin/google/callback";
    // Force HTTPS in production to prevent Google OAuth 400 errors if user accidentally typed http:// in Vercel
    if (uri.includes("aiclex.in") && uri.startsWith("http://")) {
        uri = uri.replace("http://", "https://");
    }
    return uri;
};

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    getRedirectUri()
);

export async function POST(request: Request) {
    try {
        // 1. Verify Admin Authentication
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
            await jwtVerify(token, secret);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // 2. Parse Request
        const body = await request.json();
        const { email, name, projectType, meetingTime } = body;

        // Note: meetingLink is no longer passed from frontend. We generate it.
        if (!email || !name || !meetingTime) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 3. Fetch Admin Google Auth Settings
        const adminSettings = await prisma.adminSettings.findUnique({ where: { id: 1 } });
        if (!adminSettings || !adminSettings.googleRefreshToken) {
            return NextResponse.json({ error: "Google Calendar not connected. Please connect it first." }, { status: 403 });
        }

        // 4. Generate Google Meet Link
        oauth2Client.setCredentials({ refresh_token: adminSettings.googleRefreshToken });
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // Try to parse the meetingTime (assuming it's a loose string like 'Tomorrow at 2PM').
        // In a strict app we would pass ISO dates. For now, we will create an event starting 
        // 1 hour from current execution as a placeholder, or attempt to parse if possible.
        // To be safe and guarantee a meet link works immediately, we just create a loose event.
        const eventStartTime = new Date();
        eventStartTime.setMinutes(eventStartTime.getMinutes() + 10); // Start soon
        const eventEndTime = new Date(eventStartTime);
        eventEndTime.setHours(eventEndTime.getHours() + 1);

        const event = {
          summary: `Strategy Meeting: ${name} (${projectType})`,
          description: `Meeting to discuss ${projectType} requirements.`,
          start: {
            dateTime: eventStartTime.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          end: {
            dateTime: eventEndTime.toISOString(),
            timeZone: 'Asia/Kolkata',
          },
          attendees: [
            { email: email },
          ],
          conferenceData: {
            createRequest: {
              requestId: `meet-${Date.now()}`,
              conferenceSolutionKey: {
                type: 'hangoutsMeet'
              }
            }
          }
        };

        const calendarResponse = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
          conferenceDataVersion: 1, // Required to get the meet link
        });

        const meetingLink = calendarResponse.data.hangoutLink;
        const eventId = calendarResponse.data.id;

        if (!meetingLink) {
            throw new Error("Failed to generate Google Meet link from Calendar API.");
        }
        
        // Find existing lead by email to link the meeting to it
        const lead = await prisma.lead.findFirst({ where: { email: email } });

        if (lead) {
            // 5. Save Meeting to Database
            await prisma.meeting.create({
                data: {
                    leadId: lead.id,
                    meetingLink: meetingLink,
                    meetingTime: new Date(), // Storing raw db log timestamp
                    eventId: eventId,
                }
            });
        }

        // 6. Send Meeting Invite Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Aiclex Technologies" <${process.env.SMTP_FROM || "info@aiclex.in"}>`,
            to: email,
            subject: "Invitation: Strategy Meeting with Aiclex Technologies",
            html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
          
          <div style="background-color: #0f172a; padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase;">Invitation To Connect</h1>
          </div>

          <div style="padding: 40px 30px;">
            <h2 style="color: #0f172a; font-size: 22px; margin: 0 0 20px 0;">Hi ${name},</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Our senior consultants have reviewed your inquiry regarding <strong>${projectType || 'your project'}</strong>. We believe Aiclex Technologies can deliver exceptional value for this initiative.
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">
              I would like to personally invite you to a brief Strategy Meeting to discuss your core objectives, technical constraints, and outline a tailored roadmap.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 35px; text-align: left;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Meeting Details</p>
                <p style="margin: 0 0 8px 0; color: #0f172a; font-size: 16px;"><strong>Time:</strong> ${meetingTime}</p>
                <p style="margin: 0; color: #0f172a; font-size: 16px;"><strong>Link:</strong> <a href="${meetingLink}" style="color: #3b82f6;">Join Meeting Here</a></p>
            </div>

            <div style="text-align: center; margin-bottom: 40px;">
                <a href="${meetingLink}" style="background-color: #3b82f6; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                    Join Virtual Meeting
                </a>
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #e2e8f0; padding-top: 30px;">
              <tr>
                <td width="70" valign="middle">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" alt="Executive" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; display: block;" />
                </td>
                <td valign="middle">
                  <p style="margin: 0; color: #0f172a; font-size: 16px; font-weight: 700;">Umesh Kumar</p>
                  <p style="margin: 2px 0 0 0; color: #3b82f6; font-size: 14px; font-weight: 600;">Founder & CEO</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error("Error sending invite:", error);
        return NextResponse.json({ error: error.message || "Failed to send invite", details: error.toString() }, { status: 500 });
    }
}
