"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo.png"
                        alt="Aiclex Technologies"
                        width={200}
                        height={55}
                        priority
                        className={styles.logoImage}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <Link href="#services">Services</Link>
                    <Link href="#process">Process</Link>
                    <Link href="#results">Results</Link>
                    <Link href="#faq">FAQ</Link>
                </nav>

                <div className={styles.actions}>
                    <Link href="#contact" className={`btn btn-primary ${styles.ctaDesktop}`}>
                        Get Free Consultation
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ""}`}>
                <nav>
                    <Link href="#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                    <Link href="#process" onClick={() => setMobileMenuOpen(false)}>Process</Link>
                    <Link href="#results" onClick={() => setMobileMenuOpen(false)}>Results</Link>
                    <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                    <Link href="#contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                        Get Free Consultation
                    </Link>
                </nav>
            </div>
        </header>
    );
}
