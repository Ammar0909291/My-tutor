/**
 * PHASE H3 — THE REMEDIATION OUTPUT CONTRACT.
 *
 * ── WHAT H2 LEFT OPEN, AND WHERE ────────────────────────────────────────────
 * H2 got the remediation INTENT to the model and proved it changes behaviour.
 * It could not stop the model ignoring it, because on this turn class nothing
 * inspects what the model wrote. Traced through the repository:
 *
 *   D-4b ANSWER-STUDENT-FIRST -> ESCALATE_TO_LLM -> executor LLM_OPEN
 *     · `buildBrainExecutionBlock` returns '' for anything but LLM_RENDERER
 *     · `buildTeachingStrategyBlock` (FOUNDATION_REBUILD's own "use concrete,
 *       everyday examples before introducing formal definitions") is suppressed
 *       by `legacyDecisionBlocksSuppressed()`
 *     · the full K5 verifier is env-gated: `readVerifierMode` returns 'off'
 *       unless ENABLE_OUTPUT_VERIFIER / ENABLE_EOS_RUNTIME is set, and neither
 *       is set in production
 *   ⇒ the CONVERSATION directive is a REQUEST, and nothing turns it into a
 *     CONSTRAINT.
 *
 * ── THE MEASUREMENT THAT NAMES THE FIX (H2, production, 2026-08-27) ─────────
 * Two chemistry remediation turns answered "sir i not understand this" by
 * re-asking the previous turn's question and nothing else — groq returned 58
 * and 64 characters, so the MODEL produced the echo; nothing downstream
 * stripped an explanation. Both carried `legalityBlocked:
 * QL1_NO_ANSWERABLE_SOURCE` and `move: 'show'`; the physics turn that passed
 * had `move: 'ask'` and no legality block.
 *
 * QL-1 is not the bug — it is the rule that was already right. It fires when
 * "nothing has been taught yet this session and there is no evidence of prior
 * knowledge, so the learner has no source to answer from", removes ASK from
 * the legal set, and the ladder obeyed it (`move: 'show'`). The model asked
 * anyway. `foldLegalityMetrics` even COUNTS that exact event as
 * `askViolations` — "the kernel said do not ask, and it asked" — and nothing
 * has ever acted on the count.
 *
 * ── WHAT THIS FILE PINS ─────────────────────────────────────────────────────
 * One unconditional structural floor for remediation turns, built the way this
 * repository already builds one: the V-AFFIRM safety floor in route.ts, which
 * was lifted OUT of the env-gated verifier for exactly this reason ("a
 * teaching-safety failure, not a style preference, so it does not belong
 * behind an optional flag"), runs one regeneration carrying authored
 * curriculum material, and fails closed to deterministic authored text.
 *
 * STRUCTURAL ONLY. This floor decides "did the turn explain anything at all",
 * never "is the explanation true". Factual correctness is out of reach — see
 * the boundary test at the end of this file.
 */
import { describe, it, expect } from 'vitest'
import {
  isRemediationTurn, checkRemediationOutput,
  buildRemediationRepairAppendix, buildRemediationFallbackText,
} from '@/lib/teaching/remediationOutputContract'
import { classifyConversation } from '@/lib/teaching/conversationDecision'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { responseBudget } from '@/lib/teaching/conversationState'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The two learner-visible turns measured in production, verbatim. */
const ECHO_LE_CHATELIER = 'What do you notice about the crowd when someone leaves the room?'
const PRIOR_LE_CHATELIER =
  'In chemistry we call this "Le Chatelier\'s Principle": when a system at equilibrium is '
  + 'disturbed, it shifts in the direction that counteracts the disturbance.\n\n'
  + 'What do you notice about a crowded room when someone leaves the room?'

/** The physics turn that PASSED, verbatim — it must survive untouched. */
const GOOD_REMEDIATION =
  'Thermal expansion means that a material’s size changes when its temperature changes. '
  + 'Picture a metal ruler on a sunny day: the atoms inside vibrate more, so the ruler’s '
  + 'length grows a little.\n\n'
  + 'If you’d like to see how that number works in a quick example, just let me know!'

// ── A — genuine confusion reaches the remediation contract ──────────────────

describe('H3-A — a genuine confusion turn is a remediation turn', () => {
  const base = {
    recoveryKey: null, studentIntent: 'requesting_help',
    lastAssistantAskedQuestion: false, lastSignalCorrectness: null, hedged: false,
    helpRequestKind: 'explain_differently' as string | null,
  }

  it('the persona sentence classifies as CONFUSION and is a remediation turn', () => {
    expect(detectLearnerRequest('sir i not understand this')).toBe('explain_differently')
    const d = classifyConversation('sir i not understand this', base)
    expect(d.type).toBe('CONFUSION')
    expect(isRemediationTurn(d.type)).toBe(true)
  })

  it('an explicit ask for another approach is a remediation turn too', () => {
    const d = classifyConversation('explain it another way', base)
    expect(d.type).toBe('REPHRASE_REQUEST')
    expect(isRemediationTurn(d.type)).toBe(true)
  })

  it('nothing else is', () => {
    for (const t of ['NEUTRAL', 'SUCCESS', 'ACKNOWLEDGEMENT', 'CURIOSITY', 'BOREDOM',
      'DIRECT_QUESTION', 'TENTATIVE_ANSWER', 'CONFIDENCE', 'FRUSTRATION', 'RECOVERY']) {
      expect(isRemediationTurn(t), t).toBe(false)
    }
    expect(isRemediationTurn(null)).toBe(false)
    expect(isRemediationTurn(undefined)).toBe(false)
  })
})

// ── The floor itself ────────────────────────────────────────────────────────

describe('H3 — the structural floor catches exactly the measured failures', () => {
  const check = (text: string, over: Record<string, unknown> = {}) =>
    checkRemediationOutput({ remediationTurn: true, text, previousAssistantText: null, ...over })

  it('the production echo is caught as question-only', () => {
    const r = check(ECHO_LE_CHATELIER, { previousAssistantText: PRIOR_LE_CHATELIER })
    expect(r.violation).toBe('question-only')
    expect(r.reason).toBeTruthy()
  })

  it('the second production echo is caught too', () => {
    expect(check('What do you notice about the shape of the curve on the figure?').violation)
      .toBe('question-only')
  })

  it('a question-only turn is caught even when the question is NEW', () => {
    // The pass bar is "explains rather than merely asking another question" —
    // novelty does not rescue a turn that taught nothing.
    expect(check('Which cup do you think heats up faster, the water or the oil?').violation)
      .toBe('question-only')
  })

  it('a turn that repeats the previous turn verbatim is caught', () => {
    const r = check('when a system at equilibrium is disturbed, it shifts in the direction that counteracts the disturbance.',
      { previousAssistantText: PRIOR_LE_CHATELIER })
    expect(r.violation).toBe('repeats-previous-turn')
  })

  it('L — a SHORT turn that genuinely explains is NOT a violation', () => {
    // The trap H1 and H2 both had to be protected from: length is not the test.
    // This is 15 words and passes; the 64-character echo above fails.
    expect(check('A catalyst speeds a reaction up and is not used up itself.').violation).toBeNull()
  })

  it('the physics turn that passed in production survives untouched', () => {
    expect(check(GOOD_REMEDIATION, { previousAssistantText: PRIOR_LE_CHATELIER }).violation).toBeNull()
  })

  it('teaching that ENDS with a question survives — that is good teaching', () => {
    expect(check('Heat makes the atoms vibrate and push apart, so the metal gets longer.\n\nWhat do you think happens when it cools?')
      .violation).toBeNull()
  })

  it('a confirmation tail is not an answerable question and does not make a turn question-only', () => {
    expect(check('A catalyst lowers the energy hill. Does that make sense?').violation).toBeNull()
  })
})

// ── D/E/M — ordinary turns are untouched ────────────────────────────────────

describe('H3-D/E/M — nothing outside a remediation turn is affected', () => {
  it('the same question-only text on an ordinary turn is NOT a violation', () => {
    expect(checkRemediationOutput({
      remediationTurn: false, text: ECHO_LE_CHATELIER, previousAssistantText: PRIOR_LE_CHATELIER,
    }).violation).toBeNull()
  })

  it('a structured MCQ makes the question legitimate content', () => {
    // The widget IS the turn. Withholding here would delete the question the
    // learner is meant to answer.
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'Which of these is the catalyst?', hasStructuredMcq: true,
    }).violation).toBeNull()
  })

  it('empty or missing text is never a violation — a repair must not invent one', () => {
    for (const t of ['', '   ', undefined as unknown as string]) {
      expect(checkRemediationOutput({ remediationTurn: true, text: t }).violation).toBeNull()
    }
  })

  it('the check never throws, whatever it is handed', () => {
    expect(() => checkRemediationOutput({
      remediationTurn: true, text: '???'.repeat(5000), previousAssistantText: null,
    })).not.toThrow()
  })
})

// ── B/C — the repair carries the remediation contract, from authored material ─

describe('H3-B/C — the repair instruction is the contract, made enforceable', () => {
  const appendix = buildRemediationRepairAppendix('question-only', '')

  it('C — it states every required direction', () => {
    for (const idea of [
      /simpler|more simply|plain/i,       // simpler
      /concrete|everyday/i,               // concrete anchor
      /one .{0,12}step/i,                 // one small conceptual step
      /same (idea|concept)|this concept|stay/i, // stay on the current concept
      /(no|never|do not|don't).{0,40}(new formula|formula|derivation)/i,
      /explain/i,                         // explain first
    ]) {
      expect(appendix, idea.source).toMatch(idea)
    }
  })

  it('it names the violation so the retry knows what was wrong', () => {
    expect(appendix).toMatch(/only a question|asked .{0,20}question/i)
    expect(buildRemediationRepairAppendix('repeats-previous-turn', ''))
      .toMatch(/repeat|already said|same/i)
  })

  it('a REPEAT violation demands a different representation, not just a reword', () => {
    // phys.mech.collisions-inelastic, 2026-08-28: the second "I still do not
    // understand" got the same analogy again. The repair for a repeat must ask
    // for a DIFFERENT everyday anchor; the other violations must not (they are
    // about a first, failed attempt, where "the same idea" is correct).
    const repeat = buildRemediationRepairAppendix('repeats-previous-turn', '')
    expect(repeat).toMatch(/different everyday example|different object|new picture/i)
    expect(repeat).toMatch(/do not reuse the same analogy/i)

    for (const v of ['question-only', 'went-beyond-card', 'no-teaching-content'] as const) {
      expect(buildRemediationRepairAppendix(v, '')).not.toMatch(/completely different everyday example/i)
    }
  })

  it('B — it carries the curriculum\'s OWN words when they exist, and is silent when they do not', () => {
    const withAuthored = buildRemediationRepairAppendix('question-only',
      '\nThe curriculum defines this concept as: Thermal expansion is the change in size of a body with temperature.')
    expect(withAuthored).toContain('Thermal expansion is the change in size')
    // Retrieval, not invention: with nothing authored the appendix says nothing
    // about the concept rather than inventing a definition.
    expect(appendix).not.toMatch(/curriculum defines/i)
  })

  it('it is an instruction to the model, never learner-facing prose', () => {
    expect(appendix).toMatch(/OUTPUT REJECTED/)
  })
})

// ── N — the fallback is bounded, deterministic and cannot loop ──────────────

describe('H3-N — failing closed is safe and terminal', () => {
  it('the fallback speaks the curriculum\'s own sentence, not the model\'s', () => {
    const t = buildRemediationFallbackText(
      'Thermal expansion is the increase in the size of a material when its temperature rises.')
    expect(t).toContain('Thermal expansion is the increase in the size')
    expect(t).toMatch(/simpl/i)
  })

  it('it refuses to speak when the curriculum has no learner-facing sentence', () => {
    // Never fabricate a definition to fill the gap: null hands the decision
    // back to the caller, which keeps the existing generic fallback.
    expect(buildRemediationFallbackText(null)).toBeNull()
    expect(buildRemediationFallbackText('')).toBeNull()
    expect(buildRemediationFallbackText('[Boundary statement] A student who achieves mastery demonstrates: 1. …')).toBeNull()
    expect(buildRemediationFallbackText('short')).toBeNull()
  })

  it('the fallback text itself passes the floor — a repair may not need repairing', () => {
    const t = buildRemediationFallbackText(
      'Thermal expansion is the increase in the size of a material when its temperature rises.')!
    expect(checkRemediationOutput({ remediationTurn: true, text: t }).violation).toBeNull()
  })

  it('the route regenerates AT MOST ONCE and then stops', () => {
    // Structural: exactly one routeAI call inside the floor, and the decision
    // after it is a deterministic branch, not another attempt.
    const block = ROUTE.slice(ROUTE.indexOf('[remediation-floor]'))
    const scoped = block.slice(0, block.indexOf('// S1 — append this turn'))
    expect(scoped).toBeTruthy()
    expect((scoped.match(/await routeAI\(/g) ?? []).length).toBe(1)
    expect(scoped).not.toMatch(/while\s*\(|for\s*\(/)
  })
})

// ── The wiring — an unwired floor is not a floor ────────────────────────────

describe('H3 — the floor is actually on the turn path', () => {
  it('it runs on the cleaned text, after the affirmation safety floor', () => {
    const affirm = ROUTE.indexOf("console.log('[affirm-guard-entry]'")
    const floor = ROUTE.indexOf('[remediation-floor]')
    expect(affirm).toBeGreaterThan(-1)
    expect(floor).toBeGreaterThan(affirm)
  })

  it('it runs BEFORE the turn is recorded in the history ring', () => {
    expect(ROUTE.indexOf('[remediation-floor]'))
      .toBeLessThan(ROUTE.indexOf('// S1 — append this turn'))
  })

  it('it is excluded on deterministically-served turns, exactly like the affirm floor', () => {
    // SUPERSEDED ASSERTION (2026-09-05). This read the 2,000 characters
    // immediately before the first `[remediation-floor]` log and matched
    // /servedDeterministically/ in them. That is a proxy for "the guard is
    // near", not for the invariant, and it measured BYTE DISTANCE: adding a
    // comment between the guard and the log broke it while the guard itself was
    // untouched and still enclosing the floor. It now asserts the invariant
    // directly — the guard exists, and it opens before the floor it governs —
    // which is what this test was always for and cannot be moved by prose.
    const guard = ROUTE.indexOf('if (!servedDeterministically && conversationDecisionHoisted)')
    const floor = ROUTE.indexOf('[remediation-floor]')
    expect(guard).toBeGreaterThan(-1)
    expect(floor).toBeGreaterThan(guard)
  })

  it('O — it touches no mastery, grading or ladder state', () => {
    const start = ROUTE.indexOf('[remediation-floor]')
    const scoped = ROUTE.slice(start, ROUTE.indexOf('// S1 — append this turn'))
    for (const forbidden of [
      /correctAtCheck/, /correctAtPractice/, /masteryVerified/, /mcqGradeHoisted\s*=/,
      /conversationStateHoisted\s*=/, /teachingSignal\s*=/, /phase\s*=/,
    ]) {
      expect(scoped, forbidden.source).not.toMatch(forbidden)
    }
  })
})

// ── H/I/J/K — the closed phases stay closed ─────────────────────────────────

describe('H3 — H1, H2, D1 and D2 invariants re-pinned', () => {
  it('H — the H1 detector is intact', () => {
    for (const p of ['sir i not understand this', 'i cannot understand', 'please explain easy',
      'teach me', 'i am weak in this']) {
      expect(detectLearnerRequest(p), p).toBe('explain_differently')
    }
    expect(detectLearnerRequest('teach me about relativity')).toBeNull()   // F
    expect(detectLearnerRequest('not following the instructions')).toBeNull()
  })

  it('I — the H1 budget is intact', () => {
    expect(responseBudget('expert', 0, 0)).toBeNull()
    expect(responseBudget('expert', 1, 0)).toBe(7)
    expect(responseBudget('expert', 2, 0)).toBe(6)
  })

  it('G — "ok sir" is still an acknowledgement, not understanding', () => {
    const d = classifyConversation('ok sir', {
      recoveryKey: null, studentIntent: 'answering', lastAssistantAskedQuestion: false,
      lastSignalCorrectness: null, hedged: false, helpRequestKind: null,
    })
    expect(isRemediationTurn(d.type)).toBe(false)
    expect(d.type).not.toBe('CONFIDENCE')
  })

  it('J — D1: the spent-probe ledger still reaches selection, normalised', () => {
    expect(ROUTE).toContain('excludeProbeStem: historyForGate ? (stem) => hasAskedMcq(historyForGate, stripAuthoringLabel(stem)) : undefined')
  })

  it('K — D2: offeredMcqOptions is still threaded to both readers', () => {
    expect((ROUTE.match(/offeredMcqOptions: pendingMcqHoisted\?\.options/g) ?? []).length)
      .toBeGreaterThanOrEqual(2)
  })
})

// ── The boundary this phase does NOT cross ──────────────────────────────────

describe('H3 — the factual-correctness boundary, stated not crossed', () => {
  it('the floor makes no claim about truth', () => {
    // The H2 chemistry failure that this phase CANNOT catch: a simpler, plain,
    // on-concept, question-free explanation whose analogy is false ("stirring
    // sugar into tea" offered as catalysis). It explains, so it passes here.
    // Nothing in this repository can verify that claim, and H3 does not invent
    // a mechanism to — see the report's boundary statement.
    const falseButWellFormed =
      'A catalyst speeds a reaction up without being used up. When you stir sugar into hot tea '
      + 'the sugar dissolves faster, and the sugar is still there to use again later.'
    expect(checkRemediationOutput({ remediationTurn: true, text: falseButWellFormed }).violation).toBeNull()
  })
})
