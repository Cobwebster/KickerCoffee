import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { SITE } from '@/lib/site'
import { FOOD_RECIPES } from '@/lib/food-recipes'
import { buildFoodRecipeItemListJsonLd } from '@/lib/food-recipe-schema'

const faqs = [
  {
    question: 'Are these coffee shop food recipes?',
    answer:
      'Many are café classics — avocado toast, oatmeal, cookies, brownies, yogurt parfaits — written for home kitchens. Every recipe page includes a coffee pairing section that explains what to brew and why it works with that plate.',
  },
  {
    question: 'Do you have healthy and indulgent recipes?',
    answer:
      'Yes. Overnight oats, yogurt parfaits, bibimbap, and chicken wraps sit next to cookies, cupcakes, and brownies. Pick the lane that matches the day.',
  },
  {
    question: 'Are the photos AI-generated?',
    answer:
      'No. Food photos on these pages are real photographs. We do not use AI-generated recipe hero images.',
  },
  {
    question: 'How are food recipes different from coffee recipes?',
    answer:
      '/recipes is for coffee drinks (lattes, espresso drinks). /food-recipes is for actual food — breakfast, lunch, bakery, and dessert.',
  },
]

export const metadata: Metadata = {
  title: 'Food Recipes — Breakfast, Healthy Bowls, Bakery & Coffee Pairings',
  description:
    'Homemade food recipes with real photos: overnight oats, avocado toast, cookies, brownies, bibimbap, and more. Healthy and café-style plates with a coffee pairing on every page.',
  alternates: { canonical: '/food-recipes' },
  keywords: [
    'food recipes',
    'breakfast recipes',
    'healthy recipes',
    'overnight oats',
    'avocado toast',
    'chocolate chip cookies',
    'bibimbap recipe',
    'coffee pairing food',
  ],
  openGraph: {
    title: 'Food Recipes — Real Photos, Homemade Plates',
    description:
      'Breakfast, lunch, bakery, and dessert recipes with real photography and coffee pairings on every page.',
    type: 'website',
    url: `${SITE.url}/food-recipes`,
  },
}

export default function FoodRecipesHubPage() {
  const itemList = buildFoodRecipeItemListJsonLd(FOOD_RECIPES)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={[itemList, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Food Recipes', href: '/food-recipes' },
        ]}
      />

      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Food recipes</p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Food recipes for coffee people
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Breakfast jars, café toast, bakery cookies, and healthy bowls — with real photos (no AI
          hero shots). Every recipe page explains what coffee to pair and why.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FOOD_RECIPES.map((r) => (
          <Link
            key={r.slug}
            href={`/food-recipes/${r.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={r.image}
                alt={`${r.name} recipe`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                {r.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                {r.name} recipe
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {r.time}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Looking for drinks instead? See{' '}
        <Link href="/recipes" className="font-medium text-accent hover:underline">
          coffee recipes
        </Link>{' '}
        for lattes, espresso drinks, and café beverages.
      </p>

      <FaqSection faqs={faqs} />
    </main>
  )
}
