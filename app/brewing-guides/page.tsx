import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Gauge } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { BREW_GUIDES, SITE } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Coffee Brewing Guides — Pour Over, French Press, Espresso & More',
  description:
    'Step-by-step coffee brewing guides for every method: pour over, French press, AeroPress, espresso, cold brew, and Moka pot. Exact ratios, grind sizes, and timings.',
  alternates: { canonical: '/brewing-guides' },
}

export default function BrewingGuidesPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: BREW_GUIDES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `${SITE.url}/brewing-guides/${g.slug}`,
    })),
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={itemList} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Brewing Guides', href: '/brewing-guides' },
        ]}
      />

      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee Brewing Guides
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Tested, step-by-step recipes for every brew method — with the exact coffee-to-water ratio,
          grind size, and timing you need for a repeatable, delicious cup.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BREW_GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/brewing-guides/${guide.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                {guide.method}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                {guide.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {guide.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {guide.brewTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Gauge className="size-3.5" aria-hidden="true" />
                  {guide.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
