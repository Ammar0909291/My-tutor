/**
 * THE LEARNER NAMED THE SHAPE OF HELP — DID THE REPLY HAVE THAT SHAPE?
 *
 * CHEM-001 (2026-10-05, 101 occurrences in 89 chemistry lessons): "too many
 * words" was answered with a quiz card, or with a LONGER reply than the one
 * complained about — never a shorter one.
 * CHEM-015: "give me example with numbers" got an analogy with no number in
 * it; "show me step by step" got three plain sentences, or a Socratic question.
 *
 * The prompt already asks for all three. What was missing is a check on the
 * reply, so this is one: a reply that does not have the asked-for shape is
 * either trimmed (shorter — deterministic, no model call) or regenerated once
 * with the shape stated (numbers, steps — the caller does the one call and
 * keeps the original when the retry does not comply either).
 */

export type AdaptationKind = 'shorter' | 'numbers' | 'steps'

const SHORTER_RE = /\b(?:too\s+(?:many|much)\s+(?:words?|text|writing|reading)|^\s*(?:it'?s\s+|its\s+|this\s+is\s+|that'?s\s+)?(?:way\s+)?too\s+long\b|(?:less|fewer)\s+(?:words?|text)|(?:make|keep)\s+it\s+short(?:er)?|(?:shorter|short)\s+(?:please|pls|plz|answer|version|one)|^\s*shorter\s*[.!]*\s*$|tl;?dr)\b/i
const NUMBERS_RE = /\b(?:with|use|using|in|put)\s+(?:some\s+|the\s+|real\s+)?numbers?\b|\bnumbers?\s+(?:example|please|pls)\b|\bnumerical\s+example\b/i
const STEPS_RE = /\bstep[\s-]+by[\s-]+step\b|\bshow\s+(?:me\s+)?(?:the\s+|all\s+the\s+)?steps\b|\bone\s+step\s+at\s+a\s+time\b|\bin\s+steps\b/i

export function adaptationKind(message: string): AdaptationKind | null {
  const m = typeof message === 'string' ? message : ''
  if (!m.trim()) return null
  if (SHORTER_RE.test(m)) return 'shorter'
  if (STEPS_RE.test(m)) return 'steps'
  if (NUMBERS_RE.test(m)) return 'numbers'
  return null
}

const words = (s: string) => (s.match(/\S+/g) ?? []).length

/** At most 60 words, and at most 60 % of the reply being complained about. */
export function shorterBudget(previousReply: string | null): number {
  const prev = previousReply ? words(previousReply) : 0
  return Math.max(25, Math.min(60, prev > 0 ? Math.floor(prev * 0.6) : 60))
}

/** Whole sentences, in order, up to the budget — always at least the first. */
export function trimToWordBudget(text: string, budget: number): string {
  const sentences = text.replace(/\s+/g, ' ').trim().match(/(?:[^.!?]|[.!?](?=\S))+(?:[.!?]+|$)/g) ?? [text]
  const kept: string[] = []
  let n = 0
  for (const s of sentences) {
    const w = words(s)
    if (kept.length > 0 && n + w > budget) break
    kept.push(s.trim())
    n += w
  }
  return kept.join(' ')
}

const STEP_LINE_RE = /^\s*(?:(?:step\s*)?\d+\s*[.):—-]|step\s+(?:one|two|three|four|five)\b|[-•*]\s+\S)/gim

export function honoursAdaptation(kind: AdaptationKind, reply: string, previousReply: string | null): boolean {
  const t = reply ?? ''
  if (kind === 'shorter') return words(t) <= shorterBudget(previousReply)
  if (kind === 'numbers') return (t.match(/\d+(?:[.,]\d+)?/g) ?? []).length >= 2
  return (t.match(STEP_LINE_RE) ?? []).length >= 2
}

/** What the one regeneration is told — the asked-for shape, nothing else. */
export function adaptationAppendix(kind: Exclude<AdaptationKind, 'shorter'>): string {
  return kind === 'numbers'
    ? '\n\nTHE LEARNER ASKED FOR AN EXAMPLE WITH NUMBERS. Give ONE short worked example on this lesson\'s idea using real numbers: '
      + 'state the given values with units, do the arithmetic, and state the numerical result. No analogy, no story, and do not ask a question.'
    : '\n\nTHE LEARNER ASKED FOR IT STEP BY STEP. Write the explanation as numbered steps, one per line ("1. …", "2. …", "3. …"), '
      + 'each one short sentence. Do not ask a question and do not refer to an answer the learner has not given.'
}
