/**
 * Batch 0 of the Typed Turn Contract migration
 * (docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md). Unit tests only —
 * nothing in route.ts reads from `turnDelivery.ts` yet.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { compileTurnContract, type TurnContractInput, type ServerGrade, type IdentifiedProbe } from '@/lib/teaching/turnContract'
import {
  compileTurnDelivery,
  assertDeliverySatisfiesContract,
  type TurnDeliveryInput,
} from '@/lib/teaching/turnDelivery'
import type { TutorMCQ } from '@/lib/teaching/mcq'
import type { TurnArbitration } from '@/lib/teaching/turnArbitration'

function minimalContractInput(overrides: Partial<TurnContractInput> = {}): TurnContractInput {
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
    ...overrides,
  }
}

function minimalDeliveryInput(overrides: Partial<TurnDeliveryInput> = {}): TurnDeliveryInput {
  return {
    generation: {
      provider: 'groq', llmCallCount: 1, finishReason: 'stop', degraded: false,
      consecutiveOutages: 0,
      memory: {
        servingMode: null, confidence: null, assetId: null, conceptId: null,
        exactGradeMatch: null, fallbackUsed: null, fallbackReasonCode: '',
      },
    },
    question: {
      source: 'none', attached: null, withheldModelProbe: null, modelProbeVerdict: null,
      released: false, releasedQuestionText: null, served: null,
    },
    figure: { attachedThisTurn: false, introducedThisTurn: false, onScreen: false },
    verdict: {
      grade: null, signalVerification: 'CLEAN', serverGraded: false,
      signalSuppressedReason: null, teachingIntegrityFellThrough: false,
    },
    after: {
      ladder: null, episode: null, capability: null, capabilityObservations: [],
      narrative: null, frustration: null, frustrationBand: null,
      turnHistoryUpdate: null, turnProgress: null,
    },
    completion: { payload: null, masteryGatePending: false, masteryCompletionSuppressed: false },
    provenance: {
      hint: null, fillerDetected: false, stanceViolations: [], eosVerifierMetrics: null,
      eosVerifierTags: [], progressionTags: [], attemptVector: null, adaptationState: null,
    },
    ...overrides,
  }
}

const AUTHORED_MCQ: TutorMCQ = {
  question: 'Which force?', options: ['A', 'B'], correctIndex: 0, assetId: 'asset-123',
} as unknown as TutorMCQ

const AUTHORED_PROBE: IdentifiedProbe = { mcq: AUTHORED_MCQ, keyProvenance: 'authored', assetId: 'asset-123' }

const MODEL_MCQ: TutorMCQ = {
  question: 'What causes this?', options: ['X', 'Y'], correctIndex: 0,
} as unknown as TutorMCQ

const MODEL_PROBE: IdentifiedProbe = { mcq: MODEL_MCQ, keyProvenance: 'model-invented', assetId: null }

const UNRELATED_MCQ: TutorMCQ = {
  question: 'Neither attached nor pending', options: ['P', 'Q'], correctIndex: 0,
} as unknown as TutorMCQ

describe('compileTurnDelivery', () => {
  it('carries the contract through by reference and copies every field', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput())
    expect(d.contract).toBe(contract)
    expect(d.generation.provider).toBe('groq')
    expect(d.question.source).toBe('none')
  })

  it('freezes the top-level object and every named group', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput())
    expect(Object.isFrozen(d)).toBe(true)
    expect(Object.isFrozen(d.generation)).toBe(true)
    expect(Object.isFrozen(d.generation.memory)).toBe(true)
    expect(Object.isFrozen(d.question)).toBe(true)
    expect(Object.isFrozen(d.figure)).toBe(true)
    expect(Object.isFrozen(d.verdict)).toBe(true)
    expect(Object.isFrozen(d.after)).toBe(true)
    expect(Object.isFrozen(d.completion)).toBe(true)
    expect(Object.isFrozen(d.provenance)).toBe(true)
  })

  it('freezes a present turnProgress sub-object too, and tolerates a null one', () => {
    const contract = compileTurnContract(minimalContractInput())
    const withProgress = compileTurnDelivery(
      contract,
      minimalDeliveryInput({ after: { ...minimalDeliveryInput().after, turnProgress: { outcome: 'productive', stagnantTurns: 0, rung: 0, probeHeldTurns: 0 } } }),
    )
    expect(Object.isFrozen(withProgress.after.turnProgress)).toBe(true)
    const withoutProgress = compileTurnDelivery(contract, minimalDeliveryInput())
    expect(withoutProgress.after.turnProgress).toBeNull()
  })
})

describe('assertDeliverySatisfiesContract', () => {
  it('reports no violations on a clean, empty turn', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput())
    expect(assertDeliverySatisfiesContract(d)).toEqual([])
  })

  it('A1 — flags a verdict.grade that diverges from contract.inbound.grade', () => {
    const grade: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'authored' }
    const otherGrade: ServerGrade = { kind: 'graded', chosenIndex: 1, correct: false, keyProvenance: 'authored' }
    const contract = compileTurnContract(minimalContractInput({ inbound: { isBareAck: false, lowSignalAck: false, pendingProbe: null, grade, priorTurnUnresolvedProseMcq: false } }))
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ verdict: { grade: otherGrade, signalVerification: 'CLEAN', serverGraded: true, signalSuppressedReason: null, teachingIntegrityFellThrough: false } }))
    const violations = assertDeliverySatisfiesContract(d)
    expect(violations.map((v) => v.code)).toContain('A1')
  })

  it('A1 — clean when verdict.grade is reference-equal to contract.inbound.grade', () => {
    const grade: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'authored' }
    const contract = compileTurnContract(minimalContractInput({ inbound: { isBareAck: false, lowSignalAck: false, pendingProbe: null, grade, priorTurnUnresolvedProseMcq: false } }))
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ verdict: { grade: contract.inbound.grade, signalVerification: 'CLEAN', serverGraded: true, signalSuppressedReason: null, teachingIntegrityFellThrough: false } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A1')
  })

  it('A2 — flags a model-invented item served under the gate-authored source', () => {
    const contract = compileTurnContract(minimalContractInput({
      assessment: { gateProbe: AUTHORED_PROBE, gateLeadIn: 'Let me check with this.', authoredProbesExist: true, declinedByPolicy: false, phaseAllowsProbe: true, probeWouldCountThisPhase: true, observeAskViolation: false, gateTerms: null, legalityBlockedReason: null, legalityBlock: null },
    }))
    const modelProbe: IdentifiedProbe = { mcq: AUTHORED_MCQ, keyProvenance: 'model-invented', assetId: null }
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ question: { source: 'gate-authored', attached: modelProbe, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A2')
  })

  it('A2 — flags an assetId mismatch between the served probe and the gate\'s own selection', () => {
    const contract = compileTurnContract(minimalContractInput({
      assessment: { gateProbe: AUTHORED_PROBE, gateLeadIn: 'Let me check with this.', authoredProbesExist: true, declinedByPolicy: false, phaseAllowsProbe: true, probeWouldCountThisPhase: true, observeAskViolation: false, gateTerms: null, legalityBlockedReason: null, legalityBlock: null },
    }))
    const differentAsset: IdentifiedProbe = { mcq: AUTHORED_MCQ, keyProvenance: 'authored', assetId: 'asset-999' }
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ question: { source: 'gate-authored', attached: differentAsset, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A2')
  })

  it('A2 — clean when the gate-authored source truly matches the gate\'s own probe', () => {
    const contract = compileTurnContract(minimalContractInput({
      assessment: { gateProbe: AUTHORED_PROBE, gateLeadIn: 'Let me check with this.', authoredProbesExist: true, declinedByPolicy: false, phaseAllowsProbe: true, probeWouldCountThisPhase: true, observeAskViolation: false, gateTerms: null, legalityBlockedReason: null, legalityBlock: null },
    }))
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A2')
  })

  it('A3 — flags serverGraded disagreeing with certifies(grade)', () => {
    const contract = compileTurnContract(minimalContractInput())
    const grade: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'authored' }
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ verdict: { grade, signalVerification: 'CLEAN', serverGraded: false, signalSuppressedReason: null, teachingIntegrityFellThrough: false } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A3')
  })

  it('A4 — flags a model-invented grade reported CLEAN (phys.mech.friction, 2026-09-01)', () => {
    const contract = compileTurnContract(minimalContractInput())
    const grade: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'model-invented' }
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ verdict: { grade, signalVerification: 'CLEAN', serverGraded: false, signalSuppressedReason: null, teachingIntegrityFellThrough: false } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A4')
  })

  it('A4 — clean when a model-invented grade is marked SUSPICIOUS or CONTRADICTED', () => {
    const contract = compileTurnContract(minimalContractInput())
    const grade: ServerGrade = { kind: 'graded', chosenIndex: 0, correct: true, keyProvenance: 'model-invented' }
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ verdict: { grade, signalVerification: 'SUSPICIOUS', serverGraded: false, signalSuppressedReason: null, teachingIntegrityFellThrough: false } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A4')
  })

  it('A5 — flags a released probe that still shows a served question (D5, the missing-list defect)', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: true, releasedQuestionText: 'Which force?', served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A5')
  })

  it('A5 — clean when a released probe correctly serves nothing', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ question: { source: 'none', attached: null, withheldModelProbe: null, modelProbeVerdict: null, released: true, releasedQuestionText: 'Which force?', served: null } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A5')
  })

  it('A7 — flags a question attached while arbitration denies NEW_QUESTION (Phase 3)', () => {
    const denyingArbitration: TurnArbitration = {
      owner: 'CLOSE',
      allows: (cap) => cap !== 'NEW_QUESTION',
    } as unknown as TurnArbitration
    const contract = compileTurnContract(minimalContractInput({
      authority: { arbitration: denyingArbitration, recoveryKey: null, firstLessonActive: false, excursion: { active: false, decision: null, teachingTitle: null }, knowledgeGap: null, learnerRequest: null, navigationRequest: false, claimChallengeActive: false },
    }))
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A7')
  })

  it('A7 — clean when arbitration allows NEW_QUESTION, or arbitration is unavailable (null)', () => {
    const allowingArbitration: TurnArbitration = {
      owner: 'TEACH',
      allows: () => true,
    } as unknown as TurnArbitration
    const contractAllowed = compileTurnContract(minimalContractInput({
      authority: { arbitration: allowingArbitration, recoveryKey: null, firstLessonActive: false, excursion: { active: false, decision: null, teachingTitle: null }, knowledgeGap: null, learnerRequest: null, navigationRequest: false, claimChallengeActive: false },
    }))
    const dAllowed = compileTurnDelivery(contractAllowed, minimalDeliveryInput({ question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(dAllowed).map((v) => v.code)).not.toContain('A7')

    const contractNull = compileTurnContract(minimalContractInput())
    const dNull = compileTurnDelivery(contractNull, minimalDeliveryInput({ question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ } }))
    expect(assertDeliverySatisfiesContract(dNull).map((v) => v.code)).not.toContain('A7')
  })

  it('A8 — flags a figure introduced with no payload attached', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ figure: { attachedThisTurn: false, introducedThisTurn: true, onScreen: true } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).toContain('A8')
  })

  it('A8 — clean when introducedThisTurn implies attachedThisTurn', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({ figure: { attachedThisTurn: true, introducedThisTurn: true, onScreen: true } }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A8')
  })

  it('A11 — clean when nothing is served', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput())
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A11')
  })

  it('A11 — clean when the served item is this turn\'s fresh AUTHORED probe (I3 satisfied)', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({
      question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ },
    }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A11')
  })

  it('A11 — flags a model-invented item served THIS turn (I3: the `?? mcqParse.mcq` fallback reaching the learner)', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({
      question: { source: 'model-parsed', attached: MODEL_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: MODEL_MCQ },
    }))
    const violations = assertDeliverySatisfiesContract(d)
    expect(violations.map((v) => v.code)).toContain('A11')
    expect(violations.find((v) => v.code === 'A11')?.detail).toMatch(/model-invented/)
  })

  it('A11 — clean when a CARRIED-FORWARD authored probe is served (this turn attached nothing fresh)', () => {
    const contract = compileTurnContract(minimalContractInput({
      inbound: { isBareAck: false, lowSignalAck: false, pendingProbe: AUTHORED_PROBE, grade: null, priorTurnUnresolvedProseMcq: false },
    }))
    const d = compileTurnDelivery(contract, minimalDeliveryInput({
      question: { source: 'none', attached: null, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: AUTHORED_MCQ },
    }))
    expect(assertDeliverySatisfiesContract(d).map((v) => v.code)).not.toContain('A11')
  })

  it('A11 — flags a CARRIED-FORWARD model-invented probe being served (provenance survives across turns, not just `question.source`)', () => {
    const contract = compileTurnContract(minimalContractInput({
      inbound: { isBareAck: false, lowSignalAck: false, pendingProbe: MODEL_PROBE, grade: null, priorTurnUnresolvedProseMcq: false },
    }))
    // This turn's OWN fresh attempt is 'none' — `question.source` alone would
    // miss this; the served item's provenance must be resolved from the
    // carried-forward pending probe instead, which is exactly what A11 does.
    const d = compileTurnDelivery(contract, minimalDeliveryInput({
      question: { source: 'none', attached: null, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: MODEL_MCQ },
    }))
    const violations = assertDeliverySatisfiesContract(d)
    expect(violations.map((v) => v.code)).toContain('A11')
    expect(violations.find((v) => v.code === 'A11')?.detail).toMatch(/model-invented/)
  })

  it('A11 — flags served matching neither the fresh nor the carried-forward identified probe (unknown provenance)', () => {
    const contract = compileTurnContract(minimalContractInput({
      inbound: { isBareAck: false, lowSignalAck: false, pendingProbe: AUTHORED_PROBE, grade: null, priorTurnUnresolvedProseMcq: false },
    }))
    const d = compileTurnDelivery(contract, minimalDeliveryInput({
      question: { source: 'gate-authored', attached: AUTHORED_PROBE, withheldModelProbe: null, modelProbeVerdict: null, released: false, releasedQuestionText: null, served: UNRELATED_MCQ },
    }))
    const violations = assertDeliverySatisfiesContract(d)
    expect(violations.map((v) => v.code)).toContain('A11')
    expect(violations.find((v) => v.code === 'A11')?.detail).toMatch(/provenance unknown/)
  })

  it('never throws — a representation bug must not become a teaching outage', () => {
    const contract = compileTurnContract(minimalContractInput())
    const d = compileTurnDelivery(contract, minimalDeliveryInput({
      question: { source: 'gate-authored', attached: null, withheldModelProbe: null, modelProbeVerdict: null, released: true, releasedQuestionText: null, served: AUTHORED_MCQ },
      figure: { attachedThisTurn: false, introducedThisTurn: true, onScreen: false },
    }))
    expect(() => assertDeliverySatisfiesContract(d)).not.toThrow()
  })
})

describe('STRUCTURAL — turnDelivery.ts must not become the composed output verifier', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/teaching/turnDelivery.ts'), 'utf8')
  const code = src
    .split('\n')
    .filter((l) => {
      const t = l.trim()
      return !t.startsWith('*') && !t.startsWith('//') && !t.startsWith('/*')
    })
    .join('\n')

  it('does not import the kernel verifier rules module or any prose-scanning module', () => {
    expect(src).not.toMatch(/from ['"]@\/lib\/kernel\/verifier\/rules['"]/)
    expect(code).not.toMatch(/verify\(|buildViolationAppendix/)
  })

  it('assertDeliverySatisfiesContract never throws by construction (no throw statement in the module)', () => {
    expect(code).not.toMatch(/\bthrow\b/)
  })

  it('writes nothing: no prisma, no fetch, no DB-shaped call', () => {
    expect(code).not.toMatch(/prisma|fetch\(/)
  })
})
