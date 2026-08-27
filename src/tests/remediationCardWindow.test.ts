/**
 * THE CARD'S AUTHORITY DID NOT SURVIVE "OK SIR".
 *
 * Measured in production, twice, on the one promoted card:
 *   T1  "sir i not understand this"  → the approved card, served deterministically
 *   T2  "ok sir"                     → f_s ≤ μ_s N, f_k = μ_k N, static vs kinetic
 *
 * Every one of those three is a thing the owner named as a deliberate omission
 * when they approved that card. Nothing was violated — the card simply had no
 * jurisdiction, because it only ever owned CONFUSION and REPHRASE_REQUEST turns.
 * One acknowledgement and the ordinary engine resumed.
 *
 * AN ACKNOWLEDGEMENT IS NOT UNDERSTANDING. The repository already knows this
 * (isBareAcknowledgement, and mastery counters that "ok sir" cannot move), and
 * then moved on anyway. The window closes on EVIDENCE — a graded correct answer
 * — never on politeness.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  REMEDIATION_CARDS, remediationWindowOpen, buildRemediationCardHoldBlock,
} from '@/lib/teaching/remediationCards'
import { turnTaughtSomething } from '@/lib/teaching/teachingContent'
import { checkRemediationOutput } from '@/lib/teaching/remediationOutputContract'

const FRICTION = 'phys.mech.friction'
const card = (id: string) => REMEDIATION_CARDS.find((c) => c.conceptId === id)!
const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('the remediation window — when the card still governs', () => {
  it('opens once the card has been served and no evidence has arrived', () => {
    expect(remediationWindowOpen({ cardServed: true, correctAtCheck: 0, correctAtPractice: 0 })).toBe(true)
  })

  it('is shut before the card has ever been served', () => {
    expect(remediationWindowOpen({ cardServed: false, correctAtCheck: 0, correctAtPractice: 0 })).toBe(false)
  })

  it('CLOSES ON EVIDENCE — one graded correct answer ends the hold', () => {
    expect(remediationWindowOpen({ cardServed: true, correctAtCheck: 1, correctAtPractice: 0 })).toBe(false)
    expect(remediationWindowOpen({ cardServed: true, correctAtCheck: 0, correctAtPractice: 1 })).toBe(false)
    expect(remediationWindowOpen({ cardServed: true, correctAtCheck: 2, correctAtPractice: 3 })).toBe(false)
  })

  it('does not close on politeness — there is no acknowledgement input at all', () => {
    // Structural: the function cannot be told "the learner said ok", so it
    // cannot be talked out of the hold by one. The only exit is evidence.
    expect(remediationWindowOpen.length).toBe(1)
    const src = readFileSync(join(process.cwd(), 'src/lib/teaching/remediationCards.ts'), 'utf8')
    const fn = src.slice(src.indexOf('export function remediationWindowOpen'))
      .slice(0, src.slice(src.indexOf('export function remediationWindowOpen')).indexOf('\n}') + 2)
    expect(fn).not.toMatch(/acknowledge|ack\b|ok\b/i)
  })

  it('survives missing or malformed counters without opening by accident', () => {
    expect(remediationWindowOpen({ cardServed: true, correctAtCheck: NaN, correctAtPractice: 0 })).toBe(false)
    // @ts-expect-error — deliberately malformed, as a snapshot could be
    expect(remediationWindowOpen(null)).toBe(false)
    // @ts-expect-error — deliberately malformed
    expect(remediationWindowOpen({ cardServed: true })).toBe(false)
  })
})

describe('the hold block — what the model is told while the window is open', () => {
  const block = () => buildRemediationCardHoldBlock(card(FRICTION))

  it('carries the card as the account, and the card only', () => {
    expect(block()).toContain(card(FRICTION).plainExplanation.trim())
  })

  it('names an acknowledgement as NOT understanding', () => {
    expect(block()).toMatch(/acknowledg|said ok|agreeing|"ok"/i)
    expect(block()).toMatch(/not (mean|the same as) (they )?underst/i)
  })

  it('forbids moving on and forbids new material', () => {
    const b = block()
    expect(b).toMatch(/do not move on|do not introduce|new formula/i)
  })

  it('hands over the card\'s own micro-check rather than inventing a question', () => {
    expect(block()).toContain(card(FRICTION).microCheck.trim())
  })

  it('the block itself would not be mistaken for an empty turn', () => {
    // It is prompt text, not learner text — but if it were spoken it must be
    // teaching, which is a cheap way of proving it carries content at all.
    expect(turnTaughtSomething(block())).toBe(true)
  })

  it('never leaks the model-facing anti-analogy as something to say', () => {
    const b = block()
    if (b.includes(card(FRICTION).antiAnalogy.tempting)) {
      expect(b).toMatch(/never|do not|avoid/i)
    }
  })
})

describe('the route holds on a NON-remediation turn', () => {
  it('consults the window and injects the hold block', () => {
    expect(ROUTE).toContain('remediationWindowOpen')
    expect(ROUTE).toContain('buildRemediationCardHoldBlock')
    const at = ROUTE.indexOf('remediationWindowOpen')
    const scoped = ROUTE.slice(Math.max(0, at - 1500), at + 1500)
    // The hold is the non-remediation branch of the same lookup.
    expect(scoped).toMatch(/remediationTurn/)
    expect(scoped).toMatch(/buildRemediationCardHoldBlock/)
  })

  it('the hold reads the mastery counters and never writes them', () => {
    const at = ROUTE.indexOf('remediationWindowOpen')
    const scoped = ROUTE.slice(Math.max(0, at - 1500), at + 1500)
    expect(scoped).toMatch(/correctAtCheck/)          // read
    expect(scoped).not.toMatch(/correctAtCheck\s*=[^=]/) // read, never assigned
    expect(scoped).not.toMatch(/conversationStateHoisted\s*=/)
    expect(scoped).not.toMatch(/mcqHoisted\s*=/)
    expect(scoped).not.toMatch(/await routeAI\(/)
  })

  it('a held turn still counts as CURATED_CARD, so grounding stays withheld', () => {
    // lastIndexOf: the first occurrence is the import, the last is the use.
    const at = ROUTE.lastIndexOf('buildRemediationCardHoldBlock')
    const scoped = ROUTE.slice(Math.max(0, at - 1200), at + 400)
    expect(scoped).toMatch(/remediationSource = 'CURATED_CARD'/)
  })

  it('H6.2/H6.3 are untouched: four routeAI call sites, DRAFT still refused', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
    // The refusal reason lives in the lookup, which is where the boundary is.
    const cards = readFileSync(join(process.cwd(), 'src/lib/teaching/remediationCards.ts'), 'utf8')
    expect(cards).toContain('draft-not-promoted')
  })
})

// ── THE HOLD IS ENFORCED ON THE OUTPUT, NOT ONLY IN THE PROMPT ──────────────

describe('a held turn that teaches past the card is rejected', () => {
  const CARD = card(FRICTION).plainExplanation
  // Verbatim from production, 2026-08-27: the hold block fired (mode: 'hold')
  // and this is what came back to "ok sir".
  const WENT_BEYOND = 'When you push the book, the force that pushes it back is called the '
    + 'friction force. The size of that force depends on two things: how rough the surfaces '
    + 'are, captured by \\( \\mu \\), and the normal force \\( N \\). So the friction force is '
    + 'simply \\( F_f = \\mu N \\). Once it starts sliding, the friction force stays constant '
    + 'at \\( \\mu_k N \\).'

  it('the production failure is caught', () => {
    const r = checkRemediationOutput({ remediationTurn: false, text: WENT_BEYOND, heldCardText: CARD })
    expect(r.violation).toBe('went-beyond-card')
  })

  it('the card itself passes its own check — the floor cannot reject the account', () => {
    expect(checkRemediationOutput({
      remediationTurn: false, text: CARD, heldCardText: CARD,
    }).violation).toBeNull()
  })

  it('plain teaching about the same idea passes', () => {
    for (const t of [
      'Press the book down harder and it gets harder to slide, because the two surfaces are '
      + 'pushed together more strongly.',
      'The weight of the book has not changed, but the pressing force has.',
      'Which do you think matters more here, the weight or how hard you press?',
    ]) {
      expect(checkRemediationOutput({
        remediationTurn: false, text: t, heldCardText: CARD,
      }).violation, t).toBeNull()
    }
  })

  it('NOTHING is checked when no card is holding — every other turn is untouched', () => {
    expect(checkRemediationOutput({ remediationTurn: false, text: WENT_BEYOND }).violation).toBeNull()
    expect(checkRemediationOutput({
      remediationTurn: false, text: WENT_BEYOND, heldCardText: null,
    }).violation).toBeNull()
  })

  it('a held turn may ask a question — the empty/question checks stay scoped to remediation', () => {
    // "ok sir" answered with the card's micro-check is the DESIRED behaviour,
    // and must not be rejected as a question-only turn.
    expect(checkRemediationOutput({
      remediationTurn: false, text: card(FRICTION).microCheck, heldCardText: CARD,
    }).violation).toBeNull()
  })

  it('the route passes the held card text into the floor and logs the hold', () => {
    expect(ROUTE).toContain('heldCardText: remediationHoldCardText')
    expect(ROUTE).toContain('heldOnCard:')
    // Still one repair call site, not two.
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
  })
})
