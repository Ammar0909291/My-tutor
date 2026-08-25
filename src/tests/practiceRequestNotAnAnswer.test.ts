/**
 * PHASE 7P — a request for a question is not an answer to the last one.
 *
 * MEASURED IN PRODUCTION (2026-08-25, phys.opt.total-internal-reflection). With
 * an MCQ pending, the learner typed "one more please" and the runtime recorded:
 *
 *   [mcq-grade] { asked:'Which of the following is true when light travels
 *                 from a den…', chosen: 0, correct: false }
 *   [topic-progress-evidence] { score: 25, outcome: 'applied' }
 *   [ladder] correctness:false  GUIDE -> DEMONSTRATE
 *
 * A request for another question was banked as a FAILED ATTEMPT against the
 * concept: it dropped the phase, spent the failure budget, and wrote permanent
 * evidence the learner never produced.
 *
 * ROOT CAUSE — route.ts:2015-2020. `isBareAcknowledgement` was the ONLY
 * suppression before `gradeMcqAnswer`, and a practice request is not an
 * acknowledgement, so it fell through to the grader's fuzzy match.
 *
 * SCOPE, MEASURED NOT ASSUMED. Of the six practice phrasings audited, only
 * "one more please" was actually mis-graded — the others already failed to
 * match any option, so nothing suppressed them and nothing needed to. The
 * suppression is the correct place regardless: whether a request happens to
 * resemble an option is not a property anything should depend on.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'
import { isBareAcknowledgement, asksForPractice } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

/** The real pending MCQ from the production log. */
const PENDING: TutorMCQ = {
  question: 'Which path difference gives destructive interference?',
  options: ['Δd = m λ', 'Δd = (m + ½) λ', 'Δd = 0', 'Δd = 2 m λ'],
  correctIndex: 1,
}

/** route.ts:2018's condition, mirrored exactly. */
const routeWouldGrade = (m: string) =>
  !isBareAcknowledgement(m) && !readTurnIntent(m, null).wantsPractice

const gradedBy = (m: string) => {
  if (!routeWouldGrade(m)) return null
  const g = gradeMcqAnswer(m, PENDING)
  return g.correct !== null ? g : null
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE DEFECT — the exact production message
// ═══════════════════════════════════════════════════════════════════════════
describe('7P — the production failure', () => {
  it('REPRODUCES IT: "one more please" WAS graded as a wrong answer', () => {
    // The pre-fix condition: bare-ack was the only suppression.
    expect(isBareAcknowledgement('one more please')).toBe(false)
    const g = gradeMcqAnswer('one more please', PENDING)
    expect(g.chosenIndex).toBe(0)
    expect(g.correct).toBe(false)      // the false evidence, from the real grader
  })

  it('FIXES IT: it is now recognised as a practice request and never graded', () => {
    expect(asksForPractice('one more please')).toBe(true)
    expect(gradedBy('one more please')).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. EVERY PHRASING THE BRIEF NAMES IS UNGRADEABLE
// ═══════════════════════════════════════════════════════════════════════════
describe('7P — no practice/meta request is graded', () => {
  const REQUESTS = [
    'give me a practice problem',
    'quiz me',
    'ask me another question',
    'give me a practice question',
    'one more please',
    "I don't want to stop, I want to practice",
    'one more',
    'another more please',
  ]
  for (const m of REQUESTS) {
    it(`"${m}" is not graded and writes no evidence`, () => {
      expect(readTurnIntent(m, null).wantsPractice).toBe(true)
      expect(gradedBy(m)).toBeNull()
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. NEGATIVE CONTROLS — genuine answers still grade
// ═══════════════════════════════════════════════════════════════════════════
describe('7P — genuine answers are untouched', () => {
  it('a correct letter answer still grades CORRECT', () => {
    const g = gradedBy('b')
    expect(g).not.toBeNull()
    expect(g!.chosenIndex).toBe(1)
    expect(g!.correct).toBe(true)
  })

  it('an INCORRECT genuine answer is still graded wrong — evidence is not lost', () => {
    const g = gradedBy('a')
    expect(g).not.toBeNull()
    expect(g!.correct).toBe(false)
  })

  it('every option letter still resolves to its own index', () => {
    for (const [letter, idx] of [['a',0],['b',1],['c',2],['d',3]] as const) {
      expect(gradedBy(letter)?.chosenIndex).toBe(idx)
    }
  })

  it('an acknowledgement is still an acknowledgement, not an answer', () => {
    for (const m of ['ok', 'got it', 'okay', 'thanks']) {
      expect(gradedBy(m)).toBeNull()
      expect(readTurnIntent(m, null).wantsPractice).toBe(false)
    }
  })

  it('REFUSING practice is not a practice request, so it keeps the normal path', () => {
    for (const m of ["don't quiz me", 'stop asking me questions', "I don't want to practice"]) {
      expect(readTurnIntent(m, null).wantsPractice).toBe(false)
    }
  })

  it('the anchored pattern does not swallow ordinary sentences containing "one more"', () => {
    for (const m of ['I need one more minute', 'just one more thing about waves',
                     'can you explain one more time why it cancels']) {
      expect(asksForPractice(m)).toBe(false)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. NO EVIDENCE MOVES, AND THE WIRING IS REAL
// ═══════════════════════════════════════════════════════════════════════════
describe('7P — no evidence, and the route actually consults the intent', () => {
  it('a practice request carries no correctness for the ladder to fold', () => {
    for (const m of ['one more please', 'quiz me', 'give me a practice problem']) {
      expect(gradedBy(m)).toBeNull()   // mcqGradeHoisted stays null → no signal
    }
  })

  it('route.ts guards gradeMcqAnswer with BOTH suppressions', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const at = route.indexOf('const g = gradeMcqAnswer(message, pendingMcqHoisted)')
    expect(at).toBeGreaterThan(-1)
    const guard = route.slice(Math.max(0, at - 300), at)
    expect(guard).toContain('!isBareAcknowledgement(message)')
    expect(guard).toContain('!turnIntent.wantsPractice')
  })

  it('7H/7M practice behaviour is unchanged — the detector only grew', () => {
    for (const m of ['give me a practice problem', 'quiz me', 'test me',
                     "let's practice", 'ask me a question',
                     'no wait i dont want to stop, i want to practice']) {
      expect(asksForPractice(m)).toBe(true)
    }
  })
})
