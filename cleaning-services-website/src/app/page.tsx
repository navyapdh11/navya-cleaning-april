'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { BentoGrid, BentoItem, FlashCard } from "@/components/InteractiveElements";
import { DynamicQuoting } from "@/components/DynamicQuoting";
import { CROEngine } from "@/lib/cro-engine";
import { SERVICES, STATES } from "@/lib/data";
import { Shield, Zap, Globe, Users, Building2, Briefcase, ArrowRight } from 'lucide-react';

export default function Home() {
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
              Australia&apos;s First AEO-Verified Sanitization Network
            </div>

            <h1 style={{
              fontSize: 'var(--text-5xl)',
              lineHeight: 'var(--leading-tight)',
              marginBottom: 'var(--space-8)',
              fontWeight: '900',
              letterSpacing: 'var(--tracking-tighter)',
            }}>
              Next-Gen <span className="text-gradient">Sanitization</span>
            </h1>

            <p style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--foreground-secondary)',
              marginBottom: 'var(--space-12)',
              maxWidth: '720px',
              margin: '0 auto var(--space-12) auto',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              Enterprise-grade hygiene powered by autonomous systems, national-scale logistics, and self-learning optimization for the 2026 market.
            </p>

            <div className="hero-cta-group">
              <Link
                href="/booking"
                onClick={handleLaunchQuote}
                className="btn btn-primary btn-lg"
              >
                Initialize Dispatch
                <ArrowRight size={20} strokeWidth={2.5} />
              </Link>
              <Link href="/pricing" className="btn btn-outline btn-lg">
                View Pricing
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
            <h2>Enterprise <span className="text-gradient-accent">Access</span> Portals</h2>
            <p className="section-subtitle">Specialized compliance and dispatch systems for every sector.</p>
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
            <h2>National <span className="text-gradient">Infrastructure</span></h2>
            <p className="section-subtitle">Active nodes and AEO compliance monitoring across all Australian territories.</p>
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
          <h2>Enterprise <span className="text-gradient">Core</span> Capabilities</h2>
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

      {/* Footer */}
      <footer className="footer">
        <div className="container-sm">
          <div className="footer-brand">
            NAVYA <span style={{ color: 'var(--primary)' }}>MYTHOS</span>
          </div>
          <p className="footer-copy">&copy; 2026 NAVYA MYTHOS Enterprise Sanitization. Australian National Node 01.</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/services/end-of-lease-cleaning">End of Lease</Link>
            <Link href="/enterprise/ndis">NDIS Support</Link>
            <Link href="/compliance">Compliance</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
