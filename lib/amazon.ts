/**
 * Clean Amazon product URLs for affiliate tagging.
 * Prefer Creators short links (`affiliateUrl`) when present — those already carry
 * your Associates / Creators attribution. Otherwise build /dp/{ASIN}?tag=...
 * Set NEXT_PUBLIC_AMAZON_TAG in .env.local when using ASIN-based links.
 */
export const AMAZON_AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG?.trim() || ''

export function amazonDpUrl(asin: string, opts?: { tag?: string }) {
  const clean = asin.replace(/[^A-Z0-9]/gi, '').toUpperCase()
  const tag = opts?.tag ?? AMAZON_AFFILIATE_TAG
  const base = `https://www.amazon.com/dp/${clean}`
  return tag ? `${base}?tag=${encodeURIComponent(tag)}` : base
}

export type AffiliateProduct = {
  name: string
  asin: string
  tier: 'Budget' | 'Best overall' | 'Premium' | 'Essential'
  why: string
  /** Rough street price for orientation — Amazon prices change constantly. */
  priceHint?: string
  /**
   * Amazon Creators / Associates short link (e.g. https://link.amazon/XXXX).
   * When set, this is used instead of building a /dp URL so your referral stays intact.
   */
  affiliateUrl?: string
  /** Optional roast / use-case label for bean picks. */
  roast?: 'Light' | 'Medium' | 'Dark' | 'Espresso' | 'Decaf'
}

export type AmazonLinkable = {
  asin?: string
  affiliateUrl?: string
}

export function productUrl(p: AmazonLinkable & { asin?: string }) {
  if (p.affiliateUrl?.trim()) return p.affiliateUrl.trim()
  if (p.asin) return amazonDpUrl(p.asin)
  return 'https://www.amazon.com'
}

export function productKey(p: { asin?: string; name?: string; affiliateUrl?: string }) {
  return p.asin || p.affiliateUrl || p.name || 'product'
}
