'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SERVICES, STATES } from '@/lib/data';
import { ChevronDown, Menu, X, Sparkles, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) setActiveDropdown(null);
    else setActiveDropdown(name);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Compliance', path: '/compliance' },
  ];

  return (
    <nav className="glass" style={{ 
      margin: '1rem 2rem', 
      padding: '0.8rem 2rem', 
      borderRadius: '24px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 1000
    }}>
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ 
          background: 'var(--primary)', 
          width: '35px', 
          height: '35px', 
          borderRadius: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white'
        }}>
          <Shield size={20} />
        </div>
        <div style={{ fontWeight: '900', fontSize: '1.4rem', letterSpacing: '-1.5px', color: 'rgb(var(--foreground-rgb))' }}>
          NAVYA <span style={{ color: 'var(--primary)' }}>MYTHOS</span>
        </div>
      </Link>
      
      {/* Desktop Navigation */}
      <div style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            style={{ 
              fontWeight: '700', 
              fontSize: '0.9rem',
              opacity: pathname === link.path ? 1 : 0.6,
              color: pathname === link.path ? 'var(--primary)' : 'inherit',
              transition: 'all 0.2s'
            }}
          >
            {link.name}
          </Link>
        ))}

        {/* Services Dropdown */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setActiveDropdown('services')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', fontSize: '0.9rem', opacity: 0.6 }}>
            Services <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {activeDropdown === 'services' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="glass"
                style={{ 
                  position: 'absolute', top: '100%', left: '-50%', width: '450px', 
                  padding: '1.5rem', marginTop: '1rem', borderRadius: '24px',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'
                }}
              >
                {SERVICES.map((s) => (
                  <Link 
                    key={s.slug} 
                    href={`/services/${s.slug}`}
                    style={{ 
                      padding: '0.8rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.2rem',
                      background: 'rgba(255,255,255,0.05)', transition: 'background 0.2s'
                    }}
                    className="nav-item-hover"
                  >
                    <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{s.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{s.category}</span>
                  </Link>
                ))}
                <Link 
                  href="/admin"
                  style={{ 
                    padding: '0.8rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.2rem',
                    background: 'rgba(0, 112, 243, 0.1)', border: '1px solid var(--primary)', transition: 'background 0.2s',
                    gridColumn: 'span 2'
                  }}
                  className="nav-item-hover"
                >
                  <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--primary)' }}>Admin Center</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Full Network & CMS Control</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Locations Dropdown */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setActiveDropdown('locations')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', fontSize: '0.9rem', opacity: 0.6 }}>
            Locations <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {activeDropdown === 'locations' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="glass"
                style={{ 
                  position: 'absolute', top: '100%', left: '-150%', width: '250px', 
                  padding: '1rem', marginTop: '1rem', borderRadius: '20px',
                  display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem'
                }}
              >
                {STATES.map((state) => (
                  <Link 
                    key={state.code} 
                    href={`/locations/${state.code.toLowerCase()}`}
                    style={{ 
                      padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 'bold',
                      background: 'rgba(255,255,255,0.05)'
                    }}
                  >
                    {state.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/booking" className="glass" style={{ 
          padding: '0.7rem 1.5rem', 
          borderRadius: '14px', 
          fontSize: '0.85rem', 
          fontWeight: '900',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0, 112, 243, 0.3)'
        }}>
          Direct Dispatch
        </Link>
        
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ display: 'flex', opacity: 0.6 }}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        .nav-item-hover:hover {
          background: rgba(255,255,255,0.1) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </nav>
  );
};
