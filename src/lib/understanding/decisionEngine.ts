/**
 * Decision Engine v1 — Milestone 2 of the Educational Brain Runtime
 * (owner-approved 2026-07-21). SHADOW MODE ONLY.
 *
 * Consumes the CUE's StudentTurnUnderstanding (Milestone 1) and produces
 * one typed TeachingDecision per turn. In v1 the decision is LOGGED and
 * nothing else: it changes no prompt, no DB row, no control flow — the
 * existing runtime (teaching-engine decide(), recoveryGuard preemption,
 * Explanation Memory serving, strategy blocks) continues to drive the
 * turn exactly as before. The decision trace exists so shadow logs can be
 * compared against what the runtime actually did, BEFORE any activation.
 *
 * One Decision Engine only — relationship to existing deciders (reused,
 * not duplicated):
 *  - src/lib/teaching-engine/index.ts decide(): remains the live concept-
 *    progression engine. This engine does not re-implement its mastery
 *    math; it reads the CUE's already-fused state instead.
 *  - recoveryGuard: its detection (surfaced as conversationIntent
 *    'recovery') PREEMPTS every content decision here, mirroring the live
 *    injected-LAST recovery block (decision-engine/03 §0).
 *  - Explanation Memory: assembleLesson()'s result (surfaced as
 *    explanationMemoryHits) is honored, never re-matched.
 *  - Visualization: detectVisual()/visualRegistry's already-computed
 *    result (surfaced as requiredVisualization) is honored, never re-run.
 *
 * The rule ladder is deterministic and ordered by the Brain's priority
 * bands (affect > cognitive > drive; D1 grid for fragile/struggling).
 * Every decision carries the rule id that fired, the STU fields it read,
 * and a confidence inherited from those readings. Pure function — no I/O,
 * no model calls, never throws.
 */
import type { StudentTurnUnderstanding } from './types'

export type TeachingDecisionType =
  | 'SERVE_EXPLANATION_MEMORY' // authored content already assembled for this turn
  | 'ASK_DIAGNOSTIC_QUESTION'  // placement/diagnosis probe before teaching on
  | 'DETECT_MISCONCEPTION'     // route into the misconception repair machinery
  | 'REVIEW_PREREQUISITE'      // step back to the KG prerequisite
  | 'TEACH_DIRECTLY'           // stop probing — no known prerequisite to target; explain with an example
  | 'CONTINUE_LESSON'          // progression is healthy — proceed
  | 'PRACTICE'                 // consolidate before advancing (D1 FRAGILE quadrant)
  | 'VISUALIZATION'            // serve the already-detected visual aid
  | 'ESCALATE_TO_LLM'          // open conversation / recovery / insufficient evidence

export interface TeachingDecision {
  version: 1
  computedAt: string
  /** v1 is shadow-mode only: logged, never acted on. */
  shadow: true
  decision: TeachingDecisionType
  /** Stable id of the ladder rule that fired (for shadow-log comparison). */
  ruleId: string
  /** Human-readable trace: why this decision, citing the Brain rule. */
  rationale: string[]
  /** STU field names that determined the decision. */
  inputsUsed: string[]
  /** Trust in the decision = the weakest reading it depended on (0..1). */
  confidence: number
  /** Decision-specific payload for a future consumer. */
  parameters: {
    conceptId?: string
    prerequisiteId?: string
    visualType?: string
    misconceptionLabel?: string
    assetIds?: string[]
  }
}

function minConfidence(u: StudentTurnUnderstanding, fields: string[]): number {
  const scores = fields
    .map((f) => u.confidenceScores[f])
    .filter((s): s is number => typeof s === 'number')
  if (scores.length === 0) return 0
  return Math.min(...scores)
}

function make(
  u: StudentTurnUnderstanding,
  decision: TeachingDecisionType,
  ruleId: string,
  rationale: string[],
  inputsUsed: string[],
  parameters: TeachingDecision['parameters'] = {},
): TeachingDecision {
  return {
    version: 1,
    computedAt: new Date().toISOString(),
    shadow: true,
    decision,
    ruleId,
    rationale,
    inputsUsed,
    confidence: minConfidence(u, inputsUsed),
    parameters,
  }
}

/** Strip the "(Title)" suffix the Progress Reader appends to KG topic values. */
function topicId(value: string): string | undefined {
  if (value === 'unknown' || value === 'none') return undefined
  const space = value.indexOf(' (')
  return space === -1 ? value : value.slice(0, space)
}

/**
 * The deterministic decision ladder. Order IS the specification:
 * affect preemption first (decision-engine/03 §0), then evidence already
 * in hand (memory, misconceptions), then the D1 grid's struggle handling,
 * then diagnosis, then healthy progression — LLM escalation is the
 * explicit floor for open conversation and honest ignorance, never an
 * implicit fallthrough.
 */
export function decideTeaching(u: StudentTurnUnderstanding): TeachingDecision {
  try {
    // D-0 — RECOVERY PREEMPTS EVERYTHING (affect band; decision-engine/03 §0).
    // The live runtime renders recovery scripts through the LLM (recoveryGuard
    // block injected LAST), so the shadow decision is LLM escalation with the
    // recovery rationale — never a content decision into a flooded mind.
    if (u.conversationIntent.value === 'recovery' || u.studentIntent.value === 'expressing_distress') {
      return make(u, 'ESCALATE_TO_LLM', 'D0-RECOVERY-PREEMPT',
        ['Affect band preempts all content decisions (decision-engine/03 §0).',
         'Recovery scripts are rendered by the LLM under the recoveryGuard block already injected by the runtime.'],
        ['conversationIntent', 'studentIntent'])
    }

    // D-0b — CLOSING IS PROTECTED (Milestone 5 P0 fix; decision-engine/07 §6
    // + Correction 2): the affect budget is spent — NO content decision may
    // fire past this point, not even serving authored memory. Unresolved
    // states become the close's open loop / next-session queue; the close
    // script (already injected by sessionLifecycle) renders through the LLM.
    if (u.conversationIntent.value === 'session_closing') {
      return make(u, 'ESCALATE_TO_LLM', 'D0b-CLOSING-PROTECT',
        ['The session is CLOSING (affect budget spent): no new content, practice, probes, or repair may start (decision-engine/07 §6).',
         'Unresolved cognitive states are queued for the next session, never resolved inside the close (decision-matrix Correction 2).'],
        ['conversationIntent'])
    }

    // D-0c — LESSON ONE IS PROTOCOL-BOUND (Milestone 5 P0 fix; first-lesson/02
    // §2 + 04 §1): the first-lesson flow (anchor → demonstrate → echo →
    // ONE solo) outranks every generic content decision. The protocol block
    // already injected by firstLessonGuard directs the renderer.
    if (u.conversationIntent.value === 'first_lesson') {
      return make(u, 'ESCALATE_TO_LLM', 'D0c-FIRST-LESSON-PROTOCOL',
        ['First-lesson protocol is active: the locked lesson-one flow outranks generic practice/progression decisions (first-lesson/02 §2, 04 §1).',
         'The firstLessonGuard block already injected directs the renderer.'],
        ['conversationIntent'])
    }

    // D-0e — SEMANTIC QUESTION LOOP (P0-4 fix): 2+ consecutive assistant
    // turns asked the SAME underlying question in different words (e.g.
    // "have you seen X" then "can you think of X") — recognized by INTENT
    // (conversationState.ts's isPriorKnowledgeProbe classifier), not exact
    // phrase matching. Reuses TEACH_DIRECTLY outright (P0-2's decision, no
    // new type): continuing to probe would just repeat the loop a third
    // time. The turn-directive block already injected (extended for this
    // fix with the semantic-loop line) directs the renderer to switch to
    // demonstration/example/visualization instead of asking again.
    if (u.conversationIntent.value === 'question_loop') {
      return make(u, 'TEACH_DIRECTLY', 'D0e-QUESTION-LOOP-BREAK',
        ['The last two assistant turns asked equivalent-intent questions in different words — a semantic loop, not genuine progression.',
         'Switch to direct explanation/example/visualization; the buildTurnDirective SHOW block already injected directs the renderer.'],
        ['conversationIntent'],
        { conceptId: topicId(u.currentTopic.value) })
    }

    // D-0d — SESSION OPENING IS PROTOCOL-BOUND (P0-1 lesson-introduction
    // fix): a fresh episode boundary on a non-first lesson outranks generic
    // content decisions the same way D0c protects lesson one — the learner
    // has not yet been welcomed, recapped, or told this lesson's objective,
    // so no misconception repair/practice/progression call may open the
    // turn instead. The buildOpeningBlock block already injected (extended
    // for this fix with the objective/why-it-matters/connection directive)
    // directs the renderer.
    if (u.conversationIntent.value === 'session_opening') {
      return make(u, 'ESCALATE_TO_LLM', 'D0d-SESSION-OPENING-PROTOCOL',
        ['A fresh session/episode boundary is open: the lesson-opening protocol (welcome, recap, objective, why it matters, connection to the previous lesson) outranks generic content decisions until it is delivered.',
         'The buildOpeningBlock block already injected by the runtime directs the renderer.'],
        ['conversationIntent'])
    }

    // D-2 — HIGH-CONFIDENCE MISCONCEPTION: route into the existing repair
    // machinery (misconceptionEngine → elicit→commit→collide sequence).
    const highMisconception = u.misconceptionCandidates.find((m) => m.confidence === 'HIGH')
    if (highMisconception) {
      return make(u, 'DETECT_MISCONCEPTION', 'D2-MISCONCEPTION-HIGH',
        [`Misconception "${highMisconception.label}" detected at HIGH confidence (${highMisconception.evidenceCount} evidence records).`,
         'Repair outranks progression: teaching on top of an active misconception compounds it (misconceptions/ repair law).'],
        ['misconceptionCandidates' as string],
        { misconceptionLabel: highMisconception.label, conceptId: topicId(u.currentTopic.value) })
    }

    // D-2b — CONFIDENT-WRONG SIGNATURE (Milestone 6, migrated from route.ts's
    // LAST-ANSWER READ overlay): wrong answer given with high confidence is
    // the D1 grid's dangerous quadrant — a committed wrong rule. Repair
    // (elicit → commit → collide) before any new content, even without an
    // engine-catalogued misconception to name.
    if (u.masteryState.value === 'misconceiving') {
      return make(u, 'DETECT_MISCONCEPTION', 'D2b-CONFIDENT-WRONG',
        ['Last answer was wrong with HIGH stated confidence — the misconception signature (D1 grid dangerous quadrant, foundations/02 §1).',
         'Do not spot-correct and move on: elicit the reasoning, get commitment, collide it with one breaking case (misconceptions/ 7-step repair).'],
        ['masteryState'],
        { conceptId: topicId(u.currentTopic.value) })
    }

    // D-6 — LEARNER ASKED FOR A DIAGRAM AND A VISUAL EXISTS (P1 reasoning
    // reorder: moved ABOVE practice/prereq/placement — a student who asks
    // for a diagram after failing gets the diagram, not a drill). Serves
    // the visual the existing detection already chose. The request KIND
    // must match (Milestone 5 P0 fix): a diagram answers a diagram request
    // only.
    const visual = u.requiredVisualization.value
    if (
      u.studentIntent.value === 'requesting_help' &&
      u.conversationSummary.helpRequestKind === 'diagram' &&
      visual !== 'unknown' && visual !== 'none'
    ) {
      return make(u, 'VISUALIZATION', 'D6-VISUAL-ON-REQUEST',
        [`Learner explicitly asked for a diagram and the visual pipeline already detected "${visual}" for this content.`],
        ['studentIntent', 'requiredVisualization'],
        { visualType: visual, conceptId: topicId(u.currentTopic.value) })
    }

    // D-4b — ANSWER THE STUDENT FIRST (P1 Human Teacher Reasoning fix): a
    // genuine question or help request is NEVER drilled past. An expert
    // teacher answers what was actually asked — re-explains, gives the
    // example — before any practice, prerequisite review, probe, or canned
    // content. Outranks memory serving too: a stored explanation keyed to
    // the concept is not an answer to the student's specific question.
    if (u.studentIntent.value === 'asking_question' || u.studentIntent.value === 'requesting_help') {
      return make(u, 'ESCALATE_TO_LLM', 'D4b-ANSWER-STUDENT-FIRST',
        ['The student asked something (a question or an explicit help request): respond to what they actually said before any teaching move.',
         'Never drill past a question — unanswered questions teach the learner to stop asking (conversation-engine register law).'],
        ['studentIntent'])
    }

    // D-1 — AUTHORED CONTENT ALREADY IN HAND: Explanation Memory assembled
    // this very turn. Honor it (the live runtime serves it without an LLM
    // call). Sits BELOW the answer-student-first rule: canned content never
    // overrides a direct question (P1 reasoning reorder).
    if (u.explanationMemoryHits.length > 0) {
      return make(u, 'SERVE_EXPLANATION_MEMORY', 'D1-MEMORY-HIT',
        ['Explanation Memory already assembled ACTIVE authored content for this turn (ADR 14 canonical serving path).'],
        ['explanationMemoryHits'],
        { assetIds: u.explanationMemoryHits.map((h) => h.assetId), conceptId: topicId(u.currentTopic.value) })
    }

    // D-3 — STRUGGLING WITH A KNOWN PREREQUISITE: step back one KG edge
    // (placement/05 just-in-time prerequisite repair), never re-teach from zero.
    const prereqId = topicId(u.prerequisiteTopic.value)
    if (u.masteryState.value === 'struggling' && prereqId) {
      return make(u, 'REVIEW_PREREQUISITE', 'D3-PREREQ-REVIEW',
        ['Repeated failures this session with a known KG prerequisite: step back one edge (placement/05 §5 just-in-time repair).'],
        ['masteryState', 'prerequisiteTopic'],
        { prerequisiteId: prereqId, conceptId: topicId(u.currentTopic.value) })
    }

    // D-3b — STOP PROBING, TEACH DIRECTLY (P0-2 fix): the same repeated-
    // struggle signal D3 reads (2+ consecutive non-landing turns — the
    // SIGNAL tag's correctness/confidence read, folded across turns; never
    // a hardcoded phrase list), but with NO known KG prerequisite to step
    // back to. Continuing to probe/ask past this point just repeats the
    // same failure; a human teacher stops eliciting and demonstrates
    // instead (foundations/03 grid — SHOW, not ASK, once struggle is
    // established). Mirrors the live conversationState.ts consecutiveFailures
    // >= 2 → 'show' transition; this is its CUE/Decision Engine counterpart.
    if (u.masteryState.value === 'struggling' && !prereqId) {
      return make(u, 'TEACH_DIRECTLY', 'D3b-STOP-PROBING-TEACH-DIRECTLY',
        ['Repeated non-landing turns this session with no KG prerequisite to target: further probing/diagnostic questioning would just repeat the same failure.',
         'Switch to direct explanation with a concrete worked example — demonstrate, do not interrogate (conversationState.ts SHOW semantics).'],
        ['masteryState'],
        { conceptId: topicId(u.currentTopic.value) })
    }

    // D-4 — PLACEMENT STILL UNVERIFIED: keep diagnosing before teaching on
    // (placementVerification three-bracket protocol, assessment/02).
    if (u.progressState.value === 'placement_in_progress') {
      return make(u, 'ASK_DIAGNOSTIC_QUESTION', 'D4-PLACEMENT-PROBE',
        ['Placement verification probes are still in flight — diagnose before teaching (assessment/02 binary-search protocol).'],
        ['progressState'],
        { conceptId: topicId(u.currentTopic.value) })
    }

    // D-5 — FRAGILE: consolidate, don't advance (D1 grid FRAGILE quadrant:
    // hesitant-correct / recent failure → practice holds the rung).
    if (u.masteryState.value === 'fragile') {
      return make(u, 'PRACTICE', 'D5-FRAGILE-CONSOLIDATE',
        ['Last answer wrong or failure banked this session: the D1 grid routes FRAGILE to consolidation practice, not advancement.'],
        ['masteryState'],
        { conceptId: topicId(u.currentTopic.value) })
    }

    // D-7 — HEALTHY PROGRESSION: last answer right, learner is answering/
    // acknowledging mid-lesson → continue. P1 reasoning fix: a HEDGED
    // answer ("maybe 12?", "is it 4?") is never blind-continued — the
    // teacher grounds it first (falls to the open floor, where the
    // renderer responds to the tentative answer naturally).
    if (
      u.masteryState.value === 'progressing' &&
      !u.conversationSummary.hedged &&
      (u.studentIntent.value === 'answering' || u.studentIntent.value === 'acknowledging')
    ) {
      return make(u, 'CONTINUE_LESSON', 'D7-PROGRESSING-CONTINUE',
        ['Last answer correct with no failures banked and the learner is engaged with the current thread — proceed.'],
        ['masteryState', 'studentIntent'],
        { conceptId: topicId(u.currentTopic.value) })
    }

    // D-8 — FLOOR: open questions, session openings/closings, and honest
    // ignorance all go to the LLM — the explicit catch-all, never implicit.
    return make(u, 'ESCALATE_TO_LLM', 'D8-LLM-FLOOR',
      ['No deterministic rule above fired (open conversation, session boundary, or insufficient evidence): the LLM renders the turn, as the runtime already does.',
       ...(u.uncertainty.length > 0 ? [`Unresolved uncertainty this turn: ${u.uncertainty.length} field(s).`] : [])],
      ['studentIntent', 'conversationIntent', 'masteryState'])
  } catch {
    // The engine must never break a turn, even on a malformed STU.
    return {
      version: 1, computedAt: new Date().toISOString(), shadow: true,
      decision: 'ESCALATE_TO_LLM', ruleId: 'D9-ENGINE-ERROR',
      rationale: ['Decision Engine error — defaulting to the LLM floor.'],
      inputsUsed: [], confidence: 0, parameters: {},
    }
  }
}
