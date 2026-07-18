/**
 * Regression tests — network/async timeout guards (src/lib/net/timeout.ts).
 *
 * Stability sprint P0: these bound the code paths that could otherwise hang
 * forever (the mobile-Safari "Connecting to tutor…" spinner and the
 * "Loading your dashboard…" screen). The contract under test: a promise that
 * never settles is turned into a rejection after the deadline; a promise that
 * settles in time is passed through untouched.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { withTimeout, fetchWithTimeout, TimeoutError } from '@/lib/net/timeout'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('withTimeout', () => {
  it('resolves with the value when the promise settles in time', async () => {
    await expect(withTimeout(Promise.resolve(42), 1000)).resolves.toBe(42)
  })

  it('propagates the original rejection unchanged', async () => {
    const boom = new Error('boom')
    await expect(withTimeout(Promise.reject(boom), 1000)).rejects.toBe(boom)
  })

  it('rejects with a TimeoutError when the promise never settles', async () => {
    const never = new Promise<number>(() => {})
    await expect(withTimeout(never, 20, 'unit-test')).rejects.toBeInstanceOf(TimeoutError)
  })
})

describe('fetchWithTimeout', () => {
  it('returns the response when fetch resolves in time', async () => {
    const response = { ok: true } as Response
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
    await expect(fetchWithTimeout('/x', {}, 1000)).resolves.toBe(response)
  })

  it('aborts and rejects with TimeoutError when fetch stalls', async () => {
    // A fetch that only rejects when its AbortSignal fires — i.e. it hangs
    // until the timeout aborts it, exactly like a stalled mobile request.
    vi.stubGlobal('fetch', (_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))
    }))
    await expect(fetchWithTimeout('/x', {}, 20)).rejects.toBeInstanceOf(TimeoutError)
  })
})
