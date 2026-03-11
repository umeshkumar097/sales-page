import { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ZoomCTAForm from "@/components/sections/ZoomCTAForm";
import styles from "./page.module.css";
import Link from "next/link";
import Clients from "@/components/sections/Clients";

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const country = resolvedParams.country;
    const capitalizedCountry = country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return {
        title: `Authorized Zoom Reseller in ${capitalizedCountry} | Best Pricing & Support`,
        description: `Buy Zoom licenses securely in ${capitalizedCountry} from Aiclex Technologies, an officially Authorized Zoom Reseller. Get discounted B2B pricing, local billing, and dedicated technical support.`,
        keywords: [
            `Zoom Reseller in ${capitalizedCountry}`, 
            `Buy Zoom Licenses ${capitalizedCountry}`, 
            `Zoom Authorized Partner ${capitalizedCountry}`, 
            `Zoom Enterprise Pricing`, 
            `Aiclex Technologies Zoom`
        ],
        alternates: {
            canonical: `https://aiclex.in/zoom-reseller-in-${country.toLowerCase()}`,
        }
    };
}

export default async function ZoomResellerPage({ params }: { params: Promise<{ country: string }> }) {
    const resolvedParams = await params;
    const country = resolvedParams.country;
    const capitalizedCountry = country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <>
            <Header />
            <main>
                {/* Custom Hero for Zoom Reseller */}
                <section className={`section ${styles.hero}`}>
                    <div className="container">
                        <div className={styles.heroGrid}>
                            <div className={styles.content}>
                                <div className={styles.badge}>
                                    <span className={styles.pulse}></span>
                                    Official Zoom Authorized Reseller
                                </div>
                                <h1>
                                    Premium Zoom Partner in <br />
                                    <span className="text-gradient">{capitalizedCountry}</span>
                                </h1>
                                <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                                    Upgrade your business communications with discounted Zoom plans, local GST/tax invoicing, 
                                    and dedicated 24/7 technical support. Seamless scaling for teams of all sizes.
                                </p>
                                <ul className={styles.benefits}>
                                    <li>✓ Best B2B Discounted Pricing</li>
                                    <li>✓ Local Currency & Tax Compliance</li>
                                    <li>✓ Dedicated Account Manager</li>
                                    <li>✓ Priority Technical Support</li>
                                </ul>
                                <div style={{ marginTop: '2rem' }}>
                                    <Link href="#contact" className="btn btn-primary">
                                        Get a Custom Quote
                                    </Link>
                                </div>
                            </div>
                            
                            <div className={`glass ${styles.formWrapper}`}>
                                <h3 style={{marginBottom: '1rem', textAlign: 'center'}}>Inquire About Zoom Licenses</h3>
                                <ZoomCTAForm isHero={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="container">
                        <div className={styles.headerCentered}>
                            <div className={styles.tag}>Why Us?</div>
                            <h2>Why Buy Zoom in {capitalizedCountry} Through <span className="text-gradient">Aiclex?</span></h2>
                            <p className="text-muted">Avoid credit card international fees and generic support queues.</p>
                        </div>
                        
                        <div className={styles.grid}>
                            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
                                <h3>Save on Taxes & Fees</h3>
                                <p className="text-muted">We provide proper local tax invoices so you can claim input credits easily, avoiding hefty forex markup fees from remote credit card transactions.</p>
                            </div>
                            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
                                <h3>Priority Local Support</h3>
                                <p className="text-muted">Skip the automated bots. Get a direct point of contact for onboarding, troubleshooting, and license management across your entire organization.</p>
                            </div>
                            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚙️</div>
                                <h3>API & Integrations</h3>
                                <p className="text-muted">As a full-stack digital agency, we can integrate Zoom APIs directly into your LMS, CRM, or custom application for seamless workflows.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Clients />

            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
