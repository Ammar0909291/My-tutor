/**
 * Educational Brain — shared types for the Decision Pipeline.
 * Stages 0–2 only (Frame, Intent, Retrieval). Physics-scoped, read-only.
 * Feature-flagged: ENABLE_EDUCATIONAL_BRAIN_PIPELINE (default OFF).
 */

export type QuestionShape = 'definitional' | 'procedural' | 'why' | 'meta' | 'off_topic'
export type StudentEmotion = 'engaged' | 'frustrated' | 'confident' | 'confused' | null
export type ConversationMode = 'school' | 'personal_tutor' | 'placement' | 'review'

export interface IntentClassification {
  questionShape: QuestionShape
  topicSurfaces: string[]   // EbConcept.id values that the message likely touches
  studentEmotion: StudentEmotion
}

export interface ConceptNeighbor {
  conceptId: string
  title: string
  edgeKind: string
  weight: number
  direction: 'prerequisite' | 'dependent'
}

export interface ConceptContext {
  id: string
  title: string
  description: string
  primaryDomain: string
  neighbors: ConceptNeighbor[]
}

export interface AssetBundle {
  explanationIds: string[]
  visualIds: string[]
  probeIds: string[]
}

export interface PipelineSpan {
  stage: string
  startedAt: number
  durationMs: number
  notes?: string
}

export interface TurnContext {
  // ── Inputs (set by frameStage) ──────────────────────────────────────────
  turnId: string
  userId: string
  sessionId: string
  subjectSlug: string | null
  userMessage: string
  receivedAt: number   // Date.getTime()

  // ── Set by intentStage ──────────────────────────────────────────────────
  intent: IntentClassification | null

  // ── Set by retrievalStage ───────────────────────────────────────────────
  candidateConcept: string | null    // EbConcept.id
  conceptContext: ConceptContext | null
  candidateAssets: AssetBundle | null

  // ── Cross-cutting ────────────────────────────────────────────────────────
  shortCircuit: string | null
  spans: PipelineSpan[]
}
