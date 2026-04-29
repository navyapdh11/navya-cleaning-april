import React from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getServices() {
  try {
    const res = await fetch(`${API_URL}/api/mythos?resource=services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services || [];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>
        Enterprise <span style={{ color: 'var(--primary)' }}>Services</span>
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '4rem', textAlign: 'center', maxWidth: '800px' }}>
        Discover our comprehensive suite of autonomous cleaning solutions powered by the NAVYA MYTHOS 2026 framework.
      </p>

      {services.length === 0 ? (
        <p style={{ opacity: 0.6, fontSize: '1.1rem' }}>No services available at this time.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
          {services.map((service: { id: string; slug: string; name: string; description: string; basePrice: number; category: string }) => (
            <div key={service.id} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.8rem' }}>{service.name}</h3>
                <span style={{
                  fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px',
                  background: service.category === 'Enterprise' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                  color: service.category === 'Enterprise' ? 'var(--secondary)' : 'var(--primary)',
                  border: '1px solid var(--glass-border)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {service.category}
                </span>
              </div>
              <p style={{ opacity: 0.8, flex: 1, marginBottom: '2rem' }}>{service.description}</p>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                From ${service.basePrice}
              </div>
              <Link href={`/services/${service.slug}`} style={{ padding: '1rem', textAlign: 'center', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', fontWeight: 'bold', border: '1px solid var(--glass-border)' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
