/**
 * A session close is not a filler turn.
 *
 * Live-reproduced 2026-08-22 against production. The learner typed
 * "I'm done for today." and received:
 *
 *   "Let me ask you something concrete about Newton's First Law — Inertia:
 *    what's one thing you notice or find surprising about what we just
 *    covered?"
 *
 * Everything upstream was correct — detectExplicitFinishRequest fired,
 * forceClosing set the episode to CLOSING, buildAffectCloseBlock was injected,
 * and nothing was graded. The stop was then undone at the last step by the
 * filler-turn repair, because a correct close has exactly the shape that
 * repair is built to catch: no explanation, no question, no new content —
 * which is precisely what the close directive ORDERS.
 *
 * This is the third recorded instance of the same failure: the better the
 * model obeys a directive, the more likely this repair overwrites it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { shouldRepairFillerTurn } from '@/lib/teaching/lessonCompletion'
import { detectFillerTurn } from '@/lib/teaching/conversationState'
import {
  detectExplicitFinishRequest, forceClosing, buildAffectCloseBlock,
  type SessionEpisode,
} from '@/lib/teaching/sessionLifecycle'

const episode = (over: Partial<SessionEpisode> = {}): SessionEpisode => ({
  startedAt: new Date(0).toISOString(), phase: 'CORE', visibleFailures: 0,
  retroWinOwed: false, openingSatisfied: true, ...over,
})

describe('an explicit stop is not overwritten by the filler repair', () => {
  it('the close directive orders the very shape the repair treats as filler', () => {
    // The collision, asserted from both sides so neither can drift alone.
    const close = buildAffectCloseBlock()
    expect(close).toMatch(/do NOT introduce new content, new questions/i)
    expect(close).toMatch(/close warmly in ~2 sentences/i)
  })

  it('the reported utterance still reaches CLOSING', () => {
    expect(detectExplicitFinishRequest("I'm done for today.")).toBe(true)
    expect(forceClosing(episode()).phase).toBe('CLOSING')
  })

  it('no filler repair on a CLOSING turn', () => {
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: false, closingTurn: true,
    })).toBe(false)
  })

  it('the repair still fires on an ordinary mid-lesson filler turn', () => {
    // The negative control: this fix must not disable the repair generally.
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: false, closingTurn: false,
    })).toBe(true)
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: false,
    })).toBe(true)
  })

  it('the pre-existing gates are unchanged', () => {
    expect(shouldRepairFillerTurn({
      lessonCompleted: true, respectsNewIntent: false, closingTurn: false,
    })).toBe(false)
    expect(shouldRepairFillerTurn({
      lessonCompleted: false, respectsNewIntent: true, closingTurn: false,
    })).toBe(false)
  })

  it('the route passes the episode phase into the predicate', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain("closingTurn: sessionEpisodeHoisted?.phase === 'CLOSING'")
  })
})

// ── P0-A: the invariant behind all of these ────────────────────────────────
// The filler repair replaces a turn that FAILED TO DO WHAT THE SERVER ASKED.
// The server knows what it asked. A turn whose shape the server itself
// ordered — no question, no new teaching content — is compliance, not filler.
//
// The detector fires on: <=30 words AND no '?' AND a known filler phrase. That
// phrase list ("feel free to", "whenever you're ready", "take your time",
// "no rush", "let's take one small step") is the vocabulary of CALMING and
// CLOSING — which is exactly what the close directive and the recovery scripts
// are required to use. So the collision is structural, not incidental.
describe('P0-A — a server-ordered turn shape is never filler', () => {
  const ordered = { lessonCompleted: false, respectsNewIntent: false }

  it('the detector genuinely cannot tell filler from a recovery script', () => {
    // Both are <=30 words, no '?', and carry a listed filler phrase. This is
    // the evidence that a text-only classifier CANNOT fix this, and why the
    // fix has to come from the server knowing what it ordered.
    expect(detectFillerTurn(
      "Let's take one small step together. We can continue whenever you're ready.",
    )).toBe(true)
    expect(detectFillerTurn(
      "That's okay. This one is genuinely tricky, and we can go slower. Let's take one small step together.",
    )).toBe(true)
  })

  it('a recovery turn is never repaired — the worst case in the system', () => {
    // A learner who typed "I give up" must not receive a quiz question.
    expect(shouldRepairFillerTurn({ ...ordered, recoveryTurn: true })).toBe(false)
  })

  it('a closing turn is never repaired', () => {
    expect(shouldRepairFillerTurn({ ...ordered, closingTurn: true })).toBe(false)
  })

  it('a completed lesson is never repaired', () => {
    expect(shouldRepairFillerTurn({ ...ordered, lessonCompleted: true })).toBe(false)
  })

  it('NEGATIVE CONTROL — genuine filler on an ordinary turn is still repaired', () => {
    // The whole point: this fix must not disable the repair. With no directive
    // active, a content-free turn is still replaced.
    expect(shouldRepairFillerTurn({ ...ordered })).toBe(true)
    expect(shouldRepairFillerTurn({
      ...ordered, closingTurn: false, recoveryTurn: false,
    })).toBe(true)
  })

  it('NEGATIVE CONTROL — a short concrete turn was never filler to begin with', () => {
    // Already protected by the phrase requirement; asserted so a future
    // loosening of FILLER_PHRASE_RE cannot quietly capture real teaching.
    expect(detectFillerTurn('An orbital is a region where electrons can be found.')).toBe(false)
    expect(detectFillerTurn('Force equals mass times acceleration: F = ma.')).toBe(false)
  })

  it('NEGATIVE CONTROL — a turn that asks a question is never filler', () => {
    expect(detectFillerTurn('Take your time. What do you think happens next?')).toBe(false)
  })

  it('the route passes the recovery signal into the predicate', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toContain('recoveryTurn: recoveryKeyHoisted !== null')
    // And the two shape-owned exclusions remain at the call site.
    expect(route).toContain('!assembled && !mcqHoisted')
  })
})
