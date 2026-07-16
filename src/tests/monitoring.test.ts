/**
 * Regression lock for src/lib/monitoring.ts.
 *
 * Context: a 2026-06-15 "consolidation" merge silently replaced the
 * originally-built (Sprint AR) direct-to-Sentry capture path with a
 * webhook-only mechanism, while docs/DEPLOYMENT.md was never updated —
 * it still promises "Sentry reporting... active when SENTRY_DSN is set"
 * with 5-min dedupe and a 20/min cap. This suite locks in the restored
 * behavior: both channels work, dedupe/cap apply to Sentry only, and
 * every function the 13 existing call sites depend on keeps its exact
 * signature.
 *
 * Each test resets the module so the in-process dedupe/cap/counter state
 * never leaks between tests.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

const ORIGINAL_ENV = { ...process.env }

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV }
  vi.resetModules()
  vi.unstubAllGlobals()
})

describe('captureError — Sentry direct-capture path', () => {
  it('does nothing when SENTRY_DSN is unset (no-op, never throws)', async () => {
    delete process.env.SENTRY_DSN
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    expect(() => captureError(new Error('boom'), { route: 'test/noop' })).not.toThrow()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('posts to the Sentry store API derived from SENTRY_DSN when set', async () => {
    process.env.SENTRY_DSN = 'https://publickey123@o0.ingest.sentry.io/42'
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    captureError(new Error('db unreachable'), { route: 'test/sentry-post', tags: { kind: 'db' } })
    // fire-and-forget: allow the microtask to run
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://o0.ingest.sentry.io/api/42/store/')
    expect(init.method).toBe('POST')
    expect(init.headers['X-Sentry-Auth']).toContain('sentry_key=publickey123')
    const body = JSON.parse(init.body)
    expect(body.tags.route).toBe('test/sentry-post')
    expect(body.tags.kind).toBe('db')
    expect(body.exception.values[0].value).toBe('db unreachable')
  })

  it('dedupes identical (route, message) pairs within the 5-minute window', async () => {
    process.env.SENTRY_DSN = 'https://publickey123@o0.ingest.sentry.io/42'
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    captureError(new Error('same error'), { route: 'test/dedupe' })
    captureError(new Error('same error'), { route: 'test/dedupe' })
    captureError(new Error('same error'), { route: 'test/dedupe' })
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not dedupe a different message on the same route', async () => {
    process.env.SENTRY_DSN = 'https://publickey123@o0.ingest.sentry.io/42'
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    captureError(new Error('error A'), { route: 'test/distinct' })
    captureError(new Error('error B'), { route: 'test/distinct' })
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('caps at 20 Sentry events per minute process-wide', async () => {
    process.env.SENTRY_DSN = 'https://publickey123@o0.ingest.sentry.io/42'
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    for (let i = 0; i < 25; i++) {
      captureError(new Error(`unique error ${i}`), { route: `test/cap-${i}` })
    }
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(20)
  })

  it('silently ignores a malformed SENTRY_DSN instead of throwing', async () => {
    process.env.SENTRY_DSN = 'not-a-valid-dsn'
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    expect(() => captureError(new Error('boom'), { route: 'test/bad-dsn' })).not.toThrow()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('never includes secret-shaped extra keys in the Sentry payload', async () => {
    process.env.SENTRY_DSN = 'https://publickey123@o0.ingest.sentry.io/42'
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { captureError } = await import('@/lib/monitoring')

    captureError(new Error('leak check'), {
      route: 'test/redact',
      extra: { apiKey: 'sk-super-secret', userMessage: 'hello' },
    })
    await Promise.resolve()

    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body.extra.apiKey).toBe('[redacted]')
    expect(body.extra.userMessage).toBe('hello')
  })
})

describe('regression lock: existing call-site contract preserved', () => {
  it('reportError still logs, counts, and posts to MONITORING_WEBHOOK_URL', async () => {
    delete process.env.SENTRY_DSN
    process.env.MONITORING_WEBHOOK_URL = 'https://hooks.example.com/in'
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { reportError, getFailureCounters } = await import('@/lib/monitoring')

    const count = reportError('test/webhook', new Error('smtp down'), { to: 'a***@example.com' })
    await Promise.resolve()

    expect(count).toBe(1)
    expect(getFailureCounters()['test/webhook']).toBe(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://hooks.example.com/in',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('recordFailure increments independently of reportError', async () => {
    const { recordFailure, getFailureCounters } = await import('@/lib/monitoring')
    recordFailure('test/counter')
    recordFailure('test/counter')
    expect(getFailureCounters()['test/counter']).toBe(2)
  })

  it('maskEmail keeps first char + domain, handles malformed input', async () => {
    const { maskEmail } = await import('@/lib/monitoring')
    expect(maskEmail('jane@example.com')).toBe('j***@example.com')
    expect(maskEmail('not-an-email')).toBe('[invalid-email]')
  })

  it('captureError still runs the reportError/counter path alongside Sentry', async () => {
    delete process.env.SENTRY_DSN
    const { captureError, getFailureCounters } = await import('@/lib/monitoring')
    captureError(new Error('both paths'), { route: 'test/both' })
    expect(getFailureCounters()['test/both']).toBe(1)
  })
})
