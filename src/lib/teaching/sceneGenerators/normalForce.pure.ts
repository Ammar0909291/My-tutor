/**
 * Normal force — the figure `phys.mech.normal-force` was missing: the whole LESSON, not only the level surface.
 *
 * THE GAP THIS CLOSES. The concept was served the shared force-diagram CARD (the free-body-diagram family): one block on a
 * level surface with weight, normal force, applied force and friction. That is correct for "N = mg on a level surface" — and
 * the Educational Brain's own Learning Objective is that the learner can
 *   (1) compute N as WHATEVER value makes the net force perpendicular to the surface zero, not a fixed fraction of weight;
 *   (2) identify that N equals weight ONLY on a flat surface with no other vertical force — N = mg cos θ on an incline,
 *       and larger than mg under an additional downward push;
 *   (3) explain that N is NOT gravity's Newton's-Third-Law partner (that acts on the Earth), but a separate contact force
 *       whose own partner is the block pushing on the surface.
 * Its Mental Models: "Beginner: N always equals weight — an incline directly contradicts this." The card could show none of
 * (2) or (3), so the figure agreed with the misconception the lesson exists to correct (EB: MC-NORMAL-EQUALS-WEIGHT,
 * MC-NORMAL-IS-REACTION).
 *
 * WHAT THIS IS. A plain SceneSpec on the primitives SceneSpecRenderer already paints, behind the existing variable layer
 * (`PARAMETRIC_SCENES.normal_force`): two controls, each one a claim of the lesson —
 *   θ   the tilt of the surface: N = mg cos θ falls below the weight as it tilts
 *   F   an extra downward push, in units of mg: N = (mg + F) cos θ grows with it
 * The default is the lesson's own baseline — the LEVEL surface, nothing else vertical, where N = mg — so the first thing a
 * learner sees is the true special case, and the controls show it is only a special case.
 *
 * ── CORRECT BY CONSTRUCTION ─────────────────────────────────────────────────
 * Arrow lengths are drawn from ONE function, `normalMagnitude(θ, F) = (1 + F)·cos θ` in units of mg, and the load is resolved
 * along the surface: the net force perpendicular to the surface is N − (mg + F)·cos θ = 0 by construction. The test
 * re-derives that from the DRAWN arrows (direction ⟂ surface, length, balance), never from a label. The surface is assumed to
 * be a surface the block does not accelerate into or away from — the lesson's "non-accelerating-perpendicular" case, stated.
 *
 * Authoring rules (physicsPilot.ts): shared palette, labels are names, steps are cumulative, coordinates inside ±5,
 * narrations under 220 characters.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { strictNumber, type ConsistencyResult } from './shared'
import { around, pickLabelSpot, type PlacedLabel, type Seg } from './labelSpots'

export interface NormalForceParams {
  /** Tilt of the surface from the horizontal (degrees). 0 = level. */
  angleDeg: number
  /** An extra push straight DOWN on the block, as a multiple of its weight (F / mg). 0 = none. */
  push: number
}

export const NORMAL_FORCE_DEFAULTS: NormalForceParams = { angleDeg: 0, push: 0 }

/** The ranges a learner may move through (also the validator's bounds). */
export const NORMAL_FORCE_LIMITS = {
  angleDeg: { min: 0, max: 60 },
  push: { min: 0, max: 1 },
} as const

export function validateNormalForceParams(raw: unknown): NormalForceParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const angleDeg = strictNumber(o.angleDeg ?? 0)
  const push = strictNumber(o.push ?? 0)
  for (const [v, k] of [[angleDeg, 'angleDeg'], [push, 'push']] as const) {
    if (!Number.isFinite(v) || v < NORMAL_FORCE_LIMITS[k].min || v > NORMAL_FORCE_LIMITS[k].max) return null
  }
  return { angleDeg, push }
}

/**
 * N in units of mg: the part of the load (the weight mg plus a vertical push F) that presses INTO the surface.
 * (1 + F/mg)·cos θ — the value that makes the net force perpendicular to the surface zero.
 */
export function normalMagnitude(angleDeg: number, push: number): number {
  return (1 + push) * Math.cos((angleDeg * Math.PI) / 180)
}

/** Scene units per unit of mg: the weight arrow is this long, every other force is drawn to the same scale. */
export const FORCE_SCALE = 2
/** Where the block touches the surface, and the figure's own proportions (exported for the geometry test). */
export const NORMAL_FORCE_GEOMETRY = {
  contact: [0, -0.6] as [number, number],
  halfSurface: 3.6,
  blockHalfWidth: 0.9,
  blockHalfHeight: 0.45,
  /** The push is a VERTICAL arrow this far to the right (horizontally) of the weight line, landing where that line meets the block's top. */
  pushOffsetX: 0.62,
  /** The Third-Law partner starts on the surface this far up-slope of the contact point, beside the weight, not on top of it. */
  partnerOffset: 0.62,
} as const

const rad = (d: number) => (d * Math.PI) / 180
const r3 = (n: number) => Math.round(n * 1000) / 1000
const v3 = (x: number, y: number): Vec3 => [r3(x), r3(y), 0]
const fmt2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)

/** The highest point of a convex polygon on the vertical line x = x0 (the nearest corner when the line misses it). */
function highestAt(poly: Array<[number, number]>, x0: number): [number, number] {
  let best: [number, number] | null = null
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length]
    if ((a[0] - x0) * (b[0] - x0) > 0 || a[0] === b[0]) continue
    const t = (x0 - a[0]) / (b[0] - a[0])
    const y = a[1] + t * (b[1] - a[1])
    if (!best || y > best[1]) best = [x0, y]
  }
  return best ?? poly.reduce((p, q) => (Math.abs(q[0] - x0) < Math.abs(p[0] - x0) ? q : p))
}

export function buildNormalForceScene(params: NormalForceParams = NORMAL_FORCE_DEFAULTS): SceneSpec {
  const { angleDeg: theta, push } = params
  const { contact, halfSurface, blockHalfWidth: bw, blockHalfHeight: bh, pushOffsetX, partnerOffset } = NORMAL_FORCE_GEOMETRY
  const c = Math.cos(rad(theta)), s = Math.sin(rad(theta))
  const u: [number, number] = [c, s]          // along the surface, up the slope
  const n: [number, number] = [-s, c]         // the surface's outward normal
  const N = normalMagnitude(theta, push)      // in units of mg
  const level = theta === 0
  const B: [number, number] = [contact[0] + n[0] * bh, contact[1] + n[1] * bh]    // the block's centre
  const at = (p: [number, number], a: number, along: [number, number]): [number, number] => [p[0] + along[0] * a, p[1] + along[1] * a]
  const W = FORCE_SCALE
  const nTxt = fmt2(N)
  const compare = N < 0.9999 ? 'less than the weight' : N > 1.0001 ? 'MORE than the weight' : 'equal to the weight'

  // ── the block and the surface ──
  const corner = (a: number, b: number) => [B[0] + u[0] * a + n[0] * b, B[1] + u[1] * a + n[1] * b] as [number, number]
  const surface: SceneObject[] = [
    { ...line(v3(contact[0] - u[0] * halfSurface, contact[1] - u[1] * halfSurface), v3(contact[0] + u[0] * halfSurface, contact[1] + u[1] * halfSurface), ROLE.reference, 0.06), id: 'surface' },
  ]
  const block: SceneObject[] = [
    line(v3(...corner(-bw, -bh)), v3(...corner(bw, -bh)), ROLE.ink, 0.045),
    line(v3(...corner(bw, -bh)), v3(...corner(bw, bh)), ROLE.ink, 0.045),
    line(v3(...corner(bw, bh)), v3(...corner(-bw, bh)), ROLE.ink, 0.045),
    line(v3(...corner(-bw, bh)), v3(...corner(-bw, -bh)), ROLE.ink, 0.045),
  ]

  // ── the forces, all from the block's centre except the push (on its top face) and the partner (on the surface) ──
  const weightTip = v3(B[0], B[1] - W)
  const normalTip = v3(B[0] + n[0] * N * W, B[1] + n[1] * N * W)
  const top = highestAt([corner(-bw, -bh), corner(bw, -bh), corner(bw, bh), corner(-bw, bh)], B[0] + pushOffsetX)
  const pushTail = v3(top[0], top[1] + push * W)
  const partnerFrom = at(contact, partnerOffset, u)
  const partnerTip = v3(partnerFrom[0] - n[0] * N * W, partnerFrom[1] - n[1] * N * W)
  // the load's two parts, resolved along and perpendicular to the surface
  const loadPerp = v3(B[0] - n[0] * (1 + push) * c * W, B[1] - n[1] * (1 + push) * c * W)
  const loadAlong = v3(B[0] - u[0] * (1 + push) * s * W, B[1] - u[1] * (1 + push) * s * W)

  // ── label spots: the forces fan out at every tilt, so each name is placed by room (labelSpots.ts), preferred side first ──
  const seg = (a: [number, number], b: [number, number]): Seg => [a, b]
  const arrowSegs: Seg[] = [
    seg(B, [weightTip[0], weightTip[1]]), seg(B, [normalTip[0], normalTip[1]]), seg(partnerFrom, [partnerTip[0], partnerTip[1]]),
    ...(push > 0 ? [seg([pushTail[0], pushTail[1]], top)] : []),
    ...(level ? [] : [seg(B, [loadPerp[0], loadPerp[1]]), seg(B, [loadAlong[0], loadAlong[1]])]),
    seg([contact[0] - u[0] * halfSurface, contact[1] - u[1] * halfSurface], [contact[0] + u[0] * halfSurface, contact[1] + u[1] * halfSurface]),
    seg(corner(-bw, -bh), corner(bw, -bh)), seg(corner(bw, -bh), corner(bw, bh)), seg(corner(bw, bh), corner(-bw, bh)), seg(corner(-bw, bh), corner(-bw, -bh)),
  ]
  const placedLabels: PlacedLabel[] = []
  const spot = (text: string, anchor: [number, number], prefer: Array<'e' | 'w' | 'n' | 's' | 'ne' | 'nw' | 'se' | 'sw'>, extra: Array<[number, number]> = []): Vec3 => {
    const at = pickLabelSpot([...around(anchor, text, prefer), ...extra], text, arrowSegs, placedLabels)
    placedLabels.push({ at, text })
    return v3(at[0], at[1])
  }
  const compText = 'cos θ part', alongText = 'sin θ part', partnerText = 'N′'
  const weightName = spot('mg', [weightTip[0], weightTip[1]], ['w', 'sw', 'e', 'nw'])
  const pushName = push > 0 ? spot(`F = ${fmt2(push)} mg`, [pushTail[0], pushTail[1]], ['e', 'ne', 'n', 'w']) : null
  const normalName = spot('N', [normalTip[0], normalTip[1]], ['ne', 'e', 'n', 'nw', 'w'])
  const perpName = level ? null : spot(compText, [loadPerp[0], loadPerp[1]], ['w', 'sw', 's', 'se'])
  // a short along-surface part (a gentle tilt) sits inside the weight/normal crowd: its arrow is in the legend and the narration names it, a label there would only collide
  const alongName = level || Math.hypot(loadAlong[0] - B[0], loadAlong[1] - B[1]) < 1.3 ? null : spot(alongText, [loadAlong[0], loadAlong[1]], ['nw', 'w', 'sw', 'n', 's'])
  const partnerName = spot(partnerText, [partnerTip[0], partnerTip[1]], ['e', 'se', 's', 'w', 'sw'])
  const tiltText = level ? 'level' : `θ = ${theta}°`
  const tiltAnchor: [number, number] = [contact[0] + u[0] * 2.6 - n[0] * 0.5, contact[1] + u[1] * 2.6 - n[1] * 0.5]
  const tiltName = spot(tiltText, tiltAnchor, ['s', 'e', 'se'], [[tiltAnchor[0], tiltAnchor[1]], [contact[0] - u[0] * 2.4 - n[0] * 0.5, contact[1] - u[1] * 2.4 - n[1] * 0.5]])
  const resultText = `N = ${nTxt} mg`
  const resultName = spot(resultText, [3.2, 3.9], ['e'], [[3.2, 3.9], [-3.2, 3.9], [3.2, -3.9], [-3.2, -3.9], [0, 4.4]])

  const legend: Array<{ label: string; color: string; shape: 'line' | 'dot' }> = [
    { label: 'Weight mg', color: ROLE.input, shape: 'line' },
    ...(push > 0 ? [{ label: 'Push F', color: ROLE.output, shape: 'line' as const }] : []),
    { label: 'Normal force N', color: ROLE.result, shape: 'line' },
    { label: 'Load, resolved', color: ROLE.aid, shape: 'line' },
    { label: "N′ — N's partner", color: ROLE.ink, shape: 'line' },
  ]

  const step1 = level
    ? 'A block rests on a LEVEL surface. One rule governs everything that follows: the surface pushes back perpendicular to itself, just hard enough to stop the block sinking in.'
    : `The same block on a surface tilted by θ = ${theta}°. The rule does not change: the surface pushes back PERPENDICULAR to itself, just hard enough to stop the block sinking in.`
  const step2 = push > 0
    ? `Its weight mg pulls straight down — whatever the tilt. A push F = ${fmt2(push)} mg also presses straight down, so the load on the surface is mg + F.`
    : 'Its weight mg pulls straight down — whatever the tilt of the surface.'
  const step3 = 'The normal force N is perpendicular to the surface and points away from it. It is a separate contact force — not the weight, and not "the weight\'s partner".'
  const step4 = level && push === 0
    ? 'N is whatever stops the block sinking. Here the load is just mg, so N = mg — equal to the weight ONLY because the surface is level and nothing else pushes down.'
    : `N balances the part of the load pressing INTO the surface: N = (mg + F) cos θ = ${nTxt} mg, ${compare}. Only the part along the surface (× sin θ) tries to slide the block.`
  const step5 = "N's Third-Law partner is the block pushing on the SURFACE (N′): it acts on the surface, not on the block. Gravity's partner is the block pulling the Earth up."

  const result = `${nTxt} mg`
  const formulaLines = [
    'Level, nothing else vertical: N = mg',
    'Tilted by θ: N = mg cos θ — less than mg',
    'Extra downward push F: N = (mg + F) cos θ',
    `Now: θ = ${theta}°, F = ${fmt2(push)} mg → N = ${nTxt} mg`,
  ]

  return {
    id: 'phys-normal-force',
    title: 'Normal force: perpendicular to the surface, and not always mg',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal:
      'The normal force is the perpendicular push a surface exerts — whatever value stops the block moving into it: N = mg only on a ' +
      'level surface with nothing else pushing down; N = mg cos θ on a slope; and it is not the weight\'s Newton\'s-Third-Law partner.',
    ariaLabel:
      `A block on a surface tilted ${theta} degrees${level ? ' (level)' : ''}. The weight mg points straight down${push > 0 ? `, and a push of ${fmt2(push)} mg also presses straight down` : ''}. ` +
      `The normal force N points perpendicular to the surface, away from it, with size ${nTxt} mg — ${compare}. ` +
      "Its Third-Law partner N′ is drawn on the surface, pointing into it.",
    explainer: {
      givens: `θ = ${theta}°, F = ${fmt2(push)} mg`,
      result: { expression: 'N = (mg + F) cos θ', value: result },
      legend,
      panels: [
        {
          heading: "What's happening?",
          body:
            'The surface pushes back perpendicular to itself by exactly as much as is needed to stop the block moving into it. ' +
            'That amount is set by the part of the load that presses INTO the surface — not by the weight alone.',
        },
        { heading: 'N is not always mg', lines: formulaLines, emphasis: formulaLines[3] },
      ],
    },
    steps: [
      {
        narration: step1,
        objects: [
          ...surface,
          ...block,
          label(tiltText, tiltName, ROLE.ink, 'detail'),
        ],
      },
      {
        narration: step2,
        objects: [
          { ...arrow(v3(...B), weightTip, ROLE.input), id: 'weight' },
          label('mg', weightName, ROLE.input, 'primary'),
          ...(push > 0 ? [
            { ...arrow(pushTail, v3(...top), ROLE.output), id: 'push' } as SceneObject,
            label(`F = ${fmt2(push)} mg`, pushName!, ROLE.output, 'detail'),
          ] : []),
        ],
      },
      {
        narration: step3,
        objects: [
          { ...arrow(v3(...B), normalTip, ROLE.result), id: 'normal' },
          label('N', normalName, ROLE.result, 'primary'),
        ],
      },
      {
        narration: step4,
        objects: [
          ...(level ? [] : [
            { ...arrow(v3(...B), loadPerp, ROLE.aid), id: 'load-perpendicular' } as SceneObject,
            { ...arrow(v3(...B), loadAlong, ROLE.aid), id: 'load-along' } as SceneObject,
            label(compText, perpName!, ROLE.aid, 'detail'),
            ...(alongName ? [label(alongText, alongName, ROLE.aid, 'detail')] : []),
          ]),
          label(resultText, resultName, ROLE.result, 'primary'),
        ],
      },
      {
        narration: step5,
        objects: [
          { ...arrow(v3(...partnerFrom), partnerTip, ROLE.ink), id: 'partner' },
          label(partnerText, partnerName, ROLE.ink, 'detail'),
          { ...dot(v3(...contact), ROLE.reference, 0.07), id: 'contact' },
        ],
      },
    ],
  }
}

/**
 * The safety-net second derivation: re-derive the physics from the DRAWN arrows and compare it with the parameters.
 *   - N is perpendicular to the drawn surface and points away from it;
 *   - the weight is vertical, mg long; the push (if any) is vertical, F long, pointing down;
 *   - N's length is the component of the load pressing into the surface: net force perpendicular to the surface is zero;
 *   - the Third-Law partner is equal and opposite to N and acts ON the surface (its tail lies on the drawn surface line).
 */
export function checkNormalForceConsistency(spec: SceneSpec, params: NormalForceParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((st) => st.objects) as Array<SceneObject & { id?: string; from?: Vec3; to?: Vec3 }>
  const find = (id: string) => objs.find((o) => o.id === id)
  const vec = (id: string): [number, number] | null => { const o = find(id); return o?.from && o.to ? [o.to[0] - o.from[0], o.to[1] - o.from[1]] : null }
  const surface = find('surface')
  const normal = vec('normal'), weight = vec('weight'), push = vec('push'), partner = vec('partner')
  if (!surface?.from || !surface.to) return { ok: false, errors: ['the surface is not drawn'] }
  const su: [number, number] = [surface.to[0] - surface.from[0], surface.to[1] - surface.from[1]]
  const sLen = Math.hypot(su[0], su[1])
  const uHat: [number, number] = [su[0] / sLen, su[1] / sLen]
  const nHat: [number, number] = [-uHat[1], uHat[0]]
  const drawnTilt = (Math.atan2(uHat[1], uHat[0]) * 180) / Math.PI
  if (Math.abs(drawnTilt - params.angleDeg) > 0.05) errors.push(`the surface is drawn tilted ${drawnTilt.toFixed(2)}°, the figure says ${params.angleDeg}°`)
  if (!normal || !weight) return { ok: false, errors: [...errors, 'the weight and the normal force must both be drawn'] }
  const len = (v: [number, number]) => Math.hypot(v[0], v[1])
  const dot2 = (a: [number, number], b: [number, number]) => a[0] * b[0] + a[1] * b[1]
  // N ⟂ surface and pointing away from it
  if (Math.abs(dot2(normal, uHat)) > 1e-2 * len(normal)) errors.push('the normal force is not perpendicular to the surface')
  if (dot2(normal, nHat) <= 0) errors.push('the normal force points into the surface')
  // weight: vertical, down, mg = FORCE_SCALE long
  if (Math.abs(weight[0]) > 1e-2 || weight[1] >= 0) errors.push('the weight must point straight down')
  if (Math.abs(len(weight) - FORCE_SCALE) > 1e-2) errors.push(`the weight is ${len(weight).toFixed(2)} long, mg is ${FORCE_SCALE}`)
  // the push: vertical, down, F·mg long
  const f = params.push
  if (f > 0) {
    if (!push) errors.push('a push is claimed but not drawn')
    else {
      if (Math.abs(push[0]) > 1e-2 || push[1] >= 0) errors.push('the push must point straight down')
      if (Math.abs(len(push) - f * FORCE_SCALE) > 1e-2) errors.push(`the push is ${len(push).toFixed(2)} long, F is ${(f * FORCE_SCALE).toFixed(2)}`)
    }
  } else if (push) errors.push('a push is drawn though F = 0')
  // balance: the net force perpendicular to the surface is zero — N equals the load's component into the surface
  const load: [number, number] = [weight[0] + (push?.[0] ?? 0), weight[1] + (push?.[1] ?? 0)]
  const pressing = -dot2(load, nHat)                       // the load pressed into the surface, in scene units
  const net = dot2(normal, nHat) - pressing
  if (Math.abs(net) > 1e-2) errors.push(`the forces do not balance perpendicular to the surface (net ${net.toFixed(3)})`)
  if (Math.abs(dot2(normal, nHat) / FORCE_SCALE - normalMagnitude(params.angleDeg, params.push)) > 1e-2) errors.push('N is not (mg + F) cos θ')
  // the Third-Law partner: equal and opposite, on the surface
  if (partner) {
    if (Math.abs(partner[0] + normal[0]) > 1e-2 || Math.abs(partner[1] + normal[1]) > 1e-2) errors.push("N′ is not equal and opposite to N")
    const tail = find('partner')!.from!
    const off = Math.abs((tail[0] - surface.from[0]) * nHat[0] + (tail[1] - surface.from[1]) * nHat[1])
    if (off > 1e-2) errors.push('N′ must act ON the surface (its tail is off the surface line)')
  } else errors.push("the Third-Law partner N′ is not drawn")
  return { ok: errors.length === 0, errors }
}
