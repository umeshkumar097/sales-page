"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const linkPrefix = isHome ? "" : "/";

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Brand & About */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/logo.png"
                                alt="Aiclex Technologies"
                                width={220}
                                height={60}
                                className={styles.logoImage}
                            />
                        </Link>
                        <p className="text-muted">
                            Performance-driven digital & AI agency delivering custom websites, scalable mobile apps, and business automation systems.
                        </p>
                        <div className={styles.trustSignals}>
                            <span>✓ 8+ Years Experience</span>
                            <span>✓ 50+ Projects Delivered</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksCol}>
                        <h4>Services</h4>
                        <ul>
                            <li><Link href={`${linkPrefix}#services`}>Website Development</Link></li>
                            <li><Link href={`${linkPrefix}#services`}>Android App Development</Link></li>
                            <li><Link href={`${linkPrefix}#services`}>iOS App Development</Link></li>
                            <li><Link href={`${linkPrefix}#services`}>Custom Web Apps</Link></li>
                            <li><Link href={`${linkPrefix}#services`}>AI Automation</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className={styles.linksCol}>
                        <h4>Company</h4>
                        <ul>
                            <li><Link href={`${linkPrefix}#about`}>About Us</Link></li>
                            <li><Link href={`${linkPrefix}#case-studies`}>Case Studies</Link></li>
                            <li><Link href={`${linkPrefix}#process`}>Our Process</Link></li>
                            <li><Link href={`${linkPrefix}#faq`}>FAQ</Link></li>
                            <li><Link href={`${linkPrefix}#contact`}>Contact</Link></li>
                        </ul>
                    </div>

                    {/* CTA & Contact */}
                    <div className={styles.contactCol}>
                        <h4>Ready to Scale?</h4>
                        <p className="text-muted">Get a custom proposal within 24 hours.</p>
                        <Link href={`${linkPrefix}#contact`} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                            Get Free Consultation
                        </Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Aiclex Technologies. All rights reserved. Based in India, Serving Globally.</p>
                    <div className={styles.legal}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>

                <div className={styles.disclaimer} style={{ marginTop: "2rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                    <p>
                        This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
                        <br />
                        Google is a trademark of Google LLC. This site is not a part of the Google website or Google Inc.
                    </p>
                </div>
            </div>
        </footer>
    );
}
