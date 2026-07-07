/**
 * Active Teaching Style (Transparency) — Educational Intelligence Sprint 11,
 * Tasks 2/3.
 *
 * Exposes and EXPLAINS the teaching style Tutor Max is already using, by
 * projecting the Sprint 9/10 weighted teaching plan + the Sprint 4 difficulty
 * signals into a readable model and a plain-English explanation. VISIBILITY
 * ONLY — pure functions, no writes, no new intelligence, no adaptation, no
 * scoring / grading / XP / curriculum changes. Nothing in Sprints 1–10 is
 * modified. See docs/EDUCATIONAL_INTELLIGENCE_TRANSPARENCY_AUDIT.md.
 */
import { getLearningDifficultyProfile } from './learningDifficultyProfile'
import { getWeightedTeachingPlanProfile } from './methodWeighting'
import type { TeachingPlan, TeachingMethod } from './teachingPlan'
import type { DifficultyLevel } from './learningDifficultyProfile'

/** Example (per the Sprint 11 brief): `{ difficultyLevel, activeMethods, practiceIntensity, revisionPriority, retestPriority }`. */
export interface ActiveTeachingStyle {
  topic: string
  subjectSlug: string
  topicSlug: string
  difficultyLevel: DifficultyLevel
  /** The methods Tutor Max is leading with, in weighted (proven-effective-first) order. */
  activeMethods: TeachingMethod[]
  practiceIntensity: TeachingPlan['practiceIntensity']
  revisionPriority: TeachingPlan['revisionPriority']
  retestPriority: TeachingPlan['retestPriority']
}

/**
 * Task 2 — pure projection of a (weighted) teaching plan into the active style.
 * `recommendedMethods` is already the weighted order (Sprint 9/10), exposed as
 * `activeMethods` unchanged.
 */
export function buildActiveTeachingStyle(plan: TeachingPlan): ActiveTeachingStyle {
  return {
    topic: plan.topic,
    subjectSlug: plan.subjectSlug,
    topicSlug: plan.topicSlug,
    difficultyLevel: plan.difficultyLevel,
    activeMethods: plan.recommendedMethods,
    practiceIntensity: plan.practiceIntensity,
    revisionPriority: plan.revisionPriority,
    retestPriority: plan.retestPriority,
  }
}

const METHOD_PHRASE: Record<TeachingMethod, string> = {
  step_by_step: 'step-by-step explanations',
  worked_examples: 'worked examples',
  visual_explanation: 'visual explanations',
  guided_practice: 'guided practice',
  more_revision: 'extra revision of the fundamentals',
  more_retesting: 'frequent understanding checks',
  analogy_based: 'real-world analogies',
  standard_instruction: 'standard explanations',
}

/** Joins up to 3 method phrases naturally ("A, B and C"). */
function joinPhrases(methods: TeachingMethod[]): string {
  const phrases = methods.slice(0, 3).map((m) => METHOD_PHRASE[m])
  if (phrases.length === 0) return 'standard explanations'
  if (phrases.length === 1) return phrases[0]
  return `${phrases.slice(0, -1).join(', ')} and ${phrases[phrases.length - 1]}`
}

/** Turns the difficulty signals into a short "because …" reason. */
function reasonFor(difficultyLevel: DifficultyLevel, signals: string[]): string {
  if (difficultyLevel === 'high') {
    const detail = signals.length > 0 ? ` (${signals.slice(0, 2).join(', ')})` : ''
    return `this topic has been difficult for you in previous attempts${detail}`
  }
  if (difficultyLevel === 'medium') {
    return signals.length > 0
      ? `you've had some difficulty here (${signals.slice(0, 2).join(', ')})`
      : `you've had some difficulty with this topic`
  }
  return `you're doing well on this topic, so your tutor keeps a standard pace`
}

/**
 * Task 3 — pure text generator. Explains WHY the tutor is teaching this way.
 * No writes, no I/O.
 */
export function explainTeachingStyle(style: ActiveTeachingStyle | null, signals: string[] = []): string {
  if (!style) {
    return 'Your tutor is using standard explanations — no specific learning difficulty has been detected for you yet.'
  }
  return `Your tutor is using ${joinPhrases(style.activeMethods)} because ${reasonFor(style.difficultyLevel, signals)}.`
}

export interface ActiveTeachingStyleResult {
  teachingStyle: ActiveTeachingStyle | null
  explanation: string
}

/**
 * Task 2/3/4 — loads the learner's most relevant struggling topic (Sprint 4,
 * hardest-first) and the weighted plan for it (Sprint 9/10), and returns the
 * active style + explanation. Read-only; reuses existing wrappers.
 */
export async function getActiveTeachingStyle(userId: string): Promise<ActiveTeachingStyleResult> {
  const difficultyProfile = await getLearningDifficultyProfile(userId)
  const top = difficultyProfile.entries[0]
  if (!top) {
    return { teachingStyle: null, explanation: explainTeachingStyle(null) }
  }

  const { weightedPlan } = await getWeightedTeachingPlanProfile(userId)
  const plan = weightedPlan.find((p) => p.subjectSlug === top.subjectSlug && p.topicSlug === top.topicSlug)
  if (!plan) {
    return { teachingStyle: null, explanation: explainTeachingStyle(null) }
  }

  const teachingStyle = buildActiveTeachingStyle(plan)
  return { teachingStyle, explanation: explainTeachingStyle(teachingStyle, top.signals) }
}
