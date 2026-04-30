'use client';

import React, { useState, useEffect } from 'react';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  Bell, 
  Download, 
  ExternalLink,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/customer')
      .then(res => res.json())
      .then(data => {
        if (data.bookings) setBookings(data.bookings);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
           <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>NATIONAL NODE 01 • ACTIVE</div>
           <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-2px' }}>Account <span style={{ color: 'var(--primary)' }}>Pulse</span></h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
           <button className="glass" style={{ padding: '0.8rem 1.5rem', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></span>
           </button>
           <Link href="/booking" className="glass" style={{ padding: '0.8rem 1.5rem', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 'bold', background: 'var(--primary)', color: 'white' }}>
              New Dispatch
           </Link>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
        
        {/* Sidebar Navigation */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           {[
             { id: 'overview', label: 'Network Overview', icon: <Zap size={18} /> },
             { id: 'dispatches', label: 'Active Dispatches', icon: <Calendar size={18} /> },
             { id: 'vault', label: 'Compliance Vault', icon: <ShieldCheck size={18} /> },
             { id: 'billing', label: 'Financial Ledger', icon: <CreditCard size={18} /> },
             { id: 'settings', label: 'Node Settings', icon: <Settings size={18} /> }
           ].map(tab => (
             <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="glass"
              style={{ 
                padding: '1.2rem', borderRadius: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: activeTab === tab.id ? '1px solid var(--primary)' : '1px solid transparent',
                transition: 'all 0.2s', fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                opacity: activeTab === tab.id ? 1 : 0.6
              }}
             >
                {tab.icon} {tab.label}
             </button>
           ))}
        </aside>

        {/* Dynamic Content Area */}
        <div style={{ minHeight: '600px' }}>
           {activeTab === 'overview' && (
             <div className="space-y-8">
                <BentoGrid>
                   <BentoItem span={2} style={{ padding: '2.5rem' }}>
                      <h3 style={{ marginBottom: '1.5rem' }}>Next Dispatch Status</h3>
                      {bookings.length > 0 ? (
                        <div className="glass" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--primary)' }}>
                           <div>
                              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{bookings[0].facilityName}</div>
                              <p style={{ opacity: 0.6 }}>{bookings[0].serviceName} • {bookings[0].stateCode}</p>
                              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00ff00', fontSize: '0.9rem' }}>
                                 <Clock size={16} /> ETA: 14:00 Today
                              </div>
                           </div>
                           <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>OPTIMIZATION LOAD</div>
                              <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>94%</div>
                           </div>
                        </div>
                      ) : (
                        <p style={{ opacity: 0.5 }}>No dispatches queued in the next 24h node.</p>
                      )}
                   </BentoItem>
                   <BentoItem style={{ padding: '2.5rem', background: 'linear-gradient(135deg, var(--secondary), transparent)' }}>
                      <h3>Compliance Score</h3>
                      <div style={{ fontSize: '4rem', fontWeight: '900', margin: '1rem 0' }}>A+</div>
                      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>AEO Verified: ISO-2026-X Standards met.</p>
                   </BentoItem>
                   <BentoItem span={3} style={{ padding: '2.5rem' }}>
                      <h3 style={{ marginBottom: '2rem' }}>Property Node Matrix</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                         {['Sydney Office', 'Melbourne HQ', 'Brisbane Lab'].map(node => (
                           <div key={node} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                              <div style={{ background: 'var(--primary)', width: '30px', height: '30px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 <MapPin size={16} color="white" />
                              </div>
                              <div style={{ fontWeight: 'bold' }}>{node}</div>
                              <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>3 Active Sanitization Bots</p>
                           </div>
                         ))}
                      </div>
                   </BentoItem>
                </BentoGrid>
             </div>
           )}

           {activeTab === 'dispatches' && (
             <div className="glass" style={{ borderRadius: '32px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                   <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.03)', opacity: 0.5, fontSize: '0.8rem' }}>
                         <th style={{ padding: '1.5rem 2rem' }}>Facility</th>
                         <th style={{ padding: '1.5rem 2rem' }}>Dispatch Type</th>
                         <th style={{ padding: '1.5rem 2rem' }}>Date</th>
                         <th style={{ padding: '1.5rem 2rem' }}>Status</th>
                         <th style={{ padding: '1.5rem 2rem' }}>Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                           <td style={{ padding: '1.5rem 2rem', fontWeight: 'bold' }}>{b.facilityName}</td>
                           <td style={{ padding: '1.5rem 2rem', opacity: 0.7 }}>{b.serviceName}</td>
                           <td style={{ padding: '1.5rem 2rem', opacity: 0.7 }}>{b.date}</td>
                           <td style={{ padding: '1.5rem 2rem' }}>
                              <span style={{ color: '#00ff00', fontSize: '0.8rem', background: 'rgba(0,255,0,0.05)', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(0,255,0,0.1)' }}>
                                 {b.status}
                              </span>
                           </td>
                           <td style={{ padding: '1.5rem 2rem' }}>
                              <button style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>View Live Telemetry</button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           )}

           {activeTab === 'vault' && (
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px' }}>
                   <h3 style={{ marginBottom: '1.5rem' }}>Compliance Certificates</h3>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {['AEO Audit - April 2026', 'Bond Guarantee - Sydney HQ', 'Bio-Safe Verification'].map(cert => (
                        <div key={cert} className="glass" style={{ padding: '1.2rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontSize: '0.9rem' }}>{cert}</span>
                           <Download size={18} style={{ opacity: 0.5, cursor: 'pointer' }} />
                        </div>
                      ))}
                   </div>
                </div>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', border: '1px dashed var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                   <div>
                      <ShieldCheck size={48} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem' }} />
                      <h4>Verified Audit Trail</h4>
                      <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>Your sanitization logs are cryptographically hashed and AEO-ready for real estate or health inspections.</p>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'billing' && (
             <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px' }}>
                <h3>National Financial Ledger</h3>
                <div style={{ marginTop: '2rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                         <div style={{ fontWeight: 'bold' }}>Subscription: Enterprise Node Cluster</div>
                         <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Next Renewal: May 15, 2026</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <div style={{ fontWeight: 'bold' }}>$2,450.00 /mo</div>
                         <span style={{ fontSize: '0.7rem', color: '#00ff00' }}>PAID</span>
                      </div>
                   </div>
                   <button style={{ marginTop: '2rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Download Tax Invoices <ExternalLink size={14} />
                   </button>
                </div>
             </div>
           )}

        </div>

      </div>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .space-y-8 > * + * {
           margin-top: 2rem;
        }
      `}</style>
    </main>
  );
}
