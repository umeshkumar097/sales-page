import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';

const prisma = new PrismaClient();

export default async function ProposalPage({ 
    params,
    searchParams 
}: { 
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { id } = await params;
    const sParams = await searchParams;
    const leadId = parseInt(id, 10);
    
    if (isNaN(leadId)) {
        notFound();
    }

    const lead = await prisma.lead.findUnique({
        where: { id: leadId }
    });

    if (!lead) {
        notFound();
    }

    const price = sParams.price as string || "Custom Quote";
    const timeline = sParams.timeline as string || "TBD";
    const scope = sParams.scope as string || lead.projectType;

    const date = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Formatting currency logic 
    const formattedPrice = !isNaN(Number(price)) 
        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(price))
        : price;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', maxWidth: '800px', margin: '0 auto', padding: '40px', background: 'white' }}>
            <PrintButton />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #2D8CFF', paddingBottom: '20px', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ margin: '0 0 5px 0', color: '#1e293b', fontSize: '28px' }}>Aiclex Technologies</h1>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Connecting Businesses Digitally</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ margin: '0 0 5px 0', color: '#2D8CFF', fontSize: '24px' }}>PROJECT PROPOSAL</h2>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Date: {date}</p>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Prop ID: #{lead.id + 1000}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#1e293b' }}>Prepared For:</h3>
                    <p style={{ margin: '2px 0' }}><strong>{lead.company || lead.name}</strong></p>
                    <p style={{ margin: '2px 0' }}>{lead.name}</p>
                    <p style={{ margin: '2px 0' }}>{lead.email}</p>
                    <p style={{ margin: '2px 0' }}>{lead.phone}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#1e293b' }}>Prepared By:</h3>
                    <p style={{ margin: '2px 0' }}><strong>Sales Team</strong></p>
                    <p style={{ margin: '2px 0' }}>Aiclex Technologies</p>
                    <p style={{ margin: '2px 0' }}>sales@aiclex.in</p>
                    <p style={{ margin: '2px 0' }}>+91 98718 81183</p>
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', color: '#1e293b' }}>Project Overview</h3>
                <p style={{ lineHeight: '1.6', color: '#475569' }}>
                    Thank you for considering Aiclex Technologies for your digital transformation needs. Based on our discussions, we have outlined the scope of work and commercial terms for the <strong>{scope}</strong>.
                </p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
                <thead>
                    <tr style={{ background: '#f8fafc' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#1e293b' }}>Description</th>
                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #e2e8f0', color: '#1e293b' }}>Estimated Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '16px 12px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                            <strong>{scope}</strong><br />
                            <span style={{ fontSize: '13px' }}>Complete end-to-end execution, including design, development, testing, and deployment.</span>
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'right', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                            {formattedPrice}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                <div>
                    <h3 style={{ color: '#1e293b', fontSize: '16px', marginBottom: '10px' }}>Key Terms:</h3>
                    <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                        <li><strong>Timeline:</strong> Estimated completion in {timeline}.</li>
                        <li><strong>Payment Terms:</strong> 50% advance, 50% upon deployment.</li>
                        <li><strong>Validity:</strong> This proposal is valid for 15 days.</li>
                    </ul>
                </div>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#475569' }}>Subtotal:</span>
                        <span>{formattedPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#475569' }}>GST (18%):</span>
                        <span>As Applicable</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #cbd5e1', fontWeight: 'bold', fontSize: '18px', color: '#1e293b' }}>
                        <span>Total Estimated Amount:</span>
                        <span>{formattedPrice} + GST</span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textAlign: 'center' }}>
                <p>Aiclex Technologies | www.aiclex.com | G-65, New Delhi</p>
                <p>This is a system-generated document and does not require a physical signature.</p>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page { margin: 0; }
                    body { -webkit-print-color-adjust: exact; margin: 1cm; background: white; }
                    button { display: none !important; }
                }
            `}} />
        </div>
    );
}
