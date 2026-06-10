/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next.js 14.2 still uses the experimental key; top-level serverExternalPackages is 15+
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs", "ioredis"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

module.exports = nextConfig;
