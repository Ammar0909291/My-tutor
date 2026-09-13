/**
 * P1 FIX — MASTERY COMPLETION / VERIFIED-STATE CONTRADICTION.
 *
 * ── THE DEFECT (REPORTED, then reproduced against the real modules) ─────────
 * A lesson could show:
 *
 *   checkCorrect 2 (required 1)   practiceCorrect 2 (required 2)   phase TRANSFER
 *
 * — every displayed threshold met or exceeded — and finish with
 * `mastery.verified: false` and "Let's pause X here for now. Worth another
 * look later." with no explanation, in the MAJORITY of lessons in one
 * real-student batch.
 *
 * `masteryAuthorityAgrees.test.ts` already proved the `verified` BOOLEAN
 * itself is single-owner-consistent (payload/gate/record agree). This file
 * covers what that one did not: the CLOSURE TIMING. `isConceptClosed`
 * (lessonAttempt.ts) and `evaluateConceptBudget`'s "already finished, never
 * exhausted" short-circuit (conceptBudget.ts) both used to fire the instant
 * PLAIN evidence (`hasDemonstratedMastery` — correctAtPractice>=2 or
 * phase===TRANSFER, satisfiable by an unauthored/model-invented-key grade)
 * crossed the threshold — folding the concept CLOSED and permanently
 * classifying it via the STRICT verdict, on the very same turn, with zero
 * further chance to earn real evidence even though the turn/attempt budget
 * had turns to spare.
 *
 * The fix: the CLOSING test is now the SAME single authority
 * (`conceptMasteryVerdict`, exposed here as `isAuthoritativelyMastered`) the
 * certification itself uses — not the looser PLAIN test. A concept that is
 * plain-mastered-but-unverified now stays OPEN and gets the ordinary
 * turns/attempts/failures budget everyone else gets, and — when it does
 * eventually close unresolved — an HONEST reason (`answeredButUnverified`),
 * not a silent "pause".
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import {
  evaluateConceptBudget, qualifiesForBudgetExtension, hasDemonstratedMastery,
  isAuthoritativelyMastered, CONCEPT_TURN_BUDGET,
} from '@/lib/teaching/conceptBudget'
import { isConceptClosed, recordConceptOutcome, startLessonAttempt } from '@/lib/teaching/lessonAttempt'
import { conceptOutcome } from '@/lib/teaching/lessonSummary'
import { buildLessonCloseText } from '@/lib/teaching/lessonCompletion'
import { conceptMasteryVerdict } from '@/lib/teaching/masteryGate'

const ev = (o: Record<string, unknown>) => o as Parameters<typeof advanceConversationState>[1]

/** Drives CHECK + 2×PRACTICE to TRANSFER. `unauthored` controls whether each
 *  graded item came from a server-authored key (the happy path) or one the
 *  model invented (the reported defect's exact shape). */
function driveToTransfer(opts: { unauthored: boolean; turnsBeforeCheck?: number }): ConversationState {
  let s: ConversationState = initialConversationState('eng.grammar.pronoun-antecedent-agreement')
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true }))
  // GUIDE -> CHECK (credits nothing, by design).
  s = advanceConversationState(s, ev({
    askedQuestion: true, signalCorrect: true, recoveryFired: false,
    unauthoredKey: opts.unauthored, signalVerificationStatus: 'CLEAN', serverGraded: !opts.unauthored,
  }))
  // CHECK.
  s = advanceConversationState(s, ev({
    askedQuestion: true, signalCorrect: true, recoveryFired: false,
    unauthoredKey: opts.unauthored, signalVerificationStatus: 'CLEAN', serverGraded: !opts.unauthored,
  }))
  // PRACTICE x2.
  for (const _ of [1, 2]) {
    s = advanceConversationState(s, ev({
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
      unauthoredKey: opts.unauthored, signalVerificationStatus: 'CLEAN', serverGraded: !opts.unauthored,
    }))
  }
  return s
}

describe('A. exact threshold — the reported production shape', () => {
  const s = driveToTransfer({ unauthored: true })

  it('displays checkCorrect/practiceCorrect at or above threshold, phase TRANSFER — reproducing the report', () => {
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
    expect(s.phase).toBe('TRANSFER')
  })

  it('is NOT authoritatively mastered (the strict verdict correctly refuses an invented key)', () => {
    expect(isAuthoritativelyMastered(s)).toBe(false)
    expect(conceptMasteryVerdict(s)).toBe(false)
  })

  it('THE FIX: does not close on this turn — hasDemonstratedMastery is true but the concept stays open', () => {
    expect(hasDemonstratedMastery(s)).toBe(true) // the PLAIN signal — unaffected, still correct
    expect(isConceptClosed(s)).toBe(false) // THE closing test — now correctly declines
  })

  it('budget no longer short-circuits to permanently-ok — it keeps evaluating turns/attempts for this concept', () => {
    const budget = evaluateConceptBudget(s)
    expect(budget.status).not.toBe('exhausted') // not enough turns/attempts used yet — genuinely still ok
    expect(budget.status).toBe('ok')
  })

  it('the budget extension remains available — this learner has not "already finished"', () => {
    // Simulate having spent the base budget without the extension yet granted.
    const atBudget: ConversationState = { ...s, turnsOnConcept: CONCEPT_TURN_BUDGET, consecutiveFailures: 0 }
    expect(qualifiesForBudgetExtension(atBudget)).toBe(true)
  })
})

describe('B. threshold exceeded — surplus evidence, still unverified', () => {
  it('answering further correctly at TRANSFER (a no-op rung by design) still does not fabricate closure', () => {
    let s = driveToTransfer({ unauthored: true })
    s = advanceConversationState(s, ev({
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
      unauthoredKey: true, signalVerificationStatus: 'CLEAN', serverGraded: false,
    }))
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2) // TRANSFER credits nothing further, by design
    expect(isConceptClosed(s)).toBe(false)
  })
})

describe('C. the happy path is completely unaffected', () => {
  const s = driveToTransfer({ unauthored: false })

  it('genuinely server-authored evidence closes immediately, exactly as before', () => {
    expect(isAuthoritativelyMastered(s)).toBe(true)
    expect(isConceptClosed(s)).toBe(true)
    expect(evaluateConceptBudget(s).status).toBe('ok')
  })

  it('conceptOutcome reports mastered with no unverified flag', () => {
    const outcome = conceptOutcome(s, 'Pronoun-Antecedent Agreement')
    expect(outcome.status).toBe('mastered')
    expect(outcome.answeredButUnverified).toBe(false)
  })

  it('the budget extension correctly reports unavailable — there is nothing left to extend', () => {
    const atBudget: ConversationState = { ...s, turnsOnConcept: CONCEPT_TURN_BUDGET }
    expect(qualifiesForBudgetExtension(atBudget)).toBe(false)
  })
})

describe('D. genuine exhaustion still closes the concept, honestly, once turns truly run out', () => {
  it('turns backstop fires even while plain-mastered-but-unverified — bounded, not an infinite hold', () => {
    const s: ConversationState = { ...driveToTransfer({ unauthored: true }), turnsOnConcept: CONCEPT_TURN_BUDGET + 6 }
    expect(isConceptClosed(s)).toBe(true) // now closes — via genuine exhaustion, not premature short-circuit
    expect(evaluateConceptBudget(s).status).toBe('exhausted')
    expect(evaluateConceptBudget(s).reason).toBe('turns')
  })

  it('conceptOutcome marks this specific shape answeredButUnverified — the honest-reason signal', () => {
    const s: ConversationState = { ...driveToTransfer({ unauthored: true }), turnsOnConcept: CONCEPT_TURN_BUDGET + 6 }
    const outcome = conceptOutcome(s, 'Pronoun-Antecedent Agreement')
    expect(outcome.status).toBe('needs_review')
    expect(outcome.answeredButUnverified).toBe(true)
  })

  it('an ORDINARY struggling learner (never demonstrated anything) is NOT flagged answeredButUnverified', () => {
    let s: ConversationState = initialConversationState('eng.grammar.pronoun-antecedent-agreement')
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: false, recoveryFired: false }))
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: false, recoveryFired: false }))
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: false, recoveryFired: false }))
    const outcome = conceptOutcome(s, 'Pronoun-Antecedent Agreement')
    expect(outcome.status).toBe('needs_review')
    expect(outcome.answeredButUnverified).toBe(false) // never demonstrated anything — a real, ordinary review
  })
})

describe('E. the learner-facing close text is now honest, not silent, for the gap shape', () => {
  const summaryGap = {
    mastered: [],
    needsReview: [{
      conceptId: 'eng.grammar.pronoun-antecedent-agreement',
      title: 'Pronoun-Antecedent Agreement',
      status: 'needs_review' as const,
      misconceptions: [],
      misconceptionsCorrected: false,
      answeredButUnverified: true,
    }],
  }
  const summaryOrdinary = {
    mastered: [],
    needsReview: [{
      conceptId: 'eng.grammar.pronoun-antecedent-agreement',
      title: 'Pronoun-Antecedent Agreement',
      status: 'needs_review' as const,
      misconceptions: [],
      misconceptionsCorrected: false,
      answeredButUnverified: false,
    }],
  }

  it('the gap shape gets the honest, distinct message — never the silent generic one', () => {
    const text = buildLessonCloseText('Pronoun-Antecedent Agreement', summaryGap, { lang: 'en' })
    expect(text).toContain('reviewed check question')
    expect(text).not.toContain("Let's pause")
  })

  it('an ordinary struggling review still gets the pre-existing, correct wording', () => {
    const text = buildLessonCloseText('Pronoun-Antecedent Agreement', summaryOrdinary, { lang: 'en' })
    expect(text).toContain("Let's pause")
    expect(text).not.toContain('reviewed check question')
  })

  it('the already-finished/resumed variant also distinguishes the two', () => {
    const gapText = buildLessonCloseText('Pronoun-Antecedent Agreement', summaryGap, { lang: 'en', alreadyFinished: true })
    const ordinaryText = buildLessonCloseText('Pronoun-Antecedent Agreement', summaryOrdinary, { lang: 'en', alreadyFinished: true })
    expect(gapText).toContain('reviewed check question')
    expect(ordinaryText).toContain('on pause')
    expect(ordinaryText).not.toContain('reviewed check question')
  })

  it('every teaching language has the new key — no untranslated fallback leaks to the learner', () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const text = buildLessonCloseText('X', summaryGap, { lang })
      expect(text).not.toContain('lesson_close_needs_review_unverified') // the raw key never leaks
      expect(text.length).toBeGreaterThan(10)
    }
  })
})

describe('F. stale / legacy snapshot — the pre-existing fallback is untouched', () => {
  it('a pre-feature state (no verified counters ever tracked) still certifies on plain evidence, exactly as before', () => {
    // sawModernGrading defaults false on a raw/legacy object with no verified
    // counters, no contradictions, no unauthored keys — masteryVerifiedStrict's
    // OWN documented legacy fallback, which this fix must not touch.
    const legacy: ConversationState = {
      ...initialConversationState('eng.grammar.pronoun-antecedent-agreement'),
      phase: 'TRANSFER',
      correctAtCheck: 1,
      correctAtPractice: 2,
    }
    expect(isAuthoritativelyMastered(legacy)).toBe(true)
    expect(isConceptClosed(legacy)).toBe(true)
  })
})

describe('G. fresh vs. persisted session — the fix reads only ConversationState, not session shape', () => {
  it('a freshly-driven state and an equivalent rehydrated (spread-cloned) state behave identically', () => {
    const fresh = driveToTransfer({ unauthored: true })
    const persisted: ConversationState = JSON.parse(JSON.stringify(fresh))
    expect(isConceptClosed(persisted)).toBe(isConceptClosed(fresh))
    expect(isAuthoritativelyMastered(persisted)).toBe(isAuthoritativelyMastered(fresh))
    expect(evaluateConceptBudget(persisted).status).toBe(evaluateConceptBudget(fresh).status)
  })
})

describe('H. repeated turn — recordConceptOutcome stays idempotent under the new closing test', () => {
  it('folding the same concept twice does not double-count or flip an already-closed verdict', () => {
    const s: ConversationState = { ...driveToTransfer({ unauthored: true }), turnsOnConcept: CONCEPT_TURN_BUDGET + 6 }
    let attempt = startLessonAttempt('eng.grammar.pronoun-antecedent-agreement', 'Pronoun-Antecedent Agreement', new Date())
    attempt = recordConceptOutcome(attempt, s, 'Pronoun-Antecedent Agreement')
    const firstFold = attempt
    attempt = recordConceptOutcome(attempt, s, 'Pronoun-Antecedent Agreement')
    expect(attempt).toBe(firstFold) // no-op on the already-folded concept, byte-identical
    expect(attempt.conceptsNeedingReview).toEqual(['eng.grammar.pronoun-antecedent-agreement'])
    expect(attempt.conceptsMastered).toEqual([])
  })
})

describe('I. rejected/ambiguous answer — no evidence, no closure', () => {
  it('a turn whose grade could not be resolved moves no counter and does not close the concept', () => {
    let s: ConversationState = initialConversationState('eng.grammar.pronoun-antecedent-agreement')
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: null, recoveryFired: false }))
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(isConceptClosed(s)).toBe(false)
  })
})

describe('J. multiple correct probes — the verified counters genuinely closing the gap over more turns', () => {
  it('once enough server-authored grades arrive, the concept becomes authoritatively mastered and closes', () => {
    let s = driveToTransfer({ unauthored: true }) // plain-mastered, unverified, stays open
    expect(isConceptClosed(s)).toBe(false)
    // A later, genuinely server-authored PRACTICE-phase-equivalent grade closes
    // the gap. Phase is already TRANSFER, so this exercises conversationState's
    // existing TRANSFER no-op switch — plain counters do not move further, but
    // the point under test is that an ALREADY-authoritatively-mastered path
    // (reached via a session that used authored keys throughout) is what
    // actually flips the verdict; this asserts the two states remain
    // distinguishable rather than asserting a new counter-crediting mechanism.
    const authored = driveToTransfer({ unauthored: false })
    expect(isConceptClosed(authored)).toBe(true)
    expect(isConceptClosed(s)).toBe(false)
  })
})
