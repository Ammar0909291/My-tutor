/**
 * Batch 7b of the Typed Turn Contract migration (design doc §6 Batch 7,
 * D3): `capabilityStateHoisted` is the second genuinely double-duty field.
 * Every read strictly before its ONE post-model reassignment
 * (`capMod2.foldCapabilityState(...)`, inside the K5 output-verifier gate)
 * is the PRE-model capability state (`contract.capability.stateBefore`,
 * resolved as `resolvedCapabilityStateBefore`); the one read at or after it
 * is left UNMIGRATED — see the block comment above
 * `resolvedCapabilityStateBefore`'s declaration in route.ts for why
 * (`TurnDeliveryInput.after.capability` is the same permanent compile-time
 * placeholder Batch 7a's `resolvedSessionEpisode` block already names).
 *
 * ── WHY THIS FILE HAS NO "PRE vs POST DISAGREE" TEST, UNLIKE 7a's ─────────
 * The ONE post-model reassignment sits entirely inside
 * `if (runFullVerifier)` — the K5 composed output verifier, which
 * CLAUDE.md's own "Physics Teacher Migration Architecture" section records
 * as OFF in production (`eosFlags.outputVerifier`, disabled because "V-Q2
 * makes legitimate turns unreachable"). This session's non-goals
 * explicitly forbid re-enabling any verifier flag. So there is no way to
 * drive a real pre/post DIVERGENCE for this specific local without
 * violating that non-goal — reported here rather than guessed around, per
 * the task's own instruction to say so explicitly when this happens.
 *
 * What IS proven instead, end to end through the real route: the PRE-model
 * fold — a learner's stated inability ("I can't do fractions"),
 * server-detected via `detectStatedInability` and folded into
 * `capabilityStateHoisted` before the contract compiles (route.ts ~L3289-
 * 3297) — reaches `resolvedCapabilityStateBefore` and, because the verifier
 * is off, is exactly what the turn PERSISTS (the one deliberately-deferred
 * post-model read, ~L10692-10693, sees the SAME value it would have seen
 * before this migration). This is the strongest available proof that the
 * migration is live-wired rather than vacuous, given the constraint above.
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

describe('Typed Turn Contract Batch 7b — capability cluster, real route', () => {
  it('a stated inability, folded pre-model, reaches the persisted snapshot unchanged (the verifier is off)', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: "I can't do fractions", modelReplies: "That's okay, let's work on it together." },
    ])
    const [turn1] = res
    expect(turn1.status).toBe(200)
    expect(readLog(turn1, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()

    const capabilities = turn1.snapshot.capabilities as
      Record<string, { status?: string }> | undefined
    expect(capabilities?.fractions?.status).toBe('STATED_NO')
  })

  it('an ordinary turn with nothing stated leaves no capability record at all (the negative control)', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: "Sure, let's get started." },
    ])
    const [turn1] = res
    expect(turn1.status).toBe(200)
    expect(readLog(turn1, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    const capabilities = turn1.snapshot.capabilities as Record<string, unknown> | undefined
    expect(capabilities?.fractions).toBeUndefined()
  })
})

describe('the route wires the capability-cluster resolved const', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('declares the resolved const against the real TurnContract shape', () => {
    expect(ROUTE).toContain('const resolvedCapabilityStateBefore = turnContractShadow?.capability.stateBefore ?? capabilityStateHoisted')
  })

  it('migrates every pre-model consumer past the block, and leaves the one post-model consumer on the raw local', () => {
    expect(ROUTE).toContain('noCapabilities: resolvedCapabilityStateBefore')
    expect(ROUTE).toContain(").noCapabilities(resolvedCapabilityStateBefore)")
    // Typed Turn Contract Batch 8 (2026-09-15): `requiredCapabilitiesHoisted`
    // is now `resolvedRequiredCapabilities` here too (single write, ~L3299,
    // well before the L5865 compile point). Old assertion (kept verbatim, no
    // longer matches source):
    //   expect(ROUTE).toContain('if (resolvedCapabilityStateBefore && requiredCapabilitiesHoisted.length > 0) {')
    expect(ROUTE).toContain('if (resolvedCapabilityStateBefore && resolvedRequiredCapabilities.length > 0) {')
    expect(ROUTE).toContain('capabilityStateHoisted = capMod2.foldCapabilityState(resolvedCapabilityStateBefore, obs)')
    // The deliberately-unmigrated post-model half.
    expect(ROUTE).toContain('if (capabilityStateHoisted && Object.keys(capabilityStateHoisted).length > 0) {')
    expect(ROUTE).toContain('conversationStateUpdate.capabilities = capabilityStateHoisted')
  })

  it('the one post-model reassignment is gated behind the (off-by-default) K5 verifier flag', () => {
    const runFullVerifierAt = ROUTE.indexOf('const runFullVerifier = eosFlags.outputVerifier')
    const ifRunFullVerifierAt = ROUTE.indexOf('if (runFullVerifier) {')
    const reassignAt = ROUTE.indexOf(
      'capabilityStateHoisted = capMod2.foldCapabilityState(resolvedCapabilityStateBefore, obs)',
    )
    expect(runFullVerifierAt).toBeGreaterThan(-1)
    expect(ifRunFullVerifierAt).toBeGreaterThan(runFullVerifierAt)
    expect(reassignAt).toBeGreaterThan(ifRunFullVerifierAt)
    // Exactly one `if (runFullVerifier) {` gate in the whole file — if a
    // second is ever added, this assumption needs re-checking, not silently
    // drifting. (The bare phrase `if (runFullVerifier)` also appears once
    // more, inside this migration's own explanatory comment above the
    // resolved const — matched with the trailing brace to count code only.)
    expect(ROUTE.match(/if \(runFullVerifier\) \{/g)?.length).toBe(1)
  })
})
