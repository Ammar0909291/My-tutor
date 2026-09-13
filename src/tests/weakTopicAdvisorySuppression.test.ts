/**
 * CROSS-CONCEPT DERAILMENT — the weak-topic / spaced-repetition advisory is no
 * longer arbitration-blind.
 *
 * ── THE DEFECT (real-account student-experience study, 2026-09-06) ─────────
 * `route.ts` appends up to four advisory prose blocks to the system prompt on
 * EVERY turn, computed purely from the learner's HISTORICAL mastery data:
 *   - ADAPTIVE TUTOR CONTEXT: "Give extra reinforcement on: <weak topics>"
 *   - MASTERY & SPACED REPETITION: "Weak concepts … Weave in extra
 *     reinforcement" and "OVERDUE for review … briefly revisit"
 *   - KNOWLEDGE GAPS: "Weave in targeted reinforcement … where natural"
 * Each carries only a soft qualifier ("where natural") — nothing enforces it
 * and nothing suppresses it once the learner objects, because it is
 * recomputed fresh from the same DB rows on every subsequent turn. None of
 * the four is gated by the turn-arbitration ladder that governs every other
 * competing instruction in this prompt.
 *
 * MEASURED: a Projectile Motion lesson derailed into "Electric Field and
 * Field Lines" the instant the learner wrote "i see picture but i dont
 * understand what it show… sorry my english not good", and a Covalent
 * Bonding lesson derailed into "Electron Affinity" — both unrelated
 * historical topics, both surviving an explicit request to return to the
 * lesson.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────
 * `weakTopicAdvisorySuppressed` gates all four blocks behind three already-
 * tested, pure signals this codebase already trusts elsewhere: a
 * distress/confusion signal this turn (`turnIntent.failureState` — the SAME
 * once-per-turn authoritative read every other consumer uses, never a second
 * call to `recoveryGuard.detectFailureState` on the raw message; see
 * turnIntentAuthority.test.ts, which pins that boundary), an explicit
 * return/correction request (`visual/session.isReturnRequest` /
 * `isExplicitCorrection` — outside that authority boundary), or an already-
 * active excursion (`excursion.parseExcursionState`). No new detector, no new
 * persisted state.
 *
 * This file pins two things: the REAL signals fire on the exact observed
 * message (so the gate the source wiring below reads from is not vacuous),
 * and the source wiring itself — that the flag is actually computed from
 * these three signals and that all four injection sites are gated by it.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { isReturnRequest, isExplicitCorrection } from '@/lib/teaching/visual/session'
import { parseExcursionState } from '@/lib/teaching/excursion'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('the real signals fire on the observed production messages', () => {
  it('the confusion turn that opened the Electric Field derailment is a distress signal', () => {
    const msg = 'i see picture but i dont understand what it show. what this line and numbers '
      + 'mean? sorry my english not good'
    expect(readTurnIntent(msg, null).failureState).not.toBeNull()
  })

  it('the explicit correction that should have ended it is a recognised return request', () => {
    expect(isReturnRequest('can we go back to ball please')).toBe(true)
  })

  it('an active excursion is detected from a persisted snapshot', () => {
    const state = parseExcursionState({
      active: true, targetConceptId: 'phys.em.electric-field', returnToConceptId: 'phys.mech.projectile-motion',
      turns: 2,
    })
    expect(state.active).toBe(true)
  })

  it('an ordinary, calm, on-topic turn triggers none of the signals', () => {
    const msg = 'the ball go up then go down slowly. it make like curve shape i think'
    expect(readTurnIntent(msg, null).failureState).toBeNull()
    // ENG-D09: the fourth signal must be false here too, or the advisory would
    // be suppressed on every ordinary turn and the feature silently disabled.
    expect(readTurnIntent(msg, null).learnerRequest).toBeNull()
    expect(isReturnRequest(msg)).toBe(false)
    expect(isExplicitCorrection(msg)).toBe(false)
  })
})

// RENAMED 2026-09-12 (ENG-D09). Original: 'route.ts wires the suppression
// flag from exactly those three signals'. A fourth signal — the
// LEARNER_REQUEST rung of the arbitration ladder — was added after the Group 5
// English topic-drift episode, where all three original signals read false on
// "please explain it another way" and the advisory pulled unrelated
// already-taught pronoun content into a complex-sentences lesson. The
// invariant this block exists for is unchanged: the flag is computed from the
// authoritative per-turn intent plus the existing pure session signals, never
// from a second raw-message detection.
describe('route.ts wires the suppression flag from exactly those four signals', () => {
  it('computes weakTopicAdvisorySuppressed from turnIntent.failureState, isReturnRequest/isExplicitCorrection, and an active excursion', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('const weakTopicAdvisorySuppressed'),
      // WIDENED 1500 -> 4000 (2026-09-12). ENG-D09 added a fourth signal to
      // this guard with its measured reasoning, which overflowed the original
      // fixed window; the assertions below are unchanged in substance.
      ROUTE.indexOf('const weakTopicAdvisorySuppressed') + 4000,
    )
    expect(block).toBeTruthy()
    // The authoritative read, not a second call to detectFailureState on the
    // raw message — that call is banned outright (turnIntentAuthority.test.ts).
    expect(block).toMatch(/turnIntent\.failureState/)
    expect(block).not.toMatch(/detectFailureState\(message/)
    expect(block).toMatch(/turnIntent\.learnerRequest !== null/)
    expect(block).toMatch(/isReturnRequest\(message\)/)
    expect(block).toMatch(/isExplicitCorrection\(message\)/)
    expect(block).toMatch(/parseExcursionState\(/)
    expect(block).toMatch(/excursionState\.active/)
  })

  it('turnIntent is read before this block, not re-derived here', () => {
    const turnIntentIdx = ROUTE.indexOf('const turnIntent = readTurnIntent(')
    const guardIdx = ROUTE.indexOf('const weakTopicAdvisorySuppressed')
    expect(turnIntentIdx).toBeGreaterThan(-1)
    expect(guardIdx).toBeGreaterThan(turnIntentIdx)
  })

  it('fails open (advisory may still fire) if the guard itself throws', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('const weakTopicAdvisorySuppressed'),
      // WIDENED 1500 -> 4000 (2026-09-12). ENG-D09 added a fourth signal to
      // this guard with its measured reasoning, which overflowed the original
      // fixed window; the assertions below are unchanged in substance.
      ROUTE.indexOf('const weakTopicAdvisorySuppressed') + 4000,
    )
    expect(block).toMatch(/catch\s*{[\s\S]*?return false/)
  })

  it('gates all four advisory injection sites behind the flag', () => {
    expect(ROUTE).toMatch(/subjectAnalytics\.weakTopics\.length\s*&&\s*!weakTopicAdvisorySuppressed/)
    expect(ROUTE).toMatch(/weakMetrics\.length\s*&&\s*!weakTopicAdvisorySuppressed/)
    expect(ROUTE).toMatch(/overdueTopics\.length\s*&&\s*!weakTopicAdvisorySuppressed/)
    expect(ROUTE).toMatch(/weakTopics\.length\s*>\s*0\s*&&\s*!weakTopicAdvisorySuppressed/)
  })

  it('the flag is declared BEFORE the first of the four injection sites reads it', () => {
    const flagIdx = ROUTE.indexOf('const weakTopicAdvisorySuppressed')
    const firstUseIdx = ROUTE.indexOf('!weakTopicAdvisorySuppressed')
    expect(flagIdx).toBeGreaterThan(0)
    expect(firstUseIdx).toBeGreaterThan(flagIdx)
  })

  it('does NOT suppress the "Coming up for review soon" line — informational only, not a same-turn instruction', () => {
    // That line only lists future reviews; it never tells the model to teach
    // anything THIS turn, so it is deliberately left ungated.
    const upcomingLine = ROUTE.slice(
      ROUTE.indexOf('upcomingTopics.length'),
      ROUTE.indexOf('upcomingTopics.length') + 120,
    )
    expect(upcomingLine).not.toMatch(/weakTopicAdvisorySuppressed/)
  })
})
