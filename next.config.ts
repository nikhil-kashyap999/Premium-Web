import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/icon/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkdnmlm0k/image/upload/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
