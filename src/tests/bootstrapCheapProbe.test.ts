import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * THE BOOTSTRAP MUST NOT READ THOUSANDS OF ROWS TO ANSWER A YES/NO QUESTION.
 *
 * Measured 2026-08-31 during a live egress incident (50.8 GB against a 5 GB
 * monthly quota). After the spine-replay fix, the cold-start asset bootstrap
 * was the largest remaining line:
 *
 *   asset_identity prefetch    2,606 calls   11,278,908 rows
 *   probe_assets sub-select    1,838 calls    4,771,827 rows
 *   explanation_assets         1,812 calls    2,884,704 rows
 *
 * ~22 million rows, all of it spent deciding "there is nothing to do" — which
 * was the answer every time for at least 21 hours, verified by zero seed rows
 * written in that window.
 *
 * The cheap probe answers the same question with two COUNTs. These assertions
 * pin the three properties that make it both effective and safe; each one, if
 * lost, reopens either the egress leak or the never-converges bug.
 */
describe('the cold-start bootstrap answers completeness cheaply', () => {
  const src = readFileSync('src/instrumentation.ts', 'utf8')
  const probe = src.slice(
    src.indexOf('Step 0.6'),
    src.indexOf('const existing = new Map<string, { assetId: string; hasContent: boolean }>()'),
  )

  it('exists, and runs BEFORE the full prefetch', () => {
    expect(probe.length).toBeGreaterThan(200)
    expect(src.indexOf('Step 0.6')).toBeLessThan(src.indexOf('prisma.assetIdentity.findMany'))
  })

  it('uses counts, not a findMany — the whole point is rows not returned', () => {
    expect(probe).toContain('prisma.assetIdentity.count')
    expect(probe).not.toContain('findMany')
  })

  it('intersects with the corpus slugs, never the whole seed-owned table', () => {
    // Counting every seed-owned row is the documented historical defect: rows
    // from a corpus this hook does not import once satisfied the guard while
    // 314 chemistry probes were absent.
    expect(probe).toContain('canonicalSlug: { in: expectedSlugList }')
  })

  it('treats hollow as BOTH content rows absent, matching the full guard', () => {
    // The full guard computes hasContent = probeAsset !== null || explanationAsset
    // !== null. Hollow is the negation of that, so both must be null.
    expect(probe).toContain('probeAsset: { is: null }')
    expect(probe).toContain('explanationAsset: { is: null }')
  })

  it('falls through on error — a failed probe is never an answer', () => {
    // Same rule as the spine fix: a failure must be retried, not remembered as
    // a result. A false "complete" would strand seeding permanently.
    expect(probe).toMatch(/catch\s*\(/)
    expect(probe).toContain('falling back to full prefetch')
  })

  it('skips only on the same condition the full guard uses', () => {
    expect(probe).toContain('storedCount >= expectedSlugs.size && hollowCount === 0')
    const full = src.slice(src.indexOf('const EXPECTED_IDENTITIES'))
    expect(full).toContain('storedIdentities >= EXPECTED_IDENTITIES && hollowIdentities === 0')
  })
})
