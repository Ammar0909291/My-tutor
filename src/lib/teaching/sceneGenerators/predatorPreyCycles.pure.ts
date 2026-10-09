/**
 * Predator–prey population cycles — a population-over-time graph, authored for bio.eco.predator-prey-dynamics.
 *
 * WHY THIS EXISTS. The concept was served a three-group text comparison (the prey equation, the predator equation,
 * the predation rate) — equations in words with NO population cycle, though the concept's Learning Objective is to
 * explain boom-bust cycles as an EMERGENT property of the coupled system: "oscillating rises and falls in both predator
 * and prey populations, with the predator cycle typically LAGGING slightly behind the prey cycle … a self-sustaining
 * oscillation that arises from the structure of the coupled equations, with no external disturbance".
 *
 * WHAT IT DRAWS, AND WHERE EACH CLAIM COMES FROM. A time-series of the two populations, computed by integrating the
 * classic Lotka–Volterra pair in dimensionless form,
 *       dx/dt = x (1 − y)      (prey: grows by its own reproduction, falls with predation, which grows with y)
 *       dy/dt = y (x − 1)      (predator: grows with the prey available, falls with its own natural mortality)
 * so each growth rate depends on BOTH populations (the coupling) and the curves are a genuine solution, not a drawn
 * wave. It is deliberately SCALE-FREE: the vertical axis is "population size (relative)" with no numbers, the time axis
 * has none either, and the parameters are arbitrary. No dataset, no real species and no period are claimed. The lag it
 * shows is the one the entry states ("typically lagging"); nothing else about phase is asserted.
 * The causal loop the entry spells out is marked on one cycle, and the two components of predation (functional response:
 * a single predator's kill rate against prey density; numerical response: the predator POPULATION following prey supply)
 * are tied to where they act on the curves.
 *
 * Follows the M4 authoring rules (physicsPilot.ts): shared palette and primitives from visualDesign.ts, labels are names,
 * steps are cumulative, the axes are arrows with their names beside them. Deterministic and parameter-free.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { ROLE, arrow, label } from './visualDesign'
import { round } from './shared'

const PREY = ROLE.result
const PREDATOR = ROLE.input

// ── the dimensionless Lotka–Volterra solution ─────────────────────────────────────────────────────────────────────
const X0 = 1.0   // prey, at its equilibrium value
const Y0 = 0.55  // predator, below equilibrium: the cycle starts with prey free to grow
const DT = 0.01

interface Sample { t: number; x: number; y: number }

function integrate(tMax: number): Sample[] {
  const f = (x: number, y: number): [number, number] => [x * (1 - y), y * (x - 1)]
  const out: Sample[] = []
  let x = X0, y = Y0
  for (let i = 0; i * DT <= tMax + 1e-9; i++) {
    out.push({ t: i * DT, x, y })
    const [k1x, k1y] = f(x, y)
    const [k2x, k2y] = f(x + (DT / 2) * k1x, y + (DT / 2) * k1y)
    const [k3x, k3y] = f(x + (DT / 2) * k2x, y + (DT / 2) * k2y)
    const [k4x, k4y] = f(x + DT * k3x, y + DT * k3y)
    x += (DT / 6) * (k1x + 2 * k2x + 2 * k3x + k4x)
    y += (DT / 6) * (k1y + 2 * k2y + 2 * k3y + k4y)
  }
  return out
}

/** The time at which the orbit first comes back to its starting point: one full cycle. */
function period(): number {
  const s = integrate(40)
  let best = { t: 0, d: Infinity }
  for (const p of s) {
    if (p.t < 3) continue
    const d = Math.hypot(p.x - X0, p.y - Y0)
    if (d < best.d) best = { t: p.t, d }
    if (p.t > 3 && best.d < 1e-3 && d > best.d * 3) break
  }
  return best.t
}

const CYCLES = 2

// ── the graph frame ─────────────────────────────────────────────────────────────────────────────────────────────────
const ORIGIN: Vec3 = [-6, -3.2, 0]
const X_END = 6.8
const Y_END = 4.7
const PLOT_W = 12.2    // width the time span is mapped onto
const PLOT_H = 7.0     // height the relative-population range is mapped onto

export const PREDATOR_PREY_SCENE_ID = 'predator-prey-cycles'

export function buildPredatorPreyScene(): SceneSpec {
  const T = period() * CYCLES
  const series = integrate(T)
  const vMax = Math.max(...series.map((s) => Math.max(s.x, s.y)))
  const vMin = Math.min(...series.map((s) => Math.min(s.x, s.y)))
  const px = (t: number): number => round(ORIGIN[0] + 0.2 + (t / T) * PLOT_W)
  const py = (v: number): number => round(ORIGIN[1] + 0.35 + ((v - vMin) / (vMax - vMin)) * PLOT_H)

  // ~110 points per curve: enough for the round joints to read as a smooth line.
  const N = 110
  const sample = (key: 'x' | 'y'): Vec3[] =>
    Array.from({ length: N + 1 }, (_, i) => {
      const s = series[Math.round((i / N) * (series.length - 1))]
      return [px(s.t), py(s[key]), 0] as Vec3
    })
  const preyPts = sample('x')
  const predPts = sample('y')

  // The first cycle's turning points, in the order the causal loop visits them.
  const peak = (key: 'x' | 'y', after: number, kind: 'max' | 'min'): Sample => {
    let best: Sample | null = null
    for (const s of series) {
      if (s.t <= after || s.t > T / CYCLES + after) continue
      if (!best || (kind === 'max' ? s[key] > best[key] : s[key] < best[key])) best = s
    }
    return best as Sample
  }
  const preyMax = peak('x', 0.2, 'max')
  const predMax = peak('y', preyMax.t, 'max')
  const preyMin = peak('x', predMax.t, 'min')
  const predMin = peak('y', preyMin.t, 'min')
  const second = (key: 'x' | 'y'): Sample => series.filter((s) => s.t > T / CYCLES).reduce((a, b) => (b[key] > a[key] ? b : a))
  const prey2 = second('x')
  const pred2 = second('y')
  const at = (s: Sample, key: 'x' | 'y'): Vec3 => [px(s.t), py(s[key]), 0]
  const marker = (id: string, text: string, pos: Vec3, colour: string, above: boolean): SceneObject => ({
    type: 'node', id, position: pos, radius: 0.2, color: colour, text,
    properties: { labelOffset: [0, above ? 0.75 : -0.75, 0] },
  })

  // ── stage 1: the axes and the prey ────────────────────────────────────────────────────────────────────────────
  const frame: SceneObject[] = [
    arrow(ORIGIN, [X_END, ORIGIN[1], 0], ROLE.reference),
    arrow(ORIGIN, [ORIGIN[0], Y_END, 0], ROLE.reference),
    label('Time', [X_END + 0.1, ORIGIN[1] - 0.7, 0], ROLE.reference, 'detail'),
    { ...label('Population size (relative)', [ORIGIN[0] + 0.2, Y_END + 0.8, 0], ROLE.reference, 'detail'), properties: { labelWrapUnits: 6 } },
  ]
  const prey: SceneObject[] = [
    { type: 'path', id: 'prey-curve', points: preyPts, color: PREY, thickness: 0.07, radius: 0.07, properties: { trace: false } },
    // Named at the SECOND prey peak, where there is room above it; at the first it ran into the vertical axis.
    label('Prey', [px(prey2.t), py(prey2.x) + 0.95, 0], PREY, 'primary'),
  ]
  // ── stage 2: the predator, lagging ────────────────────────────────────────────────────────────────────────────
  const predator: SceneObject[] = [
    { type: 'path', id: 'predator-curve', points: predPts, color: PREDATOR, thickness: 0.07, radius: 0.07, properties: { trace: false } },
    label('Predator', [px(pred2.t) + 2.3, py(pred2.y) - 0.1, 0], PREDATOR, 'primary'),
  ]
  // ── stage 3: one turn of the loop, in order ───────────────────────────────────────────────────────────────────
  const loop: SceneObject[] = [
    marker('phase-1', '1', at(preyMax, 'x'), PREY, true),
    marker('phase-2', '2', at(predMax, 'y'), PREDATOR, true),
    marker('phase-3', '3', at(preyMin, 'x'), PREY, false),
    marker('phase-4', '4', at(predMin, 'y'), PREDATOR, false),
  ]
  // ── stage 4: where the two components of predation act ────────────────────────────────────────────────────────
  const riseMid = series.find((s) => s.t >= (preyMax.t + predMax.t) / 2) ?? predMax
  const fallMid = series.find((s) => s.t >= (preyMax.t + preyMin.t) / 2) ?? preyMin
  // Short names under the graph, each with an arrow up to where it acts; the sentences are in the narration. (Long callouts
  // beside or over the plot ran across the curves, and pushed the camera back until the graph was a thumbnail.)
  const BELOW = ORIGIN[1] - 2.3
  const responses: SceneObject[] = [
    { ...label('Numerical response', [px(riseMid.t) - 0.4, BELOW, 0], PREDATOR, 'detail'), properties: { labelWrapUnits: 5 } },
    arrow([px(riseMid.t) + 0.1, BELOW + 0.6, 0], [px(riseMid.t) + 0.1, py(riseMid.y) - 0.25, 0], PREDATOR),
    { ...label('Functional response', [px(fallMid.t) + 3.2, BELOW, 0], PREY, 'detail'), properties: { labelWrapUnits: 5 } },
    arrow([px(fallMid.t) + 0.9, BELOW + 0.6, 0], [px(fallMid.t) + 0.12, py(fallMid.x) - 0.25, 0], PREY),
  ]

  const steps: SceneStep[] = [
    {
      intent: 'establish',
      narration:
        'Prey population over time. Its growth rate rises with its own reproduction but FALLS with predation, which depends on how many predators there are. ' +
        'The vertical axis is relative population size: the shape of the cycle is the point, not any numbers.',
      objects: [...frame, ...prey],
    },
    {
      intent: 'relate',
      narration:
        'Predator population over time. Its growth rate rises with the prey available to eat and falls with its own natural mortality. Each growth rate depends on ' +
        'BOTH populations, so the two equations cannot be solved one at a time — and the predator cycle typically lags a little behind the prey cycle.',
      objects: predator,
    },
    {
      intent: 'resolve',
      narration:
        'One turn of the cycle, with no outside disturbance. (1) Abundant prey lets the predator population grow. (2) The growing predator population depletes the prey. ' +
        '(3) With prey scarce, predators can no longer be supported, so they decline. (4) Less predation lets the prey recover — and the cycle restarts. ' +
        'The oscillation is a consequence of the coupling itself.',
      objects: loop,
    },
    {
      intent: 'connect',
      narration:
        'Predation pressure has two parts that act at different levels. The functional response is how many prey ONE predator kills as prey density changes (individual ' +
        'behaviour, e.g. limited by handling time). The numerical response is how the predator POPULATION changes with prey supply, through reproduction and migration, over a longer timescale. Both together decide the pressure the prey feel.',
      objects: responses,
    },
  ]

  return {
    id: PREDATOR_PREY_SCENE_ID,
    title: 'Predator and Prey: Coupled Populations Cycle',
    sceneType: 'plot',
    teachingGoal:
      'Each population\'s growth rate depends on BOTH populations (the coupling), and boom-bust cycles — the predator cycle typically lagging the prey cycle — ' +
      'emerge from that coupling alone, with no external disturbance; predation pressure has a functional and a numerical component.',
    cameraDistance: 12.5,
    ariaLabel:
      'A graph of population size against time with two curves that rise and fall repeatedly. The prey curve peaks first; the predator curve peaks a little later, then the prey ' +
      'fall and the predators decline after them, and the cycle repeats. Four numbered points mark one turn of the cycle: prey peak, predator peak, prey trough, predator trough. ' +
      'Axes carry no numbers: the curves are relative.',
    explainer: {
      panels: [
        {
          heading: 'Why they cycle',
          body:
            'Prey: growth rate rises with its own reproduction and falls with predation (which depends on predator numbers). Predator: growth rate rises with prey available and falls ' +
            'with its own natural mortality. Each equation needs the other population\'s size — a coupled system.',
        },
      ],
      insight: {
        heading: 'What to take from the graph',
        bullets: [
          'Both populations oscillate together; the predator cycle typically lags the prey cycle.',
          'No outside disturbance is needed: the cycle is emergent from the coupling.',
          'The curves are illustrative and relative — they show the shape of the behaviour, not data from a real species.',
        ],
      },
    },
    steps,
  }
}
