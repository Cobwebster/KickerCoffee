import type { Metadata } from 'next'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react'
import { AnswerTables } from '@/components/answer-tables'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { ToolWidget } from '@/components/tools/tool-widget'
import { getTool, getToolContent, TOOLS, SITE } from '@/lib/content'

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}
  return {
    title: tool.title,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url: `${SITE.url}/tools/${tool.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.metaDescription,
      images: ['/images/home-hero.webp'],
    },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  const content = getToolContent(slug)
  const related = content
    ? (content.relatedSlugs
        .map((s) => TOOLS.find((t) => t.slug === s))
        .filter(Boolean) as typeof TOOLS)
    : TOOLS.filter((t) => t.slug !== tool.slug).slice(0, 3)

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.metaDescription,
    url: `${SITE.url}/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  const howToSchema = content
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use the ${tool.name}`,
        step: content.howToUse.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.step,
          text: s.detail,
        })),
      }
    : null

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />
      {howToSchema && <JsonLd data={howToSchema} />}

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculators & Tools', href: '/tools' },
          { label: tool.name, href: `/tools/${tool.slug}` },
        ]}
      />

      <header className="mb-6 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          {tool.category}
        </span>
        <h1 className="mt-2 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {tool.title}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{tool.excerpt}</p>
        {tool.slug === 'french-press-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              French press coffee ratio in <strong>grams per liter</strong>:{' '}
              <strong>67 g/L</strong> at <strong>1:15</strong> (≈17 g per 250 ml mug). Mild ≈63 g/L;
              strong ≈71 g/L. Size your press below.
            </p>
          </aside>
        )}
        {tool.slug === 'cold-brew-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              Cold brew concentrate ratio is <strong>1:8</strong>; ready-to-drink is about{' '}
              <strong>1:15</strong>. Steep coarse grounds 12–18 hours, then dilute concentrate ~1:1.
            </p>
          </aside>
        )}
        {tool.slug === 'caffeine-day-planner' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              To cut caffeine, <strong>log every drink</strong> (or custom mg) on the calendar, set a
              daily goal (~200 → 100 → 50 mg), and watch the <strong>7-day average</strong> fall —
              saved in your browser. Keep ~8–10 hours between last caffeine and bed.
            </p>
          </aside>
        )}
        {tool.slug === 'caffeine-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              ~95 mg per 8 oz drip. <strong>80 mg ≈ 0.8 cup</strong> · <strong>100 ≈ 1</strong> ·{' '}
              <strong>150 ≈ 1.6</strong> · <strong>190 ≈ 2</strong> · <strong>200 ≈ 2</strong> ·{' '}
              <strong>400 ≈ 4 cups</strong> (common daily guide). Use mg → cups below.
            </p>
          </aside>
        )}
        {tool.slug === 'drip-coffee-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              Coffee-maker “cups” are usually <strong>5 oz</strong>, not 8 oz mugs. For 12 cups start
              around <strong>106–113 g</strong> coffee (~1.8 L water) at a 1:16–1:17 drip ratio.
            </p>
          </aside>
        )}
        {tool.slug === 'coffee-measurement-converter' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              About <strong>5 g per level tablespoon</strong> of ground coffee, or ~10 g per standard
              2-tbsp scoop. Grams beat scoops — roast and grind change how densely coffee packs.
            </p>
          </aside>
        )}
        {tool.slug === 'coffee-ratio-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              Start at <strong>1:16</strong> for drip/pour over (~15–16 g per 250 ml mug). French
              press often prefers <strong>1:15</strong>. Espresso is a different scale (~1:2
              dose:yield).
            </p>
          </aside>
        )}
        {tool.slug === 'grind-size-chart' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              Coarse = French press / cold brew. Medium = drip. Medium-fine = pour over / AeroPress.
              Fine = espresso. Sour cup → grind finer; bitter → coarser.
            </p>
          </aside>
        )}
        {tool.slug === 'protein-coffee-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              Most homemade proffee protein comes from the scoop (~20–25 g) plus milk (~8 g per cup
              of dairy). Coffee adds caffeine, not protein.
            </p>
          </aside>
        )}
        {tool.slug === 'world-coffee-map' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              Coffee grows in the tropical <strong>coffee belt</strong>. Brazil grows the most;
              Vietnam is #2 (mostly Robusta); Ethiopia is where Arabica comes from. Filter by cup
              style, compare two origins, or search if the map is too small to tap.
            </p>
          </aside>
        )}
        {tool.slug === 'hydration-calculator' && (
          <aside className="mt-4 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
            <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">
              A typical adult target is about <strong>30–35 ml of fluid per kg</strong> of body
              weight, adjusted for height and a hot/sweaty day. Coffee usually counts. This is a
              planning estimate, not a medical hydration test.
            </p>
          </aside>
        )}
      </header>

      {/* Widget first — GA shows tool users bounce when prose blocks the calculator */}
      <ToolWidget slug={tool.slug} />

      {tool.slug === 'caffeine-day-planner' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools/caffeine-calculator"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related tool
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Caffeine calculator — stack drinks, then log them here
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/coffee-beans/coffee-and-anxiety"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Coffee and anxiety — when caffeine spikes nerves
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'caffeine-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools/caffeine-day-planner"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                New
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Caffeine tracker — calendar log, cut-down goals & weekly trends
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/tools/caffeine-half-life-calculator"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related tool
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Caffeine half-life — when will it leave your system?
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'french-press-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/brewing-guides/french-press-coffee-ratio-and-method"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Full guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                French press ratio grams per liter — 67 g/L chart & method
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/coffee-beans/coffee-roast-levels-explained"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Types of coffee roast — light vs medium vs dark
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'iced-coffee-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/recipes/iced-latte"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Iced latte recipe — ratio, shots & how to make one
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/brewing-guides/best-coffee-brewing-methods-compared"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Compare methods
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Cold brew vs flash iced vs espresso milk drinks
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'world-coffee-map' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/coffee-beans/coffee-bean-origins-guide"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                How coffee beans from different countries compare
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/coffee-beans/coffee-roast-levels-explained"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Types of coffee roast — before origin notes disappear
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'drip-coffee-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools/coffee-ratio-calculator"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related tool
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Coffee-to-water ratio calculator (any mug size)
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/brewing-guides/coffee-brewing-ratios-and-grind-size-chart"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Full chart
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Brewing ratios & grind sizes for every method
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'coffee-measurement-converter' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/tools/drip-coffee-calculator"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related tool
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Drip coffee calculator — 4 / 8 / 10 / 12 cups
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/tools/coffee-ratio-calculator"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Related tool
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Ratio calculator — lock 1:15 / 1:16 / 1:17
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'coffee-ratio-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/brewing-guides/french-press-coffee-ratio-and-method"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Full guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                French press coffee ratio (1:15) — method
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/brewing-guides/coffee-brewing-ratios-and-grind-size-chart"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Full chart
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                All-method ratio & grind size chart
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'grind-size-chart' && (
        <Link
          href="/brewing-guides/coffee-brewing-ratios-and-grind-size-chart"
          className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
              Full guide
            </span>
            <span className="mt-0.5 block text-sm font-medium text-foreground">
              Coffee brewing ratios & grind size chart — every method
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-accent" />
        </Link>
      )}

      {content && (
        <section className="mt-10" aria-labelledby="intro-heading">
          <h2
            id="intro-heading"
            className="font-serif text-xl font-semibold tracking-tight text-foreground"
          >
            What this tool does
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{content.intro}</p>
        </section>
      )}

      {tool.slug === 'french-press-calculator' && (
        <Link
          href="/brewing-guides/french-press-coffee-ratio-and-method"
          className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
              Full guide
            </span>
            <span className="mt-0.5 block text-sm font-medium text-foreground">
              French press coffee ratio method — grind, 4-minute steep, and cafetière technique
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-accent" />
        </Link>
      )}
      {tool.slug === 'protein-coffee-calculator' && (
        <Link
          href="/brewing-guides/how-to-make-protein-coffee"
          className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
              Full guide
            </span>
            <span className="mt-0.5 block text-sm font-medium text-foreground">
              How to make protein coffee — iced, hot, and no clumps
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-accent" />
        </Link>
      )}
      {tool.slug === 'hydration-calculator' && (
        <Link
          href="/coffee-beans/does-coffee-dehydrate-you"
          className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
              Related guide
            </span>
            <span className="mt-0.5 block text-sm font-medium text-foreground">
              Does coffee dehydrate you? Why your mug still counts as fluid
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-accent" />
        </Link>
      )}
      {tool.slug === 'cold-brew-calculator' && (
        <Link
          href="/brewing-guides/cold-brew-coffee-recipe"
          className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
              Full guide
            </span>
            <span className="mt-0.5 block text-sm font-medium text-foreground">
              Cold brew coffee ratio & overnight recipe — step by step
            </span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-accent" />
        </Link>
      )}
      {tool.slug === 'world-coffee-map' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/coffee-beans/coffee-bean-origins-guide"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Full guide
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Coffee bean origins guide — how terroir shapes the cup
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/recipes/vietnamese-iced-coffee"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Vietnamese iced coffee (cà phê sữa đá)
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'iced-coffee-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/recipes/iced-latte"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Iced latte — espresso, milk & ice ratio
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/recipes/brown-sugar-shaken-espresso"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Brown sugar shaken espresso at home
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'espresso-ratio-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/recipes/cappuccino"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Cappuccino recipe — foam & milk ratio
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/recipes/cortado"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Cortado vs flat white — how to make one
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}
      {tool.slug === 'coffee-calories-calculator' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/recipes/mocha"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Homemade mocha — control the chocolate
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
          <Link
            href="/recipes"
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                All recipes
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                Café drinks with measured ingredients
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        </div>
      )}

      {/* Static answer tables — crawlable even without JS interaction */}
      {content?.answerTables && content.answerTables.length > 0 && (
        <AnswerTables tables={content.answerTables} />
      )}

      {/* Optional hub sections (e.g. caffeine explainer) */}
      {content?.hubSections && content.hubSections.length > 0 && (
        <div className="mt-12 flex flex-col gap-8">
          {content.hubSections.map((section) => (
            <section key={section.heading} aria-labelledby={`hub-${section.heading}`}>
              <h2
                id={`hub-${section.heading}`}
                className="font-serif text-2xl font-semibold tracking-tight text-foreground"
              >
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-pretty leading-relaxed text-muted-foreground">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* How to use steps */}
      {content && (
        <section className="mt-12" aria-labelledby="how-to-heading">
          <h2
            id="how-to-heading"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            How to use this tool
          </h2>
          <ol className="mt-4 flex flex-col gap-5">
            {content.howToUse.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{s.step}</p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Pro tips */}
      {content && (
        <section
          className="mt-10 rounded-2xl border border-border bg-secondary/60 p-6"
          aria-labelledby="tips-heading"
        >
          <h2
            id="tips-heading"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground"
          >
            <Lightbulb className="size-5 text-accent" aria-hidden="true" />
            Pro tips
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {content.proTips.map((tip, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-muted-foreground">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Why it matters */}
      {content && (
        <section className="mt-10" aria-labelledby="why-heading">
          <h2
            id="why-heading"
            className="font-serif text-xl font-semibold tracking-tight text-foreground"
          >
            Why it matters
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {content.whyItMatters}
          </p>
        </section>
      )}

      {/* FAQ with JSON-LD */}
      <FaqSection faqs={tool.faqs} />

      {/* Related tools */}
      <section className="mt-14" aria-labelledby="related-heading">
        <h2
          id="related-heading"
          className="font-serif text-xl font-semibold text-foreground"
        >
          Related tools
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-shadow hover:shadow-md"
            >
              {t.name}
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                {t.category}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
