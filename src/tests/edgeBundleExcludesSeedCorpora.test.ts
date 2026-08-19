import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

/**
 * THE AUTHORED TEACHING CORPUS MUST NOT SHIP TO THE EDGE RUNTIME.
 *
 * Next.js compiles src/instrumentation.ts for BOTH runtimes. The hook's first
 * line is `if (process.env.NEXT_RUNTIME !== 'nodejs') return`, so on the edge
 * it does nothing — but that is a RUNTIME guard, and inclusion happens at
 * BUILD time. The edge runtime has no code splitting, so webpack inlines every
 * `await import(...)` the hook contains regardless of reachability. Those
 * imports are the seed corpora; chemistrySeedAssets.ts alone is 1.37 MB of
 * source.
 *
 * MEASURED. Deploy dpl_7HZgvv4M failed outright:
 *
 *   NOW_SANDBOX_WORKER_MAX_MIDDLEWARE_SIZE
 *   The Edge Function "src/middleware" size is 1.17 MB and your plan size
 *   limit is 1 MB.
 *
 * `.next/server/edge-instrumentation.js` gzipped to 1,124,399 bytes and
 * carried 372 chemistry concept ids — teaching content shipped to a function
 * that has no database to serve it from. After the substitution below the same
 * file is 248 bytes and the reported middleware size is 79.7 kB.
 *
 * This is a size budget that had already been hit once before (see the
 * `config.devtool = false` line the substitution sits beside, added when edge
 * source maps pushed the same bundle over the same cap). Two independent
 * causes, one limit — which is why the exclusion is structural here rather
 * than a size that happens to fit.
 */

const CONFIG = fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf8')
const EDGE_HOOK = fs.readFileSync(path.join(process.cwd(), 'src/instrumentation.edge.ts'), 'utf8')
/** The edge hook with comments stripped — its prose explains the failure mode
 *  in the same words the assertions ban, so the assertions must read code. */
const EDGE_CODE = EDGE_HOOK.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
const NODE_HOOK = fs.readFileSync(path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8')

describe('the edge build gets an empty instrumentation hook', () => {
  it('next.config.js substitutes the module, and only for the edge runtime', () => {
    expect(CONFIG).toMatch(/nextRuntime === "edge"/)
    expect(CONFIG).toMatch(/NormalModuleReplacementPlugin/)
    expect(CONFIG).toMatch(/instrumentation\.edge\.ts/)
    // The substitution must sit INSIDE the edge branch. A replacement applied
    // to every compilation would silently disable the bootstrap in production.
    const edgeBranch = CONFIG.slice(CONFIG.indexOf('nextRuntime === "edge"'))
    expect(edgeBranch.indexOf('NormalModuleReplacementPlugin')).toBeGreaterThan(-1)
    expect(edgeBranch.indexOf('NormalModuleReplacementPlugin'))
      .toBeLessThan(edgeBranch.indexOf('return config'))
  })

  it('the edge hook exports register and does nothing else', () => {
    expect(EDGE_HOOK).toMatch(/export async function register\(\)/)
    // No imports at all — an import is the whole failure mode this file exists
    // to prevent, and one added later would reintroduce it silently.
    expect(EDGE_CODE).not.toMatch(/^\s*import\s/m)
    expect(EDGE_CODE).not.toMatch(/await import\(/)
    expect(EDGE_CODE).not.toMatch(/require\(/)
  })

  it('the Node hook is unchanged in kind — it still owns the bootstrap', () => {
    // The substitution must not have become "move the bootstrap somewhere
    // else": src/instrumentation.ts remains the single implementation, and the
    // guard is still there so a runtime that somehow loads it does nothing.
    expect(NODE_HOOK).toMatch(/process\.env\.NEXT_RUNTIME !== 'nodejs'/)
    expect(NODE_HOOK).toMatch(/bootstrapAssets\(\)/)
    expect(NODE_HOOK).toMatch(/chemistrySeedAssets/)
  })
})

describe('the seed corpora are large enough that this matters', () => {
  it('chemistrySeedAssets alone exceeds the entire edge budget', () => {
    const bytes = fs.statSync(
      path.join(process.cwd(), 'src/lib/teaching/assets/chemistrySeedAssets.ts'),
    ).size
    // Stated as a floor, not a pin: the corpus grows, and the point is only
    // that it is the same order of magnitude as the 1 MB limit.
    expect(bytes).toBeGreaterThan(1_000_000)
  })
})

/**
 * THE BOOTSTRAP MUST GET WALL-CLOCK, NOT GOOD LUCK.
 *
 * register() used to fire-and-forget "so cold-start latency is unaffected".
 * A serverless instance freezes the moment its response is sent, so nothing
 * cancelled the work — it was suspended mid-query and the socket was dead by
 * the time the instance thawed. Every cold start logged a Socket timeout on
 * the run's FIRST query, while EXPLAIN ANALYZE of that same query against
 * production measured 10.025 ms. The database was never the problem.
 */
describe('the bootstrap is awaited, under a deadline', () => {
  const HOOK = fs.readFileSync(path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8')

  it('register awaits the run instead of firing and forgetting', () => {
    expect(HOOK).toMatch(/await Promise\.race\(\[/)
    expect(HOOK).toMatch(/bootstrapAssets\(\)\.catch\(/)
  })

  it('the wait is bounded, so an unreachable database cannot delay boot forever', () => {
    expect(HOOK).toMatch(/ASSET_BOOTSTRAP_DEADLINE_MS/)
    expect(HOOK).toMatch(/setTimeout\(/)
    // The deadline must not become the thing that keeps a process alive.
    expect(HOOK).toMatch(/\.unref\?\.\(\)/)
  })

  it('the per-cold-start write budget still exists — the deadline does not replace it', () => {
    // Two independent bounds: the deadline bounds TIME, the budget bounds
    // WORK. Dropping either one is how this turns into a slow boot.
    expect(HOOK).toMatch(/ASSET_BOOTSTRAP_WRITE_BUDGET/)
    expect(HOOK).toMatch(/budgetExhausted\(\)/)
  })
})
