/**
 * Learning Orchestrator — the decision layer between Student Intelligence
 * and the Educational Brain.
 *
 *   Student ▶ Student Intelligence ▶ [Learning Orchestrator] ▶ Educational
 *   Brain ▶ Educational Package ▶ Tutor Max
 *
 * Produces exactly ONE deterministic LearningIntent per call. It decides
 * WHAT to work on and WHAT KIND of teaching to request — it never generates
 * lessons (that stays with the Educational Brain / Package Runtime / Tutor
 * Max) and never replaces the Brain's in-lesson decide() machinery.
 *
 * Relationship to the EXISTING orchestrator (no parallel architecture):
 * `src/lib/school/adaptive/learningOrchestrator.ts` is ADR 11's
 * Cross-Session Planner for School Mode — it walks board/grade CHAPTERS and
 * produces dashboard recommendations with hrefs. THIS module is the
 * concept-level intent layer over the canonical KG + Student Intelligence
 * (ADR 11's Library-mode tier, previously absent). Different input model
 * (StudentIntelligence vs school progress rows), different output
 * (LearningIntent for the Brain vs a dashboard card), same design rules:
 * deterministic, priority-ordered, exactly one result.
 *
 * Reused vocabularies (nothing invented):
 *   - action families: the compiler's closed actionClass set
 *     (blueprintFrontend/lowering.ts PRIMITIVE_ACTION_CLASS_TABLE).
 *   - decision priorities: decision-engine/03's affect/cognitive band order,
 *     placement/05's just-in-time prerequisite repair, student-state/03's
 *     regrowth priority, decision-engine/07's spaced-review scheduling.
 *
 * Pure and deterministic: profile + curriculum in, intent out. No prisma,
 * no fs, no clock reads (the profile's asOf IS the clock).
 */
import type { StudentIntelligence, MisconceptionState, ConceptState } from '../studentIntelligence/studentIntelligence'

// ── Inputs ───────────────────────────────────────────────────────────────────

/** One curriculum concept as the orchestrator needs it — id + prerequisites
 *  in authored (entry) order. Built from the existing subject KG adapters by
 *  the loader; injected here so the core stays pure. */
export interface CurriculumConcept {
  conceptId: string
  prerequisites: string[]
}

export interface OrchestratorContext {
  /** the learner's curriculum, in the subject's authored entry order */
  curriculum: CurriculumConcept[]
  /** conceptId → compiled Educational Package identity (null = none) */
  packageIndex?: (conceptId: string) => { packageId: string } | null
}

export interface OrchestratorThresholds {
  /** probe pass rate below which a started concept still needs work */
  continueBelowPassRate: number
  /** forgetting risk at/above which a review is due */
  reviewAtRisk: number
  /** confident-wrong events (net of hesitant-right) to trigger calibration */
  calibrationAtConfidentWrong: number
  /** minimum probe outcomes before a concept counts as "verified enough" to advance past */
  advanceMinProbes: number
}

export const DEFAULT_ORCHESTRATOR_THRESHOLDS: OrchestratorThresholds = {
  continueBelowPassRate: 0.7,
  reviewAtRisk: 0.5,
  calibrationAtConfidentWrong: 2,
  advanceMinProbes: 2,
}

// ── Output: the canonical LearningIntent ─────────────────────────────────────

export type LearningMode =
  | 'remediate'   // repair an active misconception first — it corrupts everything downstream
  | 'continue'    // keep working the current struggling concept
  | 'review'      // spaced review of decayed prior knowledge before new content
  | 'calibrate'   // confidence calibration: the learner is confidently wrong
  | 'advance'     // prerequisites hold — move to the next frontier concept
  | 'start'       // no evidence yet — begin at the curriculum entry point

/** Action family vocabulary = the compiler's closed actionClass set
 *  (lowering.ts). The Brain's rule layer already dispatches on these. */
export type TeachingActionFamily =
  | 'MISCONCEPTION_REPAIR'
  | 'DIAGNOSTIC_PROBE'
  | 'PREREQUISITE_CHECK'
  | 'CONCRETE_HOOK'
  | 'FORMULA_INTRODUCTION'
  | 'GUIDED_PRACTICE'
  | 'INDEPENDENT_PRACTICE'
  | 'CLOSURE'
  | 'GUIDED_EXPLANATION'

export interface LearningIntent {
  userId: string
  /** the Student Intelligence read-time this intent derives from */
  asOf: Date
  mode: LearningMode
  targetConceptId: string | null
  /** compiled Educational Package for the target, when one exists */
  packageId: string | null
  /** the single highest-priority misconception to address (mode remediate) */
  misconceptionToAddress: {
    id: string
    conceptId: string
    detections: number
    regrowths: number
    phrases: string[]
  } | null
  /** which Teaching Action family the Brain should lead with */
  actionFamily: TeachingActionFamily
  /** retrieval practice should open the session (due decayed concepts exist) */
  retrievalPracticeNeeded: boolean
  /** concepts due for spaced review, highest forgetting risk first */
  spacedReviewDue: Array<{ conceptId: string; risk: number }>
  /** the learner is systematically confident-wrong — puncture before advancing */
  confidenceCalibrationNeeded: boolean
  /** every decision cites its evidence — an unexplainable intent is an
   *  invented intent (student-state/09) */
  rationale: string[]
}

// ── Decision helpers ─────────────────────────────────────────────────────────

/** Misconception priority (student-state/03): regrowth is the loudest alarm
 *  (repair burned once already), then detection count, then recency; concept
 *  id breaks remaining ties deterministically. */
export function prioritizeMisconceptions(active: MisconceptionState[]): MisconceptionState[] {
  return [...active].sort(
    (a, b) =>
      b.regrowths - a.regrowths ||
      b.detections - a.detections ||
      b.lastDetectedAt.getTime() - a.lastDetectedAt.getTime() ||
      a.conceptId.localeCompare(b.conceptId) ||
      a.id.localeCompare(b.id),
  )
}

/** A concept counts as HELD (safe to build on) when mastered, or verified
 *  passing at/above the continue threshold with enough probe evidence. */
function isHeld(c: ConceptState | undefined, t: OrchestratorThresholds): boolean {
  if (!c) return false
  if (c.mastered) return true
  return c.probeOutcomes >= t.advanceMinProbes && (c.probePassRate ?? 0) >= t.continueBelowPassRate
}

/** The advancement frontier: first curriculum concept (entry order) that is
 *  not yet held and whose prerequisites are all held. Falls back to the
 *  first unheld concept's missing prerequisite (just-in-time repair,
 *  placement/05) when the frontier is blocked. */
export function findFrontier(
  curriculum: CurriculumConcept[],
  states: Map<string, ConceptState>,
  t: OrchestratorThresholds,
): { conceptId: string; blockedOnPrerequisite: string | null } | null {
  for (const c of curriculum) {
    if (isHeld(states.get(c.conceptId), t)) continue
    const missing = c.prerequisites.find((p) => !isHeld(states.get(p), t))
    // A missing prerequisite the learner has EVIDENCE on is a real block →
    // just-in-time repair. A prerequisite with no evidence at all only blocks
    // if it appears in the curriculum before this concept (untaught ≠ failed
    // for placement-granted entry points).
    if (missing !== undefined) {
      const missingState = states.get(missing)
      if (missingState) return { conceptId: c.conceptId, blockedOnPrerequisite: missing }
      const missingInCurriculum = curriculum.some((cc) => cc.conceptId === missing)
      if (missingInCurriculum) return { conceptId: missing, blockedOnPrerequisite: null }
    }
    return { conceptId: c.conceptId, blockedOnPrerequisite: null }
  }
  return null
}

// ── The orchestrator ─────────────────────────────────────────────────────────

export function orchestrate(
  profile: StudentIntelligence,
  context: OrchestratorContext,
  thresholds: OrchestratorThresholds = DEFAULT_ORCHESTRATOR_THRESHOLDS,
): LearningIntent {
  const t = thresholds
  const rationale: string[] = []
  const states = new Map(profile.conceptStates.map((c) => [c.conceptId, c]))
  const packageOf = (conceptId: string | null): string | null =>
    conceptId ? (context.packageIndex?.(conceptId)?.packageId ?? null) : null

  // Standing flags — computed once, reported on EVERY intent so the Brain
  // can weave them in regardless of the primary mode.
  const spacedReviewDue = profile.forgettingRisks
    .filter((r) => r.risk >= t.reviewAtRisk)
    .filter((r) => {
      const c = states.get(r.conceptId)
      return c !== undefined && (c.mastered || (c.probePassRate ?? 0) >= t.continueBelowPassRate)
    })
  const retrievalPracticeNeeded = spacedReviewDue.length > 0
  const netConfidentWrong = profile.confidence.confidentWrongCount - profile.confidence.hesitantRightCount
  const confidenceCalibrationNeeded = netConfidentWrong >= t.calibrationAtConfidentWrong

  const base = {
    userId: profile.userId,
    asOf: profile.asOf,
    retrievalPracticeNeeded,
    spacedReviewDue,
    confidenceCalibrationNeeded,
  }

  // Priority 1 — no evidence at all: start at the curriculum entry point.
  if (profile.evidenceBase.lessons === 0) {
    const first = context.curriculum[0] ?? null
    rationale.push('no lesson evidence exists for this learner — begin at the curriculum entry point with a diagnostic opening (placement/03 mode A)')
    return {
      ...base,
      mode: 'start',
      targetConceptId: first?.conceptId ?? null,
      packageId: packageOf(first?.conceptId ?? null),
      misconceptionToAddress: null,
      actionFamily: 'DIAGNOSTIC_PROBE',
      rationale,
    }
  }

  // Priority 2 — active misconception: repair preempts everything content-
  // shaped (decision-engine/03 §0: RECOVERY/repair-band preemption; a
  // corrupted prerequisite metastasizes, misconceptions/07).
  const activeMcs = prioritizeMisconceptions(profile.activeMisconceptions)
  if (activeMcs.length > 0) {
    const mc = activeMcs[0]
    rationale.push(
      `active misconception "${mc.id}" on ${mc.conceptId} (${mc.detections} detection(s), ${mc.regrowths} regrowth(s)) — repair before any new content; regrowth outranks detection count in priority`,
    )
    return {
      ...base,
      mode: 'remediate',
      targetConceptId: mc.conceptId,
      packageId: packageOf(mc.conceptId),
      misconceptionToAddress: {
        id: mc.id, conceptId: mc.conceptId,
        detections: mc.detections, regrowths: mc.regrowths, phrases: mc.phrases,
      },
      actionFamily: 'MISCONCEPTION_REPAIR',
      rationale,
    }
  }

  // Priority 3 — confidence calibration: systematically confident-wrong
  // learners must be punctured BEFORE more content lands on a miscalibrated
  // model (assessment/04; the D1 grid's dangerous quadrant).
  if (confidenceCalibrationNeeded) {
    const worst = [...profile.conceptStates]
      .filter((c) => c.probeOutcomes > 0 && !c.mastered)
      .sort((a, b) => (a.probePassRate ?? 0) - (b.probePassRate ?? 0) || a.conceptId.localeCompare(b.conceptId))[0] ?? null
    rationale.push(
      `net confident-wrong count ${netConfidentWrong} ≥ ${t.calibrationAtConfidentWrong} — calibration probes before advancement (confidently-held error is the dangerous quadrant)`,
    )
    return {
      ...base,
      mode: 'calibrate',
      targetConceptId: worst?.conceptId ?? null,
      packageId: packageOf(worst?.conceptId ?? null),
      misconceptionToAddress: null,
      actionFamily: 'DIAGNOSTIC_PROBE',
      rationale,
    }
  }

  // Priority 4 — continue a struggling, already-started concept: never
  // abandon an open failure to chase new content (decision-engine/07's
  // stuck-concept protocol runs INSIDE the lesson; here we just route back).
  const struggling = profile.conceptStates
    .filter((c) => !c.mastered && c.probeOutcomes > 0 && (c.probePassRate ?? 0) < t.continueBelowPassRate)
    .sort(
      (a, b) =>
        b.lastEvidenceAt.getTime() - a.lastEvidenceAt.getTime() ||
        a.conceptId.localeCompare(b.conceptId),
    )
  if (struggling.length > 0) {
    const c = struggling[0]
    rationale.push(
      `concept ${c.conceptId} is started but not held (pass rate ${((c.probePassRate ?? 0) * 100).toFixed(0)}% over ${c.probeOutcomes} probes, ${c.retries} retr${c.retries === 1 ? 'y' : 'ies'}) — continue it before anything new`,
    )
    return {
      ...base,
      mode: 'continue',
      targetConceptId: c.conceptId,
      packageId: packageOf(c.conceptId),
      misconceptionToAddress: null,
      actionFamily: 'GUIDED_PRACTICE',
      rationale,
    }
  }

  // Priority 5 — spaced review due: decayed prior knowledge is reviewed
  // BEFORE new content (decision-engine/07 §2: due reviews open the session).
  if (spacedReviewDue.length > 0) {
    const due = spacedReviewDue[0]
    rationale.push(
      `spaced review due: ${due.conceptId} at forgetting risk ${(due.risk * 100).toFixed(0)}% ≥ ${(t.reviewAtRisk * 100).toFixed(0)}% — retrieval before new content beats re-teaching after decay`,
    )
    return {
      ...base,
      mode: 'review',
      targetConceptId: due.conceptId,
      packageId: packageOf(due.conceptId),
      misconceptionToAddress: null,
      actionFamily: 'INDEPENDENT_PRACTICE',
      rationale,
    }
  }

  // Priority 6 — advance along the curriculum frontier.
  const frontier = findFrontier(context.curriculum, states, t)
  if (frontier) {
    if (frontier.blockedOnPrerequisite) {
      rationale.push(
        `frontier concept ${frontier.conceptId} is blocked on prerequisite ${frontier.blockedOnPrerequisite} with failing evidence — just-in-time prerequisite repair (placement/05) targets the prerequisite, not the frontier`,
      )
      return {
        ...base,
        mode: 'continue',
        targetConceptId: frontier.blockedOnPrerequisite,
        packageId: packageOf(frontier.blockedOnPrerequisite),
        misconceptionToAddress: null,
        actionFamily: 'PREREQUISITE_CHECK',
        rationale,
      }
    }
    const isNew = !states.has(frontier.conceptId)
    rationale.push(
      isNew
        ? `all held prerequisites satisfied — advance to ${frontier.conceptId} (first exposure: concrete anchor before formalism)`
        : `advance to ${frontier.conceptId} — started but insufficient probe evidence to count as held; verify with practice`,
    )
    return {
      ...base,
      mode: 'advance',
      targetConceptId: frontier.conceptId,
      packageId: packageOf(frontier.conceptId),
      misconceptionToAddress: null,
      actionFamily: isNew ? 'CONCRETE_HOOK' : 'GUIDED_PRACTICE',
      rationale,
    }
  }

  // Priority 7 — curriculum exhausted: everything held. Maintain via review
  // of the highest-risk concept, or close.
  const anyRisk = profile.forgettingRisks[0] ?? null
  rationale.push('every curriculum concept is held — maintenance mode: review the highest forgetting-risk concept')
  return {
    ...base,
    mode: 'review',
    targetConceptId: anyRisk?.conceptId ?? null,
    packageId: packageOf(anyRisk?.conceptId ?? null),
    misconceptionToAddress: null,
    actionFamily: 'INDEPENDENT_PRACTICE',
    rationale,
  }
}
