"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Dashboard.module.css";
import Link from "next/link";

interface Lead {
    id: number;
    leadType: string;
    name: string;
    company: string | null;
    email: string;
    phone: string;
    projectType: string;
    message: string | null;
    createdAt: string;
    meetings?: { meetingLink: string; meetingTime: string }[];
}

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sendingInvite, setSendingInvite] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState<"General" | "Web" | "Mobile" | "Zoom">("General");
    const [deletingLeadId, setDeletingLeadId] = useState<number | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [meetingLink, setMeetingLink] = useState("");
    const [meetingTime, setMeetingTime] = useState("");

    // CRM Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchLeads();

        // Check for Google Auth Status in URL
        const authSuccess = searchParams.get("success");
        const authError = searchParams.get("error");
        
        if (authSuccess === "GoogleAuthComplete") {
            setSuccessMessage("Google Calendar successfully connected!");
            router.replace("/admin/dashboard"); // Clean URL
        } else if (authError) {
            const details = searchParams.get("details");
            setError(`Failed to connect Google Calendar. Details: ${details ? decodeURIComponent(details) : "Please try again."}`);
            router.replace("/admin/dashboard");
        }
    }, [searchParams, router]);

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

    const handleSendInvite = async () => {
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

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || data.details || "Failed to send invite");
            }
            
            setSuccessMessage(`Virtual meeting invite sent successfully to ${selectedLead.name}!`);
            setTimeout(() => setSuccessMessage(""), 5000); // Clear after 5 seconds
        } catch (err: any) {
            setError(err.message || "Error sending invite. Please try again.");
        } finally {
            setSendingInvite(null);
            closeModal();
        }
    };

    const handleDeleteLead = async (id: number, name: string) => {
        if (!confirm(`Are you sure you want to permanently delete the lead from ${name}? This action cannot be undone.`)) return;
        
        setDeletingLeadId(id);
        setError("");
        try {
            const res = await fetch(`/api/admin/leads/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete lead");
            }

            // Immediately remove from UI
            setLeads(leads.filter(lead => lead.id !== id));
            setSuccessMessage(`Lead ${name} has been deleted.`);
            setTimeout(() => setSuccessMessage(""), 5000);

        } catch (err: any) {
            setError(err.message || "Error deleting lead. Please try again.");
        } finally {
            setDeletingLeadId(null);
        }
    };

    const openModal = (lead: Lead) => {
        setSelectedLead(lead);
        setMeetingTime(""); // Link will be auto-generated by the backend
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLead(null);
    };

    if (loading) return <div className={styles.loading}>Loading Dashboard...</div>;

    // Advanced CRM Filtering Logic
    const filteredLeads = leads.filter(lead => {
        // 1. Tab Filter
        if (lead.leadType !== activeTab) return false;

        // 2. Search Filter (Name, Email, Phone, Company)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch = 
                lead.name.toLowerCase().includes(query) ||
                lead.email.toLowerCase().includes(query) ||
                lead.phone.includes(query) ||
                (lead.company && lead.company.toLowerCase().includes(query));
            if (!matchesSearch) return false;
        }

        // 3. Date Range Filter
        if (startDate || endDate) {
            const leadDate = new Date(lead.createdAt);
            // reset time to midnight for accurate day comparison
            leadDate.setHours(0, 0, 0, 0); 
            
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (leadDate < start) return false;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(0, 0, 0, 0);
                if (leadDate > end) return false;
            }
        }

        return true;
    });

    const isNewLead = (createdAt: string) => {
        const leadDate = new Date(createdAt).getTime();
        const now = Date.now();
        const hours24 = 24 * 60 * 60 * 1000;
        return (now - leadDate) < hours24;
    };

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
                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{fontSize: '20px'}}>📅</span>
                                    <div>
                                        <p style={{margin: 0, fontWeight: 600, color: '#93c5fd', fontSize: '0.9rem'}}>Google Meet Auto-Generation</p>
                                        <p style={{margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem'}}>A unique meeting link will be automatically generated and sent.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.inputGroup} style={{marginTop: '1.5rem'}}>
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
                                disabled={!meetingTime || sendingInvite !== null}
                                className="btn btn-primary"
                            >
                                {sendingInvite !== null ? "Sending..." : "Auto-Generate & Send"}
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
                    <a href="/api/admin/google/auth" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "#4285F4", color: "white", border: "none" }}>
                        Connect Google Calendar
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.statsRow}>
                    <div className={`glass ${styles.statCard}`}>
                        <h3>Total Leads</h3>
                        <p className="text-gradient">{leads.length}</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                    <button 
                        className={`btn ${activeTab === "General" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => setActiveTab("General")}
                        style={activeTab === "General" ? {} : { borderColor: "rgba(255,255,255,0.2)" }}
                    >
                        Main Leads ({leads.filter(l => l.leadType === "General").length})
                    </button>
                    <button 
                        className={`btn ${activeTab === "Web" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => setActiveTab("Web")}
                        style={activeTab === "Web" ? { background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", borderColor: "transparent" } : { borderColor: "rgba(255,255,255,0.2)" }}
                    >
                        Web Leads ({leads.filter(l => l.leadType === "Web").length})
                    </button>
                    <button 
                        className={`btn ${activeTab === "Mobile" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => setActiveTab("Mobile")}
                        style={activeTab === "Mobile" ? { background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", borderColor: "transparent" } : { borderColor: "rgba(255,255,255,0.2)" }}
                    >
                        Mobile App Leads ({leads.filter(l => l.leadType === "Mobile").length})
                    </button>
                    <button 
                        className={`btn ${activeTab === "Zoom" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => setActiveTab("Zoom")}
                        style={activeTab === "Zoom" ? { background: "linear-gradient(135deg, #2D8CFF 0%, #0050E6 100%)", boxShadow: "0 4px 14px 0 rgba(45, 140, 255, 0.4)" } : { borderColor: "rgba(255,255,255,0.2)" }}
                    >
                        Zoom Leads ({leads.filter(l => l.leadType === "Zoom").length})
                    </button>
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

                    <div className={styles.filtersContainer}>
                        <input 
                            type="text" 
                            placeholder="Search by name, email, or phone..." 
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className={styles.dateFilterGroup}>
                            <span>From:</span>
                            <input 
                                type="date" 
                                className={styles.dateInput}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className={styles.dateFilterGroup}>
                            <span>To:</span>
                            <input 
                                type="date" 
                                className={styles.dateInput}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        {(searchQuery || startDate || endDate) && (
                            <button 
                                onClick={() => { setSearchQuery(""); setStartDate(""); setEndDate(""); }}
                                className="btn" 
                                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.3)" }}
                            >
                                Clear Filters
                            </button>
                        )}
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
                                    {filteredLeads.map((lead) => (
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
                                                {isNewLead(lead.createdAt) && <span className={styles.newBadge}>NEW</span>}
                                                {lead.company && <div className="text-muted" style={{ fontSize: "0.8rem" }}>{lead.company}</div>}
                                            </td>
                                            <td>
                                                <a href={`mailto:${lead.email}`} className={styles.link}>{lead.email}</a>
                                                <br />
                                                <a href={`tel:${lead.phone}`} className={styles.link}>{lead.phone}</a>
                                            </td>
                                            <td>
                                                <span className={styles.serviceTag} style={lead.leadType === 'Zoom' ? { background: 'rgba(45, 140, 255, 0.15)', color: '#60A5FA', border: '1px solid rgba(45, 140, 255, 0.3)' } : {}}>
                                                    {lead.projectType}
                                                </span>
                                            </td>
                                            <td className={styles.messageCell}>
                                                {lead.message ? lead.message : <span className="text-muted">No message provided.</span>}
                                            </td>
                                            <td style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                                                {lead.meetings && lead.meetings.length > 0 ? (
                                                    <a 
                                                        href={lead.meetings[0].meetingLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="btn btn-primary"
                                                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "100%", textAlign: "center", display: "inline-block", backgroundColor: "#22c55e", borderColor: "#16a34a" }}
                                                    >
                                                        Start Meeting
                                                    </a>
                                                ) : (
                                                    <button 
                                                        onClick={() => openModal(lead)}
                                                        className="btn btn-primary"
                                                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "100%" }}
                                                    >
                                                        Schedule
                                                    </button>
                                                )}

                                                <div className={styles.actionIcons} style={{ width: '100%', justifyContent: 'center' }}>
                                                    <a 
                                                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name},\n\nWe received your inquiry regarding ${lead.projectType} at Aiclex Technologies.`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`${styles.actionIcon} ${styles.iconWhatsapp}`}
                                                        title="Message on WhatsApp"
                                                    >
                                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                                                    </a>
                                                    <a 
                                                        href={`mailto:${lead.email}?subject=${encodeURIComponent(`Regarding your inquiry at Aiclex Technologies`)}&body=${encodeURIComponent(`Hi ${lead.name},\n\nThank you for exploring ${lead.projectType} services with us.\n\n`)}`}
                                                        className={`${styles.actionIcon} ${styles.iconEmail}`}
                                                        title="Send Email"
                                                    >
                                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                    </a>
                                                    <button 
                                                        onClick={() => handleDeleteLead(lead.id, lead.name)}
                                                        className={`${styles.actionIcon} ${styles.iconDelete}`}
                                                        title="Delete Lead"
                                                        disabled={deletingLeadId === lead.id}
                                                    >
                                                        {deletingLeadId === lead.id ? (
                                                            <span style={{ fontSize: '0.6rem' }}>...</span>
                                                        ) : (
                                                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
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

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div style={{color: 'white', padding: '2rem'}}>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
