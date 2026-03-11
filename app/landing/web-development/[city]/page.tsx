import { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import CTAForm from "@/components/sections/CTAForm";
import styles from "./page.module.css";
import Link from "next/link";
import CaseStudy from "@/components/sections/CaseStudy";
import WebBenefits from "@/components/sections/WebBenefits";
import WebServices from "@/components/sections/WebServices";
import WebIndustries from "@/components/sections/WebIndustries";
import WebFeatures from "@/components/sections/WebFeatures";
import WebProcess from "@/components/sections/WebProcess";
import WebPortfolio from "@/components/sections/WebPortfolio";
import WebWhyUs from "@/components/sections/WebWhyUs";
import WebTechStack from "@/components/sections/WebTechStack";
import WebTestimonials from "@/components/sections/WebTestimonials";
import WebFAQ from "@/components/sections/WebFAQ";

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const city = resolvedParams.city;
    const capitalizedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return {
        title: `Top Web Development Agency in ${capitalizedCity} | Custom Websites`,
        description: `Looking for the best Web Development Agency in ${capitalizedCity}? Aiclex Technologies builds custom, high-converting React, Next.js, and WordPress websites to scale your business.`,
        keywords: [
            `Web Development Agency in ${capitalizedCity}`, 
            `Website Design Company ${capitalizedCity}`, 
            `Hire Web Developers ${capitalizedCity}`, 
            `E-commerce Development ${capitalizedCity}`, 
            `Aiclex Technologies Web Dev`
        ],
        alternates: {
            canonical: `https://aiclex.in/web-development-agency-in-${city.toLowerCase()}`,
        }
    };
}

export default async function WebDevPage({ params }: { params: Promise<{ city: string }> }) {
    const resolvedParams = await params;
    const city = resolvedParams.city;
    const capitalizedCity = city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <>
            <Header />
            <main>
                <section className={`section ${styles.hero}`}>
                    <div className="container">
                        <div className={styles.heroGrid}>
                            <div className={styles.content}>
                                <div className={styles.badge}>
                                    <span className={styles.pulse}></span>
                                    #1 Rated Web Development Partners
                                </div>
                                <h1>
                                    Top-Tier Web Development Agency in <br />
                                    <span className="text-gradient">{capitalizedCity}</span>
                                </h1>
                                <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                                    Stop losing traffic to slow templates. We build blazing-fast, high-converting React and Next.js websites that dominate SEO and skyrocket business revenue.
                                </p>
                                <ul className={styles.benefits}>
                                    <li>✓ Custom Next.js Architecture</li>
                                    <li>✓ Headless E-Commerce & Shopify</li>
                                    <li>✓ Bulletproof Technical SEO</li>
                                    <li>✓ <span style={{color: '#10b981'}}>100/100</span> Core Web Vitals Guaranteed</li>
                                </ul>
                                <div style={{ marginTop: '2rem' }}>
                                    <Link href="#contact" className="btn btn-primary">
                                        Start Your Web Project
                                    </Link>
                                </div>
                            </div>
                            
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <CTAForm isHero={true} />
                            </div>
                        </div>
                    </div>
                </section>

                <CaseStudy />
                <WebBenefits />
                <WebServices />
                <WebIndustries />
                <WebFeatures />
                <WebProcess />
                <WebPortfolio />
                <WebWhyUs />
                <WebTechStack />
                <WebTestimonials />
                <WebFAQ />

            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
