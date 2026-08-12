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

describe('the asset bootstrap repairs hollow identities', () => {
  it('loads the child relation when checking for a duplicate — it cannot repair what it did not read', () => {
    expect(SRC).toMatch(/include:\s*\{\s*explanationAsset:\s*true\s*\}/)
    expect(SRC).toMatch(/include:\s*\{\s*probeAsset:\s*true\s*\}/)
  })

  it('creates the MISSING CHILD for an existing identity, both families', () => {
    expect(SRC).toMatch(/if \(!dup\.explanationAsset\)/)
    expect(SRC).toMatch(/if \(!dup\.probeAsset\)/)
    expect(SRC).toMatch(/prisma\.explanationAsset\.create\(/)
    expect(SRC).toMatch(/prisma\.probeAsset\.create\(/)
  })

  it('repairs by adding the child, never by deleting the identity', () => {
    // Deleting would collide with the partial unique index on canonicalSlug,
    // churn the assetId, and orphan every evidence row already keyed to it.
    expect(SRC).not.toMatch(/assetIdentity\.delete/)
    expect(SRC).not.toMatch(/assetIdentity\.deleteMany/)
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

  it('records the measurement in the source so this is not deleted as dead code', () => {
    expect(SRC).toMatch(/737/)
    expect(SRC).toMatch(/findBestProbe/)
  })
})
