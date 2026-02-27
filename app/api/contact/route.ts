import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, email, phone, projectType, message } = body;

        if (!name || !email || !phone || !projectType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Save to Database
        const lead = await prisma.lead.create({
            data: {
                name,
                company: company || null,
                email,
                phone,
                projectType,
                message: message || null,
            },
        });

        // 2. Send Auto-Responder Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Aiclex Technologies" <${process.env.SMTP_FROM || "info@aiclex.in"}>`,
            to: email, // send to the user who filled the form
            subject: "Thank You for Contacting Aiclex Technologies",
            html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
          
          <!-- Hero / Header with Graphic Background -->
          <div style="background-color: #0f172a; background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'); background-size: cover; background-position: center; padding: 60px 40px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,58,138,0.75));"></div>
            <div style="position: relative; z-index: 1;">
              <h1 style="color: #ffffff; margin: 0; font-size: 38px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase;">AICLEX</h1>
              <p style="color: #93c5fd; font-size: 14px; letter-spacing: 5px; text-transform: uppercase; margin-top: 8px;">Technologies</p>
            </div>
          </div>

          <!-- Body -->
          <div style="padding: 50px 40px; background-color: #ffffff;">
            <h2 style="color: #0f172a; font-size: 26px; margin: 0 0 20px 0; font-weight: 700;">Hello ${name},</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
              Thank you for considering Aiclex Technologies as your technical partner. We have successfully received your inquiry for <strong>${projectType}</strong> and our leadership team is already reviewing your requirements.
            </p>
            
            <!-- Info Card -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 35px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: none;">
                <tr>
                  <td width="60" valign="top">
                    <div style="background-color: #eff6ff; width: 48px; height: 48px; border-radius: 50%; text-align: center; line-height: 48px; font-size: 24px;">🚀</div>
                  </td>
                  <td>
                    <h4 style="color: #0f172a; margin: 0 0 8px 0; font-size: 18px;">Next Steps</h4>
                    <p style="color: #5f708a; margin: 0; font-size: 15px; line-height: 1.6;">A senior consultant will analyze your business use-case and contact you within <strong>24 hours</strong> with a strategic roadmap.</p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Signature block with Profile Picture -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 35px;">
              <tr>
                <td width="80" valign="middle">
                  <!-- Professional Profile Picture -->
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" alt="Executive" style="width: 65px; height: 65px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid #e2e8f0;" />
                </td>
                <td valign="middle">
                  <p style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 700;">Umesh Kumar</p>
                  <p style="margin: 3px 0 0 0; color: #3b82f6; font-size: 14px; font-weight: 600;">Founder & CEO</p>
                  <p style="margin: 3px 0 0 0; color: #64748b; font-size: 13px;">Aiclex Technologies</p>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #0f172a; padding: 35px 40px; text-align: center;">
            <p style="color: #94a3b8; font-size: 15px; margin: 0 0 20px 0; font-weight: 500;">Engineering Growth Through Custom Software</p>
            <div style="margin-bottom: 25px;">
              <a href="https://aiclex.in" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; margin: 0 12px; display: inline-block;">Website</a>
              <span style="color: #334155;">|</span>
              <a href="mailto:info@aiclex.in" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; margin: 0 12px; display: inline-block;">Email Us</a>
              <span style="color: #334155;">|</span>
              <a href="tel:+919871881183" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; margin: 0 12px; display: inline-block;">+91 98718 81183</a>
            </div>
            <p style="color: #475569; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Aiclex Technologies. All rights reserved.</p>
          </div>
        </div>
      `,
        };

        // Also send notification to Admin
        const adminMailOptions = {
            from: `"Aiclex System" <${process.env.SMTP_FROM || "info@aiclex.in"}>`,
            to: process.env.ADMIN_EMAIL || "info@aiclex.in",
            subject: `New Lead from Ads: ${projectType} from ${name}`,
            html: `
        <h3>New Lead Captured</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${projectType}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
        };

        // Wrap email sending in a promise so we don't block the UI if SMTP is slow
        Promise.all([
            transporter.sendMail(mailOptions).catch(err => console.error("Auto-responder error:", err)),
            transporter.sendMail(adminMailOptions).catch(err => console.error("Admin notification error:", err))
        ]);

        return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });

    } catch (error) {
        console.error("Error processing lead:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
