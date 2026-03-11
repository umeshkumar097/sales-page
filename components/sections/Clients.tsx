import styles from "./Clients.module.css";

export default function Clients() {
    const clientsList = [
        "Shoolini University",
        "Aditech ICT Pvt. Ltd.",
        "Total Solutions",
        "CRUX Management Services (P) Ltd.",
        "SANNAM S4 GROUP",
        "Clever Personal Branding",
        "Plum insight",
        "infedis INFOTECH",
        "RC CONSULTANCY",
        "PSM"
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
                            <h3>{client}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
