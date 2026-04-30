import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Building2, Star } from 'lucide-react';
import { STATES } from '@/lib/data';

const stateInfo: Record<string, { cities: string[]; phone: string; rating: number }> = {
  NSW: { cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'], phone: '02 8765 4321', rating: 4.9 },
  VIC: { cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'], phone: '03 8765 4321', rating: 4.8 },
  QLD: { cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns'], phone: '07 8765 4321', rating: 4.9 },
  WA: { cities: ['Perth', 'Fremantle', 'Bunbury', 'Mandurah'], phone: '08 8765 4321', rating: 4.7 },
  SA: { cities: ['Adelaide', 'Mount Gambier', 'Whyalla', 'Port Augusta'], phone: '08 7654 3210', rating: 4.8 },
  TAS: { cities: ['Hobart', 'Launceston', 'Devonport', 'Burnie'], phone: '03 6543 2109', rating: 4.6 },
  ACT: { cities: ['Canberra', 'Belconnen', 'Woden', 'Gungahlin'], phone: '02 6543 2109', rating: 4.9 },
  NT: { cities: ['Darwin', 'Alice Springs', 'Katherine', 'Tennant Creek'], phone: '08 6543 2109', rating: 4.5 },
};

async function getServices() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/mythos?resource=services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services || [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Service Locations — NAVYA MYTHOS | Australia-Wide Cleaning Services',
  description: 'Enterprise and residential cleaning services across all 8 Australian states and territories. AEO-verified, police-checked technicians.',
};

export default async function LocationsPage() {
  const services = await getServices();
  const serviceCount = services.length || 8;

  return (
    <main style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '2rem 2rem 4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <MapPin size={56} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
            Service Across <span style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>All of Australia</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', opacity: 0.7, maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            NAVYA MYTHOS delivers enterprise-grade cleaning services in every state and territory. 
            AEO-verified compliance, police-checked technicians, and 48-hour dispatch.
          </p>
        </div>
      </section>

      {/* State Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {STATES.map((state) => {
            const info = stateInfo[state.code];
            return (
              <Link
                key={state.code}
                href={`/locations/${state.code.toLowerCase()}`}
                className="location-card"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem',
                }}
              >
                {/* State Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>{state.code}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '0.2rem' }}>{state.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ffd93d', fontSize: '0.85rem' }}>
                    <Star size={14} fill="#ffd93d" /> {info.rating}
                  </div>
                </div>

                {/* Cities */}
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.4, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Key Service Areas</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {info.cities.map(city => (
                      <span key={city} style={{
                        padding: '0.3rem 0.7rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.7)',
                      }}>{city}</span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', opacity: 0.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={14} /> {info.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={14} /> {serviceCount} services available
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
            Need a Custom <span style={{ color: 'var(--primary)' }}>Enterprise Solution</span>?
          </h2>
          <p style={{ opacity: 0.6, marginBottom: '2rem', lineHeight: 1.6 }}>
            Multi-site portfolios, NDIS compliance, or large-scale commercial sanitization? 
            We dispatch across all states within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/booking" style={{
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
            }}>
              Get a Quote
            </Link>
            <Link href="/compliance" style={{
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
            }}>
              View Compliance
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
