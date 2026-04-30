import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Star, ShieldCheck, Clock, Zap } from 'lucide-react';
import { STATES } from '@/lib/data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
}

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_URL}/api/mythos?resource=services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services || [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return STATES.map((state) => ({
    state: state.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { state: string } }) {
  const state = STATES.find((s) => s.code.toLowerCase() === params.state.toLowerCase());
  if (!state) return { title: 'Not Found' };
  return {
    title: `Cleaning Services in ${state.name} — NAVYA MYTHOS`,
    description: `Professional cleaning services across ${state.name}. End of lease, commercial, NDIS, and residential cleaning with AEO-verified compliance.`,
  };
}

const stateInfo: Record<string, { cities: string[]; phone: string; rating: number; since: string }> = {
  NSW: { cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'], phone: '02 8765 4321', rating: 4.9, since: '2023' },
  VIC: { cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'], phone: '03 8765 4321', rating: 4.8, since: '2023' },
  QLD: { cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns'], phone: '07 8765 4321', rating: 4.9, since: '2024' },
  WA: { cities: ['Perth', 'Fremantle', 'Bunbury', 'Mandurah'], phone: '08 8765 4321', rating: 4.7, since: '2024' },
  SA: { cities: ['Adelaide', 'Mount Gambier', 'Whyalla', 'Port Augusta'], phone: '08 7654 3210', rating: 4.8, since: '2024' },
  TAS: { cities: ['Hobart', 'Launceston', 'Devonport', 'Burnie'], phone: '03 6543 2109', rating: 4.6, since: '2025' },
  ACT: { cities: ['Canberra', 'Belconnen', 'Woden', 'Gungahlin'], phone: '02 6543 2109', rating: 4.9, since: '2023' },
  NT: { cities: ['Darwin', 'Alice Springs', 'Katherine', 'Tennant Creek'], phone: '08 6543 2109', rating: 4.5, since: '2025' },
};

export default async function StatePage({ params }: { params: { state: string } }) {
  const state = STATES.find((s) => s.code.toLowerCase() === params.state.toLowerCase());
  const services = await getServices();

  if (!state) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>State Not Found</h1>
          <Link href="/locations" style={{ color: 'var(--primary)' }}>← Back to all locations</Link>
        </div>
      </main>
    );
  }

  const info = stateInfo[state.code] || null;

  return (
    <main style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '2rem 2rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <MapPin size={48} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
            Cleaning Services in{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{state.name}</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', opacity: 0.6, maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Professional residential and commercial cleaning across {state.name}. 
            AEO-verified compliance, police-checked technicians, and 48-hour dispatch.
          </p>
          {info && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Star size={16} fill="#ffd93d" color="#ffd93d" /> {info.rating} customer rating
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Phone size={16} /> {info.phone}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Areas */}
      {info && (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 3rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1rem', fontWeight: 600 }}>Service Areas in {state.name}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {info.cities.map(city => (
                <span key={city} style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}>{city}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}>
            <ShieldCheck size={28} style={{ color: 'var(--primary)', marginBottom: '0.8rem' }} />
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>AEO Verified</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.5 }}>All services meet Australian Answer Engine Optimization compliance standards.</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}>
            <Clock size={28} style={{ color: 'var(--secondary)', marginBottom: '0.8rem' }} />
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>48-Hour Dispatch</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.5 }}>Rapid deployment across {state.name} with guaranteed turnaround times.</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}>
            <Zap size={28} style={{ color: 'var(--accent)', marginBottom: '0.8rem' }} />
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Bond Back Guarantee</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.5 }}>End of lease cleaning backed by our 100% satisfaction guarantee.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
          Available Services in {state.name}
        </h2>
        {services.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.4 }}>Services loading...</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{service.name}</h3>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    background: service.category === 'Residential' ? 'rgba(0,212,255,0.15)' : 'rgba(123,47,247,0.15)',
                    color: service.category === 'Residential' ? '#00d4ff' : '#7b2ff7',
                  }}>{service.category}</span>
                </div>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: 1.4, margin: 0 }}>
                  {service.description.substring(0, 100)}...
                </p>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)' }}>
                  From ${service.basePrice}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,47,247,0.1))',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Book in {state.name}?
          </h2>
          <p style={{ opacity: 0.6, marginBottom: '2rem', lineHeight: 1.6 }}>
            Get an instant quote and schedule your clean in minutes.
          </p>
          <Link href="/booking" style={{
            display: 'inline-block',
            padding: '0.9rem 2.5rem',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
          }}>
            Get a Free Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
