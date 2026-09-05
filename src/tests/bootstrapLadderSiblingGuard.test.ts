/**
 * P-10-FOLLOW-UP-D — the bootstrap must not duplicate a slot the other writer
 * already serves as a ladder.
 *
 * THE DEFECT (P-10-FOLLOW-UP-C, docs/CLAUDE_HANDOVER.md §9w, CATEGORY 3).
 * The manual seeder's corpus holds 45 mathematics slots as ladders; this
 * bootstrap's narrower corpus holds them as singletons. Both writers own the
 * same rows, and the partial unique index keys on the canonicalSlug STRING, so
 * `…:middle` and `…:middle:developing` are different keys and both can be
 * ACTIVE. Direction A — seeder first, bootstrap second — therefore ended with
 * 45 live 4-segment duplicates of questions already served. Step 0.8 is silent
 * there, correctly: from the bootstrap's own corpus the slot IS a singleton, so
 * nothing is abandoned.
 *
 * WHAT THIS FILE PROVES, behaviourally rather than by reading source:
 *   A–F  the helper's exact semantics, including the two states that must NOT
 *        suppress (DEPRECATED / RETIRED siblings) and the ones that must not
 *        match at all (unrelated slug, different concept, no sibling).
 *   G    Step 0.8's detector is untouched by this change.
 *   H    the guard consumes the existing prefetch — ONE query, guard or no guard.
 *   I    a built-in negative control: the same simulation with the guard
 *        disabled reproduces exactly the 45 duplicates, so this file cannot
 *        pass vacuously if the guard is ever removed.
 *   +    a corpus-level regression over the REAL 45 divergent slots.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { GradeBand, ProbeDifficulty, AssetStatus } from '@prisma/client'
import { servedByLiveLadderSibling } from '../instrumentation'
import {
  seedCanonicalSlug, buildProbeSlugResolver, abandonedLegacyProbeSlugs,
  SEED_REVIVABLE_STATUSES,
} from '../lib/teaching/assets/brainSeedAssets'

const DIFFS = Object.values(ProbeDifficulty) as string[]
const BASE = 'math.arith.addition:mcq:en:elementary'

// ── A–F: the helper's semantics ─────────────────────────────────────────────

describe('servedByLiveLadderSibling', () => {
  it('A. a 4-segment candidate with a LIVE 5-segment sibling is covered', () => {
    const live = new Set([`${BASE}:foundational`])
    expect(servedByLiveLadderSibling(BASE, BASE, live, DIFFS)).toBe(true)
  })

  it('B. a DEPRECATED sibling does NOT suppress — the slot is genuinely uncovered', () => {
    // A deprecated row is not served (findBestProbe filters on ACTIVE), so
    // suppressing here would remove content rather than deduplicate it. The
    // set only ever contains live slugs, so a deprecated sibling is absent.
    const live = new Set<string>() // sibling exists in the table but is DEPRECATED
    expect(servedByLiveLadderSibling(BASE, BASE, live, DIFFS)).toBe(false)
  })

  it('C. a RETIRED sibling does NOT suppress either', () => {
    expect(SEED_REVIVABLE_STATUSES).toContain(AssetStatus.RETIRED)
    const live = new Set<string>()
    expect(servedByLiveLadderSibling(BASE, BASE, live, DIFFS)).toBe(false)
  })

  it('D. an unrelated 5-segment slug never suppresses', () => {
    const live = new Set([
      'math.arith.subtraction:mcq:en:elementary:foundational', // different concept
      'math.arith.addition:mcq:en:middle:foundational',        // different band
      'math.arith.addition:misconception_probe:en:elementary:foundational', // different kind
      `${BASE}-extra:foundational`,                            // prefix look-alike
      `${BASE}:notarung`,                                      // not a difficulty
    ])
    expect(servedByLiveLadderSibling(BASE, BASE, live, DIFFS)).toBe(false)
  })

  it('E. no sibling at all leaves the normal creation path alone', () => {
    expect(servedByLiveLadderSibling(BASE, BASE, new Set(), DIFFS)).toBe(false)
  })

  it('F. multiple live siblings still resolve to a single safe skip', () => {
    const live = new Set([`${BASE}:foundational`, `${BASE}:developing`, `${BASE}:advanced`])
    expect(servedByLiveLadderSibling(BASE, BASE, live, DIFFS)).toBe(true)
  })

  it('a candidate that ALREADY carries a difficulty is never suppressed', () => {
    // If the resolver appended a rung, this writer agrees the slot is a ladder
    // and its own identity is the correct one — there is nothing to defer to.
    const candidate = `${BASE}:developing`
    const live = new Set([`${BASE}:foundational`, `${BASE}:developing`])
    expect(servedByLiveLadderSibling(candidate, BASE, live, DIFFS)).toBe(false)
  })

  it('matches every rung of the enum, and only by exact construction', () => {
    for (const d of DIFFS) {
      const live = new Set([`${BASE}:${d.toLowerCase()}`])
      expect(servedByLiveLadderSibling(BASE, BASE, live, DIFFS)).toBe(true)
      // upper-case is what the enum carries; the slug is lower-cased, so the
      // raw enum value must NOT match — this is the casing bug that would have
      // made the guard silently dead.
      expect(servedByLiveLadderSibling(BASE, BASE, new Set([`${BASE}:${d}`]), DIFFS))
        .toBe(d.toLowerCase() === d)
    }
  })
})

// ── The bootstrap's planning loop, simulated with the REAL pieces ────────────

const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')
const BOOTSTRAP_FILES = ['brainSeedAssets.ts', 'authoredSeedAssets.ts', 'chemistrySeedAssets.ts',
  'physicsBandGapAssets.ts', 'physicsDepthSeedAssets.ts', 'chemistryDepthSeedAssets.ts']

interface Probe { conceptId: string; probeKind: string; gradeBand: GradeBand; difficulty: ProbeDifficulty; stem?: string }
interface Row { canonicalSlug: string; status: AssetStatus }

async function load(files: string[]): Promise<Probe[]> {
  const out: Probe[] = []
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [n, v] of Object.entries(mod)) {
      if (Array.isArray(v) && n.endsWith('PROBES')) out.push(...(v as Probe[]))
    }
  }
  return out
}
const allFiles = () => readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))

/**
 * Mirrors the hook's probe planning loop: ONE prefetch, an `existing` map and a
 * live-slug set built in that same pass, then a per-probe decision. The two
 * decisions that matter are the REAL exported functions, not copies.
 */
function planProbeCreates(corpus: Probe[], rows: Row[], opts: { guard: boolean }) {
  let queries = 0
  queries++ // the single prefetch — everything below is in memory
  const existing = new Map<string, Row>()
  const liveSeedSlugs = new Set<string>()
  for (const r of rows) {
    existing.set(r.canonicalSlug, r)
    if (!SEED_REVIVABLE_STATUSES.includes(r.status)) liveSeedSlugs.add(r.canonicalSlug)
  }
  const resolve = buildProbeSlugResolver(corpus as never)
  const created: string[] = []
  let siblingCovered = 0
  for (const p of corpus) {
    const slug = resolve(p as never)
    if (existing.has(slug)) continue
    if (opts.guard && servedByLiveLadderSibling(
      slug, seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand), liveSeedSlugs, DIFFS,
    )) { siblingCovered++; continue }
    created.push(slug)
  }
  return { created, queries, siblingCovered }
}

describe('the planning loop with the guard in place', () => {
  const probe = (conceptId: string, difficulty: ProbeDifficulty): Probe =>
    ({ conceptId, probeKind: 'mcq', gradeBand: GradeBand.HIGH, difficulty })

  it('H. one query whether the guard fires or not — it reads the prefetch only', () => {
    const corpus = [probe('sim.a', ProbeDifficulty.DEVELOPING)]
    const base = seedCanonicalSlug('sim.a', 'mcq', GradeBand.HIGH)
    const fires = planProbeCreates(corpus, [{ canonicalSlug: `${base}:advanced`, status: AssetStatus.ACTIVE }], { guard: true })
    const quiet = planProbeCreates(corpus, [], { guard: true })
    expect(fires.queries).toBe(1)
    expect(quiet.queries).toBe(1)
    expect(fires.created).toEqual([])
    expect(quiet.created).toEqual([base])
  })

  it('skips only the covered slot, never its neighbours', () => {
    const corpus = [probe('sim.covered', ProbeDifficulty.DEVELOPING), probe('sim.open', ProbeDifficulty.DEVELOPING)]
    const covered = seedCanonicalSlug('sim.covered', 'mcq', GradeBand.HIGH)
    const open = seedCanonicalSlug('sim.open', 'mcq', GradeBand.HIGH)
    const r = planProbeCreates(corpus, [{ canonicalSlug: `${covered}:advanced`, status: AssetStatus.ACTIVE }], { guard: true })
    expect(r.created).toEqual([open])
    expect(r.siblingCovered).toBe(1)
  })

  it('a DEPRECATED sibling still lets the slot be seeded (end to end)', () => {
    const corpus = [probe('sim.dep', ProbeDifficulty.DEVELOPING)]
    const base = seedCanonicalSlug('sim.dep', 'mcq', GradeBand.HIGH)
    const r = planProbeCreates(corpus, [{ canonicalSlug: `${base}:advanced`, status: AssetStatus.DEPRECATED }], { guard: true })
    expect(r.created).toEqual([base])
    expect(r.siblingCovered).toBe(0)
  })

  it('an existing row under our OWN slug is still the ordinary dedup, not a sibling skip', () => {
    const corpus = [probe('sim.dup', ProbeDifficulty.DEVELOPING)]
    const base = seedCanonicalSlug('sim.dup', 'mcq', GradeBand.HIGH)
    const r = planProbeCreates(corpus, [{ canonicalSlug: base, status: AssetStatus.ACTIVE }], { guard: true })
    expect(r.created).toEqual([])
    expect(r.siblingCovered).toBe(0)
  })
})

// ── Corpus-level regression over the REAL 45, with a built-in control ───────

describe('the real 45-slot divergence cannot produce a duplicate', () => {
  it('I. guard ON creates 0 of the 45; guard OFF creates exactly 45 (negative control)', async () => {
    const manual = await load(allFiles())
    const boot = await load(BOOTSTRAP_FILES)

    // The real divergent slots: a ladder in the manual corpus, a singleton here.
    const slot = (p: Probe) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
    const count = (ps: Probe[]) => ps.reduce((m, p) => m.set(slot(p), (m.get(slot(p)) ?? 0) + 1), new Map<string, number>())
    const mCount = count(manual), bCount = count(boot)
    const divergent = [...mCount].filter(([s, n]) => n > 1 && bCount.get(s) === 1).map(([s]) => s)
    expect(divergent.length).toBe(45)

    // Direction A's starting state: the manual seeder has already written the
    // richer 5-segment identities, ACTIVE. Nothing exists under the 4-segment
    // slugs, which is exactly why the bootstrap used to create them.
    const mResolve = buildProbeSlugResolver(manual as never)
    const divergentSet = new Set(divergent)
    const rows: Row[] = manual
      .filter((p) => divergentSet.has(slot(p)))
      .map((p) => ({ canonicalSlug: mResolve(p as never), status: AssetStatus.ACTIVE }))
    expect(rows.length).toBe(90) // two rungs per slot
    expect(rows.every((r) => !divergentSet.has(r.canonicalSlug))).toBe(true)

    const withGuard = planProbeCreates(boot, rows, { guard: true })
    const withoutGuard = planProbeCreates(boot, rows, { guard: false })

    // THE FIX: not one of the 45 four-segment identities is created.
    expect(withGuard.created.filter((s) => divergentSet.has(s))).toEqual([])
    expect(withGuard.siblingCovered).toBe(45)

    // THE CONTROL: without the guard the defect reproduces exactly, so this
    // test cannot pass vacuously if the guard is removed.
    expect(withoutGuard.created.filter((s) => divergentSet.has(s)).length).toBe(45)

    // And nothing else changed: the guard suppressed those 45 and nothing more.
    expect(withoutGuard.created.length - withGuard.created.length).toBe(45)
  }, 60_000)

  it('the hook actually CALLS the guard in its probe loop, in the right place', () => {
    // The simulation above proves the ALGORITHM. Without this, deleting the
    // call from the loop would leave every test above green while the defect
    // returned — the replica-drift trap CLAUDE.md records from R3. Behavioural
    // testing of the loop itself needs a database, so wiring is asserted here.
    const CODE = readFileSync(path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
    const loop = CODE.slice(CODE.indexOf('for (const p of ALL_PROBES) {'), CODE.indexOf('THE FLUSH'))
    expect(loop.length).toBeGreaterThan(200)

    // called, with the base slug derived the same way the resolver derives it
    expect(loop).toMatch(/servedByLiveLadderSibling\(/)
    expect(loop).toMatch(/seedCanonicalSlug\(p\.conceptId, p\.probeKind, p\.gradeBand\)/)
    expect(loop).toMatch(/liveSeedSlugs/)

    // AFTER the ordinary dedup and BEFORE the create
    const dupAt = loop.indexOf('const dup = existing.get(canonicalSlug)')
    const guardAt = loop.indexOf('servedByLiveLadderSibling(')
    const createAt = loop.indexOf('const assetId = randomUUID()')
    expect(dupAt).toBeGreaterThan(-1)
    expect(guardAt).toBeGreaterThan(dupAt)
    expect(createAt).toBeGreaterThan(guardAt)

    // a per-slot SKIP, never an abort, and never framed as human cleanup
    const guardBlock = loop.slice(guardAt, createAt)
    expect(guardBlock).toMatch(/continue/)
    expect(guardBlock).not.toMatch(/\breturn\b/)
    expect(guardBlock).not.toMatch(/console\.(error|warn)/)
    // and it adds no database call of its own
    expect(guardBlock).not.toMatch(/prisma\./)

    // the live-slug set is filled by the EXISTING prefetch pass, not a new read
    const prefetch = CODE.slice(CODE.indexOf('const liveSeedSlugs = new Set<string>()'),
      CODE.indexOf('if (liveAbandoned.length > 0) {'))
    expect(prefetch).toMatch(/liveSeedSlugs\.add\(row\.canonicalSlug\)/)
    expect([...prefetch.matchAll(/prisma\.\w+\./g)].map((m) => m[0])).toEqual(['prisma.assetIdentity.'])
  })

  it('G. Step 0.8 abandonedLegacyProbeSlugs is untouched by this change', async () => {
    const boot = await load(BOOTSTRAP_FILES)
    const manual = await load(allFiles())
    const bAband = abandonedLegacyProbeSlugs(boot as never)
    const mAband = abandonedLegacyProbeSlugs(manual as never)
    // The measured values from §9v/§9w, unchanged.
    expect(bAband.size).toBe(429)
    expect(mAband.size).toBe(711)
    // And the detector still says nothing about the 45 — which is correct, and
    // is precisely why this separate guard had to exist.
    const slot = (p: Probe) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
    const count = (ps: Probe[]) => ps.reduce((m, p) => m.set(slot(p), (m.get(slot(p)) ?? 0) + 1), new Map<string, number>())
    const mCount = count(manual), bCount = count(boot)
    const divergent = [...mCount].filter(([s, n]) => n > 1 && bCount.get(s) === 1).map(([s]) => s)
    expect(divergent.filter((s) => bAband.has(s))).toEqual([])
  }, 60_000)
})
