/**
 * K6 — degraded deterministic mode (RS P-3): the LLM-outage drill.
 *
 * The DoD line this exists for: "LLM-outage drill passes (learner gets
 * teaching-shaped turns)". The drill is run against the pure seam
 * (degradedTurn) because that is exactly what the route serves when every
 * provider throws — the wrapper adds no content of its own.
 */
import { describe, it, expect } from 'vitest'
import { degradedTurn, DEFAULT_FALLBACK_CHAIN } from '@/lib/eos-runtime/degradedMode'
import { verify } from '@/lib/kernel/verifier'
import type { VerifierContext } from '@/lib/kernel/verifier'

const REGISTERS = ['beginner', 'intermediate', 'expert'] as const

/** The strictest plausible turn context: recovery-tier budgets, zero
 *  questions, zero new terms. A degraded turn must satisfy even this —
 *  an outage can land on ANY turn, including the worst one. */
function strictCtx(register: (typeof REGISTERS)[number], move: VerifierContext['move']): VerifierContext {
  return {
    move,
    budgets: { maxQuestions: 0, maxParagraphs: 2, maxNewTerms: 0 },
    stageCeiling: 2,
    vocabularyBans: ['SI', 'phoneme'],
    vocabularyUnlocked: false,
    formulaUnlocked: false,
    contentRegister: register,
    assessmentActive: false,
    lessonCompletionAuthorized: false,
    reactMandated: false,
    affectBand: 'flooded',
    bannedConceptTerms: [],
    noCapabilities: [],
    learnerText: 'I do not get it',
    legalTags: [],
  }
}

describe('the LLM-outage drill (RS P-3 / K6 DoD)', () => {
  it('produces a teaching-shaped turn for every register', () => {
    for (const register of REGISTERS) {
      const t = degradedTurn({ register, learnerText: 'help me with this' })
      expect(t.text.length).toBeGreaterThan(20)
      expect(t.provider).toBe('degraded')
      expect(t.finishReason).toBe('template')
      expect(t.kind).toBe('SHOW_EASIEST_LEGAL')      // head of the default chain
    }
  })

  it('is banner-free — the learner is never told the AI is down', () => {
    for (const register of REGISTERS) {
      const t = degradedTurn({ register, learnerText: 'x' })
      expect(t.text).not.toMatch(/\b(AI|unavailable|error|down|try again|service|system|model)\b/i)
    }
  })

  it('passes the K5 verifier under the STRICTEST context, for every register', () => {
    // Verifier-clean by construction is a claim; this is the check. Flooded
    // affect, zero budgets, first-lesson vocabulary bans — the worst turn an
    // outage could land on.
    for (const register of REGISTERS) {
      const t = degradedTurn({ register, learnerText: 'I do not get it' })
      const decision = verify(t.text, strictCtx(register, t.move), 1)
      expect(decision.verdict, `${register}: ${JSON.stringify(decision.violations)}`).toBe('PASS')
    }
  })

  it('asks nothing — an outage turn cannot open a question it cannot follow', () => {
    for (const register of REGISTERS) {
      expect(degradedTurn({ register, learnerText: 'x' }).text).not.toContain('?')
    }
  })

  it('honours a supplied fallback chain and is deterministic', () => {
    const close = degradedTurn({ register: 'beginner', learnerText: 'x', fallbackChain: ['WARM_CLOSE'] })
    expect(close.kind).toBe('WARM_CLOSE')
    expect(close.move).toBe('CLOSE')
    const a = degradedTurn({ register: 'beginner', learnerText: 'same' })
    const b = degradedTurn({ register: 'beginner', learnerText: 'same' })
    expect(a).toEqual(b)
  })

  it('never throws — the outage path has nowhere left to fail to', () => {
    expect(() => degradedTurn({ register: 'beginner', learnerText: '' })).not.toThrow()
    expect(() => degradedTurn({ register: 'expert', learnerText: 'x', fallbackChain: [] })).not.toThrow()
    expect(DEFAULT_FALLBACK_CHAIN.length).toBeGreaterThan(0)
  })
})
