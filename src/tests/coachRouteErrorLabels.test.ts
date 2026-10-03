/**
 * /api/coach labels a failure by what actually failed (2026-10-03).
 *
 * The route's inner catch wraps only the provider call, so its "AI service
 * temporarily unavailable" is accurate — the route touches no database. The
 * mislabel was the outer catch: a body that fails validation, or is not JSON
 * at all, was answered 500 "Internal server error" — a server fault for a
 * client mistake.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

const chat = vi.fn()
vi.mock('@/lib/auth', () => ({ auth: async () => ({ user: { id: 'u1' } }) }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/monitoring', () => ({ captureError: () => {} }))
vi.mock('@/lib/ai/client', () => ({ chatWithFallback: (...a: unknown[]) => chat(...a) }))
const { POST } = await import('@/app/api/coach/route')

const req = (body: string) => new Request('http://localhost/api/coach', { method: 'POST', headers: { 'content-type': 'application/json' }, body })

beforeEach(() => { chat.mockReset(); vi.spyOn(console, 'error').mockImplementation(() => {}) })

describe('/api/coach error labels', () => {
  it('a body that fails validation is a 400, not an internal error', async () => {
    const res = await POST(req(JSON.stringify({ messages: [{ role: 'robot', content: 'hi' }] })))
    expect(res.status).toBe(400)
    expect(chat).not.toHaveBeenCalled()
  })

  it('a body that is not JSON is a 400', async () => {
    const res = await POST(req('{not json'))
    expect(res.status).toBe(400)
  })

  it('a provider failure is still the AI error it is', async () => {
    chat.mockRejectedValue(new Error('all providers failed'))
    const res = await POST(req(JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] })))
    expect(res.status).toBe(500)
    expect(JSON.stringify(await res.json())).toMatch(/AI service temporarily unavailable/)
  })

  it('a good request still answers', async () => {
    chat.mockResolvedValue({ choices: [{ message: { content: 'Hello.' } }] })
    const res = await POST(req(JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] })))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ content: 'Hello.' })
  })
})
