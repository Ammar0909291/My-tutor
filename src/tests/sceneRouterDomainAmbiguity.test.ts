/**
 * PCD-026/PCD-027 (physics/chemistry real-student defect audit) — a
 * cross-domain keyword collision in the deterministic scene-generator
 * router: `calculus_graph`'s keyword list included bare 'critical point'/
 * 'critical points', which are also standard chemistry (phase diagrams)
 * and physics (statistical mechanics) terms.
 *
 * `src/tests/visualFailClosed.test.ts` already proves this router is not a
 * runtime authority — the actual figure a learner sees is decided by
 * `resolveVisual`/`resolveVisualForTurn` alone (M1: "the resolver decides,
 * or nothing does"), and `route.ts` never calls `routeSceneGenerator`/
 * `generateRoutedScene` (confirmed by grep: the only occurrence in the
 * route is inside a comment documenting their removal as authorities). So
 * this collision was not learner-reachable on the request path. It is
 * fixed anyway because the module remains on disk as a described
 * "authoring backend" — a latent defect in code the codebase's own
 * comments say may be reconnected later.
 */
import { describe, it, expect } from 'vitest'
import { routeSceneGenerator } from '@/lib/teaching/sceneGenerators/sceneRouter'

describe('the calculus_graph keyword rule no longer hijacks a cross-domain "critical point"', () => {
  it('a chemistry phase-diagram sentence does not route to calculus_graph', () => {
    const prose =
      'Above the critical point, the liquid and gas phases become indistinguishable — ' +
      'this is the critical temperature and critical pressure for the substance.'
    expect(routeSceneGenerator(prose)).not.toBe('calculus_graph')
  })

  it('a physics statistical-mechanics sentence does not route to calculus_graph', () => {
    const prose = 'The critical point sits at kTc/J ~= 2.269 for the 2D Ising model.'
    expect(routeSceneGenerator(prose)).not.toBe('calculus_graph')
  })

  it('a genuine calculus critical-points discussion still routes correctly', () => {
    const prose =
      'To find the critical points, take the derivative and set it to zero — ' +
      'this tells us where the function has a local maximum or local minimum.'
    expect(routeSceneGenerator(prose)).toBe('calculus_graph')
  })

  it('other calculus keywords in the same rule are unaffected', () => {
    expect(routeSceneGenerator('Where is the inflection point of this curve?')).toBe('calculus_graph')
    expect(routeSceneGenerator("Let's find f'(x) for this function.")).toBe('calculus_graph')
    expect(routeSceneGenerator('This is a classic maxima and minima problem.')).toBe('calculus_graph')
  })

  it('bare "critical point"/"critical points" alone route to nothing (never fabricates a domain)', () => {
    expect(routeSceneGenerator('What is a critical point?')).toBeNull()
    expect(routeSceneGenerator('There are two critical points here.')).toBeNull()
  })
})
