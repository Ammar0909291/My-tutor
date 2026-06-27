/**
 * Calculus function-graph scene generator (13th parametric generator).
 *
 * Samples a function across a domain, finds its critical points (where
 * f'(x)=0, via bisection on a fine grid), and marks them on the rendered
 * curve. Same architecture as the other generators: extractCalculusParams
 * (LLM, isolated) → validateCalculusParams (pure) → buildCalculusGraphScene
 * (pure, deterministic sampling + root-finding) → checkCalculusConsistency
 * (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export type FunctionType = 'polynomial' | 'trig' | 'exponential' | 'log'

export interface CalculusParams {
  functionType: FunctionType
  /**
   * polynomial: coefficients highest-degree first, e.g. [1,-4,3] => x^2-4x+3.
   * trig: [amplitude, frequency] for amplitude*sin(frequency*x).
   * exponential: [a, b] for a*e^(b*x).
   * log: [a] for a*ln(x) (domainMin must be > 0).
   */
  coefficients: number[]
  domainMin: number
  domainMax: number
}

const DOMAIN_BOUND = 50
const COEFF_BOUND = 20
const VISUAL_MAX = 14
const CURVE_SAMPLES = 40
const CRITICAL_SEARCH_SAMPLES = 200
const BISECTION_ITERATIONS = 50

export function validateCalculusParams(raw: unknown): CalculusParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const functionType = o.functionType
  if (functionType !== 'polynomial' && functionType !== 'trig' && functionType !== 'exponential' && functionType !== 'log') return null

  if (!Array.isArray(o.coefficients) || o.coefficients.length === 0) return null
  const coefficients = o.coefficients.map((c) => strictNumber(c))
  if (!coefficients.every((c) => Number.isFinite(c) && Math.abs(c) <= COEFF_BOUND)) return null

  const domainMin = strictNumber(o.domainMin)
  const domainMax = strictNumber(o.domainMax)
  if (!Number.isFinite(domainMin) || !Number.isFinite(domainMax)) return null
  if (domainMin >= domainMax) return null
  if (Math.abs(domainMin) > DOMAIN_BOUND || Math.abs(domainMax) > DOMAIN_BOUND) return null

  if (functionType === 'polynomial') {
    if (coefficients.length > 7) return null
    if (coefficients.length > 1 && coefficients[0] === 0) return null
  } else if (functionType === 'trig' || functionType === 'exponential') {
    if (coefficients.length !== 2) return null
    if (coefficients[0] === 0 || coefficients[1] === 0) return null
  } else {
    if (coefficients.length !== 1) return null
    if (coefficients[0] === 0) return null
    if (domainMin <= 0) return null
  }

  return { functionType, coefficients, domainMin, domainMax }
}

// ── Deterministic math (pure leaf functions; never LLM-generated) ────────────

function evalPolynomial(coeffs: number[], x: number): number {
  return coeffs.reduce((acc, c) => acc * x + c, 0)
}

function evalPolynomialDerivative(coeffs: number[], x: number): number {
  const n = coeffs.length - 1
  if (n === 0) return 0
  const dCoeffs = coeffs.slice(0, n).map((c, i) => c * (n - i))
  return evalPolynomial(dCoeffs, x)
}

function evaluateFunction(p: CalculusParams, x: number): number {
  switch (p.functionType) {
    case 'polynomial': return evalPolynomial(p.coefficients, x)
    case 'trig': return p.coefficients[0] * Math.sin(p.coefficients[1] * x)
    case 'exponential': return p.coefficients[0] * Math.exp(p.coefficients[1] * x)
    case 'log': return p.coefficients[0] * Math.log(x)
  }
}

function evaluateDerivative(p: CalculusParams, x: number): number {
  switch (p.functionType) {
    case 'polynomial': return evalPolynomialDerivative(p.coefficients, x)
    case 'trig': return p.coefficients[0] * p.coefficients[1] * Math.cos(p.coefficients[1] * x)
    case 'exponential': return p.coefficients[0] * p.coefficients[1] * Math.exp(p.coefficients[1] * x)
    case 'log': return p.coefficients[0] / x
  }
}

/** Sample f'(x) on a fine grid and bisect across every sign change to find each root (critical point). */
function findCriticalPoints(p: CalculusParams): number[] {
  const xs: number[] = []
  for (let i = 0; i <= CRITICAL_SEARCH_SAMPLES; i++) {
    xs.push(p.domainMin + (i / CRITICAL_SEARCH_SAMPLES) * (p.domainMax - p.domainMin))
  }
  const derivs = xs.map((x) => evaluateDerivative(p, x))
  const roots: number[] = []
  for (let i = 0; i < CRITICAL_SEARCH_SAMPLES; i++) {
    const d0 = derivs[i]
    const d1 = derivs[i + 1]
    if (d0 === 0) {
      roots.push(xs[i])
      continue
    }
    if (d0 * d1 < 0) {
      let lo = xs[i]
      let hi = xs[i + 1]
      let flo = d0
      for (let iter = 0; iter < BISECTION_ITERATIONS; iter++) {
        const mid = (lo + hi) / 2
        const fmid = evaluateDerivative(p, mid)
        if (Math.abs(fmid) < 1e-9) {
          lo = hi = mid
          break
        }
        if (flo * fmid < 0) hi = mid
        else { lo = mid; flo = fmid }
      }
      roots.push((lo + hi) / 2)
    }
  }
  return roots
}

interface CurveSample {
  xs: number[]
  ys: number[]
  criticalXs: number[]
  criticalYs: number[]
  sx: number
  sy: number
}

function sampleCurve(p: CalculusParams): CurveSample {
  const xs: number[] = []
  for (let i = 0; i <= CURVE_SAMPLES; i++) {
    xs.push(p.domainMin + (i / CURVE_SAMPLES) * (p.domainMax - p.domainMin))
  }
  const ys = xs.map((x) => evaluateFunction(p, x))
  const criticalXs = findCriticalPoints(p)
  const criticalYs = criticalXs.map((x) => evaluateFunction(p, x))

  const maxAbsX = Math.max(Math.abs(p.domainMin), Math.abs(p.domainMax), 1e-9)
  const maxAbsY = Math.max(...ys.map(Math.abs), ...criticalYs.map(Math.abs), 1e-9)
  const sx = VISUAL_MAX / maxAbsX
  const sy = VISUAL_MAX / maxAbsY

  return { xs, ys, criticalXs, criticalYs, sx, sy }
}

/** Build a function-graph SceneSpec: the sampled curve in step 1, critical points marked in step 2. */
export function buildCalculusGraphScene(params: CalculusParams): SceneSpec {
  const s = sampleCurve(params)
  const curvePoints: Vec3[] = s.xs.map((x, i) => [round(x * s.sx), round(s.ys[i] * s.sy), 0])

  const criticalObjects: SceneObject[] = s.criticalXs.length > 0
    ? s.criticalXs.map((x, i) => ({
        type: 'point',
        id: `critical-${i}`,
        position: [round(x * s.sx), round(s.criticalYs[i] * s.sy), 0] as Vec3,
        color: '#f59e0b',
        radius: 0.4,
        properties: { x: round(x, 6), fpx: round(evaluateDerivative(params, x), 6) },
      }))
    : [{ type: 'label', id: 'no-critical-points', position: [0, 0, 0] as Vec3, text: 'No critical points in this domain.', color: '#94a3b8', properties: { critical: false } }]

  return {
    id: `calculus-${params.functionType}-${params.domainMin}-${params.domainMax}`,
    title: `${params.functionType} function on [${params.domainMin}, ${params.domainMax}] — ${s.criticalXs.length} critical point${s.criticalXs.length === 1 ? '' : 's'}`,
    sceneType: 'plot',
    teachingGoal: 'Show a function\'s graph and find its critical points, where the derivative is zero.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: `A graph of a ${params.functionType} function with ${s.criticalXs.length} critical point${s.criticalXs.length === 1 ? '' : 's'} marked.`,
    steps: [
      {
        narration: `Here is the graph of the function over [${params.domainMin}, ${params.domainMax}].`,
        objects: [{ type: 'path', id: 'curve', points: curvePoints, color: '#3b82f6' }],
      },
      {
        narration: s.criticalXs.length > 0
          ? `The critical points are where the derivative equals zero — found at x = ${s.criticalXs.map((x) => round(x, 2)).join(', ')}.`
          : 'This function has no critical points in the given domain — it is monotonic throughout.',
        objects: criticalObjects,
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkCalculusConsistency(spec: SceneSpec, params: CalculusParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const curve = objs.find((o) => o.id === 'curve')
  if (!curve || !curve.points) return { ok: false, errors: ['missing curve object'] }

  // Independently re-derive the sampled curve and critical points from params.
  const xs: number[] = []
  for (let i = 0; i <= CURVE_SAMPLES; i++) xs.push(params.domainMin + (i / CURVE_SAMPLES) * (params.domainMax - params.domainMin))
  const ys = xs.map((x) => evaluateFunction(params, x))
  const criticalXs = findCriticalPoints(params)
  const criticalYs = criticalXs.map((x) => evaluateFunction(params, x))

  const maxAbsX = Math.max(Math.abs(params.domainMin), Math.abs(params.domainMax), 1e-9)
  const maxAbsY = Math.max(...ys.map(Math.abs), ...criticalYs.map(Math.abs), 1e-9)
  const sx = VISUAL_MAX / maxAbsX
  const sy = VISUAL_MAX / maxAbsY
  const tolX = VISUAL_MAX * 0.02
  const tolY = VISUAL_MAX * 0.02

  if (curve.points.length !== xs.length) {
    errors.push(`curve has ${curve.points.length} points, expected ${xs.length}`)
  } else {
    for (let i = 0; i < xs.length; i++) {
      const expected: Vec3 = [round(xs[i] * sx), round(ys[i] * sy), 0]
      if (Math.abs(curve.points[i][0] - expected[0]) > tolX || Math.abs(curve.points[i][1] - expected[1]) > tolY) {
        errors.push(`curve point ${i} (${curve.points[i][0]}, ${curve.points[i][1]}) does not match re-derived (${expected[0]}, ${expected[1]})`)
      }
    }
  }

  if (criticalXs.length === 0) {
    const label = objs.find((o) => o.id === 'no-critical-points')
    if (!label) errors.push('no critical points were re-derived, but no "no-critical-points" label object was found')
  } else {
    for (let i = 0; i < criticalXs.length; i++) {
      const pointObj = objs.find((o) => o.id === `critical-${i}`)
      if (!pointObj || !pointObj.position || !pointObj.properties) {
        errors.push(`missing critical-${i} object`)
        continue
      }
      const props = pointObj.properties as { x?: number; fpx?: number }
      const fpxAtReportedX = props.x !== undefined ? evaluateDerivative(params, props.x) : NaN
      if (Math.abs(fpxAtReportedX) > 1e-3) {
        errors.push(`critical-${i} reports x=${props.x}, but f'(${props.x}) = ${round(fpxAtReportedX, 6)}, not ≈0`)
      }
      if (props.fpx === undefined || Math.abs(props.fpx) > 1e-3) {
        errors.push(`critical-${i} stored fpx=${props.fpx} is not ≈0`)
      }
      const expectedPos: Vec3 = [round(criticalXs[i] * sx), round(criticalYs[i] * sy), 0]
      if (Math.abs(pointObj.position[0] - expectedPos[0]) > tolX || Math.abs(pointObj.position[1] - expectedPos[1]) > tolY) {
        errors.push(`critical-${i} position (${pointObj.position[0]}, ${pointObj.position[1]}) does not match re-derived (${expectedPos[0]}, ${expectedPos[1]})`)
      }
    }
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the function and domain being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isFunctionGraph": true|false, "functionType": "polynomial"|"trig"|"exponential"|"log", "coefficients": [<numbers>], "domainMin": <number>, "domainMax": <number>}
- isFunctionGraph is false if the text is not about graphing a specific function or finding its critical points.
- coefficients: for polynomial, highest-degree term first (e.g. x^2-4x+3 is [1,-4,3]); for trig, [amplitude, frequency] for amplitude*sin(frequency*x); for exponential, [a, b] for a*e^(b*x); for log, [a] for a*ln(x).
- Do not invent values not stated in the text; use sensible defaults only if the domain is unstated (e.g. [-10, 10], or [1, 10] for log).`
}

/**
 * Extract validated calculus-graph parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCalculusParams(text: string): Promise<CalculusParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 250).catch(() => null)
  if (!raw || raw.isFunctionGraph !== true) return null
  return validateCalculusParams(raw)
}
