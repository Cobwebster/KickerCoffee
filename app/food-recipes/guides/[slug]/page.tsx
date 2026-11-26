import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Coffee } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { QuickAnswer } from '@/components/quick-answer'
import { SITE } from '@/lib/site'
import { FOOD_GUIDES, getFoodGuide } from '@/lib/food-guides'
import { getFoodRecipe } from '@/lib/food-recipes'

export function generateStaticParams() {
  return FOOD_GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getFoodGuide(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: `/food-recipes/guides/${guide.slug}` },
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: 'article',
      url: `${SITE.url}/food-recipes/guides/${guide.slug}`,
      images: [{ url: guide.image, alt: guide.title }],
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

export default async function FoodGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getFoodGuide(slug)
  if (!guide) notFound()

  const featured = guide.featuredRecipes
    .map((f) => {
      const recipe = getFoodRecipe(f.slug)
      if (!recipe) return null
      return { ...f, recipe }
    })
    .filter(Boolean) as {
    slug: string
    role: string
    coffeeNote: string
    recipe: NonNullable<ReturnType<typeof getFoodRecipe>>
  }[]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    image: `${SITE.url}${guide.image}`,
    dateModified: guide.updated,
    author: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: `${SITE.url}/food-recipes/guides/${guide.slug}`,
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
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best snacks with coffee — recipes',
    itemListElement: featured.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/food-recipes/${f.recipe.slug}`,
      name: f.recipe.name,
    })),
  }

  // Split body: show recipe cards after first heading section (~after intro list)
  const firstHeadingIdx = guide.body.findIndex((b) => b.type === 'heading')
  const secondHeadingIdx = guide.body.findIndex(
    (b, i) => i > firstHeadingIdx && b.type === 'heading',
  )
  const bodyBeforeCards = guide.body.slice(0, secondHeadingIdx > 0 ? secondHeadingIdx : undefined)
  const bodyAfterCards = secondHeadingIdx > 0 ? guide.body.slice(secondHeadingIdx) : []

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[articleSchema, faqSchema, itemListSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Food Recipes', href: '/food-recipes' },
          { label: guide.topic, href: `/food-recipes/guides/${guide.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {guide.topic}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {guide.title}
          </h1>
          <QuickAnswer>{guide.quickAnswer}</QuickAnswer>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" />
              {guide.readTime} read
            </span>
            <span>
              Updated{' '}
              {new Date(guide.updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
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

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{guide.intro}</p>

        <div className="mt-8">
          <ContentBlocks blocks={bodyBeforeCards} />
        </div>

        <section className="mt-10" aria-labelledby="snack-recipes-heading">
          <h2
            id="snack-recipes-heading"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            Snack recipes to cook (then brew)
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Every card opens a full food recipe with ingredients, steps, nutrition, and a coffee
            pairing note on the page.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((f) => (
              <Link
                key={f.slug}
                href={`/food-recipes/${f.recipe.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:border-accent hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.recipe.image}
                    alt={`${f.recipe.name} recipe`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {f.role}
                  </span>
                  <span className="mt-1 font-serif text-lg font-semibold text-foreground">
                    {f.recipe.name}
                  </span>
                  <span className="mt-2 inline-flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                    <Coffee className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                    {f.coffeeNote}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Open recipe
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {bodyAfterCards.length > 0 && (
          <div className="mt-10">
            <ContentBlocks blocks={bodyAfterCards} />
          </div>
        )}

        <FaqSection faqs={guide.faqs} />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/food-recipes"
            className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground"
          >
            All food recipes
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/tools/coffee-ratio-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:border-accent"
          >
            Coffee ratio calculator
          </Link>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:border-accent hover:text-foreground"
          >
            Coffee drink recipes
          </Link>
        </div>
      </article>
    </main>
  )
}
