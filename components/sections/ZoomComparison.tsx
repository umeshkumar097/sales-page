import styles from "./ZoomComparison.module.css";
import Link from "next/link";

export default function ZoomComparison() {
    return (
        <section className={`section ${styles.comparisonSection}`}>
            <div className="container">
                <div className={styles.headerCentered}>
                    <h2>Official Zoom Pricing vs <span className="text-gradient">Aiclex Partner Pricing</span></h2>
                    <p className="text-muted">See exactly why thousands of businesses choose to license through an authorized reseller instead of buying retail.</p>
                </div>

                <div className={`glass ${styles.tableWrapper}`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Features / Benefits</th>
                                <th className={styles.competitorCol}>Buying Directly Online</th>
                                <th className={styles.aiclexCol}>Buying via Aiclex</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>License Pricing</strong></td>
                                <td className={styles.competitorCol}>Full Retail MRSP</td>
                                <td className={styles.aiclexCol}><span className={styles.highlight}>Up to 30% B2B Discount</span></td>
                            </tr>
                            <tr>
                                <td><strong>Tax Compliance</strong></td>
                                <td className={styles.competitorCol}>International Invoice (Hard to claim Input Tax Credit)</td>
                                <td className={styles.aiclexCol}><span className={styles.highlight}>Valid Local GST/Tax Invoice for 100% Tax Claims</span></td>
                            </tr>
                            <tr>
                                <td><strong>Payment Methods</strong></td>
                                <td className={styles.competitorCol}>International Credit Card Only (With Markup Fees)</td>
                                <td className={styles.aiclexCol}><span className={styles.highlight}>NEFT, RTGS, Bank Transfer, UPI without extra fees</span></td>
                            </tr>
                            <tr>
                                <td><strong>Support Speed</strong></td>
                                <td className={styles.competitorCol}>Generic Email Tickets</td>
                                <td className={styles.aiclexCol}><span className={styles.highlight}>Dedicated Account Manager on WhatsApp</span></td>
                            </tr>
                            <tr>
                                <td><strong>Auto-Renewals</strong></td>
                                <td className={styles.competitorCol}>Automatic Card Deductions</td>
                                <td className={styles.aiclexCol}><span className={styles.highlight}>Manual Invoicing & Transparent Reminders</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link href="#contact" className="btn btn-primary">
                        Switch & Save Money Today
                    </Link>
                </div>
            </div>
        </section>
    );
}
