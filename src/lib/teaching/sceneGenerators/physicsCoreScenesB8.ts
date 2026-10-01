/**
 * Physics visual gap campaign, batch 8 (2026-09-30): electrostatics,
 * magnetostatics, Maxwell's equations and optics. Same rules as
 * physicsCoreScenes.ts; every figure stays within the intermediate label budget.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, type V3 } from './physicsCoreScenes'

const rad = (d: number) => (d * Math.PI) / 180

/** A ⊗ (into the page) or ⊙ (out of the page) marker. */
function pageMark(c: V3, r: number, into: boolean, color: string): SceneObject[] {
  const k = r * 0.62
  return [curve(circlePoints(c[0], c[1], r, 0, 2 * Math.PI, 24), color),
    ...(into ? [line(P(c[0] - k, c[1] - k), P(c[0] + k, c[1] + k), color, 0.025), line(P(c[0] - k, c[1] + k), P(c[0] + k, c[1] - k), color, 0.025)] : [dot(c, color, r * 0.3)])]
}

// ── 1. Electric charge ───────────────────────────────────────────────────────

/**
 * KG: "a fundamental property of matter that is quantised and conserved." A
 * rod rubbed with a cloth: 3 electrons move from cloth to rod. Rod −3e, cloth
 * +3e; the total stays zero, and every charge is a whole number of e.
 */
export const RUB_TRANSFER = 3
export function buildElectricChargeScene(): SceneSpec {
  const body = (x0: number, y0: number, pos: number, neg: number): SceneObject[] => {
    const out: SceneObject[] = [...rect(x0, y0, x0 + 3.0, y0 + 1.0, ROLE.reference)]
    for (let i = 0; i < pos; i++) out.push(dot(P(x0 + 0.35 + i * 0.7, y0 + 0.72), ROLE.input, 0.1))
    for (let i = 0; i < neg; i++) out.push(dot(P(x0 + 0.25 + (i % 7) * 0.42, y0 + 0.28), ROLE.output, 0.09))
    return out
  }
  const net = (pos: number, neg: number) => pos - neg
  return {
    id: 'phys-electric-charge',
    title: 'Electric charge: quantised and conserved',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show charging by rubbing: electrons move from the cloth to the rod, so the rod becomes −3e and the cloth +3e — charge is only moved, never created, and always comes in whole multiples of e.',
    ariaLabel: 'Before rubbing, a rod and a cloth each have four positive and four negative charges: both neutral. After rubbing, three electrons have moved from the cloth to the rod: the rod has seven negative and four positive charges, net minus three e; the cloth one negative and four positive, net plus three e. The total is still zero.',
    steps: [
      { narration: 'Before rubbing, the rod and the cloth are each neutral: equal numbers of positive (red) and negative (blue) charges.', objects: [...body(-4.4, 1.2, 4, 4), ...body(0.8, 1.2, 4, 4), label('rod: 0', P(-2.9, 2.7), ROLE.ink, 'detail'), label('cloth: 0', P(2.3, 2.7), ROLE.ink, 'detail')] },
      { narration: `Rubbing moves ${RUB_TRANSFER} electrons from the cloth to the rod. Only electrons move; the positive charges stay put.`, objects: [...body(-4.4, -2.2, 4, 4 + RUB_TRANSFER), ...body(0.8, -2.2, 4, 4 - RUB_TRANSFER), label(`rod: ${net(4, 4 + RUB_TRANSFER)}e`, P(-2.9, -2.7), ROLE.output, 'primary'), label(`cloth: +${net(4, 4 - RUB_TRANSFER)}e`, P(2.3, -2.7), ROLE.input, 'primary'), arrow(P(0.6, -0.4), P(-1.2, -0.4), ROLE.output)] },
      { narration: 'The total charge is still zero: charge is conserved. And every charge is a whole number of electron charges: q = ne, e = 1.6 × 10⁻¹⁹ C.', objects: [label('total = 0 before and after', P(0, 0.4), ROLE.result, 'primary'), label('q = ne', P(3.6, 0.4 - 0.9), ROLE.result, 'detail')] },
    ],
  }
}

// ── 2. Gauss's law ───────────────────────────────────────────────────────────

/**
 * KG: "the total electric flux through a closed surface to the enclosed charge:
 * Φ = Q_enc/ε₀." Two closed surfaces around +Q are crossed by the same 8 field
 * lines (same flux, whatever the size); a surface enclosing no charge has as
 * many lines leaving as entering (zero net flux).
 */
export const GAUSS_Q: V3 = P(-1.4, 0)
export const GAUSS_LINES = 8
export const GAUSS_LINE_ANGLE = (k: number) => (k * 2 * Math.PI) / GAUSS_LINES + Math.PI / 8 + 0.1
// Centred ON a field line (the first-quadrant one), so that line visibly enters
// and leaves it. MEASURED: the first placement sat between lines and showed nothing.
export const GAUSS_OUTSIDE = { c: P(GAUSS_Q[0] + 3.2 * Math.cos(GAUSS_LINE_ANGLE(0)), 3.2 * Math.sin(GAUSS_LINE_ANGLE(0))) as V3, r: 0.7 }
export function gaussFieldLines(): Array<[V3, V3]> {
  return Array.from({ length: GAUSS_LINES }, (_, i) => {
    const a = GAUSS_LINE_ANGLE(i)
    // Run each line out to the ±4.6 × ±4.4 frame (or 4.6 long, whichever is first).
    const c = Math.cos(a), s = Math.sin(a)
    let L = 4.6
    if (c > 1e-9) L = Math.min(L, (4.6 - GAUSS_Q[0]) / c)
    if (c < -1e-9) L = Math.min(L, (-4.6 - GAUSS_Q[0]) / c)
    if (Math.abs(s) > 1e-9) L = Math.min(L, 4.4 / Math.abs(s))
    return [P(GAUSS_Q[0] + 0.3 * Math.cos(a), 0.3 * Math.sin(a)), P(GAUSS_Q[0] + L * Math.cos(a), L * Math.sin(a))] as [V3, V3]
  })
}
export function buildGaussLawScene(): SceneSpec {
  const lines = gaussFieldLines()
  return {
    id: 'phys-gauss-law',
    title: "Gauss's law",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the electric flux through any closed surface depends only on the charge inside: two different surfaces around +Q catch the same field lines (Φ = Q/ε₀), and a surface around no charge has zero net flux.',
    ariaLabel: 'A positive charge with eight field lines radiating outward. Two circles around it, one small and one large, are each crossed by all eight lines: the same flux. A third circle off to one side, enclosing no charge, has field lines entering and leaving it in equal numbers: zero net flux.',
    steps: [
      { narration: 'A positive charge and its field lines, pointing outward.', objects: [dot(GAUSS_Q, ROLE.input, 0.28), label('+Q', P(GAUSS_Q[0] - 0.55, -0.55), ROLE.input, 'primary'), ...lines.map(([a, b]) => arrow(a, b, ROLE.input))] },
      { narration: 'Draw closed surfaces around the charge. Small or large, each is crossed by all the field lines: the flux is the same, Φ = Q/ε₀.', objects: [curve(circlePoints(GAUSS_Q[0], 0, 1.1, 0, 2 * Math.PI, 40), ROLE.output), curve(circlePoints(GAUSS_Q[0], 0, 2.3, 0, 2 * Math.PI, 56), ROLE.output), label('Φ = Q/ε₀ through both', P(-2.0, 3.8), ROLE.output, 'primary')] },
      { narration: 'A closed surface that encloses no charge: every line that enters also leaves, so the net flux is zero.', objects: [curve(circlePoints(GAUSS_OUTSIDE.c[0], GAUSS_OUTSIDE.c[1], GAUSS_OUTSIDE.r, 0, 2 * Math.PI, 32), ROLE.result), label('no charge inside: Φ = 0', P(2.6, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Dielectrics ───────────────────────────────────────────────────────────

/**
 * KG: "insulators that become polarized in an electric field, increasing
 * capacitance by reducing the internal field." Same charge Q: with a κ = 2
 * slab the field inside halves (E = E₀/κ), so V halves and C = κC₀ doubles.
 */
export const KAPPA = 2
export function buildDielectricScene(): SceneSpec {
  const plates = (x: number): SceneObject[] => [line(P(x - 1.0, -1.6), P(x - 1.0, 1.6), ROLE.input, 0.1), line(P(x + 1.0, -1.6), P(x + 1.0, 1.6), ROLE.output, 0.1)]
  const field = (x: number, n: number): SceneObject[] => Array.from({ length: n }, (_, i) => { const y = -1.2 + (2.4 * (i + 0.5)) / n; return arrow(P(x - 0.8, y), P(x + 0.8, y), ROLE.aid) })
  const RX = 2.4
  const dipoles: SceneObject[] = []
  for (const dy of [-1.0, 0, 1.0]) for (const dx of [-0.45, 0.45]) dipoles.push(arrow(P(RX + dx - 0.18, dy + 0.35), P(RX + dx + 0.18, dy + 0.35), ROLE.result))
  return {
    id: 'phys-dielectric',
    title: 'A dielectric in a capacitor',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a dielectric slab polarizing in a capacitor\'s field: its aligned molecules oppose the field, so for the same charge the field is weaker (E₀/κ) and the capacitance larger (κC₀).',
    ariaLabel: 'Two capacitors with the same charge. The left one has vacuum between its plates and four field lines. The right one has a dielectric slab whose molecules have lined up as tiny dipoles; only two field lines remain, half the field, so its capacitance is doubled.',
    steps: [
      { narration: 'A charged capacitor with vacuum between its plates: field E₀, capacitance C₀.', objects: [...plates(-2.4), ...field(-2.4, 4), label('vacuum: E₀, C₀', P(-2.4, 2.3), ROLE.ink, 'primary')] },
      { narration: 'The same charge, with a dielectric slab filling the gap. Its molecules polarize: each becomes a tiny dipole lined up with the field.', objects: [...plates(RX), ...rect(RX - 0.85, -1.5, RX + 0.85, 1.5, ROLE.reference), ...dipoles, label('dipoles align', P(RX, -2.1), ROLE.result, 'detail')] },
      { narration: `The dipoles' own field opposes the applied field, so the field inside is weaker: E = E₀/κ. With κ = ${KAPPA}, V halves and C = κC₀ doubles.`, objects: [...field(RX, 4 / KAPPA).map((o) => ({ ...o, from: [o.from![0], o.from![1] - 0.35, 0] as V3, to: [o.to![0], o.to![1] - 0.35, 0] as V3 })), label(`κ = ${KAPPA}: E = E₀/${KAPPA}, C = ${KAPPA}C₀`, P(RX, 2.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Energy stored in a capacitor ──────────────────────────────────────────

/** KG: "U = ½CV² = Q²/2C, stored in the electric field between the plates." V = Q/C as a line; the area under it is ½QV. */
export const CAP_C_UF = 2, CAP_V = 6
export function capacitorEnergyUj(): number { return 0.5 * CAP_C_UF * CAP_V ** 2 }
export function buildCapacitorEnergyScene(): SceneSpec {
  const X0 = -3.6, Y0 = -2.6, SX = 0.55, SY = 0.85
  const Q = CAP_C_UF * CAP_V
  const x = (q: number) => X0 + q * SX, y = (v: number) => Y0 + v * SY
  const fill: SceneObject[] = []
  for (let i = 1; i < 12; i++) { const q = (Q * i) / 12; fill.push(line(P(x(q), Y0), P(x(q), y(q / CAP_C_UF)), ROLE.result, 0.03)) }
  return {
    id: 'phys-capacitor-energy',
    title: 'Energy stored in a capacitor',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that charging a capacitor gets harder as its voltage rises (V = Q/C), so the energy stored is the triangular area under the V–Q line: U = ½QV = ½CV².',
    ariaLabel: 'A graph of voltage against charge for a 2 microfarad capacitor, a straight line from the origin to 12 microcoulombs at 6 volts. The triangle under the line is shaded: its area, 36 microjoules, is the energy stored.',
    steps: [
      { narration: 'As a capacitor charges, its voltage rises in proportion to the charge on it: V = Q/C.', objects: [arrow(P(X0, Y0), P(x(Q) + 0.8, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, y(CAP_V) + 0.9), ROLE.reference), label('charge Q (μC)', P(x(Q) - 0.2, Y0 - 0.5), ROLE.ink, 'detail'), label('voltage V', P(X0 + 0.9, y(CAP_V) + 1.2), ROLE.ink, 'detail'), line(P(X0, Y0), P(x(Q), y(CAP_V)), ROLE.output, 0.06), label(`${CAP_C_UF} μF`, P(x(Q / 2) - 0.8, y(CAP_V / 2) + 0.4), ROLE.output, 'primary')] },
      { narration: 'Each extra bit of charge must be pushed on against the voltage already there, so the work done is the area under the line.', objects: fill },
      { narration: `The area is a triangle: U = ½QV = ½CV² = ½ × ${CAP_C_UF} μF × (${CAP_V} V)² = ${capacitorEnergyUj()} μJ.`, objects: [label(`U = ½CV² = ${capacitorEnergyUj()} μJ`, P(1.6, 2.6), ROLE.result, 'primary'), label(`${Q} μC, ${CAP_V} V`, P(x(Q) + 0.3, y(CAP_V) + 0.45), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 5. Biot–Savart law ───────────────────────────────────────────────────────

/**
 * KG: "the infinitesimal magnetic field contribution dB from a current element
 * Idl." dB = (μ₀/4π) I dl sin θ / r², perpendicular to both dl and r — into the
 * page at P for dl up and P to the right; a quarter as strong at twice r.
 */
export function biotSavartRatio(r1: number, r2_: number): number { return (r1 / r2_) ** 2 }
export function buildBiotSavartScene(): SceneSpec {
  const E: V3 = P(-3.0, -1.4), TH = 60
  const d = [Math.sin(rad(TH)), Math.cos(rad(TH))]      // unit vector from element to P, θ from dl (+y)
  const P1: V3 = P(E[0] + 2.0 * d[0], E[1] + 2.0 * d[1]), P2: V3 = P(E[0] + 4.0 * d[0], E[1] + 4.0 * d[1])
  return {
    id: 'phys-biot-savart',
    title: 'The Biot–Savart law',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a small current element Idl producing a field dB at a point P: at right angles to both dl and r, proportional to sin θ and falling as 1/r².',
    ariaLabel: 'A short current element pointing up. A line r runs from it to a point P at 60 degrees from the current direction. At P the small field dB points into the page. At twice the distance along the same line, the field is a quarter as strong.',
    steps: [
      { narration: 'A tiny piece of wire of length dl carries current I.', objects: [line(P(E[0], -4.2), P(E[0], 4.2), ROLE.reference, 0.02), arrow(P(E[0], E[1] - 0.6), P(E[0], E[1] + 0.6), ROLE.input), label('I dl', P(E[0] - 0.7, E[1]), ROLE.input, 'primary')] },
      { narration: `At a point P a distance r away, at angle θ = ${TH}° to dl, it produces a small field dB — at right angles to both dl and r: here into the page.`, objects: [line(E, P1, ROLE.aid, 0.025), label('r', P((E[0] + P1[0]) / 2 + 0.3, (E[1] + P1[1]) / 2 - 0.2), ROLE.aid, 'primary'), curve(circlePoints(E[0], E[1], 0.8, Math.PI / 2 - rad(TH), Math.PI / 2, 12), ROLE.aid), label(`θ = ${TH}°`, P(E[0] + 0.55, E[1] + 1.1), ROLE.aid, 'detail'), ...pageMark(P1, 0.28, true, ROLE.output), label('dB into page', P(P1[0] + 1.5, P1[1]), ROLE.output, 'detail')] },
      { narration: 'Its size is dB = (μ₀/4π) I dl sin θ / r²: at twice the distance, a quarter as strong. Adding up every element gives the field of the whole wire.', objects: [line(P1, P2, ROLE.aid, 0.015), ...pageMark(P2, 0.14, true, ROLE.output), label(`2r: dB × ${biotSavartRatio(1, 2)}`, P(P2[0] + 0.2, P2[1] + 0.55), ROLE.output, 'detail'), label('dB = (μ₀/4π) I dl sin θ / r²', P(1.2, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Ampère's law ──────────────────────────────────────────────────────────

/**
 * KG: "relates the line integral of magnetic field around a closed loop to the
 * enclosed current." A wire carrying I out of the page: B circles it
 * anticlockwise (right-hand rule) with B = μ₀I/(2πr) — half as strong at 2r.
 */
export function ampereB(r: number): number { return 1 / r } // ∝ μ₀I/(2πr)
export function buildAmperesLawScene(): SceneSpec {
  const R1 = 1.3, R2 = 2.6, K = 1.7
  const tangents = (r: number): SceneObject[] => [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i * Math.PI) / 3 + Math.PI / 6, L = K * ampereB(r)
    const p: V3 = P(r * Math.cos(a), r * Math.sin(a))
    return arrow(p, P(p[0] - L * Math.sin(a), p[1] + L * Math.cos(a)), ROLE.output) // anticlockwise
  })
  return {
    id: 'phys-amperes-law',
    title: "Ampère's law",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the magnetic field circling a straight current: add up B along any closed loop and you get μ₀ times the current through it, which for a circle gives B = μ₀I/(2πr).',
    ariaLabel: 'A wire seen end-on, carrying current out of the page. Two circular loops surround it. Magnetic field arrows run anticlockwise along each loop, tangent to it; the arrows on the loop twice as far out are half as long.',
    steps: [
      { narration: 'A long straight wire, seen end-on, carries current I out of the page.', objects: [...pageMark(P(0, 0), 0.3, false, ROLE.input), label('I out of page', P(0, -0.8), ROLE.input, 'detail')] },
      { narration: 'Its magnetic field circles the wire — anticlockwise here, by the right-hand rule. Around a loop of radius r, ∮B·dl = μ₀I.', objects: [curve(circlePoints(0, 0, R1, 0, 2 * Math.PI, 48), ROLE.aid), ...tangents(R1), label('∮B·dl = μ₀I', P(-2.8, 3.6), ROLE.result, 'primary')] },
      { narration: 'Every loop encloses the same current, so B × 2πr is the same: B = μ₀I/(2πr). Twice as far out, the field is half as strong.', objects: [curve(circlePoints(0, 0, R2, 0, 2 * Math.PI, 64), ROLE.aid), ...tangents(R2), label('B = μ₀I / 2πr', P(2.8, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Magnetic materials ────────────────────────────────────────────────────

/**
 * KG: "classified as diamagnetic, paramagnetic, or ferromagnetic based on
 * their response to external magnetic fields." The induced magnetisation M in
 * the same applied B: weakly against it, weakly along it, strongly along it.
 */
// Drawn arrow lengths, qualitative (real χ spans ~1e-5 to ~1e3 — unreadable to scale).
export const SUSCEPTIBILITY = { diamagnetic: -0.55, paramagnetic: 0.65, ferromagnetic: 1.9 }
export function buildMagneticMaterialsScene(): SceneSpec {
  const cols: Array<[keyof typeof SUSCEPTIBILITY, number, string]> = [['diamagnetic', -3.2, ROLE.output], ['paramagnetic', 0, ROLE.aid], ['ferromagnetic', 3.2, ROLE.input]]
  const samples: SceneObject[] = []
  const Ms: SceneObject[] = []
  for (const [name, x, c] of cols) {
    samples.push(...rect(x - 0.9, -1.6, x + 0.9, 0.6, ROLE.reference))
    const m = SUSCEPTIBILITY[name]
    Ms.push(arrow(P(x, -0.5 - m / 2), P(x, -0.5 + m / 2), c))
    Ms.push(label(name, P(x, -2.2), c, 'detail'))
  }
  return {
    id: 'phys-magnetic-materials',
    title: 'Diamagnetic, paramagnetic, ferromagnetic',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show three materials in the same applied field: a diamagnet magnetises weakly against it, a paramagnet weakly along it, and a ferromagnet strongly along it.',
    ariaLabel: 'Three samples sit in the same upward magnetic field. In the diamagnetic sample a small magnetisation arrow points down, against the field. In the paramagnetic sample a small arrow points up, along the field. In the ferromagnetic sample a large arrow points up.',
    steps: [
      { narration: 'Three samples sit in the same upward magnetic field B.', objects: [...samples, ...[-4.4, 4.4].map((x) => arrow(P(x, -2.6), P(x, 1.6), ROLE.reference)), label('applied B', P(-4.1, 2.1), ROLE.ink, 'detail')] },
      { narration: 'Each becomes magnetised; the arrow M shows how strongly, and which way.', objects: Ms },
      { narration: 'Diamagnets are weakly repelled (M against B); paramagnets weakly attracted (M along B); ferromagnets such as iron strongly attracted — their domains line up.', objects: [label('M = χB: χ < 0, χ > 0, χ ≫ 0', P(0, 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Magnetic dipole ───────────────────────────────────────────────────────

/**
 * KG: "A magnetic dipole has a moment m = NIA; Earth behaves as a giant
 * magnetic dipole." A current loop and its field lines, computed from the
 * dipole field-line equation r = L sin²θ (θ from the axis).
 */
export function dipoleFieldLine(L: number, side: 1 | -1): V3[] {
  const pts: V3[] = []
  for (let i = 0; i <= 48; i++) {
    const th = 0.12 + ((Math.PI - 0.24) * i) / 48
    const r = L * Math.sin(th) ** 2
    pts.push(P(side * r * Math.sin(th), r * Math.cos(th)))
  }
  return pts
}
export function buildMagneticDipoleScene(): SceneSpec {
  const loop = circlePoints(0, 0, 0.9, 0, 2 * Math.PI, 40).map((p) => P(p[0], p[1] * 0.28))
  const lines: SceneObject[] = []
  for (const L of [1.6, 2.6, 3.8]) for (const s of [1, -1] as const) lines.push(curve(dipoleFieldLine(L, s), ROLE.aid))
  return {
    id: 'phys-magnetic-dipole',
    title: 'A magnetic dipole',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a current loop as a magnetic dipole with moment m = NIA along its axis, and its field lines — the same pattern as a bar magnet, or the Earth.',
    ariaLabel: 'A small loop of current seen at an angle, with its magnetic moment arrow m pointing up along its axis. Closed field lines leave the top, loop around the sides and return into the bottom, like the field of a bar magnet.',
    steps: [
      { narration: 'A loop of wire carries current I around an area A.', objects: [curve(loop, ROLE.input), label('current I', P(1.7, -0.4), ROLE.input, 'detail')] },
      { narration: 'It is a magnetic dipole with moment m = NIA, pointing along the axis by the right-hand rule.', objects: [arrow(P(0, 0), P(0, 1.6), ROLE.result), label('m = NIA', P(0.9, 1.4), ROLE.result, 'primary'), label('N', P(-0.45, 1.3), ROLE.input, 'primary'), label('S', P(-0.45, -0.8), ROLE.output, 'primary')] },
      { narration: 'Its field lines leave the north face, loop round and return to the south face — exactly the pattern of a bar magnet. The Earth\'s field has the same shape.', objects: lines },
    ],
  }
}

// ── 9. Maxwell's equations ───────────────────────────────────────────────────

/** KG: "Maxwell's four equations unify electricity and magnetism and predict electromagnetic wave propagation through displacement current." */
export function buildMaxwellScene(): SceneSpec {
  const cx = [-2.4, 2.4], cy = [1.9, -1.9]
  const radial: SceneObject[] = [0, 1, 2, 3, 4, 5].map((i) => { const a = (i * Math.PI) / 3; return arrow(P(cx[0] + 0.3 * Math.cos(a), cy[0] + 0.3 * Math.sin(a)), P(cx[0] + 1.1 * Math.cos(a), cy[0] + 1.1 * Math.sin(a)), ROLE.input) })
  const closed = [0.5, 0.9].flatMap((s) => [curve(circlePoints(cx[1], cy[0], s, 0, 2 * Math.PI, 24).map((p) => P(p[0], cy[0] + (p[1] - cy[0]) * 0.55)), ROLE.output)])
  const swirl = (x: number, y: number, color: string): SceneObject[] => [curve(circlePoints(x, y, 0.95, 0.3, 2 * Math.PI - 0.3, 30), color), arrow(P(x + 0.95 * Math.cos(-0.3), y + 0.95 * Math.sin(-0.3)), P(x + 0.95 * Math.cos(-0.05) + 0.02, y + 0.95 * Math.sin(-0.05) + 0.18), color)]
  return {
    id: 'phys-maxwell',
    title: "Maxwell's equations",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the four Maxwell equations as four pictures: charges source E; B has no sources (closed loops); a changing B makes a circulating E; a current or changing E makes a circulating B — together predicting light.',
    ariaLabel: 'Four panels. Top left: field lines spreading out from a charge (Gauss\'s law). Top right: closed magnetic field loops with no start or end (no magnetic monopoles). Bottom left: a changing magnetic field inside a circulating electric field (Faraday). Bottom right: a current inside a circulating magnetic field (Ampère–Maxwell).',
    steps: [
      { narration: 'Gauss: electric field lines start on positive charges and end on negative ones. Magnetic field lines never start or end — there are no magnetic monopoles.', objects: [dot(P(cx[0], cy[0]), ROLE.input, 0.22), ...radial, label('∮E·dA = Q/ε₀', P(cx[0], cy[0] - 1.6), ROLE.input, 'detail'), ...closed, label('∮B·dA = 0', P(cx[1], cy[0] - 1.6), ROLE.output, 'detail')] },
      { narration: 'Faraday: a changing magnetic field produces a circulating electric field. Ampère–Maxwell: a current, or a changing electric field, produces a circulating magnetic field.', objects: [...pageMark(P(cx[0], cy[1]), 0.25, true, ROLE.output), ...swirl(cx[0], cy[1], ROLE.input), label('∮E·dl = −dΦ_B/dt', P(cx[0], cy[1] - 1.5), ROLE.input, 'detail'), ...pageMark(P(cx[1], cy[1]), 0.25, false, ROLE.input), ...swirl(cx[1], cy[1], ROLE.output), label('∮B·dl = μ₀(I + ε₀ dΦ_E/dt)', P(cx[1], cy[1] - 1.5), ROLE.output, 'detail')] },
      { narration: 'Together: a changing E makes B and a changing B makes E, so each can sustain the other through empty space — an electromagnetic wave moving at c = 1/√(μ₀ε₀).', objects: [label('c = 1/√(μ₀ε₀)', P(0, 4.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Nature of light ──────────────────────────────────────────────────────

/**
 * KG: "Light exhibits both ray (geometric) and wave (physical) behaviour
 * depending on the scale." Through an opening much wider than λ light goes
 * straight (rays and sharp shadows); through one about λ wide it spreads (waves).
 */
export function buildNatureOfLightScene(): SceneSpec {
  const LX = -2.4, RX = 2.4, BX = 0
  const wide: SceneObject[] = [line(P(LX - 2.0 + BX, 2.0), P(LX - 2.0 + BX, 1.0), ROLE.reference, 0.1), line(P(LX - 2.0 + BX, -1.0), P(LX - 2.0 + BX, -2.0), ROLE.reference, 0.1)]
  const rays: SceneObject[] = [-0.7, 0, 0.7].map((y) => arrow(P(-4.8, y), P(LX + 1.6, y), ROLE.input))
  const gapX = RX - 1.6
  const arcs: SceneObject[] = [0.6, 1.2, 1.8, 2.4].map((r) => curve(circlePoints(gapX, 0, r, -Math.PI * 0.42, Math.PI * 0.42, 24), ROLE.output))
  return {
    id: 'phys-nature-of-light',
    title: 'Light: rays or waves?',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the right model of light depends on scale: through an opening far wider than its wavelength light travels in straight rays; through an opening about one wavelength wide it spreads out as a wave.',
    ariaLabel: 'Two panels. Left: light passes straight through a wide opening as parallel rays, casting a sharp-edged beam. Right: light reaching an opening about one wavelength wide spreads out beyond it as curved wavefronts.',
    steps: [
      { narration: 'Through an opening much wider than the wavelength, light travels in straight lines: the ray model works.', objects: [...wide, ...rays, label('wide opening: rays', P(LX - 0.8, 2.6), ROLE.input, 'primary')] },
      { narration: 'Through an opening about one wavelength wide, light spreads out: the wave model is needed.', objects: [line(P(gapX, 0.3), P(gapX, 2.0), ROLE.reference, 0.1), line(P(gapX, -0.3), P(gapX, -2.0), ROLE.reference, 0.1), ...arcs, label('opening ≈ λ: waves', P(RX, 2.6), ROLE.output, 'primary')] },
      { narration: 'Both describe the same light. Geometric optics is the limit where the wavelength is tiny compared with everything it meets.', objects: [label('ray optics when size ≫ λ', P(0, -3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Optical instruments: the magnifying glass ────────────────────────────

/**
 * KG: "Optical instruments use combinations of lenses and mirrors to magnify
 * images for the human eye." A converging lens (f = 2) with the object inside
 * f (u = −1.2): 1/v − 1/u = 1/f gives v = −3 — a virtual, upright image,
 * m = v/u = 2.5× larger.
 */
export const MAG_F = 2, MAG_U = -1.2, MAG_H = 0.8
export function magnifier() { const v = 1 / (1 / MAG_F + 1 / MAG_U); return { v: r2(v), m: r2(v / MAG_U) } }
export function buildOpticalInstrumentsScene(): SceneSpec {
  const { v, m } = magnifier()
  const S = 1.2, LX = 1.6                 // screen scale and lens position
  const X = (d: number) => LX + d * S
  const top: V3 = P(X(MAG_U), MAG_H * S), img: V3 = P(X(v), MAG_H * m * S)
  const F2: V3 = P(X(MAG_F), 0)
  const ext = (a: V3, b: V3, t: number): V3 => P(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
  return {
    id: 'phys-magnifier',
    title: 'A magnifying glass',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a converging lens magnifies: with the object inside the focal length, the rays leaving the lens diverge as if from a larger, upright, virtual image behind the object.',
    ariaLabel: 'A converging lens with focal points marked on both sides. A small upright object stands inside the focal length. Two rays from its tip — one parallel to the axis then through the far focal point, one straight through the centre — diverge after the lens. Traced backwards they meet at the tip of an upright image two and a half times larger, further from the lens.',
    steps: [
      { narration: `A converging lens of focal length f = ${MAG_F} cm. The object stands inside f, ${Math.abs(MAG_U)} cm from the lens.`, objects: [line(P(-4.8, 0), P(4.8, 0), ROLE.reference, 0.02), line(P(LX, -2.4), P(LX, 2.4), ROLE.reference, 0.06), dot(P(X(-MAG_F), 0), ROLE.aid, 0.08), dot(F2, ROLE.aid, 0.08), label('F', P(X(-MAG_F), -0.45), ROLE.aid, 'detail'), label('F', P(F2[0], -0.45), ROLE.aid, 'detail'), arrow(P(X(MAG_U), 0), top, ROLE.input), label('object', P(X(MAG_U), -0.45), ROLE.input, 'detail')] },
      { narration: 'Two rays from the tip: one parallel to the axis, bent through the far focal point; one straight through the centre. After the lens they spread apart.', objects: [line(top, P(LX, top[1]), ROLE.output, 0.03), line(P(LX, top[1]), ext(P(LX, top[1]), F2, 1.3), ROLE.output, 0.03), line(top, ext(P(LX, 0), top, -1.6), ROLE.output, 0.03)] },
      { narration: `Traced backwards (faint), they meet at the tip of an upright, virtual image: v = ${v} cm, magnified m = v/u = ${m}×. The eye sees this larger image.`, objects: [line(P(LX, top[1]), img, ROLE.aid, 0.015), line(top, img, ROLE.aid, 0.015), arrow(P(img[0], 0), img, ROLE.result), label(`image: m = ${m}×`, P(img[0], img[1] + 0.45), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Wave optics: Huygens' principle ──────────────────────────────────────

/**
 * KG: "treats light as a wave and uses Huygens' principle to explain
 * interference and diffraction." Every point on a wavefront is a source of
 * secondary wavelets; after time t they have radius ct, and the new wavefront
 * is their common tangent (envelope).
 */
export const HUY_R = 1.4
export function buildWaveOpticsScene(): SceneSpec {
  const X0 = -2.0, ys = [-2.4, -1.44, -0.48, 0.48, 1.44, 2.4]
  const wavelets = ys.map((y) => curve(circlePoints(X0, y, HUY_R, -Math.PI / 2, Math.PI / 2, 20), ROLE.aid))
  return {
    id: 'phys-huygens',
    title: "Huygens' principle",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Huygens\' construction: every point on a wavefront sends out secondary wavelets, and the new wavefront a moment later is the surface touching all of them.',
    ariaLabel: 'A straight wavefront on the left with six points marked on it. From each point a semicircular wavelet spreads to the right. A second straight line, touching the front of every wavelet, is the new wavefront.',
    steps: [
      { narration: 'A wavefront: every point on it is moving forward together.', objects: [line(P(X0, -3.0), P(X0, 3.0), ROLE.output, 0.05), ...ys.map((y) => dot(P(X0, y), ROLE.output, 0.1)), label('wavefront', P(X0 - 0.9, 3.4), ROLE.output, 'primary')] },
      { narration: 'Huygens: treat every point on it as a source of small secondary wavelets, spreading at the wave speed.', objects: [...wavelets, label('wavelets', P(X0 + 0.8, -3.6), ROLE.aid, 'detail')] },
      { narration: 'A moment later, the new wavefront is the line touching the front of all the wavelets. Where wavelets meet an edge or overlap, the same idea explains diffraction and interference.', objects: [line(P(X0 + HUY_R, -3.0), P(X0 + HUY_R, 3.0), ROLE.result, 0.05), arrow(P(X0 + HUY_R + 0.2, 0), P(X0 + HUY_R + 1.6, 0), ROLE.result), label('new wavefront', P(X0 + HUY_R + 1.4, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. Brewster's law ───────────────────────────────────────────────────────

/**
 * KG: "the angle at which reflected light is completely polarized." For glass
 * n = 1.5: tan θ_B = n → θ_B = 56.3°; the refracted angle (Snell) is 33.7°,
 * and reflected ⟂ refracted.
 */
export const BREWSTER_N = 1.5
export function brewsterAngles() {
  const b = (Math.atan(BREWSTER_N) * 180) / Math.PI
  const t = (Math.asin(Math.sin(rad(b)) / BREWSTER_N) * 180) / Math.PI
  return { brewster: Math.round(b * 10) / 10, refracted: Math.round(t * 10) / 10 }
}
export function buildBrewsterScene(): SceneSpec {
  const { brewster: B, refracted: T } = brewsterAngles()
  const L = 3.4
  const inc: V3 = P(-L * Math.sin(rad(B)), L * Math.cos(rad(B)))
  const ref: V3 = P(L * Math.sin(rad(B)), L * Math.cos(rad(B)))
  const tra: V3 = P(L * Math.sin(rad(T)), -L * Math.cos(rad(T)))
  const pol: SceneObject[] = [0.3, 0.5, 0.7].map((t) => dot(P(ref[0] * t, ref[1] * t), ROLE.result, 0.08))
  return {
    id: 'phys-brewster',
    title: "Brewster's angle",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show light hitting glass at Brewster\'s angle, tan θ_B = n: the reflected and refracted rays are at 90°, and the reflected light is completely polarized.',
    ariaLabel: 'Light strikes a flat glass surface at 56.3 degrees from the normal. Part reflects at the same angle and is completely polarized, shown by dots along it. Part refracts into the glass at 33.7 degrees. The reflected and refracted rays are at right angles.',
    steps: [
      { narration: `Unpolarized light strikes glass (n = ${BREWSTER_N}) at θ_B = ${B}° to the normal.`, objects: [line(P(-4.8, 0), P(4.8, 0), ROLE.reference, 0.05), line(P(0, 3.6), P(0, -3.6), ROLE.aid, 0.02), label('glass', P(-3.6, -0.6), ROLE.ink, 'detail'), arrow(inc, P(0, 0), ROLE.input), label(`θ_B = ${B}°`, P(-0.95, 1.9), ROLE.input, 'primary')] },
      { narration: `It reflects at ${B}° and refracts into the glass at ${T}°. The two rays are exactly at right angles.`, objects: [arrow(P(0, 0), ref, ROLE.result), arrow(P(0, 0), tra, ROLE.output), label(`${T}°`, P(0.6, -1.7), ROLE.output, 'detail'), label(`${r2(B + T)}° between them`, P(3.2, -0.5), ROLE.aid, 'detail')] },
      { narration: `At this angle the reflected light is completely polarized — only vibration parallel to the surface (dots) remains. Brewster: tan θ_B = n.`, objects: [...pol, label('reflected: fully polarized', P(2.2, 3.4), ROLE.result, 'primary'), label('tan θ_B = n', P(-3.0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}
