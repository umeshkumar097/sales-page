"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "What is the typical cost for a website or app?",
            a: "Our solutions are custom-built for your specific needs. Projects typically range from $2,500 to $15,000+ depending on complexity, features, and platform requirements. We provide a detailed breakdown after our initial strategy call."
        },
        {
            q: "How long is the development timeline?",
            a: "A standard corporate website takes 3-5 weeks, while complex web applications or mobile apps (iOS/Android) can take 8-16 weeks to ensure rigorous testing and quality assurance."
        },
        {
            q: "Do you offer ongoing support after launch?",
            a: "Yes. We offer continuous maintenance, security updates, and performance optimization packages to ensure your digital asset scales flawlessly with your business."
        },
        {
            q: "Do you build custom software or use templates?",
            a: "We specialize in custom code and bespoke UI/UX designs. While we can use CMS platforms like WordPress or Shopify when it makes sense for your business, we do not rely on pre-made generic templates."
        },
        {
            q: "Can you redesign my existing website?",
            a: "Absolutely. We often take outdated, slow websites and reconstruct them using modern tech stacks (React, Next.js) to drastically improve loading speeds, SEO, and user conversions."
        },
        {
            q: "Is SEO included in your development process?",
            a: "Yes. Technical SEO is built-in from day one. We ensure perfect Core Web Vitals, proper heading structures, fast loading speeds, and schema markup to give you a strong foundation for Google rankings."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`section ${styles.faq}`} id="faq">
            <div className={`container ${styles.container}`}>

                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.tag}>Have Questions?</div>
                    <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
                    <p className="text-muted">
                        Everything you need to know about partnering with Aiclex Technologies.
                    </p>
                </div>

                <div className={styles.accordion} data-aos="fade-up" data-aos-delay="200">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${openIndex === index ? styles.active : ""}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.q}</span>
                                <span className={styles.icon}>{openIndex === index ? "−" : "+"}</span>
                            </button>

                            <div
                                className={styles.answer}
                                style={{ maxHeight: openIndex === index ? "200px" : "0px" }}
                            >
                                <div className={styles.answerInner}>
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
