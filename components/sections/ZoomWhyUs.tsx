export default function ZoomWhyUs({ country }: { country: string }) {
    const capitalizedCountry = country.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const benefits = [
        {
            icon: "💰",
            title: "Up to 30% Cost Saving",
            desc: "Don't pay retail prices. As an Authorized Partner, we pass bulk volume discounts directly to your business."
        },
        {
            icon: "⚡",
            title: "Fast Activation",
            desc: "Get your licenses provisioned and activated within a few business hours instead of waiting days."
        },
        {
            icon: "🧾",
            title: `Local ${capitalizedCountry} Payment & Taxes`,
            desc: "Avoid Forex markup fees on your corporate cards. We accept local wire transfers, NEFT, RTGS, and provide valid B2B tax invoices."
        },
        {
            icon: "📱",
            title: "Dedicated WhatsApp Support",
            desc: "Skip the generic support queues. Reach our dedicated licensing experts instantly via WhatsApp or direct phone call."
        },
        {
            icon: "🔄",
            title: "Proactive Renewal Assistance",
            desc: "Never worry about unexpected auto-renewals or suspended accounts. We handle your billing cycles smoothly."
        }
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div style={{ display: 'inline-block', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Reseller Advantage</div>
                    <h2>Why Buy From Aiclex in <span className="text-gradient">{capitalizedCountry}?</span></h2>
                    <p className="text-muted">Buying directly from Zoom's US website means international transaction fees and difficulty claiming local business tax input credits. We fix that.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.03)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                {benefit.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{benefit.title}</h3>
                            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
