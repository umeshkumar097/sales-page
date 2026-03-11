import styles from "./WebProcess.module.css";

const steps = [
    {
        num: "01",
        title: "Strategic Discovery",
        desc: "We analyze your business goals, target audience, and competitors to define the exact site architecture and conversion funnels."
    },
    {
        num: "02",
        title: "Wireframing & UI Design",
        desc: "We create high-fidelity Figma mockups, establishing your brand's visual identity, typography, and interactive hover states."
    },
    {
        num: "03",
        title: "Frontend Engineering",
        desc: "Our developers translate the designs into pixel-perfect React/Next.js code, ensuring lightning-fast load times and smooth animations."
    },
    {
        num: "04",
        title: "Backend & CMS Integration",
        desc: "We wire up APIs, secure databases, and set up your Headless CMS so your team can manage content easily."
    },
    {
        num: "05",
        title: "Launch & SEO Optimization",
        desc: "We conduct 50-point QA testing, configure Vercel Edge Hosting, submit XML sitemaps, and push the site live to the world."
    }
];

export default function WebProcess() {
    return (
        <section className={`section ${styles.processSection}`} id="process">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Our Methodology</div>
                    <h2>The Web Development <span className="text-gradient">Process</span></h2>
                    <p className="text-muted">A clear, transparent roadmap from the initial wireframe to the final deployment.</p>
                </div>

                <div className={styles.timeline}>
                    {steps.map((step, idx) => (
                        <div key={idx} className={styles.timelineItem}>
                            <div className={styles.timelineMarker}>
                                <div className={styles.markerDot}></div>
                            </div>
                            <div className={`glass ${styles.contentBox}`}>
                                <div className={styles.stepNum}>{step.num}</div>
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
