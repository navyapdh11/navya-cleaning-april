'use client';

import React, { useState, useEffect } from 'react';

export const LocationBanner: React.FC = () => {
  const [location, setLocation] = useState('Detecting your enterprise node...');
  const [postcode, setPostcode] = useState('');

  useEffect(() => {
    // Simulate high-speed 2026 location detection
    const timer = setTimeout(() => {
      setLocation('Silicon Valley Tech Hub');
      setPostcode('94025');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      padding: '0.5rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      fontSize: '0.8rem',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: '0 0 20px 20px'
    }}>
      <div>
        <span style={{ opacity: 0.6 }}>Active Region:</span> <strong>{location}</strong>
      </div>
      <div>
        <span style={{ opacity: 0.6 }}>Postcode Priority:</span> <strong>{postcode || 'Scanning...'}</strong>
      </div>
      <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
        ● 2026 Enterprise Node Online
      </div>
    </div>
  );
};
