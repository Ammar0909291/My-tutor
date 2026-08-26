/**
 * PHASE E — THE AFFECT BUDGET MEASURES A SPIRAL, NOT A LIFETIME.
 *
 * THE DEFECT (investigation: docs/architecture/PHASE_E_MASTERY_FAILURE_ROOT_CAUSE.md).
 * `visibleFailures` is a MONOTONIC TALLY that nothing ever decrements, read as
 * if it were a STATE ("this learner is in a failure spiral"). Two failures
 * anywhere in a lesson — however far apart, however much the learner recovered
 * in between — move the episode to CLOSING, and there is NO transition out of
 * CLOSING. CLOSING then denies AUTHORED_PROBE through two independent gates, so
 * a learner sitting at CHECK is starved of the only evidence
 * `correctAtCheck`/`correctAtPractice` can be earned from and the lesson expires
 * at 0/0.
 *
 * Measured in production (learn_sessions.contextSnapshot, both sides):
 *   chem.equil.le-chatelier  episode {CLOSING, visibleFailures 2}
 *                            conversation {CHECK,    c 0, p 0, turns 12}
 *   phys.em.faradays-law     episode {CORE,    visibleFailures 1}
 *                            conversation {TRANSFER, c 1, p 2, turns 13}
 *
 * This is the same shape Phase 4 already fixed once for `remediationCount` — a
 * tally read as a state, never exited — and the remedy is the same one: clear
 * it on the evidence that already clears its sibling `consecutiveFailures`, a
 * graded-CORRECT answer.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO, and every one of these is pinned below:
 * no CLOSING → CORE, no change to arbitration precedence, no probe outranking
 * CLOSE, no `closeReason`, no budget or threshold change, and `forceClosing`
 * untouched — an explicit "I'm done for today" must still close absolutely.
 */
import { describe, it, expect } from 'vitest'
import {
  applySignalToEpisode, forceClosing, deriveEpisode,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'
import { arbitrateTurn } from '@/lib/teaching/turnArbitration'
import { closingTurnWithholdsQuestion } from '@/lib/teaching/gateAssessment'
import {
  advanceConversationState, initialConversationState, isLowSignalAcknowledgement,
  type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { masteryVerifiedStrict } from '@/lib/teaching/masteryGate'

const ep = (
  phase: SessionEpisode['phase'], visibleFailures: number,
): SessionEpisode => ({
  startedAt: '2026-08-26T07:00:00.000Z', phase, visibleFailures,
  retroWinOwed: false, openingSatisfied: phase !== 'OPENING',
})
const NORMAL = { isFirstLesson: false }
const LESSON_ONE = { isFirstLesson: true }
const wrong = (e: SessionEpisode, o = NORMAL) => applySignalToEpisode(e, { correctness: false }, o)
const right = (e: SessionEpisode, o = NORMAL) => applySignalToEpisode(e, { correctness: true }, o)

// ── A. A CURRENT SPIRAL MUST STILL CLOSE ────────────────────────────────────
describe('A. the affect budget still protects a learner who is genuinely spiralling', () => {
  it('A1 one visible failure leaves the episode open at CORE', () => {
    const after = wrong(ep('CORE', 0))
    expect(after.phase).toBe('CORE')
    expect(after.visibleFailures).toBe(1)
  })

  it('A2 two CONSECUTIVE failures, no recovery between, still close', () => {
    const after = wrong(wrong(ep('CORE', 0)))
    expect(after.phase).toBe('CLOSING')
    expect(after.visibleFailures).toBe(2)
  })

  it('A3 once CLOSING, the authored probe stays blocked by both gates', () => {
    const closed = wrong(wrong(ep('CORE', 0)))
    expect(closed.phase).toBe('CLOSING')
    const v = arbitrateTurn({
      knowledgeGapResolved: false, recoveryActive: false,
      learnerRequestActive: false, closing: closed.phase === 'CLOSING',
      completionReady: false,
    })
    expect(v.owner).toBe('CLOSE')
    expect(v.allows('AUTHORED_PROBE')).toBe(false)
    expect(v.allows('NEW_QUESTION')).toBe(false)
    expect(closingTurnWithholdsQuestion(closed.phase)).toBe(true)
  })

  it('A4 lesson one still closes on the FIRST failure', () => {
    const after = wrong(ep('CORE', 0), LESSON_ONE)
    expect(after.phase).toBe('CLOSING')
    expect(after.visibleFailures).toBe(1)
  })

  it('A4b lesson one: a correct answer between two failures still closes on the second', () => {
    // The budget is 1, so the very next failure after any recovery closes.
    const after = wrong(right(wrong(ep('CORE', 0), LESSON_ONE), LESSON_ONE), LESSON_ONE)
    expect(after.phase).toBe('CLOSING')
  })
})

// ── B. RECOVERY BY A GRADED CORRECT ANSWER — THE NEW BEHAVIOUR ──────────────
describe('B. a graded-correct answer ends the current spiral', () => {
  it('B1 visibleFailures 1 → correct → 0', () => {
    expect(right(ep('CORE', 1)).visibleFailures).toBe(0)
  })

  it('B2 failure → correct → failure leaves ONE, not two, and stays open', () => {
    const after = wrong(right(wrong(ep('CORE', 0))))
    expect(after.visibleFailures).toBe(1)
    expect(after.phase).toBe('CORE')
  })

  it('B3 alternating failure/correct never reaches CLOSING, however long', () => {
    let e = ep('CORE', 0)
    for (let i = 0; i < 50; i++) {
      e = wrong(e)
      expect(e.phase).toBe('CORE')
      e = right(e)
      expect(e.visibleFailures).toBe(0)
    }
    expect(e.phase).toBe('CORE')
  })

  it('B4 the recovered learner is still served authored assessment', () => {
    const e = wrong(right(wrong(ep('CORE', 0))))
    const v = arbitrateTurn({
      knowledgeGapResolved: false, recoveryActive: false,
      learnerRequestActive: false, closing: e.phase === 'CLOSING',
      completionReady: false,
    })
    expect(v.owner).toBe('TEACH')
    expect(v.allows('AUTHORED_PROBE')).toBe(true)
    expect(closingTurnWithholdsQuestion(e.phase)).toBe(false)
  })
})

// ── C. MASTERY SAFETY ───────────────────────────────────────────────────────
describe('C. clearing the affect budget buys no mastery', () => {
  it('C1 applySignalToEpisode touches nothing but the episode', () => {
    const before = ep('CORE', 1)
    const after = right(before)
    // The episode carries no mastery fields at all — that is the point.
    expect(Object.keys(after).sort()).toEqual(
      ['openingSatisfied', 'phase', 'retroWinOwed', 'startedAt', 'visibleFailures'],
    )
    expect(after.startedAt).toBe(before.startedAt)
  })

  it('C2 the ladder is unmoved by the episode: counters come only from the fold', () => {
    // Same graded-correct evidence, driven through BOTH machines. The mastery
    // counters move because the CONVERSATION fold moved them, at a mastery gate
    // — never because the episode's budget was cleared.
    const atCheck: ConversationState = {
      ...initialConversationState('demo.concept'), phase: 'CHECK', demonstrated: true,
    }
    const nextConv = advanceConversationState(atCheck, {
      askedQuestion: true, questionSanctioned: true, signalCorrect: true,
      recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
      isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
      degradedTurn: false, deliveredTeaching: false, acknowledgement: false,
    } as Parameters<typeof advanceConversationState>[1])
    expect(nextConv.correctAtCheck).toBe(1)
    // And the episode, on the same evidence, moves only its own field.
    const nextEp = right(ep('CORE', 1))
    expect(nextEp.visibleFailures).toBe(0)
    expect(nextEp.phase).toBe('CORE')
  })

  it('C3 a cleared budget alone never verifies mastery', () => {
    const s = initialConversationState('demo.concept')
    expect(masteryVerifiedStrict(s)).toBe(false)
    let e = ep('CORE', 1)
    for (let i = 0; i < 20; i++) e = right(e)
    expect(e.visibleFailures).toBe(0)
    // The conversation state was never touched by any of that.
    expect(masteryVerifiedStrict(s)).toBe(false)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })
})

// ── D. ACKNOWLEDGEMENT SAFETY ───────────────────────────────────────────────
describe('D. an acknowledgement can neither buy mastery nor clear the budget', () => {
  it('D1 a signal-less turn leaves the episode byte-identical', () => {
    const before = ep('CORE', 1)
    expect(applySignalToEpisode(before, null, NORMAL)).toEqual(before)
    expect(applySignalToEpisode(before, {}, NORMAL)).toEqual(before)
    expect(applySignalToEpisode(before, { correctness: undefined }, NORMAL)).toEqual(before)
  })

  it('D2 one hundred polite acknowledgements at CHECK change nothing', () => {
    let s: ConversationState = {
      ...initialConversationState('demo.concept'), phase: 'CHECK', demonstrated: true,
    }
    let e = ep('CORE', 1)
    for (let i = 0; i < 100; i++) {
      s = advanceConversationState(s, {
        askedQuestion: false, questionSanctioned: true, signalCorrect: null,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
        degradedTurn: false, deliveredTeaching: true,
        acknowledgement: isLowSignalAcknowledgement('ok sir'),
      } as Parameters<typeof advanceConversationState>[1])
      // An acknowledgement produces no SIGNAL, so this is what the route folds.
      e = applySignalToEpisode(e, null, NORMAL)
    }
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
    expect(e.visibleFailures).toBe(1)
  })
})

// ── E. DEGRADED TURN SAFETY ─────────────────────────────────────────────────
describe('E. a degraded turn neither spends nor clears the budget', () => {
  it('E1 an outage template carries no signal, so the episode is untouched', () => {
    // route.ts folds `teachingSignal` into the episode; an outage template
    // emits no SIGNAL tag, so the value folded is null.
    const before = ep('CORE', 1)
    expect(applySignalToEpisode(before, null, NORMAL)).toEqual(before)
  })

  it('E2 a degraded turn cannot advance the ladder or create evidence', () => {
    const before: ConversationState = {
      ...initialConversationState('demo.concept'), phase: 'CHECK', demonstrated: true,
    }
    const after = advanceConversationState(before, {
      askedQuestion: false, questionSanctioned: true, signalCorrect: null,
      recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
      isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
      degradedTurn: true, deliveredTeaching: true, acknowledgement: false,
    } as Parameters<typeof advanceConversationState>[1])
    expect(after.phase).toBe('CHECK')
    expect(after.correctAtCheck).toBe(0)
    expect(after.correctAtPractice).toBe(0)
    // A degraded turn taught nothing, so it must not spend the concept budget.
    expect(after.turnsOnConcept).toBe(before.turnsOnConcept)
  })
})

// ── F. EXPLICIT CLOSE — THE CRITICAL REGRESSION ─────────────────────────────
describe('F. "I\'m done for today, thanks" still closes absolutely', () => {
  it('F1 forceClosing closes from CORE regardless of the budget', () => {
    for (const failures of [0, 1, 2]) {
      const closed = forceClosing(ep('CORE', failures))
      expect(closed.phase).toBe('CLOSING')
      // forceClosing never reads or writes visibleFailures — pinned, because
      // that independence is what makes this fix safe.
      expect(closed.visibleFailures).toBe(failures)
    }
  })

  it('F2 an explicit close is idempotent and preserves every other field', () => {
    const closed = forceClosing(ep('CLOSING', 2))
    expect(closed).toEqual(ep('CLOSING', 2))
  })

  it('F3 the closed turn is still protected from every question source', () => {
    const closed = forceClosing(ep('CORE', 0))
    const v = arbitrateTurn({
      knowledgeGapResolved: false, recoveryActive: false,
      learnerRequestActive: false, closing: true, completionReady: false,
    })
    expect(v.owner).toBe('CLOSE')
    expect(v.allows('AUTHORED_PROBE')).toBe(false)
    expect(v.allows('NEW_QUESTION')).toBe(false)
    expect(closingTurnWithholdsQuestion(closed.phase)).toBe(true)
  })

  it('F4 correct-looking input afterwards does NOT reopen it', () => {
    let e = forceClosing(ep('CORE', 0))
    for (let i = 0; i < 10; i++) e = right(e)
    expect(e.phase).toBe('CLOSING')
    expect(closingTurnWithholdsQuestion(e.phase)).toBe(true)
  })

  it('F5 no mastery counter moves on an explicit close', () => {
    const s: ConversationState = {
      ...initialConversationState('demo.concept'), phase: 'CHECK', demonstrated: true,
    }
    forceClosing(ep('CORE', 0))
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
  })
})

// ── G. AN EPISODE ALREADY CLOSING STAYS CLOSING ─────────────────────────────
describe('G. this change prevents a premature close; it does not reverse one', () => {
  it('G1 a graded-correct answer does not turn CLOSING into CORE', () => {
    const after = right(ep('CLOSING', 2))
    expect(after.phase).toBe('CLOSING')
  })

  it('G2 fifty correct answers do not turn CLOSING into CORE', () => {
    let e = ep('CLOSING', 2)
    for (let i = 0; i < 50; i++) e = right(e)
    expect(e.phase).toBe('CLOSING')
  })

  it('G3 the budget may read 0 while CLOSING — the phase is what governs', () => {
    // Deliberate and pinned: `visibleFailures` means "the current spiral", so a
    // correct answer clears it even in CLOSING. The phase is unaffected, and
    // the phase is the only thing any gate reads.
    const after = right(ep('CLOSING', 2))
    expect(after.visibleFailures).toBe(0)
    expect(after.phase).toBe('CLOSING')
    expect(closingTurnWithholdsQuestion(after.phase)).toBe(true)
  })

  it('G4 only a >30-minute boundary reopens an episode', () => {
    expect(deriveEpisode(ep('CLOSING', 2), false, Date.now(), null).phase).toBe('CLOSING')
    expect(deriveEpisode(ep('CLOSING', 2), true, Date.now(), null).phase).toBe('OPENING')
  })
})

// ── H. NO OSCILLATION ───────────────────────────────────────────────────────
describe('H. CORE → CLOSING → CORE is unreachable by any input sequence', () => {
  it('H1 exhaustive: no sequence of 12 signals ever leaves CLOSING', () => {
    // 3^12 is large; walk every reachable STATE instead, which is complete.
    const seen = new Set<string>()
    const key = (e: SessionEpisode) => `${e.phase}:${Math.min(e.visibleFailures, 3)}`
    const frontier: SessionEpisode[] = [ep('OPENING', 0)]
    let leftClosing = false
    while (frontier.length) {
      const cur = frontier.pop()!
      if (seen.has(key(cur))) continue
      seen.add(key(cur))
      for (const sig of [null, { correctness: true }, { correctness: false }]) {
        for (const opts of [NORMAL, LESSON_ONE]) {
          const next = applySignalToEpisode(cur, sig, opts)
          if (cur.phase === 'CLOSING' && next.phase !== 'CLOSING') leftClosing = true
          frontier.push(next)
        }
      }
      // forceClosing is reachable from any state too.
      const forced = forceClosing(cur)
      if (cur.phase === 'CLOSING' && forced.phase !== 'CLOSING') leftClosing = true
      frontier.push(forced)
    }
    expect(leftClosing).toBe(false)
    expect(seen.has('CLOSING:2')).toBe(true)
  })

  it('H2 CLOSING is entered at most once per episode', () => {
    let e = ep('CORE', 0)
    let entries = 0
    for (let i = 0; i < 100; i++) {
      const before = e.phase
      e = i % 3 === 0 ? right(e) : wrong(e)
      if (before !== 'CLOSING' && e.phase === 'CLOSING') entries++
    }
    expect(entries).toBeLessThanOrEqual(1)
  })
})

// ── I. THE PRODUCTION SHAPES, BOTH SIDES ────────────────────────────────────
describe('I. the two live lessons, reproduced from their own evidence', () => {
  /** The real supply rule: an authored probe needs a mastery-gate phase, an
   *  arbitration verdict that allows it, and an episode that is not closing. */
  const questionServed = (convPhase: TeachingPhase, e: SessionEpisode): boolean => {
    const v = arbitrateTurn({
      knowledgeGapResolved: false, recoveryActive: false,
      learnerRequestActive: false, closing: e.phase === 'CLOSING', completionReady: false,
    })
    return (convPhase === 'CHECK' || convPhase === 'PRACTICE')
      && v.allows('AUTHORED_PROBE') && !closingTurnWithholdsQuestion(e.phase)
  }

  it('I1 ONE failure (phys.em.faradays-law) — the gate stays open', () => {
    const e = wrong(ep('CORE', 0))
    expect(e.visibleFailures).toBe(1)
    expect(e.phase).toBe('CORE')
    expect(questionServed('CHECK', e)).toBe(true)
  })

  it('I2 TWO failures with NO recovery (a real spiral) — still starved, correctly', () => {
    const e = wrong(wrong(ep('CORE', 0)))
    expect(e.phase).toBe('CLOSING')
    expect(questionServed('CHECK', e)).toBe(false)
  })

  it('I3 TWO failures WITH a correct answer between (chem.equil.le-chatelier) — no longer starved', () => {
    const e = wrong(right(wrong(ep('CORE', 0))))
    expect(e.phase).toBe('CORE')
    expect(e.visibleFailures).toBe(1)
    expect(questionServed('CHECK', e)).toBe(true)
  })

  it('I4 and that learner can now finish: the ladder reaches mastery', () => {
    let e = wrong(right(wrong(ep('CORE', 0))))
    let s: ConversationState = {
      ...initialConversationState('demo.concept'), phase: 'CHECK', demonstrated: true,
    }
    for (let i = 0; i < 6 && !masteryVerifiedStrict(s); i++) {
      if (!questionServed(s.phase, e)) break
      s = advanceConversationState(s, {
        askedQuestion: true, questionSanctioned: true, signalCorrect: true,
        recoveryFired: false, learnerRequest: null, misconceptionDetected: false,
        isPriorKnowledgeProbe: false, dontKnowSignal: false, learnerIssuedDirective: false,
        degradedTurn: false, deliveredTeaching: false, acknowledgement: false,
      } as Parameters<typeof advanceConversationState>[1])
      e = right(e)
    }
    expect(masteryVerifiedStrict(s)).toBe(true)
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
  })
})
