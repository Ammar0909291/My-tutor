import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * A SERVABLE IDENTITY WITH NO CONTENT IS WORSE THAN NO IDENTITY AT ALL.
 *
 * ── MEASURED IN PRODUCTION (2026-08-12) ─────────────────────────────────────
 *   probe identities ............................ 1,535
 *   with NO probe_assets row .................... 737  (48%)
 *   ...of which ACTIVE .......................... 737  (every one)
 *   explanation identities with no content ...... 255
 *
 * All 737 share one signature — authorKind HUMAN_CURATOR, authorId
 * EDUCATIONAL_BRAIN_SEED, every row created on 2026-07-27 — so they came from
 * a single historical seeding event. The bootstrap's own write path uses a
 * NESTED create (assetIdentity.create({ data: { …, probeAsset: { create } } })),
 * which is atomic and cannot produce one. Worth stating, because the first
 * hypothesis — "a socket timeout between two writes" — was wrong, and the
 * provenance query is what disproved it.
 *
 * ── WHY IT CAUSED E6 ────────────────────────────────────────────────────────
 * `findBestProbe` filters on status ACTIVE and then joins content. A hollow
 * identity passes the filter and yields nothing servable, so the mastery gate
 * has no MCQ to attach and the turn goes out as model prose. The sweep
 * measured E6 × 12 across 6 topics, and the repo showed 3-4 gradeable probes
 * for phys.meas concepts that production served 0-1 of.
 *
 * ── WHY IT NEVER HEALED, WHICH IS THE REAL BUG ──────────────────────────────
 * Two separate "it looks done" checks, both counting identities:
 *   1. the dup check asked only whether an identity with that canonicalSlug
 *      existed — an orphan answered yes, so every cold start skipped it;
 *   2. the early-return gate compared an identity COUNT against the expected
 *      total, so once the count was reached the loop never ran at all.
 * Either alone makes the damage permanent. Both are fixed.
 *
 * SOURCE ASSERTIONS, labelled honestly: this path needs a live database and a
 * cold start, and the repo has no fixture harness for it. That is weaker than
 * executing it — and it is the right shape here, because the defect was a
 * MISSING BRANCH, not wrong logic inside one.
 */
const SRC = readFileSync(path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8')
/** Comments quote the old error text verbatim, so "is it gone?" must ask the CODE. */
const CODE = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')

describe('the asset bootstrap repairs hollow identities', () => {
  it('learns which identities have content from ONE prefetch, not a query per asset', () => {
    // The per-asset findFirst was 2,920 sequential round trips against a
    // database that intermittently times out; a single timeout threw out of
    // the whole run, so the catalogue could never converge. Production logged
    // "2379/2920 ... seeding missing assets" for weeks and never once logged
    // "complete".
    expect(SRC).toMatch(/const existing = new Map<string, \{ assetId: string; hasContent: boolean \}>/)
    expect(SRC).toMatch(/prisma\.assetIdentity\.findMany\(/)
    expect(SRC).toMatch(/hasContent: row\.probeAsset !== null \|\| row\.explanationAsset !== null/)
    // The old pattern must be gone from the seeding loops entirely.
    expect(CODE).not.toMatch(/prisma\.assetIdentity\.findFirst\(/)
  })

  it('a single failed write does not discard the rest of the run', () => {
    // All-or-nothing is exactly why the catalogue never converged.
    expect(SRC).toMatch(/let failed = 0/)
    expect(SRC).toMatch(/failed\+\+/)
    expect(SRC).toMatch(/failed=\$\{failed\}/)
    // No unconditional rethrow left in the per-asset create path.
    expect(CODE).not.toMatch(/throw createErr/)
  })

  it('creates the MISSING CHILD for an existing identity, both families', () => {
    expect(SRC).toMatch(/if \(!dup\.hasContent\)/)
    expect(SRC).toMatch(/prisma\.explanationAsset\.create\(/)
    expect(SRC).toMatch(/prisma\.probeAsset\.create\(/)
  })

  it('repairs by adding the child, never by deleting the identity', () => {
    // Deleting would collide with the partial unique index on canonicalSlug,
    // churn the assetId, and orphan every evidence row already keyed to it.
    expect(CODE).not.toMatch(/assetIdentity\.delete/)
    expect(CODE).not.toMatch(/assetIdentity\.deleteMany/)
  })

  it('the early-return gate counts HOLLOW identities, not just identities', () => {
    // Without this the repair is unreachable: the moment the identity count
    // reaches the expected total, the bootstrap returns before the loops.
    expect(SRC).toMatch(/hollowIdentities/)
    expect(SRC).toMatch(/probeAsset:\s*\{\s*is:\s*null\s*\}/)
    expect(SRC).toMatch(/explanationAsset:\s*\{\s*is:\s*null\s*\}/)
    expect(SRC).toMatch(/storedIdentities >= EXPECTED_IDENTITIES && hollowIdentities === 0/)
  })

  it('a concurrent cold start healing the same row is not an error', () => {
    // Both racers want the same end state; P2002 means it already happened.
    expect(SRC).toMatch(/if \(repairErr\?\.code !== 'P2002'\) throw repairErr/)
  })

  it('reports repairs separately from creations', () => {
    // "created" and "repaired a shell" are different events; collapsing them
    // would hide whether the damage is recurring.
    expect(SRC).toMatch(/let repaired = 0/)
    expect(SRC).toMatch(/repaired=\$\{repaired\}/)
  })

  it('status convergence failing does not cancel seeding — it is the FIRST db call', () => {
    // Measured 2026-08-12: the updateMany is the first database call the
    // bootstrap makes, and it was throwing with "Can't reach database server
    // at ...pooler.supabase.com:6543". Because it threw, the run aborted
    // before seeding and repair were ever reached, so the catalogue could not
    // converge even in the windows when the pooler recovered moments later.
    const converge = CODE.indexOf('assetIdentity.updateMany')
    const prefetch = CODE.indexOf('assetIdentity.findMany')
    expect(converge).toBeGreaterThan(-1)
    expect(prefetch).toBeGreaterThan(converge)
    expect(SRC).toMatch(/status convergence failed, continuing to seeding/)
  })

  it('does a BOUNDED slice per cold start, so it can actually finish', () => {
    // MEASURED: 24h of production logs contain ZERO "asset bootstrap complete"
    // lines while "seeding missing assets..." appears on nearly every request.
    // register() starts this work without awaiting it and a serverless
    // instance freezes once the response is sent, so a task needing ~1,500
    // writes never finishes — every cold start redoes the same early work and
    // makes zero net progress, forever.
    //
    // Doing LESS is what makes it finish: a bounded slice completes inside an
    // invocation, and each cold start advances the catalogue by that slice.
    expect(SRC).toMatch(/ASSET_BOOTSTRAP_WRITE_BUDGET/)
    expect(SRC).toMatch(/const budgetExhausted = \(\) => budgetSpent >= WRITE_BUDGET/)
    // Both loops must respect it — bounding only one still lets the other run
    // unbounded and freeze mid-way.
    const breaks = SRC.match(/if \(budgetExhausted\(\)\) break/g) ?? []
    expect(breaks).toHaveLength(2)
    // Only REAL writes spend budget; skips are free, or a run of already-seeded
    // assets would burn the slice without doing anything.
    expect(SRC).toMatch(/repaired\+\+\s*\n\s*budgetSpent\+\+/)
    expect(SRC).toMatch(/created\+\+\s*\n\s*budgetSpent\+\+/)
  })

  it('the log distinguishes "slice spent, more to do" from "nothing left"', () => {
    // Otherwise a partially-seeded catalogue and a complete one look identical
    // in the logs — which is how this went unnoticed for weeks.
    expect(SRC).toMatch(/budget spent, the next cold start continues/)
    expect(SRC).toMatch(/nothing left to do/)
  })

  it('records the measurement in the source so this is not deleted as dead code', () => {
    expect(SRC).toMatch(/737/)
    expect(SRC).toMatch(/findBestProbe/)
  })
})
