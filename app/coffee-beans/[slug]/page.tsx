import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContentBlocks } from '@/components/content-blocks'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { BEAN_ARTICLES, SITE, getBeanArticle } from '@/lib/content'

export function generateStaticParams() {
  return BEAN_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getBeanArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/coffee-beans/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      url: `${SITE.url}/coffee-beans/${article.slug}`,
      images: [{ url: article.image }],
      modifiedTime: article.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
      images: [article.image],
    },
  }
}

export default async function BeanArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getBeanArticle(slug)
  if (!article) notFound()

  const related = BEAN_ARTICLES.filter((a) => a.slug !== article.slug)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: article.image,
    dateModified: article.updated,
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[articleSchema, faqSchema]} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Beans & Roasts', href: '/coffee-beans' },
          { label: article.topic, href: `/coffee-beans/${article.slug}` },
        ]}
      />

      <article>
        <header>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {article.topic}
          </span>
          <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" />
              {article.readTime} read
            </span>
            <span>
              Updated{' '}
              {new Date(article.updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-foreground">{article.intro}</p>

        <div className="mt-8">
          <ContentBlocks blocks={article.body} />
        </div>

        <FaqSection faqs={article.faqs} />
      </article>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-serif text-2xl font-semibold text-foreground">
          Keep learning
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {related.map((a) => (
            <Link
              key={a.slug}
              href={`/coffee-beans/${a.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                  {a.topic}
                </span>
                <span className="mt-1 block text-sm font-medium leading-snug text-foreground">
                  {a.title}
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
