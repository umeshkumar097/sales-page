import styles from "./AppServices.module.css";
import Link from "next/link";

const services = [
    {
        title: "iOS App Development",
        icon: "🍏",
        desc: "Native iOS applications built with Swift and Objective-C for unparalleled performance and integration with the Apple ecosystem.",
        tags: ["Swift", "Objective-C", "CoreData", "ARKit"]
    },
    {
        title: "Android App Development",
        icon: "🤖",
        desc: "Robust native Android apps using Kotlin and Java, optimized for thousands of device types across the Google Play ecosystem.",
        tags: ["Kotlin", "Java", "Jetpack Compose", "Material UI"]
    },
    {
        title: "Cross-Platform Apps",
        icon: "⚡",
        desc: "Save time and budget with a single codebase that runs on both iOS and Android using industry-leading frameworks.",
        tags: ["Flutter", "React Native", "Dart", "TypeScript"]
    },
    {
        title: "Custom Web Applications",
        icon: "🌐",
        desc: "Progressive Web Apps (PWAs) and highly scalable SaaS dashboards that compliment your mobile ecosystem.",
        tags: ["Next.js", "React", "Node.js", "PostgreSQL"]
    }
];

export default function AppServices() {
    return (
        <section className={`section ${styles.servicesSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Our Expertise</div>
                    <h2>End-To-End <span className="text-gradient">App Development</span></h2>
                    <p className="text-muted">We don't just write code. We architect scalable, secure, and beautiful digital products from scratch.</p>
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
