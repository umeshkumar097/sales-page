import styles from "./Testimonials.module.css";

export default function Testimonials() {
    const testimonials = [
        {
            text: "Aiclex Technologies completely revamped our outdated CRM. The new custom web app they built saves us 20 hours a week in manual data entry. Exceptional work.",
            name: "Ravi Sharma",
            company: "TechSys Solutions",
            role: "Operations Director"
        },
        {
            text: "We needed a mobile-first e-commerce store built from scratch. Their team delivered exactly on time, and our conversion rate jumped by 40% in the first month.",
            name: "Sarah Jenkins",
            company: "Luxe Retail",
            role: "CEO & Founder"
        },
        {
            text: "Highly professional and skilled team. They understood our complex requirements for a fintech MVP and executed it flawlessly with top-tier security measures.",
            name: "Amit Patel",
            company: "FinWealth Analytics",
            role: "Co-Founder"
        }
    ];

    return (
        <section className={`section ${styles.testimonials}`} id="testimonials">
            <div className="container">

                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>Client Satisfaction</div>
                    <h2>What Our Clients <span className="text-gradient">Say</span></h2>
                    <p className="text-muted">
                        Don't just take our word for it. Look at what business leaders are saying about their partnership with Aiclex.
                    </p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((test, index) => (
                        <div key={index} className={`glass ${styles.card}`} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.quoteMark}>"</div>
                            <p className={styles.text}>{test.text}</p>

                            <div className={styles.clientInfo}>
                                <div className={styles.avatar}>
                                    {test.name.charAt(0)}
                                </div>
                                <div>
                                    <h4>{test.name}</h4>
                                    <p className="text-muted">{test.role}, {test.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
