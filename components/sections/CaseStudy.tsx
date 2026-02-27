import styles from "./CaseStudy.module.css";

export default function CaseStudy() {
    const cases = [
        {
            metric: "+150%",
            metricDesc: "Increase in Leads",
            title: "B2B SaaS Lead Generation",
            desc: "Completely reconstructed the frontend architecture and user flow for a B2B SaaS company, resulting in a dramatic increase in qualified demo bookings."
        },
        {
            metric: "-65%",
            metricDesc: "Bounce Rate Reduction",
            title: "E-Commerce Optimization",
            desc: "Implemented server-side rendering and mobile-first responsive design, slicing page load times from 8s to 1.2s."
        },
        {
            metric: "4x",
            metricDesc: "ROI on Ad Spend",
            title: "Real Estate Landing Pages",
            desc: "Built high-converting, single-purpose landing pages tailored for Google Ads traffic in the luxury real estate sector."
        }
    ];

    return (
        <section className={`section ${styles.caseStudy}`} id="results">
            <div className="container">

                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>Proven Results</div>
                    <h2>We Don't Guess. <span className="text-gradient">We Measure.</span></h2>
                    <p className="text-muted">
                        Data-backed performance improvements across multiple industries.
                    </p>
                </div>

                <div className={styles.grid}>
                    {cases.map((caseItem, index) => (
                        <div key={index} className={`glass ${styles.card}`} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.metricWrapper}>
                                <h3>{caseItem.metric}</h3>
                                <span>{caseItem.metricDesc}</span>
                            </div>
                            <div className={styles.content}>
                                <h4>{caseItem.title}</h4>
                                <p className="text-muted">{caseItem.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
