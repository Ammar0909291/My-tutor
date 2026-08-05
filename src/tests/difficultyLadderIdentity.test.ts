/**
 * Remediation Item 6 — ADR 14 §13: difficulty as a first-class dimension.
 *
 * Before: a "difficulty ladder" (several probes authored for one
 * conceptId × probeKind × gradeBand slot at different rungs) collapsed twice
 * over — the seed identity could not tell the rungs apart, so all but one was
 * discarded before reaching the database; and the retrieval projection dropped
 * ProbeAsset.difficulty, so even a seeded ladder could never be ranked by it.
 *
 * After: ladder slots carry a difficulty segment in the seed identity, and
 * difficulty is a live ranking signal in scoreMatch.
 */
import { describe, it, expect } from 'vitest'
import { GradeBand, ProbeDifficulty, AssetStatus } from '@prisma/client'
import {
  SEED_PROBES, SEED_EXPLANATIONS, seedCanonicalSlug, buildProbeSlugResolver,
} from '@/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES, AUTHORED_EXPLANATIONS } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { BIOLOGY_PROBES } from '@/lib/teaching/assets/biologySeedAssets'
import { CS_PROBES } from '@/lib/teaching/assets/csSeedAssets'
import {
  scoreMatch, pickBest, difficultyProximityBonus, DEFAULT_CONFIDENCE_THRESHOLD,
  type MatchableAsset,
} from '@/lib/teaching/assets/matcher'
import { resolveTargetDifficulty, buildStudentState } from '@/lib/teaching/assets/studentState'
import { validateSeedIdentities } from '@/lib/teaching/assets/seedIdentityValidation'
import type { StudentState } from '@/lib/teaching/assets/studentState'

const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES, ...BIOLOGY_PROBES, ...CS_PROBES]
const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS]
const isPhysics = (id: string) => id.startsWith('phys.')
/** The pre-Item-6 identity, for backward-compatibility comparisons. */
const legacySlug = (p: { conceptId: string; probeKind: string; gradeBand: GradeBand }) =>
  seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand)

describe('seed identity — difficulty segment', () => {
  it('omits the segment when no difficulty is supplied (unchanged 4-part slug)', () => {
    expect(seedCanonicalSlug('phys.mech.force', 'mcq', GradeBand.HIGH))
      .toBe('phys.mech.force:mcq:en:high')
  })

  it('appends the rung when a difficulty is supplied', () => {
    expect(seedCanonicalSlug('phys.mech.force', 'mcq', GradeBand.HIGH, ProbeDifficulty.PROFICIENT))
      .toBe('phys.mech.force:mcq:en:high:proficient')
  })
})

describe('buildProbeSlugResolver — ladders extend, singletons do not', () => {
  const probe = (conceptId: string, difficulty: ProbeDifficulty) =>
    ({ conceptId, probeKind: 'mcq', gradeBand: GradeBand.HIGH, difficulty })

  it('leaves a singleton slot on its existing identity', () => {
    const set = [probe('c.one', ProbeDifficulty.DEVELOPING)]
    expect(buildProbeSlugResolver(set)(set[0])).toBe('c.one:mcq:en:high')
  })

  it('gives every rung of a ladder its own identity', () => {
    const set = [probe('c.two', ProbeDifficulty.FOUNDATIONAL), probe('c.two', ProbeDifficulty.ADVANCED)]
    const r = buildProbeSlugResolver(set)
    expect(r(set[0])).toBe('c.two:mcq:en:high:foundational')
    expect(r(set[1])).toBe('c.two:mcq:en:high:advanced')
    expect(r(set[0])).not.toBe(r(set[1]))
  })

  it('is deterministic — same dataset, same slugs', () => {
    const set = [probe('c.d', ProbeDifficulty.FOUNDATIONAL), probe('c.d', ProbeDifficulty.PROFICIENT)]
    expect(set.map(buildProbeSlugResolver(set))).toEqual(set.map(buildProbeSlugResolver(set)))
  })
})

describe('intentional ladders are now seedable', () => {
  const resolve = buildProbeSlugResolver(ALL_PROBES)

  it('no probe is discarded any more — every authored probe gets an identity', () => {
    const slugs = ALL_PROBES.map(resolve)
    expect(new Set(slugs).size).toBe(ALL_PROBES.length)
  })

  it('Item 3 now passes the full corpus that it previously (correctly) refused', () => {
    const v = validateSeedIdentities([
      ...ALL_EXPLANATIONS.map((e) => ({
        canonicalSlug: seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand),
        family: 'EXPLANATION' as const, conceptId: e.conceptId, subjectSlug: e.subjectSlug,
        familyKind: e.familyKind, gradeBand: String(e.gradeBand), preview: 'x',
      })),
      ...ALL_PROBES.map((p) => ({
        canonicalSlug: resolve(p),
        family: 'PROBE' as const, conceptId: p.conceptId, subjectSlug: p.subjectSlug,
        familyKind: p.probeKind, gradeBand: String(p.gradeBand), preview: 'x',
      })),
    ])
    expect(v.ok).toBe(true)
    expect(v.discardedItems).toBe(0)
  })

  it('Item 5 remains valid — no slot holds two probes at one rung', () => {
    const seen = new Map<string, number>()
    for (const p of ALL_PROBES) {
      const k = `${legacySlug(p)}::${p.difficulty}`
      seen.set(k, (seen.get(k) ?? 0) + 1)
    }
    expect([...seen.values()].filter((n) => n > 1)).toEqual([])
  })

  it('Item 3 still detects a genuine duplicate identity', () => {
    // Two probes identical on concept+kind+band AND rung remain unresolvable —
    // the difficulty segment must not paper that over.
    const set = [
      { conceptId: 'c.x', probeKind: 'mcq', gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING },
      { conceptId: 'c.x', probeKind: 'mcq', gradeBand: GradeBand.HIGH, difficulty: ProbeDifficulty.DEVELOPING },
    ]
    const r = buildProbeSlugResolver(set)
    const v = validateSeedIdentities(set.map((p) => ({
      canonicalSlug: r(p), family: 'PROBE' as const, conceptId: p.conceptId,
      subjectSlug: 'physics', familyKind: p.probeKind, gradeBand: String(p.gradeBand), preview: 'x',
    })))
    expect(v.ok).toBe(false)
    expect(v.discardedItems).toBe(1)
  })
})

describe('backward compatibility — subjects without ladders are untouched', () => {
  const resolve = buildProbeSlugResolver(ALL_PROBES)

  it('every non-physics probe keeps the exact identity it had before Item 6', () => {
    const changed = ALL_PROBES.filter((p) => !isPhysics(p.conceptId) && resolve(p) !== legacySlug(p))
    expect(changed).toEqual([])
  })

  it('physics singleton slots also keep their existing identity', () => {
    const counts = new Map<string, number>()
    for (const p of ALL_PROBES) counts.set(legacySlug(p), (counts.get(legacySlug(p)) ?? 0) + 1)
    const singletons = ALL_PROBES.filter((p) => counts.get(legacySlug(p)) === 1)
    expect(singletons.length).toBeGreaterThan(0)
    expect(singletons.filter((p) => resolve(p) !== legacySlug(p))).toEqual([])
  })

  it('explanation identities are entirely unaffected', () => {
    for (const e of ALL_EXPLANATIONS.slice(0, 50)) {
      expect(seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)).not.toMatch(/:(foundational|developing|proficient|advanced)$/)
    }
  })
})

describe('difficultyProximityBonus', () => {
  const { FOUNDATIONAL, DEVELOPING, PROFICIENT, ADVANCED } = ProbeDifficulty
  it('rewards proximity on the ladder', () => {
    expect(difficultyProximityBonus(DEVELOPING, DEVELOPING)).toBe(10)
    expect(difficultyProximityBonus(DEVELOPING, PROFICIENT)).toBe(6)
    expect(difficultyProximityBonus(FOUNDATIONAL, PROFICIENT)).toBe(3)
    expect(difficultyProximityBonus(FOUNDATIONAL, ADVANCED)).toBe(0)
  })

  it('contributes nothing when either side is absent — the backward-compatible path', () => {
    expect(difficultyProximityBonus(undefined, ADVANCED)).toBe(0)
    expect(difficultyProximityBonus(DEVELOPING, null)).toBe(0)
    expect(difficultyProximityBonus(undefined, undefined)).toBe(0)
  })

  it('is a bonus, never a penalty', () => {
    for (const t of DIFFS) for (const a of DIFFS) expect(difficultyProximityBonus(t, a)).toBeGreaterThanOrEqual(0)
  })
})
const DIFFS = [ProbeDifficulty.FOUNDATIONAL, ProbeDifficulty.DEVELOPING, ProbeDifficulty.PROFICIENT, ProbeDifficulty.ADVANCED]

describe('scoreMatch uses difficulty, without changing pre-ladder behaviour', () => {
  const state: StudentState = {
    conceptId: 'c', subjectSlug: 'physics', language: 'en',
    gradeBand: GradeBand.HIGH, userMessage: 'help', targetDifficulty: ProbeDifficulty.DEVELOPING,
  }
  const asset = (difficulty?: ProbeDifficulty | null): MatchableAsset => ({
    assetId: `a-${difficulty ?? 'none'}`, conceptId: 'c', language: 'en', gradeBand: GradeBand.HIGH,
    status: AssetStatus.ACTIVE, qualityScore: 0, qualityConfidence: 0, tags: [], incompatibilities: [], difficulty,
  })

  it('ranks the matching rung above a distant one', () => {
    expect(scoreMatch(state, asset(ProbeDifficulty.DEVELOPING)))
      .toBeGreaterThan(scoreMatch(state, asset(ProbeDifficulty.ADVANCED)))
  })

  it('orders the whole ladder by proximity', () => {
    const scores = DIFFS.map((d) => scoreMatch(state, asset(d)))
    expect(scores[1]).toBeGreaterThan(scores[0]) // DEVELOPING beats FOUNDATIONAL
    expect(scores[1]).toBeGreaterThan(scores[2])
    expect(scores[2]).toBeGreaterThan(scores[3])
  })

  it('scores an asset with no difficulty exactly as it did before Item 6', () => {
    // 50 base + 25 exact gradeBand = 75, the documented pre-Item-6 value.
    expect(scoreMatch(state, asset(null))).toBe(75)
    expect(scoreMatch({ ...state, targetDifficulty: undefined }, asset(ProbeDifficulty.ADVANCED))).toBe(75)
  })

  it('never drops an asset below the serving threshold', () => {
    for (const d of [...DIFFS, null, undefined]) {
      expect(scoreMatch(state, asset(d))).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
    }
  })
})

describe('ladders are retrievable — deterministic selection', () => {
  const rung = (d: ProbeDifficulty): MatchableAsset => ({
    assetId: `asset-${d}`, conceptId: 'c', language: 'en', gradeBand: GradeBand.HIGH,
    status: AssetStatus.ACTIVE, qualityScore: 0, qualityConfidence: 0, tags: [], incompatibilities: [], difficulty: d,
  })
  const ladder = DIFFS.map(rung)
  const stateFor = (targetDifficulty?: ProbeDifficulty): StudentState => ({
    conceptId: 'c', subjectSlug: 'physics', language: 'en',
    gradeBand: GradeBand.HIGH, userMessage: 'help', targetDifficulty,
  })

  it.each(DIFFS)('a learner targeting %s is served that rung', (d) => {
    expect(pickBest(stateFor(d), ladder)!.asset.assetId).toBe(`asset-${d}`)
  })

  it('is order-independent and repeatable', () => {
    const s = stateFor(ProbeDifficulty.PROFICIENT)
    const a = pickBest(s, ladder)!.asset.assetId
    const b = pickBest(s, [...ladder].reverse())!.asset.assetId
    expect(a).toBe('asset-PROFICIENT')
    expect(b).toBe('asset-PROFICIENT')
  })

  it('still returns a candidate when the learner has no target rung', () => {
    expect(pickBest(stateFor(undefined), ladder)).not.toBeNull()
  })
})

describe('resolveTargetDifficulty', () => {
  it('maps self-reported experience onto the ladder', () => {
    expect(resolveTargetDifficulty('beginner')).toBe(ProbeDifficulty.FOUNDATIONAL)
    expect(resolveTargetDifficulty('intermediate')).toBe(ProbeDifficulty.DEVELOPING)
    expect(resolveTargetDifficulty('expert')).toBe(ProbeDifficulty.PROFICIENT)
  })

  it('falls back to grade band only where the band is unambiguous', () => {
    expect(resolveTargetDifficulty(undefined, GradeBand.EARLY)).toBe(ProbeDifficulty.FOUNDATIONAL)
    expect(resolveTargetDifficulty(undefined, GradeBand.UNDERGRADUATE)).toBe(ProbeDifficulty.PROFICIENT)
    // MIDDLE/HIGH/ADULT span the ladder — stay unset rather than guess.
    expect(resolveTargetDifficulty(undefined, GradeBand.HIGH)).toBeUndefined()
    expect(resolveTargetDifficulty(undefined, GradeBand.ADULT)).toBeUndefined()
  })

  it('buildStudentState populates it without any new caller argument', () => {
    const s = buildStudentState({
      conceptId: 'c', subjectSlug: 'physics', teachingLanguage: 'en',
      currentLevel: 'beginner', userMessage: 'hi',
    })
    expect(s.targetDifficulty).toBe(ProbeDifficulty.FOUNDATIONAL)
  })
})
