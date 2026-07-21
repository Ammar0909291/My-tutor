/**
 * Runtime Dispatcher — Milestone 3 of the Educational Brain Runtime
 * (owner-approved 2026-07-21). The Brain takes control — behind a flag.
 *
 * Input:  TeachingDecision (Decision Engine, Milestone 2)
 * Output: ONE DispatchPlan — which EXISTING engine executes this turn.
 *
 * The dispatcher routes; it never implements. Every decision maps onto
 * the execution path that already exists in the runtime:
 *
 *   SERVE_EXPLANATION_MEMORY -> Explanation Memory (assembleLesson()'s
 *                               already-assembled result; NO model call)
 *   ASK_DIAGNOSTIC_QUESTION  -> placementVerification probe flow
 *   DETECT_MISCONCEPTION     -> misconceptionEngine repair flow
 *   REVIEW_PREREQUISITE      -> prerequisite/teaching-engine flow
 *   PRACTICE                 -> teachingStrategy practice flow
 *   VISUALIZATION            -> detectVisual/visual pipeline flow
 *   CONTINUE_LESSON          -> lesson runtime (composed lesson plan)
 *   ESCALATE_TO_LLM          -> the current routeAI (Groq/Yandex) pipeline
 *
 * Executor honesty (ADR 14 §Phase-2 endgame — LLM as voice renderer):
 * except for Explanation Memory, every existing engine executes by
 * directing the LLM through prompt blocks the route has ALREADY injected
 * this turn. The dispatcher therefore has exactly three executors:
 *   - EXPLANATION_MEMORY: serve stored text; Groq is NOT called.
 *   - LLM_RENDERER: the chosen engine's already-injected blocks direct
 *     the LLM as a renderer. Groq IS called, in the renderer role — the
 *     same call the runtime makes today; eliminating it requires authored
 *     assets for the concept (content production), not more code.
 *   - LLM_OPEN: open escalation — the current pipeline as-is.
 * A Groq call therefore happens ONLY when the plan says groqRequired
 * (ESCALATE_TO_LLM, or an engine rendering through the LLM); a plan with
 * groqRequired=false is served without any model call.
 *
 * Activation is flag-gated: ENABLE_BRAIN_RUNTIME (default OFF). Flag off
 * = shadow compare mode — the plan is logged next to what the runtime
 * actually did, and the legacy serving choice is untouched. Flag on = the
 * plan DRIVES the serve-from-memory-vs-LLM choice (today's only
 * externally visible fork), with the legacy behavior as the fallback for
 * any inconsistent plan. No prompts, DB, or KG are touched either way.
 * Pure function — no I/O, never throws.
 */
import type { TeachingDecision, TeachingDecisionType } from './decisionEngine'

export type DispatchExecutor = 'EXPLANATION_MEMORY' | 'LLM_RENDERER' | 'LLM_OPEN'

export interface DispatchPlan {
  version: 1
  decision: TeachingDecisionType
  ruleId: string
  executor: DispatchExecutor
  /** The EXISTING engine that executes this action (reused, never reimplemented). */
  engine: string
  /** false = this turn is served without any model call. */
  groqRequired: boolean
  note: string
}

/** ENABLE_BRAIN_RUNTIME=false by default — '1'/'true' activates dispatch. */
export function isBrainRuntimeEnabled(): boolean {
  const v = process.env.ENABLE_BRAIN_RUNTIME
  return v === '1' || v === 'true'
}

const ENGINE_ROUTES: Record<TeachingDecisionType, { executor: DispatchExecutor; engine: string; note: string }> = {
  SERVE_EXPLANATION_MEMORY: {
    executor: 'EXPLANATION_MEMORY',
    engine: 'explanationMemory/assembleLesson (ADR 14 canonical serving path)',
    note: 'Serve the already-assembled authored content; no model call.',
  },
  ASK_DIAGNOSTIC_QUESTION: {
    executor: 'LLM_RENDERER',
    engine: 'placementVerification (probe block already injected this turn)',
    note: 'The three-bracket probe flow directs the renderer.',
  },
  DETECT_MISCONCEPTION: {
    executor: 'LLM_RENDERER',
    engine: 'misconceptionEngine (misconception/remediation blocks already injected)',
    note: 'The repair flow (elicit→commit→collide) directs the renderer.',
  },
  REVIEW_PREREQUISITE: {
    executor: 'LLM_RENDERER',
    engine: 'teaching-engine/prerequisite flow (KG edge + strategy blocks)',
    note: 'Step back one KG edge; existing blocks direct the renderer.',
  },
  PRACTICE: {
    executor: 'LLM_RENDERER',
    engine: 'teachingStrategy practice flow (strategy block already injected)',
    note: 'D1-grid consolidation practice directs the renderer.',
  },
  VISUALIZATION: {
    executor: 'LLM_RENDERER',
    engine: 'detectVisual/visualRegistry + post-AI visual pipeline',
    note: 'The already-detected visual and its blocks direct the renderer.',
  },
  CONTINUE_LESSON: {
    executor: 'LLM_RENDERER',
    engine: 'lesson runtime (composed lesson plan blocks already injected)',
    note: 'Healthy progression; the lesson plan directs the renderer.',
  },
  ESCALATE_TO_LLM: {
    executor: 'LLM_OPEN',
    engine: 'routeAI (Groq primary / Yandex fallback) — current pipeline as-is',
    note: 'Open conversation, recovery rendering, or honest ignorance.',
  },
}

export interface DispatchContext {
  /** Whether assembleLesson() genuinely produced content this turn. */
  assembledAvailable: boolean
}

/**
 * Map ONE TeachingDecision onto ONE existing execution path.
 * Fallback law: a SERVE_EXPLANATION_MEMORY decision without assembled
 * content (inconsistent inputs) falls back to the open LLM pipeline —
 * the dispatcher must never leave a turn without an executor.
 */
export function planDispatch(decision: TeachingDecision, ctx: DispatchContext): DispatchPlan {
  try {
    if (decision.decision === 'SERVE_EXPLANATION_MEMORY' && !ctx.assembledAvailable) {
      return {
        version: 1, decision: decision.decision, ruleId: decision.ruleId,
        executor: 'LLM_OPEN',
        engine: ENGINE_ROUTES.ESCALATE_TO_LLM.engine,
        groqRequired: true,
        note: 'FALLBACK: memory decision without assembled content — served by the current pipeline instead.',
      }
    }
    const route = ENGINE_ROUTES[decision.decision] ?? ENGINE_ROUTES.ESCALATE_TO_LLM
    return {
      version: 1, decision: decision.decision, ruleId: decision.ruleId,
      executor: route.executor,
      engine: route.engine,
      groqRequired: route.executor !== 'EXPLANATION_MEMORY',
      note: route.note,
    }
  } catch {
    return {
      version: 1,
      decision: 'ESCALATE_TO_LLM',
      ruleId: 'DISPATCH-ERROR',
      executor: 'LLM_OPEN',
      engine: ENGINE_ROUTES.ESCALATE_TO_LLM.engine,
      groqRequired: true,
      note: 'FALLBACK: dispatcher error — current pipeline serves the turn.',
    }
  }
}
