/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'refactor.albrrak773.com',
        pathname: '/**',
      }
    ]
  }
}

export default nextConfig
