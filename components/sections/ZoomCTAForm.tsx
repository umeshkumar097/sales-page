"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./CTAForm.module.css";

interface ZoomCTAFormProps {
    isHero?: boolean;
}

export default function ZoomCTAForm({ isHero = false }: ZoomCTAFormProps) {
    const router = useRouter();
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("submitting");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            leadType: "Zoom", // Hardcode the lead type for the backend
            name: formData.get("name"),
            company: formData.get("company"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            projectType: formData.get("licenseQuantity") + " Zoom Licenses", // Use projectType field to store license count for now to avoid DB changes, or we can just send it
            message: formData.get("message"),
            consent: formData.get("consent") === "on",
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to submit request.");

            // Google Ads Conversion Tracking (Fires on successful submission)
            if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-11514904878/FGD0CIyNyLwaEK6C3vIq'
                });
            }

            // Meta Pixel Lead Tracking
            if (typeof window !== 'undefined' && typeof (window as any).fbq !== 'undefined') {
                (window as any).fbq('track', 'Lead');
            }

            setFormStatus("success");
            router.push("/thank-you"); // Redirect to thank you page
        } catch (error) {
            console.error(error);
            setFormStatus("error");
            setErrorMessage("There was a problem submitting your request. Please try again or contact us directly.");
        }
    };

    const formContent = (
        <div className={`glass ${styles.formBox} ${isHero ? styles.heroFormBox : ''}`} style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
            {formStatus === "success" ? (
                <div className={styles.successMessage}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>Inquiry Sent Successfully!</h3>
                    <p>Our Zoom Licensing Team will contact you within 24 hours with a custom quote.</p>
                    <button className="btn btn-secondary" onClick={() => setFormStatus("idle")}>
                        Submit Another Request
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h3>Get Discounted Zoom Pricing</h3>
                    <p className="text-muted" style={{ marginBottom: "2rem", fontSize: "0.9rem" }}>
                        Fill out the details below to receive a custom B2B quote with GST invoicing.
                    </p>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" required placeholder="John Doe" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="company">Company Name</label>
                            <input type="text" id="company" name="company" required placeholder="Acme Corp" />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email">Work Email</label>
                            <input type="email" id="email" name="email" required placeholder="john@company.com" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required placeholder="+91 98765 43210" />
                        </div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="licenseQuantity">Expected License Quantity</label>
                        <select id="licenseQuantity" name="licenseQuantity" required defaultValue="">
                            <option value="" disabled>Select approximate quantity...</option>
                            <option value="1-9">1 to 9 Licenses (Pro/Business)</option>
                            <option value="10-49">10 to 49 Licenses</option>
                            <option value="50-99">50 to 99 Licenses</option>
                            <option value="100+">100+ Licenses (Enterprise)</option>
                            <option value="Webinar/Events">Zoom Webinars / Events Only</option>
                        </select>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="message">Any Specific Requirements?</label>
                        <textarea id="message" name="message" rows={3} placeholder="E.g., Need Zoom Rooms, specific add-ons, or API integration..."></textarea>
                    </div>

                    <div className={styles.checkboxWrapper}>
                        <input type="checkbox" id="consent" name="consent" required />
                        <label htmlFor="consent">
                            I agree to the <Link href="/terms" target="_blank" className="text-gradient">Terms & Conditions</Link>.
                        </label>
                    </div>

                    {formStatus === "error" && (
                        <div className={styles.errorMessage}>{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className={`btn btn-primary ${styles.submitBtn}`}
                        disabled={formStatus === "submitting"}
                        style={{ background: 'linear-gradient(135deg, #2D8CFF 0%, #0050E6 100%)', boxShadow: '0 4px 14px 0 rgba(45, 140, 255, 0.4)' }}
                    >
                        {formStatus === "submitting" ? "Sending Request..." : "Request Zoom Quote"}
                    </button>
                </form>
            )}
        </div>
    );

    if (isHero) {
        return formContent;
    }

    return (
        <section className={`section ${styles.ctaSection}`} id="contact">
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    {/* Left: Copy */}
                    <div className={styles.contentColumn}>
                        <h2>Ready To Upgrade Your <span style={{ color: '#2D8CFF' }}>Communications?</span></h2>
                        <p className="text-muted">
                            Stop paying international credit card fees. Let Aiclex handle your Zoom licensing 
                            with official GST invoices and priority Indian support.
                        </p>

                        <div className={styles.urgencyBox} style={{ background: 'rgba(45, 140, 255, 0.1)', borderColor: 'rgba(45, 140, 255, 0.2)' }}>
                            <div className={styles.pulseDot} style={{ backgroundColor: '#2D8CFF', boxShadow: '0 0 0 0 rgba(45, 140, 255, 0.7)' }}></div>
                            <p><strong>Fast Processing:</strong> We typically process and activate new licenses within 4-6 business hours of payment.</p>
                        </div>

                        <ul className={styles.checklist}>
                            <li>✓ Official GST Tax Invoices</li>
                            <li>✓ Pay via NEFT/RTGS or UPI</li>
                            <li>✓ Direct Partner Discounts</li>
                        </ul>

                        <div className={styles.contactInfo}>
                            <div>
                                <p className="text-muted">Partner Email</p>
                                <strong>info@aiclex.in</strong>
                            </div>
                            <div>
                                <p className="text-muted">Sales Team</p>
                                <strong>+91 98718 81183</strong>
                            </div>
                        </div>
                    </div>

                    {/* Right: Lead Form */}
                    {formContent}
                </div>

            </div>
        </section>
    );
}
