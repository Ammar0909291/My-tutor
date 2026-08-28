import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { REMEDIATION_CARDS, renderRemediationCard } from '@/lib/teaching/remediationCards'
import { checkRemediationOutput } from '@/lib/teaching/remediationOutputContract'
import { turnTaughtSomething } from '@/lib/teaching/teachingContent'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

/**
 * phys.particle.antimatter, production, 2026-08-27. The learner's SECOND
 * "I still don't understand", after the remediation repair had already run
 * once — so this is what the system produced on its second attempt.
 */
const PROD_REFLECTION =
  'You’re saying you still don’t understand how a particle and its antiparticle '
  + 'can have the same mass but opposite charge and then annihilate into energy. '
  + 'Is that right?'

const CARD = renderRemediationCard(
  REMEDIATION_CARDS.find((c) => c.conceptId === 'phys.particle.antimatter')!,
)

describe('the repeat remediation turn is governed by the card too', () => {
  it('the detector rejects the production reflection — it always did', () => {
    expect(turnTaughtSomething(PROD_REFLECTION)).toBe(false)
    expect(checkRemediationOutput({
      remediationTurn: true, text: PROD_REFLECTION, previousAssistantText: '',
    }).violation).toBe('no-teaching-content')
  })

  it('so the turn shipped for want of something to fall back TO, not for want of a check', () => {
    // With a card in hand the floor has a real answer to substitute. Without
    // one it had only the KG sentence, and when that is unusable the model's
    // draft stands — which is how a rejected reflection reached a learner.
    expect(CARD.length).toBeGreaterThan(100)
    expect(turnTaughtSomething(CARD)).toBe(true)
    expect(checkRemediationOutput({
      remediationTurn: true, text: CARD, heldCardText: CARD, previousAssistantText: '',
    }).violation).toBeNull()
  })

  it('the constrained-source branch now hands the card to the output floor', () => {
    // A source assertion, deliberately: the branch is inside a 6,000-line route
    // handler that cannot be invoked from a unit test, and the defect was
    // precisely that this assignment was absent from one of the two branches.
    // Both branches must set it, so the count is two, not one.
    const assignments = ROUTE.match(
      /remediationHoldCardText = lookup\.card\.plainExplanation/g,
    ) ?? []
    expect(assignments).toHaveLength(2)
  })

  it('and the fallback prefers that card over the curriculum sentence', () => {
    // `let`, not `const`, since the repeat-avoidance swap (below) needs to
    // reassign it — see wouldRepeatPreviousTurn's own test file for that.
    expect(ROUTE).toMatch(
      /let fallback = remediationHoldCardText\s*\n?\s*\?\?\s*buildRemediationFallbackText\(conceptSentence\)/,
    )
  })
})
