/**
 * VISION DIRECTION CONTRACT — light travels INTO the eye, never out of it.
 *
 * ── THE DEFECT, captured verbatim in production, TWICE ──────────────────────
 * `phys.opt.reflection`, "Reflection and Laws of Reflection", real account,
 * 2026-09-07, both times in the FIRST paragraph of the lesson:
 *
 *   run 1: "you can see your face because the light that leaves your eyes hits
 *           the smooth glass and bounces right back toward you"
 *   run 2: "you see your own face because light from your eyes hits the mirror
 *           and is sent straight back toward you"
 *
 * This is the EMISSION THEORY OF VISION — the belief that the eye emits
 * something to see with. It is one of the most-documented misconceptions in
 * physics education, and the tutor did not merely fail to correct it: it taught
 * it, as the explanation, in the learner's first contact with the concept.
 *
 * MEASURED: 2 of 2 openings, different wording each time, provider groq both
 * times. Not a one-off — the mirror-and-your-face anchor is the natural opening
 * for reflection, and it is exactly the context in which emission theory
 * surfaces. The AUTHORED content for this concept is correct (its
 * `core_explanation` teaches ∠i = ∠r from the normal and says nothing about
 * eyes emitting light), so this is generated prose and nothing upstream is
 * wrong to fix.
 *
 * ── WHY A GUARD AND NOT A PROMPT LINE, AND NOT AN AUTHORED ASSET ───────────
 * The same reasoning `fieldLineSignGuard` sets out, plus one fact specific to
 * this turn: the opening is served by `/api/learn/lesson-init`, whose system
 * prompt is built by `buildTutorSystemPrompt` — which injects no misconception
 * data at all. An authored misconception therefore cannot reach the sentence
 * that carries the defect. It is still worth authoring (see the corpus entry
 * added alongside this file) because it is the durable representation the
 * teaching layer will consume wherever misconceptions ARE read; it is simply
 * not what stops this sentence today.
 *
 * ── THE CONTRACT ───────────────────────────────────────────────────────────
 *   a light source illuminates the face
 *   light REFLECTS OFF the face and travels to the mirror
 *   the mirror reflects it INTO the eye
 *
 * So exactly one shape is false: light described as ORIGINATING AT THE EYE.
 * Light arriving AT the eye is the correct physics and the whole point of the
 * lesson, so every "reaches your eyes" / "into your eyes" / "back to your eyes"
 * sentence must survive untouched — which is why the source preposition, not
 * the word "eyes", is what this matches on.
 *
 * Deterministic, sentence-scoped, concept-scoped. No model call, no I/O.
 */

/** The concepts this contract governs. A mirror-and-your-face opening is their
 *  natural anchor, which is what makes them the reachable surface. */
const GOVERNED_CONCEPTS: ReadonlySet<string> = new Set([
  'phys.opt.reflection',
])

/** The thing whose direction is being claimed. */
const LIGHT_SUBJECT = /\b(?:light|lights|beam|beams|ray|rays|photons?)\b/i

/**
 * Light given the EYE as its SOURCE. The eye-word is captured so the repair can
 * act on that word and nothing else in the sentence.
 *
 * Matching on the SOURCE PHRASE — a source preposition or emission verb
 * immediately governing the eyes — is what makes every legitimate sentence
 * safe. "reaches your eyes", "into your eyes", "enters your eyes" and "back to
 * your eyes" all put the eye in the DESTINATION role and cannot match.
 */
const LIGHT_FROM_EYES =
  /\b(?:leaves?|leaving|left|exits?|exiting|escapes?|from|out\s+of|emitted\s+(?:by|from)|emerges?\s+from|emerging\s+from|travels?\s+from|travelling\s+from|traveling\s+from|comes?\s+from|coming\s+from|sent\s+(?:out\s+)?(?:by|from)|shines?\s+(?:out\s+)?(?:from|of)|projected\s+(?:by|from))\s+(?:(?:your|our|the|his|her|their|my)\s+)?(eyes?|eyeballs?)\b/i

/**
 * The sentence is TALKING ABOUT the misconception rather than asserting it.
 *
 * Naming a misconception is how it gets repaired — the authored
 * `misconception_repair` asset for this concept quotes the learner's own words
 * ("the light from my eyes hits the glass") in order to refute them, and the
 * blueprint's MC entries do the same in their conflict_evidence. Without this
 * exemption the repair would rewrite the quotation into a non-misconception and
 * destroy the teaching, which is the one way this guard could make a lesson
 * WORSE. Same role as fieldLineSignGuard's OPPOSITION and START_END_CLAIM
 * exemptions: the legitimate shapes that share every other token with the
 * defect.
 */
const REFUTATION_CONTEXT =
  /\bemission\s+theor(?:y|ies)\b|\bmisconception\b|\bmyth\b|\b(?:feels?|seems?)\s+natural\s+to\s+(?:say|think|assume)\b|\bwrongly\b|\bincorrectly\b|\bnot\s+what\s+(?:actually\s+)?happens\b|\bnothing\s+leaves\s+the\s+eye\b|\bcommon(?:ly)?\s+(?:but\s+)?(?:wrong|false|mistaken)\b/i

export interface VisionDirectionRepair {
  text: string
  /** Sentences that were repaired, before the repair. Empty when none. */
  repaired: string[]
}

/**
 * Split into sentences AND the whitespace between them.
 *
 * The capturing group matters: this text is markdown that reaches the learner,
 * and rejoining on a single space would collapse every blank line and list
 * break in the lesson opening. Odd indices are the original separators and are
 * passed through untouched. Same splitter as fieldLineSignGuard, for the same
 * reason.
 */
function sentencesWithGaps(text: string): string[] {
  return text.split(/(?<=[.!?;])(\s+)/)
}

/**
 * Is this ONE sentence an emission-theory claim?
 *
 * Exported for the regression suite, which pins the true positives and — more
 * importantly — the false positives that must never fire.
 */
export function isEmissionTheoryClaim(sentence: string): boolean {
  if (!LIGHT_SUBJECT.test(sentence)) return false
  if (!LIGHT_FROM_EYES.test(sentence)) return false
  // The one legitimate shape: the sentence is naming the misconception in order
  // to refute it, not asserting it.
  if (REFUTATION_CONTEXT.test(sentence)) return false
  return true
}

/**
 * Repair generated prose for a governed concept.
 *
 * The repair moves the light's SOURCE from the eye to the face and changes
 * nothing else. That single word is the whole defect: "the light that leaves
 * your face hits the mirror and bounces back toward you" is TRUE — light really
 * does leave your face, having reflected off it — and it teaches the correct
 * chain while keeping the sentence, the mirror example and the wording the
 * model chose. A blanket rewrite of the sentence would be inventing pedagogy;
 * this is the same word-scoped substitution fieldLineSignGuard makes on the
 * polarity word.
 *
 * Returns the input unchanged for any concept this contract does not govern,
 * and never throws — a repair must never stop a lesson from opening.
 */
export function repairVisionDirection(
  text: string,
  conceptId: string | null | undefined,
): VisionDirectionRepair {
  try {
    if (!text || !conceptId || !GOVERNED_CONCEPTS.has(conceptId)) {
      return { text, repaired: [] }
    }
    const repaired: string[] = []
    const parts = sentencesWithGaps(text)
    const out = parts.map((part, i) => {
      // Odd indices are the captured whitespace separators — never touched.
      if (i % 2 === 1) return part
      if (!isEmissionTheoryClaim(part)) return part
      repaired.push(part)
      // Replace ONLY the eye-word inside the matched source phrase. The verb,
      // the possessive and every other word of the sentence are carried through
      // untouched, because the sentence is correct in every respect but this
      // one noun.
      return part.replace(LIGHT_FROM_EYES, (m, eyeWord: string) => {
        const replacement = eyeWord[0] === eyeWord[0].toUpperCase() ? 'Face' : 'face'
        return m.slice(0, m.length - eyeWord.length) + replacement
      })
    })
    return { text: out.join(''), repaired }
  } catch {
    return { text, repaired: [] }
  }
}
