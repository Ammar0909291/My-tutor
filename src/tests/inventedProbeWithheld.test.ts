/**
 * THE MODEL DOES NOT GET TO ASK THE GRADED QUESTION WHEN A REVIEWED ONE EXISTS.
 *
 * ── THE MEASURED FAILURE, THREE FOR THREE ───────────────────────────────────
 * `phys.mech.friction` holds FIVE authored, reviewed, gradeable probes. Across
 * two sessions studied as a learner on a real account (2026-09-01), the model
 * wrote three incline items of its own and every one was broken:
 *
 *   run 1  5 kg, 30°, μ_s = 0.5 → keyed 12.5 N. μ·mg·cos30 = 21.2 N.
 *          12.5 is μ·mg·SIN30. Correct answer absent from its own options.
 *   run 2  4 kg, 30°, μ_s = 0.3 → keyed 7.9 N. μ·mg·cos30 = 10.4 N.
 *          Correct answer absent. The learner tapped 7.9 and was told
 *          "That's right."
 *   run 2  the same item again, prose-only, no tag — ungradeable entirely.
 *
 * `gradeMcqAnswer` reads `correctIndex` as ground truth, so an invented key
 * grades exactly as confidently as a reviewed one. `unauthoredKeyGrades` stops
 * such a grade CERTIFYING; it cannot stop the learner being told they are
 * wrong when they are right. The only way to do that is not to ask.
 *
 * ── WHY THE EXISTING PREFERENCE WAS NOT ENOUGH ──────────────────────────────
 * route.ts already had `mcqHoisted = gateMcqHoisted ?? mcqParse.mcq`, with a
 * comment naming this exact danger. It only helps on turns where the gate
 * SUPPLIES a probe; every other turn fell through to the model's item, and all
 * three defects landed there.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `decideModelProbe` / `gateRefusedOnPolicy`, the real arithmetic,
 * and the real route source for the wiring.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { decideModelProbe, gateRefusedOnPolicy } from '@/lib/teaching/inventedProbeGuard'

/** The gate's eight terms, all satisfied. */
const eligible = () => ({
  phaseAllowsProbe: true,
  probeAttachablePhase: true,
  hasMemoryState: true,
  noUnansweredProbeOnScreen: true,
  notFirstLesson: true,
  notExcursion: true,
  arbitrationAllowsProbe: true,
  notClosingTurn: true,
})

describe('the arithmetic, re-derived rather than taken on trust', () => {
  const fMax = (m: number, mu: number, deg: number, g = 10) =>
    mu * m * g * Math.cos((deg * Math.PI) / 180)

  it('run 1: keyed 12.5 N, correct is 21.6 N, and 12.5 is the sin slip', () => {
    expect(fMax(5, 0.5, 30)).toBeCloseTo(21.65, 2)
    expect(0.5 * 5 * 10 * Math.sin(Math.PI / 6)).toBeCloseTo(12.5, 2)
    expect([5, 12.5, 25, 49].some((v) => Math.abs(v - fMax(5, 0.5, 30)) < 1)).toBe(false)
  })

  it('run 2: keyed 7.9 N, correct is 10.4 N, and 10.4 is not on offer', () => {
    expect(fMax(4, 0.3, 30)).toBeCloseTo(10.39, 2)
    expect([4.5, 7.9, 12.0, 15.0].some((v) => Math.abs(v - fMax(4, 0.3, 30)) < 1)).toBe(false)
  })
})

describe('gateRefusedOnPolicy — policy versus capability', () => {
  it('an eligible gate refused nothing', () => {
    expect(gateRefusedOnPolicy(eligible())).toBe(false)
  })

  for (const term of [
    'phaseAllowsProbe', 'probeAttachablePhase', 'noUnansweredProbeOnScreen',
    'notFirstLesson', 'notExcursion', 'arbitrationAllowsProbe', 'notClosingTurn',
  ] as const) {
    it(`${term} is a POLICY refusal — the server said no question`, () => {
      expect(gateRefusedOnPolicy({ ...eligible(), [term]: false })).toBe(true)
    })
  }

  it('hasMemoryState alone is a CAPABILITY gap, never a policy refusal', () => {
    // It means the gate could not look a probe up. That says nothing about
    // whether authored probes exist, so it must not silence the model.
    expect(gateRefusedOnPolicy({ ...eligible(), hasMemoryState: false })).toBe(false)
  })

  it('a policy refusal alongside the capability gap is still policy', () => {
    expect(gateRefusedOnPolicy({
      ...eligible(), hasMemoryState: false, notClosingTurn: false,
    })).toBe(true)
  })

  it('an unknown future term defaults to policy — the safe direction', () => {
    // A new reason the server says "no question" should also silence the
    // model, without anyone having to remember to update this file.
    expect(gateRefusedOnPolicy({ ...eligible(), someNewRule: false })).toBe(true)
  })

  it('is safe on an empty terms object', () => {
    expect(gateRefusedOnPolicy({})).toBe(false)
  })
})

describe('decideModelProbe', () => {
  const base = {
    gateServedAuthoredProbe: false,
    modelOfferedProbe: true,
    authoredProbesExist: null as boolean | null,
    gateDeclinedByPolicy: false,
  }

  it('withholds when authored probes exist — the rule', () => {
    const d = decideModelProbe({ ...base, authoredProbesExist: true })
    expect(d.serve).toBe(false)
    expect(d.reason).toBe('authored-probes-exist')
  })

  it('withholds when the server already ruled out a question this turn', () => {
    const d = decideModelProbe({ ...base, gateDeclinedByPolicy: true })
    expect(d.serve).toBe(false)
    expect(d.reason).toBe('gate-declined-by-policy')
  })

  it('SERVES when nothing reviewed exists — silence is worse', () => {
    // masteryReachability's stated position: "teaching without certification
    // is a degraded outcome; teaching not at all is a failure." A concept
    // below the asset contract must still be able to ask something.
    const d = decideModelProbe({ ...base, authoredProbesExist: false })
    expect(d.serve).toBe(true)
    expect(d.reason).toBe('served-no-alternative')
  })

  it('SERVES when the gate never ran — ignorance is not "none exist"', () => {
    // authoredProbesExist === null. Reading that as false would silence the
    // model on every turn the selector could not run.
    expect(decideModelProbe(base).serve).toBe(true)
  })

  it('knowing beats inferring — availability decides before the refusal', () => {
    // Both signals present and disagreeing: the selector actually ran and
    // found nothing, so serve, even though a policy term was also false.
    const d = decideModelProbe({
      ...base, authoredProbesExist: false, gateDeclinedByPolicy: true,
    })
    expect(d.reason).toBe('gate-declined-by-policy')
    expect(d.serve).toBe(false)
  })

  it('is moot when the gate served an authored probe', () => {
    expect(decideModelProbe({ ...base, gateServedAuthoredProbe: true }).reason)
      .toBe('authored-served')
  })

  it('has nothing to withhold when the model offered nothing', () => {
    expect(decideModelProbe({ ...base, modelOfferedProbe: false }).reason)
      .toBe('no-model-probe')
  })
})

describe('the measured turns, decided', () => {
  it('run 2 T3: friction has five authored probes, so the invented item is withheld', () => {
    expect(decideModelProbe({
      gateServedAuthoredProbe: false,
      modelOfferedProbe: true,
      authoredProbesExist: true,
      gateDeclinedByPolicy: false,
    }).serve).toBe(false)
  })

  it('a concept below the asset contract is unaffected', () => {
    expect(decideModelProbe({
      gateServedAuthoredProbe: false,
      modelOfferedProbe: true,
      authoredProbesExist: false,
      gateDeclinedByPolicy: false,
    }).serve).toBe(true)
  })
})

describe('the chat route applies it', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('withholds as a SEPARATE override, leaving the precedence line intact', () => {
    // Folding the withhold into the attach line broke nine structural tests
    // in other files, every one asserting an invariant this change preserves
    // — the gate's authored probe still outranks the model's tag. The file's
    // own CLOSING override already documents this shape and the reason for
    // it; the first version of this fix ignored that and had to be redone.
    expect(ROUTE).toContain('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
    expect(ROUTE).toMatch(/if \(modelProbeWithheld\) mcqHoisted = null/)
    const attach = ROUTE.indexOf('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
    const withhold = ROUTE.indexOf('if (modelProbeWithheld) mcqHoisted = null')
    expect(attach).toBeGreaterThan(0)
    expect(withhold).toBeGreaterThan(attach)
  })

  it('policy is read from the SAME terms object the log prints', () => {
    // If it re-spelled the conjunction, the decision and its evidence could
    // disagree — the exact drift the gate-eligibility log was added to end.
    expect(ROUTE).toMatch(/gateRefusedOnPolicy\(gateTerms\)/)
  })

  it('availability is recorded only where the selector actually ran', () => {
    expect(ROUTE).toMatch(/authoredProbesExistHoisted = probe !== null/)
  })

  it('a withheld question is stripped from the prose too', () => {
    // Otherwise the learner reads a question with nothing to answer it with.
    expect(ROUTE).toMatch(/const mcqForProseStrip = mcqHoisted \?\? withheldModelMcqHoisted/)
    expect(ROUTE).toMatch(/dropDuplicatedMcqProse\(cleanText, mcqForProseStrip\)/)
  })
})
