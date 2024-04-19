/** @type {import('next').NextConfig} */
import path from 'path';
const proxy_host = process.env.PROXY_HOST || '127.0.0.1'
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      //接口请求 前缀带上/api-text/
      { source: '/api/:path*', destination: `http://${proxy_host}:8100/api/:path*` },
      { source: '/static/:path*', destination: `http://${proxy_host}:8100/static/:path*` },
    ]
  },
  webpack: config => {
    // config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
}

export default nextConfig
