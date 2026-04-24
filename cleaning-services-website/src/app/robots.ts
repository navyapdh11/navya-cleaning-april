import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/booking/confirmation/'],
    },
    sitemap: 'https://cleanpro.com.au/sitemap.xml',
  }
}
