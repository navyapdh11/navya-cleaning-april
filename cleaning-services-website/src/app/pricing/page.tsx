import React from 'react';
import Link from 'next/link';

interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
}

async function getServices(): Promise<Service[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/mythos?resource=services`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }

  const data = await res.json();
  return data.services || [];
}

export default async function PricingPage() {
  let services: Service[] = [];
  try {
    services = await getServices();
  } catch {
    // If API fails, show empty state
  }

  const residentialServices = services.filter(s => s.category === 'Residential');
  const enterpriseServices = services.filter(s => s.category === 'Enterprise');

  const hasAnyServices = services.length > 0;

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

        {!hasAnyServices ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>No services available at the moment.</p>
            <p style={{ fontSize: '1rem', opacity: 0.5, marginTop: '1rem' }}>Please check back later.</p>
          </div>
        ) : (
          <>
            {residentialServices.length > 0 && (
              <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
                  Residential <span style={{ color: 'var(--secondary)' }}>Solutions</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  {residentialServices.map((service) => (
                    <div key={service.id || service.slug} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.6rem 1rem', background: 'var(--secondary)', color: 'white', borderRadius: '0 0 0 24px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {service.category}
                      </div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.name}</h3>
                      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem', minHeight: '2.5rem' }}>
                        {service.description}
                      </p>
                      <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.6 }}>$</span>{service.basePrice}
                        <span style={{ fontSize: '1rem', opacity: 0.6 }}> / session</span>
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', textAlign: 'center', fontWeight: 'bold', border: '1px solid var(--glass-border)', textDecoration: 'none', color: 'inherit' }}
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {enterpriseServices.length > 0 && (
              <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
                  Enterprise <span style={{ color: 'var(--primary)' }}>Partnerships</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  {enterpriseServices.map((service) => (
                    <div key={service.id || service.slug} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--primary)' }}>
                      <div style={{ display: 'inline-block', padding: '0.4rem 0.8rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        {service.category}
                      </div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.name}</h3>
                      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem', minHeight: '2.5rem' }}>
                        {service.description}
                      </p>
                      <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.6 }}>$</span>{service.basePrice}
                        <span style={{ fontSize: '1rem', opacity: 0.6 }}> / baseline</span>
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

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
