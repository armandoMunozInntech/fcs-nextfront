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
};

export default nextConfig;
