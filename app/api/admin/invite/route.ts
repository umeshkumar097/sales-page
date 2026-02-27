import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        // 1. Verify Admin Authentication
        const cookieStore = cookies();
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
        const { email, name, projectType } = body;

        if (!email || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 3. Send Meeting Invite Email
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
              I would like to personally invite you to a brief 15-minute Strategy Meeting via Google Meet or Zoom. We will discuss your core objectives, technical constraints, and outline a tailored roadmap.
            </p>

            <div style="text-align: center; margin-bottom: 40px;">
                <a href="mailto:info@aiclex.in?subject=Meeting Request: ${name}" style="background-color: #3b82f6; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                    Schedule a Meeting
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
        return NextResponse.json({ error: "Failed to send invite" }, { status: 500 });
    }
}
