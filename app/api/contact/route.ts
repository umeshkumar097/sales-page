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
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0B0F19; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          <!-- Header Area -->
          <div style="background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%); padding: 40px 30px; text-align: center; border-bottom: 2px solid #3b82f6;">
            <!-- Attempting to load logo from domain, fallback to stylized text -->
            <img src="https://aiclex.in/logo.png" alt="Aiclex Technologies" style="max-height: 50px; margin-bottom: 10px;" onerror="this.onerror=null;this.outerHTML='<h1 style=\\'color:#fff;margin:0;font-size:28px;letter-spacing:1px;\\'>AICLEX</h1>';" />
          </div>
          
          <!-- Body Area -->
          <div style="padding: 40px 30px; background-color: #ffffff;">
            <h2 style="color: #1e293b; font-size: 24px; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">Thank you so much for reaching out to us! We are thrilled to connect with you.</p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #334155; font-size: 15px;">We have successfully received your inquiry regarding <strong>${projectType}</strong>.</p>
            </div>

            <p style="color: #475569; font-size: 16px; line-height: 1.6;">One of our senior technical consultants is currently reviewing your project requirements. We will analyze your needs and connect with you within the next <strong>24 hours</strong> to discuss a tailored strategy and the next steps.</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 35px;">
              <tr>
                <td>
                  <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">Best Regards,</p>
                  <p style="color: #3b82f6; font-size: 18px; font-weight: bold; margin: 5px 0 0 0;">Team Aiclex Technologies</p>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Footer Area -->
          <div style="background-color: #f1f5f9; padding: 25px 30px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0;">Transforming Businesses Through Code & AI.</p>
            <a href="https://aiclex.in" style="color: #3b82f6; text-decoration: none; font-weight: 600;">www.aiclex.in</a> 
            <span style="color: #cbd5e1; margin: 0 8px;">|</span>
            <a href="mailto:info@aiclex.in" style="color: #3b82f6; text-decoration: none; font-weight: 600;">info@aiclex.in</a>
            <span style="color: #cbd5e1; margin: 0 8px;">|</span>
            <span style="color: #475569; font-weight: 600;">+91 98718 81183</span>
          </div>
        </div>
      `,
        };

        // Also send notification to Admin
        const adminMailOptions = {
            from: `"Aiclex System" <${process.env.SMTP_FROM || "info@aiclex.in"}>`,
            to: process.env.ADMIN_EMAIL || "info@aiclex.in",
            subject: `New Lead Alert: ${projectType} from ${name}`,
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
