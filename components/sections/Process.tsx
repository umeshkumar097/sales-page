import styles from "./Process.module.css";

export default function Process() {
    const steps = [
        { num: "01", title: "Requirement Analysis", desc: "Understanding your business goals, target audience, and functional requirements." },
        { num: "02", title: "Strategy & Planning", desc: "Mapping out the architecture, user journey, and technology stack for scale." },
        { num: "03", title: "UI/UX Design", desc: "Crafting a high-converting, intuitive, and modern interface." },
        { num: "04", title: "Development", desc: "Writing clean, secure, and SEO-optimized code tailored to your needs." },
        { num: "05", title: "Testing & Optimization", desc: "Rigorous QA testing for bugs, performance, and cross-device compatibility." },
        { num: "06", title: "Launch & Support", desc: "Seamless deployment followed by ongoing maintenance and iteration." }
    ];

    return (
        <section className={`section ${styles.process}`} id="process">
            <div className="container">

                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>Methodology</div>
                    <h2>Our 6-Step Engineered <span className="text-gradient">Process</span></h2>
                    <p className="text-muted">
                        A battle-tested framework ensuring on-time delivery without compromising on quality.
                    </p>
                </div>

                <div className={styles.timeline}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.number}>{step.num}</div>
                            <div className={styles.content}>
                                <h3>{step.title}</h3>
                                <p className="text-muted">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
