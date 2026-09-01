import { describe, it, expect } from 'vitest'
import { checkRemediationOutput } from '@/lib/teaching/remediationOutputContract'

/**
 * REPEATING THE PREVIOUS TURN VERBATIM IS NEVER ACCEPTABLE, ON ANY TURN.
 *
 * MEASURED (production, phys.mech.friction, 2026-08-31, studied as a learner on
 * a real account): the learner asked whether the coefficient of friction can
 * exceed 1. THREE consecutive turns returned the same ~700-character paragraph
 * word for word, including the one replying to "you didn't answer my question
 * about mu being 1 — i asked that twice now."
 *
 * The floor that catches this already existed and ran only on remediation,
 * recovery and card-held turns. The learner was asking a factual question, so
 * none of those applied and the check was skipped entirely.
 */
const CARD = 'Push a book across a table and something resists you. That resistance is friction. '
  + 'Two things decide how strong it is: what the two surfaces are made of, and how strongly they '
  + 'are pressed against each other. Now hold the book down with your hand and try again. It is much '
  + 'harder to slide, and the book has not become any heavier. So what matters is not the book\'s '
  + 'weight, it is how hard the two surfaces are being pushed together. That pushing-together force '
  + 'has a name: the normal force.'

describe('verbatim repetition is caught on an ORDINARY turn', () => {
  it('catches the exact production repeat — not a remediation or recovery turn', () => {
    const r = checkRemediationOutput({
      remediationTurn: false,     // the learner asked a factual question
      recoveryTurn: false,
      text: CARD,
      previousAssistantText: CARD,
      hasStructuredMcq: false,
      heldCardText: '',
    })
    expect(r.violation).toBe('repeats-previous-turn')
  })

  it('still catches it on a remediation turn, as before', () => {
    const r = checkRemediationOutput({
      remediationTurn: true, recoveryTurn: false,
      text: CARD, previousAssistantText: CARD,
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(r.violation).toBe('repeats-previous-turn')
  })

  it('does NOT punish a short acknowledgement repeated across turns', () => {
    // Confirming two correct answers in a row is good teaching. On an ordinary
    // turn the repeat must be SUBSTANTIAL, or every "Correct!" becomes a defect.
    const r = checkRemediationOutput({
      remediationTurn: false, recoveryTurn: false,
      text: 'Correct!',
      previousAssistantText: 'Correct! Static friction matches the push exactly.',
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(r.violation).toBeNull()
  })

  it('a short repeat on a REMEDIATION turn is still caught — the floor is unscoped-only', () => {
    const r = checkRemediationOutput({
      remediationTurn: true, recoveryTurn: false,
      text: 'Let us try that again.',
      previousAssistantText: 'Let us try that again.',
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(r.violation).toBe('repeats-previous-turn')
  })

  it('a genuinely new reply is untouched', () => {
    const r = checkRemediationOutput({
      remediationTurn: false, recoveryTurn: false,
      text: 'Yes — the coefficient can exceed 1. Rubber on rubber runs about 1 to 2, which is why '
        + 'grippy surfaces can resist a push larger than the weight pressing them together.',
      previousAssistantText: CARD,
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(r.violation).toBeNull()
  })

  it('an ordinary turn with no previous text is untouched', () => {
    const r = checkRemediationOutput({
      remediationTurn: false, recoveryTurn: false,
      text: CARD, previousAssistantText: null,
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(r.violation).toBeNull()
  })
})
