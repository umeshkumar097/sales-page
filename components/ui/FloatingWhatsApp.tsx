import Link from "next/link";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
    // Replace with actual WhatsApp number
    const phoneNumber = "919876543210";
    const message = encodeURIComponent("Hi Aiclex Technologies! I'm interested in building a high-performance digital asset.");

    return (
        <>
            <Link
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappFloat}
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 32 32" className={styles.whatsappIcon}>
                    <path d="M16 2a13 13 0 00-11 20.3L3.2 29l6.9-1.8A12.9 12.9 0 0016 28a13 13 0 100-26zm0 23.5c-2 0-4-.5-5.8-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4A10.6 10.6 0 1116 25.5zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.1 1.2.2.3.9.4.9.4s.2 0 1.2-.6 2.1-1.3 3.5-3.3c.3-.4-.1-.6-.2-.7z" fill="currentColor" />
                    <path d="M11 11.5c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.4 0-.6.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.7.7 2.4.7 3.2.6.8-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4z" fill="currentColor" />
                </svg>
            </Link>

            {/* Mobile Sticky CTA */}
            <div className={styles.mobileStickyCta}>
                <Link href="#contact" className="btn btn-primary" style={{ width: '100%', borderRadius: 0, padding: '1rem' }}>
                    Get Free Proposal Within 24 Hours
                </Link>
            </div>
        </>
    );
}
