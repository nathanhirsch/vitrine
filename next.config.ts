import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/hello-heart",
        destination: "/hello-heart/index.html",
      },
      {
        source: "/the-drop",
        destination: "/the-drop/index.html",
      },
    ];
  },
};

export default nextConfig;
