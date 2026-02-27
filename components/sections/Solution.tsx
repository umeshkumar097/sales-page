import Link from "next/link";
import Image from "next/image";
import styles from "./Solution.module.css";

export default function Solution() {
    const benefits = [
        "Custom-Coded Performance Websites",
        "Conversion-Focused UI/UX Design",
        "SEO-Friendly Built-In Architecture",
        "Scalable & Secure Systems",
        "AI Automation Ready",
        "ROI & Business Growth Focused"
    ];

    return (
        <section className={`section ${styles.solution}`} id="solution">
            <div className="container">

                <div className={styles.grid}>
                    {/* Left: Image/Graphic representation */}
                    <div className={styles.visualColumn} data-aos="fade-right">
                        <div className={`glass ${styles.visualBox}`}>
                            <div className={styles.pulseRing}></div>
                            <div className={styles.visualContent}>
                                <Image
                                    src="/logo.png"
                                    alt="Aiclex Technologies"
                                    width={140}
                                    height={35}
                                    className={styles.logoImage}
                                />
                                <p>Your Growth Partner</p>
                                <div className={styles.stats}>
                                    <div className={styles.statLine}>
                                        <span>Speed</span>
                                        <div className={styles.bar}><div className={styles.fill} style={{ width: '98%' }}></div></div>
                                    </div>
                                    <div className={styles.statLine}>
                                        <span>Conversion</span>
                                        <div className={styles.bar}><div className={styles.fill} style={{ width: '95%' }}></div></div>
                                    </div>
                                    <div className={styles.statLine}>
                                        <span>SEO Score</span>
                                        <div className={styles.bar}><div className={styles.fill} style={{ width: '100%' }}></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Copy */}
                    <div className={styles.contentColumn} data-aos="fade-left">
                        <div className={styles.tag}>The Solution</div>
                        <h2>We Don't Just Build Apps. <br /><span className="text-gradient">We Build Digital Assets.</span></h2>
                        <p className="text-muted">
                            Stop settling for generic templates and clunky systems. At Aiclex Technologies, we engineer custom
                            digital solutions designed specifically to capture leads, streamline operations, and scale your revenue.
                        </p>

                        <ul className={styles.benefitsList}>
                            {benefits.map((benefit, index) => (
                                <li key={index}>
                                    <span className={styles.check}>✓</span>
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <Link href="#contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Transform Your Business
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
