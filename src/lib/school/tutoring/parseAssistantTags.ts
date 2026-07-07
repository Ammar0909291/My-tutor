/**
 * Pure parsing for the assistant-text control tags consumed in
 * `LessonScreen.tsx`'s `sendMessage` (Sprint W gap D follow-up — this logic
 * previously lived inline in the component with zero test coverage despite
 * driving mastery scoring and lesson-progress advancement).
 *
 * Extracted verbatim (same regexes, same order of application) so the
 * client component can call these as pure functions and a harness can
 * exercise them without React/fetch/DOM. Side effects (fetch calls, state
 * setters) stay in the component — only the tag → data extraction moved.
 */

export interface MathCheck {
  expected: number
  got: number
}

export interface CodeCheck {
  expected: string
  got: string
}

export interface AssessmentResultTag {
  correctness: number
  reasoning: number
  confidence: number
}

/**
 * Detects and strips the exact `[LESSON_COMPLETE]` control tag. Must match
 * only the literal tag — not conversational phrases like "lesson complete"
 * — since the AI says those constantly as normal filler.
 */
export function parseLessonCompletionTag(text: string): { hasCompletion: boolean; cleanText: string } {
  const hasCompletion = text.toUpperCase().includes('[LESSON_COMPLETE]')
  const cleanText = hasCompletion ? text.replace(/\[LESSON_COMPLETE\]/i, '').trim() : text
  return { hasCompletion, cleanText }
}

/** Collects every `[MATH_ANSWER ...]` / `[CODE_ANSWER ...]` tag, then strips them all. */
export function parseMathCodeAnswerTags(text: string): { mathChecks: MathCheck[]; codeChecks: CodeCheck[]; cleanText: string } {
  const mathChecks: MathCheck[] = []
  const codeChecks: CodeCheck[] = []
  const mathTagRe = /\[MATH_ANSWER\s+expected=(-?\d+(?:\.\d+)?)\s+got=(-?\d+(?:\.\d+)?)\]/gi
  const codeTagRe = /\[CODE_ANSWER\s+expected="([^"]*)"\s+got="([^"]*)"\]/gi
  let m: RegExpExecArray | null
  while ((m = mathTagRe.exec(text)) !== null) mathChecks.push({ expected: parseFloat(m[1]), got: parseFloat(m[2]) })
  while ((m = codeTagRe.exec(text)) !== null) codeChecks.push({ expected: m[1], got: m[2] })
  const cleanText = (mathChecks.length > 0 || codeChecks.length > 0)
    ? text.replace(/\[MATH_ANSWER[^\]]*\]/gi, '').replace(/\[CODE_ANSWER[^\]]*\]/gi, '').trim()
    : text
  return { mathChecks, codeChecks, cleanText }
}

/** Matches the first `[ASSESSMENT_RESULT correctness=X reasoning=Y confidence=Z]` tag and strips it. */
export function parseAssessmentResultTag(text: string): { assessment: AssessmentResultTag | null; cleanText: string } {
  const match = text.match(/\[ASSESSMENT_RESULT\s+correctness=(\d+)\s+reasoning=(\d+)\s+confidence=(\d+)\]/i)
  if (!match) return { assessment: null, cleanText: text }
  const cleanText = text.replace(match[0], '').trim()
  return {
    assessment: {
      correctness: parseInt(match[1], 10),
      reasoning: parseInt(match[2], 10),
      confidence: parseInt(match[3], 10),
    },
    cleanText,
  }
}
