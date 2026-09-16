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
    // Typed Turn Contract, I2 (render receipt), Batch 1 (2026-09-16): the
    // projection now ALSO carries `renderId` — a deterministic, non-secret
    // content hash (never encodes correctIndex) the client echoes back next
    // turn so the server can tell a genuinely-rendered answer from a grade
    // against a question never shown. This test's own subject — the answer
    // KEY must not leak — is unaffected; asserted directly below rather than
    // via a `toEqual` on the whole object, which would break on any future
    // additive, non-secret field the same way this one did.
    const c = mcqForClient(PROBE)!
    expect(c.question).toBe('Which is velocity?')
    expect(c.options).toEqual(['Speed', 'Displacement ÷ time'])
    expect(typeof c.renderId).toBe('string')
    expect(c.renderId.length).toBeGreaterThan(0)
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
    // UPDATED 2026-09-07 (S5): the expression is now guarded by
    // `probeReleasedThisTurnHoisted` so rung 1 removes a released probe from
    // the response AND the snapshot together. The subject of this test — the
    // response serializes the CLIENT PROJECTION, never the raw probe — is
    // unchanged, and is what is asserted here.
    // Typed Turn Contract Batch 4 (2026-09-15, design doc §6 "question-artifact
    // cluster"): `mcqToServeForResponse` was one of six per-site aliases of the
    // same `mcqToServe` call, collapsed into `resolvedQuestionServedFinal`
    // (this site runs in EPOCH B, after the lesson-close override). Old
    // assertion (kept verbatim, no longer matches source):
    //   expect(ROUTE).toContain('mcqForClient(mcqToServeForResponse(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted))')
    expect(ROUTE).toContain('mcqForClient(resolvedQuestionServedFinal)')
    expect(ROUTE).not.toMatch(/mcq: mcqToServeForResponse\(/)
  })

  it('the PERSISTED snapshot still serves the FULL probe (so the next turn can grade)', () => {
    // Persistence must keep correctIndex — gradeMcqAnswer reads it next turn.
    // UPDATED 2026-09-07 (S5): the same value now goes through a `served`
    // local so rung 1 can withhold it. What this test protects is unchanged —
    // when a probe IS persisted it is the FULL probe, key included, because
    // gradeMcqAnswer reads correctIndex from the snapshot next turn.
    // Typed Turn Contract Batch 4 (2026-09-15): `served` is now assigned from
    // `resolvedQuestionServed` (EPOCH A, the persist site's own epoch), the
    // same value the raw `mcqToServe(mcqHoisted, pendingMcqHoisted,
    // mcqGradeHoisted)` call would have produced. Old assertion (kept
    // verbatim, no longer matches source):
    //   expect(ROUTE).toMatch(/const served = mcqToServe\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\)/)
    expect(ROUTE).toMatch(/const served = resolvedQuestionServed$/m)
    // Typed Turn Contract Batch 8 (2026-09-15): reads `resolvedLessonKeyThisTurn`
    // now — see lessonStateIsolationWiring.test.ts for the equivalence proof.
    // Old assertion (kept verbatim, no longer matches source):
    //   expect(ROUTE).toMatch(/releasePending \? null : served,\s*\n\s*lessonKeyThisTurnHoisted,/)
    expect(ROUTE).toMatch(/releasePending \? null : served,\s*\n\s*resolvedLessonKeyThisTurn,/)
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
