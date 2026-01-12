import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout', '/order-success'],
      },
    ],
    sitemap: 'https://frontend-iota-flax-11.vercel.app/sitemap.xml',
  }
}
