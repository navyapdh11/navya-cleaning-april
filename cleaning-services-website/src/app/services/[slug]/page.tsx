import React from 'react';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/data';
import Link from 'next/link';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { Shield, Zap, Target, BarChart3 } from 'lucide-react';
import { EndOfLeaseCalculator } from '@/components/EndOfLeaseCalculator';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

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
        </header>

        <BentoGrid>
          <BentoItem span={2} style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Enterprise <span style={{ color: 'var(--secondary)' }}>Features</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {service.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--primary)' }}><Zap size={20} /></div>
                  <span style={{ fontWeight: 'bold' }}>{feature}</span>
                </div>
              ))}
            </div>
          </BentoItem>

          <BentoItem style={{ padding: '3rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}>
            <h3>Starting Investment</h3>
            <div style={{ fontSize: '4rem', fontWeight: '900', margin: '1rem 0' }}>${service.basePrice}</div>
            <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Base rate for standard enterprise nodes.</p>
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
             <EndOfLeaseCalculator serviceSlug={service.slug} basePrice={service.basePrice} />
          </section>
        ) : (
          <section style={{ marginTop: '6rem', position: 'relative' }}>
             {/* Background ambient glow */}
             <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(100px)', zIndex: -1 }}></div>
             
             <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '1rem' }}>Instant <span style={{ color: 'var(--primary)' }}>Quote</span></h2>
                <p style={{ opacity: 0.7, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Configure your facility node for immediate dispatch estimation.</p>
             </div>
             <EndOfLeaseCalculator serviceSlug={service.slug} basePrice={service.basePrice} />
          </section>
        )}
      </div>
    </main>
  );
}
