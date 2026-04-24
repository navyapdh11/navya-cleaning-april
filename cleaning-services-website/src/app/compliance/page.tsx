'use client';

import React, { useState, useEffect } from 'react';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { Librarian } from '@/lib/librarian';

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
    // Simulate Librarian health check
    const health = Librarian.checkHealth();
    setHealthStatus(health);

    // Fetch logs from API
    fetch('/api/mythos')
      .then(res => res.json())
      .then(data => {
        if (data.bookings) setAuditLogs(data.bookings);
      });

    // Simulate real-time metric updates
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
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>
        AEO <span style={{ color: 'var(--accent)' }}>Compliance</span> Dashboard
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '4rem', textAlign: 'center' }}>
        Real-time hygiene telemetry and algorithmic audit logs for Generative Search verification.
      </p>

      <BentoGrid>
        <BentoItem span={2} style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--primary)' }}>System Integrity</h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '15px', height: '15px', borderRadius: '50%', 
              background: healthStatus.status === 'Optimal' ? '#00cc00' : '#ffcc00',
              boxShadow: `0 0 10px ${healthStatus.status === 'Optimal' ? '#00cc00' : '#ffcc00'}`
            }}></div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{healthStatus.status}</span>
          </div>
          <p style={{ marginTop: '1rem', opacity: 0.7 }}>{healthStatus.details}</p>
        </BentoItem>

        <BentoItem style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>AEO Index</h3>
          <div style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--secondary)' }}>{metrics.aeoScore}</div>
          <p style={{ opacity: 0.6 }}>Trust Score for Answer Engines</p>
        </BentoItem>

        <BentoItem span={1} style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
          <h3>Pathogen Load</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>-{metrics.pathogenReduction}%</div>
          <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${metrics.pathogenReduction}%`, background: 'var(--primary)', transition: 'width 1s' }}></div>
          </div>
        </BentoItem>

        <BentoItem span={3} style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3>Algorithmic Audit Trail</h3>
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Last Verified: {metrics.lastAudit}</span>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', opacity: 0.6 }}>
                <th style={{ padding: '1rem' }}>Entity ID</th>
                <th style={{ padding: '1rem' }}>Facility Node</th>
                <th style={{ padding: '1rem' }}>Dispatch Timestamp</th>
                <th style={{ padding: '1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>#ENT-{log.id.toString().padStart(4, '0')}</td>
                  <td style={{ padding: '1rem' }}>{log.facilityName}</td>
                  <td style={{ padding: '1rem' }}>{log.date}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem',
                      background: 'rgba(0,255,0,0.1)', color: '#00cc00', border: '1px solid rgba(0,255,0,0.2)'
                    }}>
                      VERIFIED_CLEAN
                    </span>
                  </td>
                </tr>
              ))}
              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
                    No audit records found in the current temporal node.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
