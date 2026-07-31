/**
 * Degraded-mode audit (RS P-3) — the two objective defects, plus the
 * boundaries that are INTENTIONAL and must stay as they are.
 *
 * Trace audited: AI failure / empty response → degradedTurn() →
 * chooseFallback() → prompt emitted → next turn → recovery → AI resumes.
 *
 * INTENTIONAL, asserted here so nobody "fixes" it later:
 *   · chooseFallback() returns fallbackChain[0]. RS §9.3 step 2 is normative
 *     — "render the deterministic template from PolicyDecision
 *     .fallbackChain[0]" — so identical text on consecutive degraded turns is
 *     specified behaviour, not a defect. There is no rotation to restore.
 *
 * DEFECTS fixed, both with the same root cause — `provider` was produced but
 * never consumed, so a degraded turn was indistinguishable from model output:
 *   1. the outage template was captured as a DRAFT ExplanationAsset
 *      (production: 5 rows, 5 concepts, 3 languages, incl. the English
 *      template stored as the RUSSIAN explanation for chem.atomic.orbitals)
 *   2. the outage template was folded as teaching evidence — it asks nothing,
 *      so it read as a "give" and set demonstrated / taughtThisSession
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  degradedTurn, DEFAULT_FALLBACK_CHAIN, DEGRADED_PROVIDER, isDegradedProvider,
} from '@/lib/eos-runtime/degradedMode'
import { chooseFallback, renderFallback } from '@/lib/kernel/verifier'
import {
  advanceConversationState, initialConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import { answerableSource } from '@/lib/teaching/questionLegality'

const CTX = { register: 'beginner' as const, learnerText: 'Got it' }

describe('fallback selection is chain[0] by spec (INTENTIONAL)', () => {
  it('always renders the head of the chain, so consecutive turns repeat', () => {
    // RS §9.3 step 2. Asserted so the repetition is understood as specified,
    // and so a future change to chooseFallback is a deliberate spec change.
    expect(chooseFallback(DEFAULT_FALLBACK_CHAIN)).toBe('SHOW_EASIEST_LEGAL')
    const a = degradedTurn(CTX)
    const b = degradedTurn(CTX)
    expect(a.text).toBe(b.text)
    expect(a.kind).toBe('SHOW_EASIEST_LEGAL')
  })

  it('skips unrecognised kinds and still never throws on an empty chain', () => {
    expect(chooseFallback(['NOT_A_TEMPLATE', 'ECHO_MICROWIN'])).toBe('ECHO_MICROWIN')
    expect(chooseFallback([])).toBe('WARM_CLOSE')
  })

  it('honours a caller-supplied chain', () => {
    expect(degradedTurn({ ...CTX, fallbackChain: ['WARM_CLOSE'] }).kind).toBe('WARM_CLOSE')
  })

  it('the template asks nothing — which is why it reads as a give downstream', () => {
    expect(renderFallback('SHOW_EASIEST_LEGAL', CTX)).not.toContain('?')
  })
})

describe('DEGRADED_PROVIDER has a single owner', () => {
  it('the producer and the predicate agree', () => {
    expect(degradedTurn(CTX).provider).toBe(DEGRADED_PROVIDER)
    expect(isDegradedProvider(degradedTurn(CTX).provider)).toBe(true)
  })

  it('does not misfire on real providers or on absent values', () => {
    for (const p of ['groq', 'gemini', 'yandex', 'memory', null, undefined, '']) {
      expect(isDegradedProvider(p)).toBe(false)
    }
  })
})

describe('defect 1 — a degraded turn is not captured as an ExplanationAsset', () => {
  // The guard lives at the route's capture site, which has no unit seam.
  // Asserted at source level, the same way replayDrift.test.ts pins the
  // route's own call shape.
  const ROUTE = 'src/app/api/learn/chat/route.ts'

  it('the ingest call site is gated on the degraded predicate', () => {
    const src = readFileSync(ROUTE, 'utf8')
    const at = src.indexOf('ingestGeneratedLesson({')
    expect(at).toBeGreaterThan(-1)
    // The guard must sit immediately above the capture, not merely somewhere
    // in the file.
    const preceding = src.slice(Math.max(0, at - 700), at)
    expect(preceding).toContain('isDegradedProvider(provider)')
  })

  it('the capture path itself still has no notion of provider', () => {
    // Confirms the guard belongs at the call site: the pipeline cannot make
    // this decision, so it must never be moved there without adding the input.
    const pipeline = readFileSync('src/lib/teaching/assets/pipeline.ts', 'utf8')
    expect(pipeline).not.toContain('provider')
  })
})

describe('defect 2 — a degraded turn is not folded as teaching', () => {
  const base = (phase: ConversationState['phase']): ConversationState => ({
    ...initialConversationState('phys.mech.impulse'), phase,
  })
  // A degraded turn asks nothing; everything else about the fold is unchanged.
  const evidence = (degraded: boolean) => ({
    askedQuestion: false, signalCorrect: null, recoveryFired: false,
    degradedTurn: degraded,
  })

  it('does not set taughtThisSession', () => {
    expect(advanceConversationState(base('OBSERVE'), evidence(true)).taughtThisSession).toBe(false)
  })

  it('does not satisfy the DEMONSTRATE→GUIDE evidence gate', () => {
    expect(advanceConversationState(base('DEMONSTRATE'), evidence(true)).demonstrated).toBe(false)
  })

  it('does not license a QL-1 question about undelivered material', () => {
    // The concrete harm: QL-1 exists to forbid asking about an untaught
    // concept, and taughtThisSession is what it reads.
    const after = advanceConversationState(base('DEMONSTRATE'), evidence(true))
    expect(answerableSource(after)).toBe('none')
  })

  it('leaves a real LLM delivery turn exactly as before', () => {
    const after = advanceConversationState(base('DEMONSTRATE'), evidence(false))
    expect(after.taughtThisSession).toBe(true)
    expect(after.demonstrated).toBe(true)
    expect(answerableSource(after)).toBe('taught_this_session')
  })

  it('omitting the flag preserves the pre-fix behaviour for every other caller', () => {
    const after = advanceConversationState(base('DEMONSTRATE'), {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
    })
    expect(after.taughtThisSession).toBe(true)
    expect(after.demonstrated).toBe(true)
  })
})

describe('learner experience across a 10+ turn outage, then recovery', () => {
  it('never credits teaching, and the ladder stays where the outage found it', () => {
    let state = initialConversationState('phys.mech.impulse')
    state = { ...state, phase: 'DEMONSTRATE' }
    for (let i = 0; i < 12; i++) {
      state = advanceConversationState(state, {
        askedQuestion: false, signalCorrect: null, recoveryFired: false,
        degradedTurn: true,
      })
    }
    expect(state.taughtThisSession).toBe(false)
    expect(state.demonstrated).toBe(false)
    // Nothing was taught for 12 turns, so no question may be asked about it.
    expect(answerableSource(state)).toBe('none')
  })

  it('recovers on the first real turn once the AI returns — nothing is sticky', () => {
    let state = initialConversationState('phys.mech.impulse')
    state = { ...state, phase: 'DEMONSTRATE' }
    for (let i = 0; i < 12; i++) {
      state = advanceConversationState(state, {
        askedQuestion: false, signalCorrect: null, recoveryFired: false,
        degradedTurn: true,
      })
    }
    // AI returns: one genuine delivery turn restores the evidence normally.
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
      degradedTurn: false,
    })
    expect(state.taughtThisSession).toBe(true)
    expect(state.demonstrated).toBe(true)
    expect(answerableSource(state)).toBe('taught_this_session')
  })
})
