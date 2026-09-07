/**
 * R83 — READ THE PHASE readConversationState ALREADY RESOLVED.
 *
 * ── THE DEFECT, MEASURED LIVE ────────────────────────────────────────────────
 * Certifying the R82 fix's own residual (4 of the 15 targeted concepts still
 * UNMEASURED-no-authored-match) surfaced a deeper bug underneath both R81 and
 * R82. Production log, `phys.mech.conservative-forces`, turn 1 of a genuinely
 * fresh session (`[ladder-reset] {"reason":"no-stored-state",...}`):
 *
 *   [gate-eligibility] {"move":"ask","eligible":false,
 *     "blockedBy":["phaseAllowsProbe","probeAttachablePhase"],
 *     "phaseAllowsProbe":false,"probeAttachablePhase":false,...}
 *   [ladder] {"move":"ask","mcqAsked":true,"phaseBefore":"OBSERVE",
 *     "phaseAfter":"DEMONSTRATE",...}
 *   [turn-decision] {"divergences":["QUESTION_SHIPPED_WITHOUT_PROBE"],
 *     "divergenceDetail":["a gradeable question shipped that the gate did
 *     not select"]}
 *
 * Note the `[gate-eligibility]` line carries no `"phase"` key at all — not
 * `"phase":"OBSERVE"`, simply absent, because `JSON.stringify` drops an
 * `undefined` value. The LADDER's own fold (a separate computation) correctly
 * knew this turn was OBSERVE; the gate's read of the SAME fact did not.
 *
 * ── ROOT CAUSE ────────────────────────────────────────────────────────────────
 * route.ts computed `phaseBeforeTurn` by re-deriving it directly from the raw
 * snapshot (`snapshot?.conversationState?.phase`). On a session's true first
 * turn no snapshot has been persisted yet, so that raw field is `undefined` —
 * not the string `'OBSERVE'` — and every comparison against it
 * (`phaseBeforeTurn === 'OBSERVE'`, `'GUIDE'`, `'DEMONSTRATE'`,
 * `isMasteryGatePhase(phaseBeforeTurn)`) silently fails. R81's OBSERVE
 * substitution and R82's askViolation withhold — both conditioned on
 * `phaseBeforeTurn === 'OBSERVE'` — therefore never fire on a session's first
 * turn, independent of what the model does that turn.
 *
 * Meanwhile `conversationStateHoisted` (computed earlier in the very same
 * request, via `readConversationState(snapshot?.conversationState,
 * convConceptId)`) already resolves this correctly: `readConversationState`
 * falls back to `initialConversationState(currentConceptId)` — phase
 * `'OBSERVE'` — exactly when the raw field is missing or invalid. Two
 * computations of "the phase before this turn" existed in the same request,
 * and only one of them defaulted.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────────
 * `phaseBeforeTurn` now reads `conversationStateHoisted?.phase` first,
 * falling back to the raw snapshot read only if that hoisted value is
 * unexpectedly null. One read, matching the fallback route.ts already uses
 * elsewhere (`conversationStateHoisted?.phase ?? 'OBSERVE'`, ~L5845) instead
 * of adding a third, disagreeing convention.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { readConversationState, initialConversationState } from '@/lib/teaching/conversationState'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('0 — THE FIX IS WIRED INTO THE ROUTE, IN THE RIGHT ORDER', () => {
  it('phaseBeforeTurn now reads conversationStateHoisted?.phase first', () => {
    expect(ROUTE).toContain('const phaseBeforeTurn = conversationStateHoisted?.phase')
    expect(ROUTE).toContain(
      "?? (snapshot as { conversationState?: { phase?: unknown } } | null)\n            ?.conversationState?.phase",
    )
  })

  it('conversationStateHoisted is assigned via readConversationState BEFORE phaseBeforeTurn is computed', () => {
    const assignAt = ROUTE.indexOf(
      'conversationStateHoisted = readConversationState(snapshot?.conversationState, convConceptId)',
    )
    const readAt = ROUTE.indexOf('const phaseBeforeTurn = conversationStateHoisted?.phase')
    expect(assignAt).toBeGreaterThan(-1)
    expect(readAt).toBeGreaterThan(assignAt)
  })

  it('R81 and R82 still read the SAME phaseBeforeTurn binding — no second identifier introduced', () => {
    // Both prior fixes' own conditions must still compile against this one
    // const, not a shadow or a renamed variable.
    expect(ROUTE).toContain("phaseBeforeTurn === 'OBSERVE' && evidenceMoveHoisted === 'ask'")
    expect(ROUTE).toContain(
      "phaseBeforeTurn === 'OBSERVE'\n          && evidenceMoveHoisted !== null\n          && evidenceMoveHoisted !== 'ask'",
    )
  })
})

describe('A — readConversationState resolves OBSERVE exactly on the fresh-session shape this bug hit', () => {
  it('raw snapshot field missing entirely (the true "no persisted state" case) -> phase OBSERVE', () => {
    const s = readConversationState(undefined, 'phys.mech.conservative-forces')
    expect(s.phase).toBe('OBSERVE')
  })

  it('raw snapshot present but conversationState is null -> phase OBSERVE', () => {
    const s = readConversationState(null, 'phys.mech.conservative-forces')
    expect(s.phase).toBe('OBSERVE')
  })

  it('raw conversationState for a DIFFERENT concept (a fresh lesson, prior ladder on disk) -> resets to OBSERVE', () => {
    const stale = { ...initialConversationState('phys.mech.angular-momentum'), phase: 'PRACTICE' as const }
    const s = readConversationState(stale, 'phys.mech.conservative-forces')
    expect(s.phase).toBe('OBSERVE')
  })

  it('a genuinely resumed session for the SAME concept keeps its real phase — this fix does not touch that path', () => {
    const resumed = { ...initialConversationState('phys.mech.conservative-forces'), phase: 'GUIDE' as const }
    const s = readConversationState(resumed, 'phys.mech.conservative-forces')
    expect(s.phase).toBe('GUIDE')
  })
})

describe('B — the exact production failure shape, reproduced against the real function', () => {
  it('mirrors the OLD buggy read: raw field undefined on turn 1 produced undefined, not OBSERVE', () => {
    // What phaseBeforeTurn used to compute, byte for byte.
    const raw = undefined as { conversationState?: { phase?: unknown } } | undefined
    const oldRead = raw?.conversationState?.phase
    expect(oldRead).toBeUndefined()
    // None of R81/R82's string comparisons can ever match undefined.
    expect(oldRead === 'OBSERVE').toBe(false)
  })

  it('the NEW read resolves the identical input to OBSERVE, restoring R81/R82 on turn 1', () => {
    const newRead = readConversationState(undefined, 'phys.mech.conservative-forces').phase
    expect(newRead).toBe('OBSERVE')
    expect(newRead === 'OBSERVE').toBe(true)
  })
})
