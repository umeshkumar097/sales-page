"use client";

import styles from "./Partners.module.css";

export default function Partners() {
    const partnersList = [
        { name: "Meta", domain: "meta.com" },
        { name: "Google Ads", domain: "google.com" },
        { name: "LinkedIn", domain: "linkedin.com" },
        { name: "Amazon Ads", domain: "amazon.com" },
        { name: "TikTok Ads", domain: "tiktok.com" },
        { name: "Adobe", domain: "adobe.com" },
        { name: "Twitter", domain: "twitter.com" },
        { name: "Zoom", domain: "zoom.us" },
        { name: "Google Cloud", domain: "cloud.google.com" },
        { name: "Microsoft", domain: "microsoft.com" },
        { name: "AWS", domain: "aws.amazon.com" }
    ];

    return (
        <section className={`section ${styles.partners}`} id="partners">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>Official Partners</div>
                    <h2>Our <span className="text-gradient">Partners</span></h2>
                    <p className="text-muted">
                        We collaborate with the best technology and advertising platforms in the industry.
                    </p>
                </div>

                <div className={styles.grid}>
                    {partnersList.map((partner, index) => (
                        <div key={index} className={`glass ${styles.card}`} data-aos="fade-up" data-aos-delay={index * 50}>
                            <img 
                                src={`https://logo.clearbit.com/${partner.domain}`} 
                                alt={partner.name}
                                className={styles.logo}
                                onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=ffffff&color=2563eb&bold=true`;
                                    e.currentTarget.className = `${styles.logo} ${styles.fallbackLogo}`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
