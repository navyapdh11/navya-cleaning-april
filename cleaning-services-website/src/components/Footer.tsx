'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

interface SiteConfig {
  siteTitle: string;
  phone: string;
  email: string;
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Compliance', path: '/compliance' },
  { name: 'Booking', path: '/booking' },
];

const dashboardLinks = [
  { name: 'Admin Control', path: '/admin' },
  { name: 'Customer Portal', path: '/dashboard' },
];

export const Footer: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

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
        // Silently fall back to defaults
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchConfig();
    return () => { mounted = false; };
  }, []);

  const brandName = siteConfig?.siteTitle || 'NAVYA MYTHOS';
  const phone = siteConfig?.phone || '';
  const email = siteConfig?.email || '';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Brand */}
        <div className="footer-brand">
          <Shield size={20} strokeWidth={2.5} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          {brandName}
        </div>

        {/* Contact Info */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-8)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
        }}>
          {phone && (
            <a href={`tel:${phone}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              color: 'var(--foreground-secondary)',
              fontSize: 'var(--text-sm)',
            }}>
              <Phone size={16} />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              color: 'var(--foreground-secondary)',
              fontSize: 'var(--text-sm)',
            }}>
              <Mail size={16} />
              {email}
            </a>
          )}
          <Link href="/locations" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--foreground-secondary)',
            fontSize: 'var(--text-sm)',
          }}>
            <MapPin size={16} />
            Locations
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              {link.name}
            </Link>
          ))}
          <Link href="/locations">Locations</Link>
        </nav>

        {/* Dashboard Links */}
        <nav className="footer-nav" aria-label="Dashboard navigation" style={{ marginTop: 'var(--space-6)' }}>
          <span style={{ color: 'var(--foreground-muted)', fontSize: 'var(--text-sm)', marginRight: 'var(--space-4)' }}>Dashboards:</span>
          {dashboardLinks.map((link) => (
            <Link key={link.path} href={link.path} style={{ color: 'var(--primary)' }}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="footer-copy" style={{ marginTop: 'var(--space-8)' }}>
          &copy; {currentYear} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
