import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * A DIAGRAM BELONGS ONLY TO THE MESSAGE THAT INTRODUCED IT.
 *
 * ── THE BUG ─────────────────────────────────────────────────────────────────
 * `resolveVisual`'s continuity system (session.ts) deliberately HOLDS the
 * active figure across follow-up turns — "the figure already on screen…
 * should stay there" — so `resolveVisualForTurn` keeps returning
 * `graphical: true` with the SAME payload turn after turn for as long as the
 * topic is unchanged. That is correct and untouched: it is what stops the
 * figure disappearing mid-explanation (see visualContinuityProduction.test.ts,
 * session.ts's own module doc).
 *
 * The bug was one level up. Route.ts's "authority clamp" attached WHATEVER
 * `resolveVisualForTurn` returned — including a HELD figure — to the CURRENT
 * turn's own message every time, unconditionally. So:
 *
 *   Tutor #1: explanation + diagram         (fresh, turns: 0)
 *   Student #2: answer
 *   Tutor #3: explanation + THE SAME diagram (held, turns: 1)  <- WRONG
 *   Student #4: answer
 *   Tutor #5: explanation + THE SAME diagram (held, turns: 2)  <- WRONG
 *
 * A learner scrolling the transcript saw one picture duplicated under every
 * reply, not one picture that belonged to the reply that drew it.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────────
 * `VisualDecision.session.turns` already distinguishes the two cases —
 * `resolveVisual.ts`'s `buildDecision` sets `heldTurns: 0` on a fresh
 * resolution (first appearance or an explicit re-target) and
 * `session.ts`'s `tickSession` increments it on every HOLD. This is the same
 * signal `visualNotReintroduced.test.ts` already uses to stop the tutor's
 * PROSE re-describing a held figure. Route.ts now reads it twice, gating both
 * halves of "what does this message show":
 *
 *   1. THE LIVE RENDER   — `figureIntroducedThisTurn`, gating the authority
 *      clamp that fills `responseVisual` / `detectedVisualSpec` /
 *      `detectedSceneSpec` for the message actually sent to the client.
 *   2. THE PERSISTED RECORD — `figureBelongsToThisTurn`, gating
 *      `Message.visualSession`, so a held turn is never written down as
 *      having shown a figure and a later page reload cannot resurrect it
 *      through `applyRestoredVisuals`.
 *
 * Continuity itself — the session slot persisted for the NEXT turn's
 * resolution, and the system-prompt contract telling the model a figure is
 * on screen so its prose can refer to it — is untouched: both read
 * `visualDecisionHoisted.session`/`.graphical` directly, with no turns gate,
 * exactly as before this fix.
 *
 * These are SOURCE assertions: route.ts is a large server route this repo's
 * vitest config does not execute end-to-end (no test database, no live
 * request), so the wiring itself — which fields gate which channels, and in
 * what order — is what these tests pin. The BEHAVIOURAL half of the fix
 * (the actual restore-from-history result for a held vs. fresh turn) is
 * covered in `visualHistoryPersistence.test.ts`'s "a figure belongs only to
 * the message that introduced it" suite, which exercises the real resolver
 * and the real restore path end to end.
 */

const ROUTE = readFileSync(
  path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

describe('the live render is gated on this-turn introduction', () => {
  it('figureIntroducedThisTurn reads session.turns === 0, defaulting true only when there is no session at all', () => {
    expect(ROUTE).toMatch(
      /const figureIntroducedThisTurn =\s*\n\s*visualDecisionHoisted\?\.session \? visualDecisionHoisted\.session\.turns === 0 : true/,
    )
  })

  it('the authority clamp only fills the visual channels when the figure was introduced this turn', () => {
    const clampStart = ROUTE.indexOf('const decision = visualDecisionHoisted')
    expect(clampStart).toBeGreaterThan(-1)
    const clamp = ROUTE.slice(clampStart, clampStart + 1200)
    expect(clamp).toMatch(/if \(figureIntroducedThisTurn\) \{/)
    // The three payload-filling cases (card/spec/scene) must all sit INSIDE
    // that gate, not merely somewhere in the clamp.
    const gateStart = clamp.indexOf('if (figureIntroducedThisTurn) {')
    const gated = clamp.slice(gateStart)
    expect(gated).toContain("case 'card':")
    expect(gated).toContain("case 'spec':")
    expect(gated).toContain("case 'scene':")
  })

  it('the four channel-clears at the top of the clamp are still unconditional', () => {
    // A held turn must still CLEAR to no-visual, not skip the clamp entirely
    // (which would leave a stale value from an earlier code path). Only the
    // re-fill is gated; the clear is not.
    expect(ROUTE).toMatch(
      /responseVisual = null\s*\n\s*detectedVisualSpec = null\s*\n\s*detectedSceneSpec = null\s*\n\s*dynamicVisualizationCode = null\s*\n\n?\s*\/\//,
    )
  })
})

describe('the persisted record is gated on the same signal', () => {
  it('figureBelongsToThisTurn refuses a held session before consulting excursion state', () => {
    const fnStart = ROUTE.indexOf('const figureBelongsToThisTurn = (() => {')
    expect(fnStart).toBeGreaterThan(-1)
    const fn = ROUTE.slice(fnStart, ROUTE.indexOf('})()', fnStart))
    const sessionGuardIdx = fn.indexOf('if (!session) return false')
    const turnsGuardIdx = fn.indexOf('if (session.turns !== 0) return false')
    const excursionGuardIdx = fn.indexOf('excursionDecisionHoisted?.state.active')
    expect(sessionGuardIdx).toBeGreaterThan(-1)
    expect(turnsGuardIdx).toBeGreaterThan(-1)
    expect(excursionGuardIdx).toBeGreaterThan(-1)
    // Order matters: turns is checked right after the null guard, strictly
    // before excursion state — so a held turn is refused unconditionally,
    // never salvaged by an excursion-resolved concept match.
    expect(sessionGuardIdx).toBeLessThan(turnsGuardIdx)
    expect(turnsGuardIdx).toBeLessThan(excursionGuardIdx)
  })

  it('displayedVisualSession (what gets written to Message.visualSession) still requires figureBelongsToThisTurn', () => {
    expect(ROUTE).toMatch(
      /visualDecisionHoisted\?\.graphical && visualDecisionHoisted\.session && figureBelongsToThisTurn/,
    )
  })
})

describe('continuity itself is untouched by this fix', () => {
  it('the system-prompt visual contract is built from the raw decision, with no turns gate', () => {
    const idx = ROUTE.indexOf('systemPrompt += buildVisualContractBlock(decision, {')
    expect(idx).toBeGreaterThan(-1)
    // decision here is visualDecisionHoisted itself (assigned two lines
    // above in the same block), not a turns-filtered view of it — the model
    // must still be told a figure is on screen even on a held turn, so its
    // prose can refer to it (and visualNotReintroduced.test.ts's own
    // ALREADY-INTRODUCED rule can fire).
    const before = ROUTE.slice(Math.max(0, idx - 700), idx)
    expect(before).toContain('visualDecisionHoisted = decision')
  })

  it('the next-turn continuity slot (visualSessionUpdate) is written unconditionally, not gated on figureIntroducedThisTurn', () => {
    const idx = ROUTE.indexOf('const visualSessionUpdate: Record<string, unknown> = visualDecisionHoisted')
    expect(idx).toBeGreaterThan(-1)
    const block = ROUTE.slice(idx, idx + 400)
    expect(block).toContain('visualSession: visualDecisionHoisted.session')
    expect(block).not.toContain('figureIntroducedThisTurn')
  })
})

describe('no CSS/index/counter workaround was introduced', () => {
  // The explicit instruction: no :first-child, no array-index comparison, no
  // "already shown" counter, no global visual-clearing, no per-concept or
  // per-subject special case. The fix must be the single existing
  // `session.turns` identity signal, read in exactly two places.
  it('no first-child or nth-child selector was added for visual de-duplication', () => {
    expect(ROUTE).not.toMatch(/:first-child/)
    expect(ROUTE).not.toMatch(/:nth-child/)
  })

  it('the new gate itself introduces no "already shown" counter of its own', () => {
    // Scoped to the fix's own region, not the whole route: the file already
    // contains an unrelated `alreadyShown` (RRM ground truth, a different
    // feature entirely) elsewhere, which a whole-file check would wrongly
    // flag. The fix under test must not add a SECOND, competing counter.
    const idx = ROUTE.indexOf('const figureIntroducedThisTurn =')
    const region = ROUTE.slice(idx, idx + 2000)
    expect(region).not.toMatch(/already[-_ ]?(shown|rendered|displayed)/i)
  })

  it('no concept- or subject-specific branch was added around the new gate', () => {
    const idx = ROUTE.indexOf('const figureIntroducedThisTurn =')
    const region = ROUTE.slice(idx, idx + 2000)
    // The gate must read only session.turns — never branch on a concept id,
    // a subject slug, or a lesson title.
    expect(region).not.toMatch(/conceptId ===/)
    expect(region).not.toMatch(/subjectCode ===/)
  })
})
