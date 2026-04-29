'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { STATES } from '@/lib/data';
import { ChevronDown, Menu, X, Sparkles, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteConfig {
  siteTitle: string;
  phone: string;
  email: string;
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Fetch site config on mount
  useEffect(() => {
    let mounted = true;
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/mythos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_config' }),
        });
        const data = await res.json();
        if (mounted && data.configs) {
          setSiteConfig(data.configs);
        }
      } catch {
        // Silently fall back to default
      } finally {
        if (mounted) {
          setConfigLoading(false);
        }
      }
    };
    fetchConfig();
    return () => { mounted = false; };
  }, []);

  const brandName = siteConfig?.siteTitle || 'NAVYA MYTHOS';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Compliance', path: '/compliance' },
    { name: 'Locations', path: '/locations' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const } },
    exit: { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.15 } },
  };

  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="Main navigation"
        data-scrolled={isScrolled}
      >
        <div className="navbar-container">
          {/* Brand */}
          <Link href="/" className="navbar-brand" aria-label={`${brandName} Home`}>
            <div className="brand-icon">
              <Shield size={20} strokeWidth={2.5} />
            </div>
            <span className="brand-text">
              {brandName.split(' ').length > 1 ? (
                <>
                  {brandName.substring(0, brandName.lastIndexOf(' '))}{' '}
                  <span className="brand-accent">{brandName.substring(brandName.lastIndexOf(' ') + 1)}</span>
                </>
              ) : (
                brandName
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link ${pathname === link.path ? 'nav-link-active' : ''}`}
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="nav-dropdown"
              ref={dropdownRef}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`nav-link nav-dropdown-trigger ${activeDropdown === 'services' ? 'nav-link-active' : ''}`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                Locations
                <ChevronDown size={14} strokeWidth={2.5} className={`nav-chevron ${activeDropdown === 'locations' ? 'nav-chevron-open' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'locations' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="nav-dropdown-menu"
                    role="menu"
                  >
                    {STATES.map((state) => (
                      <Link
                        key={state.code}
                        href={`/locations/${state.code.toLowerCase()}`}
                        className="nav-dropdown-item"
                        role="menuitem"
                      >
                        <Globe size={14} strokeWidth={2} />
                        {state.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="navbar-actions">
            <Link href="/booking" className="navbar-cta">
              Direct Dispatch
            </Link>
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mobile-menu-content">
              {[...navLinks, { name: 'Locations', path: '/locations/nsw' }].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`mobile-nav-link ${pathname === link.path ? 'mobile-nav-link-active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-dropdown-section">
                <span className="mobile-dropdown-label">Locations</span>
                <div className="mobile-dropdown-grid">
                  {STATES.map((state) => (
                    <Link
                      key={state.code}
                      href={`/locations/${state.code.toLowerCase()}`}
                      className="mobile-location-chip"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {state.code}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/booking"
                className="mobile-cta-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initialize Dispatch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
