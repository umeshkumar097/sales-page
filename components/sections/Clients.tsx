import styles from "./Clients.module.css";

export default function Clients() {
    const clientsList = [
        { name: "Shoolini University", domain: "shooliniuniversity.com" },
        { name: "Aditech ICT Pvt. Ltd.", domain: "aditech.in" },
        { name: "Total Solutions", domain: "totalsolutions.in" },
        { name: "CRUX Management Services (P) Ltd.", domain: "cruxmanagement.com" },
        { name: "Sannam S4 Group", domain: "sannams4.com" },
        { name: "Clever Personal Branding", domain: "clever.in" },
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
                            <img 
                                src={`https://logo.clearbit.com/${client.domain}`} 
                                alt={client.name}
                                className={styles.logo}
                                onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=ffffff&color=2563eb&bold=true`;
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
