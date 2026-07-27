/**
 * K4 — Base Policy Pack v0 (in-code).
 *
 * The seed pack. Rules cite the frozen documents that authored them.
 * C4 replaces this with a build artifact compiled from CEKR/BrainScript;
 * the engine executes both identically (that is the whole point of
 * policy-as-data).
 *
 * Coverage (K4 v1):
 *  Band 0: recovery preemption
 *  Band 1: obligations (retro-close-owed, opening reviews)
 *  Band 2: legality (stage ceiling from TSM; question-budget filters;
 *          first-lesson vocabulary ban; register floor)
 *  Band 3: authored dispatch — EMPTY (needs CEKR/C4)
 *  Band 4: D1 grid + move selection tables
 *  Band 5: worked-example-first, beginner tuning, autonomy honoring
 *  Band 6: fallback chain default
 *
 * Every rule declares its citation. The MANDATORY set is:
 *   Band 0: recovery-preempt
 *   Band 2: stage-ceiling, question-budget
 *   Band 4: default-move-fallback
 *   Band 6: fallback-chain
 */
import type { PolicyPack, Rule } from './types'
import { getStageCeiling } from '../tsm/phases'

const P = (id: string, band: 0|1|2|3|4|5|6, citation: string, guard: Rule['guard'], effect: Rule['effect'], opts: { specificity: number; mandatory?: boolean }): Rule => ({
  ruleId: id, band, citation, guard, effect,
  specificity: opts.specificity, mandatory: opts.mandatory ?? false,
})

// ── Band 0 — Interrupts ─────────────────────────────────────────────────────

const b0Recovery = P(
  'B0.recovery.preempt.v1', 0,
  'foundations/01 §3 + decision-engine/03 §0',
  { reads: ['interruptActive', 'failureStateKey'], match: (i) => i.interruptActive && i.failureStateKey !== null, describe: 'interrupt.active with failure state key' },
  {
    move: 'RECOVER',
    actionClass: 'RECOVERY_SCRIPT',
    budgets: { maxQuestions: 0, maxParagraphs: 2, maxNewTerms: 0 },
    vocabularyBans: ['formula', 'notation'],
    visualClass: null,
    contentSlots: [{ kind: 'recovery-script', payload: {}, citation: 'foundations/01 §3' }],
  },
  { specificity: 2, mandatory: true },
)

// ── Band 1 — Obligations ────────────────────────────────────────────────────

const b1RetroWin = P(
  'B1.opening.retro-win.v1', 1,
  'decision-engine/07 §1 + §8 rules 2–3',
  { reads: ['freshBoundary', 'retroWinOwed'], match: (i) => i.freshBoundary && i.retroWinOwed, describe: 'fresh session boundary owing an engineered win' },
  { contentSlots: [{ kind: 'opening-block', payload: { retroWinOwed: true }, citation: 'decision-engine/07 §8' }] },
  { specificity: 2 },
)

const b1DueReviews = P(
  'B1.opening.due-reviews.v1', 1,
  'decision-engine/07 §1',
  { reads: ['freshBoundary', 'dueReviewCount'], match: (i) => i.freshBoundary && i.dueReviewCount > 0, describe: 'fresh boundary with due reviews' },
  { contentSlots: [{ kind: 'opening-block', payload: { dueReviewCount: 'fromInputs' }, citation: 'decision-engine/07 §1' }] },
  { specificity: 2 },
)

// ── Band 2 — Legality (subtractive) ─────────────────────────────────────────

const b2StageCeiling = P(
  'B2.legality.stage-ceiling.v1', 2,
  'RS §4.10 + conversationState PHASE_MAX_QUESTION_STAGE',
  { reads: ['phase'], match: () => true, describe: 'always apply the phase ceiling' },
  { stageCeiling: 0 }, // placeholder — engine computes from phase; this rule tags provenance
  { specificity: 1, mandatory: true },
)

const b2QuestionBudget = P(
  'B2.legality.question-budget.v1', 2,
  'first-lesson/02 §2 + conversationState',
  { reads: ['consecutiveFailures', 'contentRegister', 'isFirstLessonContext'], match: () => true, describe: 'always apply the question budget floor' },
  { budgets: { maxQuestions: 0 } },   // upper bound; Band 4 may lift to 1
  { specificity: 1, mandatory: true },
)

const b2FirstLessonVocab = P(
  'B2.legality.first-lesson-vocab.v1', 2,
  'first-lesson/07 subject adaptations',
  { reads: ['isFirstLessonContext'], match: (i) => i.isFirstLessonContext, describe: 'lesson-one is active' },
  { vocabularyBans: ['SI', 'phoneme', 'metric system', 'quantum', 'derivative'] },
  { specificity: 1 },
)

/**
 * The Band-2 legality gate the masterplan places here ("capability gates
 * live HERE"). Purely subtractive: it removes ASK from the legal move set
 * and says nothing about what to do instead — Band 4 selects from what
 * remains, which is the band separation working as designed.
 *
 * The verdict arrives as an input from questionLegality.ts. Restating QL-1…
 * QL-4 as pack predicates would put the capability lattice in two places
 * and guarantee they drift.
 */
const b2AskIllegal = P(
  'B2.legality.ask-illegal.v1', 2,
  'questionLegality QL-1…QL-4 + capabilityModel.capabilityLegality',
  { reads: ['askLegal'], match: (i) => i.askLegal === false, describe: 'ASK ruled illegal this turn' },
  { bannedMoves: ['ASK'] },
  { specificity: 1 },
)

const b2BeginnerVocab = P(
  'B2.legality.beginner-vocab.v1', 2,
  'foundations/03 §5 register floor',
  { reads: ['contentRegister'], match: (i) => i.contentRegister === 'beginner', describe: 'beginner register' },
  { vocabularyBans: ['ipa', 'phonetic notation'] },
  { specificity: 1 },
)

// ── Band 3 — Authored dispatch (empty in K4 v1; C4 populates from CEKR) ─────

// (deliberately empty — see docstring)

// ── Band 4 — Policy tables (D1 grid + move selection) ───────────────────────

/**
 * The D1 grid (foundations/02 §1): speed × correctness × confidence → quadrant.
 * K4 v1 captures the two most actionable quadrants (validation/03).
 */
const b4FastWrongConfident = P(
  'B4.d1.misconceiving.v1', 4,
  'foundations/02 §1 + validation/03',
  { reads: ['lastSignalCorrect', 'lastSignalConfidence'], match: (i) => i.lastSignalCorrect === false && i.lastSignalConfidence === 'high', describe: 'fast-wrong-confident = misconception signature' },
  { move: 'TEACH', actionClass: 'MISCONCEPTION_FIX' },
  { specificity: 2 },
)

const b4HesitantCorrect = P(
  'B4.d1.fragile.v1', 4,
  'foundations/02 §1',
  { reads: ['lastSignalCorrect', 'lastSignalConfidence'], match: (i) => i.lastSignalCorrect === true && i.lastSignalConfidence === 'low', describe: 'hesitant-correct = FRAGILE — hold' },
  { move: 'ASK', actionClass: 'REPEAT_SAME_TYPE' },
  { specificity: 2 },
)

/**
 * The give that replaces a blocked question.
 *
 * decideNextMoveDetailed evaluates legality BEFORE the heuristic ladder and
 * RETURNS from the blocked branch — the heuristic (repeated struggle, the
 * question budget, worked-example-first) never runs on that turn. These two
 * rules mirror that ordering: specificity 4 puts them above repeated-struggle
 * (3) and the D1 grid (2), so a blocked turn resolves the same way in the
 * pack as it does in the ladder. Anything lower would let a Band-4 heuristic
 * re-answer a question legality had already answered.
 *
 * The teach/show split is the ladder's own: `taughtThisSession ? 'teach' :
 * 'show'` — before anything is taught the learner needs to SEE the thing;
 * afterwards an explanation is what is missing.
 */
const b4LegalityGiveShow = P(
  'B4.legality-give.show.v1', 4,
  'conversationState decideNextMoveDetailed (blocked-ask branch)',
  { reads: ['askLegal', 'taughtThisSession'], match: (i) => i.askLegal === false && i.taughtThisSession !== true, describe: 'ASK illegal and nothing taught yet → show' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 10 },
)

const b4LegalityGiveTeach = P(
  'B4.legality-give.teach.v1', 4,
  'conversationState decideNextMoveDetailed (blocked-ask branch)',
  { reads: ['askLegal', 'taughtThisSession'], match: (i) => i.askLegal === false && i.taughtThisSession === true, describe: 'ASK illegal after teaching → teach' },
  { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION' },
  { specificity: 10 },
)

/**
 * ── The decision matrix (masterplan K4: "Band 4 tables (D1 grid + decision
 * matrix)") ────────────────────────────────────────────────────────────────
 *
 * decideNextMoveHeuristic is a SEQUENCE of guards, first match wins. Band 4
 * is a specificity-ordered set. The transcription is only faithful if the
 * specificities reproduce the sequence, so they are assigned from the ladder's
 * own order rather than from a notion of how "specific" each guard looks:
 *
 *   10  legality gives          (the ladder RETURNS before the heuristic)
 *    8  the four "inquiry is over" gates
 *    7  the question budget (two asks without a give)
 *    6  repeated struggle
 *    5  worked-example-first
 *    2  the D1 grid + the GUIDE ask branch
 *    1  phase defaults
 *    0  final fallback
 *
 * The four gates at 8 all produce SHOW and are kept as SEPARATE rules rather
 * than one OR: provenance has to answer "why did the tutor stop asking?", and
 * "consecutive don't-knows" and "the inquiry phase is permanently over" are
 * different answers a reviewer must be able to tell apart.
 */
const b4DontKnowGate = P(
  'B4.gate.consecutive-dont-knows.v1', 4,
  'conversationState decideNextMoveHeuristic (Hard Rule 1)',
  { reads: ['consecutiveDontKnows'], match: (i) => (i.consecutiveDontKnows ?? 0) >= 2, describe: 'two consecutive "I don\'t know" → discovery is over' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 8 },
)

const b4TotalProbesGate = P(
  'B4.gate.total-knowledge-probes.v1', 4,
  'conversationState decideNextMoveHeuristic (permanent gate)',
  { reads: ['totalKnowledgeProbes'], match: (i) => (i.totalKnowledgeProbes ?? 0) >= 2, describe: 'two prior-knowledge probes asked this session, ever' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 8 },
)

const b4LoopBreakGate = P(
  'B4.gate.repeated-probe-intent.v1', 4,
  'conversationState decideNextMoveHeuristic (P0-4 semantic loop break)',
  { reads: ['consecutivePriorKnowledgeProbes'], match: (i) => (i.consecutivePriorKnowledgeProbes ?? 0) >= 2, describe: 'the same question, reworded, twice' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 8 },
)

const b4ObserveFailureGate = P(
  'B4.gate.observe-failures.v1', 4,
  'conversationState decideNextMoveHeuristic (observe-failure gate)',
  { reads: ['observeFailures'], match: (i) => (i.observeFailures ?? 0) >= 2, describe: 'the observation question has failed twice' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 8 },
)

/** Two asks without a give → give. Which give depends on whether the learner
 *  is currently failing, exactly as the ladder splits it. */
const b4QuestionBudgetShow = P(
  'B4.gate.question-budget.show.v1', 4,
  'conversationState decideNextMoveHeuristic (hard question budget)',
  { reads: ['questionsAskedSinceTeach', 'consecutiveFailures'], match: (i) => (i.questionsAskedSinceTeach ?? 0) >= 2 && i.consecutiveFailures >= 1, describe: 'question budget spent while failing' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 7 },
)

const b4QuestionBudgetTeach = P(
  'B4.gate.question-budget.teach.v1', 4,
  'conversationState decideNextMoveHeuristic (hard question budget)',
  { reads: ['questionsAskedSinceTeach', 'consecutiveFailures'], match: (i) => (i.questionsAskedSinceTeach ?? 0) >= 2 && i.consecutiveFailures < 1, describe: 'question budget spent, not failing' },
  { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION' },
  { specificity: 7 },
)

/** Repeated struggle → SHOW, don't interrogate (foundations/01 §3 + Phase F). */
const b4RepeatedStruggle = P(
  'B4.repeated-struggle.show.v1', 4,
  'foundations/01 §3 (worked-example-first)',
  { reads: ['consecutiveFailures'], match: (i) => i.consecutiveFailures >= 2, describe: '≥2 consecutive failures' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 6 },
)

/** Until something has been demonstrated, show — when the caller asked for
 *  worked-example-first. */
const b4WorkedExampleFirst = P(
  'B4.worked-example-first.show.v1', 4,
  'conversationState decideNextMoveHeuristic (worked-example-first)',
  { reads: ['workedExampleFirst', 'demonstrated'], match: (i) => i.workedExampleFirst === true && !i.demonstrated, describe: 'worked-example-first requested, nothing demonstrated' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 5 },
)

/** Two-question ceiling (RS §4.10 planner rule). */
const b4QuestionCeiling = P(
  'B4.max-consecutive-questions.v1', 4,
  'decision-engine/06 §1 + conversationState.decideNextMove',
  { reads: [], match: () => true, describe: 'unconditional; sets 1 max question' },
  { budgets: { maxQuestions: 1 } },
  { specificity: 0 },
)

/** Default move by phase — filled when nothing above matched. */
const b4DefaultAsk = P(
  'B4.default.observe.ask.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'OBSERVE' || i.phase === 'ANCHOR' || i.phase === 'DIAGNOSE', describe: 'anchoring phase → ask observation' },
  { move: 'ASK', actionClass: 'OBSERVATION_QUESTION' },
  { specificity: 1 },
)

const b4DefaultShow = P(
  'B4.default.demonstrate.show.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'DEMONSTRATE' || i.phase === 'NAME', describe: 'demonstrate/name → show' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 1 },
)

const b4DefaultTeach = P(
  'B4.default.guide.teach.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'GUIDE' || i.phase === 'GUIDED' || i.phase === 'FORMALIZE', describe: 'guided phase → teach' },
  { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION' },
  { specificity: 1 },
)

/** The GUIDE phase's ask branch: two teach segments without a question and
 *  the ladder switches to asking. Specificity 2 places it above the phase
 *  default (1); it ties with the D1 grid, which wins the lexical tie-break
 *  ('B4.d1.' sorts before 'B4.default.') — a read of the learner's LAST
 *  ANSWER outranking a count of teach segments is the right authority order,
 *  and it is deterministic either way. */
const b4GuideAsk = P(
  'B4.default.guide-ask.v1', 4,
  'conversationState decideNextMoveHeuristic (GUIDE branch)',
  { reads: ['phase', 'teachSegmentsSinceQuestion'], match: (i) => (i.phase === 'GUIDE' || i.phase === 'GUIDED' || i.phase === 'FORMALIZE') && (i.teachSegmentsSinceQuestion ?? 0) >= 2, describe: 'guided phase, two teach segments without a question → ask' },
  { move: 'ASK', actionClass: 'PROBE' },
  { specificity: 2 },
)

const b4DefaultCheck = P(
  'B4.default.check.ask.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'CHECK' || i.phase === 'ASSESS' || i.phase === 'PRACTICE' || i.phase === 'INDEPENDENT' || i.phase === 'TRANSFER' || i.phase === 'REFLECT', describe: 'check/practice/transfer/reflect → ask' },
  { move: 'ASK', actionClass: 'PROBE' },
  { specificity: 1 },
)

const b4Fallback = P(
  'B4.default.fallback.v1', 4,
  'runtime: kernel deadlock fallback',
  { reads: [], match: () => true, describe: 'unconditional — final default' },
  { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION' },
  { specificity: 0, mandatory: true },
)

// ── Band 5 — Personalization ─────────────────────────────────────────────────

const b5BeginnerBudget = P(
  'B5.personalize.beginner-budget.v1', 5,
  'foundations/03 §5 register + Phase D',
  { reads: ['contentRegister', 'consecutiveFailures'], match: (i) => i.contentRegister === 'beginner', describe: 'beginner register' },
  { budgets: { maxParagraphs: 4, maxNewTerms: 1 } },
  { specificity: 1 },
)

const b5BeginnerStrained = P(
  'B5.personalize.beginner-strained.v1', 5,
  'foundations/04 P5 — no content into a flooded mind',
  { reads: ['contentRegister', 'consecutiveFailures'], match: (i) => i.contentRegister === 'beginner' && i.consecutiveFailures >= 2, describe: 'beginner + strained' },
  { budgets: { maxParagraphs: 2, maxNewTerms: 0 } },
  { specificity: 2 },
)

const b5IntermediateBudget = P(
  'B5.personalize.intermediate-budget.v1', 5,
  'Phase D response budgets',
  { reads: ['contentRegister'], match: (i) => i.contentRegister === 'intermediate', describe: 'intermediate register' },
  { budgets: { maxParagraphs: 7, maxNewTerms: 2 } },
  { specificity: 1 },
)

/**
 * The struggling tier for the other two registers.
 *
 * These rules restore a transcription gap, they do not introduce policy.
 * responseBudget() — the shipping owner these Band-5 rules cite — shortens
 * the reply for EVERY register once consecutiveFailures ≥ 2 (beginner 4→2,
 * intermediate 7→4, expert unlimited→6). The pack implemented that tier for
 * beginner only, so a struggling intermediate learner would have been handed
 * seven paragraphs where the runtime gives four. The golden grid's replay
 * diff surfaced it as a maxParagraphs divergence on 1/3 of all rows.
 *
 * maxNewTerms is deliberately NOT touched here. Only the beginner-strained
 * rule zeroes it, on foundations/04 P5's authority; extending that to other
 * registers would be inventing policy no authored source states, which is
 * exactly what a pack transcribed from a source must not do.
 */
const b5IntermediateStrained = P(
  'B5.personalize.intermediate-strained.v1', 5,
  'Phase D response budgets (responseBudget struggling tier)',
  { reads: ['contentRegister', 'consecutiveFailures'], match: (i) => i.contentRegister === 'intermediate' && i.consecutiveFailures >= 2, describe: 'intermediate + strained' },
  { budgets: { maxParagraphs: 4 } },
  { specificity: 2 },
)

const b5ExpertBudget = P(
  'B5.personalize.expert-budget.v1', 5,
  'Phase D response budgets',
  { reads: ['contentRegister'], match: (i) => i.contentRegister === 'expert', describe: 'expert register' },
  { budgets: { maxParagraphs: null, maxNewTerms: 3 } },
  { specificity: 1 },
)

const b5ExpertStrained = P(
  'B5.personalize.expert-strained.v1', 5,
  'Phase D response budgets (responseBudget struggling tier)',
  { reads: ['contentRegister', 'consecutiveFailures'], match: (i) => i.contentRegister === 'expert' && i.consecutiveFailures >= 2, describe: 'expert + strained' },
  { budgets: { maxParagraphs: 6 } },
  { specificity: 2 },
)

const b5AutonomyHonor = P(
  'B5.personalize.autonomy.v1', 5,
  'runtime: P3 learner autonomy',
  { reads: ['autonomyRequested'], match: (i) => i.autonomyRequested, describe: 'learner asked to move on' },
  { contentSlots: [{ kind: 'autonomy', payload: {}, citation: 'runtime:P3' }] },
  { specificity: 1 },
)

// ── Band 6 — Tie-break / final fallback chain ────────────────────────────────

const b6FallbackChain = P(
  'B6.fallback-chain.default.v1', 6,
  'runtime: kernel P-2 fallback ladder',
  { reads: [], match: () => true, describe: 'unconditional; final default' },
  { fallbackChain: ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'] },
  { specificity: 0, mandatory: true },
)

// ── Assembled pack ──────────────────────────────────────────────────────────

export const BASE_PACK: PolicyPack = {
  // 0.5.0: Band-5 struggling tiers for intermediate/expert (transcription
  // gap against responseBudget). Bumped because a pack whose rules changed
  // under an unchanged version makes the provenance string a lie.
  // 0.6.0: Band-2 ask-legality gate + the two Band-4 gives that replace a
  // blocked question (masterplan K4: "capability gates live HERE").
  // 0.7.0: the Band-4 decision matrix — the six ladder gates the pack was
  // missing, plus the GUIDE ask branch. Band 4 now reproduces
  // decideNextMoveHeuristic in full (proven by ladderParity.test.ts).
  packVersion: '0.7.0-k4',
  rules: [
    b0Recovery,
    b1RetroWin, b1DueReviews,
    b2StageCeiling, b2QuestionBudget, b2AskIllegal, b2FirstLessonVocab, b2BeginnerVocab,
    b4LegalityGiveShow, b4LegalityGiveTeach,
    b4DontKnowGate, b4TotalProbesGate, b4LoopBreakGate, b4ObserveFailureGate,
    b4QuestionBudgetShow, b4QuestionBudgetTeach,
    b4RepeatedStruggle, b4WorkedExampleFirst,
    b4FastWrongConfident, b4HesitantCorrect, b4QuestionCeiling,
    b4DefaultAsk, b4DefaultShow, b4DefaultTeach, b4GuideAsk, b4DefaultCheck, b4Fallback,
    b5BeginnerBudget, b5BeginnerStrained,
    b5IntermediateBudget, b5IntermediateStrained,
    b5ExpertBudget, b5ExpertStrained,
    b5AutonomyHonor,
    b6FallbackChain,
  ],
}

/** Runtime-computed stage ceiling (imported by engine, tagged with the B2
 *  rule id in provenance so the ceiling is auditable). */
export function computeStageCeilingFromPhase(phase: string): number {
  return getStageCeiling(phase)
}
