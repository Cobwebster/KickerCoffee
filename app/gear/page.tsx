import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { GEAR, SETUPS, SITE } from '@/lib/content'

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
]

export const metadata: Metadata = {
  title: 'Coffee Gear Reviews & Recommended Home Setups',
  description:
    'Honest coffee gear reviews and curated home setups. Find the best burr grinders, gooseneck kettles, scales, and complete kits for every budget and skill level.',
  alternates: { canonical: '/gear' },
}

export default function GearPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: GEAR.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `${SITE.url}/gear/${g.slug}`,
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
          { label: 'Gear & Setups', href: '/gear' },
        ]}
      />

      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee Gear & Recommended Setups
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Honest buying guides for the gear that actually improves your cup — plus complete,
          ready-to-buy setups for every budget.
        </p>
      </header>

      {/* Setups */}
      <section className="mt-12" aria-labelledby="setups-heading">
        <h2 id="setups-heading" className="font-serif text-2xl font-semibold text-foreground">
          Recommended setups
        </h2>
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

      {/* Gear reviews */}
      <section className="mt-14" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="font-serif text-2xl font-semibold text-foreground">
          Gear buying guides
        </h2>
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
                  <span>{g.priceRange}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-12 rounded-lg border border-border bg-secondary/50 p-4 text-xs leading-relaxed text-muted-foreground">
        Note: KickerCoffee may earn a commission from qualifying purchases made through links on
        this site. This never affects our recommendations — we only suggest gear we would use
        ourselves.
      </p>

      <FaqSection faqs={faqs} />
    </main>
  )
}
