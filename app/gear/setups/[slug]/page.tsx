import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { SETUPS, getSetup } from '@/lib/content'

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
    openGraph: {
      title: setup.title,
      description: setup.metaDescription,
      type: 'article',
      images: [{ url: setup.image }],
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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: setup.title,
    description: setup.metaDescription,
    image: setup.image,
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />
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
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {setup.excerpt}
          </p>
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

        <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground">
          {"What's in the kit"}
        </h2>
        <ol className="mt-6 flex flex-col gap-4">
          {setup.items.map((item, i) => (
            <li
              key={item.name}
              className="flex gap-4 rounded-xl border border-border bg-card p-5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                  <Check className="size-4 text-accent" aria-hidden="true" />
                  {item.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.why}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">Shop this setup</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Current product picks and purchase links for each item in this kit will appear here.
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
