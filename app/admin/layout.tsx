import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard | Aiclex',
    description: 'Aiclex Technologies Admin Area',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout" style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
            {children}
        </div>
    );
}
