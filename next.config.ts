import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a lockfile in a parent folder is never picked up.
  turbopack: { root: __dirname },
};

export default nextConfig;
