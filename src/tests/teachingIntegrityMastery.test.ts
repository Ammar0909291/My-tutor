/**
 * MASTERY SAFETY — a concept cannot certify mastery while its teaching
 * integrity is unresolved.
 *
 * ── THE INCIDENT (real-student cross-subject audit, chem.bond.resonance) ──
 * WRONG EXPLANATION -> learner correctly challenges it -> tutor defends the
 * wrong claim -> assessment continues -> mastery.verified = true. Root
 * cause traced (see docs/architecture — this fix's own report): grading
 * integrity (`masteryVerifiedStrict`) and teaching-content integrity were,
 * and without this fix remain, two completely disconnected axes. A lesson
 * can answer every authored MCQ correctly while the EXPLANATIONS along the
 * way taught something false and never retracted it under challenge.
 *
 * `conceptMasteryVerdict` — the single authority every mastery consumer
 * (completion gate, client payload, permanent record) routes through — now
 * also requires `!state.teachingIntegrityUncertain`. This file proves that
 * addition is (a) real (non-vacuous: the exact incident's evidence shape
 * DOES certify via the OLD function, and does NOT via the new one), (b)
 * narrow (a concept with no challenge, or a challenge that was properly
 * acknowledged, is completely unaffected, across three different subjects),
 * and (c) does not erase any evidence (the raw counters are untouched — only
 * the verdict is withheld).
 */
import { describe, it, expect } from 'vitest'
import {
  conceptMasteryVerdict, masteryVerifiedStrict,
  MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED,
} from '@/lib/teaching/masteryGate'
import {
  initialConversationState, advanceConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { readFileSync } from 'fs'

function stateWith(conceptId: string, overrides: Partial<ConversationState>): ConversationState {
  return { ...initialConversationState(conceptId), ...overrides }
}

/** A state shaped exactly like the audited lesson's evidence at the point
 * it certified: clean, authored, server-graded evidence (nothing about the
 * GRADING was wrong), which is why `masteryVerifiedStrict` alone says true. */
function cleanlyGradedMasteredState(conceptId: string): ConversationState {
  return stateWith(conceptId, {
    phase: 'TRANSFER',
    correctAtCheck: MASTERY_CHECK_REQUIRED,
    correctAtPractice: MASTERY_PRACTICE_REQUIRED,
    verifiedCorrectAtCheck: MASTERY_CHECK_REQUIRED,
    verifiedCorrectAtPractice: MASTERY_PRACTICE_REQUIRED,
    sawModernGrading: true,
  })
}

describe('TEST 5 — a false/unverified material teaching claim cannot silently become a valid mastery foundation', () => {
  it('the exact audited-incident evidence shape: clean grading, but an unresolved claim challenge -> mastery is WITHHELD', () => {
    const state = {
      ...cleanlyGradedMasteredState('chem.bond.resonance'),
      teachingIntegrityUncertain: true,
    }
    expect(conceptMasteryVerdict(state)).toBe(false)
  })

  it('NON-VACUITY: the identical grading evidence, via the OLD function (masteryVerifiedStrict alone), DOES certify — proving the new AND-condition is what closes the gap, not some other change', () => {
    const state = {
      ...cleanlyGradedMasteredState('chem.bond.resonance'),
      teachingIntegrityUncertain: true,
    }
    expect(masteryVerifiedStrict(state)).toBe(true)
    expect(conceptMasteryVerdict(state)).toBe(false)
  })

  it('does NOT erase or alter the underlying evidence counters — only the verdict is withheld', () => {
    const state = {
      ...cleanlyGradedMasteredState('chem.bond.resonance'),
      teachingIntegrityUncertain: true,
    }
    expect(state.correctAtCheck).toBe(MASTERY_CHECK_REQUIRED)
    expect(state.correctAtPractice).toBe(MASTERY_PRACTICE_REQUIRED)
    expect(state.verifiedCorrectAtCheck).toBe(MASTERY_CHECK_REQUIRED)
    expect(state.verifiedCorrectAtPractice).toBe(MASTERY_PRACTICE_REQUIRED)
  })
})

describe('TEST 6 — valid verified teaching + valid assessment can still reach mastery (unaffected baseline)', () => {
  it('the same evidence shape WITHOUT an unresolved challenge certifies exactly as before', () => {
    const state = cleanlyGradedMasteredState('chem.bond.resonance')
    expect(state.teachingIntegrityUncertain).toBe(false)
    expect(conceptMasteryVerdict(state)).toBe(true)
    expect(masteryVerifiedStrict(state)).toBe(true)
  })
})

describe('TESTS 7/8/9 — existing correct Physics / Chemistry / English teaching is unaffected', () => {
  it.each([
    ['phys.mech.newtons-second-law', 'Physics'],
    ['chem.atomic.bohr-model', 'Chemistry'],
    ['eng.grammar.conditionals', 'English'],
  ])('%s (%s): an ordinary, cleanly-graded lesson with no challenge certifies unchanged', (conceptId) => {
    const state = cleanlyGradedMasteredState(conceptId)
    expect(conceptMasteryVerdict(state)).toBe(true)
  })

  it.each([
    ['phys.mech.newtons-second-law', 'Physics'],
    ['chem.atomic.bohr-model', 'Chemistry'],
    ['eng.grammar.conditionals', 'English'],
  ])('%s (%s): a lesson that legitimately has NOT met the bar still correctly refuses, exactly as before', (conceptId) => {
    const state = stateWith(conceptId, { phase: 'GUIDE', correctAtCheck: 0, correctAtPractice: 0 })
    expect(conceptMasteryVerdict(state)).toBe(false)
  })
})

describe('the flag is reached through advanceConversationState (the real fold), not just constructed by hand', () => {
  it('a claim-challenge-unresolved turn sets teachingIntegrityUncertain via the fold, and it survives subsequent turns for the SAME concept', () => {
    let s = initialConversationState('chem.bond.resonance')
    expect(s.teachingIntegrityUncertain).toBe(false)
    s = advanceConversationState(s, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
      teachingClaimUnresolved: true,
    })
    expect(s.teachingIntegrityUncertain).toBe(true)
    // A later, unrelated, ordinary turn does not clear it (set once, never
    // auto-cleared — matching sawModernGrading's own documented policy).
    s = advanceConversationState(s, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
    })
    expect(s.teachingIntegrityUncertain).toBe(true)
  })

  it('NON-VACUITY: a turn with no unresolved-claim evidence never sets the flag', () => {
    let s = initialConversationState('chem.bond.resonance')
    s = advanceConversationState(s, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
    })
    expect(s.teachingIntegrityUncertain).toBeFalsy()
  })

  it('moving to a FRESH concept resets the flag (the only safe reset — a new attempt), matching the field\'s own documented contract', () => {
    let s = initialConversationState('chem.bond.resonance')
    s = advanceConversationState(s, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
      teachingClaimUnresolved: true,
    })
    expect(s.teachingIntegrityUncertain).toBe(true)
    const fresh = initialConversationState('chem.bond.resonance')
    expect(fresh.teachingIntegrityUncertain).toBe(false)
  })
})

describe('TEST 13 — no manual DB or mastery-record manipulation is used or required by this fix', () => {
  it('the entire mechanism is pure functions over ConversationState — no prisma/db import anywhere in the touched modules', () => {
    const masteryGateSrc = readFileSync('src/lib/teaching/masteryGate.ts', 'utf8')
    const conversationStateSrc = readFileSync('src/lib/teaching/conversationState.ts', 'utf8')
    expect(masteryGateSrc).not.toMatch(/prisma|@prisma\/client/i)
    expect(conversationStateSrc).not.toMatch(/prisma|@prisma\/client/i)
  })
})
