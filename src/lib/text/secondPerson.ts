/**
 * FEEDBACK IS SAID TO THE LEARNER, NOT ABOUT THEM.
 *
 * BIO-015 (2026-10-05, biology real-learner run): "That's right. The learner
 * correctly recognized that risk preference is not a fixed trait…" (#181),
 * "The student's claim is inaccurate…" (#1). The prompt describes the learner
 * in the third person and the model sometimes keeps that voice in the reply.
 *
 * Only a sentence that STARTS with "The learner"/"The student" (the subject of
 * the sentence) is rewritten, with the verb agreed: "The learner is" -> "You
 * are", "The student's claim" -> "Your claim". Any other mention is left.
 */

const IRREGULAR: Record<string, string> = { is: 'are', was: 'were', has: 'have', does: 'do', "isn't": "aren't", "wasn't": "weren't", "hasn't": "haven't", "doesn't": "don't" }

function agree(verb: string): string {
  const v = verb.toLowerCase()
  if (IRREGULAR[v]) return IRREGULAR[v]
  // A past tense, a modal or an adverb needs nothing.
  if (/ed$|^(?:chose|picked|said|thought|got|made|saw|knew|took|gave|can|could|will|would|should|may|might|must|correctly|incorrectly|rightly|clearly|already|also|just|still)$/.test(v)) return verb
  if (/(?:ss|sh|ch|x|z|o)es$/.test(v)) return verb.slice(0, -2)
  if (/ies$/.test(v)) return verb.slice(0, -3) + 'y'
  if (/[^s]s$/.test(v)) return verb.slice(0, -1)
  return verb
}

const START = /(^|[.!?]["”’]?\s+|\n\s*)(The|the)\s+(?:learner|student)(['’]s|\s+([A-Za-z']+))/g

export function toSecondPerson(text: string): string {
  if (typeof text !== 'string' || !/\b(?:learner|student)\b/i.test(text)) return text
  return text.replace(START, (m, lead: string, _the: string, tail: string, verb: string | undefined) => {
    if (/^['’]s$/.test(tail)) return `${lead}Your`
    return `${lead}You ${agree(verb ?? '')}`
  })
}
