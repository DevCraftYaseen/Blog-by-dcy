/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
}

export default nextConfig

export const config = {
  matcher: '/', // or ['/', '/blog/:path*'] if you want multiple pages
}
