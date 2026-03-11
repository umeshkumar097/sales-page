import styles from "./WebPortfolio.module.css";
import Image from "next/image";

const projects = [
    {
        title: "Luminex SaaS Dashboard",
        category: "B2B SaaS Platform",
        desc: "A massive multi-tenant analytics dashboard built with Next.js, featuring real-time interactive charts and custom reporting engines.",
        color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
        title: "Aura Skincare Store",
        category: "E-Commerce Headless Store",
        desc: "A lightning-fast Shopify headless build utilizing React & Framer Motion to deliver a buttery-smooth 100/100 Lighthouse score.",
        color: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)"
    },
    {
        title: "Apex Logistics Portal",
        category: "Corporate Web App",
        desc: "An internal supply chain tracking tool with GPS mapping integrations, role-based access control, and live inventory sync.",
        color: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
    }
];

export default function WebPortfolio() {
    return (
        <section className={`section ${styles.portfolioSection}`} id="work">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Recent Case Studies</div>
                    <h2>Our Web Development <span className="text-gradient">Portfolio</span></h2>
                    <p className="text-muted">Explore high-performance websites and web applications we've engineered to generate millions in revenue for our clients.</p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, idx) => (
                        <div key={idx} className={styles.projectCard}>
                            <div className={styles.imagePlaceholder} style={{ background: project.color }}>
                                {/* Laptop Mockup instead of Mobile Phone */}
                                <div className={styles.mockupLaptop}>
                                    <div className={styles.laptopScreen}>
                                        <div className={styles.browserBar}>
                                            <div className={styles.trafficLight}></div>
                                            <div className={styles.trafficLight}></div>
                                            <div className={styles.trafficLight}></div>
                                            <div className={styles.searchBar}></div>
                                        </div>
                                        <div className={styles.screenContent}>
                                            <div className={styles.fakeHero}></div>
                                            <div className={styles.fakeGrid}>
                                                <div className={styles.fakeCard}></div>
                                                <div className={styles.fakeCard}></div>
                                                <div className={styles.fakeCard}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.laptopBase}>
                                        <div className={styles.laptopTrackpad}></div>
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
