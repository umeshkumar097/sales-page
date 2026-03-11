"use client";

import { useState } from "react";
import styles from "./Partners.module.css";

const LogoItem = ({ partner }: { partner: { name: string, domain: string } }) => {
    const [errorLevel, setErrorLevel] = useState(0);

    if (errorLevel >= 2) {
        return (
            <div className={styles.cssFallback}>
                <div className={styles.initialsBg}>
                    {partner.name.substring(0, 2).toUpperCase()}
                </div>
                <span className={styles.fallbackText}>{partner.name}</span>
            </div>
        );
    }

    const src = errorLevel === 0 
        ? `https://logo.clearbit.com/${partner.domain}`
        : `https://icon.horse/icon/${partner.domain}`;

    return (
        <img 
            src={src} 
            alt={partner.name}
            className={errorLevel === 0 ? styles.logo : `${styles.logo} ${styles.faviconLogo}`}
            onError={() => setErrorLevel(prev => prev + 1)}
        />
    );
};

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
                            <LogoItem partner={partner} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
