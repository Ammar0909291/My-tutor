/**
 * reactionMechanismScenes — two chemistry figures that were a generic process flowchart or no figure at all.
 *
 *  1. `chem.kinet.mechanism` — the energy profile of a TWO-STEP mechanism. It was a generated five-box flowchart ("Identify
 *     reactants → … → Derive the overall rate law"): the procedure for analysing a mechanism, not the thing the concept is about —
 *     elementary steps with their own barriers, an intermediate in a well between them, and one step slower than the rest.
 *  2. `chem.surface.heterogeneous-cat` — adsorption, surface reaction and desorption on a solid, with a poison on one site. The
 *     generator's critic rejected its linear flowchart on every attempt ("poisoning occurs after regeneration" — it can happen at
 *     any stage), so a learner who asked for a diagram was told there was none.
 *
 * Both are schematics, not to scale, and carry no numbers (no energies, no rates): every claim is about order and shape.
 *
 * THE CONSISTENCY GUARANTEE. The profile's extrema are the anchors the curve is DERIVED from (a cosine ease between successive
 * anchors has zero slope at each, so the peaks and the well are exactly where the anchors are); `checkMechanismProfileConsistency`
 * re-derives from the drawn curve that there are exactly two maxima (the transition states) with one minimum (the intermediate)
 * between them, that the second barrier is the larger (the slow, rate-determining step) and that the arrows labelled Eₐ₁ and Eₐ₂
 * span exactly those barriers. `checkSurfaceCatalysisConsistency` re-derives from the drawn positions that the reactants are in the
 * gas phase above the surface, the adsorbed species sit ON active sites, the two that react are neighbours joined by a bond, the
 * product leaves upward, and the poison occupies a site the reaction cannot use.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

// ───────────────────────── 1. two-step mechanism: the energy profile ─────────────────────────

/** Anchors of the profile (scene units): energy rises up the page, progress runs left to right. */
export const PROFILE = {
  reactants:    [-7, -1] as const,
  ts1:          [-4, 2.2] as const,
  intermediate: [-0.8, 0.4] as const,
  ts2:          [3, 5.4] as const,
  products:     [7, -2.4] as const,
} as const
const AXIS_X = -8.6, AXIS_Y = -4.2

/** A cosine ease between consecutive anchors: flat at every anchor, so each anchor is an exact extremum of the curve. */
export function profilePoints(samplesPerSegment = 24): Vec3[] {
  const a = [PROFILE.reactants, PROFILE.ts1, PROFILE.intermediate, PROFILE.ts2, PROFILE.products]
  const pts: Vec3[] = []
  for (let s = 0; s < a.length - 1; s++) {
    for (let i = s === 0 ? 0 : 1; i <= samplesPerSegment; i++) {
      const t = i / samplesPerSegment, e = (1 - Math.cos(Math.PI * t)) / 2
      pts.push([round(a[s][0] + (a[s + 1][0] - a[s][0]) * t), round(a[s][1] + (a[s + 1][1] - a[s][1]) * e), 0])
    }
  }
  return pts
}

export function buildMechanismProfileScene(): SceneSpec {
  const { reactants: R, ts1: T1, intermediate: I, ts2: T2, products: P } = PROFILE
  const axes: SceneObject[] = [
    arrow([AXIS_X, AXIS_Y, 0], [AXIS_X, 7.4, 0], ROLE.reference),
    arrow([AXIS_X, AXIS_Y, 0], [9, AXIS_Y, 0], ROLE.reference),
    label('energy', [AXIS_X + 1.1, 7.7, 0], ROLE.ink, 'detail'),
    label('reaction progress', [4.2, AXIS_Y - 1.0, 0], ROLE.ink, 'detail'),
  ]
  const profile: SceneObject[] = [curve(profilePoints(), ROLE.output)]
  const species: SceneObject[] = [
    dot([R[0], R[1], 0], ROLE.result, 0.2), label('reactants', [R[0], R[1] - 1.0, 0], ROLE.result, 'detail'),
    dot([I[0], I[1], 0], ROLE.result, 0.2), label('intermediate', [I[0], I[1] - 1.0, 0], ROLE.result, 'detail'),
    dot([P[0], P[1], 0], ROLE.result, 0.2), label('products', [P[0], P[1] - 1.0, 0], ROLE.result, 'detail'),
    dot([T1[0], T1[1], 0], ROLE.aid, 0.2), label('TS₁', [T1[0], T1[1] + 0.9, 0], ROLE.aid, 'detail'),
    dot([T2[0], T2[1], 0], ROLE.input, 0.2), label('TS₂ · slow', [T2[0], T2[1] + 0.9, 0], ROLE.input, 'detail'),
  ]
  // The barrier of each step is measured from the species that step STARTS at (reactants for step 1, the intermediate for step 2).
  const barriers: SceneObject[] = [
    arrow([R[0] + 0.1, R[1], 0], [R[0] + 0.1, T1[1], 0], ROLE.aid), label('Eₐ₁', [R[0] - 0.9, (R[1] + T1[1]) / 2, 0], ROLE.aid, 'detail'),
    arrow([I[0] + 0.1, I[1], 0], [I[0] + 0.1, T2[1], 0], ROLE.input), label('Eₐ₂', [I[0] - 0.9, (I[1] + T2[1]) / 2, 0], ROLE.input, 'detail'),
  ]
  return {
    id: 'mechanism-energy-profile',
    title: 'A Two-Step Mechanism: Energy Profile',
    sceneType: 'plot',
    teachingGoal: 'Each elementary step has its own transition state and barrier; the intermediate sits in a well between them; the step with the larger barrier is the slowest, the rate-determining step.',
    cameraDistance: 21,
    ariaLabel: 'A schematic reaction-energy profile for a two-step mechanism: energy against reaction progress. The curve rises over a first small barrier (TS1) into a shallow well, the intermediate, then over a second, higher barrier (TS2, the slow step) and down to the products, which lie below the reactants. Arrows mark the activation energies of the two steps.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A mechanism is the sequence of elementary steps behind an overall reaction. Plot energy against reaction progress: reactants on the left, products on the right (here lower in energy, so the overall reaction releases energy).', objects: [...axes, ...profile, species[0], species[1], species[4], species[5]], intent: 'establish' },
      { narration: 'Each elementary step climbs its own barrier to a transition state (TS₁, TS₂). Between them the curve dips into a well: the intermediate, a real species that is formed in step 1 and used up in step 2, so it does not appear in the overall equation.', objects: [species[2], species[3], species[6], species[7], species[8], species[9]], intent: 'relate' },
      { narration: 'The barrier of each step is measured from where that step starts: Eₐ₁ from the reactants, Eₐ₂ from the intermediate. Eₐ₂ is larger, so step 2 is the slow step. It is the rate-determining step, and the rate law is written from it (an intermediate in it is replaced using the fast step before it).', objects: barriers, intent: 'resolve' },
    ],
  }
}

/** Local extrema of the drawn curve: [x, y, 'max' | 'min'] in order. */
export function profileExtrema(points: ReadonlyArray<readonly number[]>): Array<[number, number, 'max' | 'min']> {
  const out: Array<[number, number, 'max' | 'min']> = []
  for (let i = 1; i < points.length - 1; i++) {
    const [a, b, c] = [points[i - 1][1], points[i][1], points[i + 1][1]]
    if (b > a && b >= c && b > c - 1e-9 && !(c === b)) out.push([points[i][0], b, 'max'])
    else if (b < a && b <= c && !(c === b)) out.push([points[i][0], b, 'min'])
  }
  return out
}

export function checkMechanismProfileConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const path = objects.find((o) => o.type === 'path' && o.points)
  if (!path) return { ok: false, errors: ['no profile curve is drawn'] }
  const pts = path.points!
  const ex = profileExtrema(pts)
  const maxes = ex.filter((e) => e[2] === 'max'), mins = ex.filter((e) => e[2] === 'min')
  if (maxes.length !== 2) errors.push(`expected two transition-state maxima, found ${maxes.length}`)
  if (mins.length !== 1) errors.push(`expected one intermediate well, found ${mins.length}`)
  if (maxes.length === 2 && mins.length === 1) {
    if (!(maxes[0][0] < mins[0][0] && mins[0][0] < maxes[1][0])) errors.push('the intermediate is not between the two transition states')
    const ea1 = maxes[0][1] - pts[0][1], ea2 = maxes[1][1] - mins[0][1]
    if (!(ea2 > ea1)) errors.push('the second barrier is not the larger one, so TS₂ is not the slow step')
    const arrows = objects.filter((o) => o.type === 'arrow' && o.from && o.to && Math.abs(o.to[1] - o.from[1]) > 0.5 && o.from[0] > AXIS_X + 0.5)
    const span = (a: SceneObject) => Math.abs(a.to![1] - a.from![1])
    const spans = arrows.map(span).sort((x, y) => x - y)
    if (spans.length !== 2 || Math.abs(spans[0] - ea1) > 0.05 || Math.abs(spans[1] - ea2) > 0.05) errors.push('the Eₐ arrows do not span the drawn barriers')
  }
  if (!(pts[pts.length - 1][1] < pts[0][1])) errors.push('the products are not lower than the reactants')
  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of ['reactants', 'intermediate', 'products', 'TS₁', 'TS₂ · slow', 'Eₐ₁', 'Eₐ₂', 'energy', 'reaction progress']) {
    if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  }
  return { ok: errors.length === 0, errors }
}

// ───────────────────────── 2. heterogeneous catalysis: adsorption, reaction, desorption ─────────────────────────

/** The solid's top face is y = SURFACE_Y; active sites sit on it at these x positions. Left to right the figure is a storyboard: adsorption, surface reaction, desorption, poison. */
export const SURFACE_Y = -3
export const SITES: readonly number[] = [-7.8, -6.2, -2.4, -0.8, 3.6, 7.6]
export const SPECIES_R = 0.55
const SITE_R = 0.18
const GAS_Y = 2.2
/** Centre height of a species resting on a site. */
export const ADSORBED_Y = SURFACE_Y + SPECIES_R + 0.12

/** Positions, so the consistency check and the tests read the same numbers the figure is drawn from. */
export const CAT = {
  gasA: [-7.8, GAS_Y, 0] as Vec3,              // reactant A in the gas phase, above the first site
  gasB: [-6.2, GAS_Y, 0] as Vec3,              // reactant B in the gas phase, above the second site
  adsA: [-2.4, ADSORBED_Y, 0] as Vec3,         // A adsorbed on a site ...
  adsB: [-0.8, ADSORBED_Y, 0] as Vec3,         // ... and B on the NEXT site: a surface reaction needs neighbours
  product: [3.6, 1.6, 0] as Vec3,              // the product, leaving upward
  poison: [7.6, ADSORBED_Y, 0] as Vec3,        // a poison molecule bound on its own site
} as const
/** The sites the gas-phase reactants are heading for (the arrows end just above them). */
export const TARGET_SITES: readonly number[] = [SITES[0], SITES[1]]

export function buildSurfaceCatalysisScene(): SceneSpec {
  const surface: SceneObject[] = [
    line([-9, SURFACE_Y, 0], [9, SURFACE_Y, 0], ROLE.reference, 0.35),
    ...SITES.map((x) => dot([x, SURFACE_Y, 0], ROLE.ink, SITE_R)),
    label('solid catalyst surface', [0.4, SURFACE_Y - 1.3, 0], ROLE.reference, 'detail'),
    label('active sites', [-7, SURFACE_Y - 1.3, 0], ROLE.ink, 'detail'),
  ]
  const adsorption: SceneObject[] = [
    dot(CAT.gasA, ROLE.output, SPECIES_R), dot(CAT.gasB, ROLE.input, SPECIES_R),
    ...TARGET_SITES.map((x, i) => arrow([x, GAS_Y - 0.8, 0], [x, ADSORBED_Y + 0.8, 0], ROLE.reference)),
    label('adsorption', [-7, GAS_Y + 2.4, 0], ROLE.ink, 'primary'),
    label('reactants (gas)', [-7, GAS_Y + 1.3, 0], ROLE.reference, 'detail'),
  ]
  const reaction: SceneObject[] = [
    dot(CAT.adsA, ROLE.output, SPECIES_R), dot(CAT.adsB, ROLE.input, SPECIES_R),
    line([CAT.adsA[0], CAT.adsA[1], 0], [CAT.adsB[0], CAT.adsB[1], 0], ROLE.result, 0.12),
    label('surface reaction', [-1.6, ADSORBED_Y + 1.6, 0], ROLE.result, 'primary'),
  ]
  const desorption: SceneObject[] = [
    dot(CAT.product, ROLE.result, SPECIES_R + 0.15),
    arrow([CAT.product[0], CAT.product[1] + 1.0, 0], [CAT.product[0], CAT.product[1] + 2.6, 0], ROLE.result),
    label('product (gas)', [3.6, GAS_Y + 3.2, 0], ROLE.reference, 'detail'),
    label('desorption', [3.6, GAS_Y + 4.3, 0], ROLE.result, 'primary'),
  ]
  const poisoning: SceneObject[] = [
    dot(CAT.poison, ROLE.aid, SPECIES_R),
    label('poison blocks a site', [5.9, SURFACE_Y - 2.6, 0], ROLE.aid, 'detail'),
  ]
  return {
    id: 'heterogeneous-catalysis-surface',
    title: 'Heterogeneous Catalysis: Adsorption, Surface Reaction, Desorption',
    sceneType: 'plot',
    teachingGoal: 'Reactants adsorb on active sites of a solid, react while held there, and the product desorbs, freeing the site; a poison that binds a site blocks it, and can do so at any stage.',
    cameraDistance: 21,
    ariaLabel: 'A solid catalyst surface with active sites, read left to right. Two gas-phase reactant molecules have arrows down to two sites, where they adsorb. Two adsorbed species sit on neighbouring sites and are joined by a bond: the surface reaction. A product molecule leaves upward into the gas phase. A separate poison molecule sits on its own site at the far right and blocks it.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'A heterogeneous catalyst is a solid; the reactants are in a gas or liquid around it. The reaction happens only at special places on its surface, the active sites.', objects: surface, intent: 'establish' },
      { narration: 'Step 1, adsorption: reactant molecules from the gas stick to active sites, held by chemical bonds to the surface.', objects: adsorption, intent: 'relate' },
      { narration: 'Step 2, surface reaction: held side by side on neighbouring sites, the adsorbed species react and bond. Holding them there is what lowers the activation energy.', objects: reaction, intent: 'vary' },
      { narration: 'Step 3, desorption: the product leaves the surface and the site is free to start again. Poisoning can happen at any stage: a poison that binds strongly to a site blocks it, and the catalyst loses activity.', objects: [...desorption, ...poisoning], intent: 'resolve' },
    ],
  }
}

export function checkSurfaceCatalysisConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const nodes = objects.filter((o) => o.type === 'node' && o.position)
  const at = (p: Vec3) => nodes.some((o) => Math.hypot(o.position![0] - p[0], o.position![1] - p[1]) < 1e-6)
  const siteIndex = (x: number) => SITES.findIndex((s) => Math.abs(s - x) < 1e-6)
  if (!(CAT.gasA[1] > SURFACE_Y + 1 && CAT.gasB[1] > SURFACE_Y + 1)) errors.push('the reactants are not in the gas phase above the surface')
  if (TARGET_SITES.some((x) => siteIndex(x) < 0)) errors.push('an adsorption arrow does not lead to an active site')
  for (const [name, p] of [['A', CAT.adsA], ['B', CAT.adsB], ['poison', CAT.poison]] as const) {
    if (siteIndex(p[0]) < 0) errors.push(`adsorbed ${name} is not on an active site`)
    if (Math.abs(p[1] - ADSORBED_Y) > 1e-6) errors.push(`adsorbed ${name} does not rest on the surface`)
  }
  if (Math.abs(siteIndex(CAT.adsA[0]) - siteIndex(CAT.adsB[0])) !== 1) errors.push('the reacting species are not on neighbouring sites')
  const bondBetween = objects.some((o) => o.type === 'bond' && o.from && o.to && Math.abs(o.from[0] - CAT.adsA[0]) < 1e-6 && Math.abs(o.to[0] - CAT.adsB[0]) < 1e-6)
  if (!bondBetween) errors.push('no bond joins the two reacting species')
  if (!(CAT.product[1] > SURFACE_Y + 1)) errors.push('the product is not leaving the surface')
  if ([CAT.adsA[0], CAT.adsB[0]].some((x) => Math.abs(x - CAT.poison[0]) < 1e-6) || TARGET_SITES.some((x) => Math.abs(x - CAT.poison[0]) < 1e-6)) errors.push('the poison sits on a site a reactant uses')
  for (const p of [CAT.gasA, CAT.gasB, CAT.adsA, CAT.adsB, CAT.product, CAT.poison]) if (!at(p)) errors.push(`a species is not drawn at ${p[0]}, ${p[1]}`)
  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of ['adsorption', 'surface reaction', 'desorption', 'active sites', 'poison blocks a site']) {
    if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  }
  return { ok: errors.length === 0, errors }
}
