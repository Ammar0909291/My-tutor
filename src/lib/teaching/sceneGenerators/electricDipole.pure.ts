/**
 * Electric dipole in a field — the PURE half.
 *
 * Split out of `electricDipole.ts` (whose remaining half is the LLM parameter
 * extraction) for the same reason as every other generator in this family:
 * the client re-runs THIS builder when a learner moves a slider, and the LLM
 * half reaches the provider router, the AI budget and the rate limiter — a
 * server graph that has no business in a browser bundle.
 *
 * THE PHYSICS THIS FIGURE TEACHES (grounded in the authored Educational Brain
 * entry, educational-brain/concepts/physics/phys.em.electric-dipole.md, and
 * the existing authored probes for phys.em.electric-dipole in
 * authoredSeedAssets.ts — this generator draws what that content already
 * teaches, it does not invent new curriculum):
 *
 *   p = qd                     dipole moment, from -q to +q
 *   torque   τ = p × E = pE sinθ, independent of whether the field is
 *            uniform or not (only the AVERAGE field over the two charges
 *            enters the torque about the dipole's own centre)
 *   force    F = qE on each charge, equal and opposite (net ZERO) in a
 *            UNIFORM field; in a field that varies along the field axis,
 *            the two charges sit at slightly different field strengths and
 *            the forces no longer cancel — net force β p·(dE/dx)·cosθ
 *   energy   U = -p·E = -pE cosθ — minimised (STABLE) at θ = 0, maximised
 *            (UNSTABLE) at θ = 180°; both are the zero-torque angles, which
 *            is what the slider itself demonstrates when moved there
 *
 * No import beyond types and arithmetic helpers — the property the client
 * depends on; src/tests/sceneGeneratorPurity.test.ts enforces it.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, TIER } from './visualDesign'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type FieldKind = 'uniform' | 'non_uniform'

export interface DipoleParams {
  /** Magnitude of each charge, nC (nanocoulomb), > 0. */
  chargeMagnitude: number
  /** Separation between the two charges, cm, > 0. */
  separation: number
  /** Field magnitude at the dipole's centre, N/C, > 0. */
  fieldStrength: number
  /** Angle between the dipole moment p and the field E, degrees, 0-180. */
  angleDeg: number
  /** Whether the field varies along its own direction (the "what if?" case). */
  fieldType: FieldKind
}

const CHARGE_BOUND = 1000
const SEPARATION_BOUND = 500
const FIELD_BOUND = 100000
const VISUAL_MAX = 12

export function validateDipoleParams(raw: unknown): DipoleParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const chargeMagnitude = strictNumber(o.chargeMagnitude)
  const separation = strictNumber(o.separation)
  const fieldStrength = strictNumber(o.fieldStrength)
  const angleDeg = strictNumber(o.angleDeg)
  const fieldType = o.fieldType === 'non_uniform' ? 'non_uniform' : o.fieldType === 'uniform' ? 'uniform' : null

  if (!Number.isFinite(chargeMagnitude) || chargeMagnitude <= 0 || chargeMagnitude > CHARGE_BOUND) return null
  if (!Number.isFinite(separation) || separation <= 0 || separation > SEPARATION_BOUND) return null
  if (!Number.isFinite(fieldStrength) || fieldStrength <= 0 || fieldStrength > FIELD_BOUND) return null
  if (!Number.isFinite(angleDeg) || angleDeg < 0 || angleDeg > 180) return null
  if (!fieldType) return null

  return { chargeMagnitude, separation, fieldStrength, angleDeg, fieldType }
}

// ── formatting a very small (or very large) SI number ────────────────────────
// A real dipole moment / torque for lab-scale charges genuinely is on the
// order of 1e-10, which is why the authored probe itself quotes
// "p = 2.0 × 10⁻¹⁰ C·m" rather than a rounded decimal. Printing 0.0000000002
// would be honest but unreadable, so very small (or very large) magnitudes are
// rendered the way the curriculum itself renders them — scientific notation
// with a real superscript exponent — everything else as a plain decimal.
const SUPERSCRIPT: Record<string, string> = {
  '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
}
function toSuperscript(n: number): string {
  return String(n).split('').map((c) => SUPERSCRIPT[c] ?? c).join('')
}
export function formatSci(x: number, sig = 3): string {
  if (x === 0) return '0'
  const sign = x < 0 ? '-' : ''
  const abs = Math.abs(x)
  if (abs >= 0.01 && abs < 100000) return sign + String(round(abs, sig))
  let exp = Math.floor(Math.log10(abs))
  let mantissa = round(abs / 10 ** exp, sig - 1)
  if (mantissa >= 10) { mantissa = round(mantissa / 10, sig - 1); exp += 1 } // rounding carried a digit
  return `${sign}${mantissa} × 10${toSuperscript(exp)}`
}

// ── Deterministic geometry (never LLM-generated) ─────────────────────────────

/**
 * How much stronger the field is per metre along its own direction, in a
 * NON-UNIFORM field. Zero for a uniform one, by construction — so every
 * formula below is the SAME formula, evaluated at a gradient of zero, rather
 * than a second code path for the uniform case.
 */
const GRADIENT_PER_METRE = 10

const SEP_UNITS_PER_CM = 1.2
const FIELD_UNITS_PER_NPC = 0.55
const MIN_DRAWN = 2.2

function drawnLength(quantity: number, unitsPer: number): number {
  return Math.min(VISUAL_MAX, Math.max(MIN_DRAWN, quantity * unitsPer))
}

interface DipoleGeometry {
  /** Dipole moment, C·m. */
  p: number
  /** Torque magnitude, N·m — pE sinθ, independent of the field type. */
  torque: number
  /** Potential energy, J — -pE cosθ. */
  energy: number
  /** Net force magnitude, N — zero for a uniform field, by construction. */
  netForce: number
  fieldAtPlus: number
  fieldAtMinus: number
  chargePlus: Vec3
  chargeMinus: Vec3
  pFrom: Vec3
  pTo: Vec3
  forcePlusTip: Vec3
  forceMinusTip: Vec3
  drawnSep: number
}

function computeGeometry(p: DipoleParams): DipoleGeometry {
  const qSI = p.chargeMagnitude * 1e-9
  const realSep = p.separation / 100
  const realHalf = realSep / 2
  const dipoleMoment = qSI * realSep
  const angleRad = (p.angleDeg * Math.PI) / 180
  const dir: [number, number] = [Math.cos(angleRad), Math.sin(angleRad)]

  const gradient = p.fieldType === 'non_uniform' ? GRADIENT_PER_METRE : 0
  // Real x-position of each charge along the field's own axis (E is fixed
  // along the scene's x-axis; the dipole is tilted at angleDeg to it).
  const xPlusReal = realHalf * dir[0]
  const xMinusReal = -xPlusReal
  const fieldAtPlus = p.fieldStrength * (1 + gradient * xPlusReal)
  const fieldAtMinus = p.fieldStrength * (1 + gradient * xMinusReal)

  // Torque about the dipole's own centre depends only on the AVERAGE field —
  // the gradient term cancels between the two charges to first order, which
  // is exactly why τ = pE sinθ holds in both field types.
  //
  // sin(π) in floating point is ~1.2e-16, not exactly 0, so at θ = 180° (and
  // θ = 0°, where sin IS exactly 0) the raw product would print a nonsense
  // "~1e-25 N·m" instead of the true zero the equilibrium claim depends on.
  // Snapped only when sinθ itself is already numerically negligible — every
  // other angle is untouched.
  const sinTheta = Math.abs(Math.sin(angleRad)) < 1e-9 ? 0 : Math.sin(angleRad)
  const torque = dipoleMoment * p.fieldStrength * sinTheta
  const energy = -dipoleMoment * p.fieldStrength * Math.cos(angleRad)
  // Force on +q is along +E (its own local value); force on -q is along -E.
  // They cancel exactly when the two local fields are equal (uniform case,
  // gradient = 0, bit-identical fields, exactly zero). In a NON-uniform field
  // the two fields can still coincide numerically-but-not-exactly at θ = 90°
  // (cos 90° is ~6e-17 in floating point, not exactly 0), which would
  // otherwise print a nonsense "~1e-26 N" instead of the true zero the
  // "perpendicular to the gradient feels no net force" claim depends on.
  const rawNetForce = Math.abs(qSI * fieldAtPlus - qSI * fieldAtMinus)
  const netForce = rawNetForce < 1e-18 ? 0 : rawNetForce

  const drawnSep = drawnLength(p.separation, SEP_UNITS_PER_CM)
  const half = drawnSep / 2
  const chargePlus: Vec3 = [round(half * dir[0]), round(half * dir[1]), 0]
  const chargeMinus: Vec3 = [round(-half * dir[0]), round(-half * dir[1]), 0]

  // p is drawn parallel to, not on top of, the charge-separation line — the
  // same convention every textbook diagram uses so the vector is legible
  // against the two charges it is derived from.
  const perp: [number, number] = [-dir[1], dir[0]]
  const offset = Math.max(1.1, drawnSep * 0.18)
  const pFrom: Vec3 = [round(chargeMinus[0] + perp[0] * offset), round(chargeMinus[1] + perp[1] * offset), 0]
  const pTo: Vec3 = [round(chargePlus[0] + perp[0] * offset), round(chargePlus[1] + perp[1] * offset), 0]

  const forcePlusLen = drawnLength(fieldAtPlus, FIELD_UNITS_PER_NPC)
  const forceMinusLen = drawnLength(fieldAtMinus, FIELD_UNITS_PER_NPC)
  const forcePlusTip: Vec3 = [round(chargePlus[0] + forcePlusLen), chargePlus[1], 0]
  const forceMinusTip: Vec3 = [round(chargeMinus[0] - forceMinusLen), chargeMinus[1], 0]

  return {
    p: dipoleMoment, torque, energy, netForce, fieldAtPlus, fieldAtMinus,
    chargePlus, chargeMinus, pFrom, pTo, forcePlusTip, forceMinusTip, drawnSep,
  }
}

/** The rotational sense the torque produces — matches torqueDiagram's wording. */
function senseOf(torque: number): string {
  return torque > 1e-20 ? 'counter-clockwise' : torque < -1e-20 ? 'clockwise' : 'zero (no rotation)'
}

/** Which equilibrium (if either) the current angle is at or near. */
function equilibriumNote(angleDeg: number): string {
  if (angleDeg <= 10) return 'p is nearly aligned with E — close to the STABLE equilibrium (θ = 0°), where the potential energy is at its minimum.'
  if (angleDeg >= 170) return 'p is nearly anti-aligned with E — close to the UNSTABLE equilibrium (θ = 180°), where the potential energy is at its maximum.'
  return 'Neither equilibrium: the torque is non-zero, so the field is actively trying to rotate the dipole toward θ = 0°.'
}

function angleArc(radius: number, angleDeg: number): SceneObject | null {
  if (angleDeg < 8 || angleDeg > 172) return null
  const pts: Vec3[] = []
  const samples = 24
  for (let i = 0; i <= samples; i++) {
    const a = ((angleDeg * Math.PI) / 180) * (i / samples)
    pts.push([round(radius * Math.cos(a)), round(radius * Math.sin(a)), 0])
  }
  return { type: 'path', id: 'angleArc', points: pts, color: ROLE.reference, radius: 0.06 }
}

/** Build the 5-step electric-dipole SceneSpec: charges, p, field, forces, torque. */
export function buildDipoleScene(params: DipoleParams): SceneSpec {
  const geo = computeGeometry(params)
  const sense = senseOf(geo.torque)
  const pText = `p = qd ≈ ${formatSci(geo.p)} C·m`
  const torqueText = `τ = pE sin θ ≈ ${formatSci(geo.torque)} N·m, ${sense}`
  // Whether the net force is (numerically) zero, never the field TYPE alone —
  // a non-uniform field genuinely exerts zero net force on a dipole held
  // perpendicular to the gradient (θ = 90°), which is real physics, not an
  // approximation, and the figure must say so honestly rather than always
  // claiming "no longer cancel" whenever the field happens to be non-uniform.
  const netForceIsZero = geo.netForce === 0
  const netForceText = netForceIsZero
    ? 'Net force = 0 — the two forces are equal and opposite'
    : `Net force ≈ ${formatSci(geo.netForce)} N — the two forces no longer cancel`
  const arc = angleArc(Math.max(1.8, geo.drawnSep * 0.4), params.angleDeg)

  // Three sampled points of the field, left to right, so a non-uniform field
  // is SEEN to grow (or a uniform one seen to stay the same) rather than
  // merely stated. The row sits clear above the dipole geometry.
  const fieldRowY = round(geo.drawnSep * 0.65 + 3.2)
  const halfWidth = Math.max(4, geo.drawnSep * 1.3)
  const fieldSampleXs = [-halfWidth, 0, halfWidth]
  const gradient = params.fieldType === 'non_uniform' ? GRADIENT_PER_METRE : 0
  const sepScale = geo.drawnSep / (params.separation / 100)
  const fieldArrows: SceneObject[] = fieldSampleXs.map((sceneX, i) => {
    const realX = sceneX / sepScale
    const localField = params.fieldStrength * (1 + gradient * realX)
    const len = drawnLength(localField, FIELD_UNITS_PER_NPC)
    return {
      type: 'vector', id: `fieldArrow${i}`, from: [round(sceneX), fieldRowY, 0],
      to: [round(sceneX + len), fieldRowY, 0], color: ROLE.reference, thickness: 0.09,
    }
  })

  return {
    id: `dipole-${params.chargeMagnitude}-${params.separation}-${params.fieldStrength}-${params.angleDeg}-${params.fieldType}`,
    title: `Electric dipole: q = ${params.chargeMagnitude} nC, d = ${params.separation} cm, E = ${params.fieldStrength} N/C, θ = ${params.angleDeg}°`,
    sceneType: 'diagram',
    teachingGoal: 'Show how a dipole moment p = qd interacts with an electric field E: the torque τ = pE sinθ that tries to align them, the (zero, in a uniform field) net force, and the stable/unstable equilibria at θ = 0° and 180°.',
    cameraDistance: VISUAL_MAX * 3.4,
    ariaLabel: `Two charges of ${params.chargeMagnitude} nanocoulombs, ${params.separation} centimeters apart, forming a dipole at ${params.angleDeg} degrees to a ${params.fieldStrength} newtons per coulomb ${params.fieldType === 'uniform' ? 'uniform' : 'non-uniform'} electric field, producing a torque of ${formatSci(geo.torque)} newton-meters, ${sense}.`,
    stage: { grid: true, axes: true },
    parametric: {
      kind: 'electric_dipole',
      params: {
        chargeMagnitude: params.chargeMagnitude, separation: params.separation,
        fieldStrength: params.fieldStrength, angleDeg: params.angleDeg, fieldType: params.fieldType,
      },
    },
    explainer: {
      result: { expression: 'τ = pE sin θ', value: `${formatSci(geo.torque)} N·m` },
      panels: [
        {
          heading: 'Where p comes from',
          body: `Two charges of magnitude q = ${params.chargeMagnitude} nC sit d = ${params.separation} cm apart. Their dipole moment p = qd ≈ ${formatSci(geo.p)} C·m points from the negative charge to the positive one — a small number because real charge separations are tiny, exactly like the curriculum's own worked example.`,
        },
        {
          heading: 'Torque',
          lines: [
            'τ = p E sin θ',
            `= ${formatSci(geo.p)} × ${params.fieldStrength} × sin(${params.angleDeg}°)`,
            `≈ ${formatSci(geo.torque)} N·m`,
          ],
          emphasis: `≈ ${formatSci(geo.torque)} N·m`,
        },
        {
          heading: 'Net force',
          body: params.fieldType === 'uniform'
            ? `In this UNIFORM field the force on +q (qE) and on −q (also qE, opposite direction) are equal and opposite, so they cancel exactly — the net force is zero even though there is a torque.`
            : `This field is stronger on one side than the other, so the force on +q and the force on −q no longer match — net force ≈ ${formatSci(geo.netForce)} N, pulling the dipole toward the stronger region.`,
        },
        {
          heading: 'Equilibrium',
          body: `U = −pE cos θ ≈ ${formatSci(geo.energy)} J at this angle. ${equilibriumNote(params.angleDeg)}`,
        },
      ],
      insight: {
        heading: 'Key insight',
        bullets: [
          'Torque depends on p, E, and sin θ — it is zero when p is parallel OR anti-parallel to E',
          'A uniform field can turn a dipole but can never push it — only a field that varies with position can do that',
          'θ = 0° (aligned) is stable; θ = 180° (anti-aligned) is unstable — both are the two angles where the torque is zero',
        ],
        note: 'Slide θ to 0° or 180° and watch the torque arrow shrink to nothing at both — the figure IS the proof, not just the label.',
      },
    },
    steps: [
      {
        intent: 'establish',
        narration: `Two charges of equal magnitude, +q and −q, sit ${params.separation} cm apart.`,
        objects: [
          { type: 'node', id: 'chargeMinus', position: geo.chargeMinus, color: ROLE.aid, radius: 0.42 },
          { type: 'label', id: 'chargeMinusLabel', position: [round(geo.chargeMinus[0]), round(geo.chargeMinus[1] - 1.1), 0], text: '−q', color: ROLE.aid, size: TIER.primary },
          { type: 'node', id: 'chargePlus', position: geo.chargePlus, color: ROLE.input, radius: 0.42 },
          { type: 'label', id: 'chargePlusLabel', position: [round(geo.chargePlus[0]), round(geo.chargePlus[1] + 1.1), 0], text: '+q', color: ROLE.input, size: TIER.primary },
          { type: 'bond', id: 'separationBond', from: geo.chargeMinus, to: geo.chargePlus, color: ROLE.reference, thickness: 0.05 },
          { type: 'label', id: 'separationLabel', position: [round((geo.chargeMinus[0] + geo.chargePlus[0]) / 2), round((geo.chargeMinus[1] + geo.chargePlus[1]) / 2 - 1.6), 0], text: `d = ${params.separation} cm`, color: ROLE.ink, size: TIER.detail },
        ],
      },
      {
        intent: 'relate',
        focus: ['chargePlus', 'chargeMinus', 'pVector'],
        narration: `The dipole moment p = qd ≈ ${formatSci(geo.p)} C·m points from −q to +q.`,
        objects: [
          { type: 'vector', id: 'pVector', from: geo.pFrom, to: geo.pTo, color: ROLE.output, thickness: 0.14 },
          { type: 'label', id: 'pLabel', position: [round((geo.pFrom[0] + geo.pTo[0]) / 2), round((geo.pFrom[1] + geo.pTo[1]) / 2 + 1.3), 0], text: pText, color: ROLE.output, size: TIER.primary },
        ],
      },
      {
        intent: 'establish',
        narration: params.fieldType === 'uniform'
          ? `A UNIFORM electric field E = ${params.fieldStrength} N/C points to the right — the same strength everywhere.`
          : `A NON-UNIFORM field grows stronger from left to right, averaging E = ${params.fieldStrength} N/C at the dipole's centre.`,
        objects: [
          ...fieldArrows,
          { type: 'label', id: 'fieldLabel', position: [0, round(fieldRowY + 1.3), 0], text: `E ${params.fieldType === 'uniform' ? '(uniform)' : '(stronger to the right)'}`, color: ROLE.ink, size: TIER.detail },
        ],
      },
      {
        intent: 'relate',
        focus: ['forcePlus', 'forceMinus', 'netForceLabel'],
        narration: netForceIsZero
          ? 'Every charge feels a force qE. The forces on +q and −q are equal and opposite — they cancel, so the NET FORCE is zero.'
          : 'Because the field is stronger on one side, the two forces no longer match — a net force appears, in addition to the torque.',
        objects: [
          { type: 'vector', id: 'forcePlus', from: geo.chargePlus, to: geo.forcePlusTip, color: ROLE.input, thickness: 0.1 },
          { type: 'label', id: 'forcePlusLabel', position: [round(geo.forcePlusTip[0] + 1), round(geo.forcePlusTip[1]), 0], text: `F₊ ≈ ${formatSci(params.chargeMagnitude * 1e-9 * geo.fieldAtPlus)} N`, color: ROLE.input, size: TIER.detail },
          { type: 'vector', id: 'forceMinus', from: geo.chargeMinus, to: geo.forceMinusTip, color: ROLE.aid, thickness: 0.1 },
          { type: 'label', id: 'forceMinusLabel', position: [round(geo.forceMinusTip[0] - 1), round(geo.forceMinusTip[1]), 0], text: `F₋ ≈ ${formatSci(params.chargeMagnitude * 1e-9 * geo.fieldAtMinus)} N`, color: ROLE.aid, size: TIER.detail },
          { type: 'label', id: 'netForceLabel', position: [0, round(geo.chargeMinus[1] - 2.6), 0], text: netForceText, color: ROLE.result, size: TIER.detail },
        ],
      },
      {
        intent: 'resolve',
        focus: ['pVector', 'fieldArrow1', 'angleArc', 'torqueLabel'],
        narration: `The field exerts a torque τ = pE sin θ = ${formatSci(geo.torque)} N·m on the dipole, ${sense}, trying to rotate p to line up with E.`,
        predict: {
          question: 'Will the torque rotate the dipole clockwise, counter-clockwise, or not at all?',
          options: ['Clockwise', 'Counter-clockwise', 'No torque'],
          answerIndex: geo.torque > 1e-20 ? 1 : geo.torque < -1e-20 ? 0 : 2,
        },
        objects: [
          ...(arc ? [arc] : []),
          { type: 'label', id: 'angleLabel', position: [round(Math.max(1.8, geo.drawnSep * 0.4) + 1.2), 0.6, 0], text: `θ = ${params.angleDeg}°`, color: ROLE.ink, size: TIER.detail },
          { type: 'label', id: 'torqueLabel', position: [0, round(geo.chargeMinus[1] - 4.0), 0], text: torqueText, color: ROLE.result, size: TIER.primary },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkDipoleConsistency(spec: SceneSpec, params: DipoleParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  const chargePlus = objs.find((o) => o.id === 'chargePlus')?.position
  const chargeMinus = objs.find((o) => o.id === 'chargeMinus')?.position
  const pVector = objs.find((o) => o.id === 'pVector')
  const torqueLabel = objs.find((o) => o.id === 'torqueLabel')
  const netForceLabel = objs.find((o) => o.id === 'netForceLabel')
  if (!chargePlus || !chargeMinus || !pVector?.from || !pVector?.to || !torqueLabel || !netForceLabel) {
    return { ok: false, errors: ['missing one or more of chargePlus/chargeMinus/pVector/torqueLabel/netForceLabel'] }
  }

  const geo = computeGeometry(params)
  const tol = Math.max(0.05, geo.drawnSep * 0.02)

  if (Math.abs(chargePlus[0] - geo.chargePlus[0]) > tol || Math.abs(chargePlus[1] - geo.chargePlus[1]) > tol) {
    errors.push(`+q position (${chargePlus[0]}, ${chargePlus[1]}) does not match re-derived (${geo.chargePlus[0]}, ${geo.chargePlus[1]})`)
  }
  if (Math.abs(chargeMinus[0] - geo.chargeMinus[0]) > tol || Math.abs(chargeMinus[1] - geo.chargeMinus[1]) > tol) {
    errors.push(`-q position (${chargeMinus[0]}, ${chargeMinus[1]}) does not match re-derived (${geo.chargeMinus[0]}, ${geo.chargeMinus[1]})`)
  }

  // p must be drawn PARALLEL to the charge separation, and the same length.
  const chargeVec = [chargePlus[0] - chargeMinus[0], chargePlus[1] - chargeMinus[1]]
  const pVec = [pVector.to[0] - pVector.from[0], pVector.to[1] - pVector.from[1]]
  const chargeLen = Math.hypot(...chargeVec)
  const pLen = Math.hypot(...pVec)
  if (Math.abs(chargeLen - pLen) > tol) errors.push(`p vector length (${pLen}) does not match the charge separation (${chargeLen})`)
  const cosBetween = (chargeVec[0] * pVec[0] + chargeVec[1] * pVec[1]) / (chargeLen * pLen)
  if (cosBetween < 0.999) errors.push(`p vector is not parallel to the charge separation (cos = ${cosBetween})`)

  const expectedTorqueText = `τ = pE sin θ ≈ ${formatSci(geo.torque)} N·m, ${senseOf(geo.torque)}`
  if (torqueLabel.text !== expectedTorqueText) {
    errors.push(`torque label "${torqueLabel.text}" does not match re-derived "${expectedTorqueText}"`)
  }

  const expectedNetForceText = geo.netForce === 0
    ? 'Net force = 0 — the two forces are equal and opposite'
    : `Net force ≈ ${formatSci(geo.netForce)} N — the two forces no longer cancel`
  if (netForceLabel.text !== expectedNetForceText) {
    errors.push(`net force label "${netForceLabel.text}" does not match re-derived "${expectedNetForceText}"`)
  }

  // Uniform field must produce EXACTLY zero net force — not merely small.
  if (params.fieldType === 'uniform' && geo.netForce !== 0) {
    errors.push(`uniform field produced a non-zero net force (${geo.netForce})`)
  }

  return { ok: errors.length === 0, errors }
}
