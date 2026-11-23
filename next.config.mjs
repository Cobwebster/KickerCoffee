import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Serve public images as-is — skips Vercel Image Optimization bill entirely.
  images: {
    unoptimized: true,
  },
  // Nested repo path (KickerCoffee/KickerCoffee) confuses Turbopack's
  // lockfile-based root detection — pin it to this project directory.
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(ico|png|jpg|jpeg|gif|webp|svg|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Old short path → recipe-keyword URL
      {
        source: '/food',
        destination: '/food-recipes',
        permanent: true,
      },
      {
        source: '/food/:slug',
        destination: '/food-recipes/:slug',
        permanent: true,
      },
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
