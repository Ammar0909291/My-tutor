/**
 * Batch 7a of the Typed Turn Contract migration (design doc §6 Batch 7,
 * D3 — "one variable holding two different facts, distinguished only by
 * line number"): `sessionEpisodeHoisted` is the clearest live instance of
 * that shape. Every read strictly before its ONE post-model reassignment
 * (route.ts, the recovery-signal fold, `applySignalToEpisode(...)`) is the
 * PRE-model episode (`contract.episode.current`, resolved as
 * `resolvedSessionEpisode`); every read at or after it is the POST-model
 * episode, which this session deliberately leaves UNMIGRATED — see the
 * block comment above `resolvedSessionEpisode`'s declaration for why
 * (`TurnDeliveryInput.after.episode` is a permanent compile-time
 * placeholder, not a live value, in the infrastructure Batch 0/1 built).
 * `persistedEpisodeHoisted` and `sessionEpisodeFreshHoisted` are each
 * single-epoch (one write, never reassigned) and fully migrated regardless
 * of read position.
 *
 * This is the exact property the design doc's own risk table warns about
 * for this batch: "a single mis-assignment ... is a genuine teaching
 * change." The test below proves the split is real, not cosmetic — it
 * drives ONE turn through the REAL route and observes BOTH halves of the
 * same fact disagreeing within that single turn:
 *   - PRE-model: a fresh session boundary derives episode phase 'OPENING'
 *     (sessionLifecycle.ts `deriveEpisode`), which is what gates the
 *     "SESSION OPENING" block injected into the system prompt handed to
 *     the model (route.ts, `boundary && sessionEpisodeHoisted.phase !==
 *     'CLOSING'` — this read sits before the resolved-const block and is
 *     unmigrated, but a fresh boundary derives 'OPENING' unconditionally,
 *     so its firing IS the pre-model signature).
 *   - POST-model: `applySignalToEpisode` only advances OPENING -> CORE on
 *     an ANSWERED signal (`signal.correctness !== undefined` — verified by
 *     reading the function; an ordinary "ok" with nothing to grade returns
 *     the episode unchanged, which a first draft of this test discovered
 *     the hard way). A recovery turn's SYNTHETIC signal
 *     (`{correctness: false, confusion: true}`, route.ts's recovery block)
 *     genuinely IS answered, and its own `applySignalToEpisode` call (the
 *     one post-model reassignment this batch deliberately leaves
 *     unmigrated) flips OPENING -> CORE before the turn persists — so the
 *     value written this turn already disagrees with the value the
 *     model's own prompt was built from, within one turn, driven through
 *     the real route with no mocking of the fold logic itself.
 * A test that could not tell these apart would prove nothing about this
 * batch's whole point; this one demonstrates the disagreement directly.
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

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('Typed Turn Contract Batch 7a — episode cluster, real route', () => {
  it('a recovery turn 1: pre-model OPENING (in the prompt) and post-model CORE (in the persisted snapshot) disagree within the same turn', async () => {
    const res = await driveTurns(h, POST, [
      {
        learnerSays: "I'm scared, I don't understand any of this at all",
        modelReplies: 'It is okay, let us slow down.',
      },
    ])
    const [turn1] = res
    expect(turn1.status).toBe(200)
    expect(readLog(turn1, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()

    // PRE-model half — the episode this turn's prompt was built from.
    expect(turn1.systemPrompt).toContain('SESSION OPENING')

    // POST-model half — the episode this SAME turn persisted, moved by the
    // recovery block's synthetic (but genuinely ANSWERED) signal.
    const persistedEpisode = turn1.snapshot.sessionEpisode as { phase?: string } | undefined
    expect(persistedEpisode?.phase).toBe('CORE')
  })

  it('an ordinary turn with nothing to grade leaves the episode at OPENING both before and after (the negative control)', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: "Sure, let's get started." },
    ])
    const [turn1] = res
    expect(turn1.status).toBe(200)
    expect(readLog(turn1, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    expect(turn1.systemPrompt).toContain('SESSION OPENING')
    // `applySignalToEpisode` returns the episode unchanged when
    // `signal.correctness === undefined` (sessionLifecycle.ts) — there is
    // nothing here for the fold to answer, so pre and post genuinely agree
    // on this turn. This is the control the recovery-turn test above needs:
    // without it, "OPENING before, CORE after" could be a fixture artefact
    // rather than a real fold decision.
    const persistedEpisode = turn1.snapshot.sessionEpisode as { phase?: string } | undefined
    expect(persistedEpisode?.phase).toBe('OPENING')
  })

  it('sessionEpisodeFreshHoisted (single-epoch) reaches a consumer far past the resolved-const block', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: "Sure, let's get started." },
    ])
    const [turn1] = res
    expect(turn1.status).toBe(200)
    // The freshness flag is read by `checkBrainCompliance` (route.ts,
    // `isFirstTurnOfEpisode: resolvedSessionEpisodeFresh`) deep past the
    // resolved-const block — proving the single-epoch migration reaches a
    // consumer far from its declaration, not just the nearest one.
    expect(readLog(turn1, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
  })
})

describe('the route wires the episode-cluster resolved consts', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('declares all three resolved consts against the real TurnContract shape', () => {
    expect(ROUTE).toContain('const resolvedSessionEpisode = turnContractShadow?.episode.current ?? sessionEpisodeHoisted')
    expect(ROUTE).toContain('const resolvedPersistedEpisode = turnContractShadow?.episode.persisted ?? persistedEpisodeHoisted')
    expect(ROUTE).toContain('const resolvedSessionEpisodeFresh = turnContractShadow?.episode.fresh ?? sessionEpisodeFreshHoisted')
  })

  it('migrates every pre-model consumer past the block, and leaves every post-model consumer on the raw local', () => {
    // Pre-model consumers, now on the resolved const.
    expect(ROUTE).toContain("closingTurn: resolvedSessionEpisode?.phase === 'CLOSING'")
    expect(ROUTE).toContain('isFirstTurnOfEpisode: resolvedSessionEpisodeFresh')
    expect(ROUTE).toContain('freshSessionBoundary: resolvedSessionEpisodeFresh')
    expect(ROUTE).toContain('persisted: resolvedPersistedEpisode,')
    // Post-model consumers, deliberately unmigrated (no live delivery.after
    // wiring exists yet — see the block comment).
    expect(ROUTE).toContain('if (sessionEpisodeHoisted) {')
    expect(ROUTE).toContain('episodeUpdate = { sessionEpisode: sessionEpisodeHoisted }')
    expect(ROUTE).toContain('lifecycle: sessionEpisodeHoisted?.phase ?? null,')
  })
})
