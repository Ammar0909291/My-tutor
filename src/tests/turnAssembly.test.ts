/**
 * Turn assembly, Phase 1 (owner G2 2026-10-02, shadow only).
 * Spec: docs/architecture/TURN_ASSEMBLY_PHASE1_SPEC.md §3–§5, §8.
 * Failing texts are real production drafts from the 2026-10-02 baseline.
 */
import { describe, it, expect } from 'vitest'
import {
  turnAssemblyMode, shadowSampled, buildSlotSystemPrompt, parseSlots, validateSlots,
  usableSlots, assembleGradedTurn, optionsFromHistory, turnChecks, type GradedTurnFacts,
} from '@/lib/teaching/turnAssembly'

const RIGHT: GradedTurnFacts = {
  question: 'Convert 0.025 kg to milligrams.',
  options: ['25 mg', '25,000 mg'],
  chosenIndex: 1, correctIndex: 1, correct: true,
  rationales: ['', 'multiply by 1000 twice: kg to g, then g to mg'],
  conceptTitle: 'Physical Quantities and SI Units',
  earlierOptions: ['25.0 dm³', '250 000 dm³', '0.250 dm³', '2.50 dm³'],
}
const WRONG: GradedTurnFacts = { ...RIGHT, chosenIndex: 0, correct: false, rationales: ['just moving the decimal three places converts only one step', 'multiply by 1000 twice'] }

const GOOD = 'A kilogram is 1000 grams and a gram is 1000 milligrams, so the factor is a million in total.'

describe('mode and sampling', () => {
  it('off unless TURN_ASSEMBLY_MODE is shadow or serve', () => {
    expect(turnAssemblyMode({})).toBe('off')
    expect(turnAssemblyMode({ TURN_ASSEMBLY_MODE: 'SHADOW' })).toBe('shadow')
    expect(turnAssemblyMode({ TURN_ASSEMBLY_MODE: 'yes' })).toBe('off')
  })
  it('sample rate defaults to 1 and 0 disables', () => {
    expect(shadowSampled({}, 0.99)).toBe(true)
    expect(shadowSampled({ TURN_ASSEMBLY_SHADOW_RATE: '0' }, 0)).toBe(false)
    expect(shadowSampled({ TURN_ASSEMBLY_SHADOW_RATE: '0.25' }, 0.3)).toBe(false)
  })
})

describe('the slot prompt', () => {
  it('carries the grade facts and never a next card', () => {
    const p = buildSlotSystemPrompt(RIGHT)
    expect(p).toContain('The learner chose: 25,000 mg')
    expect(p).toContain('Verdict (decided by the server, do not repeat it): RIGHT')
    expect(p).toMatch(/question mark/)
  })
})

describe('V1 parse', () => {
  it('accepts the agreed JSON, with or without a fence', () => {
    expect(parseSlots('```json\n{"feedback":"x y","teaching":null}\n```')).toEqual({ feedback: 'x y', teaching: null })
  })
  it('rejects prose, extra keys and wrong types', () => {
    expect(parseSlots("That's right. How did you arrive at 2.50 dm³?")).toBeNull()
    expect(parseSlots('{"feedback":"a","teaching":null,"question":"b"}')).toBeNull()
    expect(parseSlots('{"feedback":3}')).toBeNull()
  })
})

describe('V2–V6 validate', () => {
  it('a good slot passes', () => {
    expect(validateSlots({ feedback: GOOD, teaching: null }, RIGHT)).toEqual([])
  })
  it('V2: a question (production draft)', () => {
    expect(validateSlots({ feedback: 'Good. Could you walk me through the steps you used for the conversion?', teaching: null }, RIGHT))
      .toContain('V2-feedback-question')
  })
  it('V3: home-made options', () => {
    expect(validateSlots({ feedback: GOOD, teaching: 'Try this.\nA) 10 mg\nB) 100 mg' }, RIGHT)).toContain('V3-teaching-options')
  })
  it('V4: too short, missing', () => {
    expect(validateSlots({ feedback: 'Well done.', teaching: null }, RIGHT)).toContain('V4-feedback-length')
    expect(validateSlots({ feedback: null, teaching: null }, RIGHT)).toContain('V4-feedback-missing')
  })
  it("V5: names an earlier item's answer (production R2 draft: 2.50 dm³)", () => {
    expect(validateSlots({ feedback: 'You converted 2.50 dm³ the same way, multiplying through each prefix step.', teaching: null }, RIGHT))
      .toContain('V5-feedback-earlier-item')
  })
  it('V6: a verdict that contradicts the grade', () => {
    expect(validateSlots({ feedback: 'Not quite — the factor between kilograms and milligrams is a million.', teaching: null }, RIGHT))
      .toContain('V6-feedback-denies-correct')
    expect(validateSlots({ feedback: "That's right, moving the decimal three places gives the answer in milligrams.", teaching: null }, WRONG))
      .toContain('V6-feedback-affirms-wrong')
  })
})

describe('fallback and assembly', () => {
  it('a failed feedback falls back to the authored working for the chosen option', () => {
    const u = usableSlots(null, ['V1-unparseable'], WRONG)
    expect(u.fallback).toBe(true)
    expect(u.slots.feedback).toBe('just moving the decimal three places converts only one step')
  })
  it('no authored working: no invented why', () => {
    const u = usableSlots(null, ['V1-unparseable'], { ...RIGHT, rationales: undefined })
    expect(u.slots.feedback).toBeNull()
  })
  it('a failed teaching slot is dropped, feedback kept', () => {
    const u = usableSlots({ feedback: GOOD, teaching: 'What next?' }, ['V2-teaching-question'], RIGHT)
    expect(u).toEqual({ slots: { feedback: GOOD, teaching: null }, fallback: false })
  })
  it('verdict + feedback + teaching + lead-in, in that order, with no question', () => {
    const t = assembleGradedTurn({ verdictLine: "That's right.", slots: { feedback: GOOD, teaching: 'Prefixes stack.' }, leadIn: 'One to try. There\'s no rush.', closeText: null })
    expect(t).toBe(`That's right.\n\n${GOOD}\n\nPrefixes stack.\n\nOne to try. There's no rush.`)
    expect(turnChecks(t, true)).toEqual({ k1Stub: false, k2QuestionBesideCard: false })
  })
  it('completion: the close replaces teaching and lead-in', () => {
    const t = assembleGradedTurn({ verdictLine: "That's right.", slots: { feedback: GOOD, teaching: 'More.' }, leadIn: 'x', closeText: 'Lesson finished.' })
    expect(t).toBe(`That's right.\n\n${GOOD}\n\nLesson finished.`)
  })
  it('an authored correction that already carries the why is not repeated', () => {
    const line = 'Not quite — the answer is: 25,000 mg — multiply by 1000 twice'
    expect(assembleGradedTurn({ verdictLine: line, slots: { feedback: 'multiply by 1000 twice', teaching: null }, leadIn: null, closeText: null })).toBe(line)
  })
})

describe('helpers', () => {
  it('reads earlier options from stored tutor messages', () => {
    expect(optionsFromHistory(['Teach.\n\nConvert 250 cm³ into dm³.\nA) 25.0 dm³\nB) 2.50 dm³'])).toEqual(['25.0 dm³', '2.50 dm³'])
  })
  it('the Phase-0 checks flag the production stub and the question beside a card', () => {
    expect(turnChecks("That's right.", false).k1Stub).toBe(true)
    expect(turnChecks('What do you expect the formal charge to be?', true).k2QuestionBesideCard).toBe(true)
  })
})
