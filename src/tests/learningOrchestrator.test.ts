/**
 * Learning Orchestrator tests: remediation / advancement / review /
 * calibration decisions, misconception prioritization, retrieval and
 * spaced-review flags, just-in-time prerequisite repair, and deterministic
 * orchestration — over the pure core with synthetic StudentIntelligence
 * profiles (no DB, no fs).
 */
import { describe, it, expect } from 'vitest'
import {
  orchestrate, prioritizeMisconceptions, findFrontier,
  DEFAULT_ORCHESTRATOR_THRESHOLDS,
  type CurriculumConcept, type OrchestratorContext,
} from '@/lib/teaching/learningOrchestrator/learningOrchestrator'
import type {
  StudentIntelligence, ConceptState, MisconceptionState,
} from '@/lib/teaching/studentIntelligence/studentIntelligence'

// ── Fixtures ─────────────────────────────────────────────────────────────────

const NOW = new Date('2026-07-16T10:00:00Z')
const D = (iso: string) => new Date(iso)

function emptyProfile(userId = 'u1'): StudentIntelligence {
  return {
    userId,
    asOf: NOW,
    evidenceBase: { lessons: 0, probeOutcomes: 0, concepts: 0 },
    masteredConcepts: [],
    conceptStates: [],
    activeMisconceptions: [],
    misconceptionHistory: [],
    confidence: {
      observations: 0, firstHalfMean: null, secondHalfMean: null,
      direction: 'insufficient_evidence', confidentWrongCount: 0, hesitantRightCount: 0,
    },
    velocity: { conceptsProgressedPerWeek: null, passesPerLesson: null, activeSpanDays: 0, lessonsObserved: 0 },
    forgettingRisks: [],
    modalityAffinities: [],
    probePerformance: { outcomes: 0, passRate: null },
    recoveryEffectiveness: [],
    engagement: {
      sessionsObserved: 0, lessonsObserved: 0, abandonedLessons: 0,
      abandonedRate: null, meanLessonSpanMinutes: null, longestGapDays: null, lastActiveAt: null,
    },
    cognitiveLoad: { confusionRate: null, meanProbeLatencySec: null, latencyDirection: 'insufficient_evidence', observations: 0 },
  }
}

function concept(id: string, over: Partial<ConceptState> = {}): ConceptState {
  return {
    conceptId: id, subject: 'physics', lessons: 1, probeOutcomes: 4, probePassRate: 1,
    masteryPct: null, masteryStatus: null, mastered: false,
    firstEvidenceAt: D('2026-07-10T10:00:00Z'), lastEvidenceAt: D('2026-07-15T10:00:00Z'),
    forgettingRisk: 0.05, retries: 0,
    ...over,
  }
}

function misconception(id: string, conceptId: string, over: Partial<MisconceptionState> = {}): MisconceptionState {
  return {
    id, conceptId, detections: 1,
    firstDetectedAt: D('2026-07-14T10:00:00Z'), lastDetectedAt: D('2026-07-14T10:00:00Z'),
    phrases: ['sample phrase'], activity: 'active', regrowths: 0,
    ...over,
  }
}

function withEvidence(profile: StudentIntelligence, conceptStates: ConceptState[]): StudentIntelligence {
  return {
    ...profile,
    conceptStates,
    masteredConcepts: conceptStates.filter((c) => c.mastered).map((c) => c.conceptId),
    evidenceBase: {
      lessons: conceptStates.reduce((n, c) => n + c.lessons, 0),
      probeOutcomes: conceptStates.reduce((n, c) => n + c.probeOutcomes, 0),
      concepts: conceptStates.length,
    },
  }
}

// A → B → C chain
const CURRICULUM: CurriculumConcept[] = [
  { conceptId: 'phys.a', prerequisites: [] },
  { conceptId: 'phys.b', prerequisites: ['phys.a'] },
  { conceptId: 'phys.c', prerequisites: ['phys.b'] },
]

const CTX: OrchestratorContext = {
  curriculum: CURRICULUM,
  packageIndex: (id) => ({ packageId: `${id}-package` }),
}

// ── Start / advancement ──────────────────────────────────────────────────────

describe('start and advancement decisions', () => {
  it('starts a brand-new learner at the curriculum entry point with a diagnostic', () => {
    const intent = orchestrate(emptyProfile(), CTX)
    expect(intent.mode).toBe('start')
    expect(intent.targetConceptId).toBe('phys.a')
    expect(intent.packageId).toBe('phys.a-package')
    expect(intent.actionFamily).toBe('DIAGNOSTIC_PROBE')
    expect(intent.rationale[0]).toContain('no lesson evidence')
  })

  it('advances to the next frontier concept when everything started is held', () => {
    const profile = withEvidence(emptyProfile(), [concept('phys.a', { mastered: true, masteryStatus: 'MASTERED' })])
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('advance')
    expect(intent.targetConceptId).toBe('phys.b')
    expect(intent.actionFamily).toBe('CONCRETE_HOOK') // first exposure
    expect(intent.packageId).toBe('phys.b-package')
  })

  it('uses GUIDED_PRACTICE instead of CONCRETE_HOOK when the frontier concept was already started', () => {
    const profile = withEvidence(emptyProfile(), [
      concept('phys.a', { mastered: true, masteryStatus: 'MASTERED' }),
      concept('phys.b', { probeOutcomes: 1, probePassRate: 1 }), // started, under advanceMinProbes
    ])
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('advance')
    expect(intent.targetConceptId).toBe('phys.b')
    expect(intent.actionFamily).toBe('GUIDED_PRACTICE')
  })

  it('falls to maintenance review when the whole curriculum is held', () => {
    const profile = {
      ...withEvidence(emptyProfile(), CURRICULUM.map((c) => concept(c.conceptId, { mastered: true, masteryStatus: 'MASTERED' }))),
      forgettingRisks: [{ conceptId: 'phys.a', risk: 0.2 }],
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('review')
    expect(intent.targetConceptId).toBe('phys.a')
  })
})

// ── Remediation ──────────────────────────────────────────────────────────────

describe('remediation decisions', () => {
  it('an active misconception preempts advancement, review, and continuation', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [
        concept('phys.a', { probePassRate: 0.3, probeOutcomes: 6 }), // also struggling
      ]),
      activeMisconceptions: [misconception('MC-X', 'phys.a')],
      forgettingRisks: [{ conceptId: 'phys.a', risk: 0.9 }],
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('remediate')
    expect(intent.targetConceptId).toBe('phys.a')
    expect(intent.actionFamily).toBe('MISCONCEPTION_REPAIR')
    expect(intent.misconceptionToAddress).toMatchObject({ id: 'MC-X', conceptId: 'phys.a' })
    expect(intent.rationale[0]).toContain('repair before any new content')
  })

  it('dormant misconceptions do NOT trigger remediation', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('phys.a', { mastered: true, masteryStatus: 'MASTERED' })]),
      activeMisconceptions: [], // dormant ones live only in history
      misconceptionHistory: [misconception('MC-X', 'phys.a', { activity: 'dormant' })],
    }
    expect(orchestrate(profile, CTX).mode).toBe('advance')
  })
})

// ── Misconception prioritization ─────────────────────────────────────────────

describe('misconception prioritization', () => {
  it('regrowth outranks detection count; detections outrank recency', () => {
    const a = misconception('MC-A', 'phys.a', { detections: 5, regrowths: 0, lastDetectedAt: D('2026-07-15T00:00:00Z') })
    const b = misconception('MC-B', 'phys.b', { detections: 1, regrowths: 1, lastDetectedAt: D('2026-07-01T00:00:00Z') })
    const c = misconception('MC-C', 'phys.c', { detections: 2, regrowths: 0, lastDetectedAt: D('2026-07-16T00:00:00Z') })
    const order = prioritizeMisconceptions([a, b, c]).map((m) => m.id)
    expect(order).toEqual(['MC-B', 'MC-A', 'MC-C']) // regrowth first, then detections
  })

  it('the orchestrator addresses the top-priority misconception', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('phys.a')]),
      activeMisconceptions: [
        misconception('MC-MILD', 'phys.a', { detections: 1 }),
        misconception('MC-REGROWN', 'phys.b', { detections: 1, regrowths: 2 }),
      ],
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.misconceptionToAddress!.id).toBe('MC-REGROWN')
    expect(intent.targetConceptId).toBe('phys.b')
  })
})

// ── Continuation ─────────────────────────────────────────────────────────────

describe('continuation decisions', () => {
  it('routes back to the most recently touched struggling concept', () => {
    const profile = withEvidence(emptyProfile(), [
      concept('phys.a', { probePassRate: 0.5, probeOutcomes: 4, lastEvidenceAt: D('2026-07-10T10:00:00Z') }),
      concept('phys.b', { probePassRate: 0.25, probeOutcomes: 4, lastEvidenceAt: D('2026-07-15T10:00:00Z'), retries: 2 }),
    ])
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('continue')
    expect(intent.targetConceptId).toBe('phys.b') // more recent
    expect(intent.actionFamily).toBe('GUIDED_PRACTICE')
    expect(intent.rationale[0]).toContain('25%')
  })

  it('performs just-in-time prerequisite repair when the frontier is blocked on failing evidence', () => {
    const states = new Map([
      ['phys.a', concept('phys.a', { probePassRate: 0.4, probeOutcomes: 5 })], // failing prerequisite
    ])
    const frontier = findFrontier(CURRICULUM, states, DEFAULT_ORCHESTRATOR_THRESHOLDS)
    expect(frontier).toEqual({ conceptId: 'phys.a', blockedOnPrerequisite: null })
    // via full orchestration the failing prerequisite is a struggling concept → continue targets it
    const profile = withEvidence(emptyProfile(), [states.get('phys.a')!])
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('continue')
    expect(intent.targetConceptId).toBe('phys.a')
  })

  it('findFrontier flags a block on a prerequisite that has failing EVIDENCE (PREREQUISITE_CHECK path)', () => {
    const t = DEFAULT_ORCHESTRATOR_THRESHOLDS
    // b started and held-ish? No: b unheld with a's evidence failing → blocked on a.
    const states = new Map([
      ['phys.a', concept('phys.a', { probePassRate: 0.4, probeOutcomes: 5 })],
      ['phys.b', concept('phys.b', { probeOutcomes: 0, probePassRate: null })],
    ])
    // Remove a from "first unheld" position by making the curriculum start at b:
    const frontier = findFrontier(
      [{ conceptId: 'phys.b', prerequisites: ['phys.a'] }], states, t,
    )
    expect(frontier).toEqual({ conceptId: 'phys.b', blockedOnPrerequisite: 'phys.a' })
  })
})

// ── Review / retrieval / spaced review ───────────────────────────────────────

describe('review, retrieval, and spaced-review decisions', () => {
  it('schedules spaced review of a held concept at/above the risk threshold', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [
        concept('phys.a', { mastered: true, masteryStatus: 'MASTERED', forgettingRisk: 0.75 }),
        concept('phys.b', { mastered: true, masteryStatus: 'MASTERED', forgettingRisk: 0.6 }),
        concept('phys.c', { mastered: true, masteryStatus: 'MASTERED', forgettingRisk: 0.1 }),
      ]),
      forgettingRisks: [
        { conceptId: 'phys.a', risk: 0.75 },
        { conceptId: 'phys.b', risk: 0.6 },
        { conceptId: 'phys.c', risk: 0.1 },
      ],
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('review')
    expect(intent.targetConceptId).toBe('phys.a') // highest risk first
    expect(intent.actionFamily).toBe('INDEPENDENT_PRACTICE')
    expect(intent.retrievalPracticeNeeded).toBe(true)
    expect(intent.spacedReviewDue.map((r) => r.conceptId)).toEqual(['phys.a', 'phys.b'])
  })

  it('never schedules spaced review for a concept that was never held (nothing to retain)', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [
        concept('phys.a', { mastered: true, masteryStatus: 'MASTERED' }),
        concept('phys.b', { probePassRate: 0.2, probeOutcomes: 5, forgettingRisk: 0.9 }),
      ]),
      forgettingRisks: [{ conceptId: 'phys.b', risk: 0.9 }],
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.spacedReviewDue).toEqual([])       // b was never held
    expect(intent.retrievalPracticeNeeded).toBe(false)
    expect(intent.mode).toBe('continue')             // b is struggling instead
  })

  it('reports the review flags on every intent, whatever the mode', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('phys.a', { mastered: true, masteryStatus: 'MASTERED', forgettingRisk: 0.8 })]),
      activeMisconceptions: [misconception('MC-X', 'phys.a')],
      forgettingRisks: [{ conceptId: 'phys.a', risk: 0.8 }],
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('remediate')            // misconception wins
    expect(intent.retrievalPracticeNeeded).toBe(true) // but the flag still reports
    expect(intent.spacedReviewDue).toHaveLength(1)
  })
})

// ── Confidence calibration ───────────────────────────────────────────────────

describe('confidence calibration decisions', () => {
  it('calibrates when net confident-wrong reaches the threshold', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('phys.a', { probePassRate: 0.75, probeOutcomes: 4 })]),
      confidence: {
        observations: 6, firstHalfMean: 1, secondHalfMean: 1, direction: 'stable',
        confidentWrongCount: 3, hesitantRightCount: 1, // net 2 ≥ threshold
      },
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.mode).toBe('calibrate')
    expect(intent.confidenceCalibrationNeeded).toBe(true)
    expect(intent.actionFamily).toBe('DIAGNOSTIC_PROBE')
    expect(intent.targetConceptId).toBe('phys.a') // weakest non-mastered concept
  })

  it('hesitant-right events offset confident-wrong (net calibration)', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('phys.a', { mastered: true, masteryStatus: 'MASTERED' })]),
      confidence: {
        observations: 6, firstHalfMean: 0.5, secondHalfMean: 0.5, direction: 'stable',
        confidentWrongCount: 2, hesitantRightCount: 2, // net 0
      },
    }
    const intent = orchestrate(profile, CTX)
    expect(intent.confidenceCalibrationNeeded).toBe(false)
    expect(intent.mode).toBe('advance')
  })

  it('remediation still outranks calibration', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('phys.a')]),
      activeMisconceptions: [misconception('MC-X', 'phys.a')],
      confidence: {
        observations: 6, firstHalfMean: 1, secondHalfMean: 1, direction: 'stable',
        confidentWrongCount: 5, hesitantRightCount: 0,
      },
    }
    expect(orchestrate(profile, CTX).mode).toBe('remediate')
  })
})

// ── Determinism & contract ───────────────────────────────────────────────────

describe('deterministic orchestration', () => {
  it('same profile + same context → byte-identical intent, with rationale on every path', () => {
    const profiles = [
      emptyProfile(),
      withEvidence(emptyProfile(), [concept('phys.a', { probePassRate: 0.3, probeOutcomes: 5 })]),
      { ...withEvidence(emptyProfile(), [concept('phys.a')]), activeMisconceptions: [misconception('MC-X', 'phys.a')] },
    ]
    for (const p of profiles) {
      const a = orchestrate(p, CTX)
      const b = orchestrate(p, CTX)
      expect(JSON.stringify(a)).toBe(JSON.stringify(b))
      expect(a.rationale.length).toBeGreaterThan(0)
      expect(a.asOf).toEqual(NOW)
    }
  })

  it('shuffled active-misconception input order does not change the intent', () => {
    const mcs = [
      misconception('MC-A', 'phys.a', { detections: 2 }),
      misconception('MC-B', 'phys.b', { regrowths: 1 }),
      misconception('MC-C', 'phys.c', { detections: 3 }),
    ]
    const p1 = { ...withEvidence(emptyProfile(), [concept('phys.a')]), activeMisconceptions: mcs }
    const p2 = { ...p1, activeMisconceptions: [...mcs].reverse() }
    expect(JSON.stringify(orchestrate(p1, CTX))).toBe(JSON.stringify(orchestrate(p2, CTX)))
  })

  it('works without a package index and with an empty curriculum (non-KG subject)', () => {
    const profile: StudentIntelligence = {
      ...withEvidence(emptyProfile(), [concept('hist.x', { subject: 'history', probePassRate: 0.2, probeOutcomes: 5 })]),
    }
    const intent = orchestrate(profile, { curriculum: [] })
    expect(intent.mode).toBe('continue')  // remediation/continuation still work
    expect(intent.packageId).toBeNull()
  })
})
