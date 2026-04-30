'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MultiStepBooking } from '@/components/booking/MultiStepBooking';
import { ThreeDModel } from '@/components/ThreeDModel';

function BookingContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'end-of-lease-cleaning';

  return (
    <div className="w-full">
      <MultiStepBooking initialService={initialService} />
    </div>
  );
}

export default function BookingPage() {
  return (
    <main
      className="booking-page"
      style={{
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 100%)',
        }}
      />

      {/* Subtle 3D decoration */}
      <div
        style={{
          position: 'fixed',
          bottom: '-15%',
          right: '-10%',
          width: '500px',
          height: '500px',
          opacity: 0.06,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <ThreeDModel />
      </div>

      {/* Page header */}
      <header
        style={{
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 3rem',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--primary)',
            marginBottom: '1rem',
          }}
        >
          Book in 5 Easy Steps
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 1rem',
          }}
        >
          Book Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Clean
          </span>
        </h1>
        <p
          style={{
            opacity: 0.55,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Get an instant quote, customise your clean, and book in minutes. 
          Prices update live as you build your service.
        </p>
      </header>

      <Suspense
        fallback={
          <div
            className="glass"
            style={{
              padding: '4rem 2rem',
              borderRadius: '24px',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Loading booking system...
          </div>
        }
      >
        <BookingContent />
      </Suspense>
    </main>
  );
}
