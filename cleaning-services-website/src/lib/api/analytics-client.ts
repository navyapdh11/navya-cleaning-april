// src/lib/api/analytics-client.ts
// Generic client for reporting events to Vercel/GA/etc
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  // Report to Vercel Analytics
  if (process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID) {
    // Vercel handles this automatically if configured, 
    // but we can add manual events if needed.
  }

  // Report to Google Analytics (via GTM)
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...properties,
    });
  }

  console.log(`[Analytics] ${eventName}`, properties);
};
