import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";
// import { baseURL } from "./lib/utils";

const IS_ANALYZE = process.env.ANALYZE === "true";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: IS_ANALYZE,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "127.0.0.1",
      //   port: "8000",
      //   pathname: "/**",
      // },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // new URL(`${baseURL}/storage/**`),
    ],
  },
  experimental: {
    optimizePackageImports: ["zod", "lucide-react", "react-hook-form"],
  },
};

export default withBundleAnalyzer(nextConfig);
