'use client';

import React, { useState } from 'react';
import { RealEstateApi, PropertyData } from '@/lib/api-wrappers/real-estate-crm-mock';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { Building2, RefreshCw, Key, ClipboardList } from 'lucide-react';

export default function RealEstatePortal() {
  const [agencyId, setAgencyId] = useState('');
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    try {
      const data = await RealEstateApi.syncProperties(agencyId);
      setProperties(data);
    } catch (err) {
      console.error('Sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>
            Real Estate <span style={{ color: 'var(--primary)' }}>B2B</span> Hub
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem', marginTop: '1rem' }}>
            Automated bond cleaning dispatch for high-volume property managers. Direct CRM synchronization.
          </p>
        </header>

        <BentoGrid>
          <BentoItem span={2} style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Property Data Sync</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Agency CRM ID" 
                  value={agencyId}
                  onChange={(e) => setAgencyId(e.target.value)}
                  style={{ 
                    padding: '0.8rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--glass-border)', color: 'white' 
                  }}
                />
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  style={{ 
                    padding: '0.8rem 1.5rem', borderRadius: '10px', background: 'var(--primary)', 
                    color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' 
                  }}
                >
                  <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
                  {isSyncing ? 'Syncing...' : 'Sync Properties'}
                </button>
              </div>
            </div>

            {properties.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', opacity: 0.6 }}>
                      <th style={{ padding: '1rem' }}>Address</th>
                      <th style={{ padding: '1rem' }}>Manager</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                      <th style={{ padding: '1rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{p.address}</td>
                        <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{p.manager}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.3rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem',
                            background: p.status === 'Vacant' ? 'rgba(0,255,0,0.1)' : 'rgba(255,255,0,0.1)',
                            color: p.status === 'Vacant' ? '#00cc00' : '#ffcc00'
                          }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>Schedule Dispatch</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                 <Building2 size={48} style={{ margin: '0 auto 1rem' }} />
                 <p>Connect your CRM to import active management listings.</p>
              </div>
            )}
          </BentoItem>

          <BentoItem style={{ padding: '2.5rem' }}>
             <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><Key size={32} /></div>
             <h4>Bulk Key Access</h4>
             <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Secure lockbox and office key collection protocols integrated into every dispatch.</p>
             <div style={{ color: 'var(--primary)', marginTop: '2rem' }}><ClipboardList size={32} /></div>
             <h4 style={{ marginTop: '0.5rem' }}>Automatic Bond Logging</h4>
             <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Passing inspection results are automatically injected into your PropertyMe/Console audit logs.</p>
          </BentoItem>
        </BentoGrid>
      </div>
    </main>
  );
}
