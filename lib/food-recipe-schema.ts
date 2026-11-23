import { SITE } from './site'
import {
  isoDurationMinutes,
  parseRecipeMinutes,
} from './recipe-schema'
import type { FoodRecipe } from './food-recipes'

function stepName(text: string): string {
  const clause = text.split(/[.!—]/)[0]?.trim() ?? text
  if (clause.length <= 48) return clause
  return `${clause.slice(0, 45).trim()}…`
}

/** Google Recipe JSON-LD for /food-recipes pages — no fake aggregateRating. */
export function buildFoodRecipeJsonLd(recipe: FoodRecipe) {
  const totalMinutes = parseRecipeMinutes(recipe.time)
  const prepMinutes = recipe.prepTime
    ? parseRecipeMinutes(recipe.prepTime)
    : Math.max(1, Math.round(totalMinutes * 0.4))
  const cookMinutes = recipe.cookTime
    ? parseRecipeMinutes(recipe.cookTime)
    : Math.max(0, totalMinutes - prepMinutes)
  const pageUrl = `${SITE.url}/food-recipes/${recipe.slug}`
  const imageUrl = `${SITE.url}${recipe.image}`

  return {
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
    prepTime: isoDurationMinutes(Math.max(1, prepMinutes)),
    ...(cookMinutes > 0 ? { cookTime: isoDurationMinutes(cookMinutes) } : {}),
    totalTime: isoDurationMinutes(Math.max(1, totalMinutes)),
    recipeYield: recipe.yield,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine ?? 'American',
    keywords: (recipe.keywords ?? [recipe.name, recipe.category, 'homemade recipe']).join(', '),
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
}

export function buildFoodRecipeItemListJsonLd(recipes: FoodRecipe[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: recipes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/food-recipes/${r.slug}`,
      name: r.name,
    })),
  }
}
