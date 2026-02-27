"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";
import Link from "next/link";

interface Lead {
    id: number;
    name: string;
    company: string | null;
    email: string;
    phone: string;
    projectType: string;
    message: string | null;
    createdAt: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads");
            if (res.status === 401) {
                router.push("/admin/login");
                return;
            }

            if (!res.ok) throw new Error("Failed to fetch leads");

            const data = await res.json();
            setLeads(data.leads);
        } catch (err) {
            setError("Error loading leads. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    if (loading) return <div className={styles.loading}>Loading Dashboard...</div>;

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h2>Aiclex<span className="text-gradient">.</span></h2>
                    <span className={styles.badge}>Admin</span>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                        View Site
                    </Link>
                    <button onClick={handleLogout} className="btn" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", border: "1px solid rgba(255,255,255,0.2)" }}>
                        Logout
                    </button>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.statsRow}>
                    <div className={`glass ${styles.statCard}`}>
                        <h3>Total Leads</h3>
                        <p className="text-gradient">{leads.length}</p>
                    </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={`glass ${styles.tableContainer}`}>
                    <div className={styles.tableHeader}>
                        <h3>Recent Inquiries</h3>
                        <button onClick={fetchLeads} className={styles.refreshBtn}>
                            ↻ Refresh
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        {leads.length === 0 ? (
                            <p className={styles.emptyState}>No leads found yet.</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Service</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead) => (
                                        <tr key={lead.id}>
                                            <td className={styles.dateCell}>
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                                <br />
                                                <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                    {new Date(lead.createdAt).toLocaleTimeString()}
                                                </span>
                                            </td>
                                            <td>
                                                <strong>{lead.name}</strong>
                                                {lead.company && <div className="text-muted" style={{ fontSize: "0.8rem" }}>{lead.company}</div>}
                                            </td>
                                            <td>
                                                <a href={`mailto:${lead.email}`} className={styles.link}>{lead.email}</a>
                                                <br />
                                                <a href={`tel:${lead.phone}`} className={styles.link}>{lead.phone}</a>
                                            </td>
                                            <td>
                                                <span className={styles.serviceTag}>{lead.projectType}</span>
                                            </td>
                                            <td className={styles.messageCell}>
                                                {lead.message ? lead.message : <span className="text-muted">No message provided.</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
