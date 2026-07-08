import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, Check, X, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { JsonLd } from '@/components/json-ld'
import { GEAR, getGearItem } from '@/lib/content'

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
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical: `/gear/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      type: 'article',
      images: [{ url: item.image }],
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

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.metaDescription,
    image: item.image,
    dateModified: item.updated,
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={reviewSchema} />
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
            {item.category}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {item.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
              {item.rating.toFixed(1)} / 5
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

        {/* Pros & cons */}
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

        {/* Affiliate CTA placeholder */}
        <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">Ready to buy?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We keep an up-to-date list of current recommendations and prices. Recommended picks and
            purchase links will appear here.
          </p>
          <span className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground opacity-70">
            View recommendations
            <ArrowRight className="size-4" />
          </span>
        </div>
      </article>

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
