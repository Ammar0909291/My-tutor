/**
 * Phase 2/3 — the Brain's single runtime entry point, behind a feature flag.
 *
 * One function composes the whole completed brain:
 *
 *   Concept Understanding -> Teaching Planner -> Execution Planner
 *                         -> Brain Runtime -> dispatchers -> existing systems
 *
 * Nothing here re-implements any layer; it only calls them in order.
 *
 * ── MODE ────────────────────────────────────────────────────────────────
 * `BRAIN_RUNTIME_MODE` selects how the Brain participates:
 *
 *   off      (default) not invoked at all. Byte-for-byte the current runtime.
 *   shadow             invoked, result RECORDED, output NOT used. Legacy
 *                      orchestration still drives the response.
 *   active             the Brain drives orchestration.
 *
 * The default is `off`, and `active` is deliberately NOT reachable yet: two of
 * the five subsystems it would need (Assessment Engine, Lesson Engine) have no
 * implementation to dispatch to — see `dispatchers/index.ts`. Promoting the
 * flag before those exist would silently drop lesson flow and assessment for
 * every learner. `resolveBrainMode()` therefore downgrades `active` to
 * `shadow` and says so, rather than honouring a setting that would regress
 * teaching.
 */

import type { ConceptIndexEntry } from '../concept/conceptUnderstanding'
import type { RuntimeResult } from './runtimeContracts'
import type { ExecutionPlan } from '../execution/executionPlan'
import type { TeachingPlan } from '../planner/teachingPlan'
import type { ConceptUnderstanding } from '../concept/conceptUnderstanding'
import type { AdapterContext } from './dispatchers'

export const BrainMode = {
  OFF: 'off',
  SHADOW: 'shadow',
  ACTIVE: 'active',
} as const
export type BrainMode = (typeof BrainMode)[keyof typeof BrainMode]

/** Subsystems that must have a working dispatcher before `active` is safe. */
import { UNIMPLEMENTED_SUBSYSTEMS } from './dispatchers'

export interface ModeResolution {
  mode: BrainMode
  /** Set when the requested mode was downgraded, with the reason. */
  downgradedFrom?: BrainMode
  reason: string
}

/**
 * Resolve the effective mode from the environment. Pure with respect to its
 * argument so it is testable without touching `process.env`.
 */
export function resolveBrainMode(raw: string | undefined): ModeResolution {
  const requested = (raw ?? '').trim().toLowerCase()

  if (requested === BrainMode.ACTIVE) {
    if (UNIMPLEMENTED_SUBSYSTEMS.length > 0) {
      return {
        mode: BrainMode.SHADOW,
        downgradedFrom: BrainMode.ACTIVE,
        reason: `Downgraded to shadow: no dispatcher implementation exists for ${UNIMPLEMENTED_SUBSYSTEMS.join(', ')}. Running active would drop those subsystems for every learner.`,
      }
    }
    return { mode: BrainMode.ACTIVE, reason: 'Brain runtime is the active orchestration path.' }
  }

  if (requested === BrainMode.SHADOW) {
    return { mode: BrainMode.SHADOW, reason: 'Brain runs alongside the legacy path; its output is recorded, not used.' }
  }

  return { mode: BrainMode.OFF, reason: 'Brain runtime disabled (default) — legacy orchestration is unchanged.' }
}

/** Reads the live environment. */
export function currentBrainMode(): ModeResolution {
  return resolveBrainMode(process.env.BRAIN_RUNTIME_MODE)
}

// ── Composition ───────────────────────────────────────────────────────────

export interface BrainRunInputs {
  message: string
  activeLessonConceptId: string | null
  conceptIndex: readonly ConceptIndexEntry[]
  adapterContext: AdapterContext
  previousConceptId?: string | null
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
}

export interface BrainRunOutcome {
  mode: BrainMode
  concepts: ConceptUnderstanding
  teachingPlan: TeachingPlan
  executionPlan: ExecutionPlan
  runtimeResult: RuntimeResult
}

/**
 * Run the full brain for one turn. Never throws — a brain failure must not
 * break a turn, matching the failure law the rest of the runtime already
 * follows. Returns null when the mode is `off` or anything went wrong.
 */
export async function runBrain(
  inputs: BrainRunInputs,
  mode: BrainMode,
): Promise<BrainRunOutcome | null> {
  if (mode === BrainMode.OFF) return null
  try {
    const [
      { understandConcepts }, { planTeachingTurn }, { planExecution },
      { executeRuntime }, { createProductionDispatchers },
    ] = await Promise.all([
      import('../concept/conceptUnderstandingEngine'),
      import('../planner/teachingPlanner'),
      import('../execution/executionPlanner'),
      import('./runtimeExecutor'),
      import('./dispatchers'),
    ])

    const concepts = understandConcepts({
      message: inputs.message,
      activeLessonConceptId: inputs.activeLessonConceptId,
      index: inputs.conceptIndex,
      context: { previousConceptId: inputs.previousConceptId ?? null },
    })

    const teachingPlan = planTeachingTurn({
      message: inputs.message,
      activeLessonConceptId: inputs.activeLessonConceptId,
      learnerRequest: inputs.learnerRequest ?? null,
      // Reuses Concept Understanding's own result — the planner's resolver
      // port is satisfied by the engine, never by a second resolution path.
      resolveConcept: () => concepts.matches.map(m => ({
        conceptId: m.conceptId, title: m.title, confidence: m.confidence,
      })),
    })

    const executionPlan = planExecution({ plan: teachingPlan, concepts })
    const runtimeResult = await executeRuntime(
      executionPlan,
      createProductionDispatchers(inputs.adapterContext),
    )

    return { mode, concepts, teachingPlan, executionPlan, runtimeResult }
  } catch {
    // Swallowed deliberately: in shadow mode a brain failure must be
    // invisible to the learner, and in active mode the caller falls back.
    return null
  }
}
