import type { VisualIntent } from '@/lib/teaching/visualIntent'

export type TrackLevel = 'T0' | 'T1' | 'T2' | 'T3' | 'T4'

export type ActionType =
  | 'VISUAL_EXPLANATION'
  | 'STEP_BY_STEP_GUIDED'
  | 'INTERACTIVE_QUESTIONING'
  | 'PROBLEM_SOLVING_SESSION'
  | 'MISCONCEPTION_FIX'
  | 'RAPID_REVIEW'

export type TeachingMode = 'teach' | 'reinforce' | 'remediate' | 'accelerate'

export type LearningSpeed = 'slow' | 'normal' | 'fast'
export type FatigueLevel = 'low' | 'medium' | 'high'
export type ConceptType = 'conceptual' | 'application' | 'problem_solving' | 'visual'

export type GraphDifficulty =
  | 'foundational'
  | 'developing'
  | 'proficient'
  | 'advanced'
  | 'expert'
  | 'research'

export interface StudentState {
  level: TrackLevel
  current_concepts_mastered: string[]
  weak_concepts: string[]
  misconceptions: string[]
  retention_score: number        // 0–100
  learning_speed: LearningSpeed
  fatigue_level: FatigueLevel
}

export interface ConceptNode {
  id: string
  domain: string
  prerequisites: string[]
  unlocks: string[]
  difficulty: GraphDifficulty | TrackLevel
  concept_type: ConceptType
  estimated_hours?: number
  bloom?: string
  name?: string
}

export interface LearningHistory {
  recently_attempted: string[]
  success_rate: number           // 0–100
  time_on_task: number           // seconds
  error_patterns: string[]
}

export interface TeachingDecision {
  next_concept: string
  action_type: ActionType
  mode: TeachingMode
  difficulty: TrackLevel
  estimated_time: number         // minutes
  goal: string
  /** WP-7 / handoff VH-1 — the typed VisualIntent projection (Phase 2 §7).
   *
   *  VH-1 is worded as "`visual_type` widens to the typed VisualIntent", but
   *  no `visual_type` field has ever existed on this interface, so there is
   *  nothing to widen: the field is CREATED already typed. That is the
   *  "create, then widen" the work package names, collapsed into one step
   *  because the intermediate state would carry no information.
   *
   *  OPTIONAL, and `decide()` does not populate it. VD-1's admission test,
   *  VD-2's purpose assignment and VD-3's selection funnel are Phase 2 stages
   *  V3/V5 — learner-visible, and outside WP-7. Absent means "no visual
   *  intent was formed", never "no visual". */
  visual_intent?: VisualIntent
}
