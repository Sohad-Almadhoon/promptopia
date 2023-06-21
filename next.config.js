/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  headers: [
    {
      key: 'Cache-Control',
      value: 'no-store',
    },
  ],
}

module.exports = nextConfig
