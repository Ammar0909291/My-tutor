/**
 * CHEM-001 / CHEM-015 (2026-10-05, chemistry real-learner run): "too many
 * words", "give me example with numbers", "show me step by step" — the reply
 * must have the asked-for shape. Inputs quoted from
 * docs/qa/CHEMISTRY_REAL_LEARNER_DEFECTS.md.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { adaptationKind, honoursAdaptation, shorterBudget, trimToWordBudget } from '@/lib/teaching/adaptationRequest'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('reading the request', () => {
  it('the persona messages', () => {
    expect(adaptationKind('too many words')).toBe('shorter')
    expect(adaptationKind('its too long')).toBe('shorter')
    expect(adaptationKind('give me example with numbers')).toBe('numbers')
    expect(adaptationKind('ok. give me example with numbers please')).toBe('numbers')
    expect(adaptationKind('show me step by step')).toBe('steps')
    for (const m of ['ok', 'give me example', 'explain simpler', 'the bond is too long to break', 'what is the number of protons']) {
      expect(adaptationKind(m), m).toBeNull()
    }
  })
  it('"too many words" takes the explain-again rung, which keeps the quiz card off the turn', () => {
    expect(detectLearnerRequest('too many words')).toBe('explain_differently')
    expect(detectLearnerRequest('the bond is too long to break')).toBeNull()
  })
})

describe('the observed replies fail the check; a compliant one passes', () => {
  const prev = 'Adsorption is when molecules stick to a surface. '.repeat(12) // ~96 words
  it('CHEM-001: a longer wall of text is trimmed to whole sentences under the budget', () => {
    const longer = 'Think of it like a crowded party where everyone sticks to the walls. '.repeat(10)
    expect(honoursAdaptation('shorter', longer, prev)).toBe(false)
    const trimmed = trimToWordBudget(longer, shorterBudget(prev))
    expect(trimmed.split(/\s+/).length).toBeLessThanOrEqual(shorterBudget(prev))
    expect(trimmed).toMatch(/\.$/)
    expect(honoursAdaptation('shorter', trimmed, prev)).toBe(true)
  })
  it('the budget is at most 60 words and at most 60% of the reply complained about', () => {
    expect(shorterBudget(prev)).toBeLessThanOrEqual(60)
    expect(shorterBudget('one two three four five six seven eight nine ten '.repeat(5))).toBe(30)
    expect(shorterBudget(null)).toBe(60)
  })
  it('a decimal is not a sentence end', () => {
    expect(trimToWordBudget('The pH is 3.59 here. Then more words follow.', 5)).toBe('The pH is 3.59 here.')
  })
  it('CHEM-015: an analogy with no numbers fails "with numbers"', () => {
    expect(honoursAdaptation('numbers', 'This is genuinely tricky — let me try a completely different angle. Think of making a piece of furniture: you cannot just snap wood into a finished table in one go.', null)).toBe(false)
    expect(honoursAdaptation('numbers', '2.0 mol of H₂ react with 1.0 mol of O₂ to give 2.0 mol of water, 36 g.', null)).toBe(true)
  })
  it('CHEM-015: three plain sentences or a Socratic question fail "step by step"', () => {
    expect(honoursAdaptation('steps', 'Silica gel has a large surface. Water sticks to it. That is adsorption.', null)).toBe(false)
    expect(honoursAdaptation('steps', 'How did you decide that elements in the same row of the table should have very similar chemical behavior?', null)).toBe(false)
    expect(honoursAdaptation('steps', '1. Find the moles.\n2. Use the ratio.\n3. Convert to grams.', null)).toBe(true)
  })
})

describe('route wiring', () => {
  it('checked on every non-degraded turn; numbers/steps regenerate once and keep only a compliant retry', () => {
    expect(ROUTE).toMatch(/if \(!serveLessonComplete && provider !== 'degraded'\) \{\n\s+try \{\n\s+const ad = await import\('@\/lib\/teaching\/adaptationRequest'\)/)
    expect(ROUTE).toMatch(/if \(retry && ad\.honoursAdaptation\(kind, retry, previousReply\)\) next = retry/)
    expect(ROUTE).toMatch(/next = ad\.trimToWordBudget\(adBody, ad\.shorterBudget\(previousReply\)\)/)
  })
})
