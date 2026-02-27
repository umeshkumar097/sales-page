import styles from "./Problem.module.css";

export default function Problem() {
    const painPoints = [
        {
            title: "Outdated Websites Losing Customers",
            desc: "First impressions matter. A dated design signals a business that's behind the curve.",
            icon: "📉"
        },
        {
            title: "Slow Loading Times",
            desc: "Every second of delay reduces conversions by 7%. Google penalizes slow websites.",
            icon: "⏱️"
        },
        {
            title: "Not Mobile Optimized",
            desc: "With 60%+ web traffic coming from phones, a broken mobile layout bleeds leads.",
            icon: "📱"
        },
        {
            title: "No Scalable Backend",
            desc: "As your business grows, your systems crash, bringing operations to a halt.",
            icon: "⚙️"
        },
        {
            title: "No Automation",
            desc: "Still doing manual data entry? You're wasting thousands of hours annually.",
            icon: "🤖"
        },
        {
            title: "Poor UI/UX Design",
            desc: "Users get frustrated and leave before completing a purchase or inquiry.",
            icon: "🧩"
        }
    ];

    return (
        <section className={`section ${styles.problem}`} id="problem">
            <div className="container">

                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>The Reality Check</div>
                    <h2>Why Your Current Digital Presence is <span className="text-gradient">Costing You Money</span></h2>
                    <p className="text-muted">
                        The digital landscape is ruthless. If your tech stack isn't an asset, it's a liability.
                        Are you making these common mistakes?
                    </p>
                </div>

                <div className={styles.grid}>
                    {painPoints.map((point, index) => (
                        <div key={index} className={`glass ${styles.card}`} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.icon}>{point.icon}</div>
                            <h3>{point.title}</h3>
                            <p className="text-muted">{point.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
