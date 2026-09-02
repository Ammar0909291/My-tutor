/**
 * P0 — THE MCQ ANSWER KEY MUST NOT REACH THE LEARNER.
 *
 * Measured on the real account (2026-09-02): every /api/learn/chat MCQ payload
 * carried `correctIndex`, so a learner reading the network response saw the
 * correct option outright. The client never needs it — LessonScreen renders
 * `question` + `options` and submits the chosen OPTION TEXT; the server grades
 * that text against the stored key (gradeMcqAnswer reads the PERSISTED pending
 * probe, not the response). So the key is dead-received data that leaks the
 * answer.
 *
 * This pins the fix at the server/API boundary (`mcqForClient`), and proves:
 *   - no answer key (or assetId) in the learner-facing projection;
 *   - the probe still renders (question + options preserved);
 *   - server grading is unchanged (reads the stored correctIndex);
 *   - the persisted snapshot keeps the full probe so the NEXT turn can grade;
 *   - the client no longer requires a key it must never receive.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mcqForClient, mcqToServe, gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'

const PROBE: TutorMCQ = { question: 'Which is velocity?', options: ['Speed', 'Displacement ÷ time'], correctIndex: 1, assetId: 'a-123' }

describe('mcqForClient strips the answer key and keeps only what renders', () => {
  it('drops correctIndex AND assetId, keeps question + options verbatim', () => {
    const c = mcqForClient(PROBE)!
    expect(c).toEqual({ question: 'Which is velocity?', options: ['Speed', 'Displacement ÷ time'] })
    expect('correctIndex' in c).toBe(false)
    expect('assetId' in c).toBe(false)
  })

  it('null/undefined in → null out (presence preserved for the on-screen invariant)', () => {
    expect(mcqForClient(null)).toBeNull()
    expect(mcqForClient(undefined)).toBeNull()
  })

  it('does not mutate the source probe — the server copy keeps its key', () => {
    const src: TutorMCQ = { ...PROBE }
    mcqForClient(src)
    expect(src.correctIndex).toBe(1)
    expect(src.assetId).toBe('a-123')
  })
})

describe('server grading is untouched — it reads the stored key, not the client payload', () => {
  it('grades the submitted OPTION TEXT against the full probe correctIndex', () => {
    // The learner taps and the client sends option text; the server holds the key.
    expect(gradeMcqAnswer('Displacement ÷ time', PROBE)).toEqual({ chosenIndex: 1, correct: true })
    expect(gradeMcqAnswer('Speed', PROBE)).toEqual({ chosenIndex: 0, correct: false })
  })

  it('the client projection could not be used to grade — it has no key at all', () => {
    const c = mcqForClient(PROBE)! as Partial<TutorMCQ>
    expect(c.correctIndex).toBeUndefined()
  })
})

describe('the wiring is at the right boundary', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  const SCREEN = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('the response serializes the client projection, not the raw probe', () => {
    expect(ROUTE).toContain('mcq: mcqForClient(mcqToServeForResponse(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)) ?? undefined')
  })

  it('the PERSISTED snapshot still serves the FULL probe (so the next turn can grade)', () => {
    // Persistence must keep correctIndex — gradeMcqAnswer reads it next turn.
    expect(ROUTE).toMatch(/mcqToServe\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\),\s*\n\s*lessonKeyThisTurnHoisted,/)
  })

  it('the client no longer requires or stores correctIndex', () => {
    // The render/submit path uses question + options + the option text only.
    expect(SCREEN).not.toMatch(/typeof rawMcq\.correctIndex === 'number'/)
    expect(SCREEN).not.toMatch(/correctIndex: rawMcq\.correctIndex/)
    // The active-MCQ state shape carries no key.
    expect(SCREEN).not.toMatch(/const \[activeMcq[\s\S]{0,120}correctIndex/)
    // …and it still submits the chosen option TEXT (server grades it).
    expect(SCREEN).toContain('void sendMessage(sessionId, option)')
  })
})
