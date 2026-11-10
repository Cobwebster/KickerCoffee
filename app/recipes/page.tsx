import type { Metadata } from 'next'
import { Link } from '@/components/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { RecipeHubGrid } from '@/components/recipe-hub-grid'
import { SITE } from '@/lib/content'
import { buildRecipeItemListJsonLd } from '@/lib/recipe-schema'
import { RECIPES } from '@/lib/recipes'

const faqs = [
  {
    question: 'What is the difference between a brewing guide and a recipe?',
    answer:
      'Brewing guides teach a method (pour over, French press, espresso). Recipes are drinks you build on top of a brew — iced latte, cappuccino, Vietnamese iced coffee — with ingredients, ratios, and variations.',
  },
  {
    question: 'Do I need an espresso machine for these recipes?',
    answer:
      'Many drinks start with espresso, but every recipe includes a Moka pot, AeroPress, or instant espresso substitute so you can still make them at home.',
  },
  {
    question: 'What is the difference between an iced latte and a shaken espresso?',
    answer:
      'An iced latte is mostly cold milk with espresso. A shaken espresso is mostly espresso shaken with ice and syrup, finished with a splash of milk.',
  },
  {
    question: 'Is a Spanish latte the same as Vietnamese iced coffee?',
    answer:
      'Both use sweetened condensed milk. A Spanish latte also has a lot of fresh milk. Vietnamese cà phê sữa đá is strong coffee, condensed milk, and ice — typically without steamed milk.',
  },
  {
    question: 'What is Korean cream coffee?',
    answer:
      'Usually iced coffee topped with a thick layer of lightly sweetened whipped cream (Einspänner-style). Different from a deep cream latte, where cream is mixed into the milk. See the Korean cream coffee recipe.',
  },
  {
    question: 'What is a yeonyu latte?',
    answer:
      '연유라떼 — a Korean condensed-milk latte with espresso, sweetened condensed milk, and fresh milk. Closely related to a Spanish latte; full recipe under yeonyu latte.',
  },
]

export const metadata: Metadata = {
  title: 'Coffee Recipes — Korean Cream Coffee, Lattes, Espresso Drinks',
  description:
    'Homemade coffee recipes with ingredients, ratios, and step-by-step method: Korean cream coffee, yeonyu latte, deep cream latte, dalgona, iced latte, cappuccino, Vietnamese iced coffee, and more.',
  alternates: { canonical: '/recipes' },
  keywords: [
    'coffee recipes',
    'korean cream coffee',
    'yeonyu latte',
    'dalgona coffee',
    'deep cream latte',
    'iced latte recipe',
    'cappuccino recipe',
    'vietnamese iced coffee',
    'spanish latte',
    'brown sugar shaken espresso',
  ],
  openGraph: {
    title: 'Coffee Recipes — Café Drinks at Home',
    description:
      'Step-by-step coffee drink recipes with ratios, ingredients, and no-machine options.',
    type: 'website',
    url: `${SITE.url}/recipes`,
  },
}

export default function RecipesPage() {
  const itemList = buildRecipeItemListJsonLd(RECIPES)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const featured = [
    'korean-cream-coffee',
    'yeonyu-latte',
    'iced-latte',
    'vietnamese-iced-coffee',
    'brown-sugar-shaken-espresso',
    'dalgona-coffee',
  ]
    .map((slug) => RECIPES.find((r) => r.slug === slug))
    .filter(Boolean) as typeof RECIPES

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={[itemList, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Recipes', href: '/recipes' },
        ]}
      />

      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee drink recipes
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Café drinks you can actually repeat at home — iced lattes, cappuccinos, condensed-milk
          coffees, Korean cream drinks, and desserts — with ingredients, ratios, and a way to make
          them without an espresso machine.
        </p>
      </header>

      <section className="mt-10 max-w-3xl" aria-labelledby="featured-heading">
        <h2
          id="featured-heading"
          className="font-serif text-2xl font-semibold tracking-tight text-foreground"
        >
          Start here
        </h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          High-intent drinks people search by name — each page has a full ingredient list, timed
          method, and troubleshooting.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {featured.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/recipes/${r.slug}`}
                className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
              >
                <span className="font-medium text-foreground">{r.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{r.time}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RecipeHubGrid recipes={RECIPES} />

      <section className="mt-16 max-w-3xl border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Recipes vs brewing guides
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          If you want to learn pour over, French press, or how to pull a shot, start in{' '}
          <Link href="/brewing-guides" className="font-medium text-accent underline-offset-2 hover:underline">
            Brewing Guides
          </Link>
          . This section assumes you can make a strong coffee base and then turns it into a drink
          someone would order by name. Each page is a full recipe — not a three-line ingredient dump
          — with troubleshooting so a watery iced latte or grainy mocha has a fix.
        </p>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Pair recipes with the{' '}
          <Link href="/tools/iced-coffee-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
            iced coffee calculator
          </Link>
          ,{' '}
          <Link href="/tools/espresso-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
            espresso calculator
          </Link>
          , or{' '}
          <Link href="/tools/coffee-calories-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
            coffee calories calculator
          </Link>{' '}
          when you want numbers for milk, ice, or syrup.
        </p>
      </section>

      <FaqSection faqs={faqs} />
    </main>
  )
}
