import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Preferred public origin — matches SITE.url in lib/content.ts */
const CANONICAL_HOST = 'www.kickercoffee.com'
const APEX_HOSTS = new Set(['kickercoffee.com', 'www.kickercoffee.com'])

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') ?? ''
  const host = hostHeader.split(':')[0].toLowerCase()
  const proto = (
    request.headers.get('x-forwarded-proto') ??
    request.nextUrl.protocol.replace(':', '')
  ).toLowerCase()

  // Only enforce on the live domain — leave localhost / preview URLs alone.
  if (!APEX_HOSTS.has(host)) {
    return NextResponse.next()
  }

  const { pathname, searchParams } = request.nextUrl
  const params = new URLSearchParams(searchParams)

  // Old WebSite SearchAction template Google still crawls as a real URL.
  if (params.get('q') === '{search_term_string}') {
    params.delete('q')
  }

  const needsHostFix = host !== CANONICAL_HOST
  const needsHttps = proto === 'http'
  const search = params.toString()
  const needsQueryFix = search !== searchParams.toString()

  if (!needsHostFix && !needsHttps && !needsQueryFix) {
    return NextResponse.next()
  }

  const target = new URL(
    `${pathname}${search ? `?${search}` : ''}`,
    `https://${CANONICAL_HOST}`,
  )
  return NextResponse.redirect(target, 301)
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and static assets — only normalize document URLs.
     */
    '/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|txt|xml)$).*)',
  ],
}
