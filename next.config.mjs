/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/favicon.ico',
      },
    ]
  },
}

export default nextConfig
