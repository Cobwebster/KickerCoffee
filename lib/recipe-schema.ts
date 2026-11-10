import { SITE } from './content'
import type { Recipe } from './recipes'

/** ISO 8601 duration like PT5M / PT1H30M */
export function isoDurationMinutes(totalMinutes: number): string {
  const m = Math.max(1, Math.round(totalMinutes))
  if (m < 60) return `PT${m}M`
  const h = Math.floor(m / 60)
  const rem = m % 60
  return rem ? `PT${h}H${rem}M` : `PT${h}H`
}

/** Pull a usable minute count from strings like "4 min", "5–8 min", "15 min (first batch)". */
export function parseRecipeMinutes(time: string): number {
  const nums = [...time.matchAll(/(\d+)/g)].map((m) => Number(m[1]))
  if (!nums.length) return 10
  return Math.max(...nums)
}

function cuisineFor(recipe: Recipe): string {
  if (recipe.category === 'Korean café') return 'Korean'
  if (recipe.slug.includes('vietnamese')) return 'Vietnamese'
  if (recipe.slug.includes('spanish')) return 'Spanish'
  if (recipe.category === 'Espresso drink' || recipe.slug === 'affogato') return 'Italian'
  return 'Café'
}

function stepName(text: string): string {
  const clause = text.split(/[.!—]/)[0]?.trim() ?? text
  if (clause.length <= 48) return clause
  return `${clause.slice(0, 45).trim()}…`
}

/**
 * Google Recipe rich-result JSON-LD.
 * Required: name, image
 * Recommended: times, yield, ingredients, HowToStep instructions, category, cuisine, keywords, author, dates
 * Do NOT invent aggregateRating — Google forbids fake reviews.
 */
export function buildRecipeJsonLd(recipe: Recipe) {
  const totalMinutes = parseRecipeMinutes(recipe.time)
  const prepMinutes = Math.max(1, Math.round(totalMinutes * 0.35))
  const cookMinutes = Math.max(1, totalMinutes - prepMinutes)
  const pageUrl = `${SITE.url}/recipes/${recipe.slug}`
  const imageUrl = `${SITE.url}${recipe.image}`

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.metaDescription,
    image: [imageUrl],
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    datePublished: recipe.updated,
    dateModified: recipe.updated,
    prepTime: isoDurationMinutes(prepMinutes),
    cookTime: isoDurationMinutes(cookMinutes),
    totalTime: isoDurationMinutes(totalMinutes),
    recipeYield: ['1', recipe.yield],
    recipeCategory: 'Drink',
    recipeCuisine: cuisineFor(recipe),
    keywords: [
      recipe.name.toLowerCase(),
      'coffee recipe',
      'homemade café drink',
      recipe.difficulty === 'Beginner' ? 'easy' : 'intermediate',
      'no espresso machine option',
    ].join(', '),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: stepName(text),
      text,
      url: `${pageUrl}#step-${i + 1}`,
    })),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  }

  if (recipe.youtube) {
    schema.video = {
      '@type': 'VideoObject',
      name: recipe.youtube.title,
      description: `${recipe.name} how-to video by ${recipe.youtube.channel}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${recipe.youtube.id}/hqdefault.jpg`,
      contentUrl: `https://www.youtube.com/watch?v=${recipe.youtube.id}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${recipe.youtube.id}`,
      uploadDate: recipe.updated,
    }
  }

  return schema
}

/** ItemList for /recipes — enables Google recipe host carousel eligibility. */
export function buildRecipeItemListJsonLd(recipes: Recipe[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: recipes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/recipes/${r.slug}`,
      name: r.name,
    })),
  }
}
