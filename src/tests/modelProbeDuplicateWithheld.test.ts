/**
 * A LEARNER'S QUESTION MUST NOT COME BACK VERBATIM.
 *
 * ── MEASURED (real-student session, 2026-09, live production account) ───────
 * `excludeProbeStem` (the gate's own authored-probe selector) already
 * guarantees a fresh probe every time — but it is never consulted for a
 * MODEL-WRITTEN `<!--MCQ-->` tag, which does not go through selection at
 * all. In a Rhetorical Appeals lesson (a concept with a real authored-probe
 * coverage gap, so `decideModelProbe`'s existing rules let the model's own
 * item through), the model confirmed a just-graded correct answer ("That's
 * right.") and, in the SAME reply, wrote out the identical bike-lane/pathos
 * question it had asked two turns earlier — word for word, both options
 * included.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────
 * `decideModelProbe` gains one optional input, `modelProbeAlreadyAsked`,
 * computed with `hasAskedMcq` (the exact fingerprint check
 * `excludeProbeStem` already uses) against the model's own offered
 * question. When true, the model's probe is withheld regardless of every
 * other reason it would otherwise have been served — asking the identical
 * question again is never useful, in any phase.
 *
 * ── WHAT IS DELIBERATELY UNCHANGED ───────────────────────────────────────
 * Near-identical questions on the SAME misconception with a genuinely
 * DIFFERENT worked example (the "pail"/"container" idiom-fixedness checks,
 * the "bike lane"/"park" pathos checks) are legitimate reinforcement
 * practice, not duplicates — `hasAskedMcq`'s fingerprint is the question
 * TEXT itself, so two textually different questions never collide here.
 * Authored-probe selection (`excludeProbeStem`) is completely untouched.
 * Mastery-gate eligibility, grading, and every other verdict this module
 * already returns are unchanged.
 */
import { describe, it, expect } from 'vitest'
import { decideModelProbe } from '@/lib/teaching/inventedProbeGuard'

const BASE = {
  probeWouldCountThisPhase: true,
  gateServedAuthoredProbe: false,
  modelOfferedProbe: true,
  authoredProbesExist: false as boolean | null,
  gateDeclinedByPolicy: false,
}

describe('a duplicate model-offered question is withheld', () => {
  it('overrides "served-no-alternative" — the exact measured shape', () => {
    // Without the duplicate flag, no authored probes exist and the gate
    // did not decline by policy, so the model's item would normally serve.
    const withoutFlag = decideModelProbe(BASE)
    expect(withoutFlag).toEqual({ serve: true, reason: 'served-no-alternative' })

    const withFlag = decideModelProbe({ ...BASE, modelProbeAlreadyAsked: true })
    expect(withFlag).toEqual({ serve: false, reason: 'model-probe-already-asked' })
  })

  it('overrides even when authored probes DO exist for this concept', () => {
    const r = decideModelProbe({ ...BASE, authoredProbesExist: true, modelProbeAlreadyAsked: true })
    expect(r).toEqual({ serve: false, reason: 'model-probe-already-asked' })
  })

  it('overrides even when the gate declined by policy', () => {
    const r = decideModelProbe({ ...BASE, gateDeclinedByPolicy: true, modelProbeAlreadyAsked: true })
    expect(r).toEqual({ serve: false, reason: 'model-probe-already-asked' })
  })

  it('fires regardless of phase — a repeat is never useful, not just at the gate', () => {
    const r = decideModelProbe({ ...BASE, probeWouldCountThisPhase: false, modelProbeAlreadyAsked: true })
    expect(r).toEqual({ serve: false, reason: 'model-probe-already-asked' })
  })
})

describe('nothing else changes', () => {
  it('omitting the field reproduces the exact prior behaviour', () => {
    const r = decideModelProbe(BASE)
    expect(r).toEqual({ serve: true, reason: 'served-no-alternative' })
  })

  it('explicitly false behaves exactly like omitted', () => {
    const r = decideModelProbe({ ...BASE, modelProbeAlreadyAsked: false })
    expect(r).toEqual({ serve: true, reason: 'served-no-alternative' })
  })

  it('the gate serving an authored probe still wins first, same reason as before', () => {
    const r = decideModelProbe({ ...BASE, gateServedAuthoredProbe: true, modelProbeAlreadyAsked: true })
    // gateServedAuthoredProbe is checked first — the model's item is moot
    // either way, but the REPORTED reason should not silently change.
    expect(r).toEqual({ serve: false, reason: 'authored-served' })
  })

  it('no model probe offered at all is still "no-model-probe", not the new reason', () => {
    const r = decideModelProbe({ ...BASE, modelOfferedProbe: false, modelProbeAlreadyAsked: true })
    expect(r).toEqual({ serve: false, reason: 'no-model-probe' })
  })
})

describe('the route actually wires modelProbeAlreadyAsked from a real fingerprint check', () => {
  const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string

  it('computes it from hasAskedMcq against the model\'s own question, not a hardcoded value', () => {
    expect(ROUTE).toMatch(/modelProbeAlreadyAsked: mcqParse\.mcq !== null && teachingHistoryHoisted !== null/)
    expect(ROUTE).toMatch(/hasAskedMcqForModelProbe\(teachingHistoryHoisted, mcqParse\.mcq\.question\)/)
  })
})
