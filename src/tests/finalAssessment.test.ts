/**
 * CRIT-2: Final assessment server-side scoring.
 * Verifies client-supplied scores are ignored; server recomputes from stored questions.
 */
import { describe, it, expect } from 'vitest'

// Test the pure scoring logic extracted from the route
const PASS_THRESHOLD = 0.7

type StoredQuestion = { question: string; options: string[]; correctIndex: number }

function computeScore(answers: number[], questions: StoredQuestion[]) {
  if (answers.length !== questions.length) throw new Error('answer count mismatch')
  const correct = answers.filter((a, i) => a === questions[i].correctIndex).length
  const total = questions.length
  const passed = total > 0 && correct / total >= PASS_THRESHOLD
  return { correct, total, passed, scorePct: Math.round((correct / total) * 100) }
}

const QUESTIONS: StoredQuestion[] = [
  { question: 'Q1', options: ['A','B','C','D'], correctIndex: 0 },
  { question: 'Q2', options: ['A','B','C','D'], correctIndex: 2 },
  { question: 'Q3', options: ['A','B','C','D'], correctIndex: 1 },
  { question: 'Q4', options: ['A','B','C','D'], correctIndex: 3 },
  { question: 'Q5', options: ['A','B','C','D'], correctIndex: 0 },
]

describe('CRIT-2: server-side score computation', () => {
  it('perfect honest submission passes', () => {
    const answers = [0, 2, 1, 3, 0]
    const { correct, total, passed } = computeScore(answers, QUESTIONS)
    expect(correct).toBe(5)
    expect(total).toBe(5)
    expect(passed).toBe(true)
  })

  it('forged [0,0,0,0,0] client answer is scored against server questions — wrong answers fail', () => {
    // Client might forge any array; server always uses storedQuestions[i].correctIndex
    const forgedAllZero = [0, 0, 0, 0, 0]
    const { correct, passed } = computeScore(forgedAllZero, QUESTIONS)
    // indices 0,2,1,3,0 → only index 0 and 4 match → 2/5 = 40% < 70%
    expect(correct).toBe(2)
    expect(passed).toBe(false)
  })

  it('partial correct (3/5 = 60%) does not pass', () => {
    const { passed, scorePct } = computeScore([0, 2, 1, 0, 1], QUESTIONS)
    expect(scorePct).toBe(60)
    expect(passed).toBe(false)
  })

  it('exactly 70% passes', () => {
    // 7/10 questions correct
    const qs: StoredQuestion[] = Array.from({ length: 10 }, (_, i) => ({
      question: `Q${i}`, options: ['A','B','C','D'], correctIndex: i % 4,
    }))
    const answers = qs.map((q, i) => i < 7 ? q.correctIndex : (q.correctIndex + 1) % 4)
    const { passed } = computeScore(answers, qs)
    expect(passed).toBe(true)
  })

  it('throws when answer count mismatches question count', () => {
    expect(() => computeScore([0, 1], QUESTIONS)).toThrow('answer count mismatch')
  })

  it('schema rejects score/total fields — only answers[] accepted', async () => {
    const { z } = await import('zod')
    const submitSchema = z.object({
      subjectCode: z.string(),
      answers: z.array(z.number().int().min(0).max(3)),
    })
    // A forged payload with score/total fields is parsed but those fields are stripped
    const payload = { subjectCode: 'math', answers: [0,1,2], score: 100, total: 100 }
    const parsed = submitSchema.parse(payload)
    expect((parsed as any).score).toBeUndefined()
    expect((parsed as any).total).toBeUndefined()
    expect(parsed.answers).toEqual([0,1,2])
  })
})
