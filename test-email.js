const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

async function testEmail() {
    console.log("Testing SMTP connection to Brevo...");
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        // Verify connection configuration
        await transporter.verify();
        console.log("✅ Verified: Server is ready to take our messages");

        // Try sending a test email
        const info = await transporter.sendMail({
            from: `"Aiclex System Test" <${process.env.SMTP_FROM || "info@aiclex.in"}>`,
            to: process.env.ADMIN_EMAIL || "info@aiclex.in",
            subject: "Test Email from Aiclex Application",
            text: "This is a test email to verify that the SMTP configuration is working correctly.",
            html: "<b>This is a test email to verify that the SMTP configuration is working correctly.</b>",
        });

        console.log("✅ Email sent successfully! Message ID: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error testing email system:", error);
    }
}

testEmail();
