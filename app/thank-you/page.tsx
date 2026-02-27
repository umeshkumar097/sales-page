import Link from "next/link";
import styles from "./ThankYou.module.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function ThankYou() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={`container ${styles.container}`}>
                    <div className={styles.successIcon}>✓</div>
                    <h1>Thank You For Reaching Out!</h1>
                    <p className="text-muted">
                        We have received your inquiry. A senior technical consultant from Aiclex Technologies will review your details and connect with you within the next <strong>24 hours</strong>.
                    </p>
                    <div className={styles.details}>
                        <p>An email confirmation has been sent to your provided address.</p>
                    </div>
                    <Link href="/" className="btn btn-primary">
                        Return to Homepage
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
