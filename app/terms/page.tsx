import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function TermsAndConditions() {
    return (
        <>
            <Header />
            <main style={{ padding: "120px 0 80px 0", backgroundColor: "var(--bg-primary)", minHeight: "80vh" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <h1 style={{ marginBottom: "2rem" }}>Terms & Conditions</h1>

                    <div style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Welcome to Aiclex Technologies. By accessing our website and utilizing our services, you agree to comply with and be bound by the following terms and conditions.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>1. Services</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Aiclex Technologies providing software development, website design, mobile application development, and AI automation services. The specific scope of work will be outlined in a separate Statement of Work (SOW) or project proposal.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>2. Data Collection & Privacy</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            When you submit an inquiry through our lead capture forms, we collect your Name, Email, Phone Number, and Company details. This information is strictly used by Aiclex Technologies to contact you regarding your project inquiry. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Address: [Your Verified Business Address], Contact: +91 98718 81183, Email: info@aiclex.in.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>3. Communication</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            By submitting your contact information, you consent to receive communication from our technical team via email or phone regarding your inquiry and potential project development.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2rem", marginBottom: "1rem" }}>4. Refund & Cancellation Policy</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Payments made for development services are non-refundable once the project phase (as outlined in the SOW) has commenced. If a project is cancelled prior to commencement, a refund may be issued minus any administrative or consultative fees incurred.
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
