import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { Shield, Zap, Target, BarChart3 } from 'lucide-react';
import { EndOfLeaseCalculator } from '@/components/EndOfLeaseCalculator';
import { SERVICES } from '@/lib/data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function staticServices() {
  return SERVICES.map(s => ({ id: s.slug, slug: s.slug, name: s.name, description: s.description, basePrice: s.basePrice, category: s.category }));
}

async function getServices() {
  try {
    const res = await fetch(`${API_URL}/api/mythos?resource=services`, { next: { revalidate: 60 } });
    if (!res.ok) return staticServices();
    const data = await res.json();
    const apiServices = data.services || [];
    return apiServices.length === 0 ? staticServices() : apiServices;
  } catch {
    return staticServices();
  }
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service: { slug: string }) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const services = await getServices();
  const service = services.find((s: { slug: string }) => s.slug === params.slug);

  if (!service) {
    return (
      <main style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Service <span style={{ color: 'var(--primary)' }}>Not Found</span></h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem', textAlign: 'center' }}>
          The service you&apos;re looking for does not exist or has been removed.
        </p>
        <Link href="/services" style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', fontWeight: 'bold', border: '1px solid var(--glass-border)' }}>
          Back to Services
        </Link>
      </main>
    );
  }

  const basePrice = service.basePrice || 0;

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '900' }}>
            {service.name.split(' ').slice(0, -1).join(' ')} <span style={{ color: 'var(--primary)' }}>{service.name.split(' ').pop()}</span>
          </h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
            {service.description}
          </p>
          <span style={{
            display: 'inline-block', marginTop: '1rem',
            fontSize: '0.8rem', padding: '0.3rem 1rem', borderRadius: '999px',
            background: service.category === 'Enterprise' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(6, 182, 212, 0.2)',
            color: service.category === 'Enterprise' ? 'var(--secondary)' : 'var(--primary)',
            border: '1px solid var(--glass-border)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {service.category}
          </span>
        </header>

        <BentoGrid>
          <BentoItem span={2} style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Service <span style={{ color: 'var(--secondary)' }}>Overview</span></h2>
            <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: '1.8' }}>
              {service.description} Our {service.category.toLowerCase()} cleaning service is designed to meet the highest standards of hygiene and professionalism, ensuring optimal results for your specific needs.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary)' }}><Shield size={20} /></div>
                <span style={{ fontWeight: 'bold' }}>Compliance Certified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary)' }}><Zap size={20} /></div>
                <span style={{ fontWeight: 'bold' }}>Professional Grade</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary)' }}><Target size={20} /></div>
                <span style={{ fontWeight: 'bold' }}>Precision Targeting</span>
              </div>
            </div>
          </BentoItem>

          <BentoItem style={{ padding: '3rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}>
            <h3>Starting Investment</h3>
            <div style={{ fontSize: '4rem', fontWeight: '900', margin: '1rem 0' }}>${basePrice}</div>
            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Base rate for standard {service.category.toLowerCase()} cleaning.</p>
            <Link
              href={`/booking?service=${service.slug}`}
              style={{
                display: 'block', padding: '1.2rem', borderRadius: '12px', background: 'white',
                color: 'black', fontWeight: 'bold', textAlign: 'center'
              }}
            >
              Initialize Dispatch
            </Link>
          </BentoItem>

          <BentoItem span={3} style={{ padding: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
              <div>
                <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><Shield size={32} /></div>
                <h4>Compliance Certified</h4>
                <p style={{ opacity: 0.7 }}>Exceeding 2026 Australian standards for {service.category.toLowerCase()} hygiene protocols.</p>
              </div>
              <div>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Target size={32} /></div>
                <h4>Precision Targeting</h4>
                <p style={{ opacity: 0.7 }}>Molecular-grade sanitization targeting specific pathogen markers in {service.category.toLowerCase()} environments.</p>
              </div>
              <div>
                <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}><BarChart3 size={32} /></div>
                <h4>Real-time Telemetry</h4>
                <p style={{ opacity: 0.7 }}>Instantaneous data injection into your AEO dashboard for verifiable hygiene audits.</p>
              </div>
            </div>
          </BentoItem>
        </BentoGrid>

        {/* Special Placeholder for End of Lease Calculator */}
        {service.slug === 'end-of-lease-cleaning' ? (
          <section style={{ marginTop: '6rem', position: 'relative' }} id="bond-calculator">
             {/* Background ambient glow */}
             <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(100px)', zIndex: -1 }}></div>

             <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '1rem' }}>Node <span style={{ color: 'var(--primary)' }}>Estimation</span> Matrix</h2>
                <p style={{ opacity: 0.7, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Precision algorithmic quoting for your specific property constraints.</p>
             </div>
             <EndOfLeaseCalculator serviceSlug={service.slug} basePrice={basePrice} />
          </section>
        ) : (
          <section style={{ marginTop: '6rem', position: 'relative' }}>
             {/* Background ambient glow */}
             <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(100px)', zIndex: -1 }}></div>

             <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '1rem' }}>Instant <span style={{ color: 'var(--primary)' }}>Quote</span></h2>
                <p style={{ opacity: 0.7, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Configure your facility node for immediate dispatch estimation.</p>
             </div>
             <EndOfLeaseCalculator serviceSlug={service.slug} basePrice={basePrice} />
          </section>
        )}
      </div>
    </main>
  );
}
