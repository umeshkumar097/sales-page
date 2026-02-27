import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <main style={{ padding: "120px 0 80px 0", backgroundColor: "var(--bg-primary)", minHeight: "80vh" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <h1 style={{ marginBottom: "2rem" }}>Privacy Policy</h1>

                    <div style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Last Updated: {new Date().toLocaleDateString()}
                        </p>
                        <p style={{ marginBottom: "1.5rem" }}>
                            At Aiclex Technologies ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (the "Site") or engage with our services.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>1. Information We Collect</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, phone number, and company name.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>2. How We Use Collected Information</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Aiclex Technologies collects and uses personal information to respond to your customer service requests, send periodic emails (like proposals or educational materials), and to improve our website based on the information and feedback we receive from you.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>3. Data Protection</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>4. Third-Party Websites & Services</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            We do not sell, trade, or rent Users personal identification information to others. We may use third-party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>5. Contacting Us</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <br/><br/>
                            <strong>Aiclex Technologies</strong><br/>
                            Email: info@aiclex.in<br/>
                            Phone: +91 98718 81183
                        </p>

                        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                            <Link href="/" className="btn btn-secondary">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
