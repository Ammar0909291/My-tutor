/**
 * V-CHALLENGE — a claim challenge got no substantive/acknowledging reply.
 *
 * ── THE INCIDENT (real-student cross-subject audit, chem.bond.resonance) ──
 * The tutor taught a wrong formal-charge rule for CO3^2-. The learner
 * challenged it twice, in the most natural way a real student does — citing
 * a remembered fact and a remembered authority ("my teacher said"). Both
 * challenges were followed by content-free filler or an escalating,
 * unacknowledged defence of the same false claim, and the lesson still
 * reached verified mastery afterward.
 *
 * This rule cannot decide who was right — see claimChallengeGuard.ts's own
 * header for why that boundary is deliberate. It decides the narrower,
 * safely-decidable question: did the reply take the dispute seriously at
 * all, and if not, was it at least substantive? The REJECT case here is
 * intentionally narrow (short + unacknowledged); a long, unacknowledging,
 * confidently-wrong reply is NOT rejected by this rule — that gap is closed
 * separately by masteryGate.ts's teachingIntegrityUncertain flag (see
 * teachingIntegrityMastery.test.ts), which this rule's own doc comment
 * names explicitly.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { vChallenge, RULES } from '@/lib/kernel/verifier/rules'
import { RULE_CODES, SEVERITY, type VerifierContext } from '@/lib/kernel/verifier/types'

function ctx(challengeActive: boolean): VerifierContext {
  return { challengeActive } as unknown as VerifierContext
}

describe('vChallenge — is registered as a real rule', () => {
  it('V-CHALLENGE is a known rule code with REJECT severity', () => {
    expect(RULE_CODES).toContain('V-CHALLENGE')
    expect(SEVERITY['V-CHALLENGE']).toBe('REJECT')
  })

  it('is included in the ordered RULES set the full verifier walks', () => {
    expect(RULES).toContain(vChallenge)
  })
})

describe('vChallenge — no-op when no challenge is active (the ordinary case)', () => {
  it('never fires when challengeActive is false/undefined, regardless of text', () => {
    expect(vChallenge('ok.', ctx(false))).toBeNull()
    expect(vChallenge('', { } as VerifierContext)).toBeNull()
    expect(vChallenge(
      "Let's walk through the formal-charge calculation together—just one step at a time.",
      ctx(false),
    )).toBeNull()
  })
})

describe('vChallenge — the actual reproduced production failure IS caught', () => {
  it('REJECTS the exact short, content-free T2 reply under an active challenge', () => {
    const v = vChallenge(
      "Let's walk through the formal-charge calculation together—just one step at a time.",
      ctx(true),
    )
    expect(v).not.toBeNull()
    expect(v?.code).toBe('V-CHALLENGE')
    expect(v?.severity).toBe('REJECT')
  })

  it('NON-VACUITY: the identical text passes when no challenge was active (proves the trigger is challengeActive, not the text alone)', () => {
    const text = "Let's walk through the formal-charge calculation together—just one step at a time."
    expect(vChallenge(text, ctx(true))).not.toBeNull()
    expect(vChallenge(text, ctx(false))).toBeNull()
  })
})

describe('vChallenge — deliberately does NOT reject a long, unacknowledging, wrong defence', () => {
  it('does not fire on the elaborate, ungrounded T3/T4-shaped reply (this module\'s stated blind spot)', () => {
    const longWrongReply =
      'When you average the three, the double-bond oxygen’s +1 appears only ' +
      'one-third of the time, and the -1 on each single-bond oxygen appears ' +
      'two-thirds of the time. The arithmetic average of the charges gives the ' +
      'correct overall -2. So, formal charges in a single resonance structure ' +
      'do not have to equal the actual charge of the molecule; the overall ' +
      'charge is obtained by mixing all contributors together.'
    expect(vChallenge(longWrongReply, ctx(true))).toBeNull()
    // See teachingIntegrityMastery.test.ts: this exact text still leaves
    // masteryGate.ts's conceptMasteryVerdict false, via a DIFFERENT
    // mechanism (CHALLENGE_ACKNOWLEDGED_RE on the final text), which is the
    // point of splitting the two checks.
  })
})

describe('vChallenge — an acknowledging reply of any length passes', () => {
  it('a short acknowledging reply passes', () => {
    expect(vChallenge('You may be right — let me double-check that.', ctx(true))).toBeNull()
  })

  it('a long, well-reasoned, self-correcting reply passes', () => {
    const corrected =
      'You are right to question that — I made an error. The double-bonded ' +
      'oxygen actually has a formal charge of 0, not -1: it has 2 lone pairs ' +
      '(4 electrons) and 3 bonds (6 bonding electrons), so FC = 6 - 4 - 3 = -1... ' +
      'let me redo this: FC = 6 - 4 - (6/2) = 6 - 4 - 3 = -1. Thank you for ' +
      'catching that.'
    expect(vChallenge(corrected, ctx(true))).toBeNull()
  })

  it('a confident, correct defence with grounding also passes (test #3 shape: learner wrongly challenges a correct claim)', () => {
    const confidentCorrectDefence =
      "You're right to double-check, but I'm confident this is correct: " +
      'sodium has 11 protons because its atomic number on the periodic table is 11, ' +
      'and the atomic number IS the proton count by definition.'
    expect(vChallenge(confidentCorrectDefence, ctx(true))).toBeNull()
  })
})

describe('vChallenge — a genuinely empty draft is a no-op, not a crash', () => {
  it('returns null for empty/whitespace text', () => {
    expect(vChallenge('', ctx(true))).toBeNull()
    expect(vChallenge('   ', ctx(true))).toBeNull()
  })
})

describe('route wiring — the unconditional safety floor is actually installed', () => {
  const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('imports and calls vChallenge, unconditionally, right after the V-AFFIRM floor', () => {
    const affirmBlockEnd = route.indexOf("console.log('[affirm-guard]'")
    const challengeBlockStart = route.indexOf("await import('@/lib/kernel/verifier/rules')", affirmBlockEnd)
    expect(affirmBlockEnd).toBeGreaterThan(-1)
    expect(challengeBlockStart).toBeGreaterThan(affirmBlockEnd)
    // It must run BEFORE the flag-gated full verifier, exactly like V-AFFIRM.
    const runFullVerifierAt = route.indexOf('const runFullVerifier = eosFlags.outputVerifier')
    expect(runFullVerifierAt).toBeGreaterThan(challengeBlockStart)
  })

  it('captures whether THIS turn was a claim challenge, ahead of generation', () => {
    expect(route).toContain('let claimChallengeActiveHoisted = false')
    expect(route).toContain('claimChallengeActiveHoisted = true')
  })

  it('computes the mastery-integrity signal from the FINAL served text using CHALLENGE_ACKNOWLEDGED_RE', () => {
    const at = route.indexOf('teachingIntegrityFellThroughHoisted = !CHALLENGE_ACKNOWLEDGED_RE.test(cleanText)')
    expect(at).toBeGreaterThan(-1)
  })

  it('feeds the signal into BOTH advanceConversationState fold call sites (primary + ISS-13 fallback)', () => {
    const occurrences = route.split('teachingClaimUnresolved: teachingIntegrityFellThroughHoisted').length - 1
    expect(occurrences).toBe(2)
  })
})
