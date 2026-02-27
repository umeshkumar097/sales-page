import Link from "next/link";
import CTAForm from "./CTAForm";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={`section ${styles.hero}`} id="home">
            <div className={`container ${styles.container}`}>

                <div className={styles.heroGrid}>
                    {/* Left: Main Content */}
                    <div className={styles.content}>
                        <div className={styles.badge} data-aos="fade-down" data-aos-delay="100">
                            <span className={styles.pulse}></span>
                            8+ Years of Experience in IT & Development
                        </div>

                        <h1 className="animate-fade-in" data-aos="fade-up" data-aos-delay="200">
                            Scaling Businesses With High-Performance <br />
                            <span className="text-gradient">Digital & AI Solutions</span>
                        </h1>

                        <p className={`text-muted ${styles.subtitle} animate-fade-in`} data-aos="fade-up" data-aos-delay="300">
                            We build custom websites, scalable mobile apps, and intelligent automation systems
                            designed to maximize your ROI and dominate your market.
                        </p>

                        <ul className={styles.benefits}>
                            <li>✓ Mobile-First Architecture</li>
                            <li>✓ SEO-Ready Infrastructure</li>
                            <li>✓ Blazing Fast Loading Speeds</li>
                            <li>✓ AI-Automation Ready</li>
                        </ul>

                        <div className={styles.ctaGroup} data-aos="fade-up" data-aos-delay="500">
                            <Link href="#contact" className="btn btn-primary">
                                Get Free Consultation
                            </Link>
                            <Link href="#process" className="btn btn-secondary">
                                Request Proposal
                            </Link>
                        </div>
                    </div>

                    {/* Right: Hero Form */}
                    <div className={styles.heroFormWrapper} data-aos="fade-left" data-aos-delay="400">
                        <CTAForm isHero={true} />
                    </div>
                </div>

                {/* Trust Indicators Bar */}
                <div className={`glass ${styles.trustBar}`} data-aos="fade-up" data-aos-delay="600">
                    <div className={styles.stat}>
                        <h3>8+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.stat}>
                        <h3>50+</h3>
                        <p>Projects Delivered</p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.stat}>
                        <h3>50+</h3>
                        <p>Branded Clients</p>
                    </div>
                </div>

            </div>

            {/* Background Effects */}
            <div className={styles.glowEffect1}></div>
            <div className={styles.glowEffect2}></div>
        </section>
    );
}
