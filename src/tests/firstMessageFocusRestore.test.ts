import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * REAL-STUDENT REPORT: "First typed learner question produced no learner
 * bubble/AI response and zero network requests, yet daily goal advanced from
 * 0% to 2% / 0->1 minute. Retry through the send button worked."
 *
 * ── THE "DAILY GOAL" HALF — INVESTIGATED, NOT A DEFECT ─────────────────────
 * The Today's Goal ring (`goalDoneMin`, LessonScreen.tsx) is
 * `todayBaselineMinutes + Math.floor(elapsed / 60)`, where `elapsed` ticks
 * once a second from a plain `setInterval` started on mount — a wall-clock
 * presence timer, structurally independent of whether any message was ever
 * sent. The dashboard's own daily-goal percentage
 * (`getDashboardV2Data.ts`) is `topicProgress.count({ status: COMPLETED |
 * MASTERED })` — a real lesson completion, which a single failed send cannot
 * produce. Neither metric "counts a failed send as progress"; both simply
 * kept advancing for an unrelated, correct reason (time passing) while the
 * message silently failed. No fix applied here — verified, not assumed.
 *
 * ── THE SILENT-FAILURE HALF — ROOT CAUSE ────────────────────────────────────
 * The composer textarea is `disabled={isStreaming || !sessionId}`, and a
 * DISABLED form control auto-blurs in every browser — a hard platform fact,
 * not something this app controls. `isStreaming` stays true for the ENTIRE
 * reveal animation (`revealAssistantMessage`'s onDone, not just the network
 * round-trip), so the textarea is disabled — and loses focus — for the whole
 * time the tutor's reply is visibly "typing out". Three call sites in
 * LessonScreen.tsx flip `isStreaming` back to false once a reveal completes;
 * two of them (`sendMessage`, `sendImageMessage`) already restore focus
 * afterward. The THIRD — `callLessonInit`, the lesson-opening handler
 * reached by every restart/resume/next/review, and so the very first reveal
 * a learner ever watches in a lesson — did not. Once the intro finished, the
 * field re-enabled but stayed unfocused, so a learner who started typing
 * immediately (the overwhelmingly likely moment for a "first message") had
 * their keystrokes land nowhere: no text in the box, no `handleSend()` call,
 * zero network requests, no bubble — exactly the reported shape. Clicking
 * directly into the field (or the Send button, which needs no prior focus)
 * on retry is what "worked".
 *
 * FIX: `callLessonInit`'s reveal-completion callback now restores focus too,
 * matching its two siblings exactly — no new mechanism, no behaviour change
 * to when the field is enabled or disabled, only closing the one path where
 * re-enabling it left it silently unusable via keyboard.
 */

const TSX = readFileSync(
  path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'),
  'utf8',
)

const sendMessageIdx = TSX.indexOf("revealAssistantMessage(aid, stripCode(full), () => {")
const callLessonInitIdx = TSX.indexOf("const callLessonInit = useCallback(async (")
const callLessonInitRevealIdx = TSX.indexOf(
  'revealAssistantMessage(aid, stripCode(data.text as string)',
  callLessonInitIdx,
)
const sendImageMessageIdx = TSX.lastIndexOf(
  "revealAssistantMessage(aid, stripCode(full), () => {",
)

describe('lesson-opening reveal now restores focus, matching its two sibling reveal sites', () => {
  it('callLessonInit exists and its reveal call comes after it in the file', () => {
    expect(callLessonInitIdx).toBeGreaterThan(-1)
    expect(callLessonInitRevealIdx).toBeGreaterThan(callLessonInitIdx)
  })

  it("callLessonInit's onDone callback now calls setIsStreaming(false) AND refocuses the textarea", () => {
    const block = TSX.slice(callLessonInitRevealIdx, callLessonInitRevealIdx + 400)
    expect(block).toContain('setIsStreaming(false)')
    expect(block).toContain('textareaRef.current?.focus()')
  })

  it('the sendMessage reveal site (sibling 1) already had focus restoration — unchanged by this fix', () => {
    expect(sendMessageIdx).toBeGreaterThan(-1)
    const block = TSX.slice(sendMessageIdx, sendMessageIdx + 200)
    expect(block).toContain('setIsStreaming(false)')
    expect(block).toContain('textareaRef.current?.focus()')
  })

  it('the sendImageMessage reveal site (sibling 2) already had focus restoration — unchanged by this fix', () => {
    expect(sendImageMessageIdx).toBeGreaterThan(-1)
    expect(sendImageMessageIdx).not.toBe(sendMessageIdx)
    const block = TSX.slice(sendImageMessageIdx, sendImageMessageIdx + 200)
    expect(block).toContain('setIsStreaming(false)')
    expect(block).toContain('textareaRef.current?.focus()')
  })

  it('all three revealAssistantMessage call sites in the file now restore focus in their onDone', () => {
    const calls = [...TSX.matchAll(/revealAssistantMessage\(/g)]
    expect(calls.length).toBe(3)
    // Every onDone callback that flips isStreaming false is followed, within
    // a short window, by a focus restoration — the exact invariant this fix
    // establishes across all three sites.
    for (const m of calls) {
      const block = TSX.slice(m.index, m.index! + 400)
      expect(block).toContain('setIsStreaming(false)')
      expect(block).toContain('textareaRef.current?.focus()')
    }
  })
})

describe('scope: the composer\'s disabled/guard logic itself is untouched', () => {
  it('handleSend still guards on isStreaming and sessionId exactly as before — this fix changes focus timing only, never when a send is allowed', () => {
    expect(TSX).toContain('if (isStreaming || !sessionId) return')
  })

  it('the textarea disabled condition and responding placeholder are unchanged', () => {
    const idx = TSX.indexOf('disabled={isStreaming || !sessionId}')
    expect(idx).toBeGreaterThan(-1)
    expect(TSX).toContain("isStreaming ? t('lesson_responding')")
  })
})
