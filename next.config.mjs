import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Nested repo path (KickerCoffee/KickerCoffee) confuses Turbopack's
  // lockfile-based root detection — pin it to this project directory.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Apex → www (belt-and-suspenders with middleware; needs matching Vercel domain too)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kickercoffee.com' }],
        destination: 'https://www.kickercoffee.com/:path*',
        permanent: true,
      },
      // Bogus SearchAction template URL Google still crawls
      {
        source: '/brewing-guides',
        has: [{ type: 'query', key: 'q', value: '{search_term_string}' }],
        destination: 'https://www.kickercoffee.com/brewing-guides',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/favicon-32.png',
      },
    ]
  },
}

export default nextConfig
