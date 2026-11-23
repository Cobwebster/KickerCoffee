import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/components/link'
import { notFound } from 'next/navigation'
import { Clock, Gauge, Utensils, ArrowRight, Coffee } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { QuickAnswer } from '@/components/quick-answer'
import { SITE } from '@/lib/site'
import { FOOD_RECIPES, getFoodRecipe } from '@/lib/food-recipes'
import { buildFoodRecipeJsonLd } from '@/lib/food-recipe-schema'

export function generateStaticParams() {
  return FOOD_RECIPES.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const recipe = getFoodRecipe(slug)
  if (!recipe) return {}
  return {
    title: recipe.title,
    description: recipe.metaDescription,
    alternates: { canonical: `/food-recipes/${recipe.slug}` },
    keywords: recipe.keywords,
    openGraph: {
      title: recipe.title,
      description: recipe.metaDescription,
      type: 'article',
      url: `${SITE.url}/food-recipes/${recipe.slug}`,
      images: [{ url: recipe.image, alt: recipe.name }],
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

export default async function FoodRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const recipe = getFoodRecipe(slug)
  if (!recipe) notFound()

  const related = recipe.relatedSlugs
    .map((s) => FOOD_RECIPES.find((r) => r.slug === s))
    .filter(Boolean) as typeof FOOD_RECIPES

  const recipeSchema = buildFoodRecipeJsonLd(recipe)
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
          { label: 'Food Recipes', href: '/food-recipes' },
          { label: recipe.name, href: `/food-recipes/${recipe.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {recipe.category} recipe
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {recipe.excerpt}
          </p>
          <QuickAnswer>{recipe.quickAnswer}</QuickAnswer>
        </header>

        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-border sm:aspect-video">
          <Image
            src={recipe.image}
            alt={`${recipe.name} recipe — homemade photo`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {[
            { label: 'Time', value: recipe.time, icon: Clock },
            { label: 'Yield', value: recipe.yield, icon: Utensils },
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

        <aside className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
            <Coffee className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            <span>
              <span className="font-semibold">Coffee pairing: </span>
              {recipe.coffeePairing.drink}
            </span>
          </p>
        </aside>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{recipe.intro}</p>

        <section className="mt-10" aria-labelledby="nutrition-heading">
          <h2
            id="nutrition-heading"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            Nutrition
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Estimated per {recipe.nutrition.servingSize.toLowerCase()}. Values are approximate and
            change with brands and toppings.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Calories', value: `${recipe.nutrition.calories}` },
              { label: 'Fat', value: `${recipe.nutrition.fatContent} g` },
              { label: 'Carbs', value: `${recipe.nutrition.carbohydrateContent} g` },
              { label: 'Protein', value: `${recipe.nutrition.proteinContent} g` },
              ...(recipe.nutrition.sugarContent != null
                ? [{ label: 'Sugar', value: `${recipe.nutrition.sugarContent} g` }]
                : []),
              ...(recipe.nutrition.fiberContent != null
                ? [{ label: 'Fiber', value: `${recipe.nutrition.fiberContent} g` }]
                : []),
              ...(recipe.nutrition.sodiumContent != null
                ? [{ label: 'Sodium', value: `${recipe.nutrition.sodiumContent} mg` }]
                : []),
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-lg border border-border bg-card px-3 py-2.5"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="mt-0.5 font-serif text-lg font-semibold text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

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
              <li key={i} id={`step-${i + 1}`} className="flex scroll-mt-24 gap-4">
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

        <section
          className="mt-12 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8"
          aria-labelledby="coffee-pairing-heading"
        >
          <div className="flex items-center gap-2">
            <Coffee className="size-5 text-accent" aria-hidden="true" />
            <h2
              id="coffee-pairing-heading"
              className="font-serif text-2xl font-semibold tracking-tight text-foreground"
            >
              Coffee pairing
            </h2>
          </div>
          <p className="mt-4 text-pretty text-lg font-medium leading-relaxed text-foreground">
            {recipe.coffeePairing.drink}
          </p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {recipe.coffeePairing.why}
          </p>
          {recipe.coffeePairing.alsoTry && (
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Also try: </span>
              {recipe.coffeePairing.alsoTry}
            </p>
          )}
          <p className="mt-5">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent"
            >
              Coffee drink recipes
              <ArrowRight className="size-4" />
            </Link>
          </p>
        </section>

        <FaqSection faqs={recipe.faqs} />
      </article>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-serif text-2xl font-semibold text-foreground">
          More food recipes
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/food-recipes/${r.slug}`}
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
          href="/food-recipes"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          All food recipes
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  )
}
