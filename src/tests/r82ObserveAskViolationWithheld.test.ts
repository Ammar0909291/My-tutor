/**
 * R82 — WITHHOLD AN OBSERVE ASKVIOLATION.
 *
 * ── THE RESIDUAL, AFTER R81 ─────────────────────────────────────────────────
 * R81 (extending E1-style substitution to OBSERVE, scoped to `move === 'ask'`)
 * resolved 65 of 79 Mohd Physics Tier-A concepts that had been terminating
 * UNMEASURED-no-authored-match. The remaining 14 share one exact shape
 * (measured, `scripts/certification/artifacts/r81-*.jsonl`): turns:1,
 * finalPhase:DEMONSTRATE — meaning the FIRST real chat turn, at OBSERVE, was
 * where the model's own invented `<!--MCQ-->` question was served, because
 * `decideNextMoveDetailed`'s move for that turn was `'teach'`/`'show'`
 * (QL-1, questionLegality.ts — nothing had been taught yet, so ASK was
 * illegal), so R81's ask-scoped condition correctly did not fire.
 *
 * The model asking ANYTHING on a `'teach'`/`'show'` turn is a direct
 * violation of the explicit instruction those two move strings carry in
 * conversationState.ts's TURN_DIRECTIVE map: "Ask NO questions this turn."
 * questionLegality.ts's own LegalityMetrics names this class of event —
 * `askViolations` — as a real, measured phenomenon ("the rate at which the
 * model overrides the kernel"), not a hypothetical. The runtime currently
 * SERVES it anyway at OBSERVE because `decideModelProbe`
 * (inventedProbeGuard.ts)'s withhold logic gates on PHASE — does this
 * question count toward mastery? — never on MOVE — did the kernel forbid
 * asking at all? Two different axes; only the first is checked today.
 *
 * ── WHY THIS IS A SEPARATE OVERRIDE, NOT A CHANGE TO inventedProbeGuard.ts ──
 * That module's own docblock documents a prior version that widened its
 * phase check to also cover OBSERVE/DEMONSTRATE and calls that "smuggled in
 * beside this one... This is the undo." R82 does not touch
 * `decideModelProbe`, `ModelProbeInput`, or `probeWouldCountThisPhase` at
 * all — it is a second, independent override on `mcqHoisted` in route.ts,
 * exactly the same shape as the pre-existing `closingTurnWithholdsQuestion`
 * override right below it.
 *
 * ── WHY SCOPED TO OBSERVE ONLY ───────────────────────────────────────────────
 * DEMONSTRATE's own E1 substitution is DELIBERATELY unconditional on move
 * (R3: the model reliably asks at DEMONSTRATE regardless of what the kernel
 * decided, so E1 substitutes an authored probe there instead of suppressing
 * the question). A blanket "withhold on any non-ask turn" rule would silence
 * DEMONSTRATE's own already-proven mechanism. GUIDE/CHECK/PRACTICE/TRANSFER
 * are untouched because none of the 14 residual concepts showed a failure
 * there — widening past what is measured is exactly the "smuggled in" risk
 * this codebase's own history warns against.
 *
 * ── THE EMPTY-TURN GUARD ─────────────────────────────────────────────────────
 * If the model wrote its ENTIRE reply as the MCQ tag with no prose, stripping
 * it would leave `text` empty and misroute the turn into the degraded/outage
 * branch (`!text.trim()`, route.ts ~L5470-5520) — a real turn stamped as an
 * infrastructure failure, which is worse than the defect this fixes. So R82
 * withholds only when clean prose survives the strip.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { decideModelProbe } from '@/lib/teaching/inventedProbeGuard'
import { parseMcqTag } from '@/lib/teaching/mcq'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('0 — THE MIRROR IS COUPLED TO THE ROUTE', () => {
  it('the hoisted flag is declared, computed at OBSERVE scoped to non-ask, and consumed at the withhold site', () => {
    expect(ROUTE).toContain('let observeAskViolationHoisted = false')
    expect(ROUTE).toMatch(
      /observeAskViolationHoisted =\s*\n\s*phaseBeforeTurn === 'OBSERVE'\s*\n\s*&& evidenceMoveHoisted !== null\s*\n\s*&& evidenceMoveHoisted !== 'ask'/,
    )
    expect(ROUTE).toContain(
      "if (observeAskViolationHoisted && mcqParse.mcq !== null && gateMcqHoisted === null",
    )
    expect(ROUTE).toContain('mcqParse.cleanText.trim().length > 0')
  })

  it('withholds by nulling mcqHoisted and recording withheldModelMcqHoisted, same shape as the existing override', () => {
    const start = ROUTE.indexOf('if (modelProbeWithheld) mcqHoisted = null')
    const end = ROUTE.indexOf('A CLOSING turn withholds BOTH question sources')
    expect(start).toBeGreaterThan(-1)
    expect(end).toBeGreaterThan(start)
    const slice = ROUTE.slice(start, end)
    expect(slice).toContain('withheldModelMcqHoisted = mcqParse.mcq')
    expect(slice).toContain('mcqHoisted = null')
  })

  it('does NOT touch inventedProbeGuard.ts — the module stays exactly as R81 left it', () => {
    const guard = readFileSync('src/lib/teaching/inventedProbeGuard.ts', 'utf8')
    expect(guard).toMatch(/if \(!input\.probeWouldCountThisPhase\) return \{ serve: true, reason: 'phase-does-not-count' \}/)
    expect(guard).not.toContain('observeAskViolation')
  })
})

/**
 * Mirror of the two axes that must independently agree before an invented
 * question is served: `decideModelProbe`'s PHASE axis (driven for real) and
 * R82's MOVE axis (mirrored here, pinned to the route above). Returns
 * whether the model's own MCQ ends up served after BOTH checks.
 */
function serveInventedMcq(opts: {
  phase: string
  move: 'ask' | 'teach' | 'show' | null
  modelText: string
  gateServedAuthoredProbe?: boolean
  authoredProbesExist?: boolean | null
  gateDeclinedByPolicy?: boolean
}): { served: boolean; withheldBy: 'phase' | 'move' | null } {
  const isProbeAttachablePhase = opts.phase === 'GUIDE' || ['CHECK', 'PRACTICE', 'TRANSFER'].includes(opts.phase)
  const parsed = parseMcqTag(opts.modelText)
  const gateServed = opts.gateServedAuthoredProbe ?? false

  const phaseVerdict = decideModelProbe({
    probeWouldCountThisPhase: isProbeAttachablePhase,
    gateServedAuthoredProbe: gateServed,
    modelOfferedProbe: parsed.mcq !== null,
    authoredProbesExist: opts.authoredProbesExist ?? null,
    gateDeclinedByPolicy: opts.gateDeclinedByPolicy ?? false,
  })

  if (gateServed) return { served: false, withheldBy: null } // gate's own probe wins; moot
  if (parsed.mcq === null) return { served: false, withheldBy: null } // nothing to withhold

  if (!phaseVerdict.serve) return { served: false, withheldBy: 'phase' }

  // R82's own condition, mirrored exactly.
  const observeAskViolation = opts.phase === 'OBSERVE' && opts.move !== null && opts.move !== 'ask'
  if (observeAskViolation && parsed.cleanText.trim().length > 0) {
    return { served: false, withheldBy: 'move' }
  }

  return { served: true, withheldBy: null }
}

const MCQ_TAG = '<!--MCQ q="Which of these is true?" a="Yes" b="No" correct="A"-->'
const INVENTED = `Here is some teaching prose.\n${MCQ_TAG}`
const TAG_ONLY = MCQ_TAG

describe('A — OBSERVE, move=teach/show: the invented MCQ is now withheld (R82)', () => {
  it('move=teach, prose survives the strip -> withheld by move', () => {
    const r = serveInventedMcq({ phase: 'OBSERVE', move: 'teach', modelText: INVENTED })
    expect(r.served).toBe(false)
    expect(r.withheldBy).toBe('move')
  })

  it('move=show, prose survives the strip -> withheld by move', () => {
    const r = serveInventedMcq({ phase: 'OBSERVE', move: 'show', modelText: INVENTED })
    expect(r.served).toBe(false)
    expect(r.withheldBy).toBe('move')
  })
})

describe('B — the empty-turn guard: whole turn was the tag, nothing withheld', () => {
  it('move=teach, NO prose survives the strip -> served anyway (unchanged from pre-R82)', () => {
    const r = serveInventedMcq({ phase: 'OBSERVE', move: 'teach', modelText: TAG_ONLY })
    expect(r.served).toBe(true)
    expect(r.withheldBy).toBeNull()
  })
})

describe('C — OBSERVE, move=ask: unaffected, R81 territory', () => {
  it('the MOVE guard never fires when move is ask — decideModelProbe alone decides, exactly as pre-R82', () => {
    const r = serveInventedMcq({ phase: 'OBSERVE', move: 'ask', modelText: INVENTED })
    // `probeWouldCountThisPhase` is false at OBSERVE, and decideModelProbe's
    // OWN rule for that case is `serve: true` ("harmless here, let it
    // through") — unchanged by R82. In the real route this same turn also
    // has R81's own substitution running in parallel (a REAL authored probe
    // wins via `gateMcqHoisted`, which this mirror does not model); what
    // this proves is only that R82's MOVE axis stays silent here.
    expect(r.served).toBe(true)
    expect(r.withheldBy).toBeNull()
  })
})

describe('D — DEMONSTRATE and GUIDE: untouched, R82 never fires there', () => {
  it('DEMONSTRATE, move=show (E1 territory) — R82 does not withhold; decideModelProbe alone decides', () => {
    // Same "phase-does-not-count -> serve:true" rule as OBSERVE, unaffected
    // by R82 (which only ever evaluates at phase === 'OBSERVE'). In the real
    // route, E1's own gate substitution (unconditional on move, by design —
    // R3) is what actually protects a struggling learner here; this mirror
    // proves only that R82 itself is inert at DEMONSTRATE.
    const r = serveInventedMcq({ phase: 'DEMONSTRATE', move: 'show', modelText: INVENTED })
    expect(r.served).toBe(true)
    expect(r.withheldBy).toBeNull()
  })

  it('DEMONSTRATE with a gate-served authored probe — the gate wins, same as always', () => {
    const r = serveInventedMcq({
      phase: 'DEMONSTRATE', move: 'show', modelText: INVENTED, gateServedAuthoredProbe: true,
    })
    expect(r.served).toBe(false)
    expect(r.withheldBy).toBeNull() // moot — the gate's own probe superseded it
  })

  it('GUIDE, move=teach — R82 does not withhold; GUIDE counts toward mastery so the phase axis serves it', () => {
    const r = serveInventedMcq({ phase: 'GUIDE', move: 'teach', modelText: INVENTED })
    expect(r.served).toBe(true)
    expect(r.withheldBy).toBeNull()
  })
})

describe('E — the gate\'s own probe always wins, unconditionally', () => {
  it('gate served an authored probe -> R82 never even evaluated (moot)', () => {
    const r = serveInventedMcq({ phase: 'OBSERVE', move: 'teach', modelText: INVENTED, gateServedAuthoredProbe: true })
    expect(r.served).toBe(false)
    expect(r.withheldBy).toBeNull()
  })
})

describe('F — no model question at all: nothing to withhold, no false event', () => {
  it('plain teaching prose, no MCQ tag -> served=false, withheldBy=null (never fires)', () => {
    const r = serveInventedMcq({ phase: 'OBSERVE', move: 'teach', modelText: 'Just teaching, no question here at all.' })
    expect(r.served).toBe(false)
    expect(r.withheldBy).toBeNull()
  })
})
