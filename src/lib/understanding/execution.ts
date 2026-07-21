/**
 * Brain Execution — Milestone 4 of the Educational Brain Runtime
 * (owner-approved 2026-07-21). Active ONLY when ENABLE_BRAIN_RUNTIME=1.
 *
 * When the Brain runtime is ON, the TeachingDecision is authoritative.
 * Execution reuses the runtime's one established control mechanism —
 * additive system-prompt blocks, the exact pattern every existing engine
 * already uses (recoveryGuard, teachingStrategy, misconceptionEngine,
 * placementVerification, visual blocks) — to scope the LLM to the
 * RENDERER role for the engine the Brain selected:
 *
 *   Brain decides. Engines specify. The LLM only renders.
 *
 * The block introduces NO new teaching content and NO new prompt design:
 * it points at the engine block that is ALREADY injected above it this
 * turn (zero duplicated logic) and forbids the LLM from choosing a
 * different action. Decisions that don't render through the LLM return
 * an empty block: SERVE_EXPLANATION_MEMORY is served directly from the
 * asset store (Groq never called), and ESCALATE_TO_LLM is the current
 * pipeline unchanged. Pure function — no I/O, never throws.
 */
import type { TeachingDecision } from './decisionEngine'
import type { DispatchPlan } from './dispatcher'

/** The LLM's role verb per decision — the owner-specified execution contract. */
const RENDER_ROLES: Partial<Record<TeachingDecision['decision'], { role: string; directive: string }>> = {
  ASK_DIAGNOSTIC_QUESTION: {
    role: 'render the question naturally',
    directive: 'Ask exactly the diagnostic probe the placement verification block above specifies — one question, warmly phrased. Do not teach new content and do not add extra questions this turn.',
  },
  DETECT_MISCONCEPTION: {
    role: 'explain',
    directive: 'Run the misconception repair: if a misconception/remediation block appears above, follow it exactly; otherwise (confident-wrong signature) elicit the learner\'s reasoning, get them to commit to it, then present one concrete case where their rule visibly breaks — repair before any new content. The engine decided WHAT to repair and HOW; you only explain it naturally.',
  },
  REVIEW_PREREQUISITE: {
    role: 'teach',
    directive: 'Step back from the current topic and teach the prerequisite concept named below. Return to the current topic only after the learner engages with the prerequisite.',
  },
  PRACTICE: {
    role: 'present',
    directive: 'Give consolidation practice on the CURRENT concept, following the teaching strategy block above: one more problem of the SAME type and difficulty; advance only after a fluent, confident success. No new concepts and no advancement this turn.',
  },
  VISUALIZATION: {
    role: 'narrate',
    directive: 'Serve the visual aid the visual block above specifies and narrate it — the visual carries the teaching this turn; your words support it.',
  },
  CONTINUE_LESSON: {
    role: 'speak',
    directive: 'Continue the lesson exactly where the lesson plan above left off — the next step only, at the current pace.',
  },
}

/**
 * Build the authoritative execution block for a flag-ON turn.
 * Empty string for non-renderer executors (memory serves directly;
 * open escalation is the current pipeline as-is).
 */
export function buildBrainExecutionBlock(plan: DispatchPlan, decision: TeachingDecision): string {
  try {
    if (!plan || plan.executor !== 'LLM_RENDERER') return ''
    const role = RENDER_ROLES[plan.decision]
    if (!role) return ''
    const lines: string[] = [
      '\n\nBRAIN DECISION (authoritative for this turn — the Educational Brain has already decided; do NOT choose a different action, activity, or topic):',
      `- Decision: ${plan.decision} (rule ${decision.ruleId})`,
      `- ${role.directive}`,
    ]
    const p = decision.parameters ?? {}
    if (plan.decision === 'REVIEW_PREREQUISITE' && p.prerequisiteId) {
      lines.push(`- Prerequisite to teach: ${p.prerequisiteId}`)
    }
    if (plan.decision === 'VISUALIZATION' && p.visualType) {
      lines.push(`- Visual to serve: ${p.visualType}`)
    }
    if (plan.decision === 'DETECT_MISCONCEPTION' && p.misconceptionLabel) {
      lines.push(`- Misconception under repair: "${p.misconceptionLabel}"`)
    }
    lines.push(`- Your role this turn: ${role.role}. The engine decided WHAT happens; you only render it.`)
    return lines.join('\n')
  } catch {
    return '' // execution scoping must never break a turn
  }
}
