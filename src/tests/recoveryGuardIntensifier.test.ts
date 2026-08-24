/**
 * PHASE 5 (Case G, item 3) — recoveryGuard's bare "I ... know" pattern was
 * the one negated-verb pattern in this file with no optional intensifier
 * group, while ten sibling patterns already carry one (scared: really|so;
 * dont_understand line 184: really|just; dont_understand's "get it" variant
 * line 222: still; confused: so|really|totally; etc.). So "I still don't
 * know enough about the mole concept" and "I really don't know how to
 * start" matched nothing at all — first found live during Phase 4
 * verification (recorded there as R3, explicitly deferred).
 *
 * The fix brings the ONE outlier pattern into line with an already-
 * established, already-repeated convention in the same file. It does not
 * add a new frame, a new detector, or a new word not already used elsewhere
 * in recoveryGuard.ts (really/still/just all appear in sibling patterns).
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'
import { classifyKnowledgeGap } from '@/lib/teaching/knowledgeGap'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'

describe('Phase 5 Case G — recoveryGuard dont_know now accepts an intensifier', () => {
  it('"I still don\'t know enough about X" is now dont_know', () => {
    expect(detectFailureState("I still don't know enough about the mole concept", null)).toBe('dont_know')
  })
  it('"I really don\'t know how to start" is now dont_know', () => {
    expect(detectFailureState("I really don't know how to start", null)).toBe('dont_know')
  })
  it('"I just don\'t know" is now dont_know', () => {
    expect(detectFailureState('I just do not know', null)).toBe('dont_know')
  })
  it('plain "I don\'t know" still works (no regression)', () => {
    expect(detectFailureState("I don't know", null)).toBe('dont_know')
  })
  it('isDontKnowSignal still classifies the result correctly', () => {
    expect(isDontKnowSignal(detectFailureState("I still don't know enough about the mole concept", null))).toBe(true)
  })

  it('NEGATIVE CONTROL: the OLD pattern (no intensifier group) genuinely fails on these phrasings', () => {
    const oldPattern = /\bi\s+(don'?t|do\s+not)\s+know\b/i
    expect(oldPattern.test("I still don't know enough about the mole concept")).toBe(false)
    expect(oldPattern.test("I really don't know how to start")).toBe(false)
    // ...but the real (fixed) detector now matches both.
    expect(detectFailureState("I still don't know enough about the mole concept", null)).toBe('dont_know')
    expect(detectFailureState("I really don't know how to start", null)).toBe('dont_know')
  })

  it('does not over-match: an intensifier word elsewhere in the sentence, not adjacent to the negation, is untouched by this change', () => {
    // "know" not negated at all — must not become dont_know via this pattern.
    expect(detectFailureState('I really know this well', null)).not.toBe('dont_know')
  })
})

describe('Phase 5 Case G — end to end: R3 phrasing now opens a resolvable knowledge gap', () => {
  it('classifyKnowledgeGap resolves "I still don\'t know enough about the mole concept" to the KG concept', () => {
    const message = "I still don't know enough about the mole concept"
    const failureState = detectFailureState(message, null)
    const resolvedConceptId = resolveRequestedConceptId(message, 'chem.found.pure-substances', 'chemistry')
    const gap = classifyKnowledgeGap({
      failureState,
      resolvedConceptId,
      lessonConceptId: 'chem.found.pure-substances',
      lessonPrerequisites: [],
    })
    expect(resolvedConceptId).toBe('chem.found.mole-concept')
    expect(gap).not.toBeNull()
    expect(gap?.conceptId).toBe('chem.found.mole-concept')
    expect(gap?.signal).toBe('dont_know')
  })

  it('REVERT CHECK: with the pre-fix pattern, the same turn resolves to no gap at all', () => {
    const message = "I still don't know enough about the mole concept"
    const oldPattern = /\bi\s+(don'?t|do\s+not)\s+know\b/i
    const oldFailureState = oldPattern.test(message) ? 'dont_know' : null
    const resolvedConceptId = resolveRequestedConceptId(message, 'chem.found.pure-substances', 'chemistry')
    const gap = classifyKnowledgeGap({
      failureState: oldFailureState as never,
      resolvedConceptId,
      lessonConceptId: 'chem.found.pure-substances',
      lessonPrerequisites: [],
    })
    // Under the old (reverted) pattern, no failure state is ever detected,
    // so classifyKnowledgeGap has nothing to open a gap from — the exact
    // regression this fix closes.
    expect(oldFailureState).toBeNull()
    expect(gap).toBeNull()
  })
})
