/**
 * S4 — TURN_EVENT fires from the REAL route, on every turn, and carries the
 * three fields that would have identified both P0 chemistry sessions without
 * opening a source file: blockedBy, modelOfferedProseMcq, stagnantTurns.
 *
 * Behaviour-neutral by construction: the assertions below also pin that the
 * event changes nothing — the same lesson still reaches verified mastery.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'
import { TURN_EVENT_PREFIX } from '@/lib/teaching/turnTelemetry'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'chem.elect.galvanic-cell',
  stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [
    { text: `At the anode (${n})`, isCorrect: true },
    { text: `At the cathode (${n})`, isCorrect: false },
    { text: `In the salt bridge (${n})`, isCorrect: false },
  ],
}))
const event = (t: TurnResult) => {
  const line = [...t.logs].reverse().find((l) => l.startsWith(TURN_EVENT_PREFIX))
  return line ? JSON.parse(line.slice(TURN_EVENT_PREFIX.length)) : null
}

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('S4 — the joined line exists', () => {
  it('fires on every turn, with the denominator on the line', async () => {
    const res = await driveTurns(h, POST, Array.from({ length: 3 }, (_, i) => ({
      learnerSays: 'ok', modelReplies: `Teaching ${i}.`,
    })), { probes: PROBES })
    for (const t of res) {
      const e = event(t)
      expect(e).not.toBeNull()
      expect(e.version).toBe(1)
      expect(e.sessionId).toBe('harness-session')
      expect(typeof e.turnKey).toBe('string')
    }
  }, 60_000)

  it('carries NO learner text and NO model text', async () => {
    const secret = 'my name is Ammar and I live in Lucknow'
    const [t] = await driveTurns(h, POST, [
      { learnerSays: secret, modelReplies: 'Sensitive model prose about Ammar.' },
    ], { probes: PROBES })
    const line = t.logs.find((l) => l.startsWith(TURN_EVENT_PREFIX))!
    expect(line).not.toContain('Ammar')
    expect(line).not.toContain('Lucknow')
    expect(line).not.toContain('Sensitive model prose')
  }, 60_000)

  it('L1 IS VISIBLE ON THE LINE: blockedBy names the latch, stagnantTurns climbs', async () => {
    const typed = ['the anode', 'the negative electrode', 'where electrons are released',
      'the zinc side loses electrons', 'the electrode that gets eaten away']
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Teaching 0.' },
      ...typed.map((s, i) => ({ learnerSays: s, modelReplies: `Teaching ${i + 1}.` })),
    ], { probes: PROBES })

    const later = res.slice(1).map(event)
    // UPDATED 2026-09-07 (S5): the latch is now RELEASED, so it no longer holds
    // on every turn — which is the fix, not a weaker assertion. What the line
    // must still show is the diagnosis itself: the latch appears, is visible by
    // name, and the held-probe counter climbs toward the release.
    expect(later.some((e) => e.blockedBy.includes('noUnansweredProbeOnScreen'))).toBe(true)
    expect(Math.max(...later.map((e) => e.probeHeldTurns))).toBeGreaterThanOrEqual(2)
    // and nothing was ever graded — no answer was invented to clear the latch
    expect(later.every((e) => e.gradeSource === 'none')).toBe(true)
  }, 60_000)

  it('the PROSE channel is now visible for the first time', async () => {
    const prose = ['Quick check! Which gives [H+]?', 'A) sqrt(Ka x C)', 'B) Ka x C', 'C) Ka / C'].join('\n')
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: prose }], { probes: [] })
    expect(event(t).modelOfferedProseMcq).toBe(true)
  }, 60_000)

  it('BEHAVIOUR-NEUTRAL: the happy path still reaches verified mastery', async () => {
    const res = await driveTurns(h, POST, Array.from({ length: 8 }, (_, i) => ({
      learnerSays: (mcq: { options: string[] } | null) =>
        mcq ? (mcq.options.find((o) => o.startsWith('At the anode')) ?? mcq.options[0]) : 'ok',
      modelReplies: `Teaching ${i}.`,
    })), { probes: PROBES })
    const m = res.map((t) => (t.body as { mastery?: { verified?: boolean } }).mastery).find((x) => x?.verified)
    expect(m).toMatchObject({ verified: true, checkCorrect: 1, practiceCorrect: 2 })
  }, 60_000)
})
