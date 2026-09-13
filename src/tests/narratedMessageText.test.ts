import { describe, it, expect } from 'vitest'
import { displayText, narrationText, type CollapsibleMessageText } from '@/lib/learn/narratedMessageText'

/**
 * VISUAL COLLAPSE STATE ≠ NARRATION CONTENT SOURCE.
 *
 * Regression fixture: a Tutor message longer than the collapsed display
 * limit (LessonScreen.tsx's `truncate(full, 4)` keeps the first 4 sentences
 * as the preview) — the visible portion plus a HIDDEN "Read more" portion
 * carrying a unique marker sentence.
 */
const HIDDEN_MARKER = 'The seventh sentence carries the hidden marker CANARY_SEVEN.'
const FULL_MESSAGE = [
  'This is the first sentence of a long tutor explanation.',
  'This is the second sentence, still well within the preview.',
  'This is the third sentence, building up the concept.',
  'This is the fourth sentence — the preview cuts off right after this one.',
  'This is the fifth sentence, already hidden behind Read More.',
  'This is the sixth sentence, also hidden.',
  HIDDEN_MARKER,
].join(' ')
const PREVIEW = [
  'This is the first sentence of a long tutor explanation.',
  'This is the second sentence, still well within the preview.',
  'This is the third sentence, building up the concept.',
  'This is the fourth sentence — the preview cuts off right after this one.',
].join(' ')

const LONG_MESSAGE: CollapsibleMessageText = { full: FULL_MESSAGE, preview: PREVIEW, hasMore: true }
const SHORT_MESSAGE: CollapsibleMessageText = { full: 'A short reply that never needed truncation.', preview: 'A short reply that never needed truncation.', hasMore: false }

describe('narratedMessageText — the DISPLAY / NARRATION fork', () => {
  describe('non-vacuity: the OLD approach (narration fed the collapsed preview) vs. the NEW one (narrationText)', () => {
    it('OLD: narration built from the Read-More-truncated preview excludes the hidden marker sentence', () => {
      // This reproduces the exact pre-fix formula LessonScreen.tsx used to
      // hand to useNarrationPlayback's `text` prop while collapsed:
      // `cached.hasMore && !isExpanded ? cached.preview : cached.full`.
      const isExpanded = false
      const oldNarrationSource = LONG_MESSAGE.hasMore && !isExpanded ? LONG_MESSAGE.preview : LONG_MESSAGE.full
      expect(oldNarrationSource).not.toContain('CANARY_SEVEN')
      expect(oldNarrationSource).toBe(PREVIEW)
    })

    it('NEW: narrationText() always includes the hidden marker sentence, collapsed or not', () => {
      expect(narrationText(LONG_MESSAGE, null)).toContain('CANARY_SEVEN')
      expect(narrationText(LONG_MESSAGE, null)).toBe(FULL_MESSAGE)
    })
  })

  it('displayText respects the collapse when not expanded (unchanged pre-fix behaviour)', () => {
    expect(displayText(LONG_MESSAGE, false, null)).toBe(PREVIEW)
    expect(displayText(LONG_MESSAGE, false, null)).not.toContain('CANARY_SEVEN')
  })

  it('displayText shows the full message once expanded', () => {
    expect(displayText(LONG_MESSAGE, true, null)).toBe(FULL_MESSAGE)
    expect(displayText(LONG_MESSAGE, true, null)).toContain('CANARY_SEVEN')
  })

  it('narrationText is identical whether isExpanded is true or false — it does not take isExpanded as an argument at all', () => {
    // Structural proof, not just a value check: the function signature has
    // no isExpanded parameter, so it is IMPOSSIBLE for a Read More toggle to
    // change the string narration receives — which is exactly what keeps
    // useNarrationPlayback's [id, text] reset effect from restarting
    // narration when the learner expands/collapses mid-playback.
    expect(narrationText.length).toBe(2) // (msg, familiarityLine) — no isExpanded
    expect(narrationText(LONG_MESSAGE, null)).toBe(narrationText(LONG_MESSAGE, null))
  })

  it('a message that never needed truncation (hasMore=false) narrates and displays the identical text', () => {
    expect(displayText(SHORT_MESSAGE, false, null)).toBe(SHORT_MESSAGE.full)
    expect(narrationText(SHORT_MESSAGE, null)).toBe(SHORT_MESSAGE.full)
  })

  describe('familiarity-line stripping (the intro single-choice control) — both forks strip the SAME line, never speak or show it twice', () => {
    const line = '🟢 I already know it / 🟡 I\'ve seen it before / 🔴 Completely new to me'
    const withLine: CollapsibleMessageText = {
      full: `Before we begin — how familiar are you?\n${line}\nLet's start.`,
      preview: `Before we begin — how familiar are you?\n${line}\nLet's start.`,
      hasMore: false,
    }

    it('displayText strips it', () => {
      expect(displayText(withLine, false, line)).not.toContain('🟢')
    })

    it('narrationText strips it too — the UI control replaces it, so narration must not speak the raw line', () => {
      const result = narrationText(withLine, line)
      expect(result).not.toContain('🟢')
      expect(result).toContain('Before we begin')
      expect(result).toContain("Let's start.")
    })

    it('when there is no familiarity line, neither fork touches the text', () => {
      expect(displayText(SHORT_MESSAGE, false, null)).toBe(SHORT_MESSAGE.full)
      expect(narrationText(SHORT_MESSAGE, null)).toBe(SHORT_MESSAGE.full)
    })
  })

  it('collapses 3+ blank lines left behind by stripping a line, same as the pre-fix inline formula did', () => {
    const line = 'MARKER LINE'
    const msg: CollapsibleMessageText = { full: `Before.\n${line}\n\n\n\nAfter.`, preview: `Before.\n${line}\n\n\n\nAfter.`, hasMore: false }
    expect(narrationText(msg, line)).toBe('Before.\n\nAfter.')
  })
})
