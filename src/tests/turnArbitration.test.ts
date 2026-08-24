/**
 * PHASE 3 — TURN ARBITRATION: ONE DETERMINISTIC AUTHORITY.
 *
 * These tests are ARCHITECTURAL. They assert the shape of the precedence
 * system — totality, mutual exclusion, who wins every pair, and that each
 * consuming site actually asks the authority instead of re-deriving it — rather
 * than replaying transcripts. A transcript test would pass the moment a regex
 * matched; these fail if the ORDER changes, if a rung stops being consulted, or
 * if a fourth private copy of the precedence order appears.
 *
 * NEGATIVE CONTROL IS RECORDED IN THE COMMIT MESSAGE: with the arbitration
 * argument removed from `buildTurnDirective`'s call site and the verdict term
 * removed from `gateEligible`, the counts named there fail.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  arbitrateTurn, arbitrationUnavailable,
  TURN_AUTHORITY_ORDER, TURN_CAPABILITIES,
  type TurnAuthority, type TurnClaims, type TurnCapability,
} from '@/lib/teaching/turnArbitration'
import { buildTurnDirective, initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { shouldInjectAffectClose } from '@/lib/teaching/sessionLifecycle'
import { withholdClosingProseQuestion, closingTurnWithholdsQuestion } from '@/lib/teaching/gateAssessment'

const NO_CLAIMS: TurnClaims = {
  knowledgeGapResolved: false,
  recoveryActive: false,
  learnerRequestActive: false,
  closing: false,
  completionReady: false,
}

/** The claim field that makes each authority fire. TEACH is the floor and has none. */
const CLAIM_FOR: Record<Exclude<TurnAuthority, 'TEACH'>, keyof TurnClaims> = {
  KNOWLEDGE_GAP: 'knowledgeGapResolved',
  RECOVERY: 'recoveryActive',
  LEARNER_REQUEST: 'learnerRequestActive',
  CLOSE: 'closing',
  COMPLETE: 'completionReady',
}

const claiming = (...authorities: Exclude<TurnAuthority, 'TEACH'>[]): TurnClaims => {
  const c = { ...NO_CLAIMS }
  for (const a of authorities) c[CLAIM_FOR[a]] = true
  return c
}

const state = (over: Partial<ConversationState> = {}): ConversationState =>
  ({ ...initialConversationState(), ...over })

const directive = (arb: ReturnType<typeof arbitrateTurn> | null, over: Record<string, unknown> = {}) =>
  buildTurnDirective({
    state: state({ phase: 'DEMONSTRATE' }),
    nextMove: 'ask',
    maxParagraphs: 4,
    workedExampleFirst: false,
    visualType: null,
    arbitration: arb,
    ...over,
  } as never)

// ── 1. PRECEDENCE UNIT TESTS ────────────────────────────────────────────────

describe('1. the precedence ladder itself', () => {
  it('is total — every turn has exactly one owner, and TEACH is the floor', () => {
    expect(arbitrateTurn(NO_CLAIMS).owner).toBe('TEACH')
    expect(arbitrateTurn(NO_CLAIMS).overridden).toEqual([])
    // Exhaustive over the whole claim space: 2^4 combinations, never undefined.
    const fields = Object.values(CLAIM_FOR)
    for (let mask = 0; mask < (1 << fields.length); mask++) {
      const claims = { ...NO_CLAIMS }
      fields.forEach((f, i) => { if (mask & (1 << i)) claims[f] = true })
      const v = arbitrateTurn(claims)
      expect(TURN_AUTHORITY_ORDER).toContain(v.owner)
      expect(v.rationale.length).toBeGreaterThan(0)
    }
  })

  it('the order is the one Phase 3 derived plus Phase 4\'s rung, stated exactly once', () => {
    // THIS TEST FAILING IS THE POINT. It was written so that a future edit to
    // the order has to argue with a failing assertion rather than with a
    // comment, and Phase 4 is the first edit to meet it. What changed:
    // KNOWLEDGE_GAP was INSERTED at the top. Nothing was reordered — the
    // Phase 3 sequence below it is unchanged, element for element.
    expect([...TURN_AUTHORITY_ORDER]).toEqual([
      'KNOWLEDGE_GAP', 'RECOVERY', 'LEARNER_REQUEST', 'CLOSE', 'COMPLETE', 'TEACH',
    ])
    // Phase 3's order, still intact underneath the insertion.
    expect(TURN_AUTHORITY_ORDER.filter((a) => a !== 'KNOWLEDGE_GAP')).toEqual([
      'RECOVERY', 'LEARNER_REQUEST', 'CLOSE', 'COMPLETE', 'TEACH',
    ])
    // The two divergences from the proposed ordering, pinned as behaviour so a
    // future edit has to argue with a failing test rather than a comment.
    // DIVERGENCE 1 — recovery above the stop.
    expect(arbitrateTurn(claiming('RECOVERY', 'CLOSE')).owner).toBe('RECOVERY')
    // DIVERGENCE 2 — an outstanding learner request above the stop (Series A
    // Phase 4's shipped, live-verified deferral, now stated once).
    expect(arbitrateTurn(claiming('LEARNER_REQUEST', 'CLOSE')).owner).toBe('LEARNER_REQUEST')
  })

  it('is first-match-wins, never additive — two claims never produce a third outcome', () => {
    for (const a of Object.keys(CLAIM_FOR) as Exclude<TurnAuthority, 'TEACH'>[]) {
      for (const b of Object.keys(CLAIM_FOR) as Exclude<TurnAuthority, 'TEACH'>[]) {
        const v = arbitrateTurn(claiming(a, b))
        expect([a, b]).toContain(v.owner)
      }
    }
  })

  it('every denied capability is a real capability, and the floor denies nothing', () => {
    const fields = Object.values(CLAIM_FOR)
    for (let mask = 0; mask < (1 << fields.length); mask++) {
      const claims = { ...NO_CLAIMS }
      fields.forEach((f, i) => { if (mask & (1 << i)) claims[f] = true })
      for (const cap of arbitrateTurn(claims).denied) expect(TURN_CAPABILITIES).toContain(cap)
    }
    for (const cap of TURN_CAPABILITIES) {
      expect(arbitrateTurn(NO_CLAIMS).allows(cap)).toBe(true)
    }
  })
})

// ── 2. CONTRADICTION-PAIR TESTS ─────────────────────────────────────────────
// For every ordered pair: both active => exactly one wins, and the loser is
// recorded as overridden. This is the property Step 6 asks for, exhaustively.

describe('2. every precedence pair resolves to exactly one winner', () => {
  const rank = (a: TurnAuthority) => TURN_AUTHORITY_ORDER.indexOf(a)
  const named = Object.keys(CLAIM_FOR) as Exclude<TurnAuthority, 'TEACH'>[]

  it('the higher-ranked authority always wins and the lower is explicitly overridden', () => {
    let pairs = 0
    for (const a of named) {
      for (const b of named) {
        if (a === b) continue
        const v = arbitrateTurn(claiming(a, b))
        const expectedWinner = rank(a) < rank(b) ? a : b
        const expectedLoser = expectedWinner === a ? b : a
        expect(v.owner).toBe(expectedWinner)
        expect(v.overridden).toContain(expectedLoser)
        // Mutual exclusion: the loser is not also the owner.
        expect(v.owner).not.toBe(expectedLoser)
        pairs++
      }
    }
    expect(pairs).toBe(named.length * (named.length - 1))
  })

  it('a losing authority never adds its own suppressions on top of the winner\'s', () => {
    // CLOSE denies FILLER_REPAIR; LEARNER_REQUEST does not. When REQUEST wins
    // over CLOSE, CLOSE's denial must NOT leak through — otherwise "first match
    // wins" would silently be "union of all matches", which is a different and
    // much harder system to reason about.
    const v = arbitrateTurn(claiming('LEARNER_REQUEST', 'CLOSE'))
    expect(v.owner).toBe('LEARNER_REQUEST')
    expect(v.allows('FILLER_REPAIR')).toBe(true)
    expect(v.allows('PHASE_FRAME')).toBe(true)
  })
})

// ── 3. THE CONFIRMED DEFECTS (Step 4 A–E) ───────────────────────────────────

describe('3. the transitions Phase 2 measured REACHABLE', () => {
  it('D1 — CLOSING does not receive an ordinary teaching action', () => {
    const closing = arbitrateTurn(claiming('CLOSE'))
    const text = directive(closing)
    expect(text).not.toContain('- Teaching phase:')
    expect(text).not.toContain('- Next move:')
    // and it stops claiming to override the block that now owns the turn
    expect(text).not.toContain('overrides any earlier advisory pacing')
    expect(text).toContain('CLOSE block above owns this turn')
  })

  it('D1 control — an ordinary turn is byte-for-byte what it was before Phase 3', () => {
    // `arbitration: null` is the pre-Phase-3 shape; TEACH-owned is the new one.
    // They must be identical, or Phase 3 changed teaching it had no business
    // changing.
    expect(directive(arbitrateTurn(NO_CLAIMS))).toBe(directive(null))
    const text = directive(null)
    expect(text).toContain('- Teaching phase:')
    expect(text).toContain('- Next move:')
    expect(text).toContain('overrides any earlier advisory pacing')
  })

  it('D2 — a closing turn issues no question stage and no question order', () => {
    const closing = arbitrateTurn(claiming('CLOSE'))
    const text = directive(closing, { lowSignalAcknowledgement: true, state: state({ phase: 'CHECK' }) })
    expect(text).not.toContain('Question stage THIS TURN')
    expect(text).not.toContain('You MUST ask ONE concrete check question')
    // The stage CEILING is subtractive ("never ask above it") and survives.
    expect(text).toContain('Question stage ceiling')
  })

  it('D2 — the prose question source is withheld on a closing turn, and only there', () => {
    // Multi-paragraph, because `dropAnswerableContent` removes whole PARAGRAPHS
    // by design ("half a question is still a question" — gateAssessment.ts).
    // A question on its own line is the shape a model actually produces, and
    // the shape this guard can act on. The single-paragraph case is covered
    // separately below, where the honest answer is to do nothing.
    const posed = 'You worked hard today, and the frictionless case finally clicked.'
      + '\n\nWhich of these is a vector: speed or velocity?'
    const closed = withholdClosingProseQuestion({ text: posed, episodePhase: 'CLOSING', hasStructuredMcq: false })
    expect(closed.withheld).toBe(true)
    expect(closed.text).not.toContain('Which of these is a vector')
    expect(closed.text).toContain('frictionless case finally clicked')
    for (const phase of ['CORE', 'OPENING', null, undefined]) {
      expect(withholdClosingProseQuestion({ text: posed, episodePhase: phase, hasStructuredMcq: false }).withheld).toBe(false)
    }
  })

  it('D2 — an authorised structured question keeps its prose', () => {
    // Defensive path: if a structured MCQ ever survives onto a closing turn,
    // stripping the prose around it would orphan the widget on screen.
    const posed = 'Here is one last check.\n\nWhich of these is a vector: speed or velocity?'
    const r = withholdClosingProseQuestion({ text: posed, episodePhase: 'CLOSING', hasStructuredMcq: true })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(posed)
  })

  it('D2 — a warm closing sign-off is NOT mutilated', () => {
    // The close block's own script ends warmly and invites the learner back.
    // A naive '?' strip would destroy exactly the sentence the close exists for.
    const warm = 'You nailed the difference between mass and weight today.\n\nSame time tomorrow?'
    const r = withholdClosingProseQuestion({ text: warm, episodePhase: 'CLOSING', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(warm)
  })

  it('D2 — when the whole turn was a question, it withholds NOTHING and reports it', () => {
    const allQuestion = 'Which of these is a vector: speed or velocity?'
    const r = withholdClosingProseQuestion({ text: allQuestion, episodePhase: 'CLOSING', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('nothing-would-survive')
    expect(r.text).toBe(allQuestion)   // never an empty or invented turn
  })

  it('D3 — an explicit learner request denies the authored probe (and spends none)', () => {
    expect(arbitrateTurn(claiming('LEARNER_REQUEST')).allows('AUTHORED_PROBE')).toBe(false)
    // but it does NOT gag the turn: a natural question after delivering what
    // they asked for is ordinary good teaching.
    expect(arbitrateTurn(claiming('LEARNER_REQUEST')).allows('NEW_QUESTION')).toBe(true)
    expect(arbitrateTurn(claiming('LEARNER_REQUEST')).allows('PHASE_FRAME')).toBe(true)
  })

  it('D4 — a distressed learner is met first; the close is deferred, not cancelled', () => {
    const v = arbitrateTurn(claiming('RECOVERY', 'CLOSE'))
    expect(v.owner).toBe('RECOVERY')
    expect(v.allows('SESSION_CLOSE')).toBe(false)
    // the real predicate honours it
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: false, ambiguousTurn: false,
      arbitrationAllowsClose: false,
    })).toBe(false)
    // and the episode is untouched — deferral is not cancellation. The close
    // fires on the first turn that is not a rescue.
    expect(shouldInjectAffectClose({
      phase: 'CLOSING', excursionActive: false, ambiguousTurn: false,
      arbitrationAllowsClose: true,
    })).toBe(true)
  })

  it('D5 — a recovery turn issues no phase frame and no new content order', () => {
    const rec = arbitrateTurn(claiming('RECOVERY'))
    const text = directive(rec)
    expect(text).not.toContain('- Teaching phase:')
    expect(text).not.toContain('- Next move:')
    expect(rec.allows('NEW_QUESTION')).toBe(false)
    expect(rec.allows('AUTHORED_PROBE')).toBe(false)
  })

  it('D6 — a closing or requesting turn denies a new placement probe', () => {
    expect(arbitrateTurn(claiming('CLOSE')).allows('NEW_QUESTION')).toBe(false)
    // A request does not silence questions in general (see D3) — placement is
    // constrained by CLOSE and RECOVERY, which is the measured gap.
    expect(arbitrateTurn(claiming('RECOVERY')).allows('NEW_QUESTION')).toBe(false)
  })
})

// ── 4. OWNERSHIP TESTS (Step 2) ─────────────────────────────────────────────

describe('4. ownership is preserved — the arbiter decides WHO, never WHAT', () => {
  it('re-derives nothing: the module reads no message text and holds no detector', () => {
    const src = readFileSync('src/lib/teaching/turnArbitration.ts', 'utf8')
    // No regex literals — a detector living here would mean two owners for one
    // reading, which is the defect Phase 1 removed.
    expect(src).not.toMatch(/=\s*\/[^/\n*]+\/[gimsuy]*/)
    expect(src).not.toContain('new RegExp')
    // No imports at all: it consumes values, it does not call subsystems.
    expect(src).not.toMatch(/^import /m)
    // It never sees the learner's message.
    expect(src).not.toMatch(/\bmessage\b\s*:/)
  })

  it('the existing owners still own their readings', () => {
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    // Every claim is a value some other owner produced — never a fresh call.
    const call = src.slice(src.indexOf('turnArbitrationHoisted = arbitrateTurn({'))
      .slice(0, 900)
    expect(call).toContain('recoveryActive: recoveryKeyHoisted !== null')
    expect(call).toContain('turnIntent.learnerRequest')
    expect(call).toContain("sessionEpisodeHoisted.phase === 'CLOSING'")
    expect(call).toContain('completionReady: lessonCompletedHoisted')
    // No detector is invoked while building the claims.
    expect(call).not.toContain('detectFailureState(')
    expect(call).not.toContain('detectLearnerRequest(')
  })

  it('the verdict is computed exactly ONCE — a second call site would be a second authority', () => {
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    // Exactly one invocation. The static import names it without a paren, so
    // this counts CALLS only — a second call site would be a second authority.
    expect(src.split('arbitrateTurn(').length - 1).toBe(1)
  })
})

// ── 5. THE ROUTE ACTUALLY CONSULTS IT ───────────────────────────────────────

describe('5. every competing site asks the authority', () => {
  const src = () => readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('the TURN DIRECTIVE is handed the verdict', () => {
    const at = src().indexOf('systemPrompt += buildTurnDirective({')
    expect(at).toBeGreaterThan(0)
    expect(src().slice(at, at + 1200)).toContain('arbitration: turnArbitrationHoisted')
  })

  it('the authored-probe gate asks for AUTHORED_PROBE', () => {
    const s = src()
    const gate = s.slice(s.indexOf('const gateEligible ='), s.indexOf('if (gateEligible && memoryState)'))
    expect(gate).toContain("allows('AUTHORED_PROBE')")
    // the local terms that are genuinely this gate's own business stay put
    expect(gate).toContain('!unansweredProbeOnScreen')
    expect(gate).toContain('!firstLessonActiveHoisted')
  })

  it('the session close asks for SESSION_CLOSE', () => {
    const s = src()
    const at = s.indexOf('shouldInjectAffectClose({')
    expect(at).toBeGreaterThan(0)
    expect(s.slice(at, at + 1400)).toContain("allows('SESSION_CLOSE')")
  })

  it('the placement probe asks for NEW_QUESTION before ASKING, and never before GRADING', () => {
    const s = src()
    expect(s).toContain("const placementMayAsk = (turnArbitrationHoisted ?? arbitrationUnavailable()).allows('NEW_QUESTION')")
    expect(s).toContain('} else if (placementMayAsk) {')
    // The AWAIT branch grades a probe already on screen — suppressing it would
    // lose the tagging the next turn depends on, so it must stay unguarded.
    const await_at = s.indexOf('systemPrompt += buildPlacementAwaitBlock(')
    const may_at = s.indexOf('} else if (placementMayAsk) {')
    expect(await_at).toBeGreaterThan(0)
    expect(await_at).toBeLessThan(may_at)
  })

  it('the post-model filler repair asks for FILLER_REPAIR', () => {
    const s = src()
    const at = s.indexOf('shouldRepairFillerTurn({')
    expect(at).toBeGreaterThan(0)
    expect(s.slice(Math.max(0, at - 600), at)).toContain("allows('FILLER_REPAIR')")
  })

  it('the CONVERSATION block does not order teaching when it does not own the turn', async () => {
    // Found by LIVE VERIFICATION, not by the Step 0 matrix. On a measured
    // CLOSING turn every structural protection worked and the learner was still
    // taught a new example — because this block's header says "then teach" for
    // every conversation type, from a position near the END of the prompt.
    const { buildConversationDirective, classifyConversation } =
      await import('@/lib/teaching/conversationDecision')
    const ack = classifyConversation('ok', {
      recoveryKey: null, studentIntent: 'unknown', lastAssistantAskedQuestion: false,
      lastSignalCorrectness: null, hedged: false, helpRequestKind: null,
    })
    const closing = arbitrateTurn(claiming('CLOSE'))
    const suppressed = buildConversationDirective(ack, closing)
    expect(suppressed).not.toContain('then teach')
    expect(suppressed).toContain('CLOSE block above')
    // The REGISTER half — how to acknowledge the learner — is Axis 4 and must
    // survive untouched, or a closing turn loses its manner as well as its move.
    expect(suppressed).toContain(ack.rendererDirective)

    // Unchanged on an ordinary turn, and byte-identical with no verdict at all.
    expect(buildConversationDirective(ack, arbitrateTurn(NO_CLAIMS)))
      .toBe(buildConversationDirective(ack))
    expect(buildConversationDirective(ack)).toContain('then teach')
  })

  it('EVERY conversation-directive call site is arbitrated, not just the obvious one', () => {
    // Written this way because the first pass fixed one of two. The BRAIN
    // EXECUTION block embeds the same directive on LLM_RENDERER turns, so a
    // substring check on one call site passed while "then teach" still leaked
    // into a close for every Brain-driven turn. Counting call sites and
    // requiring the argument on ALL of them is what makes a third one safe.
    const s = src()
    const sites = [...s.matchAll(/buildConversationDirective\(([\s\S]{0,200}?)\)/g)]
    expect(sites.length).toBeGreaterThanOrEqual(2)
    for (const m of sites) {
      expect(m[1], `unarbitrated call site: ${m[0].slice(0, 80)}`).toContain('turnArbitrationHoisted')
    }
  })

  it('the model\'s OWN mcq tag is withheld by the authority, not only on CLOSING', () => {
    // MEASURED IN PRODUCTION. A learner who typed "I'm lost. I don't understand
    // any of this." received a tappable graded question. The Step 0 matrix
    // recorded RECOVERY x ASSESS as prevented — true of the AUTHORED probe
    // (gateEligible excludes recovery) and false of the model's own tag, which
    // was withheld for CLOSING and nothing else.
    for (const a of ['RECOVERY', 'CLOSE', 'COMPLETE'] as const) {
      expect(arbitrateTurn(claiming(a)).allows('NEW_QUESTION'), a).toBe(false)
    }
    // ...and an ordinary turn is untouched, or the gate could never fire.
    expect(arbitrateTurn(NO_CLAIMS).allows('NEW_QUESTION')).toBe(true)
    expect(arbitrateTurn(claiming('LEARNER_REQUEST')).allows('NEW_QUESTION')).toBe(true)

    const s = src()
    const at = s.indexOf('mcqHoisted = gateMcqHoisted ?? mcqParse.mcq')
    expect(at).toBeGreaterThan(0)
    const window = s.slice(at, at + 2600)
    // Both withholds present: the shared closing predicate AND the authority.
    expect(window).toContain('closingTurnWithholdsQuestion(sessionEpisodeHoisted?.phase)')
    expect(window).toContain("allows('NEW_QUESTION')")
    expect(window).toContain('model-mcq-tag-withheld')
  })

  it('the closing prose guard runs post-model', () => {
    expect(src()).toContain('withholdClosingProseQuestion({')
  })

  it('the false-completion nudge — the last post-model question source — asks too', () => {
    // Step 4 E: found while auditing the post-model layer, not in the Step 0
    // matrix. It appends "…let's do 2 practice questions together — ready?"
    // AFTER every prompt-side protection has already run.
    const s = src()
    const at = s.indexOf('if (claimedCompletionInProse')
    expect(at).toBeGreaterThan(0)
    expect(s.slice(at, at + 260)).toContain("allows('NEW_QUESTION')")
    // The claim itself is still stripped when the nudge is withheld — the
    // suppression must never let a false completion stand.
    expect(s.slice(at, at + 1800)).toContain('nudgeWithheld')
  })
})

// ── 6. NEGATIVE CONTROLS AND REGRESSION ─────────────────────────────────────

describe('6. negative controls — valid behaviour is unchanged', () => {
  it('an ordinary teaching turn keeps every one of its instructions', () => {
    const text = directive(arbitrateTurn(NO_CLAIMS), { state: state({ phase: 'CHECK' }), nextMove: 'ask' })
    expect(text).toContain('- Teaching phase:')
    expect(text).toContain('- Next move:')
    expect(text).toContain('Question stage ceiling')
    expect(text).toContain('Length budget')
  })

  it('a suppressed turn KEEPS its Axis-3/4 constraints — suppression is not deletion', () => {
    // The failure mode this guards: settling an Axis-1 conflict by dropping the
    // whole block, which would silently remove the length ceiling, the new-term
    // budget and the register from exactly the turns (closing, recovery) where
    // a runaway response hurts most.
    const text = directive(arbitrateTurn(claiming('CLOSE')), { maxNewTerms: 1 })
    expect(text).toContain('Length budget')
    expect(text).toContain('New-concept budget')
    expect(text).toContain('Question stage ceiling')
  })

  it('the pre-existing close deferrals still hold on their own', () => {
    // Series A Phase 4's two reasons must not have been quietly replaced.
    expect(shouldInjectAffectClose({ phase: 'CLOSING', excursionActive: true, ambiguousTurn: false })).toBe(false)
    expect(shouldInjectAffectClose({ phase: 'CLOSING', excursionActive: false, ambiguousTurn: true })).toBe(false)
    expect(shouldInjectAffectClose({ phase: 'CORE', excursionActive: false, ambiguousTurn: false })).toBe(false)
    expect(shouldInjectAffectClose({ phase: 'CLOSING', excursionActive: false, ambiguousTurn: false })).toBe(true)
  })

  it('the Phase 1 / Phase 2 structured withholding is untouched', () => {
    expect(closingTurnWithholdsQuestion('CLOSING')).toBe(true)
    for (const p of ['CORE', 'OPENING', undefined, null, '']) {
      expect(closingTurnWithholdsQuestion(p)).toBe(false)
    }
  })

  it('an unavailable verdict fails SAFE — teaching survives, questions do not', () => {
    const v = arbitrationUnavailable()
    expect(v.owner).toBe('TEACH')                 // never silence
    expect(v.allows('PHASE_FRAME')).toBe(true)
    expect(v.allows('NEW_QUESTION')).toBe(false)  // never an ungraded question
    expect(v.allows('AUTHORED_PROBE')).toBe(false)
    expect(v.allows('FILLER_REPAIR')).toBe(false)
  })

  it('omitting the verdict entirely reproduces pre-Phase-3 behaviour exactly', () => {
    // Every existing caller and test passes no `arbitration`. If that ever
    // stops meaning "unchanged", Phase 3 has leaked into turns it never
    // arbitrated.
    expect(shouldInjectAffectClose({ phase: 'CLOSING', excursionActive: false, ambiguousTurn: false })).toBe(true)
    expect(directive(null)).toContain('- Next move:')
  })
})
