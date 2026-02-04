/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Fix for Cloudflare Pages build with multiple lockfiles in workspace
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
