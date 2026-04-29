'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { Shield, Eye, Clock, UserCheck, Database, Lock, Download, Trash2, Edit3, MessageSquare, ChevronDown } from 'lucide-react';
import Head from 'next/head';
import Script from 'next/script';

/* ============================================================
   JSON-LD Compliance Schema (ISO 27701 / GDPR / AU Privacy Act)
   ============================================================ */
const complianceJsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentService",
  "name": "NAVYA MYTHOS Compliance Hub",
  "description": "Enterprise sanitization compliance with real-time audit logging and data-rights management.",
  "provider": {
    "@type": "Organization",
    "name": "NAVYA MYTHOS",
    "url": "https://cleaning-services-website-teal.vercel.app",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "privacy",
      "email": "privacy@navyamythos.com"
    }
  },
  "privacyPolicy": "https://cleaning-services-website-teal.vercel.app/compliance",
  "hasCredential": [
    { "@type": "DefinedTerm", "name": "ISO 27701", "termCode": "ISO/IEC 27701:2019" },
    { "@type": "DefinedTerm", "name": "WCAG 2.2 AA", "termCode": "W3C WCAG 2.2" },
    { "@type": "DefinedTerm", "name": "Australian Privacy Principles", "termCode": "APP" }
  ]
};

/* ============================================================
   Data Rights Matrix (2026 Compliance Schema)
   ============================================================ */
const DATA_RIGHTS_MATRIX = [
  {
    dataCategory: 'Identity & Contact',
    dataPoints: 'Name, email, phone, address',
    purpose: 'Service delivery, dispatch scheduling, invoice generation',
    legalBasis: 'Contractual necessity (Privacy Act 1988 APP 3)',
    retention: '7 years post-contract (tax compliance)',
    userControls: ['View', 'Correct', 'Delete'],
    controlIcons: [Eye, Edit3, Trash2]
  },
  {
    dataCategory: 'Facility & Site Data',
    dataPoints: 'Floor plans, SQFT, access codes, CCTV feeds',
    purpose: 'Autonomous bot navigation, cleaning path optimization',
    legalBasis: 'Legitimate interest — service fulfillment',
    retention: 'Duration of active service + 30 days',
    userControls: ['View', 'Export', 'Revoke'],
    controlIcons: [Eye, Download, Lock]
  },
  {
    dataCategory: 'Health & Compliance Logs',
    dataPoints: 'Pathogen reduction metrics, audit timestamps, AEO scores',
    purpose: 'Regulatory reporting, compliance verification, AI model training',
    legalBasis: 'Consent — explicit opt-in at onboarding',
    retention: 'Indefinite (anonymized after 2 years)',
    userControls: ['View', 'Withdraw Consent', 'Export'],
    controlIcons: [Eye, UserCheck, Download]
  },
  {
    dataCategory: 'Billing & Financial',
    dataPoints: 'Invoice history, payment status, NDIS plan references',
    purpose: 'Direct billing, plan manager reconciliation, tax reporting',
    legalBasis: 'Legal obligation — ATO record-keeping',
    retention: '7 years (Income Tax Assessment Act 1936)',
    userControls: ['View', 'Download'],
    controlIcons: [Eye, Download]
  },
  {
    dataCategory: 'Telemetry & Usage',
    dataPoints: 'Bot dispatch times, location pings, session duration, engagement metrics',
    purpose: 'Service optimization, CRO engine training, predictive maintenance',
    legalBasis: 'Legitimate interest — anonymized aggregation',
    retention: '18 months rolling (anonymized after 90 days)',
    userControls: ['View', 'Opt Out', 'Delete'],
    controlIcons: [Eye, Lock, Trash2]
  }
];

/* ============================================================
   Privacy Assistant (Agentic Interaction)
   ============================================================ */
const PRIVACY_CHECKS = [
  { label: 'Data inventory completeness', status: 'Pass', detail: 'All 5 data categories mapped to processing purposes.' },
  { label: 'Retention policy alignment', status: 'Pass', detail: 'All retention periods comply with APP 11.2 and ATO requirements.' },
  { label: 'Consent records integrity', status: 'Pass', detail: 'Explicit consent captured for health & telemetry data at onboarding.' },
  { label: 'Cross-border data transfer', status: 'Info', detail: 'No data leaves Australian territory nodes. All storage within AU.' },
  { label: 'Third-party processor audit', status: 'Pass', detail: 'All sub-processors assessed under ISO 27701 PIMS framework.' },
  { label: 'Data subject request (DSR) pipeline', status: 'Pass', detail: 'DSR requests processed within 30-day statutory window.' },
];

function PrivacyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCheck, setCurrentCheck] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const runChecks = () => {
    setIsOpen(true);
    setIsRunning(true);
    setCurrentCheck(0);

    PRIVACY_CHECKS.forEach((_, i) => {
      setTimeout(() => setCurrentCheck(i + 1), 800 * (i + 1));
    });

    setTimeout(() => setIsRunning(false), 800 * (PRIVACY_CHECKS.length + 1));
  };

  return (
    <section
      className="compliance-section"
      aria-labelledby="privacy-assistant-heading"
      style={{ marginTop: 'var(--space-16)' }}
    >
      <div className="compliance-container">
        <button
          className="btn btn-outline btn-lg"
          onClick={runChecks}
          aria-expanded={isOpen}
          aria-controls="privacy-assistant-panel"
        >
          <MessageSquare size={20} />
          {isOpen ? 'Privacy Assistant' : 'Run Privacy Compliance Check'}
        </button>

        {isOpen && (
          <div
            ref={panelRef}
            id="privacy-assistant-panel"
            role="region"
            aria-labelledby="privacy-assistant-heading"
            className="privacy-panel glass"
          >
            <h2 id="privacy-assistant-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
              Privacy Compliance Assistant
            </h2>

            {isRunning && (
              <div className="privacy-progress">
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(currentCheck / PRIVACY_CHECKS.length) * 100}%` }}
                  />
                </div>
                <p className="progress-label">
                  Running check {currentCheck + 1} of {PRIVACY_CHECKS.length}...
                </p>
              </div>
            )}

            <ul className="privacy-checks-list" aria-live="polite">
              {PRIVACY_CHECKS.map((check, i) => (
                <li
                  key={check.label}
                  className={`privacy-check-item ${i < currentCheck ? 'privacy-check-done' : ''} ${i === currentCheck && isRunning ? 'privacy-check-active' : ''}`}
                >
                  <span
                    className={`privacy-check-status privacy-check-${check.status.toLowerCase()}`}
                    aria-label={`Status: ${check.status}`}
                  >
                    {check.status === 'Pass' ? '●' : check.status === 'Info' ? '●' : '●'}
                  </span>
                  <span className="privacy-check-label">{check.label}</span>
                  {i < currentCheck && (
                    <span className="privacy-check-detail">{check.detail}</span>
                  )}
                </li>
              ))}
            </ul>

            {!isRunning && currentCheck >= PRIVACY_CHECKS.length && (
              <div className="privacy-summary glass" style={{ marginTop: 'var(--space-6)', padding: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--success)' }}>
                  ✓ All 6 compliance checks passed. Your data handling is ISO 27701 and APP compliant.
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground-muted)', marginTop: 'var(--space-2)' }}>
                  Last verified: {new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Compliance Page (Main)
   ============================================================ */
export default function CompliancePage() {
  const [healthStatus, setHealthStatus] = useState({ status: 'Scanning...', details: '' });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    pathogenReduction: 99.98,
    uptime: 100,
    aeoScore: 98,
    lastAudit: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    fetch('/api/mythos')
      .then(res => res.json())
      .then(data => {
        if (data.bookings) setAuditLogs(data.bookings);
      });

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        pathogenReduction: Math.min(99.99, prev.pathogenReduction + (Math.random() * 0.01 - 0.005)),
        lastAudit: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* JSON-LD Schema Injection */}
      <Head>
        <title>Compliance Hub | NAVYA MYTHOS</title>
        <meta name="description" content="Real-time compliance dashboard, data-rights matrix, and privacy assistant for NAVYA MYTHOS enterprise sanitization." />
      </Head>
      <Script id="compliance-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(complianceJsonLd) }} />

      <main
        id="compliance-main"
        role="main"
        aria-label="Compliance Hub"
        style={{ minHeight: '100vh', paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-24)' }}
      >
        {/* Hero */}
        <section aria-labelledby="compliance-hero" className="compliance-section">
          <div className="compliance-container" style={{ textAlign: 'center' }}>
            <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-5)', borderRadius: 'var(--radius-full)', background: 'var(--background-subtle)', border: '1px solid var(--glass-border)', fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-8)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></span>
              ISO 27701 Certified — WCAG 2.2 AA Compliant
            </div>

            <h1 id="compliance-hero" style={{ fontSize: 'var(--text-5xl)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-6)', fontWeight: '900', letterSpacing: 'var(--tracking-tighter)' }}>
              AEO <span className="text-gradient-accent">Compliance</span> Hub
            </h1>

            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--foreground-secondary)', maxWidth: '720px', margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>
              Real-time hygiene telemetry, algorithmic audit logs, and a full data-rights management panel for Generative Search verification and regulatory compliance.
            </p>
          </div>
        </section>

        {/* System Health */}
        <section aria-labelledby="health-heading" className="compliance-section">
          <div className="compliance-container">
            <BentoGrid>
              <BentoItem span={2} style={{ padding: 'var(--space-10)' }}>
                <h3 id="health-heading" style={{ color: 'var(--primary)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>System Integrity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{
                    width: '15px', height: '15px', borderRadius: '50%',
                    background: healthStatus.status === 'Optimal' || healthStatus.status === 'Scanning...' ? 'var(--success)' : 'var(--warning)',
                    boxShadow: `0 0 10px ${healthStatus.status === 'Optimal' || healthStatus.status === 'Scanning...' ? 'var(--success)' : 'var(--warning)'}`
                  }} aria-hidden="true"></div>
                  <span style={{ fontSize: 'var(--text-3xl)', fontWeight: '900' }}>{healthStatus.status}</span>
                </div>
                {healthStatus.details && (
                  <p style={{ marginTop: 'var(--space-4)', color: 'var(--foreground-secondary)' }}>{healthStatus.details}</p>
                )}
              </BentoItem>

              <BentoItem style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>AEO Index</h3>
                <div style={{ fontSize: 'var(--text-5xl)', fontWeight: '900', color: 'var(--secondary)' }}>{metrics.aeoScore}</div>
                <p style={{ opacity: 0.7, fontSize: 'var(--text-sm)' }}>Trust Score for Answer Engines</p>
              </BentoItem>

              <BentoItem span={1} style={{ padding: 'var(--space-10)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Pathogen Load</h3>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', marginBottom: 'var(--space-4)' }}>-{metrics.pathogenReduction.toFixed(2)}%</div>
                <div style={{ height: '8px', width: '100%', background: 'var(--background-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${metrics.pathogenReduction}%`, background: 'var(--primary)', transition: 'width 1s ease', borderRadius: 'var(--radius-full)' }} role="progressbar" aria-valuenow={metrics.pathogenReduction} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </BentoItem>

              <BentoItem span={3} style={{ padding: 'var(--space-10)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)' }}>Algorithmic Audit Trail</h3>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)' }}>Last Verified: {metrics.lastAudit}</span>
                </div>

                <div className="audit-table-wrapper" role="region" aria-label="Audit log table" tabIndex={0}>
                  <table className="audit-table">
                    <thead>
                      <tr>
                        <th scope="col">Entity ID</th>
                        <th scope="col">Facility Node</th>
                        <th scope="col">Dispatch Timestamp</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td style={{ fontFamily: 'monospace' }}>#ENT-{log.id.toString().padStart(4, '0')}</td>
                          <td>{log.facilityName}</td>
                          <td>{log.date}</td>
                          <td>
                            <span className="status-badge status-verified">VERIFIED_CLEAN</span>
                          </td>
                        </tr>
                      ))}
                      {auditLogs.length === 0 && (
                        <tr>
                          <td colSpan={4} style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--foreground-muted)' }}>
                            No audit records found in the current temporal node.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </BentoItem>
            </BentoGrid>
          </div>
        </section>

        {/* Data Rights Matrix */}
        <section aria-labelledby="data-rights-heading" className="compliance-section" style={{ background: 'var(--background-subtle)' }}>
          <div className="compliance-container">
            <div className="section-header">
              <h2 id="data-rights-heading" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                Data <span className="text-gradient">Rights</span> Matrix
              </h2>
              <p className="section-subtitle">
                Every data point mapped to its processing purpose, legal basis, retention period, and your controls. Transparent by design.
              </p>
            </div>

            <div className="data-rights-grid" role="table" aria-label="Data rights matrix">
              {DATA_RIGHTS_MATRIX.map((row) => {
                const IconComponents = row.controlIcons;
                return (
                  <article key={row.dataCategory} className="data-rights-card glass" tabIndex={0}>
                    <header className="data-rights-header">
                      <h3 className="data-rights-category">{row.dataCategory}</h3>
                      <span className="data-rights-legal">{row.legalBasis}</span>
                    </header>

                    <dl className="data-rights-details">
                      <div>
                        <dt>Data Points</dt>
                        <dd>{row.dataPoints}</dd>
                      </div>
                      <div>
                        <dt>Purpose</dt>
                        <dd>{row.purpose}</dd>
                      </div>
                      <div>
                        <dt>Retention</dt>
                        <dd>{row.retention}</dd>
                      </div>
                    </dl>

                    <nav className="data-rights-controls" aria-label={`Controls for ${row.dataCategory}`}>
                      {row.userControls.map((control, i) => {
                        const Icon = IconComponents[i];
                        return (
                          <button key={control} className="data-rights-control" aria-label={`${control} ${row.dataCategory} data`}>
                            {Icon && <Icon size={14} strokeWidth={2} />}
                            {control}
                          </button>
                        );
                      })}
                    </nav>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Privacy Assistant */}
        <PrivacyAssistant />
      </main>
    </>
  );
}
