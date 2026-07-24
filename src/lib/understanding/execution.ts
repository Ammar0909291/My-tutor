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
import { repliesWithQuestion } from '@/lib/teaching/conversationState'

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
  TEACH_DIRECTLY: {
    role: 'demonstrate',
    directive: 'Stop probing — do not ask another diagnostic or prior-knowledge question this turn. Switch to a direct demonstration, worked example, or visualization instead, following the SHOW-move turn directive above.',
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

export interface ExecutionBlockOptions {
  retrievedSnippet?: string
  teachingGoal?: string
  strategyLabel?: string
}

/**
 * Build the authoritative execution block for a flag-ON turn.
 * Empty string for non-renderer executors (memory serves directly;
 * open escalation is the current pipeline as-is).
 */
export function buildBrainExecutionBlock(
  plan: DispatchPlan,
  decision: TeachingDecision,
  opts?: ExecutionBlockOptions,
): string {
  try {
    if (!plan || plan.executor !== 'LLM_RENDERER') return ''
    const role = RENDER_ROLES[plan.decision]
    if (!role) return ''
    const lines: string[] = [
      '\n\nBRAIN DECISION (authoritative — Brain decided; do NOT choose a different action/topic):',
      `- Decision: ${plan.decision} (${decision.ruleId})`,
      `- ${role.directive}`,
    ]
    const p = decision.parameters ?? {}
    if (plan.decision === 'REVIEW_PREREQUISITE' && p.prerequisiteId) {
      lines.push(`- Prerequisite: ${p.prerequisiteId}`)
    }
    if (plan.decision === 'VISUALIZATION' && p.visualType) {
      lines.push(`- Visual: ${p.visualType}`)
    }
    if (plan.decision === 'DETECT_MISCONCEPTION' && p.misconceptionLabel) {
      lines.push(`- Misconception: "${p.misconceptionLabel}"`)
    }
    if (opts?.strategyLabel) {
      lines.push(`- Strategy: ${opts.strategyLabel}`)
    }
    if (opts?.teachingGoal) {
      lines.push(`- Goal: ${opts.teachingGoal}`)
    }
    if (opts?.retrievedSnippet) {
      lines.push(`- Retrieved content (rewrite naturally, do NOT generate new): ${opts.retrievedSnippet.slice(0, 300)}`)
    }
    lines.push(`- Role: ${role.role}. The engine decided WHAT; you only render.`)
    return lines.join('\n')
  } catch {
    return ''
  }
}

export interface ComplianceResult {
  compliant: boolean
  reason: string
}

/**
 * P0 Brain compliance validation — after the LLM (or memory) produces a
 * response, verify it actually followed the TeachingDecision, for the
 * subset of decisions whose directive makes an unambiguous, mechanically-
 * checkable claim ("ask exactly one question", "ask NO questions", "serve
 * a visual"). Reuses conversationState.ts's repliesWithQuestion() (never
 * re-implements question detection) and the route's already-computed
 * visualFired — no new detector. Decisions with no unambiguous structural
 * claim (DETECT_MISCONCEPTION, PRACTICE, etc.) report compliant with a
 * "no structural check defined" reason rather than inventing one that
 * could misfire on genuinely correct behavior. Fail-open on error (never
 * blocks a turn) but the error itself is reported, never swallowed.
 */
export function checkBrainCompliance(
  cleanText: string,
  plan: DispatchPlan | null,
  decision: TeachingDecision | null,
  visualFired: boolean,
): ComplianceResult {
  try {
    if (!plan || !decision) return { compliant: true, reason: 'no Brain decision this turn' }
    if (plan.executor === 'EXPLANATION_MEMORY') {
      return { compliant: true, reason: 'memory-served — no LLM text to check' }
    }
    if (plan.executor === 'LLM_OPEN') {
      return { compliant: true, reason: 'open escalation — no structural directive to check' }
    }
    const asksQuestion = repliesWithQuestion(cleanText)
    switch (plan.decision) {
      case 'ASK_DIAGNOSTIC_QUESTION':
        return asksQuestion
          ? { compliant: true, reason: 'asked a question, as directed' }
          : { compliant: false, reason: `Brain directed ${plan.decision} (rule ${decision.ruleId}) but the response asked no question` }
      case 'TEACH_DIRECTLY':
        return !asksQuestion
          ? { compliant: true, reason: 'no question asked, as directed' }
          : { compliant: false, reason: `Brain directed ${plan.decision} (rule ${decision.ruleId}, no questions) but the response asked one` }
      case 'VISUALIZATION':
        return visualFired
          ? { compliant: true, reason: 'a visual rendered, as directed' }
          : { compliant: false, reason: `Brain directed ${plan.decision} (rule ${decision.ruleId}) but no visual rendered` }
      default:
        return { compliant: true, reason: `no structural check defined for ${plan.decision}` }
    }
  } catch (err) {
    return { compliant: false, reason: `compliance check errored: ${err instanceof Error ? err.message : String(err)}` }
  }
}
