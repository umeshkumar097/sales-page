import styles from "./Partners.module.css";

const LogoItem = ({ partner }: { partner: { name: string, domain: string } }) => {
    // Generate deterministic colors based on company name
    const colors = [
        { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' }, // Blue
        { bg: 'rgba(220, 38, 38, 0.15)', text: '#ef4444' },   // Red
        { bg: 'rgba(22, 163, 74, 0.15)', text: '#22c55e' },   // Green
        { bg: 'rgba(192, 38, 211, 0.15)', text: '#d946ef' },  // Fuchsia
        { bg: 'rgba(217, 119, 6, 0.15)', text: '#f59e0b' },   // Amber
        { bg: 'rgba(147, 51, 234, 0.15)', text: '#a855f7' },  // Purple
        { bg: 'rgba(8, 145, 178, 0.15)', text: '#06b6d4' }    // Cyan
    ];
    
    // Simple string hash
    let hash = 0;
    for (let i = 0; i < partner.name.length; i++) {
        hash = partner.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    const color = colors[colorIndex];

    const initials = partner.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    return (
        <div className={styles.cssFallback}>
            <div className={styles.initialsBg} style={{ backgroundColor: color.bg, color: color.text }}>
                {initials}
            </div>
            <span className={styles.fallbackText}>{partner.name}</span>
        </div>
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
