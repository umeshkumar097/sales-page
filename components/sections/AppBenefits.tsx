import styles from "./AppBenefits.module.css";

const benefits = [
    {
        icon: "📈",
        title: "New Revenue Channels",
        desc: "Unlock direct-to-consumer monetization through in-app purchases, targeted mobile ads, and recurring subscription models."
    },
    {
        icon: "🔥",
        title: "Boost Customer Loyalty",
        desc: "Keep your brand directly in your customer's pocket 24/7. Use push notifications and loyalty programs to drive repeat business."
    },
    {
        icon: "⚡",
        title: "Unmatched Performance",
        desc: "Mobile apps load faster, operate offline, and utilize native device hardware (cameras, GPS) for a seamless user experience that websites can't match."
    }
];

export default function AppBenefits() {
    return (
        <section className={`section ${styles.benefitsSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Why Build An App?</div>
                    <h2>Scale Your Reach With A <span className="text-gradient">Native Mobile App</span></h2>
                    <p className="text-muted">A website brings you awareness, but a mobile app brings you retention and dedicated revenue streams.</p>
                </div>

                <div className={styles.grid}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className={`glass ${styles.benefitCard}`}>
                            <div className={styles.iconBox}>{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p className="text-muted">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
