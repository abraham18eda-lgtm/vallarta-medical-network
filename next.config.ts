import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // locales con carpeta [locale]
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  
};

export default nextConfig;