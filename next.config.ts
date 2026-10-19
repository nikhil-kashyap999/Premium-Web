import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["10.84.115.7"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
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
