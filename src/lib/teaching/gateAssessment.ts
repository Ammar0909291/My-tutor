/**
 * THE SERVER OWNS THE ASSESSMENT AT A MASTERY GATE.
 *
 * ── THE DEFECT THIS CLOSES ──────────────────────────────────────────────────
 * Measured by the parallel engine sweep (`scripts/audit/engine-sweep.ts`) over
 * six physics topics, real production, real learner account: **E6 × 17** — a
 * question asked at CHECK or PRACTICE carrying no MCQ tag — and **0 of 6 topics
 * reached `verified`**. It is the single blocker in front of every topic in the
 * corpus audit, so it blocks all moat production behind it.
 *
 * The mechanism is a contradiction the runtime had been living with:
 *
 *   · CHECK and PRACTICE advance ONLY on graded correctness
 *     (`correctAtCheck` / `correctAtPractice` in conversationState.ts).
 *   · The only deterministic grader is `gradeMcqAnswer`, which needs the
 *     previous turn to have declared its own answer key — i.e. an MCQ tag.
 *   · Producing that tag was delegated to the LLM, which is under no
 *     obligation to emit one.
 *
 * So the server REQUIRED machine-readable evidence and DELEGATED its production
 * to a component that could decline. When the component declined — routinely —
 * the learner answered a perfectly good prose question, the answer could not be
 * recorded, and the gate stayed shut however well they did.
 *
 * ── WHY THIS IS NOT ANOTHER PROMPT RULE ─────────────────────────────────────
 * It was tried. `buildMcqInstruction({ atMasteryGate: true })` states the
 * requirement in capitals and explains the consequence ("cannot be recorded",
 * "cannot advance"). Commit 09a25296. The sweep afterwards still found E6 × 17.
 * A format the ladder's correctness depends on cannot be a request.
 *
 * ── THE LEVER ───────────────────────────────────────────────────────────────
 * The assessment already exists, reviewed, in the moat. `AUTHORED_PROBES`
 * carries 1,652 authored probes — physics covers all 238 concepts — each with
 * distractor-mapped `choices[].isCorrect` and a `misconceptionId` on the wrong
 * options. `findBestProbe` has been able to retrieve them all along; the only
 * thing missing was that nothing ever turned one into the turn's ACTUAL
 * question. `assembleLesson` rendered it as prose ("**Quick check:** …\nA. …"),
 * which is unreadable to the grader for exactly the same reason a prose LLM
 * question is.
 *
 * So at a gate the server selects the authored probe, attaches it as the turn's
 * MCQ itself, and tells the model the question is already chosen. The model
 * writes the lead-in; the assessment is not its decision. That is ADR 14's
 * stated endgame — the LLM as voice-renderer, not content-generator — arriving
 * at the one place where the difference is measurable.
 *
 * ── WHAT THIS DOES NOT DO ───────────────────────────────────────────────────
 * It does not lower the bar, and it fabricates nothing. The learner still has
 * to choose the right option, and `gradeMcqAnswer` still grades against the
 * authored key. It makes a correct answer RECORDABLE; it does not make one.
 *
 * When no authored probe converts, this returns null and the turn behaves
 * exactly as it did before — the prompt clause remains as the fallback. A
 * concept with no authored probe is a CONTENT gap, and it is honest for it to
 * read as one rather than be papered over with a server-invented question.
 */

import type { TutorMCQ } from './mcq'

/** The two phases whose advancement is gated on graded correctness. */
export function isMasteryGatePhase(phase: unknown): boolean {
  return phase === 'CHECK' || phase === 'PRACTICE'
}

/** The shape `findBestProbe` returns, narrowed to what conversion needs. */
export interface ConvertibleProbe {
  stem: string
  choices: Array<{ text: string; isCorrect: boolean }> | null
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')

/**
 * Authored probe → the turn's MCQ, or null when the probe cannot be served as
 * one.
 *
 * REFUSAL IS THE POINT. Every rule below mirrors one `parseMcqTag` already
 * enforces on a model-emitted tag, so a server-selected question can never be
 * admitted on weaker terms than a generated one:
 *
 *   · 2–4 options. Fewer is not a choice; more cannot be rendered by the tag
 *     vocabulary, and silently dropping the fifth option risks dropping the
 *     correct one.
 *   · Exactly one correct choice. Zero means the authored key is missing and
 *     every answer would grade wrong; more than one means the item is
 *     unanswerable and the learner would be marked wrong for a right answer.
 *   · No empty option text, and no two options that normalise identically —
 *     `parseMcqTag`'s dedup rule, for the same reason (assessment/03:
 *     distractors must be discriminable).
 *
 * `correctValue` is deliberately NOT consulted. In the authored corpus it holds
 * a short form ("kelvin") while the choice reads "kelvin (K)", so matching on it
 * would be a string-similarity guess about which option is right — precisely
 * the class of silent mis-grade this pipeline exists to avoid. `isCorrect` is
 * the authored key and is unambiguous.
 */
export function probeToMcq(probe: ConvertibleProbe): TutorMCQ | null {
  const question = probe.stem?.trim()
  if (!question) return null

  const choices = probe.choices
  if (!Array.isArray(choices) || choices.length < 2 || choices.length > 4) return null

  const options = choices.map((c) => (typeof c?.text === 'string' ? c.text.trim() : ''))
  if (options.some((o) => o.length === 0)) return null
  if (new Set(options.map(norm)).size !== options.length) return null

  const correctIndexes = choices
    .map((c, i) => (c?.isCorrect === true ? i : -1))
    .filter((i) => i >= 0)
  if (correctIndexes.length !== 1) return null

  return { question, options, correctIndex: correctIndexes[0] }
}

/**
 * The prompt block that accompanies a server-selected assessment.
 *
 * The model is told the question EXISTS and is already on the learner's screen,
 * so its job is the lead-in only. This is the same shape of instruction the
 * model demonstrably DOES follow: `buildMcqInstruction`'s "do NOT also re-type
 * the question" is obeyed so reliably that turns came back with empty prose
 * (which is why the route has an `!text.trim() && mcq` branch at all).
 *
 * The question text is quoted so the lead-in can be about THIS question rather
 * than a generic "here's a check" — but it is quoted as context, never as
 * something to reproduce, because the learner is already reading it.
 */
export function buildGateAssessmentBlock(mcq: TutorMCQ): string {
  return (
    '\n\nASSESSMENT ALREADY SELECTED (do not write a question this turn). ' +
    'The learner is about to see this question, rendered as tappable buttons ' +
    'beneath your message:\n' +
    `  "${mcq.question}"\n` +
    'It was chosen by the teaching engine from reviewed course material, and ' +
    'it is what their progress will be graded on. Your job this turn is the ' +
    'LEAD-IN ONLY: one or two sentences that make the question worth ' +
    'answering — a bridge from what you just taught, or the reason it matters. ' +
    'Do NOT restate the question, do NOT list the options, do NOT ask any ' +
    'other question, and do NOT emit an MCQ tag of your own. Never mention ' +
    'that the question was selected for you.'
  )
}
