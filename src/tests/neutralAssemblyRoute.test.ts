/**
 * Launch-readiness item 1 through the real route: a tap on a MODEL-WRITTEN card
 * (the model's own <!--MCQ--> tag, no authored key) whose live reply is a stub
 * gets a neutral reason in serve mode — no verdict, no option named — and the
 * stored row is what was served.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
// These tests cover a tap on a MODEL-WRITTEN card. Since the owner decision of
// 2026-10-07 the route never serves one (inventedProbeGuard.AUTHORED_CARDS_ONLY);
// the tap path still exists for a card already on screen, so it is exercised
// here with the policy switched off.
vi.mock('@/lib/teaching/inventedProbeGuard', async (o) => ({ ...(await o<Record<string, unknown>>()), AUTHORED_CARDS_ONLY: false }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

// No authored probes: the only card is the model's own.
const LANE = { probes: [] as never[], subjectSlug: 'physics', conceptId: 'phys.mech.normal-force', lessonTitle: 'Normal Force' }
const TAG = '<!--MCQ q="Which force balances the weight of a book resting on a table?" a="Friction" b="The normal force" c="Air resistance" d="Tension" correct="B"-->'
const REASON = 'A book at rest has no net force on it, so some upward push must match its weight. That push comes from the surface the book is pressing on.'

const textOf = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')
const lineOf = (t: TurnResult) => {
  const l = t.logs.find((x) => x.includes('[assembled-neutral]'))
  return l ? JSON.parse(l.slice(l.indexOf('{'))) : null
}

const baseRouteAI = h.routeAI
async function unauthoredTap(): Promise<TurnResult> {
  h.state.messages = []; h.state.snapshot = {}
  const res = await driveTurns(h, POST, [
    { learnerSays: 'ok', modelReplies: 'The normal force is the push a surface gives back on an object, at right angles to the surface.' },
    { learnerSays: 'quiz me', modelReplies: `Here is one for you. ${TAG}` },
    // The model calls the tap right; the unauthored-key repair strips that, leaving a stub.
    { learnerSays: (m: { options: string[] } | null) => (m ? m.options.find((o) => o === 'The normal force')! : 'The normal force'), modelReplies: 'Correct! Here is your next question.' },
  ] as never, LANE)
  return res[2]
}

afterEach(() => { delete process.env.TURN_ASSEMBLY_MODE; h.routeAI = baseRouteAI })

describe('a tap on a model-written card', () => {
  it('serve: the slot is called and validated; a non-stub live reply is kept (only stubs are replaced)', async () => {
    h.routeAI = async (...args: unknown[]) => {
      if (String(args[1] ?? '').includes('Nobody has checked the answer key')) return { text: JSON.stringify({ feedback: REASON, teaching: null }), provider: 'harness', finishReason: 'stop' }
      return baseRouteAI(...args)
    }
    process.env.TURN_ASSEMBLY_MODE = 'serve'
    const t = await unauthoredTap()
    const logged = lineOf(t)
    expect(logged, 'no [assembled-neutral] line').not.toBeNull()
    expect(logged.codes).toEqual([])
    expect(logged.assembledText.startsWith(REASON)).toBe(true)
    // In the harness the turn's other stages leave a full sentence, not a stub.
    expect(logged.liveStub).toBe(false)
    expect(logged.served).toBe('live')
    expect(textOf(t)).not.toMatch(/^\s*correct\b/i)
  }, 180_000)

  it('a slot that names an option or a verdict is rejected; the turn falls back to the live reply', async () => {
    h.routeAI = async (...args: unknown[]) => {
      if (String(args[1] ?? '').includes('Nobody has checked the answer key')) return { text: JSON.stringify({ feedback: 'Correct, the normal force is the answer because it pushes up on the book.', teaching: null }), provider: 'harness', finishReason: 'stop' }
      return baseRouteAI(...args)
    }
    process.env.TURN_ASSEMBLY_MODE = 'serve'
    const t = await unauthoredTap()
    const logged = lineOf(t)
    expect(logged).not.toBeNull()
    expect(logged.served).toBe('live')
    expect(logged.codes.some((c: string) => c.startsWith('N1') || c.startsWith('N2'))).toBe(true)
  }, 180_000)

  it('off: no slot call, no line', async () => {
    let calls = 0
    h.routeAI = async (...args: unknown[]) => {
      if (String(args[1] ?? '').includes('Nobody has checked the answer key')) calls++
      return baseRouteAI(...args)
    }
    const t = await unauthoredTap()
    expect(lineOf(t)).toBeNull()
    expect(calls).toBe(0)
  }, 180_000)
})
