/**
 * complexEquilibria — `chem.equil.complex-equil` drawn as the arithmetic the lesson teaches.
 *
 * The concept was served a generated five-box flowchart ("write the Kf expression → … → solve for x"): the procedure for working a
 * problem, with no equilibrium constant on it (learner run, 2026-10-21). The idea at the centre of the lesson is that when
 * AgCl(s) meets excess NH₃ two equilibria are ADDED, so their K values are MULTIPLIED, and on a log scale the bars simply stack:
 *
 *   AgCl(s) ⇌ Ag⁺ + Cl⁻                    Ksp = 1.8 × 10⁻¹⁰   (log K ≈ −9.7, a long bar down)
 *   Ag⁺ + 2NH₃ ⇌ [Ag(NH₃)₂]⁺               Kf  = 1.7 × 10⁷     (log K ≈ +7.2, a bar up from where the first one ended)
 *   AgCl(s) + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻     K   = Ksp × Kf = 3.1 × 10⁻³ (log K ≈ −2.5, the bar from K = 1 down to where the stack ended)
 *
 * Numbers are the Educational Brain entry's own (Core Understanding). The axis is log₁₀ K and the line at log K = 0 is K = 1.
 *
 * THE CONSISTENCY GUARANTEE. Every number in a label is FORMATTED from the length of the bar it names; `checkComplexEquilibriaConsistency`
 * re-derives K from the drawn bars and fails if a label disagrees, if the net bar is not the Ksp bar and the Kf bar stacked end to end,
 * or if the net bar does not end exactly where the Kf bar does (the stack is what "multiply the K values" means).
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

/** The constants of the lesson's worked example (educational-brain/concepts/chemistry/chem.equil.complex-equil.md). */
export const KSP = 1.8e-10
export const KF = 1.7e7
/** Scene units per decade of K. */
export const SCALE = 0.6
const AXIS_X = -8.2
export const BAR_X = { ksp: -4.6, kf: 0.4, net: 5.4 } as const
const BAR_THICKNESS = 0.55
const Y_TOP = 5.6, Y_BOTTOM = -7.6

/** log₁₀ K as a height. */
export const yOf = (k: number): number => round(Math.log10(k) * SCALE)
/** K read back from a height. */
export const kOf = (y: number): number => Math.pow(10, y / SCALE)

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }
/** 1.8e-10 → "1.8×10⁻¹⁰" (two significant figures, as the lesson writes them). */
export function sci(k: number): string {
  const e = Math.floor(Math.log10(k) + 1e-9)
  const m = Math.round((k / Math.pow(10, e)) * 10) / 10
  const [mm, ee] = m >= 10 ? [1, e + 1] : [m, e]
  return `${mm.toFixed(1)}×10${String(ee).split('').map((c) => SUP[c]).join('')}`
}

/** The three bars: [from y, to y]. The Kf bar starts where the Ksp bar ends; the net bar starts at K = 1 and ends where the Kf bar does. */
export function bars() {
  const ksp = yOf(KSP), kf = yOf(KF), net = round(ksp + kf)
  return {
    ksp: [0, ksp] as const,
    kf: [ksp, net] as const,
    net: [0, net] as const,
  }
}
export const NET_K = KSP * KF

export function buildComplexEquilibriaScene(): SceneSpec {
  const b = bars()
  const v = (x: number, [y0, y1]: readonly [number, number], color: string) => line([x, y0, 0], [x, y1, 0], color, BAR_THICKNESS)
  const axes: SceneObject[] = [
    arrow([AXIS_X, Y_BOTTOM, 0], [AXIS_X, Y_TOP, 0], ROLE.reference),
    arrow([AXIS_X, 0, 0], [9, 0, 0], ROLE.reference),
    label('log K', [AXIS_X + 1.1, Y_TOP + 0.4, 0], ROLE.ink, 'detail'),
    label('K = 1', [8.0, 0.8, 0], ROLE.reference, 'detail'),
  ]
  const kspBar: SceneObject[] = [
    v(BAR_X.ksp, b.ksp, ROLE.input),
    label(`Ksp ${sci(KSP)}`, [BAR_X.ksp, b.ksp[1] - 0.9, 0], ROLE.input, 'detail'),
  ]
  const kfBar: SceneObject[] = [
    v(BAR_X.kf, b.kf, ROLE.output),
    label(`Kf ${sci(KF)}`, [BAR_X.kf, b.kf[0] - 0.9, 0], ROLE.output, 'detail'),
    line([BAR_X.ksp, b.ksp[1], 0], [BAR_X.kf, b.kf[0], 0], ROLE.reference, 0.04),
  ]
  const netBar: SceneObject[] = [
    v(BAR_X.net, b.net, ROLE.result),
    label(`Ksp × Kf = ${sci(NET_K)}`, [BAR_X.net, b.net[1] - 0.9, 0], ROLE.result, 'detail'),
    line([BAR_X.kf, b.kf[1], 0], [BAR_X.net, b.net[1], 0], ROLE.reference, 0.04),
    dot([BAR_X.net, b.net[1], 0], ROLE.result, 0.2),
  ]
  return {
    id: 'complex-equilibria-log-k',
    title: 'AgCl in Excess NH₃: Two Equilibria Added, Two K Values Multiplied',
    sceneType: 'plot',
    teachingGoal: 'Adding equilibria multiplies their K values, so on a log scale the bars stack: the net constant for AgCl(s) + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻ is Ksp × Kf.',
    cameraDistance: 21,
    ariaLabel: 'A bar chart of log K for silver chloride dissolving in ammonia. The first bar goes far below K = 1: the solubility product of AgCl, 1.8 times ten to the minus ten. The second bar starts where the first ended and goes up: the formation constant of the diammine silver complex, 1.7 times ten to the seven. The third bar runs from K = 1 down to the top of the second: the net constant, the product of the two, 3.1 times ten to the minus three.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Equilibrium constants span many powers of ten, so plot log K. The line at log K = 0 is K = 1. First equilibrium: AgCl(s) ⇌ Ag⁺ + Cl⁻, Ksp = 1.8×10⁻¹⁰. A long bar far below 1: the solid barely dissolves on its own.', objects: [...axes, ...kspBar], intent: 'establish' },
      { narration: 'Second equilibrium: Ag⁺ + 2NH₃ ⇌ [Ag(NH₃)₂]⁺, Kf = 1.7×10⁷. A bar UP of about the same length, drawn from where the first one ended: NH₃ holds Ag⁺ very strongly, so Ag⁺ is pulled out of solution.', objects: kfBar, intent: 'relate' },
      { narration: 'Add the two equations: AgCl(s) + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻. Adding equations multiplies the K values, so the logs add: the net bar ends where the stack ended, K = Ksp × Kf = 3.1×10⁻³. Far above 1 the solid dissolves, far below it stays; this one is between, so it takes excess NH₃.', objects: netBar, intent: 'resolve' },
    ],
  }
}

export function checkComplexEquilibriaConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const vertical = objects.filter((o) => o.type === 'bond' && o.from && o.to && Math.abs(o.from[0] - o.to[0]) < 1e-9 && Math.abs(o.to[1] - o.from[1]) > 0.3)
  const barAt = (x: number) => vertical.find((o) => Math.abs(o.from![0] - x) < 1e-9)
  const ksp = barAt(BAR_X.ksp), kf = barAt(BAR_X.kf), net = barAt(BAR_X.net)
  if (!ksp || !kf || !net) return { ok: false, errors: ['the figure must draw three bars: Ksp, Kf and the net constant'] }
  const dy = (o: SceneObject) => o.to![1] - o.from![1]
  const text = objects.map((o) => o.text ?? '').join(' | ')

  if (Math.abs(ksp.from![1]) > 1e-6) errors.push('the Ksp bar does not start at K = 1')
  if (Math.abs(net.from![1]) > 1e-6) errors.push('the net bar does not start at K = 1')
  if (Math.abs(kf.from![1] - ksp.to![1]) > 1e-6) errors.push('the Kf bar does not start where the Ksp bar ended')
  if (Math.abs(net.to![1] - kf.to![1]) > 1e-6) errors.push('the net bar does not end where the Kf bar ends: the stack is not Ksp × Kf')
  if (Math.abs(dy(net) - (dy(ksp) + dy(kf))) > 1e-6) errors.push('the net bar is not the Ksp bar and the Kf bar added end to end')
  if (!(dy(ksp) < 0)) errors.push('Ksp is not drawn below K = 1 (the solid is sparingly soluble)')
  if (!(dy(kf) > 0)) errors.push('Kf is not drawn as an upward bar (a stable complex has K > 1)')

  // Each number in a label must be the one read back from the bar it names.
  const kspRead = kOf(ksp.to![1]), kfRead = kOf(ksp.to![1] + dy(kf)) / kOf(ksp.to![1]), netRead = kOf(net.to![1])
  for (const [name, k] of [['Ksp', kspRead], ['Kf', kfRead], ['Ksp × Kf =', netRead]] as const) {
    const want = `${name} ${sci(k)}`
    if (!text.includes(want)) errors.push(`the label for ${name} should read "${want}" (derived from its bar)`)
  }
  // The lesson's own figures (Ksp, Kf, net) come out of the drawing, not out of a constant.
  if (sci(kspRead) !== sci(KSP) || sci(kfRead) !== sci(KF) || sci(netRead) !== sci(NET_K)) errors.push('a bar does not draw the lesson’s constant')
  for (const need of ['log K', 'K = 1']) if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  return { ok: errors.length === 0, errors }
}
