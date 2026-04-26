'use client';

import React, { useState } from 'react';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { Building, Factory, Globe, ShieldCheck, Zap, BarChart } from 'lucide-react';

export default function CorporatePortal() {
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const sites = [
    { id: 'S-01', name: 'Sydney Corporate HQ', type: 'Office', nodes: 12 },
    { id: 'S-02', name: 'Melbourne Logistics Hub', type: 'Industrial', nodes: 45 },
    { id: 'S-03', name: 'Brisbane Innovation Park', type: 'Tech', nodes: 8 },
    { id: 'S-04', name: 'Perth Manufacturing Node', type: 'Industrial', nodes: 30 }
  ];

  const toggleSite = (id: string) => {
    if (selectedSites.includes(id)) setSelectedSites(selectedSites.filter(s => s !== id));
    else setSelectedSites([...selectedSites, id]);
  };

  const handleMassDispatch = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      alert('Mass Dispatch Initiated across National Node Grid.');
      setIsAuthorizing(false);
    }, 2000);
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-2px' }}>
            Corporate <span style={{ color: 'var(--accent)' }}>Network</span> Portal
          </h1>
          <p style={{ opacity: 0.7, fontSize: '1.4rem', marginTop: '1.5rem', maxWidth: '800px', margin: '1.5rem auto 0' }}>
            Mass-scale sanitization management for industrial networks and enterprise office clusters.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
           
           {/* Site Selection Matrix */}
           <div>
              <h3 style={{ marginBottom: '2rem' }}>Active Site Matrix</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 {sites.map(site => (
                   <div 
                    key={site.id} 
                    onClick={() => toggleSite(site.id)}
                    className="glass" 
                    style={{ 
                      padding: '2rem', borderRadius: '24px', cursor: 'pointer',
                      border: selectedSites.includes(site.id) ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                      transition: 'all 0.2s'
                    }}
                   >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                         <div style={{ background: 'rgba(255,0,128,0.1)', color: 'var(--accent)', padding: '0.8rem', borderRadius: '12px' }}>
                            {site.type === 'Office' ? <Building size={24} /> : <Factory size={24} />}
                         </div>
                         <div style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 'bold' }}>ID: {site.id}</div>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{site.name}</h4>
                      <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{site.nodes} Sanitization Nodes Active</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Dispatch Control */}
           <aside>
              <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', position: 'sticky', top: '120px' }}>
                 <h3 style={{ marginBottom: '1.5rem' }}>Dispatch Control</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                    <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                       <span style={{ opacity: 0.6 }}>Sites Selected</span>
                       <span style={{ fontWeight: 'bold' }}>{selectedSites.length}</span>
                    </div>
                    <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                       <span style={{ opacity: 0.6 }}>Network Priority</span>
                       <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>CRITICAL</span>
                    </div>
                 </div>

                 <button 
                  disabled={selectedSites.length === 0 || isAuthorizing}
                  onClick={handleMassDispatch}
                  style={{ 
                    width: '100%', padding: '1.5rem', borderRadius: '16px', 
                    background: selectedSites.length > 0 ? 'var(--accent)' : 'rgba(255,255,255,0.05)', 
                    color: 'white', fontWeight: '900', fontSize: '1.1rem',
                    boxShadow: selectedSites.length > 0 ? '0 10px 30px rgba(255, 0, 128, 0.3)' : 'none',
                    opacity: isAuthorizing ? 0.7 : 1
                  }}
                 >
                    {isAuthorizing ? 'Synchronizing...' : 'Authorize Mass Dispatch'}
                 </button>

                 <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ShieldCheck size={20} style={{ color: '#00ff00' }} />
                    <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>Network-wide AEO Verification Active</span>
                 </div>
              </div>
           </aside>

        </div>

        {/* Global Stats */}
        <section style={{ marginTop: '6rem' }}>
           <BentoGrid>
              <BentoItem style={{ padding: '2.5rem' }}>
                 <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Globe size={32} /></div>
                 <h4>Global Synchronization</h4>
                 <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>All corporate dispatches are synchronized with your global hygiene ledger in real-time.</p>
              </BentoItem>
              <BentoItem style={{ padding: '2.5rem' }}>
                 <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><BarChart size={32} /></div>
                 <h4>Predictive Analytics</h4>
                 <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Our AI librarian identifies pathogen hotspots across your office network before they propagate.</p>
              </BentoItem>
              <BentoItem style={{ padding: '2.5rem' }}>
                 <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}><Zap size={32} /></div>
                 <h4>Autonomous Scale</h4>
                 <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Spin up 100+ sanitization nodes across national facilities with a single authorization.</p>
              </BentoItem>
           </BentoGrid>
        </section>
      </div>
    </main>
  );
}
