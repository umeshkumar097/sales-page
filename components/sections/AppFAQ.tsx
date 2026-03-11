"use client";

import { useState } from "react";
import styles from "./AppFAQ.module.css";

const faqs = [
    {
        question: "How much does it cost to build a mobile app?",
        answer: "Every app is unique. A simple MVP might start around $5,000, while complex enterprise apps with custom hardware integrations can exceed $50,000. During our free consultation, we will map out your exact feature requirements and provide a fixed-price tech proposal."
    },
    {
        question: "How long until you can launch my app?",
        answer: "Typical timelines range from 6 to 12 weeks. The first 2 weeks are dedicated to UI/UX design and prototyping, followed by 4-8 weeks of development/testing, and 1 week for App Store & Google Play approval processes."
    },
    {
        question: "Do you build native apps or cross-platform?",
        answer: "We offer both depending on your budget and goals. For startups looking to launch fast on both iOS and Android simultaneously, we highly recommend React Native or Flutter. For intensive games or heavy AR applications, we build natively in Swift/Kotlin."
    },
    {
        question: "Will I own the source code?",
        answer: "100% Yes. Once the final milestone is completed and the invoice is cleared, we transfer full IP rights and GitHub repository access to you. You are never locked into our agency."
    },
    {
        question: "Do you help with App Store submissions?",
        answer: "Yes, we handle the entire launch process. We configure your Apple Developer and Google Play Console accounts, format store listings, generate privacy policies, and manage the review process until your app is live."
    }
];

export default function AppFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`section ${styles.faqSection}`} id="faq">
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>App Development FAQs</div>
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
