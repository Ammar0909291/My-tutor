/**
 * K4 — Action resolver + RenderPlan builder tests.
 */
import { describe, it, expect } from 'vitest'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import { resolveAction } from '@/lib/kernel/actions/resolver'
import { PHASE_FIT } from '@/lib/kernel/actions/catalog'
import { buildRenderPlan } from '@/lib/kernel/planner/renderPlan'
import type { PolicyInputs } from '@/lib/kernel/policy/types'

function inputs(over: Partial<PolicyInputs> = {}): PolicyInputs {
  return {
    turnId: 't', learnerId: 'L', sessionId: 'S',
    contentRegister: 'intermediate', profileLevel: 'intermediate',
    sessionFailureCount: 0, isFirstLessonContext: false,
    phase: 'ANCHOR', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
    interruptActive: false, failureStateKey: null, autonomyRequested: false,
    retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
    lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: null,
    ...over,
  }
}

describe('resolveAction', () => {
  it('honours policy hint when the hint is legal for the phase', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'ANCHOR' }))    // hints OBSERVATION_QUESTION
    const a = resolveAction(d, 'ANCHOR')
    expect(a.actionId).toBe('OBSERVATION_QUESTION')
    expect(a.provenance).toBe('policy:actionClass')
  })

  it('falls back to the phase-fit list when the hint is illegal (never invents)', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'ANCHOR' }))
    const forceIllegal = { ...d, actionClass: 'FADED_PRACTICE' }   // not in ANCHOR fit
    const a = resolveAction(forceIllegal, 'ANCHOR')
    expect(PHASE_FIT.ANCHOR).toContain(a.actionId)
    expect(a.provenance).toMatch(/fallback:phase-fit/)
  })

  it('lifts presentation to visual_and_text when a visual class is set', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'DEMONSTRATE' }))
    const withVisual = { ...d, visualClass: 'number_line' }
    const a = resolveAction(withVisual, 'DEMONSTRATE')
    expect(a.presentationMode).toBe('visual_and_text')
    expect(a.visualClass).toBe('number_line')
  })
})

describe('buildRenderPlan', () => {
  it('appends the TURN DIRECTIVE and records it in ownedBlocks', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'ANCHOR' }))
    const a = resolveAction(d, 'ANCHOR')
    const plan = buildRenderPlan({
      learnerId: 'L1', turnId: 't1', phase: 'ANCHOR',
      decision: d, action: a,
      systemPromptStem: 'You are a tutor.',
      history: [{ role: 'user', content: 'hi' }],
    })
    expect(plan.systemPrompt).toContain('TURN DIRECTIVE')
    expect(plan.ownedBlocks).toContain('TURN_DIRECTIVE')
    expect(plan.budgets.maxQuestions).toBe(1)
  })

  it('emits a VOCABULARY BAN block when bans present', () => {
    const d = decide(BASE_PACK, inputs({ isFirstLessonContext: true, contentRegister: 'beginner' }))
    const a = resolveAction(d, 'ANCHOR')
    const plan = buildRenderPlan({
      learnerId: 'L1', turnId: 't1', phase: 'ANCHOR',
      decision: d, action: a,
      systemPromptStem: '', history: [],
    })
    expect(plan.systemPrompt).toContain('VOCABULARY BAN')
    expect(plan.ownedBlocks).toContain('VOCABULARY_BAN')
  })

  it('emits a LENGTH BUDGET line for bounded budgets and SESSION OPENING on fresh boundary', () => {
    const d = decide(BASE_PACK, inputs({ contentRegister: 'beginner', freshBoundary: true, retroWinOwed: true, dueReviewCount: 2 }))
    const a = resolveAction(d, 'ANCHOR')
    const plan = buildRenderPlan({
      learnerId: 'L1', turnId: 't1', phase: 'ANCHOR',
      decision: d, action: a,
      systemPromptStem: '', history: [],
      freshBoundary: true, retroWinOwed: true, dueReviewCount: 2,
    })
    expect(plan.systemPrompt).toContain('LENGTH BUDGET')
    expect(plan.systemPrompt).toContain('SESSION OPENING')
    expect(plan.systemPrompt).toContain('engineered small win')
    expect(plan.ownedBlocks).toContain('LENGTH_BUDGET')
    expect(plan.ownedBlocks).toContain('SESSION_OPENING')
  })

  it('provenance links back to policy rule ids', () => {
    const d = decide(BASE_PACK, inputs({ phase: 'DEMONSTRATE' }))
    const a = resolveAction(d, 'DEMONSTRATE')
    const plan = buildRenderPlan({
      learnerId: 'L1', turnId: 't1', phase: 'DEMONSTRATE',
      decision: d, action: a,
      systemPromptStem: '', history: [],
    })
    expect(plan.provenance.every((id) => /^(B[0-6]\.|engine:)/.test(id))).toBe(true)
  })
})
