import NextLink from 'next/link'
import type { ComponentProps } from 'react'

/**
 * App-wide Link with prefetch disabled by default.
 * Pass prefetch={true} only when you explicitly want hover/viewport prefetching.
 */
export function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />
}
