import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/agent-skill-bundle-site",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
