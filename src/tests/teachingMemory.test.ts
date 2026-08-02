import { describe, it, expect } from 'vitest'
import {
  initialTeachingHistory, readTeachingHistory, selectNextStrategy,
  memoryFingerprint, hasUsedAnalogy, hasShownVisual, hasAskedMcq, hasUsedStrategy,
  recordVisualShown, recordMcqAsked, recordConfidence, advanceMisconception,
  isMisconceptionResolved, confidenceTrend, buildTeachingMemoryBlock,
  STRATEGY_ANALOGY, STRATEGY_VISUAL, MISCONCEPTION_STAGES,
  type TeachingHistory,
} from '@/lib/teaching/teachingHistory'

const H = (over: Partial<TeachingHistory> = {}): TeachingHistory =>
  ({ ...initialTeachingHistory('c1'), ...over })

describe('no repeated analogies', () => {
  it('recognises an analogy already used, including a reworded one', () => {
    const h = H({ analogiesUsed: ['pizza slices'] })
    expect(hasUsedAnalogy(h, 'pizza slices')).toBe(true)
    expect(hasUsedAnalogy(h, 'Slices of pizza!')).toBe(true)
    expect(hasUsedAnalogy(h, 'a chocolate bar')).toBe(false)
  })

  it('lists used analogies in the memory block as do-not-reuse', () => {
    const block = buildTeachingMemoryBlock(H({ analogiesUsed: ['pizza slices'] }))
    expect(block).toMatch(/do NOT reuse/i)
    expect(block).toContain('pizza slices')
  })
})

describe('no repeated visuals', () => {
  it('records and recognises a shown visual', () => {
    let h = H()
    expect(hasShownVisual(h, 'frac-bar')).toBe(false)
    h = recordVisualShown(h, 'frac-bar')
    expect(hasShownVisual(h, 'frac-bar')).toBe(true)
  })

  it('is idempotent and ignores empty ids', () => {
    let h = recordVisualShown(H(), 'frac-bar')
    h = recordVisualShown(h, 'frac-bar')
    h = recordVisualShown(h, '')
    expect(h.visualsShown).toEqual(['frac-bar'])
  })

  it('tells the tutor not to replay unless asked', () => {
    const block = buildTeachingMemoryBlock(H({ visualsShown: ['frac-bar'] }))
    expect(block).toMatch(/not replay an identical/i)
    expect(block).toMatch(/unless the learner asks/i)
  })
})

describe('no repeated MCQs', () => {
  it('recognises an identical question, however reworded', () => {
    const h = recordMcqAsked(H(), 'What is 1/2 + 1/4?')
    expect(hasAskedMcq(h, 'What is 1/2 + 1/4?')).toBe(true)
    expect(hasAskedMcq(h, 'what is 1/2 + 1/4')).toBe(true)
    expect(hasAskedMcq(h, 'What is 2/3 + 1/6?')).toBe(false)
  })

  it('is idempotent on fingerprint', () => {
    let h = recordMcqAsked(H(), 'What is 1/2 + 1/4?')
    h = recordMcqAsked(h, 'What is 1/2 + 1/4?')
    expect(h.mcqAsked).toHaveLength(1)
  })

  it('ignores an empty question', () => {
    expect(recordMcqAsked(H(), '   ').mcqAsked).toEqual([])
  })

  it('warns in the block once questions have been asked', () => {
    const block = buildTeachingMemoryBlock(recordMcqAsked(H(), 'What is 1/2 + 1/4?'))
    expect(block).toMatch(/genuinely NEW one/i)
  })
})

describe('misconception lifecycle', () => {
  it('advances detected -> addressed -> corrected -> verified', () => {
    let h = H()
    for (const stage of MISCONCEPTION_STAGES) {
      h = advanceMisconception(h, 'm1', stage)
      expect(h.misconceptionStatus.m1).toBe(stage)
    }
  })

  it('never moves backwards — corrected stays corrected', () => {
    let h = advanceMisconception(H(), 'm1', 'corrected')
    h = advanceMisconception(h, 'm1', 'detected')
    expect(h.misconceptionStatus.m1).toBe('corrected')
  })

  it('adds the id to the flat seen list exactly once', () => {
    let h = advanceMisconception(H(), 'm1', 'detected')
    h = advanceMisconception(h, 'm1', 'addressed')
    expect(h.misconceptionsSeen).toEqual(['m1'])
  })

  it('reports resolution only at corrected or verified', () => {
    expect(isMisconceptionResolved(advanceMisconception(H(), 'm', 'detected'), 'm')).toBe(false)
    expect(isMisconceptionResolved(advanceMisconception(H(), 'm', 'addressed'), 'm')).toBe(false)
    expect(isMisconceptionResolved(advanceMisconception(H(), 'm', 'corrected'), 'm')).toBe(true)
    expect(isMisconceptionResolved(advanceMisconception(H(), 'm', 'verified'), 'm')).toBe(true)
  })

  it('a corrected misconception is marked settled and never re-taught', () => {
    const block = buildTeachingMemoryBlock(advanceMisconception(H(), 'm1', 'corrected'))
    expect(block).toMatch(/ALREADY CORRECTED/)
    expect(block).toMatch(/Do not re-teach/i)
  })

  it('open misconceptions are listed separately as still needing repair', () => {
    const block = buildTeachingMemoryBlock(advanceMisconception(H(), 'm2', 'detected'))
    expect(block).toMatch(/still OPEN/)
  })

  it('ignores an empty id', () => {
    expect(advanceMisconception(H(), '', 'detected').misconceptionsSeen).toEqual([])
  })
})

describe('confidence trend', () => {
  it('is unknown with no readings and steady with one', () => {
    expect(confidenceTrend([])).toBe('unknown')
    expect(confidenceTrend(['medium'])).toBe('steady')
  })

  it('detects rising and falling', () => {
    expect(confidenceTrend(['low', 'medium', 'high'])).toBe('rising')
    expect(confidenceTrend(['high', 'medium', 'low'])).toBe('falling')
  })

  it('detects RECOVERED — dipped and came back', () => {
    expect(confidenceTrend(['high', 'low', 'high'])).toBe('recovered')
    expect(confidenceTrend(['medium', 'low', 'medium'])).toBe('recovered')
  })

  it('distinguishes steady from volatile at equal endpoints', () => {
    expect(confidenceTrend(['medium', 'medium', 'medium'])).toBe('steady')
    expect(confidenceTrend(['medium', 'high', 'medium'])).toBe('volatile')
  })

  it('records readings in order and updates the current value', () => {
    let h = recordConfidence(H(), 'high')
    h = recordConfidence(h, 'low')
    expect(h.confidenceTrail).toEqual(['high', 'low'])
    expect(h.confidence).toBe('low')
  })

  it('gives different guidance for recovered vs falling', () => {
    const recovered = buildTeachingMemoryBlock(H({ confidenceTrail: ['high', 'low', 'high'] }))
    const falling = buildTeachingMemoryBlock(H({ confidenceTrail: ['high', 'medium', 'low'] }))
    expect(recovered).toMatch(/consolidate/i)
    expect(falling).toMatch(/slow down/i)
    expect(recovered).not.toBe(falling)
  })
})

describe('explanation and recovery strategy rotation', () => {
  it('selectNextStrategy rotates away from what was used (existing behaviour)', () => {
    expect(selectNextStrategy(H({ strategiesUsed: [0] }))).not.toBe(0)
    expect(hasUsedStrategy(H({ strategiesUsed: [STRATEGY_ANALOGY] }), STRATEGY_ANALOGY)).toBe(true)
  })

  it('names the approaches already tried so a new one is chosen', () => {
    const block = buildTeachingMemoryBlock(H({ strategiesUsed: [STRATEGY_ANALOGY, STRATEGY_VISUAL] }))
    expect(block).toMatch(/already tried/i)
    expect(block).toContain('an analogy')
    expect(block).toContain('a visual')
    expect(block).toMatch(/DIFFERENT approach/)
  })
})

describe('builds on previous teaching instead of restarting', () => {
  it('reports how many explanations already happened', () => {
    const block = buildTeachingMemoryBlock(H({ explanationCount: 3 }))
    expect(block).toMatch(/explained this concept 3 time/)
    expect(block).toMatch(/do not restart/i)
  })

  it('lists demonstrations and prerequisites already covered', () => {
    const block = buildTeachingMemoryBlock(H({
      demonstrationsShown: ['bar model'], prerequisiteAttempts: ['equivalence'],
    }))
    expect(block).toContain('bar model')
    expect(block).toContain('equivalence')
  })

  it('renders nothing on a fresh concept (no prompt cost)', () => {
    expect(buildTeachingMemoryBlock(H())).toBe('')
    expect(buildTeachingMemoryBlock(null)).toBe('')
    expect(buildTeachingMemoryBlock(undefined)).toBe('')
  })
})

describe('persistence, resume and refresh — one owner', () => {
  it('round-trips every P7 field through the snapshot', () => {
    let h = H()
    h = recordVisualShown(h, 'frac-bar')
    h = recordMcqAsked(h, 'What is 1/2 + 1/4?')
    h = recordConfidence(h, 'high')
    h = advanceMisconception(h, 'm1', 'corrected')
    const restored = readTeachingHistory(JSON.parse(JSON.stringify(h)), 'c1')
    expect(restored.visualsShown).toEqual(['frac-bar'])
    expect(restored.mcqAsked).toEqual(h.mcqAsked)
    expect(restored.confidenceTrail).toEqual(['high'])
    expect(restored.misconceptionStatus.m1).toBe('corrected')
  })

  it('memory survives a refresh — the block is identical after a reload', () => {
    let h = recordConfidence(recordVisualShown(H(), 'v1'), 'low')
    h = advanceMisconception(h, 'm1', 'corrected')
    const before = buildTeachingMemoryBlock(h)
    const after = buildTeachingMemoryBlock(readTeachingHistory(JSON.parse(JSON.stringify(h)), 'c1'))
    expect(after).toBe(before)
  })

  it('resets on a concept change — memory is concept-scoped, not global', () => {
    const spent = recordVisualShown(H({ explanationCount: 5 }), 'v1')
    const fresh = readTeachingHistory(spent, 'a-different-concept')
    expect(fresh.visualsShown).toEqual([])
    expect(fresh.explanationCount).toBe(0)
    expect(buildTeachingMemoryBlock(fresh)).toBe('')
  })

  it('survives junk without throwing', () => {
    expect(() => readTeachingHistory(null, 'c1')).not.toThrow()
    expect(() => readTeachingHistory('nope', 'c1')).not.toThrow()
    expect(buildTeachingMemoryBlock(readTeachingHistory(undefined, 'c1'))).toBe('')
  })
})

describe('no duplicated owners — memory is derived from existing state', () => {
  it('every P7 field lives on TeachingHistory, not a new store', () => {
    const h = H()
    for (const key of ['confidenceTrail', 'visualsShown', 'mcqAsked', 'misconceptionStatus']) {
      expect(h).toHaveProperty(key)
    }
  })

  it('fingerprinting matches the P3 repetition rule (same "already asked")', () => {
    expect(memoryFingerprint('What do you notice about the shape?'))
      .toBe(memoryFingerprint('About the shape, what do you notice?'))
  })

  it('no P7 reader mutates the history it is given', () => {
    const h = H({ analogiesUsed: ['pizza'] })
    const snapshot = JSON.stringify(h)
    hasUsedAnalogy(h, 'pizza'); hasShownVisual(h, 'x'); hasAskedMcq(h, 'q')
    confidenceTrend(h.confidenceTrail); buildTeachingMemoryBlock(h)
    expect(JSON.stringify(h)).toBe(snapshot)
  })
})
