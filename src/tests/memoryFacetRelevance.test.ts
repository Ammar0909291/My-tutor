/**
 * P1 — Memory retrieval facet relevance (2026-08-22).
 *
 * ROOT CAUSE: `scoreMatch`'s hard disqualifiers were conceptId / status /
 * language / active-misconception-incompatibility only. `tags` — the field
 * this codebase already uses to represent which FACET of a concept a piece
 * of content covers — fed only into a capped BONUS (`tagOverlap`, max 15 of
 * 100) scored against the raw learner message. A concept + exact-gradeBand
 * match alone already reaches 75, clearing `DEFAULT_CONFIDENCE_THRESHOLD`
 * (65) with zero facet relevance — so an asset from the right CONCEPT but
 * the wrong FACET of it could be served whenever a caller actually needed a
 * specific facet.
 *
 * FIX: `MatchOptions.requiredTags` — when a caller supplies it (non-empty),
 * an asset must carry at least one of the required tags or it is hard-
 * disqualified (score 0), exactly like a conceptId or language mismatch.
 * Omitted/empty (every existing call site) is unchanged: `tags` keep working
 * purely as the pre-existing soft bonus.
 */
import { describe, it, expect } from 'vitest'
import { AssetStatus, GradeBand } from '@prisma/client'
import { scoreMatch, pickBest, DEFAULT_CONFIDENCE_THRESHOLD, type MatchableAsset } from '@/lib/teaching/assets/matcher'
import { buildStudentState } from '@/lib/teaching/assets/studentState'

function makeAsset(overrides: Partial<MatchableAsset> = {}): MatchableAsset {
  return {
    assetId: 'a1',
    conceptId: 'math.arith.fractions',
    language: 'en',
    gradeBand: GradeBand.HIGH,
    status: AssetStatus.ACTIVE,
    qualityScore: 0.5,
    qualityConfidence: 0.5,
    tags: ['fractions', 'core_explanation'],
    incompatibilities: [],
    ...overrides,
  }
}

function makeState(overrides: Partial<Parameters<typeof buildStudentState>[0]> = {}) {
  return buildStudentState({
    conceptId: 'math.arith.fractions',
    subjectSlug: 'mathematics',
    teachingLanguage: 'en',
    grade: 10,
    userMessage: 'explain fractions',
    ...overrides,
  })
}

describe('scoreMatch — facet relevance (requiredTags)', () => {
  it('same concept + correct facet -> allowed (clears the default threshold)', () => {
    const state = makeState()
    const asset = makeAsset({ tags: ['denominator', 'core_explanation'] })
    const score = scoreMatch(state, asset, { requiredTags: ['denominator'] })
    expect(score).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('same concept + wrong facet -> rejected (hard-disqualified, score 0)', () => {
    const state = makeState()
    const asset = makeAsset({ tags: ['numerator', 'core_explanation'] })
    const score = scoreMatch(state, asset, { requiredTags: ['denominator'] })
    expect(score).toBe(0)
  })

  it('same concept + wrong facet is ranked below a matching-facet candidate via pickBest', () => {
    const state = makeState()
    const wrongFacet = makeAsset({ assetId: 'wrong', tags: ['numerator'] })
    const rightFacet = makeAsset({ assetId: 'right', tags: ['denominator'] })
    const best = pickBest(state, [wrongFacet, rightFacet], { requiredTags: ['denominator'] })
    expect(best?.asset.assetId).toBe('right')
  })

  it('different concept + explicit relevant facet match -> still hard-disqualified (concept is prior)', () => {
    // Facet relevance never overrides the concept boundary — a matching
    // facet on the WRONG concept must still be rejected, preserving the
    // pre-existing concept-first behaviour.
    const state = makeState()
    const wrongConcept = makeAsset({ conceptId: 'math.arith.decimals', tags: ['denominator'] })
    const score = scoreMatch(state, wrongConcept, { requiredTags: ['denominator'] })
    expect(score).toBe(0)
  })

  it('no facet requirement -> preserves existing behaviour exactly (tags remain a soft bonus only)', () => {
    const state = makeState()
    const asset = makeAsset({ tags: ['numerator'] }) // facet that would be "wrong" if required
    const withoutOption = scoreMatch(state, asset)
    const withEmptyArray = scoreMatch(state, asset, { requiredTags: [] })
    // Neither call disqualifies on facet — both reach the same score, and
    // that score is unaffected by the (irrelevant) tag content since none of
    // the asset's tags overlap the learner's message tokens either.
    expect(withoutOption).toBe(withEmptyArray)
    expect(withoutOption).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('requiredTags is case-insensitive', () => {
    const state = makeState()
    const asset = makeAsset({ tags: ['Denominator'] })
    expect(scoreMatch(state, asset, { requiredTags: ['DENOMINATOR'] }))
      .toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('an asset with ANY one of several required tags is allowed', () => {
    const state = makeState()
    const asset = makeAsset({ tags: ['equivalence'] })
    const score = scoreMatch(state, asset, { requiredTags: ['denominator', 'numerator', 'equivalence'] })
    expect(score).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })
})
