/**
 * Physics coverage-driven KG extension, batch 4 (2026-10-03): figures for the
 * human eye, scattering of light, the potential energy of a system of charges,
 * and cells in series and parallel. Same rules as physicsCoreScenes.ts: every
 * number drawn is computed here and pinned by
 * src/tests/physicsExtensionBatch4.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, circlePoints, type V3 } from './physicsCoreScenes'

// ── 1. The human eye ─────────────────────────────────────────────────────────

/** Myopia: far point 2 m, corrected by f = −2 m (−0.5 D). */
export const MYOPIA = { farPoint: 2 }
export function myopiaPower(farPointM = MYOPIA.farPoint): number { return -1 / farPointM }
/** Hypermetropia: lens that images 25 cm onto the near point (cm in, dioptres out). */
export function hypermetropiaPower(nearPointCm: number): number { return 100 * (1 / 25 - 1 / nearPointCm) }
export function buildHumanEyeScene(): SceneSpec {
  const CX = 1.6, R = 1.6, LX = 0.25, RET = CX + R, FOCUS = 2.3, Y = 0.55
  const eye = curve(circlePoints(CX, 0, R, 0, 2 * Math.PI, 56), ROLE.reference)
  const lens: SceneObject[] = [curve(Array.from({ length: 24 }, (_, i) => { const t = -Math.PI / 2 + (Math.PI * i) / 23; return P(LX + 0.22 * Math.cos(t), 0.75 * Math.sin(t)) }), ROLE.output), curve(Array.from({ length: 24 }, (_, i) => { const t = Math.PI / 2 + (Math.PI * i) / 23; return P(LX + 0.22 * Math.cos(t), 0.75 * Math.sin(t)) }), ROLE.output)]
  const raysMyopic: SceneObject[] = [line(P(-4.4, Y), P(LX, Y), ROLE.input, 0.03), line(P(-4.4, -Y), P(LX, -Y), ROLE.input, 0.03), line(P(LX, Y), P(FOCUS, 0), ROLE.input, 0.03), line(P(LX, -Y), P(FOCUS, 0), ROLE.input, 0.03), line(P(FOCUS, 0), P(RET - 0.05, -Y * (RET - FOCUS) / (FOCUS - LX)), ROLE.input, 0.02), line(P(FOCUS, 0), P(RET - 0.05, Y * (RET - FOCUS) / (FOCUS - LX)), ROLE.input, 0.02)]
  const GX = -2.2, spread = 0.22
  const raysCorrected: SceneObject[] = [/* diverging-lens symbol: one line, inward arrowheads */ line(P(GX, Y + 0.6), P(GX, -Y - 0.6), ROLE.result, 0.04), line(P(GX - 0.18, Y + 0.78), P(GX, Y + 0.6), ROLE.result, 0.04), line(P(GX + 0.18, Y + 0.78), P(GX, Y + 0.6), ROLE.result, 0.04), line(P(GX - 0.18, -Y - 0.78), P(GX, -Y - 0.6), ROLE.result, 0.04), line(P(GX + 0.18, -Y - 0.78), P(GX, -Y - 0.6), ROLE.result, 0.04), line(P(GX, Y), P(LX, Y + spread), ROLE.result, 0.03), line(P(GX, -Y), P(LX, -Y - spread), ROLE.result, 0.03), line(P(LX, Y + spread), P(RET, 0), ROLE.result, 0.03), line(P(LX, -Y - spread), P(RET, 0), ROLE.result, 0.03)]
  const p = myopiaPower(), pTxt = `${p < 0 ? '−' : '+'}${Math.abs(p)}`
  return {
    id: 'phys-human-eye',
    title: 'Short sight: focus in front of the retina, fixed by a diverging lens',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show myopia and its correction: a short-sighted eye brings parallel light from a distant object to a focus in front of the retina; a diverging lens of focal length −${MYOPIA.farPoint} m (power ${pTxt} D) spreads the rays slightly so they focus on the retina.`,
    ariaLabel: 'An eye drawn as a circle with a lens at the front and the retina at the back. Parallel rays from the left pass through the lens and meet at a point inside the eye, short of the retina, then spread out again. In a second step a thin diverging lens in front of the eye spreads the rays a little, and they now meet exactly on the retina.',
    steps: [
      { narration: 'The eye: a lens at the front, the retina at the back. Light from a distant object arrives as parallel rays.', objects: [eye, ...lens, label('lens', P(LX, 1.2), ROLE.output, 'detail'), label('retina', P(RET + 0.5, 1.2), ROLE.reference, 'detail'), label('from a distant object', P(-3.0, 1.15), ROLE.input, 'detail')] },
      { narration: 'In a short-sighted eye the rays meet in FRONT of the retina — the eye bends the light too much — and the image on the retina is a blur.', objects: [...raysMyopic, dot(P(FOCUS, 0), ROLE.input, 0.1), label('focus too early', P(FOCUS, -1.25), ROLE.input, 'detail')] },
      { narration: `A diverging lens removes a little power: the rays enter slightly spread and now meet on the retina. Far point ${MYOPIA.farPoint} m → f = −${MYOPIA.farPoint} m, power ${pTxt} D.`, objects: [...raysCorrected, dot(P(RET, 0), ROLE.result, 0.12), label('diverging lens', P(GX, -1.75), ROLE.result, 'detail'), label(`f = −${MYOPIA.farPoint} m, P = ${pTxt} D`, P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Scattering of light ───────────────────────────────────────────────────

export const SCATTER_WAVELENGTHS = [400, 450, 550, 600, 700] // violet, blue, green, orange, red (orange is ~600 nm; 650 nm is already red)
/** Rayleigh: relative scattering ∝ 1/λ⁴, normalised to red at 700 nm. */
export function relativeScattering(lambdaNm: number, refNm = 700): number { return Math.pow(refNm / lambdaNm, 4) }
export function buildScatteringScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.8, BW = 1.4, SY = 0.5
  const colours = [ROLE.aid, ROLE.output, ROLE.result, ROLE.input, ROLE.input]
  const names = ['violet', 'blue', 'green', 'orange', 'red']
  const bars: SceneObject[] = SCATTER_WAVELENGTHS.flatMap((l, i) => {
    const h = relativeScattering(l) * SY, x = X0 + 0.7 + i * BW
    return [line(P(x, Y0), P(x, Y0 + h), colours[i], 0.32), label(names[i], P(x, Y0 + h + 0.35), colours[i], 'detail')]
  })
  const blue = relativeScattering(450)
  return {
    id: 'phys-scattering',
    title: 'Rayleigh scattering: short wavelengths scatter far more',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show that air molecules scatter short wavelengths far more strongly (∝ 1/λ⁴): blue light at 450 nm is scattered about ${blue.toFixed(1)} times more than red at 700 nm — so the sky looks blue, and sunlight that has crossed a long path loses its blue and looks red.`,
    ariaLabel: 'A bar chart of how strongly light of each wavelength is scattered by air, compared with red light. Violet at 400 nanometres has the tallest bar, nearly ten times red. Blue is about six times red. Green, orange and red bars get progressively shorter.',
    steps: [
      { narration: 'How strongly air scatters each colour of sunlight, compared with red light (700 nm = 1).', objects: [arrow(P(X0, Y0), P(X0 + 7.6, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + 5.6), ROLE.reference), label(`wavelength ${SCATTER_WAVELENGTHS[0]} → ${SCATTER_WAVELENGTHS[SCATTER_WAVELENGTHS.length - 1]} nm`, P(X0 + 6.6, Y0 - 0.85), ROLE.ink, 'detail'), label('scattering vs red', P(X0 + 1.4, Y0 + 5.75), ROLE.ink, 'detail')] },
      // Its own stage, so a beginner's five-label budget meets the axes and then the bars.
      { narration: 'Violet and blue scatter far more than green, orange and red: the bars fall steeply as the wavelength grows.', objects: [...bars] },
      { narration: `Scattering goes as 1/λ⁴: blue (450 nm) is scattered about (700/450)⁴ ≈ ${blue.toFixed(1)} times more than red. That scattered blue fills the sky.`, objects: [label(`blue ≈ ${blue.toFixed(1)} × red`, P(1.6, 2.6), ROLE.output, 'primary')] },
      { narration: 'Seen the other way, a beam that crosses a lot of air — the setting Sun — has lost most of its blue, so it looks red.', objects: [label('I ∝ 1/λ⁴', P(1.6, 3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Potential energy of a system of charges ───────────────────────────────

/** Three equal charges at the corners of an equilateral triangle: U = 3kq²/a (three pairs). */
export function pairCount(n: number): number { return (n * (n - 1)) / 2 }
export function systemEnergy(charges: { q: number; x: number; y: number }[], k = 9e9): number {
  let u = 0
  for (let i = 0; i < charges.length; i++) for (let j = i + 1; j < charges.length; j++) {
    const r = Math.hypot(charges[i].x - charges[j].x, charges[i].y - charges[j].y)
    u += (k * charges[i].q * charges[j].q) / r
  }
  return u
}
export function buildSystemEnergyScene(): SceneSpec {
  const S = 3.6, A = P(-S / 2, -1.6), B = P(S / 2, -1.6), C = P(0, -1.6 + (S * Math.sqrt(3)) / 2)
  const mid = (p: V3, q: V3, dx = 0, dy = 0) => P((p[0] + q[0]) / 2 + dx, (p[1] + q[1]) / 2 + dy)
  return {
    id: 'phys-system-energy',
    title: 'Energy of a system of charges: count each pair once',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the potential energy of three equal charges at the corners of an equilateral triangle is the sum over its three pairs, each counted once: U = 3kq²/a — assembled one charge at a time, the costs are 0, kq²/a and 2kq²/a.',
    ariaLabel: 'Three equal positive charges at the corners of an equilateral triangle of side a. Each side is drawn as a line labelled k q squared over a, one line per pair. The total energy is the sum of the three pair energies.',
    steps: [
      { narration: 'Three equal charges q at the corners of an equilateral triangle of side a. Bring them in one at a time: the first costs nothing.', objects: [dot(A, ROLE.input, 0.22), label('q (1st: 0)', P(A[0] - 0.4, A[1] - 0.6), ROLE.input, 'detail')] },
      { narration: 'The second costs kq²/a — work against the first. The third is pushed against both: 2kq²/a.', objects: [dot(B, ROLE.input, 0.22), dot(C, ROLE.input, 0.22), label('q (2nd: kq²/a)', P(B[0] + 0.3, B[1] - 0.6), ROLE.input, 'detail'), label('q (3rd: 2kq²/a)', P(C[0], C[1] + 0.55), ROLE.input, 'detail'), line(A, B, ROLE.aid, 0.03), line(A, C, ROLE.aid, 0.03), line(B, C, ROLE.aid, 0.03)] },
      { narration: `There are ${pairCount(3)} pairs — one per side — and each is paid for once: U = 3kq²/a, not 6kq²/a.`, objects: [label('kq²/a', mid(A, B, 0, -0.45), ROLE.aid, 'detail'), label('kq²/a', mid(A, C, -0.85, 0.1), ROLE.aid, 'detail'), label('kq²/a', mid(B, C, 0.85, 0.1), ROLE.aid, 'detail'), label('U = 3kq²/a  (3 pairs)', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Cells in series and parallel ──────────────────────────────────────────

/** Four cells, E = 1.5 V, r = 0.5 Ω each. */
export const CELLS = { n: 4, E: 1.5, r: 0.5 }
export function seriesCurrent(R: number, c = CELLS): number { return (c.n * c.E) / (R + c.n * c.r) }
export function parallelCurrent(R: number, c = CELLS): number { return c.E / (R + c.r / c.n) }
export function buildCellsScene(): SceneSpec {
  // Load axis starts at 0.1 Ω (as the aria text and the '0.1' tick say); from
  // 0.05 Ω the parallel curve (8.6 A) ran off the top of the axes.
  const X0 = -4.0, Y0 = -2.8, SX = 3.2, SY = 0.85, L0 = -1.0, L1 = 1.0
  const gx = (R: number) => X0 + (Math.log10(R) - L0) * SX, gy = (I: number) => Y0 + I * SY
  const pts = (f: (R: number) => number): V3[] => Array.from({ length: 48 }, (_, i) => { const R = Math.pow(10, L0 + ((L1 - L0) * i) / 47); return P(gx(R), gy(f(R))) })
  const cross = CELLS.r
  return {
    id: 'phys-cells-combination',
    title: 'Series or parallel? It depends on the load',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show current against load for four cells (1.5 V, 0.5 Ω each) in series (6 V, 2 Ω) and in parallel (1.5 V, 0.125 Ω): parallel gives more current for small loads, series for large ones, and the curves cross where the load equals one cell's internal resistance, ${cross} Ω.`,
    ariaLabel: 'A graph of current against load resistance on a logarithmic scale. The parallel curve starts high on the left, near 7 amps for a tenth of an ohm, and falls steeply. The series curve starts near 3 amps and falls slowly. They cross at half an ohm; to the right the series curve is higher.',
    steps: [
      { narration: 'Current through a load R from four 1.5 V cells, for loads from 0.05 Ω to 10 Ω.', objects: [arrow(P(X0, Y0), P(gx(10) + 0.4, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, gy(7.6)), ROLE.reference), label('load R (Ω, log scale)', P(gx(3), Y0 - 0.5), ROLE.ink, 'detail'), label('I (A)', P(X0 + 0.6, gy(7.6)), ROLE.ink, 'detail'), label('0.1', P(gx(0.1), Y0 - 0.5), ROLE.ink, 'detail'), label('10', P(gx(10), Y0 - 0.5), ROLE.ink, 'detail')] },
      { narration: 'Series: 6 V with 2 Ω inside. Parallel: 1.5 V with only 0.125 Ω inside.', objects: [curve(pts((R) => seriesCurrent(R)), ROLE.output), curve(pts((R) => parallelCurrent(R)), ROLE.input), label('series', P(gx(3.5), gy(seriesCurrent(3.5)) + 0.45), ROLE.output, 'detail'), label('parallel', P(gx(0.08) + 0.9, gy(parallelCurrent(0.08)) + 0.1), ROLE.input, 'detail')] },
      { narration: `They cross at R = ${cross} Ω, one cell's internal resistance. Smaller loads: parallel wins. Larger loads: series wins.`, objects: [dot(P(gx(cross), gy(seriesCurrent(cross))), ROLE.result, 0.13), line(P(gx(cross), Y0), P(gx(cross), gy(seriesCurrent(cross))), ROLE.aid, 0.02), label(`R = r = ${cross} Ω`, P(gx(cross) + 1.0, gy(seriesCurrent(cross)) + 0.5), ROLE.result, 'detail'), label('R ≪ r: parallel · R ≫ r: series', P(1.2, 4.5), ROLE.result, 'primary')] },
    ],
  }
}
