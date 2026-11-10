import { ExternalLink } from 'lucide-react'
import type { AffiliateProduct } from '@/lib/amazon'
import { productKey, productUrl } from '@/lib/amazon'

export function AffiliatePicks({
  heading = 'Recommended picks',
  products,
  disclaimer = true,
  intro,
}: {
  heading?: string
  products: AffiliateProduct[]
  disclaimer?: boolean
  intro?: string
}) {
  if (!products.length) return null

  return (
    <section className="mt-10" aria-labelledby="affiliate-picks-heading">
      <h2
        id="affiliate-picks-heading"
        className="font-serif text-2xl font-semibold tracking-tight text-foreground"
      >
        {heading}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {intro ??
          'Current Amazon listings we point people to. Prices move — open the link for live stock and deals.'}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {products.map((p) => (
          <li key={productKey(p)}>
            <a
              href={productUrl(p)}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                    {p.tier}
                  </span>
                  {p.roast && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {p.roast === 'Decaf' ? 'Decaf' : `${p.roast} roast`}
                    </span>
                  )}
                  {p.priceHint && (
                    <span className="text-xs text-muted-foreground">{p.priceHint}</span>
                  )}
                </div>
                <p className="mt-1.5 font-serif text-lg font-semibold text-foreground group-hover:text-accent">
                  {p.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.why}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-accent-foreground sm:self-center">
                Check on Amazon
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {disclaimer && (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          As an Amazon Associate, KickerCoffee may earn from qualifying purchases. That never changes
          which products we recommend.
        </p>
      )}
    </section>
  )
}
