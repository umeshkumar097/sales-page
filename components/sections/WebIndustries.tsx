export default function WebIndustries() {
    const industries = [
        {
            name: "B2B SaaS & Tech",
            icon: "💻",
            desc: "Scalable dashboards, API integrations, and conversion-optimized pricing pages."
        },
        {
            name: "Retail & E-Commerce",
            icon: "🛍️",
            desc: "Custom shopping carts, inventory management, and personalized user journeys."
        },
        {
            name: "Healthcare & Clinics",
            icon: "⚕️",
            desc: "HIPAA-compliant patient portals, booking systems, and secure data handling."
        },
        {
            name: "Real Estate & Agencies",
            icon: "🏢",
            desc: "Dynamic property listings, MLS integrations, and virtual tour embeddings."
        },
        {
            name: "Finance & Fintech",
            icon: "📈",
            desc: "Secure portals, calculators, and integrations with financial data providers."
        },
        {
            name: "Coaching & Education",
            icon: "🎓",
            desc: "Learning Management Systems (LMS), membership portals, and video hosting."
        }
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div style={{ display: 'inline-block', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Industries We Serve</div>
                    <h2>Tailored Web Solutions For <span className="text-gradient">Every Domain</span></h2>
                    <p className="text-muted">We understand the unique compliance, performance, and user-experience requirements of different industries.</p>
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
