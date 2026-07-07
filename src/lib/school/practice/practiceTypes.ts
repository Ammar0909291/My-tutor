export type QuestionType = 'mcq' | 'true_false' | 'short_answer'

export interface MCQQuestion {
  id: string
  type: 'mcq'
  nodeId: string
  question: string
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
}

export interface TrueFalseQuestion {
  id: string
  type: 'true_false'
  nodeId: string
  question: string
  correct: boolean
  explanation: string
}

export interface ShortAnswerQuestion {
  id: string
  type: 'short_answer'
  nodeId: string
  question: string
  sampleAnswer: string
  keywords: string[]
}

export type PracticeQuestion = MCQQuestion | TrueFalseQuestion | ShortAnswerQuestion

export interface PracticeAnswer {
  questionId: string
  value: number | boolean | string
}

export interface QuestionReview {
  questionId: string
  question: string
  type: QuestionType
  isCorrect: boolean
  explanation?: string
  sampleAnswer?: string
  yourAnswer?: string | number | boolean
}

export interface PracticeResult {
  sessionId: string
  correctCount: number
  totalCount: number
  accuracyPercent: number
  masteryStatus: 'needs_practice' | 'good_progress' | 'mastered'
  weakNodeIds: string[]
  review: QuestionReview[]
}

export const MASTERY_THRESHOLD = 80
export const MIN_QUESTIONS_FOR_MASTERY = 4
