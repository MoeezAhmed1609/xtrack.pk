const { config } = require('dotenv')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: 5,
  webpack: (config) => {
    config.resolve.fallback = { fs : false};
    return config
  }
}
module.exports = {
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
 };

module.exports = nextConfig
