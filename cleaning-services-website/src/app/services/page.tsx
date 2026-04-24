'use client';

import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>
        Enterprise <span style={{ color: 'var(--primary)' }}>Services</span>
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '4rem', textAlign: 'center', maxWidth: '800px' }}>
        Discover our comprehensive suite of autonomous cleaning solutions powered by the NAVYA MYTHOS 2026 framework.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
        {[
          { title: "Standard Maintenance", desc: "Daily fleet deployment for consistent pathogen reduction and ambient sanitization.", price: "From $500/mo" },
          { title: "Deep Sterilization", desc: "Molecular-grade bio-safe treatments utilizing focused acoustic waves and UV-C drones.", price: "From $1500/mo" },
          { title: "Emergency Response", desc: "Instantaneous dispatch protocols with sub-2-hour arrival guarantees worldwide.", price: "Custom Quote" },
          { title: "AEO Audit Compliance", desc: "Automated real-time hygiene logging specifically built for algorithmic answer engines.", price: "Included" }
        ].map((service, idx) => (
          <div key={idx} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{service.title}</h3>
            <p style={{ opacity: 0.8, flex: 1, marginBottom: '2rem' }}>{service.desc}</p>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>{service.price}</div>
            <Link href="/booking" style={{ padding: '1rem', textAlign: 'center', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', fontWeight: 'bold', border: '1px solid var(--glass-border)' }}>
              Schedule Now
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
