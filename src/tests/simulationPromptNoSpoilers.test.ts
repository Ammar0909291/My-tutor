/**
 * A served simulation tells the tutor which questions it leaves for the learner
 * to answer by experiment, so the tutor does not answer them first
 * (real-learner run 2026-09-29, P2: "the mass does not appear in the formula"
 * on the turn the heavier-bob prediction was on screen).
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { buildSimulationBlock, servedSimulation } from '@/lib/teaching/visual/simulationPrompt'
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
