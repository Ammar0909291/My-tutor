/**
 * K5 — Output Verifier tests: every rule code, rejection protocol,
 * constrained re-render, template fallback, determinism, integration
 * with the K3 verify stage.
 */
import { describe, it, expect } from 'vitest'
import {
  verify, buildViolationAppendix,
  vQ1, vQ2, vStage, vVocName, vVocFormula, vVocReg, vTerms, vLen,
  vRec, vAssess, vTag, vComplete, vPraise, vReact, vCap,
  stripUnknownTags, withoutCodeFences, paragraphCount, questionCount,
  chooseFallback, renderFallback, templateMove,
  runVerifierLoop, type VerifierContext,
} from '@/lib/kernel/verifier'
import { enforcingVerifier, passthroughVerifier, verifyStage } from '@/lib/kernel/stages/verify'
import type { RenderDraft, RenderPlan } from '@/lib/kernel/types'

// ── Helpers ─────────────────────────────────────────────────────────────────

function ctx(over: Partial<VerifierContext> = {}): VerifierContext {
  return {
    move: 'TEACH', budgets: { maxQuestions: 0, maxParagraphs: 4, maxNewTerms: 2 },
    stageCeiling: 2, vocabularyBans: [],
    vocabularyUnlocked: true, formulaUnlocked: true,
    contentRegister: 'intermediate',
    assessmentActive: false, lessonCompletionAuthorized: false,
    reactMandated: false, affectBand: 'calm',
    bannedConceptTerms: [], learnerText: '',
    legalTags: ['VISUAL', 'HINT'],
    ...over,
  }
}

// ── Preprocessing helpers ───────────────────────────────────────────────────

describe('preprocessing', () => {
  it('withoutCodeFences strips triple-backtick blocks', () => {
    const t = "Hello\n```py\nprint('hi')\n```\nDone."
    expect(withoutCodeFences(t)).not.toContain("print")
    expect(withoutCodeFences(t)).toContain('Hello')
  })

  it('paragraphCount counts blank-line-separated blocks', () => {
    expect(paragraphCount('')).toBe(0)
    expect(paragraphCount('one')).toBe(1)
    expect(paragraphCount('one\n\ntwo')).toBe(2)
    expect(paragraphCount('one\n\ntwo\n\nthree')).toBe(3)
  })

  it('questionCount counts ? outside code fences + imperative tasks (ISS-11)', () => {
    expect(questionCount('Explain this to me.')).toBe(0)
    expect(questionCount('What do you see?')).toBe(1)
    expect(questionCount('```py\nx = 1  # ok?\n```\nGo on.')).toBe(0)
    // Imperative task (no question mark) — counts as an ask (ISS-11)
    expect(questionCount('Try computing 3x4 and tell me the result.')).toBeGreaterThan(0)
  })
})

// ── Individual rules ────────────────────────────────────────────────────────

describe('V-Q1 · question count > budget', () => {
  it('rejects when count > budget', () => {
    const v = vQ1('Question one? Question two?', ctx({ move: 'ASK', budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 2 } }))
    expect(v?.code).toBe('V-Q1')
  })
  it('passes when count ≤ budget', () => {
    const v = vQ1('One question?', ctx({ move: 'ASK', budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 2 } }))
    expect(v).toBeNull()
  })
})

describe('V-Q2 · non-ASK move ends in question', () => {
  it('rejects a TEACH turn ending in a question', () => {
    const v = vQ2('Here is the idea. What do you think?', ctx({ move: 'TEACH' }))
    expect(v?.code).toBe('V-Q2')
  })
  it('accepts ASK turn ending in a question', () => {
    const v = vQ2('What do you notice?', ctx({ move: 'ASK' }))
    expect(v).toBeNull()
  })
  it('accepts TEACH turn ending in a statement', () => {
    const v = vQ2('Here is the idea. Try it when ready.', ctx({ move: 'TEACH' }))
    expect(v).toBeNull()
  })
})

describe('V-STAGE · calculation demand below Stage 6', () => {
  it('rejects a "calculate ..." demand at stage 2', () => {
    const v = vStage('Calculate the value of x.', ctx({ stageCeiling: 2 }))
    expect(v?.code).toBe('V-STAGE')
  })
  it('passes the same demand at stage 6', () => {
    const v = vStage('Calculate the value of x.', ctx({ stageCeiling: 6 }))
    expect(v).toBeNull()
  })
})

describe('V-VOC-NAME · concept term before NAME gate', () => {
  it('rejects a banned concept term when vocabularyUnlocked=false', () => {
    const v = vVocName('This is called inertia.', ctx({ vocabularyUnlocked: false, bannedConceptTerms: ['inertia'] }))
    expect(v?.code).toBe('V-VOC-NAME')
    expect(v?.matched).toBe('inertia')
  })
  it('passes when vocabularyUnlocked=true', () => {
    const v = vVocName('This is called inertia.', ctx({ vocabularyUnlocked: true, bannedConceptTerms: ['inertia'] }))
    expect(v).toBeNull()
  })
})

describe('V-VOC-FORMULA · formula before FORMALIZE', () => {
  it('rejects LaTeX \\frac before formalize', () => {
    const v = vVocFormula('Here is $\\frac{1}{2}$ of a pizza.', ctx({ formulaUnlocked: false }))
    expect(v?.code).toBe('V-VOC-FORMULA')
  })
  it('rejects math glyphs before formalize', () => {
    const v = vVocFormula('Take √16 = 4.', ctx({ formulaUnlocked: false }))
    expect(v?.code).toBe('V-VOC-FORMULA')
  })
  it('passes when formulaUnlocked=true', () => {
    const v = vVocFormula('Take √16 = 4.', ctx({ formulaUnlocked: true }))
    expect(v).toBeNull()
  })
})

describe('V-VOC-REG · register bans', () => {
  it('rejects explicit vocabularyBans (SI at first lesson)', () => {
    const v = vVocReg('SI units are the metric system.', ctx({ vocabularyBans: ['SI'] }))
    expect(v?.code).toBe('V-VOC-REG')
  })
  it('rejects IPA slashes at beginner register', () => {
    const v = vVocReg('The sound is /æ/ as in cat.', ctx({ contentRegister: 'beginner' }))
    expect(v?.code).toBe('V-VOC-REG')
  })
  it('accepts IPA at expert register', () => {
    const v = vVocReg('The sound is /æ/ as in cat.', ctx({ contentRegister: 'expert' }))
    expect(v).toBeNull()
  })
})

describe('V-TERMS · new technical terms > budget', () => {
  it('rejects when introduced terms exceed budget', () => {
    const v = vTerms('Momentum requires velocity, acceleration, and mass.', ctx({ budgets: { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 1 } }))
    expect(v?.code).toBe('V-TERMS')
  })
  it('passes when budget allows', () => {
    const v = vTerms('Momentum matters here.', ctx({ budgets: { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 2 } }))
    expect(v).toBeNull()
  })
})

describe('V-LEN · paragraph count > budget', () => {
  it('rejects overlong response', () => {
    const t = 'p1\n\np2\n\np3\n\np4\n\np5'
    const v = vLen(t, ctx({ budgets: { maxQuestions: 0, maxParagraphs: 3, maxNewTerms: 2 } }))
    expect(v?.code).toBe('V-LEN')
  })
  it('passes with null budget (expert unlimited)', () => {
    const t = Array(50).fill('p').join('\n\n')
    const v = vLen(t, ctx({ budgets: { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 3 } }))
    expect(v).toBeNull()
  })
})

describe('V-CAP · capability violations (MVP stub)', () => {
  it('K5 v1 relies on V-VOC-REG for banned operations; capability model is K7', () => {
    expect(vCap('Take the square root of 16.', ctx())).toBeNull()
  })
})

describe('V-REC · recovery purity', () => {
  it('rejects a question during recovery', () => {
    const v = vRec('It is okay. What do you think went wrong?', ctx({ move: 'RECOVER' }))
    expect(v?.code).toBe('V-REC')
  })
  it('rejects new technical terms during recovery', () => {
    const v = vRec('Let us slow down. Momentum is at play here.', ctx({ move: 'RECOVER' }))
    expect(v?.code).toBe('V-REC')
  })
  it('passes a clean recovery turn', () => {
    const v = vRec("That's okay — let's take one small step together.", ctx({ move: 'RECOVER' }))
    expect(v).toBeNull()
  })
  it('is inert when move is not RECOVER', () => {
    const v = vRec('What do you think?', ctx({ move: 'ASK' }))
    expect(v).toBeNull()
  })
})

describe('V-ASSESS · assessment tag legality', () => {
  it('rejects [ASSESSMENT_RESULT ...] when not scoring', () => {
    const v = vAssess('[ASSESSMENT_RESULT correctness=90]', ctx({ assessmentActive: false }))
    expect(v?.code).toBe('V-ASSESS')
  })
  it('passes when assessmentActive=true', () => {
    const v = vAssess('[ASSESSMENT_RESULT correctness=90]', ctx({ assessmentActive: true }))
    expect(v).toBeNull()
  })
})

describe('V-TAG · unknown tags are stripped (not rejected)', () => {
  it('emits STRIP severity for unknown tag', () => {
    const v = vTag('Hi. [BOGUS_TAG stuff] more text.', ctx({ legalTags: ['VISUAL'] }))
    expect(v?.code).toBe('V-TAG')
    expect(v?.severity).toBe('STRIP')
  })
  it('accepts whitelisted tags', () => {
    const v = vTag('Look: [VISUAL number_line] and continue.', ctx({ legalTags: ['VISUAL'] }))
    expect(v).toBeNull()
  })
  it('stripUnknownTags removes only unknowns; whitelisted stay', () => {
    const cleaned = stripUnknownTags('a [VISUAL x] b [BOGUS_TAG] c', ['VISUAL'])
    expect(cleaned).toContain('[VISUAL x]')
    expect(cleaned).not.toContain('BOGUS_TAG')
  })
})

describe('V-COMPLETE · lesson completion legality', () => {
  it('rejects [LESSON_COMPLETE] when not authorized', () => {
    const v = vComplete('Great. [LESSON_COMPLETE]', ctx({ lessonCompletionAuthorized: false }))
    expect(v?.code).toBe('V-COMPLETE')
  })
  it('passes when authorized', () => {
    const v = vComplete('Great. [LESSON_COMPLETE]', ctx({ lessonCompletionAuthorized: true }))
    expect(v).toBeNull()
  })
})

describe('V-PRAISE · hyperbolic praise on strained band', () => {
  it('rejects "you are amazing!" during strained band', () => {
    const v = vPraise('You are amazing!', ctx({ affectBand: 'strained' }))
    expect(v?.code).toBe('V-PRAISE')
  })
  it('passes gentle praise on calm band', () => {
    const v = vPraise('You are amazing!', ctx({ affectBand: 'calm' }))
    expect(v).toBeNull()
  })
})

describe('V-REACT · LOG only in v1', () => {
  it('emits LOG (not REJECT) when response references no learner words', () => {
    const v = vReact('Let us think about this together.', ctx({ reactMandated: true, learnerText: 'I noticed the ball rolled down.' }))
    expect(v?.severity).toBe('LOG')
  })
  it('is inert when REACT not mandated', () => {
    const v = vReact('anything', ctx({ reactMandated: false, learnerText: 'x' }))
    expect(v).toBeNull()
  })
})

// ── Composed verify() ──────────────────────────────────────────────────────

describe('verify() composed', () => {
  it('PASSes a clean turn with no violations', () => {
    const d = verify('Great work — here is what to try next.', ctx({ move: 'TEACH' }))
    expect(d.verdict).toBe('PASS')
    expect(d.violations).toEqual([])
    expect(d.resolution).toBe('accepted')
  })

  it('STRIP-only violations do not reject; repairedText is cleaned', () => {
    const d = verify('Look: [VISUAL x] and [BOGUS_TAG] end.', ctx({ move: 'TEACH', legalTags: ['VISUAL'] }))
    expect(d.verdict).toBe('PASS')
    expect(d.violations.some((v) => v.code === 'V-TAG')).toBe(true)
    expect(d.repairedText).not.toContain('BOGUS_TAG')
    expect(d.repairedText).toContain('[VISUAL x]')
    expect(d.resolution).toBe('stripped')
  })

  it('REJECTs on a single REJECT-severity rule; violation is present', () => {
    const d = verify('Calculate the value of x.', ctx({ move: 'ASK', stageCeiling: 2, budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 2 } }))
    expect(d.verdict).toBe('REJECT')
    expect(d.violations.some((v) => v.code === 'V-STAGE')).toBe(true)
  })

  it('is deterministic', () => {
    const c = ctx({ move: 'ASK', stageCeiling: 2, budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 2 } })
    const a = verify('Calculate x?', c)
    const b = verify('Calculate x?', c)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('is a pure function (same input → same output, no mutation)', () => {
    const c = ctx()
    const beforeCtx = JSON.stringify(c)
    verify('hello', c)
    expect(JSON.stringify(c)).toBe(beforeCtx)
  })
})

// ── Violation appendix ─────────────────────────────────────────────────────

describe('buildViolationAppendix', () => {
  it('lists REJECT-severity violations with codes', () => {
    const appendix = buildViolationAppendix([
      { code: 'V-STAGE', severity: 'REJECT', matched: 'calculate x', detail: 'ceiling=2' },
      { code: 'V-TAG', severity: 'STRIP' }, // STRIP not included
    ])
    expect(appendix).toContain('VERIFICATION VIOLATIONS')
    expect(appendix).toContain('V-STAGE')
    expect(appendix).not.toContain('V-TAG')
  })

  it('returns empty string when no REJECT violations', () => {
    expect(buildViolationAppendix([{ code: 'V-TAG', severity: 'STRIP' }])).toBe('')
  })
})

// ── Rejection loop (RS §9.3 protocol) ──────────────────────────────────────

describe('runVerifierLoop — the two-attempt protocol', () => {
  it('passes on attempt 1, no rerender needed', async () => {
    const first = 'Nice work — here is what to try next.'
    let called = 0
    const render = async () => { called++; return 'unused' }
    const r = await runVerifierLoop(first, ctx({ move: 'TEACH' }), render, ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'], 'hi')
    expect(r.attempts).toBe(1)
    expect(r.usedTemplate).toBe(false)
    expect(called).toBe(0)
    expect(r.events.some((e) => e.kind === 'RenderCompleted')).toBe(true)
  })

  it('constrained rerender on first REJECT; passes attempt 2', async () => {
    const bad = 'Calculate x.' // V-STAGE at ceiling 2
    const good = 'Look — try this small thing.' // clean
    let calls = 0
    const render = async (appendix: string) => {
      calls++
      expect(appendix).toContain('VERIFICATION VIOLATIONS')
      expect(appendix).toContain('V-STAGE')
      return good
    }
    const r = await runVerifierLoop(bad, ctx({ move: 'TEACH', stageCeiling: 2 }), render, ['SHOW_EASIEST_LEGAL'], 'hi')
    expect(r.attempts).toBe(2)
    expect(r.usedTemplate).toBe(false)
    expect(calls).toBe(1)
    expect(r.events.filter((e) => e.kind === 'OutputRejected')).toHaveLength(1)
    expect(r.events.some((e) => e.kind === 'RenderCompleted' && e.attempt === 2)).toBe(true)
    expect(r.finalText).toBe(good)
  })

  it('template fallback when second attempt still fails (no 3rd LLM call)', async () => {
    const bad1 = 'Calculate x.'
    const bad2 = 'Still calculate x.'
    let calls = 0
    const render = async () => { calls++; return bad2 }
    const r = await runVerifierLoop(bad1, ctx({ move: 'TEACH', stageCeiling: 2 }), render, ['ECHO_MICROWIN'], 'hi')
    expect(r.attempts).toBe(2)
    expect(r.usedTemplate).toBe(true)
    expect(r.fallbackUsed).toBe('ECHO_MICROWIN')
    expect(calls).toBe(1)                 // exactly ONE rerender, no third call
    expect(r.events.filter((e) => e.kind === 'OutputRejected')).toHaveLength(2)
    expect(r.events.some((e) => e.kind === 'TemplateFallbackUsed')).toBe(true)
    // Template MUST pass the verifier by construction
    expect(r.decision.verdict).toBe('PASS')
  })

  it('template fallback text itself passes the verifier', () => {
    for (const kind of ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'] as const) {
      const text = renderFallback(kind, { register: 'beginner', learnerText: 'hi' })
      const d = verify(text, ctx({ move: templateMove(kind) }))
      expect(d.verdict).toBe('PASS')
    }
  })

  it('chooseFallback prefers head of chain, falls back safely', () => {
    expect(chooseFallback(['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN'])).toBe('SHOW_EASIEST_LEGAL')
    expect(chooseFallback([])).toBe('WARM_CLOSE')
    expect(chooseFallback(['NONSENSE'])).toBe('WARM_CLOSE')
  })

  it('is deterministic (replay-safe)', async () => {
    const bad = 'Calculate x.'
    const render = async () => 'Try one small step.'
    const c = ctx({ move: 'TEACH', stageCeiling: 2 })
    const a = await runVerifierLoop(bad, c, render, ['ECHO_MICROWIN'], 'hi')
    const b = await runVerifierLoop(bad, c, render, ['ECHO_MICROWIN'], 'hi')
    // Compare structural equality of the final outcome (excluding
    // trace-only fields that carry no decision content).
    expect(a.finalText).toBe(b.finalText)
    expect(a.attempts).toBe(b.attempts)
    expect(a.usedTemplate).toBe(b.usedTemplate)
    expect(a.fallbackUsed).toBe(b.fallbackUsed)
  })
})

// ── K3 stage integration ────────────────────────────────────────────────────

describe('K3 verify stage — enforcing verifier', () => {
  const draft: RenderDraft = { draftId: 'r1', turnId: 't1', text: 'Calculate x.', provider: 'stub', attempts: 1, latencyMs: 5 }
  const plan: RenderPlan = {
    planId: 'p1', turnId: 't1', systemPrompt: '', history: [],
    budgets: { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 2 },
    vocabularyBans: [], provenance: [],
  }

  it('passthroughVerifier still exists (K3 fallback for callers)', async () => {
    const stage = verifyStage(passthroughVerifier)
    const state = { context: { turnId: 't1', learnerId: 'L', sessionId: 'S', subjectSlug: 'x', receivedAtMs: 0, messageLength: 0, isSchoolMode: false }, draft, plan }
    const out = await stage.run(state)
    expect(out.verification?.verdict).toBe('PASS')
    expect(out.verification?.resolution).toBe('passthrough')
  })

  it('enforcingVerifier runs the K5 rule set from a context supplier', async () => {
    const verifier = enforcingVerifier(() => ctx({ move: 'TEACH', stageCeiling: 2 }))
    const stage = verifyStage(verifier)
    const state = { context: { turnId: 't1', learnerId: 'L', sessionId: 'S', subjectSlug: 'x', receivedAtMs: 0, messageLength: 0, isSchoolMode: false }, draft, plan }
    const out = await stage.run(state)
    expect(out.verification?.verdict).toBe('REJECT')
    expect(out.verification?.violations.some((v) => v.code === 'V-STAGE')).toBe(true)
  })
})

// ── Golden regression: sample failure conversations ────────────────────────

describe('regression — the SI-Units-style failure modes are all caught', () => {
  it("catches: TEACH ends in '?' (V-Q2)", () => {
    const d = verify("Here's the idea. What do you think?", ctx({ move: 'TEACH' }))
    expect(d.violations.some((v) => v.code === 'V-Q2')).toBe(true)
  })
  it('catches: too many questions this turn (V-Q1)', () => {
    const d = verify('First one? Second one? Third one?', ctx({ move: 'ASK', budgets: { maxQuestions: 1, maxParagraphs: null, maxNewTerms: 2 } }))
    expect(d.violations.some((v) => v.code === 'V-Q1')).toBe(true)
  })
  it('catches: calculation demand before Stage 6 (V-STAGE)', () => {
    const d = verify('Compute the value of √16.', ctx({ stageCeiling: 2, formulaUnlocked: false }))
    expect(d.violations.some((v) => v.code === 'V-STAGE' || v.code === 'V-VOC-FORMULA')).toBe(true)
  })
  it('catches: SI banned + first-lesson physics (V-VOC-REG)', () => {
    const d = verify('SI units are meters and seconds.', ctx({ vocabularyBans: ['SI'], contentRegister: 'beginner' }))
    expect(d.violations.some((v) => v.code === 'V-VOC-REG')).toBe(true)
  })
  it('catches: recovery turn with a question (V-REC)', () => {
    const d = verify("That's okay — what part felt confusing?", ctx({ move: 'RECOVER' }))
    expect(d.violations.some((v) => v.code === 'V-REC')).toBe(true)
  })
  it('catches: unauthorized LESSON_COMPLETE (V-COMPLETE)', () => {
    const d = verify('Great job. [LESSON_COMPLETE]', ctx({ lessonCompletionAuthorized: false }))
    expect(d.violations.some((v) => v.code === 'V-COMPLETE')).toBe(true)
  })
})
