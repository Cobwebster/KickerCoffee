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
