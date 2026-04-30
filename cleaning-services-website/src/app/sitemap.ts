import { MetadataRoute } from 'next'
import { SERVICES, STATES } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cleaning-services-website-teal.vercel.app';

  // Static core routes
  const coreRoutes = [
    { route: '', priority: 1, changeFrequency: 'daily' as const },
    { route: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/booking', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/compliance', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/dashboard', priority: 0.5, changeFrequency: 'monthly' as const },
    { route: '/enterprise/ndis', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/enterprise/real-estate', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/enterprise/corporate', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/locations', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/admin', priority: 0.1, changeFrequency: 'yearly' as const },
  ];

  const corePages: MetadataRoute.Sitemap = coreRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // State location pages
  const statePages: MetadataRoute.Sitemap = STATES.map((state) => ({
    url: `${baseUrl}/locations/${state.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...corePages, ...servicePages, ...statePages];
}
