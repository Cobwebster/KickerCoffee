import type { Metadata } from 'next'
import { Link } from '@/components/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, Gauge, Coffee, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { QuickAnswer } from '@/components/quick-answer'
import { SITE } from '@/lib/content'
import { RECIPES, getRecipe } from '@/lib/recipes'

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipe(slug)
  if (!recipe) return {}
  return {
    title: recipe.title,
    description: recipe.metaDescription,
    alternates: { canonical: `/recipes/${recipe.slug}` },
    openGraph: {
      title: recipe.title,
      description: recipe.metaDescription,
      type: 'article',
      url: `${SITE.url}/recipes/${recipe.slug}`,
      images: [{ url: recipe.image }],
      modifiedTime: recipe.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.metaDescription,
      images: [recipe.image],
    },
  }
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = getRecipe(slug)
  if (!recipe) notFound()

  const related = recipe.relatedSlugs
    .map((s) => RECIPES.find((r) => r.slug === s))
    .filter(Boolean) as typeof RECIPES

  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.metaDescription,
    image: `${SITE.url}${recipe.image}`,
    dateModified: recipe.updated,
    recipeYield: recipe.yield,
    totalTime: recipe.time.includes('15') ? 'PT15M' : 'PT10M',
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
    author: { '@type': 'Organization', name: SITE.name },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: recipe.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[recipeSchema, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Recipes', href: '/recipes' },
          { label: recipe.name, href: `/recipes/${recipe.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {recipe.category}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {recipe.excerpt}
          </p>
          <QuickAnswer>{recipe.quickAnswer}</QuickAnswer>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated{' '}
            {new Date(recipe.updated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {[
            { label: 'Time', value: recipe.time, icon: Clock },
            { label: 'Yield', value: recipe.yield, icon: Coffee },
            { label: 'Level', value: recipe.difficulty, icon: Gauge },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-card p-4">
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <s.icon className="size-3.5 text-accent" aria-hidden="true" />
                {s.label}
              </dt>
              <dd className="font-serif text-sm font-semibold text-foreground md:text-base">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{recipe.intro}</p>

        <section className="mt-10" aria-labelledby="ingredients-heading">
          <h2
            id="ingredients-heading"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            Ingredients
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {recipe.ingredients.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-pretty leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="steps-heading">
          <h2
            id="steps-heading"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            Method
          </h2>
          <ol className="mt-4 flex flex-col gap-5">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="leading-relaxed text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10">
          <ContentBlocks blocks={recipe.body} />
        </div>

        <FaqSection faqs={recipe.faqs} />
      </article>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-serif text-2xl font-semibold text-foreground">
          More recipes
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/recipes/${r.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                  {r.category}
                </span>
                <span className="mt-1 block text-sm font-medium leading-snug text-foreground">
                  {r.name}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-accent" />
            </Link>
          ))}
        </div>
        <Link
          href="/recipes"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          All recipes
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  )
}
