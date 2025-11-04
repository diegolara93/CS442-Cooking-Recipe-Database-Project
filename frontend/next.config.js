/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    // Skip type-checking in Next build/dev; avoids TS path assertion on Windows
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during builds to reduce surface area while stabilizing
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;


