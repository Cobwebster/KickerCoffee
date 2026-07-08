import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { BEAN_ARTICLES, SITE } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Coffee Beans & Roast Education — Origins, Roast Levels & Freshness',
  description:
    'Learn about coffee beans: roast levels explained, how bean origins shape flavor, and how to store coffee to keep it fresh. Beginner-friendly coffee education.',
  alternates: { canonical: '/coffee-beans' },
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

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={itemList} />
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
    </main>
  )
}
