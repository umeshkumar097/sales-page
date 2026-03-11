export default function AppTestimonials() {
    const testimonials = [
        {
            quote: "Aiclex transformed our messy concept into a flawless React Native app in under 10 weeks. The UI is stunning and our user retention has doubled.",
            name: "Sarah Jenkins",
            role: "Founder, FinTech Startup",
            rating: "⭐⭐⭐⭐⭐"
        },
        {
            quote: "Their backend architecture is rock solid. We had 50,000 extreme concurrent users during our launch week and the app didn't crash once.",
            name: "David Chen",
            role: "CTO, EdTech Platform",
            rating: "⭐⭐⭐⭐⭐"
        },
        {
            quote: "By far the most professional development team we've hired. Transparent sprints, great communication, and genuine care for the product.",
            name: "Michael Rossi",
            role: "Director, Retail Chain",
            rating: "⭐⭐⭐⭐⭐"
        }
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <div style={{ display: 'inline-block', color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Client Success</div>
                    <h2>Don't Just Take <span className="text-gradient">Our Word For It</span></h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {testimonials.map((test, i) => (
                        <div key={i} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
                            <div style={{ fontSize: '3rem', color: 'rgba(59, 130, 246, 0.2)', position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: 'serif', lineHeight: 1 }}>"</div>
                            <div style={{ marginBottom: '1rem', fontSize: '1.2rem', letterSpacing: '2px' }}>{test.rating}</div>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '2rem', fontStyle: 'italic' }}>"{test.quote}"</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{test.name}</h4>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500 }}>{test.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
