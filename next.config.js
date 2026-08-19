/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Next.js 14.2 still uses the experimental key; top-level serverExternalPackages is 15+
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs", "ioredis"],
    // P20 FIX: src/instrumentation.ts (the Knowledge Asset bootstrap) had never
    // run in production. In Next.js 14 the instrumentation hook is opt-in and
    // defaults to false (node_modules/next/dist/server/config-shared.js:136):
    //   · build/index.js:479-484 excludes instrumentation.ts from the build
    //     output entirely unless this flag is set, and
    //   · next-server.js:475 only calls register() when this flag is truthy.
    // So the file compiled, type-checked and unit-tested cleanly while being
    // dead code in every deployment — no error, no log, simply never invoked.
    // Every AssetIdentity row in production came from the manual seed script
    // instead, which is why authored assets sat in whatever state that script
    // last wrote. Stable (non-experimental) in Next.js 15+.
    instrumentationHook: true,
    // BUG-1 FIX: Next.js output-file tracing only follows static import()
    // statements — it never traces fs.readFileSync calls with computed paths.
    // Without this, Vercel serverless functions that call getKnowledgeGraph()
    // (which reads docs/{subject}/kg/graph.json at runtime) fail with ENOENT
    // in production → /api/curriculum returns 500 → English/Math/Physics/etc.
    // curriculum shows "No structured lesson plan for this subject yet."
    outputFileTracingIncludes: {
      // THE AUTHORED TEACHING KNOWLEDGE MUST SHIP, NOT JUST THE GRAPHS.
      //
      // This list was `['./docs/**/*.json']` — JSON only. The Knowledge Graphs
      // are JSON, so they shipped and worked. But every hand-authored teaching
      // file is MARKDOWN:
      //
      //   docs/curriculum/blueprints/*.md      (962 files)
      //   educational-brain/concepts/**/*.md   (424+ files)
      //
      // Neither matched, so neither was traced into the serverless bundle, so
      // `blueprintLoader`'s readFileSync calls hit ENOENT in production and
      // returned "not found" for EVERY concept. The consequence is not subtle:
      // the BLUEPRINT CONTEXT block, the KNOWN MISCONCEPTIONS list, the
      // never-confirm rule, opening scenarios, teaching sequences, tutor
      // actions and anti-analogies have never once reached a production prompt.
      // Locally they all load, which is why this survived so long.
      //
      // Measured, on a real learner turn:
      //   [affirm-guard-known] { conceptId: 'phys.meas.dimensions',
      //                          knownChars: 0 }
      // against 555 characters for the same concept in-process.
      //
      // Scoped to the two directories that are actually read at runtime rather
      // than a blanket `**/*.md`, so the function does not carry every README
      // and ADR in the repository.
      '/**': [
        './docs/**/*.json',
        './docs/curriculum/blueprints/**/*.md',
        './educational-brain/concepts/**/*.md',
      ],
    },
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
  webpack: (config, { nextRuntime, webpack }) => {
    // Next.js always emits a full source map for the Edge runtime bundle
    // (src/middleware.ts) in production, regardless of any experimental
    // sourcemap flag. That map isn't needed to execute the middleware —
    // only the code is — but Vercel counts it toward the Edge Function
    // size limit (1 MB on Hobby), so it's what was pushing the deployed
    // bundle over the cap. Disabling it here only affects the edge
    // compilation; server/client source maps are unaffected.
    if (nextRuntime === "edge") {
      config.devtool = false;

      // THE ASSET BOOTSTRAP MUST NOT BE COMPILED INTO THE EDGE BUNDLE.
      //
      // Next compiles src/instrumentation.ts for BOTH runtimes. Its first line
      // returns unless NEXT_RUNTIME === 'nodejs', but that is a RUNTIME guard
      // and the edge runtime has no code splitting — webpack inlines every
      // `await import(...)` the hook contains whether or not it can be
      // reached. Those imports are the authored seed corpora;
      // chemistrySeedAssets.ts alone is 1.37 MB of source.
      //
      // MEASURED: deploy dpl_7HZgvv4M failed with
      //   NOW_SANDBOX_WORKER_MAX_MIDDLEWARE_SIZE — "src/middleware" is 1.17 MB,
      //   plan limit 1 MB
      // and .next/server/edge-instrumentation.js gzipped to 1,124,399 bytes
      // carrying 372 chemistry concept ids. The same budget is what the
      // devtool line above already exists to protect.
      //
      // Substituting the module is what makes the exclusion structural rather
      // than a size that happens to fit today: the edge hook is honestly empty,
      // and the Node build still compiles src/instrumentation.ts unchanged, so
      // there is exactly one implementation and the bootstrap tests keep
      // reading the real one.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /[\\/]src[\\/]instrumentation\.ts$/,
          require("path").resolve(__dirname, "src/instrumentation.edge.ts"),
        ),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
