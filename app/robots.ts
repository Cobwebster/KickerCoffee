import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/content'

/**
 * Next.js generates /robots.txt from this file.
 * All content sections are open to crawlers.
 * The sitemap URL is declared so Google picks it up automatically.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
