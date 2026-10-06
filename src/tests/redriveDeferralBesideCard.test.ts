/**
 * Production redrive 2026-10-06 (deploy 05b7868, disposable account): with a
 * card on screen the reply still offered a check "when you're ready" (9 of 143
 * turns; chemistry 7, biology 1, physics 1). Every sentence below is quoted
 * from that run. CHEM-021 / CHEM-061 mechanism.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropDeferredPracticeOffer } from '@/lib/teaching/gateAssessment'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const T = 'A buffer holds pH steady.'
const drops = (s: string) => dropDeferredPracticeOffer(`${T} ${s}`, true) === T

describe('offers of a check beside a card are dropped', () => {
  for (const s of [
    'When you feel ready, just let me know and we can try a short question to see how the idea is landing.',
    'When you feel ready, let me know and we can try a quick check together.',
    'When you feel ready, just let me know and we’ll move on to a short multiple‑choice quiz that focuses on the electrode roles.',
    'When you’re ready, just let me know and I’ll give you the first question.',
    'Let’s pause the quiz for a moment so we can make sure the key ideas about the molten‑NaCl electrolytic cell are clear first.',
    'Let me know when you’re ready to try a quick check on this idea!',
  ]) it(s.slice(0, 60), () => expect(drops(s)).toBe(true))
})

describe('teaching and non-card turns are untouched', () => {
  it('no card: unchanged', () => {
    const t = `${T} When you feel ready, let me know and we can try a quick check together.`
    expect(dropDeferredPracticeOffer(t, false)).toBe(t)
  })
  it('an offer of more teaching (no check) stays', () => {
    expect(drops('When you’re ready, just let me know and we can look at a molecule that doesn’t meet the rule.')).toBe(false)
  })
  it('a reply that is only the offer is kept rather than emptied', () => {
    const only = 'When you feel ready, let me know and we can try a quick check together.'
    expect(dropDeferredPracticeOffer(only, true)).toBe(only)
  })
})

describe('route: the drop also runs on the card actually served (held card re-offered)', () => {
  it('applied after servedMcq is resolved', () => {
    expect(ROUTE).toMatch(/: \(mcqForClient\(resolvedQuestionServedFinal\) \?\? undefined\)\n[\s\S]{0,700}if \(servedMcq\) \{[\s\S]{0,200}dropDeferredPracticeOffer\(cleanText, true\)/)
  })
})
