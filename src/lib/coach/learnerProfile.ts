/**
 * Learner profile (P5) — what Coach produces and Tutor Max consumes.
 *
 * The handoff between the two responsibilities. Coach owns building this;
 * Tutor Max owns teaching from it. Nothing here decides what to teach — it
 * only describes the learner, and renders that description as a prompt
 * contract the teaching engine already knows how to honour.
 *
 * Storage reuses the live Profile row. Three answers already had a home and
 * are NOT duplicated:
 *   experience -> Profile.currentLevel (normalised onto the canonical
 *                 CurriculumLevel tiers via levels.ts, the same normalisation
 *                 the onboarding route already applies)
 *   subjects   -> ProfileSubject rows
 *   goal text  -> Profile.selfDescription (free text, unchanged)
 * The four fields with nowhere to live are new nullable columns:
 *   goalCategory, dailyStudyMinutes, learningStyle, confidenceBaseline.
 *
 * `goalCategory` is deliberately NOT stored in the pre-existing
 * Profile.learningGoals column: that column is live free text, read into the
 * tutor prompt today, and overloading it with an enum would corrupt a field
 * other code already depends on.
 */

import type {
  CoachAnswers, ConfidenceValue, ExperienceValue, GoalValue, LearningStyleValue,
} from './onboardingInterview'
import { getCoachQuestion, isInterviewComplete } from './onboardingInterview'
import type { CoachQuestionId } from './onboardingInterview'

export interface LearnerProfile {
  goalCategory: GoalValue
  /** Canonical CurriculumLevel tier — what the placement engine reads. */
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
  /** The learner's own answer, retained because 'some_knowledge' and
   *  'comfortable' both normalise to 'intermediate' and the distinction still
   *  matters for pacing. */
  experience: ExperienceValue
  dailyStudyMinutes: number
  learningStyle: LearningStyleValue
  confidenceBaseline: ConfidenceValue
  subjects: string[]
}

/**
 * Map the interview's four experience answers onto the three canonical
 * CurriculumLevel tiers the placement engine already uses. Widening the
 * canonical enum to four values would have meant touching placement, the
 * curriculum route and the dashboard — a parallel level system, which is
 * exactly what the reuse rule forbids.
 */
export function normalizeExperience(experience: ExperienceValue): 'beginner' | 'intermediate' | 'advanced' {
  switch (experience) {
    case 'complete_beginner': return 'beginner'
    case 'some_knowledge': return 'intermediate'
    case 'comfortable': return 'intermediate'
    case 'advanced': return 'advanced'
  }
}

/** Build the profile from a completed interview. Returns null when the
 *  interview is incomplete — a partial profile must never reach Tutor Max. */
export function buildLearnerProfile(answers: CoachAnswers): LearnerProfile | null {
  if (!isInterviewComplete(answers)) return null
  const experience = answers.experience as ExperienceValue
  const minutes = Number(answers.studyTime)
  if (!Number.isFinite(minutes) || minutes <= 0) return null
  return {
    goalCategory: answers.goal as GoalValue,
    currentLevel: normalizeExperience(experience),
    experience,
    dailyStudyMinutes: minutes,
    learningStyle: answers.learningStyle as LearningStyleValue,
    confidenceBaseline: answers.confidence as ConfidenceValue,
    subjects: [...(answers.subjects ?? [])],
  }
}

/** The shape read back off a persisted Profile row. */
export interface PersistedCoachProfile {
  goalCategory?: string | null
  currentLevel?: string | null
  dailyStudyMinutes?: number | null
  learningStyle?: string | null
  confidenceBaseline?: string | null
}

const GOAL_FRAMING: Record<GoalValue, string> = {
  school_exams: 'preparing for school exams — tie work to what is actually examined, and keep exam-style phrasing familiar',
  university: 'working toward university-level study — depth and correct terminology matter more than speed',
  competitive_exams: 'preparing for competitive exams — accuracy under time pressure is the target, so favour efficient methods and common traps',
  career: 'learning for career reasons — anchor ideas in applied, real-world use rather than academic framing',
  hobby: 'learning for interest — protect enjoyment, follow curiosity, never drill for its own sake',
  revision: 'revising material already met before — lead with retrieval and diagnosis, not first-time teaching',
}

const STYLE_DIRECTIVE: Record<LearningStyleValue, string> = {
  visual: 'Lead with a diagram, sketch or concrete visual representation before prose whenever the concept admits one.',
  examples_first: 'Lead with a worked example, then draw the general rule out of it — never rule-first.',
  step_by_step: 'Break every procedure into explicit numbered steps and confirm each one before moving on.',
  challenge: 'Keep scaffolding light. Pose the problem before the method and let them attempt it first.',
  mixed: 'Vary the approach — alternate visual, example-led and step-by-step explanations rather than settling into one.',
}

const CONFIDENCE_DIRECTIVE: Record<ConfidenceValue, string> = {
  very_nervous:
    'This learner reported being VERY NERVOUS. Open below their actual level so the first item is a certain win, '
    + 'keep bursts short, and never let two failures land in a row. Treat visible reassurance as part of the teaching, not a detour.',
  unsure:
    'This learner reported being UNSURE. Engineer an early win before anything difficult, and name what they got right explicitly rather than moving straight on.',
  average:
    'This learner reported average confidence. Normal pacing; confirm successes briefly and keep moving.',
  confident:
    'This learner reported being CONFIDENT. Do not over-praise routine successes — it reads as condescending. '
    + 'Verify claimed understanding with a real item rather than accepting it, since confident learners over-report.',
}

/** Pacing follows the session budget the learner actually has. */
function pacingDirective(minutes: number): string {
  if (minutes <= 15) {
    return 'Their usual session is about 15 minutes: aim for ONE concept per session, and reach a checkpoint early — never leave a concept half-open at the end.'
  }
  if (minutes <= 30) {
    return 'Their usual session is about 30 minutes: one concept plus its practice is a realistic session.'
  }
  if (minutes <= 60) {
    return 'Their usual session is about an hour: a concept, its practice, and a short review of the previous concept fit comfortably.'
  }
  return `Their usual session is about ${Math.round(minutes / 60)} hours: multiple concepts are realistic, but interleave review and vary the activity — attention, not time, is the limit.`
}

/** Questioning difficulty is anchored to where they said they are starting. */
function difficultyDirective(level: LearnerProfile['currentLevel']): string {
  switch (level) {
    case 'beginner':
      return 'Start questions at recognition and single-step reasoning. Do not open with multi-step calculation.'
    case 'intermediate':
      return 'Start questions at applying a known method; move to multi-step work once one succeeds.'
    case 'advanced':
      return 'Start questions at application and transfer. Skip recognition-level items unless something fails.'
  }
}

/**
 * Render the profile as a Tutor Max prompt contract, covering the five
 * adaptations P5 requires: explanation depth, pacing, examples, questioning
 * difficulty, confidence expectations.
 *
 * Returns '' when Coach has not produced a profile yet, so a learner who
 * predates the interview pays no prompt cost and behaves exactly as before —
 * this must not regress existing sessions.
 */
export function buildCoachAdaptationBlock(profile: PersistedCoachProfile | null | undefined): string {
  if (!profile) return ''
  const goal = profile.goalCategory as GoalValue | null | undefined
  const style = profile.learningStyle as LearningStyleValue | null | undefined
  const confidence = profile.confidenceBaseline as ConfidenceValue | null | undefined
  const minutes = profile.dailyStudyMinutes
  const level = profile.currentLevel

  const lines: string[] = []
  if (goal && GOAL_FRAMING[goal]) lines.push(`- Goal: they are ${GOAL_FRAMING[goal]}.`)
  if (style && STYLE_DIRECTIVE[style]) lines.push(`- Explanations and examples: ${STYLE_DIRECTIVE[style]}`)
  if (typeof minutes === 'number' && minutes > 0) lines.push(`- Pacing: ${pacingDirective(minutes)}`)
  if (level === 'beginner' || level === 'intermediate' || level === 'advanced') {
    lines.push(`- Questioning difficulty: ${difficultyDirective(level)}`)
  }
  if (confidence && CONFIDENCE_DIRECTIVE[confidence]) {
    lines.push(`- Confidence: ${CONFIDENCE_DIRECTIVE[confidence]}`)
  }
  if (lines.length === 0) return ''

  return (
    '\n\nLEARNER PROFILE (from the Coach interview — adapt to it, never recite it back):\n'
    + lines.join('\n')
  )
}

/**
 * Derive the free-text `selfDescription` the profile and the tutor prompt
 * still expect, so removing the open-ended question does not break either.
 * Reuses the interview's own option labels rather than a second copy of the
 * wording.
 */
export function describeFromAnswers(answers: CoachAnswers, subjectNames: string[]): string {
  const labelFor = (id: CoachQuestionId): string | null => {
    const q = getCoachQuestion(id)
    const v = (answers as Record<string, unknown>)[id]
    if (!q || typeof v !== 'string') return null
    return q.options.find((o) => o.value === v)?.label ?? null
  }
  const parts: string[] = []
  const subjectList = subjectNames.length > 0 ? subjectNames.join(', ') : 'their chosen subjects'
  const goal = labelFor('goal')
  parts.push(goal ? `Learning ${subjectList} for: ${goal}.` : `Learning ${subjectList}.`)
  const experience = labelFor('experience')
  if (experience) parts.push(`Starting point: ${experience}.`)
  const time = labelFor('studyTime')
  if (time) parts.push(`Usual study time: ${time} a day.`)
  const style = labelFor('learningStyle')
  if (style) parts.push(`Prefers: ${style}.`)
  const confidence = labelFor('confidence')
  if (confidence) parts.push(`Confidence right now: ${confidence}.`)
  return parts.join(' ')
}
