'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/components/link'

const STORAGE_KEY = 'kc-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore private mode write failures */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="min-w-0 flex-1">
          <p
            id="cookie-banner-title"
            className="font-serif text-base font-semibold text-foreground"
          >
            Cookies &amp; analytics
          </p>
          <p
            id="cookie-banner-desc"
            className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground"
          >
            We use cookies and similar tech for site analytics and affiliate links. By clicking
            Accept, you agree to our{' '}
            <Link href="/cookie-policy" className="font-medium text-accent underline-offset-2 hover:underline">
              cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/cookie-policy"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
