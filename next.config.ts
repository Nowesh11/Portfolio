import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],
  images: {
    domains: [],
  },
};

export default nextConfig;
