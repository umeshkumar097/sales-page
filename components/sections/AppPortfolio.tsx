import styles from "./AppPortfolio.module.css";
import Image from "next/image";

const projects = [
    {
        title: "FinTracker Pro",
        category: "FinTech App",
        desc: "A secure personal finance and crypto portfolio tracker with real-time API integrations.",
        color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
        title: "FitLife Connect",
        category: "Health & Fitness",
        desc: "Social workout tracking app featuring live leaderboards and AI-generated meal plans.",
        color: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)"
    },
    {
        title: "UrbanEstate",
        category: "Real Estate platform",
        desc: "Map-based property discovery app with virtual 360-degree touring capabilities.",
        color: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
    }
];

export default function AppPortfolio() {
    return (
        <section className={`section ${styles.portfolioSection}`} id="work">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Recent Projects</div>
                    <h2>Our Mobile <span className="text-gradient">App Portfolio</span></h2>
                    <p className="text-muted">A glimpse into some of the high-performance native applications we've designed and engineered from the ground up.</p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, idx) => (
                        <div key={idx} className={styles.projectCard}>
                            <div className={styles.imagePlaceholder} style={{ background: project.color }}>
                                <div className={styles.mockupPhone}>
                                    <div className={styles.notch}></div>
                                    <div className={styles.screenPlaceholder}>
                                        <div className={styles.fakeHeader}></div>
                                        <div className={styles.fakeChart}></div>
                                        <div className={styles.fakeList}></div>
                                        <div className={styles.fakeList}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <span className={styles.category}>{project.category}</span>
                                <h3>{project.title}</h3>
                                <p className="text-muted">{project.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
