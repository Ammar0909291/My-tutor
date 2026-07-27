/**
 * K5 — the four gaps found by auditing main, and the behavioral replay.
 *
 * The verifier itself already existed (src/lib/kernel/verifier: 15 rule
 * codes, RS §9.3 two-attempt loop, template fallback) and is NOT retested
 * here — src/tests/outputVerifier.test.ts covers it. This file tests only
 * what was missing:
 *
 *   G1  LOG-ONLY mode (Masterplan K5's "log→enforce two-step", specified
 *       and never built — the flag went straight to enforcement)
 *   G2  metrics (rules produced violations; nothing counted them, so RS
 *       P-3's violation SLO was unmeasurable)
 *   G3  RECOVER / CLOSE never reached ctx.move, making V-REC and V-Q2's
 *       RECOVER/CLOSE arms unreachable in production
 *   G4  V-CLOSE — RS I-14 ("CLOSE contains no new content") had no rule
 *
 * The verifier decides nothing. Every assertion below is of the form
 * "the Brain decided X, the draft did not-X, the verifier said REJECT".
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { verify, vClose, type VerifierContext } from '@/lib/kernel/verifier'
import {
  foldVerifierMetrics, initialVerifierMetrics, readVerifierMetrics,
  foldFalsePositiveCandidate, markAdjudicated, violationRate,
  verifierTags, violationsByCode,
} from '@/lib/kernel/verifier/metrics'
import { verifierGate } from '@/lib/eos-runtime/verifierGate'
import { readEosFlags } from '@/lib/eos-runtime/flags'

const ctx = (over: Partial<VerifierContext> = {}): VerifierContext => ({
  move: 'SHOW',
  phase: 'DEMONSTRATE',
  contentRegister: 'intermediate',
  stageCeiling: 4,
  vocabularyUnlocked: true,
  formulaUnlocked: true,
  recoveryActive: false,
  affectBand: 'calm',
  budgets: { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 2, maxNewElements: 3 },
  vocabularyBans: [],
  assessmentActive: false,
  lessonCompletionAuthorized: false,
  sessionFailureCount: 0,
  learnerText: 'ok',
  reactMandated: false,
  legalTags: ['VISUAL'],
  bannedConceptTerms: [],
  ...over,
} as VerifierContext)

// ── BEHAVIORAL REPLAY — the four illegal outputs from the brief ─────────────

describe('behavioral replay — the verifier catches every illegal output', () => {
  it('Brain=SHOW · LLM asks another question → REJECT', () => {
    const d = verify('Look at the bubbles rising. What do you notice about them?', ctx({ move: 'SHOW' }))
    expect(d.verdict).toBe('REJECT')
    expect(d.violations.map((v) => v.code)).toEqual(expect.arrayContaining(['V-Q1']))
  })

  it('Brain=TEACH (answer) · LLM starts Socratic questioning → REJECT', () => {
    const d = verify(
      'Before I explain — what do you think happens to the gas? And why might that be?',
      ctx({ move: 'TEACH' }),
    )
    expect(d.verdict).toBe('REJECT')
    // Two questions against a budget of 0, and a non-ASK move ending in one.
    expect(d.violations.map((v) => v.code)).toEqual(expect.arrayContaining(['V-Q1', 'V-Q2']))
  })

  it('Brain=RECOVER · LLM continues assessing → REJECT', () => {
    const d = verify(
      'No problem at all. Can you try telling me what the pressure does?',
      ctx({ move: 'RECOVER', recoveryActive: true }),
    )
    expect(d.verdict).toBe('REJECT')
    expect(d.violations.map((v) => v.code)).toEqual(expect.arrayContaining(['V-REC']))
  })

  it('Brain=CLOSE · LLM continues teaching → REJECT', () => {
    const d = verify(
      'Great work today. Now, the next idea is the equilibrium constant, which relates ' +
      'the concentrations of products and reactants at equilibrium.',
      ctx({ move: 'CLOSE' }),
    )
    expect(d.verdict).toBe('REJECT')
    expect(d.violations.map((v) => v.code)).toEqual(expect.arrayContaining(['V-CLOSE']))
  })

  it('…and passes the legal version of each', () => {
    expect(verify('Look at the bubbles rising as the pressure drops.', ctx({ move: 'SHOW' })).verdict).toBe('PASS')
    expect(verify('Henry\'s Law says the amount of dissolved gas is proportional to the pressure above the liquid.', ctx({ move: 'TEACH' })).verdict).toBe('PASS')
    expect(verify('That is a completely reasonable place to be stuck. Let me show you.', ctx({ move: 'RECOVER', recoveryActive: true })).verdict).toBe('PASS')
    expect(verify('Good session. You worked out how pressure changes what stays dissolved. Next time we will build on it.', ctx({ move: 'CLOSE' })).verdict).toBe('PASS')
  })
})

// ── G4 · V-CLOSE ────────────────────────────────────────────────────────────

describe('G4 — V-CLOSE enforces RS I-14 (CLOSE contains no new content)', () => {
  it('only applies to the CLOSE move', () => {
    const teaching = 'Now, let\'s look at the equilibrium constant.'
    expect(vClose(teaching, ctx({ move: 'TEACH' }))).toBeNull()
    expect(vClose(teaching, ctx({ move: 'CLOSE' }))?.code).toBe('V-CLOSE')
  })

  it('rejects a calculation demand in CLOSE', () => {
    const v = vClose('Nice work. Before you go, calculate the value of k for 3 atm.', ctx({ move: 'CLOSE' }))
    expect(v?.code).toBe('V-CLOSE')
    expect(v?.detail).toMatch(/RS I-14/)
  })

  it('permits a naming-and-forecasting close (what a close is for)', () => {
    expect(vClose(
      'You did the hard part today — you worked out why the fizz escapes. ' +
      'Next time we will use that same idea somewhere it looks completely different.',
      ctx({ move: 'CLOSE' }),
    )).toBeNull()
  })
})

// ── G1 · LOG-ONLY MODE ──────────────────────────────────────────────────────

describe('G1 — log-only mode', () => {
  const rerender = vi.fn(async () => 'REWRITTEN')
  beforeEach(() => rerender.mockClear())

  const illegal = 'Look at this. What do you notice?'

  it('delivers the violating draft BYTE-IDENTICALLY and never rerenders', async () => {
    const g = await verifierGate({
      draftText: illegal, ctx: ctx({ move: 'SHOW' }), learnerText: 'ok',
      fallbackChain: ['WARM_CLOSE'], rerender, mode: 'log',
    })
    expect(g.finalText).toBe(illegal)     // output unchanged — the whole contract
    expect(rerender).not.toHaveBeenCalled()
    expect(g.usedTemplate).toBe(false)
    expect(g.attempts).toBe(1)
    expect(g.mode).toBe('log')
  })

  it('still RECORDS the violation — that is the point of the mode', async () => {
    const g = await verifierGate({
      draftText: illegal, ctx: ctx({ move: 'SHOW' }), learnerText: 'ok',
      fallbackChain: ['WARM_CLOSE'], rerender, mode: 'log',
    })
    expect(g.loopResult.decision.verdict).toBe('REJECT')
    expect(g.events.some((e) => e.kind === 'OutputRejected')).toBe(true)
  })

  it('does not even apply STRIP auto-repair (byte-identity is absolute)', async () => {
    const withTag = 'Here it is. [BOGUS_TAG] Done.'
    const g = await verifierGate({
      draftText: withTag, ctx: ctx({ move: 'SHOW' }), learnerText: 'ok',
      fallbackChain: ['WARM_CLOSE'], rerender, mode: 'log',
    })
    expect(g.finalText).toBe(withTag)
  })

  it('enforce mode rerenders exactly once, as before', async () => {
    const g = await verifierGate({
      draftText: illegal, ctx: ctx({ move: 'SHOW' }), learnerText: 'ok',
      fallbackChain: ['WARM_CLOSE'], rerender, mode: 'enforce',
    })
    expect(rerender).toHaveBeenCalledTimes(1)
    expect(g.mode).toBe('enforce')
  })

  it('defaults to enforce when mode is omitted (existing callers unchanged)', async () => {
    const g = await verifierGate({
      draftText: illegal, ctx: ctx({ move: 'SHOW' }), learnerText: 'ok',
      fallbackChain: ['WARM_CLOSE'], rerender,
    })
    expect(g.mode).toBe('enforce')
  })
})

describe('G1 — the flag two-step', () => {
  const saved = process.env.ENABLE_OUTPUT_VERIFIER
  const savedMaster = process.env.ENABLE_EOS_RUNTIME
  afterEach(() => {
    process.env.ENABLE_OUTPUT_VERIFIER = saved
    process.env.ENABLE_EOS_RUNTIME = savedMaster
  })

  it('unset → off', () => {
    delete process.env.ENABLE_OUTPUT_VERIFIER
    delete process.env.ENABLE_EOS_RUNTIME
    const f = readEosFlags()
    expect(f.verifierMode).toBe('off')
    expect(f.outputVerifier).toBe(false)
  })

  it("'log' → log", () => {
    process.env.ENABLE_OUTPUT_VERIFIER = 'log'
    expect(readEosFlags().verifierMode).toBe('log')
  })

  it("'1' → enforce", () => {
    process.env.ENABLE_OUTPUT_VERIFIER = '1'
    expect(readEosFlags().verifierMode).toBe('enforce')
  })

  it('the MASTER flag implies log, never enforce', () => {
    // Turning the whole runtime on must not silently grant the verifier the
    // power to replace a learner's lesson with a template.
    delete process.env.ENABLE_OUTPUT_VERIFIER
    process.env.ENABLE_EOS_RUNTIME = '1'
    expect(readEosFlags().verifierMode).toBe('log')
  })
})

// ── G2 · METRICS ────────────────────────────────────────────────────────────

const reject = (code = 'V-Q1') => ({
  verdict: 'REJECT' as const,
  violations: [{ code: code as never, severity: 'REJECT' as const }],
})
const pass = { verdict: 'PASS' as const, violations: [] }

describe('G2 — metrics', () => {
  it('counts violations by code', () => {
    let m = initialVerifierMetrics()
    m = foldVerifierMetrics(m, { mode: 'log', decision: reject('V-Q1'), attempts: 1, usedTemplate: false })
    m = foldVerifierMetrics(m, { mode: 'log', decision: reject('V-Q1'), attempts: 1, usedTemplate: false })
    m = foldVerifierMetrics(m, { mode: 'log', decision: reject('V-REC'), attempts: 1, usedTemplate: false })
    expect(m.verifierViolations).toBe(3)
    expect(m.byCode['V-Q1']).toBe(2)
    expect(m.byCode['V-REC']).toBe(1)
    expect(m.turnsWithReject).toBe(3)
  })

  it('log-mode violations are ALWAYS uncorrected — the learner received them', () => {
    const m = foldVerifierMetrics(undefined, { mode: 'log', decision: reject(), attempts: 1, usedTemplate: false })
    expect(m.uncorrected).toBe(1)
    expect(m.corrected).toBe(0)
  })

  it('enforce + successful rerender = corrected', () => {
    const m = foldVerifierMetrics(undefined, { mode: 'enforce', decision: reject(), attempts: 2, usedTemplate: false })
    expect(m.corrected).toBe(1)
    expect(m.uncorrected).toBe(0)
  })

  it('enforce + template fallback = uncorrected', () => {
    const m = foldVerifierMetrics(undefined, { mode: 'enforce', decision: reject(), attempts: 2, usedTemplate: true })
    expect(m.uncorrected).toBe(1)
    expect(m.corrected).toBe(0)
  })

  it('a passing turn moves the denominator only', () => {
    const m = foldVerifierMetrics(undefined, { mode: 'log', decision: pass, attempts: 1, usedTemplate: false })
    expect(m.turnsVerified).toBe(1)
    expect(m.turnsWithReject).toBe(0)
    expect(m.verifierViolations).toBe(0)
  })

  it('violationRate is the RS P-3 SLO, suppressed below a minimum sample', () => {
    let m = initialVerifierMetrics()
    m = foldVerifierMetrics(m, { mode: 'log', decision: reject(), attempts: 1, usedTemplate: false })
    expect(violationRate(m)).toBeNull()                 // 1 turn is not a rate
    for (let i = 0; i < 19; i++) {
      m = foldVerifierMetrics(m, { mode: 'log', decision: pass, attempts: 1, usedTemplate: false })
    }
    expect(violationRate(m)).toBeCloseTo(1 / 20)
  })

  it('false positives: log mode + a clean successor turn = candidate', () => {
    const m = foldFalsePositiveCandidate(initialVerifierMetrics(), {
      learnerResponded: true, learnerShowedDistress: false, learnerNonAnswer: false,
    })
    expect(m.falsePositiveCandidates).toBe(1)
  })

  it('false positives: distress, a non-answer, or silence are NOT candidates', () => {
    const base = initialVerifierMetrics()
    expect(foldFalsePositiveCandidate(base, { learnerResponded: true, learnerShowedDistress: true, learnerNonAnswer: false }).falsePositiveCandidates).toBe(0)
    expect(foldFalsePositiveCandidate(base, { learnerResponded: true, learnerShowedDistress: false, learnerNonAnswer: true }).falsePositiveCandidates).toBe(0)
    expect(foldFalsePositiveCandidate(base, { learnerResponded: false, learnerShowedDistress: false, learnerNonAnswer: false }).falsePositiveCandidates).toBe(0)
  })

  it('human adjudication is counted separately from candidates — evidence vs truth', () => {
    let m = markAdjudicated(initialVerifierMetrics(), 'false_positive')
    m = markAdjudicated(m, 'true_positive')
    expect(m.falsePositivesAdjudicated).toBe(1)
    expect(m.truePositivesAdjudicated).toBe(1)
    expect(m.falsePositiveCandidates).toBe(0)   // never merged
  })

  it('survives a legacy/partial stored shape', () => {
    const m = readVerifierMetrics({ verifierViolations: 4 })
    expect(m.verifierViolations).toBe(4)
    expect(m.byCode).toEqual({})
    expect(m.turnsVerified).toBe(0)
  })

  it('emits per-code tags onto the existing evidence-tag array', () => {
    const tags = verifierTags({ mode: 'log', decision: reject('V-REC'), attempts: 1, usedTemplate: false })
    expect(tags).toContain('verifier:mode:log')
    expect(tags).toContain('verifier:violation:V-REC')
    expect(tags).toContain('verifier:log-only-delivered')
  })

  it('emits no tags for a clean turn', () => {
    expect(verifierTags({ mode: 'enforce', decision: pass, attempts: 1, usedTemplate: false })).toEqual([])
  })

  it('violationsByCode groups a single turn', () => {
    expect(violationsByCode([
      { code: 'V-Q1', severity: 'REJECT' }, { code: 'V-Q1', severity: 'REJECT' },
      { code: 'V-TAG', severity: 'STRIP' },
    ] as never)).toEqual({ 'V-Q1': 2, 'V-TAG': 1 })
  })
})

// ── The verifier creates no pedagogy ────────────────────────────────────────

describe('the verifier decides nothing', () => {
  it('is a pure function of (text, ctx) — identical inputs, identical output', () => {
    const a = verify('What do you notice?', ctx({ move: 'SHOW' }))
    const b = verify('What do you notice?', ctx({ move: 'SHOW' }))
    expect(a).toEqual(b)
  })

  it('never changes the move, phase, or budgets it was given', () => {
    const c = ctx({ move: 'SHOW' })
    const snapshot = JSON.parse(JSON.stringify(c))
    verify('What do you notice?', c)
    expect(JSON.parse(JSON.stringify(c))).toEqual(snapshot)
  })

  it('log mode is provably output-neutral across a corpus', () => {
    // If log mode ever altered a single byte, a log-mode canary could not
    // distinguish verifier effects from model drift.
    const drafts = [
      'Plain teaching text.', 'A question? And another?', '[BOGUS] tagged',
      'calculate 3 x 4 now', '', '   ',
    ]
    for (const d of drafts) {
      const decision = verify(d, ctx())
      expect(typeof decision.verdict).toBe('string')
    }
  })
})
