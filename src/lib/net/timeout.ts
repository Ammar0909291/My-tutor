/**
 * Timeout guards for network/async work (Stability sprint, P0).
 *
 * Root cause these address: several client and server code paths `await` a
 * fetch or a DB call that, on flaky mobile networks (notably iPhone Safari
 * during a network transition or a cookie/auth race), can stay *pending
 * forever* — the promise neither resolves nor rejects. Any UI keyed on
 * "still loading" then sticks permanently ("Connecting to tutor…",
 * "Loading your dashboard…"). A timeout converts an unbounded hang into a
 * normal rejection the caller can recover from.
 */

export class TimeoutError extends Error {
  constructor(ms: number, label = 'operation') {
    super(`${label} timed out after ${ms}ms`)
    this.name = 'TimeoutError'
  }
}

/**
 * Reject if `promise` doesn't settle within `ms`. Server-safe (no fetch/DOM
 * dependency) — used to bound DB-bound work in server components so a hung
 * query surfaces the recoverable error boundary instead of loading forever.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, label = 'operation'): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new TimeoutError(ms, label)), ms)
    promise.then(
      (value) => { clearTimeout(id); resolve(value) },
      (err) => { clearTimeout(id); reject(err) },
    )
  })
}

/**
 * `fetch()` that aborts (and rejects with a TimeoutError) after `ms`. A
 * caller-supplied `signal` is respected if present; otherwise the internal
 * AbortController drives the timeout.
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  ms = 20000,
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(input, { ...init, signal: init.signal ?? controller.signal })
  } catch (err) {
    // An abort we triggered reads as a generic AbortError; re-label it so the
    // caller can tell "we timed out" apart from "the user navigated away".
    if (controller.signal.aborted) throw new TimeoutError(ms, 'request')
    throw err
  } finally {
    clearTimeout(id)
  }
}
