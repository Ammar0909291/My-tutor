/**
 * "THE THIRD-LAW REACTION" IS NEWTON'S, NOT THERMODYNAMICS' (2026-09-28).
 *
 * MEASURED (Groq-vs-Gemini A/B test, production, phys.mech.friction, slot 10):
 * the scripted off-topic question "A book rests on a table. Earth's gravity
 * pulls the book down. What is the Third-Law reaction to that force?" got, from
 * Groq, a reply about absolute zero in a crystal lattice in one run and an
 * endorsement of the same-object-pair misconception in the other.
 *
 * ROOT CAUSE (app, not model): the message resolved to phys.therm.third-law.
 * "Third Law" was indexed as an UNAMBIGUOUS title component of
 * chem.thermo.third-law ("Third Law and Absolute Entropy") because no other
 * conjunct spelled it — although it reads inside "Newton's Third Law —
 * Action-Reaction" and "Third Law of Thermodynamics" — and subjectLocalReading
 * then swapped it for physics' thermodynamics concept. The excursion pointed
 * the tutor at the wrong concept; with no Newton's-third-law grounding the
 * model either taught what it was handed or answered from its own knowledge.
 */
import { describe, expect, it } from 'vitest'
import { resolveRequestedConceptId, conceptIndex } from '@/lib/teaching/concept/requestedConcept'
import { normalizeToTokens } from '@/lib/teaching/concept/conceptIndex'

const SCRIPTED = "A book rests on a table. Earth's gravity pulls the book down. What is the Third-Law reaction to that force?"

describe('the scripted question reaches Newton’s third law from any lesson', () => {
  it.each([
    ['phys.mech.friction', 'physics'],
    ['phys.em.electric-charge', 'physics'],
    ['chem.found.mole-concept', 'chemistry'],
  ])('from %s', (lesson, subject) => {
    expect(resolveRequestedConceptId(SCRIPTED, lesson, subject)).toBe('phys.mech.newtons-third-law')
  })
})

describe('each law still reaches its own concept, in its own subject', () => {
  it.each([
    ['What does the third law of thermodynamics say?', 'phys.mech.friction', 'physics', 'phys.therm.third-law'],
    ['What does the third law of thermodynamics say?', 'chem.found.mole-concept', 'chemistry', 'chem.thermo.third-law'],
    ['Can you explain the second law of thermodynamics?', 'phys.mech.friction', 'physics', 'phys.therm.second-law'],
    ['Can you explain the second law of thermodynamics?', 'chem.found.mole-concept', 'chemistry', 'chem.thermo.entropy'],
    ["explain newton's second law", 'phys.mech.friction', 'physics', 'phys.mech.newtons-second-law'],
    ['what is the second law of motion?', 'phys.mech.friction', 'physics', 'phys.mech.newtons-second-law'],
    ['tell me about entropy and the second law', 'chem.found.mole-concept', 'chemistry', 'chem.thermo.entropy'],
  ])('%s (in %s)', (message, lesson, subject, expected) => {
    expect(resolveRequestedConceptId(message, lesson, subject)).toBe(expected)
  })
})

describe('no title component is a phrase inside two or more other titles', () => {
  it('holds across every live KG (was: "Second Law", "Third Law")', () => {
    const idx = conceptIndex()
    const titles = idx.map((e) => ({ id: e.conceptId, t: normalizeToTokens(e.title) }))
    const inside = (h: string[], n: string[]) => h.some((_, i) => n.every((x, j) => h[i + j] === x))
    const offenders: string[] = []
    for (const e of idx) {
      for (const c of e.components ?? []) {
        const ct = normalizeToTokens(c)
        if (ct.length < 2) continue
        if (titles.filter((o) => o.id !== e.conceptId && inside(o.t, ct)).length >= 2) offenders.push(`${e.conceptId}: ${c}`)
      }
    }
    expect(offenders).toEqual([])
  })
})
