'use client'

import { useState, useEffect } from 'react'

export function LeadCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds or on exit intent
    const timer = setTimeout(() => setIsOpen(true), 10000);
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      zIndex: 1000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      padding: '1rem',
      backdropFilter: 'blur(4px)'
    }}>
      <div className="glass" style={{ 
        maxWidth: '500px', 
        width: '100%', 
        overflow: 'hidden', 
        position: 'relative', 
        borderRadius: '32px',
        padding: '0'
      }}>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ 
            position: 'absolute', 
            top: '1.5rem', 
            right: '1.5rem', 
            color: 'rgba(255, 255, 255, 0.5)', 
            fontSize: '1.2rem',
            zIndex: 10
          }}
          aria-label="Close"
        >
          ✕
        </button>
        
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
          padding: '3rem 2rem', 
          color: 'white', 
          textAlign: 'center' 
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>
            Complimentary <span style={{ color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>AEO Hygiene Audit</span>
          </h2>
          <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
            Join the NAVYA MYTHOS network for real-time hygiene telemetry and enterprise sanitization protocols.
          </p>
        </div>

        <div style={{ padding: '2.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <p>Transmission Received. Our autonomous librarian is processing your request.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Enterprise Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '1.2rem', 
                    borderRadius: '16px', 
                    border: '1px solid var(--glass-border)', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    color: 'inherit',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <button 
                type="submit"
                style={{ 
                  width: '100%', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  fontWeight: 'bold', 
                  padding: '1.2rem', 
                  borderRadius: '16px', 
                  transition: 'transform 0.2s',
                  fontSize: '1.1rem'
                }}
              >
                Request Audit Report
              </button>
            </form>
          )}
          <p style={{ fontSize: '0.8rem', opacity: 0.5, textAlign: 'center', marginTop: '1.5rem' }}>
            Privacy secured via quantum-grade encryption. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
