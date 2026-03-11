import styles from "./AppTechStack.module.css";
import Image from "next/image";

const categories = [
    {
        name: "Mobile Frontend",
        techs: [
            { name: "React Native", icon: "⚛️" },
            { name: "Flutter", icon: "🦅" },
            { name: "Swift (iOS)", icon: "🍏" },
            { name: "Kotlin (Android)", icon: "🤖" },
        ]
    },
    {
        name: "Backend & APIs",
        techs: [
            { name: "Node.js", icon: "🟢" },
            { name: "Python (Django)", icon: "🐍" },
            { name: "GraphQL", icon: "🕸️" },
            { name: "RESTful APIs", icon: "🔄" },
        ]
    },
    {
        name: "Database & Cloud",
        techs: [
            { name: "PostgreSQL", icon: "🐘" },
            { name: "MongoDB", icon: "🍃" },
            { name: "AWS", icon: "☁️" },
            { name: "Firebase", icon: "🔥" },
        ]
    }
];

export default function AppTechStack() {
    return (
        <section className={`section ${styles.techSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Powered by Modern Tech</div>
                    <h2>Our Technology <span className="text-gradient">Stack</span></h2>
                    <p className="text-muted">We use industry-standard, deeply supported, and highly scalable technologies to build your next-generation mobile applications.</p>
                </div>

                <div className={styles.grid}>
                    {categories.map((category, idx) => (
                        <div key={idx} className={styles.categoryCard}>
                            <h3 className={styles.categoryTitle}>{category.name}</h3>
                            <div className={styles.techGrid}>
                                {category.techs.map((tech, tIdx) => (
                                    <div key={tIdx} className={`glass ${styles.techItem}`}>
                                        <div className={styles.icon}>{tech.icon}</div>
                                        <span className={styles.techName}>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
