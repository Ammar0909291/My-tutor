/**
 * Pure extraction for the `[HINT]...[/HINT]` control tag (Sprint W gap A —
 * see teachingOutputBias.ts's `deriveHintBias`). The tag's payload is the
 * model's own hint text (unlike `[INLINE_PRACTICE]`, which carries no
 * payload and is computed server-side), so this both extracts the text AND
 * strips the tag from the surrounding response, same pattern as
 * `parseAssistantTags.ts`'s other tag parsers.
 */

const HINT_TAG_RE = /\[HINT\]([\s\S]*?)\[\/HINT\]/i

export function parseHintTag(text: string): { hint: string | null; cleanText: string } {
  const match = text.match(HINT_TAG_RE)
  if (!match) return { hint: null, cleanText: text }
  const hint = match[1].trim()
  const cleanText = text.replace(match[0], '').trim()
  return { hint: hint.length > 0 ? hint : null, cleanText }
}
