/**
 * K6 × K4 — the invariant battery, run against the POLICY ENGINE.
 *
 * WHY THIS EXISTS. The K6 battery's merge-gate claim ("10⁴ episodes, zero
 * invariant violations") was true — of the adapter path only. The K4 engine
 * had never been driven by a single persona: every battery turn went through
 * policyStage's ladder delegation, so the one component the masterplan says
 * will eventually own the decision was the one component the merge gate did
 * not cover. An engine promoted on the strength of a battery that never ran
 * it would be promoted on someone else's evidence.
 *
 * The engine is fed from the same kernel artifacts as the adapter path
 * (tsmStep counters, interrupt scan, FOLD's register) and the same Band-2
 * verdict, so every divergence is attributable to the rules. Its decisions
 * then face the SAME invariant checks — not a friendlier copy.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { runBattery, runEpisode } from '@/lib/kernel/simulation/run'
import { PERSONAS, personaById } from '@/lib/kernel/simulation/personas'
import { packRegistry } from '@/lib/brain-compiler'

beforeEach(() => packRegistry.clear())

describe('the engine passes the same battery the adapter passes', () => {
  it('full persona battery: ZERO engine invariant violations', async () => {
    const r = await runBattery({
      personas: PERSONAS, episodesPerPersona: 40, turnsPerEpisode: 12,
      engineShadow: true,
    })
    // The original gate still holds…
    expect(r.violations).toEqual([])
    // …and the engine now faces it too.
    expect(r.engine).toBeDefined()
    expect(r.engine!.violations).toEqual([])
    // Every adapter turn was compared — the engine ran on all of them.
    expect(r.engine!.turnsCompared).toBe(r.totalTurns)
  })

  it('long-horizon episodes: engine still clean at 40 turns', async () => {
    const r = await runBattery({
      personas: PERSONAS, episodesPerPersona: 4, turnsPerEpisode: 40,
      baseSeed: 9001, engineShadow: true,
    })
    expect(r.violations).toEqual([])
    expect(r.engine!.violations).toEqual([])
  })

  it('ZERO move divergence between the engine and the adapter path', async () => {
    // Measured, then pinned — not bounded. Across every persona, every seed
    // and every turn of the battery, the engine's move equals the adapter
    // path's move. This is the simulator's half of the K4 promotion evidence
    // (ladderParity.test.ts proves rule-level parity under equal inputs;
    // this proves it holds when both paths are fed by the REAL stage
    // pipeline — sensing, folding, interrupt scan, TSM counters — over
    // adversarial persona trajectories). The half a simulator cannot supply,
    // real learner traffic, remains the review gate.
    const r = await runBattery({
      personas: PERSONAS, episodesPerPersona: 40, turnsPerEpisode: 12,
      engineShadow: true,
    })
    expect(r.engine!.turnsCompared).toBe(2880)
    expect(r.engine!.moveDivergences).toBe(0)
  })

  it('per-episode: engine RECOVER on every interrupt turn, zero questions', async () => {
    const r = await runEpisode({
      persona: personaById('fragile-beginner')!, seed: 7, turns: 20, engineShadow: true,
    })
    expect(r.engine!.violations).toEqual([])
    // Recovery turns exist for this persona (its early non-answers include
    // distress utterances the interrupt scan detects)…
    const recoveryTurns = r.turns.filter((t) => t.recoveryActive).map((t) => t.turnIndex)
    expect(recoveryTurns.length).toBeGreaterThan(0)
    // …the adapter chose RECOVER on each…
    for (const t of r.turns) {
      if (t.recoveryActive) expect(t.decision.move, `turn ${t.turnIndex}`).toBe('RECOVER')
    }
    // …and the engine agreed on every one of them: a recovery turn where the
    // engine chose anything else would appear as a move divergence at that
    // index, and none does. (Engine questions-during-recovery would also be
    // an I-11 violation, asserted empty above — two independent witnesses.)
    const divergedAt = new Set(r.engine!.moveDivergences.map((d) => d.turnIndex))
    for (const idx of recoveryTurns) expect(divergedAt.has(idx), `turn ${idx}`).toBe(false)
  })

  it('is deterministic — engine shadow results replay byte-identically', async () => {
    const run = () => runEpisode({
      persona: personaById('false-advanced-adult')!, seed: 42, turns: 15, engineShadow: true,
    })
    const [a, b] = [await run(), await run()]
    expect(JSON.stringify(a.engine!.moveDivergences)).toBe(JSON.stringify(b.engine!.moveDivergences))
    expect(a.engine!.violations).toEqual(b.engine!.violations)
  })

  it('engineShadow off ⇒ result shape unchanged (backward compatibility)', async () => {
    const r = await runEpisode({ persona: PERSONAS[0], seed: 1, turns: 8 })
    expect(r.engine).toBeUndefined()
  })
})
