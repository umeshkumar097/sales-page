import Link from "next/link";
import styles from "./ZoomPlans.module.css";

export default function ZoomPlans() {
    return (
        <section className={`section ${styles.plansSection}`} id="plans">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Pricing & Plans</div>
                    <h2>Exclusive Discounted <span className="text-gradient">Zoom Plans</span></h2>
                    <p className="text-muted">Get up to 30% off official Zoom pricing when buying through Aiclex Technologies. Plus, get a proper local GST invoice.</p>
                </div>

                <div className={styles.grid}>
                    {/* Pro Plan */}
                    <div className={`glass ${styles.planCard}`}>
                        <div className={styles.planHeader}>
                            <h3>Zoom Pro</h3>
                            <div className={styles.discountBadge}>Up to 30% Off</div>
                        </div>
                        <p className={styles.planDesc}>Perfect for small teams and independent professionals.</p>
                        
                        <div className={styles.featuresList}>
                            <ul>
                                <li>✓ Host up to 100 participants</li>
                                <li>✓ Meetings up to 30 hours per meeting</li>
                                <li>✓ 5GB Cloud Recording storage</li>
                                <li>✓ Team Chat & Mail/Calendar included</li>
                                <li>✓ Essential Apps free for 1 year</li>
                            </ul>
                        </div>
                        
                        <Link href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                            Get Custom Quote
                        </Link>
                    </div>

                    {/* Business Plan - Highlighted */}
                    <div className={`glass ${styles.planCard} ${styles.highlightedPlan}`}>
                        <div className={styles.popularBadge}>Most Popular</div>
                        <div className={styles.planHeader}>
                            <h3 style={{color: 'white'}}>Zoom Business</h3>
                            <div className={styles.discountBadge}>Up to 30% Off</div>
                        </div>
                        <p className={styles.planDesc} style={{color: 'rgba(255,255,255,0.8)'}}>For growing small and medium businesses (Min. 10 licenses).</p>
                        
                        <div className={styles.featuresList} style={{borderColor: 'rgba(255,255,255,0.1)'}}>
                            <ul style={{color: 'white'}}>
                                <li>✓ Everything in Pro, plus:</li>
                                <li>✓ Host up to 300 participants</li>
                                <li>✓ Single Sign-On (SSO) integration</li>
                                <li>✓ Managed Domains & Company Branding</li>
                                <li>✓ Unlimited Whiteboards</li>
                                <li>✓ Premium Aiclex Priority Support</li>
                            </ul>
                        </div>
                        
                        <Link href="#contact" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', background: 'white', color: '#3b82f6' }}>
                            Get Custom Quote
                        </Link>
                    </div>

                    {/* Webinar Plan */}
                    <div className={`glass ${styles.planCard}`}>
                        <div className={styles.planHeader}>
                            <h3>Zoom Webinar</h3>
                            <div className={styles.discountBadge}>Up to 30% Off</div>
                        </div>
                        <p className={styles.planDesc}>Host large virtual events with complete control.</p>
                        
                        <div className={styles.featuresList}>
                            <ul>
                                <li>✓ 500 to 50,000+ view-only attendees</li>
                                <li>✓ Practice Session & Panelist controls</li>
                                <li>✓ Advanced Reporting & Analytics</li>
                                <li>✓ CRM Integrations (Marketo, Pardot, etc.)</li>
                                <li>✓ Monetize events with paid registration</li>
                            </ul>
                        </div>
                        
                        <Link href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                            Get Custom Quote
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
