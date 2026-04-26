import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cleaning-services-website-teal.vercel.app';
  
  // Static core routes
  const routes = [
    '',
    '/pricing',
    '/booking',
    '/compliance',
    '/dashboard',
    '/enterprise/ndis',
    '/enterprise/real-estate',
    '/enterprise/corporate'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic service/state/city combinations would be generated here
  // by fetching from the database. For now, returning the static roots.
  return routes;
}
