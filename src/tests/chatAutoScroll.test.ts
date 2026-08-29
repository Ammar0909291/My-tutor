/**
 * AUTO-SCROLL — regression tests for `shouldAutoScrollOnMessagesChange`.
 *
 * ── THE ROOT CAUSE, IN FULL (see LessonScreen.tsx's own comment on the
 * effect for the live version of this account) ───────────────────────────
 * The old effect was `if (atBottom) scrollIntoView(...)` on every `messages`
 * change — ONE boolean gating BOTH "did the learner just send their own
 * message" and "should an incoming reply follow the viewport." `atBottom` is
 * derived entirely from native 'scroll' events, and it can be legitimately —
 * not buggy, genuinely correctly — `false` at the exact moment of sending: a
 * long previous reply left the scroll position a few pixels past the 60px
 * threshold, or a mobile on-screen-keyboard resize recomputed the container's
 * metrics right as the learner tapped Send. Gating the learner's OWN message
 * behind that flag meant it could silently fail to scroll into view — the
 * "press ↓ just to see what I sent" bug.
 *
 * The newest ARRAY ENTRY can't be used to detect "I just sent something"
 * either: `sendMessage` appends the learner's message and the empty assistant
 * placeholder in two `setMessages` calls with no `await` between them, so
 * React 18 batches both into ONE render — by the time the effect runs, the
 * array's LAST entry is already the assistant placeholder, not the learner's
 * message. `shouldAutoScrollOnMessagesChange` instead diffs the array by
 * LENGTH (everything appended since the previous render) and checks whether
 * ANY of those new entries has role 'user' — correct under the batched case,
 * and correct regardless of which of the several send paths did the
 * appending (sendMessage, sendImageMessage, lesson-init, MCQ taps — all of
 * them, with no per-call-site change needed).
 */
import { describe, it, expect } from 'vitest'
import { shouldAutoScrollOnMessagesChange, type ChatMsg } from '@/components/learn/LessonScreen'

const user = (id: string): Pick<ChatMsg, 'role'> => ({ role: 'user' })
const assistant = (): Pick<ChatMsg, 'role'> => ({ role: 'assistant' })

describe('D — the learner\'s own message always becomes visible', () => {
  it('a single appended user message scrolls even when atBottom reads false (the core bug)', () => {
    const messages = [user('u1')]
    expect(shouldAutoScrollOnMessagesChange(messages, 0, false)).toBe(true)
  })

  it('the BATCHED case: user message + empty assistant placeholder appended together in one render', () => {
    // This is what sendMessage actually produces: two setMessages calls with
    // no await between them, batched by React into one render. The newest
    // ARRAY ENTRY here is 'assistant' — a naive "is the last entry user"
    // check would miss this and reproduce the bug.
    const messages = [user('u1'), assistant()]
    expect(shouldAutoScrollOnMessagesChange(messages, 0, false)).toBe(true)
  })

  it('still scrolls when the learner sends a SECOND message later in a longer history', () => {
    const messages = [assistant(), user('u1'), assistant(), user('u2'), assistant()]
    // Only the last two entries (user('u2'), assistant()) are new.
    expect(shouldAutoScrollOnMessagesChange(messages, 3, false)).toBe(true)
  })
})

describe('E — an in-place reply landing follows the viewport only when already at the bottom', () => {
  it('no new entries (content landed via .map(), array length unchanged) + atBottom=true -> scroll', () => {
    const messages = [user('u1'), assistant()]
    expect(shouldAutoScrollOnMessagesChange(messages, 2, true)).toBe(true)
  })

  it('an assistant-only append (no accompanying user message) + atBottom=true -> scroll', () => {
    // The unprompted case: an opening lesson message, or a [LESSON_COMPLETE]
    // auto-continuation, with no user turn immediately before it.
    const messages = [assistant()]
    expect(shouldAutoScrollOnMessagesChange(messages, 0, true)).toBe(true)
  })
})

describe('F — intentional upward scrolling is respected', () => {
  it('no new entries + atBottom=false -> does NOT yank the learner back down', () => {
    const messages = [user('u1'), assistant()]
    expect(shouldAutoScrollOnMessagesChange(messages, 2, false)).toBe(false)
  })

  it('an assistant-only append while scrolled up (no user turn) -> does NOT force a scroll', () => {
    const messages = [user('u1'), assistant(), assistant()]
    // Only the trailing assistant() is new; no user entry among the additions.
    expect(shouldAutoScrollOnMessagesChange(messages, 2, false)).toBe(false)
  })
})

describe('edge cases', () => {
  it('an array RESET (length shrinks, e.g. a lesson transition clearing messages) never throws', () => {
    expect(() => shouldAutoScrollOnMessagesChange([], 12, false)).not.toThrow()
    expect(shouldAutoScrollOnMessagesChange([], 12, false)).toBe(false)
    expect(shouldAutoScrollOnMessagesChange([], 12, true)).toBe(true)
  })

  it('an empty messages array with prevLength 0 and atBottom=false -> false (nothing to reveal)', () => {
    expect(shouldAutoScrollOnMessagesChange([], 0, false)).toBe(false)
  })

  it('the very first bulk history restore (0 -> N) contains a user turn and forces the initial scroll', () => {
    // Redundant with the separate "jump to newest on first restore" effect,
    // but harmless — same target, same outcome.
    const restored = [assistant(), user('u1'), assistant(), user('u2')]
    expect(shouldAutoScrollOnMessagesChange(restored, 0, false)).toBe(true)
  })
})
