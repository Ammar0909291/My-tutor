/**
 * Physics visual gap campaign, batch 9 (2026-09-30): the five circuit concepts
 * whose old figure (a single-loop bulb card) was retired, semiconductors, and
 * the nuclear shell model. Same rules as physicsCoreScenes.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, fnPath, type V3 } from './physicsCoreScenes'

/** A resistor drawn as a zig-zag between two points (leads at each end). */
function resistor(a: V3, b: V3, color: string = ROLE.ink, teeth = 6, amp = 0.2): SceneObject {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy)
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux
  const pts: V3[] = [a, P(a[0] + ux * L * 0.25, a[1] + uy * L * 0.25)]
  for (let i = 1; i <= teeth * 2; i++) {
    const t = 0.25 + (0.5 * i) / (teeth * 2 + 1), s = i % 2 ? amp : -amp
    pts.push(P(a[0] + ux * L * t + nx * s, a[1] + uy * L * t + ny * s))
  }
  pts.push(P(a[0] + ux * L * 0.75, a[1] + uy * L * 0.75), b)
  return curve(pts, color)
}
/** A cell: long (+) and short (−) plates across a gap at (x, y), wires left/right. */
function cell(x: number, y: number): SceneObject[] {
  return [line(P(x - 0.15, y - 0.45), P(x - 0.15, y + 0.45), ROLE.reference, 0.06), line(P(x + 0.15, y - 0.25), P(x + 0.15, y + 0.25), ROLE.reference, 0.09)]
}
/** A galvanometer: a circle (its letter G is a separate label). */
function meter(c: V3): SceneObject { return curve(circlePoints(c[0], c[1], 0.35, 0, 2 * Math.PI, 24), ROLE.aid) }
/** A coil of `turns` loops along a segment. */
function coil(a: V3, b: V3, turns: number, r: number, color: string): SceneObject {
  const pts: V3[] = []
  const n = turns * 16
  for (let i = 0; i <= n; i++) {
    const t = i / n, ang = t * turns * 2 * Math.PI
    pts.push(P(a[0] + (b[0] - a[0]) * t + r * Math.sin(ang) * 0.5, a[1] + (b[1] - a[1]) * t + r * (1 - Math.cos(ang)) * 0.5))
  }
  return curve(pts, color)
}

// ── 1. Wheatstone bridge ─────────────────────────────────────────────────────

/** KG: "precise measurement of an unknown resistance by balancing four resistances." Balanced (no galvanometer current) when P/Q = R/S. */
export const BRIDGE = { P: 100, Q: 200, R: 150 }
export function bridgeUnknown(): number { return (BRIDGE.Q * BRIDGE.R) / BRIDGE.P }
export function buildWheatstoneScene(): SceneSpec {
  const L: V3 = P(-3.2, 0), T: V3 = P(0, 2.2), Rn: V3 = P(3.2, 0), B: V3 = P(0, -2.2)
  const S = bridgeUnknown()
  return {
    id: 'phys-wheatstone',
    title: 'The Wheatstone bridge',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a Wheatstone bridge: four resistors in a diamond with a galvanometer across the middle; when no current flows through it, P/Q = R/S, which gives the unknown S.',
    ariaLabel: 'Four resistors form a diamond: P and Q on the top two sides, R and S on the bottom two. A galvanometer joins the top and bottom corners. A cell is connected across the left and right corners. With P 100, Q 200 and R 150 ohms, the galvanometer reads zero when S is 300 ohms.',
    steps: [
      { narration: 'Four resistors P, Q, R, S form a diamond, powered by a cell across the left and right corners.', objects: [resistor(L, T), resistor(T, Rn), resistor(L, B), resistor(B, Rn), line(L, P(L[0], -3.6), ROLE.reference, 0.03), line(Rn, P(Rn[0], -3.6), ROLE.reference, 0.03), line(P(L[0], -3.6), P(-0.15, -3.6), ROLE.reference, 0.03), line(P(0.15, -3.6), P(Rn[0], -3.6), ROLE.reference, 0.03), ...cell(0, -3.6), label(`P = ${BRIDGE.P} Ω`, P(-2.3, 1.6), ROLE.ink, 'detail'), label(`Q = ${BRIDGE.Q} Ω`, P(2.3, 1.6), ROLE.ink, 'detail'), label(`R = ${BRIDGE.R} Ω`, P(-2.3, -1.6), ROLE.ink, 'detail'), label('S = ?', P(2.3, -1.6), ROLE.input, 'detail')] },
      { narration: 'A galvanometer joins the top and bottom corners. Adjust until it reads zero: then the two corners are at the same potential.', objects: [line(T, P(0, 0.35), ROLE.aid, 0.03), line(P(0, -0.35), B, ROLE.aid, 0.03), meter(P(0, 0)), label('G = 0', P(0.9, 0.3), ROLE.aid, 'primary')] },
      { narration: `Balanced: P/Q = R/S, so S = QR/P = ${BRIDGE.Q} × ${BRIDGE.R} / ${BRIDGE.P} = ${S} Ω.`, objects: [label(`S = QR/P = ${S} Ω`, P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Potentiometer ─────────────────────────────────────────────────────────

/** KG: "measures EMF … by comparing potential differences along a uniform resistance wire." E = V_AB × l/L at balance. */
export const POT = { L: 100, l: 60, VAB: 2.0 }
export function potEmf(): number { return r2((POT.VAB * POT.l) / POT.L) }
export function buildPotentiometerScene(): SceneSpec {
  const XA = -4.0, XB = 4.0, Y = 0.4
  const xj = XA + ((XB - XA) * POT.l) / POT.L
  return {
    id: 'phys-potentiometer',
    title: 'The potentiometer',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a potentiometer: a steady current makes the p.d. fall uniformly along a wire; a test cell is balanced (no galvanometer current) at length l, so its EMF is E = V_AB × l/L.',
    ariaLabel: 'A long uniform wire A to B, 100 centimetres, is connected to a driver cell that puts 2 volts across it. A test cell and galvanometer run from A to a sliding contact. At 60 centimetres the galvanometer reads zero, so the test cell\'s EMF is 1.2 volts.',
    steps: [
      { narration: `A uniform wire AB (${POT.L} cm) carries a steady current from a driver cell, which puts ${POT.VAB} V across it. The p.d. falls evenly along the wire.`, objects: [line(P(XA, Y), P(XB, Y), ROLE.output, 0.06), label('A', P(XA - 0.35, Y), ROLE.ink, 'detail'), label('B', P(XB + 0.35, Y), ROLE.ink, 'detail'), line(P(XA, Y), P(XA, 2.6), ROLE.reference, 0.03), line(P(XB, Y), P(XB, 2.6), ROLE.reference, 0.03), line(P(XA, 2.6), P(-0.15, 2.6), ROLE.reference, 0.03), line(P(0.15, 2.6), P(XB, 2.6), ROLE.reference, 0.03), ...cell(0, 2.6), label(`driver: ${POT.VAB} V across AB`, P(0, 3.4), ROLE.ink, 'detail')] },
      { narration: 'A test cell and a galvanometer run from A to a sliding contact (the jockey) on the wire.', objects: [line(P(XA, Y), P(XA, -1.6), ROLE.reference, 0.03), line(P(XA, -1.6), P(-2.3, -1.6), ROLE.reference, 0.03), ...cell(-2.0, -1.6), line(P(-1.7, -1.6), P(-0.35, -1.6), ROLE.reference, 0.03), meter(P(0, -1.6)), line(P(0.35, -1.6), P(xj, -1.6), ROLE.reference, 0.03), line(P(xj, -1.6), P(xj, Y - 0.1), ROLE.input, 0.03), label('test cell E', P(-2.0, -2.3), ROLE.input, 'detail'), label('G', P(0, -2.3), ROLE.aid, 'detail')] },
      { narration: `Slide the jockey until the galvanometer reads zero: at l = ${POT.l} cm the wire's p.d. exactly matches E. So E = ${POT.VAB} V × ${POT.l}/${POT.L} = ${potEmf()} V — measured without drawing any current from the cell.`, objects: [line(P(XA, Y - 0.6), P(xj, Y - 0.6), ROLE.aid, 0.03), label(`balance: l = ${POT.l} cm`, P((XA + xj) / 2, Y - 1.0), ROLE.aid, 'detail'), label(`E = V_AB × l/L = ${potEmf()} V`, P(1.8, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Self-inductance ───────────────────────────────────────────────────────

/**
 * KG: "a coil's ability to oppose changes in its own current by inducing a
 * back-EMF: ε = −L dI/dt." I ramps up, holds, then is switched off fast: the
 * back-EMF is small and negative, zero, then a large positive spike.
 */
export function coilCurrent(t: number): number {
  if (t <= 2) return 0.6 * t
  if (t <= 4) return 1.2
  if (t <= 4.4) return 1.2 - 3.0 * (t - 4)
  return 0
}
export function backEmf(t: number, L = 1): number { const h = 1e-3; return -L * (coilCurrent(t + h) - coilCurrent(t - h)) / (2 * h) }
export function buildSelfInductanceScene(): SceneSpec {
  const X0 = -4.0, SX = 1.3, T1 = 6
  const x = (t: number) => X0 + t * SX
  const IY = 1.2, EY = -2.0
  return {
    id: 'phys-self-inductance',
    title: 'Self-inductance: the back-EMF',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a coil opposing changes in its own current: ε = −L dI/dt — a small back-EMF while the current rises slowly, none while it is steady, and a large one when it is switched off quickly.',
    ariaLabel: 'Two graphs against time. Top: the current in a coil rises steadily, stays constant, then drops to zero quickly. Bottom: the coil\'s back-EMF is small and negative while the current rises, zero while it is steady, and a large positive spike when it is switched off.',
    steps: [
      { narration: 'The current through a coil rises steadily, stays constant, then is switched off quickly.', objects: [arrow(P(X0, IY), P(x(T1) + 0.3, IY), ROLE.reference), arrow(P(X0, IY), P(X0, IY + 2.4), ROLE.reference), label('current I', P(X0 + 0.9, IY + 2.8), ROLE.ink, 'detail'), curve(fnPath((xx) => IY + 1.6 * coilCurrent((xx - X0) / SX), X0, x(T1), 160), ROLE.input)] },
      { narration: 'The coil induces a back-EMF opposing every change: ε = −L dI/dt.', objects: [arrow(P(X0, EY), P(x(T1) + 0.3, EY), ROLE.reference), line(P(X0, EY - 1.0), P(X0, EY + 2.2), ROLE.reference, 0.04), label('back-EMF ε', P(X0 + 1.0, EY + 2.5), ROLE.ink, 'detail'), label('time', P(x(T1), EY - 0.45), ROLE.ink, 'detail'), curve(fnPath((xx) => EY + 0.55 * backEmf((xx - X0) / SX), X0 + 0.02, x(T1) - 0.02, 240), ROLE.output)] },
      { narration: 'A slow rise gives a small EMF, a steady current none, and a sudden switch-off a large spike — which is why switches on big coils can spark.', objects: [label('sudden switch-off: large ε', P(x(4.4) + 1.2, EY + 1.2), ROLE.result, 'detail'), label('ε = −L dI/dt', P(2.4, 4.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Mutual inductance: the transformer ────────────────────────────────────

/** KG: "the EMF induced in one coil by a changing current in another; transformers use this principle." V_s/V_p = N_s/N_p. */
export const XFMR = { Np: 4, Ns: 8, Vp: 12 }
export function secondaryVoltage(): number { return (XFMR.Vp * XFMR.Ns) / XFMR.Np }
export function buildTransformerScene(): SceneSpec {
  const core = [...rect(-2.4, -2.2, 2.4, 2.2, ROLE.reference), ...rect(-1.4, -1.2, 1.4, 1.2, ROLE.reference)]
  return {
    id: 'phys-transformer',
    title: 'Mutual inductance: the transformer',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two coils on one iron core: a changing current in the primary makes a changing flux that induces an EMF in the secondary, V_s/V_p = N_s/N_p.',
    ariaLabel: 'A square iron core. The primary coil, with 4 turns, is wound on the left side and connected to a 12 volt alternating supply. The secondary coil, with 8 turns, is wound on the right side. The changing flux circulates round the core, and the secondary produces 24 volts.',
    steps: [
      { narration: `An alternating current flows in the primary coil (${XFMR.Np} turns) on an iron core.`, objects: [...core, coil(P(-2.4, -1.4), P(-2.4, 1.4), XFMR.Np, 0.9, ROLE.input), label(`primary: ${XFMR.Np} turns, ${XFMR.Vp} V`, P(-3.0, 2.8), ROLE.input, 'detail')] },
      { narration: 'Its changing magnetic flux is guided round the core and through the secondary coil.', objects: [arrow(P(-1.9, 1.7), P(1.9, 1.7), ROLE.aid), arrow(P(1.9, -1.7), P(-1.9, -1.7), ROLE.aid), label('changing flux', P(0, 0), ROLE.aid, 'detail')] },
      { narration: `The changing flux induces an EMF in the secondary (${XFMR.Ns} turns): V_s = V_p × N_s/N_p = ${secondaryVoltage()} V.`, objects: [coil(P(2.4, -1.4), P(2.4, 1.4), XFMR.Ns, 0.9, ROLE.output), label(`secondary: ${XFMR.Ns} turns, V_s = ${secondaryVoltage()} V`, P(2.6, -2.8), ROLE.output, 'detail'), label('V_s / V_p = N_s / N_p', P(0, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. LC circuits ───────────────────────────────────────────────────────────

/** KG: "oscillates at resonant frequency f = 1/(2π√LC) as energy alternates between inductor and capacitor." L = 10 mH, C = 1 μF. */
export const LC = { L: 10e-3, C: 1e-6 }
export function lcFrequencyKHz(): number { return r2(1 / (2 * Math.PI * Math.sqrt(LC.L * LC.C)) / 1000) }
export function buildLcScene(): SceneSpec {
  const X0 = -4.0, X1 = 4.4, Y0 = -2.2, H = 3.6, PERIOD = 4.2
  const w = (x: number) => (2 * Math.PI * (x - X0)) / PERIOD
  return {
    id: 'phys-lc',
    title: 'An LC circuit oscillates',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show energy sloshing between a capacitor (electric field) and an inductor (magnetic field) in an LC circuit, the total staying constant, at f = 1/(2π√LC).',
    ariaLabel: 'A graph of energy against time for an LC circuit. The capacitor\'s energy and the inductor\'s energy rise and fall out of step: when one is at its maximum the other is zero. Their sum is a flat line: the total energy is constant.',
    steps: [
      { narration: 'A charged capacitor is connected to an inductor. At first all the energy is in the capacitor\'s electric field.', objects: [arrow(P(X0, Y0), P(X1 + 0.3, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + H + 0.8), ROLE.reference), label('time', P(X1, Y0 - 0.45), ROLE.ink, 'detail'), label('energy', P(X0 + 0.7, Y0 + H + 1.1), ROLE.ink, 'detail'), curve(fnPath((x) => Y0 + H * Math.cos(w(x)) ** 2, X0, X1, 160), ROLE.input), label('capacitor', P(X0 + 0.9, Y0 + H + 0.35), ROLE.input, 'detail')] },
      { narration: 'As the capacitor discharges, current builds in the inductor and the energy moves into its magnetic field — then back again, over and over.', objects: [curve(fnPath((x) => Y0 + H * Math.sin(w(x)) ** 2, X0, X1, 160), ROLE.output), label('inductor', P(X0 + PERIOD / 4, Y0 + H + 0.35), ROLE.output, 'detail')] },
      { narration: `The total never changes (no resistance). The circuit oscillates at f = 1/(2π√LC) — ${lcFrequencyKHz()} kHz for L = 10 mH, C = 1 μF.`, objects: [line(P(X0, Y0 + H), P(X1, Y0 + H), ROLE.result, 0.03), label('total: constant', P(3.0, Y0 + H + 0.4), ROLE.result, 'detail'), label(`f = 1/(2π√LC) = ${lcFrequencyKHz()} kHz`, P(0.4, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Energy bands ──────────────────────────────────────────────────────────

/**
 * KG: "the discrete energy levels of isolated atoms broaden into continuous
 * bands … separated by a band gap." Six atoms brought together: each level
 * splits into six, the spread growing as the overlap exp(−spacing) grows.
 */
export function levelSpread(x: number): number { return 1.3 * Math.exp((x - 1.6) * 0.9) }
export function buildEnergyBandsScene(): SceneSpec {
  const X0 = -4.2, X1 = 1.6, N = 6, E = [-1.8, 1.6]
  const levels: SceneObject[] = []
  for (const e of E) for (let k = 0; k < N; k++) {
    const f = (k - (N - 1) / 2) / ((N - 1) / 2)
    levels.push(curve(fnPath((x) => e + (levelSpread(x) * f) / 2, X0, X1, 40), e < 0 ? ROLE.output : ROLE.input))
  }
  return {
    id: 'phys-energy-bands',
    title: 'Energy bands in a solid',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two sharp atomic energy levels spreading into bands as atoms are brought together into a crystal, leaving a forbidden band gap between the valence and conduction bands.',
    ariaLabel: 'On the left, far-apart atoms each have two sharp energy levels. Moving right, the atoms come closer and each level splits into many nearby levels that spread into a band. At the crystal spacing there is a lower valence band and an upper conduction band, separated by a band gap.',
    steps: [
      { narration: 'Isolated atoms far apart: every atom has the same two sharp energy levels.', objects: [arrow(P(X0, -3.8), P(X1 + 0.4, -3.8), ROLE.reference), label('atoms closer →', P(-1.4, -4.2), ROLE.ink, 'detail'), label('isolated atoms', P(X0 + 0.9, 3.0), ROLE.ink, 'detail')] },
      { narration: 'Bring the atoms together: their outer electrons interact, and each level splits into many closely spaced levels — as many as there are atoms.', objects: levels },
      { narration: 'In a real crystal there are so many atoms that the levels merge into continuous bands: the valence band below, the conduction band above, and between them a band gap of forbidden energies.', objects: [...rect(X1, E[0] - levelSpread(X1) / 2, X1 + 1.6, E[0] + levelSpread(X1) / 2, ROLE.output), ...rect(X1, E[1] - levelSpread(X1) / 2, X1 + 1.6, E[1] + levelSpread(X1) / 2, ROLE.input), label('valence band', P(X1 + 0.8, E[0] - 1.1), ROLE.output, 'detail'), label('conduction band', P(X1 + 0.8, E[1] + 1.1), ROLE.input, 'detail'), label('band gap', P(X1 + 2.6, 0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Conductors, semiconductors, insulators ────────────────────────────────

/** KG: "classified … according to the size of the band gap and the extent to which the conduction band is filled." */
export const BAND_GAPS = { semiconductor: 1.1, insulator: 5.5 }
export function buildSemiconductorClassesScene(): SceneSpec {
  const S = 0.5 // drawn units per eV
  const col = (x: number, gapEv: number, name: string, color: string): SceneObject[] => {
    const vTop = -1.4, cBot = vTop + gapEv * S
    const out: SceneObject[] = [...rect(x - 0.9, vTop - 1.2, x + 0.9, vTop, ROLE.output), ...rect(x - 0.9, cBot, x + 0.9, cBot + 1.2, ROLE.input), label(name, P(x, -3.4), color, 'primary')]
    for (const dy of [0.3, 0.6, 0.9]) out.push(line(P(x - 0.8, vTop - dy), P(x + 0.8, vTop - dy), ROLE.output, 0.03))
    return out
  }
  return {
    id: 'phys-semiconductor-classes',
    title: 'Conductors, semiconductors, insulators',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three classes by their bands: in a conductor the bands overlap; a semiconductor has a small gap (silicon 1.1 eV) that heat can bridge; an insulator a large one (diamond 5.5 eV).',
    ariaLabel: 'Three band diagrams side by side. The conductor\'s filled valence band overlaps its conduction band. The semiconductor has a small gap of 1.1 electronvolts between them. The insulator has a large gap of 5.5 electronvolts.',
    steps: [
      { narration: 'Each material has a filled valence band (shaded) and a conduction band above it.', objects: [...rect(-4.1, -2.6, -2.3, -0.2, ROLE.output), ...rect(-4.1, -0.8, -2.3, 0.6, ROLE.input), line(P(-4.0, -1.0), P(-2.4, -1.0), ROLE.output, 0.03), line(P(-4.0, -1.6), P(-2.4, -1.6), ROLE.output, 0.03), label('conductor', P(-3.2, -3.4), ROLE.result, 'primary'), label('bands overlap', P(-3.2, 1.2), ROLE.result, 'detail')] },
      { narration: `A semiconductor has a small gap — ${BAND_GAPS.semiconductor} eV for silicon — which thermal energy can bridge.`, objects: [...col(0, BAND_GAPS.semiconductor, 'semiconductor', ROLE.aid), label(`E_g = ${BAND_GAPS.semiconductor} eV`, P(0, 1.3), ROLE.aid, 'detail')] },
      { narration: `An insulator has a large gap — ${BAND_GAPS.insulator} eV for diamond — so almost no electrons reach the conduction band.`, objects: [...col(3.2, BAND_GAPS.insulator, 'insulator', ROLE.ink), label(`E_g = ${BAND_GAPS.insulator} eV`, P(3.2, 3.2), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 8. Intrinsic semiconductors ──────────────────────────────────────────────

/**
 * KG: "thermal energy generates electron-hole pairs across the band gap, so
 * conductivity rises with temperature, unlike a metal." n ∝ T^1.5 e^(−E_g/2kT).
 */
export function intrinsicCarriers(tRel: number): number { return tRel ** 1.5 * Math.exp(-6 / tRel) / (3 ** 1.5 * Math.exp(-2)) }
export function buildIntrinsicScene(): SceneSpec {
  const pairs = [-3.9, -3.2, -2.5].map((x) => x)
  const hole = (x: number, y: number) => curve(circlePoints(x, y, 0.13, 0, 2 * Math.PI, 12), ROLE.input)
  const GX = 0.4, GY = -2.4, SX = 1.2, SY = 1.1
  return {
    id: 'phys-intrinsic-semiconductor',
    title: 'Intrinsic semiconductors',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show heat lifting electrons across the band gap of a pure semiconductor, each leaving a hole behind, so its conductivity rises steeply with temperature — the opposite of a metal.',
    ariaLabel: 'On the left, a band diagram: three electrons have been lifted from the valence band into the conduction band, each leaving a hole behind. On the right, a graph of conductivity against temperature: the semiconductor\'s rises steeply while a metal\'s slowly falls.',
    steps: [
      { narration: 'Heat gives some electrons enough energy to jump the band gap. Each leaves behind a hole in the valence band.', objects: [...rect(-4.4, -2.4, -2.0, -1.2, ROLE.output), ...rect(-4.4, 0.6, -2.0, 1.8, ROLE.input), ...pairs.map((x) => dot(P(x, 1.0), ROLE.output, 0.12)), ...pairs.map((x) => hole(x, -1.5)), ...pairs.map((x) => arrow(P(x + 0.15, -1.25), P(x + 0.15, 0.85), ROLE.aid)), label('electron–hole pairs', P(-3.2, 2.4), ROLE.aid, 'detail')] },
      { narration: 'Both carry current: electrons in the conduction band, holes in the valence band.', objects: [label('e⁻', P(-1.6, 1.2), ROLE.output, 'detail'), label('holes', P(-1.5, -1.8), ROLE.input, 'detail')] },
      { narration: 'Hotter means many more pairs, so conductivity rises steeply with temperature. A metal does the opposite: hotter atoms scatter its electrons more.', objects: [arrow(P(GX, GY), P(GX + 3.9, GY), ROLE.reference), arrow(P(GX, GY), P(GX, GY + 4.3), ROLE.reference), label('temperature', P(GX + 3.0, GY - 0.45), ROLE.ink, 'detail'), curve(fnPath((x) => GY + SY * 3.4 * Math.min(1, intrinsicCarriers(1 + (x - GX) / SX)), GX, GX + 3.6, 60), ROLE.result), label('semiconductor', P(GX + 2.8, GY + 3.6), ROLE.result, 'primary'), line(P(GX, GY + 1.3), P(GX + 3.6, GY + 0.7), ROLE.reference, 0.04), label('metal', P(GX + 3.4, GY + 0.4), ROLE.reference, 'detail')] },
    ],
  }
}

// ── 9. Extrinsic (doped) semiconductors ──────────────────────────────────────

/**
 * KG: "Doping … with a donor or acceptor impurity produces an n-type or p-type
 * material with a majority charge carrier, while the material as a whole
 * remains electrically neutral." Si (4 valence electrons) with P (5) or B (3).
 */
export const VALENCE = { Si: 4, P: 5, B: 3 }
export function buildExtrinsicScene(): SceneSpec {
  const lattice = (cx: number, dopant: string, color: string): SceneObject[] => {
    const out: SceneObject[] = []
    const pts: V3[] = []
    for (const j of [-1, 0, 1]) for (const i of [-1, 0, 1]) pts.push(P(cx + i * 1.2, j * 1.2))
    for (const p of pts) {
      if (p[0] < cx + 1.1) out.push(line(p, P(p[0] + 1.2, p[1]), ROLE.reference, 0.025))
      if (p[1] < 1.1) out.push(line(p, P(p[0], p[1] + 1.2), ROLE.reference, 0.025))
    }
    for (const p of pts) out.push(dot(p, p[0] === r2(cx) && p[1] === 0 ? color : ROLE.reference, p[0] === r2(cx) && p[1] === 0 ? 0.28 : 0.2))
    out.push(label(dopant, P(cx + 0.35, 0.35), color, 'detail'))
    return out.filter((o) => !(o.type === 'bond' && ((o.from![0] > cx + 1.3) || (o.from![1] > 1.3))))
  }
  const L = -2.6, R = 2.6
  return {
    id: 'phys-extrinsic-semiconductor',
    title: 'Doped semiconductors: n-type and p-type',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show doping silicon: a phosphorus atom (5 valence electrons) donates a spare electron (n-type); a boron atom (3) leaves a hole (p-type). The crystal stays neutral overall.',
    ariaLabel: 'Two small silicon lattices. In the left one a phosphorus atom sits in place of a silicon atom; its fifth electron is spare and free to move: n-type. In the right one a boron atom leaves one bond incomplete: a hole, p-type.',
    steps: [
      { narration: `A silicon lattice: each atom shares its ${VALENCE.Si} valence electrons with 4 neighbours. Replace one atom with phosphorus (${VALENCE.P} valence electrons).`, objects: [...lattice(L, 'P', ROLE.output), label('n-type', P(L, 2.2), ROLE.output, 'primary')] },
      { narration: `Phosphorus's ${VALENCE.P - VALENCE.Si === 1 ? 'fifth' : 'extra'} electron has no bond to fill: it is free to move. Donors make electrons the majority carrier.`, objects: [dot(P(L + 0.7, -0.7), ROLE.output, 0.12), arrow(P(L + 0.8, -0.8), P(L + 1.6, -1.6), ROLE.output), label('spare e⁻', P(L + 1.4, -2.1), ROLE.output, 'detail')] },
      { narration: `Boron has only ${VALENCE.B}: one bond is left incomplete — a hole that neighbouring electrons can hop into. Acceptors make holes the majority carrier. Either way the crystal stays neutral: every carrier is balanced by a fixed ion.`, objects: [...lattice(R, 'B', ROLE.input), curve(circlePoints(R + 0.6, -0.6, 0.15, 0, 2 * Math.PI, 12), ROLE.input), label('p-type: hole', P(R, 2.2), ROLE.input, 'primary'), label('neutral overall', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. The p-n junction ─────────────────────────────────────────────────────

/**
 * KG: "diffusion of majority carriers across the interface forms a depletion
 * region and a built-in potential that opposes further net carrier flow."
 */
export const DEPLETION_HALF = 0.8
export function buildPnJunctionScene(): SceneSpec {
  const carrierPts = (xs: number[]): Array<[number, number]> => xs.flatMap((x, i) => [-0.9, 0.3].map((y) => [x, y + (i % 2) * 0.45] as [number, number]))
  const holes = carrierPts([-4.0, -3.3, -2.6, -1.9]).map(([x, y]) => curve(circlePoints(x, y, 0.14, 0, 2 * Math.PI, 12), ROLE.input))
  const electrons = carrierPts([1.9, 2.6, 3.3, 4.0]).map(([x, y]) => dot(P(x, y), ROLE.output, 0.12))
  const V = (x: number) => (x < -DEPLETION_HALF ? 0 : x > DEPLETION_HALF ? 1 : 0.5 * (1 + Math.sin((Math.PI * x) / (2 * DEPLETION_HALF))))
  return {
    id: 'phys-pn-junction',
    title: 'The p-n junction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a p-n junction: holes and electrons diffuse across and cancel, leaving a depletion region of fixed ions with no free carriers, whose built-in field (n to p) and potential barrier stop further flow.',
    ariaLabel: 'A p-type region on the left full of holes and an n-type region on the right full of free electrons. In the middle, a depletion region contains no free carriers, only fixed negative ions on the p side and positive ions on the n side. A built-in electric field points from the n side to the p side. Below, the potential rises as a step across the depletion region: the barrier.',
    steps: [
      { narration: 'p-type silicon (majority holes, open circles) joined to n-type (majority electrons, dots).', objects: [...rect(-4.6, -1.6, 4.6, 1.6, ROLE.reference), line(P(0, -1.6), P(0, 1.6), ROLE.reference, 0.02), ...holes, ...electrons, label('p', P(-3.0, 2.1), ROLE.input, 'primary'), label('n', P(3.0, 2.1), ROLE.output, 'primary')] },
      { narration: 'Near the junction, electrons and holes diffuse across and cancel, leaving a depletion region with no free carriers — only fixed ions: negative on the p side, positive on the n side.', objects: [...rect(-DEPLETION_HALF, -1.6, DEPLETION_HALF, 1.6, ROLE.aid), label('depletion region', P(0, -2.1), ROLE.aid, 'detail'), ...[-1.0, 0.0, 1.0].map((y) => dot(P(-0.45, y), ROLE.input, 0.07)), ...[-1.0, 0.0, 1.0].map((y) => dot(P(0.45, y), ROLE.output, 0.07))] },
      { narration: 'Those ions set up a built-in field pointing from n to p, and a potential step — the barrier — that stops any further net flow.', objects: [arrow(P(0.6, 2.4), P(-0.6, 2.4), ROLE.result), label('built-in field', P(1.8, 2.8), ROLE.result, 'detail'), curve(fnPath((x) => -3.8 + 1.1 * V(x), -4.4, 4.4, 80), ROLE.result), label('barrier V₀', P(2.6, -3.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Diode rectification ──────────────────────────────────────────────────

/**
 * KG: "Forward bias narrows the depletion region and allows current to flow
 * readily, while reverse bias widens it and blocks current." Shockley diode
 * law I = I_s(e^(V/nV_T) − 1) with silicon-like I_s = 1e-14 A, nV_T = 0.026 V
 * (turn-on ≈ 0.65 V). MEASURED: the first draft's nV_T = 0.05 put the turn-on
 * at 1.04 V, beyond the plotted range, so the forward curve never rose.
 */
export function diodeCurrent(v: number): number { return 1e-14 * (Math.exp(v / 0.026) - 1) }
export function buildDiodeScene(): SceneSpec {
  const OX = -0.4, OY = -1.2, SV = 3.6, SI = 180 // SI: drawn units per ampere
  const x = (v: number) => OX + v * SV
  const y = (v: number) => OY + Math.min(diodeCurrent(v) * SI, 4.8)
  const vOn = (() => { let v = 0; while (diodeCurrent(v) < 0.001) v += 0.001; return r2(v) })()
  return {
    id: 'phys-diode',
    title: 'The diode: one-way current',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a diode\'s current–voltage curve: almost no current in reverse bias, and a sharply rising current once the forward voltage passes about 0.6–0.7 V — so it lets current through only one way (rectification).',
    ariaLabel: 'A graph of current against voltage for a silicon diode. For negative voltages the current is essentially zero. For positive voltages it stays near zero until about 0.6 volts, then rises very steeply.',
    steps: [
      { narration: 'Current through a diode against the voltage across it.', objects: [arrow(P(-4.4, OY), P(4.4, OY), ROLE.reference), arrow(P(OX, -2.4), P(OX, 4.0), ROLE.reference), label('voltage V', P(3.8, OY - 0.45), ROLE.ink, 'detail'), label('current I', P(OX + 0.9, 4.3), ROLE.ink, 'detail')] },
      { narration: 'Reverse bias (negative V): the depletion region widens and almost no current flows.', objects: [line(P(-4.2, OY - 0.05), P(OX, OY), ROLE.output, 0.06), label('reverse: blocks', P(-2.6, OY + 0.6), ROLE.output, 'primary')] },
      { narration: `Forward bias: the barrier shrinks, and above about ${vOn} V the current rises steeply (I = I_s(e^(V/nV_T) − 1)). One-way flow is what lets a diode turn AC into DC.`, objects: [curve(fnPath((v) => y((v - OX) / SV), OX, x(0.9), 160), ROLE.input), line(P(x(vOn), OY - 0.3), P(x(vOn), OY + 0.3), ROLE.result, 0.03), label(`≈ ${vOn} V`, P(x(vOn), OY - 0.7), ROLE.result, 'primary'), label('forward: conducts', P(x(0.9) - 1.3, 3.4), ROLE.input, 'primary')] },
    ],
  }
}

// ── 12. Nuclear shell model ──────────────────────────────────────────────────

/**
 * KG: "The nuclear shell model explains magic numbers and nuclear stability by
 * assigning nucleons to quantised energy shells." Levels with spin-orbit
 * splitting, each holding 2j + 1; the running total at the big gaps gives the
 * magic numbers 2, 8, 20, 28, 50.
 */
export const SHELL_LEVELS: Array<{ n: string; j2: number; gapAfter?: boolean }> = [
  { n: '1s½', j2: 1, gapAfter: true },
  { n: '1p3/2', j2: 3 }, { n: '1p½', j2: 1, gapAfter: true },
  { n: '1d5/2', j2: 5 }, { n: '2s½', j2: 1 }, { n: '1d3/2', j2: 3, gapAfter: true },
  { n: '1f7/2', j2: 7, gapAfter: true },
  { n: '2p3/2', j2: 3 }, { n: '1f5/2', j2: 5 }, { n: '2p½', j2: 1 }, { n: '1g9/2', j2: 9, gapAfter: true },
]
export function magicNumbers(): number[] {
  let total = 0
  const out: number[] = []
  for (const l of SHELL_LEVELS) { total += l.j2 + 1; if (l.gapAfter) out.push(total) }
  return out
}
export function buildShellModelScene(): SceneSpec {
  let yv = -3.8
  const lines: SceneObject[] = [], magic: SceneObject[] = []
  let total = 0
  for (const l of SHELL_LEVELS) {
    total += l.j2 + 1
    lines.push(line(P(-1.6, yv), P(1.6, yv), ROLE.output, 0.04))
    if (l.gapAfter) {
      magic.push(label(String(total), P(2.4, yv + 0.35), ROLE.result, 'primary'))
      yv += 1.05
    } else yv += 0.32
  }
  return {
    id: 'phys-nuclear-shell',
    title: 'The nuclear shell model',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show nucleon energy levels grouped into shells separated by large gaps: filling up to a gap gives the magic numbers 2, 8, 20, 28, 50 — especially stable nuclei.',
    ariaLabel: 'A ladder of nucleon energy levels. Levels bunch into groups separated by large gaps. The running number of nucleons at each gap is marked: 2, 8, 20, 28 and 50 — the magic numbers.',
    steps: [
      { narration: 'Protons and neutrons fill quantised energy levels in the nucleus, each holding a fixed number of nucleons (2j + 1).', objects: [arrow(P(-2.6, -4.2), P(-2.6, 4.2), ROLE.reference), label('energy', P(-3.3, 3.8), ROLE.ink, 'detail'), ...lines] },
      { narration: 'The levels bunch into shells separated by large energy gaps. Filling a shell exactly gives the magic numbers.', objects: magic },
      { narration: `Nuclei with a magic number of protons or neutrons — ${magicNumbers().join(', ')}, … — are unusually stable, like the noble gases among atoms.`, objects: [label('magic numbers: extra stable', P(-0.2, 4.4), ROLE.result, 'primary')] },
    ],
  }
}
