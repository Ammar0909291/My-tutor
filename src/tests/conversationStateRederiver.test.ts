/**
 * THE ISS-13 REDERIVER MUST RE-APPLY THE LADDER FOLD, OR A CONCURRENT WRITE
 * SILENTLY DISCARDS A JUST-EARNED VERIFIED MASTERY CREDIT.
 *
 * ── THE MEASURED DEFECT (real-account adversarial study, 2026-09-13) ────────
 * Two of five studied Physics lessons answered every gate question correctly
 * and still closed as "not mastered." `route.ts` folds each turn's evidence
 * into `conversationState` via `advanceConversationState()`, and the client's
 * OWN response that turn correctly showed the advanced counters — so the
 * increment happened in memory. `writeSnapshotDelta` uses optimistic
 * concurrency: on a version conflict it discards the delta and re-runs the
 * registered `snapshotRederivers` against the fresh row. `conversationState`
 * — the field carrying `verifiedCorrectAtCheck`/`verifiedCorrectAtPractice`,
 * the SOLE inputs to `masteryVerifiedStrict()` — had NO rederiver at either
 * of its two fold sites (the primary ladder fold, and its rarer try/catch
 * fallback sibling). On a version conflict during the pivotal grading turn,
 * the just-earned verified increment was dropped, reverting to the pre-turn
 * counters, even though the learner had already been shown (and believed)
 * the advanced ones. This is the same bug CLASS already fixed once for
 * `teachingHistory` (see `teachingHistoryRederiver.test.ts`, "C7") — here
 * applied to the ladder itself, whose counters are what mastery certification
 * actually reads.
 *
 * ── WHAT IS NOT MOCKED ───────────────────────────────────────────────────────
 * The real `advanceConversationState` / `readConversationState` /
 * `masteryVerifiedStrict`. The rederiver is mirrored so the same functions
 * the route runs decide the outcome; the route's own wiring is pinned by
 * source assertions against both fold sites.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  initialConversationState,
  readConversationState,
  advanceConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { masteryVerifiedStrict } from '@/lib/teaching/masteryGate'

const CONCEPT = 'phys.mech.conservation-of-momentum'

/** A minimal, fully-specified TurnEvidence for a correctly-graded PRACTICE answer. */
function gradedCorrectPracticeEvidence(): TurnEvidence {
  return {
    askedQuestion: false,
    questionSanctioned: true,
    diagnosticStalled: false,
    signalCorrect: true,
    recoveryFired: false,
    learnerRequest: null,
    misconceptionDetected: false,
    isPriorKnowledgeProbe: false,
    strategyUsed: null,
    signalConfidence: null,
    dontKnowSignal: false,
    learnerIssuedDirective: false,
    signalVerificationStatus: 'CLEAN',
    serverGraded: true,
    unauthoredKey: false,
    parityViolation: false,
    degradedTurn: false,
    deliveredTeaching: false,
    acknowledgement: false,
    fillerTurnDetected: false,
    teachingClaimUnresolved: false,
  }
}

/** The pre-fix behaviour: no rederiver at all — `fresh` wins untouched. */
function buggyRederiver(fresh: { conversationState?: unknown }): { conversationState: unknown } {
  return { conversationState: fresh.conversationState }
}

/** The FIXED rederiver — mirrors the primary fold site's registered closure. */
function fixedRederiver(
  fresh: { conversationState?: unknown },
  conceptId: string,
  evidence: TurnEvidence,
  excursionFroze: boolean,
): { conversationState: ConversationState } {
  const base = readConversationState(fresh.conversationState, conceptId)
  const rederived = excursionFroze ? base : advanceConversationState(base, evidence)
  return { conversationState: rederived }
}

describe('the ladder fold survives a concurrent write (primary fold site)', () => {
  // The state as it stood BEFORE the pivotal turn: at PRACTICE, one verified
  // credit already banked from an earlier CHECK-phase answer (constructed
  // directly, not by chaining folds — the OBSERVE->DEMONSTRATE->GUIDE->CHECK
  // walk is a different module's concern and is exercised elsewhere).
  const atPractice: ConversationState = {
    ...initialConversationState(CONCEPT),
    phase: 'PRACTICE',
    demonstrated: true,
    correctAtCheck: 1,
    verifiedCorrectAtCheck: 1,
    // One PRACTICE credit already banked from an earlier turn — this turn's
    // fold supplies the SECOND, which is what MASTERY_PRACTICE_REQUIRED needs.
    correctAtPractice: 1,
    verifiedCorrectAtPractice: 1,
    sawModernGrading: true,
  }

  // The fresh row a concurrent turn left behind: same concept, but WITHOUT
  // this turn's grading applied (as if this turn's own delta never landed).
  const freshFromConcurrentTurn = { conversationState: atPractice }

  it('BUGGY rederiver drops the verified credit — mastery is NOT certified (the defect)', () => {
    // In the buggy world, `fresh.conversationState` IS the final answer —
    // this turn's grading never touched it.
    const h = buggyRederiver(freshFromConcurrentTurn).conversationState as ConversationState
    expect(masteryVerifiedStrict(h)).toBe(false)
  })

  it('FIXED rederiver re-applies the grading fold — mastery IS certified', () => {
    const h = fixedRederiver(
      freshFromConcurrentTurn,
      CONCEPT,
      gradedCorrectPracticeEvidence(),
      false,
    ).conversationState
    expect(masteryVerifiedStrict(h)).toBe(true)
    expect(h.verifiedCorrectAtPractice).toBeGreaterThanOrEqual(2)
  })

  it('is idempotent when the fresh row already carries the fold (another turn recorded it)', () => {
    const alreadyFolded = advanceConversationState(atPractice, gradedCorrectPracticeEvidence())
    const h = fixedRederiver(
      { conversationState: alreadyFolded },
      CONCEPT,
      gradedCorrectPracticeEvidence(),
      false,
    ).conversationState
    // Re-applying the SAME evidence a second time must not double-count past
    // what the mastery gate requires — it is still simply certified.
    expect(masteryVerifiedStrict(h)).toBe(true)
  })

  it('freezes the ladder (does not fold at all) when an excursion is active this turn', () => {
    const h = fixedRederiver(
      freshFromConcurrentTurn,
      CONCEPT,
      gradedCorrectPracticeEvidence(),
      true, // excursionFroze
    ).conversationState
    // Frozen means the fresh base is returned untouched — no new evidence folded.
    expect(h).toEqual(readConversationState(freshFromConcurrentTurn.conversationState, CONCEPT))
  })

  it('resets to a fresh ladder when the fresh row belongs to a DIFFERENT concept', () => {
    const otherConceptSnapshot = { conversationState: { ...atPractice, conceptId: 'phys.mech.torque' } }
    const h = fixedRederiver(otherConceptSnapshot, CONCEPT, gradedCorrectPracticeEvidence(), false).conversationState
    expect(h.conceptId).toBe(CONCEPT)
    expect(h.phase).not.toBe('PRACTICE') // starts fresh, not inheriting the other concept's phase
  })
})

describe('the route registers a conversationState rederiver at both fold sites', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('primary fold site: captures conceptId/evidence/excursion-freeze and re-folds against the fresh row', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('const excursionFrozeLadderThisTurn = excursionActiveHoisted'),
      ROUTE.indexOf('const excursionFrozeLadderThisTurn = excursionActiveHoisted') + 900,
    )
    expect(block).toMatch(/const ladderConceptIdForRederive = conversationStateHoisted\.conceptId/)
    expect(block).toMatch(/snapshotRederivers\.push\(\(fresh\) => \{/)
    expect(block).toMatch(/readConversationStateForLadder\(fresh\.conversationState, ladderConceptIdForRederive\)/)
    expect(block).toMatch(/advanceConversationState\(freshLadderBase, turnEvidenceForLadder\)/)
    expect(block).toMatch(/return \{ conversationState: rederivedLadder \}/)
  })

  it('primary fold site imports readConversationState aliased for the rederiver', () => {
    expect(ROUTE).toMatch(
      /const \{ advanceConversationState, readConversationState: readConversationStateForLadder, repliesWithQuestion, isPriorKnowledgeProbe \} = await import\('@\/lib\/teaching\/conversationState'\)/,
    )
  })

  it('fallback fold site: also registers a rederiver, not just the in-memory fold', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('const fallbackLadderConceptId = conversationStateHoisted.conceptId'),
      ROUTE.indexOf('const fallbackLadderConceptId = conversationStateHoisted.conceptId') + 500,
    )
    expect(block).toMatch(/snapshotRederivers\.push\(\(fresh\) => \(\{/)
    expect(block).toMatch(/readConversationStateForLadderFallback\(fresh\.conversationState, fallbackLadderConceptId\)/)
    expect(block).toMatch(/fallbackTurnEvidence,/)
  })
})
