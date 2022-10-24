/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() { 
    return [ 
     //接口请求 前缀带上/api-text/
      { source: '/api/:path*', destination: `http://127.0.0.1:4000/api/:path*` }, 
      { source: '/static/:path*', destination: `http://127.0.0.1:4000/static/:path*` }, 
    ]
  },
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
}

module.exports = nextConfig
