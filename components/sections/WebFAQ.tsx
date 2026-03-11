"use client";

import { useState } from "react";
import styles from "./WebFAQ.module.css";

const faqs = [
    {
        question: "Do you build on WordPress or custom code?",
        answer: "It depends entirely on your needs. For simple marketing sites where clients want easy CMS access, we use modern Headless WordPress or Sanity. For high-performance SaaS platforms or enterprise web apps, we build custom utilizing React, Next.js, and Node.js."
    },
    {
        question: "How much does a custom website cost?",
        answer: "Every project is scoped individually based on features. A high-converting 5-page landing site might start around $2,500, whereas a complex custom E-commerce or SaaS platform will naturally be higher. We provide fixed-price quotes after our initial discovery call."
    },
    {
        question: "Will my website be SEO optimized?",
        answer: "Yes, absolutely. We build 'Technical SEO' into the core architecture. This means blazing fast load times (Core Web Vitals), clean semantic HTML, dynamic XML sitemaps, and proper schema markup to ensure Google ranks you as highly as possible from day one."
    },
    {
        question: "Who owns the website once it's finished?",
        answer: "You do. 100%. Once final payment is cleared, we transfer all source code, design files (Figma), domain registrations, and hosting accounts directly to your company. We do not lock our clients into proprietary platforms."
    },
    {
        question: "Do you offer ongoing maintenance?",
        answer: "Yes. While you are free to walk away with your code, most clients retain us on a monthly SLA (Service Level Agreement). This covers server hosting, security patches, plugin updates, uptime monitoring, and priority bug fixes."
    }
];

export default function WebFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`section ${styles.faqSection}`} id="faq">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Web Development FAQs</div>
                    <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
                </div>

                <div className={styles.faqWrapper}>
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`glass ${styles.faqItem} ${openIndex === index ? styles.active : ""}`}
                        >
                            <button 
                                className={styles.faqQuestion} 
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className={styles.icon}>{openIndex === index ? "−" : "+"}</span>
                            </button>
                            <div className={styles.faqAnswer} style={{ maxHeight: openIndex === index ? '300px' : '0' }}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
