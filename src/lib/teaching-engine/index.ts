import type {
  StudentState,
  ConceptNode,
  LearningHistory,
  TeachingDecision,
  TeachingMode,
  ActionType,
  TrackLevel,
} from './types'

// ── Track helpers ─────────────────────────────────────────────────────────────

const TRACK_ORDER: TrackLevel[] = ['T0', 'T1', 'T2', 'T3', 'T4']

const DIFF_TO_TRACK: Record<string, TrackLevel> = {
  foundational: 'T0',
  developing:   'T1',
  proficient:   'T1',
  advanced:     'T2',
  expert:       'T3',
  research:     'T4',
}

function toTrack(diff: string): TrackLevel {
  if (TRACK_ORDER.includes(diff as TrackLevel)) return diff as TrackLevel
  return DIFF_TO_TRACK[diff] ?? 'T0'
}

function trackIndex(t: TrackLevel): number { return TRACK_ORDER.indexOf(t) }

function bumpTrack(t: TrackLevel, delta: number): TrackLevel {
  return TRACK_ORDER[Math.min(Math.max(trackIndex(t) + delta, 0), TRACK_ORDER.length - 1)]
}

// ── Step 1: Determine teaching mode ──────────────────────────────────────────

function decideMode(
  student: StudentState,
  concept: ConceptNode,
  history: LearningHistory,
): TeachingMode {
  const isConceptWeak =
    student.weak_concepts.includes(concept.id) ||
    student.misconceptions.includes(concept.id)
  const anyWeakness =
    student.weak_concepts.length > 0 || student.misconceptions.length > 0

  if (isConceptWeak || (anyWeakness && history.success_rate < 60)) return 'remediate'

  if (
    student.learning_speed === 'fast' &&
    student.retention_score > 85 &&
    student.fatigue_level === 'low' &&
    history.success_rate > 80
  ) return 'accelerate'

  if (
    history.recently_attempted.includes(concept.id) &&
    history.success_rate >= 60 &&
    history.success_rate < 80
  ) return 'reinforce'

  return 'teach'
}

// ── Step 2: Select next concept ───────────────────────────────────────────────
// Priority matrix:
//   remediate  → a weak/misconception prerequisite, else first weak concept
//   reinforce  → same concept
//   accelerate → best accessible unlock (not yet mastered, all requires met)
//   teach      → same concept unless already mastered, then best unlock

function selectNextConcept(
  student: StudentState,
  concept: ConceptNode,
  mode: TeachingMode,
): string {
  const mastered = new Set(student.current_concepts_mastered)

  if (mode === 'remediate') {
    // Prefer a prerequisite that is explicitly weak or a misconception
    const prereqGap = concept.prerequisites.find(
      p => student.weak_concepts.includes(p) || student.misconceptions.includes(p),
    )
    if (prereqGap) return prereqGap
    // Fall back to any weak concept the student has
    if (student.weak_concepts.length > 0) return student.weak_concepts[0]
    return concept.id
  }

  if (mode === 'reinforce') return concept.id

  // teach / accelerate: if current concept is already mastered, advance
  if (mastered.has(concept.id) && concept.unlocks.length > 0) {
    const accessible = concept.unlocks.filter(uid => !mastered.has(uid))
    if (accessible.length > 0) return accessible[0]
  }

  return concept.id
}

// ── Step 3: Determine action type ────────────────────────────────────────────

function decideActionType(
  nextConceptId: string,
  concept: ConceptNode,
  student: StudentState,
  mode: TeachingMode,
  history: LearningHistory,
): ActionType {
  if (student.misconceptions.includes(nextConceptId)) return 'MISCONCEPTION_FIX'
  if (mode === 'remediate') return 'STEP_BY_STEP_GUIDED'
  if (mode === 'reinforce' && history.success_rate > 80) return 'RAPID_REVIEW'
  if (mode === 'accelerate') return 'PROBLEM_SOLVING_SESSION'
  // teach — route by concept_type
  switch (concept.concept_type) {
    case 'visual':          return 'VISUAL_EXPLANATION'
    case 'conceptual':      return 'INTERACTIVE_QUESTIONING'
    case 'problem_solving': return 'PROBLEM_SOLVING_SESSION'
    case 'application':     return 'STEP_BY_STEP_GUIDED'
  }
  return 'INTERACTIVE_QUESTIONING'
}

// ── Step 4: Assign difficulty ─────────────────────────────────────────────────

function decideDifficulty(
  nextConceptId: string,
  concept: ConceptNode,
  mode: TeachingMode,
): TrackLevel {
  const base = toTrack(concept.difficulty as string)
  if (concept.prerequisites.includes(nextConceptId)) return bumpTrack(base, -1)
  if (mode === 'accelerate') return bumpTrack(base, +1)
  return base
}

// ── Step 5: Estimate time (minutes) ──────────────────────────────────────────

const TRACK_BASE_MINUTES: Record<TrackLevel, number> = {
  T0: 10, T1: 15, T2: 20, T3: 30, T4: 45,
}

function estimateTime(
  concept: ConceptNode,
  mode: TeachingMode,
  student: StudentState,
): number {
  const track = toTrack(concept.difficulty as string)
  let minutes = concept.estimated_hours
    ? concept.estimated_hours * 60
    : TRACK_BASE_MINUTES[track]

  // Speed multipliers
  if (student.learning_speed === 'fast') minutes *= 0.7
  if (student.learning_speed === 'slow') minutes *= 1.4

  // Mode multipliers
  if (mode === 'reinforce') minutes *= 0.6
  if (mode === 'accelerate') minutes *= 0.8
  if (mode === 'remediate') minutes *= 1.2

  // Fatigue caps
  if (student.fatigue_level === 'high')   minutes = Math.min(minutes, 15)
  if (student.fatigue_level === 'medium') minutes = Math.min(minutes, 25)

  return Math.max(5, Math.round(minutes))
}

// ── Step 6: Define goal ───────────────────────────────────────────────────────

const BLOOM_VERBS: Record<string, string> = {
  remember:  'Recall and recognise',
  understand: 'Understand and explain',
  apply:     'Apply',
  analyze:   'Analyse',
  evaluate:  'Evaluate',
  create:    'Construct',
}

function buildGoal(
  nextConceptId: string,
  concept: ConceptNode,
  mode: TeachingMode,
): string {
  const label = concept.name ?? nextConceptId
  const verb = (concept.bloom && BLOOM_VERBS[concept.bloom]) || 'Master'

  if (mode === 'remediate') return `Resolve prerequisite gap in ${label} before progressing`
  if (mode === 'reinforce') return `Strengthen retention of ${label} through spaced practice`
  if (mode === 'accelerate') return `Advance to ${nextConceptId} with minimal scaffolding`
  return `${verb} ${label}`
}

// ── Public API ────────────────────────────────────────────────────────────────

export function decide(
  student: StudentState,
  concept: ConceptNode,
  history: LearningHistory,
): TeachingDecision {
  const mode          = decideMode(student, concept, history)
  const next_concept  = selectNextConcept(student, concept, mode)
  const action_type   = decideActionType(next_concept, concept, student, mode, history)
  const difficulty    = decideDifficulty(next_concept, concept, mode)
  const estimated_time = estimateTime(concept, mode, student)
  const goal          = buildGoal(next_concept, concept, mode)

  return { next_concept, action_type, mode, difficulty, estimated_time, goal }
}
