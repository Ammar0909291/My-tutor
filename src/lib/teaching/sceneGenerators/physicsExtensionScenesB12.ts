/**
 * Physics coverage-driven KG extension, batch 12 (advanced tier, 2026-10-04):
 * a figure for the equivalence principle and curved spacetime. Same rules as
 * physicsCoreScenes.ts: every number drawn is computed here and pinned by
 * src/tests/physicsExtensionBatch12.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, rect, type V3 } from './physicsCoreScenes'

// ── General relativity: equivalence, light bending, clock rates ──────────────

export const GR = { G: 6.674e-11, c: 2.998e8, GM_E: 3.986e14, R_E: 6.371e6, r_GPS: 2.6561e7, M_SUN: 1.989e30, M_EARTH: 5.972e24, DAY: 86400 }
/** Fractional rate difference of two clocks a height h apart near Earth's surface. */
export function heightShift(g: number, h: number): number { return (g * h) / (GR.c * GR.c) }
/** Microseconds per day a GPS clock gains from weaker gravity (general relativity). */
export function gpsGravityGainUs(): number { return (GR.GM_E / (GR.c * GR.c)) * (1 / GR.R_E - 1 / GR.r_GPS) * GR.DAY * 1e6 }
/** Microseconds per day a GPS clock loses from its orbital speed (special relativity). */
export function gpsSpeedLossUs(): number { const v2 = GR.GM_E / GR.r_GPS; return (v2 / (2 * GR.c * GR.c)) * GR.DAY * 1e6 }
export function gpsNetUs(): number { return gpsGravityGainUs() - gpsSpeedLossUs() }
/** Position error per day (km) if the net clock offset were not corrected. */
export function gpsDriftKm(): number { return (gpsNetUs() * 1e-6 * GR.c) / 1000 }
export function schwarzschildRadius(M: number): number { return (2 * GR.G * M) / (GR.c * GR.c) }

export function buildGeneralRelativityScene(): SceneSpec {
  const gain = gpsGravityGainUs(), loss = gpsSpeedLossUs(), net = gpsNetUs(), drift = gpsDriftKm()
  const pr = heightShift(9.81, 22.5), rsSun = schwarzschildRadius(GR.M_SUN), rsEarth = schwarzschildRadius(GR.M_EARTH)
  const ball = (x: number, y: number, r: number): SceneObject => dot(P(x, y), ROLE.input, r)
  // a light beam entering the accelerating lift horizontally; drop exaggerated to be visible
  const LX0 = 1.2, LX1 = 4.4, LY = 3.8, DROP = 1.2
  const beam: V3[] = Array.from({ length: 33 }, (_, i) => { const x = LX0 + ((LX1 - LX0) * i) / 32; const u = (x - LX0) / (LX1 - LX0); return P(x, LY - DROP * u * u) })
  // Layout (revised after the browser review, 2026-10-04): lifts in a top row
  // with their names ABOVE them; the clock bars low on the left with their
  // values beside them; the curvature facts on the right. Nine labels in all,
  // so nothing is held back at any level's budget, and the result label is a
  // formula, so the frame's headline is the answer, not the rocket.
  const BASE = -3.7, SY = 0.04
  const bar = (x: number, us: number, role: string): SceneObject[] => rect(x - 0.35, Math.min(BASE, BASE + us * SY), x + 0.35, Math.max(BASE, BASE + us * SY), role)
  const XG = -4.0, XL = -2.6, XN = -1.2
  return {
    id: 'phys-general-relativity',
    title: 'Gravity as acceleration: light bends, low clocks run slow',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the equivalence principle — a closed lift on Earth and one accelerating at 9.8 m/s² in deep space give identical results — and its consequences: light crossing an accelerating lift curves, so gravity bends light; clocks lower down run slow (gh/c² = ${pr.toExponential(1)} over 22.5 m); GPS clocks gain ${gain.toFixed(1)} μs/day from weaker gravity and lose ${loss.toFixed(1)} μs/day from speed, net +${net.toFixed(1)} μs/day, or about ${drift.toFixed(1)} km/day of position error; r_s = 2GM/c² is ${(rsSun / 1000).toFixed(2)} km for the Sun and ${(rsEarth * 1000).toFixed(1)} mm for Earth.`,
    ariaLabel: `Top left: two identical closed rooms, one standing on the ground and one with a rocket arrow pushing it upward; in each, a large and a small ball fall side by side. Top right: a room accelerating upward with a light beam entering from the left that curves downward as it crosses. Bottom left: three bars of clock gain per day for GPS satellites — a tall bar of plus ${gain.toFixed(1)} microseconds, a short downward bar of minus ${loss.toFixed(1)}, and a net bar of plus ${net.toFixed(1)}. Bottom right: the Schwarzschild radii of the Sun and Earth.`,
    steps: [
      { narration: 'Two closed rooms: one at rest on Earth, one in a rocket accelerating at 9.8 m/s² in deep space. A heavy and a light ball fall together in both; a scale reads the same; no experiment inside can tell them apart. That is the equivalence principle.', objects: [...rect(-4.4, 1.4, -2.4, 4.2, ROLE.reference), ...rect(-1.6, 1.4, 0.4, 4.2, ROLE.reference), line(P(-4.8, 1.4), P(-2.0, 1.4), ROLE.ink, 0.06), label('on Earth', P(-3.4, 4.6), ROLE.ink, 'detail'), arrow(P(-0.6, 0.4), P(-0.6, 1.3), ROLE.output), label('rocket, a = g', P(-0.6, 4.6), ROLE.output, 'detail'), ball(-3.8, 3.3, 0.18), ball(-3.0, 3.3, 0.1), arrow(P(-3.8, 3.0), P(-3.8, 2.3), ROLE.input), arrow(P(-3.0, 3.0), P(-3.0, 2.3), ROLE.input), ball(-1.0, 3.3, 0.18), ball(-0.2, 3.3, 0.1), arrow(P(-1.0, 3.0), P(-1.0, 2.3), ROLE.input), arrow(P(-0.2, 3.0), P(-0.2, 2.3), ROLE.input)] },
      { narration: 'Shine light straight across the accelerating room: while it crosses, the room moves up, so the beam lands lower — inside, its path curves. So gravity must bend light too, though light has no mass: 1.75″ for starlight grazing the Sun, seen in 1919.', objects: [...rect(LX0, 1.4, LX1, 4.2, ROLE.reference), arrow(P(2.8, 0.4), P(2.8, 1.3), ROLE.output), curve(beam, ROLE.result), label('light bends (exaggerated)', P(2.8, 4.6), ROLE.result, 'detail')] },
      { narration: `Light climbing out of gravity loses energy, so lower clocks run slow: gh/c² = ${pr.toExponential(1)} over 22.5 m. GPS clocks gain ${gain.toFixed(1)} μs a day from weaker gravity and lose ${loss.toFixed(1)} from their speed: net +${net.toFixed(1)} μs, about ${drift.toFixed(1)} km a day if uncorrected.`, objects: [line(P(-4.6, BASE), P(-0.6, BASE), ROLE.reference, 0.02), ...bar(XG, gain, ROLE.output), ...bar(XL, -loss, ROLE.input), ...bar(XN, net, ROLE.result), label(`+${gain.toFixed(1)} μs gravity`, P(XG + 0.2, BASE + gain * SY + 0.35), ROLE.output, 'detail'), label(`−${loss.toFixed(1)} μs speed`, P(XL, BASE - loss * SY - 0.4), ROLE.input, 'detail'), label(`GPS net = +${net.toFixed(1)} μs/day`, P(XN + 0.6, BASE + net * SY + 0.75), ROLE.result, 'primary'), label(`gh/c² = ${pr.toExponential(1)} over 22.5 m`, P(2.6, -0.4), ROLE.aid, 'detail')] },
      { narration: `General relativity: mass curves spacetime, and free objects and light follow the straightest paths through it. Squeeze a mass inside r_s = 2GM/c² — ${(rsSun / 1000).toFixed(2)} km for the Sun, ${(rsEarth * 1000).toFixed(1)} mm for Earth — and not even light escapes.`, objects: [label('mass curves spacetime', P(2.6, -1.6), ROLE.ink, 'primary'), label(`r_s: Sun ${(rsSun / 1000).toFixed(2)} km · Earth ${(rsEarth * 1000).toFixed(1)} mm`, P(2.2, -2.6), ROLE.aid, 'detail')] },
    ],
  }
}
