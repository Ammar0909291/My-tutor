/**
 * THE LEARNER ADMISSION BOUNDARY — the last gate before stored content is
 * shown to a student as the tutor's own words.
 *
 * ── THE DEFECT, measured in production ──────────────────────────────────────
 * A learner asked "Give me a harder one to balance" during a lesson on ionic
 * crystals. `provider` was `memory`: Explanation Memory served a stored asset
 * verbatim, the LLM was never called, and the student received:
 *
 *   Trap: "Lattice energy depends primarily on the ATOMIC MASS of the ions
 *   involved — heavier ions should give higher lattice energy." FALSE —
 *   lattice energy depends on CHARGE and DISTANCE… Second trap: …
 *
 * Two independent failures in one turn:
 *
 *   REGISTER   the asset is written for a curriculum AUTHOR, not a student.
 *              "Trap:", "FALSE —", "The #1 mistake:" are authoring notes. A
 *              student reads them as the tutor talking to somebody else.
 *   RELEVANCE  the learner asked about BALANCING EQUATIONS. The asset matched
 *              the LESSON's concept, which is all the matcher scores on, so a
 *              perfectly-scored asset answered a question nobody asked.
 *
 * ── WHY THIS GATE IS AT SERVE TIME, NOT CAPTURE TIME ────────────────────────
 * 1,335 explanation assets are ACTIVE in production today and 184 of them
 * (13.8%, counted directly in the database) carry an author-facing marker.
 * Validating new captures cannot help a single one of those rows. The only
 * boundary that protects a learner from content that is ALREADY stored and
 * ALREADY approved is the one crossed on the way to their screen.
 *
 * ── FAIL CLOSED ─────────────────────────────────────────────────────────────
 * Refusing an asset costs one ordinary LLM turn, which is the path every
 * uncovered concept already takes and which the audit rated as the system's
 * strongest behaviour. Serving a bad one costs a student's trust. So every
 * uncertain case refuses.
 *
 * Pure predicates. No LLM, no I/O, no database.
 */

/** Why an asset was refused. Logged; never shown to a learner. */
export type AdmissionRefusal =
  | { admit: false; reason: 'author-scaffolding'; evidence: string }
  | { admit: false; reason: 'irrelevant-to-question'; evidence: string }
  | { admit: false; reason: 'empty' ; evidence: string }

export type AdmissionResult = { admit: true } | AdmissionRefusal

/**
 * Author-facing constructs. Every pattern here was taken from content that is
 * actually stored in this project's asset tables — none is hypothetical.
 *
 * Each is anchored so it matches a LABEL rather than ordinary prose: a tutor
 * may легitimately say "that is a common trap", and must not be blocked for
 * it. What is blocked is "Trap:" used as a heading, and verdict markup like
 * "FALSE —" that annotates a statement for a reviewer.
 */
const AUTHOR_MARKERS: readonly { name: string; re: RegExp }[] = [
  // "Trap: …", "Second trap: …", "Third trap: …" used as a heading.
  { name: 'trap-label', re: /(^|[\s(])(?:second|third|fourth|another|next)?\s*traps?\s*:/i },
  // Reviewer verdict markup: FALSE — / TRUE — / Wrong — annotating a claim.
  { name: 'verdict-marker', re: /\b(?:FALSE|TRUE|WRONG|INCORRECT|CORRECT)\s*[—–-]\s/ },
  // "The #1 sig-fig mistake:", "The #2 error:" — an author's ranking device.
  { name: 'ranked-mistake', re: /\bthe\s*#\s*\d+\b/i },
  // Explicit answer-key / marking language.
  { name: 'answer-key', re: /\b(?:answer key|mark(?:ing)? scheme|rubric|grading (?:note|criteria|instruction)|distractors?)\b/i },
  // Notes addressed to a human author or reviewer.
  { name: 'author-note', re: /\b(?:author'?s? note|note to (?:the )?author|editor'?s? note|reviewer note|internal note|TODO|FIXME)\b/i },
  // Bracketed authoring labels: [correct], (correct answer), [misconception].
  { name: 'authoring-label', re: /[[(]\s*(?:correct(?: answer)?|incorrect|misconception|distractor|key)\s*[\])]/i },
]

/**
 * Does this text address a curriculum author rather than a learner?
 * Returns the offending fragment so the refusal is auditable.
 */
export function findAuthorScaffolding(text: string): string | null {
  const content = text ?? ''
  for (const marker of AUTHOR_MARKERS) {
    const m = marker.re.exec(content)
    if (m) {
      const at = Math.max(0, m.index - 20)
      return `${marker.name}: …${content.slice(at, m.index + m[0].length + 40).trim()}…`
    }
  }
  return null
}

// ── relevance ────────────────────────────────────────────────────────────────

const STOP = new Set([
  'what', 'whats', 'why', 'how', 'when', 'where', 'which', 'who', 'does', 'did', 'can',
  'could', 'would', 'should', 'this', 'that', 'these', 'those', 'there', 'here', 'about',
  'with', 'from', 'into', 'your', 'you', 'the', 'and', 'for', 'are', 'was', 'were', 'have',
  'has', 'had', 'not', 'but', 'its', 'his', 'her', 'them', 'they', 'give', 'me', 'a', 'an',
  'please', 'tell', 'show', 'explain', 'one', 'more', 'harder', 'another', 'again', 'some',
  'do', 'is', 'it', 'of', 'to', 'in', 'on', 'my', 'i',
  // DISCOURSE, not topic. A learner steering the conversation — "next",
  // "carry on", "yes ok" — has named nothing, and treating these as a topic
  // made an ordinary continuation look like a contradiction of the asset.
  // This is a closed list of conversation-management words, deliberately not
  // a list of subject keywords: no entry here is a thing anyone teaches.
  'next', 'okay', 'yes', 'yeah', 'yep', 'nope', 'sure', 'thanks', 'thank',
  'continue', 'carry', 'done', 'ready', 'right', 'well', 'hmm', 'wait',
  'understand', 'understood', 'know', 'think', 'mean', 'said', 'say', 'get',
  'got', 'lost', 'confused', 'sorry', 'help', 'question', 'answer', 'example',
])

function contentWords(text: string): Set<string> {
  const out = new Set<string>()
  for (const raw of (text ?? '').toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/)) {
    if (raw.length < 4 || STOP.has(raw)) continue
    out.add(raw.endsWith('s') && raw.length > 4 ? raw.slice(0, -1) : raw)
  }
  return out
}

/**
 * IS THIS ASSET ABOUT WHAT THE LEARNER JUST ASKED?
 *
 * The matcher scores concept, language and grade band — all properties of the
 * LESSON. None of them can notice that "Give me a harder one to balance" and a
 * lattice-energy misconception note are about different things.
 *
 * The test is deliberately asymmetric, because the two errors are not equal:
 *
 *   • A learner turn that names nothing specific — "ok", "go on", "I don't
 *     understand", "give me another one" — carries no topic to contradict, so
 *     it CANNOT fail this test. Continuing the lesson is exactly right there,
 *     and the stored asset is the lesson's.
 *   • A learner turn that DOES name something specific must find at least one
 *     of those words in the asset. One word is enough: the bar is low because
 *     a false refusal costs only an ordinary LLM turn.
 */
export function isRelevantToLearnerQuestion(content: string, userMessage: string): boolean {
  const asked = contentWords(userMessage)
  if (asked.size === 0) return true          // nothing named — cannot disagree
  const said = contentWords(content)
  if (said.size === 0) return false
  for (const word of asked) if (said.has(word)) return true
  return false
}

/**
 * The single question every stored asset must answer before a learner sees it:
 * may this be spoken to this student, on this turn, as the tutor's own words?
 */
export function admitForLearner(input: { content: string; userMessage: string }): AdmissionResult {
  const content = (input.content ?? '').trim()
  if (!content) return { admit: false, reason: 'empty', evidence: 'no content' }

  const scaffolding = findAuthorScaffolding(content)
  if (scaffolding) return { admit: false, reason: 'author-scaffolding', evidence: scaffolding }

  if (!isRelevantToLearnerQuestion(content, input.userMessage ?? '')) {
    return {
      admit: false,
      reason: 'irrelevant-to-question',
      evidence: `asked ${JSON.stringify((input.userMessage ?? '').slice(0, 60))}, asset shares no topic word`,
    }
  }
  return { admit: true }
}
