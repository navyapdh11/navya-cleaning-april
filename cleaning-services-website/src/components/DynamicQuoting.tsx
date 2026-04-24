'use client';

import React, { useState, useEffect } from 'react';
import { BentoGrid, BentoItem } from './InteractiveElements';
import { CROEngine } from '@/lib/cro-engine';

export const DynamicQuoting: React.FC = () => {
  const [sqft, setSqft] = useState(1000);
  const [serviceType, setServiceType] = useState('standard');
  const [frequency, setFrequency] = useState('weekly');
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const baseRate = serviceType === 'deep' ? 0.15 : 0.10;
    const frequencyDiscount = frequency === 'weekly' ? 0.8 : frequency === 'biweekly' ? 0.9 : 1.0;
    const total = sqft * baseRate * frequencyDiscount;
    setEstimate(Math.round(total));
  }, [sqft, serviceType, frequency]);

  const handleBookingStart = () => {
    CROEngine.getInstance().trackEngagement('booking_start', { sqft, serviceType, frequency, estimate });
    alert('Enterprise Booking System Initializing...');
  };

  return (
    <section style={{ padding: '4rem 2rem' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
        Dynamic <span style={{ color: 'var(--primary)' }}>Enterprise</span> Quoting
      </h2>
      
      <BentoGrid>
        <BentoItem span={2} style={{ padding: '2.5rem' }}>
          <h3>Property Dimensions</h3>
          <p>Adjust the slider to match your workspace size.</p>
          <input 
            type="range" 
            min="500" 
            max="10000" 
            step="100" 
            value={sqft} 
            onChange={(e) => setSqft(Number(e.target.value))}
            style={{ width: '100%', margin: '2rem 0', height: '10px', borderRadius: '5px', accentColor: 'var(--primary)' }}
          />
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{sqft.toLocaleString()} sq. ft.</div>
        </BentoItem>

        <BentoItem style={{ padding: '2.5rem' }}>
          <h3>Service Intensity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              className={`glass ${serviceType === 'standard' ? 'active' : ''}`}
              onClick={() => setServiceType('standard')}
              style={{ padding: '1rem', borderRadius: '12px', background: serviceType === 'standard' ? 'var(--primary)' : 'transparent' }}
            >
              Standard Maintenance
            </button>
            <button 
              className={`glass ${serviceType === 'deep' ? 'active' : ''}`}
              onClick={() => setServiceType('deep')}
              style={{ padding: '1rem', borderRadius: '12px', background: serviceType === 'deep' ? 'var(--primary)' : 'transparent' }}
            >
              Deep Sterilization
            </button>
          </div>
        </BentoItem>

        <BentoItem span={3} style={{ padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', opacity: 0.9 }}>Estimated Monthly Investment</h2>
            <div style={{ fontSize: '5rem', fontWeight: '800' }}>${estimate}</div>
          </div>
          <button 
            onClick={handleBookingStart}
            style={{ 
              padding: '1.5rem 3rem', 
              borderRadius: '50px', 
              background: 'white', 
              color: 'black', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              transform: `scale(var(--cro-cta-scale))`
            }}
          >
            Secure Your Schedule
          </button>
        </BentoItem>
      </BentoGrid>
    </section>
  );
};
