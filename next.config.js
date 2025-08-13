/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cloudsmart.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudsmart.com',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*'
      }
    ]
  }
}

module.exports = nextConfig