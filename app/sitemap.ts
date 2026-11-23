import type { MetadataRoute } from 'next'
import {
  SITE,
  BREW_GUIDES,
  GEAR,
  SETUPS,
  BEAN_ARTICLES,
  TOOLS,
} from '@/lib/content'
import { RECIPES } from '@/lib/recipes'
import { FOOD_RECIPES } from '@/lib/food-recipes'

const BASE = SITE.url

/** Stable build-time stamp — avoid `new Date()` so regenerations don't churn ISR writes. */
const BUILD_STAMP = '2026-11-13'

/**
 * Fully static sitemap. lastModified comes from content `updated` fields when present.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: BUILD_STAMP,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/brewing-guides`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/gear`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/coffee-beans`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/tools`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/recipes`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/food-recipes`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/cookie-policy`,
      lastModified: BUILD_STAMP,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const brewGuideRoutes: MetadataRoute.Sitemap = BREW_GUIDES.map((g) => ({
    url: `${BASE}/brewing-guides/${g.slug}`,
    lastModified: g.updated ?? BUILD_STAMP,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const gearRoutes: MetadataRoute.Sitemap = GEAR.map((g) => ({
    url: `${BASE}/gear/${g.slug}`,
    lastModified: g.updated ?? BUILD_STAMP,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const setupRoutes: MetadataRoute.Sitemap = SETUPS.map((s) => ({
    url: `${BASE}/gear/setups/${s.slug}`,
    lastModified: s.updated ?? BUILD_STAMP,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const beanRoutes: MetadataRoute.Sitemap = BEAN_ARTICLES.map((a) => ({
    url: `${BASE}/coffee-beans/${a.slug}`,
    lastModified: a.updated ?? BUILD_STAMP,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: BUILD_STAMP,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  const recipeRoutes: MetadataRoute.Sitemap = RECIPES.map((r) => ({
    url: `${BASE}/recipes/${r.slug}`,
    lastModified: r.updated ?? BUILD_STAMP,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const foodRoutes: MetadataRoute.Sitemap = FOOD_RECIPES.map((r) => ({
    url: `${BASE}/food-recipes/${r.slug}`,
    lastModified: r.updated ?? BUILD_STAMP,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...brewGuideRoutes,
    ...gearRoutes,
    ...setupRoutes,
    ...beanRoutes,
    ...toolRoutes,
    ...recipeRoutes,
    ...foodRoutes,
  ]
}
