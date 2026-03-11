import styles from "./Clients.module.css";

const LogoItem = ({ client }: { client: { name: string, domain: string } }) => {
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
    for (let i = 0; i < client.name.length; i++) {
        hash = client.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    const color = colors[colorIndex];

    const initials = client.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    return (
        <div className={styles.cssFallback}>
            <div className={styles.initialsBg} style={{ backgroundColor: color.bg, color: color.text }}>
                {initials}
            </div>
            <span className={styles.fallbackText}>{client.name}</span>
        </div>
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
