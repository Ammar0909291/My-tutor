/**
 * FIELD-LINE SIGN CONTRACT — the one thing an electric-field lesson may not
 * get backwards.
 *
 * ── THE DEFECT, captured verbatim in production ─────────────────────────────
 * `phys.em.electric-field`, "Electric Field and Field Lines", real account,
 * 2026-09-06, the FIRST sentence of the lesson:
 *
 *   "Imagine invisible arrows radiating outward from the balloon; those arrows
 *    are the *electric field lines* that show the direction a small NEGATIVE
 *    test charge would move."
 *
 * Field lines give the direction of E, which is the direction of the force on
 * a POSITIVE charge. A negative charge moves the other way. The learner's very
 * first contact with the concept taught them its central misconception.
 *
 * MEASURED across 22 real lesson openings: 1 inversion, 17 correct, 3 that make
 * no sign claim at all (~4.5%). Stochastic — a second opening produced the same
 * paragraph word-for-word with "positive". Both providers observed (groq 18,
 * gemini 2). The AUTHORED content for this concept is correct; this is
 * generated prose, so nothing upstream is wrong to fix.
 *
 * ── WHY A GUARD AND NOT A PROMPT LINE ──────────────────────────────────────
 * This repository has repeatedly measured learner-facing rules stated only in
 * the prompt being ignored (`dontKnowCeiling`'s whole docblock is one such
 * case: the RECOVERY block said "Stop ALL questions this turn" and the model
 * asked anyway). A 4.5% error also cannot be shown fixed by resampling — the
 * sample needed to distinguish 4.5% from 1% is larger than any run here.
 * A deterministic repair does not depend on the rate.
 *
 * ── WHY NOT A PROBE ────────────────────────────────────────────────────────
 * A probe measures whether the LEARNER holds the misconception. It cannot stop
 * the TUTOR from asserting it, and the assertion here lands on the opening
 * turn — before any probe exists in the session. Probe coverage is a good idea
 * on its own merits and is NOT a substitute for this.
 *
 * ── THE CONTRACT ───────────────────────────────────────────────────────────
 *   field lines            point along E
 *   F = qE
 *   positive test charge   force along E              (same direction)
 *   negative test charge   force opposite to E        (reversed)
 *
 * So exactly one shape is false: a FIELD-LINE DIRECTION claim whose direction
 * is attributed to a NEGATIVE charge's motion or force, with no statement that
 * the direction is reversed. Everything else about negative charges is
 * legitimate teaching and must survive untouched — including the two sentences
 * that appear in almost every correct opening:
 *
 *   "Field lines start on positive charges and end on negative charges."
 *      → about where lines BEGIN and END, not which way anything moves.
 *   "A negative test charge experiences a force opposite to the field."
 *      → states the reversal, which is the correct physics.
 *
 * Deterministic, sentence-scoped, concept-scoped. No model call, no I/O.
 */

/** The concepts this contract governs. Field lines are their subject matter. */
const GOVERNED_CONCEPTS: ReadonlySet<string> = new Set([
  'phys.em.electric-field',
])

/** The claim's subject must be the field or its lines — not charges in general. */
const FIELD_SUBJECT = /\b(?:electric\s+)?field\s+lines?\b|\belectric\s+field\b|\bE[-\s]?field\b/i

/** A DIRECTION claim: the sentence says which way something points or goes. */
const DIRECTION_CLAIM = /\b(?:direction|points?|pointing|shows?|showing|indicates?|indicating|represents?|towards?|along)\b/i

/**
 * A negative test charge, as a noun phrase. The polarity word is captured so
 * the repair can act on that word and nothing else in the sentence.
 */
const NEGATIVE_CHARGE =
  /\b(negative(?:ly)?)(\s+(?:charged\s+)?(?:test\s+)?)(charge|particle|ball|object|ion)\b/i

/** Motion or force — what the direction is being attributed to. */
const MOTION_OR_FORCE =
  /\b(?:move|moves|moving|moved|travel|travels|go|goes|pushed?|pulled?|accelerates?|accelerating|force|drift|drifts)\b/i

/**
 * The sentence states that the direction is REVERSED. This is the single
 * exemption, and it is what makes every legitimate negative-charge sentence
 * safe: correct teaching about a negative charge always says the direction
 * flips, because that IS the teaching.
 */
const OPPOSITION =
  /\b(?:opposite|opposed|opposing|against|reverse|reversed|reversing|anti-?parallel|other\s+way|backwards?|contrary)\b/i

/**
 * "start on positive charges and end on negative charges" — a statement about
 * where lines TERMINATE, not about which way a charge moves. It shares every
 * other token with the defect, so it is excluded explicitly rather than left
 * to the absence of a motion verb.
 */
const START_END_CLAIM =
  /\b(?:start|starts|starting|begin|begins|beginning|end|ends|ending|terminate|terminates|originate|originates)\b/i

export interface FieldSignRepair {
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
 * passed through untouched.
 */
function sentencesWithGaps(text: string): string[] {
  return text.split(/(?<=[.!?;])(\s+)/)
}

/**
 * Is this ONE sentence the inverted field-line claim?
 *
 * Exported for the regression suite, which pins the true positives and — more
 * importantly — the false positives that must never fire.
 */
export function isInvertedFieldLineClaim(sentence: string): boolean {
  if (!FIELD_SUBJECT.test(sentence)) return false
  if (!NEGATIVE_CHARGE.test(sentence)) return false
  if (!DIRECTION_CLAIM.test(sentence)) return false
  if (!MOTION_OR_FORCE.test(sentence)) return false
  // The two legitimate shapes.
  if (OPPOSITION.test(sentence)) return false
  if (START_END_CLAIM.test(sentence)) return false
  return true
}

/**
 * Repair generated prose for a governed concept.
 *
 * The repair corrects the POLARITY WORD inside the offending noun phrase and
 * nothing else — the sentence, its teaching and its wording are otherwise
 * preserved, because the sentence is correct in every respect but one word.
 * Blanket "negative → positive" replacement is exactly what this must not do,
 * so the substitution is scoped to the matched charge phrase in the matched
 * sentence.
 *
 * Returns the input unchanged for any concept this contract does not govern,
 * and never throws — a repair must never stop a lesson from opening.
 */
export function repairFieldLineSign(
  text: string,
  conceptId: string | null | undefined,
): FieldSignRepair {
  try {
    if (!text || !conceptId || !GOVERNED_CONCEPTS.has(conceptId)) {
      return { text, repaired: [] }
    }
    const repaired: string[] = []
    const parts = sentencesWithGaps(text)
    const out = parts.map((part, i) => {
      // Odd indices are the captured whitespace separators — never touched.
      if (i % 2 === 1) return part
      if (!isInvertedFieldLineClaim(part)) return part
      repaired.push(part)
      // Replace ONLY the polarity word of the matched charge phrase. Every
      // other word of the sentence — including "test", "small" and the noun
      // itself — is carried through by the captured groups, because the
      // sentence is correct in every respect but this one word.
      return part.replace(NEGATIVE_CHARGE, (_m, polarity: string, middle: string, noun: string) => {
        const cased = polarity[0] === polarity[0].toUpperCase() ? 'Positive' : 'positive'
        const suffix = polarity.toLowerCase().endsWith('ly') ? 'ly' : ''
        return `${cased}${suffix}${middle}${noun}`
      })
    })
    return { text: out.join(''), repaired }
  } catch {
    return { text, repaired: [] }
  }
}
