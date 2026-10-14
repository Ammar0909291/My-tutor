import { describe, expect, it } from 'vitest'
import { authoredProseForLearner, superscriptOrbitalOccupancy } from '@/lib/teaching/authoredProseForLearner'

describe('orbital occupancy is shown as a superscript in authored prose (chemistry QA 2026-10-14)', () => {
  it('the live case: the iron wrong-answer correction', () => {
    const served = authoredProseForLearner('Not quite — the answer is: 3d — the d-block in period n fills (n-1)d, always one behind the period number. Iron is [Ar]3d6 4s2')
    expect(served).toContain('[Ar]3d⁶ 4s²')
    expect(served).not.toMatch(/3d6|4s2/)
  })
  it('handles two-digit occupancy and every subshell letter', () => {
    expect(superscriptOrbitalOccupancy('Cu is [Ar]3d10 4s1; Ne is 1s2 2s2 2p6; Gd has 4f7')).toBe('Cu is [Ar]3d¹⁰ 4s¹; Ne is 1s² 2s² 2p⁶; Gd has 4f⁷')
  })
  it('leaves bare labels, words, longer numbers and already-superscripted text alone', () => {
    for (const t of ['the 3d subshell fills after 4s', 'A3d6', '13d6', 'level 8s2', 'ab3d6', 'The 3d⁶ 4s² configuration', '3d123']) {
      expect(superscriptOrbitalOccupancy(t)).toBe(t)
    }
  })
  it('does not disturb the existing emphasis lowering or formula protection', () => {
    expect(authoredProseForLearner('The STRONGER acid is NaCl at 4s2')).toBe('The stronger acid is NaCl at 4s²')
  })
})
