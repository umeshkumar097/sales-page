import { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import CTAForm from "@/components/sections/CTAForm";
import styles from "./page.module.css";
import Link from "next/link";
import CaseStudy from "@/components/sections/CaseStudy";

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
                                    Top Web Development Agency in <br />
                                    <span className="text-gradient">{capitalizedCity}</span>
                                </h1>
                                <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                                    Stop losing customers to outdated website designs. We engineer ultra-fast, SEO-optimized, 
                                    and high-converting websites that turn your {capitalizedCity} business into an industry leader.
                                </p>
                                <ul className={styles.benefits}>
                                    <li>✓ Custom Next.js / React Development</li>
                                    <li>✓ Blazing Fast Load Times</li>
                                    <li>✓ Mobile-First Responsive Design</li>
                                    <li>✓ Advanced Technical SEO Built-In</li>
                                </ul>
                                <div style={{ marginTop: '2rem' }}>
                                    <Link href="#contact" className="btn btn-primary">
                                        Start Your Web Project
                                    </Link>
                                </div>
                            </div>
                            
                            <div className={`glass ${styles.formWrapper}`}>
                                <h3 style={{marginBottom: '1rem', textAlign: 'center'}}>Get a Free Website Audit</h3>
                                <CTAForm isHero={false} />
                            </div>
                        </div>
                    </div>
                </section>

                <CaseStudy />

            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
