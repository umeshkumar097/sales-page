import styles from "./WhyChoose.module.css";

export default function WhyChoose() {
    const reasons = [
        { title: "8+ Years Experience", desc: "Proven track record of delivering successful digital products globally." },
        { title: "50+ Projects Delivered", desc: "From corporate sites to complex SaaS platforms, we've built it all." },
        { title: "Dedicated Expert Team", desc: "In-house senior developers, not freelancers or outsourced juniors." },
        { title: "On-Time Delivery", desc: "Agile methodologies ensure we hit our milestones precisely on schedule." },
        { title: "SEO Optimized Code", desc: "We build with search engines in mind, ensuring high visibility." },
        { title: "Ongoing Support", desc: "We don't disappear after launch. We offer continuous maintenance." },
    ];

    return (
        <section className={`section ${styles.whyChoose}`} id="why-choose">
            <div className="container">

                <div className={styles.grid}>
                    <div className={styles.contentColumn} data-aos="fade-right">
                        <div className={styles.tag}>Why Us</div>
                        <h2>The Unfair Advantage: <span className="text-gradient">Aiclex Technologies</span></h2>
                        <p className="text-muted">
                            We aren't just order-takers. We act as your fractional CTO and technical partner,
                            ensuring every line of code contributes directly to your bottom line.
                            Here is what sets us apart from regular agencies.
                        </p>

                        <div className={styles.guaranteeBox}>
                            <div className={styles.shield}>🛡️</div>
                            <div>
                                <h4>Our Iron-Clad Guarantee</h4>
                                <p>Performance-Driven Development or Revision Until Satisfaction. Period.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reasonsGrid}>
                        {reasons.map((reason, index) => (
                            <div key={index} className={styles.reasonCard} data-aos="fade-left" data-aos-delay={index * 100}>
                                <div className={styles.checkIcon}>✓</div>
                                <div>
                                    <h4>{reason.title}</h4>
                                    <p className="text-muted">{reason.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
