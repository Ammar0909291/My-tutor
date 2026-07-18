/**
 * Client-side navigation intent detector.
 *
 * Intercepts user chat messages that are purely navigation commands BEFORE
 * they reach the LLM. Returns a structured intent when the whole message is
 * a navigation phrase; returns null for teaching content.
 *
 * Deliberately conservative: only triggers on unambiguous, navigation-only
 * messages. A sentence like "I finished lesson 5, what's next?" is NOT a
 * navigation command — the LLM should handle it. A bare "next lesson" IS.
 */

export type NavIntentKind =
  | 'next'
  | 'previous'
  | 'restart'
  | 'review'
  | 'resume'
  | 'lesson_n'

export interface NavigationIntent {
  kind: NavIntentKind
  lessonNum?: number
}

// Patterns per language. Each array entry is a regex that matches the FULL
// trimmed message (case-insensitive). Using word boundaries where possible.
const PATTERNS: Array<{ kind: NavIntentKind; re: RegExp }> = [
  // next
  { kind: 'next', re: /^(next(\s+lesson)?|continue(\s+to\s+next)?|go\s+next|start\s+next(\s+lesson)?|следующий(\s+урок)?|следующее|далее|продолжить|agla(\s+lesson)?|agle(\s+lesson)?)$/i },
  // previous / back
  { kind: 'previous', re: /^(prev(ious)?(\s+lesson)?|go\s+back|back(\s+to\s+previous)?|предыд(ущий)?(\s+урок)?|назад|pichla(\s+lesson)?|peeche)$/i },
  // restart
  { kind: 'restart', re: /^(restart(\s+lesson)?|redo(\s+lesson)?|start\s+over|начать\s+заново|начать\s+с\s+начала|заново|dobara\s+shuru|restart\s+karo|phir\s+se)$/i },
  // review / revision
  { kind: 'review', re: /^(review(\s+lesson)?|revision(\s+of)?|повтор(ить)?(\s+урок)?|повторение|revision\s+karo|review\s+karo)$/i },
  // resume
  { kind: 'resume', re: /^(resume(\s+lesson)?|continue(\s+lesson)?|продолжить(\s+урок)?|продолжаем|resume\s+karo|continue\s+karo)$/i },
  // lesson N (digits, any language prefix)
  { kind: 'lesson_n', re: /^(?:(?:go\s+to|open|jump\s+to|switch\s+to|перейти\s+к?|открыть|урок|lesson|topic|перейди\s+к?|lesson\s+pe\s+jao|jao\s+lesson)\s+)?(?:lesson\s+|уроку?\s+|l\.?\s*)?(\d{1,3})(?:\s+(?:lesson|урок|topic))?$/i },
]

/**
 * Returns a NavigationIntent if the entire message is a navigation command,
 * or null if it is teaching content that should go to the LLM.
 */
export function detectNavigationIntent(text: string): NavigationIntent | null {
  const trimmed = text.trim()
  // Short threshold: navigation commands are typically ≤ 5 words.
  // Avoid false positives on actual teaching questions.
  const wordCount = trimmed.split(/\s+/).length
  if (wordCount > 7) return null

  for (const { kind, re } of PATTERNS) {
    const m = trimmed.match(re)
    if (m) {
      if (kind === 'lesson_n') {
        // Extract the lesson number from the last digit group in the match
        const numStr = trimmed.match(/(\d{1,3})/)
        const lessonNum = numStr ? parseInt(numStr[1], 10) : undefined
        return { kind, lessonNum }
      }
      return { kind }
    }
  }
  return null
}
