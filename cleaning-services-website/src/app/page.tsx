'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { BentoGrid, BentoItem, FlashCard } from "@/components/InteractiveElements";
import { DynamicQuoting } from "@/components/DynamicQuoting";
import { CROEngine } from "@/lib/cro-engine";
import { SERVICES, STATES } from "@/lib/data";
import { Shield, Zap, Globe, Users, Building2, Briefcase } from 'lucide-react';

export default function Home() {
  const handleLaunchQuote = () => {
    CROEngine.getInstance().trackEngagement('click_cta', { location: 'hero' });
  };

  return (
    <main className={styles.main}>
      <div className="bg-mesh"></div>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="glass" style={{ padding: '5rem 2rem', borderRadius: '48px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '0.5rem 1.5rem', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <span style={{ color: 'var(--primary)' }}>●</span> Australia's First AEO-Verified Sanitization Network
          </div>
          <h1 style={{ fontSize: '6rem', lineHeight: '0.9', marginBottom: '2rem', fontWeight: '900', letterSpacing: '-4px' }}>
            Next-Gen <span style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 30px var(--primary))' }}>Sanitization</span>
          </h1>
          <p style={{ fontSize: '1.6rem', opacity: 0.8, marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
            Enterprise-grade hygiene powered by autonomous systems, national-scale logistics, and self-learning optimization for the 2026 market.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link 
              href="/booking" 
              onClick={handleLaunchQuote}
              className="glass" 
              style={{ padding: '1.5rem 3.5rem', borderRadius: '20px', fontWeight: '900', background: 'var(--primary)', color: 'white', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(0, 112, 243, 0.4)' }}
            >
              Initialize Dispatch
            </Link>
            <Link href="/pricing" className="glass" style={{ padding: '1.5rem 3.5rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.1rem' }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Quoting Section */}
      <DynamicQuoting />

      {/* Enterprise Portals Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '4rem', textAlign: 'center', fontWeight: '900' }}>Enterprise <span style={{ color: 'var(--secondary)' }}>Access</span> Portals</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/enterprise/ndis" className="glass" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'rgba(121, 40, 202, 0.1)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--secondary)' }}>
              <Users size={40} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>NDIS Participants</h3>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Dedicated compliance and direct billing flow for NDIS plan managers and self-managed participants.</p>
            <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Enter NDIS Portal →</span>
          </Link>

          <Link href="/enterprise/real-estate" className="glass" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', transition: 'transform 0.3s' }}>
            <div style={{ background: 'rgba(0, 112, 243, 0.1)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--primary)' }}>
              <Building2 size={40} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Real Estate B2B</h3>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Bulk bond cleaning dispatch for property managers with full CRM data synchronization.</p>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Enter Partner Hub →</span>
          </Link>

          <div className="glass" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255, 0, 128, 0.1)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--accent)' }}>
              <Briefcase size={40} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Corporate Accounts</h3>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>National-scale sanitization for office networks, retail chains, and industrial facilities.</p>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Coming Q3 2026</span>
          </div>
        </div>
      </section>

      {/* National Coverage Section */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '900' }}>National <span style={{ color: 'var(--primary)' }}>Infrastructure</span></h2>
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '4rem', fontSize: '1.2rem' }}>Active nodes and AEO compliance monitoring across all Australian territories.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          {STATES.map((state) => (
            <Link 
              key={state.code} 
              href={`/locations/${state.code.toLowerCase()}`}
              className="glass"
              style={{ padding: '1rem 2rem', borderRadius: '15px', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.2s' }}
            >
              {state.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section style={{ padding: '8rem 2rem' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '40px', textAlign: 'center', fontWeight: '900' }}>Enterprise <span style={{ color: 'var(--primary)' }}>Core</span> Capabilities</h2>
        <BentoGrid>
          <BentoItem style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem' }}><Zap size={48} /></div>
            <h3>Autonomous Logistics</h3>
            <p style={{ opacity: 0.7 }}>Our fleet of sanitization bots operates 24/7 with zero human intervention required, optimized for national scale.</p>
          </BentoItem>
          <BentoItem style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}><Globe size={48} /></div>
            <h3>AEO Optimized</h3>
            <p style={{ opacity: 0.7 }}>First-class data injection for the next generation of Answer Engines and Generative Search verification.</p>
          </BentoItem>
          <BentoItem span={2} style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1.5rem' }}><Shield size={48} /></div>
            <h3>Real-time Compliance</h3>
            <p style={{ opacity: 0.7 }}>Monitor your facility's health markers via our enterprise dashboard with millisecond precision. Fully ISO-2026-X compliant across Australia.</p>
          </BentoItem>
        </BentoGrid>
      </section>

      {/* Footer */}
      <footer style={{ padding: '8rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontWeight: '900', fontSize: '2rem', marginBottom: '2rem' }}>
          NAVYA <span style={{ color: 'var(--primary)' }}>MYTHOS</span>
        </div>
        <p style={{ opacity: 0.5 }}>© 2026 NAVYA MYTHOS Enterprise Sanitization. Australian National Node 01.</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', fontSize: '0.9rem', opacity: 0.6 }}>
           <Link href="/services/end-of-lease-cleaning">End of Lease</Link>
           <Link href="/enterprise/ndis">NDIS Support</Link>
           <Link href="/compliance">Compliance</Link>
           <Link href="/pricing">Pricing</Link>
        </div>
      </footer>
    </main>
  );
}
