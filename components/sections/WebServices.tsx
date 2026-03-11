import styles from "./WebServices.module.css";
import Link from "next/link";

const services = [
    {
        title: "High-Converting Landing Pages",
        icon: "🛬",
        desc: "Laser-focused, single-page funnels designed purely for lead generation and maximizing ad campaign ROI.",
        tags: ["Next.js", "Framer Motion", "Conversion Rate Optimization"]
    },
    {
        title: "E-Commerce & Shopify",
        desc: "Custom headless storefronts that drive sales, manage inventory seamlessly, and provide ultra-fast checkouts.",
        icon: "🛒",
        tags: ["Shopify Plus", "WooCommerce", "Stripe API"]
    },
    {
        title: "Corporate Websites",
        icon: "🏢",
        desc: "Professional, authoritative digital headquarters that establish trust and clearly communicate your enterprise value proposition.",
        tags: ["WordPress", "Sanity CMS", "Contentful"]
    },
    {
        title: "Custom SaaS Applications",
        icon: "⚙️",
        desc: "Complex, data-heavy web applications with user dashboards, recurring billing, and deep third-party API integrations.",
        tags: ["React", "Node.js", "PostgreSQL", "AWS"]
    }
];

export default function WebServices() {
    return (
        <section className={`section ${styles.servicesSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Our Expertise</div>
                    <h2>Full-Stack <span className="text-gradient">Web Solutions</span></h2>
                    <p className="text-muted">From simple marketing pages to complex enterprise platforms, we architect scalable web experiences.</p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={`glass ${styles.serviceCard}`}>
                            <div className={styles.serviceHeader}>
                                <div className={styles.iconBox}>{service.icon}</div>
                                <h3>{service.title}</h3>
                            </div>
                            <p className="text-muted">{service.desc}</p>
                            
                            <div className={styles.tagsContainer}>
                                {service.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={styles.techTag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link href="#contact" className="btn btn-primary">
                        Discuss Your Requirements
                    </Link>
                </div>
            </div>
        </section>
    );
}
