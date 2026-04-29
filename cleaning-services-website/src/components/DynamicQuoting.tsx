'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoItem } from './InteractiveElements';
import { CROEngine } from '@/lib/cro-engine';
import { SERVICES } from '@/lib/data';
import { Calculator, ArrowRight } from 'lucide-react';

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

  const selectedServiceData = SERVICES.find(s => s.slug === selectedService);

  return (
    <section className="section" style={{ background: 'var(--background-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Dynamic <span className="text-gradient">National</span> Quoting</h2>
          <p className="section-subtitle">Real-time algorithmic pricing calibrated to your facility scale.</p>
        </div>

        <BentoGrid>
          <BentoItem span={2} style={{ padding: 'var(--space-10)' }}>
            <div className="slider-header">
              <Calculator size={24} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: 'var(--text-xl)' }}>Property Scale</h3>
            </div>
            <p style={{ color: 'var(--foreground-muted)', marginBottom: 'var(--space-8)' }}>
              Adjust to match your specific enterprise node or residential facility.
            </p>

            <div className="slider-container">
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="range-slider"
                aria-label="Property square footage"
              />
              <div className="slider-value">
                {sqft.toLocaleString()} <span className="slider-unit">SQFT</span>
              </div>
            </div>
          </BentoItem>

          <BentoItem style={{ padding: 'var(--space-8)', maxHeight: '450px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Select Service</h3>
            <div className="service-list">
              {SERVICES.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setSelectedService(s.slug)}
                  className={`service-chip ${selectedService === s.slug ? 'service-chip-active' : ''}`}
                  aria-pressed={selectedService === s.slug}
                >
                  <span className="service-name">{s.name}</span>
                  <span className="service-category">{s.category}</span>
                </button>
              ))}
            </div>
          </BentoItem>

          <BentoItem span={3} className="estimate-banner">
            <div className="estimate-content">
              <h2 style={{ fontSize: 'var(--text-lg)', opacity: 0.9, fontWeight: '600' }}>Estimated Investment</h2>
              <div className="estimate-amount">${estimate.toLocaleString()}</div>
              <p style={{ opacity: 0.8 }}>
                Precise calculation for <span className="estimate-service">{selectedServiceData?.name}</span>
              </p>
            </div>
            <button
              onClick={handleBookingStart}
              className="btn btn-estimate"
            >
              Authorize Dispatch
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </BentoItem>
        </BentoGrid>
      </div>
    </section>
  );
};
