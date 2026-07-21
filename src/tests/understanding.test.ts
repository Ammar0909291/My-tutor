/**
 * CUE (Conversation Understanding Engine) — Milestone 1 tests.
 *
 * The CUE understands; it never decides, never generates text, never
 * throws. These tests pin: the unknown-is-valid law, provenance on every
 * field, reader reuse semantics (null detection input ≠ empty detection
 * result), and the fusion object's shape/serializability.
 */
import { describe, it, expect } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { getAllNodes, getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'

function emptyInputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '',
    history: [],
    recoveryKey: null,
    firstLessonActive: false,
    lastSignal: null,
    sessionFailureCount: 0,
    episode: null,
    freshBoundary: false,
    lastSuccessfulTeachingStyle: null,
    conceptId: null,
    placement: null,
    pendingPlacementProbe: null,
    dueReviewCount: 0,
    strategyType: null,
    evidenceMove: null,
    assembled: null,
    memoryFallbackReason: null,
    observations: {},
    ...overrides,
  }
}

describe('CUE — unknown is a valid value everywhere', () => {
  it('produces a complete, serializable object from zero evidence', () => {
    const u = understandStudentTurn(emptyInputs())
    expect(u.version).toBe(1)
    expect(u.studentIntent.value).toBe('unknown')
    expect(u.currentTopic.value).toBe('unknown')
    expect(u.prerequisiteTopic.value).toBe('unknown')
    expect(u.masteryState.value).toBe('unknown')
    expect(u.progressState.value).toBe('unknown')
    expect(u.confidence.value).toBe('unknown')
    expect(u.recommendedTeachingMode.value).toBe('unknown')
    expect(u.misconceptionCandidates).toEqual([])
    expect(u.explanationMemoryHits).toEqual([])
    expect(u.uncertainty.length).toBeGreaterThan(0)
    expect(() => JSON.stringify(u)).not.toThrow()
  })

  it('every unknown field carries source=unavailable and confidence 0', () => {
    const u = understandStudentTurn(emptyInputs())
    for (const [name, source] of Object.entries(u.provenance)) {
      const score = u.confidenceScores[name]
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(1)
      if (score === 0) expect(source === 'unavailable' || name === 'misconceptionCandidates' || name === 'explanationMemoryHits').toBe(true)
    }
  })

  it('never throws on malformed inputs', () => {
    const u = understandStudentTurn(emptyInputs({
      message: undefined as unknown as string,
      history: 'garbage' as unknown as UnderstandingInputs['history'],
      observations: null as unknown as UnderstandingInputs['observations'],
    }))
    expect(u.studentIntent.value).toBe('unknown')
  })
})

describe('CUE Conversation Reader — intent from the detectors that already ran', () => {
  it('recovery utterance dominates: expressing_distress + recovery intent, sourced to recoveryGuard', () => {
    const u = understandStudentTurn(emptyInputs({ message: 'I give up', recoveryKey: 'i_give_up' }))
    expect(u.studentIntent.value).toBe('expressing_distress')
    expect(u.studentIntent.source).toBe('recoveryGuard')
    expect(u.conversationIntent.value).toBe('recovery')
  })

  it('bare acknowledgement is acknowledging (masteryGate rule), never answering', () => {
    const u = understandStudentTurn(emptyInputs({
      message: 'ok',
      history: [{ role: 'assistant', content: 'What is 2+2?' }],
    }))
    expect(u.studentIntent.value).toBe('acknowledging')
    expect(u.studentIntent.source).toBe('masteryGate')
  })

  it('question mark reads as asking_question; reply to a pending question reads as answering', () => {
    const asking = understandStudentTurn(emptyInputs({ message: 'why does it float?' }))
    expect(asking.studentIntent.value).toBe('asking_question')
    const answering = understandStudentTurn(emptyInputs({
      message: 'because the density is lower',
      history: [{ role: 'assistant', content: 'Why does ice float?' }],
    }))
    expect(answering.studentIntent.value).toBe('answering')
    expect(answering.conversationSummary.lastAssistantAskedQuestion).toBe(true)
  })

  it('learner help request (diagram) reads as requesting_help via masteryGate.detectLearnerRequest', () => {
    const u = understandStudentTurn(emptyInputs({ message: 'please show me a diagram' }))
    expect(u.studentIntent.value).toBe('requesting_help')
  })

  it('conversation intent follows the sessionLifecycle episode phase', () => {
    const episode = { startedAt: new Date().toISOString(), phase: 'CORE' as const, visibleFailures: 0, retroWinOwed: false, openingSatisfied: true }
    expect(understandStudentTurn(emptyInputs({ episode })).conversationIntent.value).toBe('core_teaching')
    expect(understandStudentTurn(emptyInputs({ episode: { ...episode, phase: 'CLOSING' } })).conversationIntent.value).toBe('session_closing')
    expect(understandStudentTurn(emptyInputs({ episode: { ...episode, phase: 'OPENING' }, freshBoundary: true })).conversationIntent.value).toBe('session_opening')
  })

  it('learner confidence comes from the previous SIGNAL', () => {
    const u = understandStudentTurn(emptyInputs({ lastSignal: { correctness: true, confidence: 'high' } }))
    expect(u.confidence.value).toBe('high')
    expect(u.confidence.source).toBe('signals:lastSignal')
  })
})

describe('CUE Student Memory Reader — mastery descriptions, never verdicts', () => {
  it('classifies struggling / fragile / progressing from existing evidence', () => {
    expect(understandStudentTurn(emptyInputs({ sessionFailureCount: 2 })).masteryState.value).toBe('struggling')
    expect(understandStudentTurn(emptyInputs({ lastSignal: { correctness: false } })).masteryState.value).toBe('fragile')
    expect(understandStudentTurn(emptyInputs({ lastSignal: { correctness: true } })).masteryState.value).toBe('progressing')
  })
})

describe('CUE Progress Reader — KG-grounded topic and prerequisite', () => {
  it('resolves the current topic and its first prerequisite from the in-memory KG', () => {
    const graph = getKnowledgeGraph('physics')
    expect(graph).not.toBeNull()
    const withPrereq = getAllNodes(graph!).find((n) => n.prerequisites.length > 0)
    expect(withPrereq).toBeDefined()
    const u = understandStudentTurn(emptyInputs({ conceptId: withPrereq!.id }))
    expect(u.currentTopic.value).toContain(withPrereq!.id)
    expect(u.currentTopic.source).toBe('knowledgeGraph')
    expect(u.prerequisiteTopic.value).toContain(withPrereq!.prerequisites[0])
  })

  it('keeps a non-KG concept id with snapshot provenance instead of inventing KG facts', () => {
    const u = understandStudentTurn(emptyInputs({ conceptId: 'legacy.slug.not-in-kg' }))
    expect(u.currentTopic.value).toBe('legacy.slug.not-in-kg')
    expect(u.currentTopic.source).toBe('contextSnapshot')
    expect(u.prerequisiteTopic.value).toBe('unknown')
  })

  it('placement probes in flight read as placement_in_progress', () => {
    const u = understandStudentTurn(emptyInputs({ pendingPlacementProbe: 'at' }))
    expect(u.progressState.value).toBe('placement_in_progress')
    expect(u.progressState.source).toBe('placementVerification')
  })
})

describe('CUE Misconception Reader — reuse, not re-detection', () => {
  it('maps already-detected misconceptions with engine provenance', () => {
    const u = understandStudentTurn(emptyInputs({
      observations: {
        misconceptions: [{
          type: 'FRACTION_BIGGER_DENOMINATOR', label: 'Bigger denominator = bigger fraction',
          description: 'Believes 1/8 > 1/4', confidence: 'HIGH', evidenceCount: 3, remediationSteps: [],
        }],
      },
    }))
    expect(u.misconceptionCandidates).toHaveLength(1)
    expect(u.misconceptionCandidates[0].source).toBe('misconceptionEngine')
    expect(u.uncertainty.some((s) => s.startsWith('misconceptionCandidates'))).toBe(false)
  })

  it('distinguishes "detection did not run" from "ran and found none"', () => {
    const notRun = understandStudentTurn(emptyInputs())
    expect(notRun.uncertainty.some((s) => s.startsWith('misconceptionCandidates'))).toBe(true)
    const ranEmpty = understandStudentTurn(emptyInputs({ observations: { misconceptions: [] } }))
    expect(ranEmpty.uncertainty.some((s) => s.startsWith('misconceptionCandidates'))).toBe(false)
    expect(ranEmpty.misconceptionCandidates).toEqual([])
  })
})

describe('CUE Explanation Memory Reader + Fusion extras', () => {
  it('records memory hits when the serving path assembled this turn', () => {
    const u = understandStudentTurn(emptyInputs({
      assembled: { usedAssetIds: ['asset-1', 'asset-2'], explanationConfidence: 0.91, explanationServingMode: 'exact' },
    }))
    expect(u.explanationMemoryHits).toHaveLength(2)
    expect(u.explanationMemoryHits[0].source).toBe('explanationMemory')
    expect(u.uncertainty.some((s) => s.startsWith('explanationMemoryHits'))).toBe(false)
  })

  it('records the route\'s authoritative fallback reason when memory did not serve', () => {
    const u = understandStudentTurn(emptyInputs({ memoryFallbackReason: 'No asset' }))
    expect(u.explanationMemoryHits).toEqual([])
    expect(u.uncertainty).toContain('explanationMemoryHits: No asset')
  })

  it('teaching mode is a provenance-ranked READ: strategy > evidence move > remembered style', () => {
    expect(understandStudentTurn(emptyInputs({
      strategyType: 'MISCONCEPTION_REPAIR', evidenceMove: 'ask', lastSuccessfulTeachingStyle: 'visual',
    })).recommendedTeachingMode).toMatchObject({ value: 'MISCONCEPTION_REPAIR', source: 'teachingStrategy' })
    expect(understandStudentTurn(emptyInputs({ evidenceMove: 'ask' })).recommendedTeachingMode.value).toBe('ask')
    expect(understandStudentTurn(emptyInputs({ lastSuccessfulTeachingStyle: 'visual' })).recommendedTeachingMode.value).toBe('visual')
  })

  it('visualization distinguishes detected / detection-ran-found-none / never-ran', () => {
    expect(understandStudentTurn(emptyInputs({
      observations: { availableVisual: 'force_diagram', visualDetectionRan: true },
    })).requiredVisualization.value).toBe('force_diagram')
    expect(understandStudentTurn(emptyInputs({
      observations: { availableVisual: null, visualDetectionRan: true },
    })).requiredVisualization.value).toBe('none')
    expect(understandStudentTurn(emptyInputs()).requiredVisualization.value).toBe('unknown')
  })
})
