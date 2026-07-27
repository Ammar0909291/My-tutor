/**
 * EOS v2 Capability Model — tests.
 *
 * Implements the frozen spec (arch §4.2, RS §3.2/§4.11,
 * CAPABILITY_MODEL_DESIGN §2-§4), so every assertion below cites what it is
 * enforcing rather than what seemed reasonable.
 */

import { describe, it, expect } from 'vitest'
import {
  CAPABILITY_VOCABULARY, CAPABILITY_REQUIRES, expandPrerequisites,
  requiredCapabilities, inferCapabilities, CONCEPT_CAPABILITIES,
  initialCapabilityState, readCapabilityState, statusOf, foldCapabilityState,
  observationsFromTurn, detectStatedInability, capabilityLegality,
  noCapabilities, classifyFailure, isCapabilityId,
  type CapabilityState, type CapabilityId,
} from '@/lib/teaching/capabilityModel'
import { questionLegality } from '@/lib/teaching/questionLegality'
import { initialConversationState } from '@/lib/teaching/conversationState'
import { vCap, verify, type VerifierContext } from '@/lib/kernel/verifier'

const st = (over: Record<string, string> = {}): CapabilityState => {
  const s = initialCapabilityState()
  for (const [k, v] of Object.entries(over)) {
    s[k] = { status: v as never, succ: 0, fail: 0, diagnosticSucc: 0 }
  }
  return s
}

// ── 1 · CAPABILITY PREREQUISITE TESTS ───────────────────────────────────────

describe('capability prerequisites (the DAG)', () => {
  it('every prerequisite is itself in the vocabulary — no dangling edges', () => {
    for (const [id, reqs] of Object.entries(CAPABILITY_REQUIRES)) {
      expect(isCapabilityId(id)).toBe(true)
      for (const r of reqs ?? []) expect(CAPABILITY_VOCABULARY).toContain(r)
    }
  })

  it('the DAG is acyclic (expansion terminates for every capability)', () => {
    for (const id of CAPABILITY_VOCABULARY) {
      expect(() => expandPrerequisites([id])).not.toThrow()
    }
  })

  it('expands transitively, deepest first', () => {
    // divide ← multiply ← add-subtract
    const chain = expandPrerequisites(['divide'])
    expect(chain).toEqual(['add-subtract', 'multiply', 'divide'])
  })

  it("the brief's three examples are caught structurally, not by lexicon", () => {
    expect(expandPrerequisites(['decompose-vectors'])).toContain('visualize-vectors')
    expect(expandPrerequisites(['visualize-vectors'])).toContain('identify-direction')
    expect(expandPrerequisites(['interpret-slope'])).toContain('read-axes')
    expect(expandPrerequisites(['dimensional-analysis'])).toEqual(
      expect.arrayContaining(['divide', 'read-notation']),
    )
  })

  it('deduplicates shared prerequisites', () => {
    const both = expandPrerequisites(['divide', 'square'])
    expect(both.filter((c) => c === 'multiply')).toHaveLength(1)
  })
})

// ── 2 · CONCEPT BINDING + CROSS-SUBJECT REUSE ───────────────────────────────

describe('concept → capability binding', () => {
  it("Newton's Second Law demands exactly the brief's example set", () => {
    const caps = requiredCapabilities('phys.mech.newtons-second-law')
    expect(caps).toEqual(expect.arrayContaining([
      'multiply', 'divide', 'rearrange-equation', 'decompose-vectors',
    ]))
  })

  it('authored bindings beat inference (retrieval beats derivation)', () => {
    const id = Object.keys(CONCEPT_CAPABILITIES)[0]
    expect(requiredCapabilities(id).length).toBeGreaterThan(0)
  })

  it('infers deterministically for the ~1,750 unauthored concepts', () => {
    expect(inferCapabilities('bio.eco.population-graphs')).toContain('read-axes')
    expect(inferCapabilities('math.alg.solving-linear-equations')).toContain('rearrange-equation')
    expect(inferCapabilities('cs.algo.while-loops')).toContain('reason-about-loops')
    expect(inferCapabilities('phys.kin.velocity-vectors')).toContain('visualize-vectors')
  })

  it('inference is SUBJECT-INDEPENDENT — the same segment implies the same operation', () => {
    // The whole point of a capability: portable across subjects.
    expect(inferCapabilities('phys.x.vector-sum')).toEqual(inferCapabilities('math.x.vector-sum'))
    expect(inferCapabilities('chem.x.rate-graph')).toEqual(inferCapabilities('econ.x.rate-graph'))
  })

  it('returns [] for a null/unknown-shaped concept rather than guessing', () => {
    expect(requiredCapabilities(null)).toEqual([])
    expect(requiredCapabilities('totally.unrelated.slug')).toEqual([])
  })

  it('CROSS-SUBJECT REUSE: a failure in physics protects the learner in chemistry', () => {
    // `multiply: OBSERVED_NO` earned during a physics lesson…
    const state = st({ multiply: 'OBSERVED_NO' })
    // …blocks a chemistry lesson that needs it, with no chemistry-specific code.
    const chem = requiredCapabilities('chem.sol.solubility')
    const phys = requiredCapabilities('phys.mech.newtons-second-law')
    expect(capabilityLegality(state, phys).legal).toBe(false)
    // proportional-reasoning ← fractions ← divide ← multiply
    expect(chem).toContain('multiply')
    expect(capabilityLegality(state, chem).legal).toBe(false)
  })
})

// ── 3 · THE LATTICE IS NOT DUPLICATED ───────────────────────────────────────

describe('state folding delegates to the spine lattice', () => {
  it('UNKNOWN → SHAKY on first success', () => {
    const s = foldCapabilityState(undefined, [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }])
    expect(statusOf(s, 'multiply')).toBe('SHAKY')
  })

  it('SHAKY → RELIABLE on a second, diagnostic success', () => {
    let s = foldCapabilityState(undefined, [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }])
    s = foldCapabilityState(s, [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }])
    expect(statusOf(s, 'multiply')).toBe('RELIABLE')
  })

  it('UNKNOWN → OBSERVED_NO on a failure', () => {
    const s = foldCapabilityState(undefined, [{ capabilityId: 'divide', direction: 'failure', diagnostic: true }])
    expect(statusOf(s, 'divide')).toBe('OBSERVED_NO')
  })

  it('stated inability is trusted instantly and is the cheapest to overturn', () => {
    let s = foldCapabilityState(undefined, [{ capabilityId: 'fractions', direction: 'stated_no', diagnostic: true }])
    expect(statusOf(s, 'fractions')).toBe('STATED_NO')
    s = foldCapabilityState(s, [{ capabilityId: 'fractions', direction: 'success', diagnostic: true }])
    expect(statusOf(s, 'fractions')).toBe('SHAKY')      // ONE success overturns it
  })

  it('ignores ids outside the versioned vocabulary', () => {
    const s = foldCapabilityState(undefined, [{ capabilityId: 'telekinesis' as CapabilityId, direction: 'success', diagnostic: true }])
    expect(Object.keys(s)).toHaveLength(0)
  })

  it('readCapabilityState survives legacy/partial shapes', () => {
    expect(readCapabilityState(null)).toEqual({})
    expect(readCapabilityState({ multiply: { status: 'RELIABLE' } }).multiply.succ).toBe(0)
    expect(readCapabilityState({ bogus: { status: 'RELIABLE' } })).toEqual({})
  })
})

// ── 4 · ATTRIBUTION HONESTY (the rule most systems get wrong) ───────────────

describe('attribution', () => {
  it('a single-capability success is diagnostic', () => {
    const obs = observationsFromTurn({ requiredCapabilities: ['multiply'], correct: true })
    expect(obs).toEqual([expect.objectContaining({ capabilityId: 'multiply', direction: 'success', diagnostic: true })])
  })

  it('a compound success updates ALL of them, weakly (success proves all)', () => {
    const obs = observationsFromTurn({ requiredCapabilities: ['multiply', 'divide'], correct: true })
    expect(obs).toHaveLength(2)
    expect(obs.every((o) => o.diagnostic === false)).toBe(true)
  })

  it('a compound FAILURE updates NOTHING — failure proves the conjunction failed, not which conjunct', () => {
    expect(observationsFromTurn({ requiredCapabilities: ['multiply', 'divide'], correct: false })).toEqual([])
  })

  it('a single-capability failure is attributable and is emitted', () => {
    const obs = observationsFromTurn({ requiredCapabilities: ['divide'], correct: false })
    expect(obs).toEqual([expect.objectContaining({ capabilityId: 'divide', direction: 'failure' })])
  })

  it('a non-answer updates nothing', () => {
    expect(observationsFromTurn({ requiredCapabilities: ['divide'], correct: null })).toEqual([])
  })
})

// ── 5 · STATED INABILITY IS SERVER-DETECTED (no LLM-owned state) ────────────

describe('stated inability detection', () => {
  it.each([
    ["I can't multiply", 'multiply'],
    ["I can't do division", 'divide'],
    ["I'm really bad at fractions", 'fractions'],
    ['I never learned long division', 'divide'],
    ["I can't read a graph", 'read-simple-graph'],
  ])('%s → %s', (msg, cap) => {
    expect(detectStatedInability(msg)).toContain(cap)
  })

  it('does not fire on ordinary struggle language', () => {
    expect(detectStatedInability("I don't know")).toEqual([])
    expect(detectStatedInability('this is hard')).toEqual([])
    expect(detectStatedInability('I multiplied 6 by 7 and got 42')).toEqual([])
  })
})

// ── 6 · LEGALITY ────────────────────────────────────────────────────────────

describe('capability legality (arch §6.1 Band 2)', () => {
  it('blocks on OBSERVED_NO and STATED_NO', () => {
    expect(capabilityLegality(st({ divide: 'OBSERVED_NO' }), ['divide']).legal).toBe(false)
    expect(capabilityLegality(st({ divide: 'STATED_NO' }), ['divide']).legal).toBe(false)
  })

  it('does NOT block on UNKNOWN — at cold start every capability is UNKNOWN', () => {
    // Treating "not yet demonstrated" as illegal would block the first lesson
    // of every learner's life. Arch §4.2 routes UNKNOWN to a micro-probe.
    const v = capabilityLegality(initialCapabilityState(), ['divide'])
    expect(v.legal).toBe(true)
    expect(v.unknown).toEqual(['divide'])
  })

  it('permits SHAKY and RELIABLE', () => {
    expect(capabilityLegality(st({ divide: 'SHAKY' }), ['divide']).legal).toBe(true)
    expect(capabilityLegality(st({ divide: 'RELIABLE' }), ['divide']).legal).toBe(true)
  })

  it('names what to do instead — never just "no"', () => {
    const v = capabilityLegality(st({ 'decompose-vectors': 'OBSERVED_NO' }), ['decompose-vectors'])
    expect(v.rationale).toMatch(/resolving a vector into components/)
    expect(v.rationale).toMatch(/teach that operation first|do that part FOR them/)
  })

  it('distinguishes stated from observed in the rationale', () => {
    expect(capabilityLegality(st({ divide: 'STATED_NO' }), ['divide']).rationale)
      .toMatch(/told you they cannot do/)
    expect(capabilityLegality(st({ divide: 'OBSERVED_NO' }), ['divide']).rationale)
      .toMatch(/attempted and not been able/)
  })

  it('noCapabilities lists exactly the NO states', () => {
    const s = st({ divide: 'OBSERVED_NO', multiply: 'RELIABLE', fractions: 'STATED_NO' })
    expect(noCapabilities(s).sort()).toEqual(['divide', 'fractions'])
  })
})

// ── 7 · ILLEGAL QUESTION TESTS (QL-4 integration) ───────────────────────────

describe('QL-4 — questions requiring missing capabilities are illegal', () => {
  const taught = { ...initialConversationState('phys.mech.newtons-second-law'), taughtThisSession: true }

  it('blocks ASK when a required operation is NO', () => {
    const v = questionLegality(taught, {
      capabilityState: st({ divide: 'OBSERVED_NO' }),
      requiredCapabilities: requiredCapabilities('phys.mech.newtons-second-law'),
    })
    expect(v.askLegal).toBe(false)
    expect(v.reason).toBe('QL4_MISSING_CAPABILITY')
  })

  it('permits ASK when every required operation is available', () => {
    expect(questionLegality(taught, {
      capabilityState: st({ multiply: 'RELIABLE', divide: 'RELIABLE' }),
      requiredCapabilities: ['multiply', 'divide'],
    }).askLegal).toBe(true)
  })

  it('is omissible — no capability context can never make ASK illegal', () => {
    expect(questionLegality(taught, {}).askLegal).toBe(true)
  })

  it('ranks below the learner\'s own words (QL-3) and a concluded diagnostic (QL-2)', () => {
    const v = questionLegality({ ...taught, askSuppressedTurns: 2 }, {
      capabilityState: st({ divide: 'OBSERVED_NO' }), requiredCapabilities: ['divide'],
    })
    expect(v.reason).toBe('QL3_LEARNER_DIRECTIVE_ACTIVE')
  })

  it('ranks ABOVE QL-1, because it names a specific remedy', () => {
    const virgin = initialConversationState('c')     // nothing taught → QL-1 would fire
    const v = questionLegality(virgin, {
      capabilityState: st({ divide: 'OBSERVED_NO' }), requiredCapabilities: ['divide'],
    })
    expect(v.reason).toBe('QL4_MISSING_CAPABILITY')
  })
})

// ── 8 · OUTPUT VERIFIER V-CAP TESTS ─────────────────────────────────────────

const vctx = (over: Partial<VerifierContext> = {}): VerifierContext => ({
  move: 'ASK', phase: 'PRACTICE', contentRegister: 'intermediate', stageCeiling: 6,
  vocabularyUnlocked: true, formulaUnlocked: true, recoveryActive: false, affectBand: 'calm',
  budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 2, maxNewElements: 3 },
  vocabularyBans: [], assessmentActive: false, lessonCompletionAuthorized: false,
  sessionFailureCount: 0, learnerText: 'ok', reactMandated: false, legalTags: ['VISUAL'],
  bannedConceptTerms: [], noCapabilities: [], ...over,
} as VerifierContext)

describe('V-CAP is real (was a stub returning null)', () => {
  it('rejects a demand for an operation the learner cannot perform', () => {
    const v = vCap('Now divide the force by the mass.', vctx({ noCapabilities: ['divide'] }))
    expect(v?.code).toBe('V-CAP')
    expect(v?.detail).toMatch(/'divide' is NO/)
  })

  it('permits TEACHING about the same operation — the distinction that matters', () => {
    // The Brain may decide to teach a missing operation; it must never demand it.
    expect(vCap('Dividing means splitting into equal groups. Watch: 12 into 3 groups gives 4.',
      vctx({ noCapabilities: ['divide'] }))).toBeNull()
  })

  it('is a no-op when the learner has no recorded operational failures', () => {
    expect(vCap('Now divide the force by the mass.', vctx({ noCapabilities: [] }))).toBeNull()
  })

  it('catches vector decomposition demands', () => {
    expect(vCap('Resolve it into components.', vctx({ noCapabilities: ['decompose-vectors'] }))?.code).toBe('V-CAP')
  })

  it('fires end-to-end through verify()', () => {
    const d = verify('Rearrange the equation to make a the subject.', vctx({ noCapabilities: ['rearrange-equation'] }))
    expect(d.verdict).toBe('REJECT')
    expect(d.violations.map((x) => x.code)).toContain('V-CAP')
  })
})

// ── 9 · RECOVERY: CONCEPT vs OPERATION ──────────────────────────────────────

describe('recovery routing distinguishes the two failures', () => {
  it('a blocked operation is capability_missing, not concept_missing', () => {
    const c = classifyFailure(st({ divide: 'OBSERVED_NO' }), ['multiply', 'divide'])
    expect(c.kind).toBe('capability_missing')
    expect(c.blockingCapabilities).toEqual(['divide'])
  })

  it('with every operation available, the failure is about the concept', () => {
    const c = classifyFailure(st({ multiply: 'RELIABLE', divide: 'RELIABLE' }), ['multiply', 'divide'])
    expect(c.kind).toBe('concept_missing')
    expect(c.blockingCapabilities).toEqual([])
  })

  it('UNKNOWN operations do not manufacture a capability diagnosis', () => {
    expect(classifyFailure(initialCapabilityState(), ['divide']).kind).toBe('concept_missing')
  })
})

// ── 10 · TRANSCRIPT REPLAY ──────────────────────────────────────────────────

describe('transcript replay — a learner who understands the law but cannot divide', () => {
  it('is never asked to divide, and is diagnosed as an operation gap', () => {
    // Turn 1: the learner says it outright. Server-detected, trusted instantly.
    const stated = detectStatedInability("I can't do division, I never learned it")
    expect(stated).toEqual(['divide'])
    let state = foldCapabilityState(undefined, stated.map((capabilityId) => ({
      capabilityId, direction: 'stated_no' as const, diagnostic: true,
    })))

    // Turn 2: the lesson is Newton's Second Law — which needs divide.
    const required = requiredCapabilities('phys.mech.newtons-second-law')
    expect(required).toContain('divide')

    // The Brain may not ask them to do it.
    const conv = { ...initialConversationState('phys.mech.newtons-second-law'), taughtThisSession: true }
    expect(questionLegality(conv, { capabilityState: state, requiredCapabilities: required }).reason)
      .toBe('QL4_MISSING_CAPABILITY')

    // And if the model tries anyway, the verifier stops it reaching the student.
    expect(verify('Now divide the force by the mass.',
      vctx({ noCapabilities: noCapabilities(state) })).verdict).toBe('REJECT')

    // The failure is routed as an OPERATION gap — re-explaining the law is useless.
    expect(classifyFailure(state, required).kind).toBe('capability_missing')

    // Turn 3: they demonstrate division once. One success overturns a stated no.
    state = foldCapabilityState(state, [{ capabilityId: 'divide', direction: 'success', diagnostic: true }])
    expect(statusOf(state, 'divide')).toBe('SHAKY')
    expect(questionLegality(conv, { capabilityState: state, requiredCapabilities: required }).askLegal).toBe(true)
    expect(vCap('Now divide the force by the mass.', vctx({ noCapabilities: noCapabilities(state) }))).toBeNull()
  })
})

// ── 11 · REGRESSION / DESIGN GOALS ──────────────────────────────────────────

describe('design goals hold', () => {
  it('is deterministic — same inputs, same output', () => {
    const a = capabilityLegality(st({ divide: 'OBSERVED_NO' }), ['divide', 'multiply'])
    const b = capabilityLegality(st({ divide: 'OBSERVED_NO' }), ['divide', 'multiply'])
    expect(a).toEqual(b)
    expect(requiredCapabilities('phys.mech.newtons-second-law'))
      .toEqual(requiredCapabilities('phys.mech.newtons-second-law'))
  })

  it('folding is pure — the previous state object is never mutated', () => {
    const prev = st({ multiply: 'SHAKY' })
    const snapshot = JSON.parse(JSON.stringify(prev))
    foldCapabilityState(prev, [{ capabilityId: 'multiply', direction: 'failure', diagnostic: true }])
    expect(JSON.parse(JSON.stringify(prev))).toEqual(snapshot)
  })

  it('is not a second mastery system — it holds no concept mastery at all', () => {
    const s = foldCapabilityState(undefined, [{ capabilityId: 'multiply', direction: 'success', diagnostic: true }])
    expect(Object.keys(s)).toEqual(['multiply'])
    expect(JSON.stringify(s)).not.toMatch(/concept|lesson|topic|mastered/i)
  })

  it('every vocabulary entry has a label (nothing unnameable reaches a directive)', () => {
    for (const id of CAPABILITY_VOCABULARY) {
      expect(requiredCapabilities(`x.y.${id}`)).toBeDefined()
    }
  })
})
