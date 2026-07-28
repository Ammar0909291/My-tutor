/**
 * D.23-30 — Visual Intelligence layer.
 *
 * Deterministic system-prompt block + post-processing for visual selection,
 * relevance ranking, repeat avoidance, URL stripping, and narration sync.
 * Pure module: no DB, no I/O.
 *
 * Replaces the simpler buildVisualsSystemBlock (detectVisual.ts) with
 * richer teaching-objective-aligned visual directives.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'

/**
 * D.27: Check whether a visual type was already shown in recent messages.
 * Prevents unnecessary repetition of the same diagram.
 */
export function hasVisualBeenShown(
  visualType: VisualType | null,
  recentVisuals: (string | null | undefined)[],
): boolean {
  if (!visualType) return false
  return recentVisuals.some((v) => v === visualType)
}

/**
 * D.28: Strip markdown image links and raw image URLs from LLM output.
 * The LLM sometimes emits ![alt](url) or bare https://...png links
 * that render as broken images or expose internal URLs.
 */
const MD_IMAGE_RE = /!\[[^\]]*\]\([^)]+\)/g
const RAW_IMAGE_URL_RE = /(?:^|\s)https?:\/\/\S+\.(?:png|jpg|jpeg|gif|svg|webp)(?:\?\S*)?(?:\s|$)/gi

export function stripRawImageUrls(text: string): string {
  return text
    .replace(MD_IMAGE_RE, '')
    .replace(RAW_IMAGE_URL_RE, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * D.23-30: Enhanced visual system prompt block.
 *
 * Extends the original buildVisualsSystemBlock with:
 *  - D.23: Select visuals based on the CURRENT teaching objective
 *  - D.24: Rank by concept relevance
 *  - D.25: Prefer concept-specific visuals
 *  - D.26: Avoid weakly related visuals
 *  - D.27: Never repeat the same visual unnecessarily
 *  - D.28: Never expose raw URLs or markdown image links
 *  - D.29: Synchronize narration with visuals
 *  - D.30: No irrelevant visuals — omit rather than show a poor match
 */
export function buildVisualIntelligenceBlock(
  availableVisual: VisualType | null,
  conceptTitle: string | null,
  alreadyShown: boolean,
): string {
  if (!availableVisual) {
    return `

VISUAL RULES:
- Do NOT emit a VISUAL tag — no matching visual is available for this concept.
- Do NOT include markdown image links (![alt](url)) or raw image URLs.
- If a diagram would help, describe it in words instead.`
  }

  const repeatWarning = alreadyShown
    ? `\n- This visual (${availableVisual}) was already shown earlier in this lesson. Do NOT emit it again unless the student explicitly asks for it or you are teaching a genuinely new aspect of the concept that the visual illuminates differently.`
    : ''

  return `

VISUAL INTELLIGENCE (follow for ALL visual decisions):

1. AVAILABLE VISUAL: ${availableVisual}${conceptTitle ? ` (matched to: ${conceptTitle})` : ''}
   Emit at most ONE tag on its own line at the END of your response: VISUAL: ${availableVisual}

2. TEACHING-OBJECTIVE ALIGNMENT (D.23): Only emit the visual when it directly serves what you are teaching THIS turn — not as decoration. Ask: "Does seeing this diagram RIGHT NOW help the student understand the specific point I just explained?" If no, omit it.

3. CONCEPT RELEVANCE (D.24-26): This visual was matched to the current concept by the server. Trust it when it fits the teaching point. If the turn's content has drifted to a sub-topic or tangent where this visual does not apply, do NOT force it — omit the tag entirely.

4. NO REPEATS (D.27): ${alreadyShown ? `This visual was ALREADY shown. Do NOT re-emit unless the student requests it or you are covering a genuinely new angle.` : `Track what you have shown. If a previous turn already displayed this visual, do not repeat it.`}${repeatWarning}

5. NO RAW URLS (D.28): NEVER include markdown image syntax (![alt](url)), raw image URLs, or links to external images. The visual renders automatically from the VISUAL tag — no URL needed.

6. NARRATION SYNC (D.29): When you emit a visual, your surrounding text must:
   - Introduce what the student will see BEFORE the tag ("Look at how the forces balance...")
   - Reference specific parts of the visual ("Notice the arrow pointing right...")
   - Connect the visual back to the equation or principle being taught
   Do NOT emit a visual with no textual reference to it.

7. RELEVANCE GATE (D.30): If your response is a question, a short correction, a brief acknowledgement, or a topic where this visual adds nothing — omit the VISUAL tag entirely. An absent visual is better than an irrelevant one.

8. Never mention "the diagram" generically — reference what the student sees specifically.
9. Do not add VISUAL if your response is purely a question or a short reply.`
}
