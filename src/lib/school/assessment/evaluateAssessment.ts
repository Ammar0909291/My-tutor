import { evaluatePracticeSession } from '../practice/evaluatePracticeAnswer'
import type { PracticeQuestion, PracticeAnswer } from '../practice/practiceTypes'
import type { AssessmentResult } from './assessmentTypes'
import { ASSESSMENT_PASS_THRESHOLD } from './assessmentTypes'

export function evaluateChapterAssessment(
  sessionId: string,
  questions: PracticeQuestion[],
  answers: PracticeAnswer[],
  nextChapter: { id: string; title: string } | null,
): AssessmentResult {
  const base = evaluatePracticeSession(sessionId, questions, answers)
  return {
    sessionId: base.sessionId,
    correctCount: base.correctCount,
    totalCount: base.totalCount,
    accuracyPercent: base.accuracyPercent,
    passed: base.accuracyPercent >= ASSESSMENT_PASS_THRESHOLD,
    weakNodeIds: base.weakNodeIds,
    review: base.review,
    nextChapter,
  }
}
