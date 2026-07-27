/**
 * C6 — replay theater (SDK-M5).
 *
 * The renderer must show what the kernel ACTUALLY decided. These tests pin
 * that: the transcript is built from the same EpisodeTurn objects the
 * invariant battery checked, violations are never buried, and the engine path
 * is only rendered when it was actually run.
 */
import { describe, it, expect } from 'vitest'
import { runEpisode } from '@/lib/kernel/simulation/run'
import { personaById, PERSONAS } from '@/lib/kernel/simulation/personas'
import { formatReplay, formatTurn, stageJumps } from '@/lib/kernel/simulation/replay'
import type { EpisodeTurn } from '@/lib/kernel/simulation/invariants'

const persona = (id: string) => personaById(id)!

describe('the transcript shows what the kernel decided', () => {
  it('renders one line pair per turn, with the utterance that provoked it', async () => {
    const r = await runEpisode({ persona: persona('fragile-beginner'), seed: 1, turns: 6 })
    const out = formatReplay(r)
    for (const t of r.turns) {
      expect(out).toContain(JSON.stringify(t.message ?? ''))
      expect(out).toContain(t.decision.move ?? '—')
    }
  })

  it('marks recovery turns — the state an author most needs to see', async () => {
    const r = await runEpisode({ persona: persona('fragile-beginner'), seed: 1, turns: 8 })
    const hasRecovery = r.turns.some((t) => t.recoveryActive)
    expect(hasRecovery).toBe(true)
    expect(formatReplay(r)).toContain('[RECOVERY]')
  })

  it('shows the rule path only when asked, and it is the REAL provenance', async () => {
    const r = await runEpisode({
      persona: persona('fragile-beginner'), seed: 1, turns: 6, engineShadow: true,
    })
    const withRules = formatReplay(r, { engine: true, rules: true })
    const without = formatReplay(r, { engine: true })
    expect(withRules).toContain('rules:')
    expect(without).not.toContain('rules:')
    // Every rule id printed is one the engine actually recorded.
    const printed = withRules.match(/B\d\.[\w.-]+/g) ?? []
    const real = new Set(r.engine!.turns.flatMap((t) => t.decision.provenance))
    expect(printed.length).toBeGreaterThan(0)
    for (const id of printed) expect(real.has(id)).toBe(true)
  })
})

describe('violations are never buried', () => {
  it('reports "clean" for a clean episode', async () => {
    const r = await runEpisode({ persona: persona('guesser'), seed: 3, turns: 10 })
    expect(r.violations).toEqual([])
    expect(formatReplay(r)).toContain('INVARIANTS: clean')
  })

  it('names every violation with its turn and code', () => {
    // A synthetic violated turn: a question above the phase ceiling.
    const bad: EpisodeTurn = {
      turnIndex: 4,
      stateBefore: { phase: 'OBSERVE', questionsAskedSinceTeach: 0 } as never,
      recoveryActive: false,
      message: 'go on',
      decision: {
        decisionId: 'd', turnId: 't', move: 'ASK', actionClass: null,
        budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 1 },
        stageCeiling: 7, vocabularyBans: [],
        visualDirective: { use: false, visualClass: null },
        provenance: [], prngSeed: 0, fallbackChain: [],
      },
    }
    const out = formatReplay({
      personaId: 'x', seed: 1, turns: [bad],
      violations: [{ code: 'I-1', turnIndex: 4, detail: 'stageCeiling 7 > phase ceiling 2 at OBSERVE' }],
      outcome: { asks: 1, gives: 0, recoveries: 0, finalPhase: 'OBSERVE', reachedPhase: ['OBSERVE'] },
    })
    expect(out).toContain('INVARIANTS: 1 VIOLATION(S)')
    expect(out).toContain('turn 4')
    expect(out).toContain('I-1')
  })
})

describe('the engine path is only rendered when it was run', () => {
  it('says so rather than printing an empty theatre', async () => {
    const r = await runEpisode({ persona: persona('bored-expert'), seed: 2, turns: 5 })
    expect(formatReplay(r, { engine: true })).toContain('not run with engineShadow')
  })

  it('renders the engine turns when it was', async () => {
    const r = await runEpisode({
      persona: persona('bored-expert'), seed: 2, turns: 5, engineShadow: true,
    })
    const out = formatReplay(r, { engine: true })
    expect(out).toContain('ENGINE (K4 pack)')
    expect(r.engine!.turns).toHaveLength(5)
  })

  it('surfaces engine-vs-adapter divergence on the adapter transcript', async () => {
    const r = await runEpisode({
      persona: persona('guesser'), seed: 5, turns: 8, engineShadow: true,
    })
    expect(formatReplay(r)).toContain('move divergences: 0')
  })
})

describe('question-stage replay', () => {
  it('finds no jumps in a real episode, for every persona', async () => {
    // The assertion this feature exists to make: the ladder is climbed, not
    // skipped (RS §4.10).
    for (const p of PERSONAS) {
      const r = await runEpisode({ persona: p, seed: 11, turns: 14 })
      expect(stageJumps(r.turns), p.id).toEqual([])
    }
  })

  it('DETECTS a skipped phase — the check is not vacuous', () => {
    const turn = (i: number, phase: string): EpisodeTurn => ({
      turnIndex: i, recoveryActive: false, message: '',
      stateBefore: { phase } as never,
      decision: {
        decisionId: 'd', turnId: 't', move: 'ASK', actionClass: null,
        budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 1 },
        stageCeiling: 2, vocabularyBans: [],
        visualDirective: { use: false, visualClass: null },
        provenance: [], prngSeed: 0, fallbackChain: [],
      },
    })
    // One step forward is the ladder working.
    expect(stageJumps([turn(0, 'OBSERVE'), turn(1, 'DEMONSTRATE')])).toEqual([])
    // Two steps forward skips a phase.
    expect(stageJumps([turn(0, 'OBSERVE'), turn(1, 'GUIDE')])).toHaveLength(1)
    // Dropping back is legal and deliberate — a failure moves the learner
    // down the ladder, sometimes several steps.
    expect(stageJumps([turn(0, 'TRANSFER'), turn(1, 'OBSERVE')])).toEqual([])
  })
})

describe('determinism — a replay is reproducible from its seed alone', () => {
  it('two runs of the same seed render byte-identically', async () => {
    const run = async () => formatReplay(
      await runEpisode({ persona: persona('returning-after-gap'), seed: 77, turns: 10, engineShadow: true }),
      { engine: true, rules: true },
    )
    expect(await run()).toBe(await run())
  })

  it('a different seed renders differently — the seed actually drives it', async () => {
    const at = async (seed: number) => formatReplay(
      await runEpisode({ persona: persona('guesser'), seed, turns: 10 }))
    expect(await at(1)).not.toBe(await at(2))
  })
})

describe('formatTurn is total', () => {
  it('renders a turn with no message and no rules', () => {
    const t: EpisodeTurn = {
      turnIndex: 0, recoveryActive: false,
      stateBefore: { phase: 'OBSERVE' } as never,
      decision: {
        decisionId: 'd', turnId: 't', move: null, actionClass: null,
        budgets: { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 1 },
        stageCeiling: 2, vocabularyBans: [],
        visualDirective: { use: false, visualClass: null },
        provenance: [], prngSeed: 0, fallbackChain: [],
      },
    }
    expect(() => formatTurn(t, { rules: true })).not.toThrow()
    expect(formatTurn(t)).toContain('—')
  })
})
