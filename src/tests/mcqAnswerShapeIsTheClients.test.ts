/**
 * WHAT A LEARNER ACTUALLY SENDS WHEN THEY ANSWER AN MCQ.
 *
 * This test exists because a QA harness — not the product — produced two wrong
 * verdicts about D1, and the same trap is available to the next one.
 *
 * ── THE TRAP ────────────────────────────────────────────────────────────────
 * The harness answered MCQs with `"A sir"` (an option LETTER plus the persona's
 * honorific). `gradeMcqAnswer` refuses that — correctly, and identically for an
 * authored probe and a model-generated one:
 *
 *     gradeMcqAnswer('A sir',  authored) -> { chosenIndex: null, correct: null }
 *     gradeMcqAnswer('A sir',  model)    -> { chosenIndex: null, correct: null }
 *     gradeMcqAnswer('A',      authored) -> { chosenIndex: 0,    correct: true }
 *
 * With `correct: null` the route never sets `mcqGradeHoisted`, so
 * `recordMcqAsked` never runs and no probe is ever SPENT. The gate then
 * legitimately offered the same probe again, and the harness reported
 * "the same authored question served five times — D1 not fixed".
 *
 * The product was behaving correctly the whole time. Re-run with the real
 * client's payload and the same lesson served THREE DISTINCT authored probes
 * (assetIds 0c6f384c-…, 182becc3-…, 0e0e5ef4-…), with all three written to
 * `teachingHistory.mcqAsked` with their authoring labels stripped.
 *
 * ── THE REAL PAYLOAD ────────────────────────────────────────────────────────
 * `LessonScreen.tsx`'s option button calls `sendMessage(sessionId, option)` —
 * the full option TEXT. Not a letter, not a letter plus anything.
 *
 * This file pins both halves so the next harness cannot repeat the mistake:
 * the client's payload shape, and the grader's honest refusal of a shape the
 * client never sends.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { gradeMcqAnswer } from '@/lib/teaching/mcq'
import { probeToMcq } from '@/lib/teaching/gateAssessment'

const SCREEN = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

/** The real production probe that exposed D1 (probe_assets 0c6f384c-…). */
const AUTHORED = probeToMcq({
  stem: 'DIAGNOSTIC (Prerequisite PD-1/PD-2): Is the normal force on a frictionless ramp '
    + 'a constraint force? A particle moves in a circle of radius R — express its velocity '
    + 'in terms of θ and θ̇.',
  choices: [
    { text: 'Yes, N is a constraint force (perpendicular to motion, does zero work); v = Rθ̇', isCorrect: true },
    { text: 'No, N does work on the particle; v = R+θ̇', isCorrect: false },
  ],
})!

const MODEL = {
  question: 'Which statement best describes a generalized coordinate?',
  options: [
    'Any independent variable that fixes the configuration',
    'A Cartesian x, y, z measured in metres',
    'A constraint force',
    'A velocity',
  ],
  correctIndex: 0,
}

describe('the client sends the option TEXT', () => {
  it('the MCQ button posts the option itself, not a letter', () => {
    expect(SCREEN).toMatch(/void sendMessage\(sessionId, option\)/)
  })

  it('and clears the question before sending, so one tap is one answer', () => {
    const at = SCREEN.indexOf('void sendMessage(sessionId, option)')
    expect(at).toBeGreaterThan(0)
    expect(SCREEN.slice(at - 400, at)).toMatch(/setActiveMcq\(null\)/)
  })
})

describe('the option text grades, for authored and model questions alike', () => {
  it('grades the authored probe from its own option text', () => {
    expect(gradeMcqAnswer(AUTHORED.options[AUTHORED.correctIndex], AUTHORED))
      .toEqual({ chosenIndex: 0, correct: true })
    expect(gradeMcqAnswer(AUTHORED.options[1], AUTHORED))
      .toEqual({ chosenIndex: 1, correct: false })
  })

  it('grades a model question from its own option text', () => {
    expect(gradeMcqAnswer(MODEL.options[0], MODEL)).toEqual({ chosenIndex: 0, correct: true })
    expect(gradeMcqAnswer(MODEL.options[2], MODEL)).toEqual({ chosenIndex: 2, correct: false })
  })

  it('a bare letter also grades — the typed shortcut a learner may use', () => {
    expect(gradeMcqAnswer('A', AUTHORED)).toEqual({ chosenIndex: 0, correct: true })
    expect(gradeMcqAnswer('A', MODEL)).toEqual({ chosenIndex: 0, correct: true })
  })
})

describe('the shape that fooled the harness is refused, and refused evenly', () => {
  it('"A sir" is ungradeable for BOTH kinds of question', () => {
    // Evenly is the point: a harness seeing this fail only for authored probes
    // would have concluded, again, that authored probes are special.
    expect(gradeMcqAnswer('A sir', AUTHORED)).toEqual({ chosenIndex: null, correct: null })
    expect(gradeMcqAnswer('A sir', MODEL)).toEqual({ chosenIndex: null, correct: null })
  })

  it('an ungradeable answer yields correct === null, which spends no probe', () => {
    // route.ts only sets mcqGradeHoisted when `g.correct !== null`, and only a
    // set grade reaches recordMcqAsked. This is the whole causal chain that
    // made an unspent probe look like a re-serving defect.
    for (const junk of ['A sir', 'a sir', 'hmm A maybe', 'ok sir']) {
      expect(gradeMcqAnswer(junk, AUTHORED).correct).toBeNull()
    }
  })

  it('the route still gates the ledger write on a real grade', () => {
    const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(ROUTE).toMatch(/if \(g\.correct !== null\) mcqGradeHoisted = g/)
    expect(ROUTE).toMatch(/if \(pendingMcqHoisted\?\.question && mcqGradeHoisted\) \{/)
  })
})
