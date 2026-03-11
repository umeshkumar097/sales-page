export default function ZoomUseCases() {
    const useCases = [
        {
            title: "Coaches & Consultants",
            icon: "🎙️",
            desc: "Conduct 1-on-1 strategy calls and group coaching securely with zero time limits and HD recording capability."
        },
        {
            title: "Corporate Trainers",
            icon: "👨‍🏫",
            desc: "Use breakout rooms, whiteboards, and polling to keep large cohorts engaged natively."
        },
        {
            title: "Webinar Funnel Users",
            icon: "📈",
            desc: "Integrate Zoom Webinars directly into your ClickFunnels/HighLevel marketing funnels to capture and convert mass leads."
        },
        {
            title: "Online Course Creators",
            icon: "📚",
            desc: "Record your entire curriculum in high-definition cloud storage and securely embed it into your LMS."
        },
        {
            title: "Enterprise Businesses",
            icon: "🏢",
            desc: "Empower your global remote workforce with Zoom Rooms, SSO integration, and unified team chat."
        }
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div style={{ display: 'inline-block', color: 'var(--accent-secondary)', background: 'rgba(139, 92, 246, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Perfect For Every Industry</div>
                    <h2>Who Benefits The Most From <span className="text-gradient">Zoom Pro?</span></h2>
                    <p className="text-muted">No matter your business model, Zoom provides the reliable infrastructure to scale your communication.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {useCases.map((useCase, i) => (
                        <div key={i} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', transition: 'transform 0.3s' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{useCase.icon}</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{useCase.title}</h3>
                            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{useCase.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
