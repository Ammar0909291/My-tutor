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
  // Baseline security headers (production-readiness gap: none were set
  // before — Vercel does not add these by default). Deliberately NOT
  // shipping a Content-Security-Policy here: the app loads Monaco, Three.js/
  // WebGL, a sandboxed iframe for AI-generated visualizations, and Google
  // OAuth — a hand-authored CSP for that surface needs dedicated testing
  // per directive, not a guess baked into a production-readiness pass.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // microphone stays enabled for self — the lesson screen's voice
          // input (getUserMedia/MediaRecorder, src/components/learn/LessonScreen.tsx)
          // needs it; camera and geolocation are never used anywhere in the app.
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(self)" },
        ],
      },
    ];
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
