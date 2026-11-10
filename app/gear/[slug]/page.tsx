import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { Star, Check, X, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { BEAN_PICKS, GEAR, SITE, getGearItem } from '@/lib/content'
import { productUrl } from '@/lib/amazon'
import { AffiliatePicks } from '@/components/affiliate-picks'
import { QuickAnswer } from '@/components/quick-answer'

export function generateStaticParams() {
  return GEAR.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getGearItem(slug)
  if (!item) return {}
  const keywords = [
    item.category.toLowerCase(),
    item.name.toLowerCase(),
    ...item.picks?.map((p) => p.name) ?? [],
    'amazon',
    '2026',
  ]
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical: `/gear/${item.slug}` },
    keywords,
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      type: 'article',
      url: `${SITE.url}/gear/${item.slug}`,
      images: [{ url: item.image, alt: item.title }],
      modifiedTime: item.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.metaDescription,
      images: [item.image],
    },
  }
}

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getGearItem(slug)
  if (!item) notFound()

  const relatedGear = GEAR.filter((g) => g.slug !== item.slug)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Gear & Setups', item: `${SITE.url}/gear` },
      {
        '@type': 'ListItem',
        position: 3,
        name: item.title,
        item: `${SITE.url}/gear/${item.slug}`,
      },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.metaDescription,
    image: `${SITE.url}${item.image}`,
    dateModified: item.updated,
    datePublished: item.updated,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/gear/${item.slug}`,
  }
  const productListSchema =
    item.picks && item.picks.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${item.name} Amazon picks`,
          itemListElement: item.picks.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: productUrl(p),
            description: p.why,
          })),
        }
      : null
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: item.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[breadcrumb, articleSchema, faqSchema, ...(productListSchema ? [productListSchema] : [])]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Gear & Setups', href: '/gear' },
          { label: item.category, href: `/gear/${item.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {item.category} · Updated {item.updated}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {item.title}
          </h1>
          {item.quickAnswer && <QuickAnswer>{item.quickAnswer}</QuickAnswer>}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
              {item.rating.toFixed(1)} / 5 editorial
            </span>
            <span>{item.priceRange}</span>
            <span>Best for: {item.bestFor}</span>
          </div>
        </header>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{item.intro}</p>

        {item.picks && item.picks.length > 0 && (
          <AffiliatePicks
            heading="Our Amazon picks"
            intro="Jump to a live listing, then read the buying advice below if you want the why."
            products={item.picks}
            disclaimer={false}
          />
        )}

        {item.slug === 'best-burr-coffee-grinders' && (
          <Link
            href="/brewing-guides/how-to-make-pour-over-coffee"
            className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                Pair with a recipe
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground">
                How to make pour over coffee — then dial grind on your new burr grinder
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-accent" />
          </Link>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-serif text-lg font-semibold text-foreground">What we like</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {item.pros.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-serif text-lg font-semibold text-foreground">Keep in mind</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {item.cons.map((c) => (
                <li key={c} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <ContentBlocks blocks={item.body} />
        </div>

        <FaqSection faqs={item.faqs} />

        {item.picks && item.picks.length > 0 && (
          <AffiliatePicks heading="Ready to buy — revisit the picks" products={item.picks} />
        )}

        <AffiliatePicks
          heading="Beans that make this gear worth it"
          intro="Fresh whole beans matter more than the next accessory. Medium for learning; espresso blends if you pull shots."
          products={
            item.slug.includes('espresso') || item.category === 'Espresso Machine'
              ? BEAN_PICKS.filter((b) => b.roast === 'Espresso' || b.roast === 'Dark').slice(0, 3)
              : BEAN_PICKS.slice(0, 3)
          }
        />
      </article>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="related-gear">
        <h2 id="related-gear" className="font-serif text-2xl font-semibold text-foreground">
          Related gear guides
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {relatedGear.map((g) => (
            <Link
              key={g.slug}
              href={`/gear/${g.slug}`}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {g.category}
              </span>
              <span className="mt-1 block text-sm font-medium text-foreground">{g.title}</span>
            </Link>
          ))}
          <Link
            href="/gear/setups/beginner-home-coffee-setup"
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">Setup</span>
            <span className="mt-1 block text-sm font-medium text-foreground">
              Beginner home coffee setup under $200
            </span>
          </Link>
        </div>
      </section>

      <div className="mt-10">
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
