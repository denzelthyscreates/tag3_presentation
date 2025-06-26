/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tag3_presentation',
  assetPrefix: '/tag3_presentation',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig