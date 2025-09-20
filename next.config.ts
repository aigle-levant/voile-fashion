import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // to prevent nextjs error if using gallery
    domains: ["jglngbvclcdemvgrryvj.supabase.co"],
  },
};

export default nextConfig;
