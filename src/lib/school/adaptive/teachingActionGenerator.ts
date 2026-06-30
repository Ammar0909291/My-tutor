/**
 * Teaching Action Generator (Phase 3A).
 *
 * Converts the frozen Teaching Engine's `TeachingDecision` into a structured
 * `TeachingAction` that tells the UI/tutor exactly HOW to teach this turn —
 * presentation, visual, interaction level, pacing — without changing
 * `TeachingDecision` itself or duplicating any logic already owned by the
 * Teaching Engine, the visual-detection system, or Assessment Intelligence.
 *
 * Deterministic, no LLM. `decide()`'s 6-value `ActionType` plus `TeachingMode`,
 * `ConceptNode.concept_type`, the subject slug, and (optionally) the current
 * `AssessmentDecision.assessment_type` are mapped, first-match-wins, onto a
 * richer `TeachingActionType` vocabulary. The granular visual (number line,
 * coordinate plane, geometry shapes, ...) is never reinvented — it is read
 * straight from the existing `detectVisual()` keyword matcher and exposed as
 * a separate `visual_type` field typed against the existing `VisualType`
 * union, so the 2D/3D visual taxonomy has exactly one source of truth.
 */

import type { Chapter } from '@/lib/education'
import type { ConceptNode, TeachingDecision, TeachingMode } from '@/lib/teaching-engine/types'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { detectVisual } from '@/lib/school/visuals/detectVisual'
import { getAssessmentDecision, type AssessmentType } from './assessmentIntelligence'

// ── Public types ──────────────────────────────────────────────────────────────

export type TeachingActionType =
  | 'visual_explanation'
  | 'worked_example'
  | 'interactive_question'
  | 'guided_derivation'
  | 'simulation'
  | 'analogy'
  | 'misconception_fix'
  | 'experiment'
  | 'recap'
  | 'challenge_problem'

export type PresentationMode = 'text' | 'visual_and_text' | 'interactive'
export type InteractionLevel = 'low' | 'guided' | 'active' | 'high'

export interface TeachingAction {
  action_type: TeachingActionType
  presentation_mode: PresentationMode
  visual_type: VisualType | null
  interaction_level: InteractionLevel
  estimated_minutes: number
  objective: string
  bloom_level: string
  prerequisites_to_review: string[]
}

export interface TeachingActionContext {
  subjectSlug: string
  chapterTitle: string
  /** Chapter-scoped weak concept ids (Student Memory). */
  weakConcepts: string[]
  /** Chapter-scoped misconception ids (Student Memory). */
  misconceptions: string[]
  /** Current Assessment Intelligence type, if any — used only to detect an
   *  upcoming challenge assessment so TAG can raise the bar in step. */
  assessmentType: AssessmentType | null
}

// ── Subject classification ───────────────────────────────────────────────────

// Subjects where hands-on/lab framing ("experiment") fits better than an
// abstract step-by-step derivation. Mirrors detectVisual.ts's own
// subjectSlug-based branching rather than parsing KG-id domain prefixes.
const LAB_SUBJECTS = new Set(['physics', 'chemistry', 'biology', 'classical_mechanics', 'quantum_physics'])

// ── action_type mapping ───────────────────────────────────────────────────────

/**
 * First-match-wins over the frozen `ActionType`/`TeachingMode`, mirroring the
 * established deterministic-decision pattern (teachingStrategy.ts,
 * assessmentIntelligence.ts).
 */
function mapActionType(
  decision: TeachingDecision,
  subjectSlug: string,
  visualType: VisualType | null,
  assessmentType: AssessmentType | null,
): TeachingActionType {
  // 1. Misconception fix — the frozen engine already gave this top priority.
  if (decision.action_type === 'MISCONCEPTION_FIX') return 'misconception_fix'

  // 2. Assessment Intelligence signals a challenge assessment is coming and
  //    the engine is already accelerating this learner — raise the bar now.
  if (assessmentType === 'challenge' && decision.mode === 'accelerate') return 'challenge_problem'

  // 3. Spaced/rapid review.
  if (decision.action_type === 'RAPID_REVIEW') return 'recap'

  // 4. Visual explanation — a 3D visual is staged as a simulation; otherwise
  //    a plain visual explanation (visual_type carries the specific aid).
  if (decision.action_type === 'VISUAL_EXPLANATION') {
    return visualType?.startsWith('three_') ? 'simulation' : 'visual_explanation'
  }

  // 5. Step-by-step guided — remediation reads better as an analogy first;
  //    lab-science subjects get hands-on framing; everything else is a
  //    guided derivation.
  if (decision.action_type === 'STEP_BY_STEP_GUIDED') {
    if (decision.mode === 'remediate') return 'analogy'
    return LAB_SUBJECTS.has(subjectSlug) ? 'experiment' : 'guided_derivation'
  }

  // 6. Problem-solving session.
  if (decision.action_type === 'PROBLEM_SOLVING_SESSION') return 'worked_example'

  // 7. Interactive questioning, and the default fallback.
  return 'interactive_question'
}

// ── Derived field mappers ─────────────────────────────────────────────────────

function derivePresentationMode(actionType: TeachingActionType, visualType: VisualType | null): PresentationMode {
  if (actionType === 'interactive_question' || actionType === 'challenge_problem') return 'interactive'
  if (visualType !== null || actionType === 'visual_explanation' || actionType === 'simulation') return 'visual_and_text'
  return 'text'
}

const INTERACTION_LEVEL: Record<TeachingActionType, InteractionLevel> = {
  visual_explanation: 'low',
  analogy: 'low',
  recap: 'low',
  worked_example: 'guided',
  guided_derivation: 'guided',
  misconception_fix: 'guided',
  experiment: 'active',
  simulation: 'active',
  interactive_question: 'active',
  challenge_problem: 'high',
}

// A challenge problem deserves a little more time than the frozen engine's
// base estimate; everything else passes `estimated_time` through unchanged
// so TAG never second-guesses the Teaching Engine's own pacing decision.
const CHALLENGE_TIME_MULTIPLIER = 1.2

function deriveEstimatedMinutes(decision: TeachingDecision, actionType: TeachingActionType): number {
  if (actionType === 'challenge_problem') return Math.round(decision.estimated_time * CHALLENGE_TIME_MULTIPLIER)
  return decision.estimated_time
}

const BLOOM_FALLBACK: Record<TeachingActionType, string> = {
  recap: 'remember',
  visual_explanation: 'understand',
  analogy: 'understand',
  guided_derivation: 'apply',
  worked_example: 'apply',
  experiment: 'apply',
  simulation: 'apply',
  interactive_question: 'analyze',
  misconception_fix: 'analyze',
  challenge_problem: 'evaluate',
}

function deriveBloomLevel(concept: ConceptNode, actionType: TeachingActionType): string {
  return concept.bloom ?? BLOOM_FALLBACK[actionType]
}

function derivePrerequisitesToReview(concept: ConceptNode, weakConcepts: string[], misconceptions: string[]): string[] {
  const flagged = new Set([...weakConcepts, ...misconceptions])
  return concept.prerequisites.filter((p) => flagged.has(p))
}

// ── Pure decision function ───────────────────────────────────────────────────

/**
 * Derives a `TeachingAction` from an already-computed `TeachingDecision` and
 * `ConceptNode`. Never recomputes or overrides anything the Teaching Engine
 * decided — `objective` is `decision.goal` verbatim, `estimated_minutes` is
 * `decision.estimated_time` (challenge problems get a small, explicit bump).
 */
export function deriveTeachingAction(
  decision: TeachingDecision,
  concept: ConceptNode,
  context: TeachingActionContext,
): TeachingAction {
  const visualType = detectVisual({
    subjectSlug: context.subjectSlug,
    chapterTitle: context.chapterTitle,
    lessonTitle: concept.name,
  })

  const action_type = mapActionType(decision, context.subjectSlug, visualType, context.assessmentType)

  return {
    action_type,
    presentation_mode: derivePresentationMode(action_type, visualType),
    visual_type: visualType,
    interaction_level: INTERACTION_LEVEL[action_type],
    estimated_minutes: deriveEstimatedMinutes(decision, action_type),
    objective: decision.goal,
    bloom_level: deriveBloomLevel(concept, action_type),
    prerequisites_to_review: derivePrerequisitesToReview(concept, context.weakConcepts, context.misconceptions),
  }
}

// ── Async convenience wrapper ─────────────────────────────────────────────────

/**
 * Same as `deriveTeachingAction`, but resolves `assessmentType` for the
 * caller via the existing Assessment Intelligence engine (Phase 2H) instead
 * of requiring every call site to fetch it manually. Non-fatal: a failed
 * assessment lookup degrades to `assessmentType: null` rather than throwing.
 */
export async function getTeachingAction(
  decision: TeachingDecision,
  concept: ConceptNode,
  context: Omit<TeachingActionContext, 'assessmentType'> & {
    userId: string
    board: string
    grade: number
    subjectId: string
    chapter: Chapter
  },
): Promise<TeachingAction> {
  const assessmentDecision = await getAssessmentDecision(
    context.userId, context.board, context.grade, context.subjectSlug, context.subjectId, context.chapter,
  ).catch(() => null)

  return deriveTeachingAction(decision, concept, {
    subjectSlug: context.subjectSlug,
    chapterTitle: context.chapterTitle,
    weakConcepts: context.weakConcepts,
    misconceptions: context.misconceptions,
    assessmentType: assessmentDecision?.assessment_type ?? null,
  })
}

// ── Tutor system prompt integration ──────────────────────────────────────────

const ACTION_LABEL: Record<TeachingActionType, string> = {
  visual_explanation: 'Visual explanation',
  worked_example: 'Worked example',
  interactive_question: 'Interactive questioning',
  guided_derivation: 'Guided derivation',
  simulation: 'Simulation',
  analogy: 'Analogy-led explanation',
  misconception_fix: 'Misconception fix',
  experiment: 'Hands-on experiment framing',
  recap: 'Quick recap',
  challenge_problem: 'Challenge problem',
}

/**
 * Builds the TEACHING ACTION system prompt block — advisory only, exactly
 * like the other adaptive intelligence modules. The tutor decides how to
 * realize this within the conversation; this block never forces a specific
 * response format.
 */
export function buildTeachingActionBlock(action: TeachingAction): string {
  const lines: string[] = ['\n\nTEACHING ACTION']
  lines.push(`Format: ${ACTION_LABEL[action.action_type]} (${action.presentation_mode.replace(/_/g, ' ')}, ${action.interaction_level} interaction, ~${action.estimated_minutes} min, Bloom: ${action.bloom_level})`)
  if (action.visual_type) {
    lines.push(`Visual aid available: ${action.visual_type.replace(/_/g, ' ')} — use the VISUAL: tag if it fits this turn.`)
  }
  if (action.prerequisites_to_review.length > 0) {
    lines.push(`Prerequisites to briefly re-check first: ${action.prerequisites_to_review.join(', ')}`)
  }
  lines.push('Treat this as guidance on HOW to teach this turn, not a script — adapt naturally to the conversation. Do not reference this format guidance directly to the student.')
  return lines.join('\n')
}
