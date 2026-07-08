import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, Lightbulb } from 'lucide-react'
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
      </header>

      {/* Intro prose — above the widget so crawlers see it immediately */}
      {content && (
        <section className="mb-8" aria-labelledby="intro-heading">
          <h2
            id="intro-heading"
            className="font-serif text-xl font-semibold tracking-tight text-foreground"
          >
            What this tool does
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{content.intro}</p>
        </section>
      )}

      {/* Interactive widget — single client boundary */}
      <ToolWidget slug={tool.slug} />

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
