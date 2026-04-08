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
      },
      {
        protocol: 'https',
        hostname: 'pub-f5984f635d2f4f58ac4cef365a6e4ada.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-02b17ea2dc194ea9ac917c5e8f1caa7e.r2.dev',
        pathname: '/**',
      }
    ]
  }
}

export default nextConfig
