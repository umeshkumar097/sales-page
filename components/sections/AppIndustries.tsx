export default function AppIndustries() {
    const industries = [
        {
            name: "E-commerce & Retail",
            icon: "🛍️",
            desc: "Custom storefronts, AR product visualization, and seamless mobile checkouts."
        },
        {
            name: "EdTech & Education",
            icon: "🎓",
            desc: "Interactive learning management systems (LMS), video courses, and student portals."
        },
        {
            name: "Healthcare & Telemed",
            icon: "⚕️",
            desc: "HIPAA-compliant patient portals, virtual doctor consultations, and health tracking."
        },
        {
            name: "Real Estate & PropTech",
            icon: "🏢",
            desc: "Virtual property tours, agent dashboards, and real-time MLS property listings."
        },
        {
            name: "FinTech & Banking",
            icon: "💳",
            desc: "Secure mobile wallets, crypto trading platforms, and instant P2P payment apps."
        },
        {
            name: "On-Demand Delivery",
            icon: "🚚",
            desc: "Ridesharing, food delivery, and logistics tracking with live GPS routing."
        }
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div style={{ display: 'inline-block', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Industries We Serve</div>
                    <h2>Tailored Mobile Solutions For <span className="text-gradient">Every Niche</span></h2>
                    <p className="text-muted">We have deep domain expertise across multiple high-growth industries, ensuring your app meets strict market standards.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {industries.map((ind, i) => (
                        <div key={i} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', transition: 'transform 0.3s' }}>
                            <div style={{ fontSize: '2.5rem', background: 'rgba(255,255,255,0.03)', width: '65px', height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                                {ind.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{ind.name}</h3>
                                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{ind.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
