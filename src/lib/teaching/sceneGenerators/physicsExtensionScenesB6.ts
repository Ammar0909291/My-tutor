/**
 * Physics coverage-driven KG extension, batch 6 (2026-10-03): figures for
 * thin-film interference, the diffraction grating, resolving power, and
 * conductors in electrostatics. Same rules as physicsCoreScenes.ts: every number
 * drawn is computed here and pinned by src/tests/physicsExtensionBatch6.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, label, line } from './visualDesign'
import { P, circlePoints, rad, rect, type V3 } from './physicsCoreScenes'

// ── 1. Thin-film interference ────────────────────────────────────────────────

/** Soap film n = 1.33 at 600 nm (one phase flip); MgF₂ coating n = 1.38 at 550 nm (two flips). */
export const SOAP = { n: 1.33, lambdaNm: 600 }
export const COATING = { n: 1.38, lambdaNm: 550 }
/** Thinnest film with 2nt = λ/2: bright for one flip (soap), dark for two flips (coating). */
export function quarterWave(n: number, lambdaNm: number): number { return lambdaNm / (4 * n) }
export function buildThinFilmScene(): SceneSpec {
  const tS = quarterWave(SOAP.n, SOAP.lambdaNm), tC = quarterWave(COATING.n, COATING.lambdaNm)
  const YT = 0.8, YB = -0.8, XI = -3.2, XA = -1.0, XB = 0.0, XC = 1.0
  return {
    id: 'phys-thin-film',
    title: 'Thin film: two reflections, and the phase flip',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the two reflections from a thin film interfering with optical path difference 2nt, and the half-wave flip on reflection from a denser medium. A soap film (n = ${SOAP.n}) has one flip, so its thinnest bright thickness for ${SOAP.lambdaNm} nm is t = λ/4n ≈ ${Math.round(tS)} nm; a magnesium fluoride coating (n = ${COATING.n}) on glass has two flips, so t = λ/4n ≈ ${Math.round(tC)} nm cancels ${COATING.lambdaNm} nm reflection.`,
    ariaLabel: 'A horizontal film between two lines, air above and below. An incident ray comes down to the top surface; part reflects straight back up, marked "flip: half a wavelength"; the rest crosses the film, reflects from the bottom surface marked "no flip", and comes back out parallel to the first reflected ray.',
    steps: [
      { narration: `A thin film of thickness t and refractive index n. Light reflects from the top surface; the rest enters, reflects from the bottom and comes back out — an extra optical path of 2nt.`, objects: [line(P(-4.5, YT), P(4.5, YT), ROLE.reference, 0.05), line(P(-4.5, YB), P(4.5, YB), ROLE.reference, 0.05), label('air', P(3.8, 2.2), ROLE.ink, 'detail'), label(`soap film, n = ${SOAP.n}`, P(2.9, 0), ROLE.ink, 'detail'), label('air', P(3.8, -2.0), ROLE.ink, 'detail'), arrow(P(XI, 3.6), P(XA, YT), ROLE.input), label('incident', P(XI - 0.4, 3.9), ROLE.input, 'detail'), arrow(P(XA, YT), P(XA + 2.2, 3.6), ROLE.output), line(P(XA, YT), P(XB, YB), ROLE.output, 0.04), line(P(XB, YB), P(XC, YT), ROLE.output, 0.04), arrow(P(XC, YT), P(XC + 2.2, 3.6), ROLE.output)] },
      { narration: 'Count the flips. Air → soap is into a denser medium: that reflection flips by half a wavelength. Soap → air is into a less dense medium: no flip.', objects: [label('flip (λ/2)', P(XA - 1.3, YT + 0.45), ROLE.aid, 'detail'), label('no flip', P(XB, YB - 0.5), ROLE.aid, 'detail')] },
      { narration: `One flip, so the film is bright when 2nt = λ/2, 3λ/2…: for ${SOAP.lambdaNm} nm, t ≈ ${Math.round(tS)} nm. Far thinner than that, the reflections cancel and the film looks black. A coating with two flips cancels reflection at t = λ/4n ≈ ${Math.round(tC)} nm.`, objects: [label(`soap: t ≈ ${Math.round(tS)} nm (bright)`, P(0, -3.2), ROLE.result, 'primary'), label(`MgF₂ coating: t ≈ ${Math.round(tC)} nm (no reflection)`, P(0, -4.2), ROLE.result, 'detail')] },
    ],
  }
}

// ── 2. Diffraction grating ───────────────────────────────────────────────────

/** 500 lines per mm, 600 nm: d = 2.0 μm. */
export const GRATING = { linesPerMm: 500, lambdaNm: 600 }
export function slitSpacingUm(linesPerMm: number): number { return 1000 / linesPerMm }
export function orderAngleDeg(m: number, linesPerMm = GRATING.linesPerMm, lambdaNm = GRATING.lambdaNm): number {
  const s = (m * lambdaNm) / (slitSpacingUm(linesPerMm) * 1000)
  return s > 1 ? NaN : (Math.asin(s) * 180) / Math.PI
}
export function maxOrder(linesPerMm = GRATING.linesPerMm, lambdaNm = GRATING.lambdaNm): number {
  return Math.floor((slitSpacingUm(linesPerMm) * 1000) / lambdaNm)
}
export function buildGratingScene(): SceneSpec {
  const X0 = -3.8, L = 4.6, mMax = maxOrder()
  const ray = (deg: number, role: string): SceneObject => arrow(P(X0, 0), P(X0 + L * Math.cos(rad(deg)), L * Math.sin(rad(deg))), role)
  const orders = Array.from({ length: mMax + 1 }, (_, m) => m)
  const fine = orderAngleDeg(1, 1000)
  return {
    id: 'phys-diffraction-grating',
    title: 'A grating: sharp orders where d sin θ = mλ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the orders of a ${GRATING.linesPerMm} lines/mm grating (d = ${slitSpacingUm(GRATING.linesPerMm).toFixed(1)} μm) for ${GRATING.lambdaNm} nm light: m = 1 at ${orderAngleDeg(1).toFixed(1)}°, up to m = ${mMax} because sin θ cannot exceed 1. A finer grating of 1000 lines/mm sends the first order out to ${fine.toFixed(1)}°.`,
    ariaLabel: `A grating on the left with light arriving from the left. Rays leave it at the angles of the orders: straight on for m = 0, then ${orders.slice(1).map((m) => `${orderAngleDeg(m).toFixed(1)} degrees for m = ${m}`).join(', ')}. A dashed comparison ray for a 1000 lines per millimetre grating leaves at ${fine.toFixed(1)} degrees.`,
    steps: [
      { narration: `A grating with ${GRATING.linesPerMm} lines per mm: the slits are d = ${slitSpacingUm(GRATING.linesPerMm).toFixed(1)} μm apart. Waves from every slit arrive in step where d sin θ = mλ.`, objects: [line(P(X0, -2.4), P(X0, 2.4), ROLE.reference, 0.07), arrow(P(-4.9, 0), P(X0 - 0.05, 0), ROLE.input), label(`${GRATING.lambdaNm} nm`, P(-4.5, 0.4), ROLE.input, 'detail'), ray(0, ROLE.output), label('m = 0', P(X0 + L + 0.2, -0.35), ROLE.output, 'detail')] },
      { narration: `The orders: ${orders.slice(1).map((m) => `m = ${m} at ${orderAngleDeg(m).toFixed(1)}°`).join(', ')}. There is no order ${mMax + 1}: it would need sin θ = ${(((mMax + 1) * GRATING.lambdaNm) / (slitSpacingUm(GRATING.linesPerMm) * 1000)).toFixed(2)}, more than 1.`, objects: orders.slice(1).flatMap((m) => [ray(orderAngleDeg(m), ROLE.output), label(`m = ${m}, ${orderAngleDeg(m).toFixed(1)}°`, P(X0 + (L + 0.5) * Math.cos(rad(orderAngleDeg(m))) + 0.7, (L + 0.3) * Math.sin(rad(orderAngleDeg(m)))), ROLE.output, 'detail')]) },
      { narration: `A finer grating, 1000 lines per mm, has d = 1.0 μm — the slits are CLOSER, so the first order moves OUT to ${fine.toFixed(1)}° — exactly where the coarser grating's second order was. Longer wavelengths are diffracted more: in a spectrum red lies furthest out.`, objects: [ray(fine, ROLE.result), label(`1000 lines/mm: m = 1 at ${fine.toFixed(1)}°`, P(0.6, -2.6), ROLE.result, 'primary'), label('d sin θ = mλ', P(0.6, -3.6), ROLE.result, 'detail')] },
    ],
  }
}

// ── 3. Resolving power ───────────────────────────────────────────────────────

/** Bessel J₁ by its power series (accurate to ~1e-10 for |x| ≤ 12). */
export function besselJ1(x: number): number {
  let term = x / 2, sum = term
  for (let k = 1; k < 40; k++) { term *= -(x * x) / (4 * k * (k + 1)); sum += term }
  return sum
}
/** Airy intensity profile, normalised to 1 at the centre. */
export function airy(u: number): number { return Math.abs(u) < 1e-9 ? 1 : (2 * besselJ1(u) / u) ** 2 }
/** First zero of J₁ — the Rayleigh separation in the reduced variable (≈ 3.8317). */
export function firstAiryZero(): number {
  let a = 3, b = 4.5
  for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (besselJ1(a) * besselJ1(m) <= 0) b = m; else a = m }
  return (a + b) / 2
}
export const APERTURES = { lambda: 550e-9, eye: 3e-3, telescope: 0.1 }
export function rayleighAngle(D: number, lambda = APERTURES.lambda): number { return (1.22 * lambda) / D }
export function buildResolvingPowerScene(): SceneSpec {
  const u0 = firstAiryZero(), S = 0.55, mid = u0 / 2, Y0 = -1.8, H = 3.4
  const profile = (c: number): V3[] => Array.from({ length: 81 }, (_, i) => { const u = -6 + (15.83 * i) / 80; return P((u - mid) * S, Y0 + H * airy(u - c)) })
  const eye = rayleighAngle(APERTURES.eye), scope = rayleighAngle(APERTURES.telescope)
  return {
    id: 'phys-resolving-power',
    title: 'Two diffraction discs at the Rayleigh limit',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show why detail is limited: each point becomes a diffraction disc, and two points are just resolved when one disc's centre sits on the other's first dark ring, θ_min ≈ 1.22 λ/D. At ${APERTURES.lambda * 1e9} nm the eye (D = ${APERTURES.eye * 1000} mm) resolves ${eye.toExponential(1)} rad and a ${APERTURES.telescope * 100} cm telescope ${scope.toExponential(1)} rad — about ${Math.round(eye / scope)} times finer.`,
    ariaLabel: 'A graph of brightness across the image. One tall peak with small side ripples shows the diffraction disc of one point. A second identical peak is added, centred exactly where the first one falls to zero; between them the combined brightness dips, so the two points are just distinguishable.',
    steps: [
      { narration: 'Even a perfect lens turns a point into a small disc with faint rings: the brightness across it rises to a peak and falls to zero at the first dark ring.', objects: [line(P(-4.6, Y0), P(4.6, Y0), ROLE.reference, 0.04), curve(profile(0), ROLE.input), label('one point', P(-mid * S - 0.2, Y0 + H + 0.35), ROLE.input, 'detail')] },
      { narration: 'A second point whose disc is centred on the first one\'s dark ring is just resolved — Rayleigh\'s criterion, θ_min ≈ 1.22 λ/D. Any closer and the two blur into one.', objects: [curve(profile(u0), ROLE.output), label('second point', P(mid * S + 0.4, Y0 + H + 0.35), ROLE.output, 'detail'), label('θ_min ≈ 1.22 λ / D', P(0, Y0 - 0.6), ROLE.aid, 'primary')] },
      { narration: `A bigger aperture makes the discs smaller. The eye, D = ${APERTURES.eye * 1000} mm: ${eye.toExponential(1)} rad. A ${APERTURES.telescope * 100} cm telescope: ${scope.toExponential(1)} rad. Magnifying the blur afterwards adds no detail.`, objects: [label(`eye ${eye.toExponential(1)} rad · telescope ${scope.toExponential(1)} rad`, P(0, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Conductors in electrostatics ──────────────────────────────────────────

export const EPS0 = 8.854e-12
export const SURFACE = { sigma: 2.0e-6 }
export function fieldJustOutside(sigma = SURFACE.sigma): number { return sigma / EPS0 }
export function buildConductorScene(): SceneSpec {
  const R = 1.6, CX = -2.0, E = fieldJustOutside()
  const n = 12, angles = Array.from({ length: n }, (_, i) => (2 * Math.PI * i) / n)
  // Teardrop conductor on the right: x = cos t, y = sin t · sin(t/2) — sharp tip at t = 0 (right), blunt end at t = π.
  const drop = (t: number): V3 => P(2.6 + 1.6 * Math.cos(t), 1.2 * Math.sin(t) * Math.sin(t / 2))
  const dropPts = Array.from({ length: 49 }, (_, i) => drop((2 * Math.PI * i) / 48))
  const tipPlus = [0.35, 0.6, 0.85].flatMap((t) => [drop(t), drop(2 * Math.PI - t)])
  return {
    id: 'phys-conductor-electrostatics',
    title: 'A charged conductor: zero field inside, charge on the surface',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show a conductor in electrostatic equilibrium: E = 0 inside, the excess charge on the outer surface, the field just outside perpendicular with E = σ/ε₀ (σ = ${SURFACE.sigma.toExponential(1)} C/m² gives ${E.toExponential(1)} V/m), and charge crowding at a sharp point.`,
    ariaLabel: 'Left: a circle representing a charged metal sphere, with plus signs evenly around its surface, arrows pointing straight outward from the surface, and the label "E = 0" in the middle. Right: a teardrop-shaped conductor with plus signs crowded together at its sharp tip.',
    steps: [
      { narration: 'A charged metal sphere. The free electrons have rearranged until the field inside is zero, and the excess charge sits on the outer surface.', objects: [curve(circlePoints(CX, 0, R, 0, 2 * Math.PI, 48), ROLE.reference), ...angles.map((a) => label('+', P(CX + R * Math.cos(a), R * Math.sin(a)), ROLE.input, 'detail')), label('E = 0', P(CX, 0), ROLE.result, 'primary')] },
      { narration: `Just outside, the field is perpendicular to the surface, with E = σ/ε₀: σ = ${SURFACE.sigma.toExponential(1)} C/m² gives ${E.toExponential(1)} V/m.`, objects: [...angles.map((a) => arrow(P(CX + (R + 0.1) * Math.cos(a), (R + 0.1) * Math.sin(a)), P(CX + (R + 0.9) * Math.cos(a), (R + 0.9) * Math.sin(a)), ROLE.output)), label(`E = σ/ε₀ ≈ ${E.toExponential(1)} V/m`, P(CX, -3.3), ROLE.output, 'detail')] },
      { narration: 'On a pointed conductor the charge crowds at the tip, where the surface curves most sharply — the field is strongest there. That is how a lightning conductor works; a closed metal shell keeps outside fields out (a Faraday cage).', objects: [curve(dropPts, ROLE.reference), ...tipPlus.map((p) => label('+', p, ROLE.input, 'detail')), label('+', drop(Math.PI - 0.6), ROLE.input, 'detail'), label('+', drop(Math.PI + 0.6), ROLE.input, 'detail'), label('charge crowds at the point', P(2.4, -2.2), ROLE.result, 'primary')] },
    ],
  }
}
