import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i9.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
