/**
 * Brain Execution — Milestone 4 of the Educational Brain Runtime
 * (owner-approved 2026-07-21). Active whenever the Brain runtime is enabled
 * — isBrainRuntimeEnabled(), which is ON by default and off only for
 * ENABLE_BRAIN_RUNTIME='0'/'false'.
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
 * asset store and SERVE_LESSON_COMPLETE directly from the persisted lesson
 * attempt (no model called for either), and ESCALATE_TO_LLM is the current
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
  ADVANCE_DIFFICULTY: {
    role: 'present',
    // The mirror of PRACTICE, and deliberately worded as strictly: PRACTICE
    // forbids advancing, this forbids repeating. A learner who has just shown
    // they own the idea and is answered with the same idea again learns that
    // demonstrating understanding buys them nothing.
    directive: 'The learner has just demonstrated this correctly and confidently. Do NOT re-explain it, do NOT restate what they just said back to them, and do NOT return to earlier material. Acknowledge it in one short clause, then RAISE THE DEMAND on the SAME concept: a harder case, an application to a new situation, an edge case, or a question that asks them to justify WHY. One step harder, not five — and if they falter, drop straight back to consolidation.',
  },
}

export interface ExecutionBlockOptions {
  retrievedSnippet?: string
  teachingGoal?: string
  strategyLabel?: string
  conversationDirective?: string
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
    const lines: string[] = []
    if (opts?.conversationDirective) {
      lines.push('\n\n' + opts.conversationDirective)
    }
    lines.push(
      (opts?.conversationDirective ? '\n' : '\n\n') +
      'BRAIN DECISION (authoritative — Brain decided; do NOT choose a different action/topic):',
      `- Decision: ${plan.decision} (${decision.ruleId})`,
      `- ${role.directive}`,
    )
    const p = decision.parameters ?? {}
    if (plan.decision === 'REVIEW_PREREQUISITE' && p.prerequisiteId) {
      lines.push(`- Prerequisite: ${p.prerequisiteId}`)
    }
    // THE FIGURE'S NAME IS NOT THIS BLOCK'S TO GIVE.
    //
    // This line used to print the raw renderer identifier — `- Visual:
    // force_diagram` — straight into the prompt. That identifier comes from
    // `visualRegistry`'s `primary` field, which for a whole family of concepts
    // names a renderer that is not what gets drawn: 12 of the 29 physics
    // concepts that have a scene generator carry a `primary` sharing no word
    // with it. Five orbital-mechanics concepts and five OPTICS concepts are
    // labelled `force_diagram`. Measured in production on a Mirrors lesson:
    //
    //   [cue] requiredVisualization: {"value":"force_diagram"}
    //   [visual-v2] representation: ray_optics          <- what was drawn
    //
    // So the model was handed two names for one figure in a single prompt,
    // one of them false. That is the exact failure route.ts's own visual
    // comment names ("two contradictory directives in one prompt is the
    // documented cause of wrong visuals, narration/render desync, and
    // hallucinated labels"), and its resolution there was a SINGLE OWNER.
    //
    // The owner is the VISUAL CONTRACT block, which reads the ADMITTED asset —
    // the payload the client will actually render — and states its
    // representation, its concept title, its scope and its semantics. This
    // block's own directive already defers to it in words ("Serve the visual
    // aid the visual block above specifies"), so the identifier added nothing
    // the contract does not say better, and subtracted the truth when the two
    // disagreed. The registry's `primary` values are curated content and are
    // deliberately NOT edited here; they are simply no longer quoted at the
    // model as though they described the picture.
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
  /**
   * PHASE 10. Set only for the mandatory-protocol rules below; absent
   * everywhere else so nothing about the existing checks changes.
   */
  status?: ComplianceStatus
  /**
   * Stable, specific violation code(s). MULTIPLE VIOLATIONS ARE JOINED WITH
   * '+', never collapsed into one label — Phase 6 showed exactly what happens
   * when distinct causes share a bucket (`confidence_failed` was really the
   * already-read guard, and it pointed the next optimization at a matcher that
   * was working). Null when nothing was violated.
   */
  violation?: string | null
}

/**
 * PASS / VIOLATION — a structural check ran and returned a verdict.
 * NOT_CHECKED — no structural check exists for this turn's rule. Paired with
 *   the `NOT_MEASURABLE` code when the rule DOES carry a mandatory block that
 *   we deliberately cannot verify, so "unverifiable protocol" and "no protocol
 *   at all" stay distinguishable in the data.
 * CHECK_ERROR — the checker itself threw. Never silently a PASS.
 */
export type ComplianceStatus = 'PASS' | 'VIOLATION' | 'NOT_CHECKED' | 'CHECK_ERROR'

/**
 * PHASE 10 — MANDATORY PROTOCOL CONTRACTS.
 *
 * Phase 9's root cause: D0b, D0c and D0d each inject a MANDATORY block and
 * each route to `LLM_OPEN`, and the `LLM_OPEN` early-return below declares
 * them compliant by construction on the premise that "open escalation has no
 * structural directive." That premise is false for exactly these three.
 * Measured consequence (production, `phys.mech.newtons-first-law`): 8 D0b
 * turns, 7 carrying a question mark, introducing new scenarios the close block
 * forbids — none of it detected.
 *
 * These checks are keyed on `ruleId`, which Phase 8 made available. They are
 * MEASUREMENT ONLY: nothing here re-renders, re-prompts, replaces output or
 * spends a provider call. A violating turn still reaches the learner exactly
 * as it does today, because an enforcement decision must follow an honest
 * baseline rather than precede it.
 *
 * Only genuinely defensible structural conditions are checked. A requirement
 * needing semantic judgement is reported NOT_MEASURABLE rather than
 * approximated — a check that misfires on correct teaching is worse than no
 * check, because it would be believed.
 */

/** Terminal-punctuation sentence count. Deliberately crude and only ever used
 *  against limits stated as sentence counts in the blocks themselves. */
export function countSentences(text: string): number {
  const stripped = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
  const parts = stripped.split(/[.!?…]+[\s"')\]]*/).filter((s) => /\p{L}/u.test(s))
  return parts.length
}

export interface ProtocolContext {
  /** An assessment was attached to this turn (server- or model-produced). */
  mcqAttached: boolean
  /** This is the learner's first exchange of the episode. */
  isFirstTurnOfEpisode: boolean
}

/**
 * D0b — "do NOT introduce new content, new questions, or another attempt at
 * the item that failed… close warmly in ~2 sentences."
 *
 * Checkable: a question mark is present; the turn is far longer than a
 * two-sentence close; an assessment was attached (that IS another attempt).
 * NOT checkable: whether the prose introduces NEW CONTENT, and whether a close
 * was actually delivered — both need semantic judgement.
 *
 * The length bound is deliberately loose (>6 sentences against a stated limit
 * of ~2) so a slightly verbose but genuinely closing turn is not called a
 * violation. It is the closest defensible proxy for "introduced new content"
 * without pretending to judge meaning.
 */
const D0B_CLOSE_SENTENCE_CEILING = 6

function checkD0bClose(cleanText: string, ctx: ProtocolContext): string[] {
  const violations: string[] = []
  // Records "a question mark is present", NOT "asked a question" — a
  // rhetorical question counts here, and that over-reports rather than
  // under-reports. Reuses the existing detector; never a second one.
  if (repliesWithQuestion(cleanText)) violations.push('D0B_QUESTION_PRESENT')
  if (countSentences(cleanText) > D0B_CLOSE_SENTENCE_CEILING) violations.push('D0B_LENGTH_EXCEEDED')
  if (ctx.mcqAttached) violations.push('D0B_NEW_ATTEMPT')
  return violations
}

/**
 * D0c — first-lesson protocol. Two of its limits are per-TURN and structural;
 * the rest (≤3 new words, demonstrate-before-explain, praise the act, ≤6
 * questions across the SESSION) are semantic or cross-turn and are NOT checked
 * here. The session-scoped question budget is genuinely measurable but needs a
 * counter this phase does not add — reported as unmeasured, not as passing.
 */
const D0C_BURST_SENTENCE_CEILING = 4 // stated limit is 2; allow slack before calling it a violation

function checkD0cFirstLesson(cleanText: string, ctx: ProtocolContext): string[] {
  const violations: string[] = []
  if (countSentences(cleanText) > D0C_BURST_SENTENCE_CEILING) violations.push('D0C_BURST_TOO_LONG')
  // "NEVER open with a quiz or a knowledge check."
  if (ctx.isFirstTurnOfEpisode && ctx.mcqAttached) violations.push('D0C_OPENED_WITH_QUIZ')
  return violations
}

/**
 * Compliance for a mandatory-protocol rule, or NOT_CHECKED with a reason.
 * Pure; no I/O; no provider call; never throws.
 */
export function checkProtocolCompliance(
  ruleId: string | null,
  cleanText: string,
  ctx: ProtocolContext,
): { status: ComplianceStatus; violation: string | null; reason: string } {
  try {
    if (!ruleId) return { status: 'NOT_CHECKED', violation: null, reason: 'no rule recorded' }
    let violations: string[] | null = null
    if (ruleId === 'D0b-CLOSING-PROTECT') violations = checkD0bClose(cleanText, ctx)
    else if (ruleId === 'D0c-FIRST-LESSON-PROTOCOL') violations = checkD0cFirstLesson(cleanText, ctx)
    else if (ruleId === 'D0d-SESSION-OPENING-PROTOCOL') {
      // Every requirement in buildOpeningBlock is about ORDERING and PRESENCE
      // of meaning — engineered win first, continuity in one breath, due
      // reviews before new content, then objective + why + connection. None of
      // it has a defensible structural signature, and inventing one would
      // manufacture a violation rate rather than measure it.
      return { status: 'NOT_CHECKED', violation: 'NOT_MEASURABLE', reason: 'D0d requirements are semantic (ordering/presence of meaning)' }
    } else {
      return { status: 'NOT_CHECKED', violation: null, reason: `no mandatory-protocol contract for ${ruleId}` }
    }
    return violations.length > 0
      ? { status: 'VIOLATION', violation: violations.join('+'), reason: `${ruleId}: ${violations.join('+')}` }
      : { status: 'PASS', violation: null, reason: `${ruleId}: structural checks passed` }
  } catch (err) {
    return { status: 'CHECK_ERROR', violation: null, reason: `protocol check errored: ${err instanceof Error ? err.message : String(err)}` }
  }
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
  protocolCtx?: ProtocolContext,
): ComplianceResult {
  try {
    if (!plan || !decision) return { compliant: true, reason: 'no Brain decision this turn' }
    if (plan.executor === 'EXPLANATION_MEMORY') {
      return { compliant: true, reason: 'memory-served — no LLM text to check' }
    }
    // PHASE 10 — the mandatory-protocol rules are checked BEFORE the LLM_OPEN
    // early return below, because they are the exact case that return was
    // wrong about. One authority, extended; not a second checker alongside it.
    if (protocolCtx) {
      const protocol = checkProtocolCompliance(decision.ruleId, cleanText, protocolCtx)
      if (protocol.status !== 'NOT_CHECKED' || protocol.violation === 'NOT_MEASURABLE') {
        return {
          // MEASUREMENT ONLY. `compliant` drives recordCompliance's counter and
          // its warn log; nothing re-renders, re-prompts or replaces output.
          compliant: protocol.status !== 'VIOLATION',
          reason: protocol.reason,
          status: protocol.status,
          violation: protocol.violation,
        }
      }
    }
    if (plan.executor === 'LLM_OPEN') {
      return {
        compliant: true,
        reason: 'open escalation — no structural directive to check',
        status: 'NOT_CHECKED',
        violation: null,
      }
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
