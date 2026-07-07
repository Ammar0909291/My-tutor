/**
 * Pure tag extraction for LLM-generated visualization code, same bracket-tag
 * convention as parseAssistantTags.ts ([LESSON_COMPLETE], [HINT], etc.) — a
 * `[VISUALIZATION_CODE] ... [/VISUALIZATION_CODE]` wrapper around the raw
 * component source. generateVisualizationCode.ts tries this first (in case
 * the model wraps its output in the tag) before falling back to its
 * markdown-fence-stripping for the common case of genuinely raw output.
 *
 * Never throws — an absent or malformed tag (missing close, empty body)
 * just returns null so the caller can fall back to other parsing.
 */
export function parseVisualizationCode(text: string): string | null {
  if (!text) return null

  const openTag = /\[VISUALIZATION_CODE\]/i
  const closeTag = /\[\/VISUALIZATION_CODE\]/i

  const openMatch = openTag.exec(text)
  if (!openMatch) return null

  const afterOpen = text.slice(openMatch.index + openMatch[0].length)
  const closeMatch = closeTag.exec(afterOpen)
  if (!closeMatch) return null

  const code = afterOpen.slice(0, closeMatch.index).trim()
  return code ? code : null
}

/** Strips a well-formed tag pair (and its contents) from the surrounding text, if present. */
export function stripVisualizationCodeTag(text: string): string {
  if (!text) return text
  return text.replace(/\[VISUALIZATION_CODE\][\s\S]*?\[\/VISUALIZATION_CODE\]/i, '').trim()
}
