export default function ZoomHowItWorks() {
    return (
        <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <h2>How The Reseller Process <span className="text-gradient">Works</span></h2>
                    <p className="text-muted">Getting your discounted Zoom licenses is fast, secure, and compliance-friendly.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', position: 'relative' }}>
                    {/* Step 1 */}
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}>1</div>
                        <h3>Choose Your Plan</h3>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>Fill out the inquiry form with your required license type (Pro, Business, Webinar) and expected quantity. Our team will instantly send you a discounted quote.</p>
                    </div>

                    {/* Step 2 */}
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}>2</div>
                        <h3>Make Payment</h3>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>Pay securely against an official Company Tax Invoice using regular Bank Transfer (NEFT/RTGS) or UPI, avoiding all pesky international credit card markup fees.</p>
                    </div>

                    {/* Step 3 */}
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}>✓</div>
                        <h3>Account Activated</h3>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>Within a few hours, the licenses are provisioned directly to your existing Zoom email. No data loss, no changing accounts. You're ready to host!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
