import styles from "./AppProcess.module.css";

const steps = [
    {
        num: "01",
        title: "Discovery & Strategy",
        desc: "We analyze your target audience, identify the core problem your app solves, and map out the complete technical architecture and database schema."
    },
    {
        num: "02",
        title: "UI/UX Prototyping",
        desc: "Our design team crafts pixel-perfect, interactive Figma prototypes so you can literally tap through the app before we write a single line of code."
    },
    {
        num: "03",
        title: "Agile Development",
        desc: "We break the project into 2-week sprints, delivering fully functional, testable modules (like the Login or Payment system) continuously."
    },
    {
        num: "04",
        title: "QA & Testing",
        desc: "Rigorous manual and automated testing across simulated and physical devices to ensure zero crashes, memory leaks, or UI breakages."
    },
    {
        num: "05",
        title: "Launch & Go-Live",
        desc: "We handle the stressful parts. We compile the production bundles and manage the entire App Store and Google Play deployment process."
    }
];

export default function AppProcess() {
    return (
        <section className={`section ${styles.processSection}`} id="process">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>How We Build</div>
                    <h2>Our Proven <span className="text-gradient">Development Process</span></h2>
                    <p className="text-muted">A fully transparent, step-by-step framework designed to eliminate surprises and guarantee a successful launch.</p>
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
