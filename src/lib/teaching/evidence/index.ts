/**
 * Evidence Engine barrel — writer (Phase 1, W1-3) + reader/analytics/feedback
 * (Phase 2). The evidence loop:
 *
 *   route.ts turn-close ──appendEvidenceEvent──▶ EvidenceEvent (append-only)
 *                                                     │
 *   loadEvidenceCorpus (read-only) ◀────────────────┘
 *        │ readLessonEvidence          normalized LessonEvidence[]
 *        │ attachSpineSignals          + workedExampleUsed/decisionProvenance
 *        │                               (spineSignals.ts, ADR 13 Phase 2 follow-up)
 *        │ computeLearningAnalytics    metrics (subject-agnostic)
 *        │ buildAuthoringFeedback      blueprint/probe/misconception findings
 *        └ buildPackageFeedback        per-Educational-Package summaries
 *
 * Nothing in the read path writes anywhere; packages and blueprints are never
 * edited automatically.
 */
export { appendEvidenceEvent, EvidenceCategory, GradeBand } from './evidenceEngine'
export * from './evidenceReader'
export * from './learningAnalytics'
export * from './authoringFeedback'
export * from './packageFeedback'
export * from './spineSignals'
export {
  loadEvidenceCorpus, artifactPackageIndex, artifactPackageInspector,
  clearEvidencePackageCache,
} from './evidenceLoad'
