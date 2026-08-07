/**
 * Runtime Executor — the component that runs a completed ExecutionPlan.
 *
 * Takes an ExecutionPlan, executes each step in order by invoking the
 * registered dispatchers, collects the outputs, and returns a RuntimeResult.
 * That is its entire responsibility.
 *
 * It owns NO policy. Every failure decision comes from the step's own
 * `failurePolicy`, authored by the Execution Planner — the executor never
 * invents a policy and never terminates unless the plan says to.
 *
 * Deterministic: steps run strictly in order, subsystem chains run strictly
 * in order, nothing is parallelised, and no clock or randomness is read.
 * Given deterministic dispatchers, the result is deterministic.
 */

import { ExecutionStepKind, ExecutionMode, FailurePolicy, Subsystem, type ExecutionPlan, type ExecutionStepPlan } from '../execution/executionPlan'
import {
  StepStatus, NextAction,
  type RuntimeResult, type StepOutcome, type DispatchOutput,
  type DispatcherRegistry, type ExecutionContext, type SubsystemDispatcher,
} from './runtimeContracts'

interface MutableState {
  outcomes: StepOutcome[]
  outputs: DispatchOutput[]
  diagnostics: string[]
  halted: NextAction | null
}

/** Invoke one dispatcher, normalising both failure modes (throw / null) into
 *  a single null return. The executor treats them identically. */
async function invoke(
  dispatcher: SubsystemDispatcher,
  step: ExecutionStepPlan,
  context: ExecutionContext,
  upstream: DispatchOutput | null,
  diagnostics: string[],
): Promise<DispatchOutput | null> {
  try {
    const out = await dispatcher.execute({
      stepKind: step.kind,
      inputs: step.inputs,
      context,
      upstream,
    })
    if (out === null) {
      diagnostics.push(`${step.kind}: ${dispatcher.subsystem} returned no output.`)
      return null
    }
    return out
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    diagnostics.push(`${step.kind}: ${dispatcher.subsystem} threw — ${message}`)
    return null
  }
}

/**
 * Apply the step's OWN failure policy. Returns the resulting status, and
 * whether execution should halt. No policy is invented here: the switch is
 * exhaustive over `FailurePolicy`, which by construction contains no
 * terminating member other than the plan-authored clarification request.
 */
function applyFailurePolicy(
  step: ExecutionStepPlan,
  state: MutableState,
  registry: DispatcherRegistry,
  reason: string,
): { status: StepStatus; halt: NextAction | null; substitute: Subsystem | null } {
  switch (step.failurePolicy) {
    case FailurePolicy.SKIP_AND_CONTINUE:
      state.diagnostics.push(`${step.kind}: ${reason}. Policy SKIP_AND_CONTINUE — continuing.`)
      return { status: StepStatus.SKIPPED, halt: null, substitute: null }

    case FailurePolicy.SUBSTITUTE_EXPLANATION: {
      const explanation = registry[Subsystem.EXPLANATION_ENGINE]
      if (explanation) {
        state.diagnostics.push(`${step.kind}: ${reason}. Policy SUBSTITUTE_EXPLANATION — falling back to the Explanation Engine.`)
        return { status: StepStatus.SKIPPED, halt: null, substitute: Subsystem.EXPLANATION_ENGINE }
      }
      state.diagnostics.push(`${step.kind}: ${reason}. Policy SUBSTITUTE_EXPLANATION, but no Explanation Engine dispatcher is registered — skipping.`)
      return { status: StepStatus.SKIPPED, halt: null, substitute: null }
    }

    case FailurePolicy.REQUEST_CLARIFICATION:
      // The only plan-authored halt. Not the executor's own decision.
      state.diagnostics.push(`${step.kind}: ${reason}. Policy REQUEST_CLARIFICATION — halting for the student.`)
      return { status: StepStatus.FAILED, halt: NextAction.AWAIT_CLARIFICATION, substitute: null }

    case FailurePolicy.NOT_APPLICABLE:
    default:
      state.diagnostics.push(`${step.kind}: ${reason}. Policy NOT_APPLICABLE — nothing to recover.`)
      return { status: StepStatus.SKIPPED, halt: null, substitute: null }
  }
}

/** Run one step's full subsystem chain, in order. */
async function runStep(
  step: ExecutionStepPlan,
  index: number,
  registry: DispatcherRegistry,
  context: ExecutionContext,
  state: MutableState,
): Promise<StepOutcome> {
  const invoked: Subsystem[] = []
  let upstream: DispatchOutput | null = null

  for (const subsystem of step.subsystems) {
    const dispatcher = registry[subsystem]
    if (!dispatcher) {
      const { status, halt, substitute } = applyFailurePolicy(
        step, state, registry, `no dispatcher registered for ${subsystem}`)
      if (substitute) {
        const sub = registry[substitute]!
        const out = await invoke(sub, step, context, upstream, state.diagnostics)
        if (out) {
          state.outputs.push(out)
          invoked.push(substitute)
          // SKIPPED, not COMPLETED: this step's own goal never happened —
          // a substitute covered the turn. Reporting it as completed would
          // overstate what the runtime actually achieved.
          return { index, kind: step.kind, status: StepStatus.SKIPPED, subsystemsInvoked: invoked, reason: `substituted with ${substitute}` }
        }
      }
      if (halt) state.halted = halt
      return { index, kind: step.kind, status, subsystemsInvoked: invoked, reason: `no dispatcher registered for ${subsystem}` }
    }

    const out = await invoke(dispatcher, step, context, upstream, state.diagnostics)
    if (out === null) {
      const { status, halt, substitute } = applyFailurePolicy(
        step, state, registry, `${subsystem} produced no output`)
      if (substitute && substitute !== subsystem) {
        const sub = registry[substitute]!
        const subOut = await invoke(sub, step, context, upstream, state.diagnostics)
        if (subOut) {
          state.outputs.push(subOut)
          invoked.push(substitute)
          // SKIPPED, not COMPLETED: this step's own goal never happened —
          // a substitute covered the turn. Reporting it as completed would
          // overstate what the runtime actually achieved.
          return { index, kind: step.kind, status: StepStatus.SKIPPED, subsystemsInvoked: invoked, reason: `substituted with ${substitute}` }
        }
      }
      if (halt) state.halted = halt
      return {
        index, kind: step.kind,
        status: status === StepStatus.SKIPPED && invoked.length > 0 ? StepStatus.FAILED : status,
        subsystemsInvoked: invoked,
        reason: `${subsystem} produced no output`,
      }
    }

    state.outputs.push(out)
    invoked.push(subsystem)
    upstream = out
  }

  return { index, kind: step.kind, status: StepStatus.COMPLETED, subsystemsInvoked: invoked }
}

/**
 * Execute an ExecutionPlan.
 *
 * Halts only where the plan says to: a `WAIT_FOR_STUDENT` step, or a step
 * whose authored policy is `REQUEST_CLARIFICATION`. Everything else continues,
 * so no subsystem failure can end a turn.
 */
export async function executeRuntime(
  plan: ExecutionPlan,
  registry: DispatcherRegistry,
): Promise<RuntimeResult> {
  const state: MutableState = { outcomes: [], outputs: [], diagnostics: [], halted: null }

  for (const [index, step] of plan.orderedSteps.entries()) {
    if (state.halted) {
      state.outcomes.push({ index, kind: step.kind, status: StepStatus.PENDING, subsystemsInvoked: [], reason: 'execution halted earlier' })
      continue
    }

    // A wait is a plan-authored halt, not a failure. It invokes nothing.
    if (step.kind === ExecutionStepKind.WAIT_FOR_STUDENT) {
      state.outcomes.push({ index, kind: step.kind, status: StepStatus.HALTED, subsystemsInvoked: [] })
      // In a disambiguation plan the thing being waited for IS the
      // clarification, so the caller must re-plan rather than merely resume.
      state.halted = plan.executionMode === ExecutionMode.DISAMBIGUATION
        ? NextAction.AWAIT_CLARIFICATION
        : NextAction.AWAIT_STUDENT_RESPONSE
      state.diagnostics.push('WAIT_FOR_STUDENT reached — execution halts until the student responds.')
      continue
    }

    const context: ExecutionContext = {
      executionId: plan.executionId,
      targetConceptId: plan.targetConceptId,
      executionMode: plan.executionMode,
      priorOutputs: [...state.outputs],
    }
    state.outcomes.push(await runStep(step, index, registry, context, state))
  }

  return aggregate(plan, state)
}

// ── Result aggregation ────────────────────────────────────────────────────

function aggregate(plan: ExecutionPlan, state: MutableState): RuntimeResult {
  const by = (status: StepStatus) => state.outcomes.filter(o => o.status === status)

  const nextAction: NextAction = state.halted
    ?? (plan.resumeInstruction.shouldResume ? NextAction.RESUME_LESSON : NextAction.COMPLETE)

  const diagnostics = [
    ...state.diagnostics,
    `Executed ${state.outcomes.length} step(s): ${by(StepStatus.COMPLETED).length} completed, ${by(StepStatus.SKIPPED).length} skipped, ${by(StepStatus.FAILED).length} failed, ${by(StepStatus.PENDING).length} pending.`,
    `Next action: ${nextAction}.`,
  ]

  return {
    executionId: plan.executionId,
    completedSteps: by(StepStatus.COMPLETED),
    skippedSteps: by(StepStatus.SKIPPED),
    failedSteps: by(StepStatus.FAILED),
    pendingSteps: by(StepStatus.PENDING),
    allSteps: state.outcomes,
    outputs: state.outputs,
    nextAction,
    resumeConceptId: nextAction === NextAction.RESUME_LESSON ? plan.resumeInstruction.resumeConceptId : null,
    diagnostics,
  }
}
