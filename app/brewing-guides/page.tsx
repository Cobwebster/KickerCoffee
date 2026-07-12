import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Gauge } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { BREW_GUIDES, SITE } from '@/lib/content'

const faqs = [
  {
    question: 'What is the easiest coffee brewing method for beginners?',
    answer:
      'French press and AeroPress are usually the easiest places to start because they are forgiving and do not require precise pouring technique. Pour over is excellent too, but it rewards more control over grind, timing, and water flow.',
  },
  {
    question: 'What coffee-to-water ratio should I use for most brew methods?',
    answer:
      'A 1:16 ratio is the best all-purpose starting point for most filter methods. That means 1 gram of coffee for every 16 grams of water. French press often tastes better slightly stronger at around 1:15, while espresso uses a completely different dose-to-yield ratio.',
  },
  {
    question: 'Which coffee brewing method makes the strongest coffee?',
    answer:
      'Espresso is the most concentrated coffee by volume, but not always the highest in total caffeine per serving. Cold brew concentrate is also extremely strong until diluted. For regular mugs, French press and AeroPress tend to taste fuller and stronger than pour over because they emphasize body.',
  },
  {
    question: 'Why does my homemade coffee taste sour or bitter?',
    answer:
      'Sour coffee usually means under-extraction, often from too coarse a grind, too little brew time, or water that is too cool. Bitter coffee usually means over-extraction from too fine a grind, too much time, or excessive heat. Grind size is the first variable to adjust in most cases.',
  },
]

export const metadata: Metadata = {
  title: 'Coffee Brewing Guides — Pour Over, French Press, Espresso & More',
  description:
    'Step-by-step coffee brewing guides for every method: pour over, French press, AeroPress, espresso, cold brew, and Moka pot. Exact ratios, grind sizes, and timings.',
  alternates: { canonical: '/brewing-guides' },
  openGraph: {
    title: 'Coffee Brewing Guides — Pour Over, French Press, Espresso & More',
    description:
      'Step-by-step coffee brewing guides for every method: pour over, French press, AeroPress, espresso, cold brew, and Moka pot. Exact ratios, grind sizes, and timings.',
    type: 'website',
    url: `${SITE.url}/brewing-guides`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Brewing Guides — Pour Over, French Press, Espresso & More',
    description:
      'Step-by-step coffee brewing guides for every method: pour over, French press, AeroPress, espresso, cold brew, and Moka pot. Exact ratios, grind sizes, and timings.',
  },
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

      <section className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How to choose the right brew method
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The best brewing method is not the one coffee forums call the most "correct". It is the one that matches how you actually drink coffee, how much time you have, and how much control you want over the cup. Pour over is ideal if you want clarity and like adjusting technique. French press is better when you want a rich, forgiving brew with minimal fuss. AeroPress travels well and handles a wide range of beans gracefully. Espresso demands the most from your grinder and workflow, but it unlocks the deepest control over strength and texture.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            If you are still learning, start with one method and repeat it enough times to understand how grind, ratio, and water temperature affect flavor. Jumping between brewers every morning makes it harder to identify what changed. The guides above are written to help you build that repeatable baseline first, then branch out once your palate and routine are more stable.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            What improves coffee fastest
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            <li>Buy whole beans and grind them fresh. Bean freshness and grind quality matter more than brewer price.</li>
            <li>Use a scale for coffee and water so your best cup is easy to repeat.</li>
            <li>Change one variable at a time when troubleshooting. Otherwise you never learn what fixed the cup.</li>
            <li>Use filtered water. Even perfect technique struggles with poor-tasting brew water.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          What makes these guides useful
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Each guide is built around brew ratios, realistic grind targets, timing windows, and troubleshooting advice rather than vague instructions like "brew to taste." That matters because most home brewers do not need more inspiration; they need a dependable starting point that explains why the cup went sour, bitter, weak, or muddy. Google tends to treat thin recipe pages as low-value when they repeat the same template with only a few numbers changed. These brewing guides now carry more method-specific explanation, flavor context, and maintenance advice so each page solves a distinct user problem instead of only restating a recipe.
        </p>
      </section>

      <FaqSection faqs={faqs} />
    </main>
  )
}
