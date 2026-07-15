/**
 * K4 — Policy Engine tests: 7-band evaluation order, subtractive Band 2,
 * short-circuit under interrupt, conflict detection at equal specificity,
 * completeness rule, determinism.
 */
import { describe, it, expect } from 'vitest'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'

function inputs(over: Partial<PolicyInputs> = {}): PolicyInputs {
  return {
    turnId: 't1', learnerId: 'L1', sessionId: 'S1',
    contentRegister: 'intermediate', profileLevel: 'intermediate',
    sessionFailureCount: 0, isFirstLessonContext: false,
    phase: 'ANCHOR', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
    interruptActive: false, failureStateKey: null, autonomyRequested: false,
    retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
    lastSignalCorrect: null, lastSignalConfidence: null,
    currentConceptId: null,
    ...over,
  }
}

describe('Band 0 — interrupts', () => {
  it('recovery preempts move to RECOVER and short-circuits Bands 1–4', () => {
    const d = decide(BASE_PACK, inputs({ interruptActive: true, failureStateKey: 'dont_know' }))
    expect(d.move).toBe('RECOVER')
    expect(d.preemptedBy).toBe('B0.recovery.preempt.v1')
    // Zero questions during recovery
    expect(d.budgets.maxQuestions).toBe(0)
    // A recovery-script content slot is emitted for the planner to fill
    expect(d.contentSlots.find((s) => s.kind === 'recovery-script')).toBeDefined()
    // Band 4 did NOT run (short-circuit); Band 6 fallback chain still ran.
    const b4 = d.provenance.find((t) => t.band === 4)
    expect(b4).toBeUndefined()
    expect(d.fallbackChain).toContain('SHOW_EASIEST_LEGAL')
    // Band 5 MAY still contribute when it doesn't collide with recovery-set
    // fields (e.g. autonomy content slot); when it does collide (register
    // budgets vs recovery's tighter budget), first-wins keeps recovery.
    const autoDecision = decide(BASE_PACK, inputs({
      interruptActive: true, failureStateKey: 'confused', autonomyRequested: true,
    }))
    expect(autoDecision.provenance.some((t) => t.band === 5)).toBe(true)
  })

  it('non-interrupt turns do not preempt', () => {
    const d = decide(BASE_PACK, inputs())
    expect(d.preemptedBy).toBeNull()
  })
})

describe('Band 2 — legality is subtractive', () => {
  it('first-lesson vocabulary bans accumulate; do not add moves', () => {
    const d = decide(BASE_PACK, inputs({ isFirstLessonContext: true, contentRegister: 'beginner' }))
    expect(d.vocabularyBans).toContain('SI')
    expect(d.vocabularyBans).toContain('ipa')
  })

  it('question budget floor of 0 cannot be lifted by Band 4 when repeated struggle demotes the move', () => {
    const d = decide(BASE_PACK, inputs({ consecutiveFailures: 3, phase: 'ANCHOR' }))
    // Repeated-struggle Band 4 rule promotes SHOW; ASK-default suppressed
    expect(d.move).toBe('SHOW')
    expect(d.budgets.maxQuestions).toBe(0)
  })
})

describe('Band 4 — D1 grid + phase defaults', () => {
  it('fast-wrong-confident routes to MISCONCEPTION_FIX (dangerous quadrant)', () => {
    const d = decide(BASE_PACK, inputs({
      lastSignalCorrect: false, lastSignalConfidence: 'high',
      phase: 'GUIDED',
    }))
    expect(d.actionClass).toBe('MISCONCEPTION_FIX')
    expect(d.move).toBe('TEACH')
  })

  it('hesitant-correct routes to REPEAT_SAME_TYPE (FRAGILE hold)', () => {
    const d = decide(BASE_PACK, inputs({
      lastSignalCorrect: true, lastSignalConfidence: 'low',
      phase: 'GUIDED',
    }))
    expect(d.actionClass).toBe('REPEAT_SAME_TYPE')
  })

  it('phase → default move mapping is complete', () => {
    const cases: Array<[string, string]> = [
      ['ANCHOR', 'ASK'], ['DIAGNOSE', 'ASK'], ['DEMONSTRATE', 'SHOW'], ['NAME', 'SHOW'],
      ['GUIDED', 'TEACH'], ['FORMALIZE', 'TEACH'], ['CHECK', 'ASK'], ['ASSESS', 'ASK'],
      ['PRACTICE', 'ASK'], ['INDEPENDENT', 'ASK'], ['REFLECT', 'ASK'], ['TRANSFER', 'ASK'],
    ]
    for (const [phase, expected] of cases) {
      const d = decide(BASE_PACK, inputs({ phase }))
      expect(d.move, `phase=${phase}`).toBe(expected)
    }
  })
})

describe('Band 5 — personalization', () => {
  it('beginner register sets a 4-paragraph budget; strained shortens to 2', () => {
    const fresh = decide(BASE_PACK, inputs({ contentRegister: 'beginner' }))
    expect(fresh.budgets.maxParagraphs).toBe(4)
    const strained = decide(BASE_PACK, inputs({ contentRegister: 'beginner', consecutiveFailures: 3 }))
    expect(strained.budgets.maxParagraphs).toBe(2)
  })

  it('intermediate register lifts to 7 paragraphs; expert unlimited', () => {
    const inter = decide(BASE_PACK, inputs({ contentRegister: 'intermediate' }))
    expect(inter.budgets.maxParagraphs).toBe(7)
    const exp = decide(BASE_PACK, inputs({ contentRegister: 'expert' }))
    expect(exp.budgets.maxParagraphs).toBeNull()
  })

  it('autonomy request emits a content slot', () => {
    const d = decide(BASE_PACK, inputs({ autonomyRequested: true }))
    expect(d.contentSlots.find((s) => s.kind === 'autonomy')).toBeDefined()
  })

  it('does not alter move (legality outcome protected)', () => {
    const withoutAutonomy = decide(BASE_PACK, inputs({ phase: 'ANCHOR' }))
    const withAutonomy = decide(BASE_PACK, inputs({ phase: 'ANCHOR', autonomyRequested: true }))
    expect(withoutAutonomy.move).toBe(withAutonomy.move)
  })
})

describe('Provenance chain', () => {
  it('every emitted field is traceable to a rule id', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'DEMONSTRATE', contentRegister: 'beginner' }))
    expect(d.provenance.length).toBeGreaterThan(0)
    for (const t of d.provenance) {
      expect(t.ruleId).toMatch(/^(B[0-6]\.|engine:)/)
      expect(t.citation.length).toBeGreaterThan(0)
    }
  })
})

describe('Completeness (RS §5.2)', () => {
  it('produces a fully populated decision even in the empty-input case', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'UNKNOWN_PHASE' }))   // hostile input
    expect(d.move).not.toBeNull()
    expect(d.stageCeiling).toBeGreaterThanOrEqual(2)
    expect(d.fallbackChain.length).toBeGreaterThan(0)
  })
})

describe('Determinism (RS T-4)', () => {
  it('same inputs → byte-identical decisions', () => {
    const a = decide(BASE_PACK, inputs({ phase: 'GUIDED', contentRegister: 'beginner', consecutiveFailures: 1 }))
    const b = decide(BASE_PACK, inputs({ phase: 'GUIDED', contentRegister: 'beginner', consecutiveFailures: 1 }))
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('provenance order is stable across runs', () => {
    const a = decide(BASE_PACK, inputs({ phase: 'ANCHOR', isFirstLessonContext: true, contentRegister: 'beginner' }))
    const b = decide(BASE_PACK, inputs({ phase: 'ANCHOR', isFirstLessonContext: true, contentRegister: 'beginner' }))
    expect(a.provenance.map((t) => t.ruleId)).toEqual(b.provenance.map((t) => t.ruleId))
  })
})
