/**
 * Question Legality — EOS v2 Band 2 (LEGALITY), runtime-enforced.
 *
 * Subtractive only: this layer REMOVES 'ask' from the legal move set. It
 * never adds a move, never chooses one, and never phrases anything. The
 * single decision point remains decideNextMove() in conversationState.ts,
 * which calls this first — one authority, one deeper layer, no new system.
 *
 * Three invariants, each traced to an observed failure in the Henry's Law
 * transcript (Lesson 44, chem.sol.solubility, 2026-07-27), each expressed as
 * a deterministic state predicate rather than prompt wording:
 *
 *   QL-1  ANSWERABLE SOURCE
 *         A question is illegal when the learner has no source to answer it
 *         from — nothing taught this session for this concept, and no
 *         evidenced prior knowledge. Transcript failure: seven consecutive
 *         questions before Henry's Law was ever stated. The student could
 *         not have answered any of them; the questions were unanswerable by
 *         construction, not merely too numerous.
 *
 *   QL-2  NON-ANSWERS CONCLUDE THE DIAGNOSTIC
 *         Consecutive non-answers mean the probe has SUCCEEDED — the answer
 *         is "they don't know" — and further probing is interrogation, not
 *         diagnosis. Transcript failure: "No idea" / "I don't know" ×2 / "?"
 *         / ":(" each answered with another question.
 *
 *   QL-3  EXPLICIT LEARNER DIRECTIVES OVERRIDE STRATEGY, SND STICK
 *         "Explain it rather than keep asking" suppresses ASK for several
 *         turns, not one. Transcript failure: the plea was eventually obeyed
 *         for a single turn, then the tutor reverted to observation questions
 *         in the very next turn.
 *
 * Deliberately NOT here: any give-to-ask ratio. A ratio is a MONITORING
 * quantity — its correct value differs by activity (first exposure vs
 * Socratic diagnosis vs practice vs mastery check), so a global constant is
 * wrong in every state but one, and a ratio used as a controller invites the
 * model to emit filler "gives" to buy back the right to ask. Control runs
 * through legality; the ratio is measured (see countable output below) and
 * never gates.
 */

import type { ConversationState, TeachingPhase } from './conversationState'

/** Why ASK was removed from the legal set. Stable codes — these are emitted
 *  as measurement, so renaming one is a breaking change to the metric. */
export type LegalityReason =
  | 'QL1_NO_ANSWERABLE_SOURCE'
  | 'QL2_DIAGNOSTIC_CONCLUDED'
  | 'QL3_LEARNER_DIRECTIVE_ACTIVE'

export interface LegalityVerdict {
  /** false ⇒ 'ask' has been removed from the legal move set this turn. */
  askLegal: boolean
  reason: LegalityReason | null
  /** Human-readable, for the turn directive and for audit. Never shown to
   *  the learner (I-22: learner-facing text never mentions the apparatus). */
  rationale: string | null
}

export interface LegalityContext {
  /** Evidence of prior knowledge from OUTSIDE this session — a mastery rung
   *  above UNKNOWN, a prior completion, an imported history. Supplied by the
   *  caller because this module is pure; defaults to the conservative false.
   *  When true, QL-1 is satisfied without anything being taught yet: a
   *  learner who demonstrably knows the material CAN answer a diagnostic. */
  hasEvidencedPriorKnowledge?: boolean
  /** The number of consecutive non-answers that concludes a diagnostic.
   *  Pack-tunable (v2 BrainConfig style), not hardcoded at the call site. */
  diagnosticConcludesAfter?: number
}

/** Non-answers that conclude the diagnostic and force a PHASE transition. */
export const DEFAULT_DIAGNOSTIC_CONCLUDES_AFTER = 2

/**
 * Non-answers that make ASK illegal on the following turn. One — because you
 * do not answer "I don't know" with another question, ever. Discovered by the
 * transcript-replay test: a threshold of 2 for both the block and the phase
 * transition still let one probe through immediately after a learner's first
 * non-answer, which is the exact move foundations/01's `dont_know` script
 * forbids ("do NOT shrink to another question").
 *
 * A non-answer is not a wrong answer. A WRONG answer is informative and may
 * legitimately be followed by a question (that is how misconception repair
 * works). A NON-answer means the question did not land, and repeating the
 * move that just failed is the definition of the observed loop.
 */
export const DEFAULT_NON_ANSWER_BLOCKS_ASK = 1

/** How many subsequent turns an explicit learner directive suppresses ASK.
 *  One turn is what the live system effectively did, and the transcript shows
 *  it reverting immediately; three gives the teaching actually asked for room
 *  to land before questioning resumes. */
export const LEARNER_DIRECTIVE_SUPPRESSION_TURNS = 3

/**
 * QL-1 support: does the learner have anything to answer FROM?
 *
 * Two admissible sources, matching the two legitimate origins of an
 * answerable question:
 *   • taught this session — an anchor was shown, a demonstration given, or an
 *     explanation delivered for the current concept; the learner can answer
 *     about the thing in front of them.
 *   • evidenced prior knowledge — this learner has demonstrated the material
 *     before; a diagnostic probe is legitimate precisely because there IS
 *     something to diagnose.
 *
 * Note what is NOT a source: the concept existing in the curriculum, the
 * learner having selected the lesson, or the question being "gentle". A soft
 * question about an untaught concept is exactly as unanswerable as a hard one.
 */
export function answerableSource(
  state: ConversationState,
  ctx: LegalityContext = {},
): 'taught_this_session' | 'evidenced_prior' | 'none' {
  if (state.taughtThisSession || state.demonstrated || state.explanationCount > 0) {
    return 'taught_this_session'
  }
  if (ctx.hasEvidencedPriorKnowledge) return 'evidenced_prior'
  // A correct answer already given this session is itself evidence that the
  // learner holds something answerable — the source existed even if this
  // module never saw the teaching that produced it (resumed sessions).
  if (state.correctAtCheck + state.correctAtPractice > 0) return 'evidenced_prior'
  return 'none'
}

/**
 * The Band-2 gate. Pure; total; never throws. Returns whether ASK survives.
 *
 * Evaluation order is by authority, matching v2 §6.1's principle that bands
 * are ordered by authority rather than by confidence: an explicit learner
 * directive outranks a system-inferred diagnostic conclusion, which outranks
 * the structural source check.
 */
export function questionLegality(
  state: ConversationState,
  ctx: LegalityContext = {},
): LegalityVerdict {
  // QL-3 — the learner told us to stop. Highest authority: this is the one
  // signal that is ground truth rather than inference (v2 L6 treats a stated
  // learner claim about their own experience as trusted immediately).
  if ((state.askSuppressedTurns ?? 0) > 0) {
    return {
      askLegal: false,
      reason: 'QL3_LEARNER_DIRECTIVE_ACTIVE',
      rationale:
        'The learner explicitly asked to be taught rather than questioned. ' +
        'Teach. Do not ask anything this turn — not even a gentle check.',
    }
  }

  // QL-2 — a non-answer is never answered with a question.
  const nonAnswers = state.consecutiveDontKnows ?? 0
  const concludesAt = ctx.diagnosticConcludesAfter ?? DEFAULT_DIAGNOSTIC_CONCLUDES_AFTER
  if (nonAnswers >= DEFAULT_NON_ANSWER_BLOCKS_ASK) {
    return {
      askLegal: false,
      reason: 'QL2_DIAGNOSTIC_CONCLUDED',
      rationale:
        nonAnswers >= concludesAt
          ? `The learner has given ${nonAnswers} consecutive non-answers. The diagnostic is ` +
            'COMPLETE and its result is "they do not know this yet". Asking again cannot ' +
            'produce new information. Teach the thing directly.'
          : 'The learner just told you they do not know. That is feedback about the ' +
            'question, not about them — it landed before they had anything to answer ' +
            'from. Give them something: show it, or state it plainly. Do not rephrase ' +
            'the question, and do not ask an easier one.',
    }
  }

  // QL-1 — nothing to answer from.
  if (answerableSource(state, ctx) === 'none') {
    return {
      askLegal: false,
      reason: 'QL1_NO_ANSWERABLE_SOURCE',
      rationale:
        'Nothing has been taught yet this session and there is no evidence of ' +
        'prior knowledge, so the learner has no source to answer from. Show or ' +
        'state the idea first; a question is only answerable once something ' +
        'exists to answer about.',
    }
  }

  return { askLegal: true, reason: null, rationale: null }
}

// ── QL-2 support: the state transition a concluded diagnostic forces ─────────

/**
 * A concluded diagnostic must move the machine, not merely change the move.
 * Returning 'show' while the phase stays at OBSERVE is what produces the
 * observed loop: the tutor shows once, the next turn re-enters OBSERVE, and
 * the observation question returns. The diagnostic concluding is itself the
 * evidence gate for leaving OBSERVE — the answer it produced ("nothing here
 * yet") is exactly the input DEMONSTRATE needs.
 *
 * Applies only to the diagnostic phase. Later phases already have their own
 * failure handling (drop one, floor DEMONSTRATE) and must not be jumped.
 */
export function phaseAfterConcludedDiagnostic(
  phase: TeachingPhase,
  consecutiveDontKnows: number,
  concludesAfter: number = DEFAULT_DIAGNOSTIC_CONCLUDES_AFTER,
): TeachingPhase {
  if (phase === 'OBSERVE' && consecutiveDontKnows >= concludesAfter) return 'DEMONSTRATE'
  return phase
}

// ── Measurement (test 2: automatically measurable) ───────────────────────────

export interface LegalityMetrics {
  /** Turns this session where the rendered reply asked a question although
   *  the server's decided move was not ASK. This is the v2 V-Q2 violation
   *  class and the single most diagnostic number the teaching runtime
   *  produces: it is the rate at which the model overrides the kernel. */
  askViolations: number
  /** Turns where ASK was removed by this layer, by reason. Not a failure —
   *  this is the layer working; a rising QL1 count means teaching is starting
   *  too late, a rising QL3 count means learners keep having to ask to be
   *  taught. Both are upstream defects this layer only masks. */
  ql1Blocks: number
  ql2Blocks: number
  ql3Blocks: number
  /** Monitoring only — never a gate. Compare against the per-activity human
   *  baseline once a human-tutor corpus exists; a global target is wrong. */
  gives: number
  asks: number
}

export function initialLegalityMetrics(): LegalityMetrics {
  return { askViolations: 0, ql1Blocks: 0, ql2Blocks: 0, ql3Blocks: 0, gives: 0, asks: 0 }
}

const REASON_TO_FIELD: Record<LegalityReason, keyof LegalityMetrics> = {
  QL1_NO_ANSWERABLE_SOURCE: 'ql1Blocks',
  QL2_DIAGNOSTIC_CONCLUDED: 'ql2Blocks',
  QL3_LEARNER_DIRECTIVE_ACTIVE: 'ql3Blocks',
}

/** Fold one completed turn into the metrics. Pure. */
export function foldLegalityMetrics(
  prev: LegalityMetrics | undefined,
  turn: {
    decidedMove: 'teach' | 'show' | 'ask'
    /** What the rendered reply actually did (repliesWithQuestion). */
    askedQuestion: boolean
    blockedReason: LegalityReason | null
  },
): LegalityMetrics {
  const m: LegalityMetrics = { ...initialLegalityMetrics(), ...(prev ?? {}) }
  if (turn.blockedReason) m[REASON_TO_FIELD[turn.blockedReason]] += 1
  if (turn.decidedMove === 'ask') m.asks += 1
  else m.gives += 1
  // The violation that matters: the kernel said do not ask, and it asked.
  if (turn.decidedMove !== 'ask' && turn.askedQuestion) m.askViolations += 1
  return m
}

// ── QL-3 support: the learner-directive suppression counter ──────────────────

/**
 * Fold the suppression counter. Set to full on a fresh directive; otherwise
 * decay by one per turn. Separated from the main state fold so the decay rule
 * is testable in isolation and the constant lives in one place.
 */
export function foldAskSuppression(
  prev: number | undefined,
  learnerIssuedDirective: boolean,
): number {
  if (learnerIssuedDirective) return LEARNER_DIRECTIVE_SUPPRESSION_TURNS
  return Math.max(0, (prev ?? 0) - 1)
}

/**
 * The one-clause acknowledgement a human tutor gives when told they are
 * over-questioning. Injected only on the turn the directive arrives — a
 * repeated apology is worse than none. Not personality: this is the
 * self-correction move, which the transcript shows was entirely absent.
 */
export function buildDirectiveAcknowledgementLine(): string {
  return (
    '- The learner has just asked you to explain rather than keep questioning. ' +
    'Open by briefly owning it in ONE short clause (e.g. "Fair enough — I was ' +
    'asking too much."), then teach immediately. Do not apologise at length, ' +
    'do not explain your reasoning, and do not ask anything.'
  )
}
