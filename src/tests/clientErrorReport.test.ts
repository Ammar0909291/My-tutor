/** A browser-side crash is reported to the server (api/client-error) and a stale-chunk crash recovers with one reload (2026-11-05). */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { isChunkLoadError } from '@/lib/clientErrorReport'
import { POST } from '@/app/api/client-error/route'

const req = (body: unknown, ip = '1.2.3.4') => new Request('http://x/api/client-error', { method: 'POST', headers: { 'x-real-ip': ip, 'user-agent': 'ua' }, body: typeof body === 'string' ? body : JSON.stringify(body) })

describe('chunk-load errors are recognised (and a real bug is not)', () => {
  it.each([
    ['ChunkLoadError', 'Loading chunk 7931 failed.'], ['Error', 'Loading CSS chunk 12 failed'], ['TypeError', 'Failed to fetch dynamically imported module: https://x/_next/static/chunks/a.js'],
  ])('%s: %s', (name, message) => { expect(isChunkLoadError({ name, message })).toBe(true) })
  it.each([['TypeError', "Cannot read properties of undefined (reading 'map')"], ['RangeError', 'Invalid array length']])('%s: %s', (name, message) => {
    expect(isChunkLoadError({ name, message })).toBe(false)
  })
})

describe('POST /api/client-error', () => {
  let spy: ReturnType<typeof vi.spyOn>
  beforeEach(() => { spy = vi.spyOn(console, 'error').mockImplementation(() => undefined) })

  it('writes one [client-error] line with the fields, truncated, and echoes nothing back', async () => {
    const r = await POST(req({ name: 'TypeError', message: 'x'.repeat(2000), stack: 's'.repeat(5000), url: '/learn?subject=physics', lang: 'ru' }, '9.9.9.1'))
    expect(await r.json()).toEqual({ ok: true })
    const line = String(spy.mock.calls[0][0])
    expect(line).toMatch(/^\[client-error\] /)
    const parsed = JSON.parse(line.replace('[client-error] ', ''))
    expect(parsed.message).toHaveLength(400); expect(parsed.stack).toHaveLength(1500); expect(parsed.url).toBe('/learn?subject=physics'); expect(parsed.lang).toBe('ru')
  })
  it('an unreadable body is still one line, not a 500', async () => {
    const r = await POST(req('not json', '9.9.9.2'))
    expect(r.status).toBe(200)
    expect(spy).toHaveBeenCalled()
  })
  it('is rate limited per IP: the 11th report inside a minute is refused and logs nothing', async () => {
    for (let i = 0; i < 10; i++) expect((await POST(req({ message: 'm' }, '9.9.9.3'))).status).toBe(200)
    spy.mockClear()
    expect((await POST(req({ message: 'm' }, '9.9.9.3'))).status).toBe(429)
    expect(spy).not.toHaveBeenCalled()
    expect((await POST(req({ message: 'm' }, '9.9.9.4'))).status).toBe(200)   // another IP is unaffected
  })
})

describe('the boundaries use it', () => {
  it('error.tsx reports, reloads once on a chunk error, and shows name: message when there is no digest', () => {
    const s = readFileSync('src/app/error.tsx', 'utf8')
    expect(s).toMatch(/reportClientError\(error\)/)
    expect(s).toMatch(/mytutor_chunk_reload/)
    expect(s).toMatch(/!error\.digest && error\.message/)
    expect(s.match(/^export /gm)).toHaveLength(1)   // only the default export: Next.js special file
  })
  it('global-error.tsx reports too', () => { expect(readFileSync('src/app/global-error.tsx', 'utf8')).toMatch(/\/api\/client-error/) })
})
