import React from 'react';
import { SERVICES } from '@/lib/data';
import Link from 'next/link';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { CreditCard, Zap, Check } from 'lucide-react';

export default function PricingPage() {
  const residentialServices = SERVICES.filter(s => s.category === 'Residential');
  const enterpriseServices = SERVICES.filter(s => s.category === 'Enterprise');

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem' }}>
            Transparent <span style={{ color: 'var(--primary)' }}>Pricing</span>
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
            Enterprise-grade sanitization at standard market rates. No hidden fees, just precision hygiene.
          </p>
        </header>

        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Residential <span style={{ color: 'var(--secondary)' }}>Solutions</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {residentialServices.map((service) => (
              <div key={service.slug} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'var(--primary)', color: 'white', borderRadius: '0 0 0 24px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  BEST VALUE
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.name}</h3>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.6 }}>$</span>{service.basePrice}
                  <span style={{ fontSize: '1rem', opacity: 0.6 }}> / session</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {service.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', opacity: 0.8 }}>
                      <Check size={16} style={{ color: 'var(--primary)' }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/booking?service=${service.slug}`}
                  style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', textAlign: 'center', fontWeight: 'bold', border: '1px solid var(--glass-border)' }}
                >
                  Book Session
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Enterprise <span style={{ color: 'var(--primary)' }}>Partnerships</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {enterpriseServices.map((service) => (
              <div key={service.slug} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.name}</h3>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
                   <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.6 }}>$</span>{service.basePrice}
                   <span style={{ fontSize: '1rem', opacity: 0.6 }}> / baseline</span>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem' }}>Scalable volume-based pricing for national operations.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {service.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', opacity: 0.8 }}>
                      <Check size={16} style={{ color: 'var(--primary)' }} /> {f}
                    </li>
                  ))}
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', opacity: 0.8 }}>
                    <Zap size={16} style={{ color: 'var(--accent)' }} /> Priority Dispatch
                  </li>
                </ul>
                <Link 
                  href={`/booking?service=${service.slug}`}
                  style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                >
                  Open Corporate Account
                </Link>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: '6rem', textAlign: 'center' }}>
          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', maxWidth: '800px', margin: '0 auto' }}>
             <h3>Custom Enterprise Quote?</h3>
             <p style={{ opacity: 0.7, marginBottom: '2rem' }}>For national contracts exceeding 100+ nodes, our autonomous pricing librarian will generate a custom proposal.</p>
             <Link href="/contact" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Contact Global Sales →</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
