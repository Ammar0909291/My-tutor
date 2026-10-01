import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { ProbeDifficulty, AssetStatus, type GradeBand } from '@prisma/client'
import { servedByLiveLadderSibling, bootstrapPrefetchSlugs, PREFETCH_SLUG_BUDGET } from '../instrumentation'
import {
  seedCanonicalSlug, buildProbeSlugResolver, abandonedLegacyProbeSlugs, SEED_REVIVABLE_STATUSES,
} from '../lib/teaching/assets/brainSeedAssets'

/**
 * EGRESS-4 — the full bootstrap prefetch is bounded to the slugs its three
 * consumers look up (existing / liveAbandoned / liveSeedSlugs). The critical
 * property: the P-10-FOLLOW-UP-D ladder-sibling guard must still see the
 * manual seeder's 5-segment rows, which a naive `expectedSlugs`-only bound
 * would drop (re-creating the 45 duplicate ACTIVE mathematics identities).
 */

const DIFFS = Object.values(ProbeDifficulty) as string[]
const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')
const BOOTSTRAP_FILES = ['brainSeedAssets.ts', 'authoredSeedAssets.ts', 'chemistrySeedAssets.ts',
  'physicsBandGapAssets.ts', 'physicsDepthSeedAssets.ts', 'chemistryDepthSeedAssets.ts']

interface Probe { conceptId: string; probeKind: string; gradeBand: GradeBand; difficulty: ProbeDifficulty }
interface Row { canonicalSlug: string; status: AssetStatus }

async function load(files: string[]): Promise<Probe[]> {
  const out: Probe[] = []
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [n, v] of Object.entries(mod)) if (Array.isArray(v) && n.endsWith('PROBES')) out.push(...(v as Probe[]))
  }
  return out
}
const allFiles = () => readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
const base = (p: Probe) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)

/** The hook's probe planning over a prefetch that returned `rows`. */
function plan(corpus: Probe[], rows: Row[]) {
  const existing = new Set<string>()
  const live = new Set<string>()
  for (const r of rows) {
    existing.add(r.canonicalSlug)
    if (!SEED_REVIVABLE_STATUSES.includes(r.status)) live.add(r.canonicalSlug)
  }
  const resolve = buildProbeSlugResolver(corpus as never)
  const created: string[] = []
  let siblingCovered = 0
  for (const p of corpus) {
    const slug = resolve(p as never)
    if (existing.has(slug)) continue
    if (servedByLiveLadderSibling(slug, base(p), live, DIFFS)) { siblingCovered++; continue }
    created.push(slug)
  }
  return { created, siblingCovered }
}

describe('bootstrapPrefetchSlugs', () => {
  it('is the union of expected, abandoned and singleton-slot ladder siblings', () => {
    const out = new Set(bootstrapPrefetchSlugs(['e1', 'e2'], ['old'], ['b'], ['FOUNDATIONAL', 'ADVANCED'])!)
    expect(out).toEqual(new Set(['e1', 'e2', 'old', 'b:foundational', 'b:advanced']))
  })

  it('returns null over budget, so the caller keeps the unbounded read (never a new failure mode)', () => {
    expect(bootstrapPrefetchSlugs(['a', 'b', 'c'], [], [], DIFFS, 2)).toBeNull()
    expect(PREFETCH_SLUG_BUDGET).toBeLessThan(65_535)
  })
})

describe('the real 45-slot divergence survives the bound', () => {
  it('bounded prefetch plans EXACTLY what the unbounded one did; a naive expected-only bound reproduces the 45 duplicates', async () => {
    const manual = await load(allFiles())
    const boot = await load(BOOTSTRAP_FILES)
    const slotCount = (ps: Probe[]) => ps.reduce((m, p) => m.set(base(p), (m.get(base(p)) ?? 0) + 1), new Map<string, number>())
    const mCount = slotCount(manual), bCount = slotCount(boot)
    const divergent = new Set([...mCount].filter(([s, n]) => n > 1 && bCount.get(s) === 1).map(([s]) => s))
    expect(divergent.size).toBe(45)

    // Table state: the manual seeder's 90 live 5-segment ladder rows, plus a
    // historical row no consumer looks up (must be excluded by the bound).
    const mResolve = buildProbeSlugResolver(manual as never)
    const table: Row[] = [
      ...manual.filter((p) => divergent.has(base(p))).map((p) => ({ canonicalSlug: mResolve(p as never), status: AssetStatus.ACTIVE })),
      { canonicalSlug: 'historical.unrelated:mcq:en:high:advanced', status: AssetStatus.ACTIVE },
    ]

    const bResolve = buildProbeSlugResolver(boot as never)
    const expected = boot.map((p) => bResolve(p as never))
    const singletons = boot.filter((p) => bResolve(p as never) === base(p)).map(base)
    const bound = new Set(bootstrapPrefetchSlugs(expected, abandonedLegacyProbeSlugs(boot as never), singletons, DIFFS)!)

    const unbounded = plan(boot, table)
    const bounded = plan(boot, table.filter((r) => bound.has(r.canonicalSlug)))
    const naive = plan(boot, table.filter((r) => new Set(expected).has(r.canonicalSlug)))

    expect(bound.has('historical.unrelated:mcq:en:high:advanced')).toBe(false)   // the saving
    expect(bounded.siblingCovered).toBe(45)                                       // guard still fires
    expect(bounded.created).toEqual(unbounded.created)                            // identical plan
    expect(naive.created.filter((s) => divergent.has(s)).length).toBe(45)         // negative control
  }, 60_000)
})

describe('the hook uses the bound on the full prefetch', () => {
  it('builds prefetchSlugs from expected + abandoned + singleton siblings and falls back when null', () => {
    const src = readFileSync(path.join(__dirname, '..', 'instrumentation.ts'), 'utf8')
    expect(src).toMatch(/const prefetchSlugs = bootstrapPrefetchSlugs\(\s*expectedSlugs,\s*abandonedSlugs,/)
    expect(src).toMatch(/canonicalSlug: \{ in: prefetchSlugs \}/)
    expect(src).toMatch(/: seedOwnershipWhere\(\)\) as never,/)   // unbounded fallback kept
    expect(src).not.toMatch(/assetIdentity\.count\(\s*\)/)
  })
})
