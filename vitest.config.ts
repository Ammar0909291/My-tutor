import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  // tsconfig.json intentionally sets `"jsx": "preserve"` (Next.js's own
  // SWC/webpack compiler does the real JSX transform, so tsc only needs to
  // type-check). Vite 8's default oxc-based test transform reads that same
  // tsconfig and, left alone, treats "preserve" as "don't touch JSX" — which
  // then can't be turned into runnable JS, so any `.test.ts` that imports a
  // `.tsx` module fails with "invalid JS syntax" before a single test runs.
  // This overrides ONLY Vite's own transform option (nothing in
  // tsconfig.json changes, and the actual Next.js build is untouched) so a
  // plain-function/pure-logic test can import a component file directly —
  // no new test framework, no DOM, no `@vitejs/plugin-react`; oxc already
  // transforms JSX natively once told which runtime to target.
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/tests/**/*.test.ts'],
    coverage: { provider: 'v8', reporter: ['text'] },
    // CI stability fix (validate.yml): every one of the last 10+ recorded CI
    // failures on this workflow was the SAME upstream Vitest 4.x bug —
    // `EnvironmentTeardownError: [vitest-worker]: Closing rpc while
    // "onUserConsoleLog" was pending` — a race in the forked worker pool's
    // console-forwarding RPC channel when one file's worker tears down while
    // another file's worker is still mid-flight logging. Confirmed via CI
    // logs: 100% of these runs report every test file and every test PASSED
    // (e.g. "100 passed (100)", "1745 passed | 1 skipped") — the run only
    // exits nonzero because Vitest treats the unhandled rejection from this
    // race as fatal, unrelated to any actual assertion. It hit a different,
    // unrelated test file each time (spacedRetrievalScheduler, streakEngine,
    // efficacyAnalysis, remindersCron, sessionOpeningReviewIntegration —
    // pure computational modules with no shared timer/async surface),
    // confirming it is not a leak in any specific test — it is inherent to
    // running multiple file-workers concurrently. See open upstream reports:
    // vitest-dev/vitest#8649, #9872. fileParallelism:false runs test files
    // sequentially (one worker/RPC channel active at a time), which removes
    // the concurrent-teardown race structurally rather than suppressing its
    // error — this repo's suite still completes in ~10s, so the serialization
    // cost is negligible.
    fileParallelism: false,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
