'use client';

import React, { useState } from 'react';
import { NDISApi, NDISParticipant } from '@/lib/api-wrappers/ndis-proda-mock';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { ShieldCheck, UserCheck, FileText, Send } from 'lucide-react';

export default function NDISPortal() {
  const [participantId, setParticipantId] = useState('');
  const [participant, setParticipant] = useState<NDISParticipant | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setParticipant(null);
    setMessage('');

    try {
      const result = await NDISApi.verifyParticipant(participantId);
      if (result) {
        setParticipant(result);
        setMessage('Plan verified successfully. Eligible for Enterprise Sanitization.');
      } else {
        setMessage('Invalid Participant ID or Inactive Plan.');
      }
    } catch (err) {
      setMessage('API Connection Error.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>
            NDIS <span style={{ color: 'var(--primary)' }}>Specialized</span> Portal
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.2rem', marginTop: '1rem' }}>
            Compassionate, automated sanitization for NDIS participants with direct PRODA/PACE integration.
          </p>
        </header>

        <BentoGrid>
          <BentoItem span={2} style={{ padding: '3rem' }}>
            <h3>Verify Participant Funding</h3>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Enter the NDIS Participant Number to check eligibility and available support categories.</p>
            
            <form onSubmit={handleVerify} style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="NDIS ID (e.g., 430-XXX-XXX)" 
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
                style={{ 
                  flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)', color: 'white' 
                }}
              />
              <button 
                type="submit" 
                disabled={isVerifying}
                style={{ 
                  padding: '1rem 2rem', borderRadius: '12px', background: 'var(--primary)', 
                  color: 'white', fontWeight: 'bold' 
                }}
              >
                {isVerifying ? 'Verifying...' : 'Check Status'}
              </button>
            </form>

            {message && (
              <div style={{ 
                marginTop: '2rem', padding: '1rem', borderRadius: '12px', 
                background: participant ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                border: `1px solid ${participant ? '#00cc00' : '#ff4444'}`,
                color: participant ? '#00cc00' : '#ff4444'
              }}>
                {message}
              </div>
            )}
          </BentoItem>

          <BentoItem style={{ padding: '2.5rem' }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}><ShieldCheck size={32} /></div>
            <h4>NDIS Compliance</h4>
            <ul style={{ fontSize: '0.9rem', opacity: 0.7, paddingLeft: '1.2rem', marginTop: '1rem' }}>
              <li>Direct Service Provision</li>
              <li>Plan Manager Liaison</li>
              <li>AEO-Verified Logging</li>
              <li>Police-Checked Nodes</li>
            </ul>
          </BentoItem>

          {participant && (
            <BentoItem span={3} style={{ padding: '3rem', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '2rem' }}>{participant.name}</h2>
                  <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Plan Status: {participant.planStatus}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ opacity: 0.6 }}>Managed By</p>
                  <p style={{ fontWeight: 'bold' }}>{participant.managedBy}</p>
                </div>
              </div>
              
              <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                 <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                    <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>Available Funding</p>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>${participant.availableFunding.toLocaleString()}</div>
                 </div>
                 <button style={{ background: 'var(--primary)', color: 'white', borderRadius: '16px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    Schedule Approved Clean
                 </button>
              </div>
            </BentoItem>
          )}
        </BentoGrid>
      </div>
    </main>
  );
}
