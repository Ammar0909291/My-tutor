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
  // The physics EB corpus wraps the authored prompt in a single double-quoted
  // span (context sentences plus the question together) — this is the unit
  // to extract verbatim, not something to re-split into individual sentences.
  it('extracts the full quoted discovery prompt verbatim, context sentences included', () => {
    const raw = 'Discovery-style: "Consider a table with 4 different rulers. Why might two people measure the same table and disagree?" — learner discovers the need for a shared standard.'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('Consider a table with 4 different rulers. Why might two people measure the same table and disagree?')
  })
  it('extracts a quoted prompt even when phrased as an imperative with no literal "?"', () => {
    // Regression: some authored prompts are instructions ("Compute X and see
    // if...") rather than literal questions — the quote must still be found.
    const raw = 'Discovery-style: "Metals contain many free electrons. Compute the fraction near E_F and see if that explains the discrepancy."'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('Metals contain many free electrons. Compute the fraction near E_F and see if that explains the discrepancy.')
  })
  it('strips the "Discovery-style:" label so it never leaks into the rendered prompt', () => {
    // Regression: label leaked when the quote's closing mark fell outside
    // the field's 500-char truncation, forcing the sentence-fallback path
    // (which must ALSO strip the label, not just the primary quote path).
    const raw = 'Discovery-style: "On September 14, 2015, two detectors felt spacetime vibrate. That signal had traveled 1.3 billion light-years through empty space to reach us'
    const result = extractFirstDiscoveryQuestion(raw)
    expect(result).not.toMatch(/Discovery[- ]style/i)
    expect(result).not.toMatch(/^"/)
  })
  it('does not mistake a short inline quoted term for the discovery prompt', () => {
    // Regression: "direct instruction" concepts' explanatory prose sometimes
    // quotes a short term (e.g. "why this metre") that is not itself a prompt.
    const raw = 'Direct instruction is warranted here. There is no "why this metre" to discover — the metre is defined to be what it is.'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('Direct instruction is warranted here.')
  })
  it('preserves a multi-line hard-wrapped quote as one continuous prompt', () => {
    // Regression: a newline inside the quoted span used to truncate the
    // question to whatever text sat on its final line.
    const raw = 'Discovery-style: "But bring 10²³ atoms together into a\nsolid crystal. What happens to those once-sharp\nenergy levels?"'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('But bring 10²³ atoms together into a solid crystal. What happens to those once-sharp energy levels?')
  })
  it('falls back to the first sentence when there is no quoted prompt at all (direct-instruction concepts)', () => {
    const raw = 'Direct instruction is warranted here. SI units are a social convention, not a discovery.'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('Direct instruction is warranted here.')
  })
  it('does not split a decimal number mid-value when falling back to first-sentence', () => {
    // Regression: "2.269" was being split as if "." ended the sentence.
    const raw = 'The critical point sits at kTc/J ≈ 2.269 for the 2D Ising model. Onsager solved this exactly in 1944.'
    expect(extractFirstDiscoveryQuestion(raw)).toBe('The critical point sits at kTc/J ≈ 2.269 for the 2D Ising model.')
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

  it('when a currentStepBlock is supplied, it REPLACES the full advisory TEACHING PLAN dump', () => {
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
    expect(rendered).not.toContain('TEACHING PLAN — follow this authored expert sequence')
    expect(rendered).not.toContain('Full authored sequence text that must not leak.')
  })

  it('falls back to the full advisory dump when no currentStepBlock is passed (back-compat)', () => {
    const eb = ebContext({ teachingSequence: 'Full authored sequence text.' })
    const rendered = buildBlueprintContextBlock(content, eb)
    // Label was corrected from "PHYSICS TEACHING PLAN" to "TEACHING PLAN"
    // once the isPhysics gate in loadEBConceptContext was removed — this
    // block now populates for any subject, not physics only.
    expect(rendered).toContain('TEACHING PLAN — follow this authored expert sequence')
    expect(rendered).toContain('Full authored sequence text.')
  })
})
