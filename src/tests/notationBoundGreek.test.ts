import { describe, it, expect } from 'vitest'
import { notationBeyondCard } from '@/lib/teaching/remediationOutputContract'
import { REMEDIATION_CARDS, renderRemediationCard } from '@/lib/teaching/remediationCards'

const CARD = renderRemediationCard(
  REMEDIATION_CARDS.find((c) => c.conceptId === 'phys.rel.time-dilation')!,
)

describe('the notation bound covers Greek, not only mu', () => {
  it('catches the production turn verbatim', () => {
    // phys.rel.time-dilation, HELD turn, 2026-08-27. The learner had said they
    // did not understand, been given the card, said "ok sir", and got this.
    const prod =
      'Key idea: the time measured by the moving clock (its proper time Δτ) is '
      + 'shorter than the time measured by a stationary observer (the coordinate '
      + 'time Δt). Δt = γ Δτ with γ = 1 / √(1 – v²/c²).'
    expect(notationBeyondCard(prod, CARD)).toBe(true)
  })

  it('catches Greek symbols generally and the radical sign', () => {
    for (const s of [
      'The angle θ grows as the speed rises.',
      'Entropy is the logarithm of Ω.',
      'The factor is 1 / √2.',
      'Coefficient μ applies here.',
      'Wavelength λ shortens.',
    ]) expect(notationBeyondCard(s, CARD), s).toBe(true)
  })

  it('leaves ordinary teaching prose alone', () => {
    for (const s of [
      'Gamma rays carry away leftover energy and change no element.',
      'The area is 5 m² and the water is H₂O.',
      'Take the square root of two and you get about 1.41.',
      'A muon lives about two millionths of a second.',
      'Alpha particles are stopped by a sheet of paper.',
    ]) expect(notationBeyondCard(s, CARD), s).toBe(false)
  })

  it('a card that legitimately carries notation is not bounded by itself', () => {
    // The check only bans what the approved account does NOT contain.
    expect(notationBeyondCard('The factor γ appears here.', 'Something with γ in it.')).toBe(false)
  })

  it('no card in the corpus is flagged by the widened rule', () => {
    const flagged = REMEDIATION_CARDS
      .filter((c) => notationBeyondCard(renderRemediationCard(c), ''))
      .map((c) => c.conceptId)
    expect(flagged).toEqual([])
  })
})
