'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { BentoGrid, BentoItem, FlashCard } from "@/components/InteractiveElements";
import { DynamicQuoting } from "@/components/DynamicQuoting";
import { CROEngine } from "@/lib/cro-engine";
import { SERVICES, STATES } from "@/lib/data";
import { Shield, Zap, Globe, Users, Building2, Briefcase, ArrowRight, Star, Sparkles } from 'lucide-react';

// ─── Types ───

interface FlashcardData {
  id: string;
  title: string;
  content: string;
  icon: string;
  category: string;
  isActive: boolean;
  order: number;
}

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  imageUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
}

interface PageContentEntry {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
}

interface SiteConfig {
  siteTitle?: string;
  phone?: string;
  email?: string;
  [key: string]: unknown;
}

// ─── Helper: build a lookup map from PageContent entries ───

function contentMap(entries: PageContentEntry[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const e of entries) {
    map[`${e.section}.${e.key}`] = e.value;
  }
  return map;
}

// ─── Star Rating Component ───

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', color: 'var(--primary)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={18}
          fill={i <= rating ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

// ─── FlashCard Component with 3D tilt ───

function TiltCard({ card }: { card: FlashcardData }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  return (
    <div
      className="glass"
      style={{
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-xl)',
        transform: isHovered
          ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
        transition: 'transform 0.15s ease-out',
        cursor: 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>
        {card.icon || '🧹'}
      </div>
      <h3 style={{
        fontSize: 'var(--text-lg)',
        fontWeight: '700',
        marginBottom: 'var(--space-3)',
      }}>
        {card.title}
      </h3>
      <p style={{
        color: 'var(--foreground-secondary)',
        fontSize: 'var(--text-sm)',
        lineHeight: 'var(--leading-relaxed)',
      }}>
        {card.content}
      </p>
      {card.category && (
        <span
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-4)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: 'var(--text-xs)',
            background: 'rgba(124, 58, 237, 0.15)',
            color: 'var(--secondary)',
          }}
        >
          {card.category}
        </span>
      )}
    </div>
  );
}

// ─── Main Page ───

export default function Home() {
  // Dynamic state
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [pageContent, setPageContent] = useState<PageContentEntry[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flashcardsRes, testimonialsRes, pageContentRes, configRes] = await Promise.all([
          fetch('/api/mythos?resource=flashcards'),
          fetch('/api/mythos?resource=testimonials'),
          fetch('/api/mythos?action=get_page_content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get_page_content', payload: { page: 'home' } }),
          }),
          fetch('/api/mythos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get_config' }),
          }),
        ]);

        if (flashcardsRes.ok) {
          const data = await flashcardsRes.json();
          setFlashcards((data.flashcards || []).filter((fc: FlashcardData) => fc.isActive));
        }

        if (testimonialsRes.ok) {
          const data = await testimonialsRes.json();
          setTestimonials((data.testimonials || []).filter((t: TestimonialData) => t.isActive));
        }

        if (pageContentRes.ok) {
          const data = await pageContentRes.json();
          setPageContent(data.contents || []);
        }

        if (configRes.ok) {
          const data = await configRes.json();
          setSiteConfig(data.configs || {});
        }
      } catch (err) {
        console.error('Failed to fetch homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Resolve page content values with fallbacks
  const content = contentMap(pageContent);
  const heroTitle = content['hero.title'] || 'Next-Gen <span class="text-gradient">Sanitization</span>';
  const heroSubtitle = content['hero.subtitle'] || 'Enterprise-grade hygiene powered by autonomous systems, national-scale logistics, and self-learning optimization for the 2026 market.';
  const heroBadge = content['hero.badge'] || "Australia's First AEO-Verified Sanitization Network";
  const heroCtaPrimary = content['hero.cta_primary'] || 'Initialize Dispatch';
  const heroCtaSecondary = content['hero.cta_secondary'] || 'View Pricing';
  const portalsTitle = content['portals.title'] || 'Enterprise <span class="text-gradient-accent">Access</span> Portals';
  const portalsSubtitle = content['portals.subtitle'] || 'Specialized compliance and dispatch systems for every sector.';
  const coverageTitle = content['coverage.title'] || 'National <span class="text-gradient">Infrastructure</span>';
  const coverageSubtitle = content['coverage.subtitle'] || 'Active nodes and AEO compliance monitoring across all Australian territories.';
  const bentoTitle = content['bento.title'] || 'Enterprise <span class="text-gradient">Core</span> Capabilities';

  const handleLaunchQuote = () => {
    CROEngine.getInstance().trackEngagement('click_cta', { location: 'hero' });
  };

  return (
    <main className={styles.main}>
      <div className="bg-mesh"></div>

      {/* Hero Section */}
      <section className="section" style={{ paddingTop: 'clamp(6rem, 10vw, 10rem)' }}>
        <div className="container-sm">
          <div className="glass" style={{
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 3rem)',
            borderRadius: 'var(--radius-2xl)',
            textAlign: 'center',
          }}>
            <div className="hero-badge">
              <span className="badge-indicator"></span>
              {heroBadge}
            </div>

            <h1
              style={{
                fontSize: 'var(--text-5xl)',
                lineHeight: 'var(--leading-tight)',
                marginBottom: 'var(--space-8)',
                fontWeight: '900',
                letterSpacing: 'var(--tracking-tighter)',
              }}
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />

            <p
              style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--foreground-secondary)',
                marginBottom: 'var(--space-12)',
                maxWidth: '720px',
                margin: '0 auto var(--space-12) auto',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {heroSubtitle}
            </p>

            <div className="hero-cta-group">
              <Link
                href="/booking"
                onClick={handleLaunchQuote}
                className="btn btn-primary btn-lg"
              >
                {heroCtaPrimary}
                <ArrowRight size={20} strokeWidth={2.5} />
              </Link>
              <Link href="/pricing" className="btn btn-outline btn-lg">
                {heroCtaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Quoting Section */}
      <DynamicQuoting />

      {/* Enterprise Portals Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 dangerouslySetInnerHTML={{ __html: portalsTitle }} />
            <p className="section-subtitle">{portalsSubtitle}</p>
          </div>

          <div className="portal-grid">
            <Link href="/enterprise/ndis" className="portal-card glass">
              <div className="portal-icon" style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--secondary)' }}>
                <Users size={40} strokeWidth={1.5} />
              </div>
              <h3>NDIS Participants</h3>
              <p>Dedicated compliance and direct billing flow for NDIS plan managers and self-managed participants.</p>
              <span className="portal-link" style={{ color: 'var(--secondary)' }}>
                Enter NDIS Portal <ArrowRight size={16} />
              </span>
            </Link>

            <Link href="/enterprise/real-estate" className="portal-card glass">
              <div className="portal-icon" style={{ background: 'rgba(0, 112, 243, 0.1)', color: 'var(--primary)' }}>
                <Building2 size={40} strokeWidth={1.5} />
              </div>
              <h3>Real Estate B2B</h3>
              <p>Bulk bond cleaning dispatch for property managers with full CRM data synchronization.</p>
              <span className="portal-link" style={{ color: 'var(--primary)' }}>
                Enter Partner Hub <ArrowRight size={16} />
              </span>
            </Link>

            <Link href="/enterprise/corporate" className="portal-card glass">
              <div className="portal-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--accent)' }}>
                <Briefcase size={40} strokeWidth={1.5} />
              </div>
              <h3>Corporate Hub</h3>
              <p>National-scale sanitization for office networks, retail chains, and industrial facilities.</p>
              <span className="portal-link" style={{ color: 'var(--accent)' }}>
                Enter Corporate Portal <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* National Coverage Section */}
      <section className="section" style={{ background: 'var(--background-subtle)' }}>
        <div className="container-sm">
          <div className="section-header">
            <h2 dangerouslySetInnerHTML={{ __html: coverageTitle }} />
            <p className="section-subtitle">{coverageSubtitle}</p>
          </div>
          <div className="state-grid">
            {STATES.map((state) => (
              <Link
                key={state.code}
                href={`/locations/${state.code.toLowerCase()}`}
                className="state-chip glass"
              >
                <span className="state-code">{state.code}</span>
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="section">
        <div className="section-header">
          <h2 dangerouslySetInnerHTML={{ __html: bentoTitle }} />
        </div>
        <BentoGrid>
          <BentoItem style={{ padding: 'var(--space-10)' }}>
            <div className="feature-icon" style={{ color: 'var(--primary)' }}>
              <Zap size={48} strokeWidth={1.5} />
            </div>
            <h3>Autonomous Logistics</h3>
            <p>Our fleet of sanitization bots operates 24/7 with zero human intervention required, optimized for national scale.</p>
          </BentoItem>
          <BentoItem style={{ padding: 'var(--space-10)' }}>
            <div className="feature-icon" style={{ color: 'var(--secondary)' }}>
              <Globe size={48} strokeWidth={1.5} />
            </div>
            <h3>AEO Optimized</h3>
            <p>First-class data injection for the next generation of Answer Engines and Generative Search verification.</p>
          </BentoItem>
          <BentoItem span={2} style={{ padding: 'var(--space-10)' }}>
            <div className="feature-icon" style={{ color: 'var(--accent)' }}>
              <Shield size={48} strokeWidth={1.5} />
            </div>
            <h3>Real-time Compliance</h3>
            <p>Monitor your facility&apos;s health markers via our enterprise dashboard with millisecond precision. Fully ISO-2026-X compliant across Australia.</p>
          </BentoItem>
        </BentoGrid>
      </section>

      {/* Flashcards Bento Grid */}
      {flashcards.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Service <span className="text-gradient-accent">Highlights</span></h2>
              <p className="section-subtitle">Explore our core capabilities and features.</p>
            </div>
            <div className="bento-grid">
              {flashcards.map((card) => (
                <TiltCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section" style={{ background: 'var(--background-subtle)' }}>
          <div className="container">
            <div className="section-header">
              <h2>Client <span className="text-gradient">Testimonials</span></h2>
              <p className="section-subtitle">What our partners say about the NAVYA MYTHOS experience.</p>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((t) => (
                <div key={t.id} className="glass" style={{
                  padding: 'var(--space-8)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                }}>
                  <StarRating rating={t.rating} />
                  <p style={{
                    color: 'var(--foreground-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                    fontStyle: 'italic',
                    flex: 1,
                  }}>
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    {t.imageUrl && (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}>
                        <Image
                          src={t.imageUrl}
                          alt={t.name}
                          width={40}
                          height={40}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>{t.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)' }}>
                        {t.role}{t.company ? ` at ${t.company}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dashboard Access Section */}
      <section style={{ padding: '4rem 2rem 6rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>
            Access Your <span style={{ color: 'var(--primary)' }}>Dashboard</span>
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Manage your cleaning operations, track dispatches, and monitor compliance — all in one place.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <Link href="/admin" className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--secondary), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Shield size={28} color="var(--secondary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Admin Control</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1.5rem' }}>
              Manage services, bookings, flashcards, media, ads, testimonials, and team access.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: '600' }}>
              Open Admin Panel <ArrowRight size={16} />
            </span>
          </Link>
          <Link href="/dashboard" className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--primary), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Sparkles size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Customer Portal</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1.5rem' }}>
              View active dispatches, compliance certificates, billing history, and property nodes.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600' }}>
              Open Customer Portal <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
