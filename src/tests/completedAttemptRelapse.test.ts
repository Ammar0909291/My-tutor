/**
 * PHASE 7L — A REOPENED LESSON MUST NOT RE-COMPLETE ITSELF ON TURN ONE.
 *
 * THE P0, measured in production 2026-08-25, phys.opt.total-internal-reflection:
 *
 *   04:28:06  [lesson-init] attempt opened for lesson:108: re-open for mode=restart
 *   04:28:15  turn "i dont get it" — arbitration RECOVERY, lifecycle CORE,
 *             lessonCompleted false, mastery.verified false, check 0, practice 0
 *   04:28:34  completedAt — the attempt is COMPLETED, 1.6s after that turn's
 *             BRAIN_EVENT
 *   04:28:35  every later turn: [arbitration] owner COMPLETE,
 *             CUE SERVE_LESSON_COMPLETE / D0a-LESSON-ALREADY-COMPLETE,
 *             provider=deterministic, groq_invoked=false
 *
 * "give me a practice problem" returned "…is on pause — you haven't mastered it
 * yet". The learner could not re-enter a lesson they had just reopened.
 *
 * THE CHAIN (each link asserted below against the real modules):
 *   stale ladder -> evaluateConceptBudget 'exhausted'/'turns'
 *                -> isConceptClosed true on turn one
 *                -> recordConceptOutcome adds to conceptsNeedingReview
 *                -> closedConceptIds counts needsReview as CLOSED
 *                -> shouldFinalizeLesson true
 *                -> COMPLETED, having taught nothing
 *
 * The ladder survived because readConversationState resets only on a CONCEPT
 * CHANGE, and restarting the same lesson does not change the concept.
 */
import { describe, it, expect } from 'vitest'
import {
  clearLadderForNewAttempt, readConversationState, initialConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { evaluateConceptBudget, CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'
import {
  isConceptClosed, recordConceptOutcome, startLessonAttempt,
} from '@/lib/teaching/lessonAttempt'
import {
  requiredConceptsForLesson, shouldFinalizeLesson, closedConceptIds,
} from '@/lib/teaching/lessonCompletion'

const TIR = 'phys.opt.total-internal-reflection'

/** The ladder as it stood when the 7J session ended: budget spent, nothing mastered. */
function spentLadder(conceptId: string): ConversationState {
  return {
    ...initialConversationState(conceptId),
    phase: 'GUIDE',
    turnsOnConcept: CONCEPT_TURN_BUDGET + 1,   // past the hard budget
    consecutiveFailures: 2,
    taughtThisSession: true,
    demonstrated: true,
  }
}

const attemptFor = (conceptId: string) =>
  startLessonAttempt({ lessonKey: 'lesson:108', lessonTitle: 'TIR', startedAt: new Date() })

// ═══════════════════════════════════════════════════════════════════════════
// A. THE EXACT REGRESSION
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — A. the exact production relapse', () => {
  it('REPRODUCES IT: a stale ladder closes and finalises the lesson on turn one', () => {
    const stale = readConversationState(spentLadder(TIR), TIR)   // same concept => NO reset
    expect(stale.turnsOnConcept).toBeGreaterThan(CONCEPT_TURN_BUDGET)

    const budget = evaluateConceptBudget(stale)
    expect(budget.status).toBe('exhausted')
    expect(budget.reason).toBe('turns')
    expect(isConceptClosed(stale)).toBe(true)

    const folded = recordConceptOutcome(attemptFor(TIR), stale, 'TIR')
    expect(folded.conceptsNeedingReview).toContain(TIR)
    expect(folded.conceptsMastered).not.toContain(TIR)
    expect(closedConceptIds(folded)).toContain(TIR)
    expect(shouldFinalizeLesson(requiredConceptsForLesson(TIR), folded)).toBe(true)  // the defect
  })

  it('FIXES IT: after the ladder delta the new attempt is not closed on turn one', () => {
    const merged = { ...{ conversationState: spentLadder(TIR) }, ...clearLadderForNewAttempt() }
    const fresh = readConversationState(merged.conversationState, TIR)

    expect(fresh.turnsOnConcept).toBe(0)
    expect(fresh.consecutiveFailures).toBe(0)
    expect(fresh.phase).toBe('OBSERVE')
    expect(evaluateConceptBudget(fresh).status).toBe('ok')
    expect(isConceptClosed(fresh)).toBe(false)

    // MODEL THE ROUTE'S ACTUAL GATE, not the fold in isolation.
    // route.ts folds only under `isConceptClosed(state) && !lessonCompleted`;
    // recordConceptOutcome itself has no closed-check and will happily file any
    // non-mastered concept as needs-review. My first version of this assertion
    // called the fold directly and failed — the fold was right and the test was
    // wrong. The fix works by making isConceptClosed FALSE, so the fold is
    // never reached on turn one.
    const routeWouldFold = isConceptClosed(fresh)
    expect(routeWouldFold).toBe(false)

    const folded = routeWouldFold
      ? recordConceptOutcome(attemptFor(TIR), fresh, 'TIR')
      : attemptFor(TIR)
    expect(closedConceptIds(folded)).not.toContain(TIR)
    expect(shouldFinalizeLesson(requiredConceptsForLesson(TIR), folded)).toBe(false)
  })

  it('and the STALE ladder did reach the fold, which is why it completed', () => {
    // The negative half of the same gate: proof the fix acts on the gate and
    // not on the fold's behaviour, which is unchanged.
    const stale = readConversationState(spentLadder(TIR), TIR)
    expect(isConceptClosed(stale)).toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// C. FALSE-COMPLETION CONTROL / H. MASTERY INTEGRITY
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — C + H. no mastery is invented, and none is required', () => {
  it('the fresh ladder carries ZERO mastery evidence', () => {
    const fresh = readConversationState(clearLadderForNewAttempt().conversationState, TIR)
    expect(fresh.correctAtCheck).toBe(0)
    expect(fresh.correctAtPractice).toBe(0)
    expect(fresh.demonstrated).toBe(false)
    expect(fresh.taughtThisSession).toBe(false)
  })

  it('a learner who has not demonstrated mastery is still teachable, not closed', () => {
    const fresh = readConversationState(null, TIR)
    expect(isConceptClosed(fresh)).toBe(false)
  })

  it('clearing the ladder does not mark anything mastered', () => {
    const folded = recordConceptOutcome(attemptFor(TIR), readConversationState(null, TIR), 'TIR')
    expect(folded.conceptsMastered).toEqual([])
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// D + J. GENUINE COMPLETION IS STILL PROTECTED
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — D + J. genuine completion still completes', () => {
  it('a genuinely mastered concept still closes and still finalises', () => {
    const mastered: ConversationState = {
      ...initialConversationState(TIR),
      phase: 'TRANSFER', demonstrated: true, taughtThisSession: true,
      correctAtCheck: 1, correctAtPractice: 2,
    }
    expect(isConceptClosed(mastered)).toBe(true)
    const folded = recordConceptOutcome(attemptFor(TIR), mastered, 'TIR')
    expect(folded.conceptsMastered).toContain(TIR)
    expect(shouldFinalizeLesson(requiredConceptsForLesson(TIR), folded)).toBe(true)
  })

  it('an ALREADY-COMPLETED attempt is never finalised twice', () => {
    const done = { ...attemptFor(TIR), status: 'COMPLETED' as const }
    expect(shouldFinalizeLesson(requiredConceptsForLesson(TIR), done)).toBe(false)
  })

  it('an unresolved lesson can still never complete itself', () => {
    const folded = recordConceptOutcome(attemptFor(TIR), spentLadder(TIR), 'TIR')
    expect(shouldFinalizeLesson(requiredConceptsForLesson(null), folded)).toBe(false)
    expect(shouldFinalizeLesson(requiredConceptsForLesson(''), folded)).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// E. MID-LESSON CONTROL — a resume must NOT lose earned progress
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — E. mid-lesson state is not destroyed', () => {
  it('a resume that opens no attempt leaves the ladder untouched', () => {
    // The route applies the delta only when openedNewAttempt is true. This is
    // the no-delta path, and it must preserve real progress.
    const inProgress: ConversationState = {
      ...initialConversationState(TIR),
      phase: 'CHECK', demonstrated: true, correctAtCheck: 1, turnsOnConcept: 4,
    }
    const kept = readConversationState(inProgress, TIR)
    expect(kept.correctAtCheck).toBe(1)
    expect(kept.turnsOnConcept).toBe(4)
    expect(kept.phase).toBe('CHECK')
  })

  it('the delta is exactly one key, so it cannot wipe unrelated snapshot state', () => {
    expect(Object.keys(clearLadderForNewAttempt())).toEqual(['conversationState'])
    const merged = {
      ...{ conversationState: spentLadder(TIR), memoryContext: 'keep', placementVerification: { x: 1 } },
      ...clearLadderForNewAttempt(),
    }
    expect(merged.memoryContext).toBe('keep')
    expect(merged.placementVerification).toEqual({ x: 1 })
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// F. CROSS-SUBJECT — this is lifecycle-wide, not concept-specific
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — F. the defect and the fix are concept-independent', () => {
  for (const cid of ['phys.opt.total-internal-reflection', 'chem.bond.vsepr',
                     'eng.grammar.active-and-passive-voice', 'math.arith.fractions']) {
    it(`${cid}: stale ladder closes on turn one, fresh ladder does not`, () => {
      expect(isConceptClosed(readConversationState(spentLadder(cid), cid))).toBe(true)
      expect(isConceptClosed(readConversationState(null, cid))).toBe(false)
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// G. NO OSCILLATION — repeated opens converge
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — G. repeated opens do not oscillate', () => {
  it('applying the delta repeatedly is idempotent', () => {
    let snap: Record<string, unknown> = { conversationState: spentLadder(TIR) }
    for (let i = 0; i < 5; i++) snap = { ...snap, ...clearLadderForNewAttempt() }
    const fresh = readConversationState(snap.conversationState, TIR)
    expect(fresh.turnsOnConcept).toBe(0)
    expect(isConceptClosed(fresh)).toBe(false)
  })

  it('the helper takes no argument, so it cannot depend on prior state', () => {
    expect(clearLadderForNewAttempt.length).toBe(0)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// I. TRACK B/D PROTECTIONS REMAIN INTACT
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7L — I. Phase 7K deltas are unchanged', () => {
  it('the three lesson-open deltas are disjoint — each owns exactly one key', async () => {
    const { clearEpisodeForLessonOpen } = await import('@/lib/teaching/sessionLifecycle')
    const { clearVisualSessionForNewClientView } = await import('@/lib/teaching/visual/session')
    const keys = [
      ...Object.keys(clearEpisodeForLessonOpen()),
      ...Object.keys(clearVisualSessionForNewClientView()),
      ...Object.keys(clearLadderForNewAttempt()),
    ]
    expect(new Set(keys).size).toBe(keys.length)          // no key written twice
    expect(keys).toContain('sessionEpisode')
    expect(keys).toContain('visualSession')
    expect(keys).toContain('conversationState')
  })
})
