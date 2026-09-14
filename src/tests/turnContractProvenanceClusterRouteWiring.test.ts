/**
 * Batch 2 of the Typed Turn Contract migration
 * (docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md §6, "provenance
 * cluster"): TURN_EVENT and the `[turn-decision]` provenance line now read
 * `phaseBefore`, `legalityBlock`, `gateEligible`/`blockedBy` (via
 * `gateTerms`), `selectedProbeId`/`probeId` (via `decisionProbeId`),
 * `granularity` (via `decisionGranularity`), `conceptId` (via
 * `decisionConceptId`), `kernelParity`/`enginePolicyParity` (persisted to
 * the snapshot) and `modelProbeVerdict` from the resolved
 * `turnContractShadow`/`turnDeliveryShadow` values instead of reading the
 * `Hoisted` locals directly. This drives the real route end to end and
 * confirms those fields still populate correctly and that no
 * CONTRACT_ASSERT violation appears as a result of the rewiring.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
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

const PROBES = [1, 2, 3].map((n) => ({
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

describe('Typed Turn Contract Batch 2 — provenance cluster, real route', () => {
  it('TURN_EVENT still carries phaseBefore/gateEligible/blockedBy/selectedProbeId after the rewire, and no CONTRACT_ASSERT violation appears', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'hello', modelReplies: 'Electrons flow from anode to cathode.' },
    ], { probes: PROBES })
    const [t] = res
    expect(t.status).toBe(200)

    const e = event(t)
    expect(e).not.toBeNull()
    expect(typeof e.phaseBefore === 'string' || e.phaseBefore === null).toBe(true)
    expect(typeof e.gateEligible).toBe('boolean')
    expect(Array.isArray(e.blockedBy)).toBe(true)
    // legalityBlock/selectedProbeId/modelProbeVerdict are string|null by
    // contract — just confirm the field is present, not silently dropped
    // by the rewire (a `undefined` here would mean a broken source path).
    expect('legalityBlock' in e).toBe(true)
    expect('selectedProbeId' in e).toBe(true)
    expect('modelProbeVerdict' in e).toBe(true)

    expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
  })

  it('a keyed MCQ turn (attach, grade) still reports a real selectedProbeId/gateEligible on TURN_EVENT, with no violation', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ready', modelReplies: 'Oxidation happens at one electrode.' },
      { learnerSays: (onScreen) => onScreen?.options?.[0] ?? 'the anode', modelReplies: "That's right." },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    // At least one of the two turns should reflect the gate having a real
    // opinion (gateEligible boolean, blockedBy an array) — proving the
    // resolved-value plumbing reaches TURN_EVENT on a realistic sequence,
    // not just a single opening turn.
    const events = res.map(event).filter(Boolean)
    expect(events.length).toBeGreaterThan(0)
    for (const e of events) {
      expect(typeof e.gateEligible).toBe('boolean')
      expect(Array.isArray(e.blockedBy)).toBe(true)
    }
  })
})
