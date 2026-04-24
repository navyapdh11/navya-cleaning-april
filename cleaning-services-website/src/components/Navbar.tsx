'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <nav className="glass" style={{ 
      margin: '1rem 2rem', 
      padding: '1rem 2rem', 
      borderRadius: '20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '60px',
      zIndex: 90
    }}>
      <div style={{ fontWeight: '900', fontSize: '1.5rem', letterSpacing: '-1px' }}>
        NAVYA <span style={{ color: 'var(--primary)' }}>MYTHOS</span>
      </div>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            style={{ 
              fontWeight: 'bold', 
              opacity: pathname === link.path ? 1 : 0.6,
              color: pathname === link.path ? 'var(--primary)' : 'inherit',
              transition: 'opacity 0.2s'
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div>
        <Link href="/booking" className="glass" style={{ 
          padding: '0.6rem 1.2rem', 
          borderRadius: '12px', 
          fontSize: '0.9rem', 
          fontWeight: 'bold',
          background: 'var(--primary)',
          color: 'white',
          border: 'none'
        }}>
          Direct Dispatch
        </Link>
      </div>
    </nav>
  );
};
