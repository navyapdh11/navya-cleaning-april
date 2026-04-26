'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ThreeDModel } from '@/components/ThreeDModel';
import { SERVICES, STATES } from '@/lib/data';
import { MapPin, Briefcase, Calendar, Maximize } from 'lucide-react';

function BookingForm({ fetchRecentBookings }: { fetchRecentBookings: () => void }) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mythosResponse, setMythosResponse] = useState<any>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [facilityName, setFacilityName] = useState('');
  const [sqft, setSqft] = useState(1000);
  const [date, setDate] = useState('');
  const [serviceSlug, setServiceSlug] = useState(SERVICES[0].slug);
  const [stateCode, setStateCode] = useState('NSW');

  useEffect(() => {
    const sqftParam = searchParams.get('sqft');
    const serviceParam = searchParams.get('service');
    if (sqftParam) setSqft(Number(sqftParam));
    if (serviceParam) setServiceSlug(serviceParam);
  }, [searchParams]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Initializing National NAVYA MYTHOS architecture...');
    setMythosResponse(null);
    setBookingId(null);

    try {
      const res = await fetch('/api/mythos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'schedule', 
          payload: { 
            facilityName, 
            sqft, 
            date,
            serviceSlug,
            stateCode
          } 
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus('Dispatch confirmed via National Autonomous Logistics.');
        setMythosResponse(data.mythosData);
        setBookingId(data.bookingId);
        fetchRecentBookings();
      } else {
        setStatus('Error scheduling via National Mythos API.');
      }
    } catch (err) {
      setStatus('Network Error.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="glass" style={{ padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
      <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.8 }}>
              <Briefcase size={16} /> Facility Name
            </label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Sydney Tech Hub"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }} 
            />
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.8 }}>
              <Maximize size={16} /> Scale (SQFT)
            </label>
            <input 
              type="number" 
              required 
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }} 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.8 }}>
              <Calendar size={16} /> Dispatch Date
            </label>
            <input 
              type="date" 
              required 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }} 
            />
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.8 }}>
              <MapPin size={16} /> Region/State
            </label>
            <select 
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit', outline: 'none' }}
            >
              {STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.8 }}>Select Infrastructure Service</label>
          <select 
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit', outline: 'none' }}
          >
            {SERVICES.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            marginTop: '1rem', padding: '1.5rem', borderRadius: '16px', 
            background: 'var(--primary)', color: 'white', fontWeight: '900', fontSize: '1.2rem',
            opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: '0 10px 30px rgba(0, 112, 243, 0.4)'
          }}
        >
          {isSubmitting ? 'Initializing Node...' : 'Authorize Dispatch'}
        </button>
      </form>

      {status && (
        <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '16px', background: 'rgba(0,255,0,0.05)', border: '1px solid rgba(0,255,0,0.2)' }}>
          <p style={{ fontWeight: 'bold', color: '#00cc00', fontSize: '1.1rem' }}>{status}</p>
          {bookingId && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>Network ID: {bookingId}</p>}
          {mythosResponse && (
            <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <p><strong>Model:</strong> {mythosResponse.totalParameters}</p>
                <p><strong>Attention:</strong> {mythosResponse.attnType}</p>
                <p><strong>Optimizer:</strong> {mythosResponse.optimizer}</p>
                <p><strong>Alignment:</strong> {mythosResponse.alignment}</p>
              </div>
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
      <div className="bg-mesh"></div>
      <h1 style={{ fontSize: '5rem', marginBottom: '1rem', textAlign: 'center', fontWeight: '900', letterSpacing: '-3px' }}>
        Enterprise <span style={{ color: 'var(--primary)' }}>Dispatch</span>
      </h1>
      <p style={{ fontSize: '1.4rem', opacity: 0.7, marginBottom: '5rem', textAlign: 'center', maxWidth: '800px' }}>
        Schedule your autonomous sanitization fleet across the National NAVYA MYTHOS Network.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', width: '100%', maxWidth: '1300px' }}>
        
        {/* Form Column */}
        <Suspense fallback={<div className="glass" style={{ padding: '3rem', borderRadius: '32px' }}>Synchronizing with National Hub...</div>}>
          <BookingForm fetchRecentBookings={fetchRecentBookings} />
        </Suspense>

        {/* 3D Visualizer & Recent Bookings Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>Fleet Allocation Matrix</h3>
            <div style={{ height: '300px' }}>
              <ThreeDModel />
            </div>
            <p style={{ marginTop: '1.5rem', opacity: 0.6, fontSize: '0.85rem' }}>
              Real-time visualization of active sanitization drones in your selected region.
            </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px' }}>
            <h3 style={{ marginBottom: '2rem', fontWeight: '800' }}>National Dispatch Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {recentBookings.length === 0 ? (
                <p style={{ opacity: 0.4, fontStyle: 'italic', textAlign: 'center', padding: '2rem' }}>No active dispatches detected in this temporal node.</p>
              ) : (
                recentBookings.map((b) => (
                  <div key={b.id} style={{ padding: '1.2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{b.facilityName}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.2rem' }}>
                        {b.serviceName} • {b.stateCode} • {b.date}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', borderRadius: '20px', background: 'rgba(0,255,0,0.05)', color: '#00cc00', border: '1px solid rgba(0,255,0,0.1)', fontWeight: 'bold' }}>
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
