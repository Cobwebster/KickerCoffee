'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Clock, Gauge } from 'lucide-react'
import { Link } from '@/components/link'
import type { Recipe } from '@/lib/recipes'

const ALL = 'All' as const

type CategoryFilter = typeof ALL | Recipe['category']

export function RecipeHubGrid({ recipes }: { recipes: Recipe[] }) {
  const categories = useMemo(() => {
    const set = new Set<Recipe['category']>()
    for (const r of recipes) set.add(r.category)
    return [ALL, ...Array.from(set)] as CategoryFilter[]
  }, [recipes])

  const [active, setActive] = useState<CategoryFilter>(ALL)

  const filtered = active === ALL ? recipes : recipes.filter((r) => r.category === active)

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter recipes by category">
        {categories.map((cat) => {
          const selected = active === cat
          const count =
            cat === ALL ? recipes.length : recipes.filter((r) => r.category === cat).length
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(cat)}
              className={
                selected
                  ? 'rounded-full border border-foreground bg-foreground px-3.5 py-1.5 text-sm font-medium text-background'
                  : 'rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground'
              }
            >
              {cat}
              <span className="ml-1.5 tabular-nums opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {filtered.length} recipe{filtered.length === 1 ? '' : 's'}
        {active !== ALL ? ` in ${active}` : ''}.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                {recipe.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
                {recipe.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {recipe.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {recipe.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Gauge className="size-3.5" aria-hidden="true" />
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
