'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoItem } from './InteractiveElements';
import { CROEngine } from '@/lib/cro-engine';
import { SERVICES } from '@/lib/data';

export const DynamicQuoting: React.FC = () => {
  const router = useRouter();
  const [sqft, setSqft] = useState(1000);
  const [selectedService, setSelectedService] = useState(SERVICES[0].slug);
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const service = SERVICES.find(s => s.slug === selectedService);
    const baseRate = service ? (service.basePrice / 1000) : 0.15;
    const total = sqft * baseRate;
    setEstimate(Math.round(total));
  }, [sqft, selectedService]);

  const handleBookingStart = () => {
    CROEngine.getInstance().trackEngagement('booking_start', { sqft, selectedService, estimate });
    router.push(`/booking?sqft=${sqft}&service=${selectedService}`);
  };

  return (
    <section style={{ padding: '4rem 2rem' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '900' }}>
        Dynamic <span style={{ color: 'var(--primary)' }}>National</span> Quoting
      </h2>
      
      <BentoGrid>
        <BentoItem span={2} style={{ padding: '3rem' }}>
          <h3>Property Scale (sq. ft.)</h3>
          <p style={{ opacity: 0.7 }}>Adjust to match your specific enterprise node or residential facility.</p>
          <input 
            type="range" 
            min="50" 
            max="10000" 
            step="50" 
            value={sqft} 
            onChange={(e) => setSqft(Number(e.target.value))}
            style={{ width: '100%', margin: '2.5rem 0', height: '12px', borderRadius: '6px', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)' }}>{sqft.toLocaleString()} <span style={{ fontSize: '1rem', opacity: 0.6 }}>SQFT</span></div>
        </BentoItem>

        <BentoItem style={{ padding: '2.5rem', maxHeight: '400px', overflowY: 'auto' }}>
          <h3>Select Infrastructure Service</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }}>
            {SERVICES.map((s) => (
              <button 
                key={s.slug}
                className={`glass ${selectedService === s.slug ? 'active' : ''}`}
                onClick={() => setSelectedService(s.slug)}
                style={{ 
                  padding: '1rem', borderRadius: '14px', textAlign: 'left', fontSize: '0.9rem',
                  background: selectedService === s.slug ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: selectedService === s.slug ? 'white' : 'inherit',
                  border: '1px solid var(--glass-border)',
                  transition: 'all 0.2s'
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </BentoItem>

        <BentoItem span={3} style={{ padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', borderRadius: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', opacity: 0.9, fontWeight: '700' }}>Estimated Investment</h2>
            <div style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-2px' }}>${estimate}</div>
            <p style={{ opacity: 0.7 }}>Precise algorithmic calculation for {SERVICES.find(s => s.slug === selectedService)?.name}.</p>
          </div>
          <button 
            onClick={handleBookingStart}
            style={{ 
              padding: '2rem 4rem', 
              borderRadius: '24px', 
              background: 'white', 
              color: 'black', 
              fontSize: '1.4rem', 
              fontWeight: '900',
              transform: `scale(var(--cro-cta-scale))`,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            Authorize Dispatch
          </button>
        </BentoItem>
      </BentoGrid>
    </section>
  );
};
