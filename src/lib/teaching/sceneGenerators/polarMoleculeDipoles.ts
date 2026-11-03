/**
 * polarMoleculeDipoles — `chem.bond.polar-molecules` drawn as the rule the lesson teaches: add the bond dipoles as VECTORS.
 *
 * The concept was served a generated five-box procedure flowchart ("Identify atom electronegativities → … → Determine overall polarity") with no dipole on it
 * (learner run on Test6, 2026-11-03). The Educational Brain entry's own rule: treat each bond dipole as a vector pointing toward the more electronegative atom;
 * if the molecule's symmetry makes the vectors cancel the net dipole is zero (nonpolar), otherwise it is not (polar). Its two critical examples:
 *
 *   CO₂ (linear, O=C=O): two identical C=O dipoles point in OPPOSITE directions and cancel completely, μ = 0: nonpolar despite polar bonds.
 *   H₂O (bent, 104.5°): the two O–H dipoles do NOT cancel; the net dipole points toward the O atom: strongly polar.
 *
 * `checkPolarMoleculesConsistency` re-derives the claim from the DRAWN arrows: it adds the bond-dipole vectors of each molecule and fails if CO₂'s do not cancel,
 * if water's sum is zero, if water's net arrow is not the sum (direction and length), or if an arrow points away from the more electronegative atom.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import type { ConsistencyResult } from './shared'
import { round } from './shared'

export const BOND = 2.2
export const WATER_ANGLE_DEG = 104.5
/** Atom positions. CO₂ is linear with C in the middle; H₂O is bent with O above the two H atoms. */
const half = (WATER_ANGLE_DEG / 2) * (Math.PI / 180)
export const CO2 = { c: [-6, 1.2], o1: [-6 - BOND, 1.2], o2: [-6 + BOND, 1.2] } as const
export const H2O = {
  o: [5, 2.2],
  h1: [round(5 - BOND * Math.sin(half)), round(2.2 - BOND * Math.cos(half))],
  h2: [round(5 + BOND * Math.sin(half)), round(2.2 - BOND * Math.cos(half))],
} as const
/** The drawn net-dipole arrow for water sits to the right of the molecule. */
export const NET_X = 9.2
export const NET_FROM_Y = -0.4

type XY = readonly [number, number]
const v = (a: XY, b: XY): [number, number] => [b[0] - a[0], b[1] - a[1]]
const add = (a: XY, b: XY): [number, number] => [a[0] + b[0], a[1] + b[1]]
/** A bond dipole, drawn from the less electronegative atom TOWARD the more electronegative one, inset so the arrow sits on the bond between the atoms. */
const inset = (a: XY, b: XY, k = 0.12): [XY, XY] => {
  const d = v(a, b)
  return [[round(a[0] + d[0] * k), round(a[1] + d[1] * k)], [round(b[0] - d[0] * k), round(b[1] - d[1] * k)]]
}
const atom = (p: XY, text: string, color: string, r = 0.5): SceneObject[] => [dot([p[0], p[1], 0], color, r), label(text, [p[0], p[1] + 0.95, 0], color, 'detail')]
const dipole = (from: XY, to: XY): SceneObject => { const [a, b] = inset(from, to); return { ...arrow([a[0], a[1], 0], [b[0], b[1], 0], ROLE.input), thickness: 0.11 } }

export function buildPolarMoleculesScene(): SceneSpec {
  const bonds: SceneObject[] = [
    line([CO2.o1[0], CO2.o1[1], 0], [CO2.o2[0], CO2.o2[1], 0], ROLE.reference, 0.05),
    line([H2O.h1[0], H2O.h1[1], 0], [H2O.o[0], H2O.o[1], 0], ROLE.reference, 0.05),
    line([H2O.o[0], H2O.o[1], 0], [H2O.h2[0], H2O.h2[1], 0], ROLE.reference, 0.05),
    ...atom(CO2.c, 'C', ROLE.ink, 0.45), ...atom(CO2.o1, 'O', ROLE.output, 0.5), ...atom(CO2.o2, 'O', ROLE.output, 0.5),
    ...atom(H2O.o, 'O', ROLE.output, 0.5), ...atom(H2O.h1, 'H', ROLE.ink, 0.32), ...atom(H2O.h2, 'H', ROLE.ink, 0.32),
    label('CO₂', [-6, -2.0, 0], ROLE.ink, 'detail'),
    label('H₂O', [5, -2.0, 0], ROLE.ink, 'detail'),
  ]
  const co2Dipoles: SceneObject[] = [dipole(CO2.c, CO2.o1), dipole(CO2.c, CO2.o2)]
  const h2oDipoles: SceneObject[] = [dipole(H2O.h1, H2O.o), dipole(H2O.h2, H2O.o)]
  const net = netOfWater()
  return {
    id: 'polar-molecules-dipole-sum',
    title: 'Polar molecules: add the bond dipoles as vectors',
    sceneType: 'diagram',
    cameraDistance: 13.5,
    teachingGoal: 'Each polar bond is a dipole pointing toward the more electronegative atom; a molecule is polar only if the vector sum is not zero: CO₂ is linear and the two dipoles cancel, bent H₂O does not and its net dipole points toward O.',
    ariaLabel: 'Two molecules side by side. Carbon dioxide on the left is a straight line, O, C, O, with a red arrow along each C=O bond pointing toward its oxygen; the two arrows point in opposite directions and cancel, so the net dipole is zero. Water on the right is bent, with the O above the two H atoms and a red arrow along each O-H bond pointing toward the oxygen; the two arrows both lean upward, so they add, and a green arrow beside the molecule, pointing up toward the O, shows the net dipole.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A polar bond is a dipole: the more electronegative atom is δ−, the other δ+. Draw each bond dipole as a vector pointing toward the more electronegative atom. CO₂ is linear, O=C=O; H₂O is bent, 104.5°.', objects: [...bonds, ...co2Dipoles, ...h2oDipoles], intent: 'establish' },
      { narration: 'CO₂: the two C=O dipoles are identical and point in OPPOSITE directions, so they cancel completely. The net dipole is zero: CO₂ is nonpolar even though its bonds are polar.', objects: [label('linear: cancel', [-6, 5.4, 0], ROLE.result, 'detail'), dot([CO2.c[0], CO2.c[1], 0], ROLE.result, 0.2), label('net dipole: zero', [-6, -3.6, 0], ROLE.result, 'detail')], intent: 'relate' },
      { narration: 'H₂O: the bent shape means the two O–H dipoles do NOT cancel. They add, and the net dipole points toward the O atom: water is strongly polar. Shape decides: polar bonds are necessary, but not sufficient.', objects: [{ ...arrow([NET_X, NET_FROM_Y, 0], [NET_X + net[0], NET_FROM_Y + net[1], 0], ROLE.result), thickness: 0.13 }, label('bent: add', [5, 5.4, 0], ROLE.result, 'detail'), label('net dipole', [NET_X + 0.2, NET_FROM_Y - 1.0, 0], ROLE.result, 'detail')], intent: 'resolve' },
    ],
  }
}

/** The vector sum of water's two bond dipoles AS DRAWN (each an inset arrow along the bond, pointing from H toward O), used for the drawn net arrow. */
export function netOfWater(): [number, number] {
  const drawn = (h: XY) => { const [a, b] = inset(h, H2O.o); return v(a, b) }
  const s = add(drawn(H2O.h1), drawn(H2O.h2))
  return [round(s[0]), round(s[1])]
}

export function checkPolarMoleculesConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const arrows = objects.filter((o) => o.type === 'arrow' && o.from && o.to)
  const vec = (a: SceneObject): [number, number] => [a.to![0] - a.from![0], a.to![1] - a.from![1]]
  const nearAtom = (p: number[], q: XY) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.15 * BOND + BOND * 0.5
  const co2 = arrows.filter((a) => a.from![0] < 0 && a.from![0] > -9)
  const water = arrows.filter((a) => a.from![0] > 2 && a.from![0] < 8 && Math.abs(a.from![0] - NET_X) > 0.5)
  const netArrow = arrows.find((a) => Math.abs(a.from![0] - NET_X) < 1e-9)
  if (co2.length !== 2 || water.length !== 2 || !netArrow) return { ok: false, errors: ['the figure must draw two C=O dipoles, two O-H dipoles and the net dipole of water'] }
  const sumCo2 = co2.map(vec).reduce((t, x) => add(t, x), [0, 0] as [number, number])
  if (Math.hypot(sumCo2[0], sumCo2[1]) > 1e-6) errors.push('the two CO₂ bond dipoles do not cancel: they are drawn to add up')
  const sumW = water.map(vec).reduce((t, x) => add(t, x), [0, 0] as [number, number])
  if (Math.hypot(sumW[0], sumW[1]) < 0.5) errors.push('the two water bond dipoles cancel: water would be nonpolar')
  const nv = vec(netArrow)
  if (Math.hypot(nv[0] - sumW[0], nv[1] - sumW[1]) > 0.05) errors.push('water’s net dipole arrow is not the sum of its two bond dipoles')
  // Every bond dipole must point TOWARD the more electronegative atom (O in both molecules).
  for (const a of co2) if (!nearAtom(a.to!, CO2.o1) && !nearAtom(a.to!, CO2.o2)) errors.push('a CO₂ dipole does not point toward an oxygen')
  for (const a of water) if (!nearAtom(a.to!, H2O.o)) errors.push('an O–H dipole does not point toward the oxygen')
  // The net dipole of the bent molecule points toward O (up, from the H side).
  if (!(nv[1] > 0)) errors.push('the net dipole of water does not point toward the O atom')
  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of ['CO₂', 'H₂O', 'linear: cancel', 'net dipole: zero', 'bent: add', 'net dipole']) if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  if (!(H2O.o[1] > H2O.h1[1] && H2O.o[1] > H2O.h2[1])) errors.push('water is not drawn bent with O above the two H atoms')
  return { ok: errors.length === 0, errors }
}
