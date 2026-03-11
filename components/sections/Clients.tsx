"use client";

import { useState } from "react";
import styles from "./Clients.module.css";

const LogoItem = ({ client }: { client: { name: string, domain: string } }) => {
    const [errorLevel, setErrorLevel] = useState(0);

    // Fallback 1: icon.horse (often bypasses adblockers and guarantees favicons)
    // Fallback 2: CSS Initial fallback
    
    if (errorLevel >= 2) {
        return (
            <div className={styles.cssFallback}>
                <div className={styles.initialsBg}>
                    {client.name.substring(0, 2).toUpperCase()}
                </div>
                <span className={styles.fallbackText}>{client.name}</span>
            </div>
        );
    }

    const src = errorLevel === 0 
        ? `https://logo.clearbit.com/${client.domain}`
        : `https://icon.horse/icon/${client.domain}`;

    return (
        <img 
            src={src} 
            alt={client.name}
            className={errorLevel === 0 ? styles.logo : `${styles.logo} ${styles.faviconLogo}`}
            onError={() => setErrorLevel(prev => prev + 1)}
        />
    );
};

export default function Clients() {
    const clientsList = [
        { name: "Shoolini University", domain: "shooliniuniversity.com" },
        { name: "Aditech ICT Pvt. Ltd.", domain: "aditech.in" },
        { name: "Total Solutions", domain: "totalsolutions.in" },
        { name: "CRUX Management Services", domain: "cruxmanagement.com" },
        { name: "Sannam S4 Group", domain: "sannams4.com" },
        { name: "Clever", domain: "clever.in" },
        { name: "Plum Insight", domain: "pluminsight.com" },
        { name: "infedis INFOTECH", domain: "infedis.com" },
        { name: "RC Consultancy", domain: "rcconsultancy.in" },
        { name: "PSM", domain: "psm.com" }
    ];

    return (
        <section className={`section ${styles.clients}`} id="clients">
            <div className="container">
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>Trusted By</div>
                    <h2>Our <span className="text-gradient">Clients</span></h2>
                    <p className="text-muted">
                        We are proud to work with leading organizations and universities to drive their digital growth.
                    </p>
                </div>

                <div className={styles.grid}>
                    {clientsList.map((client, index) => (
                        <div key={index} className={`glass ${styles.card}`} data-aos="fade-up" data-aos-delay={index * 50}>
                            <LogoItem client={client} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
