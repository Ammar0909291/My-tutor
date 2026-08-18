/**
 * ONE ASSESSMENT TURN = ONE CANONICAL QUESTION.
 *
 * ── THE OBSERVED DEFECT (end-user smoke test, phys.mech.velocity) ───────────
 * A learner was shown, in a single turn, a question in the tutor's prose:
 *
 *     "A car drives 60 km east then 60 km west — what is the average
 *      velocity?"   A) 60 km/h  B) 0 km/h  C) 120 km/h  D) 30 km/h
 *
 * while the tappable buttons beneath it asked something else entirely:
 *
 *     "60 km/h vs 60 km/h northbound — which is a speed and which a velocity?"
 *                                                        A) …  B) …
 *
 * Whatever they tapped would have been graded against a question they never
 * read. When they said so, the tutor answered "please answer the question on
 * your screen about the car driving east and west, options A, B, C and D" —
 * while the screen had by then moved to a THIRD probe, about a swimmer.
 *
 * ── WHY THE PROMPT COULD NOT FIX THIS ───────────────────────────────────────
 * `buildGateAssessmentBlock` already states the contract in the strongest terms
 * available to a prompt: "do NOT restate the question, do NOT list the options,
 * do NOT ask any other question, and do NOT emit an MCQ tag of your own." The
 * model was given the canonical question and wrote its own anyway. A prompt
 * instruction is advisory; this is the same lesson `buildLessonCloseText`
 * records in its own header, and the same reason the mastery gate stopped
 * asking the model to produce answer keys.
 *
 * So the runtime enforces it instead, exactly where the close already does:
 * the outgoing text is replaced when — and only when — the model has demonstrably
 * broken the contract.
 *
 * Detection is deliberately narrow. It fires on an ENUMERATED OPTION LIST,
 * which is the specific artefact that makes a turn unanswerable: two competing
 * sets of choices in front of one learner. Prose that merely leads into the
 * question is untouched, because that is what the model is supposed to write.
 */

/**
 * An enumerated multiple-choice list in the model's own prose — `A) …` / `A. …`
 * / `(A) …`, two or more consecutive letters starting from A or a.
 *
 * Requires at least TWO distinct leading letters so ordinary prose ("A. Einstein
 * said…", a single lettered aside, or a numbered list) cannot trip it, and
 * anchors each to its own line so an inline "(a) thing" mid-sentence is ignored.
 */
export function containsOptionList(text: string): boolean {
  const withoutCode = text.replace(/```[\s\S]*?```/g, '')
  const letters = new Set<string>()
  for (const m of withoutCode.matchAll(/^\s*\(?([A-Da-d])[).]\s+\S/gm)) {
    letters.add(m[1].toUpperCase())
  }
  // A and B are the minimum a real option list can have; requiring A specifically
  // avoids matching a stray "C) " in an unrelated enumeration.
  return letters.has('A') && letters.has('B')
}

export interface GateContractInput {
  /** The model's outgoing text, already stripped of tags. */
  text: string
  /** The deterministic lead-in for this probe, or null if the renderer refused. */
  leadIn: string | null
  /** The canonical question the learner will actually be graded on. */
  canonicalQuestion: string
}

export interface GateContractResult {
  text: string
  replaced: boolean
  reason: 'ok' | 'model_wrote_own_options'
}

/**
 * The last-resort lead-in, used only when the model broke the contract AND the
 * deterministic renderer had refused this turn (a non-English lesson, a figure
 * on screen, or an answer still owed a reaction).
 *
 * Deliberately content-free: it introduces the question without claiming
 * anything about the learner, the concept, or their progress. It is a repair
 * for a broken turn, not a teaching asset.
 */
const FALLBACK_LEAD_IN = 'Here is your next question.'

/**
 * Enforce the one-question contract. Returns the text unchanged unless the model
 * put its own option list on a turn that already carries a canonical probe.
 *
 * NEVER touches the probe, the options, the correct index or the grade — it
 * only decides which SENTENCE sits above a question the server already chose.
 */
export function enforceGateProbeContract(input: GateContractInput): GateContractResult {
  try {
    const lines = input.text.split('\n')
    const firstOptionLine = lines.findIndex((l) => /^\s*\(?[A-Da-d][).]\s+\S/.test(l))
    if (!containsOptionList(input.text) || firstOptionLine < 0) {
      return { text: input.text, replaced: false, reason: 'ok' }
    }

    // KEEP THE REACTION. A learner who has just answered is owed feedback on
    // THAT answer, and the first version of this repair threw it away: a
    // correct answer came back as the bare fallback lead-in with no
    // acknowledgement at all, which is a worse turn than the one it fixed.
    //
    // So the option list and everything after it is dropped, and the prose
    // ABOVE it is kept — that is where the reaction lives. Only the trailing
    // sentence of that prose is removed, and only when it is a question the
    // canonical probe did not ask, because that is the competing question.
    const head = lines.slice(0, firstOptionLine).join('\n').trim()
    const kept = dropCompetingQuestion(head, input.canonicalQuestion)

    if (kept.length > 0) {
      return { text: kept, replaced: true, reason: 'model_wrote_own_options' }
    }
    // Nothing survived — the whole turn WAS the competing assessment.
    const replacement = (input.leadIn ?? '').trim() || FALLBACK_LEAD_IN
    return { text: replacement, replaced: true, reason: 'model_wrote_own_options' }
  } catch {
    // A repair must never break a turn. Unchanged text is the safe outcome.
    return { text: input.text, replaced: false, reason: 'ok' }
  }
}

const wordsOf = (s: string) =>
  new Set(s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w.length > 3))

/**
 * Remove a trailing question sentence when it is NOT the canonical probe's own
 * question.
 *
 * The model legitimately restates the question it was given (observed in
 * production: a learner asked for a reminder and the tutor helpfully repeated
 * the same question and options). That is duplication, not contradiction, and
 * the reaction around it must survive. A DIFFERENT question is the actual
 * defect, and it is what gets cut.
 *
 * Overlap rather than equality, because the model paraphrases; the threshold is
 * deliberately low, since the cost of keeping a restatement is a repeated
 * sentence while the cost of keeping a competing question is a learner who
 * cannot tell what to answer.
 */
function dropCompetingQuestion(head: string, canonicalQuestion: string): string {
  if (!head.endsWith('?')) return head
  const cut = Math.max(head.lastIndexOf('. '), head.lastIndexOf('\n'))
  const tail = (cut >= 0 ? head.slice(cut + 1) : head).trim()
  if (!tail.endsWith('?')) return head

  const canon = wordsOf(canonicalQuestion)
  const asked = wordsOf(tail)
  if (canon.size === 0 || asked.size === 0) return cut >= 0 ? head.slice(0, cut + 1).trim() : ''
  let shared = 0
  for (const w of asked) if (canon.has(w)) shared++
  const overlap = shared / asked.size
  if (overlap >= 0.4) return head // a restatement of the canonical question

  // A competing question is cut back to its PARAGRAPH boundary, not just its
  // final sentence. Dropping only the last sentence left "A car drives 60 km
  // east in 1 hour." stranded in front of a probe about something else — half
  // a competing question is still a competing question.
  const para = head.lastIndexOf('\n\n')
  return para >= 0 ? head.slice(0, para).trim() : ''
}

/**
 * Authoring labels that must never reach a learner.
 *
 * These live in the AUTHORED STEMS themselves (`authoredSeedAssets.ts` carries
 * `stem: 'DIAGNOSTIC: A car travels at 60 km/h…'`), so a learner met
 * "DIAGNOSTIC:" and "FORMATIVE:" as the first word of their practice question.
 *
 * Stripped at presentation rather than rewritten in the corpus: the label is
 * real authoring metadata and the assets are reviewed content. Removing it here
 * changes nothing about which probe is selected, how it is graded, or what is
 * stored — only what is rendered.
 */
const AUTHORING_LABELS = /^\s*(DIAGNOSTIC|FORMATIVE|SUMMATIVE|CHECKPOINT|PROBE|MISCONCEPTION[- ]PROBE)\s*:\s*/i

/** Remove a leading authoring label from a learner-facing stem. Idempotent. */
export function stripAuthoringLabel(stem: string): string {
  let out = stem
  // Loop so a doubly-labelled stem ("DIAGNOSTIC: PROBE: …") is fully cleaned,
  // bounded so a pathological input cannot spin.
  for (let i = 0; i < 3 && AUTHORING_LABELS.test(out); i++) {
    out = out.replace(AUTHORING_LABELS, '')
  }
  return out.trim() || stem.trim()
}
