'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface AdCampaign {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
  targetPages: string;
  startDate: string;
  endDate: string | null;
  budget: number;
  createdAt: string;
}

interface AdBannerProps {
  /** Optional page path to filter ads by targetPages (e.g., "/services") */
  page?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ page }) => {
  const [activeAd, setActiveAd] = useState<AdCampaign | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if ad was already dismissed this session
    const sessionDismissed = sessionStorage.getItem('ad-banner-dismissed');
    if (sessionDismissed) {
      setDismissed(true);
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchAds = async () => {
      try {
        const res = await fetch('/api/mythos?resource=ads');
        const data = await res.json();
        if (mounted && data.campaigns) {
          const active = data.campaigns.filter((c: AdCampaign) => c.isActive);
          if (active.length > 0) {
            let ad = active[0];
            // If page prop provided, try to find an ad targeting this page
            if (page) {
              const targeted = active.find((c: AdCampaign) => {
                try {
                  const targets: string[] = typeof c.targetPages === 'string'
                    ? JSON.parse(c.targetPages)
                    : c.targetPages || [];
                  return targets.includes(page) || targets.includes('*');
                } catch {
                  return false;
                }
              });
              if (targeted) ad = targeted;
            }
            setActiveAd(ad);
          }
        }
      } catch {
        // Silently fail — no ad shown
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchAds();
    return () => { mounted = false; };
  }, [page]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('ad-banner-dismissed', 'true');
  };

  if (loading || dismissed || !activeAd) {
    return null;
  }

  return (
    <div
      className="glass"
      style={{
        position: 'relative',
        margin: 'var(--space-4) var(--space-8)',
        padding: 'var(--space-4) var(--space-6)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        flexWrap: 'wrap',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      {/* Ad Image */}
      {activeAd.imageUrl && (
        <div style={{
          flexShrink: 0,
          width: '60px',
          height: '60px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          <img
            src={activeAd.imageUrl}
            alt={activeAd.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Ad Content */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <h4 style={{
          fontSize: 'var(--text-base)',
          fontWeight: 700,
          marginBottom: 'var(--space-1)',
          color: 'var(--foreground)',
        }}>
          {activeAd.name}
        </h4>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--foreground-secondary)',
          lineHeight: 'var(--leading-normal)',
        }}>
          {activeAd.description}
        </p>
      </div>

      {/* CTA Link */}
      {activeAd.linkUrl && activeAd.linkUrl !== '#' && (
        <Link
          href={activeAd.linkUrl}
          className="btn btn-primary"
          style={{ flexShrink: 0 }}
        >
          Learn More
        </Link>
      )}

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss ad"
        style={{
          position: 'absolute',
          top: 'var(--space-2)',
          right: 'var(--space-2)',
          padding: 'var(--space-1)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--foreground-muted)',
          transition: 'color var(--motion-fast) var(--motion-ease-out)',
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--foreground)'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--foreground-muted)'; }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
