/**
 * sceneSpecValidator — deterministic, pure structural validator for SceneSpec data.
 *
 * Given ANY value (real, LLM-generated, or hand-crafted), decide whether it is a
 * structurally valid SceneSpec against the real schema in sceneSpec.ts. NO LLM call,
 * NO network, NO production wiring — pure synchronous validation logic.
 *
 * Why this exists independently of the Part 2 generator: whatever produces SceneSpecs
 * (hand-authored examples, a future LLM generator, imported JSON), the renderer must be
 * able to trust the data shape before drawing it. This is the gate. It is needed
 * regardless of whether LLM generation turns out to be feasible.
 *
 * Three layers, each stricter than the last (see validateSceneSpec):
 *   1. STRUCTURAL  — required fields present, correct primitive types, valid literals.
 *   2. SANITY      — numbers are finite (no NaN/Infinity/strings), Vec3s are length-3,
 *                    coordinates within a plausible bound, no empty point arrays.
 *   3. CONSISTENCY — type-appropriate geometry present (vector needs from+to, etc.),
 *                    no duplicate object ids.
 *
 * Never throws. Collects ALL errors (not fail-fast) so one run surfaces everything.
 */

import type { SceneObjectType, SceneType } from './sceneSpec'

export interface SceneSpecValidationError {
  /** Pinpoints the failure, e.g. "steps[2].objects[0].from". */
  path: string
  /** Human-readable reason. */
  message: string
}

export interface SceneSpecValidationResult {
  valid: boolean
  /** Empty iff valid. */
  errors: SceneSpecValidationError[]
}

const SCENE_TYPES: readonly SceneType[] = ['diagram', 'simulation', 'process', 'comparison', 'plot']

const OBJECT_TYPES: readonly SceneObjectType[] = [
  'point', 'particle', 'node', 'vector', 'arrow', 'bond', 'label', 'path', 'trajectory', 'bar', 'surface',
]

/**
 * Plausibility bound for any coordinate value. Heuristic, NOT a schema rule — its job is
 * to catch hallucinated runaway coordinates (e.g. a position 10000 units away) while
 * staying generous for any legitimate teaching scene. Tune here if a real scene ever needs more.
 */
const MAX_COORD = 1000

/**
 * Soft sanity bounds — all heuristics, NOT schema rules. Their job is to catch the
 * shapes a runaway LLM generator produces (a hundred objects crammed into one beat, the
 * whole explanation dumped into the title) while staying generous for any real scene.
 */
const MAX_OBJECTS_PER_STEP = 50
const MAX_TITLE_LEN = 200
const MAX_NARRATION_LEN = 1000
const MAX_TEXT_LEN = 200

/** Object types and the single-position-anchored set vs. endpoint vs. path families. */
const NEEDS_POSITION: ReadonlySet<SceneObjectType> = new Set<SceneObjectType>([
  'point', 'particle', 'node', 'label', 'bar',
])
const NEEDS_ENDPOINTS: ReadonlySet<SceneObjectType> = new Set<SceneObjectType>(['vector', 'arrow', 'bond'])
const NEEDS_POINTS: ReadonlySet<SceneObjectType> = new Set<SceneObjectType>(['path', 'trajectory'])

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

/** True only for a structurally valid, finite-numbered Vec3. */
function isValidVec3(v: unknown): v is [number, number, number] {
  return Array.isArray(v) && v.length === 3 && v.every(isFiniteNumber)
}

function vec3Equal(a: readonly number[], b: readonly number[]): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

/** Validate a single Vec3 field at `path`, pushing any errors. Returns nothing. */
function checkVec3(value: unknown, path: string, errors: SceneSpecValidationError[]): void {
  if (!Array.isArray(value)) {
    errors.push({ path, message: `expected a [number, number, number] array, got ${typeof value}` })
    return
  }
  if (value.length !== 3) {
    errors.push({ path, message: `Vec3 must have exactly 3 elements, got ${value.length}` })
    return
  }
  value.forEach((n, i) => {
    if (!isFiniteNumber(n)) {
      errors.push({ path: `${path}[${i}]`, message: `coordinate must be a finite number, got ${describe(n)}` })
    } else if (Math.abs(n) > MAX_COORD) {
      errors.push({ path: `${path}[${i}]`, message: `coordinate ${n} exceeds plausible bound ±${MAX_COORD}` })
    }
  })
}

/** A short, safe description of an arbitrary value for error messages. */
function describe(v: unknown): string {
  if (v === null) return 'null'
  if (typeof v === 'number') return Number.isNaN(v) ? 'NaN' : String(v)
  if (typeof v === 'string') return `"${v.length > 20 ? v.slice(0, 20) + '…' : v}"`
  if (Array.isArray(v)) return `array(len ${v.length})`
  return typeof v
}

/** Optional finite, non-negative scalar (radius/thickness/size/cameraDistance). */
function checkOptionalScalar(
  obj: Record<string, unknown>, key: string, path: string, errors: SceneSpecValidationError[],
): void {
  if (!(key in obj) || obj[key] === undefined) return
  const v = obj[key]
  if (!isFiniteNumber(v)) {
    errors.push({ path: `${path}.${key}`, message: `expected a finite number, got ${describe(v)}` })
  } else if (v < 0) {
    errors.push({ path: `${path}.${key}`, message: `expected a non-negative number, got ${v}` })
  }
}

/** Optional string (color/text). */
function checkOptionalString(
  obj: Record<string, unknown>, key: string, path: string, errors: SceneSpecValidationError[],
): void {
  if (!(key in obj) || obj[key] === undefined) return
  if (typeof obj[key] !== 'string') {
    errors.push({ path: `${path}.${key}`, message: `expected a string, got ${describe(obj[key])}` })
  }
}

/** Optional string with a generous upper length bound (catches "whole explanation dumped into one field"). */
function checkStringLength(
  value: unknown, path: string, max: number, errors: SceneSpecValidationError[],
): void {
  if (typeof value === 'string' && value.length > max) {
    errors.push({ path, message: `string length ${value.length} exceeds sanity bound of ${max} characters` })
  }
}

function validateObject(
  raw: unknown, path: string, errors: SceneSpecValidationError[], seenIds: Map<string, string>,
  coords: number[][],
): void {
  if (!isPlainObject(raw)) {
    errors.push({ path, message: `expected an object, got ${describe(raw)}` })
    return
  }

  // Layer 1: type literal.
  const type = raw.type
  if (typeof type !== 'string' || !OBJECT_TYPES.includes(type as SceneObjectType)) {
    errors.push({ path: `${path}.type`, message: `invalid object type ${describe(type)}; expected one of ${OBJECT_TYPES.join(', ')}` })
    // Without a valid type we can't run geometry consistency, but still check the fields we can.
  }

  // Layer 1/2: optional fields' types + sanity.
  if ('position' in raw && raw.position !== undefined) checkVec3(raw.position, `${path}.position`, errors)
  if ('from' in raw && raw.from !== undefined) checkVec3(raw.from, `${path}.from`, errors)
  if ('to' in raw && raw.to !== undefined) checkVec3(raw.to, `${path}.to`, errors)
  if ('points' in raw && raw.points !== undefined) {
    if (!Array.isArray(raw.points)) {
      errors.push({ path: `${path}.points`, message: `expected an array of Vec3, got ${describe(raw.points)}` })
    } else if (raw.points.length === 0) {
      errors.push({ path: `${path}.points`, message: 'points array must not be empty when present' })
    } else {
      raw.points.forEach((p, i) => checkVec3(p, `${path}.points[${i}]`, errors))
    }
  }
  checkOptionalString(raw, 'text', path, errors)
  checkStringLength(raw.text, `${path}.text`, MAX_TEXT_LEN, errors)
  checkOptionalString(raw, 'color', path, errors)

  // Collect every valid coordinate for the spec-level degeneracy check.
  for (const v of [raw.position, raw.from, raw.to]) {
    if (isValidVec3(v)) coords.push(v)
  }
  if (Array.isArray(raw.points)) for (const p of raw.points) if (isValidVec3(p)) coords.push(p)
  checkOptionalScalar(raw, 'radius', path, errors)
  checkOptionalScalar(raw, 'thickness', path, errors)
  checkOptionalScalar(raw, 'size', path, errors)
  if ('id' in raw && raw.id !== undefined && typeof raw.id !== 'string') {
    errors.push({ path: `${path}.id`, message: `id must be a string, got ${describe(raw.id)}` })
  }

  // Layer 3: per-type geometry consistency (only meaningful with a valid type).
  if (typeof type === 'string' && OBJECT_TYPES.includes(type as SceneObjectType)) {
    const t = type as SceneObjectType
    if (NEEDS_ENDPOINTS.has(t)) {
      if (raw.from === undefined) errors.push({ path: `${path}.from`, message: `'${t}' requires a 'from' endpoint` })
      if (raw.to === undefined) errors.push({ path: `${path}.to`, message: `'${t}' requires a 'to' endpoint` })
      // Zero-length endpoint: valid numbers, renders nothing.
      if (isValidVec3(raw.from) && isValidVec3(raw.to) && vec3Equal(raw.from, raw.to)) {
        errors.push({ path: `${path}.to`, message: `'${t}' has from === to (zero-length, renders nothing)` })
      }
    }
    if (NEEDS_POSITION.has(t) && raw.position === undefined) {
      errors.push({ path: `${path}.position`, message: `'${t}' requires a 'position'` })
    }
    if (NEEDS_POINTS.has(t)) {
      if (!Array.isArray(raw.points) || raw.points.length < 2) {
        errors.push({ path: `${path}.points`, message: `'${t}' requires a 'points' array with at least 2 entries` })
      }
    }
    if (t === 'label' && !isNonEmptyString(raw.text)) {
      errors.push({ path: `${path}.text`, message: "a 'label' requires non-empty 'text' (a textless label renders nothing)" })
    }
  }

  // Layer 3: duplicate id across the whole spec.
  if (typeof raw.id === 'string' && raw.id.length > 0) {
    const prev = seenIds.get(raw.id)
    if (prev) {
      errors.push({ path: `${path}.id`, message: `duplicate object id "${raw.id}" (already used at ${prev})` })
    } else {
      seenIds.set(raw.id, path)
    }
  }

  // NOTE: the real schema has NO field that references another object's id, so there is no
  // "dangling reference" to check today. If a referencing field is ever added to the schema,
  // resolve it against `seenIds` here.
}

/**
 * Deterministically validate an arbitrary value as a SceneSpec. Pure, never throws.
 * Returns { valid, errors }; errors is empty iff valid.
 */
export function validateSceneSpec(spec: unknown): SceneSpecValidationResult {
  const errors: SceneSpecValidationError[] = []
  const seenIds = new Map<string, string>()
  const coords: number[][] = []

  if (!isPlainObject(spec)) {
    return { valid: false, errors: [{ path: '(root)', message: `expected a SceneSpec object, got ${describe(spec)}` }] }
  }

  // Layer 1: top-level required fields.
  if (!isNonEmptyString(spec.id)) errors.push({ path: 'id', message: `required non-empty string, got ${describe(spec.id)}` })
  if (!isNonEmptyString(spec.title)) errors.push({ path: 'title', message: `required non-empty string, got ${describe(spec.title)}` })
  checkStringLength(spec.title, 'title', MAX_TITLE_LEN, errors)
  if (typeof spec.sceneType !== 'string' || !SCENE_TYPES.includes(spec.sceneType as SceneType)) {
    errors.push({ path: 'sceneType', message: `invalid sceneType ${describe(spec.sceneType)}; expected one of ${SCENE_TYPES.join(', ')}` })
  }

  // Layer 1: optional top-level fields.
  checkOptionalScalar(spec, 'cameraDistance', '(root)', errors)
  checkOptionalString(spec, 'teachingGoal', '(root)', errors)
  checkOptionalString(spec, 'ariaLabel', '(root)', errors)

  // Layer 1: steps array.
  if (!Array.isArray(spec.steps)) {
    errors.push({ path: 'steps', message: `required array, got ${describe(spec.steps)}` })
    return { valid: errors.length === 0, errors }
  }
  if (spec.steps.length === 0) {
    errors.push({ path: 'steps', message: 'must contain at least one step' })
  }

  spec.steps.forEach((step, i) => {
    const sPath = `steps[${i}]`
    if (!isPlainObject(step)) {
      errors.push({ path: sPath, message: `expected a step object, got ${describe(step)}` })
      return
    }
    if ('narration' in step && step.narration !== undefined && typeof step.narration !== 'string') {
      errors.push({ path: `${sPath}.narration`, message: `narration must be a string, got ${describe(step.narration)}` })
    }
    checkStringLength(step.narration, `${sPath}.narration`, MAX_NARRATION_LEN, errors)
    if (!Array.isArray(step.objects)) {
      errors.push({ path: `${sPath}.objects`, message: `required array, got ${describe(step.objects)}` })
      return
    }
    if (step.objects.length === 0) {
      errors.push({ path: `${sPath}.objects`, message: 'must contain at least one object' })
    }
    if (step.objects.length > MAX_OBJECTS_PER_STEP) {
      errors.push({ path: `${sPath}.objects`, message: `${step.objects.length} objects in one step exceeds sanity bound of ${MAX_OBJECTS_PER_STEP} (likely not a single coherent teaching beat)` })
    }
    step.objects.forEach((obj, j) => validateObject(obj, `${sPath}.objects[${j}]`, errors, seenIds, coords))
  })

  // Spec-level degeneracy: every positioned object collapsed onto one point renders as nothing.
  if (coords.length >= 2 && coords.every((c) => vec3Equal(c, coords[0]))) {
    errors.push({ path: '(root)', message: `all ${coords.length} coordinates are identical (${coords[0].join(', ')}) — degenerate, nothing is spatially distinguishable` })
  }

  return { valid: errors.length === 0, errors }
}
