import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    styledComponents: true, // <- this enables SSR, better debug names, etc.
  },
};

export default nextConfig;
