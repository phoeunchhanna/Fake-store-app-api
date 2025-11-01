import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
  experimental: {
    // Add valid experimental options here if needed
  },
};

export default nextConfig;
