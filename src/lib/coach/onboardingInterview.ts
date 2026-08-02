/**
 * Coach onboarding interview (P5) — the guided adaptive interview that every
 * new learner completes before meeting Tutor Max.
 *
 * Separation of responsibilities: Coach builds the learner profile, Tutor Max
 * teaches. This module owns the interview only — the questions, their legal
 * answers, and the wizard's "one question, one answer, continue" progression.
 * It knows nothing about teaching, and nothing here talks to a model: the
 * interview is deterministic by design, which is what makes it a wizard rather
 * than "generic AI chat".
 *
 * Single source of truth: these option values are consumed by the zod schema
 * at the API boundary, by the persisted Profile columns, by the wizard UI, and
 * by the Tutor Max adaptation block. Defining them once is what stops the four
 * from drifting into a parallel profile system.
 *
 * Reuse note — three of the six answers already have a home in the live schema
 * and are NOT duplicated here:
 *   experience  -> Profile.currentLevel (canonical CurriculumLevel tiers)
 *   subjects    -> ProfileSubject rows
 *   free-text   -> Profile.selfDescription
 * Only goal / study time / learning style / confidence had nowhere to live.
 */

export type CoachQuestionId =
  | 'goal' | 'experience' | 'studyTime' | 'learningStyle' | 'confidence' | 'subjects'

export interface CoachOption {
  value: string
  label: string
}

export interface CoachQuestion {
  id: CoachQuestionId
  /** Coach's prompt. One short question — never a paragraph, never a re-introduction. */
  prompt: string
  /** True when the learner may pick more than one option. */
  multi: boolean
  options: CoachOption[]
}

export const GOAL_VALUES = [
  'school_exams', 'university', 'competitive_exams', 'career', 'hobby', 'revision',
] as const
export type GoalValue = (typeof GOAL_VALUES)[number]

/** Maps onto Profile.currentLevel. 'some_knowledge' and 'comfortable' both
 *  normalise to the canonical 'intermediate' tier — see learnerProfile.ts. */
export const EXPERIENCE_VALUES = [
  'complete_beginner', 'some_knowledge', 'comfortable', 'advanced',
] as const
export type ExperienceValue = (typeof EXPERIENCE_VALUES)[number]

/** Stored as minutes so it is directly usable in scheduling arithmetic. */
export const STUDY_TIME_VALUES = ['15', '30', '60', '120', '180'] as const
export type StudyTimeValue = (typeof STUDY_TIME_VALUES)[number]

export const LEARNING_STYLE_VALUES = [
  'visual', 'examples_first', 'step_by_step', 'challenge', 'mixed',
] as const
export type LearningStyleValue = (typeof LEARNING_STYLE_VALUES)[number]

export const CONFIDENCE_VALUES = [
  'very_nervous', 'unsure', 'average', 'confident',
] as const
export type ConfidenceValue = (typeof CONFIDENCE_VALUES)[number]

/** Subject slugs must match the seeded Subject.slug values the rest of the
 *  onboarding flow already resolves against. */
export const SUBJECT_VALUES = [
  'mathematics', 'physics', 'chemistry', 'biology', 'english',
] as const
export type SubjectValue = (typeof SUBJECT_VALUES)[number]

export const COACH_QUESTIONS: CoachQuestion[] = [
  {
    id: 'goal',
    prompt: 'What are you learning for?',
    multi: false,
    options: [
      { value: 'school_exams', label: 'School exams' },
      { value: 'university', label: 'University' },
      { value: 'competitive_exams', label: 'Competitive exams' },
      { value: 'career', label: 'Career' },
      { value: 'hobby', label: 'Hobby' },
      { value: 'revision', label: 'Revision' },
    ],
  },
  {
    id: 'experience',
    prompt: 'Where are you starting from?',
    multi: false,
    options: [
      { value: 'complete_beginner', label: 'Complete beginner' },
      { value: 'some_knowledge', label: 'Some knowledge' },
      { value: 'comfortable', label: 'Comfortable' },
      { value: 'advanced', label: 'Advanced' },
    ],
  },
  {
    id: 'studyTime',
    prompt: 'How long can you study on a normal day?',
    multi: false,
    options: [
      { value: '15', label: '15 minutes' },
      { value: '30', label: '30 minutes' },
      { value: '60', label: '1 hour' },
      { value: '120', label: '2 hours' },
      { value: '180', label: '3+ hours' },
    ],
  },
  {
    id: 'learningStyle',
    prompt: 'How do you like things explained?',
    multi: false,
    options: [
      { value: 'visual', label: 'Show me visually' },
      { value: 'examples_first', label: 'Examples first' },
      { value: 'step_by_step', label: 'Step by step' },
      { value: 'challenge', label: 'Challenge me' },
      { value: 'mixed', label: 'A mix' },
    ],
  },
  {
    id: 'confidence',
    prompt: 'How do you feel about studying this right now?',
    multi: false,
    options: [
      { value: 'very_nervous', label: 'Very nervous' },
      { value: 'unsure', label: 'Unsure' },
      { value: 'average', label: 'Average' },
      { value: 'confident', label: 'Confident' },
    ],
  },
  {
    id: 'subjects',
    prompt: 'Which subjects do you want to work on?',
    multi: true,
    options: [
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'physics', label: 'Physics' },
      { value: 'chemistry', label: 'Chemistry' },
      { value: 'biology', label: 'Biology' },
      { value: 'english', label: 'English' },
    ],
  },
]

export const COACH_QUESTION_ORDER: CoachQuestionId[] = COACH_QUESTIONS.map((q) => q.id)

/** Answers accumulated so far. Single-select questions hold one value; the
 *  multi-select question holds an array. */
export type CoachAnswers = Partial<{
  goal: string
  experience: string
  studyTime: string
  learningStyle: string
  confidence: string
  subjects: string[]
}>

export function getCoachQuestion(id: CoachQuestionId): CoachQuestion | null {
  return COACH_QUESTIONS.find((q) => q.id === id) ?? null
}

/** True when `value` is a legal answer to `question`. */
export function isValidAnswer(question: CoachQuestion, value: unknown): boolean {
  const legal = new Set(question.options.map((o) => o.value))
  if (question.multi) {
    return Array.isArray(value)
      && value.length > 0
      && value.every((v) => typeof v === 'string' && legal.has(v))
      && new Set(value).size === value.length
  }
  return typeof value === 'string' && legal.has(value)
}

function answerFor(answers: CoachAnswers, id: CoachQuestionId): unknown {
  return (answers as Record<string, unknown>)[id]
}

/** True when a question already has a valid answer. */
export function isAnswered(answers: CoachAnswers, id: CoachQuestionId): boolean {
  const q = getCoachQuestion(id)
  if (!q) return false
  return isValidAnswer(q, answerFor(answers, id))
}

/**
 * The wizard's progression: the first unanswered question in order, or null
 * when the interview is complete. Deliberately re-derived from the answers
 * each time rather than tracked as a cursor — a cursor and an answer map are
 * two representations of one fact, and would be free to disagree (the same
 * duplicate-state defect P3 fixed for asked questions).
 */
export function nextCoachQuestion(answers: CoachAnswers): CoachQuestion | null {
  for (const id of COACH_QUESTION_ORDER) {
    if (!isAnswered(answers, id)) return getCoachQuestion(id)
  }
  return null
}

export function isInterviewComplete(answers: CoachAnswers): boolean {
  return nextCoachQuestion(answers) === null
}

/** 1-based position of the current question, for the wizard's progress display. */
export function interviewProgress(answers: CoachAnswers): { answered: number; total: number } {
  const answered = COACH_QUESTION_ORDER.filter((id) => isAnswered(answers, id)).length
  return { answered, total: COACH_QUESTION_ORDER.length }
}
