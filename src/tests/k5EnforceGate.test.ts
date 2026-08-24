/**
 * PHASE 4 · F — K5 output verifier: the enforce-mode evaluation framework.
 *
 * This file does NOT enable enforce mode and does not make any rule stricter.
 * It validates the measurement process the masterplan already specifies
 * ("zero false-REJECT on a 500-turn recorded corpus at enforce-time") so that
 * the decision to enforce is a test result rather than a judgement call.
 *
 * THE THREE THINGS THAT HAVE TO BE TRUE, AND WHERE EACH LIVES:
 *
 *   1. The verifier must be replayable. `verify()` is pure, deterministic and
 *      total over (draft, context) — verifier.ts's own contract, asserted
 *      again here, because the whole idea of a static corpus depends on it.
 *   2. There must be a definition of false/true positive that the verifier
 *      cannot grade itself against. `metrics.ts` already draws the line
 *      between an INFERRED candidate and an ADJUDICATED verdict; this file
 *      asserts the corpus evaluator honours that line.
 *   3. There must be a gate that fails when the evidence is absent, not just
 *      when the evidence is bad. `corpus.ts`'s gate fails on an unreviewed
 *      corpus, on an unexercised rule, and on a corpus of authored fixtures —
 *      all three are ways to get "zero false positives" without learning
 *      anything.
 *
 * WHAT IS STILL MISSING, ASSERTED HERE SO IT CANNOT BE FORGOTTEN: the two
 * halves of the log-mode instrument that have no production caller.
 * `foldVerifierMetrics` IS wired into route.ts; `foldFalsePositiveCandidate`
 * and `markAdjudicated` are not. Without the first, a flagged turn's
 * successor is never examined, so the corpus has no candidate prior and every
 * reject must be reviewed blind. Without the second, a reviewer's verdict has
 * nowhere to go. Both are pure functions already written and tested — the
 * gap is a caller, not a mechanism.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { verify } from '@/lib/kernel/verifier/verifier'
import { SEVERITY, RULE_CODES, type VerifierContext, type RuleCode } from '@/lib/kernel/verifier/types'
import {
  evaluateCorpus, meetsEnforceGate, shouldRollback,
  K5_ENFORCE_GATE, REJECT_ELIGIBLE_CODES, ROLLBACK_THRESHOLDS,
  type CorpusTurn,
} from '@/lib/kernel/verifier/corpus'
import {
  initialVerifierMetrics, foldVerifierMetrics, violationRate,
} from '@/lib/kernel/verifier/metrics'

function ctx(over: Partial<VerifierContext> = {}): VerifierContext {
  return {
    move: 'TEACH',
    budgets: { maxQuestions: 0, maxNewTerms: 2, maxParagraphs: 3 },
    stageCeiling: 4,
    vocabularyBans: [],
    vocabularyUnlocked: true,
    formulaUnlocked: true,
    contentRegister: 'intermediate',
    assessmentActive: false,
    lessonCompletionAuthorized: false,
    reactMandated: false,
    affectBand: 'calm',
    bannedConceptTerms: [],
    learnerText: 'ok',
    legalTags: [],
    ...over,
  }
}

function turn(over: Partial<CorpusTurn>): CorpusTurn {
  return {
    id: 'x', source: 'production',
    draftText: 'A short teaching paragraph with no question in it.',
    ctx: ctx(),
    ...over,
  }
}

// ── 1 · replayability ──────────────────────────────────────────────────────

describe('F1 — the verifier is replayable, which is what makes a static corpus valid', () => {
  it('same draft + same context ⇒ byte-identical decision, every time', () => {
    const c = ctx({ move: 'TEACH' })
    const draft = 'Force changes motion. What do you think happens next?'
    const runs = Array.from({ length: 20 }, () => JSON.stringify(verify(draft, c, 1)))
    expect(new Set(runs).size).toBe(1)
  })

  it('the decision depends on the CONTEXT, not on any hidden state', () => {
    const draft = 'Force changes motion. What do you think happens next?'
    // A TEACH turn ending in a question is V-Q2. The same text under an ASK
    // move with a question budget is fine.
    const asTeach = verify(draft, ctx({ move: 'TEACH' }), 1)
    const asAsk = verify(draft, ctx({ move: 'ASK', budgets: { maxQuestions: 1, maxNewTerms: 2, maxParagraphs: 3 } }), 1)
    expect(asTeach.verdict).toBe('REJECT')
    expect(asAsk.verdict).toBe('PASS')
  })
})

// ── 2 · scope: only REJECT-severity rules change behaviour at enforce ──────

describe('F2 — the gate is scoped to the rules enforcement can actually act on', () => {
  it('REJECT_ELIGIBLE_CODES is exactly the REJECT-severity set', () => {
    const expected = RULE_CODES.filter((c) => SEVERITY[c] === 'REJECT')
    expect([...REJECT_ELIGIBLE_CODES].sort()).toEqual([...expected].sort())
    // Non-trivial in both directions: some rules are LOG or STRIP on purpose.
    expect(REJECT_ELIGIBLE_CODES.length).toBeGreaterThan(5)
    expect(REJECT_ELIGIBLE_CODES.length).toBeLessThan(RULE_CODES.length)
  })

  it('LOG-severity rules are excluded — counting them would flatter the gate', () => {
    const logOnly = RULE_CODES.filter((c) => SEVERITY[c] === 'LOG') as RuleCode[]
    expect(logOnly.length).toBeGreaterThan(0)
    for (const c of logOnly) expect(REJECT_ELIGIBLE_CODES).not.toContain(c)
  })

  it('STRIP is auto-repair, not rejection, and is likewise out of scope', () => {
    expect(SEVERITY['V-TAG']).toBe('STRIP')
    expect(REJECT_ELIGIBLE_CODES).not.toContain('V-TAG')
  })
})

// ── 3 · false positive vs true positive vs candidate ───────────────────────

describe('F3 — the evaluator never lets the verifier grade its own homework', () => {
  const flagged = () => turn({
    id: 'flagged', move: undefined,
    draftText: 'Force changes motion. What do you think happens next?',
    ctx: ctx({ move: 'TEACH' }),
  })

  it('an UNREVIEWED reject is counted as unknown, never as a true positive', () => {
    const ev = evaluateCorpus([flagged()])
    expect(ev.rejects).toBe(1)
    expect(ev.adjudicated).toBe(0)
    expect(ev.truePositives).toBe(0)
    expect(ev.falsePositives).toBe(0)
    expect(ev.unreviewedRejects).toBe(1)
  })

  it('a CANDIDATE is inferred from the successor turn and is not a verdict', () => {
    const ev = evaluateCorpus([{
      ...flagged(),
      successor: { learnerResponded: true, learnerShowedDistress: false, learnerNonAnswer: false },
    }])
    expect(ev.candidates).toBe(1)
    expect(ev.falsePositives).toBe(0)   // still zero: a candidate is evidence, not truth
  })

  it('distress, a non-answer, or silence all disqualify a candidate', () => {
    const cases = [
      { learnerResponded: true, learnerShowedDistress: true, learnerNonAnswer: false },
      { learnerResponded: true, learnerShowedDistress: false, learnerNonAnswer: true },
      { learnerResponded: false, learnerShowedDistress: false, learnerNonAnswer: false },
    ]
    for (const successor of cases) {
      expect(evaluateCorpus([{ ...flagged(), successor }]).candidates).toBe(0)
    }
  })

  it('only a human ADJUDICATION moves the false/true positive counters', () => {
    const fp = evaluateCorpus([{ ...flagged(), adjudication: 'false_positive' }])
    expect(fp.falsePositives).toBe(1)
    expect(fp.truePositives).toBe(0)
    const tp = evaluateCorpus([{ ...flagged(), adjudication: 'true_positive' }])
    expect(tp.truePositives).toBe(1)
    expect(tp.falsePositives).toBe(0)
  })

  it('an adjudication on a PASSING turn is ignored (there was no flag to judge)', () => {
    const ev = evaluateCorpus([turn({ id: 'clean', adjudication: 'false_positive' })])
    expect(ev.rejects).toBe(0)
    expect(ev.falsePositives).toBe(0)
  })
})

// ── 4 · the gate fails on absent evidence, not only on bad evidence ────────

describe('F4 — the enforce gate', () => {
  /** A corpus large enough to pass the size check, all clean. */
  function cleanCorpus(n: number, source: CorpusTurn['source'] = 'production'): CorpusTurn[] {
    return Array.from({ length: n }, (_, i) => turn({ id: `c${i}`, source }))
  }
  /** A flagged, reviewed-as-correct turn. */
  function reviewedReject(i: number): CorpusTurn {
    return turn({
      id: `r${i}`,
      draftText: 'Force changes motion. What do you think happens next?',
      ctx: ctx({ move: 'TEACH' }),
      adjudication: 'true_positive',
    })
  }

  it('the gate constants are the masterplan\'s and the RS\'s, not invented', () => {
    expect(K5_ENFORCE_GATE.minTurns).toBe(500)                    // masterplan K5 DoD
    expect(K5_ENFORCE_GATE.maxAdjudicatedFalsePositives).toBe(0)  // "zero false-REJECT"
    expect(K5_ENFORCE_GATE.maxRejectRate).toBe(0.05)              // RS P-3 violationSlo
  })

  it('FAILS on a corpus that is too small, however clean', () => {
    const v = meetsEnforceGate(evaluateCorpus(cleanCorpus(100)))
    expect(v.pass).toBe(false)
    expect(v.reasons.join(' ')).toContain('100 turns')
  })

  it('FAILS on 500 clean turns, because no REJECT rule was ever exercised', () => {
    // The trap this closes: "zero false positives" out of zero rejects is not
    // evidence that the rules are safe — it is evidence the corpus is bland.
    const ev = evaluateCorpus(cleanCorpus(500))
    expect(ev.rejects).toBe(0)
    const v = meetsEnforceGate(ev)
    expect(v.pass).toBe(false)
    expect(v.reasons.join(' ')).toContain('never exercised')
    expect(ev.unexercisedCodes.length).toBe(REJECT_ELIGIBLE_CODES.length)
  })

  it('FAILS when rejects exist but nobody reviewed them', () => {
    const corpus = [...cleanCorpus(490), ...Array.from({ length: 10 }, (_, i) =>
      turn({ id: `u${i}`, draftText: 'Force changes motion. What next?', ctx: ctx({ move: 'TEACH' }) }))]
    const ev = evaluateCorpus(corpus)
    expect(ev.rejects).toBe(10)
    expect(ev.adjudicated).toBe(0)
    const v = meetsEnforceGate(ev)
    expect(v.pass).toBe(false)
    expect(v.reasons.join(' ')).toContain('reviewed')
  })

  it('FAILS on a single adjudicated false positive', () => {
    const corpus = [
      ...cleanCorpus(490),
      ...Array.from({ length: 9 }, (_, i) => reviewedReject(i)),
      { ...reviewedReject(99), adjudication: 'false_positive' as const },
    ]
    const v = meetsEnforceGate(evaluateCorpus(corpus))
    expect(v.pass).toBe(false)
    expect(v.reasons.join(' ')).toContain('false positive')
  })

  it('FAILS on a corpus made mostly of authored fixtures', () => {
    const corpus = [...cleanCorpus(500, 'authored-fixture'), ...Array.from({ length: 30 }, (_, i) => reviewedReject(i))]
    const v = meetsEnforceGate(evaluateCorpus(corpus))
    expect(v.pass).toBe(false)
    expect(v.reasons.join(' ')).toContain('production/simulation')
  })

  it('FAILS when the reject rate is far above the RS P-3 SLO', () => {
    const corpus = [...cleanCorpus(400), ...Array.from({ length: 100 }, (_, i) => reviewedReject(i))]
    const ev = evaluateCorpus(corpus)
    expect(ev.rejectRate).toBeCloseTo(0.2)
    expect(meetsEnforceGate(ev).reasons.join(' ')).toContain('SLO')
  })

  it('reports every unmet condition at once, so one fix does not reveal another', () => {
    const v = meetsEnforceGate(evaluateCorpus(cleanCorpus(10, 'authored-fixture')))
    expect(v.reasons.length).toBeGreaterThanOrEqual(3)
    expect(v.pass).toBe(false)
  })

  it('a green result is auditable: every satisfied condition is named', () => {
    const v = meetsEnforceGate(evaluateCorpus(cleanCorpus(500)))
    expect(v.satisfied).toContain('corpus size')
    expect(v.satisfied).toContain('zero adjudicated false positives')
  })
})

// ── 5 · rollback criteria ──────────────────────────────────────────────────

describe('F5 — rollback criteria, readable from metrics the route already folds', () => {
  it('any adjudicated false positive after enforcement began is a stop', () => {
    expect(shouldRollback({ rejectRate: 0.01, uncorrectedShare: 0, postEnforceFalsePositives: 1 }).rollback).toBe(true)
  })

  it('an uncorrected share above 5% is a stop, because a template is a turn with no teaching', () => {
    const r = shouldRollback({ rejectRate: 0.02, uncorrectedShare: 0.06, postEnforceFalsePositives: 0 })
    expect(r.rollback).toBe(true)
    expect(r.reasons.join(' ')).toContain('uncorrected')
    expect(ROLLBACK_THRESHOLDS.uncorrectedShare).toBe(0.05)
  })

  it('a reject rate at twice the SLO is a stop', () => {
    expect(shouldRollback({ rejectRate: 0.10, uncorrectedShare: 0, postEnforceFalsePositives: 0 }).rollback).toBe(true)
  })

  it('a null rate (below minimum sample) never triggers a rollback on its own', () => {
    expect(shouldRollback({ rejectRate: null, uncorrectedShare: null, postEnforceFalsePositives: 0 }).rollback).toBe(false)
  })

  it('the same numbers are derivable from VerifierMetrics, so no new instrument is needed', () => {
    let m = initialVerifierMetrics()
    for (let i = 0; i < 40; i++) {
      m = foldVerifierMetrics(m, {
        mode: 'enforce',
        decision: i < 2
          ? { verdict: 'REJECT', violations: [{ code: 'V-Q2', severity: 'REJECT' }] }
          : { verdict: 'PASS', violations: [] },
        attempts: i < 2 ? 2 : 1,
        usedTemplate: false,
      })
    }
    expect(m.turnsVerified).toBe(40)
    expect(m.turnsWithReject).toBe(2)
    expect(violationRate(m)).toBeCloseTo(2 / 40)
    const uncorrectedShare = m.turnsWithReject === 0 ? null : m.uncorrected / m.turnsVerified
    expect(shouldRollback({
      rejectRate: violationRate(m), uncorrectedShare, postEnforceFalsePositives: 0,
    }).rollback).toBe(false)
  })
})

// ── 6 · what is still missing ──────────────────────────────────────────────

describe('F6 — the unwired half of the log-mode instrument', () => {
  const routeSrc = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('foldVerifierMetrics IS wired — the SLO numerator and denominator accumulate', () => {
    expect(routeSrc).toContain('foldVerifierMetrics')
    expect(routeSrc).toContain('verifierMetrics')
  })

  it('PINNED GAP: foldFalsePositiveCandidate has no production caller', () => {
    // The candidate instrument is the reason log mode comes first: it is the
    // only configuration in which "was that flag wrong?" is answerable from
    // learner behaviour. Nothing calls it, so the answer is never recorded.
    expect(routeSrc).not.toContain('foldFalsePositiveCandidate')
  })

  it('PINNED GAP: markAdjudicated has no production caller and no review surface', () => {
    // Adjudications are truth, and there is nowhere to enter one.
    expect(routeSrc).not.toContain('markAdjudicated')
  })

  it('BOTH are pure, tested functions — the gap is a caller, not a mechanism', () => {
    const metricsSrc = readFileSync('src/lib/kernel/verifier/metrics.ts', 'utf8')
    expect(metricsSrc).toContain('export function foldFalsePositiveCandidate')
    expect(metricsSrc).toContain('export function markAdjudicated')
  })

  it('CONSEQUENCE: today the gate cannot pass, because no corpus can be built', () => {
    // An empty corpus is the honest current state and it must fail loudly
    // rather than vacuously pass.
    const v = meetsEnforceGate(evaluateCorpus([]))
    expect(v.pass).toBe(false)
    expect(v.reasons.join(' ')).toContain('0 turns')
  })
})
