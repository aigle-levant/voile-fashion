import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jglngbvclcdemvgrryvj.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
        port: "",
        pathname: "/CRDImages/**",
      },
    ],
  },
};

export default nextConfig;
