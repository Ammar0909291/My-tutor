/**
 * P-10-FOLLOW-UP — prevent recurrence of the duplicate-ACTIVE-row defect.
 *
 * P-10 (docs/CLAUDE_HANDOVER.md §9r/§9s) found and remediated three
 * production `asset_identity` rows that existed TWICE under two different
 * canonicalSlugs for the same question. Root mechanism: `buildProbeSlugResolver`
 * appends a difficulty segment to a (conceptId, probeKind, gradeBand) slot
 * ONLY once a second probe joins it. The moment that happens, every probe in
 * the slot — including one already seeded — moves onto the 5-segment slug.
 * Both seed writers are create-only, so a row seeded under the old 4-segment
 * slug is never revisited: the writer looks a probe up by its OWN resolved
 * slug, not by whatever slug it used to carry, and creates a second ACTIVE
 * row beside the orphaned first one.
 *
 * P-10 fixed the three existing rows by hand (a data remediation) but left
 * the mechanism itself unfixed, recorded as P-10-FOLLOW-UP: "the next
 * authoring batch that adds a probe to an existing slot will create this
 * again." This file pins the fix: `abandonedLegacyProbeSlugs` (the detector)
 * and its wiring into `scripts/brain/seed-knowledge-assets.ts` (Guard 3),
 * which refuses to seed rather than silently create the duplicate.
 *
 * FOUR THINGS THIS FILE PROVES, deliberately kept separate:
 *   1. The detector's behaviour on synthetic corpora (promotion, ladders,
 *      isolation, determinism).
 *   2. The detector's behaviour against the REAL, CURRENT, WHOLE corpus,
 *      pinned to the exact three slugs P-10 diagnosed — so a change to the
 *      resolver or the corpus that reintroduces or hides this class shows up
 *      as a test failure here, not as duplicate rows in production.
 *   3. An end-to-end simulation, using the real detector (not a
 *      re-implementation of it), proving that a slot moving from singleton to
 *      ladder CANNOT leave one logical probe with two live ACTIVE identities
 *      once the guard is applied — and that the guard does NOT block
 *      legitimate ladder growth once the legacy row has been deprecated
 *      (the P-10 remediation precedent).
 *   4. The guard is actually wired into the seeder script, not merely
 *      mirrored here — the class of trap CLAUDE.md already warns about
 *      (R3: "a test mirroring an inline route expression... must be coupled
 *      to the route or it is decorative").
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { GradeBand, ProbeDifficulty, AssetStatus } from '@prisma/client'
import {
  abandonedLegacyProbeSlugs, buildProbeSlugResolver, seedCanonicalSlug,
} from '../lib/teaching/assets/brainSeedAssets'

const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')
const SEEDER_PATH = 'scripts/brain/seed-knowledge-assets.ts'
const SEEDER = readFileSync(path.join(process.cwd(), SEEDER_PATH), 'utf8')

interface Probe {
  conceptId: string
  probeKind: string
  gradeBand: GradeBand
  difficulty: ProbeDifficulty
}

const probe = (conceptId: string, probeKind: string, gradeBand: GradeBand, difficulty: ProbeDifficulty): Probe =>
  ({ conceptId, probeKind, gradeBand, difficulty })

describe('abandonedLegacyProbeSlugs — synthetic corpora', () => {
  it('a singleton slot abandons nothing', () => {
    const set = [probe('c.one', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING)]
    expect(abandonedLegacyProbeSlugs(set)).toEqual(new Set())
  })

  it('a slot promoted to a ladder abandons exactly its own base slug', () => {
    const set = [
      probe('c.two', 'mcq', GradeBand.HIGH, ProbeDifficulty.FOUNDATIONAL),
      probe('c.two', 'mcq', GradeBand.HIGH, ProbeDifficulty.ADVANCED),
    ]
    const abandoned = abandonedLegacyProbeSlugs(set)
    expect(abandoned).toEqual(new Set(['c.two:mcq:en:high']))
    // The abandoned slug is exactly the base slug (no difficulty) — never one
    // of the promoted 5-segment slugs.
    for (const s of abandoned) expect(s).not.toMatch(/:(foundational|developing|proficient|advanced)$/)
  })

  it('a 3-rung ladder abandons its base slug exactly once, not once per rung', () => {
    const set = [
      probe('c.three', 'mcq', GradeBand.MIDDLE, ProbeDifficulty.FOUNDATIONAL),
      probe('c.three', 'mcq', GradeBand.MIDDLE, ProbeDifficulty.DEVELOPING),
      probe('c.three', 'mcq', GradeBand.MIDDLE, ProbeDifficulty.PROFICIENT),
    ]
    expect(abandonedLegacyProbeSlugs(set)).toEqual(new Set(['c.three:mcq:en:middle']))
  })

  it('is isolated — a promotion in one slot does not flag an unrelated stable singleton', () => {
    const set = [
      probe('c.ladder', 'mcq', GradeBand.HIGH, ProbeDifficulty.FOUNDATIONAL),
      probe('c.ladder', 'mcq', GradeBand.HIGH, ProbeDifficulty.ADVANCED),
      probe('c.stable', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING),
    ]
    const abandoned = abandonedLegacyProbeSlugs(set)
    expect(abandoned.has('c.ladder:mcq:en:high')).toBe(true)
    expect(abandoned.has('c.stable:mcq:en:high')).toBe(false)
  })

  it('different probeKind or gradeBand at the same concept are different slots', () => {
    const set = [
      probe('c.four', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING),
      probe('c.four', 'misconception_probe', GradeBand.HIGH, ProbeDifficulty.DEVELOPING),
      probe('c.four', 'mcq', GradeBand.MIDDLE, ProbeDifficulty.DEVELOPING),
    ]
    // Every slot here is still a singleton (one probe each) despite sharing a
    // concept id — nothing should be flagged.
    expect(abandonedLegacyProbeSlugs(set)).toEqual(new Set())
  })

  it('is deterministic — same dataset, same result', () => {
    const set = [
      probe('c.five', 'mcq', GradeBand.ADULT, ProbeDifficulty.FOUNDATIONAL),
      probe('c.five', 'mcq', GradeBand.ADULT, ProbeDifficulty.ADVANCED),
    ]
    expect(abandonedLegacyProbeSlugs(set)).toEqual(abandonedLegacyProbeSlugs(set))
  })

  it('can never disagree with buildProbeSlugResolver — every base slug it names is one the resolver actually moved a probe off of', () => {
    const set = [
      probe('c.six', 'mcq', GradeBand.HIGH, ProbeDifficulty.FOUNDATIONAL),
      probe('c.six', 'mcq', GradeBand.HIGH, ProbeDifficulty.ADVANCED),
      probe('c.seven', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING),
    ]
    const resolve = buildProbeSlugResolver(set)
    const abandoned = abandonedLegacyProbeSlugs(set)
    for (const p of set) {
      const base = seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
      expect(abandoned.has(base)).toBe(resolve(p) !== base)
    }
  })
})

// ─── Validation against the real, whole, current corpus ─────────────────────

const allAssetFiles = () =>
  readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))

/** Every export ending in `PROBES` from every non-test module in the assets
 *  directory — the same technique `probeInventoryDepth.test.ts` uses to load
 *  "the whole corpus" without hand-maintaining a ~40-file import list that
 *  would silently drift from `scripts/brain/seed-knowledge-assets.ts`'s own. */
async function loadAllProbes(): Promise<Probe[]> {
  const probes: Probe[] = []
  for (const f of allAssetFiles()) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [name, value] of Object.entries(mod)) {
      if (Array.isArray(value) && name.endsWith('PROBES')) probes.push(...(value as Probe[]))
    }
  }
  return probes
}

describe('abandonedLegacyProbeSlugs — the real corpus, pinned to the P-10 ground truth', () => {
  it('includes the three base slugs P-10 diagnosed and remediated', async () => {
    // NOTE: `abandonedLegacyProbeSlugs` is corpus-only — it correctly flags
    // EVERY slot that is a ladder today, including the many legitimate
    // ladders `physicsDepthSeedAssets.ts`/`physicsBandGapAssets.ts` authored
    // as ladders from the start (which never had a row seeded under their
    // base slug, so there is no live orphan to find). Only a DB-scoped check
    // — Guard 3's `findMany`, exercised below via the wiring tests and the
    // simulation — narrows this down to genuine collisions. This test pins
    // the one thing the corpus alone can prove: the three known P-10 slots
    // are still correctly detected as promoted, so Guard 3 would still catch
    // a live row under any of them if one ever reappeared.
    const all = await loadAllProbes()
    const abandoned = abandonedLegacyProbeSlugs(all)
    // docs/CLAUDE_HANDOVER.md §9r — the exact three surplus rows P-10 deprecated.
    for (const slug of [
      'phys.mech.displacement:mcq:en:middle',
      'phys.mech.hookes-law:mcq:en:middle',
      'phys.mech.momentum:misconception_probe:en:high',
    ]) {
      expect(abandoned.has(slug)).toBe(true)
    }
  }, 30_000)

  it('every flagged base slug independently verifies as a real >1-probe slot (cross-check, not a re-derivation)', async () => {
    const all = await loadAllProbes()
    const abandoned = abandonedLegacyProbeSlugs(all)
    expect(abandoned.size).toBeGreaterThan(0)
    for (const slug of abandoned) {
      // A raw group-by-slot count from the loaded probes, independent of the
      // resolver's own slot-counting internals — proves the flag corresponds
      // to genuine corpus data, not just to what the implementation asserts
      // about itself.
      const n = all.filter((p) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand) === slug).length
      expect(n).toBeGreaterThan(1)
    }
  }, 30_000)

  it('a known-stable singleton slug is not flagged (negative control)', async () => {
    const all = await loadAllProbes()
    const abandoned = abandonedLegacyProbeSlugs(all)
    // math.arith.fractions:core_explanation-adjacent probe slots are untouched
    // by any physics ladder work; pick any probe whose base slot is a genuine
    // singleton in the current corpus and assert it is not flagged.
    const counts = new Map<string, number>()
    for (const p of all) {
      const base = seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
      counts.set(base, (counts.get(base) ?? 0) + 1)
    }
    const singletons = [...counts.entries()].filter(([, n]) => n === 1).map(([s]) => s)
    expect(singletons.length).toBeGreaterThan(0)
    for (const s of singletons) expect(abandoned.has(s)).toBe(false)
  }, 30_000)
})

// ─── End-to-end simulation: the invariant the guard exists to enforce ───────

type FakeStatus = 'ACTIVE' | 'DEPRECATED'
type FakeStore = Map<string, { status: FakeStatus }>

/** Mirrors ONLY the trivial intersection Guard 3's `findMany` performs
 *  (`canonicalSlug IN abandoned AND status NOT IN [DEPRECATED, RETIRED]`) —
 *  the actual detection logic (`abandonedLegacyProbeSlugs`) is the real,
 *  imported function, never re-implemented here. */
function liveOrphansIn(store: FakeStore, abandoned: ReadonlySet<string>): string[] {
  return [...abandoned].filter((slug) => store.get(slug)?.status === 'ACTIVE')
}

describe('end-to-end simulation — one logical probe cannot end up with two live ACTIVE identities', () => {
  it('blocks the promotion cycle when the legacy row is still ACTIVE', () => {
    const store: FakeStore = new Map()

    // Cycle 1: corpus has one probe in the slot. Real seeder behaviour: no
    // abandoned slugs yet, so the row is created under the base slug.
    const v1 = [probe('sim.one', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING)]
    expect(abandonedLegacyProbeSlugs(v1).size).toBe(0)
    const slugV1 = seedCanonicalSlug('sim.one', 'mcq', GradeBand.HIGH)
    store.set(slugV1, { status: 'ACTIVE' })
    expect(store.size).toBe(1)

    // Cycle 2: a second probe is authored into the same slot — the exact
    // real-world event that produced all three P-10 instances.
    const v2 = [...v1, probe('sim.one', 'mcq', GradeBand.HIGH, ProbeDifficulty.ADVANCED)]
    const abandoned = abandonedLegacyProbeSlugs(v2)
    expect(abandoned.has(slugV1)).toBe(true)

    // Guard 3's decision: the legacy slug is still live, so the seeder must
    // refuse rather than create the promoted rows.
    const orphans = liveOrphansIn(store, abandoned)
    expect(orphans).toEqual([slugV1])
    const guardBlocks = orphans.length > 0
    expect(guardBlocks).toBe(true)

    // Because the guard blocks, the write loop never runs for this cycle —
    // simulated by deliberately NOT writing anything when guardBlocks is true,
    // exactly as `process.exit(1)` prevents the probe loop from running in
    // the real script.
    if (!guardBlocks) {
      const resolve = buildProbeSlugResolver(v2)
      for (const p of v2) store.set(resolve(p), { status: 'ACTIVE' })
    }

    // The proof: after this cycle, the store still holds exactly the ONE
    // original row, unchanged — no second ACTIVE identity was created for
    // the same question under the promoted slug.
    expect(store.size).toBe(1)
    expect(store.get(slugV1)).toEqual({ status: 'ACTIVE' })
    const promotedSlug = seedCanonicalSlug('sim.one', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING)
    expect(store.has(promotedSlug)).toBe(false)
  })

  it('does NOT block once the legacy row has been deprecated (the P-10 remediation precedent)', () => {
    const store: FakeStore = new Map()
    const v1 = [probe('sim.two', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING)]
    const slugV1 = seedCanonicalSlug('sim.two', 'mcq', GradeBand.HIGH)
    // Simulates a human having applied the P-10 remediation to this slot's
    // legacy row before the seeder is run again.
    store.set(slugV1, { status: 'DEPRECATED' })

    const v2 = [...v1, probe('sim.two', 'mcq', GradeBand.HIGH, ProbeDifficulty.ADVANCED)]
    const abandoned = abandonedLegacyProbeSlugs(v2)
    expect(abandoned.has(slugV1)).toBe(true)

    const orphans = liveOrphansIn(store, abandoned)
    expect(orphans).toEqual([]) // DEPRECATED is not live — guard does not fire
    const guardBlocks = orphans.length > 0
    expect(guardBlocks).toBe(false)

    if (!guardBlocks) {
      const resolve = buildProbeSlugResolver(v2)
      for (const p of v2) store.set(resolve(p), { status: 'ACTIVE' })
    }

    // Both rungs now serve under their promoted slugs; the old row stays
    // deprecated (never deleted, never migrated) — matching P-10's own
    // no-delete, no-migration remediation exactly.
    expect(store.get(slugV1)).toEqual({ status: 'DEPRECATED' })
    expect(store.get(seedCanonicalSlug('sim.two', 'mcq', GradeBand.HIGH, ProbeDifficulty.DEVELOPING)))
      .toEqual({ status: 'ACTIVE' })
    expect(store.get(seedCanonicalSlug('sim.two', 'mcq', GradeBand.HIGH, ProbeDifficulty.ADVANCED)))
      .toEqual({ status: 'ACTIVE' })
    // Exactly one LIVE identity per rung — no duplicate ACTIVE row anywhere.
    const liveSlugs = [...store.entries()].filter(([, v]) => v.status === 'ACTIVE').map(([k]) => k)
    expect(new Set(liveSlugs).size).toBe(liveSlugs.length)
  })
})

// ─── The guard is wired into the real script, not merely mirrored here ─────

describe('Guard 3 is actually wired into scripts/brain/seed-knowledge-assets.ts', () => {
  it('imports the real detector rather than re-implementing it', () => {
    expect(SEEDER).toMatch(/abandonedLegacyProbeSlugs/)
    expect(SEEDER).toMatch(/import\s*\{[^}]*abandonedLegacyProbeSlugs[^}]*\}\s*from\s*'\.\.\/\.\.\/src\/lib\/teaching\/assets\/brainSeedAssets'/)
  })

  it('calls the detector against ALL_PROBES', () => {
    expect(SEEDER).toMatch(/abandonedLegacyProbeSlugs\(ALL_PROBES\)/)
  })

  it('queries live (non-DEPRECATED, non-RETIRED) rows scoped to the abandoned slugs before writing anything', () => {
    const guardStart = SEEDER.indexOf('abandonedLegacyProbeSlugs(ALL_PROBES)')
    expect(guardStart).toBeGreaterThan(-1)
    const guardBlock = SEEDER.slice(guardStart, guardStart + 1500)
    expect(guardBlock).toMatch(/canonicalSlug:\s*\{\s*in:\s*abandonedSlugs\s*\}/)
    expect(guardBlock).toMatch(/status:\s*\{\s*notIn:\s*\[AssetStatus\.DEPRECATED,\s*AssetStatus\.RETIRED\]\s*\}/)
    expect(guardBlock).toMatch(/process\.exit\(1\)/)
    // The abort happens strictly before the probe-creation loop, not after.
    const probeLoopStart = SEEDER.indexOf("for (const p of ALL_PROBES)")
    expect(probeLoopStart).toBeGreaterThan(guardStart)
  })

  it('is skipped in --dry-run, matching the loops below (no database touch in that mode)', () => {
    const guardStart = SEEDER.indexOf('abandonedLegacyProbeSlugs(ALL_PROBES)')
    const precedingIf = SEEDER.slice(0, guardStart).lastIndexOf('if (!dryRun)')
    expect(precedingIf).toBeGreaterThan(-1)
    // No other `if (!dryRun)` between this guard and the closest preceding
    // occurrence of it — i.e. the guard itself sits directly inside that gate.
    expect(SEEDER.slice(precedingIf, guardStart)).not.toMatch(/\n\s*\}\s*\n/)
  })

  it('the pre-existing KG and identity checks (Guard 1 / Guard 2) are still present, unremoved', () => {
    expect(SEEDER).toMatch(/canonical KG/)
    expect(SEEDER).toMatch(/validateSeedIdentities/)
    expect(SEEDER).toMatch(/Identity check passed/)
  })

  it('the P-11 revive path (by assetId) is untouched by this change', () => {
    expect(SEEDER).not.toMatch(/existing\.id\b/)
    expect(SEEDER).toMatch(/where:\s*\{\s*assetId:\s*existing\.assetId\s*\}/)
  })
})
