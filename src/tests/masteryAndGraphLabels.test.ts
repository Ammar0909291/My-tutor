/**
 * P1-1 (a generated graph must say what it shows) and P1-4 (mastery must buy
 * the learner something), both measured in the same production audit.
 */
import { describe, it, expect } from 'vitest'
import { validateGeneratedFigure } from '@/lib/teaching/visual/visualEngine'
import { decideTeaching } from '@/lib/understanding/decisionEngine'
import { buildBrainExecutionBlock } from '@/lib/understanding/execution'
import { planDispatch } from '@/lib/understanding/dispatcher'
import type { StudentTurnUnderstanding } from '@/lib/understanding/types'

const ctx = {
  conceptId: 'phys.mech.kinetic-energy',
  title: 'Kinetic Energy',
  description: 'The energy an object possesses due to its motion, equal to one half m v squared.',
  prerequisites: [],
  difficulty: 'developing' as const,
}

describe('a generated graph must name its axes', () => {
  it('REJECTS the exact figure a learner received — no axis labels', () => {
    // Measured on screen: a parabola, ticks −5…5, the caption
    // "y = 0.5 * 2 * x^2", and a tutor saying "velocity on the horizontal
    // axis, kinetic energy on the vertical" about labels that were not there.
    const result = validateGeneratedFigure(
      { type: 'graph', equation: '0.5 * 2 * x^2', title: 'Kinetic Energy as a Function of Velocity (m = 2 kg)' },
      ctx, { requireAxisLabels: true },
    )
    expect(result.ok).toBe(false)
    expect(result.ok === false && result.reason).toBe('unlabelled-axes')
  })

  it('ACCEPTS the same figure once the axes say what they measure', () => {
    const result = validateGeneratedFigure(
      {
        type: 'graph', equation: '0.5 * 2 * x^2',
        title: 'Kinetic Energy as a Function of Velocity (m = 2 kg)',
        xLabel: 'Velocity (m/s)', yLabel: 'Kinetic energy (J)',
      },
      ctx,
    )
    expect(result.ok).toBe(true)
  })

  it('rejects a half-labelled graph', () => {
    const result = validateGeneratedFigure(
      { type: 'graph', equation: 'x^2', title: 'Kinetic Energy', xLabel: 'Velocity (m/s)' },
      ctx, { requireAxisLabels: true },
    )
    expect(result.ok).toBe(false)
  })

  it('rejects whitespace-only labels', () => {
    const result = validateGeneratedFigure(
      { type: 'graph', equation: 'x^2', title: 'Kinetic Energy', xLabel: '  ', yLabel: '  ' },
      ctx, { requireAxisLabels: true },
    )
    expect(result.ok).toBe(false)
  })

  it('does not impose axis labels on non-graph forms', () => {
    // A process flow has no axes; requiring labels there would delete a whole
    // renderer for no reason.
    const result = validateGeneratedFigure(
      { type: 'process_flow', title: 'Energy transfer in a collision', steps: [{ title: 'Objects approach' }, { title: 'They collide' }] },
      ctx,
    )
    expect(result.ok).toBe(true)
  })

  it('the decline answer is still distinguishable from a failure', () => {
    const result = validateGeneratedFigure({ type: 'none' }, ctx)
    expect(result.ok === false && result.reason).toBe('no-suitable-form')
  })
})

// ── mastery ──────────────────────────────────────────────────────────────────

const understanding = (over: Partial<Record<string, unknown>> = {}): StudentTurnUnderstanding => ({
  version: 1,
  computedAt: new Date().toISOString(),
  studentIntent: { value: 'answering', source: 'conversationHeuristic', confidence: 0.8 },
  conversationIntent: { value: 'lesson', source: 'heuristic', confidence: 0.8 },
  currentTopic: { value: 'chem.thermo.gibbs (Gibbs Free Energy)', source: 'knowledgeGraph', confidence: 0.95 },
  prerequisiteTopic: { value: 'unknown', source: 'unavailable', confidence: 0 },
  confidence: { value: 'high', source: 'signals:lastSignal', confidence: 0.7 },
  masteryState: { value: 'progressing', source: 'signals:lastSignal', confidence: 0.7 },
  misconceptionCandidates: [],
  explanationMemoryHits: [],
  progressState: { value: 'on_track', source: 'contextSnapshot', confidence: 0.6 },
  conversationSummary: {
    turnCount: 6, userTurns: 3, assistantTurns: 3, lastAssistantAskedQuestion: true,
    currentMessageChars: 90, currentMessageIsQuestion: false, helpRequestKind: null,
    hedged: false, source: 'conversationHeuristic',
  },
  requiredVisualization: { value: 'none', source: 'visualDetection', confidence: 0.5 },
  lessonCompleted: { value: false, source: 'contextSnapshot', confidence: 1 },
  recommendedTeachingMode: { value: 'ACCELERATED_GROWTH', source: 'teachingStrategy', confidence: 0.85 },
  uncertainty: [],
  provenance: {},
  confidenceScores: {},
  ...over,
} as unknown as StudentTurnUnderstanding)

describe('demonstrated mastery raises the demand', () => {
  it('the ΔG learner is advanced, not redirected', () => {
    // Production: "I know that delta G equals delta H minus T delta S, and a
    // reaction is spontaneous when delta G is negative." -> praised, then
    // returned to ionic crystal structures. Three turns running.
    const d = decideTeaching(understanding())
    expect(d.decision).toBe('ADVANCE_DIFFICULTY')
    expect(d.ruleId).toBe('D6-MASTERY-ADVANCE')
  })

  it('a HEDGED correct answer consolidates instead — not mastery', () => {
    const d = decideTeaching(understanding({
      conversationSummary: { ...understanding().conversationSummary, hedged: true },
    }))
    expect(d.decision).not.toBe('ADVANCE_DIFFICULTY')
  })

  it('a correct but UNCONFIDENT answer does not advance', () => {
    const d = decideTeaching(understanding({
      confidence: { value: 'low', source: 'signals:lastSignal', confidence: 0.7 },
    }))
    expect(d.decision).not.toBe('ADVANCE_DIFFICULTY')
  })

  it('a fragile learner still consolidates', () => {
    const d = decideTeaching(understanding({
      masteryState: { value: 'fragile', source: 'signals:lastSignal', confidence: 0.7 },
    }))
    expect(d.decision).toBe('PRACTICE')
  })

  it('a confident-wrong learner still routes to misconception repair', () => {
    // The audit's strongest behaviour. Advancing must never outrank it.
    const d = decideTeaching(understanding({
      masteryState: { value: 'misconceiving', source: 'signals:lastSignal', confidence: 0.75 },
    }))
    expect(d.decision).toBe('DETECT_MISCONCEPTION')
  })

  it('the execution block forbids repeating and demands a harder step', () => {
    const decision = decideTeaching(understanding())
    const block = buildBrainExecutionBlock(planDispatch(decision, { assembledAvailable: false }), decision)
    expect(block).toMatch(/RAISE THE DEMAND/)
    expect(block).toMatch(/Do NOT re-explain/)
    expect(block).toMatch(/if they falter, drop straight back/i)
  })
})
