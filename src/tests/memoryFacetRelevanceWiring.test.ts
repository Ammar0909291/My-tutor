/**
 * PHASE 1 — MEMORY RETRIEVAL FACET RELEVANCE, PRODUCTION WIRING
 * (2026-08-22, closes the finding `memoryFacetRelevance.test.ts` deliberately
 * left open: "MatchOptions.requiredTags exists... BUT is NOT wired into a
 * real production call site").
 *
 * ── RECONNAISSANCE FINDING ──────────────────────────────────────────────────
 * findBestExplanation's own query has no familyKind filter — every ACTIVE
 * explanation for a concept is a candidate regardless of kind. The seed
 * corpus (measured across all 55 files under src/lib/teaching/assets/)
 * authors 1,357 'core_explanation' assets alongside 897 'misconception_repair'
 * ones for the SAME concepts (every one of the 827 authored concept blocks
 * that has a misconception_repair explanation also has a core_explanation
 * sibling — verified programmatically, not assumed). scoreMatch never looked
 * at familyKind, and the query carries no `orderBy`, so a tie between the two
 * kinds resolves to whatever order Postgres happens to return — not a
 * teaching decision. 'core_explanation' is not an invented facet: it is
 * already the corpus's own established default (captureGeneratedExplanation
 * defaults every live-captured explanation to it; decomposeLesson always
 * emits it for the lesson's lead content). `findBestExplanation` now defaults
 * `requiredTags` to `['core_explanation']` whenever the caller hasn't already
 * declared a facet — see explanationMemory.ts's `defaultExplanationFacet`.
 *
 * Deliberately does NOT touch findBestProbe / the gate probe path: probe tags
 * are `[subjectSlug, probeKind]` (e.g. 'mcq', 'checkpoint'), never
 * 'core_explanation', and the gate's own `requireMcq` predicate (Phase 3,
 * gateProbeSelection.test.ts) already owns probe-shape eligibility. Wiring
 * requiredTags there too would zero out every probe candidate.
 *
 * ── WHY THESE TESTS MIX PURE-LOGIC AND SOURCE-WIRING ────────────────────────
 * findBestExplanation's own query needs a database, matching the existing
 * convention in this suite (gateProbeSelection.test.ts, servingPathCanonicality
 * .test.ts): the pure scoring/filtering logic is exercised directly against
 * the REAL matcher (never a copy), and the wiring explanationMemory.ts and
 * teachingActionRepository.ts own is asserted against the real source.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { AssetStatus, GradeBand } from '@prisma/client'
import { scoreMatch, pickBest, DEFAULT_CONFIDENCE_THRESHOLD, type MatchableAsset } from '@/lib/teaching/assets/matcher'
import { buildStudentState } from '@/lib/teaching/assets/studentState'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const EXPLANATION_MEMORY = REPO('src/lib/teaching/assets/explanationMemory.ts')
const REPOSITORY = REPO('src/lib/teaching/assets/teachingActionRepository.ts')

function makeAsset(overrides: Partial<MatchableAsset> = {}): MatchableAsset {
  return {
    assetId: 'a1',
    conceptId: 'phys.meas.units',
    language: 'en',
    gradeBand: GradeBand.HIGH,
    status: AssetStatus.ACTIVE,
    qualityScore: 0,
    qualityConfidence: 0,
    tags: ['physics', 'core_explanation'],
    incompatibilities: [],
    ...overrides,
  }
}

function makeState() {
  return buildStudentState({
    conceptId: 'phys.meas.units',
    subjectSlug: 'physics',
    teachingLanguage: 'en',
    grade: 10,
    userMessage: 'explain SI units',
  })
}

describe('production wiring — findBestExplanation defaults the explanation slot to core_explanation', () => {
  it('explanationMemory.ts computes facetOptions before both pickBest calls', () => {
    expect(EXPLANATION_MEMORY).toContain('const facetOptions = defaultExplanationFacet(options)')
    expect(EXPLANATION_MEMORY).toContain('const best = pickBest(state, rows, facetOptions)')
    expect(EXPLANATION_MEMORY).toContain('const fallback = pickBest(state, rows, facetOptions, 0)')
  })

  it('the default only fills in when the caller has not already declared a facet', () => {
    expect(EXPLANATION_MEMORY).toContain(
      "if (options.requiredTags && options.requiredTags.length > 0) return options",
    )
    expect(EXPLANATION_MEMORY).toContain("return { ...options, requiredTags: ['core_explanation'] }")
  })

  it('the probe path (gate + assembleLesson practice slot) is untouched — no facet default there', () => {
    // Confirms the fix did not bleed into findBestProbe: probe tags are
    // [subjectSlug, probeKind] and never carry 'core_explanation', so
    // defaulting requiredTags there would zero out every probe candidate.
    expect(REPOSITORY).toContain('const best = pickBest(state, rows, options)')
    expect(REPOSITORY).toContain('const fallback = pickBest(state, rows, options, 0)')
    expect(REPOSITORY).not.toContain('core_explanation')
    expect(REPOSITORY).not.toContain('defaultExplanationFacet')
  })
})

describe('production shape — core_explanation vs misconception_repair, the real defect', () => {
  const state = makeState()
  // Shaped exactly like the real corpus: tags = [subjectSlug, familyKind].
  const coreExplanation = makeAsset({ assetId: 'core', tags: ['physics', 'core_explanation'] })
  const misconceptionRepair = makeAsset({ assetId: 'repair', tags: ['physics', 'misconception_repair'] })

  it('POSITIVE — the core_explanation candidate clears the default threshold under the facet requirement', () => {
    const score = scoreMatch(state, coreExplanation, { requiredTags: ['core_explanation'] })
    expect(score).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('NEGATIVE — the misconception_repair candidate for the SAME concept is hard-disqualified under the facet requirement', () => {
    const score = scoreMatch(state, misconceptionRepair, { requiredTags: ['core_explanation'] })
    expect(score).toBe(0)
  })

  it('pickBest resolves the previously-nondeterministic tie deterministically toward core_explanation', () => {
    // Before this fix, both candidates score identically (same base/gradeBand/
    // tagOverlap/quality/difficulty terms) and the query has no orderBy, so
    // the winner was whichever row Postgres happened to return first. The
    // facet requirement removes the tie entirely, regardless of input order.
    const forward = pickBest(state, [misconceptionRepair, coreExplanation], { requiredTags: ['core_explanation'] })
    const reversed = pickBest(state, [coreExplanation, misconceptionRepair], { requiredTags: ['core_explanation'] })
    expect(forward?.asset.assetId).toBe('core')
    expect(reversed?.asset.assetId).toBe('core')
  })

  it('REGRESSION — without a facet requirement, both remain eligible exactly as before (no accidental filtering)', () => {
    const scoreCore = scoreMatch(state, coreExplanation)
    const scoreRepair = scoreMatch(state, misconceptionRepair)
    expect(scoreCore).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
    expect(scoreRepair).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
    expect(scoreCore).toBe(scoreRepair) // the exact tie this fix resolves, still present with no requirement
  })
})

describe('pickBest threshold=0 fallback never returns a hard-disqualified candidate', () => {
  const state = makeState()

  it('an all-disqualified candidate set returns null at threshold 0, not the first row', () => {
    const wrongFacetA = makeAsset({ assetId: 'wrong-a', tags: ['physics', 'misconception_repair'] })
    const wrongFacetB = makeAsset({ assetId: 'wrong-b', tags: ['physics', 'hint_tier_1'] })
    const result = pickBest(state, [wrongFacetA, wrongFacetB], { requiredTags: ['core_explanation'] }, 0)
    expect(result).toBeNull()
  })

  it('a legitimate low-scoring candidate still wins over a hard-disqualified one at threshold 0', () => {
    const gradeMismatch = makeAsset({ assetId: 'legit-low', gradeBand: GradeBand.EARLY, tags: ['physics', 'core_explanation'] })
    const wrongFacet = makeAsset({ assetId: 'wrong', tags: ['physics', 'misconception_repair'] })
    const result = pickBest(state, [wrongFacet, gradeMismatch], { requiredTags: ['core_explanation'] }, 0)
    expect(result?.asset.assetId).toBe('legit-low')
    expect(result!.confidence).toBeGreaterThan(0)
  })

  it('EXISTING BEHAVIOUR — misconception incompatibility still hard-disqualifies at threshold 0 too', () => {
    // Same guard, exercised via the pre-existing activeMisconceptionIds path
    // rather than the new requiredTags path — confirms the fix is general,
    // not requiredTags-specific.
    const incompatible = makeAsset({ assetId: 'incompatible', incompatibilities: ['phys.meas.units:MC-3'] })
    const result = pickBest(state, [incompatible], { activeMisconceptionIds: ['phys.meas.units:MC-3'] }, 0)
    expect(result).toBeNull()
  })

  it('EXISTING BEHAVIOUR — an ordinary grade-band fallback (no facet, no misconception) is unaffected', () => {
    // Reproduces the pre-existing, still-correct fallback: no requiredTags in
    // play, a grade-band mismatch alone must not be treated as disqualified.
    const gradeMismatch = makeAsset({ assetId: 'far-band', gradeBand: GradeBand.EARLY })
    const result = pickBest(state, [gradeMismatch], {}, 0)
    expect(result?.asset.assetId).toBe('far-band')
  })
})

describe('requiredTags composes correctly with the other MatchOptions fields', () => {
  const state = makeState()

  it('a facet requirement and an active-misconception incompatibility can both disqualify the same candidate independently', () => {
    const doublyBad = makeAsset({
      tags: ['physics', 'misconception_repair'], // wrong facet
      incompatibilities: ['phys.meas.units:MC-3'], // AND incompatible
    })
    expect(scoreMatch(state, doublyBad, {
      requiredTags: ['core_explanation'],
      activeMisconceptionIds: ['phys.meas.units:MC-3'],
    })).toBe(0)
  })

  it('multiple required tags (ANY-of semantics) still work with real corpus-shaped tags', () => {
    const worked = makeAsset({ tags: ['physics', 'worked_example'] })
    const score = scoreMatch(state, worked, { requiredTags: ['core_explanation', 'worked_example'] })
    expect(score).toBeGreaterThanOrEqual(DEFAULT_CONFIDENCE_THRESHOLD)
  })

  it('language/status/concept hard filters still take precedence over a satisfied facet requirement', () => {
    const wrongConcept = makeAsset({ conceptId: 'phys.mech.newtons-first-law', tags: ['physics', 'core_explanation'] })
    expect(scoreMatch(state, wrongConcept, { requiredTags: ['core_explanation'] })).toBe(0)
  })
})
