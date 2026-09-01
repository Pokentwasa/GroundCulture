/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The starter can pull the real Ground Culture brand imagery straight
    // from Wix on first deploy. Swap these for local /public/images files
    // before launch (see public/images/README.md).
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
