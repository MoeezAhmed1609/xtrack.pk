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

module.exports = nextConfig
