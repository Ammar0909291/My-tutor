/**
 * PHYS-023 (2026-10-05) — raw card markup with the answer key reached the
 * learner: `<!" a="x" b="y" c="constraint: x² + y² = L²" d="θ" correct="C"-->`
 * (physics orders 71, 72, 234; 8 production rows 2026-10-02..05 in physics,
 * biology, chemistry and mathematics, read-only SQL 2026-10-06).
 *
 * Root cause, reproduced: the one stub-repair regeneration (route.ts
 * `repairStubReply`) runs `dropQuestionSentences` on its retry when a card
 * already follows. Its sentence split ended a "sentence" at the "!" of "<!--",
 * so the retry's own card tag lost only `--MCQ q="…?"` and kept the options
 * and the key in a shape no parser or sweep recognised.
 */
import { describe, it, expect } from 'vitest'
import { dropQuestionSentences } from '@/lib/teaching/confirmBackRepair'
import { stripResidualMachineTags, hasResidualMachineTag } from '@/lib/teaching/residualTagSweep'

const RETRY_72 = 'Let’s make sure the sign in the Lagrangian is clear.\n\n**<!--MCQ q="Which expression correctly defines the Lagrangian?" a="L = T + V" b="L = T − V" c="L = V − T" d="L = T only" correct="B"-->'
const RETRY_71 = 'This equation ties the two Cartesian numbers together, so knowing just one of them is enough to locate the bob.\n\n**\n\n<!--MCQ q="Which of these is the constraint?" a="x" b="y" c="constraint: x² + y² = L²" d="θ" correct="C"-->'

// Verbatim tails of the stored production rows.
const LEAKED = [
  '**\n\n<!" a="x" b="y" c="constraint: x² + y² = L²" d="θ" correct="C"-->',
  '**\n\n<!" a="L = T + V" b="L = T − V" c="L = V − T" d="L = T only" correct="B"-->',
  '<!" a="Definite relative phases between components" b="Random relative phases" c="Only one component" d="No phases at all" correct="A"-->',
  '<!" a="milli" b="micro" c="nano" d="centi" correct="A"-->',
]

describe('dropQuestionSentences never splits a tag (PHYS-023 root cause)', () => {
  it('drops the retry\'s own card tag whole: no options, no key, no "<!" left', () => {
    for (const t of [RETRY_71, RETRY_72]) {
      const out = dropQuestionSentences(t)
      expect(out).not.toMatch(/correct=/)
      expect(out).not.toContain('<!')
      expect(out).not.toMatch(/\ba="/)
    }
    expect(dropQuestionSentences(RETRY_72)).toContain('Let’s make sure the sign in the Lagrangian is clear.')
  })
  it('still drops ordinary question sentences and keeps the teaching', () => {
    expect(dropQuestionSentences('Tension is the same along an ideal rope. Can you see why?')).toBe('Tension is the same along an ideal rope.')
  })
  it('keeps a tag that asks nothing, whole', () => {
    const t = 'Forces come in pairs. Why?\n\n<!--SIGNAL kind="x"-->'
    expect(dropQuestionSentences(t)).toBe('Forces come in pairs.\n\n<!--SIGNAL kind="x"-->')
  })
})

describe('residual sweep removes an orphaned answer key (backstop)', () => {
  it('strips every production shape and reports it as residue', () => {
    for (const tail of LEAKED) {
      const text = `The constraint removes one degree of freedom.\n\n${tail}\n\nWhich statement correctly describes a conservative force?`
      expect(hasResidualMachineTag(text)).toBe(true)
      const out = stripResidualMachineTags(text)
      expect(out).not.toMatch(/correct=/)
      expect(out).not.toContain('<!')
      expect(out).not.toContain('**')
      expect(out).toContain('The constraint removes one degree of freedom.')
      expect(out).toContain('Which statement correctly describes a conservative force?')
      expect(hasResidualMachineTag(out)).toBe(false)
    }
  })
  it('leaves prose with quotes and the word "correct" alone', () => {
    const t = 'You chose "L = T − V", which is correct. The **Lagrangian** is kinetic minus potential energy.'
    expect(stripResidualMachineTags(t)).toBe(t)
  })
})
