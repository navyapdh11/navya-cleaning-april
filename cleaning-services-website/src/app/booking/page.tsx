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
    <main style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="bg-mesh"></div>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
         <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>NATIONAL DISPATCH NODE 01</div>
         <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-3px', lineHeight: 1 }}>
           Enterprise <span style={{ color: 'var(--primary)' }}>Booking</span>
         </h1>
         <p style={{ opacity: 0.6, fontSize: '1.2rem', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
           Initialize your autonomous sanitization fleet across the National NAVYA MYTHOS Grid.
         </p>
      </div>

      <Suspense fallback={<div className="glass p-20 rounded-[48px] text-center">Synchronizing with National Hub...</div>}>
        <BookingContent />
      </Suspense>

      {/* Background 3D subtle effect */}
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '600px', height: '600px', opacity: 0.1, pointerEvents: 'none', zIndex: -1 }}>
         <ThreeDModel />
      </div>
    </main>
  );
}
