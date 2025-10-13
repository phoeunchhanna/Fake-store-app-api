import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Add valid experimental options here if needed
  },
};

module.exports = {
  images: {
    domains: ['fakestoreapi.com', 'fakestoreapi.reactbd.com', 'fakestoreapi.in'],
  },
};

export default nextConfig;
