/**
 * photochemistryFate — `chem.kinet.photochemistry` drawn as what happens to a molecule that absorbs a photon.
 *
 * The concept was served a generated six-box flowchart whose last two boxes ("Determine quantum yield", "Apply Beer-Lambert law") are
 * calculation steps, not part of the process, with no energy anywhere on it (learner run, 2026-10-21). The lesson's own picture (Educational Brain
 * entry, Core Understanding and "The photon as a key") is an energy ladder:
 *
 *   one photon of the right energy (E = hν = hc/λ) lifts one molecule from its ground state to an excited state — a photon is consumed once
 *   (the Stark–Einstein law: at most one molecule excited per photon);
 *   the excited molecule does ONE of: the primary photochemical step (the bond breaks, radicals form), or falls back harmlessly —
 *   emitting light (fluorescence) or giving the energy away as heat (quenching);
 *   the primary products then react by THERMAL steps with no further light (the secondary process) — which is how one photon can give many
 *   product molecules (quantum yield above 1, a chain reaction) or, when the harmless routes win, fewer than one (Φ < 1).
 *
 * Every word is one the lesson uses; the figure carries no number. `checkPhotochemistryConsistency` re-derives the structure from the drawn
 * geometry: exactly one photon arrow, from the ground level up to the excited level; the two harmless arrows and the primary arrow all LEAVE the
 * excited level; the secondary arrow starts where the primary one ended.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import type { ConsistencyResult } from './shared'

export const LEVEL = { ground: -2.8, excited: 2.2 } as const
export const LEVEL_X = { from: -6.5, to: 2.5 } as const
export const ARROW_X = { photon: -5.6, light: -1.6, heat: 1.6 } as const
export const PRIMARY = { from: [2.5, 2.2, 0] as const, to: [7, 4.0, 0] as const }
export const SECONDARY_TO_Y = -0.8

export function buildPhotochemistryScene(): SceneSpec {
  const levels: SceneObject[] = [
    line([LEVEL_X.from, LEVEL.ground, 0], [LEVEL_X.to, LEVEL.ground, 0], ROLE.reference, 0.12),
    line([LEVEL_X.from, LEVEL.excited, 0], [LEVEL_X.to, LEVEL.excited, 0], ROLE.reference, 0.12),
    label('ground state', [-9.6, LEVEL.ground, 0], ROLE.ink, 'detail'),
    label('excited state', [-9.6, LEVEL.excited, 0], ROLE.ink, 'detail'),
  ]
  const photon: SceneObject[] = [
    arrow([ARROW_X.photon, LEVEL.ground, 0], [ARROW_X.photon, LEVEL.excited, 0], ROLE.input),
    label('photon hν', [ARROW_X.photon, LEVEL.ground - 1.0, 0], ROLE.input, 'detail'),
  ]
  const harmless: SceneObject[] = [
    arrow([ARROW_X.light, LEVEL.excited, 0], [ARROW_X.light, LEVEL.ground, 0], ROLE.aid),
    label('light out', [ARROW_X.light, LEVEL.ground - 1.0, 0], ROLE.aid, 'detail'),
    arrow([ARROW_X.heat, LEVEL.excited, 0], [ARROW_X.heat, LEVEL.ground, 0], ROLE.aid),
    label('heat', [ARROW_X.heat, LEVEL.ground - 1.0, 0], ROLE.aid, 'detail'),
  ]
  const chemistry: SceneObject[] = [
    arrow([...PRIMARY.from], [...PRIMARY.to], ROLE.result),
    dot([...PRIMARY.to], ROLE.result, 0.22),
    label('bond breaks', [7.6, PRIMARY.to[1] + 1.0, 0], ROLE.result, 'detail'),
    arrow([PRIMARY.to[0], PRIMARY.to[1], 0], [PRIMARY.to[0], SECONDARY_TO_Y, 0], ROLE.output),
    label('thermal, no light', [PRIMARY.to[0] + 0.4, SECONDARY_TO_Y - 1.0, 0], ROLE.output, 'detail'),
    label('Φ = products ÷ photons', [3.2, LEVEL.ground - 2.5, 0], ROLE.ink, 'detail'),
  ]
  return {
    id: 'photochemistry-fate-of-excited-molecule',
    title: 'Photochemistry: One Photon Excites One Molecule, Then Three Fates',
    sceneType: 'plot',
    teachingGoal: 'A photon of the right energy excites a molecule once; the excited molecule either reacts (the primary step, followed by thermal secondary steps) or falls back as light or heat, and the quantum yield counts products per photon absorbed.',
    cameraDistance: 20,
    ariaLabel: 'An energy ladder with a ground state at the bottom and an excited state above it. One arrow, a photon, lifts the molecule from the ground state to the excited state. From the excited state two arrows go back down to the ground state, one for light given out and one for heat. A third arrow leaves the excited state to the right: the bond breaks and radicals form, the primary photochemical step; from there a last arrow, labelled thermal steps with no light, leads on to the products. The quantum yield, phi, is products per photon absorbed.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A molecule sits in its ground state. A photon whose energy matches the gap, E = hν = hc/λ, lifts it to an excited state. One photon excites at most one molecule: light is used up here, once.', objects: [...levels, ...photon], intent: 'establish' },
      { narration: 'The excited molecule does not have to react. It can fall straight back down, giving the energy out as light or handing it on as heat. Neither makes a product, and every molecule that does this lowers the quantum yield.', objects: harmless, intent: 'relate' },
      { narration: 'Or the energy breaks a bond: radicals form. That is the primary photochemical step. What follows is thermal, with no more light: the radicals react on. A chain of such steps can make many products from one photon, so Φ, products per photon absorbed, can be above 1; the two harmless routes pull it below 1.', objects: chemistry, intent: 'resolve' },
    ],
  }
}

export function checkPhotochemistryConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const arrows = objects.filter((o) => o.type === 'arrow' && o.from && o.to)
  const levels = objects.filter((o) => o.type === 'bond' && o.from && o.to && Math.abs(o.from[1] - o.to[1]) < 1e-9 && Math.abs(o.to[0] - o.from[0]) > 5)
  const text = objects.map((o) => o.text ?? '').join(' | ')
  if (levels.length !== 2) return { ok: false, errors: ['the figure must draw exactly two levels: the ground state and the excited state'] }
  const [ground, excited] = [...levels].sort((a, b) => a.from![1] - b.from![1])
  const gy = ground.from![1], ey = excited.from![1]
  const near = (a: number, b: number) => Math.abs(a - b) < 1e-6
  const up = arrows.filter((a) => near(a.from![0], a.to![0]) && a.to![1] > a.from![1])
  const down = arrows.filter((a) => near(a.from![0], a.to![0]) && a.to![1] < a.from![1] && near(a.from![1], ey) && near(a.to![1], gy))
  const photons = up.filter((a) => near(a.from![1], gy) && near(a.to![1], ey))
  if (photons.length !== 1) errors.push(`exactly one photon arrow must lift the molecule from the ground state to the excited state (found ${photons.length}): one photon excites at most one molecule`)
  if (down.length !== 2) errors.push(`two arrows must fall from the excited state back to the ground state, light and heat (found ${down.length})`)
  const primary = arrows.find((a) => a.from![0] >= excited.to![0] - 1e-6 && near(a.from![1], ey) && a.to![0] > a.from![0])
  if (!primary) errors.push('the primary step must leave the excited level')
  else {
    const secondary = arrows.find((a) => near(a.from![0], primary.to![0]) && near(a.from![1], primary.to![1]) && a.to![1] < a.from![1])
    if (!secondary) errors.push('the thermal secondary step must start where the primary step ended')
  }
  for (const need of ['photon', 'light out', 'heat', 'bond breaks', 'thermal, no light', 'Φ = products ÷ photons', 'ground state', 'excited state']) {
    if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  }
  if (!(ey > gy)) errors.push('the excited state is not drawn above the ground state')
  return { ok: errors.length === 0, errors }
}
