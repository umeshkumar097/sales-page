import styles from "./Partners.module.css";

export default function Partners() {
    const partnersList = [
        "Meta Tech Provider",
        "Google Ads CERTIFIED",
        "LinkedIn Advertising",
        "Amazon Ads Verified partner",
        "TikTok Ads",
        "Adobe CERTIFIED RESELLER",
        "Twitter Advertising",
        "Zoom Authorized Reseller",
        "Google Cloud",
        "Microsoft",
        "AWS"
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
                            <h3>{partner}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
