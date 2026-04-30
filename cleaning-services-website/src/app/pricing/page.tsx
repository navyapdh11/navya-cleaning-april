import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { Metadata } from 'next';
import { Shield, Zap, Star, Check, ArrowRight, Building2, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparent Pricing — NAVYA MYTHOS Cleaning Services',
  description: 'Upfront pricing for 8+ specialist cleaning services across Australia. No hidden fees. Bond-back guarantee included. Book online in 2 minutes.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Transparent Cleaning Prices — Nationwide | NAVYA MYTHOS',
    description: 'Upfront pricing for 8+ specialist cleaning services. No hidden fees. Book online in 2 minutes.',
    type: 'website',
    locale: 'en_AU',
    siteName: 'NAVYA MYTHOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparent Cleaning Prices — Nationwide | NAVYA MYTHOS',
    description: 'Upfront pricing for 8+ specialist cleaning services. No hidden fees.',
  },
};

interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
}

function staticServices(): Service[] {
  return SERVICES.map(s => ({ id: s.slug, slug: s.slug, name: s.name, description: s.description, basePrice: s.basePrice, category: s.category }));
}

async function getServices(): Promise<Service[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/mythos?resource=services`, { next: { revalidate: 60 } });
    if (!res.ok) return staticServices();
    const data = await res.json();
    const apiServices = data.services || [];
    return apiServices.length === 0 ? staticServices() : apiServices;
  } catch {
    return staticServices();
  }
}

const trustGuarantees = [
  { icon: Shield, title: 'Bond-Back Guarantee', desc: '100% refund if your real estate agent rejects the clean' },
  { icon: Zap, title: 'Same-Day Service', desc: 'Book before 10am for same-day cleaning in metro areas' },
  { icon: Star, title: 'Police-Checked Staff', desc: 'Every cleaner has a current National Police Check' },
  { icon: Check, title: 'Fully Insured', desc: '$20M public liability coverage on every job' },
];

const faqs = [
  { q: 'Are your cleaners insured?', a: 'Yes — every cleaner is covered by $20M public liability insurance and has a current National Police Check.' },
  { q: 'What is your bond-back guarantee?', a: 'If your real estate agent rejects the clean, we will return and reclean at no cost. If they still reject it, we refund 100% of your payment.' },
  { q: 'Do you bring your own supplies?', a: 'Yes — we bring all professional-grade, eco-friendly cleaning products and equipment.' },
  { q: 'Can I reschedule or cancel?', a: 'Free cancellation up to 24 hours before your scheduled clean. Late cancellations may incur a $50 fee.' },
  { q: 'How do I pay?', a: 'We accept bank transfer, credit/debit cards (Visa, Mastercard), PayPal, and cash. Payment is only required after the clean is completed.' },
];

export default async function PricingPage() {
  const services = await getServices();
  const residentialServices = services.filter(s => s.category === 'Residential' || s.category === 'residential');
  const enterpriseServices = services.filter(s => s.category === 'Enterprise' || s.category === 'enterprise');

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '8rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(100px)', zIndex: -1 }} />
        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
          Transparent <span style={{ color: 'var(--primary)' }}>Pricing</span>
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto 3rem' }}>
          Upfront, honest pricing for all cleaning services. No hidden fees, no surprises — just exceptional results.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Book Now <ArrowRight size={18} />
          </Link>
          <Link href="/contact" style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'inherit', fontWeight: 'bold', textDecoration: 'none', border: '1px solid var(--glass-border)' }}>
            Get Custom Quote
          </Link>
        </div>
      </section>

      {/* Trust Guarantees */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {trustGuarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Icon size={32} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{g.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{g.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Residential Services */}
      {residentialServices.length > 0 && (
        <section style={{ padding: '2rem 2rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <Home size={24} color="var(--primary)" />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>
              Residential <span style={{ color: 'var(--primary)' }}>Solutions</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {residentialServices.map((service) => (
              <div key={service.id || service.slug} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.6rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '0 0 0 24px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {service.category}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{service.name}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem', minHeight: '2.5rem' }}>
                  {service.description}
                </p>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.6 }}>$</span>{service.basePrice}
                  <span style={{ fontSize: '1rem', opacity: 0.6 }}> / session</span>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  {SERVICES.find(s => s.slug === service.slug)?.features.slice(0, 3).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.3rem' }}>
                      <Check size={14} color="var(--primary)" /> {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/booking?service=${service.slug}`}
                  style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', textAlign: 'center', fontWeight: 'bold', border: '1px solid var(--glass-border)', textDecoration: 'none', color: 'inherit' }}
                >
                  Book This Service →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enterprise Services */}
      {enterpriseServices.length > 0 && (
        <section style={{ padding: '2rem 2rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <Building2 size={24} color="var(--secondary)" />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>
              Enterprise <span style={{ color: 'var(--secondary)' }}>Partnerships</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {enterpriseServices.map((service) => (
              <div key={service.id || service.slug} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--secondary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.6rem 1rem', background: 'var(--secondary)', color: 'white', borderRadius: '0 0 0 24px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {service.category}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{service.name}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem', minHeight: '2.5rem' }}>
                  {service.description}
                </p>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem', verticalAlign: 'top', opacity: 0.6 }}>$</span>{service.basePrice}
                  <span style={{ fontSize: '1rem', opacity: 0.6 }}> / baseline</span>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  {SERVICES.find(s => s.slug === service.slug)?.features.slice(0, 3).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.3rem' }}>
                      <Check size={14} color="var(--secondary)" /> {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/booking?service=${service.slug}`}
                  style={{ display: 'block', padding: '1rem', borderRadius: '12px', background: 'var(--secondary)', color: 'white', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}
                >
                  Request Enterprise Quote →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '3rem' }}>
          Frequently Asked <span style={{ color: 'var(--primary)' }}>Questions</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <details key={i} className="glass" style={{ borderRadius: '16px', padding: '1.5rem', cursor: 'pointer' }}>
              <summary style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{faq.q}</summary>
              <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6', paddingLeft: '1rem' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
        <div className="glass" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', maxWidth: '700px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Need a Custom Quote?</h3>
          <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '1.1rem' }}>
            For national contracts or large-scale facilities, we generate custom proposals tailored to your exact requirements.
          </p>
          <Link href="/contact" style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
