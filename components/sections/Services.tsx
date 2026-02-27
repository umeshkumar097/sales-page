import Link from "next/link";
import Image from "next/image";
import styles from "./Services.module.css";

export default function Services() {
    const services = [
        {
            title: "Website Development",
            desc: "Fast, secure, and SEO-optimized corporate & ecommerce websites that convert visitors into buyers.",
            impact: "Increase brand trust and online sales by 200%.",
            for: "Businesses, Coaches, E-commerce",
            icon: "🌐"
        },
        {
            title: "Custom Web Applications",
            desc: "Bespoke SaaS platforms, CRMs, and MVP development using cutting-edge AI integrations.",
            impact: "Automate operations and save 1000+ hours yearly.",
            for: "Enterprises, Agencies, Real Estate",
            icon: "💻",
            image: "/web_mockup.png"
        },
        {
            title: "iOS & Android App Development",
            desc: "Premium, fluid, and scalable native and cross-platform applications tailored for millions of active users.",
            impact: "Tap into the global mobile market share and build loyalty.",
            for: "Startups, SaaS, Premium Brands",
            icon: "📱",
            image: "/app_mockup.png"
        }
    ];

    return (
        <section className={`section ${styles.services}`} id="services">
            <div className="container">

                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>What We Do</div>
                    <h2>Comprehensive Tech <span className="text-gradient">Solutions</span></h2>
                    <p className="text-muted">
                        End-to-end development services tailored to scale your operations and dominate your industry.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={`glass ${styles.card}`} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.icon}>{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p className={styles.desc}>{service.desc}</p>
                            
                            {service.image && (
                                <div className={styles.mockupWrapper}>
                                    <Image 
                                        src={service.image} 
                                        alt={`${service.title} mockup`}
                                        width={500}
                                        height={350}
                                        className={styles.mockupImage}
                                    />
                                </div>
                            )}

                            <div className={styles.details}>
                                <div>
                                    <strong>Business Impact:</strong>
                                    <p className="text-muted">{service.impact}</p>
                                </div>
                                <div>
                                    <strong>Best For:</strong>
                                    <p className="text-muted">{service.for}</p>
                                </div>
                            </div>

                            <Link href="#contact" className="btn btn-secondary">
                                Discuss Requirements
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
