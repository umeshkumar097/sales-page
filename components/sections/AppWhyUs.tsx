import Link from "next/link";
import styles from "./AppWhyUs.module.css";

export default function AppWhyUs() {
    const reasons = [
        {
            title: "In-House Engineering",
            desc: "We don't outsource to cheap third-party freelancers. Every line of code is written by our senior in-house developers.",
            icon: "👨‍💻"
        },
        {
            title: "Performance First",
            desc: "Slow apps die fast. We obsess over milliseconds, ensuring seamless 60fps scrolling and instant API responses.",
            icon: "⚡"
        },
        {
            title: "Transparent Source Code",
            desc: "You own the app. You own the code. We hand over the complete Git repository and IP rights upon deployment.",
            icon: "🔓"
        },
        {
            title: "Post-Launch Support",
            desc: "We stand by our work. We offer dedicated SLA maintenance contracts to fix bugs, update dependencies, and add new features.",
            icon: "🛡️"
        }
    ];

    return (
        <section className={`section ${styles.whyUsSection}`}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Left side text */}
                    <div className={styles.contentCol}>
                        <div className={styles.tag}>The Aiclex Advantage</div>
                        <h2>Why Partner With Us For Your <span className="text-gradient">App Build?</span></h2>
                        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Building an app is a major investment. You need an engineering partner who understands business ROI, not just someone who writes code.
                        </p>

                        <div className={styles.reasonsList}>
                            {reasons.map((r, i) => (
                                <div key={i} className={styles.reasonItem}>
                                    <div className={styles.icon}>{r.icon}</div>
                                    <div className={styles.reasonText}>
                                        <h4>{r.title}</h4>
                                        <p>{r.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="#contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                            Start Your App Project
                        </Link>
                    </div>

                    {/* Right side visual placeholder (Can be an image later) */}
                    <div className={styles.visualCol}>
                        <div className={styles.codeBlock}>
                            <div className={styles.codeHeader}>
                                <span className={styles.dot} style={{ background: '#ff5f56' }}></span>
                                <span className={styles.dot} style={{ background: '#ffbd2e' }}></span>
                                <span className={styles.dot} style={{ background: '#27c93f' }}></span>
                            </div>
                            <pre>
                                <code>
{`// Aiclex Quality Guarantee
const buildApp = async (idea) => {
  const blueprint = await architect(idea);
  
  const ui = designSystem(blueprint, {
    pixelPerfect: true,
    userFocused: true
  });

  const app = await develop(ui, {
    tech: ['React Native', 'Node.js'],
    performance: 'blazing-fast',
    security: 'enterprise-grade'
  });

  return deploy(app, ['iOS', 'Android']);
};

// 100% Client Ownership`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
