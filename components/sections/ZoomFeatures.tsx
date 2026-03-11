import styles from "./ZoomFeatures.module.css";

const features = [
    {
        icon: "📹",
        title: "HD Video & Audio",
        desc: "Bring HD video and audio to your meetings with support for up to 1000 video participants and 49 videos on screen."
    },
    {
        icon: "⏱️",
        title: "Unlimited Meetings",
        desc: "Host an unlimited number of meetings without restrictive 40-minute time limits for professional continuous workflows."
    },
    {
        icon: "🖥️",
        title: "Screen Sharing",
        desc: "Multiple participants can share their screens simultaneously and co-annotate for a more interactive meeting."
    },
    {
        icon: "☁️",
        title: "Cloud Recording",
        desc: "Record your meetings locally or to the cloud, with searchable transcripts and easy sharing options."
    },
    {
        icon: "👥",
        title: "Large Capacity",
        desc: "Scale your audience effortlessly with Large Meeting add-ons allowing up to 1,000 interactive participants."
    },
    {
        icon: "📢",
        title: "Webinar Hosting",
        desc: "Broadcast seamlessly to up to 50,000 view-only attendees with dedicated Q&A, polling, and reporting."
    }
];

export default function ZoomFeatures() {
    return (
        <section className={`section ${styles.featuresSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <div className={styles.tag}>Powerful Features</div>
                    <h2>Everything You Need For <span className="text-gradient">Flawless Communication</span></h2>
                    <p className="text-muted">Zoom provides the most reliable and innovative video communications platform on the market.</p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={`glass ${styles.featureCard}`}>
                            <div className={styles.iconBox}>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p className="text-muted">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
