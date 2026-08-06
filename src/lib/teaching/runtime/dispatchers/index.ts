/**
 * Phase 1 — dispatcher adapters.
 *
 * Thin wrappers around EXISTING systems. No system is rewritten, no business
 * logic is duplicated, no new engine is created: each adapter calls the real
 * implementation and normalises its return into a `DispatchOutput`.
 *
 * ── COVERAGE, STATED HONESTLY ────────────────────────────────────────────
 * Three of the five requested adapters wrap a real, independently-callable
 * implementation. Two cannot, because no such implementation exists:
 *
 *   Explanation Engine   REAL  -> assembleLesson() (Explanation Memory, ADR 14)
 *   VIE                  REAL  -> buildVisualIntentFromRegistry()
 *   ADR 12               REAL  -> lookupConceptVisual() / getConceptVisualType()
 *   Assessment Engine    NONE  -> see below
 *   Lesson Engine        NONE  -> see below
 *
 * `src/lib/teaching/mcq.ts` is tag PARSING plus a prompt INSTRUCTION builder
 * (`buildMcqInstruction`), not an assessment generator — the assessment is
 * produced by the LLM inside the single chat call, from that instruction.
 * `src/lib/school/adaptive/lessonPlanner.ts` is a stub whose functions return
 * empty values (`buildLessonPlan` -> empty plan, `buildLessonPlanBlock` -> '').
 * Lesson flow in production is likewise the single LLM call assembled in
 * route.ts, not an invocable engine.
 *
 * Fabricating those two adapters would mean writing new engines, which this
 * migration explicitly forbids. They are therefore registered as EXPLICITLY
 * UNAVAILABLE: they return null, which the Brain Runtime already handles via
 * the plan's own failure policy. Nothing is invented and nothing pretends to
 * work.
 */

import { Subsystem } from '../../execution/executionPlan'
import type { SubsystemDispatcher, DispatchInput, DispatchOutput } from '../runtimeContracts'
import { createDispatcherRegistry, type DispatcherRegistry } from '../runtimeContracts'

/** Context the adapters need that the ExecutionPlan does not carry (learner
 *  identity, language, grade band). Supplied per request by the caller. */
export interface AdapterContext {
  subjectSlug: string
  teachingLanguage: string
  grade?: number | null
  currentLevel?: string | null
  userMessage: string
}

function output(subsystem: Subsystem, input: DispatchInput, payload: unknown, summary: string): DispatchOutput {
  return { subsystem, stepKind: input.stepKind, payload, summary }
}

// ── Explanation Engine (REAL) ─────────────────────────────────────────────

/**
 * Wraps Explanation Memory's `assembleLesson()` — the existing ADR 14
 * retrieval path. Returns null when no ACTIVE asset matches, which is the
 * normal case today (the catalogue is almost entirely DRAFT) and which the
 * runtime correctly treats as "this subsystem produced nothing".
 */
export function createExplanationDispatcher(ctx: AdapterContext): SubsystemDispatcher {
  return {
    subsystem: Subsystem.EXPLANATION_ENGINE,
    async execute(input) {
      const conceptId = input.inputs.conceptId
      if (!conceptId) return null
      const [{ assembleLesson }, { buildStudentState }] = await Promise.all([
        import('../../assets/teachingActionRepository'),
        import('../../assets/studentState'),
      ])
      const state = buildStudentState({
        conceptId,
        subjectSlug: ctx.subjectSlug,
        teachingLanguage: ctx.teachingLanguage,
        grade: ctx.grade,
        currentLevel: ctx.currentLevel,
        userMessage: ctx.userMessage,
      })
      const assembled = await assembleLesson(state)
      if (!assembled) return null
      return output(Subsystem.EXPLANATION_ENGINE, input, assembled, `Explanation Memory hit for ${conceptId}`)
    },
  }
}

// ── Visualization Intelligence Engine (REAL) ──────────────────────────────

/** Wraps the VIE — produces a VisualIntent from the VKR for the concept. */
export function createVieDispatcher(): SubsystemDispatcher {
  return {
    subsystem: Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE,
    async execute(input) {
      const { buildVisualIntentFromRegistry } = await import('../../visualIntelligenceEngine')
      const intent = buildVisualIntentFromRegistry(input.inputs.conceptId ?? null)
      if (!intent) return null
      return output(
        Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, input, intent,
        `VisualIntent (${intent.purpose}) for ${input.inputs.conceptId}`,
      )
    },
  }
}

// ── ADR 12 visual production (REAL) ───────────────────────────────────────

/**
 * Wraps ADR 12's existing concept->visual selection (`visualRegistry.ts`).
 * Consumes the VIE's VisualIntent as `upstream` so the chain is genuine, but
 * the selection itself remains ADR 12's, unmodified. Selects nothing when the
 * concept has no registered visual — an honest miss, never a substitution.
 */
export function createAdr12Dispatcher(): SubsystemDispatcher {
  return {
    subsystem: Subsystem.ADR12_VISUAL_PRODUCTION,
    async execute(input) {
      const conceptId = input.inputs.conceptId
      if (!conceptId) return null
      const { lookupConceptVisual } = await import('../../visualRegistry')
      const entry = lookupConceptVisual(conceptId)
      if (!entry) return null
      return output(Subsystem.ADR12_VISUAL_PRODUCTION, input, {
        visualType: entry.primary,
        allowed: entry.all,
        sceneGenerator: entry.sceneGenerator ?? null,
        intent: input.upstream?.payload ?? null,
      }, `ADR 12 selected ${entry.primary} for ${conceptId}`)
    },
  }
}

// ── Explicitly unavailable subsystems ─────────────────────────────────────

/**
 * No independently-callable implementation exists (see the file header).
 * Returning null lets the plan's own failure policy apply — the Brain Runtime
 * already treats this identically to an unavailable subsystem. This is a
 * declared gap, not a stub pretending to be an engine.
 */
function createUnavailableDispatcher(subsystem: Subsystem): SubsystemDispatcher {
  return { subsystem, execute: () => null }
}

export const createAssessmentDispatcher = () => createUnavailableDispatcher(Subsystem.ASSESSMENT_ENGINE)
export const createLessonDispatcher = () => createUnavailableDispatcher(Subsystem.LESSON_ENGINE)

/** Subsystems with no real adapter behind them, for diagnostics/reporting. */
export const UNIMPLEMENTED_SUBSYSTEMS: readonly Subsystem[] = [
  Subsystem.ASSESSMENT_ENGINE,
  Subsystem.LESSON_ENGINE,
]

// ── Registry ──────────────────────────────────────────────────────────────

/** The production dispatcher set. */
export function createProductionDispatchers(ctx: AdapterContext): DispatcherRegistry {
  return createDispatcherRegistry([
    createExplanationDispatcher(ctx),
    createVieDispatcher(),
    createAdr12Dispatcher(),
    createAssessmentDispatcher(),
    createLessonDispatcher(),
  ])
}
