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
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Aiclex Technologies" <${process.env.SMTP_USER}>`,
            to: email, // send to the user who filled the form
            subject: "Thank You for Contacting Aiclex Technologies",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #3b82f6;">Hi ${name},</h2>
          <p>Thank you so much for reaching out to us!</p>
          <p>We have successfully received your inquiry regarding <strong>${projectType}</strong>.</p>
          <p>One of our senior technical consultants is reviewing your requirements and we will connect with you within the next <strong>24 hours</strong> to discuss the next steps.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>Team Aiclex Technologies</strong></p>
          <small>
            <a href="https://aiclex.in" style="color: #3b82f6;">www.aiclex.in</a> | 
            <a href="mailto:info@aiclex.in" style="color: #3b82f6;">info@aiclex.in</a> | 
            +91 98718 81183
          </small>
        </div>
      `,
        };

        // Also send notification to Admin
        const adminMailOptions = {
            from: `"Aiclex System" <${process.env.SMTP_USER}>`,
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
