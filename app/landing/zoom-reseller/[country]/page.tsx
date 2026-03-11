import { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ZoomCTAForm from "@/components/sections/ZoomCTAForm";
import styles from "./page.module.css";
import Link from "next/link";
import Clients from "@/components/sections/Clients";
import ZoomPlans from "@/components/sections/ZoomPlans";
import ZoomFeatures from "@/components/sections/ZoomFeatures";
import ZoomWhyUs from "@/components/sections/ZoomWhyUs";
import ZoomComparison from "@/components/sections/ZoomComparison";
import ZoomUseCases from "@/components/sections/ZoomUseCases";
import ZoomHowItWorks from "@/components/sections/ZoomHowItWorks";
import ZoomFAQ from "@/components/sections/ZoomFAQ";

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
                            
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <ZoomCTAForm isHero={true} />
                            </div>
                        </div>
                    </div>
                </section>

                <Clients />
                <ZoomFeatures />
                <ZoomWhyUs country={country} />
                <ZoomPlans />
                <ZoomComparison />
                <ZoomUseCases />
                <ZoomHowItWorks />
                <ZoomFAQ />

            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
