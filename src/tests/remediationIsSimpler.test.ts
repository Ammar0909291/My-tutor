/**
 * PHASE H2 — A REMEDIATION TURN MUST BE SIMPLER, NOT MERELY DIFFERENT.
 *
 * ── WHAT H1 LEFT OPEN ───────────────────────────────────────────────────────
 * H1 made "sir i not understand this" visible (`explain_differently`) and made
 * the first struggle bound the reply length. Live in chemistry
 * (`chem.thermo.bond-enthalpy`, 2026-08-27) the engine then did everything
 * right — helpRequestKind=explain_differently, arbitration owner
 * LEARNER_REQUEST, conversation decision REPHRASE_REQUEST, strategy
 * FOUNDATION_REBUILD, no quiz attached — and the learner received a Haber-process
 * bond-enthalpy CALCULATION with ΔH, tabulated bond energies and the phrase
 * "kinetically unfavourable but thermodynamically driven".
 *
 * Shorter. Harder. An explicit FAIL.
 *
 * ── THE TRACE, AND WHY THE FIX IS HERE ──────────────────────────────────────
 * Read from the production modules and the production logs of that turn:
 *
 *   1. `detectLearnerRequest` -> 'explain_differently'   (H1)
 *   2. decisionEngine D-4b ANSWER-STUDENT-FIRST fires on
 *      studentIntent === 'requesting_help' -> ESCALATE_TO_LLM. It sits ABOVE
 *      D-1 SERVE_EXPLANATION_MEMORY deliberately, so `serveFromMemory` is
 *      false and `memoryFallbackReason` is 'Brain decision'.
 *   3. ESCALATE_TO_LLM dispatches to executor `LLM_OPEN`, and
 *      `buildBrainExecutionBlock` returns '' for anything that is not
 *      LLM_RENDERER — so the Brain adds NO scoping on this turn.
 *   4. `buildTeachingStrategyBlock` — whose FOUNDATION_REBUILD instructions
 *      say "use concrete, everyday examples before introducing formal
 *      definitions" and "avoid introducing extension material" — is NOT
 *      injected when the Brain runtime owns decisions
 *      (`legacyDecisionBlocksSuppressed()`), by design.
 *
 * So on a remediation turn the CONVERSATION directive built here is the ONLY
 * surviving instruction telling the model how to remediate. And it said:
 *
 *      "a different approach … a completely different angle …
 *       Never repeat any previous explanation, analogy, or wording."
 *
 * Different. Never the same thing again. Nothing about DIFFICULTY — and the
 * "never repeat" clause forbids the single move a human tutor makes first:
 * say the same idea again, more plainly. That is the mechanism that produced
 * "shorter but harder", and this file pins its correction.
 *
 * ── WHY NOT THE AUTHORED-ASSET ROUTE (checked FIRST, and reported) ──────────
 * See `the authored-asset route was checked first` below. Measured against
 * production, not assumed.
 */
import { describe, it, expect } from 'vitest'
import { classifyConversation, buildConversationDirective } from '@/lib/teaching/conversationDecision'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const base = {
  recoveryKey: null,
  studentIntent: 'requesting_help',
  lastAssistantAskedQuestion: false,
  lastSignalCorrectness: null,
  hedged: false,
  helpRequestKind: 'explain_differently' as string | null,
}

const decide = (message: string, over: Partial<typeof base> = {}) =>
  classifyConversation(message, { ...base, ...over })

// ── C — the remediation instruction must name DIFFICULTY, not just novelty ──

/**
 * The words that make a remediation directive actually remediate. Asserted as
 * a set of REQUIRED IDEAS rather than a quoted sentence, so the wording can be
 * improved later without this test having to be rewritten — but not dropped.
 */
const SIMPLIFY_IDEAS = [
  /simpler|more simply|plainer|plain language/i,   // the direction of travel
  /concrete|everyday|familiar/i,                    // the anchor
  /(no|never|do not|don't).{0,40}(new formula|formula|derivation|equation|calculation|notation)/i,
]

describe('H2 — the remediation directive tells the model to go SIMPLER', () => {
  const CONFUSION_MESSAGES = [
    'sir i not understand this',
    'i not understand',
    'i cannot understand',
    "i can't understand this",
    'i am not getting it',
    'i am weak in this',
    "I don't understand this at all",
    "I'm confused",
    'this makes no sense',
    'huh?',
  ]

  for (const m of CONFUSION_MESSAGES) {
    it(`"${m}" is classified as CONFUSION, not as a request for a new angle`, () => {
      // A learner saying they do not understand is CONFUSED. Before H2 the
      // classifier re-read the raw text with `CONFUSION_RE`, a second,
      // narrower copy of exactly the textbook-English-only pattern H1 fixed in
      // masteryGate — so every non-standard phrasing fell through to
      // REPHRASE_REQUEST and was answered with "a completely different angle".
      expect(decide(m).type).toBe('CONFUSION')
    })
  }

  it('the CONFUSION directive states the simplify constraint', () => {
    const d = decide('sir i not understand this')
    for (const idea of SIMPLIFY_IDEAS) {
      expect(d.rendererDirective, idea.source).toMatch(idea)
    }
  })

  it('the CONFUSION directive still says the previous explanation did not land', () => {
    // Pre-existing behaviour pinned by conversationReplay.test.ts. Preserved.
    expect(decide("I don't get why mass matters").rendererDirective).toMatch(/previous explanation/i)
  })

  it('it no longer forbids saying the same idea again more plainly', () => {
    // "Never repeat any previous explanation, analogy, or wording" removed the
    // one move a human tutor makes first. Its absence is the fix, so its
    // absence is asserted.
    const all = [decide('sir i not understand this'), decide('explain it another way')]
    for (const d of all) {
      expect(d.rendererDirective).not.toMatch(/never repeat any previous explanation/i)
    }
  })

  it('REPHRASE_REQUEST survives — an explicit ask for another way is not confusion', () => {
    // Pinned by conversationDecision.test.ts:42 and conversationReplay.test.ts:85.
    // H2 must not collapse the two branches: "explain it differently" is a
    // request for a different approach, and that reading is correct.
    const d = decide('explain it another way')
    expect(d.type).toBe('REPHRASE_REQUEST')
    expect(decide('explain it differently').type).toBe('REPHRASE_REQUEST')
    expect(decide('explain it differently').rendererDirective).toMatch(/different angle/i)
    // …but even an explicit request for a different angle must not ESCALATE.
    expect(d.rendererDirective).toMatch(/simpler|more simply|plainer/i)
  })

  it('the directive forbids advancing the curriculum on a remediation turn', () => {
    for (const m of ['sir i not understand this', 'explain it another way']) {
      expect(decide(m).rendererDirective, m).toMatch(/same (idea|concept)|this concept|stay/i)
    }
  })
})

// ── D — ordinary teaching turns are untouched ───────────────────────────────

describe('H2 — every other conversation class is byte-identical', () => {
  it('a learner with no help signal is unaffected', () => {
    const d = decide('the answer is 42', { studentIntent: 'answering', helpRequestKind: null })
    expect(d.type).not.toBe('CONFUSION')
    expect(d.type).not.toBe('REPHRASE_REQUEST')
  })

  it('distress still routes to FRUSTRATION, and recovery still outranks everything', () => {
    expect(decide('this is useless', { studentIntent: 'expressing_distress' }).type).toBe('FRUSTRATION')
    expect(decide('i give up', { recoveryKey: 'give_up' }).type).toBe('RECOVERY')
  })

  it('boredom, curiosity and acknowledgement are unchanged', () => {
    expect(decide('this is boring', { studentIntent: 'answering', helpRequestKind: null }).type).toBe('BOREDOM')
    expect(decide('what happens if the mass doubles', { studentIntent: 'answering', helpRequestKind: null }).type)
      .toBe('CURIOSITY')
  })

  it('the directive block wrapper is unchanged', () => {
    const block = buildConversationDirective(decide('sir i not understand this'))
    expect(block).toMatch(/^CONVERSATION \(respond to the student FIRST/)
    expect(block).toContain('CONFUSION')
  })
})

// ── A/B/E — the authored-asset route, checked FIRST and reported ────────────

describe('H2 — the authored-asset route was checked first', () => {
  /**
   * The H2 brief's preferred fix was to make the authored explanation win
   * instead of escalating to the LLM. It was traced to its exact decision and
   * then MEASURED against production before being adopted or rejected.
   *
   * WHAT ROUTES PAST IT — one rule, and it is deliberate:
   *   decisionEngine D-4b ANSWER-STUDENT-FIRST fires on
   *   `studentIntent === 'requesting_help'` and returns ESCALATE_TO_LLM, and
   *   its own comment states the intent: "Outranks memory serving too: a
   *   stored explanation keyed to the concept is not an answer to the
   *   student's specific question." D-1 SERVE_EXPLANATION_MEMORY sits below it.
   *   The precedent for carving out ONE help-request kind above D-4b already
   *   exists: D-6 VISUAL-ON-REQUEST does exactly that for
   *   `helpRequestKind === 'diagram'`.
   *
   * WHY THE SAME CARVE-OUT WAS **NOT** MADE FOR `explain_differently`
   * (production data, 2026-08-27, read directly from the live database):
   *   · 470 of 683 concepts with an ACTIVE core_explanation have exactly ONE
   *     gradeBand authored; 210 have two; 3 have three. There is no
   *     lower-band remediation variant to prefer for the large majority.
   *   · Both live-run concepts have exactly one band (HIGH), so the
   *     `grade_fallback` servingMode in the logs means "the only authored
   *     band is not the learner's band" — NOT "a simpler variant was found".
   *   · The asset that would have been served for chem.thermo.bond-enthalpy
   *     opens: "Bond enthalpy quantifies energy for one MOLE of a specific
   *     bond broken in the GAS phase — always a POSITIVE (endothermic)
   *     value…", and goes on to ΔH_rxn = Σ(broken) − Σ(formed) and Hess's
   *     Law. That is a dense reference summary containing the exact
   *     formalism the learner was struggling with.
   *
   * Serving it would fail this phase's own pass bar on points 2, 3, 4 and 6.
   * So the carve-out is NOT shipped, and this test exists to record that the
   * preferred route was investigated and rejected on evidence — not skipped.
   */
  const ENGINE = readFileSync(join(process.cwd(), 'src/lib/understanding/decisionEngine.ts'), 'utf8')

  it('D-4b still outranks memory serving — unchanged by H2', () => {
    const d4b = ENGINE.indexOf("'D4b-ANSWER-STUDENT-FIRST'")
    const d1 = ENGINE.indexOf("'D1-MEMORY-HIT'")
    expect(d4b).toBeGreaterThan(-1)
    expect(d1).toBeGreaterThan(d4b)
  })

  it('the diagram carve-out above D-4b still exists, and is still diagram-only', () => {
    const d6 = ENGINE.indexOf("'D6-VISUAL-ON-REQUEST'")
    expect(d6).toBeGreaterThan(-1)
    expect(d6).toBeLessThan(ENGINE.indexOf("'D4b-ANSWER-STUDENT-FIRST'"))
    // No explain_differently carve-out was added — see the block comment.
    expect(ENGINE).not.toMatch(/helpRequestKind === 'explain_differently'/)
  })

  it('E — when nothing is served from memory the existing LLM path is intact', () => {
    // `memoryFallbackReason = 'Brain decision'` is the honest, pre-existing
    // record of that route, and H2 does not touch it.
    const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(ROUTE).toContain("memoryFallbackReason = 'Brain decision'")
    expect(ROUTE).toContain("serveFromMemory = dispatchPlanHoisted.executor === 'EXPLANATION_MEMORY'")
  })

  it('F — a shorter model answer is not evidence of remediation', () => {
    // The trap H1 fell into, written down so it cannot be repeated: nothing in
    // this file asserts a length. The directive is asserted on the CONTENT of
    // its constraint, and the live runs are judged on the learner-visible text.
    const self = readFileSync(join(process.cwd(), 'src/tests/remediationIsSimpler.test.ts'), 'utf8')
    expect(self).not.toMatch(/toBeLessThan\(\s*\d+\s*\)\s*\/\/\s*words/)
  })
})

// ── G/H/I/J — the phases below H2 stay closed ───────────────────────────────

describe('H2 — H1, D1 and D2 invariants re-pinned', () => {
  it('G — the H1 detector still sees every widened phrasing', () => {
    for (const p of [
      'sir i not understand this', 'i not understand', 'i cannot understand',
      "i can't understand this", 'i am not getting it', 'please explain easy',
      'explain in easy way', 'simple please', 'teach me', 'ok sir please teach me',
      'i am weak in this',
    ]) {
      expect(detectLearnerRequest(p), p).toBe('explain_differently')
    }
    // …and still refuses the negative controls.
    expect(detectLearnerRequest('teach me about relativity')).toBeNull()
    expect(detectLearnerRequest('not following the instructions')).toBeNull()
    expect(detectLearnerRequest('I understand this now')).toBeNull()
  })

  it('I — "ok sir" is still an acknowledgement, in this module too', () => {
    // classifyConversation must not read a bare acknowledgement as either
    // confusion or understanding.
    const d = decide('ok sir', { studentIntent: 'answering', helpRequestKind: null })
    expect(d.type).not.toBe('CONFUSION')
    expect(d.type).not.toBe('REPHRASE_REQUEST')
    expect(d.type).not.toBe('CONFIDENCE')
  })

  it('J — the D1 and D2 fixes are still in the route', () => {
    const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    // D1: a probe is spent on the turn its answer is graded.
    expect(ROUTE).toContain('excludeProbeStem: historyForGate ? (stem) => hasAskedMcq(historyForGate, stripAuthoringLabel(stem)) : undefined')
    // D2: a tapped option reaches the classifier as an answer.
    expect(ROUTE).toMatch(/offeredMcqOptions: pendingMcqHoisted\?\.options/)
  })
})
