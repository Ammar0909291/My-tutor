/**
 * Batch 6 of the Typed Turn Contract migration (design doc §6, "authority
 * cluster"): `turnArbitrationHoisted`, `recoveryKeyHoisted`,
 * `excursionActiveHoisted`, `excursionDecisionHoisted`,
 * `excursionTeachingTitleHoisted`, `knowledgeGapHoisted`,
 * `firstLessonActiveHoisted`, `learnerRequestHoisted`,
 * `navigationRequestHoisted`, `claimChallengeActiveHoisted` collapse into
 * `contract.authority`; `lowSignalAckHoisted`/`isBareAckHoisted` collapse
 * into `contract.inbound` (the actual TurnContract shape Batch 0 built,
 * which the design doc's own Batch 6 table row mis-groups under
 * `authority` — resolved against the real shape, not the stale grouping).
 *
 * This cluster feeds turnArbitration.ts's Phase 3 precedence ladder —
 * RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE > TEACH (CLAUDE.md,
 * "Architecture hardening — Series B") — so these three scenarios are
 * exactly what the cluster's data is FOR, driven end to end against the
 * REAL route (not mirrored):
 *   (a) RECOVERY correctly preempts everything else — a distress signal
 *       makes `resolvedTurnArbitration`'s owner RECOVERY, overriding
 *       LEARNER_REQUEST and TEACH and denying AUTHORED_PROBE among others;
 *   (b) an active excursion correctly suppresses a fresh authored-probe
 *       attach — `resolvedExcursionActive` feeds the gate's own
 *       `notExcursion` eligibility term, which must read false and block
 *       the gate the moment the excursion opens;
 *   (c) a genuine LEARNER_REQUEST (explicit "explain differently") makes
 *       `resolvedTurnArbitration`'s owner LEARNER_REQUEST, overriding TEACH.
 * A wrong resolved value in any of these three doesn't just log
 * something wrong — it changes WHICH educational action the turn is
 * allowed to take, per this batch's own safety framing.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog } from './support/turnHarness'

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

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('Typed Turn Contract Batch 6 — authority cluster, real route', () => {
  it('(a) RECOVERY correctly preempts everything else', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation happens at one electrode.' },
      {
        learnerSays: "I'm scared, I don't understand any of this at all",
        modelReplies: 'It is okay, let us slow down.',
      },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [, recoveryTurn] = res
    const arb = readLog(recoveryTurn, '[arbitration]') as
      { owner?: string; overridden?: string[]; denied?: string[] } | null
    expect(arb?.owner).toBe('RECOVERY')
    // Preempts LEARNER_REQUEST and TEACH, and denies AUTHORED_PROBE — the
    // exact safety property `resolvedTurnArbitration` exists to carry.
    expect(arb?.overridden).toContain('TEACH')
    expect(arb?.denied).toContain('AUTHORED_PROBE')
  })

  it('(b) an active excursion correctly suppresses a fresh probe attach', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation happens at one electrode.' },
      {
        learnerSays: 'can you explain how photosynthesis works instead',
        modelReplies: 'Sure, photosynthesis converts light to chemical energy.',
      },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [, excursionTurn] = res
    const ex = readLog(excursionTurn, '[learn/chat] EXCURSION_EVENT') as { kind?: string } | null
    expect(ex?.kind).toBe('open')
    const gate = readLog(excursionTurn, '[gate-eligibility]') as
      { notExcursion?: boolean; eligible?: boolean; blockedBy?: string[] } | null
    // `resolvedExcursionActive` feeding the gate's `notExcursion` term is
    // what must read false the moment the excursion opens — the property
    // this cluster's collapse must not silently break.
    expect(gate?.notExcursion).toBe(false)
    expect(gate?.blockedBy).toContain('notExcursion')
    expect(gate?.eligible).toBe(false)
  })

  it('(c) a genuine LEARNER_REQUEST correctly overrides TEACH', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation happens at one electrode.' },
      {
        learnerSays: 'can you explain that differently please',
        modelReplies: 'Sure, think of it like a battery.',
      },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [, requestTurn] = res
    const arb = readLog(requestTurn, '[arbitration]') as
      { owner?: string; overridden?: string[] } | null
    expect(arb?.owner).toBe('LEARNER_REQUEST')
    expect(arb?.overridden).toContain('TEACH')
  })
})
