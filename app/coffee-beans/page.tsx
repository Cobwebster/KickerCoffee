import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { BEAN_ARTICLES, SITE } from '@/lib/content'

const faqs = [
  {
    question: 'What coffee beans should beginners buy?',
    answer:
      'Most beginners do best with a freshly roasted medium-roast coffee from a reliable roaster. Medium roasts are easier to brew than very light roasts and less intense than dark roasts, which makes them a safer starting point while you learn what flavors you actually enjoy.',
  },
  {
    question: 'What is the difference between light, medium, and dark roast coffee?',
    answer:
      'Light roasts preserve more acidity, fruit, and floral character from the origin. Medium roasts balance origin flavor with caramelized sweetness. Dark roasts lean toward roast-driven notes like chocolate, smoke, and bitterness with lower acidity.',
  },
  {
    question: 'How long do coffee beans stay fresh after roasting?',
    answer:
      'Whole beans are usually at their best from about 4 days to 4 weeks after roasting, though some coffees hold up longer. Once ground, coffee loses aroma quickly, which is why grinding right before brewing matters so much.',
  },
  {
    question: 'Does coffee origin really change the taste?',
    answer:
      'Yes. Origin affects acidity, body, sweetness, and aroma because altitude, climate, soil, varietal, and processing all shape flavor. Ethiopian coffees often taste floral or fruity, while Brazilian coffees tend to be nuttier and lower in acidity.',
  },
]

export const metadata: Metadata = {
  title: 'Coffee Beans & Roast Education — Origins, Roast Levels & Freshness',
  description:
    'Learn about coffee beans: roast levels explained, how bean origins shape flavor, and how to store coffee to keep it fresh. Beginner-friendly coffee education.',
  alternates: { canonical: '/coffee-beans' },
  openGraph: {
    title: 'Coffee Beans & Roast Education — Origins, Roast Levels & Freshness',
    description:
      'Learn about coffee beans: roast levels explained, how bean origins shape flavor, and how to store coffee to keep it fresh. Beginner-friendly coffee education.',
    type: 'website',
    url: `${SITE.url}/coffee-beans`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Beans & Roast Education — Origins, Roast Levels & Freshness',
    description:
      'Learn about coffee beans: roast levels explained, how bean origins shape flavor, and how to store coffee to keep it fresh. Beginner-friendly coffee education.',
  },
}

export default function CoffeeBeansPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: BEAN_ARTICLES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.title,
      url: `${SITE.url}/coffee-beans/${a.slug}`,
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
          { label: 'Beans & Roasts', href: '/coffee-beans' },
        ]}
      />

      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee Beans & Roast Education
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Understand what you are drinking. Learn how roast level, origin, and freshness shape every
          cup — so you can shop and taste with confidence.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BEAN_ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/coffee-beans/${a.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                {a.topic}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                {a.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {a.readTime} read
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How to buy beans with more confidence
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Most people buy coffee by brand recognition or roast label alone, but those are blunt tools. Better buying decisions usually come from combining a few signals at once: roast date, origin, processing method, and whether the roaster tells you anything specific about the coffee beyond generic tasting notes. Freshness tells you whether the bag is even worth considering. Origin suggests the flavor family. Processing explains whether the cup will lean cleaner or fruitier. Roast level tells you how much of the bean\'s original character is likely to survive.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The three articles in this section work together for that reason. Roast education helps you choose the style you actually enjoy. Origin education helps you predict the flavor profile before you brew. Storage education protects the quality you paid for after the bag comes home. Taken together, they solve the biggest beginner mistake in coffee: buying decent beans and then losing most of their potential before they ever reach the cup.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Bean buying fundamentals
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            <li>Prioritize a roast date over a vague best-by date whenever possible.</li>
            <li>Buy whole beans unless you have no grinder; pre-ground coffee loses aroma fast.</li>
            <li>Match bean style to brew method instead of assuming one bag suits everything equally well.</li>
            <li>Store coffee for freshness, not display. Clear jars and warm countertops are a quality tax.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          What this section covers better now
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Thin educational pages often summarize a topic in a few sentences and leave the reader without enough detail to make a better decision. This section now does more than define terms. The roast guide explains how roast changes brew behavior, not just flavor. The origin guide explains how to interpret labels and compare coffees intelligently. The freshness guide covers how coffee actually stales and when freezing makes sense. That added depth gives each page a clearer purpose for readers and stronger differentiation for search engines.
        </p>
      </section>

      <FaqSection faqs={faqs} />
    </main>
  )
}
