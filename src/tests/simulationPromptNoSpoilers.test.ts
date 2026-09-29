/**
 * A served simulation tells the tutor which questions it leaves for the learner
 * to answer by experiment, so the tutor does not answer them first
 * (real-learner run 2026-09-29, P2: "the mass does not appear in the formula"
 * on the turn the heavier-bob prediction was on screen).
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { buildSimulationBlock, servedSimulation, stripSimulationGiveaways } from '@/lib/teaching/visual/simulationPrompt'
import { ensureVisualAcknowledged } from '@/lib/teaching/visual/visualAcknowledgement'

const decisionFor = (conceptId: string) => resolveVisual({ message: '', lessonConceptId: conceptId, learnerRequest: null })

describe('simulation prompt block', () => {
  it('the pendulum simulation names its predictions and forbids giving them away', () => {
    const d = decisionFor('phys.wave.pendulum')
    expect(servedSimulation(d)).not.toBeNull()
    const block = buildSimulationBlock(d)
    expect(block).toContain('make the bob heavier')
    expect(block).toContain('four times as long')
    expect(block).toMatch(/Do NOT tell the learner the answers/)
    expect(buildVisualContractBlock(d)).toContain(block)
  })

  it('Newton\'s second law carries its own questions', () => {
    const block = buildSimulationBlock(decisionFor('phys.mech.newtons-second-law'))
    expect(block).toContain('double the mass')
    expect(block).toContain('double the force')
  })

  it('a static figure gets no simulation block', () => {
    for (const id of ['phys.wave.shm', 'phys.opt.lenses']) {
      const d = decisionFor(id)
      expect(servedSimulation(d)).toBeNull()
      expect(buildSimulationBlock(d)).toBe('')
      expect(buildVisualContractBlock(d)).not.toContain('SIMULATION:')
    }
    expect(buildSimulationBlock(null)).toBe('')
  })

  it('the fallback pointer for a simulation says how to start it', () => {
    const d = decisionFor('phys.wave.pendulum')
    const r = ensureVisualAcknowledged('Period depends on length.', d, true)
    expect(r.appended).toBe(true)
    expect(r.text).toMatch(/Make a prediction first, then press Run/)
    expect(r.text).not.toMatch(/step by step/)
  })
})

// The two production replies (2026-09-29) that stated the heavier-bob answer.
const PROD_A = 'The period of a simple pendulum is essentially the same for every swing **as long as the swing stays small** (typically ≤ 15° from the vertical). In that small-angle range the period depends only on the length L of the string and the local gravitational acceleration g, not on how heavy the bob is or on the exact size of the swing. If you let the pendulum swing with a larger angle, the period becomes a little longer.\n\n"**Inextensible**" means the string does **not stretch**.'
const PROD_B = 'In this situation the period is given by T = 2π√(L/g).\n\nNotice that the mass of the bob (0.5 kg) does not appear in the formula; the period depends only on the fixed length L and the gravitational acceleration g.'
const Q = 'i think every swing take same time? not sure. what mean inextensible?'

describe('the give-away backstop', () => {
  const d = decisionFor('phys.wave.pendulum')

  it('removes the sentence that answers the heavier-bob prediction, and keeps the rest', () => {
    const r = stripSimulationGiveaways(PROD_A, d, Q)
    expect(r.removed).toHaveLength(1)
    expect(r.text).not.toMatch(/heavy/)
    expect(r.text).toContain('as long as the swing stays small')
    expect(r.text).toContain('does **not stretch**')
  })

  it('removes the mass claim but never the formula the lesson teaches', () => {
    const r = stripSimulationGiveaways(PROD_B, d, Q)
    expect(r.text).toContain('T = 2π√(L/g)')
    expect(r.text).not.toMatch(/mass of the bob/)
  })

  it('answers freely when the learner asks about that variable', () => {
    expect(stripSimulationGiveaways('Good question. The mass of the bob does not change the time for one swing.', d, 'does a heavy bob swing slower?').removed).toEqual([])
  })

  it('answers freely once the learner reports a measurement', () => {
    expect(stripSimulationGiveaways(PROD_B, d, 'with 1 kg it is 2.01 s, same as 0.5 kg').removed).toEqual([])
  })

  it('leaves the "does not stretch" sentence alone', () => {
    const t = 'Inextensible means the string does not stretch. Its length stays the same while the bob moves back and forth.'
    expect(stripSimulationGiveaways(t, d, 'what mean inextensible').removed).toEqual([])
  })

  it('Newton: the double-mass answer is removed unless the learner raised mass', () => {
    const n = decisionFor('phys.mech.newtons-second-law')
    const t = 'The block sits on a frictionless track with F = 10 N. If you double the mass with the same force, the acceleration halves. Try it and see.'
    expect(stripSimulationGiveaways(t, n, 'ok what now').text).not.toMatch(/halves/)
    expect(stripSimulationGiveaways(t, n, 'empty cart go more fast because less mass').removed).toEqual([])
  })

  it('does nothing without a simulation on screen', () => {
    expect(stripSimulationGiveaways(PROD_A, decisionFor('phys.wave.shm'), Q).removed).toEqual([])
    expect(stripSimulationGiveaways(PROD_A, null, Q).removed).toEqual([])
  })
})
