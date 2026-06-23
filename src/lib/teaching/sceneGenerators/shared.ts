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
 * Result of a generator's independent consistency check — the safety-net second
 * derivation. `ok` is true iff `errors` is empty.
 */
export interface ConsistencyResult {
  ok: boolean
  errors: string[]
}
