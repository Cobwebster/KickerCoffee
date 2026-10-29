import type { Metadata } from 'next'
import { Link } from '@/components/link'
import Image from 'next/image'
import { Clock, Gauge } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { SITE } from '@/lib/content'
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
]

export const metadata: Metadata = {
  title: 'Coffee Recipes — Iced Latte, Cappuccino, Vietnamese Coffee & More',
  description:
    'Homemade coffee drink recipes: iced latte, cappuccino, cortado, Spanish latte, Vietnamese iced coffee, brown sugar shaken espresso, pistachio latte, mocha, dirty chai, and affogato.',
  alternates: { canonical: '/recipes' },
  keywords: [
    'coffee recipes',
    'iced latte recipe',
    'cappuccino recipe',
    'vietnamese iced coffee',
    'spanish latte',
    'brown sugar shaken espresso',
    'pistachio latte recipe',
    'dirty chai',
    'affogato',
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
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: RECIPES.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.title,
      url: `${SITE.url}/recipes/${r.slug}`,
    })),
  }
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
          { label: 'Recipes', href: '/recipes' },
        ]}
      />

      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee drink recipes
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Café drinks you can actually repeat at home — iced lattes, cappuccinos, condensed-milk
          coffees, and desserts — with ingredients, ratios, and a way to make them without an
          espresso machine.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RECIPES.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                {recipe.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                {recipe.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {recipe.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {recipe.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Gauge className="size-3.5" aria-hidden="true" />
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16 max-w-3xl border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Recipes vs brewing guides
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          If you want to learn pour over, French press, or how to pull a shot, start in Brewing
          Guides. This section assumes you can make a strong coffee base and then turns it into a
          drink someone would order by name. Each page is a full recipe — not a three-line ingredient
          dump — with troubleshooting so a watery iced latte or grainy mocha has a fix.
        </p>
      </section>

      <FaqSection faqs={faqs} />
    </main>
  )
}
