import { Link } from '@/components/link'
import { Coffee } from 'lucide-react'
import { NAV } from '@/lib/nav'
import { SITE } from '@/lib/site'

const OTHER_SITES = [
  {
    name: 'Theme Park Index',
    href: 'https://www.themeparkindex.com/',
    description: 'Wait times, parks, and trip planning.',
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Coffee className="size-4" aria-hidden="true" />
            </span>
            {SITE.name}
          </Link>
          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            {SITE.description}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Popular Pages</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link
                href="/brewing-guides/coffee-brewing-ratios-and-grind-size-chart"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Ratio & Grind Chart
              </Link>
            </li>
            <li>
              <Link
                href="/brewing-guides/how-to-make-pour-over-coffee"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Pour Over Coffee
              </Link>
            </li>
            <li>
              <Link
                href="/brewing-guides/how-to-pull-espresso-shot"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Espresso at Home
              </Link>
            </li>
            <li>
              <Link
                href="/recipes/iced-latte"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Iced Latte Recipe
              </Link>
            </li>
            <li>
              <Link
                href="/tools/drip-coffee-calculator"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Drip Coffee Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/coffee-beans/coffee-roast-levels-explained"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Roast Levels Explained
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Our other sites</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {OTHER_SITES.map((site) => (
              <li key={site.href}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.name}
                </a>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/80">
                  {site.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; 2026 {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  )
}
