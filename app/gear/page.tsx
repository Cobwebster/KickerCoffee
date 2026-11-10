import type { Metadata } from 'next'
import { Link } from '@/components/link'
import Image from 'next/image'
import { Star, ArrowRight, ExternalLink } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { AffiliatePicks } from '@/components/affiliate-picks'
import { productUrl } from '@/lib/amazon'
import { BEAN_PICKS, GEAR, SETUPS, SITE } from '@/lib/content'

const faqs = [
  {
    question: 'What coffee gear should I buy first?',
    answer:
      'For most people, the first upgrade should be a burr grinder. Better grind consistency improves every brew method you already own, while an expensive brewer paired with a weak grinder still produces uneven coffee.',
  },
  {
    question: 'Is expensive coffee gear worth it?',
    answer:
      'Sometimes, but only after you solve the fundamentals. Fresh beans, a decent grinder, and a scale matter more than premium accessories. High-end gear becomes worth it when it gives you better consistency, tighter control, or a workflow improvement you will actually use every day.',
  },
  {
    question: 'Do I need separate gear for pour over and espresso?',
    answer:
      'Usually yes if you care about dialing both in well. Espresso demands a much more precise grinder and a different workflow than pour over. Some gear overlaps, like scales and kettles, but grinders especially are often optimized for one side or the other.',
  },
  {
    question: 'What makes a good home coffee setup?',
    answer:
      'A good setup matches your habits, budget, and preferred drinks. The best home coffee setup is not the most expensive one; it is the one you can use consistently with fresh beans, accurate measurements, and a brew method you actually enjoy repeating.',
  },
  {
    question: 'Should I buy coffee beans or gear first?',
    answer:
      'Fresh whole beans and a burr grinder beat almost any accessory. If your beans are stale or pre-ground, even a premium kettle will not save the cup. Pair a beginner kit with a medium-roast bag and brew for a week before upgrading again.',
  },
]

const STARTER_LINKS = [
  {
    label: 'Hand grinder (Timemore C3)',
    asin: 'B0CNDBVVDG',
    affiliateUrl: 'https://link.amazon/B07xJN4Wy',
  },
  { label: 'V60 dripper', asin: 'B006IKMUIG' },
  {
    label: 'Gooseneck (Hario Buono)',
    asin: 'B079ZYN4KL',
    affiliateUrl: 'https://link.amazon/B06K86WGa',
  },
  {
    label: 'Coffee scale',
    asin: 'B0CGCZMPKW',
    affiliateUrl: 'https://link.amazon/B03CBn8Up',
  },
]

export const metadata: Metadata = {
  title: 'Coffee Gear Guide 2026 — Grinders, Kettles, Scales & Home Setups',
  description:
    'Best coffee gear 2026: burr grinders, gooseneck kettles, coffee scales, and under-$200 home setups with Amazon picks. Buy order that actually upgrades your cup.',
  alternates: { canonical: '/gear' },
  keywords: [
    'best coffee gear 2026',
    'best burr grinder',
    'gooseneck kettle',
    'coffee scale with timer',
    'beginner coffee setup',
    'home espresso setup',
    'Timemore C3',
    'Fellow Stagg EKG',
  ],
  openGraph: {
    title: 'Coffee Gear Guide 2026 — Grinders, Kettles, Scales & Home Setups',
    description:
      'Burr grinders, gooseneck kettles, scales, and ready-to-buy home setups with Amazon product picks.',
    type: 'website',
    url: `${SITE.url}/gear`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Gear Guide 2026 — Grinders, Kettles, Scales & Home Setups',
    description:
      'Burr grinders, gooseneck kettles, scales, and ready-to-buy home setups with Amazon product picks.',
  },
}

export default function GearPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Gear & Setups', item: `${SITE.url}/gear` },
    ],
  }
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'KickerCoffee coffee gear guides and setups',
    itemListElement: [
      ...SETUPS.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title,
        url: `${SITE.url}/gear/setups/${s.slug}`,
      })),
      ...GEAR.map((g, i) => ({
        '@type': 'ListItem',
        position: SETUPS.length + i + 1,
        name: g.title,
        url: `${SITE.url}/gear/${g.slug}`,
      })),
    ],
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
      <JsonLd data={[breadcrumb, itemList, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gear & Setups', href: '/gear' },
        ]}
      />

      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Buying guides · Updated Nov 2026
        </p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee gear that actually upgrades your cup
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Buy the grinder first, then the scale, then the kettle — then stop shopping and brew.
          Below: ready-to-buy setups, category guides, and Amazon picks we would use ourselves.
        </p>
      </header>

      <aside className="mt-8 rounded-2xl border border-accent/30 bg-accent/10 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Start here</p>
        <h2 className="mt-1 font-serif text-xl font-semibold text-foreground md:text-2xl">
          Under-$200 beginner kit (shop the pieces)
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Timemore C3 + V60 + Buono kettle + scale. Full walkthrough on the beginner setup page —
          quick Amazon links below.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {STARTER_LINKS.map((p) => (
            <a
              key={p.asin}
              href={productUrl(p)}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent"
            >
              {p.label}
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          ))}
          <Link
            href="/gear/setups/beginner-home-coffee-setup"
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
          >
            Full beginner setup
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </aside>

      <section className="mt-12" aria-labelledby="setups-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="setups-heading" className="font-serif text-2xl font-semibold text-foreground">
              Recommended setups
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete kits — each item links out to Amazon.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SETUPS.map((s) => (
            <Link
              key={s.slug}
              href={`/gear/setups/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                  {s.budget} · {s.level}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  View the setup
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="font-serif text-2xl font-semibold text-foreground">
          Gear buying guides
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Category guides with budget / best overall / premium Amazon picks.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GEAR.map((g) => (
            <Link
              key={g.slug}
              href={`/gear/${g.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                  {g.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                  {g.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {g.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
                    {g.rating.toFixed(1)}
                  </span>
                  <span>
                    {g.picks?.length ? `${g.picks.length} Amazon picks` : g.priceRange}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Buy order that works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>
            <Link href="/gear/best-burr-coffee-grinders" className="font-medium text-accent hover:underline">
              Burr grinder
            </Link>{' '}
            — biggest flavor jump.
          </li>
          <li>
            <Link href="/gear/best-coffee-scales" className="font-medium text-accent hover:underline">
              Scale with timer
            </Link>{' '}
            — ratios become repeatable.
          </li>
          <li>
            <Link href="/gear/best-gooseneck-kettles" className="font-medium text-accent hover:underline">
              Gooseneck kettle
            </Link>{' '}
            — if you pour over.
          </li>
          <li>Brewer last — V60 / AeroPress / espresso machine after the above.</li>
          <li>
            <Link href="/coffee-beans" className="font-medium text-accent hover:underline">
              Fresh whole beans
            </Link>{' '}
            — gear cannot fix a stale bag.
          </li>
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          Dial recipes with the{' '}
          <Link href="/tools/coffee-ratio-calculator" className="font-medium text-accent hover:underline">
            ratio calculator
          </Link>{' '}
          and{' '}
          <Link href="/brewing-guides" className="font-medium text-accent hover:underline">
            brewing guides
          </Link>
          .
        </p>
      </section>

      <div className="max-w-3xl">
        <AffiliatePicks
          heading="Coffee beans worth buying with your gear"
          intro="Whole-bean bags that pair with the kits above — medium for learning, espresso blends for machines, dark for bold cups."
          products={BEAN_PICKS.slice(0, 4)}
        />
      </div>

      <p className="mt-12 rounded-lg border border-border bg-secondary/50 p-4 text-xs leading-relaxed text-muted-foreground">
        Disclosure: KickerCoffee may earn a commission from qualifying purchases made through Amazon
        links on this site. Recommendations stay the same either way — we only suggest gear and beans
        we would use ourselves.
      </p>

      <FaqSection faqs={faqs} />
    </main>
  )
}
