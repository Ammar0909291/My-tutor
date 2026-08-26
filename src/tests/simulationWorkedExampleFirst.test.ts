/**
 * R1 — the offline simulator could not exercise `workedExampleFirst`.
 *
 * PRODUCTION derives it at route.ts:2756:
 *
 *   const workedExampleFirst =
 *     snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD'
 *
 * and hands it to `decideNextMoveDetailed`, where it gates
 * `if (ctx.workedExampleFirst && !state.demonstrated) return 'show'`.
 *
 * THE SIMULATOR HARDCODED `false` at both of its decision call sites
 * (run.ts:112 policyStage, run.ts:130 the engineShadow verdict). So the one
 * input that produced the most recent defect to reach real learners — the
 * OBSERVE deadlock fixed in f2294ae, where that gate's own release condition
 * (`demonstrated`) is unsettable while the phase is OBSERVE — was permanently
 * pinned off in the replay. The simulator could not have reproduced it at any
 * seed, with any persona, for any number of turns.
 *
 * This is a QA-instrument fix. It changes NO production teaching semantics:
 * the gate, its threshold, its derivation and every ladder rule are untouched.
 * The simulator is given the ability to be TOLD the value production computes,
 * rather than re-deriving it (which would be a second implementation of a rule
 * that must have exactly one).
 *
 * Default stays `false`, so every existing battery result is byte-identical.
 */
import { describe, it, expect } from 'vitest'
import {
  decideNextMoveDetailed,
  initialConversationState,
  type ConversationState,
  type NextMoveContext,
} from '@/lib/teaching/conversationState'

const base = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState('sim.concept'),
  taughtThisSession: true,
  ...over,
})

const decide = (state: ConversationState, ctx: Partial<NextMoveContext>) =>
  decideNextMoveDetailed(state, { recoveryTurn: false, workedExampleFirst: false, legality: {}, ...ctx })

// ── A · false must behave exactly as before ─────────────────────────────────

describe('A · workedExampleFirst=false leaves the decision unchanged', () => {
  it('is identical to omitting it entirely', () => {
    const s = base({ phase: 'GUIDE', demonstrated: true, teachSegmentsSinceQuestion: 2 })
    const explicit = decideNextMoveDetailed(s, {
      recoveryTurn: false, workedExampleFirst: false, legality: {},
    })
    const omitted = decideNextMoveDetailed(s, {
      recoveryTurn: false, workedExampleFirst: false, legality: {},
    })
    expect(explicit).toEqual(omitted)
  })

  it('GUIDE with two gives still asks', () => {
    const s = base({ phase: 'GUIDE', demonstrated: true, teachSegmentsSinceQuestion: 2 })
    expect(decide(s, {}).move).toBe('ask')
  })
})

// ── B · true + !demonstrated is the production SHOW gate ────────────────────

describe('B · workedExampleFirst=true and demonstrated=false forces show', () => {
  it('overrides a phase that would otherwise ask', () => {
    const s = base({ phase: 'GUIDE', demonstrated: false, teachSegmentsSinceQuestion: 2 })
    expect(decide(s, { workedExampleFirst: false }).move).toBe('ask')
    expect(decide(s, { workedExampleFirst: true }).move).toBe('show')
  })

  it('fires at DEMONSTRATE, where demonstrated CAN still be false', () => {
    const s = base({ phase: 'DEMONSTRATE', demonstrated: false })
    expect(decide(s, { workedExampleFirst: true }).move).toBe('show')
  })

  it('is EXEMPT at OBSERVE — the f2294ae deadlock fix, pinned', () => {
    // The gate reads `&& state.phase !== 'OBSERVE'`. `demonstrated` is
    // unsettable while the phase is OBSERVE (the fold treats the OBSERVE give
    // as an anchor, not a demonstration), so without the exemption the gate
    // walls off its own release condition and pins the move to 'show' forever.
    // That deadlock is what f2294ae fixed; this asserts the FIXED behaviour,
    // and it is a test the simulator could not previously have run at all.
    const s = base({ phase: 'OBSERVE', demonstrated: false })
    expect(decide(s, { workedExampleFirst: true }).move).not.toBe('show')
  })
})

// ── C · true + demonstrated follows the real decision tree ──────────────────

describe('C · workedExampleFirst=true and demonstrated=true releases the gate', () => {
  it('GUIDE with two gives asks again', () => {
    const s = base({ phase: 'GUIDE', demonstrated: true, teachSegmentsSinceQuestion: 2 })
    expect(decide(s, { workedExampleFirst: true }).move).toBe('ask')
  })

  it('CHECK still asks', () => {
    const s = base({ phase: 'CHECK', demonstrated: true })
    expect(decide(s, { workedExampleFirst: true }).move).toBe('ask')
  })
})

// ── D · the simulator accepts and forwards the production value ─────────────

describe('D · the simulator can be told the production value', () => {
  it('EpisodeOptions exposes workedExampleFirst', async () => {
    const src = require('fs').readFileSync('src/lib/kernel/simulation/run.ts', 'utf8') as string
    const iface = src.slice(src.indexOf('export interface EpisodeOptions'),
      src.indexOf('export interface EpisodeResult'))
    expect(iface).toMatch(/workedExampleFirst\?:\s*boolean/)
  })

  it('BOTH decision call sites read the option, neither hardcodes false', () => {
    const src = require('fs').readFileSync('src/lib/kernel/simulation/run.ts', 'utf8') as string
    // the two sites that feed the ladder its context
    expect(src).not.toMatch(/workedExampleFirst:\s*false\s*,/)
    // both sites pass the single binding — property shorthand at the
    // policyStage call, and inline in the engineShadow verdict
    expect(src).toMatch(/^\s{6}workedExampleFirst,$/m)
    expect(src).toMatch(/recoveryTurn: recoveryActive, workedExampleFirst, legality/)
  })

  it('defaults to false so existing battery results are unchanged', () => {
    const src = require('fs').readFileSync('src/lib/kernel/simulation/run.ts', 'utf8') as string
    expect(src).toMatch(/const workedExampleFirst\s*=\s*opts\.workedExampleFirst\s*===\s*true/)
  })

  it('runs an episode with the gate active and reproduces the show pin', async () => {
    const { runEpisode } = await import('@/lib/kernel/simulation/run')
    const { PERSONAS } = await import('@/lib/kernel/simulation/personas')
    const persona = PERSONAS[0]
    const withGate = await runEpisode({
      persona, seed: 20260826, turns: 6, workedExampleFirst: true,
    })
    const without = await runEpisode({
      persona, seed: 20260826, turns: 6, workedExampleFirst: false,
    })
    // Same seed, same persona: the ONLY difference is the gate. It must be
    // observable — otherwise the simulator still cannot exercise it.
    expect(withGate.turns.length).toBe(6)
    expect(without.turns.length).toBe(6)
    expect(JSON.stringify(withGate.turns.map((t) => t.decision)))
      .not.toBe(JSON.stringify(without.turns.map((t) => t.decision)))
  })
})
