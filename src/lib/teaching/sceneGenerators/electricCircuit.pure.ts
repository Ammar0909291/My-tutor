/**
 * electricCircuit — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type ComponentType = 'resistor' | 'battery' | 'capacitor'
export type Connection = 'series' | 'parallel'

export interface CircuitComponent {
  type: ComponentType
  value: number
  unit: string
}

export interface CircuitParams {
  components: CircuitComponent[]
  connection: Connection
  voltage: number
}

const MAX_COMPONENTS = 6
const MAX_UNIT_LEN = 10
const VALUE_BOUND = 10000
const VOLTAGE_BOUND = 1000

function isValidComponent(raw: unknown): raw is CircuitComponent {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  if (o.type !== 'resistor' && o.type !== 'battery' && o.type !== 'capacitor') return false
  const value = strictNumber(o.value)
  if (!Number.isFinite(value) || value <= 0 || value > VALUE_BOUND) return false
  if (typeof o.unit !== 'string' || !o.unit.trim() || o.unit.length > MAX_UNIT_LEN) return false
  return true
}

export function validateCircuitParams(raw: unknown): CircuitParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (!Array.isArray(o.components) || o.components.length === 0 || o.components.length > MAX_COMPONENTS) return null
  if (!o.components.every(isValidComponent)) return null
  const components = o.components.map((c: CircuitComponent) => ({ type: c.type, value: strictNumber(c.value), unit: c.unit.trim() }))

  if (o.connection !== 'series' && o.connection !== 'parallel') return null

  const voltage = strictNumber(o.voltage)
  if (!Number.isFinite(voltage) || voltage <= 0 || voltage > VOLTAGE_BOUND) return null

  // Need at least one resistor — there's nothing to compute Ohm's law against otherwise.
  if (!components.some((c) => c.type === 'resistor')) return null

  return { components, connection: o.connection, voltage }
}

// ── Deterministic Ohm's-law computation (pure leaf functions; never LLM-generated) ─

function resistorValues(params: CircuitParams): number[] {
  return params.components.filter((c) => c.type === 'resistor').map((c) => c.value)
}

/** Series: R_total = sum(Ri). Parallel: 1/R_total = sum(1/Ri). */
function totalResistance(resistors: number[], connection: Connection): number {
  return connection === 'series'
    ? resistors.reduce((a, b) => a + b, 0)
    : 1 / resistors.reduce((a, r) => a + 1 / r, 0)
}

interface BranchResult {
  current: number
  voltageDrop: number
}

/** Series: same current through every resistor, voltage drop = I*Ri. Parallel: same voltage across every branch, current = V/Ri. */
function branchResults(params: CircuitParams, resistors: number[], rTotal: number): BranchResult[] {
  const iTotal = params.voltage / rTotal
  return resistors.map((r) =>
    params.connection === 'series' ? { current: iTotal, voltageDrop: iTotal * r } : { current: params.voltage / r, voltageDrop: params.voltage },
  )
}

/**
 * SCHEMATIC LAYOUT — why this is not a ring.
 *
 * This generator laid the battery and every resistor on a REGULAR POLYGON of
 * identical spheres: two resistors produced an equilateral triangle of dots
 * joined by three straight wires. Measured consequences, all of them reported
 * from a real lesson:
 *
 *   · a triangle of floating nodes does not read as a circuit at all;
 *   · SERIES AND PARALLEL PRODUCED THE IDENTICAL GEOMETRY — the one thing the
 *     figure exists to teach was the one thing it could not express;
 *   · labels were pushed radially outward at two radii, so a resistor's value
 *     and its voltage drop crowded together in the same corner (the reported
 *     "R2 = 20 Ω overlapping V2 = 8 V");
 *   · the totals label sat at the bottom of the same ring, in that crowd.
 *
 * The replacement is the representation every learner has already seen: a
 * rectangular loop, battery on the left rail, components on the horizontal
 * rails. Series puts the resistors in ONE path, so the shared current is
 * visible as a single line through both; parallel puts each on its own branch
 * between two rails, so the split is visible as a fork. Reading the topology
 * off the picture is now possible because the picture has a topology.
 *
 * Label slots are fixed, per component, on opposite sides of the rail it sits
 * on. Two labels of one component can therefore never coincide, and no label
 * is placed by pushing it away from a centre.
 */
const HALF_W = 9
const HALF_H = 5

/** Where each resistor sits along its rail, evenly spaced and never on a corner. */
function resistorSlots(n: number): number[] {
  return Array.from({ length: n }, (_, i) => round(-HALF_W + ((i + 1) * (2 * HALF_W)) / (n + 1)))
}

/** The battery's position — the left rail's midpoint, in both connections. */
const BATTERY_POS: Vec3 = [-HALF_W, 0, 0]

/**
 * The wire path.
 *
 * SERIES  one closed loop that passes THROUGH every resistor in turn: up the
 *         left rail, across the top through each component, down the right
 *         rail, back along the bottom. One path, so one current.
 * PARALLEL a top rail and a bottom rail joined by one vertical branch per
 *         resistor. Two junctions, so the current divides.
 */
function wireSegments(connection: 'series' | 'parallel', xs: number[]): { from: Vec3; to: Vec3 }[] {
  if (connection === 'series') {
    const path: Vec3[] = [
      BATTERY_POS, [-HALF_W, HALF_H, 0],
      ...xs.map((x) => [x, HALF_H, 0] as Vec3),
      [HALF_W, HALF_H, 0], [HALF_W, -HALF_H, 0], [-HALF_W, -HALF_H, 0], BATTERY_POS,
    ]
    return path.slice(0, -1).map((from, i) => ({ from, to: path[i + 1] }))
  }
  const right = Math.max(HALF_W, ...xs)
  return [
    { from: BATTERY_POS, to: [-HALF_W, HALF_H, 0] },
    { from: [-HALF_W, HALF_H, 0], to: [right, HALF_H, 0] },
    { from: BATTERY_POS, to: [-HALF_W, -HALF_H, 0] },
    { from: [-HALF_W, -HALF_H, 0], to: [right, -HALF_H, 0] },
    ...xs.map((x) => ({ from: [x, HALF_H, 0] as Vec3, to: [x, -HALF_H, 0] as Vec3 })),
  ]
}

/** Where a resistor's body sits: on the top rail in series, mid-branch in parallel. */
function resistorPos(connection: 'series' | 'parallel', x: number): Vec3 {
  return connection === 'series' ? [x, HALF_H, 0] : [x, 0, 0]
}

/**
 * The two label slots for a component, chosen so they sit on OPPOSITE sides of
 * the thing they name and can never collide with each other. `value` is the
 * identifying label (R1 = 10 Ω), `branch` the quantity it carries.
 */
function labelSlots(connection: 'series' | 'parallel', x: number): { value: Vec3; branch: Vec3 } {
  return connection === 'series'
    // On the top rail: value above the wire, drop below it, inside the loop.
    ? { value: [x, HALF_H + 1.7, 0], branch: [x, HALF_H - 1.9, 0] }
    // On a vertical branch: value above the body, current below it.
    : { value: [x, 1.8, 0], branch: [x, -1.9, 0] }
}

/** Build a circuit-loop SceneSpec: battery + resistors laid in a loop with connecting wires in step 1, per-resistor current/voltage-drop and totals in step 2. */
export function buildCircuitScene(params: CircuitParams): SceneSpec {
  const resistors = resistorValues(params)
  const rTotal = totalResistance(resistors, params.connection)
  const iTotal = params.voltage / rTotal
  const branches = branchResults(params, resistors, rTotal)

  const xs = resistorSlots(resistors.length)
  const batteryPos = BATTERY_POS

  const battery: SceneObject = {
    type: 'node',
    id: 'battery',
    position: batteryPos,
    color: '#ef4444',
    radius: 0.6,
    properties: { voltage: round(params.voltage, 6) },
  }
  const resistorNodes: SceneObject[] = resistors.map((r, i) => ({
    type: 'node',
    id: `resistor-${i}`,
    position: resistorPos(params.connection, xs[i]),
    color: '#3b82f6',
    radius: 0.5,
    properties: { value: round(r, 6), current: round(branches[i].current, 6), voltageDrop: round(branches[i].voltageDrop, 6) },
  }))
  const wires: SceneObject[] = wireSegments(params.connection, xs).map((seg, i) => ({
    type: 'bond',
    id: `wire-${i}`,
    from: seg.from,
    to: seg.to,
  }))

  // ── THE COMPONENTS MUST SAY WHAT THEY ARE ─────────────────────────────────
  //
  // Every per-component number below was already computed and already
  // VALIDATED (the checker further down re-derives each branch and even
  // asserts KCL) — it was just never drawn. A `node` renders as a plain
  // coloured sphere: position, radius, colour. `properties` reach no one.
  //
  // Measured in a real production lesson on phys.em.kirchhoffs-laws: a
  // parallel circuit of a 10 Ω and a 20 Ω branch reached the learner as two
  // IDENTICAL blue dots with a single "R_total = 6.67 Ω, I_total = 1.8 A"
  // caption. The tutor was then asked to explain why the current splits — off
  // a picture in which the two branches are indistinguishable — and it
  // invented "a larger resistance value like ten ohms", which is backwards.
  // Nothing on screen could have corrected it, because the values were not on
  // screen. `fromScene` reads LABELS, so the tutor was blind to them too.
  //
  // A `label` is drawn (PlacedLabels solves their positions together) AND is
  // read into the semantics the tutor is given, so labelling here fixes both
  // audiences at once — no renderer change, no new prompt channel.
  const componentLabels: SceneObject[] = [
    {
      type: 'label',
      id: 'battery-label',
      position: [batteryPos[0] - 2.4, batteryPos[1], 0],
      text: `${round(params.voltage, 2)} V`,
      color: '#ef4444',
      properties: { voltage: round(params.voltage, 6) },
    },
    ...resistors.map((r, i) => ({
      type: 'label' as const,
      id: `resistor-${i}-label`,
      position: labelSlots(params.connection, xs[i]).value,
      text: `R${i + 1} = ${round(r, 2)} Ω`,
      color: '#3b82f6',
      properties: { value: round(r, 6) },
    })),
  ]

  // Step 2 adds what each branch CARRIES. Kept separate from the value labels
  // above so the stepped walkthrough still builds up — the circuit first, the
  // currents it produces second — which is the order the narration teaches in.
  // LABEL THE QUANTITY THAT VARIES. In parallel every branch sees the same 12 V
  // and the CURRENTS differ, so the currents are what the split is about; in
  // series the same current flows through every resistor and the VOLTAGE DROPS
  // differ, so labelling identical currents would teach nothing and hide the
  // one quantity KVL is about. Both numbers are already computed and validated
  // either way — this only chooses which one the learner reads off the figure.
  const branchLabels: SceneObject[] = resistors.map((r, i) => ({
    type: 'label' as const,
    id: `resistor-${i}-${params.connection === 'series' ? 'drop' : 'current'}`,
    position: labelSlots(params.connection, xs[i]).branch,
    text: params.connection === 'series'
      ? `V${i + 1} = ${round(branches[i].voltageDrop, 2)} V`
      : `I${i + 1} = ${round(branches[i].current, 2)} A`,
    color: '#22c55e',
    properties: { current: round(branches[i].current, 6), voltageDrop: round(branches[i].voltageDrop, 6) },
  }))

  const steps: SceneStep[] = [
    {
      narration: `A ${params.connection} circuit with ${resistors.length} resistor${resistors.length === 1 ? '' : 's'} powered by a ${round(params.voltage, 2)} V source.`,
      objects: [battery, ...resistorNodes, ...wires, ...componentLabels],
    },
    {
      narration: params.connection === 'series'
        ? `Total resistance is ${round(rTotal, 2)} Ω, giving a current of ${round(iTotal, 2)} A through every resistor.`
        : `Total resistance is ${round(rTotal, 2)} Ω, giving a total current of ${round(iTotal, 2)} A split across the branches.`,
      objects: [
        ...branchLabels,
        { type: 'label', id: 'total-label', position: [0, -HALF_H - 2.2, 0], text: `R_total = ${round(rTotal, 2)} Ω, I_total = ${round(iTotal, 2)} A`, color: '#22c55e', properties: { rTotal: round(rTotal, 6), iTotal: round(iTotal, 6), connection: params.connection } },
      ],
    },
  ]

  return {
    id: `circuit-${params.connection}-${params.voltage}-${resistors.length}`,
    title: `${params.connection === 'series' ? 'Series' : 'Parallel'} circuit — R_total = ${round(rTotal, 2)} Ω`,
    sceneType: 'diagram',
    teachingGoal: "Show how series and parallel resistor networks combine, and verify Ohm's law and Kirchhoff's laws at each component.",
    cameraDistance: HALF_W * 2.9,
    ariaLabel: `A ${params.connection} circuit with ${resistors.length} resistors and a ${round(params.voltage, 1)} V battery.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkCircuitConsistency(spec: SceneSpec, params: CircuitParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const battery = objs.find((o) => o.id === 'battery')
  const totalLabel = objs.find((o) => o.id === 'total-label')
  if (!battery || !totalLabel) return { ok: false, errors: ['missing battery or total-label object'] }

  // Independently re-derive total resistance, total current, and every branch's current/voltage-drop.
  const resistors = resistorValues(params)
  const rTotal = totalResistance(resistors, params.connection)
  const iTotal = params.voltage / rTotal
  const branches = branchResults(params, resistors, rTotal)
  const tol = 1e-3

  const totalProps = totalLabel.properties as { rTotal?: number; iTotal?: number } | undefined
  if (!totalProps || Math.abs(totalProps.rTotal! - rTotal) > tol) {
    errors.push(`total-label rTotal=${totalProps?.rTotal} does not match re-derived ${round(rTotal, 6)}`)
  }
  if (!totalProps || Math.abs(totalProps.iTotal! - iTotal) > tol) {
    errors.push(`total-label iTotal=${totalProps?.iTotal} does not match re-derived ${round(iTotal, 6)}`)
  }

  for (let i = 0; i < resistors.length; i++) {
    const node = objs.find((o) => o.id === `resistor-${i}`)
    if (!node || !node.properties) {
      errors.push(`missing resistor-${i}`)
      continue
    }
    const props = node.properties as { value?: number; current?: number; voltageDrop?: number }
    if (Math.abs((props.value ?? NaN) - resistors[i]) > tol) {
      errors.push(`resistor-${i} value=${props.value} does not match params ${resistors[i]}`)
    }
    if (Math.abs((props.current ?? NaN) - branches[i].current) > tol) {
      errors.push(`resistor-${i} current=${props.current} does not match re-derived ${round(branches[i].current, 6)}`)
    }
    if (Math.abs((props.voltageDrop ?? NaN) - branches[i].voltageDrop) > tol) {
      errors.push(`resistor-${i} voltageDrop=${props.voltageDrop} does not match re-derived ${round(branches[i].voltageDrop, 6)}`)
    }
  }

  if (params.connection === 'series') {
    // Kirchhoff's voltage law: the sum of voltage drops around the loop equals the source voltage.
    const sumDrops = branches.reduce((a, b) => a + b.voltageDrop, 0)
    if (Math.abs(sumDrops - params.voltage) > tol) {
      errors.push(`KVL violated: sum of voltage drops ${round(sumDrops, 6)} does not equal source voltage ${params.voltage}`)
    }
  } else {
    // Kirchhoff's current law: the sum of branch currents equals the total current drawn from the source.
    const sumCurrents = branches.reduce((a, b) => a + b.current, 0)
    if (Math.abs(sumCurrents - iTotal) > tol) {
      errors.push(`KCL violated: sum of branch currents ${round(sumCurrents, 6)} does not equal total current ${round(iTotal, 6)}`)
    }
  }

  return { ok: errors.length === 0, errors }
}

