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
    if (!containsOptionList(input.text)) {
      return { text: input.text, replaced: false, reason: 'ok' }
    }
    const replacement = (input.leadIn ?? '').trim() || FALLBACK_LEAD_IN
    return { text: replacement, replaced: true, reason: 'model_wrote_own_options' }
  } catch {
    // A repair must never break a turn. Unchanged text is the safe outcome.
    return { text: input.text, replaced: false, reason: 'ok' }
  }
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
