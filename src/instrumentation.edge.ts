/**
 * The EDGE build of the instrumentation hook. See next.config.js's webpack
 * hook, which substitutes this module for src/instrumentation.ts whenever
 * `nextRuntime === 'edge'`.
 *
 * WHY THIS FILE EXISTS — measured, not precautionary.
 *
 * Next.js compiles instrumentation.ts for BOTH runtimes. The real hook's first
 * line is `if (process.env.NEXT_RUNTIME !== 'nodejs') return`, so on the edge
 * it does nothing — but the edge runtime has no code splitting, so webpack
 * INLINES every `await import(...)` inside it into the edge bundle regardless
 * of reachability. The asset bootstrap dynamically imports the authored seed
 * corpora, and chemistrySeedAssets.ts alone is 1.37 MB of source.
 *
 * Deploy dpl_7HZgvv4M failed on exactly this:
 *   NOW_SANDBOX_WORKER_MAX_MIDDLEWARE_SIZE
 *   The Edge Function "src/middleware" size is 1.17 MB, plan limit is 1 MB.
 * `.next/server/edge-instrumentation.js` gzipped to 1,124,399 bytes and
 * contained 372 chemistry concept ids — teaching content shipped to an edge
 * function that can never read it. The early return could not prevent that:
 * it is a RUNTIME guard, and this is a BUILD-time inclusion.
 *
 * So the edge gets a hook that is honestly empty, and the Node build is
 * untouched — src/instrumentation.ts remains the single implementation, still
 * the file every bootstrap test reads.
 */
export async function register() {
  // Nothing to do on the edge. The Knowledge Asset bootstrap is Node-only:
  // it needs Prisma and a DATABASE_URL, neither of which exists here.
}
