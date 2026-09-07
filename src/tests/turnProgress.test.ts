/**
 * S3 — the supervisor, plus the four NEGATIVE CONTROLS that matter more than
 * the positive ones. A liveness layer that fires on a healthy lesson is worse
 * than the stall it replaces, so those come first.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  classifyTurn, foldStagnation, escalationRung,
  shouldReleasePendingProbe, diagnosticMayConclude, shouldComposeDeterministically,
  RUNG_1_AT, type TurnProgressInputs,
} from '@/lib/teaching/turnProgress'

const NOTHING: TurnProgressInputs = {
  phaseChanged: false, masteryCounterMoved: false, serverGradeRecorded: false,
  freshProbeAttached: false, distinctTeachingDelivered: false,
  learnerRequestHonoured: false, knowledgeGapOpened: false,
  degradedTurn: false, recoveryFired: false, excursionActive: false,
  firstLessonActive: false,
}
const run = (turns: TurnProgressInputs[]) =>
  turns.reduce((n, t) => foldStagnation(n, classifyTurn(t)), 0)

describe('NEGATIVE CONTROLS — the supervisor must stay silent on healthy lessons', () => {
  it('a learner answering correctly never escalates', () => {
    const good = { ...NOTHING, serverGradeRecorded: true, masteryCounterMoved: true }
    expect(escalationRung(run(Array(10).fill(good)))).toBe(0)
  })

  it('four clarifying requests in a row never escalate', () => {
    // "explain it simpler", "another example", "show me a diagram", "again"
    const asked = { ...NOTHING, learnerRequestHonoured: true, distinctTeachingDelivered: true }
    expect(escalationRung(run(Array(4).fill(asked)))).toBe(0)
  })

  it('a provider outage never escalates — an outage is not a stall', () => {
    const down = { ...NOTHING, degradedTurn: true }
    expect(escalationRung(run(Array(6).fill(down)))).toBe(0)
  })

  it('an excursion never escalates — paused is not stuck', () => {
    const detour = { ...NOTHING, excursionActive: true }
    expect(escalationRung(run(Array(6).fill(detour)))).toBe(0)
  })

  it('recovery never escalates — it has its own protocol and pacing', () => {
    expect(escalationRung(run(Array(6).fill({ ...NOTHING, recoveryFired: true })))).toBe(0)
  })

  it('lesson one never escalates — it runs under its own hard limits', () => {
    expect(escalationRung(run(Array(6).fill({ ...NOTHING, firstLessonActive: true })))).toBe(0)
  })

  it('an outage in the MIDDLE of a stall neither buys a fresh budget nor advances it', () => {
    const stall = { ...NOTHING }
    const down = { ...NOTHING, degradedTurn: true }
    // stall, stall, OUTAGE, stall  ->  three unproductive turns, not four, and
    // the outage did not reset the two already banked.
    expect(run([stall, stall, down, stall])).toBe(3)
  })

  it('a wrong graded answer is PROGRESS — evidence, not failure', () => {
    const wrong = { ...NOTHING, serverGradeRecorded: true }
    expect(classifyTurn(wrong)).toBe('productive')
  })

  it('teaching that REPEATS the previous turn is not progress', () => {
    // distinctTeachingDelivered is false when the text repeats: repetition is
    // the symptom, so it must never reset the counter.
    expect(classifyTurn({ ...NOTHING, distinctTeachingDelivered: false })).toBe('unproductive')
  })
})

describe('POSITIVE — the stall is detected and the rungs come in order', () => {
  it('nothing happening N turns running escalates, in order', () => {
    expect(escalationRung(0)).toBe(0)
    expect(escalationRung(1)).toBe(0)
    expect(escalationRung(2)).toBe(1)
    expect(escalationRung(3)).toBe(2)
    expect(escalationRung(4)).toBe(3)
    expect(escalationRung(99)).toBe(3)
  })

  it('the L1 shape — probe on screen, ungradeable answers — reaches rung 1 then 3', () => {
    const typed = { ...NOTHING }   // no grade, no fresh probe, same question
    expect(escalationRung(run(Array(RUNG_1_AT).fill(typed)))).toBe(1)
    expect(shouldReleasePendingProbe(escalationRung(run(Array(2).fill(typed))))).toBe(true)
    expect(diagnosticMayConclude(escalationRung(run(Array(3).fill(typed))))).toBe(true)
    expect(shouldComposeDeterministically(escalationRung(run(Array(4).fill(typed))))).toBe(true)
  })

  it('one productive turn resets the whole streak', () => {
    const stall = { ...NOTHING }
    const win = { ...NOTHING, serverGradeRecorded: true }
    expect(run([stall, stall, stall, win])).toBe(0)
    expect(escalationRung(run([stall, stall, stall, win]))).toBe(0)
  })

  it('a corrupt stored counter reads as zero — the safe direction', () => {
    for (const bad of [-5, NaN, Infinity, 'many', null, undefined, {}]) {
      expect(foldStagnation(bad, 'unproductive')).toBe(1)
    }
  })
})

describe('STRUCTURAL — the four constraints that stop this becoming a 2nd state machine', () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/teaching/turnProgress.ts'), 'utf8')
  // Comments cite the machinery this module must not touch (that is the point
  // of the comments); the constraints are about CODE. Same split for C2 and C4.
  const code = src.split('\n')
    .filter((l) => !l.trim().startsWith('*') && !l.trim().startsWith('//') && !l.trim().startsWith('/*'))
    .join('\n')

  it('C1/C3 — it is pure: no imports at all, so no db, no phase, no evidence', () => {
    expect(src).not.toMatch(/^import /m)
  })

  it('C2 — it never names a phase, so it cannot assign one', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']) {
      expect(code).not.toContain(phase)
    }
  })

  it('C3 — it writes nothing: no prisma, no fetch, no console', () => {
    expect(code).not.toMatch(/prisma|fetch\(|console\./)
  })

  it('C4 — it exposes no way to grade, advance, or discard', () => {
    expect(code).not.toMatch(/correctIndex|gradeMcq|recordMcqAsked|masteryVerified/)
  })
})

describe('S6 — repetition is not progress (the weak-acid shape)', () => {
  it('a tutor repeating itself accrues stagnation; a tutor teaching new material does not', () => {
    const repeating = { ...NOTHING, distinctTeachingDelivered: false }
    const teaching = { ...NOTHING, distinctTeachingDelivered: true }
    // Measured through the real route: a model that answers with the SAME
    // sentence every turn kept `distinctTeachingDelivered` true when it was
    // wired to "text is non-empty", so a lesson frozen at GUIDE with
    // correctAtCheck 0 reported stagnantTurns 0 forever and no rung could fire.
    expect(escalationRung(run(Array(4).fill(repeating)))).toBe(3)
    expect(escalationRung(run(Array(9).fill(teaching)))).toBe(0)
  })
})
