/**
 * A TYPED PHYSICS VALUE IS A VALUE — NOT AN OPTION POSITION, NOT AN OPTION LETTER.
 *
 * ── THE MEASURED DEFECT (2026-09-24) ───────────────────────────────────────
 * Found by the physics production QA harness (a learner typing the answer the
 * way people type physics) and confirmed against the real `resolveMcqChoice`
 * on the real authored options:
 *
 *   options "2 m/s²" | "50 m/s² — multiply…" | "0.5 m/s² — divide…" | "15 m/s²"
 *     "2"               -> index 1 ("50 m/s²")   correct answer graded WRONG
 *     "i think 2 m/s2"  -> index 1               and tagged with the
 *     "a = 2 m/s^2"     -> index 1               multiply-F-by-m misconception
 *   options "450 J kg⁻¹ K⁻¹" | "900 …" | "180 …" | "720 000 …"
 *     "c = 450"         -> index 2 ("180")       correct answer graded WRONG
 *
 * Two causes: a bare digit was read as an ORDINAL ("2" = the second option)
 * before the value rule ever ran, and a quantity symbol before "=" (a, c, d
 * are also option letters) was read as an option LETTER.
 *
 * ── WHAT THIS PINS ─────────────────────────────────────────────────────────
 *  - every production case above now resolves to the option the learner meant;
 *  - wrong values still resolve to their own (wrong) option, so a wrong answer
 *    is still graded wrong;
 *  - the refusals the module promises are kept (ambiguity -> null, a worked
 *    reply naming several numbers -> null);
 *  - word options keep the digit-as-position reading; "option 2" still names a
 *    position even against quantity options.
 * The options are the real authored ones, read from the corpus, not copies.
 */
import { describe, it, expect } from 'vitest'
import { resolveMcqChoice, gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { PHYSICS_BAND_GAP_PROBES } from '@/lib/teaching/assets/physicsBandGapAssets'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'

const CORPUS = [...AUTHORED_PROBES, ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES]
function authored(conceptId: string, stemStart: string): TutorMCQ {
  const p = CORPUS.find((x) => x.conceptId === conceptId && x.stem.startsWith(stemStart))
  if (!p?.choices) throw new Error(`probe not found: ${conceptId} / ${stemStart}`)
  return { question: p.stem, options: p.choices.map((c) => c.text), correctIndex: p.choices.findIndex((c) => c.isCorrect) }
}

const N2L = authored('phys.mech.newtons-second-law', 'A 5 kg box is pushed along a smooth floor')
const HEAT = authored('phys.therm.specific-heat', 'A 2.0 kg block of metal absorbs 18 000 J')
const FARADAY = authored('phys.em.faradays-law', 'A coil of 200 turns')
const OHM = authored('phys.em.ohms-law', 'A resistor carries a current of 0.25 A')
const SNELL = authored('phys.opt.refraction', 'Light travelling in air meets a glass surface')
const WATER_TO_AIR = authored('phys.opt.refraction', 'PRACTICE: Light travels from water')
const CAR_CYCLIST = authored('phys.mech.newtons-second-law', 'A 1500 kg car and a 60 kg cyclist')
const SPECIFIC_HEAT_YN = authored('phys.therm.specific-heat', 'Exactly 50 kJ of heat')

// Choice-only grading (2026-09-28, owner-approved spec GB+): BEFORE, a typed
// value / equation / answer half was graded by inference (rules 3b and 5);
// AFTER, only a tap, the exact option text (existing normalization, which folds
// number words, superscripts and grouped digits) or an explicit letter grades.
// The inference rules also credited 28 of 478 scripted misconception sentences
// as CORRECT; these forms are the accepted false-negative cost (R2 values,
// R3 answer halves, R1 positions). Each old expectation is kept below as a
// refusal so the cost stays visible.
describe('typed values: the option text grades; anything else is refused', () => {
  it.each(['2 m/s2'])('N2L graded: %s', (msg) => {
    expect(N2L.options[N2L.correctIndex]).toMatch(/^2 m\/s²/)
    expect(gradeMcqAnswer(msg, N2L)).toEqual({ chosenIndex: N2L.correctIndex, correct: true })
  })
  it.each(['40 V'])('Faraday graded: %s', (msg) => expect(gradeMcqAnswer(msg, FARADAY).correct).toBe(true))
  it.each(['24'])('Ohm graded: %s', (msg) => expect(gradeMcqAnswer(msg, OHM).correct).toBe(true))
  it.each([
    ['N2L', '2'], ['N2L', 'i think 2 m/s2'], ['N2L', 'a = 2 m/s^2'], ['N2L', 'answer is 2 m/s²'],
    ['HEAT', 'c = 450'], ['HEAT', '450'], ['HEAT', '450 J/(kg·K)'], ['HEAT', 'i think 450 J/kg K'],
    ['FARADAY', '40'], ['FARADAY', 'emf = 40 V'], ['FARADAY', 'answer is 40 V i think'],
    ['OHM', 'R = 24 ohm'], ['OHM', '24 ohms'],
    ['SNELL', '19.5'], ['SNELL', 'about 19.5 degrees'],
    ['N2L', '50 m/s2'], ['N2L', '0.5 m/s2'], ['FARADAY', '4 V'], ['HEAT', 'c = 900'],
  ] as const)('%s refused (value / equation, not the option text): %s', (q, msg) => {
    const mcq = { N2L, HEAT, FARADAY, OHM, SNELL }[q]
    expect(gradeMcqAnswer(msg, mcq)).toEqual({ chosenIndex: null, correct: null })
  })
  it('the explicit letter for the same answer grades', () => {
    expect(gradeMcqAnswer('ABCD'[N2L.correctIndex], N2L)).toEqual({ chosenIndex: N2L.correctIndex, correct: true })
    expect(gradeMcqAnswer(`${'ABCD'[HEAT.correctIndex]} because 18000 / (2 × 20)`, HEAT)).toEqual({ chosenIndex: HEAT.correctIndex, correct: true })
  })
})

describe('the refusals and readings that must not move', () => {
  it('a worked reply naming several numbers still refuses, and so does a bare value now', () => {
    const torque: TutorMCQ = { question: 'q', options: ['zero point five newton-metres', 'five newton-metres', 'ten newton-metres', 'twenty newton-metres'], correctIndex: 1 }
    expect(resolveMcqChoice('5, because 10 times 0.5', torque)).toBeNull()
    expect(resolveMcqChoice('5', torque)).toBeNull()
  })
  it('positions by number or ordinal are refused (R1)', () => {
    expect(resolveMcqChoice('option 2', N2L)).toBeNull()
    expect(resolveMcqChoice('the second one', N2L)).toBeNull()
    const words: TutorMCQ = { question: 'q', options: ['Its mass is bigger', 'Heavy things need more force', 'The push gets used up'], correctIndex: 0 }
    expect(resolveMcqChoice('2', words)).toBeNull()
  })
  it('a plain option letter is still a letter', () => {
    expect(resolveMcqChoice('c', N2L)).toBe(2)
    expect(resolveMcqChoice('I think C', HEAT)).toBe(2)
  })
  it('a value two options share is refused, not guessed', () => {
    const sameLead: TutorMCQ = { question: 'q', options: ['5 m east', '11 m east', '5 m west'], correctIndex: 0 }
    expect(resolveMcqChoice('5', sameLead)).toBeNull()
  })
  it('the answer half of a symbol option is refused (R3); its full text and letter grade', () => {
    const hyb: TutorMCQ = { question: 'q', options: ['sp² — 3 electron domains', 'sp³ — carbon always uses four'], correctIndex: 0 }
    expect(resolveMcqChoice('sp²', hyb)).toBeNull()
    expect(resolveMcqChoice('sp² — 3 electron domains', hyb)).toBe(0)
    expect(resolveMcqChoice('A', hyb)).toBe(0)
    const incline: TutorMCQ = { question: 'q', options: ['f = μ mg cos30° — using the normal force', 'f = μ mg — using the full weight'], correctIndex: 0 }
    expect(resolveMcqChoice('f = μ mg cos30°', incline)).toBeNull()
  })
  it('every verbatim tap of every option of these probes resolves to itself', () => {
    for (const q of [N2L, HEAT, FARADAY, OHM, SNELL]) q.options.forEach((o, i) => expect(resolveMcqChoice(o, q)).toBe(i))
  })
})

describe('answer halves of authored "<answer> — <why>" options are refused (R3)', () => {
  it('"Toward the normal" is refused; the letter form is graded wrong so it can be corrected', () => {
    expect(gradeMcqAnswer('Toward the normal', WATER_TO_AIR)).toEqual({ chosenIndex: null, correct: null })
    const i = WATER_TO_AIR.options.findIndex((o) => /^Toward the normal/.test(o))
    const r = gradeMcqAnswer('ABCD'[i], WATER_TO_AIR)
    expect(r).toEqual({ chosenIndex: i, correct: false })
  })
  it('terse answer halves are refused', () => {
    for (const m of ['The car', 'The cyclist', 'i think the cyclist']) expect(gradeMcqAnswer(m, CAR_CYCLIST).chosenIndex).toBeNull()
  })
  it('a yes/no answer half is NEVER matched — a bare "no" may be a reply to the tutor\'s check-in', () => {
    expect(resolveMcqChoice('No', SPECIFIC_HEAT_YN)).toBeNull()
    expect(resolveMcqChoice('yes', SPECIFIC_HEAT_YN)).toBeNull()
  })
  it('a question naming an answer half is still not an answer', () => {
    expect(resolveMcqChoice('toward the normal?', WATER_TO_AIR)).toBeNull()
  })
  it('a hedge naming an answer half is still not an answer', () => {
    expect(resolveMcqChoice('not sure, toward the normal', WATER_TO_AIR)).toBeNull()
  })
})

