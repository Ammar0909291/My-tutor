/**
 * ExecutionPlan — the final orchestration contract of the Tutor Brain.
 *
 *   TeachingPlan  ->  Execution Planner  ->  ExecutionPlan  ->  existing subsystems
 *
 * The Execution Planner decides WHICH existing subsystem runs, IN WHAT ORDER,
 * WITH WHAT INPUTS. It never teaches, renders, explains, or visualizes, and it
 * may only name subsystems that already exist.
 *
 * Data + enums only. Behaviour lives in `executionPlanner.ts`.
 */

import type { ExecutionStep as PlannerStep } from '../planner/teachingPlan'
import { ExecutionStep } from '../planner/teachingPlan'

// ── Steps ─────────────────────────────────────────────────────────────────

/**
 * The executable step vocabulary. A superset of the Teaching Planner's own
 * `ExecutionStep`: the planner reasons about pedagogy (what the turn needs),
 * this layer reasons about execution (what must actually be invoked, plus the
 * control-flow steps only an executor can know about — clarification and
 * waiting). `STEP_FROM_PLANNER` below is the total, explicit mapping between
 * the two, so neither layer duplicates the other's decision.
 */
export const ExecutionStepKind = {
  UNDERSTAND: 'UNDERSTAND',
  EXPLAIN: 'EXPLAIN',
  VISUALIZE: 'VISUALIZE',
  ASSESS: 'ASSESS',
  WORKED_EXAMPLE: 'WORKED_EXAMPLE',
  REVISION: 'REVISION',
  LESSON_FLOW: 'LESSON_FLOW',
  LESSON_RESUME: 'LESSON_RESUME',
  WAIT_FOR_STUDENT: 'WAIT_FOR_STUDENT',
  ASK_DISAMBIGUATION: 'ASK_DISAMBIGUATION',
} as const
export type ExecutionStepKind = (typeof ExecutionStepKind)[keyof typeof ExecutionStepKind]

/** Total mapping from the planner's pedagogical steps to executable kinds.
 *  Exhaustive by construction — adding a planner step breaks the build here
 *  rather than silently falling through. */
export const STEP_FROM_PLANNER: Readonly<Record<PlannerStep, ExecutionStepKind>> = {
  [ExecutionStep.EXPLANATION]: ExecutionStepKind.EXPLAIN,
  [ExecutionStep.VISUALIZATION]: ExecutionStepKind.VISUALIZE,
  [ExecutionStep.ASSESSMENT]: ExecutionStepKind.ASSESS,
  [ExecutionStep.WORKED_SOLUTION]: ExecutionStepKind.WORKED_EXAMPLE,
  [ExecutionStep.REVISION]: ExecutionStepKind.REVISION,
  [ExecutionStep.LESSON_FLOW]: ExecutionStepKind.LESSON_FLOW,
  [ExecutionStep.LESSON_RESUME]: ExecutionStepKind.LESSON_RESUME,
}

// ── Subsystems ────────────────────────────────────────────────────────────

/** Only systems that already exist. No new runtime engine is introduced. */
export const Subsystem = {
  CONVERSATION_UNDERSTANDING: 'CONVERSATION_UNDERSTANDING',
  CONCEPT_UNDERSTANDING: 'CONCEPT_UNDERSTANDING',
  TEACHING_PLANNER: 'TEACHING_PLANNER',
  EXPLANATION_ENGINE: 'EXPLANATION_ENGINE',
  VISUALIZATION_INTELLIGENCE_ENGINE: 'VISUALIZATION_INTELLIGENCE_ENGINE',
  ADR12_VISUAL_PRODUCTION: 'ADR12_VISUAL_PRODUCTION',
  ASSESSMENT_ENGINE: 'ASSESSMENT_ENGINE',
  LESSON_ENGINE: 'LESSON_ENGINE',
} as const
export type Subsystem = (typeof Subsystem)[keyof typeof Subsystem]

// ── Failure handling ──────────────────────────────────────────────────────

/**
 * Deterministic recovery. Every member is NON-TERMINATING by construction —
 * there is deliberately no "abort the turn" policy, because teaching must
 * never stop because one subsystem failed. That invariant is structural, not
 * a convention.
 */
export const FailurePolicy = {
  /** Drop this step and continue with the rest of the sequence. */
  SKIP_AND_CONTINUE: 'SKIP_AND_CONTINUE',
  /** Fall back to a plain explanation of the same concept. */
  SUBSTITUTE_EXPLANATION: 'SUBSTITUTE_EXPLANATION',
  /** Ask the student to clarify, then re-plan. */
  REQUEST_CLARIFICATION: 'REQUEST_CLARIFICATION',
  /** Nothing to recover from — the step cannot fail (e.g. waiting). */
  NOT_APPLICABLE: 'NOT_APPLICABLE',
} as const
export type FailurePolicy = (typeof FailurePolicy)[keyof typeof FailurePolicy]

// ── Execution mode ────────────────────────────────────────────────────────

export const ExecutionMode = {
  /** Ordinary lesson work. */
  LESSON_FLOW: 'LESSON_FLOW',
  /** Temporarily serving another concept; the lesson is owed a return. */
  CONCEPT_EXCURSION: 'CONCEPT_EXCURSION',
  /** Blocked on the student: clarification required before teaching. */
  DISAMBIGUATION: 'DISAMBIGUATION',
  /** Handing control back to the lesson. */
  LESSON_RESUME: 'LESSON_RESUME',
  /** Nothing executable could be derived. */
  NO_OP: 'NO_OP',
} as const
export type ExecutionMode = (typeof ExecutionMode)[keyof typeof ExecutionMode]

// ── Step shape ────────────────────────────────────────────────────────────

/** Inputs handed to a subsystem. Every field is optional because different
 *  steps need different subsets; the planner populates only what applies. */
export interface StepInputs {
  conceptId?: string | null
  comparisonConceptIds?: readonly string[]
  /** Populated on ASK_DISAMBIGUATION — the competing readings to offer. */
  ambiguityCandidates?: readonly string[]
  /** Populated on LESSON_RESUME — where control returns to. */
  resumeConceptId?: string | null
}

export interface ExecutionStepPlan {
  kind: ExecutionStepKind
  /**
   * Ordered subsystem calls for this step. A chain, not a single call, because
   * VISUALIZE genuinely is VIE -> ADR 12: the VIE produces a VisualIntent and
   * ADR 12 produces the visual from it. Empty for steps that invoke nothing
   * (WAIT_FOR_STUDENT).
   */
  subsystems: readonly Subsystem[]
  inputs: StepInputs
  /** What this step is expected to produce, named for the executor's benefit. */
  expectedOutput: string
  failurePolicy: FailurePolicy
  /** False when the sequence remains coherent without this step. */
  required: boolean
}

// ── Resume ────────────────────────────────────────────────────────────────

export interface ResumeInstruction {
  shouldResume: boolean
  /** The concept control returns to. Null when nothing is owed. */
  resumeConceptId: string | null
  /** Human-readable instruction for the executor / dialogue layer. */
  instruction: string | null
}

// ── The plan ──────────────────────────────────────────────────────────────

export interface ExecutionPlan {
  /** Deterministic content hash — identical plans share an id. Never random,
   *  never time-based, so the planner stays pure. */
  executionId: string
  targetConceptId: string | null
  executionMode: ExecutionMode
  orderedSteps: readonly ExecutionStepPlan[]
  /** Flattened, de-duplicated subsystems this plan will touch, in first-use
   *  order — the at-a-glance answer to "what runs this turn". */
  subsystemCalls: readonly Subsystem[]
  /**
   * Steps deferred until the student answers a clarification. Populated only
   * in DISAMBIGUATION mode: the original request is preserved rather than
   * discarded, so nothing is lost by asking.
   */
  deferredSteps: readonly ExecutionStepKind[]
  resumeInstruction: ResumeInstruction
  diagnostics: readonly string[]
}
