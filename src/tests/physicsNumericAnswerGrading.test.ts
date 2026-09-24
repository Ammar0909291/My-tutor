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

describe('the production cases — a correct typed value is graded correct', () => {
  it.each(['2', 'i think 2 m/s2', 'a = 2 m/s^2', '2 m/s2', 'answer is 2 m/s²'])('N2L: %s', (msg) => {
    expect(N2L.options[N2L.correctIndex]).toMatch(/^2 m\/s²/)
    expect(gradeMcqAnswer(msg, N2L)).toEqual({ chosenIndex: N2L.correctIndex, correct: true })
  })

  it.each(['c = 450', '450', '450 J/(kg·K)', 'i think 450 J/kg K'])('specific heat: %s', (msg) => {
    expect(gradeMcqAnswer(msg, HEAT)).toEqual({ chosenIndex: HEAT.correctIndex, correct: true })
  })

  it.each(['40', '40 V', 'emf = 40 V', 'answer is 40 V i think'])('Faraday: %s', (msg) => {
    expect(gradeMcqAnswer(msg, FARADAY).correct).toBe(true)
  })

  it.each(['24', 'R = 24 ohm', '24 ohms'])('Ohm: %s', (msg) => {
    expect(gradeMcqAnswer(msg, OHM).correct).toBe(true)
  })

  it.each(['19.5', 'about 19.5 degrees'])('Snell: %s', (msg) => {
    expect(gradeMcqAnswer(msg, SNELL).correct).toBe(true)
  })
})

describe('a wrong typed value is still graded wrong — to ITS OWN option', () => {
  it('the multiply-F-by-m value lands on the option that names that misconception', () => {
    const r = gradeMcqAnswer('50 m/s2', N2L)
    expect(r.correct).toBe(false)
    expect(N2L.options[r.chosenIndex!]).toMatch(/^50 m\/s²/)
  })
  it('0.5 m/s2 (two numbers through the unit) resolves to 0.5, not refused and not mis-attributed', () => {
    const r = gradeMcqAnswer('0.5 m/s2', N2L)
    expect(N2L.options[r.chosenIndex!]).toMatch(/^0\.5 m\/s²/)
    expect(r.correct).toBe(false)
  })
  it('"4 V" is the 4.0 V option, never the 1600 V one', () => {
    const r = resolveMcqChoice('4 V', FARADAY)
    expect(FARADAY.options[r!]).toMatch(/^4\.0 V/)
  })
  it('c = 900 is the 900 option', () => {
    expect(HEAT.options[resolveMcqChoice('c = 900', HEAT)!]).toMatch(/^900/)
  })
})

describe('the refusals and readings that must not move', () => {
  it('a worked reply naming several numbers still refuses', () => {
    const torque: TutorMCQ = { question: 'q', options: ['zero point five newton-metres', 'five newton-metres', 'ten newton-metres', 'twenty newton-metres'], correctIndex: 1 }
    expect(resolveMcqChoice('5, because 10 times 0.5', torque)).toBeNull()
    expect(resolveMcqChoice('5', torque)).toBe(1)
  })
  it('an explicit position still names a position against quantity options', () => {
    expect(resolveMcqChoice('option 2', N2L)).toBe(1)
    expect(resolveMcqChoice('the second one', N2L)).toBe(1)
  })
  it('word options keep the bare-digit-as-position reading', () => {
    const words: TutorMCQ = { question: 'q', options: ['Its mass is bigger', 'Heavy things need more force', 'The push gets used up'], correctIndex: 0 }
    expect(resolveMcqChoice('2', words)).toBe(1)
  })
  it('a plain option letter is still a letter', () => {
    expect(resolveMcqChoice('c', N2L)).toBe(2)
    expect(resolveMcqChoice('I think C', HEAT)).toBe(2)
  })
  it('a value two options share is refused, not guessed', () => {
    const sameLead: TutorMCQ = { question: 'q', options: ['5 m east', '11 m east', '5 m west'], correctIndex: 0 }
    expect(resolveMcqChoice('5', sameLead)).toBeNull()
  })
  it('glued symbols that ARE the answer still resolve (sp², cos30°)', () => {
    const hyb: TutorMCQ = { question: 'q', options: ['sp² — 3 electron domains', 'sp³ — carbon always uses four'], correctIndex: 0 }
    expect(resolveMcqChoice('sp²', hyb)).toBe(0)
    const incline: TutorMCQ = { question: 'q', options: ['f = μ mg cos30° — using the normal force', 'f = μ mg — using the full weight'], correctIndex: 0 }
    expect(resolveMcqChoice('f = μ mg cos30°', incline)).toBe(0)
  })
  it('every verbatim tap of every option of these probes resolves to itself', () => {
    for (const q of [N2L, HEAT, FARADAY, OHM, SNELL]) q.options.forEach((o, i) => expect(resolveMcqChoice(o, q)).toBe(i))
  })
})

describe('rule 3b — the answer half of an authored "<answer> — <why>" option', () => {
  it('the production wrong answer "Toward the normal" is now GRADED — as wrong, so it can be corrected', () => {
    const r = gradeMcqAnswer('Toward the normal', WATER_TO_AIR)
    expect(r.correct).toBe(false)
    expect(WATER_TO_AIR.options[r.chosenIndex!]).toMatch(/^Toward the normal/)
  })
  it('the terse production answers resolve to the option they name', () => {
    expect(gradeMcqAnswer('The car', CAR_CYCLIST).correct).toBe(false)
    expect(gradeMcqAnswer('The cyclist', CAR_CYCLIST).correct).toBe(true)
    expect(gradeMcqAnswer('i think the cyclist', CAR_CYCLIST).correct).toBe(true)
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

