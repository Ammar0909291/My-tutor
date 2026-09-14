/**
 * Batch 0 of the Typed Turn Contract migration
 * (docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md). Unit tests only —
 * nothing in route.ts reads from `turnContract.ts` yet.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  compileTurnContract,
  certifies,
  mayStateVerdict,
  type TurnContractInput,
  type ServerGrade,
} from '@/lib/teaching/turnContract'

function minimalInput(): TurnContractInput {
  return {
    identity: {
      sessionId: 's1', userId: 'u1', subjectSlug: 'physics',
      activeLessonSlug: 'phys.mech.newtons-first-law', lessonKeyThisTurn: null,
      conceptId: 'phys.mech.newtons-first-law', libraryConceptNodeId: null,
      turnReceivedAt: 1000, learnerAuthoredMessage: 'hello',
    },
    authority: {
      arbitration: null, recoveryKey: null, firstLessonActive: false,
      excursion: { active: false, decision: null, teachingTitle: null },
      knowledgeGap: null, learnerRequest: null, navigationRequest: false,
      claimChallengeActive: false,
    },
    ladder: {
      state: null, phaseBeforeTurn: null, evidenceMove: null, objective: null,
      lessonCompletedBefore: false, lessonCompletionRespectsNewIntent: false,
      conceptPreviouslyMastered: false, teachingHistory: null,
      questionLedger: { fingerprints: [], recent: [], optionSetFingerprints: [], recentOptionSets: [] },
    },
    episode: { current: null, persisted: null, fresh: false },
    inbound: {
      isBareAck: false, lowSignalAck: false, pendingProbe: null, grade: null,
      priorTurnUnresolvedProseMcq: false,
    },
    assessment: {
      gateProbe: null, gateLeadIn: null, authoredProbesExist: null,
      declinedByPolicy: false, phaseAllowsProbe: false, probeWouldCountThisPhase: false,
      observeAskViolation: false, gateTerms: null, legalityBlockedReason: null,
      legalityBlock: null,
    },
    figure: {
      decision: null, availableVisual: null, allowedVisuals: null,
      forceRender: false, generationCountBefore: 0,
    },
    liveness: {
      priorStagnantTurns: 0, priorProbeStarvedTurns: 0, probeStarvationRelieved: false,
      arbitrationWasSoleBlocker: false, consecutiveDontKnows: 0, priorConfirmations: 0,
    },
    placement: { level: null, askedProbe: null, previous: null, inherited: false },
    strategy: {
      teachingStrategy: null, outputBias: null, hintBias: null, strategyTopicSlug: null,
      selectedStrategy: null, conversationDecision: null, cueDecision: null,
      dispatchPlan: null, retrievalCache: null, outputLanguageBlock: '',
      kernelMaxQuestions: 0, routeMaxParagraphs: null, kernelPolicyMove: null,
      evidenceStageCeiling: null, evidenceWorkedExampleFirst: false, evidenceAutonomy: false,
      libraryDueRevisionCount: 0, teachingStepUpdate: null,
    },
    capability: { stateBefore: null, required: [] },
    provenance: {
      decisionConceptId: null, decisionGranularity: null, decisionProbeId: null,
      kernelParityMetrics: null, kernelParityTags: [], enginePolicyParity: null,
      enginePolicyTags: [], signalRepairFired: false, isFirstLessonContext: false,
    },
  }
}

describe('compileTurnContract', () => {
  it('carries every field through unchanged (a pure copy, never a transformation)', () => {
    const input = minimalInput()
    const c = compileTurnContract(input)
    expect(c.identity.sessionId).toBe('s1')
    expect(c.identity.conceptId).toBe('phys.mech.newtons-first-law')
    expect(c.assessment.authoredProbesExist).toBeNull()
    expect(c.capability.required).toEqual([])
  })

  it('freezes the top-level object and every named group', () => {
    const c = compileTurnContract(minimalInput())
    expect(Object.isFrozen(c)).toBe(true)
    expect(Object.isFrozen(c.identity)).toBe(true)
    expect(Object.isFrozen(c.authority)).toBe(true)
    expect(Object.isFrozen(c.authority.excursion)).toBe(true)
    expect(Object.isFrozen(c.ladder)).toBe(true)
    expect(Object.isFrozen(c.episode)).toBe(true)
    expect(Object.isFrozen(c.inbound)).toBe(true)
    expect(Object.isFrozen(c.assessment)).toBe(true)
    expect(Object.isFrozen(c.figure)).toBe(true)
    expect(Object.isFrozen(c.liveness)).toBe(true)
    expect(Object.isFrozen(c.placement)).toBe(true)
    expect(Object.isFrozen(c.strategy)).toBe(true)
    expect(Object.isFrozen(c.capability)).toBe(true)
    expect(Object.isFrozen(c.provenance)).toBe(true)
  })

  it('does not alias the caller-supplied input objects (a mutation of input cannot reach the frozen contract)', () => {
    const input = minimalInput()
    const c = compileTurnContract(input)
    // Mutating the caller's own (unfrozen) input object must not be visible
    // through the compiled contract — the compiler must copy, not alias.
    ;(input.identity as { sessionId: string }).sessionId = 'mutated'
    expect(c.identity.sessionId).toBe('s1')
  })
})

describe('certifies / mayStateVerdict — the ONE definition (design doc §5 A3)', () => {
  const authoredCorrect: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'authored' }
  const authoredWrong: ServerGrade = { kind: 'graded', chosenIndex: 1, correct: false, keyProvenance: 'authored' }
  const modelInvented: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'model-invented' }
  const unresolved: ServerGrade = { kind: 'unresolved', chosenIndex: null, correct: null, keyProvenance: 'authored' }

  it('certifies iff graded AND authored — regardless of correctness', () => {
    expect(certifies(authoredCorrect)).toBe(true)
    expect(certifies(authoredWrong)).toBe(true)
    expect(certifies(modelInvented)).toBe(false)
    expect(certifies(unresolved)).toBe(false)
    expect(certifies(null)).toBe(false)
  })

  it('mayStateVerdict is exactly certifies — no separate rule', () => {
    for (const g of [authoredCorrect, authoredWrong, modelInvented, unresolved, null]) {
      expect(mayStateVerdict(g)).toBe(certifies(g))
    }
  })
})

describe('STRUCTURAL — turnContract.ts must never become a second decision engine', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/teaching/turnContract.ts'), 'utf8')
  const code = src
    .split('\n')
    .filter((l) => {
      const t = l.trim()
      return !t.startsWith('*') && !t.startsWith('//') && !t.startsWith('/*')
    })
    .join('\n')

  it('imports only TYPES — no value import from any authority module', () => {
    const importLines = src.split('\n').filter((l) => /^import /.test(l))
    for (const line of importLines) {
      expect(line).toMatch(/^import type /)
    }
  })

  it('contains no regex literal (a detector belongs to the module that owns the rule)', () => {
    // A regex literal in source looks like /.../ outside of a URL comment.
    // The only slashes in real code lines here are in import paths ('@/lib/...'),
    // which never contain a bare `/pattern/` token preceded by non-word chars
    // on both sides the way a regex literal does.
    expect(code).not.toMatch(/[^:]\/[^/\s][^/]*\/[gimsuy]?\s*[;,)\]]/)
  })

  it('contains no threshold-shaped numeric comparison (this module reports facts, never decides)', () => {
    expect(code).not.toMatch(/>=?\s*\d/)
    expect(code).not.toMatch(/<=?\s*\d/)
  })

  it('writes nothing: no prisma, no fetch, no console', () => {
    expect(code).not.toMatch(/prisma|fetch\(|console\./)
  })
})
