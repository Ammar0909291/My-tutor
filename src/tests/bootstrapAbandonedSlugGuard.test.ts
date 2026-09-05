/**
 * P-10-FOLLOW-UP-B — the PRODUCTION writer refuses to recreate the duplicate.
 *
 * P-10-FOLLOW-UP-A put this guard in `scripts/brain/seed-knowledge-assets.ts`.
 * That is the canonical seeder, but it is not the writer that actually runs:
 * no session in this project's history has had a DATABASE_URL to run it with,
 * while `src/instrumentation.ts`'s cold-start bootstrap seeds production
 * automatically on every cold start. It carries the identical mechanism —
 * `buildProbeSlugResolver` plus a create-only loop keyed on the resolved slug
 * — so until it too refuses, the recurrence is not prevented where it would
 * actually happen. A's own report named this as the remaining risk.
 *
 * THE DESIGN THIS FILE PINS, and why each property matters:
 *
 *   1. ONE detector. `abandonedLegacyProbeSlugs` is imported by both writers.
 *      A second implementation could drift and would be worse than none,
 *      because it would look protected.
 *   2. ONE liveness rule. "Live" is the complement of SEED_REVIVABLE_STATUSES,
 *      shared, so the two writers cannot disagree about which rows block.
 *   3. NO new query. The bootstrap already prefetches every seed-owned row,
 *      unfiltered by slug, so the abandoned row is already in the result set;
 *      only `status` was added to that existing select. This matters more than
 *      it looks: this file caused a 22-million-row egress line in the
 *      2026-08-31 incident, and the cheap probe exists so that a cold start
 *      with nothing to do reads two rows. The guard must not undo that.
 *   4. Existing failure semantics. Refuse and return — never process.exit,
 *      which would take the server down on boot, and never a partial write.
 *
 * Structure mirrors the A-side test: a behavioural simulation driven by the
 * REAL shared detector and the REAL shared status constant, plus source
 * coupling so the simulation cannot pass while the hook does something else.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GradeBand, ProbeDifficulty, AssetStatus } from '@prisma/client'
import {
  abandonedLegacyProbeSlugs, buildProbeSlugResolver, seedCanonicalSlug,
  SEED_REVIVABLE_STATUSES,
} from '../lib/teaching/assets/brainSeedAssets'

const HOOK_PATH = 'src/instrumentation.ts'
const HOOK = readFileSync(join(process.cwd(), HOOK_PATH), 'utf8')
/** Assertions must read CODE: this file quotes production error text and its
 *  own failure modes in prose, and a bare string match reads the commentary. */
const CODE = HOOK.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')

interface Probe {
  conceptId: string
  probeKind: string
  gradeBand: GradeBand
  difficulty: ProbeDifficulty
}
const probe = (conceptId: string, difficulty: ProbeDifficulty, probeKind = 'mcq',
  gradeBand = GradeBand.HIGH): Probe => ({ conceptId, probeKind, gradeBand, difficulty })

/** A seed-owned AssetIdentity row, reduced to what the bootstrap prefetches. */
interface Row { assetId: string; canonicalSlug: string; status: AssetStatus }

/**
 * The bootstrap's control flow, as implemented: prefetch every seed-owned row
 * once; build the dedup map AND collect live rows under abandoned slugs in the
 * SAME pass; refuse before planning any write; otherwise create exactly the
 * resolved slugs that are absent.
 *
 * The two decisions that carry risk — which slugs are abandoned, and which
 * statuses are live — are the REAL shared exports, not re-derived here.
 */
function runBootstrapCycle(probes: Probe[], store: Row[]): {
  refused: boolean
  liveAbandoned: string[]
  created: string[]
  queries: number
} {
  let queries = 0
  const abandonedSlugs = abandonedLegacyProbeSlugs(probes)

  // THE ONE READ. Unfiltered by slug, exactly as the hook issues it.
  queries++
  const rows = store
  const existing = new Map<string, Row>()
  const liveAbandoned: string[] = []
  for (const row of rows) {
    existing.set(row.canonicalSlug, row)
    if (abandonedSlugs.has(row.canonicalSlug) && !SEED_REVIVABLE_STATUSES.includes(row.status)) {
      liveAbandoned.push(row.canonicalSlug)
    }
  }

  if (liveAbandoned.length > 0) return { refused: true, liveAbandoned, created: [], queries }

  const resolve = buildProbeSlugResolver(probes)
  const created: string[] = []
  for (const p of probes) {
    const slug = resolve(p)
    if (existing.has(slug)) continue
    created.push(slug)
    store.push({ assetId: `new-${slug}`, canonicalSlug: slug, status: AssetStatus.ACTIVE })
  }
  return { refused: false, liveAbandoned, created, queries }
}

const live = (slug: string): Row => ({ assetId: `a-${slug}`, canonicalSlug: slug, status: AssetStatus.ACTIVE })

describe('cold-start bootstrap — the abandoned-legacy-slug guard', () => {
  it('a singleton slot does not trigger the guard, and seeds normally', () => {
    const probes = [probe('sim.single', ProbeDifficulty.DEVELOPING)]
    const store: Row[] = []
    const r = runBootstrapCycle(probes, store)
    expect(r.refused).toBe(false)
    expect(r.created).toEqual(['sim.single:mcq:en:high'])
    expect(r.queries).toBe(1)
  })

  it('re-running on a complete catalogue creates nothing and still does not refuse', () => {
    const probes = [probe('sim.single', ProbeDifficulty.DEVELOPING)]
    const store: Row[] = [live('sim.single:mcq:en:high')]
    const r = runBootstrapCycle(probes, store)
    expect(r.refused).toBe(false)
    expect(r.created).toEqual([])
  })

  it('PROMOTION + LIVE legacy row => refuses, and creates NO duplicate', () => {
    // Cycle 1: one probe in the slot. The bootstrap seeds the 4-segment slug.
    const v1 = [probe('sim.promo', ProbeDifficulty.DEVELOPING)]
    const store: Row[] = []
    expect(runBootstrapCycle(v1, store).created).toEqual(['sim.promo:mcq:en:high'])
    const afterCycle1 = JSON.parse(JSON.stringify(store))

    // Cycle 2: a second probe is authored into the same slot — the exact event
    // that produced all three P-10 instances. Every probe in the slot now
    // resolves to a 5-segment slug, and the row from cycle 1 is orphaned.
    const v2 = [...v1, probe('sim.promo', ProbeDifficulty.ADVANCED)]
    const r = runBootstrapCycle(v2, store)

    expect(r.refused).toBe(true)
    expect(r.liveAbandoned).toEqual(['sim.promo:mcq:en:high'])
    expect(r.created).toEqual([])
    // THE PROOF: the store is byte-identical to the end of cycle 1. No second
    // ACTIVE identity for the same question, and the canonical row that was
    // already serving was not modified, renamed or deprecated.
    expect(store).toEqual(afterCycle1)
    expect(store).toHaveLength(1)
    expect(store[0].status).toBe(AssetStatus.ACTIVE)
  })

  it('PROMOTION + DEPRECATED legacy row => proceeds, matching the manual seeder', () => {
    // The state the P-10 remediation leaves behind. It must not block a
    // legitimate ladder forever, or the guard would freeze the catalogue.
    const store: Row[] = [{
      assetId: 'a-old', canonicalSlug: 'sim.fixed:mcq:en:high', status: AssetStatus.DEPRECATED,
    }]
    const v2 = [probe('sim.fixed', ProbeDifficulty.DEVELOPING), probe('sim.fixed', ProbeDifficulty.ADVANCED)]
    const r = runBootstrapCycle(v2, store)

    expect(r.refused).toBe(false)
    expect(r.created.sort()).toEqual([
      'sim.fixed:mcq:en:high:advanced',
      'sim.fixed:mcq:en:high:developing',
    ])
    // The old row keeps its identity and its DEPRECATED status — never
    // renamed, never deleted, never revived by this writer.
    expect(store.find((r2) => r2.assetId === 'a-old')).toEqual({
      assetId: 'a-old', canonicalSlug: 'sim.fixed:mcq:en:high', status: AssetStatus.DEPRECATED,
    })
    // Exactly one live identity per rung.
    const liveSlugs = store.filter((r2) => r2.status === AssetStatus.ACTIVE).map((r2) => r2.canonicalSlug)
    expect(new Set(liveSlugs).size).toBe(liveSlugs.length)
  })

  it.each([AssetStatus.ACTIVE, AssetStatus.DRAFT, AssetStatus.REVIEW])(
    'a legacy row in %s blocks — anything not revivable is live', (status) => {
      const store: Row[] = [{ assetId: 'a', canonicalSlug: 'sim.s:mcq:en:high', status }]
      const v2 = [probe('sim.s', ProbeDifficulty.DEVELOPING), probe('sim.s', ProbeDifficulty.ADVANCED)]
      expect(runBootstrapCycle(v2, store).refused).toBe(true)
    })

  it.each([AssetStatus.DEPRECATED, AssetStatus.RETIRED])(
    'a legacy row in %s does not block — it is the resolved state', (status) => {
      const store: Row[] = [{ assetId: 'a', canonicalSlug: 'sim.r:mcq:en:high', status }]
      const v2 = [probe('sim.r', ProbeDifficulty.DEVELOPING), probe('sim.r', ProbeDifficulty.ADVANCED)]
      expect(runBootstrapCycle(v2, store).refused).toBe(false)
    })

  it('an unrelated live row under a slug this corpus still uses never blocks', () => {
    // Negative control against an over-broad guard: only slugs the corpus has
    // ABANDONED may block. A slot that is still a singleton keeps its identity
    // and its row is simply the normal dedup hit.
    const probes = [
      probe('sim.ladder', ProbeDifficulty.DEVELOPING),
      probe('sim.ladder', ProbeDifficulty.ADVANCED),
      probe('sim.stable', ProbeDifficulty.DEVELOPING),
    ]
    const store: Row[] = [live('sim.stable:mcq:en:high')]
    const r = runBootstrapCycle(probes, store)
    expect(r.refused).toBe(false)
    expect(r.created.sort()).toEqual([
      'sim.ladder:mcq:en:high:advanced',
      'sim.ladder:mcq:en:high:developing',
    ])
  })

  it('the guard reads only the prefetch — one query whether it refuses or not', () => {
    const v2 = [probe('sim.q', ProbeDifficulty.DEVELOPING), probe('sim.q', ProbeDifficulty.ADVANCED)]
    const refusing = runBootstrapCycle(v2, [live('sim.q:mcq:en:high')])
    const proceeding = runBootstrapCycle(v2, [])
    expect(refusing.refused).toBe(true)
    expect(refusing.queries).toBe(1)
    expect(proceeding.refused).toBe(false)
    expect(proceeding.queries).toBe(1)
  })

  it('the cheap-probe fast path cannot hide a duplicate: complete => zero creates', () => {
    // WHY THE GUARD MAY SIT AFTER THE FAST PATH. The cheap probe skips only
    // when every slug this corpus declares is already stored with content. In
    // that state the create loops are a no-op by construction, so no duplicate
    // can be created on the path that skips the guard.
    const probes = [probe('sim.c', ProbeDifficulty.DEVELOPING), probe('sim.c', ProbeDifficulty.ADVANCED)]
    const resolve = buildProbeSlugResolver(probes)
    const complete = probes.map((p) => live(resolve(p)))
    const r = runBootstrapCycle(probes, complete)
    expect(r.created).toEqual([])
  })
})

describe('the guard is wired into src/instrumentation.ts, not merely simulated', () => {
  it('imports the shared detector and the shared liveness rule — no second implementation', () => {
    expect(CODE).toMatch(/abandonedLegacyProbeSlugs/)
    expect(CODE).toMatch(/SEED_REVIVABLE_STATUSES/)
    // Both must come from the one module that defines them.
    expect(CODE).toMatch(
      /\{[^}]*abandonedLegacyProbeSlugs[^}]*\}\s*=\s*\n?\s*await import\('\.\/lib\/teaching\/assets\/brainSeedAssets'\)/,
    )
    // A local re-derivation of slot counting would be the drift this forbids.
    expect(CODE).not.toMatch(/slotCounts/)
  })

  it('computes abandonment from the bootstrap corpus and refuses on a live hit', () => {
    expect(CODE).toMatch(/const abandonedSlugs = abandonedLegacyProbeSlugs\(ALL_PROBES\)/)
    // AMENDED 2026-09-05 (P-10-FOLLOW-UP-D), in place, supersession recorded.
    // This used to pin the fused expression
    //   abandonedSlugs.has(row.canonicalSlug) && !SEED_REVIVABLE_STATUSES.includes(row.status)
    // D hoisted the liveness half into `const live = ...` because the new
    // ladder-sibling guard needs the SAME answer for the same row, and computing
    // it twice is how two guards drift apart. The invariant is unchanged and is
    // now asserted in two halves, which is strictly stronger than the fused
    // regex: liveness must still be derived from the shared constant, AND the
    // abandoned check must still be conjoined with it.
    expect(CODE).toMatch(/const live = !SEED_REVIVABLE_STATUSES\.includes\(row\.status\)/)
    expect(CODE).toMatch(/abandonedSlugs\.has\(row\.canonicalSlug\)\s*&&\s*live/)
    expect(CODE).toMatch(/if \(liveAbandoned\.length > 0\) \{/)
  })

  it('ADDS NO QUERY — the decision is collected inside the existing prefetch loop', () => {
    // The enabling change is one scalar column on a query that was already
    // running. If a future edit gives the guard its own read, this fails.
    const prefetch = CODE.slice(
      CODE.indexOf('const abandonedSlugs = abandonedLegacyProbeSlugs(ALL_PROBES)'),
      CODE.indexOf('if (liveAbandoned.length > 0) {'),
    )
    expect(prefetch.length).toBeGreaterThan(100)
    // Exactly one database call in the whole region, and it is the prefetch.
    expect([...prefetch.matchAll(/prisma\.\w+\./g)].map((m) => m[0])).toEqual(['prisma.assetIdentity.'])
    expect(prefetch).toMatch(/findMany\(\{\s*where: seedOwnershipWhere\(\)/)
    expect(prefetch).toMatch(/status: true,/)
    // and the collection happens in the same loop body that fills `existing`.
    expect(prefetch).toMatch(/existing\.set\(row\.canonicalSlug[\s\S]*liveAbandoned\.push\(/)
  })

  it('leaves the cheap-probe fast path untouched — nothing added before it', () => {
    // The 2026-08-31 egress fix: a cold start with nothing to do must still
    // read two rows and return. So the guard, and the detector call it needs,
    // must both sit AFTER the probe's early return.
    const probeIdx = CODE.indexOf('storedCount >= expectedSlugs.size && hollowCount === 0')
    const guardIdx = CODE.indexOf('const abandonedSlugs = abandonedLegacyProbeSlugs(ALL_PROBES)')
    expect(probeIdx).toBeGreaterThan(-1)
    expect(guardIdx).toBeGreaterThan(probeIdx)
  })

  it('refuses with the hook’s own failure semantics — return, never process.exit', () => {
    const block = CODE.slice(
      CODE.indexOf('if (liveAbandoned.length > 0) {'),
      CODE.indexOf('const EXPECTED_IDENTITIES'),
    )
    expect(block).toMatch(/console\.error\(/)
    expect(block).toMatch(/\n\s*return\n/)
    // A process.exit here would turn a data-quality fault into a boot outage —
    // the reason Step 0's identity check is a return as well.
    expect(block).not.toMatch(/process\.exit/)
    // and it must write nothing on the way out.
    expect(block).not.toMatch(/prisma\./)
    // Bounded output: an unbounded list would repeat on every cold start.
    expect(block).toMatch(/slice\(0, 10\)/)
  })

  it('refuses BEFORE any create or flush', () => {
    const guardIdx = CODE.indexOf('if (liveAbandoned.length > 0) {')
    // Without this the assertions below pass vacuously when the guard is
    // absent: indexOf returns -1, and every write index is greater than -1.
    // Measured — this test was the one that passed against the pre-fix hook.
    expect(guardIdx).toBeGreaterThan(-1)
    for (const write of ['createMany', 'newIdentities.push', 'const flush =']) {
      expect(CODE.indexOf(write), `${write} must follow the guard`).toBeGreaterThan(guardIdx)
    }
  })

  it('does not disturb the completeness guard it sits in front of', () => {
    // bootstrapCompletenessGuard.test.ts reads the storedIdentities region and
    // bootstrapCheapProbe.test.ts slices on the `existing` map declaration.
    // Both anchors must survive, or those tests silently stop measuring.
    expect(HOOK).toContain('const existing = new Map<string, { assetId: string; hasContent: boolean }>()')
    expect(CODE).toMatch(/let storedIdentities = 0[\s\S]{0,400}?for \(const slug of expectedSlugs\)/)
  })
})

describe('both writers now share one answer', () => {
  const SEEDER = readFileSync(join(process.cwd(), 'scripts/brain/seed-knowledge-assets.ts'), 'utf8')

  it('the manual seeder and the bootstrap import the same detector', () => {
    expect(SEEDER).toMatch(/abandonedLegacyProbeSlugs/)
    expect(CODE).toMatch(/abandonedLegacyProbeSlugs/)
  })

  it('and the same liveness rule, so they cannot disagree about what blocks', () => {
    expect(SEEDER).toMatch(/SEED_REVIVABLE_STATUSES/)
    expect(CODE).toMatch(/SEED_REVIVABLE_STATUSES/)
    // Neither may reintroduce a private copy of the status pair.
    expect(SEEDER).not.toMatch(/notIn:\s*\[AssetStatus\.DEPRECATED/)
    expect(CODE).not.toMatch(/\[AssetStatus\.DEPRECATED,\s*AssetStatus\.RETIRED\]/)
  })

  it('the shared constant is exactly the non-serving pair', () => {
    expect([...SEED_REVIVABLE_STATUSES].sort())
      .toEqual([AssetStatus.DEPRECATED, AssetStatus.RETIRED].sort())
  })

  it('the seeder still uses it for revival too — one definition, not three', () => {
    expect(SEEDER).toMatch(/REVIVABLE[^=]*=\s*new Set\(SEED_REVIVABLE_STATUSES\)/)
  })
})
