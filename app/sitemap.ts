import type { MetadataRoute } from 'next'
import {
  SITE,
  BREW_GUIDES,
  GEAR,
  SETUPS,
  BEAN_ARTICLES,
  TOOLS,
} from '@/lib/content'

const BASE = SITE.url

/**
 * Next.js generates /sitemap.xml from this file at build time.
 * All URLs are absolute. changeFrequency and priority follow Google's
 * best-practice conventions for content sites.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/brewing-guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/gear`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/coffee-beans`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const brewGuideRoutes: MetadataRoute.Sitemap = BREW_GUIDES.map((g) => ({
    url: `${BASE}/brewing-guides/${g.slug}`,
    lastModified: g.updated ?? now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const gearRoutes: MetadataRoute.Sitemap = GEAR.map((g) => ({
    url: `${BASE}/gear/${g.slug}`,
    lastModified: g.updated ?? now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const setupRoutes: MetadataRoute.Sitemap = SETUPS.map((s) => ({
    url: `${BASE}/gear/setups/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const beanRoutes: MetadataRoute.Sitemap = BEAN_ARTICLES.map((a) => ({
    url: `${BASE}/coffee-beans/${a.slug}`,
    lastModified: a.updated ?? now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...brewGuideRoutes,
    ...gearRoutes,
    ...setupRoutes,
    ...beanRoutes,
    ...toolRoutes,
  ]
}
