"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./CTAForm.module.css";

interface CTAFormProps {
    isHero?: boolean;
}

export default function CTAForm({ isHero = false }: CTAFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("submitting");
        setErrorMessage("");

        // Determine Lead Type based on current URL path
        let resolvedLeadType = "General";
        if (pathname.includes("/web-development")) {
            resolvedLeadType = "Web";
        } else if (pathname.includes("/mobile-app-development")) {
            resolvedLeadType = "Mobile";
        } else if (pathname.includes("/zoom-reseller")) {
            resolvedLeadType = "Zoom";
        }

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            company: formData.get("company"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            projectType: formData.get("service"),
            message: formData.get("message"),
            leadType: resolvedLeadType,
            consent: formData.get("consent") === "on",
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to submit request.");

            setFormStatus("success");
            router.push("/thank-you"); // Redirect to thank you page
        } catch (error) {
            console.error(error);
            setFormStatus("error");
            setErrorMessage("There was a problem submitting your request. Please try again or contact us directly.");
        }
    };

    const formContent = (
        <div className={`glass ${styles.formBox} ${isHero ? styles.heroFormBox : ''}`}>
            {formStatus === "success" ? (
                <div className={styles.successMessage}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>Request Sent Successfully!</h3>
                    <p>One of our senior technical consultants will be in touch within 24 hours.</p>
                    <button className="btn btn-secondary" onClick={() => setFormStatus("idle")}>
                        Send Another Request
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h3>Request Your Free Proposal</h3>
                    <p className="text-muted" style={{ marginBottom: "2rem", fontSize: "0.9rem" }}>
                        Fill out the form below to get started.
                    </p>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" required placeholder="John Doe" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="company">Company Name</label>
                            <input type="text" id="company" name="company" placeholder="Acme Corp" />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required placeholder="john@example.com" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="service">Project Type</label>
                        <select id="service" name="service" required defaultValue="">
                            <option value="" disabled>Select a service...</option>
                            <option value="website">Website Development</option>
                            <option value="android">Android App Development</option>
                            <option value="ios">iOS App Development</option>
                            <option value="web-app">Custom Web Application</option>
                            <option value="ai-automation">AI Automation</option>
                        </select>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label htmlFor="message">Project Details</label>
                        <textarea id="message" name="message" rows={4} placeholder="Briefly describe your project goals..."></textarea>
                    </div>

                    <div className={styles.checkboxWrapper}>
                        <input type="checkbox" id="consent" name="consent" required />
                        <label htmlFor="consent">
                            I agree to the <Link href="/terms" target="_blank" className="text-gradient">Terms & Conditions</Link> and consent to being contacted by Aiclex Technologies regarding my inquiry.
                        </label>
                    </div>

                    {formStatus === "error" && (
                        <div className={styles.errorMessage}>{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className={`btn btn-primary ${styles.submitBtn}`}
                        disabled={formStatus === "submitting"}
                    >
                        {formStatus === "submitting" ? "Sending Request..." : "Get Free Proposal Within 24 Hours"}
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
                        <h2>Ready To Build A High-Performance <span className="text-gradient">Digital Asset?</span></h2>
                        <p className="text-muted">
                            Whether you need a lead-gen website, a complex SaaS product, or a native mobile app,
                            Aiclex Technologies is ready to build it.
                        </p>

                        <div className={styles.urgencyBox}>
                            <div className={styles.pulseDot}></div>
                            <p><strong>Limited Slots Available:</strong> We take only 5 new projects per month to ensure premium quality. Secure your spot now.</p>
                        </div>

                        <ul className={styles.checklist}>
                            <li>✓ Book Free Strategy Call</li>
                            <li>✓ Get Custom Quote Within 24h</li>
                            <li>✓ No Commitment Required</li>
                        </ul>

                        <div className={styles.contactInfo}>
                            <div>
                                <p className="text-muted">Email Us</p>
                                <strong>info@aiclex.in</strong>
                            </div>
                            <div>
                                <p className="text-muted">Call Us</p>
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
