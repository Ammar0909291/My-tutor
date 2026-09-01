/**
 * A BEGINNER WAS SERVED A UNIVERSITY DERIVATION, AND THE RULE THAT FORBIDS IT
 * ALREADY EXISTS — SWITCHED OFF.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production, `phys.wave.damped-oscillations`, 2026-09-01, real account whose
 * profile reads `currentLevel: 'beginner'`. In reply to the learner's entire
 * message — "yes thats what i meant" — the tutor delivered
 *
 *   ω_d = √(ω₀² − γ²)      E(t) = ½ k A₀² e^(−2γt)
 *
 * with a worked γ = 0.1 example, one turn after that same learner had written
 * "it slows down because of air and friction i guess".
 *
 * ── THE PROMPT ALREADY FORBADE IT ───────────────────────────────────────────
 * `resolveContentRegister` maps that profile to `contentRegister: 'beginner'`,
 * which appends: "This student is a beginner: start at Stage 1 … introduce at
 * most ONE new term per response", and the QUESTION STAGE POLICY adds "NEVER
 * ask a calculation question (Stage 6) until Stages 1–5 are secure". The model
 * did it anyway — the recurring finding of this whole programme: a rule
 * stated only in the prompt is a request, not a constraint.
 *
 * ── AND THE DETERMINISTIC GUARD ALREADY EXISTS ──────────────────────────────
 * route.ts builds a verifier context for every turn with
 * `formulaUnlocked: !firstLessonActive && contentRegister !== 'beginner'`, so
 * for this learner formulas are LOCKED, and `V-VOC-FORMULA` REJECTS a turn
 * containing formula notation while locked.
 *
 * This test runs that real rule against the real turn. It REJECTS.
 *
 * ── SO WHY DID THE LEARNER SEE IT? THE GATE IS OFF ──────────────────────────
 * Production logs for that session: `verifierMode: 'off'`. `ENABLE_OUTPUT_VERIFIER`
 * is unset, and `readVerifierMode` returns 'off' unless the master
 * ENABLE_EOS_RUNTIME is set. That is a deliberate staged rollout, not an
 * oversight — and its own `'log'` mode is documented as the zero-risk step:
 * "the gate runs, records every violation, and delivers the ORIGINAL draft
 * byte-identically. No rerender, no template, no added latency, no added
 * cost."
 *
 * Setting `ENABLE_OUTPUT_VERIFIER=log` is an environment change no session in
 * this repo can make. This test is the evidence for that decision, kept in the
 * repository so it does not have to be rediscovered by studying a lesson.
 */
import { describe, it, expect } from 'vitest'
import { vVocFormula, vTerms } from '@/lib/kernel/verifier/rules'
import { buildVerifierContext } from '@/lib/eos-runtime/buildContext'
import { resolveContentRegister } from '@/lib/teaching/assets/studentState'
import { readEosFlags } from '@/lib/eos-runtime/flags'

/** Verbatim excerpt of the turn the learner received. */
const PRODUCTION_TURN = [
  'Suppose a simple pendulum has \\(\\omega_0 = 2\\,\\text{rad/s}\\) and a damping rate \\(\\gamma = 0.1\\,\\text{rad/s}\\).',
  'Then',
  '',
  '\\[',
  '\\omega_d = \\sqrt{2^2 - 0.1^2} \\approx 1.998\\,\\text{rad/s},',
  '\\]',
  '',
  'The amplitude decays as \\(e^{-0.1t}\\); after 10 s it has dropped to about 0.37 of its initial value.',
  '',
  'The total mechanical energy \\(E\\) is proportional to the square of the amplitude:',
  '',
  '\\[',
  'E(t) = \\tfrac{1}{2}k\\,A_0^{2}\\,e^{-2\\gamma t}.',
  '\\]',
].join('\n')

/** The context route.ts builds for this learner, field for field. */
function beginnerContext() {
  return buildVerifierContext({
    contentRegister: 'beginner',
    move: 'TELL',
    phase: 'DEMONSTRATE',
    stageCeiling: 2,
    vocabularyUnlocked: true,
    // route.ts: !firstLessonActive && contentRegister !== 'beginner'
    formulaUnlocked: false,
    recoveryActive: false,
    maxQuestions: 1,
    maxParagraphs: null,
    // route.ts: contentRegister === 'beginner' ? 1 : 2
    maxNewTerms: 1,
    vocabularyBans: [],
    assessmentActive: false,
    lessonCompletionAuthorized: false,
    sessionFailureCount: 0,
    learnerText: 'yes thats what i meant',
    reactMandated: true,
    legalTags: ['VISUAL', 'HINT', 'INLINE_PRACTICE', 'WE', 'LESSON'],
    bannedConceptTerms: [],
    noCapabilities: [],
  } as never)
}

describe('the account really is a beginner by the route’s own rule', () => {
  it('currentLevel "beginner" resolves to the beginner register', () => {
    expect(resolveContentRegister({ currentLevel: 'beginner', grade: null })).toBe('beginner')
  })

  it('and an unknown profile defaults to beginner, so this is the common case', () => {
    expect(resolveContentRegister({})).toBe('beginner')
  })
})

describe('the existing rule REJECTS the turn the learner was served', () => {
  it('V-VOC-FORMULA fires on the derivation', () => {
    const v = vVocFormula(PRODUCTION_TURN, beginnerContext())
    expect(v).not.toBeNull()
    expect(v!.severity).toBe('REJECT')
    expect(v!.detail).toBe('formulaUnlocked=false')
  })

  it('and does NOT fire once formulas are unlocked', () => {
    // The assertion that stops this being a rule which bans formulas outright:
    // an intermediate or advanced learner is unaffected.
    const unlocked = { ...beginnerContext(), formulaUnlocked: true }
    expect(vVocFormula(PRODUCTION_TURN, unlocked as never)).toBeNull()
  })

  it('V-TERMS did NOT fire — reported, not fixed', () => {
    // Honest negative. The beginner budget is ONE new term and this turn
    // introduces ω₀, γ, ω_d, damping rate, amplitude, oscillator and k — but
    // TECHNICAL_TERM_SEED does not carry the damped-oscillation vocabulary, so
    // the count came back under budget. Widening a seed list for a rule that
    // is currently switched off, with no measurement of what else it would
    // catch, is exactly the blind tuning this programme keeps declining.
    expect(vTerms(PRODUCTION_TURN, beginnerContext())).toBeNull()
  })
})

describe('why the learner saw it anyway', () => {
  it('the gate is OFF unless an environment variable says otherwise', () => {
    const before = process.env.ENABLE_OUTPUT_VERIFIER
    const master = process.env.ENABLE_EOS_RUNTIME
    try {
      delete process.env.ENABLE_OUTPUT_VERIFIER
      delete process.env.ENABLE_EOS_RUNTIME
      expect(readEosFlags().verifierMode).toBe('off')
      // The zero-risk step: runs, records, delivers the original byte-identically.
      process.env.ENABLE_OUTPUT_VERIFIER = 'log'
      expect(readEosFlags().verifierMode).toBe('log')
      // Enforcement stays a separate, explicit decision.
      process.env.ENABLE_OUTPUT_VERIFIER = 'enforce'
      expect(readEosFlags().verifierMode).toBe('enforce')
    } finally {
      if (before === undefined) delete process.env.ENABLE_OUTPUT_VERIFIER
      else process.env.ENABLE_OUTPUT_VERIFIER = before
      if (master === undefined) delete process.env.ENABLE_EOS_RUNTIME
      else process.env.ENABLE_EOS_RUNTIME = master
    }
  })

  it('the master flag implies log, never enforce', () => {
    const before = process.env.ENABLE_OUTPUT_VERIFIER
    const master = process.env.ENABLE_EOS_RUNTIME
    try {
      delete process.env.ENABLE_OUTPUT_VERIFIER
      process.env.ENABLE_EOS_RUNTIME = '1'
      expect(readEosFlags().verifierMode).toBe('log')
    } finally {
      if (before === undefined) delete process.env.ENABLE_OUTPUT_VERIFIER
      else process.env.ENABLE_OUTPUT_VERIFIER = before
      if (master === undefined) delete process.env.ENABLE_EOS_RUNTIME
      else process.env.ENABLE_EOS_RUNTIME = master
    }
  })
})
