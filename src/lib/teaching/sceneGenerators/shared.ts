/**
 * Shared helpers for the parametric scene generators (option C).
 *
 * Extracted to remove the round() and ConsistencyResult duplication that was
 * copy-pasted, byte-for-byte, across all 9 generator modules. Single source of
 * truth — identical behavior, just no longer repeated nine times.
 */

/** Round to `dp` decimal places (default 3) to keep scene coordinates tidy. */
export const round = (n: number, dp = 3): number => Math.round(n * 10 ** dp) / 10 ** dp

/**
 * Coerce a raw, untrusted (LLM-JSON) field to a number, but ONLY from an
 * actual number or string — never from other types, since bare `Number(v)`
 * has surprising coercions for non-numeric types (`Number(true) === 1`,
 * `Number([5]) === 5`, `Number(null) === 0`) that would let a malformed
 * field silently resolve to a real value instead of being rejected by the
 * caller's `Number.isFinite()` check. Anything else coerces to NaN, which
 * every validateXParams' finite check already rejects.
 */
export const strictNumber = (v: unknown): number => (typeof v === 'number' || typeof v === 'string' ? Number(v) : NaN)

/**
 * Result of a generator's independent consistency check — the safety-net second
 * derivation. `ok` is true iff `errors` is empty.
 */
export interface ConsistencyResult {
  ok: boolean
  errors: string[]
}

/**
 * `properties` for a text-bearing sphere whose caption should sit CLEAR of it,
 * above (`up`) or below it — see `withLabelOffset` in visual/layout.ts. The text
 * stays on the object (legend, narration and tests read it there); only where it
 * is painted moves. `gap` is the distance past the sphere's own edge.
 */
export function captionBeside(radius: number, side: 'above' | 'below', gap = 0.5): { labelOffset: [number, number, number] } {
  const dy = round(radius + gap)
  return { labelOffset: [0, side === 'above' ? dy : -dy, 0] }
}

/**
 * The 2026-10 Biology visual render audit changed how the shared cell generators LAY OUT a figure (captions
 * beside their spheres, captions wrapped to their column, connectors that stop at a sphere's surface, a grid for
 * three or more groups). Those generators also serve a handful of non-Biology concepts (one Physics, a few
 * Chemistry), whose figures have their own audit and committed fingerprints — so the new layout is applied to
 * Biology scenes ONLY, and every other subject's output stays byte-identical until its own audit adopts it.
 */
export const isBiologyScene = (conceptId: string): boolean => conceptId.startsWith('bio.')
