/**
 * The tutor named figure colours it was never told.
 *
 * 2026-09-30 learner baseline (real account, real browser):
 *   P1 Newton's second law — "in the picture there is blue line and green
 *     line. what they mean?" → "The blue line you see is the velocity-time
 *     graph… The green line is the track." In the figure the v–t graph is
 *     GREEN, blue is the acceleration arrow, the track is grey. A model-made
 *     quick check was then built on the wrong key.
 *   P2 Faraday's law — "The red curve is the plotted EMF" — red is the flux.
 *
 * The scene stores every object's colour; the semantics never passed it on,
 * so the model guessed. Colours are now read off the drawn objects.
 */
import { describe, it, expect } from 'vitest'
import { describeVisualPayload, buildSemanticsBlock, colourName, idName } from '@/lib/teaching/visual/visualSemantics'
import { buildNewtonScene } from '@/lib/teaching/sceneGenerators/newtonSecondLaw.pure'
import { buildFaradaysLawScene } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB4'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'

const colourLine = (colours: string[] | undefined, name: string) =>
  (colours ?? []).find((c) => c.startsWith(`${name}:`)) ?? ''

describe('P1 — Newton\'s second law figure', () => {
  const sem = describeVisualPayload({ renderer: 'scene', sceneSpec: buildNewtonScene({ force: 10, mass: 2 }, 100) } as never)

  it('the velocity-time curve is reported GREEN, not blue', () => {
    expect(colourLine(sem.colours, 'green')).toMatch(/plotted curve/)
    expect(colourLine(sem.colours, 'blue')).not.toMatch(/plotted curve/)
  })

  it('blue is the acceleration, red is the force', () => {
    expect(colourLine(sem.colours, 'blue')).toContain('a = ')
    expect(colourLine(sem.colours, 'red')).toContain('F = 10 N')
  })

  it('the track is grey', () => {
    expect(colourLine(sem.colours, 'grey')).toContain('frictionless track')
  })

  it('the prompt carries the colours and the rule to use only them', () => {
    const block = buildSemanticsBlock(sem)
    expect(block).toContain('COLOURS, exactly as drawn')
    expect(block).toMatch(/green: [^;]*plotted curve/)
  })
})

describe('P2 — Faraday\'s law figure', () => {
  const scene = buildFaradaysLawScene()
  const sem = describeVisualPayload({ renderer: 'scene', sceneSpec: scene } as never)

  it('every chromatic colour drawn is reported with its own parts', () => {
    const drawn = new Set(
      scene.steps.flatMap((s) => s.objects).map((o) => colourName(o.color)).filter((c): c is string => !!c),
    )
    for (const c of drawn) expect(colourLine(sem.colours, c), c).not.toBe('')
  })

  it('red is not reported as the EMF', () => {
    expect(colourLine(sem.colours, 'red').toLowerCase()).not.toMatch(/emf|ε/)
  })

  it('each unlabelled curve is tied to the stage that narrates it (flux = stage 1, EMF = stage 2)', () => {
    expect(colourLine(sem.colours, 'red')).toMatch(/plotted curve.*stage 1\)/)
    expect(colourLine(sem.colours, 'blue')).toMatch(/plotted curve.*stage 2\)/)
    expect(scene.steps[0].narration).toMatch(/flux/)
    expect(scene.steps[1].narration).toMatch(/EMF/)
  })
})

describe('colour naming', () => {
  it('names every semantic role by its hue', () => {
    expect(colourName(ROLE.input)).toBe('red')
    expect(colourName(ROLE.output)).toBe('blue')
    expect(colourName(ROLE.result)).toBe('green')
    expect(colourName(ROLE.aid)).toBe('purple')
    expect(colourName(ROLE.reference)).toBe('grey')
  })

  it('never names theme-flipped ink or anything it cannot parse', () => {
    expect(colourName(ROLE.ink)).toBeNull()
    expect(colourName('#111111')).toBeNull()
    expect(colourName('var(--x)')).toBeNull()
    expect(colourName(undefined)).toBeNull()
  })

  it('a figure with no colours says so instead of leaving room to guess', () => {
    const block = buildSemanticsBlock({ caption: 'x', elements: ['a'], readable: ['a'], geometry: [], equations: [], steps: [] })
    expect(block).toContain('No colour information')
  })
})

/**
 * Follow-up, measured LIVE on the deployed colour fix (2026-10-01, Newton,
 * t = 0): "the green marked point marks the block". The colour was right, the
 * meaning was guessed — the green point is the current velocity on the graph
 * (id `current-velocity`); the block is ink. The generator's own id names it.
 */
describe('an unlabelled shape is named by its generator id', () => {
  const sem = describeVisualPayload({ renderer: 'scene', sceneSpec: buildNewtonScene({ force: 10, mass: 2 }, 0) } as never)

  it('the green point is the current velocity, in so many words', () => {
    expect(colourLine(sem.colours, 'green')).toContain('a marked point ("current velocity")')
  })

  it('ids become words; bare or numbered ids say nothing', () => {
    expect(idName('velocity-time-graph')).toBe('velocity time graph')
    expect(idName('torqueLabel')).toBe('torque label')
    for (const bad of ['A', 'v1f', 'u2', 'obj1-after', undefined, '']) expect(idName(bad as string | undefined), String(bad)).toBeNull()
  })
})
