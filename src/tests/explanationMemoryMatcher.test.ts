/**
 * Pure-function tests for the Explanation Memory / Teaching Action
 * Repository matcher and Student State builder — no Prisma, no DB, matching
 * this suite's existing DB-independent convention.
 */
import { describe, it, expect } from 'vitest'
import { AssetStatus, GradeBand } from '@prisma/client'
import { scoreMatch, pickBest, tokenize, DEFAULT_CONFIDENCE_THRESHOLD, type MatchableAsset } from '@/lib/teaching/assets/matcher'
import { buildStudentState, gradeToGradeBand } from '@/lib/teaching/assets/studentState'

function makeAsset(overrides: Partial<MatchableAsset> = {}): MatchableAsset {
  return {
    assetId: 'a1',
    conceptId: 'phys.mech.gravity',
    language: 'en',
    gradeBand: GradeBand.HIGH,
    status: AssetStatus.ACTIVE,
    qualityScore: 0.5,
    qualityConfidence: 0.5,
    tags: ['physics', 'core_explanation'],
    incompatibilities: [],
    ...overrides,
  }
}

function makeState(overrides: Partial<Parameters<typeof buildStudentState>[0]> = {}) {
  return buildStudentState({
    conceptId: 'phys.mech.gravity',
    subjectSlug: 'physics',
    teachingLanguage: 'en',
    grade: 10,
    userMessage: 'explain gravity',
    ...overrides,
  })
}

describe('gradeToGradeBand', () => {
  it('maps grade to the expected band', () => {
    expect(gradeToGradeBand(1)).toBe(GradeBand.EARLY)
    expect(gradeToGradeBand(2)).toBe(GradeBand.EARLY)
    expect(gradeToGradeBand(4)).toBe(GradeBand.ELEMENTARY)
    expect(gradeToGradeBand(7)).toBe(GradeBand.MIDDLE)
    expect(gradeToGradeBand(11)).toBe(GradeBand.HIGH)
    expect(gradeToGradeBand(14)).toBe(GradeBand.UNDERGRADUATE)
  })

  it('defaults to ADULT when grade is absent (general learner)', () => {
    expect(gradeToGradeBand(null)).toBe(GradeBand.ADULT)
    expect(gradeToGradeBand(undefined)).toBe(GradeBand.ADULT)
  })
})

describe('scoreMatch — hard filters', () => {
  it('disqualifies a different concept', () => {
    const state = makeState()
    expect(scoreMatch(state, makeAsset({ conceptId: 'phys.mech.friction' }))).toBe(0)
  })

  it('disqualifies a non-ACTIVE asset (DRAFT is never served)', () => {
    const state = makeState()
    expect(scoreMatch(state, makeAsset({ status: AssetStatus.DRAFT }))).toBe(0)
  })

  it('disqualifies a different language', () => {
    const state = makeState()
    expect(scoreMatch(state, makeAsset({ language: 'ru' }))).toBe(0)
  })

  it('disqualifies an asset incompatible with an active misconception', () => {
    const state = makeState()
    const asset = makeAsset({ incompatibilities: ['phys.misconception.gravity-is-a-force-field'] })
    expect(scoreMatch(state, asset, { activeMisconceptionIds: ['phys.misconception.gravity-is-a-force-field'] })).toBe(0)
  })
})

describe('scoreMatch — scoring', () => {
  it('scores higher for an exact gradeBand match than a distant one', () => {
    const state = makeState({ grade: 10 }) // HIGH
    const exact = scoreMatch(state, makeAsset({ gradeBand: GradeBand.HIGH }))
    const distant = scoreMatch(state, makeAsset({ gradeBand: GradeBand.EARLY }))
    expect(exact).toBeGreaterThan(distant)
  })

  it('scores higher when tags overlap with the user message', () => {
    const state = makeState({ userMessage: 'can you explain gravity with a real-life example?' })
    const withTag = scoreMatch(state, makeAsset({ tags: ['physics', 'example'] }))
    const withoutTag = scoreMatch(state, makeAsset({ tags: ['physics', 'formal'] }))
    expect(withTag).toBeGreaterThan(withoutTag)
  })

  it('a well-matched, high-quality asset clears the default confidence threshold', () => {
    const state = makeState()
    const score = scoreMatch(state, makeAsset({ gradeBand: GradeBand.HIGH, qualityScore: 0.9, qualityConfidence: 0.9 }))
    expect(score).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('never exceeds 100', () => {
    const state = makeState({ userMessage: 'physics core_explanation' })
    const score = scoreMatch(state, makeAsset({ tags: ['physics', 'core_explanation'], qualityScore: 1, qualityConfidence: 1 }))
    expect(score).toBeLessThanOrEqual(100)
  })
})

describe('pickBest', () => {
  it('returns null when nothing clears the threshold', () => {
    const state = makeState()
    const candidates = [makeAsset({ gradeBand: GradeBand.EARLY, qualityScore: 0.1, qualityConfidence: 0.1, tags: [] })]
    expect(pickBest(state, candidates)).toBeNull()
  })

  it('returns the highest-scoring candidate above the threshold', () => {
    const state = makeState()
    const weak = makeAsset({ assetId: 'weak', gradeBand: GradeBand.HIGH, qualityScore: 0.5, qualityConfidence: 0.5 })
    const strong = makeAsset({ assetId: 'strong', gradeBand: GradeBand.HIGH, qualityScore: 0.95, qualityConfidence: 0.95 })
    const result = pickBest(state, [weak, strong])
    expect(result?.asset.assetId).toBe('strong')
  })

  it('respects a custom threshold', () => {
    const state = makeState()
    const candidates = [makeAsset({ gradeBand: GradeBand.MIDDLE, qualityScore: 0.2, qualityConfidence: 0.2, tags: [] })]
    expect(pickBest(state, candidates, {}, 10)).not.toBeNull()
    expect(pickBest(state, candidates, {}, 90)).toBeNull()
  })
})

describe('scoreMatch — HIGH↔ADULT intelligent compatibility (P0 fix)', () => {
  // Root cause this pins down: gradeToGradeBand(grade=null) defaults every
  // Library learner with no school grade on file to ADULT, but the vast
  // majority of authored Library content is written at HIGH band (209/216
  // physics concepts). Before this fix, a fresh ACTIVE HIGH-band asset
  // scored only 50 for an ADULT-classified student (distance=2, +0 bonus) —
  // permanently below the 65 threshold regardless of asset quality.
  it('a fresh ACTIVE HIGH-band asset clears threshold for an ADULT-classified student with zero tag overlap', () => {
    const state = makeState({ grade: undefined, userMessage: 'no matching tags here' })
    expect(state.gradeBand).toBe(GradeBand.ADULT)
    const asset = makeAsset({ gradeBand: GradeBand.HIGH, qualityScore: 0, qualityConfidence: 0, tags: [] })
    const confidence = scoreMatch(state, asset)
    expect(confidence).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('a fresh ACTIVE ADULT-band asset clears threshold for a HIGH-classified (grade 9-12) student', () => {
    const state = makeState({ grade: 10, userMessage: 'no matching tags here' })
    expect(state.gradeBand).toBe(GradeBand.HIGH)
    const asset = makeAsset({ gradeBand: GradeBand.ADULT, qualityScore: 0, qualityConfidence: 0, tags: [] })
    const confidence = scoreMatch(state, asset)
    expect(confidence).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('an exact gradeBand match still outranks a HIGH/ADULT-compatible one when both exist', () => {
    const state = makeState({ grade: undefined }) // -> ADULT
    const exact = makeAsset({ assetId: 'exact', gradeBand: GradeBand.ADULT, qualityScore: 0, qualityConfidence: 0, tags: [] })
    const compatible = makeAsset({ assetId: 'compatible', gradeBand: GradeBand.HIGH, qualityScore: 0, qualityConfidence: 0, tags: [] })
    expect(scoreMatch(state, exact)).toBeGreaterThan(scoreMatch(state, compatible))
    const result = pickBest(state, [compatible, exact])
    expect(result?.asset.assetId).toBe('exact')
  })

  it('does NOT extend the compatibility bonus to unrelated band pairs (e.g. EARLY vs MIDDLE)', () => {
    const state = makeState({ grade: 1 }) // -> EARLY
    expect(state.gradeBand).toBe(GradeBand.EARLY)
    const asset = makeAsset({ gradeBand: GradeBand.MIDDLE, qualityScore: 0, qualityConfidence: 0, tags: [] })
    const confidence = scoreMatch(state, asset)
    expect(confidence).toBeLessThan(DEFAULT_CONFIDENCE_THRESHOLD)
  })
})

describe('tokenize', () => {
  it('lowercases, strips punctuation, and drops short/stop words', () => {
    expect(tokenize('Can you explain Gravity, please?')).toEqual(['can', 'explain', 'gravity', 'please'])
  })

  it('drops stopwords and words of length <= 2', () => {
    expect(tokenize('is a to of in on')).toEqual([])
  })
})
