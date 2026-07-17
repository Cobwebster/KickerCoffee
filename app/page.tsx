import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Coffee, Wrench, Leaf, Calculator } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { SITE, BREW_GUIDES, BEAN_ARTICLES, SETUPS, TOOLS } from '@/lib/content'

export const metadata: Metadata = {
  title: `${SITE.name} — Coffee Brewing Guides, Ratios, Gear & Free Calculators`,
  description:
    'KickerCoffee helps you brew better coffee at home: French press and cold brew coffee ratios, pour over and AeroPress guides, roast education, gear picks, and free coffee-to-water calculators.',
  alternates: { canonical: '/' },
}

const pillars = [
  {
    href: '/brewing-guides',
    title: 'Brewing Guides',
    description:
      'Step-by-step recipes with exact coffee-to-water ratios, grind sizes, and timings for French press, cold brew, pour over, and more.',
    icon: Coffee,
  },
  {
    href: '/gear',
    title: 'Gear & Setups',
    description:
      'Honest reviews and curated kits — from a beginner home setup to a pro espresso bar, including burr grinders worth buying.',
    icon: Wrench,
  },
  {
    href: '/coffee-beans',
    title: 'Beans & Roasts',
    description:
      'Understand coffee roast levels, bean origins, and how to store coffee beans so every bag stays fresh longer.',
    icon: Leaf,
  },
  {
    href: '/tools',
    title: 'Calculators',
    description:
      'Free tools for coffee-to-water ratio, French press and cold brew math, caffeine intake, grind size, and more.',
    icon: Calculator,
  },
]

const popularTools = TOOLS.filter((t) =>
  [
    'french-press-calculator',
    'cold-brew-calculator',
    'coffee-ratio-calculator',
    'caffeine-calculator',
  ].includes(t.slug),
)

export default function HomePage() {
  const featured = BREW_GUIDES.filter((g) =>
    [
      'french-press-coffee-ratio-and-method',
      'cold-brew-coffee-recipe',
      'how-to-make-pour-over-coffee',
    ].includes(g.slug),
  )

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  }

  return (
    <main>
      <JsonLd data={[websiteSchema, orgSchema]} />

      {/* Hero — keep lean */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-serif text-sm font-semibold tracking-wide text-accent md:text-base">
              {SITE.name}
            </p>
            <h1 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
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
                href="/tools/coffee-ratio-calculator"
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
      <section
        className="border-y border-border bg-secondary/40"
        aria-labelledby="pillars-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2
            id="pillars-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-foreground"
          >
            Explore {SITE.name}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Four paths through the site — pick a guide if you want a recipe, a calculator if you
            want numbers, or gear and beans if you are still building your setup.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>
{/* About / what this site is — crawlable prose */}
<section className="mx-auto max-w-3xl px-4 py-16" aria-labelledby="about-heading">
        <h2
          id="about-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-foreground"
        >
          Everything you need to brew great coffee at home
        </h2>
        <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            {SITE.name} is a free coffee resource for home brewers — whether you are making your
            first French press or dialing in espresso. We focus on clear recipes, honest gear advice,
            and calculators that answer the questions people actually search for: coffee-to-water
            ratio, French press coffee ratio, cold brew concentrate ratio, grind size, and caffeine
            math.
          </p>
          <p>
            Most “bad coffee” at home is not bad beans — it is guesswork. The wrong dose, a grind that
            is too fine for French press, or a cold brew steep that runs too long will flatten a good
            bag. Our guides give you starting ratios (like 1:15 for French press / cafetière and 1:8
            for cold brew concentrate), then our tools let you scale those recipes to your press
            size, jar, or mug without doing the math by hand.
          </p>
          <p>
            Beyond recipes, you can learn{' '}
            <Link href="/coffee-beans/coffee-roast-levels-explained" className="font-medium text-foreground underline-offset-4 hover:underline">
              coffee roast levels
            </Link>
            , explore{' '}
            <Link href="/coffee-beans/coffee-bean-origins-guide" className="font-medium text-foreground underline-offset-4 hover:underline">
              coffee bean origins
            </Link>
            , compare{' '}
            <Link href="/gear/best-burr-coffee-grinders" className="font-medium text-foreground underline-offset-4 hover:underline">
              burr grinders
            </Link>
            , and use free tools for{' '}
            <Link href="/tools/french-press-calculator" className="font-medium text-foreground underline-offset-4 hover:underline">
              French press ratio
            </Link>
            ,{' '}
            <Link href="/tools/cold-brew-calculator" className="font-medium text-foreground underline-offset-4 hover:underline">
              cold brew ratio
            </Link>
            , and a{' '}
            <Link href="/tools/caffeine-calculator" className="font-medium text-foreground underline-offset-4 hover:underline">
              caffeine calculator
            </Link>
            .
          </p>
        </div>
      </section>
      {/* Popular tools */}
      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="tools-heading">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              id="tools-heading"
              className="font-serif text-3xl font-semibold tracking-tight text-foreground"
            >
              Free coffee calculators people use most
            </h2>
            <p className="mt-2 text-muted-foreground">
              Skip the guesswork. These tools answer the highest-demand brewing questions — from
              French press coffee ratio and cold brew concentrate math to caffeine by the milligram.
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent sm:inline-flex"
          >
            All tools
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {popularTools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
              >
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.excerpt}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Open calculator
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured guides */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                Popular brewing guides
              </h2>
              <p className="mt-2 text-muted-foreground">
                Start with the methods beginners search for most: French press technique, overnight
                cold brew, and a clean V60 pour over recipe — each with ratios, grind, and timing.
              </p>
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

      {/* Education + setups */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Learn your beans
          </h2>
          <p className="mt-2 text-muted-foreground">
            Roast level and origin shape flavor as much as your brew method. Read these next if you
            are shopping bags and want to know what “medium roast” or Ethiopian coffee actually
            means in the cup.
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
            Curated kits for every budget and skill level — so you upgrade the grinder before you
            overspend on a machine you do not need yet.
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

      {/* How we approach brewing */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            How we approach better coffee
          </h2>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              We keep recipes weight-based whenever possible. A French press coffee ratio of 1:15
              means 1 gram of coffee for every 15 grams of water — not a vague scoop count that
              changes with roast and grind. When you do not have a scale yet, our measurement
              converter translates grams to tablespoons and scoops so you can still get close.
            </p>
            <p>
              Grind size is the other big lever. Coarse for French press and cold brew, medium for
              drip, medium-fine for pour over, fine for espresso. If a cup tastes bitter, grind
              coarser; if it tastes sour and thin, grind finer. Our grind size chart and brew guides
              walk through that troubleshooting in plain language.
            </p>
            <p>
              No login, no paywall. Open a calculator, brew with a guide, and come back when you
              change beans or gear. Coffee gets better when the method is repeatable — that is the
              whole point of {SITE.name}.
            </p>
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
          <p className="max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
            Use our free coffee-to-water ratio calculator, French press and cold brew tools, caffeine
            calculator, and guided pour over timer to nail your recipe every time — on any batch
            size.
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
