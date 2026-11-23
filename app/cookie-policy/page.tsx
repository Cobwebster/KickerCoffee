import type { Metadata } from 'next'
import { Link } from '@/components/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `How ${SITE.name} uses cookies and similar technologies for analytics, preferences, and affiliate links.`,
  alternates: { canonical: '/cookie-policy' },
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cookie Policy', href: '/cookie-policy' },
        ]}
      />

      <article>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight text-foreground">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: November 23, 2026</p>

        <div className="mt-8 space-y-8 text-pretty leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Overview</h2>
            <p className="mt-3">
              {SITE.name} ({SITE.domain}) uses cookies and similar technologies so the site works,
              so we can understand traffic, and so affiliate product links can attribute referrals.
              This page explains what that means in plain language.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground">What we use</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium text-foreground">Analytics</span> — Google Analytics
                helps us see which pages are used and how people find the site. That may set cookies
                or use local storage / similar identifiers.
              </li>
              <li>
                <span className="font-medium text-foreground">Affiliate links</span> — Product links
                (for example Amazon) may use cookies or redirect parameters so retailers know a
                purchase came from our referral.
              </li>
              <li>
                <span className="font-medium text-foreground">Preferences</span> — We store a small
                local preference when you accept this notice so the banner does not keep popping up.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Your choices</h2>
            <p className="mt-3">
              You can clear site data in your browser settings at any time, use private browsing, or
              block third-party cookies. Blocking analytics or affiliate cookies may limit what we
              can measure and may affect how referral links work. Browser cookie controls and
              extensions can also limit tracking.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Third parties</h2>
            <p className="mt-3">
              Analytics and affiliate partners process data under their own policies. Review Google
              Analytics and Amazon Associates documentation if you want details on those services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Contact</h2>
            <p className="mt-3">
              Questions about this policy? Reach us via the contact details listed on{' '}
              <Link href="/" className="font-medium text-accent hover:underline">
                {SITE.domain}
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
