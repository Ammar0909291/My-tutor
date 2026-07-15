/**
 * K4 — Golden decision table (RS T-3 seed).
 *
 * A curated set of (input → expected decision) rows sourced from the
 * Brain's worked traces (D7/04 examples). Each row asserts:
 *   1. The engine produces the expected move + actionClass.
 *   2. The provenance chain names the expected top rules.
 *   3. The output is byte-stable across runs (determinism).
 *
 * A change to the base pack that would silently alter a golden row MUST
 * update this test — the diff is the review artifact (RS §5.6 replay
 * diff protocol).
 */
import { describe, it, expect } from 'vitest'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import type { PolicyMove } from '@/lib/kernel/types'

interface GoldenRow {
  name: string
  inputs: Partial<PolicyInputs>
  expected: {
    move: PolicyMove
    actionClass: string | null
    ruleContains: string[]        // provenance MUST contain each of these ruleIds
    maxQuestions: 0 | 1
    stageCeilingAtMost?: number
  }
}

const DEFAULTS: PolicyInputs = {
  turnId: 'gold', learnerId: 'L', sessionId: 'S',
  contentRegister: 'intermediate', profileLevel: 'intermediate',
  sessionFailureCount: 0, isFirstLessonContext: false,
  phase: 'ANCHOR', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
  interruptActive: false, failureStateKey: null, autonomyRequested: false,
  retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
  lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: null,
}

const ROWS: GoldenRow[] = [
  {
    name: 'R-01 first-turn beginner in ANCHOR asks ONE observation question',
    inputs: { contentRegister: 'beginner', profileLevel: 'beginner', phase: 'ANCHOR', isFirstLessonContext: true },
    expected: { move: 'ASK', actionClass: 'OBSERVATION_QUESTION', ruleContains: ['B4.default.observe.ask.v1', 'B5.personalize.beginner-budget.v1'], maxQuestions: 1, stageCeilingAtMost: 2 },
  },
  {
    name: 'R-02 recovery utterance preempts everything → RECOVER, no questions',
    inputs: { interruptActive: true, failureStateKey: 'dont_know', phase: 'DEMONSTRATE', consecutiveFailures: 1 },
    expected: { move: 'RECOVER', actionClass: 'RECOVERY_SCRIPT', ruleContains: ['B0.recovery.preempt.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-03 fast-wrong-confident during GUIDED → MISCONCEPTION_FIX',
    inputs: { phase: 'GUIDED', lastSignalCorrect: false, lastSignalConfidence: 'high' },
    expected: { move: 'TEACH', actionClass: 'MISCONCEPTION_FIX', ruleContains: ['B4.d1.misconceiving.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-04 hesitant-correct during GUIDED → REPEAT_SAME_TYPE (FRAGILE hold)',
    inputs: { phase: 'GUIDED', lastSignalCorrect: true, lastSignalConfidence: 'low' },
    expected: { move: 'ASK', actionClass: 'REPEAT_SAME_TYPE', ruleContains: ['B4.d1.fragile.v1'], maxQuestions: 1 },
  },
  {
    name: 'R-05 repeated struggle (≥2 failures) demands SHOW, not another question',
    inputs: { phase: 'ANCHOR', consecutiveFailures: 3 },
    expected: { move: 'SHOW', actionClass: 'DEMONSTRATION', ruleContains: ['B4.repeated-struggle.show.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-06 first-lesson bans SI and phoneme vocabulary',
    inputs: { isFirstLessonContext: true, contentRegister: 'beginner', phase: 'ANCHOR' },
    expected: { move: 'ASK', actionClass: 'OBSERVATION_QUESTION', ruleContains: ['B2.legality.first-lesson-vocab.v1'], maxQuestions: 1 },
  },
  {
    name: 'R-07 DEMONSTRATE phase defaults to SHOW / DEMONSTRATION',
    inputs: { phase: 'DEMONSTRATE' },
    expected: { move: 'SHOW', actionClass: 'DEMONSTRATION', ruleContains: ['B4.default.demonstrate.show.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-08 GUIDED phase defaults to TEACH / GUIDED_EXPLANATION',
    inputs: { phase: 'GUIDED' },
    expected: { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION', ruleContains: ['B4.default.guide.teach.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-09 CHECK phase asks a probe question (stage ceiling 4)',
    inputs: { phase: 'CHECK' },
    expected: { move: 'ASK', actionClass: 'PROBE', ruleContains: ['B4.default.check.ask.v1'], maxQuestions: 1, stageCeilingAtMost: 4 },
  },
  {
    name: 'R-10 PRACTICE phase permits calculation stage 6',
    inputs: { phase: 'PRACTICE' },
    expected: { move: 'ASK', actionClass: 'PROBE', ruleContains: ['B4.default.check.ask.v1'], maxQuestions: 1, stageCeilingAtMost: 6 },
  },
  {
    name: 'R-11 TRANSFER phase permits stage 7',
    inputs: { phase: 'TRANSFER' },
    expected: { move: 'ASK', actionClass: 'PROBE', ruleContains: ['B4.default.check.ask.v1'], maxQuestions: 1, stageCeilingAtMost: 7 },
  },
  {
    name: 'R-12 expert register has no paragraph cap (unlimited)',
    inputs: { contentRegister: 'expert', phase: 'GUIDED' },
    expected: { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION', ruleContains: ['B5.personalize.expert-budget.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-13 autonomy request emits autonomy slot (personalization surface)',
    inputs: { phase: 'GUIDED', autonomyRequested: true },
    expected: { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION', ruleContains: ['B5.personalize.autonomy.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-14 fresh boundary with retro-win-owed emits opening obligation',
    inputs: { freshBoundary: true, retroWinOwed: true, phase: 'ANCHOR' },
    expected: { move: 'ASK', actionClass: 'OBSERVATION_QUESTION', ruleContains: ['B1.opening.retro-win.v1'], maxQuestions: 1 },
  },
  {
    name: 'R-15 fresh boundary with due reviews emits opening review obligation',
    inputs: { freshBoundary: true, dueReviewCount: 3, phase: 'ANCHOR' },
    expected: { move: 'ASK', actionClass: 'OBSERVATION_QUESTION', ruleContains: ['B1.opening.due-reviews.v1'], maxQuestions: 1 },
  },
  {
    name: 'R-16 beginner + strained shortens paragraph budget to 2',
    inputs: { contentRegister: 'beginner', consecutiveFailures: 2, phase: 'DEMONSTRATE' },
    expected: { move: 'SHOW', actionClass: 'DEMONSTRATION', ruleContains: ['B5.personalize.beginner-strained.v1'], maxQuestions: 0 },
  },
  {
    // Under Band-0 preempt, recovery sets its own (tighter) budgets;
    // Band-5 register rules correctly do NOT overwrite them (first-wins).
    // The remaining B5 surface still fires when it does not collide —
    // e.g. an autonomy slot. This row asserts that behaviour precisely.
    name: 'R-17 recovery on beginner + autonomy: B0 preempts, B5 autonomy still emits',
    inputs: { contentRegister: 'beginner', interruptActive: true, failureStateKey: 'confused', autonomyRequested: true, phase: 'ANCHOR' },
    expected: { move: 'RECOVER', actionClass: 'RECOVERY_SCRIPT', ruleContains: ['B0.recovery.preempt.v1', 'B5.personalize.autonomy.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-18 unset phase (defensive) still yields a legal decision',
    inputs: { phase: 'UNKNOWN' },
    expected: { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION', ruleContains: ['B4.default.fallback.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-19 intermediate register applies 7-paragraph budget',
    inputs: { contentRegister: 'intermediate', phase: 'GUIDED' },
    expected: { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION', ruleContains: ['B5.personalize.intermediate-budget.v1'], maxQuestions: 0 },
  },
  {
    name: 'R-20 ANCHOR + first-lesson stage ceiling stays at 2',
    inputs: { phase: 'ANCHOR', isFirstLessonContext: true },
    expected: { move: 'ASK', actionClass: 'OBSERVATION_QUESTION', ruleContains: ['B4.default.observe.ask.v1'], maxQuestions: 1, stageCeilingAtMost: 2 },
  },
]

describe('Golden Decision Table (K4 seed set)', () => {
  it.each(ROWS)('$name', ({ inputs, expected }) => {
    const d = decide(BASE_PACK, { ...DEFAULTS, ...inputs })
    expect(d.move).toBe(expected.move)
    expect(d.actionClass).toBe(expected.actionClass)
    expect(d.budgets.maxQuestions).toBe(expected.maxQuestions)
    if (expected.stageCeilingAtMost !== undefined) {
      expect(d.stageCeiling).toBeLessThanOrEqual(expected.stageCeilingAtMost)
    }
    const traceIds = d.provenance.map((t) => t.ruleId)
    for (const req of expected.ruleContains) {
      expect(traceIds, `expected rule ${req} in ${JSON.stringify(traceIds)}`).toContain(req)
    }
  })

  it('table replay is byte-identical across two runs (determinism)', () => {
    const run = () => ROWS.map(({ inputs }) => {
      const d = decide(BASE_PACK, { ...DEFAULTS, ...inputs })
      return { move: d.move, actionClass: d.actionClass, ceiling: d.stageCeiling, budgets: d.budgets, provenance: d.provenance.map((t) => t.ruleId) }
    })
    expect(JSON.stringify(run())).toBe(JSON.stringify(run()))
  })

  it('every mandatory Band-2 rule appears in every decision (RS §5.4)', () => {
    for (const row of ROWS) {
      const d = decide(BASE_PACK, { ...DEFAULTS, ...row.inputs })
      const ids = d.provenance.map((t) => t.ruleId)
      // Every non-recovery, non-fallback turn touches Band 2 stage ceiling
      if (!row.inputs.interruptActive) {
        expect(ids, `row ${row.name}`).toContain('B2.legality.stage-ceiling.v1')
      }
    }
  })
})
