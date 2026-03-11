import styles from "./WebBenefits.module.css";

const benefits = [
    {
        icon: "🚀",
        title: "Skyrocket Conversions",
        desc: "Stop losing traffic to bad design. We build high-converting landing pages optimized for maximum ROI on your ad spend."
    },
    {
        icon: "🔍",
        title: "Dominate Search Rankings",
        desc: "Every website is built with a flawless technical SEO foundation, blazing fast load times, and structured data to rank higher on Google."
    },
    {
        icon: "🛡️",
        title: "Unbreakable Security",
        desc: "Protect your customer data with enterprise-grade SSL encryption, secure API endpoints, and bulletproof web application firewalls."
    }
];

export default function WebBenefits() {
    return (
        <section className={`section ${styles.benefitsSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Why Upgrade Your Web Presence?</div>
                    <h2>Your Website Is Your <span className="text-gradient">Best Salesperson</span></h2>
                    <p className="text-muted">A modern, hyper-fast web application doesn't just look good—it actively generates leads, closes sales, and builds brand authority 24/7.</p>
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
