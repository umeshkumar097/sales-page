import Link from "next/link";
import styles from "./WebWhyUs.module.css";

export default function WebWhyUs() {
    const reasons = [
        {
            title: "Performance Obsidian",
            desc: "Every website we build scores 90+ on Google Lighthouse. We don't use heavy drag-and-drop builders; we use strict code (React/Next.js) for instant load times.",
            icon: "🚀"
        },
        {
            title: "Conversion-Focused Design",
            desc: "Beautiful is useless if it doesn't sell. Our UI/UX architects place every button, form, and header strategically to maximize your lead capture rates.",
            icon: "🎯"
        },
        {
            title: "Search Engine Dominance",
            desc: "Unlike standard websites that require extensive post-launch SEO work, our architecture ensures technical SEO compliance (Sitemaps, Core Web Vitals) natively.",
            icon: "📈"
        },
        {
            title: "Full Code Ownership",
            desc: "You are not locked into our proprietary system. We hand over the complete Git repository, domain rights, and server access. You own your business.",
            icon: "🔑"
        }
    ];

    return (
        <section className={`section ${styles.whyUsSection}`}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.contentCol}>
                        <div className={styles.tag}>The Aiclex Advantage</div>
                        <h2>Why Choose Us Over A <span className="text-gradient">Freelancer?</span></h2>
                        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Your website is the digital face of your multi-million dollar business. Don't trust it to cheap templates. Work with an engineering partner who understands business ROI.
                        </p>

                        <div className={styles.reasonsList}>
                            {reasons.map((r, i) => (
                                <div key={i} className={styles.reasonItem}>
                                    <div className={styles.icon}>{r.icon}</div>
                                    <div className={styles.reasonText}>
                                        <h4>{r.title}</h4>
                                        <p>{r.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="#contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                            Upgrade Your Website
                        </Link>
                    </div>

                    <div className={styles.visualCol}>
                        <div className={styles.statsCard}>
                            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Our Guarantee</h3>
                            <div className={styles.statRow}>
                                <div className={styles.statValue}>99.9%</div>
                                <div className={styles.statLabel}>Uptime SLA</div>
                            </div>
                            <div className={styles.statRow}>
                                <div className={styles.statValue}>&#60; 1s</div>
                                <div className={styles.statLabel}>Avg Page Load Time</div>
                            </div>
                            <div className={styles.statRow}>
                                <div className={styles.statValue}>100%</div>
                                <div className={styles.statLabel}>Code Ownership</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
