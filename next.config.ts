import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your Next.js configuration options here
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
};

export default nextConfig;
