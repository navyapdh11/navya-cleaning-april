'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';

// Australian state postcode ranges
const STATE_BY_POSTCODE: Record<string, string> = {
  'NSW': 'New South Wales',
  'VIC': 'Victoria',
  'QLD': 'Queensland',
  'WA': 'Western Australia',
  'SA': 'South Australia',
  'TAS': 'Tasmania',
  'ACT': 'Australian Capital Territory',
  'NT': 'Northern Territory',
};

function getStateFromPostcode(postcode: string): string | null {
  const code = parseInt(postcode, 10);
  if (isNaN(code)) return null;
  if (code >= 2000 && code <= 2599) return 'NSW';
  if (code >= 2619 && code <= 2899) return 'NSW';
  if (code >= 3000 && code <= 3999) return 'VIC';
  if (code >= 4000 && code <= 4999) return 'QLD';
  if (code >= 6000 && code <= 6797) return 'WA';
  if (code >= 5000 && code <= 5799) return 'SA';
  if (code >= 7000 && code <= 7799) return 'TAS';
  if (code >= 2600 && code <= 2618) return 'ACT';
  if (code >= 800 && code <= 999) return 'NT';
  if (code >= 830 && code <= 872) return 'NT';
  return null;
}

export const LocationBanner: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [postcode, setPostcode] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user dismissed the banner this session
    if (sessionStorage.getItem('location-banner-dismissed')) {
      setDismissed(true);
      return;
    }

    // Try geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Use reverse geocoding via a free API (no key needed for basic)
          // For now, derive from timezone offset as a rough proxy
          const offset = new Date().getTimezoneOffset();
          // Australia: UTC+8 to UTC+11 → offset -480 to -660
          if (offset >= -660 && offset <= -480) {
            // Rough state detection by timezone
            const state = offset === -600 ? 'NSW' : offset === -660 ? 'QLD' : offset === -570 ? 'SA' : offset === -540 ? 'NT' : offset === -480 ? 'WA' : null;
            if (state) {
              setLocation(state);
            }
          }
        },
        () => {}, // Error — skip
        { timeout: 5000 }
      );
    }

    // Try ipapi.co for free IP geolocation (no key, 1000 req/day free)
    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
      .then(r => r.json())
      .then(data => {
        if (data.region) {
          // ipapi returns full state name — map to code
          const stateMap: Record<string, string> = {
            'New South Wales': 'NSW',
            'Victoria': 'VIC',
            'Queensland': 'QLD',
            'Western Australia': 'WA',
            'South Australia': 'SA',
            'Tasmania': 'TAS',
            'Australian Capital Territory': 'ACT',
            'Northern Territory': 'NT',
          };
          const code = stateMap[data.region];
          if (code) {
            setLocation(code);
            setPostcode(data.postal || '');
          }
        }
      })
      .catch(() => {});
  }, []);

  if (dismissed) return null;
  if (!location) return null; // Only show when detected

  const dismiss = () => {
    sessionStorage.setItem('location-banner-dismissed', 'true');
    setDismissed(true);
  };

  const stateName = STATE_BY_POSTCODE[location] || location;

  return (
    <div style={{
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0.5rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1.5rem',
      fontSize: '0.85rem',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MapPin size={14} style={{ color: 'var(--primary)' }} />
        <span style={{ opacity: 0.5 }}>Serving</span>
        <strong>{stateName}</strong>
        {postcode && <span style={{ opacity: 0.3 }}>• {postcode}</span>}
      </div>
      <a href="/locations" style={{
        color: 'var(--primary)',
        textDecoration: 'underline',
        fontSize: '0.8rem',
        fontWeight: 600,
      }}>
        View all service areas →
      </a>
      <button onClick={dismiss} style={{
        position: 'absolute',
        right: '1rem',
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0.3)',
        cursor: 'pointer',
        padding: '0.3rem',
      }}>
        <X size={16} />
      </button>
    </div>
  );
};
