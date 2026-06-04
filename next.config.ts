import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-hcmc02.higiocloud.vn',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
