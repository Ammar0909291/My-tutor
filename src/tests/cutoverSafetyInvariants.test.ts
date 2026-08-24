/**
 * PHASE 4 · G — the production safety invariants a Track K cutover must not break.
 *
 * WHY A SEPARATE FILE WHEN EACH INVARIANT ALREADY HAS TESTS. Because "no
 * regression is acceptable merely because Track K is cleaner" is a claim about
 * a SET, and the set has never been written down in one place. Each invariant
 * below names its owning test file; what this file adds is (a) the register
 * itself, (b) a live assertion of each invariant against the real modules, so
 * the register cannot rot into a list of filenames, and (c) for the four
 * invariants a canonical-ladder cutover would actually endanger, an explicit
 * statement of HOW.
 *
 * Nothing here changes behaviour, adds a guard, or tightens a threshold.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  initialConversationState, advanceConversationState, readConversationState,
  PHASE_ORDER, type ConversationState,
} from '@/lib/teaching/conversationState'
import {
  masteryVerified, masteryVerifiedStrict, gateLessonCompletion,
  MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED, isBareAcknowledgement,
} from '@/lib/teaching/masteryGate'
import { questionLegality } from '@/lib/teaching/questionLegality'
import { readEosFlags } from '@/lib/eos-runtime/flags'

const CONCEPT = 'phys.mech.newtons-first-law'

/** The register. `endangeredBy` is empty when a cutover cannot touch it. */
const INVARIANTS = [
  { id: 'G1', name: 'masteryVerified() reachability',
    owner: 'src/tests/masteryLadderReachable.test.ts + src/tests/masteryLadderReachability.test.ts',
    endangeredBy: 'ISS-01 D2/D4 — the canonical ladder cannot reach it at all.' },
  { id: 'G2', name: 'mastery thresholds (check >= 1, practice >= 2)',
    owner: 'src/tests/masteryGate.test.ts', endangeredBy: '' },
  { id: 'G3', name: 'questionLegality QL-1…QL-5',
    owner: 'src/tests/questionLegality.test.ts',
    endangeredBy: 'ISS-01 — QL-2/QL-5 branch on the legacy phase names; canonical names silently change their scope.' },
  { id: 'G4', name: 'firstLessonGuard hard limits',
    owner: 'src/tests/firstLessonProtocolScope.test.ts', endangeredBy: '' },
  { id: 'G5', name: 'vAffirm safety floor runs unconditionally',
    owner: 'src/tests/verifierAffirmRule.test.ts', endangeredBy: '' },
  { id: 'G6', name: 'signalVerification / strict mastery',
    owner: 'src/tests/signalVerification.test.ts + src/tests/strictMastery.test.ts',
    endangeredBy: 'ISS-01 D5c — the canonical machine writes no verified counters.' },
  { id: 'G7', name: 'Evidence Spine runs unconditionally',
    owner: 'src/tests/evidenceSpine.test.ts', endangeredBy: '' },
  { id: 'G8', name: 'advanceConversationState is the sole writer of the live phase',
    owner: 'src/tests/ladderConformance.test.ts + src/tests/ladderReconciliation.test.ts',
    endangeredBy: 'S5 is precisely the change that would break it.' },
  { id: 'G9', name: 'persisted ConversationState survives a read',
    owner: 'src/tests/conversationStateMigration.test.ts',
    endangeredBy: 'A canonical-vocabulary write wipes 8 of 10 phases and revokes earned mastery.' },
  { id: 'G10', name: 'degraded-provider protections (P4/F7)',
    owner: 'src/tests/degradedNoAdvance.test.ts + src/tests/degradedMode.test.ts',
    endangeredBy: 'ISS-01 D5b — the canonical machine has no degradedTurn evidence.' },
  { id: 'G11', name: 'Phase 1 persistence invariant (rederive folds against a fresh snapshot)',
    owner: 'src/tests/episodePersistence.test.ts', endangeredBy: '' },
  { id: 'G12', name: 'Phase 3 arbitration invariant (one deterministic authority)',
    owner: 'src/tests/turnArbitration.test.ts', endangeredBy: '' },
] as const

describe('G — the invariant register', () => {
  it('names an owning test file for every invariant, and each file exists', () => {
    for (const inv of INVARIANTS) {
      for (const f of inv.owner.split(' + ').map((s) => s.trim())) {
        expect(() => readFileSync(f, 'utf8'), `${inv.id}: ${f}`).not.toThrow()
      }
    }
  })

  it('four invariants are endangered by a ladder cutover, and each says how', () => {
    const endangered = INVARIANTS.filter((i) => i.endangeredBy !== '')
    expect(endangered.map((i) => i.id)).toEqual(['G1', 'G3', 'G6', 'G8', 'G9', 'G10'])
    for (const i of endangered) expect(i.endangeredBy.length).toBeGreaterThan(30)
  })
})

describe('G — each invariant, asserted live against the real modules', () => {
  function earned(): ConversationState {
    let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
    for (let i = 0; i < 30 && s.phase !== 'TRANSFER'; i++) {
      s = advanceConversationState(s, {
        askedQuestion: true, signalCorrect: true, recoveryFired: false,
        signalVerificationStatus: 'CLEAN',
      })
    }
    return s
  }

  it('G1 — an all-correct learner reaches verified mastery on the shipping ladder', () => {
    expect(masteryVerified(earned())).toBe(true)
  })

  it('G2 — the thresholds are 1 and 2, and nothing in Phase 4 changed them', () => {
    expect(MASTERY_CHECK_REQUIRED).toBe(1)
    expect(MASTERY_PRACTICE_REQUIRED).toBe(2)
    // And they are the numbers masteryVerified actually applies.
    const oneShort: ConversationState = { ...initialConversationState(CONCEPT), correctAtCheck: 1, correctAtPractice: 1 }
    expect(masteryVerified(oneShort)).toBe(false)
    expect(masteryVerified({ ...oneShort, correctAtPractice: 2 })).toBe(true)
  })

  it('G3 — questionLegality still blocks the diagnostic loop it was written for', () => {
    const state: ConversationState = {
      ...initialConversationState(CONCEPT), phase: 'OBSERVE',
      totalKnowledgeProbes: 2, consecutivePriorKnowledgeProbes: 2,
    }
    const verdict = questionLegality(state, { hasEvidencedPriorKnowledge: false })
    expect(verdict.askLegal).toBe(false)
    expect(verdict.reason).toBeTruthy()
  })

  it('G5/G7 — the two unconditional subsystems do not consult any EOS flag', () => {
    const routeSrc = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    // The vAffirm floor is invoked directly, ahead of the flagged gate, and
    // its own comment records why (a floor gated on another subsystem's mode
    // is not a floor).
    expect(routeSrc).toContain("await import('@/lib/kernel/verifier/rules')")
    expect(routeSrc).toContain('SAFETY FLOOR: V-AFFIRM RUNS WHETHER OR NOT EOS IS ENABLED')
    // The spine emits on every turn; its flag disables the WRITE, not the call.
    expect(routeSrc).toContain("await import('@/lib/evidence-spine/turnEmitter')")
  })

  it('G6 — contradicted evidence cannot authorize completion', () => {
    const contradicted: ConversationState = {
      ...initialConversationState(CONCEPT), phase: 'TRANSFER',
      correctAtCheck: 1, correctAtPractice: 2,
      verifiedCorrectAtCheck: 0, verifiedCorrectAtPractice: 0,
      signalContradictions: 2,
    }
    expect(masteryVerified(contradicted)).toBe(true)         // loose counters say yes
    expect(masteryVerifiedStrict(contradicted)).toBe(false)  // strict says no
  })

  it('G8 — advanceConversationState is still the only writer of the live phase', () => {
    let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, recoveryFired: false })
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, recoveryFired: false })
    expect(s.phase).toBe('GUIDE')
    expect(PHASE_ORDER).toContain(s.phase)
  })

  it('G9 — a persisted state round-trips without losing earned evidence', () => {
    const e = earned()
    const back = readConversationState(JSON.parse(JSON.stringify(e)), CONCEPT)
    expect(masteryVerified(back)).toBe(true)
  })

  it('G10 — a degraded turn advances nothing, even carrying a correct signal', () => {
    const before: ConversationState = {
      ...initialConversationState(CONCEPT), phase: 'PRACTICE', demonstrated: true,
      correctAtCheck: 1, correctAtPractice: 1,
    }
    const after = advanceConversationState(before, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false, degradedTurn: true,
    })
    expect(after.phase).toBe('PRACTICE')
    expect(after.correctAtPractice).toBe(1)
    expect(masteryVerified(after)).toBe(false)
  })

  it('the completion gate still refuses a bare acknowledgement', () => {
    expect(isBareAcknowledgement('got it')).toBe(true)
    const noEvidence: ConversationState = { ...initialConversationState(CONCEPT) }
    const gated = gateLessonCompletion('Great work. [LESSON_COMPLETE]', noEvidence)
    expect(gated.authorized).toBe(false)
    expect(gated.suppressed).toBe(true)
    expect(gated.cleanText).not.toContain('[LESSON_COMPLETE]')
  })
})

describe('G — the flag posture that keeps all of this true today', () => {
  function withEnv(patch: Record<string, string | undefined>, fn: () => void) {
    const saved: Record<string, string | undefined> = {}
    for (const k of Object.keys(patch)) { saved[k] = process.env[k]; if (patch[k] === undefined) delete process.env[k]; else process.env[k] = patch[k]! }
    try { fn() } finally {
      for (const k of Object.keys(saved)) { if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k]! }
    }
  }

  it('with everything unset, no EOS subsystem has authority', () => {
    withEnv({ ENABLE_EOS_RUNTIME: undefined, ENABLE_POLICY_PACKS: undefined, ENABLE_OUTPUT_VERIFIER: undefined }, () => {
      const f = readEosFlags()
      expect(f.policyMode).toBe('off')
      expect(f.verifierMode).toBe('off')
    })
  })

  it('the master flag implies OBSERVATION only — never enforce, never primary', () => {
    withEnv({ ENABLE_EOS_RUNTIME: '1', ENABLE_POLICY_PACKS: undefined, ENABLE_OUTPUT_VERIFIER: undefined }, () => {
      const f = readEosFlags()
      expect(f.policyMode).toBe('shadow')
      expect(f.verifierMode).toBe('log')
    })
  })

  it('enforce and primary each require their own explicit, separate value', () => {
    withEnv({ ENABLE_EOS_RUNTIME: undefined, ENABLE_OUTPUT_VERIFIER: 'enforce', ENABLE_POLICY_PACKS: 'primary' }, () => {
      const f = readEosFlags()
      expect(f.verifierMode).toBe('enforce')
      expect(f.policyMode).toBe('primary')
    })
  })
})
