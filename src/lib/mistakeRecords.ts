export interface MistakeRecordData {
  userId: string
  subjectSlug: string
  topicSlug: string
  sessionId: string
  category: string
  questionId: string
}

/**
 * practice/submit: one MistakeRecord per index where correct[i] === false,
 * questionId = "<sessionId>-<index>", category = topicSlug. Extracted
 * verbatim from src/app/api/practice/submit/route.ts.
 */
export function buildPracticeMistakeRecords(
  correct: boolean[],
  userId: string,
  subjectSlug: string,
  topicSlug: string,
  sessionId: string,
): MistakeRecordData[] {
  return correct
    .map((isCorrect, i) => (isCorrect ? -1 : i))
    .filter((i) => i >= 0)
    .map((i) => ({
      userId,
      subjectSlug,
      topicSlug,
      sessionId,
      category: topicSlug,
      questionId: `${sessionId}-${i}`,
    }))
}

/**
 * assessment/submit and mock/submit: one MistakeRecord per weak node/topic
 * id, questionId = topicSlug = nodeId, category is caller-supplied
 * ('chapter_assessment' or 'mock_test'). Extracted verbatim — both routes
 * built this exact record shape independently, differing only in the
 * category literal.
 */
export function buildWeakNodeMistakeRecords(
  weakNodeIds: string[],
  userId: string,
  subjectSlug: string,
  sessionId: string,
  category: string,
): MistakeRecordData[] {
  return weakNodeIds.map((nodeId) => ({
    userId,
    subjectSlug,
    topicSlug: nodeId,
    sessionId,
    category,
    questionId: nodeId,
  }))
}
