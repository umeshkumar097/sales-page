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
        title: `Expert Mobile App Development Company in ${capitalizedCity} | iOS & Android`,
        description: `Hire the top Mobile App Development Company in ${capitalizedCity}. Aiclex Technologies builds scalable, high-performance native and cross-platform mobile applications for iOS and Android.`,
        keywords: [
            `Mobile App Development Company in ${capitalizedCity}`, 
            `App Developers ${capitalizedCity}`, 
            `iOS App Development ${capitalizedCity}`, 
            `Android App Development ${capitalizedCity}`, 
            `Aiclex Technologies Mobile Apps`
        ],
        alternates: {
            canonical: `https://aiclex.in/mobile-app-development-company-in-${city.toLowerCase()}`,
        }
    };
}

export default async function MobileAppDevPage({ params }: { params: Promise<{ city: string }> }) {
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
                                    Top Rated Mobile Application Engineers
                                </div>
                                <h1>
                                    Expert Mobile App Development Company in <br />
                                    <span className="text-gradient">{capitalizedCity}</span>
                                </h1>
                                <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                                    Transform your revolutionary idea into a stunning, highly-scalable mobile application. 
                                    We build native and cross-platform apps for iOS and Android that users actually love.
                                </p>
                                <ul className={styles.benefits}>
                                    <li>✓ iOS & Android Native Development</li>
                                    <li>✓ Flutter & React Native Cross-Platform</li>
                                    <li>✓ Secure Backend & API Architecture</li>
                                    <li>✓ App Store Publishing & Optimization</li>
                                </ul>
                                <div style={{ marginTop: '2rem' }}>
                                    <Link href="#contact" className="btn btn-primary">
                                        Discuss Your App Idea
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

            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
