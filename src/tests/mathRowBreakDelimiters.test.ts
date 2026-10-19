import { describe, it, expect } from 'vitest'
import { balanceMathDelimiters } from '@/lib/teaching/replyHygiene'

// Live 2026-10-19 (math.linalg.column-space): a matrix written with "\\[2pt]" row spacing came back as "2\\]\[2pt]" — the second backslash
// of the row break was read as the start of "\[", a display formula was opened inside the matrix and then closed again.
describe('a LaTeX row break is not a math delimiter', () => {
  const matrix = String.raw`Take \[ A=\begin{pmatrix} 1 & 0 & 2\\[2pt] 0 & 1 & 3 \end{pmatrix} \]`
  it('leaves a balanced matrix with \\\\[2pt] untouched', () => {
    expect(balanceMathDelimiters(matrix)).toEqual({ text: matrix, repaired: false })
  })
  it('a plain \\\\ row break next to a delimiter pair is untouched too', () => {
    const t = String.raw`\( \begin{pmatrix} 1 & 2\\ 3 & 4 \end{pmatrix} \)`
    expect(balanceMathDelimiters(t).repaired).toBe(false)
  })
  it('still repairs a real unclosed opener after a row break', () => {
    const r = balanceMathDelimiters(String.raw`\\ then \[ x = 1`)
    expect(r.repaired).toBe(true)
    expect(r.text.endsWith(String.raw`\]`)).toBe(true)
  })
})
