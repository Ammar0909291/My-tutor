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

import { stripAuthoringLabel, containsOptionList } from './gateProbeContract'
import { askedAnswerableQuestion } from './answerableTurn'
import type { TutorMCQ } from './mcq'

/** The two phases whose advancement is gated on graded correctness.
 *
 *  UNCHANGED, and deliberately so: this is the mastery boundary. It decides
 *  where `correctAtCheck` / `correctAtPractice` may move and where a bare
 *  "ready?" must not buy a stored explanation. Widening it would move the
 *  mastery bar. Probe ATTACHMENT is a different question — see below. */
export function isMasteryGatePhase(phase: unknown): boolean {
  return phase === 'CHECK' || phase === 'PRACTICE'
}

/**
 * Phases where the server may ATTACH an authored probe as the turn's question.
 *
 * ── THE CIRCULAR DEPENDENCY THIS BREAKS (A1) ────────────────────────────────
 * Attachment used to be gated on `isMasteryGatePhase`, i.e. CHECK|PRACTICE. But
 * GUIDE→CHECK advances only on a SUCCESS while in GUIDE, and the only reliable
 * source of correctness is a gradeable widget probe. So the machinery that
 * produces trustworthy correctness was switched off in exactly the phase that
 * needed it to advance, and the only correctness available at GUIDE was the
 * model's self-reported SIGNAL tag.
 *
 * Measured on a real beginner Mathematics session (math.arith.fractions,
 * 8 turns, no concept churn, `demonstrated` true): both deterministically
 * graded answers were spent on the lower rungs, the one answer given while IN
 * GUIDE was a model-written PROSE-ONLY question with no widget, and the ladder
 * sat at GUIDE with correctAtCheck 0. The learner answered correctly, was told
 * "that is correct", and nothing moved.
 *
 * ── WHY THIS DOES NOT LOWER THE MASTERY BAR ─────────────────────────────────
 * It changes WHERE A QUESTION MAY COME FROM, never what a correct answer buys.
 * `correctAtCheck` / `correctAtPractice` still increment only in CHECK /
 * PRACTICE (conversationState's own switch, which does not consult this
 * function). A correct answer at GUIDE advances GUIDE→CHECK exactly as it
 * always did — the difference is that it can now be graded deterministically
 * against a reviewed authored key instead of resting on the model's word.
 * That is a HIGHER bar at that rung, not a lower one.
 *
 * Kept as its own predicate rather than widening `isMasteryGatePhase` because
 * that function has a second caller — the readiness guard that stops a bare
 * "ready?" being answered with a stored explanation — and those two questions
 * must be free to have different answers.
 */
export function isProbeAttachablePhase(phase: unknown): boolean {
  return phase === 'GUIDE' || isMasteryGatePhase(phase)
}

/** The shape `findBestProbe` returns, narrowed to what conversion needs. */
export interface ConvertibleProbe {
  stem: string
  choices: Array<{ text: string; isCorrect: boolean }> | null
  /** PHASE F: the authored asset's id, carried onto the converted TutorMCQ so
   *  next turn's PROBE_OUTCOME can name what it scored. Optional because the
   *  narrowed shape is also satisfied by callers that do not have one; absent
   *  produces exactly the previous output. */
  assetId?: string
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
  // Authoring labels are stripped HERE because this is the single choke point
  // where an authored stem becomes learner-facing. The corpus genuinely carries
  // them (`stem: 'DIAGNOSTIC: A car travels at 60 km/h…'`), and a learner met
  // "DIAGNOSTIC:" as the first word of their practice question in the
  // end-user smoke test. Presentation-only: selection, grading, evidence and
  // the stored asset are all untouched.
  const question = stripAuthoringLabel(probe.stem ?? '')
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

  // PHASE F: carry the authored identity forward. This is the ONLY writer of
  // TutorMCQ.assetId — a model-parsed tag has no asset and must stay anonymous.
  // Presentation, selection, the answer key and grading are all untouched;
  // what this adds is the ability for next turn's PROBE_OUTCOME to name which
  // authored probe it scored. Spread last and conditionally so a probe without
  // an assetId produces a byte-identical object to the previous behaviour.
  return {
    question,
    options,
    correctIndex: correctIndexes[0],
    ...(probe.assetId ? { assetId: probe.assetId } : {}),
  }
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

// ── NO GRADEABLE PROBE ⇒ NO MASTERY QUESTION ────────────────────────────────
//
// ── THE DEFECT THIS EXISTS FOR ──────────────────────────────────────────────
// Measured end to end on `math.found.logic`, 2026-08-18. The concept holds two
// authored closed-choice probes; mastery needs three graded answers and the
// gate never re-asks a spent probe. So the pool ran dry at PRACTICE and the
// turn was handed to the model, exactly as `findBestProbe`'s call site intends.
//
// The model then asked in PROSE — a real, well-formed question with A/B/C/D
// options and no `<!--MCQ-->` tag. Three times. The learner answered all three
// correctly and was told "That's correct" each time, and `correctAtPractice`
// never moved, because `shouldSuppressSignalCorrectness` refuses to record
// correctness for a question with no server answer key. That refusal is right:
// the alternative is the model grading its own memory of an answer it never
// declared, which is how a wrong "C" was once recorded as correct.
//
// So the evidence layer was behaving correctly and the learner still lost. The
// error is upstream: a question that COUNTS TOWARD MASTERY was asked when
// nothing existed to grade it with.
//
// ── WHY NOT A PROMPT RULE ───────────────────────────────────────────────────
// `buildMcqInstruction({ atMasteryGate: true })` already states it in capitals,
// and it is correctly wired — `gatePhaseNow` is read from the pre-turn phase,
// so the clause WAS in the prompt on every failing turn. The prose-MCQ guard
// then told the model, on the following turn, to re-issue the question with the
// tag; it wrote prose again. Two advisory layers, both present, both ignored.
// Measured compliance across the two Phase-B lessons: 3 of 7 opportunities.
//
// ── WHAT THIS DOES, AND WHAT IT DELIBERATELY DOES NOT ───────────────────────
// It withholds the QUESTION and keeps the TEACHING. The turn stops being an
// ungradeable assessment and becomes what it should have been — an explanation
// — and the ladder waits for a turn that can actually carry evidence.
//
// It does NOT grade prose, invent an answer key, convert a short_answer probe,
// lower the bar, or make a second provider call. It cannot manufacture the
// probe that was missing; only the asset contract can do that
// (`assetContract.ts`: >= 3 closed-choice probes per band). This is the
// backstop for a concept below contract, not the cure. Once a concept meets
// the contract this should never fire, and a rising fire rate is the signal
// that the corpus, not the runtime, needs attention.
//
// Scoped to CHECK and PRACTICE by default — the phases whose counters only a
// graded answer can move — PLUS any turn the caller flags via
// `gateSoughtThisTurn`, below. That field exists for GUIDE: the docblock this
// replaces claimed "GUIDE may still ask freely: it advances on a give," which
// was true before the A1 fix (`isProbeAttachablePhase`'s docblock above) made
// GUIDE→CHECK advance on a graded PROBE SUCCESS, not a bare give. A GUIDE turn
// where the gate went looking for a probe and found none is exactly as
// unverifiable as an ungraded CHECK/PRACTICE turn, and left unchecked here it
// silently withholds nothing — the chemistry sweep's actual defect
// (2026-08-21): 4 concepts advanced GUIDE→CHECK off a self-reported SIGNAL on
// an ungradeable prose question, with zero `[gate-contract]` withholding,
// because this function's phase check never even looked at GUIDE turns.
export interface UngradedGateQuestionInput {
  /** The outgoing text, tags already stripped. */
  text: string
  /** The phase this turn was BUILT at (pre-fold), same value the gate read. */
  phase: unknown
  /** Does the turn carry a structured MCQ the server can grade? */
  hasStructuredMcq: boolean
  /**
   * Did THIS turn's phase+move combination make it eligible for the gate to
   * attach an authored probe — the exact `phaseAllowsProbe` boolean computed
   * where the gate looks for one (`isMasteryGatePhase(phase) ||
   * (phase === 'GUIDE' && move === 'ask')`)? Optional and
   * backward-compatible: omitting it reproduces the exact prior
   * `isMasteryGatePhase`-only scope, so the pre-existing CHECK/PRACTICE
   * "must NOT touch" tests are unaffected by this field's existence.
   */
  gateSoughtThisTurn?: boolean
  /**
   * The phase this turn's OWN fold will advance TO, if known — lets the guard
   * recognize a GUIDE turn that is about to become CHECK/PRACTICE even when
   * the engine's decided `move` for the turn is not literally `'ask'`, which
   * is exactly what `gateSoughtThisTurn` above requires. Optional and
   * backward-compatible: omitting it (or passing the pre-fold phase
   * unchanged) reproduces the exact prior behaviour.
   *
   * ── THE DEFECT THIS CLOSES (math.func.function-concept, 2026-08-21) ───────
   * A GUIDE turn whose graded signal succeeds folds straight to CHECK
   * (`conversationState.ts`'s `case 'GUIDE': if (next.demonstrated) next.phase
   * = 'CHECK'`) regardless of this turn's decided move — reacting to a just-
   * graded answer is routinely a `'teach'` move, not `'ask'`. Measured live,
   * twice, on the current deployment: `[ladder] { phaseBefore: 'GUIDE',
   * phaseAfter: 'CHECK', move: 'teach' }`, with no `[gate-assessment]` log at
   * all for that request — `gateSoughtThisTurn` was correctly `false` (the
   * move genuinely was not `'ask'`), so this exact transition shape was the
   * one case neither `isMasteryGatePhase(phase)` nor `gateSoughtThisTurn`
   * covered, and an ungradeable question survived unstripped in production.
   *
   * Only ever changes `gateActive` when `phase === 'GUIDE'` — it is inert for
   * every other phase, so CHECK/PRACTICE's own unconditional coverage and the
   * `move === 'ask'` GUIDE case are both untouched.
   */
  phaseAfter?: unknown
  /**
   * The question text of the structured MCQ actually attached this turn (the
   * server-selected probe's question, `gateMcqHoisted.question` at the call
   * site), when one is attached. Optional and backward-compatible: omitting
   * it (or `hasStructuredMcq: false`) reproduces the exact prior behaviour —
   * see the "second question alongside an attached MCQ" note below for why
   * it exists.
   *
   * ── THE DEFECT THIS CLOSES (chemistry CHECK-phase sweep, 2026-08-21) ──────
   * `buildGateAssessmentBlock` tells the model "do NOT ask any other
   * question" once a probe is attached, and — same lesson as this whole
   * file — a prompt rule is not an enforcement. Measured on
   * `chem.found.matter`/`chem.found.measurement`: an authored MCQ WAS
   * attached (`hasStructuredMcq: true`), and the model wrote its own
   * separate, unrelated open-ended "Stage 2 Recognition" question anyway
   * (`src/lib/ai/client.ts`'s QUESTION STAGE POLICY, which every turn's
   * prompt carries regardless of the gate). Because `hasStructuredMcq` was
   * true, the ONLY existing guard skipped entirely — it was built for "no
   * probe was found," not "a probe was found and the model asked ANOTHER
   * question besides it." The learner was shown two questions at once: the
   * graded widget and an ungraded prose one with no answer key.
   *
   * The repair below is narrow: it only fires when the offending trailing
   * question is DEMONSTRABLY NOT the attached MCQ restated (normalised
   * substring match against `attachedMcqQuestion`) — a model that quotes the
   * same authored question back in prose (the pre-existing "must NOT touch"
   * test's scenario) is left alone exactly as before.
   */
  attachedMcqQuestion?: string
  /**
   * True when this lesson's attempt is already `COMPLETED` (the same
   * `lessonCompletedHoisted` flag route.ts reads from the persisted
   * LessonAttempt at the top of the turn — not a second source of truth).
   *
   * ── THE DEFECT THIS CLOSES ("got it" after completion, 2026-08-22) ────────
   * This function decides whether a mastery gate is active from `phase` /
   * `gateSoughtThisTurn` alone. Mastery is reached, and a lesson is
   * finalised, WHILE `phase` is CHECK or PRACTICE — and nothing ever moves
   * the persisted `conversationState.phase` off that value afterwards, since
   * no further concept is being taught. So on EVERY turn after completion,
   * `isMasteryGatePhase(phase)` kept reading true, and this function kept
   * treating the mastery gate as active on a lesson that had already closed.
   *
   * Measured live: after genuine completion, "got it" (a bare
   * acknowledgement, correctly told by `buildLessonCompleteBlock()` to
   * receive only a brief confirmation and STOP) reached the model, which —
   * despite the instruction — wrote a trailing question. Because the gate
   * was (wrongly) still "active", that stray question was withheld and
   * replaced with `WITHHELD_QUESTION_CONTINUATION`, "Let's stay with this
   * idea for a moment." — a sentence that flatly contradicts the completion
   * lock and reads as the lesson still being taught.
   *
   * A completed lesson has no mastery gate left to guard, so this input,
   * when true, short-circuits `gateActive` to false and the text is
   * returned untouched — the same "nothing to withhold" behaviour as any
   * other non-gate turn. Optional and defaulting to false/undefined, so
   * every existing caller (which has never had a completed lesson in scope)
   * keeps its exact prior behaviour.
   */
  lessonCompleted?: boolean
  /**
   * This turn's server-side grade of the PENDING question, when the learner
   * answered one — `mcqGradeHoisted.correct` plus the pending MCQ's own
   * correct option, both already computed by the route.
   *
   * Read ONLY on the path that would otherwise emit the bare placeholder (see
   * `withheldContinuation`). Omitting it reproduces the exact prior behaviour,
   * which is what every pre-existing caller and test gets.
   *
   * This function does not grade and does not change grading: it is told the
   * result and decides one sentence.
   */
  justGraded?: GradedThisTurn | null
}

/** The route's own grade of the pending question, passed in, never derived. */
export interface GradedThisTurn {
  correct: boolean
  /** The correct option's text, when the pending MCQ is still in scope. */
  correctOptionText?: string | null
}

export interface UngradedGateQuestionResult {
  text: string
  withheld: boolean
  reason: 'ok' | 'no-gradeable-probe' | 'stray-question-alongside-mcq'
}

/**
 * The one sentence used when the ENTIRE turn was the ungradeable question and
 * no teaching survived the cut.
 *
 * Deliberately claims nothing and promises nothing: not that the learner did
 * well, not that a question is coming, not that anything was understood. It
 * exists so the repair can never emit an empty turn, which would be a worse
 * failure than the one being repaired. Same stance as
 * `gateProbeContract`'s FALLBACK_LEAD_IN.
 */
const WITHHELD_QUESTION_CONTINUATION = "Let's stay with this idea for a moment."

/**
 * The same sentence, told what the server already knows about THIS turn.
 *
 * ── THE DEFECT THIS CLOSES (measured, phys.mech.rotational-dynamics,
 * session cmtaiddvd…, 2026-08-26) ───────────────────────────────────────────
 * The learner answered a torque MCQ with "A. but sir i not fully sure". Option
 * A was correct; `evidence_events` carries `PROBE_OUTCOME pass|conf=high`
 * strength 1 for that turn. The entire message they received back was
 * `WITHHELD_QUESTION_CONTINUATION` — 39 characters that acknowledge nothing.
 *
 * Not an anecdote: 119 production turns consist of ONLY that sentence, and
 * joining each to the PROBE_OUTCOME within ±4s shows 52 of them landed on a
 * turn the server had just graded — 51 of those CORRECT. The dominant real
 * shape is a RIGHT answer met with silence.
 *
 * The withhold itself is right and is untouched: a mastery question with no
 * server answer key must not be asked. What was wrong is the fallback, which
 * was written for the "no probe existed" case and so was chosen to claim
 * nothing — sound when the server knows nothing, dishonest by omission when it
 * knows the learner just got it right.
 *
 * ── WHAT IT MAY AND MAY NOT SAY ─────────────────────────────────────────────
 * It reports the grade the server already computed and, on a miss, the correct
 * option the server already holds. It never derives a grade, never explains
 * reasoning it does not have, and never manufactures a correct option it was
 * not given — an unknown key yields "Not quite." and nothing more. The probe
 * is spent by this point (`excludeProbeStem` never re-asks it), so naming the
 * answer forfeits no future assessment.
 */
function withheldContinuation(justGraded: GradedThisTurn | null | undefined): string {
  if (!justGraded || typeof justGraded.correct !== 'boolean') {
    return WITHHELD_QUESTION_CONTINUATION
  }
  if (justGraded.correct) {
    return `That's right. ${WITHHELD_QUESTION_CONTINUATION}`
  }
  const key = typeof justGraded.correctOptionText === 'string'
    ? justGraded.correctOptionText.trim()
    : ''
  // The trailing '?' the caller stripped must not come back in through the
  // answer key, so a key that is itself a question is reported without it.
  return key.length > 0 && !key.includes('?')
    ? `Not quite — the answer was: ${key}. ${WITHHELD_QUESTION_CONTINUATION}`
    : `Not quite. ${WITHHELD_QUESTION_CONTINUATION}`
}

export function withholdUngradedGateQuestion(
  input: UngradedGateQuestionInput,
): UngradedGateQuestionResult {
  try {
    const gateActive =
      !input.lessonCompleted &&
      (isMasteryGatePhase(input.phase) ||
      input.gateSoughtThisTurn === true ||
      (input.phase === 'GUIDE' && isMasteryGatePhase(input.phaseAfter)))
    if (!gateActive) return { text: input.text, withheld: false, reason: 'ok' }

    const text = typeof input.text === 'string' ? input.text : ''

    if (input.hasStructuredMcq) {
      // No known attached question to compare against: reproduce the exact
      // prior behaviour (untouched) rather than guess.
      const attached = typeof input.attachedMcqQuestion === 'string' ? input.attachedMcqQuestion.trim() : ''
      if (!attached) return { text: input.text, withheld: false, reason: 'ok' }

      const poses = askedAnswerableQuestion(text) || containsOptionList(text)
      if (!poses) return { text: input.text, withheld: false, reason: 'ok' }

      // The model restating the SAME authored question in prose (harmless,
      // and the pre-existing contract this function must not break) is
      // distinguished from a genuinely DIFFERENT, unauthorized question by a
      // normalised substring check.
      if (norm(text).includes(norm(attached))) {
        return { text: input.text, withheld: false, reason: 'ok' }
      }

      const kept = dropAnswerableContent(text)
      return {
        text: kept.length > 0 ? kept : withheldContinuation(input.justGraded),
        withheld: true,
        reason: 'stray-question-alongside-mcq',
      }
    }

    // A turn that asks nothing gradeable is already fine. `askedAnswerableQuestion`
    // is reused rather than re-derived precisely because it ALREADY excludes
    // confirmation tails — "does that make sense?" and "shall we carry on?" are
    // not mastery questions and must survive untouched.
    const poses = askedAnswerableQuestion(text) || containsOptionList(text)
    if (!poses) return { text: input.text, withheld: false, reason: 'ok' }

    const kept = dropAnswerableContent(text)
    return {
      text: kept.length > 0 ? kept : withheldContinuation(input.justGraded),
      withheld: true,
      reason: 'no-gradeable-probe',
    }
  } catch {
    // A repair must never break a turn. Unchanged text is the safe outcome.
    return { text: input.text, withheld: false, reason: 'ok' }
  }
}

/**
 * Cut the turn back to its teaching: drop an enumerated option list and
 * everything after it, then drop every paragraph that itself poses an
 * answerable question or task — wherever it sits, not only at the end.
 *
 * ── THE DEFECT THIS CLOSES (math.arith.column-addition,
 * math.nt.extended-euclidean-algorithm — 2026-08-21/22 sweep) ───────────────
 * `poses`, above, decides WHETHER to attempt a repair by scanning the WHOLE
 * text. The removal function this replaced (`dropTrailingQuestion`) only ever
 * examined the TRAILING paragraph, and gave up — returning the text
 * completely unchanged — the instant that paragraph itself wasn't
 * answerable, even when an earlier paragraph plainly was ("Find integers x
 * and y such that 35x + 12y = gcd(35,12).\n\n(You can also think of it as
 * finding the modular inverse...)" — the practice problem is paragraph 1, the
 * harmless aside is the trailing paragraph, so nothing was ever cut). The
 * function still reported `withheld: true` while the served text was, in
 * fact, unchanged — the exact metadata-lies-about-the-text shape this file's
 * `SELF_ANSWERED_HEAD` fix (2026-08-21) closed for ONE trigger; this closes
 * the general case: detection scope must equal removal scope.
 *
 * Paragraph-wise, not sentence-wise, for the reason the prior version already
 * recorded: cutting one sentence strands the question's setup ("A car drives
 * 60 km east in 1 hour.") in front of nothing, and half a question is still a
 * question — when a genuine question's setup and its ask share ONE paragraph,
 * removing that whole paragraph is correct; a setup living in its OWN
 * (non-answerable) paragraph is left alone, orphaned but harmless, exactly as
 * this file's own worked design already intends (see the module docblock's
 * CASE 1/2 examples). `askedAnswerableQuestion` is the single arbiter of
 * "answerable," at both decision points — a paragraph survives here if and
 * only if the whole-text scan above would not itself have flagged it, so
 * ordinary explanatory prose that merely contains a word like "write" or
 * "find" mid-narrative (never at the start of a line, so `TASK_IMPERATIVE`
 * does not match it) is never touched.
 */
function dropAnswerableContent(text: string): string {
  const lines = text.split('\n')
  const firstOptionLine = lines.findIndex((l) => /^\s*\(?[A-Da-d][).]\s+\S/.test(l))
  const scoped = firstOptionLine >= 0 ? lines.slice(0, firstOptionLine).join('\n').trim() : text.trim()
  if (scoped.length === 0) return scoped

  const kept = scoped
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !askedAnswerableQuestion(p))

  return kept.join('\n\n').trim()
}

/**
 * A CLOSING episode withholds every question this turn — the authored gate
 * probe and a model-emitted MCQ tag alike.
 *
 * FIFTH ROOT-CAUSE FIX of one recurring shape (live-reproduced 2026-08-23,
 * real-student acceptance run, physics / Newton's First Law). The learner
 * typed "i'm done for today, thanks" and received a graded multiple-choice
 * question: "What would happen to a ball that rolls on a perfectly smooth
 * surface with no friction?" with four tappable options.
 *
 * Everything upstream was correct and none of it was enough.
 * `detectExplicitFinishRequest` matched, `forceClosing` set the episode to
 * CLOSING, and `buildAffectCloseBlock` was injected — a block whose first
 * clause is literally "do NOT introduce new content, new questions, or another
 * attempt". The question was then attached BELOW all of that, by a stage that
 * had never been told the session was ending: `gateEligible` excluded
 * recovery turns, first lessons, excursions and an unanswered probe, but not a
 * close.
 *
 * This is the same defect the filler repair had twice and the recovery guard
 * had once: the server orders a close, and a later stage — obeying its own
 * perfectly good local rule — undoes it. The close block cannot fix it,
 * because the gate probe is not model output; it is server-attached, so no
 * prompt instruction could have prevented it.
 *
 * Applied at BOTH question sources, because either one alone leaves the defect
 * reachable: withholding only the gate probe lets the model's own MCQ tag
 * through, and dropping only the tag still spends an authored probe (which
 * `excludeProbeStem` then never re-asks) on a turn nobody will answer.
 *
 * Scope is deliberately the whole CLOSING phase, not just an explicit stop:
 * the affect-budget close carries the identical "no new questions" contract,
 * so a question is wrong there for the same reason.
 */
export function closingTurnWithholdsQuestion(episodePhase: unknown): boolean {
  return episodePhase === 'CLOSING'
}

export interface ClosingProseQuestionResult {
  text: string
  withheld: boolean
  reason: 'ok' | 'not-closing' | 'prose-question-withheld' | 'nothing-would-survive'
}

/**
 * PHASE 3 — the THIRD question source on a closing turn: the model's own prose.
 *
 * `closingTurnWithholdsQuestion` already covers the two STRUCTURED sources (the
 * server-attached authored probe, and the model's `<!--MCQ-->` tag). Phase 2
 * measured the remaining hole exactly: "C2 CLOSING -> new question: MCQ
 * BLOCKED, prose question REACHABLE". A tappable four-option widget was
 * stripped while the same question written as a sentence went straight through.
 *
 * The prompt-side cause is closed upstream — the TURN DIRECTIVE no longer
 * orders a move or a question when it does not own the turn — so this is
 * VALIDATION, not the fix: the last check that the contract the close block
 * states was actually honoured. It withholds; it never rewrites a teaching
 * decision, never grades, never invents a question, and makes no provider call.
 *
 * TWO DELIBERATE LIMITS, both of which make it withhold LESS:
 *
 *  1. It reuses `askedAnswerableQuestion`/`dropAnswerableContent` rather than
 *     matching '?'. Those already exclude confirmation tails — "does that make
 *     sense?", "shall we carry on?" — which is essential here, because the
 *     close block's own script ends warmly and invites the learner back. A
 *     naive question-mark strip would mutilate exactly the sentence the close
 *     is for.
 *
 *  2. If nothing meaningful would survive the cut it returns the text
 *     UNTOUCHED and says so (`nothing-would-survive`), instead of substituting
 *     a continuation line. `withholdUngradedGateQuestion` can safely fall back
 *     to "Let's stay with this idea for a moment" because its turn continues;
 *     on a closing turn that sentence would promise the opposite of what the
 *     learner asked for. A withhold must never produce a worse turn than the
 *     one it was repairing.
 */
export function withholdClosingProseQuestion(input: {
  text: string
  /** The episode phase for THIS turn — the same value both other sources read. */
  episodePhase: unknown
  /** True when a structured MCQ survived; then this turn has an authorised
   *  question and prose restating it is not a second question. */
  hasStructuredMcq: boolean
}): ClosingProseQuestionResult {
  try {
    if (!closingTurnWithholdsQuestion(input.episodePhase)) {
      return { text: input.text, withheld: false, reason: 'not-closing' }
    }
    // Defensive: the two structured sources are already stripped on a closing
    // turn, so this should be unreachable. If one ever survives, the turn has
    // an authorised question and removing its prose would orphan the widget.
    if (input.hasStructuredMcq) return { text: input.text, withheld: false, reason: 'ok' }

    const text = typeof input.text === 'string' ? input.text : ''
    if (!(askedAnswerableQuestion(text) || containsOptionList(text))) {
      return { text: input.text, withheld: false, reason: 'ok' }
    }
    const kept = dropAnswerableContent(text)
    if (kept.trim().length === 0) {
      return { text: input.text, withheld: false, reason: 'nothing-would-survive' }
    }
    return { text: kept, withheld: true, reason: 'prose-question-withheld' }
  } catch {
    // Total, like every other guard on this path: a failure here must never
    // cost the learner their turn.
    return { text: input.text, withheld: false, reason: 'ok' }
  }
}
