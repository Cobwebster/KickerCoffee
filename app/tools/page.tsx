import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Timer, Snowflake, Coffee, Zap, Ruler, Beaker } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { TOOLS, SITE, type ToolMeta } from '@/lib/content'

const faqs = [
  {
    question: 'What coffee calculator should I use first?',
    answer:
      'Start with the coffee-to-water ratio calculator. Ratio is the foundation of most brew methods, so getting the coffee dose and water amount right solves more problems than any other single tool.',
  },
  {
    question: 'What is the best coffee-to-water ratio?',
    answer:
      'Most home brewers do well at 1:15 to 1:17. Use 1:16 as an all-purpose start, 1:15 for French press or stronger drip, and the espresso calculator for 1:2 shots. Our method-specific calculators lock in the right defaults.',
  },
  {
    question: 'Are coffee brewing calculators actually accurate?',
    answer:
      'They are accurate for the math they solve, like brew ratio, dilution, or target yield. What they cannot do is choose your preferred taste for you. Use them as a reliable starting point, then adjust based on the cup in front of you.',
  },
  {
    question: 'Do I need a coffee scale to use these tools?',
    answer:
      'A scale makes the tools much more useful because the calculations are weight-based, but not every tool requires one. The measurement converter is there specifically to help when you are still working with tablespoons or scoops.',
  },
  {
    question: 'What grind size should I use for my brew method?',
    answer:
      'Use the grind size chart: fine for espresso, medium-fine for pour over, medium for drip, coarse for French press, and extra coarse for cold brew. If the cup tastes bitter, grind coarser; if it tastes sour, grind finer.',
  },
  {
    question: 'Can coffee tools fix bad coffee beans or a bad grinder?',
    answer:
      'No. Tools help you measure and troubleshoot, but they cannot rescue stale beans or extremely inconsistent grounds. They work best when paired with fresh coffee and at least a decent burr grinder.',
  },
]

export const metadata: Metadata = {
  title: 'Free Coffee Calculators & Brewing Tools',
  description:
    'Free coffee calculators and brewing tools: coffee-to-water ratio calculator, pour over brew timer, cold brew calculator, espresso ratio calculator, caffeine calculator, grind size chart, and more. No login required.',
  alternates: { canonical: '/tools' },
  keywords: [
    'coffee calculator',
    'coffee to water ratio calculator',
    'french press coffee ratio calculator',
    'pour over brew timer',
    'cold brew ratio calculator',
    'espresso dose calculator',
    'caffeine calculator coffee',
    'coffee grind size chart',
    'coffee measurement converter',
  ],
}

const ICONS: Record<ToolMeta['icon'], typeof Scale> = {
  Scale,
  Timer,
  Snowflake,
  Coffee,
  Zap,
  Ruler,
  Beaker,
}

const CATEGORIES: ToolMeta['category'][] = ['Calculator', 'Timer', 'Reference']

export default function ToolsPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: TOOLS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `${SITE.url}/tools/${t.slug}`,
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
          { label: 'Calculators & Tools', href: '/tools' },
        ]}
      />

      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Coffee Calculators & Tools
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Free, no-signup tools to dial in every cup — ratio calculators, a guided pour over timer,
          caffeine estimates, and handy reference charts. Bookmark the ones you use most.
        </p>
      </header>

      {/* SEO intro block */}
      <div className="mt-8 max-w-2xl space-y-3 text-pretty leading-relaxed text-muted-foreground">
        <p>
          Most coffee problems — cups that taste weak, sour, or bitter — come down to one of three
          things: the wrong ratio, the wrong grind, or the wrong timing. These tools solve all three
          with the math done for you. Whether you are dialing in your first pour over, scaling up a
          cold brew batch for the week, or trying to understand why your espresso is running sour,
          there is a calculator here that gets you from "off" to "dialed in" in one brew.
        </p>
        <p>
          Every tool works on any device, requires no account, and saves no data. Input your numbers,
          get your answer, brew your coffee. The interactive ratio calculator and guided brew timer
          are the two most used — start there if you are new. The grind size chart and measurement
          converter are handy references to keep open on your phone while you brew.
        </p>
      </div>

      {CATEGORIES.map((category) => {
        const tools = TOOLS.filter((t) => t.category === category)
        if (!tools.length) return null
        return (
          <section key={category} className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {category === 'Reference' ? 'Reference & Charts' : `${category}s`}
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => {
                const Icon = ICONS[tool.icon]
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                      {tool.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {tool.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-medium text-accent">Open tool →</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
      {/* Evergreen SEO editorial block */}
      <section className="mt-16 max-w-2xl" aria-labelledby="guide-heading">
        <h2
          id="guide-heading"
          className="font-serif text-2xl font-semibold tracking-tight text-foreground"
        >
          Which tool should you use?
        </h2>
        <div className="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">
              Starting with pour over or drip?
            </strong>{' '}
            Open the{' '}
            <a href="/tools/coffee-ratio-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
              coffee ratio calculator
            </a>{' '}
            first. It is the foundational tool — every other brew variable assumes you already have
            the right amount of coffee and water. Set a 1:16 ratio, calculate for the number of cups
            you want, and write that number down.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Brewing on a standard coffee maker?</strong>{' '}
            Use the{' '}
            <a href="/tools/drip-coffee-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
              drip coffee calculator
            </a>{' '}
            when you need quick answers for 4, 8, 10, or 12 cups. It handles the annoying part most people search for: the difference between coffee maker cups and full mugs.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Brewing pour over on a scale?</strong>{' '}
            Add the{' '}
            <a href="/tools/brew-timer" className="font-medium text-accent underline-offset-2 hover:underline">
              guided brew timer
            </a>{' '}
            to your routine. It walks you through bloom and pour stages with target weights and live
            prompts — no more counting seconds in your head while simultaneously trying to pour a
            steady spiral.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Pulling espresso shots?</strong>{' '}
            The{' '}
            <a href="/tools/espresso-ratio-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
              espresso ratio calculator
            </a>{' '}
            and the{' '}
            <a href="/tools/grind-size-chart" className="font-medium text-accent underline-offset-2 hover:underline">
              grind size chart
            </a>{' '}
            work together. Use the ratio calculator to set your target yield, then use the grind
            chart to understand which direction to adjust if the shot runs too fast or slow.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Making cold brew?</strong>{' '}
            The{' '}
            <a href="/tools/cold-brew-calculator" className="font-medium text-accent underline-offset-2 hover:underline">
              cold brew calculator
            </a>{' '}
            scales from a small mason jar all the way up to a full pitcher batch. Choose concentrate
            if you want to dilute to taste; choose ready-to-drink if you prefer to pour straight over
            ice.
          </p>
          <p>
            <strong className="font-semibold text-foreground">No scale yet?</strong>{' '}
            Use the{' '}
            <a href="/tools/coffee-measurement-converter" className="font-medium text-accent underline-offset-2 hover:underline">
              measurement converter
            </a>{' '}
            to turn gram-based recipes into tablespoons and scoops until you get one. It is not as
            precise, but it gets you close enough to enjoy a good cup while you wait for the scale to
            arrive.
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} />
    </main>
  )
}
