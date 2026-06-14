import type { PracticeQuestion, PracticeAnswer, PracticeResult, QuestionReview } from './practiceTypes'
import { MASTERY_THRESHOLD, MIN_QUESTIONS_FOR_MASTERY } from './practiceTypes'

function scoreOne(
  q: PracticeQuestion,
  answer: PracticeAnswer,
): { isCorrect: boolean; explanation?: string; sampleAnswer?: string } {
  if (q.type === 'mcq') {
    return { isCorrect: answer.value === q.correctIndex, explanation: q.explanation }
  }
  if (q.type === 'true_false') {
    return { isCorrect: answer.value === q.correct, explanation: q.explanation }
  }
  // Short answer: keyword match — at least half the keywords present and answer ≥ 8 chars
  const text = String(answer.value ?? '').toLowerCase().trim()
  const hits = q.keywords.filter((kw) => text.includes(kw.toLowerCase()))
  const threshold = Math.max(1, Math.ceil(q.keywords.length * 0.5))
  const isCorrect = text.length >= 8 && hits.length >= threshold
  return { isCorrect, sampleAnswer: q.sampleAnswer }
}

export function evaluatePracticeSession(
  sessionId: string,
  questions: PracticeQuestion[],
  answers: PracticeAnswer[],
): PracticeResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]))
  const weakNodeIds = new Set<string>()
  let correct = 0

  const review: QuestionReview[] = questions.map((q) => {
    const answer = answerMap.get(q.id)
    if (!answer) {
      weakNodeIds.add(q.nodeId)
      return { questionId: q.id, question: q.question, type: q.type, isCorrect: false }
    }
    const { isCorrect, explanation, sampleAnswer } = scoreOne(q, answer)
    if (!isCorrect) weakNodeIds.add(q.nodeId)
    else correct++
    return {
      questionId: q.id,
      question: q.question,
      type: q.type,
      isCorrect,
      explanation,
      sampleAnswer,
      yourAnswer: answer.value as string | number | boolean,
    }
  })

  const total = questions.length
  const accuracyPercent = total > 0 ? Math.round((correct / total) * 100) : 0
  const masteryStatus =
    accuracyPercent >= MASTERY_THRESHOLD && total >= MIN_QUESTIONS_FOR_MASTERY
      ? 'mastered'
      : accuracyPercent >= 60
      ? 'good_progress'
      : 'needs_practice'

  return {
    sessionId,
    correctCount: correct,
    totalCount: total,
    accuracyPercent,
    masteryStatus,
    weakNodeIds: [...weakNodeIds],
    review,
  }
}
