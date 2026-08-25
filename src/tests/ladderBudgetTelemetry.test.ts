/**
 * PHASE 7N-2 — measure the probe-starvation loop before deciding how to fix it.
 *
 * WHAT 7M-B PROVED IN PRODUCTION (chem.atomic.bohr-model, 2026-08-25). A learner
 * asked to be quizzed five times at GUIDE and received five UNREVIEWED
 * model-generated questions, while three authored gradeable probes for that
 * concept sat unused:
 *
 *   [gate-assessment]  zero lines — the gate never ran
 *   [turn-decision]    probeId: null,
 *                      divergences: ["QUESTION_SHIPPED_WITHOUT_PROBE"]
 *   [ladder]           move: 'teach' on every single turn
 *
 * THE PRECEDENCE THE EXISTING LOGS COULD NOT SHOW, and which this file pins so
 * it cannot drift:
 *
 *   conversationState.ts:1089  if (questionsAskedSinceTeach >= 2) return teach|show
 *   conversationState.ts:1097  switch (state.phase) {
 *   conversationState.ts:1116    case 'GUIDE': (teachSegmentsSinceQuestion >= 2
 *                                  || ctx.practiceRequested) ? 'ask' : 'teach'
 *
 * The budget returns BEFORE the phase switch, so Phase 7H's explicit-request
 * override is unreachable once the counter reaches 2 — and the counter is fed by
 * `askedQuestion`, which counts the MODEL's own volunteered questions. Every
 * unreviewed question holds the reviewed one shut a little harder.
 *
 * THIS PHASE CHANGES NO BEHAVIOUR. It adds five read-only fields to one log line
 * so the choice between the two candidate 7N-1 fixes is made on production
 * frequency rather than on inference. These tests assert BOTH halves: that the
 * mechanism is real, and that nothing about it moved.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  initialConversationState, decideNextMove, advanceConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const STATE_SRC = readFileSync('src/lib/teaching/conversationState.ts', 'utf8')
const CONCEPT = 'chem.atomic.bohr-model'

const guide = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState(CONCEPT),
  phase: 'GUIDE', taughtThisSession: true, demonstrated: true, ...over,
})
const ctx = (over: Record<string, unknown> = {}) =>
  ({ recoveryTurn: false, workedExampleFirst: false, ...over }) as never

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE MECHANISM IS REAL — pinned against the actual engine
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-2 — the loop this telemetry measures', () => {
  it('the budget outranks an explicit practice request at GUIDE', () => {
    // Exactly the production condition: the learner asked, GUIDE would allow
    // it, and the counter is spent.
    const starved = guide({ questionsAskedSinceTeach: 2, teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(starved, ctx({ practiceRequested: true }))).not.toBe('ask')
  })

  it('...and with the counter unspent, the SAME request opens the gate', () => {
    const fresh = guide({ questionsAskedSinceTeach: 0, teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(fresh, ctx({ practiceRequested: true }))).toBe('ask')
  })

  it('THE LOOP: a model question that the gate never selected still spends the budget', () => {
    // askedQuestion is true for a MODEL-volunteered MCQ, and that is what the
    // counter folds on. Two such turns are enough to shut the authored gate.
    let s = guide({ questionsAskedSinceTeach: 0 })
    for (let i = 0; i < 2; i++) {
      s = advanceConversationState(s, { askedQuestion: true, signalCorrect: null, recoveryFired: false }, CONCEPT)
    }
    expect(s.questionsAskedSinceTeach).toBeGreaterThanOrEqual(2)
    expect(s.teachSegmentsSinceQuestion).toBe(0)
    expect(decideNextMove(s, ctx({ practiceRequested: true }))).not.toBe('ask')
  })

  it('the budget check really does precede the phase switch in source', () => {
    const budgetAt = STATE_SRC.indexOf('if (state.questionsAskedSinceTeach >= 2)')
    const switchAt = STATE_SRC.indexOf("switch (state.phase) {", budgetAt - 4000)
    const guideAt = STATE_SRC.indexOf("case 'GUIDE':", budgetAt)
    expect(budgetAt).toBeGreaterThan(-1)
    expect(guideAt).toBeGreaterThan(budgetAt)   // the override is downstream
    expect(switchAt).toBeGreaterThan(budgetAt)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE TELEMETRY IS PRESENT AND READS THE RIGHT SIDE OF THE FOLD
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-2 — the ladder line carries the five fields', () => {
  const ladderAt = ROUTE.indexOf("console.log('[ladder]', {")
  const block = ROUTE.slice(ladderAt, ROUTE.indexOf('})', ladderAt) + 2)

  for (const f of ['questionsAskedSinceTeach', 'teachSegmentsSinceQuestion',
                   'wantsPractice', 'phaseAllowsProbe', 'budgetDeniedRequestedAsk']) {
    it(`[ladder] reports ${f}`, () => {
      expect(block).toContain(f)
    })
  }

  it('the counters are read PRE-turn — the value the budget actually saw', () => {
    // conversationStateAfterTurnHoisted would report the post-fold value, which
    // is not what decideNextMove read. Getting this backwards would make the
    // telemetry describe a decision that never happened.
    expect(block).toContain('questionsAskedSinceTeach: conversationStateHoisted?.questionsAskedSinceTeach')
    expect(block).toContain('teachSegmentsSinceQuestion: conversationStateHoisted?.teachSegmentsSinceQuestion')
  })

  it('the pre-existing fields are all still reported — nothing was displaced', () => {
    for (const f of ['signalTag', 'correctness', 'move', 'mcqAsked', 'ack',
                     'excursion', 'askedQuestion', 'phaseBefore', 'phaseAfter',
                     'check', 'practice']) {
      expect(block).toContain(f)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. NEGATIVE CONTROLS — this phase must change NOTHING
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-2 — no behaviour changed', () => {
  it('decideNextMove is untouched across the full GUIDE matrix', () => {
    const cases: Array<[Partial<ConversationState>, boolean, string]> = [
      [{ questionsAskedSinceTeach: 0, teachSegmentsSinceQuestion: 0 }, false, 'teach'],
      [{ questionsAskedSinceTeach: 0, teachSegmentsSinceQuestion: 2 }, false, 'ask'],
      [{ questionsAskedSinceTeach: 0, teachSegmentsSinceQuestion: 0 }, true, 'ask'],
      [{ questionsAskedSinceTeach: 2, teachSegmentsSinceQuestion: 0 }, true, 'teach'],
      [{ questionsAskedSinceTeach: 2, consecutiveFailures: 1 }, true, 'show'],
    ]
    for (const [over, requested, expected] of cases) {
      expect(decideNextMove(guide(over), ctx({ practiceRequested: requested }))).toBe(expected)
    }
  })

  it('the telemetry is a pure read — no assignment to engine state', () => {
    const ladderAt = ROUTE.indexOf("console.log('[ladder]', {")
    const block = ROUTE.slice(ladderAt, ROUTE.indexOf('})', ladderAt) + 2)
    // A field may READ hoisted values; it must never write one.
    expect(/\b(conversationStateHoisted|evidenceMoveHoisted|phaseAllowsProbeHoisted)\s*=[^=]/.test(block)).toBe(false)
  })

  it('recovery, closing and question-legality precedence are unchanged', () => {
    // Spot-check the three rules that outrank the GUIDE branch, so this
    // instrumentation cannot be blamed for a precedence change later.
    expect(decideNextMove(guide({ teachSegmentsSinceQuestion: 5 }), ctx({ recoveryTurn: true }))).toBe('teach')
    expect(decideNextMove(guide({ teachSegmentsSinceQuestion: 5, askSuppressedTurns: 3 }), ctx())).not.toBe('ask')
  })
})
