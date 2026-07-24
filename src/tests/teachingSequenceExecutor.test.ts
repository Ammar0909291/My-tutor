/**
 * Option B — Deterministic Teaching Sequence Executor (physics only).
 * Proves the runtime, not the LLM, controls lesson-step progression: first
 * turn always asks the authored discovery question, no explanation before
 * an answer, no skipped/repeated steps, evidence-gated advancement only,
 * and session/recovery resume the persisted step instead of restarting.
 */
import { describe, it, expect } from 'vitest'
import {
  hasTeachingPlan,
  extractFirstDiscoveryQuestion,
  readTeachingStepIndex,
  advanceTeachingStepIndex,
  buildTeachingStepContract,
  renderTeachingStepContractBlock,
  TEACHING_STEPS,
} from '@/lib/teaching/teachingSequenceExecutor'
import { buildBlueprintContextBlock, type EBConceptContext, type BlueprintContent } from '@/lib/curriculum/blueprintLoader'

function ebContext(overrides: Partial<EBConceptContext> = {}): EBConceptContext {
  return {
    conceptId: 'phys.meas.units',
    recoveryShrinkTo: null,
    recoveryTriggers: [],
    antiAnalogies: [],
    voiceDetectionCues: [],
    openingScenario: null,
    teachingSequence: null,
    tutorActions: null,
    discoveryQuestions: null,
    assessmentSignals: null,
    ...overrides,
  }
}

describe('hasTeachingPlan', () => {
  it('true when any of the 4 physics fields is present', () => {
    expect(hasTeachingPlan(ebContext({ discoveryQuestions: 'Why do we need a shared unit?' }))).toBe(true)
    expect(hasTeachingPlan(ebContext({ teachingSequence: 'Tell -> show -> apply' }))).toBe(true)
  })
  it('false when none present, or null/undefined', () => {
    expect(hasTeachingPlan(ebContext())).toBe(false)
    expect(hasTeachingPlan(null)).toBe(false)
    expect(hasTeachingPlan(undefined)).toBe(false)
  })
})

describe('extractFirstDiscoveryQuestion', () => {
  it('extracts the first "?" sentence from a prose block', () => {
    const raw = 'Consider a table with 4 different rulers. Why might two people measure the same table and disagree? A second question here?'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('Why might two people measure the same table and disagree?')
  })
  it('falls back to the first sentence when there is no question mark (direct-instruction concepts)', () => {
    const raw = 'Direct instruction is warranted here. SI units are a social convention, not a discovery.'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('Direct instruction is warranted here.')
  })
  it('returns null for null input', () => {
    expect(extractFirstDiscoveryQuestion(null)).toBeNull()
  })
})

describe('readTeachingStepIndex — session/concept continuity', () => {
  it('starts a brand-new concept at step 0, flagged as first turn', () => {
    const result = readTeachingStepIndex(null, 'phys.mech.newtons-first-law')
    expect(result).toEqual({ stepIndex: 0, isFirstTurnOfConcept: true })
  })
  it('resumes a persisted step for the SAME concept (session resume, not restart)', () => {
    const snapshot = { teachingStepIndex: 1, teachingStepConceptId: 'phys.mech.newtons-first-law' }
    const result = readTeachingStepIndex(snapshot, 'phys.mech.newtons-first-law')
    expect(result).toEqual({ stepIndex: 1, isFirstTurnOfConcept: false })
  })
  it('resets to step 0 when the concept has changed since the persisted index', () => {
    const snapshot = { teachingStepIndex: 2, teachingStepConceptId: 'phys.meas.units' }
    const result = readTeachingStepIndex(snapshot, 'phys.mech.newtons-first-law')
    expect(result).toEqual({ stepIndex: 0, isFirstTurnOfConcept: true })
  })
})

describe('advanceTeachingStepIndex — evidence-gated advancement only', () => {
  it('does not advance with no signal at all', () => {
    expect(advanceTeachingStepIndex(0, null)).toBe(0)
    expect(advanceTeachingStepIndex(0, undefined)).toBe(0)
  })
  it('does NOT advance DISCOVERY on confusion alone ("I don\'t know" never answered)', () => {
    expect(advanceTeachingStepIndex(0, { confusion: true })).toBe(0)
  })
  it('advances DISCOVERY -> TEACHING once correctness is defined, right or wrong', () => {
    expect(advanceTeachingStepIndex(0, { correctness: true })).toBe(1)
    expect(advanceTeachingStepIndex(0, { correctness: false })).toBe(1)
  })
  it('does NOT advance TEACHING -> ASSESSMENT on a wrong answer', () => {
    expect(advanceTeachingStepIndex(1, { correctness: false })).toBe(1)
  })
  it('advances TEACHING -> ASSESSMENT on a correct answer', () => {
    expect(advanceTeachingStepIndex(1, { correctness: true })).toBe(2)
  })
  it('never regresses — ASSESSMENT stays terminal regardless of signal', () => {
    expect(advanceTeachingStepIndex(2, { correctness: false })).toBe(2)
    expect(advanceTeachingStepIndex(2, { correctness: true })).toBe(2)
  })
  it('never jumps backward for any signal shape at any step', () => {
    // Guards the "no loops like Discovery -> Explain -> Discovery" failure mode.
    expect(advanceTeachingStepIndex(1, { confusion: true })).toBe(1)
    expect(advanceTeachingStepIndex(2, { confusion: true })).toBe(2)
  })
})

describe('buildTeachingStepContract — DISCOVERY (first-turn hard contract)', () => {
  const eb = ebContext({ discoveryQuestions: 'Why might two thermometers disagree on a cold day?' })

  it('step 0 uses the authored discovery question and forbids everything else', () => {
    const contract = buildTeachingStepContract(eb, 0, true)
    expect(contract.step).toBe('DISCOVERY')
    expect(contract.isFirstTurnOfConcept).toBe(true)
    expect(contract.action).toContain('Why might two thermometers disagree on a cold day?')
    for (const forbidden of ['Definitions', 'Formula', 'Analogy', 'Summary', 'A second question', 'Explanation', 'Assessment']) {
      expect(contract.forbidden).toContain(forbidden)
    }
  })

  it('falls back gracefully when no discovery question is authored', () => {
    const contract = buildTeachingStepContract(ebContext(), 0, true)
    expect(contract.action).toMatch(/ask a single discovery question/i)
  })
})

describe('buildTeachingStepContract — TEACHING', () => {
  it('uses teachingSequence + tutorActions and forbids skipping to assessment', () => {
    const eb = ebContext({ teachingSequence: 'Tell the unit, show the symbol.', tutorActions: 'Use retrieval practice.' })
    const contract = buildTeachingStepContract(eb, 1, false)
    expect(contract.step).toBe('TEACHING')
    expect(contract.action).toContain('Tell the unit, show the symbol.')
    expect(contract.action).toContain('Use retrieval practice.')
    expect(contract.forbidden.some((f) => /assessment|quiz/i.test(f))).toBe(true)
  })
})

describe('buildTeachingStepContract — ASSESSMENT', () => {
  it('uses assessmentSignals and forbids re-teaching', () => {
    const eb = ebContext({ assessmentSignals: 'Ask for the SI unit and symbol of current.' })
    const contract = buildTeachingStepContract(eb, 2, false)
    expect(contract.step).toBe('ASSESSMENT')
    expect(contract.action).toContain('Ask for the SI unit and symbol of current.')
    expect(contract.forbidden.some((f) => /re-teach/i.test(f))).toBe(true)
  })

  it('clamps an out-of-range step index to the last step (ASSESSMENT)', () => {
    const contract = buildTeachingStepContract(ebContext(), 99, false)
    expect(contract.step).toBe('ASSESSMENT')
    expect(contract.stepIndex).toBe(TEACHING_STEPS.length - 1)
  })
})

describe('renderTeachingStepContractBlock', () => {
  it('never mentions steps other than the current one, and marks first-turn distinctly', () => {
    const eb = ebContext({ discoveryQuestions: 'What happens if we double the force?' })
    const contract = buildTeachingStepContract(eb, 0, true)
    const rendered = renderTeachingStepContractBlock(contract)
    expect(rendered).toContain('FIRST CONCEPT TURN')
    expect(rendered).toContain('What happens if we double the force?')
    expect(rendered).toContain('do not skip it')
    expect(rendered).not.toMatch(/TEACHING SEQUENCE \(follow this order/) // old full-dump heading must not leak in
  })

  it('non-first-turn steps are labelled with position (N of 3)', () => {
    const eb = ebContext({ teachingSequence: 'Explain the law.' })
    const contract = buildTeachingStepContract(eb, 1, false)
    const rendered = renderTeachingStepContractBlock(contract)
    expect(rendered).toContain('CURRENT TEACHING STEP: 2 of 3 (TEACHING)')
  })
})

describe('buildBlueprintContextBlock — Option B integration', () => {
  const content: BlueprintContent = {
    conceptId: 'phys.meas.units',
    conceptSpine: null,
    misconceptions: [],
    explanations: [],
  }

  it('when a currentStepBlock is supplied, it REPLACES the full advisory PHYSICS TEACHING PLAN dump', () => {
    const eb = ebContext({
      teachingSequence: 'Full authored sequence text that must not leak.',
      discoveryQuestions: 'Why do units matter?',
    })
    const contract = buildTeachingStepContract(eb, 0, true)
    const stepBlock = renderTeachingStepContractBlock(contract)
    const rendered = buildBlueprintContextBlock(content, eb, stepBlock)

    expect(rendered).toContain('FIRST CONCEPT TURN')
    expect(rendered).toContain('Why do units matter?')
    // The old full-dump heading and the raw future-step content must be absent.
    expect(rendered).not.toContain('PHYSICS TEACHING PLAN — follow this authored expert sequence')
    expect(rendered).not.toContain('Full authored sequence text that must not leak.')
  })

  it('falls back to the full advisory dump when no currentStepBlock is passed (back-compat)', () => {
    const eb = ebContext({ teachingSequence: 'Full authored sequence text.' })
    const rendered = buildBlueprintContextBlock(content, eb)
    expect(rendered).toContain('PHYSICS TEACHING PLAN — follow this authored expert sequence')
    expect(rendered).toContain('Full authored sequence text.')
  })
})
