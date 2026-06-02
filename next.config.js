/** @type {import('next').NextConfig} */
const nextConfig = {
  // Moved out of experimental in Next.js 14.1 — old key is ignored on Vercel
  serverExternalPackages: ["@prisma/client", "bcryptjs", "ioredis"],
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
