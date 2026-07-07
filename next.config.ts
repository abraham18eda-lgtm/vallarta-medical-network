// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // locales con carpeta [locale]
//   reactStrictMode: true,
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
  
// };

// export default nextConfig;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default withNextIntl(nextConfig);