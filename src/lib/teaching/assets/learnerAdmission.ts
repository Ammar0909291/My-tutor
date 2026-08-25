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
import { DISCOURSE_NOUNS, isMediumWord } from '../visual/requestedTopic'
import { asksForPractice } from '../masteryGate'


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
  const asked = namedTopicWords(userMessage)
  if (asked.size === 0) return true          // nothing named — cannot disagree
  const said = contentWords(content)
  if (said.size === 0) return false
  for (const word of asked) if (said.has(word)) return true
  return false
}

/**
 * The words in a learner message that actually NAME something, as opposed to
 * naming the shape of the request.
 *
 * PHASE 7K TRACK G. "give me a practice problem" survived `contentWords`
 * with {give, practice, problem}, so this rule compared an authored
 * explanation of total internal reflection against the word "practice",
 * found no overlap, and refused it. Measured in production:
 *
 *   [explanationMemory] refused 3e1a39b6… irrelevant-to-question —
 *     asked "give me a practice problem", asset shares no topic word
 *   [explanationMemory] refused ab503978… (same)
 *
 * EVERY authored asset for the concept was refused, on the one turn the
 * learner explicitly asked to work on it, and the turn fell through to an
 * ungoverned model answer. The relevance test is sound; its input was wrong.
 * A meta-request names no topic, so it belongs in the `size === 0` branch
 * that already exists directly above — "nothing named, cannot disagree".
 *
 * Deliberately reuses `DISCOURSE_NOUNS` and `isMediumWord` rather than
 * declaring a second list. Phase 7D added 'practice' and 'check' to that set
 * to stop the SAME phrase being read as a topic name by the excursion path;
 * two vocabularies for one idea is how those paths would drift apart, and one
 * of them would be fixed alone again.
 */
function namedTopicWords(userMessage: string): Set<string> {
  const words = contentWords(userMessage)
  const named = new Set<string>()
  for (const w of words) {
    if (DISCOURSE_NOUNS.has(w) || isMediumWord(w)) continue
    named.add(w)
  }
  return named
}

/**
 * IS THIS MARKER A LABEL, OR IS IT ORDINARY TEACHING PROSE?
 *
 * `findAuthorScaffolding` above answers "does this text contain a marker
 * SHAPE". That is the right question for a capture-time linter and it is
 * deliberately left unchanged. It is the wrong question for the serve-time
 * boundary, because two of the shapes occur constantly in correct
 * learner-facing prose, and refusing those assets is itself a learner harm:
 * the refused content is never replaced, it is simply lost, and the concept
 * falls back to an ungoverned model turn.
 *
 * Measured directly against the stored corpora (chemistry + authored
 * math/physics/english), 2026-08-14:
 *
 *   verdict-marker   171 occurrences, 164 of them immediately after a CLOSING
 *                    QUOTE — the "quote the misconception, then correct it"
 *                    sentence that is the whole point of a repair
 *                    explanation: «"Breaking bonds releases energy." WRONG —
 *                    breaking bonds ALWAYS requires energy.» The remaining 7
 *                    are prose too («…makes the claim TRUE — here x = 2»).
 *                    ZERO were reviewer annotations. A rule whose real-corpus
 *                    false-positive rate is 100% is not protecting anyone.
 *   trap-label       383 occurrences, 140 at the start of a line — a genuine
 *                    "Trap:" heading, exactly the register this boundary was
 *                    built to stop. The other 243 are a teacher enumerating
 *                    pitfalls mid-paragraph («Another trap: confusing molar
 *                    mass of an ATOM with molar mass of a COMPOUND»), which
 *                    this module's own header already promises not to block:
 *                    "a tutor may legitimately say 'that is a common trap',
 *                    and must not be blocked for it."
 *
 * So the marker's POSITION decides. A label sits at the start of a line
 * (optionally behind a bullet or list number); prose does not. The other five
 * markers are unconditional — an answer key, a TODO or a bracketed
 * [correct] label is author-facing wherever it appears — so they are not
 * position-tested at all, and nothing about them changes.
 *
 * This is narrower than the shape test, not broader: every asset it still
 * refuses was refused before. It cannot admit anything the five unconditional
 * markers catch, and it cannot admit a "Trap:" heading.
 */
const POSITION_SENSITIVE = new Set(['trap-label', 'verdict-marker'])

/** Is the offset at the start of a line, allowing a bullet or list number? */
function atLineStart(content: string, index: number): boolean {
  return /(?:^|\n)[ \t]*(?:[-*>#]+[ \t]*|\d+[.)][ \t]*)?$/.test(content.slice(0, index))
}

/**
 * The author-facing scaffolding a LEARNER must never be shown — the shape
 * test above, narrowed by position for the two markers that also occur in
 * ordinary prose. Returns the offending fragment so the refusal is auditable.
 */
export function findLearnerFacingScaffolding(text: string): string | null {
  const content = text ?? ''
  for (const marker of AUTHOR_MARKERS) {
    const re = new RegExp(marker.re.source, marker.re.flags.includes('g') ? marker.re.flags : marker.re.flags + 'g')
    for (const m of content.matchAll(re)) {
      // Skip the leading-boundary capture group so the offset points at the
      // marker word itself, not at the whitespace in front of it.
      const at = m.index + (m[1] ? m[1].length : 0)
      if (POSITION_SENSITIVE.has(marker.name) && !atLineStart(content, at)) continue
      const from = Math.max(0, at - 20)
      return `${marker.name}: ${from > 0 ? '…' : ''}${content.slice(from, at + 40)}`
    }
  }
  return null
}

/**
 * The single question every stored asset must answer before a learner sees it:
 * may this be spoken to this student, on this turn, as the tutor's own words?
 */
export function admitForLearner(input: { content: string; userMessage: string }): AdmissionResult {
  const content = (input.content ?? '').trim()
  if (!content) return { admit: false, reason: 'empty', evidence: 'no content' }

  const scaffolding = findLearnerFacingScaffolding(content)
  if (scaffolding) return { admit: false, reason: 'author-scaffolding', evidence: scaffolding }

  // PHASE 7K TRACK G: an explicit request to be ASKED names no topic by
  // construction, so "is this asset relevant to the words in the message" is
  // the wrong question for it — the relevant context is the lesson already
  // under way. Reuses Phase 7H's `asksForPractice`, the signal the runtime
  // already computes once per turn (turnIntent.wantsPractice), rather than
  // declaring a second vocabulary for the same idea.
  //
  // This does NOT admit foreign topics: a request that also names a real
  // subject ("give me a practice problem about photosynthesis") still carries
  // that word through the relevance test below, and excursion handling still
  // owns genuine topic changes.
  const isPracticeRequest = asksForPractice(input.userMessage ?? '')

  if (!isPracticeRequest && !isRelevantToLearnerQuestion(content, input.userMessage ?? '')) {
    return {
      admit: false,
      reason: 'irrelevant-to-question',
      evidence: `asked ${JSON.stringify((input.userMessage ?? '').slice(0, 60))}, asset shares no topic word`,
    }
  }
  return { admit: true }
}
