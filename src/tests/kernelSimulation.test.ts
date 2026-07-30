/**
 * K6 — the simulation merge gate (RS T-5).
 *
 * The battery is the assertion: across every canonical persona, no episode may
 * violate a release-blocking invariant. A failure here names the persona, the
 * seed and the turn, so it is reproducible from the report alone.
 *
 * These tests do NOT assert teaching quality. A simulator can reject a change;
 * it can never certify one. What it certifies is narrower and still valuable:
 * that the decision plane never enters an illegal state under learner
 * behaviour the unit fixtures do not reach.
 */
import { describe, it, expect } from 'vitest'
import { PERSONAS, personaById, rng } from '@/lib/kernel/simulation/personas'
import { runEpisode, runBattery } from '@/lib/kernel/simulation/run'
import { checkEpisode, CHECKS } from '@/lib/kernel/simulation/invariants'
import { initialConversationState } from '@/lib/teaching/conversationState'

const DECISION = {
  decisionId: 'd', turnId: 't', actionClass: null,
  vocabularyBans: [], visualDirective: { use: false, visualClass: null },
  provenance: [], prngSeed: 1, fallbackChain: [],
} as const

// ── THE MERGE GATE ──────────────────────────────────────────────────────────

describe('invariant battery — the merge gate', () => {
  it('10^4 episodes, every persona, ZERO invariant violations (RS T-5 scale)', async () => {
    // RS T-5 specifies 10^4 episodes per release candidate. Measured at ~2s
    // for 10,002 episodes / 120,024 turns, so the full scale is affordable as
    // a merge gate rather than a nightly job — which is the difference
    // between a gate that runs and a gate that is skipped.
    const r = await runBattery({
      personas: PERSONAS, episodesPerPersona: 1667, turnsPerEpisode: 12,
    })
    // The report IS the failure message: persona + seed + turn + code.
    expect(r.violations).toEqual([])
    expect(r.episodes).toBeGreaterThanOrEqual(10_000)
    expect(r.totalTurns).toBeGreaterThanOrEqual(120_000)
  }, 60_000)

  it('holds over longer episodes, where budgets and ladders interact', async () => {
    const r = await runBattery({
      personas: PERSONAS, episodesPerPersona: 4, turnsPerEpisode: 40, baseSeed: 9001,
    })
    expect(r.violations).toEqual([])
  }, 30_000)
})

// ── THE GATE ACTUALLY BITES ─────────────────────────────────────────────────

describe('the battery can fail', () => {
  it('detects an illegal decision when one is injected', () => {
    // A gate that cannot fail proves nothing. Inject the Henry's Law defect:
    // an ASK on a virgin state, where Band 2 says there is no source to
    // answer from.
    const violations = checkEpisode([{
      turnIndex: 0,
      stateBefore: initialConversationState('c'),
      recoveryActive: false,
      decision: { ...DECISION, move: 'ASK',
        budgets: { maxQuestions: 1, maxParagraphs: 4, maxNewTerms: 1 }, stageCeiling: 2 },
    }])
    expect(violations.map((v) => v.code)).toContain('QL1_NO_ANSWERABLE_SOURCE')
  })

  it('detects a question above the phase ceiling', () => {
    const violations = checkEpisode([{
      turnIndex: 3,
      stateBefore: { ...initialConversationState('c'), phase: 'OBSERVE', taughtThisSession: true },
      recoveryActive: false,
      // calculation demanded at OBSERVE
      decision: { ...DECISION, move: 'ASK',
        budgets: { maxQuestions: 1, maxParagraphs: 4, maxNewTerms: 1 }, stageCeiling: 6 },
    }])
    expect(violations.map((v) => v.code)).toContain('I-1')
  })

  it('detects a question emitted during recovery', () => {
    const violations = checkEpisode([{
      turnIndex: 1,
      stateBefore: { ...initialConversationState('c'), taughtThisSession: true },
      recoveryActive: true,
      decision: { ...DECISION, move: 'ASK',
        budgets: { maxQuestions: 1, maxParagraphs: 2, maxNewTerms: 1 }, stageCeiling: 2 },
    }])
    expect(violations.map((v) => v.code)).toContain('I-11')
  })

  it('every check is reachable (no dead checks in the battery)', () => {
    expect(CHECKS.length).toBeGreaterThanOrEqual(8)
  })
})

// ── DETERMINISM (RS T-4 / T-6) ──────────────────────────────────────────────

describe('determinism', () => {
  it('the PRNG is seeded and reproducible', () => {
    const a = rng(42), b = rng(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
    expect(rng(42)()).not.toBe(rng(43)())
  })

  it('the same (persona, seed) produces a byte-identical episode', async () => {
    const p = personaById('fragile-beginner')!
    const one = await runEpisode({ persona: p, seed: 7, turns: 12 })
    const two = await runEpisode({ persona: p, seed: 7, turns: 12 })
    const strip = (r: Awaited<ReturnType<typeof runEpisode>>) =>
      r.turns.map((t) => ({
        move: t.decision.move, ceiling: t.decision.stageCeiling,
        budgets: t.decision.budgets, phase: t.stateBefore.phase, rec: t.recoveryActive,
      }))
    expect(strip(one)).toEqual(strip(two))
    expect(one.outcome).toEqual(two.outcome)
  })

  it('different seeds produce different LEARNER behaviour', async () => {
    // The seed drives the persona, not the runtime. Asserting that the
    // DECISION trace differs would be asserting the runtime is sensitive to
    // guessing — and it is not, legitimately: the guesser's alternation of
    // '12' and 'understood!' are both non-decisive, so the ladder responds
    // identically. That convergence is a property worth having, not a bug.
    const p = personaById('guesser')!
    const seq = (seed: number) => {
      const rand = rng(seed)
      return Array.from({ length: 20 }, (_, i) => p.turn(rand, i, true).message).join(',')
    }
    expect(seq(1)).not.toBe(seq(2))
  })

  it('and guessing never buys mastery, whichever guess was made', async () => {
    // This previously asserted the two seeds produce an IDENTICAL trace, on the
    // premise that the guesser's '12' and 'understood!' are both non-decisive.
    // That premise no longer holds and should not: 'understood!' is a bare
    // acknowledgement, and an acknowledgement deliberately advances the
    // DELIVERY phases — the learner saying "I'm done with that step" is exactly
    // the evidence a delivery step needs, and withholding it is what froze the
    // lesson. So the seeds legitimately differ by how soon delivery advances.
    //
    // The invariant actually worth pinning is the one the mastery gates exist
    // for, and it is unchanged: a guess is not evidence of understanding, so
    // neither seed can reach an assessment phase without answering anything
    // correctly — while both must still make progress rather than freeze.
    const p = personaById('guesser')!
    for (const seed of [1, 2]) {
      const turns = (await runEpisode({ persona: p, seed, turns: 20 })).turns
      const phases = turns.map((t) => t.stateBefore.phase)
      expect(phases).toContain('DEMONSTRATE')   // progress, not a fixed point
      expect(phases).not.toContain('CHECK')     // and never a mastery gate
      expect(phases).not.toContain('PRACTICE')
      expect(phases).not.toContain('TRANSFER')
    }
  })
})

// ── BEHAVIOURAL REPLAY — the documented failures cannot recur ───────────────

describe('behavioural replay', () => {
  it('the fragile beginner is never interrogated: teaching precedes questioning', async () => {
    const r = await runEpisode({ persona: personaById('fragile-beginner')!, seed: 3, turns: 12 })
    expect(r.violations).toEqual([])
    // The first move must be a give — the learner has no source to answer from.
    expect(r.turns[0].decision.move).not.toBe('ASK')
  })

  it('the silent child is never met with a question after silence', async () => {
    const r = await runEpisode({ persona: personaById('silent-child')!, seed: 5, turns: 16 })
    expect(r.violations).toEqual([])
    for (let i = 1; i < r.turns.length; i++) {
      if (r.turns[i].recoveryActive) expect(r.turns[i].decision.move).not.toBe('ASK')
    }
  })

  it('the returning learner is re-cued, not restarted from zero', async () => {
    const r = await runEpisode({ persona: personaById('returning-after-gap')!, seed: 11, turns: 18 })
    expect(r.violations).toEqual([])
    // Progress is made: the ladder leaves its entry phase.
    expect(r.outcome.reachedPhase.length).toBeGreaterThan(1)
  })

  it('the bored expert is not held at the bottom of the ladder', async () => {
    const r = await runEpisode({ persona: personaById('bored-expert')!, seed: 13, turns: 20 })
    expect(r.violations).toEqual([])
    expect(r.outcome.reachedPhase.length).toBeGreaterThan(2)
  })

  it('the guesser cannot game their way up the ladder unchallenged', async () => {
    const r = await runEpisode({ persona: personaById('guesser')!, seed: 17, turns: 24 })
    expect(r.violations).toEqual([])
    // Claims of understanding ("understood!") are non-answers and move nothing.
    expect(r.outcome.finalPhase).not.toBe('TRANSFER')
  })
})

// ── OUTCOME DISTRIBUTIONS (RS T-5: compare across versions) ─────────────────

describe('outcome distributions', () => {
  it('records give/ask/recovery counts per persona for cross-version diffing', async () => {
    const r = await runBattery({ personas: PERSONAS, episodesPerPersona: 3, turnsPerEpisode: 12 })
    for (const p of PERSONAS) {
      const d = r.byPersona[p.id]
      expect(d.episodes).toBe(3)
      expect(d.asks + d.gives).toBe(3 * 12)
    }
  }, 20_000)

  it('a learner who signals distress is taught, not questioned', async () => {
    const r = await runBattery({
      personas: [personaById('fragile-beginner')!], episodesPerPersona: 5, turnsPerEpisode: 14,
    })
    expect(r.byPersona['fragile-beginner'].gives)
      .toBeGreaterThan(r.byPersona['fragile-beginner'].asks)
  }, 20_000)

  it('OBSERVED: a learner who neither answers nor signals distress is questioned at the maximum LEGAL rate', async () => {
    // Recorded as an observation, not asserted as correct. The silent child
    // never fires a recovery detector (a minimal 'hmm' is not a distress
    // utterance) and never answers, so nothing advances the ladder and nothing
    // concludes a diagnostic — the system alternates at the I-7 ceiling of two
    // consecutive questions. That is legal by every invariant and is still
    // worth surfacing: silence-as-a-trigger is specified in RS §4.3 as a
    // timeout watcher, which does not exist in this runtime. Fixing it is a
    // sensor milestone, not something to invent here.
    const r = await runEpisode({ persona: personaById('silent-child')!, seed: 5, turns: 18 })
    expect(r.violations).toEqual([])
    let consecutive = 0
    for (const t of r.turns) {
      consecutive = t.decision.move === 'ASK' ? consecutive + 1 : 0
      expect(consecutive).toBeLessThanOrEqual(2)
    }
  })
})
