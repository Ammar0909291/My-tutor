/**
 * LESSON DRIFT GUARD — a reply to "ok" / "next" / "give me an example" must
 * stay on the lesson.
 *
 * Measured (real-learner runs, 2026-10-05):
 *  - CHEM-133, chem.solid.crystal-systems: "ok" → "Metallic bonding is the
 *    attraction that holds metal atoms together in a solid… sea of
 *    electrons…"; "next question please" → "Think of a simple metal spoon…".
 *  - BIO-023, bio.repro.human-reproductive-system: after the words "rhythm
 *    method", "give me example" → "Imagine you're listening to the sentence
 *    'The cat chased the mouse.' In English stress-timed rhythm…".
 *  - CHEM-073, chem.pblock.trends: the lesson opened on SiCl₄ hydrolysis and
 *    never taught the trends it then tested.
 *
 * A continuation message carries no topic of its own, so whatever the reply
 * teaches comes from the model — and these replies did not mention a single
 * thing the lesson is about. The check is deliberately narrow: the reply is
 * off the lesson when it is a real paragraph that names NONE of the concept's
 * anchor words (its title and syllabus line). The route then regenerates once
 * with the lesson stated and keeps the retry only if it is on the lesson.
 * Pure.
 */

/** Words too general to tell one lesson from another. */
const GENERIC = new Set([
  'about', 'basic', 'basics', 'between', 'common', 'concept', 'concepts', 'different', 'example', 'examples',
  'general', 'ideas', 'introduction', 'level', 'model', 'models', 'notation', 'overview', 'practice',
  'principles', 'qualitative', 'quantitative', 'regulation', 'representing', 'simple', 'structure',
  'structures', 'system', 'systems', 'theory', 'their', 'these', 'types', 'using', 'which', 'within',
  'effect', 'effects', 'behaviour', 'behavior', 'character', 'process', 'processes', 'properties',
  'property', 'relationship', 'relationships', 'trend', 'trends', 'first', 'member', 'human', 'seven',
])

/** A comparable stem: lower case, plural dropped, first six letters (cells → cell, lattices → lattic). */
function stem(w: string): string {
  const l = w.toLowerCase()
  return (l.length > 4 ? l.replace(/(?:es|s)$/, '') : l).slice(0, 6)
}

/** The concept's anchor stems from its title and syllabus line. */
export function conceptAnchors(title: string, description: string | null | undefined): string[] {
  const words = `${title} ${description ?? ''}`.match(/[A-Za-z]{4,}/g) ?? []
  const out = new Set<string>()
  for (const raw of words) {
    const w = raw.toLowerCase().replace(/'s$/, '')
    if (w.length < 4 || GENERIC.has(w)) continue
    out.add(stem(w))
  }
  return Array.from(out)
}

/** A continuation message: it carries no topic of its own. */
export function isContinuationMessage(message: string): boolean {
  const t = (message ?? '').trim().toLowerCase().replace(/[.!?]+$/, '')
  if (!t || t.length > 40) return false
  return /^(?:ok(?:ay)?|k|yes|yeah|yep|sure|maybe(?: yes)?|got it|i see|alright|cool|fine|go on|continue|go ahead|next|next (?:one|question|step|part)(?: please)?|more|tell me more|give me (?:an? )?example|another example|example please|and then|then what|what next|what's next)$/.test(t)
}

/** Does the reply name anything the lesson is about? */
export function mentionsConcept(reply: string, anchors: string[]): boolean {
  if (anchors.length === 0) return true
  const words = (reply ?? '').match(/[A-Za-z]{4,}/g) ?? []
  const stems = new Set(words.map((w) => stem(w.replace(/'s$/i, ''))))
  return anchors.some((a) => stems.has(a))
}

/**
 * The reply drifted off the lesson: a continuation message, a reply long
 * enough to be teaching (≥ 25 words), and not one anchor word.
 */
export function isOffLesson(input: {
  learnerMessage: string
  reply: string
  conceptTitle: string | null | undefined
  conceptDescription: string | null | undefined
}): boolean {
  if (!input.conceptTitle || !isContinuationMessage(input.learnerMessage)) return false
  const words = (input.reply ?? '').match(/\S+/g) ?? []
  if (words.length < 25) return false
  return !mentionsConcept(input.reply, conceptAnchors(input.conceptTitle, input.conceptDescription))
}

export function stayOnLessonAppendix(conceptTitle: string, description: string | null | undefined): string {
  return `\n\nSTAY ON THIS LESSON (mandatory): the lesson is "${conceptTitle}"${description ? ` — ${description}` : ''}. `
    + 'The learner only asked you to continue. Teach the next piece of THIS lesson, using its own terms; do not move to '
    + 'another topic, another subject or another meaning of a word you used.'
}

/**
 * CHEM-042 / CHEM-073: "Emulsions and Gels" taught emulsions only and was
 * marked mastered; "Trends Across p-Block" opened on SiCl₄ hydrolysis and
 * tested trends it never taught. The lesson's own syllabus line is put in the
 * prompt with the rule that each part is taught before it is tested and that
 * nothing outside it is promised.
 */
export function lessonScopeRule(conceptTitle: string | null | undefined, description: string | null | undefined): string {
  if (!conceptTitle || !description) return ''
  return `\n\nLESSON SCOPE (mandatory): this lesson is "${conceptTitle}" and covers: ${description} `
    + 'Teach every part of that list, one at a time and in that order, before asking about it; open on the first part; '
    + 'promise only what is on that list, and do not move to topics outside it.'
}
