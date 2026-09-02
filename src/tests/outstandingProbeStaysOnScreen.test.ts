/**
 * AN OUTSTANDING PROBE MUST STAY ON THE LEARNER'S SCREEN.
 *
 * Two facts that are individually reasonable and together deadlock a lesson:
 *
 *   1. chat/route.ts suppresses the mastery gate while a probe is pending and
 *      ungraded (`unansweredProbeOnScreen`), so `findBestProbe` cannot swap a
 *      DIFFERENT question in underneath the learner. Its comment states the
 *      assumption that makes this safe: "the widget keeps rendering it from
 *      `pendingMcq`".
 *   2. LessonScreen sets `activeMcq` from `data.mcq` and has a bare
 *      `else setActiveMcq(null)`. A response that omits the field ERASES the
 *      question from the screen.
 *
 * So the server withholds every new probe because it believes one is on
 * display, while the learner is looking at none — and cannot produce the grade
 * that would release the gate.
 *
 * Measured on the 60-concept physics run (2026-08-30): across the five sessions
 * that stalled at GUIDE, keyed-probe attachment after the first wrong answer
 * was 0 of 21 turns, against 233/425 (55%) in every other session. Their own
 * phase mix predicted 23.6 probes; they got 7.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { mcqToServe, mcqForClient } from '@/lib/teaching/mcq'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const SCREEN = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')

// The learner-facing response is the client projection of what the server serves
// (mcqForClient strips the answer key; see mcqAnswerKeyNotLeaked.test.ts). The
// deadlock invariant this file guards is about PRESENCE and the question shown,
// not the key: a probe is echoed exactly when the server counts one displayed.
const responseMcq = (a: any, p: any, g: any) => mcqForClient(mcqToServe(a, p, g)) ?? undefined

const PROBE = { question: 'Which is real?', options: ['a', 'b'], correctIndex: 0 }
const OTHER = { question: 'A new one', options: ['c', 'd'], correctIndex: 1 }

describe('the response carries whatever the server believes is on screen', () => {
  it('echoes a pending, ungraded probe — the deadlock case (question preserved, key stripped)', () => {
    expect(responseMcq(null, PROBE, null)).toEqual({ question: PROBE.question, options: PROBE.options })
  })

  it('a freshly attached probe still wins over the pending one', () => {
    expect(responseMcq(OTHER, PROBE, null)).toEqual({ question: OTHER.question, options: OTHER.options })
  })

  it('a probe graded THIS turn is not echoed — it is answered, not outstanding', () => {
    expect(responseMcq(null, PROBE, { chosenIndex: 1, correct: false })).toBeUndefined()
  })

  it('nothing pending, nothing attached — the field stays absent', () => {
    expect(responseMcq(null, null, null)).toBeUndefined()
  })

  it('presence parity holds: the projection is non-null exactly when the served probe is', () => {
    // The deadlock returns only if the response could omit a probe the server
    // counts as displayed. mcqForClient preserves presence (null in -> null out),
    // so parity with the persisted snapshot is unchanged.
    expect(mcqForClient(mcqToServe(null, PROBE, null)) === null)
      .toBe(mcqToServe(null, PROBE, null) === null)
    expect(mcqForClient(mcqToServe(null, null, null)) === null)
      .toBe(mcqToServe(null, null, null) === null)
  })

  it('the gate-suppression condition and the echo condition are the same test', () => {
    // If these ever diverge the deadlock returns: the gate would suppress on a
    // state the response does not surface.
    expect(ROUTE).toContain('pendingMcqHoisted !== null && mcqGradeHoisted === null')
    // The response and the persisted snapshot serve the SAME probe (same
    // presence + question/options); the response additionally projects it for the
    // client via mcqForClient, which strips only the key.
    expect(ROUTE).toContain('mcqToServe(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)')
    expect(ROUTE).toContain('mcqForClient(mcqToServeForResponse(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted))')
  })

  it('the client still clears on absence — which is why the echo is required', () => {
    // Not a bug on its own: "render exactly what the server sent" is the right
    // client contract. It is only a deadlock when the server omits a probe it
    // is simultaneously counting as displayed. If this ever stops being true,
    // the echo above is belt-and-braces rather than load-bearing.
    expect(SCREEN).toMatch(/setActiveMcq\(null\)/)
    expect(SCREEN).toMatch(/const rawMcq = data\.mcq/)
  })
})
