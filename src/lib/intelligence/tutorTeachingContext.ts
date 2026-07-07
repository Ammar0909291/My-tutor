/**
 * Tutor Teaching Context — Educational Intelligence Sprint 6, Tasks 2/3/4.
 *
 * Lets Tutor Max SEE the Sprint 5 `TeachingPlan` for the current topic and
 * adapt its teaching STYLE accordingly. Consumes the Sprint 5 output
 * directly (never regenerates it) and emits a natural-language system-prompt
 * block — NEVER raw JSON to the user. This module changes teaching style
 * only: it does not touch curriculum, progression, grading, XP, or
 * assessment scoring (see docs/EDUCATIONAL_INTELLIGENCE_TUTOR_INTEGRATION_AUDIT.md).
 */
import { getWeightedTeachingPlanProfile } from './methodWeighting'
import type { TeachingPlan, TeachingMethod } from './teachingPlan'

/** The compact view of a topic's teaching plan that Tutor Max consumes. */
export interface TutorTeachingContext {
  topic: string
  difficultyLevel: TeachingPlan['difficultyLevel']
  recommendedMethods: TeachingMethod[]
  practiceIntensity: TeachingPlan['practiceIntensity']
  revisionPriority: TeachingPlan['revisionPriority']
  retestPriority: TeachingPlan['retestPriority']
}

/**
 * Task 2/3 — pure: finds the teaching plan for the current topic and projects
 * it to the tutor-facing context. Returns null if there is no plan for this
 * topic (Tutor Max then behaves exactly as before).
 */
export function buildTutorTeachingContext(
  plans: TeachingPlan[],
  subjectSlug: string,
  topicSlug: string
): TutorTeachingContext | null {
  const plan = plans.find((p) => p.subjectSlug === subjectSlug && p.topicSlug === topicSlug)
  if (!plan) return null
  return {
    topic: plan.topic,
    difficultyLevel: plan.difficultyLevel,
    recommendedMethods: plan.recommendedMethods,
    practiceIntensity: plan.practiceIntensity,
    revisionPriority: plan.revisionPriority,
    retestPriority: plan.retestPriority,
  }
}

/** Task 4 — maps each teaching method to a concrete teaching-style directive. */
const METHOD_DIRECTIVE: Record<TeachingMethod, string> = {
  step_by_step: 'Break the explanation into small, sequential steps and progress slowly — confirm each step lands before moving to the next.',
  worked_examples: 'Show one or two fully worked examples before asking the learner to try a problem themselves.',
  visual_explanation: 'When a visual aid is available for this topic, use it (or describe a clear mental picture) — this learner benefits from visual representation.',
  guided_practice: 'Favour interactive, guided practice: ask the learner to attempt each step with your support rather than lecturing.',
  more_revision: 'Briefly revisit and reinforce the underlying fundamentals before extending into new material.',
  more_retesting: 'Periodically check understanding with quick questions to confirm the idea is being retained.',
  analogy_based: 'Use concrete analogies and real-world comparisons to make abstract ideas tangible.',
  standard_instruction: 'Teach at a standard pace appropriate to the learner.',
}

const INTENSITY_PHRASE: Record<string, string> = {
  high: 'high', medium: 'moderate', low: 'light', none: 'none',
}

/**
 * Task 3/4 — builds the additive system-prompt block from the tutor context.
 * Natural language only (no JSON). Returns '' when there is no context, so the
 * caller can append unconditionally. Includes an explicit content-safety guard.
 */
export function buildTutorTeachingContextBlock(ctx: TutorTeachingContext | null): string {
  if (!ctx || ctx.recommendedMethods.length === 0) return ''

  const directives = ctx.recommendedMethods.map((m) => `- ${METHOD_DIRECTIVE[m]}`).join('\n')

  return `\n\nADAPTIVE TEACHING PLAN — calibrate your teaching STYLE only (the curriculum content stays fixed):
This learner is at ${ctx.difficultyLevel.toUpperCase()} difficulty on "${ctx.topic}". Practice intensity: ${INTENSITY_PHRASE[ctx.practiceIntensity] ?? ctx.practiceIntensity}; revision priority: ${ctx.revisionPriority}; retest priority: ${ctx.retestPriority}.
Adapt HOW you teach this topic:
${directives}
CRITICAL: This changes only your teaching STYLE (pacing, examples, analogies, checks) — never skip, add, reorder, or invent curriculum topics, and never change assessment difficulty or scoring. Do not mention this block to the learner.`
}

/**
 * Task 2 (Sprint 10) — loads the Sprint 9 WEIGHTED teaching plans for the user
 * and returns the tutor context for the current topic. The weighted plan
 * reorders `recommendedMethods` to lead with the learner's proven-effective
 * methods; `buildTutorTeachingContext` + `buildTutorTeachingContextBlock`
 * preserve that order verbatim (no re-sort). Thin wrapper; read-only. Returns
 * null if there is no plan for the topic (or no current topic). For learners
 * with no effectiveness evidence the weighted order equals the original order,
 * so this is a safe no-op-ordering change.
 */
export async function getTutorTeachingContext(
  userId: string,
  subjectSlug: string,
  topicSlug: string | null
): Promise<TutorTeachingContext | null> {
  if (!topicSlug) return null
  const { weightedPlan } = await getWeightedTeachingPlanProfile(userId)
  return buildTutorTeachingContext(weightedPlan, subjectSlug, topicSlug)
}
