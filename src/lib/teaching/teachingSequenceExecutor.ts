/**
 * Teaching Sequence Executor (Option B, physics-only).
 *
 * Problem: the authored EB Teaching Plan (Teaching Sequence / Tutor Actions /
 * Discovery Questions / Assessment Signals — blueprintLoader.ts "P1") was
 * injected into the system prompt as one advisory block per turn, in full,
 * every turn. The LLM was free to explain before discovery, skip steps,
 * repeat steps, or improvise — because nothing in the runtime tracked which
 * step the lesson was actually on.
 *
 * Fix: the runtime now owns progression. Each turn, this module computes
 * ONE current step (DISCOVERY -> TEACHING -> ASSESSMENT) from persisted
 * state + the prior turn's SIGNAL evidence, and renders ONLY that step as a
 * mandatory contract. The LLM never sees future steps and never decides
 * which step comes next — it only renders the current one, exactly like
 * firstLessonGuard.ts and recoveryGuard.ts already do for their own states.
 *
 * Deliberately NOT built: no generic sequencing DSL, no step-parser for the
 * authored prose (the corpus's "Teaching Sequence" text is unstructured
 * prose citing the Blueprint by reference, not a reliably delimited list —
 * see repo research), no new decision engine. The three-stage model below
 * reuses the four fields blueprintLoader.ts already parses; it does not
 * re-parse them.
 */

import type { EBConceptContext } from '@/lib/curriculum/blueprintLoader'

export type TeachingStepName = 'DISCOVERY' | 'TEACHING' | 'ASSESSMENT'

export const TEACHING_STEPS: TeachingStepName[] = ['DISCOVERY', 'TEACHING', 'ASSESSMENT']

export interface TeachingStepContract {
  step: TeachingStepName
  stepIndex: number
  isFirstTurnOfConcept: boolean
  objective: string
  action: string
  forbidden: string[]
  stopCondition: string
}

const FIRST_TURN_FORBIDDEN = [
  'Definitions',
  'Formula',
  'Analogy',
  'Summary',
  'A second question',
  'New vocabulary',
  'Explanation',
  'Future preview',
  'Assessment',
]

const TEACHING_FORBIDDEN = [
  'Skipping ahead to assessment or a mastery quiz',
  'Introducing a second, unrelated concept',
  'Ending the turn without performing the authored action',
]

const ASSESSMENT_FORBIDDEN = [
  'Re-teaching or re-explaining the concept before probing',
  'Introducing new content',
  'Asking more than one mastery question this turn',
]

/** True when the EB entry carries the physics-only Teaching Plan fields (P1). */
export function hasTeachingPlan(ebContext: EBConceptContext | null | undefined): boolean {
  return !!(
    ebContext &&
    (ebContext.teachingSequence || ebContext.tutorActions || ebContext.discoveryQuestions || ebContext.assessmentSignals)
  )
}

/**
 * Extracts the first authored discovery question from the raw Discovery
 * Questions / Discovery lesson block. The corpus stores this as prose or a
 * question bank, not a delimited list — the first sentence ending in "?" is
 * the first authored question. Falls back to the block's first sentence for
 * "direct instruction warranted" concepts that have no discovery question
 * (e.g. pure conventions like SI units).
 */
export function extractFirstDiscoveryQuestion(raw: string | null): string | null {
  if (!raw) return null
  const qMatch = raw.match(/[^.!?\n]*\?/)
  if (qMatch) return qMatch[0].trim().replace(/\s+/g, ' ')
  const firstSentence = raw.match(/^[^.!?\n]+[.!?]/)
  return firstSentence ? firstSentence[0].trim().replace(/\s+/g, ' ') : raw.slice(0, 200).trim()
}

/**
 * Reads persisted progress from contextSnapshot for the given concept.
 * Resets to step 0 whenever the persisted concept differs from the current
 * one — a new concept always starts a new sequence; a stale step index from
 * a previous concept is never carried over.
 */
export function readTeachingStepIndex(
  snapshot: Record<string, unknown> | null | undefined,
  conceptId: string,
): { stepIndex: number; isFirstTurnOfConcept: boolean } {
  const persistedConceptId = typeof snapshot?.teachingStepConceptId === 'string' ? snapshot.teachingStepConceptId : null
  const persistedIndexRaw = snapshot?.teachingStepIndex
  const persistedIndex = typeof persistedIndexRaw === 'number' && Number.isFinite(persistedIndexRaw) ? persistedIndexRaw : 0

  if (persistedConceptId !== conceptId) {
    return { stepIndex: 0, isFirstTurnOfConcept: true }
  }
  return { stepIndex: persistedIndex, isFirstTurnOfConcept: false }
}

/**
 * Advances the step index using evidence from the PRIOR turn's SIGNAL
 * (contextSnapshot.lastSignal — grading of the student's most recent
 * answer, already parsed by signals.ts and persisted before this turn
 * began). Advancement is monotonic and evidence-gated only:
 *
 *   DISCOVERY -> TEACHING: the student answered the discovery question
 *     (correctness is defined — right or wrong, the discovery turn is
 *     over). A bare confusion/"I don't know" signal with no correctness
 *     read does NOT advance — the student hasn't engaged with the
 *     question yet (Recovery, not this executor, handles that turn).
 *   TEACHING -> ASSESSMENT: the student has shown correct understanding
 *     at least once while teaching was underway.
 *   ASSESSMENT: terminal for this executor.
 *
 * Never regresses. Regression only ever happens via Recovery, which is
 * handled entirely by recoveryGuard.ts and never calls this function —
 * so a recovery turn simply leaves the step index untouched, which is
 * exactly "resume the current step" (Option B spec, Recovery + Regression
 * rules) with no extra code.
 */
export function advanceTeachingStepIndex(
  currentStepIndex: number,
  lastSignal: { correctness?: boolean; confusion?: boolean } | null | undefined,
): number {
  if (!lastSignal) return currentStepIndex

  if (currentStepIndex === 0 && typeof lastSignal.correctness === 'boolean') {
    return 1
  }
  if (currentStepIndex === 1 && lastSignal.correctness === true) {
    return 2
  }
  return currentStepIndex
}

/**
 * Builds the deterministic contract for the current step. This is the ONLY
 * thing the LLM is allowed to render — it never receives the other steps.
 */
export function buildTeachingStepContract(
  ebContext: EBConceptContext,
  stepIndex: number,
  isFirstTurnOfConcept: boolean,
): TeachingStepContract {
  const clamped = Math.max(0, Math.min(stepIndex, TEACHING_STEPS.length - 1))
  const step = TEACHING_STEPS[clamped]

  if (step === 'DISCOVERY') {
    const question = extractFirstDiscoveryQuestion(ebContext.discoveryQuestions)
    return {
      step,
      stepIndex: clamped,
      isFirstTurnOfConcept,
      objective: "Build curiosity and observe the student's current thinking. Do not teach yet.",
      action: question
        ? `Give ONE sentence of concrete context, then ask this authored discovery question: "${question}"`
        : 'Give ONE sentence of concrete context, then ask a single discovery question for this concept.',
      forbidden: FIRST_TURN_FORBIDDEN,
      stopCondition: "Stop immediately after asking the question. Wait for the student's answer.",
    }
  }

  if (step === 'TEACHING') {
    const actionParts = [ebContext.teachingSequence, ebContext.tutorActions].filter(
      (v): v is string => typeof v === 'string' && v.length > 0,
    )
    return {
      step,
      stepIndex: clamped,
      isFirstTurnOfConcept,
      objective: 'Teach this concept using the authored sequence below. Do not invent a different approach.',
      action: actionParts.length > 0 ? actionParts.join('\n') : 'Teach the concept directly, one idea at a time.',
      forbidden: TEACHING_FORBIDDEN,
      stopCondition: "Perform ONE authored teaching action this turn, then stop and wait for the student's response.",
    }
  }

  // ASSESSMENT
  return {
    step,
    stepIndex: clamped,
    isFirstTurnOfConcept,
    objective: 'Verify mastery using the authored assessment signal for this concept.',
    action: ebContext.assessmentSignals
      ? ebContext.assessmentSignals
      : 'Ask a single question that checks whether the student can apply the concept correctly.',
    forbidden: ASSESSMENT_FORBIDDEN,
    stopCondition: "Ask ONE mastery-check question, then stop and wait for the student's answer.",
  }
}

/** Renders a TeachingStepContract as the CURRENT STEP prompt block. Contains no future steps. */
export function renderTeachingStepContractBlock(contract: TeachingStepContract): string {
  const lines: string[] = []
  lines.push(
    contract.isFirstTurnOfConcept
      ? '\nFIRST CONCEPT TURN — TEACHING SEQUENCE EXECUTOR (runtime-controlled, MANDATORY):'
      : `\nCURRENT TEACHING STEP: ${contract.stepIndex + 1} of ${TEACHING_STEPS.length} (${contract.step}) — runtime-controlled, MANDATORY:`,
  )
  lines.push(`OBJECTIVE: ${contract.objective}`)
  lines.push(`ACTION (do ONLY this): ${contract.action}`)
  lines.push(`FORBIDDEN this turn: ${contract.forbidden.join(', ')}.`)
  lines.push(`STOP CONDITION: ${contract.stopCondition}`)
  lines.push(
    'You do not know what comes after this step. Do not preview it, do not skip it, and do not repeat a step that has already been completed.',
  )
  return lines.join('\n')
}
