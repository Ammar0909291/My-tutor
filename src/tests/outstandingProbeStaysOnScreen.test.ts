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
import { mcqToServe } from '@/lib/teaching/mcq'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const SCREEN = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')

const responseMcq = (a: any, p: any, g: any) => mcqToServe(a, p, g) ?? undefined

const PROBE = { question: 'Which is real?', options: ['a', 'b'], correctIndex: 0 }
const OTHER = { question: 'A new one', options: ['c', 'd'], correctIndex: 1 }

describe('the response carries whatever the server believes is on screen', () => {
  it('echoes a pending, ungraded probe — the deadlock case', () => {
    expect(responseMcq(null, PROBE, null)).toBe(PROBE)
  })

  it('a freshly attached probe still wins over the pending one', () => {
    expect(responseMcq(OTHER, PROBE, null)).toBe(OTHER)
  })

  it('a probe graded THIS turn is not echoed — it is answered, not outstanding', () => {
    expect(responseMcq(null, PROBE, { chosenIndex: 1, correct: false })).toBeUndefined()
  })

  it('nothing pending, nothing attached — the field stays absent', () => {
    expect(responseMcq(null, null, null)).toBeUndefined()
  })

  it('the gate-suppression condition and the echo condition are the same test', () => {
    // If these ever diverge the deadlock returns: the gate would suppress on a
    // state the response does not surface.
    expect(ROUTE).toContain('pendingMcqHoisted !== null && mcqGradeHoisted === null')
    // The response and the persisted snapshot must be the SAME value, or the
    // fix trades one half of the deadlock for the other.
    expect(ROUTE).toContain('mcqToServe(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)')
    expect(ROUTE).toContain('mcqToServeForResponse(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)')
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
