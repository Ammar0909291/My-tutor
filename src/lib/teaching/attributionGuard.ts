/**
 * THE TUTOR TOLD THE LEARNER WHAT THEY HAD SAID, AND IT WAS NOT TRUE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production, `phys.mech.friction`, 2026-09-01, real account, studied as a
 * learner. Turn one. The learner's ENTIRE message was:
 *
 *   "harder"
 *
 * The reply, in full:
 *
 *   "So you're saying the book is harder to slide when you press it down
 *    BECAUSE THE NORMAL FORCE INCREASES. Is that right?"
 *
 * The learner had not said that, could not have said it, and had in fact
 * never heard the term — one turn later they wrote "i dont really know what
 * normal force means". The tutor supplied the reasoning, attributed it to the
 * learner, and asked them to confirm it.
 *
 * ── WHY THIS IS WORSE THAN AN EMPTY TURN ────────────────────────────────────
 * A learner who says yes has now "demonstrated" an understanding they do not
 * have, and every downstream reader — the SIGNAL, the ladder, the misconception
 * ledger — records it as theirs. It is hollow advancement manufactured by the
 * tutor rather than claimed by the learner, and the product's whole stance is
 * defined against it. It also lands at OBSERVE, the rung whose entire job is to
 * find out what the learner actually thinks.
 *
 * ── WHAT THIS DOES, AND THE ONE THING IT REFUSES TO DO ──────────────────────
 * It removes the unsupported causal clause and nothing else. It never writes a
 * replacement, never rewrites the tutor's sentence, and never touches a turn
 * that attributes nothing. Deleting an invented clause is safe; composing a
 * corrected one would be the same fabrication with better manners.
 *
 * After the strip the reply above becomes:
 *
 *   "So you're saying the book is harder to slide when you press it down.
 *    Is that right?"
 *
 * — still a mirror, still a weak turn, and now at least an honest one. The
 * mirroring itself is a SEMANTIC problem with no deterministic lever (see the
 * note at the end of this file); this closes the falsifiable half.
 *
 * ── SCOPED SO IT CANNOT FIRE ON TEACHING ────────────────────────────────────
 * Three conditions, all required:
 *   1. the sentence opens with an ATTRIBUTION FRAME — the tutor is reporting
 *      the learner's own words back at them, not stating a fact;
 *   2. that sentence carries a trailing causal clause;
 *   3. the clause's CONTENT WORDS are absent from what the learner actually
 *      wrote.
 *
 * A tutor explaining "friction grows because the normal force increases" has
 * no attribution frame and is untouched. A tutor correctly restating a reason
 * the learner DID give is untouched, because condition 3 fails.
 */

/** The tutor reporting the learner's own position back to them. */
const ATTRIBUTION_FRAME_RE =
  /\b(?:so\s+)?(?:you(?:'re| are)\s+saying|you(?:'re| are)\s+thinking|you\s+think|it\s+sounds\s+like\s+you(?:'re| are)\s+saying|if\s+i\s+understand\s+you|what\s+i\s+hear\s+you\s+saying\s+is)\b/i

/**
 * The causal tail. `because` / `since` / `as` are deliberately NOT all
 * included: "as" is a preposition far more often than a conjunction and would
 * eat ordinary clauses. Only unambiguous causal markers.
 */
const CAUSAL_CLAUSE_RE = /[,\s]*\b(because|since|due to the fact that|on the grounds that)\b\s+([^.!?]+)/i

/** Words that carry no evidence of what the learner meant. */
const FUNCTION_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'its',
  'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'and', 'or', 'but', 'not',
  'that', 'this', 'these', 'those', 'there', 'then', 'than', 'so', 'as', 'if',
  'you', 'your', 'i', 'my', 'me', 'we', 'our', 'they', 'their', 'he', 'she',
  'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'can', 'could',
  'more', 'less', 'much', 'very', 'when', 'what', 'how', 'why', 'because',
  'increases', 'decreases', 'increase', 'decrease', 'gets', 'get', 'becomes',
])

const contentWords = (s: string): string[] =>
  s.toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !FUNCTION_WORDS.has(w))

/** Crude stem so "pushing"/"push" and "force"/"forces" count as the same word. */
const stem = (w: string): string => w.replace(/(ing|ed|es|s)$/, '')

export interface AttributionResult {
  text: string
  /** The clause that was removed, for telemetry. Null when nothing changed. */
  removed: string | null
}

/**
 * Strip a causal clause the tutor attributed to the learner but the learner
 * never gave. Returns the text unchanged whenever anything is uncertain.
 */
export function stripFabricatedAttribution(
  tutorText: string,
  learnerMessage: string,
): AttributionResult {
  if (typeof tutorText !== 'string' || typeof learnerMessage !== 'string') {
    return { text: tutorText, removed: null }
  }
  if (!ATTRIBUTION_FRAME_RE.test(tutorText)) return { text: tutorText, removed: null }

  const learnerStems = new Set(contentWords(learnerMessage).map(stem))

  const sentences = tutorText.split(/(?<=[.!?])(\s+)/)
  let removed: string | null = null
  const rebuilt = sentences.map((chunk) => {
    if (removed !== null) return chunk
    if (!ATTRIBUTION_FRAME_RE.test(chunk)) return chunk
    const m = CAUSAL_CLAUSE_RE.exec(chunk)
    if (!m) return chunk

    const claimWords = contentWords(m[2]).map(stem)
    // Too short to judge — a two-word clause could be a fair paraphrase.
    if (claimWords.length < 2) return chunk
    // SUPPORTED if the learner used ANY of the clause's content words. A
    // single shared content word is enough to make this a paraphrase rather
    // than an invention, and the cost of being wrong here is deleting a
    // learner's actual reasoning — much worse than leaving one through.
    if (claimWords.some((w) => learnerStems.has(w))) return chunk

    const stripped = chunk.slice(0, m.index).trimEnd()
    // Never leave a fragment: the sentence must still stand on its own.
    if (contentWords(stripped).length < 2) return chunk
    removed = m[0].trim()
    return /[.!?]$/.test(stripped) ? stripped : `${stripped}.`
  }).join('')

  if (removed === null) return { text: tutorText, removed: null }
  return { text: rebuilt.replace(/\s+\n/g, '\n').trim(), removed }
}

/**
 * NOT SOLVED HERE, and recorded so the next session does not mistake this for
 * a fix to the whole problem.
 *
 * The MIRROR ITSELF — "So you're saying <restatement>. Is that right?" as an
 * entire turn — remains. In the measured session it consumed two of the first
 * three turns, and a learner who had answered correctly with correct reasoning
 * was not told they were right until turn SIX, after demanding a verdict twice.
 *
 * Every deterministic lever examined was lexical and the failure is semantic:
 *   · the anti-repetition ledger is a PROMPT block ("DO NOT REPEAT
 *     (mandatory)") and the model ignored it;
 *   · the re-asked question was a reworded paraphrase, not a string repeat, so
 *     no ledger match would have caught it;
 *   · the filler-turn repair requires the turn to contain no "?" — every mirror
 *     ends in one — and its own history records real damage from over-firing;
 *   · there is no server-side ground truth for a free-response answer, so no
 *     verdict can be synthesised without inventing one.
 *
 * Closing it needs a mechanism this codebase does not have yet, not a wider
 * regex.
 */

// ── THE MIRROR: THE OTHER TAIL OF THE SAME MEASUREMENT ──────────────────────
//
// `stripFabricatedAttribution` above catches an attribution whose reasoning
// the learner NEVER gave — the LOW-overlap tail. This catches the HIGH-overlap
// tail: an attribution made of nothing BUT the learner's own words, ending in
// a request to confirm it, as the entire turn.
//
// ── FOUR VERBATIM INSTANCES, THREE LESSONS, ONE DAY ─────────────────────────
// All 2026-09-01, real account, studied as a learner:
//
//   friction r1 T1   learner: "harder"
//     "So you're saying the book is harder to slide when you press it down
//      because the normal force increases. Is that right?"
//
//   friction r1 T3   learner gave the answer AND the reason
//     "You're thinking the normal force would be smaller when you lift the
//      book because your hand isn't pushing on it anymore. Is that right?"
//
//   friction r3 T4   learner: "like i said, 10 kg times 10 = 100 N…"
//     "So you're saying the normal force is 100 N because the book's weight
//      (10 kg × 10 m/s²) equals 100 N, and on a flat table the normal force
//      balances that weight—did I get that right?"
//
//   damped T1        learner: "it slows down because of air and friction…"
//     "So you're saying the swing slows because of air resistance and
//      friction, and its swings get smaller each time—am I right?"
//
// COST, MEASURED: in friction r1 the learner answered correctly with correct
// reasoning at T3 and was not told they were right until T6, after demanding a
// verdict twice. The turn teaches nothing, asks nothing new, and hands the
// learner back their own sentence to ratify.
//
// ── WHAT THIS DOES, AND THE REPAIR IT DELIBERATELY DOES NOT ATTEMPT ─────────
// It DETECTS and it DIRECTS the next turn. It does not rewrite the mirror,
// because there is nothing honest to rewrite it into: the mirror is the whole
// turn, so stripping it leaves an empty message, and composing a verdict would
// mean inventing one — for a free-response answer the server has no ground
// truth for. Regenerating is not available either: one model call per turn is
// a standing rule (Permanent Rule 9).
//
// So the deterministic half is the NEXT turn, using the same conditional
// one-line directive shape `buildProseMcqReplyDirective` already establishes.
// A prompt lever has been measured ignored in this codebase before, and this
// one is no different in kind — which is why the detector is pure and logged:
// the rate is now measurable, and a future session can act on real numbers
// instead of four transcripts.

/** "Is that right?", "am I right?", "did I get that right?", "correct?" */
const CONFIRMATION_REQUEST_RE =
  /(?:is\s+that\s+(?:right|correct)|am\s+i\s+right|did\s+i\s+(?:get|understand)\s+(?:that|it|you)\s+right|is\s+that\s+what\s+you\s+(?:meant|mean)|have\s+i\s+got\s+that\s+right)\s*\??\s*$/i

/** Words a mirror adds that are not the learner's and not content. */
const MIRROR_FILLER = new Set(['saying', 'thinking', 'think', 'right', 'correct', 'meant', 'mean', 'got'])

export interface MirrorResult {
  isMirror: boolean
  /** Share of the turn's content words that came from the learner. */
  overlap: number
}

/**
 * Is this turn a restatement of the learner's own answer, ending in a request
 * to confirm it, and nothing else?
 *
 * Three conditions, all required — the same restraint as the fabrication half:
 *   1. an ATTRIBUTION FRAME (the tutor reporting the learner's words back);
 *   2. the turn ENDS in a request to confirm;
 *   3. almost every content word is the learner's — nothing new was added.
 *
 * Condition 3 is what separates a mirror from a legitimate paraphrase-then-
 * teach turn: a tutor who restates and then adds something has added content
 * words the learner never used, and the overlap falls.
 */
export function isMirrorTurn(tutorText: string, learnerMessage: string): MirrorResult {
  const miss = { isMirror: false, overlap: 0 }
  if (typeof tutorText !== 'string' || typeof learnerMessage !== 'string') return miss
  const text = tutorText.trim()
  if (!text) return miss
  if (!ATTRIBUTION_FRAME_RE.test(text)) return miss
  if (!CONFIRMATION_REQUEST_RE.test(text)) return miss

  const learnerStems = new Set(contentWords(learnerMessage).map(stem))
  const own = contentWords(text).map(stem).filter((w) => !MIRROR_FILLER.has(w))
  const shared = own.filter((w) => learnerStems.has(w)).length
  const overlap = own.length > 0 ? shared / own.length : 0

  // OVERLAP IS REPORTED, NOT GATED — and measuring is what settled that.
  // Calibrated against the four real mirrors and six controls, the overlap
  // ranged 0.00 to 0.79 ACROSS THE MIRRORS: r1 T1 scores 0.00 because the
  // learner's whole answer was the single word "harder", so every other word
  // in the restatement is necessarily the tutor's. A 0.6 gate rejected half
  // the real instances.
  //
  // The work is done by conditions 1 and 2, and the END ANCHOR on the
  // confirmation request is what carries the specificity: every control that
  // restates and then TEACHES puts the confirm mid-turn, so it never reaches
  // here. Condition 3 is therefore brevity — a turn that restates and then
  // teaches has more to say than two sentences.
  const sentences = text.split(/(?<=[.!?])\s+/).filter((x) => x.trim() !== '')
  if (sentences.length > 2) return { isMirror: false, overlap }
  return { isMirror: true, overlap }
}

/**
 * The one-line directive for the turn AFTER a mirror. Empty when not needed,
 * so it costs nothing on the ordinary path.
 */
export function buildMirrorReplyDirective(active: boolean): string {
  if (!active) return ''
  return (
    '\n\nYOU ALREADY RESTATED THEIR ANSWER. Your previous turn repeated the ' +
    "learner's own words back to them and asked them to confirm it, which they " +
    'have now done. Do NOT restate it again, and do NOT ask them to confirm ' +
    'anything. Say plainly whether the answer is right or wrong, in your first ' +
    'sentence, and then teach the next thing. If you genuinely cannot tell ' +
    'whether it is right, say that instead — but do not ask them to tell you.'
  )
}
