import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.reactbd.com',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.in',
      },
    ],
  },
};

export default nextConfig;
