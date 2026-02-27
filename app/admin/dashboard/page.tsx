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
    const [sendingInvite, setSendingInvite] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [meetingLink, setMeetingLink] = useState("");
    const [meetingTime, setMeetingTime] = useState("");

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

        if (!selectedLead) return;
        setSendingInvite(selectedLead.id);
        setError("");
        setSuccessMessage("");
        try {
            const res = await fetch("/api/admin/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: selectedLead.email, 
                    name: selectedLead.name, 
                    projectType: selectedLead.projectType,
                    meetingLink,
                    meetingTime
                })
            });

            if (!res.ok) throw new Error("Failed to send invite");
            
            setSuccessMessage(`Virtual meeting invite sent successfully to ${lead.name}!`);
            setTimeout(() => setSuccessMessage(""), 5000); // Clear after 5 seconds
        } catch (err) {
            setError("Error sending invite. Please try again.");
        } finally {
            setSendingInvite(null);
            closeModal();
        }
    };

    const openModal = (lead: Lead) => {
        setSelectedLead(lead);
        setMeetingLink("");
        setMeetingTime("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLead(null);
    };

    if (loading) return <div className={styles.loading}>Loading Dashboard...</div>;

    return (
        <div className={styles.dashboardContainer}>
            {/* Modal Overlay */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={`glass ${styles.modalContent}`}>
                        <div className={styles.modalHeader}>
                            <h3>Schedule Meeting</h3>
                            <button onClick={closeModal} className={styles.closeBtn}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p style={{marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem'}}>
                                Sending invite to <strong>{selectedLead?.name}</strong> for <strong>{selectedLead?.projectType}</strong>.
                            </p>
                            
                            <div className={styles.inputGroup}>
                                <label htmlFor="meetingLink">Meeting Link (Google Meet / Zoom)</label>
                                <input 
                                    type="url" 
                                    id="meetingLink" 
                                    className="form-control"
                                    value={meetingLink}
                                    onChange={(e) => setMeetingLink(e.target.value)}
                                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                />
                            </div>
                            
                            <div className={styles.inputGroup} style={{marginTop: '1rem'}}>
                                <label htmlFor="meetingTime">Meeting Date & Time</label>
                                <input 
                                    type="text" 
                                    id="meetingTime" 
                                    className="form-control"
                                    value={meetingTime}
                                    onChange={(e) => setMeetingTime(e.target.value)}
                                    placeholder="e.g. Tomorrow at 2:00 PM IST"
                                />
                            </div>
                        </div>
                        <div className={styles.modalFooter} style={{marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                            <button onClick={closeModal} className="btn" style={{background: 'transparent', border: '1px solid #334155'}}>Cancel</button>
                            <button 
                                onClick={handleSendInvite} 
                                disabled={!meetingLink || !meetingTime || sendingInvite !== null}
                                className="btn btn-primary"
                            >
                                {sendingInvite !== null ? "Sending..." : "Send Secure Invite"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                {successMessage && <div className={styles.success} style={{background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#86efac', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem'}}>{successMessage}</div>}

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
                                        <th>Actions</th>
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
                                            <td>
                                                <button 
                                                    onClick={() => openModal(lead)}
                                                    className="btn btn-primary"
                                                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "100%" }}
                                                >
                                                    Schedule
                                                </button>
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
