import { describe, it, expect, beforeEach } from 'vitest'
import {
  recordDispatch, recordServe, snapshotBrainMetrics, resetBrainMetrics,
  ESTIMATED_TOKENS_PER_CALL, ESTIMATED_USD_PER_CALL,
} from '@/lib/understanding/brainMetrics'
import { planDispatch } from '@/lib/understanding/dispatcher'
import type { TeachingDecision } from '@/lib/understanding/decisionEngine'

/**
 * P9 — cost/avoidance metrics on the EXISTING metrics owner.
 * Plans are produced by the real planDispatch(), so these tests also pin the
 * contract that avoidance is counted from the dispatch plan's own
 * groqRequired flag — the single routing authority — and never re-derived.
 */

const decision = (d: TeachingDecision['decision']): TeachingDecision => ({
  version: 1,
  decision: d,
  reason: 'test',
  confidence: 'medium',
} as TeachingDecision)

describe('avoidance is counted from the dispatch plan, not re-derived', () => {
  beforeEach(() => resetBrainMetrics())

  it('a memory serve is counted as avoided', () => {
    const plan = planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true })
    expect(plan.groqRequired).toBe(false)
    recordDispatch(plan, true)
    const m = snapshotBrainMetrics()
    expect(m.deterministicServes).toBe(1)
    expect(m.avoidedGeminiCalls).toBe(1)
  })

  it('an LLM plan is NOT counted as avoided', () => {
    const plan = planDispatch(decision('CONTINUE_LESSON'), { assembledAvailable: false })
    expect(plan.groqRequired).toBe(true)
    recordDispatch(plan, true)
    expect(snapshotBrainMetrics().deterministicServes).toBe(0)
  })

  it('the memory FALLBACK (no assembled asset) counts as an LLM turn', () => {
    // The dispatcher's fallback law: a memory decision without content must
    // still reach the model. It must not be miscounted as a saving.
    const plan = planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: false })
    expect(plan.groqRequired).toBe(true)
    recordDispatch(plan, true)
    const m = snapshotBrainMetrics()
    expect(m.deterministicServes).toBe(0)
    expect(m.fallbacks).toBe(1)
  })

  it('a null plan counts as a fallback and never as a saving', () => {
    recordDispatch(null, false)
    const m = snapshotBrainMetrics()
    expect(m.deterministicServes).toBe(0)
    expect(m.fallbacks).toBe(1)
  })
})

describe('derived cost figures', () => {
  beforeEach(() => resetBrainMetrics())

  it('is zero on a fresh process', () => {
    const m = snapshotBrainMetrics()
    expect(m.avoidancePercent).toBe(0)
    expect(m.estimatedTokensSaved).toBe(0)
    expect(m.estimatedCostSavedUsd).toBe(0)
  })

  it('computes avoidance percent over total turns', () => {
    const memory = planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true })
    const llm = planDispatch(decision('CONTINUE_LESSON'), { assembledAvailable: false })
    recordDispatch(memory, true)
    recordDispatch(llm, true)
    recordDispatch(llm, true)
    recordDispatch(llm, true)
    const m = snapshotBrainMetrics()
    expect(m.totalTurns).toBe(4)
    expect(m.avoidedGeminiCalls).toBe(1)
    expect(m.avoidancePercent).toBe(25)
  })

  it('estimates tokens and cost from the avoided calls', () => {
    const memory = planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true })
    recordDispatch(memory, true)
    recordDispatch(memory, true)
    const m = snapshotBrainMetrics()
    expect(m.estimatedTokensSaved).toBe(2 * ESTIMATED_TOKENS_PER_CALL)
    expect(m.estimatedCostSavedUsd).toBeCloseTo(2 * ESTIMATED_USD_PER_CALL, 6)
  })
})

describe('existing metrics are preserved (no regression)', () => {
  beforeEach(() => resetBrainMetrics())

  it('still counts serves, decisions, active and shadow turns', () => {
    const plan = planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true })
    recordDispatch(plan, true)
    recordDispatch(plan, false)
    recordServe('memory')
    recordServe('llm')
    const m = snapshotBrainMetrics()
    expect(m.explanationMemoryServes).toBe(1)
    expect(m.groqCalls).toBe(1)
    expect(m.activeTurns).toBe(1)
    expect(m.shadowTurns).toBe(1)
    expect(m.decisions.SERVE_EXPLANATION_MEMORY).toBe(2)
  })

  it('reset clears the new counter too', () => {
    recordDispatch(planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true }), true)
    resetBrainMetrics()
    const m = snapshotBrainMetrics()
    expect(m.deterministicServes).toBe(0)
    expect(m.totalTurns).toBe(0)
  })

  it('the snapshot is a copy — callers cannot mutate live metrics', () => {
    recordDispatch(planDispatch(decision('CONTINUE_LESSON'), { assembledAvailable: false }), true)
    const m = snapshotBrainMetrics()
    m.decisions.CONTINUE_LESSON = 999
    expect(snapshotBrainMetrics().decisions.CONTINUE_LESSON).toBe(1)
  })

  it('never throws, whatever it is handed', () => {
    expect(() => recordDispatch(null, true)).not.toThrow()
    expect(() => recordServe('memory')).not.toThrow()
  })
})

describe('exactly one routing authority', () => {
  it('every decision routes through planDispatch and declares groqRequired', () => {
    const all: TeachingDecision['decision'][] = [
      'SERVE_EXPLANATION_MEMORY', 'ASK_DIAGNOSTIC_QUESTION', 'DETECT_MISCONCEPTION',
      'REVIEW_PREREQUISITE', 'TEACH_DIRECTLY', 'CONTINUE_LESSON', 'PRACTICE',
      'VISUALIZATION', 'ESCALATE_TO_LLM',
    ]
    for (const d of all) {
      const plan = planDispatch(decision(d), { assembledAvailable: true })
      expect(typeof plan.groqRequired).toBe('boolean')
    }
  })

  it('no LLM_RENDERER decision avoids the model; the memory serve does', () => {
    const all: TeachingDecision['decision'][] = [
      'ASK_DIAGNOSTIC_QUESTION', 'DETECT_MISCONCEPTION', 'REVIEW_PREREQUISITE',
      'TEACH_DIRECTLY', 'CONTINUE_LESSON', 'PRACTICE', 'VISUALIZATION', 'ESCALATE_TO_LLM',
    ]
    for (const d of all) {
      expect(planDispatch(decision(d), { assembledAvailable: true }).groqRequired).toBe(true)
    }
    expect(planDispatch(decision('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true }).groqRequired).toBe(false)
  })
})
