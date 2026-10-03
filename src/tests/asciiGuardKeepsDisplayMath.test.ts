/**
 * The unfenced-drawing pass (Pass 4b) took a display-math block for a stroke
 * drawing: a "\[" / "\]" line has no letter or digit and contains "\", and the
 * formula between them passed as a short label. Production, 2026-10-03,
 * math.num.newtons-method, no figure on screen: the reply shipped "Consider
 * the function\n\nwhose derivative is\n\nApplying Newton's iteration…" with the
 * formulas removed.
 */
import { describe, it, expect } from 'vitest'
import { stripUnbackedAsciiDiagram, isStrokeLine } from '@/lib/teaching/asciiDiagramGuard'

const NEWTON = 'Consider the function \n\n\\[\nf(x)=\\sqrt[3]{x}=x^{1/3},\n\\]\n\nwhose derivative is \n\n\\[\nf\'(x)=\\tfrac13 x^{-2/3}.\n\\]\n\nApplying Newton\'s iteration \n\n\\[\nx_{n+1}=x_n-\\frac{f(x_n)}{f\'(x_n)}\n\\]\n\nsimplifies to \n\n\\[\nx_{n+1}=-2x_n .\n\\]'

describe('display math is not a drawing', () => {
  it('keeps every formula of the measured reply', () => {
    const r = stripUnbackedAsciiDiagram(NEWTON, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(NEWTON)
  })

  it('$$ blocks too', () => {
    const t = 'The area is\n\n$$\nA=\\pi r^2\n$$\n\nfor a circle.'
    expect(stripUnbackedAsciiDiagram(t, false).text).toBe(t)
  })

  it('a delimiter line is not a stroke; real strokes still are', () => {
    for (const d of ['\\[', '\\]', '$$']) expect(isStrokeLine(d)).toBe(false)
    for (const s of ['|', '/ \\', '   ^   ']) expect(isStrokeLine(s)).toBe(true)
  })
})
