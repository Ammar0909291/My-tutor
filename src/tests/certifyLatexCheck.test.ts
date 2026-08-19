/**
 * The malformed-LaTeX check has now been wrong twice, so it gets a test file.
 *
 * Both D6-latex failures in the first full certification sweep were false: the
 * check read a currency `$` as a maths delimiter, and a subject that teaches
 * order of operations through shopping examples would have failed forever.
 * The strings below are the real turns, alongside the defect the check exists
 * to catch in the first place.
 */
import { describe, it, expect } from 'vitest'
import { hasMalformedLatex } from '../../scripts/math/certify'

describe('currency is not a delimiter', () => {
  it('accepts the real order-of-operations turn that was failed', () => {
    const t = 'you buy 3 pens for $2 each, plus a notebook for $5. To find the '
      + 'total cost, you write down an expression with both multiplication and '
      + 'addition: \\(3 \\times 2 + 5\\).'
    expect(hasMalformedLatex(t)).toBe(false)
  })

  it('accepts an expected-value turn priced in dollars', () => {
    expect(hasMalformedLatex('A game has E[X] = $3.50, but no single roll pays exactly $3.50.')).toBe(false)
  })

  it('accepts a lone price with no maths at all', () => {
    expect(hasMalformedLatex('The notebook costs $5.')).toBe(false)
  })
})

describe('the defect it exists for is still caught', () => {
  it('catches a delimiter nested inside a maths span — the shape shipped to a learner', () => {
    expect(hasMalformedLatex('the ratio $a:b\\(as\\)b:a$ is reversed')).toBe(true)
  })

  it('catches an unbalanced maths span', () => {
    expect(hasMalformedLatex('An unbalanced $ span here')).toBe(true)
  })

  it('accepts a well-formed maths span', () => {
    expect(hasMalformedLatex('Let $x = 5$ and compute.')).toBe(false)
  })

  it('accepts ordinary prose', () => {
    expect(hasMalformedLatex('A prime has exactly two divisors.')).toBe(false)
  })
})
