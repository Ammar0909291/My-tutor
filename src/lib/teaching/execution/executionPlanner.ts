/**
 * Execution Planner — the final orchestration layer.
 *
 * `planExecution()` converts a `TeachingPlan` into an `ExecutionPlan`: which
 * existing subsystem runs, in what order, with what inputs, and what happens
 * when one of them is unavailable.
 *
 * Pure, synchronous, deterministic. No database, no Prisma, no LLM, no
 * rendering, no lesson execution, no runtime wiring. It never teaches — it
 * only schedules the systems that do.
 */

import { TeachingIntent, LessonMode, type TeachingPlan } from '../planner/teachingPlan'
import type { ConceptUnderstanding } from '../concept/conceptUnderstanding'
import {
  ExecutionStepKind, Subsystem, FailurePolicy, ExecutionMode, STEP_FROM_PLANNER,
  type ExecutionPlan, type ExecutionStepPlan, type ResumeInstruction, type StepInputs,
} from './executionPlan'

// ── Inputs ────────────────────────────────────────────────────────────────

/** Which subsystems are currently usable. Omitted subsystems are assumed
 *  available — the planner degrades on explicit evidence, never on guesswork. */
export type SubsystemAvailability = Partial<Record<Subsystem, boolean>>

export interface ExecutionPlannerInputs {
  plan: TeachingPlan
  /** The Concept Understanding result for this turn, when available. Read for
   *  ambiguity only — this planner does not re-resolve concepts. */
  concepts?: ConceptUnderstanding | null
  availability?: SubsystemAvailability
}

// ── Step construction ─────────────────────────────────────────────────────

/** The subsystem chain each executable step invokes. VISUALIZE is genuinely a
 *  chain: the VIE produces a VisualIntent, ADR 12 produces the visual from it. */
const STEP_SUBSYSTEMS: Readonly<Record<ExecutionStepKind, readonly Subsystem[]>> = {
  UNDERSTAND: [Subsystem.CONCEPT_UNDERSTANDING],
  EXPLAIN: [Subsystem.EXPLANATION_ENGINE],
  VISUALIZE: [Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, Subsystem.ADR12_VISUAL_PRODUCTION],
  ASSESS: [Subsystem.ASSESSMENT_ENGINE],
  WORKED_EXAMPLE: [Subsystem.EXPLANATION_ENGINE],
  REVISION: [Subsystem.LESSON_ENGINE],
  LESSON_FLOW: [Subsystem.LESSON_ENGINE],
  LESSON_RESUME: [Subsystem.LESSON_ENGINE],
  WAIT_FOR_STUDENT: [],
  ASK_DISAMBIGUATION: [Subsystem.EXPLANATION_ENGINE],
}

const STEP_OUTPUT: Readonly<Record<ExecutionStepKind, string>> = {
  UNDERSTAND: 'ConceptUnderstanding',
  EXPLAIN: 'explanation content',
  VISUALIZE: 'VisualIntent -> rendered visual',
  ASSESS: 'assessment item',
  WORKED_EXAMPLE: 'worked solution',
  REVISION: 'retrieval prompt',
  LESSON_FLOW: 'next lesson turn',
  LESSON_RESUME: 'lesson control handback',
  WAIT_FOR_STUDENT: 'student response',
  ASK_DISAMBIGUATION: 'clarification question',
}

/** Recovery per step. Every value is non-terminating — see FailurePolicy. */
const STEP_FAILURE_POLICY: Readonly<Record<ExecutionStepKind, FailurePolicy>> = {
  UNDERSTAND: FailurePolicy.SKIP_AND_CONTINUE,
  EXPLAIN: FailurePolicy.SKIP_AND_CONTINUE,
  // Visualization unavailable -> the explanation still carries the turn.
  VISUALIZE: FailurePolicy.SUBSTITUTE_EXPLANATION,
  // Assessment unavailable -> skip it; never block teaching on a probe.
  ASSESS: FailurePolicy.SKIP_AND_CONTINUE,
  WORKED_EXAMPLE: FailurePolicy.SUBSTITUTE_EXPLANATION,
  REVISION: FailurePolicy.SKIP_AND_CONTINUE,
  LESSON_FLOW: FailurePolicy.SKIP_AND_CONTINUE,
  LESSON_RESUME: FailurePolicy.SKIP_AND_CONTINUE,
  WAIT_FOR_STUDENT: FailurePolicy.NOT_APPLICABLE,
  ASK_DISAMBIGUATION: FailurePolicy.REQUEST_CLARIFICATION,
}

/** Steps the sequence stays coherent without. */
const OPTIONAL_STEPS: ReadonlySet<ExecutionStepKind> = new Set([
  ExecutionStepKind.VISUALIZE,
  ExecutionStepKind.ASSESS,
  ExecutionStepKind.REVISION,
  ExecutionStepKind.UNDERSTAND,
])

function buildStep(kind: ExecutionStepKind, inputs: StepInputs): ExecutionStepPlan {
  return {
    kind,
    subsystems: STEP_SUBSYSTEMS[kind],
    inputs,
    expectedOutput: STEP_OUTPUT[kind],
    failurePolicy: STEP_FAILURE_POLICY[kind],
    required: !OPTIONAL_STEPS.has(kind),
  }
}

// ── Deterministic execution id ────────────────────────────────────────────

/** FNV-1a over the plan's identifying content. Deterministic by design: no
 *  randomness, no clock, so the planner stays pure and two identical plans
 *  are provably identical. */
function deterministicId(parts: readonly string[]): string {
  let hash = 0x811c9dc5
  const input = parts.join('|')
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return `exec_${hash.toString(16).padStart(8, '0')}`
}

// ── Availability ──────────────────────────────────────────────────────────

function isAvailable(subsystem: Subsystem, availability: SubsystemAvailability): boolean {
  return availability[subsystem] !== false
}

/** A step runs only if EVERY subsystem in its chain is available — a visual
 *  needs both the VIE and ADR 12; either being down means no visual. */
function stepIsRunnable(step: ExecutionStepPlan, availability: SubsystemAvailability): boolean {
  return step.subsystems.every(s => isAvailable(s, availability))
}

// ── Entry point ───────────────────────────────────────────────────────────

/**
 * Convert a TeachingPlan into an ExecutionPlan.
 *
 * Order of decisions:
 *   1. Ambiguity blocks teaching -> ask, wait, defer the original request.
 *   2. Otherwise map the planner's pedagogical sequence to executable steps.
 *   3. Prepend UNDERSTAND when no concept was resolved.
 *   4. Drop steps whose subsystems are unavailable, per each step's own
 *      failure policy. Teaching never terminates because one system is down.
 *   5. Append WAIT_FOR_STUDENT after an assessment — a question needs an answer.
 */
export function planExecution(inputs: ExecutionPlannerInputs): ExecutionPlan {
  const { plan, concepts = null, availability = {} } = inputs
  const diagnostics: string[] = []
  const targetConceptId = plan.targetConceptId

  // ── 1. Ambiguity outranks everything: never teach the wrong concept ──────
  if (concepts?.ambiguityDetected) {
    const candidates = concepts.ambiguityCandidates.map(c => c.conceptId)
    diagnostics.push(`Concept is ambiguous across ${candidates.length} candidates — clarification required before any teaching step runs.`)
    diagnostics.push(`Candidates: ${candidates.join(', ')}.`)
    const deferred = plan.executionSequence.map(s => STEP_FROM_PLANNER[s])
    diagnostics.push(`Original request preserved as ${deferred.length} deferred step(s); nothing is discarded by asking.`)

    const steps: ExecutionStepPlan[] = [
      buildStep(ExecutionStepKind.ASK_DISAMBIGUATION, { conceptId: targetConceptId, ambiguityCandidates: candidates }),
      buildStep(ExecutionStepKind.WAIT_FOR_STUDENT, {}),
    ]
    return finalize({
      targetConceptId,
      executionMode: ExecutionMode.DISAMBIGUATION,
      steps,
      deferredSteps: deferred,
      resumeInstruction: resumeFor(plan, ExecutionMode.DISAMBIGUATION),
      diagnostics,
    })
  }

  // ── 2. Map the planner's pedagogical sequence ───────────────────────────
  const stepInputs: StepInputs = {
    conceptId: targetConceptId,
    ...(plan.comparisonConceptIds.length > 0 ? { comparisonConceptIds: plan.comparisonConceptIds } : {}),
  }

  const mapped: ExecutionStepPlan[] = []

  // 3. No concept resolved -> understand first, before anything is taught.
  if (targetConceptId === null) {
    mapped.push(buildStep(ExecutionStepKind.UNDERSTAND, {}))
    diagnostics.push('No target concept resolved — UNDERSTAND scheduled before any teaching step.')
  }

  for (const plannerStep of plan.executionSequence) {
    const kind = STEP_FROM_PLANNER[plannerStep]
    const isResume = kind === ExecutionStepKind.LESSON_RESUME
    mapped.push(buildStep(kind, isResume
      ? { resumeConceptId: plan.excursion.returnToConceptId }
      : stepInputs))
    // 5. A question requires an answer.
    if (kind === ExecutionStepKind.ASSESS) mapped.push(buildStep(ExecutionStepKind.WAIT_FOR_STUDENT, {}))
  }

  // ── 4. Apply availability deterministically ─────────────────────────────
  const steps: ExecutionStepPlan[] = []
  for (const step of mapped) {
    if (stepIsRunnable(step, availability)) { steps.push(step); continue }
    const down = step.subsystems.filter(s => !isAvailable(s, availability)).join(', ')
    diagnostics.push(`${step.kind} dropped — unavailable subsystem(s): ${down}. Policy: ${step.failurePolicy}. Teaching continues.`)
    if (step.failurePolicy === FailurePolicy.SUBSTITUTE_EXPLANATION) {
      const alreadyExplaining = steps.some(s => s.kind === ExecutionStepKind.EXPLAIN)
        || mapped.some(s => s.kind === ExecutionStepKind.EXPLAIN && stepIsRunnable(s, availability))
      if (!alreadyExplaining && isAvailable(Subsystem.EXPLANATION_ENGINE, availability)) {
        steps.push(buildStep(ExecutionStepKind.EXPLAIN, stepInputs))
        diagnostics.push(`Substituted EXPLAIN for the dropped ${step.kind}.`)
      } else {
        diagnostics.push('An explanation already covers this turn — no substitute step added.')
      }
    }
  }

  const executionMode = modeFor(plan, steps)
  if (steps.length === 0) diagnostics.push('No executable step remains — NO_OP.')

  return finalize({
    targetConceptId,
    executionMode,
    steps,
    deferredSteps: [],
    resumeInstruction: resumeFor(plan, executionMode),
    diagnostics: [...diagnostics, ...plan.reasoning.map(r => `[planner] ${r}`)],
  })
}

// ── Derivations ───────────────────────────────────────────────────────────

function modeFor(plan: TeachingPlan, steps: readonly ExecutionStepPlan[]): ExecutionMode {
  if (steps.length === 0) return ExecutionMode.NO_OP
  if (plan.intent === TeachingIntent.RETURN_TO_LESSON) return ExecutionMode.LESSON_RESUME
  if (plan.lessonMode === LessonMode.TEMPORARY_EXCURSION) return ExecutionMode.CONCEPT_EXCURSION
  return ExecutionMode.LESSON_FLOW
}

function resumeFor(plan: TeachingPlan, mode: ExecutionMode): ResumeInstruction {
  if (mode === ExecutionMode.DISAMBIGUATION) {
    return {
      shouldResume: true,
      resumeConceptId: plan.excursion.returnToConceptId,
      instruction: 'Re-plan with the clarified concept, then run the deferred steps.',
    }
  }
  if (plan.excursion.isExcursion && plan.excursion.returnToLesson) {
    return {
      shouldResume: true,
      resumeConceptId: plan.excursion.returnToConceptId,
      instruction: `Return to the lesson concept (${plan.excursion.returnToConceptId ?? 'unknown'}) once this excursion completes.`,
    }
  }
  return { shouldResume: false, resumeConceptId: null, instruction: null }
}

function finalize(parts: {
  targetConceptId: string | null
  executionMode: ExecutionMode
  steps: readonly ExecutionStepPlan[]
  deferredSteps: readonly ExecutionStepKind[]
  resumeInstruction: ResumeInstruction
  diagnostics: readonly string[]
}): ExecutionPlan {
  const subsystemCalls: Subsystem[] = []
  for (const step of parts.steps) {
    for (const s of step.subsystems) if (!subsystemCalls.includes(s)) subsystemCalls.push(s)
  }
  return {
    executionId: deterministicId([
      parts.executionMode,
      parts.targetConceptId ?? 'none',
      ...parts.steps.map(s => s.kind),
      ...parts.deferredSteps,
    ]),
    targetConceptId: parts.targetConceptId,
    executionMode: parts.executionMode,
    orderedSteps: parts.steps,
    subsystemCalls,
    deferredSteps: parts.deferredSteps,
    resumeInstruction: parts.resumeInstruction,
    diagnostics: parts.diagnostics,
  }
}
