/**
 * The text a message shows while it has no cached preview (LessonScreen.tsx): the stripped content, cut to the revealed length during a reveal, with the
 * familiarity question taken out when one was parsed from the message.
 *
 * THE DEFECT THIS EXISTS FOR (production, 2026-11-05, "TypeError: Cannot read properties of null (reading 'replace')" on /learn?subject=physics, Russian UI,
 * the whole page replaced by the error screen). The stripped content is `null` when the message HAS a cached preview (`cached ? null : stripCode(...)`),
 * and the old inline code computed this fallback for every message anyway and called `.replace` on it whenever a familiarity line had been parsed — which
 * is exactly the lesson's opening message on a RELOAD (history restored, preview cached). So any learner who reloaded a lesson whose opening carries the
 * familiarity question got the error screen. A fresh account never reproduces it: its opening message has no cached preview yet.
 *
 * Pure and total: a message with a cached preview does not use this text at all (its display text comes from the cache), so it returns ''.
 */
export function streamingFallbackText(input: {
  cached: boolean
  stripped: string | null | undefined
  revealing: boolean
  revealedLength?: number
  familiarityLine: string | null
}): string {
  if (input.cached || typeof input.stripped !== 'string') return ''
  const raw = input.revealing ? input.stripped.slice(0, input.revealedLength) : input.stripped
  return input.familiarityLine ? raw.replace(input.familiarityLine, '').replace(/\n{3,}/g, '\n\n').trim() : raw
}
