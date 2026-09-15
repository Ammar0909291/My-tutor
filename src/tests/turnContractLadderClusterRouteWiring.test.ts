/**
 * Batch 7c of the Typed Turn Contract migration (design doc §6 Batch 7, the
 * final and largest sub-commit): `conversationStateHoisted`,
 * `evidenceMoveHoisted`, `objectiveStateHoisted` collapse into
 * `contract.ladder`.
 *
 * ── A REAL SURPRISE, FOUND BY TRACING NOT ASSUMED ─────────────────────────
 * `conversationStateHoisted` (86 references, the widest local in the file)
 * turned out NOT to be a D3 double-duty field in the shape 7a/7b's
 * (`sessionEpisodeHoisted`/`capabilityStateHoisted`) took — it has exactly
 * ONE write, well before the contract compiles, and is NEVER reassigned
 * again anywhere in route.ts. The "before/after" split for the ladder is
 * realised across TWO SEPARATE locals instead of one field mutated in
 * place: `conversationStateAfterTurnHoisted` (declared null, written by the
 * fold) is ALREADY the hand-made post-model twin — exactly what
 * `persistedEpisodeHoisted` was for the episode cluster in 7a. It needed no
 * work this batch.
 *
 * `evidenceMoveHoisted` and `objectiveStateHoisted` are each single-epoch
 * too (one write, never reassigned) — fully migrated regardless of how
 * late in the file they're read.
 *
 * `masteryGatePendingHoisted`, `masteryCompletionSuppressedHoisted`,
 * `turnHistoryUpdateHoisted`, `lessonCompletionHoisted` get ZERO resolved
 * consts — none has a corresponding CONTRACT field (verified against
 * turnContract.ts's `ladder` group directly), and their only
 * representation, `delivery.completion.*`/`delivery.after.*`, is the same
 * permanently-unpopulated placeholder 7a's `resolvedSessionEpisode` block
 * comment names. Left entirely on their raw locals.
 *
 * ── THE PRE/POST DIVERGENCE, PROVEN THROUGH THE REAL ROUTE ────────────────
 * A fresh session's very first turn starts the conversation ladder at
 * OBSERVE (`initialConversationState`) and — for an ordinary answered-ish
 * turn with nothing to grade — the SAME turn's fold still advances the
 * DELIVERY half of the ladder to DEMONSTRATE before persisting (measured
 * directly against the harness during 7a's own investigation). TURN_EVENT
 * carries both halves in one log line: `phaseBefore` (from
 * `resolvedPhaseBeforeTurn`, itself `conversationStateHoisted?.phase` read
 * once, Batch 2) and `phaseAfter` (from `conversationStateAfterTurnHoisted`,
 * the post-fold twin). A test that could not show these differ within one
 * turn would prove nothing about why this split exists.
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

describe('Typed Turn Contract Batch 7c — ladder cluster, real route', () => {
  it('turn 1: pre-model OBSERVE and post-model DEMONSTRATE disagree within the same turn (TURN_EVENT)', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: "Sure, let's get started." },
    ])
    const [turn1] = res
    expect(turn1.status).toBe(200)
    expect(readLog(turn1, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()

    const event = readLog(turn1, '[learn/chat] TURN_EVENT=') as
      { phaseBefore?: string; phaseAfter?: string } | null
    expect(event?.phaseBefore).toBe('OBSERVE')
    expect(event?.phaseAfter).toBe('DEMONSTRATE')

    // Confirms the same divergence directly in the persisted snapshot, not
    // just the log line.
    const persistedLadder = turn1.snapshot.conversationState as { phase?: string } | undefined
    expect(persistedLadder?.phase).toBe('DEMONSTRATE')
  })
})

describe('the route wires the ladder-cluster resolved consts', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('declares all three resolved consts against the real TurnContract shape', () => {
    expect(ROUTE).toContain('const resolvedConversationState = turnContractShadow?.ladder.state ?? conversationStateHoisted')
    expect(ROUTE).toContain('const resolvedEvidenceMove = turnContractShadow?.ladder.evidenceMove ?? evidenceMoveHoisted')
    expect(ROUTE).toContain('const resolvedObjectiveState = turnContractShadow?.ladder.objective ?? objectiveStateHoisted')
  })

  it('migrates the rederiver fold sites (the highest-risk consumers) to the resolved const', () => {
    expect(ROUTE).toContain('const ladderConceptIdForRederive = resolvedConversationState.conceptId')
    expect(ROUTE).toContain('advanceConversationState(resolvedConversationState, turnEvidenceForLadder)')
    expect(ROUTE).toContain('const fallbackLadderConceptId = resolvedConversationState.conceptId')
  })

  it('conversationStateAfterTurnHoisted needed no work — it was already the post-model twin', () => {
    // Its one write site is untouched by this batch.
    expect(ROUTE).toContain('conversationStateAfterTurnHoisted = excursionFrozeLadderThisTurn')
  })

  it('the four no-CONTRACT-field locals are deliberately left on their raw locals', () => {
    expect(ROUTE).toContain('gatePending: masteryGatePendingHoisted')
    expect(ROUTE).toContain('completionSuppressed: masteryCompletionSuppressedHoisted')
    expect(ROUTE).toContain('...(turnHistoryUpdateHoisted ?? {})')
    expect(ROUTE).toContain('lessonComplete: lessonCompletionHoisted ?? undefined')
    // None of the four ever got a resolved const of their own.
    // Typed Turn Contract Batch 8 (2026-09-15): the last check is now anchored
    // to the exact declaration rather than a bare substring — Batch 8 added
    // `resolvedLessonCompletionRespectsNewIntent` (a real const, for the
    // DIFFERENT field `lessonCompletionRespectsNewIntentHoisted`), which
    // legitimately contains "resolvedLessonCompletion" as a name prefix. The
    // invariant this line protects — `lessonCompletionHoisted` itself never
    // got a resolved const — is unchanged and still holds.
    expect(ROUTE).not.toContain('resolvedMasteryGatePending')
    expect(ROUTE).not.toContain('resolvedMasteryCompletionSuppressed')
    expect(ROUTE).not.toContain('resolvedTurnHistoryUpdate')
    expect(ROUTE).not.toContain('const resolvedLessonCompletion =')
  })

  it('the pre-model-only reads before the block stay on the raw locals', () => {
    // The contract-input source line itself must keep constructing the
    // contract FROM the raw locals, never from its own resolved consts.
    expect(ROUTE).toMatch(/evidenceMove: evidenceMoveHoisted, objective: objectiveStateHoisted,/)
  })
})
