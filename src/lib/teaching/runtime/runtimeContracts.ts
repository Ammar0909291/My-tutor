/**
 * Brain Runtime — contracts.
 *
 *   ExecutionPlan -> Runtime Executor -> Dispatchers -> existing subsystems
 *                                                     -> RuntimeResult
 *
 * The executor owns ORCHESTRATION ONLY. It must not know how any subsystem
 * works, so every subsystem is reached through a dispatcher port defined
 * here. No teaching, no rendering, no explanation generation, no business
 * logic, no database, no Prisma, no LLM lives in this layer.
 */

import type { Subsystem, ExecutionStepKind, StepInputs, ExecutionMode } from '../execution/executionPlan'

// ── Execution context ─────────────────────────────────────────────────────

/**
 * Read-only context handed to every dispatcher. Carries what a subsystem
 * needs to do its job and nothing else — notably no plan, so a dispatcher
 * cannot re-plan or reach back into orchestration.
 */
export interface ExecutionContext {
  executionId: string
  targetConceptId: string | null
  executionMode: ExecutionMode
  /** Outputs produced earlier in this run, in order. Lets a chained
   *  subsystem consume its predecessor's result — ADR 12 reads the
   *  VisualIntent the VIE just produced. */
  readonly priorOutputs: readonly DispatchOutput[]
}

// ── Dispatcher port ───────────────────────────────────────────────────────

export interface DispatchInput {
  stepKind: ExecutionStepKind
  inputs: StepInputs
  context: ExecutionContext
  /** The immediately-preceding output within this step's subsystem chain,
   *  or null when this is the first link. */
  upstream: DispatchOutput | null
}

export interface DispatchOutput {
  subsystem: Subsystem
  stepKind: ExecutionStepKind
  /** Whatever the subsystem produced. Deliberately opaque — the executor
   *  never inspects it, which is what keeps it free of business logic. */
  payload: unknown
  /** Short human-readable description, for diagnostics. */
  summary?: string
}

/**
 * One subsystem's adapter. Implementations live outside this layer and wrap
 * the EXISTING engines; the executor only ever sees this shape.
 *
 * A dispatcher signals failure by throwing or by returning null — both are
 * handled identically, via the plan's own failure policy.
 */
export interface SubsystemDispatcher {
  subsystem: Subsystem
  execute(input: DispatchInput): Promise<DispatchOutput | null> | DispatchOutput | null
}

/** Subsystem -> dispatcher. A subsystem with no registered dispatcher is
 *  treated exactly like an unavailable one: the plan's failure policy
 *  applies, and nothing is invented. */
export type DispatcherRegistry = Partial<Record<Subsystem, SubsystemDispatcher>>

/** Build a registry from a list, keyed by each dispatcher's own subsystem. */
export function createDispatcherRegistry(
  dispatchers: readonly SubsystemDispatcher[],
): DispatcherRegistry {
  const registry: DispatcherRegistry = {}
  for (const d of dispatchers) registry[d.subsystem] = d
  return registry
}

// ── Step outcomes ─────────────────────────────────────────────────────────

export const StepStatus = {
  /** Every subsystem in the chain produced an output. */
  COMPLETED: 'COMPLETED',
  /** Not run: no dispatcher, or recovered from per the plan's policy. */
  SKIPPED: 'SKIPPED',
  /** Attempted and failed; execution continued per the plan's policy. */
  FAILED: 'FAILED',
  /** Never reached because execution halted earlier. */
  PENDING: 'PENDING',
  /** This step deliberately halted execution (wait / clarification). */
  HALTED: 'HALTED',
} as const
export type StepStatus = (typeof StepStatus)[keyof typeof StepStatus]

export interface StepOutcome {
  /** Index in the plan's orderedSteps — makes outcomes traceable. */
  index: number
  kind: ExecutionStepKind
  status: StepStatus
  /** Subsystems that actually produced output for this step. */
  subsystemsInvoked: readonly Subsystem[]
  /** Present on FAILED / SKIPPED. */
  reason?: string
}

// ── What the caller should do next ────────────────────────────────────────

export const NextAction = {
  /** The plan ran to completion; nothing is owed. */
  COMPLETE: 'COMPLETE',
  /** Halted on a WAIT_FOR_STUDENT step. */
  AWAIT_STUDENT_RESPONSE: 'AWAIT_STUDENT_RESPONSE',
  /** Halted awaiting a disambiguation answer; re-plan once it arrives. */
  AWAIT_CLARIFICATION: 'AWAIT_CLARIFICATION',
  /** Finished an excursion — the lesson is owed a return. */
  RESUME_LESSON: 'RESUME_LESSON',
} as const
export type NextAction = (typeof NextAction)[keyof typeof NextAction]

// ── Result ────────────────────────────────────────────────────────────────

export interface RuntimeResult {
  executionId: string
  completedSteps: readonly StepOutcome[]
  skippedSteps: readonly StepOutcome[]
  failedSteps: readonly StepOutcome[]
  /** Steps never reached because execution halted. Distinct from skipped:
   *  these were not declined, only deferred. */
  pendingSteps: readonly StepOutcome[]
  /** Every outcome in plan order, whatever its status. */
  allSteps: readonly StepOutcome[]
  /** Everything the subsystems produced, in invocation order. */
  outputs: readonly DispatchOutput[]
  nextAction: NextAction
  /** Concept to resume on when nextAction is RESUME_LESSON. */
  resumeConceptId: string | null
  diagnostics: readonly string[]
}
