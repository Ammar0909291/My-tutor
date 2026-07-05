/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  webpack: (config, { nextRuntime }) => {
    // Next.js always emits a full source map for the Edge runtime bundle
    // (src/middleware.ts) in production, regardless of any experimental
    // sourcemap flag. That map isn't needed to execute the middleware —
    // only the code is — but Vercel counts it toward the Edge Function
    // size limit (1 MB on Hobby), so it's what was pushing the deployed
    // bundle over the cap. Disabling it here only affects the edge
    // compilation; server/client source maps are unaffected.
    if (nextRuntime === "edge") {
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
