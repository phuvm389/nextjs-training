/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
}

module.exports = nextConfig
