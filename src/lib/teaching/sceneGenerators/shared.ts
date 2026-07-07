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
