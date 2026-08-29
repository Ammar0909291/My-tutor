/**
 * Historical timeline scene generator (11th parametric generator).
 *
 * Lays out a set of dated events along a horizontal axis, positioned
 * proportionally within the events' year range, with labels alternating
 * above/below the axis so they don't overlap. Same architecture as the other
 * generators: extractTimelineParams (LLM, isolated) → validateTimelineParams
 * (pure) → buildTimelineScene (pure, deterministic layout) →
 * checkTimelineConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./historicalTimeline.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { TimelineParams, validateTimelineParams } from './historicalTimeline.pure'

export * from './historicalTimeline.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the dated historical events being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isTimeline": true|false, "events": [{"year": <integer, use negative for BCE>, "event": "<short description>"}, ...]}
- isTimeline is false if the text does not describe a sequence of at least 2 dated events.
- Include at least 2 and at most 8 events; do not invent events or years not stated in the text.
- Use negative integers for BCE years (e.g. -3000 for 3000 BCE) and positive integers for CE years.`
}

/**
 * Extract validated timeline events from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractTimelineParams(text: string): Promise<TimelineParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 400).catch(() => null)
  if (!raw || raw.isTimeline !== true) return null
  return validateTimelineParams(raw)
}
