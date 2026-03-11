import styles from "./WebFeatures.module.css";

const features = [
    {
        title: "Blazing Fast Speeds (Core Web Vitals)",
        desc: "We use Next.js and static site generation (SSG) to ensure your website loads in under 1 second, keeping Google and your users happy.",
        icon: "⚡"
    },
    {
        title: "Technical SEO Built-In",
        desc: "Server-side rendering, dynamic XML sitemaps, canonical tags, and structured JSON-LD data are integrated from day one.",
        icon: "🔍"
    },
    {
        title: "100% Mobile Responsive",
        desc: "Your site will look and function perfectly across all devices, from oversized 4K monitors to the smallest smartphones.",
        icon: "📱"
    },
    {
        title: "Headless CMS Integration",
        desc: "Empower your marketing team to update content effortlessly using Sanity, Contentful, or Strapi without touching a line of code.",
        icon: "📝"
    },
    {
        title: "Enterprise SSL Security",
        desc: "Automated HTTPS provisioning, DDoS protection, and secure API routing to protect your business and client data.",
        icon: "🛡️"
    },
    {
        title: "Global CDN Edge Hosting",
        desc: "Deployed on Vercel or AWS, ensuring your website is served from the data center closest to your visitor for sub-100ms latency.",
        icon: "🌍"
    }
];

export default function WebFeatures() {
    return (
        <section className={`section ${styles.featuresSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <h2>Modern Web <span className="text-gradient">Capabilities</span></h2>
                    <p className="text-muted">Say goodbye to slow, bloated, and vulnerable WordPress templates. We engineer performance-first digital experiences.</p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, idx) => (
                        <div key={idx} className={styles.featureItem}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <div className={styles.content}>
                                <h4>{feature.title}</h4>
                                <p>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
