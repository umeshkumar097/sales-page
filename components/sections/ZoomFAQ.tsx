"use client";

import { useState } from "react";
import styles from "./ZoomFAQ.module.css";

const faqs = [
    {
        question: "Is buying from a reseller completely legal & official?",
        answer: "Yes! Aiclex Technologies is an officially authorized Zoom Partner. We have a direct B2B partnership with Zoom Video Communications, Inc. The licenses you get are 100% genuine, directly provisioned by Zoom onto your account. We just handle the local billing and support."
    },
    {
        question: "Will my email address or meeting links change?",
        answer: "No. That is the best part! You keep your exact same existing Zoom email address and password. We simply bind the new discounted billing plan to your existing Free or Pro account from the backend without disrupting your stored meetings or data."
    },
    {
        question: "How does the Renewal process work?",
        answer: "Unlike buying online where your credit card is automatically charged (often with surprise price hikes), we send you a manual renewal invoice 15 days before expiration. You transfer the funds, and we extend your license. No hidden charges, no forced auto-renewals."
    },
    {
        question: "We only need 1 or 2 licenses. Can we still get a discount?",
        answer: "Absolutely. Whether you need 1 single Zoom Pro license as an independent coach, or 500 Zoom Business licenses for a corporate enterprise, we can facilitate the purchase and provide you with a valid tax invoice."
    },
    {
        question: "Do you provide technical support if something breaks?",
        answer: "Yes, you receive priority WhatsApp and Phone support directly from our technical team. Instead of waiting 48 hours for a generic email reply from US-based support, our local team helps you troubleshoot integration, meeting settings, and user provisioning."
    }
];

export default function ZoomFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`section ${styles.faqSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Common Questions</div>
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
