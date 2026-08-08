import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/agent-skill-bundle",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
