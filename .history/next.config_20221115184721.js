/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rare-gallery.com',
        port: '',
        pathname: '/thumbnail/**',
      },
    ],
  },
}
