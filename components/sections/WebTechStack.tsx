import styles from "./WebTechStack.module.css";
import Image from "next/image";

const categories = [
    {
        name: "Frontend UI/UX",
        techs: [
            { name: "React", icon: "⚛️" },
            { name: "Next.js", icon: "▲" },
            { name: "Vue.js", icon: "🟩" },
            { name: "Tailwind CSS", icon: "💨" },
        ]
    },
    {
        name: "Backend Architecture",
        techs: [
            { name: "Node.js", icon: "🟢" },
            { name: "NestJS", icon: "🐱" },
            { name: "Go", icon: "🐹" },
            { name: "Python", icon: "🐍" },
        ]
    },
    {
        name: "Cloud, DB & CMS",
        techs: [
            { name: "PostgreSQL", icon: "🐘" },
            { name: "MongoDB", icon: "🍃" },
            { name: "Vercel Edge", icon: "⚡" },
            { name: "Sanity CMS", icon: "📝" },
        ]
    }
];

export default function WebTechStack() {
    return (
        <section className={`section ${styles.techSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Powered by Modern Tech</div>
                    <h2>Our Development <span className="text-gradient">Stack</span></h2>
                    <p className="text-muted">We don't use bloated WordPress page builders. We write clean, scalable code using the exact same frameworks that power Netflix, Uber, and Airbnb.</p>
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
