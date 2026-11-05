import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/client-error — what the app-wide error boundary reports when a page crashes in the browser.
 *
 * WHY. A client-side render error carries no `digest` and no server log line: the learner sees "Something went wrong", the server saw nothing wrong, and
 * the cause existed only in their browser console (2026-11-05: a Russian learner's /learn?subject=physics page crashed; the runtime logs held no error for it
 * and a fresh account could not reproduce it). This writes one `[client-error]` line that Vercel's runtime logs keep, so the next crash names its own cause.
 *
 * Unauthenticated on purpose (the boundary can render for a logged-out or expired session), so it is bounded: a per-instance sliding window per IP,
 * every field truncated, nothing stored, nothing echoed back.
 */
const WINDOW_MS = 60_000
const LIMIT = 10
const hits = new Map<string, number[]>()

const clip = (v: unknown, n: number) => (typeof v === 'string' ? v.slice(0, n) : '')

export async function POST(req: Request) {
  const ip = (req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',').pop() ?? 'unknown').trim()
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT) return NextResponse.json({ ok: false }, { status: 429 })
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) for (const k of hits.keys()) { if (hits.size <= 250) break; hits.delete(k) }

  let body: Record<string, unknown> = {}
  try { body = (await req.json()) as Record<string, unknown> } catch { /* an unreadable body is still worth one line */ }
  console.error('[client-error] ' + JSON.stringify({
    name: clip(body.name, 80), message: clip(body.message, 400), digest: clip(body.digest, 80),
    stack: clip(body.stack, 1500), url: clip(body.url, 200), lang: clip(body.lang, 8),
    ua: clip(req.headers.get('user-agent'), 160),
  }))
  return NextResponse.json({ ok: true })
}
