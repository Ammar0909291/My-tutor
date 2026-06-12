// Reuse all question/answer/review types from the practice layer — they're identical
export type {
  QuestionType,
  MCQQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  PracticeQuestion,
  PracticeAnswer,
  QuestionReview,
} from '../practice/practiceTypes'

export const ASSESSMENT_PASS_THRESHOLD = 70   // % required to pass
export const ASSESSMENT_MCQ_COUNT = 8
export const ASSESSMENT_TF_COUNT = 4
export const ASSESSMENT_SA_COUNT = 3
export const ASSESSMENT_TOTAL = ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT + ASSESSMENT_SA_COUNT

export interface AssessmentResult {
  sessionId: string
  correctCount: number
  totalCount: number
  accuracyPercent: number
  passed: boolean
  weakNodeIds: string[]
  review: import('../practice/practiceTypes').QuestionReview[]
  nextChapter: { id: string; title: string } | null
}
