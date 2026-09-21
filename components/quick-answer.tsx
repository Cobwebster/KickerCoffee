import type { ReactNode } from 'react'

/** Above-the-fold answer box for high-intent SERP queries (CTR + featured-snippet style). */
export function QuickAnswer({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-6 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
      <p className="mt-1.5 text-pretty text-base leading-relaxed text-foreground">{children}</p>
    </aside>
  )
}
