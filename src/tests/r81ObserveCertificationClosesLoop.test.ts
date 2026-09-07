/**
 * R81 — CLOSES THE LOOP: PHASE 6 REQUIREMENT #11.
 *
 * ── WHY THIS FILE EXISTS SEPARATELY ─────────────────────────────────────────
 * `demonstrateAuthoredProbeSubstitution.test.ts` proves the SERVING side: at
 * OBSERVE with surplus, the gate attaches an authored probe instead of the
 * model's invented one. `certificationAnswerSource.test.ts` proves the
 * HARNESS side: `resolveAnswer` matches a served question against the
 * authored corpus by stem text. Neither file drives BOTH halves together —
 * so neither one, alone, proves the actual claim the remediation task asked
 * for: "the original 81 failure shapes no longer terminate as UNMEASURED
 * solely because of missing authored-match when an eligible authored probe
 * exists."
 *
 * This file drives that exact seam: the real `probeToMcq` -> `mcqForClient`
 * conversion (what a real HTTP response body carries) feeding the real
 * `resolveAnswer` (what the certification harness calls on that body),
 * pre- and post-fix, for the identical OBSERVE turn-1 shape the Mohd Physics
 * Tier-A run actually hit (79 concepts, phaseBeforeTurn OBSERVE,
 * `no-authored-match`, 4-12 ACTIVE probes each).
 */
import { describe, it, expect } from 'vitest'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { mcqForClient } from '@/lib/teaching/mcq'
import { mayAttachProbeBelowGuide } from '@/lib/teaching/masteryReachability'
import { indexFrom, resolveAnswer } from '../../scripts/certification/answerSource'

/** Shape of an authored production probe, as `findBestProbe` returns it. */
const AUTHORED_PROBE = {
  conceptId: 'phys.mech.newtons-first-law',
  stem: 'A puck slides across frictionless ice. What happens to its velocity?',
  choices: [
    { text: 'It stays constant', isCorrect: true },
    { text: 'It slowly decreases', isCorrect: false },
    { text: 'It increases', isCorrect: false },
    { text: 'It drops to zero instantly', isCorrect: false },
  ],
}

/** What the model invents on an OBSERVE turn when nothing authoritative is
 *  attached — no assetId, no corpus entry, unresolvable by construction. */
const INVENTED_OBSERVE_MCQ = {
  question: 'Why do you think the puck keeps moving?',
  options: ['Because nothing is slowing it down', 'Because it wants to move', 'Because ice pushes it'],
  correctIndex: 0,
}

describe('R81 closes the loop: an eligible authored probe at OBSERVE now certifies', () => {
  const corpus = [AUTHORED_PROBE]
  const index = indexFrom(corpus)

  it('PRE-FIX: the model-invented OBSERVE question is unresolvable — this IS the 81-concept failure shape', () => {
    // No gate substitution below GUIDE existed before E1/R81 — the model's
    // own question, with no authored match, is what the harness received.
    const r = resolveAnswer(INVENTED_OBSERVE_MCQ, index)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.reason).toBe('no-authored-match')
  })

  it('POST-FIX: at OBSERVE with surplus (pool 4), the gate substitutes the authored probe, and it certifies', () => {
    // Mirrors the real serving decision: phase OBSERVE + move 'ask' opens the
    // gate (route.ts), the surplus rule clears at pool 4, so the AUTHORED
    // probe — not the model's invention — is what gets served.
    const poolSize = 4
    expect(mayAttachProbeBelowGuide('OBSERVE', poolSize)).toBe(true)

    const authoredMcq = probeToMcq(AUTHORED_PROBE)
    expect(authoredMcq).not.toBeNull()

    // This is the exact shape a real HTTP response body carries — no
    // correctIndex, no assetId, question + options only.
    const wireShape = mcqForClient(authoredMcq)
    expect(wireShape).not.toBeNull()

    const r = resolveAnswer(wireShape, index)
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.optionText).toBe('It stays constant')
      expect(r.conceptId).toBe('phys.mech.newtons-first-law')
    }
  })

  it('below the surplus floor (pool 3), the gate declines and the same unresolvable shape recurs — unchanged, not regressed', () => {
    // The safety property this whole change depends on: a bare-contract
    // concept is not made WORSE. Below the floor, OBSERVE still serves
    // whatever the model invents, which the harness still cannot resolve —
    // exactly the pre-fix outcome, not a new failure mode.
    expect(mayAttachProbeBelowGuide('OBSERVE', 3)).toBe(false)
    const r = resolveAnswer(INVENTED_OBSERVE_MCQ, index)
    expect(r.ok).toBe(false)
  })

  it('a served-but-wrong-option answer still fails honestly — substitution does not loosen grading', () => {
    const authoredMcq = probeToMcq(AUTHORED_PROBE)
    const wireShape = mcqForClient(authoredMcq)!
    // Corrupt what a learner supposedly picked — should never resolve to the
    // authored correct answer by accident.
    const tampered = { question: wireShape.question, options: ['A fabricated option'] }
    const r = resolveAnswer(tampered, index)
    expect(r.ok).toBe(false)
  })
})
