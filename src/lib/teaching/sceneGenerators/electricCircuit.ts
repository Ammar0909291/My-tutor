/**
 * Electric circuit scene generator (15th parametric generator).
 *
 * Series or parallel resistor networks: computes total resistance, total
 * current, and per-resistor current/voltage-drop via Ohm's law, then lays
 * the components out evenly spaced around a loop (battery + resistors).
 * Same architecture as the other generators: extractCircuitParams (LLM,
 * isolated) → validateCircuitParams (pure) → buildCircuitScene (pure,
 * deterministic Ohm's-law computation + loop layout) → checkCircuitConsistency
 * (pure, independent re-derivation safety net verifying KVL/KCL).
 *
 * Distinct from the existing 'circuit_diagram' VisualType (school visuals
 * detector): that path is the free-form/legacy visual pipeline; this module
 * is the deterministic SceneSpec parametric generator, gated behind
 * ENABLE_PARAMETRIC_SCENE_GENERATION like the other 14 generators here.
 */

import { generateJSON } from '@/lib/ai/client'
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
const RADIUS = 8

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

/** Evenly spaced positions for `n` nodes on a circle of radius RADIUS, starting at angle 0. */
function loopPositions(n: number): Vec3[] {
  return Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n
    return [round(RADIUS * Math.cos(angle)), round(RADIUS * Math.sin(angle)), 0] as Vec3
  })
}

/** Build a circuit-loop SceneSpec: battery + resistors laid in a loop with connecting wires in step 1, per-resistor current/voltage-drop and totals in step 2. */
export function buildCircuitScene(params: CircuitParams): SceneSpec {
  const resistors = resistorValues(params)
  const rTotal = totalResistance(resistors, params.connection)
  const iTotal = params.voltage / rTotal
  const branches = branchResults(params, resistors, rTotal)

  const positions = loopPositions(1 + resistors.length)
  const batteryPos = positions[0]

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
    position: positions[i + 1],
    color: '#3b82f6',
    radius: 0.5,
    properties: { value: round(r, 6), current: round(branches[i].current, 6), voltageDrop: round(branches[i].voltageDrop, 6) },
  }))
  const wires: SceneObject[] = positions.map((p, i) => ({
    type: 'bond',
    id: `wire-${i}`,
    from: p,
    to: positions[(i + 1) % positions.length],
  }))

  const steps: SceneStep[] = [
    {
      narration: `A ${params.connection} circuit with ${resistors.length} resistor${resistors.length === 1 ? '' : 's'} powered by a ${round(params.voltage, 2)} V source.`,
      objects: [battery, ...resistorNodes, ...wires],
    },
    {
      narration: params.connection === 'series'
        ? `Total resistance is ${round(rTotal, 2)} Ω, giving a current of ${round(iTotal, 2)} A through every resistor.`
        : `Total resistance is ${round(rTotal, 2)} Ω, giving a total current of ${round(iTotal, 2)} A split across the branches.`,
      objects: [
        { type: 'label', id: 'total-label', position: [0, -RADIUS - 2, 0], text: `R_total = ${round(rTotal, 2)} Ω, I_total = ${round(iTotal, 2)} A`, color: '#22c55e', properties: { rTotal: round(rTotal, 6), iTotal: round(iTotal, 6), connection: params.connection } },
      ],
    },
  ]

  return {
    id: `circuit-${params.connection}-${params.voltage}-${resistors.length}`,
    title: `${params.connection === 'series' ? 'Series' : 'Parallel'} circuit — R_total = ${round(rTotal, 2)} Ω`,
    sceneType: 'diagram',
    teachingGoal: "Show how series and parallel resistor networks combine, and verify Ohm's law and Kirchhoff's laws at each component.",
    cameraDistance: RADIUS * 3,
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

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the circuit being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCircuit": true|false, "components": [{"type": "resistor"|"battery"|"capacitor", "value": <number>, "unit": "<string>"}], "connection": "series"|"parallel", "voltage": <positive number>}
- isCircuit is false if the text is not about a resistor circuit and its current/voltage.
- components must include at least one resistor; use the values actually stated in the text.
- voltage is the source/battery voltage.
- Do not invent component values not stated in the text.`
}

/**
 * Extract validated circuit parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCircuitParams(text: string): Promise<CircuitParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 300).catch(() => null)
  if (!raw || raw.isCircuit !== true) return null
  return validateCircuitParams(raw)
}
