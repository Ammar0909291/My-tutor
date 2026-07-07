// Student Memory Engine — public API
// Phase 2A: Foundation (read pipeline only)
// Phase 2B adds: update pipeline
// Phase 2C adds: Teaching Engine integration
// Phase 2D adds: adaptive engine (forgetting curves, review scheduling)
// Phase 2E adds: strategy selection
// Phase 2F adds: action selection
// Phase 2G adds: recommendation intelligence
// Phase 2H adds: assessment intelligence

export type {
  LearnerMemory,
  WeakConcept,
  DetectedMisconception,
  TopicRetentionState,
  TeachingMemorySnapshot,
  TrackLevel,
  LearningSpeed,
  FatigueLevel,
} from './types'

export {
  readLearnerMemory,
  readLearnerMemoryFromPreload,
  toTeachingSnapshot,
} from './service'

export {
  updateMemoryFromPractice,
  updateMemoryFromAssessment,
  updateMemoryFromLesson,
} from './update-pipeline'
