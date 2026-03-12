import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { leadType, name, company, email, phone, projectType, message, budget, source } = body;

        if (!name || !email || !phone || !projectType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // --- SPAM PROTECTION & VALIDATION ---
        const spamPattern = /(http|https|www\.|<a href|\[url|\[link|<script|import java|public class|extends AppCompatActivity)/i;
        const codeCharPattern = /[{}[\]<>;]/g;
        
        // 1. Check if message contains known spam patterns (URLs, HTML tags, common bot payloads)
        if (message && spamPattern.test(message)) {
             console.warn(`Spam blocked (Pattern Match) from ${email}`);
             return NextResponse.json({ error: "Invalid content detected. Please remove any links or code snippets." }, { status: 400 });
        }

        // 2. Check if the message contains an unusually high amount of code characters ({, }, <, >, ;, [, ])
        if (message) {
            const codeCharMatches = message.match(codeCharPattern);
            // If more than 5 code-like characters are found, it's likely a script/code injection payload
            if (codeCharMatches && codeCharMatches.length > 5) {
                console.warn(`Spam blocked (Code Injection) from ${email}`);
                return NextResponse.json({ error: "Invalid formatting detected. Please write a normal text message." }, { status: 400 });
            }
        }
        
        // 3. Prevent names from having URLs/Code
        if (spamPattern.test(name)) {
            console.warn(`Spam blocked (Invalid Name) from ${email}`);
             return NextResponse.json({ error: "Invalid name format." }, { status: 400 });
        }
        // --- END SPAM PROTECTION ---

        // --- AI LEAD SCORING ---
        const calculateLeadScore = (budgetStr: string | undefined, messageStr: string | undefined) => {
            let points = 0;
            
            // High budget gives more points
            if (budgetStr) {
                if (budgetStr.includes("5L") || budgetStr.includes("5 Lakh")) points += 3;
                else if (budgetStr.includes("1L") || budgetStr.includes("2L")) points += 2;
                else points += 1; // 25k-50k
            }

            // Longer, detailed messages show higher intent
            if (messageStr && messageStr.length > 50) points += 1;
            if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) {
                // Free email domains get standard points, business domains get bonus
            } else {
                points += 1; // Bonus for corporate email
            }

            if (points >= 3) return "🔥 Hot";
            if (points === 2) return "🟡 Warm";
            return "❄️ Cold";
        };

        const aiLeadScore = calculateLeadScore(budget, message);
        const actualSource = source || "Website Organic";

        // 1. Save to Database
        const lead = await prisma.lead.create({
            data: {
                leadType: leadType || "General",
                name,
                company: company || null,
                email,
                phone,
                projectType,
                message: message || null,
                budget: budget || null,
                source: actualSource,
                score: aiLeadScore,
                status: "New Lead"
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
            subject: `New Lead [${leadType || "General"}]: ${projectType} from ${name}`,
            html: `
        <h3>New Lead Captured (${leadType || "General"})</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget || "Not Disclosed"}</p>
        <p><strong>Source:</strong> ${actualSource}</p>
        <p><strong>AI Score:</strong> ${aiLeadScore}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
        };

        // 3. Send WhatsApp Admin Notification
        const sendWhatsAppAdmin = async () => {
            const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
            const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || "919871881183";
            
            if (!WHATSAPP_PHONE_ID || !WHATSAPP_ACCESS_TOKEN) return;
            
            try {
                const whatsappMessage = `*New Lead Captured [${aiLeadScore}]* 🚀\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${projectType}\n*Budget:* ${budget || "N/A"}\n*Source:* ${actualSource}\n*Message:* ${message || "N/A"}`;
                
                await fetch(`https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messaging_product: "whatsapp",
                        recipient_type: "individual",
                        to: ADMIN_WHATSAPP_NUMBER,
                        type: "text",
                        text: {
                            preview_url: false,
                            body: whatsappMessage
                        }
                    })
                });
            } catch (err) {
                console.error("WhatsApp Admin Request Error:", err);
            }
        };

        // 4. Send WhatsApp Client Auto-Responder (Direct Text Message instead of Template)
        const sendWhatsAppClient = async () => {
            const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
            const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            
            if (!WHATSAPP_PHONE_ID || !WHATSAPP_ACCESS_TOKEN || !phone) return;
            
            try {
                // Clean the phone number (remove +, spaces, brackets, dashes)
                const cleanPhone = phone.replace(/\D/g, ''); 
                
                const clientAutoReply = `Hi ${name},\n\nThank you for contacting Aiclex Technologies.\n\nOur team will review your requirement for *${projectType}*.\nWe will contact you shortly.\n\nYou can also schedule a call directly with our team here:\nhttps://m.aiclex.in/#contact`;

                await fetch(`https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messaging_product: "whatsapp",
                        recipient_type: "individual",
                        to: cleanPhone,
                        type: "text",
                        text: {
                            preview_url: true,
                            body: clientAutoReply
                        }
                    })
                });
            } catch (err) {
                console.error("WhatsApp Client Request Error:", err);
            }
        };

        // Wrap email and whatsapp sending in a promise so we don't block the UI if API is slow
        Promise.all([
            transporter.sendMail(mailOptions).catch(err => console.error("Auto-responder error:", err)),
            transporter.sendMail(adminMailOptions).catch(err => console.error("Admin notification error:", err)),
            sendWhatsAppAdmin(),
            sendWhatsAppClient()
        ]);

        return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });

    } catch (error) {
        console.error("Error processing lead:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
