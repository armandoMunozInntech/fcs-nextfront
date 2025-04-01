import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "src/assets/images/**",
        search: "",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
