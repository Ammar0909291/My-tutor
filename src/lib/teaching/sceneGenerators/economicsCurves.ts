/**
 * Economics supply/demand curve scene generator (12th parametric generator).
 *
 * Linear supply (upward-sloping, fixed unit slope) and demand (downward-
 * sloping, fixed unit slope) lines anchored through the given equilibrium
 * point, with an optional shift of one or both curves to a new equilibrium.
 * Same architecture as the other generators: extractEconomicsParams (LLM,
 * isolated) → validateEconomicsParams (pure) → buildEconomicsCurveScene
 * (pure, deterministic layout) → checkEconomicsConsistency (pure,
 * independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type CurveType = 'supply' | 'demand' | 'both'
export type ShiftDirection = 'left' | 'right' | 'none'

export interface EconomicsParams {
  curveType: CurveType
  shiftDirection: ShiftDirection
  equilibriumPrice: number
  equilibriumQuantity: number
}

/** Fixed unit slope for both lines (|dP/dQ| = 1) — keeps the geometry simple and the
 *  consistency check's re-derivation unambiguous; only the intercepts vary. */
const SLOPE = 1
/** How far a shift moves a curve's intercept (price units). */
const SHIFT_AMOUNT = 5
const EQUILIBRIUM_BOUND = 1000

export function validateEconomicsParams(raw: unknown): EconomicsParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const curveType = o.curveType
  if (curveType !== 'supply' && curveType !== 'demand' && curveType !== 'both') return null
  const shiftDirection = o.shiftDirection
  if (shiftDirection !== 'left' && shiftDirection !== 'right' && shiftDirection !== 'none') return null
  const equilibriumPrice = strictNumber(o.equilibriumPrice)
  const equilibriumQuantity = strictNumber(o.equilibriumQuantity)
  if (!Number.isFinite(equilibriumPrice) || equilibriumPrice <= 0 || equilibriumPrice > EQUILIBRIUM_BOUND) return null
  if (!Number.isFinite(equilibriumQuantity) || equilibriumQuantity <= 0 || equilibriumQuantity > EQUILIBRIUM_BOUND) return null
  return { curveType, shiftDirection, equilibriumPrice, equilibriumQuantity }
}

// ── Deterministic geometry (linear supply/demand intersection; never LLM-generated) ─

interface ShiftedIntercepts {
  supplyIntercept: number
  demandIntercept: number
}

function appliesToSupply(curveType: CurveType): boolean {
  return curveType === 'supply' || curveType === 'both'
}
function appliesToDemand(curveType: CurveType): boolean {
  return curveType === 'demand' || curveType === 'both'
}

/** Supply: P = supplyIntercept + SLOPE*Q. Demand: P = demandIntercept - SLOPE*Q. */
function originalIntercepts(p: EconomicsParams): ShiftedIntercepts {
  return {
    supplyIntercept: p.equilibriumPrice - SLOPE * p.equilibriumQuantity,
    demandIntercept: p.equilibriumPrice + SLOPE * p.equilibriumQuantity,
  }
}

/**
 * Apply the shift to whichever curve(s) curveType selects. A rightward supply
 * shift means more is supplied at every price (lower intercept); a rightward
 * demand shift means more is demanded at every price (higher intercept) —
 * leftward shifts are the opposite for each.
 */
function shiftedIntercepts(p: EconomicsParams, base: ShiftedIntercepts): ShiftedIntercepts {
  let { supplyIntercept, demandIntercept } = base
  if (p.shiftDirection === 'none') return base
  if (appliesToSupply(p.curveType)) {
    supplyIntercept += p.shiftDirection === 'right' ? -SHIFT_AMOUNT : SHIFT_AMOUNT
  }
  if (appliesToDemand(p.curveType)) {
    demandIntercept += p.shiftDirection === 'right' ? SHIFT_AMOUNT : -SHIFT_AMOUNT
  }
  return { supplyIntercept, demandIntercept }
}

/** Intersection of P = supplyIntercept + SLOPE*Q and P = demandIntercept - SLOPE*Q. */
function intersection(i: ShiftedIntercepts): { quantity: number; price: number } {
  const quantity = (i.demandIntercept - i.supplyIntercept) / (2 * SLOPE)
  const price = i.supplyIntercept + SLOPE * quantity
  return { quantity, price }
}

function lineEndpoints(intercept: number, sign: 1 | -1, qMax: number): [Vec3, Vec3] {
  return [
    [0, round(intercept), 0],
    [round(qMax), round(intercept + sign * SLOPE * qMax), 0],
  ]
}

/** Build a supply/demand SceneSpec: original curves + equilibrium in step 1, the shift + new equilibrium in step 2 (if shiftDirection !== 'none'). */
export function buildEconomicsCurveScene(params: EconomicsParams): SceneSpec {
  const base = originalIntercepts(params)
  const eq0 = intersection(base)
  const qMax = Math.max(2 * params.equilibriumQuantity, 10)

  const [s0a, s0b] = lineEndpoints(base.supplyIntercept, 1, qMax)
  const [d0a, d0b] = lineEndpoints(base.demandIntercept, -1, qMax)

  const eq0Pos: Vec3 = [round(eq0.quantity), round(eq0.price), 0]
  const eq0LabelPos: Vec3 = [round(eq0.quantity), round(eq0.price) + 2, 0]
  const step1: SceneStep = {
    narration: `Supply and demand curves intersect at the initial equilibrium: price ${round(eq0.price, 2)}, quantity ${round(eq0.quantity, 2)}.`,
    objects: [
      { type: 'path', id: 'supply-line', points: [s0a, s0b], color: '#3b82f6', properties: { intercept: round(base.supplyIntercept, 6), slope: SLOPE } },
      { type: 'path', id: 'demand-line', points: [d0a, d0b], color: '#ef4444', properties: { intercept: round(base.demandIntercept, 6), slope: -SLOPE } },
      { type: 'point', id: 'equilibrium', position: eq0Pos, color: '#22c55e', radius: 0.4, properties: { price: round(eq0.price, 6), quantity: round(eq0.quantity, 6) } },
      { type: 'label', id: 'equilibrium-label', position: eq0LabelPos, text: `E0 (${round(eq0.quantity, 1)}, ${round(eq0.price, 1)})`, color: '#22c55e' },
    ],
  }

  const steps: SceneStep[] = [step1]

  if (params.shiftDirection !== 'none') {
    const shifted = shiftedIntercepts(params, base)
    const eq1 = intersection(shifted)
    const objects: SceneObject[] = []
    if (appliesToSupply(params.curveType)) {
      const [a, b] = lineEndpoints(shifted.supplyIntercept, 1, qMax)
      objects.push({ type: 'path', id: 'supply-line-shifted', points: [a, b], color: '#1d4ed8', properties: { intercept: round(shifted.supplyIntercept, 6), slope: SLOPE } })
    }
    if (appliesToDemand(params.curveType)) {
      const [a, b] = lineEndpoints(shifted.demandIntercept, -1, qMax)
      objects.push({ type: 'path', id: 'demand-line-shifted', points: [a, b], color: '#b91c1c', properties: { intercept: round(shifted.demandIntercept, 6), slope: -SLOPE } })
    }
    const eqPos: Vec3 = [round(eq1.quantity), round(eq1.price), 0]
    const eqLabelPos: Vec3 = [round(eq1.quantity), round(eq1.price) + 2, 0]
    objects.push({ type: 'point', id: 'equilibrium-shifted', position: eqPos, color: '#f59e0b', radius: 0.4, properties: { price: round(eq1.price, 6), quantity: round(eq1.quantity, 6) } })
    objects.push({ type: 'label', id: 'equilibrium-shifted-label', position: eqLabelPos, text: `E1 (${round(eq1.quantity, 1)}, ${round(eq1.price, 1)})`, color: '#f59e0b' })

    steps.push({
      narration: `The ${params.curveType} curve shifts ${params.shiftDirection}. The new equilibrium moves to price ${round(eq1.price, 2)}, quantity ${round(eq1.quantity, 2)}.`,
      objects,
    })
  }

  return {
    id: `economics-${params.curveType}-${params.shiftDirection}-${params.equilibriumPrice}-${params.equilibriumQuantity}`,
    title: `Supply & Demand: equilibrium (${round(eq0.quantity, 1)}, ${round(eq0.price, 1)})${params.shiftDirection !== 'none' ? ` → shift ${params.shiftDirection}` : ''}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how supply and demand curves intersect at equilibrium, and how a shift in one curve moves equilibrium price and quantity.',
    cameraDistance: Math.max(qMax, eq0.price) * 2.5,
    ariaLabel: `Supply and demand curves intersecting at equilibrium price ${round(eq0.price, 1)} and quantity ${round(eq0.quantity, 1)}.`,
    steps,
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkEconomicsConsistency(spec: SceneSpec, params: EconomicsParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const supplyLine = objs.find((o) => o.id === 'supply-line')
  const demandLine = objs.find((o) => o.id === 'demand-line')
  const equilibrium = objs.find((o) => o.id === 'equilibrium')
  if (!supplyLine || !demandLine || !equilibrium) {
    return { ok: false, errors: ['missing one or more of supply-line/demand-line/equilibrium'] }
  }

  // Independently re-derive the original intercepts and equilibrium from params.
  const base = originalIntercepts(params)
  const eq0 = intersection(base)
  const tol = 0.01

  const supplyProps = supplyLine.properties as { intercept?: number } | undefined
  const demandProps = demandLine.properties as { intercept?: number } | undefined
  if (!supplyProps || Math.abs((supplyProps.intercept ?? NaN) - base.supplyIntercept) > tol) {
    errors.push(`supply-line intercept ${supplyProps?.intercept} does not match re-derived ${round(base.supplyIntercept, 6)}`)
  }
  if (!demandProps || Math.abs((demandProps.intercept ?? NaN) - base.demandIntercept) > tol) {
    errors.push(`demand-line intercept ${demandProps?.intercept} does not match re-derived ${round(base.demandIntercept, 6)}`)
  }

  const eqProps = equilibrium.properties as { price?: number; quantity?: number } | undefined
  if (!eqProps || Math.abs((eqProps.price ?? NaN) - eq0.price) > tol || Math.abs((eqProps.quantity ?? NaN) - eq0.quantity) > tol) {
    errors.push(`equilibrium (${eqProps?.quantity}, ${eqProps?.price}) does not match re-derived (${round(eq0.quantity, 6)}, ${round(eq0.price, 6)})`)
  }
  // Verify equilibrium genuinely lies on BOTH lines (the actual intersection, not just a stored claim).
  const onSupply = base.supplyIntercept + SLOPE * eq0.quantity
  const onDemand = base.demandIntercept - SLOPE * eq0.quantity
  if (Math.abs(onSupply - eq0.price) > tol || Math.abs(onDemand - eq0.price) > tol) {
    errors.push(`re-derived equilibrium is not on both lines: supply gives ${round(onSupply, 4)}, demand gives ${round(onDemand, 4)}, price is ${round(eq0.price, 4)}`)
  }

  if (params.shiftDirection !== 'none') {
    const shifted = shiftedIntercepts(params, base)
    const eq1 = intersection(shifted)
    const equilibriumShifted = objs.find((o) => o.id === 'equilibrium-shifted')
    if (!equilibriumShifted) {
      errors.push('shiftDirection is not "none" but no equilibrium-shifted object was found')
    } else {
      const eq1Props = equilibriumShifted.properties as { price?: number; quantity?: number } | undefined
      if (!eq1Props || Math.abs((eq1Props.price ?? NaN) - eq1.price) > tol || Math.abs((eq1Props.quantity ?? NaN) - eq1.quantity) > tol) {
        errors.push(`shifted equilibrium (${eq1Props?.quantity}, ${eq1Props?.price}) does not match re-derived (${round(eq1.quantity, 6)}, ${round(eq1.price, 6)})`)
      }
      const onSupply1 = shifted.supplyIntercept + SLOPE * eq1.quantity
      const onDemand1 = shifted.demandIntercept - SLOPE * eq1.quantity
      if (Math.abs(onSupply1 - eq1.price) > tol || Math.abs(onDemand1 - eq1.price) > tol) {
        errors.push(`re-derived shifted equilibrium is not on both shifted lines: supply gives ${round(onSupply1, 4)}, demand gives ${round(onDemand1, 4)}, price is ${round(eq1.price, 4)}`)
      }
    }
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the supply/demand curve scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isEconomicsCurve": true|false, "curveType": "supply"|"demand"|"both", "shiftDirection": "left"|"right"|"none", "equilibriumPrice": <positive number>, "equilibriumQuantity": <positive number>}
- isEconomicsCurve is false if the text is not about a supply and/or demand curve and its equilibrium.
- curveType is which curve(s) the text describes shifting ("both" if neither is singled out).
- shiftDirection is "none" if the text only describes the initial equilibrium with no shift.
- Use the equilibrium price/quantity actually stated in the text; do not invent values.`
}

/**
 * Extract validated economics curve parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractEconomicsParams(text: string): Promise<EconomicsParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isEconomicsCurve !== true) return null
  return validateEconomicsParams(raw)
}
