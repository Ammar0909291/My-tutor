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
}
