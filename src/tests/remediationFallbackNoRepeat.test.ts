import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { wouldRepeatPreviousTurn } from '@/lib/teaching/remediationOutputContract'

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
  it('imports and calls wouldRepeatPreviousTurn around the fallback assignment', () => {
    expect(ROUTE).toMatch(/wouldRepeatPreviousTurn,\s*\n\s*} = await import\('@\/lib\/teaching\/remediationOutputContract'\)/)
    expect(ROUTE).toMatch(/if \(fallback && wouldRepeatPreviousTurn\(fallback, previousAssistantText\)\)/)
  })

  it('tries the curriculum sentence as the alternate source, not a third invention', () => {
    // The swap must reach for buildRemediationFallbackText again — the ONLY
    // other source this floor is allowed to use — never a freshly generated
    // sentence, which would reopen the exact notation risk the floor exists
    // to close.
    const swap = ROUTE.match(
      /const alt = remediationHoldCardText\s*\n\s*\? buildRemediationFallbackText\(conceptSentence\)\s*\n\s*: null/,
    )
    expect(swap).not.toBeNull()
  })

  it('the repaired log now reports which source actually landed, not merely which existed', () => {
    expect(ROUTE).toMatch(/usedHeldCard: stillViolating && cleanText === remediationHoldCardText/)
  })
})
