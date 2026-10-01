/**
 * A prediction asked the learner to change a control that was not on screen.
 *
 * 2026-09-30 learner baseline, P3 (phys.osc.simple-pendulum, beginner, phone):
 * the simulation's own prediction said "make the bob heavier … change only m",
 * but a beginner's complexity budget (maxControls 2) cut the third declared
 * variable, `mass`. The learner: "what happen if heavier? i cant find the mass
 * button". The classic heavier-is-slower misconception could not be tested.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { controlsFor, variablesFor, simulationFor, PARAMETRIC_SCENES } from '@/lib/teaching/visual/parametricScenes'
import { complexityFor } from '@/lib/teaching/visual/visualComplexity'

const keys = (vs: readonly { key: string }[]) => vs.map((v) => v.key)

describe('the pendulum, for a beginner', () => {
  const beginner = complexityFor('beginner').maxControls

  it('shows the mass control the heavier-bob prediction needs', () => {
    expect(keys(controlsFor('pendulum_period', beginner))).toContain('mass')
  })

  it('keeps the declared order', () => {
    expect(keys(controlsFor('pendulum_period', beginner))).toEqual(['length', 'amplitudeDeg', 'mass'])
  })
})

describe('every simulation, at every level', () => {
  for (const kind of Object.keys(PARAMETRIC_SCENES)) {
    const sim = simulationFor(kind)
    if (!sim) continue
    for (const level of ['beginner', 'intermediate', 'advanced'] as const) {
      it(`${kind} (${level}): every prediction's varied control is on screen`, () => {
        const shown = new Set(keys(controlsFor(kind, complexityFor(level).maxControls)))
        for (const p of sim.predictions) expect(shown.has(p.tests.vary), `${p.id} varies ${p.tests.vary}`).toBe(true)
      })
    }
  }
})

describe('nothing else changes', () => {
  it('a kind with no simulation is still cut to the budget', () => {
    const kind = Object.keys(PARAMETRIC_SCENES).find((k) => !simulationFor(k) && variablesFor(k).length > 2)
    expect(kind).toBeTruthy()
    expect(controlsFor(kind!, 2)).toEqual(variablesFor(kind!).slice(0, 2))
  })

  it('the figure renders the controls through this rule', () => {
    const src = readFileSync('src/components/school/visuals/ExplainerFigure.tsx', 'utf8')
    expect(src).toContain('controlsFor(spec.parametric?.kind, policy.maxControls)')
    expect(src).not.toContain('allVariables.slice(0, policy.maxControls)')
  })
})
