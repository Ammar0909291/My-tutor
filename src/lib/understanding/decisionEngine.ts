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

    // D-1 — AUTHORED CONTENT ALREADY IN HAND: Explanation Memory assembled
    // this very turn. Honor it (the live runtime serves it without an LLM call).
    if (u.explanationMemoryHits.length > 0) {
      return make(u, 'SERVE_EXPLANATION_MEMORY', 'D1-MEMORY-HIT',
        ['Explanation Memory already assembled ACTIVE authored content for this turn (ADR 14 canonical serving path).'],
        ['explanationMemoryHits'],
        { assetIds: u.explanationMemoryHits.map((h) => h.assetId), conceptId: topicId(u.currentTopic.value) })
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

    // D-3 — STRUGGLING WITH A KNOWN PREREQUISITE: step back one KG edge
    // (placement/05 just-in-time prerequisite repair), never re-teach from zero.
    const prereqId = topicId(u.prerequisiteTopic.value)
    if (u.masteryState.value === 'struggling' && prereqId) {
      return make(u, 'REVIEW_PREREQUISITE', 'D3-PREREQ-REVIEW',
        ['Repeated failures this session with a known KG prerequisite: step back one edge (placement/05 §5 just-in-time repair).'],
        ['masteryState', 'prerequisiteTopic'],
        { prerequisiteId: prereqId, conceptId: topicId(u.currentTopic.value) })
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

    // D-6 — LEARNER ASKED FOR HELP AND A VISUAL EXISTS: serve the visual
    // the existing detection already chose (detectVisual/visualRegistry).
    const visual = u.requiredVisualization.value
    if (u.studentIntent.value === 'requesting_help' && visual !== 'unknown' && visual !== 'none') {
      return make(u, 'VISUALIZATION', 'D6-VISUAL-ON-REQUEST',
        [`Learner explicitly asked for help and the visual pipeline already detected "${visual}" for this content.`],
        ['studentIntent', 'requiredVisualization'],
        { visualType: visual, conceptId: topicId(u.currentTopic.value) })
    }

    // D-7 — HEALTHY PROGRESSION: last answer right, learner is answering/
    // acknowledging mid-lesson → continue.
    if (
      u.masteryState.value === 'progressing' &&
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
