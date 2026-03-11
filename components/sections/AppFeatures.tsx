import styles from "./AppFeatures.module.css";

const features = [
    {
        title: "Advanced Login & Auth",
        desc: "Secure Biometric (FaceID/Fingerprint), Social Logins (Google/Apple), and OTP verification.",
        icon: "🔐"
    },
    {
        title: "Secure Payment Gateways",
        desc: "Stripe, Razorpay, PayPal, and Apple/Google Pay integrations for seamless 1-click checkouts.",
        icon: "💎"
    },
    {
        title: "Smart Push Notifications",
        desc: "Behavioral-triggered push alerts via Firebase (FCM) to re-engage dormant users instantly.",
        icon: "📲"
    },
    {
        title: "Real-time Analytics",
        desc: "Built-in Mixpanel or Google Analytics dashboards to track user retention and conversion drops.",
        icon: "📊"
    },
    {
        title: "Powerful Admin Panels",
        desc: "Custom web-based CMS backends to manage users, orders, and application data in real-time.",
        icon: "🎛️"
    },
    {
        title: "Offline Mode Support",
        desc: "Local database caching (SQLite/CoreData) so your app functions flawlessly without internet.",
        icon: "📶"
    }
];

export default function AppFeatures() {
    return (
        <section className={`section ${styles.featuresSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <h2>Enterprise-Grade <span className="text-gradient">App Features</span></h2>
                    <p className="text-muted">We don't build basic templates. Every application is packed with modern features designed to scale to millions of users.</p>
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
