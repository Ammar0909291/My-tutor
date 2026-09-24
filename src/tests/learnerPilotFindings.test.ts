/**
 * LEARNER PILOT FINDINGS (2026-09-24, four real owner accounts, eight lessons).
 * Only 2 of 8 lessons reached verified mastery. The dominant cause, and three
 * learner-visible defects, each pinned here with the production text.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { enforceQuestionDeliveryContract, dropUndeliveredCheckAnnouncements } from '@/lib/teaching/gateAssessment'
import { stripUnbackedAsciiDiagram } from '@/lib/teaching/asciiDiagramGuard'
import { stripUnbackedFigureReferences } from '@/lib/teaching/figureReference'

const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('P1 — "can you test me?" said twice is a willing learner, not a frustrated one', () => {
  it('the pilot message, repeated, is no longer a failure state', () => {
    const m = 'ok i get it, can you test me?'
    expect(detectFailureState(m, m)).toBeNull()
  })
  it('other ways of asking to be examined, repeated', () => {
    for (const m of ['can you quiz me', 'test me please', 'check my understanding', 'okay, check me with a question?']) {
      expect(detectFailureState(m, m), m).toBeNull()
    }
  })
  it('synthetic-student smoke run: a request after a short lead-in, repeated, is still willing', () => {
    for (const m of ['can we move faster? give me a question', 'got it. test me please', 'cool. ok test me', 'ok, next question please']) {
      expect(detectFailureState(m, m), m).toBeNull()
    }
  })
  it('a repeated answer that merely contains a comma is still frustration', () => {
    for (const m of ['the force doubles, because the mass doubles', 'the heavier ball falls faster, one of them is heavier']) {
      expect(detectFailureState(m, m), m).toBe('frustrated')
    }
  })
  it('a genuinely repeated ANSWER is still read as frustration (unchanged)', () => {
    const m = 'the voltage goes up because the concentration goes up'
    expect(detectFailureState(m, m)).toBe('frustrated')
  })
})

describe('P2 — a check that is announced and never asked is not shipped', () => {
  for (const t of [
    'Sure, let’s check your understanding with a quick multiple‑choice question.',
    'I hear you—let’s do a quick check.',
    'Here’s a quick check to see how well you can blend and segment the sounds.',
  ]) {
    it(`"${t.slice(0, 50)}…" alone -> the fallback`, () => {
      expect(enforceQuestionDeliveryContract(t, 'FALLBACK')).toBe('FALLBACK')
    })
  }
  it('an announcement followed by the real question is kept whole', () => {
    const t = 'Let’s check your understanding. Which word in the sentence is the verb?'
    expect(enforceQuestionDeliveryContract(t, 'FALLBACK')).toBe(t)
  })
  it('teaching before an unkept announcement survives; only the announcement goes', () => {
    const t = 'Coefficients count moles, not grams. Sure, let’s check your understanding with a quick question.'
    expect(dropUndeliveredCheckAnnouncements(t)).toBe('Coefficients count moles, not grams.')
  })
  it('ordinary teaching mentioning a check is untouched', () => {
    const t = 'A quick way to check a balanced equation is to count each atom on both sides.'
    expect(dropUndeliveredCheckAnnouncements(t)).toBe(t)
  })
  it('the final-response net falls back to the concept\'s KG description, not a content-free hold', () => {
    const at = route.indexOf('const repaired = enforceQuestionDeliveryContract(cleanText, finalFallback)')
    expect(at).toBeGreaterThan(0)
    expect(route.slice(at - 900, at)).toMatch(/finalFallback = conceptFallbackText\(node\.title, node\.description\)/)
  })
})

describe('P3 — a fence drawn with arrow glyphs, and its pointer, on a no-figure turn', () => {
  const t = "I'll explain it in words.\n\n```\nThe dog → barks → loudly\n (subject) (verb) (adverb)\n```\n\nThe arrow highlights **barks**, the verb that tells what the subject is doing."
  it('the drawing and the arrow sentence both go', () => {
    const a = stripUnbackedFigureReferences(t, false)
    const b = stripUnbackedAsciiDiagram(a.text, false)
    expect(b.text).toBe("I'll explain it in words.")
  })
  it('code with the ASCII arrow "=>" is not a drawing', () => {
    const code = 'Here is the function:\n\n```\nconst add = (a, b) => a + b\nconst sq = (x) => x * x\n```'
    expect(stripUnbackedAsciiDiagram(code, false).stripped).toBe(false)
  })
  it('a reply the guards empty completely is replaced from the KG in the route', () => {
    expect(route).toMatch(/figures\.onlyPointer \|\| leftovers\.onlyPointer \|\| cleanText\.trim\(\)\.length === 0/)
  })
})

describe('P4 — phoneme notation is not stripped where it IS the lesson', () => {
  it('the beginner IPA strip skips phonics and phonetics concepts only', () => {
    expect(route).toMatch(/const notationIsTheLesson = \/\^eng\\\.\(\?:phonics\|phonetics\)\\\.\/\.test\(resolvedConceptId \?\? ''\)/)
    expect(route).toMatch(/if \(contentRegister === 'beginner' && !notationIsTheLesson\) \{\s*cleanText = stripIpaNotation\(cleanText\)/)
  })
})

describe('P5 — the gate-internal withhold says the concept, not "Let\'s stay with this idea"', () => {
  it('conceptFallbackText: a sentence stands as-is; a syllabus list is introduced as what the lesson covers', async () => {
    const { conceptFallbackText } = await import('@/lib/teaching/conceptFallback')
    expect(conceptFallbackText('LC Oscillations and Resonance', 'An LC circuit oscillates at resonant frequency f = 1/(2π√LC) as energy alternates between inductor and capacitor.'))
      .toBe('An LC circuit oscillates at resonant frequency f = 1/(2π√LC) as energy alternates between inductor and capacitor.')
    expect(conceptFallbackText('Stoichiometry', 'Balancing chemical equations; mole ratios; limiting reagent; theoretical and percent yield calculations.'))
      .toBe('Stoichiometry covers: Balancing chemical equations; mole ratios; limiting reagent; theoretical and percent yield calculations.')
  })
  it('with the concept supplied: no grade -> the concept; a grade stands alone', async () => {
    const { withholdUngradedGateQuestion } = await import('@/lib/teaching/gateAssessment')
    const base = { text: 'What do you think happens to the yield?', phase: 'CHECK', phaseAfter: 'CHECK', hasStructuredMcq: false, questionOnScreen: false }
    const fb = 'Stoichiometry covers: mole ratios.'
    const none = withholdUngradedGateQuestion({ ...base, conceptFallback: fb } as never)
    expect(none.withheld).toBe(true)
    expect(none.text).toBe(fb)
    const graded = withholdUngradedGateQuestion({ ...base, conceptFallback: fb, justGraded: { correct: true } } as never)
    expect(graded.text).toBe("That's right.")
  })
  it('without the concept: byte-for-byte the previous behaviour', async () => {
    const { withholdUngradedGateQuestion, WITHHELD_QUESTION_CONTINUATION_TEXT } = await import('@/lib/teaching/gateAssessment')
    const base = { text: 'What do you think happens to the yield?', phase: 'CHECK', phaseAfter: 'CHECK', hasStructuredMcq: false, questionOnScreen: false }
    expect(withholdUngradedGateQuestion(base as never).text).toBe(WITHHELD_QUESTION_CONTINUATION_TEXT)
    expect(withholdUngradedGateQuestion({ ...base, justGraded: { correct: true } } as never).text).toBe(`That's right. ${WITHHELD_QUESTION_CONTINUATION_TEXT}`)
  })
  it('the route supplies the concept to the gate withhold', () => {
    expect(route).toMatch(/const ungraded = withholdUngradedGateQuestion\(\{\s*conceptFallback: withholdConceptFallback,/)
    expect(route).toMatch(/const withholdConceptFallback = withholdNode\?\.title && withholdNode\.description\s*\? conceptFallbackText\(withholdNode\.title, withholdNode\.description\)/)
  })
})

describe('P6 — "This simple layout shows…" on a no-figure turn (pilot run 3, eng.grammar.pronouns)', () => {
  it('is rewritten like the unadorned form', () => {
    const t = 'This simple layout shows which pronoun replaces each noun in the sentences.'
    expect(stripUnbackedFigureReferences(t, false).text).toBe('Here is which pronoun replaces each noun in the sentences.')
  })
  it('a declarative sentence about a layout is still untouched', () => {
    const t = 'The layout of the periodic table reflects electron configuration trends.'
    expect(stripUnbackedFigureReferences(t, false).text).toBe(t)
  })
})
