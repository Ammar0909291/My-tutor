import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  wouldRepeatPreviousTurn,
  selectRemediationFallback,
  buildRemediationFallbackText,
} from '@/lib/teaching/remediationOutputContract'

// A real KG description, long enough to clear buildRemediationFallbackText's
// own 25–400 character window, so the alternate source genuinely exists.
const KG_SENTENCE = 'The uncertainty principle states that the product of the uncertainties in '
  + 'position and momentum has a lower bound, so narrowing one necessarily widens the other.'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

// The exact held-card paragraph served twice in a row in production,
// phys.qm.uncertainty-principle, 2026-08-27 — T3 and T4, verified via two
// consecutive Vercel log entries both reading
// `[remediation-floor] repaired { violation: 'went-beyond-card',
//  accepted: false, usedHeldCard: true }`.
const CARD_TEXT =
  'A long, steady musical note has a definite pitch. Shorten it and the pitch '
  + 'blurs. Shorten it to a single click and asking for its pitch stops making '
  + 'sense — a click is built from a whole spread of frequencies at once, and '
  + 'that is a fact about what a click is, not about the ear listening. '
  + 'Position and momentum stand in exactly this relation. A description '
  + 'confined to a narrow region is necessarily built from a wide spread of '
  + 'momenta. Squeeze the position and the momentum spread grows, with a '
  + 'floor below which the product cannot go.'

describe('wouldRepeatPreviousTurn', () => {
  it('catches the exact production repeat, byte for byte', () => {
    expect(wouldRepeatPreviousTurn(CARD_TEXT, CARD_TEXT)).toBe(true)
  })

  it('catches it even wrapped in the earlier turn\'s micro-check', () => {
    const prevTurn = `${CARD_TEXT}\n\nA gentler, more careful instrument does not improve the trade-off at all. What does that rule out?`
    expect(wouldRepeatPreviousTurn(CARD_TEXT, prevTurn)).toBe(true)
  })

  it('is case- and whitespace-insensitive, matching checkRemediationOutput\'s own repeat rule', () => {
    expect(wouldRepeatPreviousTurn('  A LONG,   steady musical note.  ', 'a long, steady musical note.')).toBe(true)
  })

  it('does not fire on genuinely different text', () => {
    expect(wouldRepeatPreviousTurn(
      'Send silver atoms through a magnetic field and the beam splits into two spots.',
      CARD_TEXT,
    )).toBe(false)
  })

  it('is safe on empty or missing input', () => {
    expect(wouldRepeatPreviousTurn('', CARD_TEXT)).toBe(false)
    expect(wouldRepeatPreviousTurn(CARD_TEXT, '')).toBe(false)
    expect(wouldRepeatPreviousTurn(null, undefined)).toBe(false)
  })
})

describe('the route reaches for a different source before repeating', () => {
  // SUPERSEDED SHAPE (2026-09-05). These three assertions pinned the selection
  // while it was written INLINE in route.ts — the destructured
  // `wouldRepeatPreviousTurn` import, the `if (fallback && …)` swap, the
  // `const alt = …` ternary and the `cleanText === remediationHoldCardText`
  // log comparison. That logic now lives in `selectRemediationFallback`, where
  // it can be driven directly instead of matched as text; the swap it performs
  // is unchanged. Each assertion below now checks the same invariant against
  // the real function, with the route wiring pinned only where a source check
  // is the only thing available. See remediationFallbackRepeat.test.ts for the
  // defect that motivated the extraction (the fallback repeated FOUR times in
  // production because `previousAssistantText` was the oldest message, not the
  // previous turn — so this swap could never fire at all).

  it('the swap still runs, and still uses wouldRepeatPreviousTurn to decide', () => {
    // Behaviour, not text: the card is what was just said, so the OTHER source
    // must be chosen — which is only decidable via the same repeat test.
    const alt = selectRemediationFallback({
      heldCardText: CARD_TEXT,
      conceptSentence: KG_SENTENCE,
      previousAssistantText: CARD_TEXT,
      conceptResolved: true,
    })
    expect(alt.source).toBe('curriculum-sentence')
    expect(alt.text).not.toBe(CARD_TEXT)
    // And the route must actually delegate to it.
    expect(ROUTE).toMatch(/choice = selectRemediationFallback\(\{/)
  })

  it('tries the curriculum sentence as the alternate source, not a third invention', () => {
    // The swap must reach for buildRemediationFallbackText — the ONLY other
    // source this floor is allowed to use — never a freshly generated
    // sentence, which would reopen the exact notation risk the floor exists
    // to close. Proven by identity with that builder's own output.
    const alt = selectRemediationFallback({
      heldCardText: CARD_TEXT,
      conceptSentence: KG_SENTENCE,
      previousAssistantText: CARD_TEXT,
      conceptResolved: true,
    })
    expect(alt.text).toBe(buildRemediationFallbackText(KG_SENTENCE))
  })

  it('the repaired log now reports which source actually landed, not merely which existed', () => {
    expect(ROUTE).toMatch(/usedHeldCard: stillViolating && choice\?\.source === 'held-card'/)
    expect(ROUTE).toMatch(/usedCurriculumSentence: stillViolating && choice\?\.source === 'curriculum-sentence'/)
  })
})
