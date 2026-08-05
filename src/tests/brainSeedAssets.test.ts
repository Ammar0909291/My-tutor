/**
 * Wave 0 Step 1 — structural validation of the Educational Brain seed
 * assets (src/lib/teaching/assets/brainSeedAssets.ts). Pure data checks;
 * no DB, no KG file loads (the seed script itself re-validates concept
 * ids against the live canonical KGs at run time before writing).
 */
import { describe, it, expect } from 'vitest'
import {
  SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, seedCanonicalSlug,
} from '@/lib/teaching/assets/brainSeedAssets'
import {
  AUTHORED_EXPLANATIONS, AUTHORED_PROBES,
} from '@/lib/teaching/assets/authoredSeedAssets'

describe('brainSeedAssets (Wave 0 Step 1)', () => {
  it('covers exactly the four authored Educational Brain concepts', () => {
    const ids = new Set([
      ...SEED_EXPLANATIONS.map((e) => e.conceptId),
      ...SEED_PROBES.map((p) => p.conceptId),
    ])
    expect(ids).toEqual(new Set([
      'math.arith.fractions',
      'phys.mech.newtons-first-law',
      'eng.phonics.letter-sound-correspondence',
      'eng.phonics.phonemic-awareness',
    ]))
  })

  it('every asset cites its educational-brain source (Wave 0 traceability rule)', () => {
    for (const a of [...SEED_EXPLANATIONS, ...SEED_PROBES]) {
      expect(a.source).toMatch(/^educational-brain\/concepts\//)
    }
  })

  it('every explanation has non-trivial speakable content', () => {
    for (const e of SEED_EXPLANATIONS) {
      expect(e.content.length).toBeGreaterThan(80)
      expect(e.content).not.toMatch(/TODO|placeholder/i)
    }
  })

  it('canonical slugs are unique (one lineage per concept x kind x language x band)', () => {
    const slugs = [
      ...SEED_EXPLANATIONS.map((e) => seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)),
      ...SEED_PROBES.map((p) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)),
    ]
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(s).toContain(`:${SEED_LANGUAGE}:`)
  })

  it('every choice-based probe has exactly one correct choice and misconception-mapped distractors', () => {
    for (const p of SEED_PROBES.filter((p) => p.choices !== undefined)) {
      expect(p.choices).toBeDefined()
      const correct = p.choices!.filter((c) => c.isCorrect)
      expect(correct).toHaveLength(1)
      // Distractor science (assessment/03): at least one wrong choice maps to a
      // documented misconception, making a wrong answer diagnostic, not noise.
      const mapped = p.choices!.filter((c) => !c.isCorrect && c.misconceptionId)
      expect(mapped.length).toBeGreaterThan(0)
    }
  })

  it('every probe targets at least the misconception its distractors map to', () => {
    for (const p of SEED_PROBES) {
      for (const c of p.choices ?? []) {
        if (c.misconceptionId) {
          expect(p.targetedMisconceptions).toContain(c.misconceptionId)
        }
      }
    }
  })
})

/**
 * The same slug-uniqueness invariant, extended to the blueprint-grounded
 * corpus (authoredSeedAssets.ts). It was previously asserted ONLY over
 * brainSeedAssets' four concepts, so the array holding ~99% of the seed
 * content — including all 1,639 physics items — had no coverage at all.
 *
 * Why this matters: every seed writer dedupes by canonicalSlug and SKIPS
 * the extras (seed-knowledge-assets.ts, seed-physics-assets.ts,
 * instrumentation.ts all run `findFirst({where:{canonicalSlug}})` then
 * `continue`). Two authored items sharing one slug therefore means one is
 * silently discarded — on a clean first run, not just on re-runs, and
 * logged only as "skip (exists)". `items - distinctSlugs` is exactly the
 * number of authored assets that can never reach the database.
 */
describe('authoredSeedAssets — canonical slug uniqueness', () => {
  // Composed exactly as every seed writer composes it (ALL_EXPLANATIONS /
  // ALL_PROBES in seed-knowledge-assets.ts, seed-physics-assets.ts and
  // instrumentation.ts). Asserting over AUTHORED_* alone would miss
  // collisions BETWEEN the two arrays — and there is one: a physics probe
  // in SEED_PROBES shares a slug with authored siblings, so the true
  // discard count is 407, not the 406 visible from AUTHORED_* in isolation.
  const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS]
  const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES]

  const isPhysics = (conceptId: string) => conceptId.startsWith('phys.')
  const explanationSlug = (e: typeof ALL_EXPLANATIONS[number]) =>
    seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
  const probeSlug = (p: typeof ALL_PROBES[number]) =>
    seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)
  /** Authored items that collide onto an already-taken slug, i.e. are dropped. */
  const discarded = (slugs: string[]) => slugs.length - new Set(slugs).size

  it('every authored slug carries the seed language segment', () => {
    for (const s of [
      ...ALL_EXPLANATIONS.map(explanationSlug),
      ...ALL_PROBES.map(probeSlug),
    ]) {
      expect(s).toContain(`:${SEED_LANGUAGE}:`)
    }
  })

  it('explanations are collision-free — no authored explanation is ever discarded', () => {
    // Strict: holds for every subject today (1217 items -> 1217 slugs). The
    // per-slot difficulty ladder that collides on the probe side has no
    // explanation-side equivalent, so this is a real invariant, not a ratchet.
    expect(discarded(ALL_EXPLANATIONS.map(explanationSlug))).toBe(0)
  })

  it('non-physics probes are collision-free', () => {
    // Strict. Mathematics and English express probe variety through slug
    // dimensions the identity model actually carries (kind, gradeBand), so
    // they lose nothing. Any future subject that diverges fails here.
    const slugs = ALL_PROBES.filter((p) => !isPhysics(p.conceptId)).map(probeSlug)
    expect(discarded(slugs)).toBe(0)
  })

  it('physics probe collisions do not exceed the known baseline', () => {
    // RATCHET, not a target. Physics authored a per-slot difficulty ladder
    // (FOUNDATIONAL -> DEVELOPING -> PROFICIENT -> ADVANCED); difficulty is
    // not a segment of seedCanonicalSlug, so those variants collide and all
    // but the first are discarded. Resolving that is tracked separately and
    // is deliberately NOT attempted here — this test exists so the number
    // can only go DOWN. A new colliding probe fails immediately instead of
    // disappearing silently, which is what let this go unnoticed before.
    const KNOWN_DISCARDED = 407
    const slugs = ALL_PROBES.filter((p) => isPhysics(p.conceptId)).map(probeSlug)
    expect(discarded(slugs)).toBeLessThanOrEqual(KNOWN_DISCARDED)
  })
})
