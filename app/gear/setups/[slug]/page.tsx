import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { AffiliatePicks } from '@/components/affiliate-picks'
import { QuickAnswer } from '@/components/quick-answer'
import { productKey, productUrl } from '@/lib/amazon'
import { BEAN_PICKS, SETUPS, SITE, getSetup } from '@/lib/content'

export function generateStaticParams() {
  return SETUPS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const setup = getSetup(slug)
  if (!setup) return {}
  return {
    title: setup.title,
    description: setup.metaDescription,
    alternates: { canonical: `/gear/setups/${setup.slug}` },
    keywords: [
      setup.level.toLowerCase(),
      'home coffee setup',
      'coffee gear kit',
      ...setup.items.map((i) => i.name),
    ],
    openGraph: {
      title: setup.title,
      description: setup.metaDescription,
      type: 'article',
      url: `${SITE.url}/gear/setups/${setup.slug}`,
      images: [{ url: setup.image, alt: setup.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: setup.title,
      description: setup.metaDescription,
      images: [setup.image],
    },
  }
}

export default async function SetupPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const setup = getSetup(slug)
  if (!setup) notFound()

  const shoppable = setup.items.filter((i) => i.asin || i.affiliateUrl)
  const isEspresso = setup.slug.includes('espresso')

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Gear & Setups', item: `${SITE.url}/gear` },
      {
        '@type': 'ListItem',
        position: 3,
        name: setup.title,
        item: `${SITE.url}/gear/setups/${setup.slug}`,
      },
    ],
  }
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: setup.title,
    description: setup.metaDescription,
    image: `${SITE.url}${setup.image}`,
    dateModified: setup.updated,
    datePublished: setup.updated,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/gear/setups/${setup.slug}`,
  }
  const kitList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: setup.title,
    itemListElement: shoppable.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: productUrl(item),
      description: item.why,
    })),
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: setup.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[breadcrumb, schema, kitList, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gear & Setups', href: '/gear' },
          { label: setup.level, href: `/gear/setups/${setup.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {setup.budget} · {setup.level}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {setup.title}
          </h1>
          {setup.quickAnswer && <QuickAnswer>{setup.quickAnswer}</QuickAnswer>}
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {setup.excerpt}
          </p>
          {setup.updated && (
            <p className="mt-2 text-xs text-muted-foreground">Updated {setup.updated}</p>
          )}
        </header>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={setup.image}
            alt={setup.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{setup.intro}</p>

        {shoppable.length > 0 && (
          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/10 p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">Shop this setup</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Open each Amazon link for live pricing. As an Amazon Associate we may earn from
              qualifying purchases.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {shoppable.map((item) => (
                <a
                  key={productKey(item)}
                  href={productUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent"
                >
                  {item.name.split('(')[0].trim()}
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        )}

        <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground">
          {"What's in the kit"}
        </h2>
        <ol className="mt-6 flex flex-col gap-4">
          {setup.items.map((item, i) => (
            <li
              key={item.name}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-start"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="flex flex-wrap items-center gap-2 font-serif text-lg font-semibold text-foreground">
                  <Check className="size-4 text-accent" aria-hidden="true" />
                  {item.name}
                  {item.priceHint && (
                    <span className="text-xs font-medium text-muted-foreground">{item.priceHint}</span>
                  )}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.why}</p>
                {(item.asin || item.affiliateUrl) && (
                  <a
                    href={productUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                  >
                    Check on Amazon
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        {setup.body && setup.body.length > 0 && (
          <div className="mt-10">
            <ContentBlocks blocks={setup.body} />
          </div>
        )}

        <FaqSection faqs={setup.faqs} />

        <AffiliatePicks
          heading={isEspresso ? 'Espresso beans to dial with this kit' : 'Beans for this beginner kit'}
          intro="Gear without fresh beans is just counter clutter. These Amazon bags are easy starters — including a bold decaf for evening cups."
          products={
            isEspresso
              ? BEAN_PICKS.filter(
                  (b) => b.roast === 'Espresso' || b.roast === 'Dark' || b.roast === 'Decaf',
                ).slice(0, 4)
              : BEAN_PICKS.filter(
                  (b) => b.roast === 'Medium' || b.roast === 'Dark' || b.roast === 'Decaf',
                ).slice(0, 4)
          }
        />
      </article>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/gear/best-burr-coffee-grinders"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          Grinder buying guide
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/coffee-beans"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          Bean education
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/coffee-beans/best-decaf-coffee"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          Best decaf guide
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/gear"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          <ArrowRight className="size-4 rotate-180" />
          All gear & setups
        </Link>
      </div>
    </main>
  )
}
