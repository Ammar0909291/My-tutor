import { describe, it, expect } from 'vitest'
import { checkRemediationOutput } from '@/lib/teaching/remediationOutputContract'
import { REMEDIATION_CARDS, renderRemediationCard } from '@/lib/teaching/remediationCards'

const card = renderRemediationCard(
  REMEDIATION_CARDS.find((c) => c.conceptId === 'phys.opt.refraction')!,
)

// The exact turn production served, 2026-08-27, with the card holding.
const PROD_T3 =
  'Step 1 - The normal line. Imagine the surface between air and water as a flat wall.\n\n'
  + 'When a ray hits the boundary, the product of the refractive index and the sine of the '
  + 'angle stays the same on both sides.\nSo, \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\).\n\n'
  + 'Which of the following statements is correct?'

describe('MCQ is no longer an escape hatch from the card bound', () => {
  it('the production turn is now caught even though it carried an MCQ', () => {
    expect(checkRemediationOutput({
      remediationTurn: true, text: PROD_T3, previousAssistantText: '',
      hasStructuredMcq: true, heldCardText: card,
    }).violation).toBe('went-beyond-card')
  })

  it('and was NOT caught before the fix (the MCQ exempted everything)', () => {
    // Same input, no held card: the notation check cannot fire, which is the
    // only reason the old blanket exemption looked harmless.
    expect(checkRemediationOutput({
      remediationTurn: true, text: PROD_T3, previousAssistantText: '',
      hasStructuredMcq: true, heldCardText: undefined,
    }).violation).toBeNull()
  })

  it('question-only KEEPS its MCQ exemption — unchanged behaviour', () => {
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'What do you notice about the straw?',
      previousAssistantText: '', hasStructuredMcq: true,
    }).violation).toBeNull()
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'What do you notice about the straw?',
      previousAssistantText: '', hasStructuredMcq: false,
    }).violation).toBe('question-only')
  })

  it('no-teaching-content KEEPS its MCQ exemption — unchanged behaviour', () => {
    const meta = "So you're saying you still don't understand. Do I have that right?"
    expect(checkRemediationOutput({
      remediationTurn: true, text: meta, previousAssistantText: '', hasStructuredMcq: true,
    }).violation).toBeNull()
    expect(checkRemediationOutput({
      remediationTurn: true, text: meta, previousAssistantText: '', hasStructuredMcq: false,
    }).violation).toBe('no-teaching-content')
  })

  it('an ordinary card-shaped turn with an MCQ still passes', () => {
    expect(checkRemediationOutput({
      remediationTurn: true, text: card, previousAssistantText: '',
      hasStructuredMcq: true, heldCardText: card,
    }).violation).toBeNull()
  })
})
