/**
 * Dynamic Lesson Composer (Phase 3B).
 *
 * Converts the already-computed TeachingDecision + TeachingAction +
 * AssessmentDecision + ConceptNode + Student Memory signals into a
 * deterministic, ordered `LessonPlan` of stages describing exactly how the
 * lesson should unfold this turn — without generating any educational
 * content, without an LLM, and without changing or duplicating any of the
 * systems it reads from.
 *
 * Stage selection is first-match-wins template assembly: each candidate
 * stage (prerequisite activation, misconception reminder, the core teaching
 * stage(s) implied by TeachingAction.action_type, guided practice, mastery
 * check, review reminder, transition) is included only when the existing
 * signals it is conditioned on say it is needed, then concatenated in a
 * fixed pedagogical order. Every stage's `objective`/`completion_criteria`
 * is a fixed template string built from data the caller already has
 * (decision.goal, concept ids, assessment numbers) — never invented prose,
 * never an LLM call.
 */

import type { Chapter } from '@/lib/education'
import type { ConceptNode, TeachingDecision } from '@/lib/teaching-engine/types'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import type { TeachingAction, TeachingActionType } from './teachingActionGenerator'
import { getAssessmentDecision, type AssessmentDecision } from './assessmentIntelligence'

// ── Public types ──────────────────────────────────────────────────────────────

export type LessonStageType =
  | 'prerequisite_activation'
  | 'misconception_reminder'
  | 'concept_introduction'
  | 'visual_explanation'
  | 'worked_example'
  | 'guided_practice'
  | 'interactive_questioning'
  | 'mastery_check'
  | 'review_reminder'
  | 'transition_to_next_concept'

export type InteractionMode = 'receptive' | 'guided' | 'active' | 'evaluative'

export interface LessonStage {
  stage_type: LessonStageType
  objective: string
  estimated_minutes: number
  bloom_level: string
  interaction_mode: InteractionMode
  required_visual: VisualType | null
  completion_criteria: string
}

export interface LessonPlan {
  concept_id: string
  total_estimated_minutes: number
  stages: LessonStage[]
}

export interface LessonComposerContext {
  /** Chapter-scoped misconception concept ids (Student Memory). */
  activeMisconceptions: string[]
  /** Chapter-scoped concept ids due for spaced review, excluding the current concept. */
  reviewDueConceptIds: string[]
}

// ── Fixed durations (minutes) for non-core stages ────────────────────────────
// Deterministic constants, not derived from content — these only pace the
// scaffolding stages around the core teaching stage(s), whose own duration
// comes from TeachingAction.estimated_minutes (already decided upstream).

const PREREQUISITE_ACTIVATION_MINUTES = 3
const MISCONCEPTION_REMINDER_MINUTES = 2
const REVIEW_REMINDER_MINUTES = 2
const TRANSITION_MINUTES = 2
const MINUTES_PER_ASSESSMENT_QUESTION = 1.5

// ── Stage builders ────────────────────────────────────────────────────────────

function prerequisiteActivationStage(prerequisites: string[]): LessonStage {
  return {
    stage_type: 'prerequisite_activation',
    objective: `Quickly activate prior knowledge needed for this concept: ${prerequisites.join(', ')}.`,
    estimated_minutes: PREREQUISITE_ACTIVATION_MINUTES,
    bloom_level: 'remember',
    interaction_mode: 'guided',
    required_visual: null,
    completion_criteria: 'Student recalls or recognizes each listed prerequisite without needing full re-teaching.',
  }
}

function misconceptionReminderStage(misconceptions: string[]): LessonStage {
  return {
    stage_type: 'misconception_reminder',
    objective: `Briefly flag a known prior misconception before introducing new content: ${misconceptions.join(', ')}.`,
    estimated_minutes: MISCONCEPTION_REMINDER_MINUTES,
    bloom_level: 'remember',
    interaction_mode: 'guided',
    required_visual: null,
    completion_criteria: 'Student is made aware of the prior mistake without it derailing the lesson.',
  }
}

function conceptIntroductionStage(decision: TeachingDecision, action: TeachingAction, minutes: number): LessonStage {
  return {
    stage_type: 'concept_introduction',
    objective: decision.goal,
    estimated_minutes: minutes,
    bloom_level: action.bloom_level,
    interaction_mode: 'receptive',
    required_visual: null,
    completion_criteria: 'Student can restate the core idea in their own words.',
  }
}

function visualExplanationStage(decision: TeachingDecision, action: TeachingAction, minutes: number): LessonStage {
  return {
    stage_type: 'visual_explanation',
    objective: `Reinforce "${decision.goal}" using a visual representation.`,
    estimated_minutes: minutes,
    bloom_level: action.bloom_level,
    interaction_mode: 'receptive',
    required_visual: action.visual_type,
    completion_criteria: 'Student connects the visual to the concept when asked.',
  }
}

function workedExampleStage(decision: TeachingDecision, action: TeachingAction, minutes: number, label: string): LessonStage {
  return {
    stage_type: 'worked_example',
    objective: `${label} "${decision.goal}".`,
    estimated_minutes: minutes,
    bloom_level: action.bloom_level,
    interaction_mode: 'guided',
    required_visual: null,
    completion_criteria: 'Student follows each step and can identify what happens next before it is shown.',
  }
}

function interactiveQuestioningStage(decision: TeachingDecision, action: TeachingAction, minutes: number): LessonStage {
  return {
    stage_type: 'interactive_questioning',
    objective: `Check understanding of "${decision.goal}" through targeted questions.`,
    estimated_minutes: minutes,
    bloom_level: action.bloom_level,
    interaction_mode: 'active',
    required_visual: null,
    completion_criteria: 'Student answers correctly without heavy prompting.',
  }
}

function reviewCoreStage(decision: TeachingDecision, action: TeachingAction, minutes: number): LessonStage {
  return {
    stage_type: 'review_reminder',
    objective: `Revisit "${decision.goal}" to confirm retention.`,
    estimated_minutes: minutes,
    bloom_level: action.bloom_level,
    interaction_mode: 'active',
    required_visual: null,
    completion_criteria: 'Student reproduces the key result or step without re-teaching.',
  }
}

function guidedPracticeStage(decision: TeachingDecision, minutes: number): LessonStage {
  return {
    stage_type: 'guided_practice',
    objective: `Apply "${decision.goal}" with scaffolded support, reducing help as correctness increases.`,
    estimated_minutes: minutes,
    bloom_level: 'apply',
    interaction_mode: 'active',
    required_visual: null,
    completion_criteria: 'Student completes at least one problem with reduced or no scaffolding.',
  }
}

const MASTERY_CHECK_BLOOM: Record<NonNullable<AssessmentDecision['assessment_type']>, string> = {
  guided: 'understand',
  standard: 'apply',
  challenge: 'evaluate',
  reassessment: 'apply',
}

function masteryCheckStage(assessment: AssessmentDecision): LessonStage {
  return {
    stage_type: 'mastery_check',
    objective: `Confirm mastery with a ${assessment.assessment_type} assessment.`,
    estimated_minutes: Math.round(assessment.question_count * MINUTES_PER_ASSESSMENT_QUESTION),
    bloom_level: assessment.assessment_type ? MASTERY_CHECK_BLOOM[assessment.assessment_type] : 'apply',
    interaction_mode: 'evaluative',
    required_visual: null,
    completion_criteria: `Score at or above ${assessment.mastery_threshold}% across ${assessment.question_count} questions.`,
  }
}

function reviewReminderBookendStage(reviewDueConceptIds: string[]): LessonStage {
  return {
    stage_type: 'review_reminder',
    objective: `Weave in a brief touchpoint for concepts due for spaced review: ${reviewDueConceptIds.join(', ')}.`,
    estimated_minutes: REVIEW_REMINDER_MINUTES,
    bloom_level: 'remember',
    interaction_mode: 'receptive',
    required_visual: null,
    completion_criteria: 'Brief acknowledgement or quick check only — do not fully re-teach.',
  }
}

function transitionStage(decision: TeachingDecision): LessonStage {
  return {
    stage_type: 'transition_to_next_concept',
    objective: `Bridge toward the next concept: ${decision.next_concept}.`,
    estimated_minutes: TRANSITION_MINUTES,
    bloom_level: 'remember',
    interaction_mode: 'receptive',
    required_visual: null,
    completion_criteria: 'Student acknowledges readiness to move on.',
  }
}

// ── Core stage sequence (keyed off TeachingAction.action_type) ──────────────

function buildCoreStages(decision: TeachingDecision, action: TeachingAction): LessonStage[] {
  const total = action.estimated_minutes

  switch (action.action_type) {
    case 'misconception_fix':
      return [conceptIntroductionStage(decision, action, total)]

    case 'visual_explanation':
    case 'simulation':
      return [
        conceptIntroductionStage(decision, action, Math.round(total * 0.4)),
        visualExplanationStage(decision, action, Math.round(total * 0.6)),
      ]

    case 'worked_example':
      return [
        conceptIntroductionStage(decision, action, Math.round(total * 0.3)),
        workedExampleStage(decision, action, Math.round(total * 0.7), 'Walk through a worked example of'),
      ]

    case 'guided_derivation':
      return [
        conceptIntroductionStage(decision, action, Math.round(total * 0.3)),
        workedExampleStage(decision, action, Math.round(total * 0.7), 'Guide a step-by-step derivation of'),
      ]

    case 'experiment':
      return [
        conceptIntroductionStage(decision, action, Math.round(total * 0.3)),
        workedExampleStage(decision, action, Math.round(total * 0.7), 'Frame a hands-on experiment exploring'),
      ]

    case 'analogy':
      return [conceptIntroductionStage(decision, action, total)]

    case 'interactive_question':
      return [
        conceptIntroductionStage(decision, action, Math.round(total * 0.3)),
        interactiveQuestioningStage(decision, action, Math.round(total * 0.7)),
      ]

    case 'recap':
      return [reviewCoreStage(decision, action, total)]

    case 'challenge_problem':
      return [workedExampleStage(decision, action, total, 'Pose a higher-difficulty challenge applying')]

    default: {
      const _exhaustive: never = action.action_type
      return _exhaustive
    }
  }
}

// Action types that represent genuinely new or corrective learning — these
// warrant a guided-practice stage before any mastery check. Recap and
// challenge_problem are themselves review/assessment-adjacent and skip it.
const PRACTICE_ELIGIBLE_ACTION_TYPES = new Set<TeachingActionType>([
  'visual_explanation', 'simulation', 'worked_example', 'guided_derivation',
  'experiment', 'interactive_question', 'analogy', 'misconception_fix',
])

const PRACTICE_MINUTES_RATIO = 0.5

// ── Pure composition function ────────────────────────────────────────────────

/**
 * Assembles a deterministic LessonPlan from already-computed decisions.
 * No content is generated — every field is either passed through, looked up
 * from a fixed table, or filled in with a template string built from ids
 * the caller already has.
 */
export function composeLessonPlan(
  decision: TeachingDecision,
  action: TeachingAction,
  assessment: AssessmentDecision | null,
  concept: ConceptNode,
  context: LessonComposerContext,
): LessonPlan {
  const stages: LessonStage[] = []

  if (action.prerequisites_to_review.length > 0) {
    stages.push(prerequisiteActivationStage(action.prerequisites_to_review))
  }

  if (context.activeMisconceptions.length > 0 && action.action_type !== 'misconception_fix') {
    stages.push(misconceptionReminderStage(context.activeMisconceptions))
  }

  stages.push(...buildCoreStages(decision, action))

  const assessmentRequired = assessment?.assessment_required === true
  if (!assessmentRequired && PRACTICE_ELIGIBLE_ACTION_TYPES.has(action.action_type)) {
    stages.push(guidedPracticeStage(decision, Math.round(action.estimated_minutes * PRACTICE_MINUTES_RATIO)))
  }

  if (assessment && assessmentRequired) {
    stages.push(masteryCheckStage(assessment))
  }

  if (context.reviewDueConceptIds.length > 0 && action.action_type !== 'recap') {
    stages.push(reviewReminderBookendStage(context.reviewDueConceptIds))
  }

  const continuingForward = decision.mode === 'accelerate'
    || (assessment !== null && !assessment.assessment_required && assessment.recommended_after === null)
  if (continuingForward && decision.next_concept && decision.next_concept !== concept.id) {
    stages.push(transitionStage(decision))
  }

  return {
    concept_id: concept.id,
    total_estimated_minutes: stages.reduce((sum, s) => sum + s.estimated_minutes, 0),
    stages,
  }
}

// ── Async convenience wrapper ─────────────────────────────────────────────────

/**
 * Same as `composeLessonPlan`, but resolves the current `AssessmentDecision`
 * via the existing Assessment Intelligence engine (Phase 2H) instead of
 * requiring every call site to fetch it manually. Non-fatal: a failed
 * lookup degrades to `assessment: null` rather than throwing.
 */
export async function getLessonPlan(
  decision: TeachingDecision,
  action: TeachingAction,
  concept: ConceptNode,
  context: LessonComposerContext & {
    userId: string
    board: string
    grade: number
    subjectSlug: string
    subjectId: string
    chapter: Chapter
  },
): Promise<LessonPlan> {
  const assessment = await getAssessmentDecision(
    context.userId, context.board, context.grade, context.subjectSlug, context.subjectId, context.chapter,
  ).catch(() => null)

  return composeLessonPlan(decision, action, assessment, concept, {
    activeMisconceptions: context.activeMisconceptions,
    reviewDueConceptIds: context.reviewDueConceptIds,
  })
}

// ── Tutor system prompt integration ──────────────────────────────────────────

const STAGE_LABEL: Record<LessonStageType, string> = {
  prerequisite_activation: 'Prerequisite activation',
  misconception_reminder: 'Misconception reminder',
  concept_introduction: 'Concept introduction',
  visual_explanation: 'Visual explanation',
  worked_example: 'Worked example',
  guided_practice: 'Guided practice',
  interactive_questioning: 'Interactive questioning',
  mastery_check: 'Mastery check',
  review_reminder: 'Review reminder',
  transition_to_next_concept: 'Transition to next concept',
}

/**
 * Builds the LESSON PLAN system prompt block — advisory only, exactly like
 * the other adaptive intelligence modules. Lists the stage sequence so the
 * tutor can pace the conversation across multiple turns; never forces the
 * tutor to follow it rigidly within a single reply.
 *
 * W2-2 (ADR 09): optional `progress` parameter enables stage-continuity framing.
 * When omitted: today's exact behavior (backward compatible).
 * When provided: adds "stages 1-N already covered" framing and tracking instruction.
 */
export function buildLessonPlanBlock(
  plan: LessonPlan,
  progress?: { stageIndex: number; totalStages: number },
): string {
  if (plan.stages.length === 0) return ''

  const lines: string[] = ['\n\nLESSON PLAN']
  lines.push(`Suggested stage sequence for this concept (~${plan.total_estimated_minutes} min total):`)
  plan.stages.forEach((stage, i) => {
    const covered = progress !== undefined && i < progress.stageIndex
    lines.push(
      `${i + 1}. ${STAGE_LABEL[stage.stage_type]} (~${stage.estimated_minutes} min, ${stage.interaction_mode}): ${stage.objective} Done when: ${stage.completion_criteria}${covered ? ' [ALREADY COVERED]' : ''}`,
    )
  })
  if (progress !== undefined && progress.stageIndex > 0 && progress.stageIndex < plan.stages.length) {
    lines.push(`Stages 1–${progress.stageIndex} already covered this session. Continue from stage ${progress.stageIndex + 1}.`)
  }
  lines.push('This is a multi-turn pacing guide, not a script for one reply — move through stages naturally as the conversation progresses. Do not reference this plan directly to the student.')
  if (progress !== undefined) {
    lines.push('LESSON STAGE TRACKING (required): At the very END of your response, on its own line, emit [LESSON:<n>] where <n> is the 0-based index of the stage you just covered. This tag is stripped before the student sees it — never reference it in your visible text.')
  }
  return lines.join('\n')
}

/**
 * W2-2 (ADR 09): Parse the [LESSON:<stageIndex>] progress tag from tutor response text.
 * Mirrors parseWorkedExampleTag() exactly — exact-match strip, never throws.
 * Returns stageIndex = null when no tag found (no signal, not an error).
 */
export function parseLessonProgressTag(text: string): {
  stageIndex: number | null
  cleanText: string
} {
  const match = text.match(/\[LESSON:\s*(\d+)\s*\]/i)
  if (!match) return { stageIndex: null, cleanText: text }
  const stageIndex = parseInt(match[1], 10)
  // Strip the EXACT tag we parsed (match[0]) — not a "first bracket" heuristic.
  const cleanText = text.replace(match[0], '').replace(/\s{2,}/g, ' ').trim()
  return { stageIndex, cleanText }
}
