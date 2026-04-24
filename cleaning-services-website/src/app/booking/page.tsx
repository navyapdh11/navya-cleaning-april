'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ThreeDModel } from '@/components/ThreeDModel';

function BookingForm({ fetchRecentBookings }: { fetchRecentBookings: () => void }) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mythosResponse, setMythosResponse] = useState<any>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const [facilityName, setFacilityName] = useState('');
  const [sqft, setSqft] = useState(1000);
  const [date, setDate] = useState('');

  useEffect(() => {
    const sqftParam = searchParams.get('sqft');
    if (sqftParam) setSqft(Number(sqftParam));
  }, [searchParams]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Initializing NAVYA MYTHOS architecture...');
    setMythosResponse(null);
    setBookingId(null);

    try {
      const res = await fetch('/api/mythos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'schedule', 
          payload: { facilityName, sqft, date } 
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus('Booking confirmed via Autonomous Logistics.');
        setMythosResponse(data.mythosData);
        setBookingId(data.bookingId);
        fetchRecentBookings();
      } else {
        setStatus('Error scheduling via Mythos API.');
      }
    } catch (err) {
      setStatus('Network Error.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="glass" style={{ padding: '3rem', borderRadius: '24px' }}>
      <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Facility Name</label>
          <input 
            type="text" 
            required 
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Square Footage</label>
          <input 
            type="number" 
            required 
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date</label>
          <input 
            type="date" 
            required 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} 
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            marginTop: '1rem', padding: '1.2rem', borderRadius: '12px', 
            background: 'var(--primary)', color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
            opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Dispatch'}
        </button>
      </form>

      {status && (
        <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: 'rgba(0,255,0,0.1)', border: '1px solid rgba(0,255,0,0.2)' }}>
          <p style={{ fontWeight: 'bold', color: '#00cc00' }}>{status}</p>
          {bookingId && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Confirmation ID: #{bookingId}</p>}
          {mythosResponse && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Model Params:</strong> {mythosResponse.totalParameters}</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Attention:</strong> {mythosResponse.attnType}</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Generated Sequence:</strong> {JSON.stringify(mythosResponse.generatedTokens)}</p>
              <p style={{ fontSize: '0.9rem' }}><strong>Optimization:</strong> {mythosResponse.optimizationEngine}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  const fetchRecentBookings = async () => {
    try {
      const res = await fetch('/api/mythos');
      const data = await res.json();
      if (data.bookings) setRecentBookings(data.bookings);
    } catch (err) {
      console.error('Failed to fetch bookings');
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>
        Enterprise <span style={{ color: 'var(--primary)' }}>Booking</span>
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '4rem', textAlign: 'center' }}>
        Schedule your autonomous sanitization fleet. Powered by NAVYA MYTHOS.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', width: '100%', maxWidth: '1200px' }}>
        
        {/* Form Column */}
        <Suspense fallback={<div className="glass" style={{ padding: '3rem', borderRadius: '24px' }}>Loading booking engine...</div>}>
          <BookingForm fetchRecentBookings={fetchRecentBookings} />
        </Suspense>

        {/* 3D Visualizer & Recent Bookings Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Fleet Allocation Matrix</h3>
            <ThreeDModel />
            <p style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
              Real-time visualization of sanitization drones. Drag to interact.
            </p>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Dispatches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentBookings.length === 0 ? (
                <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No active dispatches detected.</p>
              ) : (
                recentBookings.map((b) => (
                  <div key={b.id} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{b.facilityName}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{b.sqft} sqft • {b.date}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem', borderRadius: '20px', background: 'rgba(0,255,0,0.1)', color: '#00cc00', border: '1px solid rgba(0,255,0,0.2)' }}>
                      {b.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
