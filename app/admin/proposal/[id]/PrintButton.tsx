"use client";

import { useEffect } from "react";

export default function PrintButton() {
    useEffect(() => {
        // Auto print prompt after a slight delay to allow fonts to load
        setTimeout(() => {
            window.print();
        }, 500);
    }, []);

    return (
        <button 
            onClick={() => window.print()} 
            style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', background: '#2D8CFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
            🖨️ Print / Save as PDF
        </button>
    );
}
