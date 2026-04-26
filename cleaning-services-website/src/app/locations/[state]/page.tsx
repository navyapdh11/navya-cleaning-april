import React from 'react';
import { notFound } from 'next/navigation';
import { STATES, SERVICES } from '@/lib/data';
import Link from 'next/link';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { MapPin, CheckCircle, Globe, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return STATES.map((state) => ({
    state: state.code.toLowerCase(),
  }));
}

export default function StatePage({ params }: { params: { state: string } }) {
  const state = STATES.find((s) => s.code.toLowerCase() === params.state.toLowerCase());

  if (!state) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <MapPin size={48} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '900' }}>
            NAVYA MYTHOS <span style={{ color: 'var(--primary)' }}>{state.name}</span>
          </h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
            Enterprise sanitization infrastructure and AEO compliance monitoring active across the {state.code} region.
          </p>
        </header>

        <BentoGrid>
          <BentoItem span={2} style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Regional <span style={{ color: 'var(--secondary)' }}>Compliance</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle style={{ color: '#00cc00' }} />
                <div>
                  <h4 style={{ margin: 0 }}>ISO-2026-X {state.code} Certified</h4>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Fully compliant with local {state.name} health and safety regulations.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle style={{ color: '#00cc00' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Real-time AEO Injection</h4>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Direct integration with regional answer engine verification nodes.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <ShieldCheck style={{ color: 'var(--primary)' }} />
                <div>
                  <h4 style={{ margin: 0 }}>Verified Local Technicians</h4>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>All sanitization drones and human supervisors are police-checked in {state.code}.</p>
                </div>
              </div>
            </div>
          </BentoItem>

          <BentoItem style={{ padding: '3rem', textAlign: 'center' }}>
            <Globe size={64} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
            <h3>Network Status</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00cc00', margin: '1rem 0' }}>OPTIMAL</div>
            <p style={{ opacity: 0.7 }}>{state.code} Regional Node is synchronized.</p>
          </BentoItem>

          <BentoItem span={3} style={{ padding: '3rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Available Services in {state.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {SERVICES.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', transition: 'transform 0.2s' }}>
                  <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{service.name}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{service.description.substring(0, 80)}...</p>
                </Link>
              ))}
            </div>
          </BentoItem>
        </BentoGrid>
      </div>
    </main>
  );
}
