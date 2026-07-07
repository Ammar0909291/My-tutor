# Student Learning Memory Audit

Read-only survey. Findings only — no code changes.

## 1. What is persisted per student per topic today

| Model | Key fields (per user/topic-ish key) | Granularity | Lifespan |
|---|---|---|---|
| `TopicProgress` (schema.prisma:334) | `status`, `masteryPct`, `attempts`, `lastScore`, `completedAt`, `revisionCount`, `lastRevisionAt` | per `(userId, subjectSlug, topicSlug)`, unique row | Updated in place — current snapshot only, no history |
| `MistakeRecord` (schema.prisma:420) | `category`, `questionId`, `sessionId`, `createdAt` | per mistake event, append-only | Full event history (one row per mistake) |
| `LearnSession` (schema.prisma:487) | `contextSnapshot` (Json, session-start only), `moodAnalysis` (Json), `summary` | per session | One row per session, append-only at session granularity |
| `LearningCheckpoint` (schema.prisma:441) | `question`, `answer`, `userResponse`, `passed`, `hintUsed`, `kgNodeId`, `chapterId` | per micro-checkpoint event, append-only | Full event history |
| `PracticeSession` (schema.prisma:398) | `questions` (Json), `score`, `kind` | per practice/assessment attempt | Append-only |
| `EvidenceRecord` (schema.prisma:380) | `type`, `score`, `weight`, `notes` | per evidence event | Append-only |
| `RetentionMetric` (schema.prisma:974) | `masteryScore`, `confidenceScore`, `decayScore`, `reviewCount`, `lastReviewedAt` | per `(userId, subjectId, topic)`, unique row | Current snapshot only — **but this table is not read by any of the 5 adaptive engines** (confirmed via grep; it backs the separate, not-yet-fully-wired spaced-repetition feature) |
| `SubjectAnalytics` (schema.prisma:952) | `strongTopics[]`, `weakTopics[]`, `trend` | per `(userId, subjectId)` | Current snapshot only |
| `LearningProfile` (schema.prisma:935) | `confidenceLevel` (Int 0-100), `learningPace`, `preferredDifficulty` | per user (global, not per-topic) | Current snapshot only |
| `StudyStreak` / `ActivityLog` | streak counters, raw activity events | per user (global) | Snapshot + event log |

**Net picture:** the database is rich in raw *event* history (mistakes, checkpoints, practice attempts, sessions) but the *derived classifications* the Teaching Engine actually consumes are never stored anywhere — they are recomputed from the raw events on every single request.

## 2. How the Teaching Engine's 5 input signals are actually produced

Traced `src/lib/school/adaptive/teachingStrategy.ts` → `getTeachingStrategy()`, which calls 5 independent engines in parallel. For every one of them:

| Engine | Reads (raw tables) | Output enum | Ever written to DB? |
|---|---|---|---|
| `masteryIntelligence.ts` (`getMasteryProfile`) | `PracticeSession`, `LearningCheckpoint`, `MistakeRecord`, `TopicProgress` | `MasteryLevel`: `TRUE_MASTERY \| DEVELOPING \| FALSE_MASTERY \| AT_RISK` | **No** |
| `misconceptionEngine.ts` (`getChapterMisconceptions`) | `MistakeRecord`, `LearningCheckpoint` | `confidence`: `HIGH \| MEDIUM \| LOW` (per transient misconception grouping) | **No** |
| `conceptTransfer.ts` (`evaluateConceptTransfer`) | `LearningCheckpoint`, `PracticeSession` | `TransferLevel`: `TRANSFER_STRONG \| TRANSFER_DEVELOPING \| TRANSFER_WEAK` | **No** |
| `confidenceCalibration.ts` (`getConfidenceProfile`) | `LearningCheckpoint` (text keyword analysis of `userResponse`), `PracticeSession` | `CalibrationLevel`: `WELL_CALIBRATED \| OVERCONFIDENT \| UNDERCONFIDENT \| UNCERTAIN` | **No** |
| `learningMomentum.ts` (`getLearningMomentum`) | `StudyStreak`, `PracticeSession`, `LearningCheckpoint`, `TopicProgress` | `MomentumLevel`: `STRONG_MOMENTUM \| STABLE_MOMENTUM \| DECLINING_MOMENTUM \| DISENGAGEMENT_RISK` | **No** |

`determineStrategy()` (teachingStrategy.ts:126) is a pure function over these 5 nullable values, returning one of the 7 `TeachingStrategyType` values. The resulting `TeachingStrategy` object (type + reason + instructions) is injected into the system prompt for that one turn and then discarded — confirmed by grep: no `prisma.*.create/update/upsert` call anywhere references strategy type, output bias, mastery level, calibration, transfer level, or momentum level. `RetentionMetric`, the one table that *does* persist a per-topic `confidenceScore`, is never read by `confidenceCalibration.ts` or any of the other 4 engines — it's wired to a separate, partially-built spaced-repetition feature instead.

## 3. What is NOT persisted that the Teaching Engine would benefit from

**a. Misconception history.** `MistakeRecord` rows exist (raw events), but there is no entity that says "this student has a *standing* misconception about X, first detected on date Y, confidence HIGH, still unresolved." `misconceptionEngine.ts` re-derives a misconception's confidence (HIGH/MEDIUM/LOW) from a rolling 30-day window of `MistakeRecord` + 14-day window of `LearningCheckpoint` every single call. Consequences:
   - A misconception that was correctly repaired 31 days ago and reappears looks identical to a brand-new one — no "this is a recurrence" signal.
   - No way to ask "which misconceptions has this student had across their entire history with this subject," only "what does the last 30 days of mistakes look like."
   - `MISCONCEPTION_REPAIR` strategy has no memory of whether it already fired for this exact misconception last session and whether it worked.

**b. Confidence trajectory.** `confidenceCalibration.ts` derives `OVERCONFIDENT`/`UNDERCONFIDENT`/etc. fresh per call from keyword-matching the student's recent free-text answers (`LearningCheckpoint.userResponse`) against recent scores — there is no stored confidence score over time. Separately, `LearningProfile.confidenceLevel` (Int, schema.prisma:942) *is* a persisted per-user value, but it is global (not per-topic/per-chapter), is never read by `confidenceCalibration.ts`, and nothing in the adaptive layer appears to write to it either (not confirmed by writes search, flagged as worth checking further). Consequences:
   - No way to see whether a student's calibration is improving, stable, or worsening over weeks.
   - `CONFIDENCE_CORRECTION` and `CONFIDENCE_BUILDING` strategies are reactive to a single recent window, not a trend.

**c. Strategy history / outcome tracking.** This is the largest gap. There is no model anywhere in `schema.prisma` that records:
   - which `TeachingStrategyType` fired, for which student, on which topic/chapter, and when;
   - what the 5 input signals were at the time the strategy was chosen;
   - whether mastery/momentum/calibration *improved* in the period after the strategy was applied (i.e., did it work).

   Concretely: `strategyHoisted`/`outputBiasHoisted` (route.ts, added in the recent Teaching Strategy Engine integration) live only as in-memory `let` bindings for the duration of one HTTP request — confirmed via grep, no DB write references them. Every session starts from zero; the engine cannot learn "MOMENTUM_RECOVERY worked for this student last time" or "FOUNDATION_REBUILD was tried twice on this topic and mastery still didn't move."

**d. Cross-signal session linkage.** Each of the 5 engines queries its own independent time window (14/30/7 days) over its own subset of tables, computed in isolation per request. There's no persisted "snapshot" that ties mastery+misconception+transfer+calibration+momentum together as a single point-in-time student state — so two engines run 5 seconds apart in the same request can disagree about "now" if the underlying rows changed between their queries (not yet observed as a bug, but a structural gap worth flagging since nothing prevents it).

## 4. Summary

The system has strong **raw event memory** (every mistake, checkpoint, and practice attempt is logged and never lost) but **zero derived/decision memory**. The Teaching Strategy Engine is, by construction, fully stateless and Markovian — it has amnesia about every strategic decision it has ever made and every misconception it has ever seen, by design (not a bug; the original spec explicitly described it as a pure, per-turn function). The likely next step, if the team wants the engine to actually learn over time, is a small additive table — something like a `TeachingStrategyEvent` log (`userId`, `subjectSlug`, `chapterId`, `strategyType`, `firedAt`, snapshot of the 5 input signals, and a later-filled `outcomeDelta`) — written once per turn alongside the existing strategy computation, with no changes to the existing read-only engines required.
