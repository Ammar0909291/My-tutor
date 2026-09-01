/**
 * A2 — THE GATE MUST BE REACHABLE, AND THE MASTERY BAR MUST NOT MOVE.
 *
 * A1's finding, from a real beginner Mathematics session (math.arith.fractions,
 * 8 learner turns, no concept churn, `demonstrated` true): the ladder sat at
 * GUIDE with `correctAtCheck` 0. GUIDE→CHECK advances only on a SUCCESS while
 * in GUIDE, and the only trustworthy source of correctness is a gradeable
 * widget probe — but probe attachment was gated on CHECK|PRACTICE. The
 * machinery that produces reliable correctness was switched off in the phase
 * that needed it to advance, so the one answer given at GUIDE was a
 * model-written prose-only question that no grader could read.
 *
 * A2a opens attachment at GUIDE, on ask-turns only. A2b measures the silent
 * ladder reset. These tests pin both, and pin the invariant that matters more
 * than either: what a correct answer BUYS is unchanged.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isMasteryGatePhase, isProbeAttachablePhase } from '@/lib/teaching/gateAssessment'
import {
  advanceConversationState,
  initialConversationState,
  inspectConversationStateRead,
  readConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

const evidence = (over: Partial<TurnEvidence> = {}): TurnEvidence => ({
  askedQuestion: false,
  signalCorrect: null,
  recoveryFired: false,
  acknowledgement: false,
  ...(over as object),
} as TurnEvidence)

// ── A2a: attachment widened, mastery boundary untouched ─────────────────────

describe('A2a — where a probe may be attached', () => {
  it('opens GUIDE without touching the mastery boundary', () => {
    expect(isProbeAttachablePhase('GUIDE')).toBe(true)
    expect(isProbeAttachablePhase('CHECK')).toBe(true)
    expect(isProbeAttachablePhase('PRACTICE')).toBe(true)
    // The mastery boundary itself is UNCHANGED — this is the whole safety case.
    expect(isMasteryGatePhase('GUIDE')).toBe(false)
    expect(isMasteryGatePhase('CHECK')).toBe(true)
    expect(isMasteryGatePhase('PRACTICE')).toBe(true)
  })

  it('never opens a delivery phase below GUIDE', () => {
    for (const p of ['OBSERVE', 'DEMONSTRATE', 'TRANSFER', null, undefined, 'nonsense']) {
      expect(isProbeAttachablePhase(p), String(p)).toBe(p === 'TRANSFER' ? false : false)
    }
  })

  it('attaches below CHECK only on an ask turn, or to a learner who has failed', () => {
    // THE PRINCIPLE IS UNCHANGED: a teach turn must not have a question
    // stapled onto it. What changed is who it applies to.
    //
    // E1 extended the 'ask'-only condition from GUIDE to DEMONSTRATE, and at
    // DEMONSTRATE `decideNextMove` returns 'show' or 'teach' and NEVER 'ask'
    // — proven over 1,536 combinations of the real decider in
    // e1DemonstrateProbeUnreachable.test.ts. So there it was not a
    // restriction but a prohibition, and E1 could never fire at all.
    //
    // Measured harm (confidently-wrong learner, three concepts, deployed):
    // phys.opt.mirrors gave 3 gradeable questions in 12 turns with 5 of those
    // turns at DEMONSTRATE. A learner who is never asked a gradeable question
    // cannot demonstrate recovery however much they learn.
    //
    // DEMONSTRATE therefore opens only once the concept has produced a
    // FAILURE. A progressing learner's show turn stays a show turn — they
    // reach verified mastery without E1 today, measured across eight live
    // runs on four concepts — so the principle above still governs every
    // learner it was written for.
    //
    // WHY DEMONSTRATE OPENED: criterion 4 measured 25% in the 2026-08-31
    // physics re-measurement (114 of 456 questions carried an answer key), and
    // DEMONSTRATE holds the largest block of the ungradeable ones. It was
    // UNSAFE to open until probe depth completed — at a pool of exactly three,
    // spending one below the mastery gates makes mastery unreachable, the
    // defect that held physics at 79%. The per-concept surplus is enforced at
    // the serving site, so a bare-contract concept is unaffected.
    expect(ROUTE).toMatch(
      /\(phaseBeforeTurn === 'GUIDE' && evidenceMoveHoisted === 'ask'\)/,
    )
    expect(ROUTE).toMatch(
      /\(phaseBeforeTurn === 'DEMONSTRATE' && strugglingOnThisConcept\)/,
    )
    expect(ROUTE).toContain('const phaseAllowsProbe =')
    // The SHARED predicate is deliberately untouched — pinned by the case
    // above, which still requires isProbeAttachablePhase('DEMONSTRATE') false.
    expect(ROUTE).toContain('mayAttachProbeBelowGuide')
  })

  it('leaves CHECK/PRACTICE eligibility exactly as it was', () => {
    // isMasteryGatePhase is still the first disjunct, so those phases do not
    // depend on the new move condition.
    expect(ROUTE).toContain('isMasteryGatePhase(phaseBeforeTurn) ||')
  })

  it('does not widen the readiness guard, which shares the old predicate', () => {
    // The bare-"ready?" guard must keep meaning CHECK|PRACTICE.
    expect(ROUTE).toContain('const readinessAtGate = isBareAckHoisted && isGatePhase(')
  })
})

// ── THE INVARIANT: a correct answer buys exactly what it bought before ──────

describe('the mastery bar has not moved', () => {
  const succeed = evidence({ signalCorrect: true, askedQuestion: false })

  it('a correct answer at GUIDE advances the phase but banks no mastery', () => {
    const guide: ConversationState = {
      ...initialConversationState('c'), phase: 'GUIDE', demonstrated: true,
    }
    const next = advanceConversationState(guide, succeed)
    expect(next.phase).toBe('CHECK')
    // The counters are what mastery is made of — untouched at GUIDE.
    expect(next.correctAtCheck).toBe(0)
    expect(next.correctAtPractice).toBe(0)
  })

  it('CHECK still needs 1 correct, PRACTICE still needs 2', () => {
    const check: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK', demonstrated: true,
    }
    const afterCheck = advanceConversationState(check, succeed)
    expect(afterCheck.correctAtCheck).toBe(1)
    expect(afterCheck.phase).toBe('PRACTICE')

    const oneDown = advanceConversationState(afterCheck, succeed)
    expect(oneDown.correctAtPractice).toBe(1)
    expect(oneDown.phase).toBe('PRACTICE')          // not yet
    const twoDown = advanceConversationState(oneDown, succeed)
    expect(twoDown.correctAtPractice).toBe(2)
    expect(twoDown.phase).toBe('TRANSFER')          // only now
  })

  it('an acknowledgement still cannot buy mastery at a gate', () => {
    const check: ConversationState = {
      ...initialConversationState('c'), phase: 'CHECK', demonstrated: true,
    }
    const next = advanceConversationState(check, evidence({ acknowledgement: true }))
    expect(next.phase).toBe('CHECK')
    expect(next.correctAtCheck).toBe(0)
  })

  it('GUIDE→CHECK still requires a demonstration first', () => {
    const guide: ConversationState = {
      ...initialConversationState('c'), phase: 'GUIDE', demonstrated: false,
    }
    // A turn that only ASKS is not a give, so `demonstrated` stays false and
    // the gate stays shut even on a correct answer.
    const askOnly = evidence({ signalCorrect: true, askedQuestion: true, deliveredTeaching: false })
    expect(advanceConversationState(guide, askOnly).phase).toBe('GUIDE')

    // A turn that TEACHES and asks in one breath is a give — it sets
    // `demonstrated` on the same turn and the gate opens. This is the
    // "reachability law" the module documents, not a weakening of it.
    const teachAndAsk = evidence({ signalCorrect: true, askedQuestion: true, deliveredTeaching: true })
    expect(advanceConversationState(guide, teachAndAsk).phase).toBe('CHECK')
  })
})

// ── A2b: the silent reset is now observable, and still silent in behaviour ──

describe('A2b — the ladder reset is measured, not changed', () => {
  const stored = { ...initialConversationState('math.arith.fractions'), phase: 'GUIDE' as const }

  it('reports a keep when the concept is stable', () => {
    const d = inspectConversationStateRead(stored, 'math.arith.fractions')
    expect(d).toEqual({
      reset: false, reason: 'kept',
      storedConceptId: 'math.arith.fractions', currentConceptId: 'math.arith.fractions',
    })
  })

  it('reports a reset, and names the concept on both sides', () => {
    const d = inspectConversationStateRead(stored, 'math.arith.ratios')
    expect(d.reset).toBe(true)
    expect(d.reason).toBe('concept-changed')
    expect(d.storedConceptId).toBe('math.arith.fractions')
    expect(d.currentConceptId).toBe('math.arith.ratios')
  })

  it('separates a missing state from a real concept change', () => {
    expect(inspectConversationStateRead(null, 'c').reason).toBe('no-stored-state')
    expect(inspectConversationStateRead({ phase: 'NOPE' }, 'c').reason).toBe('unreadable-phase')
  })

  it('DIAGNOSES ONLY — readConversationState behaves exactly as before', () => {
    // Same inputs, same outputs: the measurement cannot have changed the thing
    // it measures.
    const kept = readConversationState(stored, 'math.arith.fractions')
    expect(kept.phase).toBe('GUIDE')
    const wiped = readConversationState(stored, 'math.arith.ratios')
    expect(wiped.phase).toBe('OBSERVE')
    expect(wiped.correctAtCheck).toBe(0)
    expect(wiped.demonstrated).toBe(false)
  })

  it('the route logs the reset and the source of the concept id', () => {
    expect(ROUTE).toContain('[ladder-reset]')
    expect(ROUTE).toContain("conceptSource: libraryConceptNodeIdHoisted ? 'library-node'")
    // Telemetry must never be able to break a turn.
    expect(ROUTE).toContain('/* telemetry only — a measurement must never break a turn */')
  })
})
