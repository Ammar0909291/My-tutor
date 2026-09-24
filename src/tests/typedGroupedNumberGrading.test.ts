/**
 * A GROUPED NUMBER IS ONE NUMBER (real-student session, phys.therm.calorimetry,
 * 2026-09-24): the option "84 000 J" was read as leading value 84, so the
 * learner's correct typed answer "84000 J" — and the worked line
 * "0.5 x 4200 x 40 = 84000 J" — were never graded.
 */
import { describe, it, expect } from 'vitest'
import { resolveMcqChoice, foldDigitGroups } from '@/lib/teaching/mcq'

const q = {
  question: 'How much heat is needed to raise the temperature of 0.50 kg of water from 20 °C to 60 °C? (c = 4200 J kg⁻¹ K⁻¹)',
  options: ['84 000 J', '126 000 J — using the final temperature as ΔT', '2100 J — leaving ΔT out altogether', '168 000 J — using 1 kg instead of 0.50 kg'],
  correctIndex: 0,
} as never

describe('typed answers to a grouped-number option', () => {
  for (const a of ['84000 J', '84000', '84 000 J', '84,000 J', '0.5 x 4200 x 40 = 84000 J', 'A']) {
    it(`"${a}" -> the 84 000 J option`, () => expect(resolveMcqChoice(a, q)).toBe(0))
  }
  it('a distractor typed without its separator resolves to that distractor', () => {
    expect(resolveMcqChoice('126000 J', q)).toBe(1)
  })
})

describe('foldDigitGroups is narrow', () => {
  it('joins real digit groups only', () => {
    expect(foldDigitGroups('84 000 J and 1,200,000 N')).toBe('84000 J and 1200000 N')
    expect(foldDigitGroups('0.5 x 4200 x 40')).toBe('0.5 x 4200 x 40')
    expect(foldDigitGroups('pick 5, 100 or 12')).toBe('pick 5, 100 or 12')
    expect(foldDigitGroups('2 3 4')).toBe('2 3 4')
  })
})
