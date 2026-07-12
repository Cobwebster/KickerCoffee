import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, Gauge, Scale, Coffee, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { BREW_GUIDES, SITE, getBrewGuide } from '@/lib/content'

export function generateStaticParams() {
  return BREW_GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getBrewGuide(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: `/brewing-guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: 'article',
      url: `${SITE.url}/brewing-guides/${guide.slug}`,
      images: [{ url: guide.image }],
      modifiedTime: guide.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.metaDescription,
      images: [guide.image],
    },
  }
}

export default async function BrewGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getBrewGuide(slug)
  if (!guide) notFound()

  const related = BREW_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3)

  const steps = guide.body.find((b) => b.type === 'steps')
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.metaDescription,
    totalTime: 'PT4M',
    supply: [{ '@type': 'HowToSupply', name: `${guide.method} coffee` }],
    step:
      steps?.type === 'steps'
        ? steps.items.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text,
          }))
        : [],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const specs = [
    { label: 'Brew time', value: guide.brewTime, icon: Clock },
    { label: 'Ratio', value: guide.ratio, icon: Scale },
    { label: 'Grind', value: guide.grind, icon: Coffee },
    { label: 'Difficulty', value: guide.difficulty, icon: Gauge },
  ]

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[howToSchema, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Brewing Guides', href: '/brewing-guides' },
          { label: guide.method, href: `/brewing-guides/${guide.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {guide.method}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {guide.excerpt}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated{' '}
            {new Date(guide.updated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {/* Spec card */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {specs.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-card p-4">
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <s.icon className="size-3.5 text-accent" aria-hidden="true" />
                {s.label}
              </dt>
              <dd className="font-serif text-base font-semibold text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{guide.intro}</p>

        {guide.slug === 'french-press-coffee-ratio-and-method' && (
          <Link
            href="/tools/french-press-calculator"
            className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Free tool
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                French Press Coffee Ratio Calculator — get exact grams for your press size
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        )}

        <div className="mt-8">
          <ContentBlocks blocks={guide.body} />
        </div>

        <FaqSection faqs={guide.faqs} />
      </article>

      {/* Related */}
      <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-serif text-2xl font-semibold text-foreground">
          More brewing guides
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((g) => (
            <Link
              key={g.slug}
              href={`/brewing-guides/${g.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                  {g.method}
                </span>
                <span className="mt-1 block text-sm font-medium leading-snug text-foreground">
                  {g.title}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-accent" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
