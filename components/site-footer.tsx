import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { NAV, SITE } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
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
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  )
}
