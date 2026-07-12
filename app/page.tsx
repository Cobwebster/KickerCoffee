import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Coffee, Wrench, Leaf, Calculator } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { SITE, BREW_GUIDES, BEAN_ARTICLES, SETUPS } from '@/lib/content'

const pillars = [
  {
    href: '/brewing-guides',
    title: 'Brewing Guides',
    description: 'Step-by-step recipes with exact ratios, grind sizes, and timings for every method.',
    icon: Coffee,
  },
  {
    href: '/gear',
    title: 'Gear & Setups',
    description: 'Honest reviews and curated kits — from a $200 starter to a pro espresso bar.',
    icon: Wrench,
  },
  {
    href: '/coffee-beans',
    title: 'Beans & Roasts',
    description: 'Understand origins, roast levels, and how to keep your beans tasting fresh.',
    icon: Leaf,
  },
  {
    href: '/tools',
    title: 'Calculators',
    description: 'Free coffee-to-water ratio calculator and a guided brew timer.',
    icon: Calculator,
  },
]

export default function HomePage() {
  const featured = BREW_GUIDES.slice(0, 3)

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  }

  return (
    <main>
      <JsonLd data={websiteSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              For rookies and coffee experts alike
            </span>
            <h1 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              Brew better coffee, every single morning.
            </h1>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              {SITE.tagline} Tested brewing guides, honest gear reviews, and free calculators to
              dial in your perfect cup.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/brewing-guides"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start brewing
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Try the ratio calculator
              </Link>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/home-hero.png"
              alt="Pour over coffee being brewed with a gooseneck kettle over a glass carafe"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="sr-only">
          Explore KickerCoffee
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <p.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Explore
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured guides */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                Popular brewing guides
              </h2>
              <p className="mt-2 text-muted-foreground">The recipes people search for most.</p>
            </div>
            <Link
              href="/brewing-guides"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent sm:inline-flex"
            >
              All guides
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((guide) => (
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
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {guide.method}
                  </span>
                  <h3 className="mt-2 text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {guide.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education + setups split */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Learn your beans
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything a rookie needs to shop and taste with confidence.
          </p>
          <ul className="mt-6 flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
            {BEAN_ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/coffee-beans/${a.slug}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-secondary"
                >
                  <span>
                    <span className="block font-medium text-foreground">{a.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{a.excerpt}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Recommended setups
          </h2>
          <p className="mt-2 text-muted-foreground">
            Curated kits for every budget and skill level.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            {SETUPS.map((s) => (
              <Link
                key={s.slug}
                href={`/gear/setups/${s.slug}`}
                className="group flex gap-4 overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
                  <Image src={s.image} alt={s.title} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {s.budget} · {s.level}
                  </span>
                  <span className="mt-1 text-pretty font-serif font-semibold leading-snug text-foreground">
                    {s.title}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">{s.excerpt}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center">
          <Calculator className="size-8" aria-hidden="true" />
          <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight">
            Never guess your ratio again
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-primary-foreground/80">
            Use our free coffee-to-water ratio calculator and guided brew timer to nail your recipe
            every time.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Open the calculators
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
