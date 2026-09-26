import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * PRESENCE MUST MATCH THE UNIQUE INDEX, OR THE BOOTSTRAP STALLS FOREVER.
 *
 * Measured in production 2026-09-25 (phase-timing logs, `34b8288`): every cold
 * start logged
 *
 *   asset bootstrap: 5629/10409 seed identities present — seeding missing assets...
 *   asset bootstrap slice: created=0 repaired=0 skipped=1742 failed=0 spent=150/150
 *
 * The prefetch read only rows tagged with a BOOTSTRAP_SEED_SUBJECTS subject,
 * while the corpus also carries biology. The 992 biology rows written by SQL
 * on 2026-09-22 were therefore "missing", the planner spent the whole write
 * budget re-inserting the first 150 of them, the seed-slug unique index
 * (`WHERE "authorId" = 'EDUCATIONAL_BRAIN_SEED'`) skipped every one, and
 * nothing behind them — mathematics, Batch 17/18 physics probes — ever seeded.
 * Because the corpus never read complete, every cold start also paid for the
 * full prefetch.
 */
describe('the cold-start bootstrap counts presence the way the unique index does', () => {
  const src = readFileSync('src/instrumentation.ts', 'utf8')
  const cheapProbe = src.slice(
    src.indexOf('Step 0.6'),
    src.indexOf('const existing = new Map<string, { assetId: string; hasContent: boolean }>()'),
  )

  it('the cheap probe counts seed-author rows under this corpus\'s slugs, not owned-subject rows', () => {
    expect(cheapProbe).toMatch(/const presence = \{ authorId: SEED_AUTHOR_ID \}/)
    expect(cheapProbe).not.toMatch(/const ownership = seedOwnershipWhere\(\)/)
    // still corpus-scoped (the 2026-08-19 never-converges bug)
    const counts = cheapProbe.match(/prisma\.assetIdentity\.count\(\{[\s\S]*?\}\),/g) ?? []
    expect(counts.length).toBe(2)
    for (const c of counts) {
      expect(c).toMatch(/\.\.\.presence/)
      expect(c).toMatch(/canonicalSlug: \{ in: expectedSlugList \}/)
    }
  })

  const presenceIdx = src.indexOf('SLUG-INDEX PRESENCE (2026-09-25)')
  const tallyIdx = src.indexOf('let storedIdentities = 0')
  const block = src.slice(presenceIdx, tallyIdx)

  it('the planner learns about seed-author rows the owned prefetch cannot see, before tallying', () => {
    expect(presenceIdx).toBeGreaterThan(-1)
    expect(tallyIdx).toBeGreaterThan(presenceIdx)
    expect(block).toMatch(/const unseenSlugs = \[\.\.\.expectedSlugs\]\.filter\(\(slug\) => !existing\.has\(slug\)\)/)
    expect(block).toMatch(/where: \{ authorId: SEED_AUTHOR_ID, canonicalSlug: \{ in: unseenSlugs \} \}/)
    expect(block).toMatch(/existing\.set\(row\.canonicalSlug/)
  })

  it('is bounded and read-only: skipped when nothing is unseen, and writes nothing', () => {
    expect(block).toMatch(/if \(unseenSlugs\.length > 0\)/)
    expect(block).not.toMatch(/\.(create|createMany|update|updateMany|upsert|delete|deleteMany)\(/)
  })

  it('does not widen the abandoned-slug guard or status convergence', () => {
    expect(block).not.toMatch(/liveAbandoned/)
    expect(block).not.toMatch(/AssetStatus\.ACTIVE/)
    // the ownership prefetch those guards read is unchanged
    // EGRESS-4 (2026-09-25): the prefetch is now slug-bounded (bootstrapPrefetchSlugs)
    // and still ownership-scoped in BOTH branches; the regex accepts that form.
    expect(src).toMatch(/prisma\.assetIdentity\.findMany\(\{\s*where: \(prefetchSlugs\s*\?\s*\{\s*\.\.\.\(seedOwnershipWhere\(\) as Record<string, unknown>\), canonicalSlug: \{ in: prefetchSlugs \} \}\s*:\s*seedOwnershipWhere\(\)\) as never,/)
  })
})
