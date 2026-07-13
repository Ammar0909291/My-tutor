-- CreateEnum
CREATE TYPE "PlatformRole" AS ENUM ('STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "EbAbstractionLevel" AS ENUM ('concrete', 'symbolic', 'abstract', 'meta');

-- CreateEnum
CREATE TYPE "EbModality" AS ENUM ('visual', 'numerical', 'symbolic', 'linguistic', 'kinesthetic');

-- CreateEnum
CREATE TYPE "EbEdgeKind" AS ENUM ('prerequisite_of', 'part_of', 'is_a', 'analogous_to', 'commonly_confused_with');

-- CreateEnum
CREATE TYPE "EbMisconScope" AS ENUM ('universal', 'language_specific');

-- CreateEnum
CREATE TYPE "EbBloomLevel" AS ENUM ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create');

-- CreateEnum
CREATE TYPE "EbAssetFamily" AS ENUM ('EXPLANATION', 'VISUAL', 'PROBE');

-- CreateEnum
CREATE TYPE "EbAuthorKind" AS ENUM ('HUMAN_CURATOR', 'AI_AUTHORED', 'AI_AUTHORED_REVIEWED', 'IMPORTED', 'STUDENT_CONTRIBUTION', 'SYSTEM');

-- CreateEnum
CREATE TYPE "EbAssetStatus" AS ENUM ('DRAFT', 'REVIEW', 'ACTIVE', 'SHADOW_ACTIVE', 'EXPERIMENT_VARIANT', 'DEPRECATED', 'RETIRED');

-- CreateEnum
CREATE TYPE "EbGradeBand" AS ENUM ('k_5', 'g_6_8', 'g_9_10', 'g_11_12', 'undergrad', 'postgrad');

-- CreateEnum
CREATE TYPE "EbIPClass" AS ENUM ('public_domain', 'cc_by', 'cc_by_sa', 'proprietary_licensed', 'fair_use', 'pending', 'unknown');

-- CreateEnum
CREATE TYPE "EbVisualRenderer" AS ENUM ('katex', 'recharts', 'three', 'animation', 'interactive_widget');

-- CreateEnum
CREATE TYPE "EbProbeKind" AS ENUM ('mcq', 'true_false', 'short_answer', 'numeric', 'step_check', 'misconception_probe', 'checkpoint');

-- CreateEnum
CREATE TYPE "EbDifficulty" AS ENUM ('foundational', 'developing', 'proficient', 'advanced');

-- CreateEnum
CREATE TYPE "EbSourceKind" AS ENUM ('book', 'video', 'syllabus', 'research', 'expert_dictation', 'external_ai');

-- CreateEnum
CREATE TYPE "EbMisconStatus" AS ENUM ('active', 'repaired', 'escalated');

-- CreateEnum
CREATE TYPE "EbEvidenceCategory" AS ENUM ('ASSET_SHOWN', 'PROBE_OUTCOME', 'MISCONCEPTION_DETECTED', 'LEARNER_FEEDBACK', 'RE_ASK', 'SUMMATIVE_OUTCOME');

-- CreateEnum
CREATE TYPE "EbExperimentKind" AS ENUM ('ASSET_AB', 'STRATEGY_AB', 'RANKING_BANDIT', 'PROMPT_AB');

-- CreateEnum
CREATE TYPE "EbExperimentStatus" AS ENUM ('designing', 'running', 'analyzing', 'shipped', 'aborted');

-- CreateEnum
CREATE TYPE "MasteryLevel" AS ENUM ('NOT_STARTED', 'INTRODUCED', 'DEVELOPING', 'PROFICIENT', 'MASTERED');

-- CreateEnum
CREATE TYPE "MisconceptionStatus" AS ENUM ('ACTIVE', 'REPAIR_IN_PROGRESS', 'REPAIRED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "AssetFamily" AS ENUM ('EXPLANATION', 'VISUAL', 'PROBE');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('DRAFT', 'REVIEW', 'ACTIVE', 'DEPRECATED', 'RETIRED');

-- CreateEnum
CREATE TYPE "AuthorKind" AS ENUM ('HUMAN_CURATOR', 'AI_AUTHORED', 'AI_AUTHORED_REVIEWED', 'IMPORTED');

-- CreateEnum
CREATE TYPE "ExplanationStyle" AS ENUM ('RIGOROUS', 'CONCRETE', 'ANALOGY', 'VISUAL_FIRST');

-- CreateEnum
CREATE TYPE "VisualRenderer" AS ENUM ('KATEX', 'SCENE_SPEC', 'VISUAL_SPEC', 'DYNAMIC_COMPONENT', 'ANIMATION', 'INTERACTIVE_WIDGET');

-- CreateEnum
CREATE TYPE "ProbeDifficulty" AS ENUM ('FOUNDATIONAL', 'DEVELOPING', 'PROFICIENT', 'ADVANCED');

-- CreateEnum
CREATE TYPE "EvidenceCategory" AS ENUM ('ASSET_SHOWN', 'PROBE_OUTCOME', 'MISCONCEPTION_DETECTED', 'LEARNER_FEEDBACK', 'RE_ASK', 'SUMMATIVE_OUTCOME');

-- CreateEnum
CREATE TYPE "GradeBand" AS ENUM ('EARLY', 'ELEMENTARY', 'MIDDLE', 'HIGH', 'UNDERGRADUATE', 'ADULT');

-- AlterEnum
ALTER TYPE "EvidenceType" ADD VALUE 'VISUAL';

-- AlterEnum
ALTER TYPE "SubjectType" ADD VALUE 'COMPUTER_SCIENCE';

-- DropForeignKey
ALTER TABLE "referrals" DROP CONSTRAINT "referrals_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "weekly_xp" DROP CONSTRAINT "weekly_xp_userId_fkey";

-- DropIndex
DROP INDEX "practice_sessions_userId_kind_idx";

-- AlterTable
ALTER TABLE "evidence_records" ADD COLUMN     "engineKey" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "final_assessment_results" ADD COLUMN     "questions" JSONB,
ALTER COLUMN "score" SET DEFAULT 0,
ALTER COLUMN "totalQuestions" SET DEFAULT 0,
ALTER COLUMN "passed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "practice_sessions" ADD COLUMN     "idempotencyKey" TEXT;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "voiceSpeed" DOUBLE PRECISION NOT NULL DEFAULT 1.0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "PlatformRole" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "lesson_bookmarks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "lessonOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter_content_cache" (
    "id" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "summary" TEXT NOT NULL,
    "objectives" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapter_content_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revision_notes_cache" (
    "id" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "subjectSlug" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,
    "noteType" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revision_notes_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaching_strategy_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "outputBias" TEXT NOT NULL,
    "visualFired" BOOLEAN NOT NULL,
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teaching_strategy_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visualization_cache" (
    "id" TEXT NOT NULL,
    "conceptKey" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "renderCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visualization_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_concept" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primaryDomain" TEXT NOT NULL,
    "alsoInDomains" TEXT[],
    "abstractionLevel" "EbAbstractionLevel" NOT NULL,
    "modality" "EbModality"[],
    "authoritativeFormula" TEXT,
    "canonicalDefinitionId" TEXT,
    "difficultyByGrade" JSONB NOT NULL,
    "estimatedMinutesToMastery" JSONB NOT NULL,
    "titleTranslations" JSONB NOT NULL,
    "descriptionTranslations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "eb_concept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_concept_edge" (
    "id" TEXT NOT NULL,
    "fromConceptId" TEXT NOT NULL,
    "toConceptId" TEXT NOT NULL,
    "edgeKind" "EbEdgeKind" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,

    CONSTRAINT "eb_concept_edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_misconception" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scope" "EbMisconScope" NOT NULL DEFAULT 'universal',
    "language" TEXT,
    "prevalenceByGrade" JSONB NOT NULL,
    "detectableByProbeIds" TEXT[],
    "repairableByAssetIds" TEXT[],
    "unrepairableWithoutHuman" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,

    CONSTRAINT "eb_misconception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_concept_misconception" (
    "conceptId" TEXT NOT NULL,
    "misconceptionId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "source" TEXT,

    CONSTRAINT "eb_concept_misconception_pkey" PRIMARY KEY ("conceptId","misconceptionId")
);

-- CreateTable
CREATE TABLE "eb_learning_objective" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleTranslations" JSONB NOT NULL,
    "bloomLevel" "EbBloomLevel" NOT NULL,
    "examplePrompt" TEXT,

    CONSTRAINT "eb_learning_objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_objective_concept" (
    "objectiveId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "eb_objective_concept_pkey" PRIMARY KEY ("objectiveId","conceptId")
);

-- CreateTable
CREATE TABLE "eb_curriculum" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authority" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eb_curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_module" (
    "id" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "estimatedHours" INTEGER NOT NULL,

    CONSTRAINT "eb_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_module_objective" (
    "moduleId" TEXT NOT NULL,
    "objectiveId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "eb_module_objective_pkey" PRIMARY KEY ("moduleId","objectiveId")
);

-- CreateTable
CREATE TABLE "eb_asset_identity" (
    "assetId" TEXT NOT NULL,
    "family" "EbAssetFamily" NOT NULL,
    "familyKind" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "gradeBand" "EbGradeBand" NOT NULL,
    "style" TEXT,
    "authorId" TEXT,
    "authorKind" "EbAuthorKind" NOT NULL,
    "sourceTraceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,
    "parentVersionId" TEXT,
    "status" "EbAssetStatus" NOT NULL DEFAULT 'DRAFT',
    "deprecationReason" TEXT,
    "qualityScore" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "qualityConfidence" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "sampleSize" INTEGER NOT NULL DEFAULT 0,
    "costCents" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "curriculumMappings" JSONB NOT NULL,
    "prerequisiteConceptIds" TEXT[],
    "incompatibilityMisconceptionIds" TEXT[],
    "intellectualProperty" "EbIPClass" NOT NULL DEFAULT 'unknown',

    CONSTRAINT "eb_asset_identity_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "eb_explanation" (
    "assetId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "readingLevel" DOUBLE PRECISION,

    CONSTRAINT "eb_explanation_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "eb_visual" (
    "assetId" TEXT NOT NULL,
    "renderer" "EbVisualRenderer" NOT NULL,
    "specPayload" JSONB NOT NULL,
    "specHash" TEXT NOT NULL,
    "a11yDescription" TEXT NOT NULL,
    "estimatedRenderMs" INTEGER NOT NULL DEFAULT 100,
    "deviceCapabilities" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "eb_visual_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "eb_probe" (
    "assetId" TEXT NOT NULL,
    "probeKind" "EbProbeKind" NOT NULL,
    "stem" TEXT NOT NULL,
    "choices" JSONB NOT NULL,
    "correctValue" JSONB,
    "tolerance" DOUBLE PRECISION,
    "keywords" TEXT[],
    "sampleAnswer" TEXT,
    "difficulty" "EbDifficulty" NOT NULL,
    "discriminationScore" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "targetedMisconceptionIds" TEXT[],
    "requiredVisualAssetIds" TEXT[],

    CONSTRAINT "eb_probe_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "eb_knowledge_acquisition_trace" (
    "traceId" TEXT NOT NULL,
    "sourceKind" "EbSourceKind" NOT NULL,
    "sourceTitle" TEXT NOT NULL,
    "sourceUri" TEXT,
    "contentHash" TEXT NOT NULL,
    "licenseClass" "EbIPClass" NOT NULL,
    "licenseDocumentUri" TEXT,
    "contributedById" TEXT,
    "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "eb_knowledge_acquisition_trace_pkey" PRIMARY KEY ("traceId")
);

-- CreateTable
CREATE TABLE "eb_source_segment" (
    "id" TEXT NOT NULL,
    "traceId" TEXT NOT NULL,
    "segmentIndex" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "pageOrTimestamp" TEXT,
    "segmentHash" TEXT NOT NULL,

    CONSTRAINT "eb_source_segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_learner_concept_mastery" (
    "userId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "masteryScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "masteryConfidence" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "decayedScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "lastSeenAt" TIMESTAMP(3),
    "firstAttemptAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eb_learner_concept_mastery_pkey" PRIMARY KEY ("userId","conceptId","language")
);

-- CreateTable
CREATE TABLE "eb_learner_active_misconception" (
    "userId" TEXT NOT NULL,
    "misconceptionId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "firstDetectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastDetectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repairAttempts" INTEGER NOT NULL DEFAULT 0,
    "status" "EbMisconStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "eb_learner_active_misconception_pkey" PRIMARY KEY ("userId","misconceptionId","language")
);

-- CreateTable
CREATE TABLE "eb_evidence_event" (
    "eventId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "turnId" TEXT,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "conceptId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "gradeBand" "EbGradeBand" NOT NULL,
    "category" "EbEvidenceCategory" NOT NULL,
    "assetId" TEXT,
    "misconceptionId" TEXT,
    "curriculumId" TEXT,
    "outcome" TEXT NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL,
    "rawScore" DOUBLE PRECISION,
    "contextHash" TEXT,

    CONSTRAINT "eb_evidence_event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "eb_asset_score" (
    "assetId" TEXT NOT NULL,
    "gradeBand" "EbGradeBand" NOT NULL,
    "language" TEXT NOT NULL,
    "learningStyle" TEXT NOT NULL DEFAULT '',
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "qualityScore" DOUBLE PRECISION NOT NULL,
    "qualityConfidence" DOUBLE PRECISION NOT NULL,
    "sampleSize" INTEGER NOT NULL,
    "positiveEvents" INTEGER NOT NULL,
    "negativeEvents" INTEGER NOT NULL,

    CONSTRAINT "eb_asset_score_pkey" PRIMARY KEY ("assetId","gradeBand","language","learningStyle","windowEnd")
);

-- CreateTable
CREATE TABLE "eb_brain_config" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "changedBy" TEXT,
    "reason" TEXT,

    CONSTRAINT "eb_brain_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_experiment" (
    "id" TEXT NOT NULL,
    "kind" "EbExperimentKind" NOT NULL,
    "hypothesis" TEXT NOT NULL,
    "primaryMetric" TEXT NOT NULL,
    "arms" JSONB NOT NULL,
    "populationTotalN" INTEGER,
    "status" "EbExperimentStatus" NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "conclusion" TEXT,

    CONSTRAINT "eb_experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eb_experiment_assignment" (
    "userId" TEXT NOT NULL,
    "experimentId" TEXT NOT NULL,
    "armId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eb_experiment_assignment_pkey" PRIMARY KEY ("userId","experimentId")
);

-- CreateTable
CREATE TABLE "concept_mastery_records" (
    "userId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "masteryScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "decayedScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "masteryConfidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "masteryLevel" "MasteryLevel" NOT NULL DEFAULT 'NOT_STARTED',
    "lastProbeOutcome" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "sampleSize" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "concept_mastery_records_pkey" PRIMARY KEY ("userId","conceptId")
);

-- CreateTable
CREATE TABLE "brain_config" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "changedBy" TEXT,
    "reason" TEXT,

    CONSTRAINT "brain_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_misconceptions" (
    "userId" TEXT NOT NULL,
    "misconceptionId" TEXT NOT NULL,
    "topicSlug" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "firstDetectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastDetectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repairAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastRepairAt" TIMESTAMP(3),
    "status" "MisconceptionStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "active_misconceptions_pkey" PRIMARY KEY ("userId","misconceptionId")
);

-- CreateTable
CREATE TABLE "asset_identity" (
    "assetId" TEXT NOT NULL,
    "family" "AssetFamily" NOT NULL,
    "familyKind" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "gradeBand" "GradeBand" NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorKind" "AuthorKind" NOT NULL,
    "status" "AssetStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "parentVersionId" TEXT,
    "canonicalSlug" TEXT NOT NULL,
    "qualityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "qualityConfidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sampleSize" INTEGER NOT NULL DEFAULT 0,
    "contentHash" TEXT NOT NULL,
    "tags" TEXT[],
    "sourceTraceId" TEXT,
    "intellectualProperty" TEXT NOT NULL,
    "curriculumMappings" JSONB NOT NULL,
    "deprecationReason" TEXT,
    "incompatibilities" TEXT[],
    "prerequisites" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_identity_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "explanation_assets" (
    "assetId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "style" "ExplanationStyle" NOT NULL,
    "readingLevel" DOUBLE PRECISION NOT NULL,
    "lengthChars" INTEGER NOT NULL,
    "targetedMisconceptions" TEXT[],

    CONSTRAINT "explanation_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "visual_assets" (
    "assetId" TEXT NOT NULL,
    "renderer" "VisualRenderer" NOT NULL,
    "specPayload" JSONB NOT NULL,
    "a11yDescription" TEXT NOT NULL,

    CONSTRAINT "visual_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "probe_assets" (
    "assetId" TEXT NOT NULL,
    "stem" TEXT NOT NULL,
    "choices" JSONB,
    "correctValue" TEXT,
    "tolerance" DOUBLE PRECISION,
    "keywords" TEXT[],
    "sampleAnswer" TEXT,
    "difficulty" "ProbeDifficulty" NOT NULL,
    "discriminationScore" DOUBLE PRECISION,
    "targetedMisconceptions" TEXT[],
    "requiredVisuals" TEXT[],

    CONSTRAINT "probe_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "evidence_events" (
    "eventId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "turnId" TEXT,
    "conceptId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "gradeBand" "GradeBand" NOT NULL,
    "category" "EvidenceCategory" NOT NULL,
    "assetId" TEXT,
    "misconceptionId" TEXT,
    "curriculumId" TEXT,
    "outcome" TEXT NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL,
    "rawScore" DOUBLE PRECISION,
    "contextHash" TEXT,

    CONSTRAINT "evidence_events_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE INDEX "lesson_bookmarks_userId_subjectCode_idx" ON "lesson_bookmarks"("userId", "subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_bookmarks_userId_subjectCode_lessonOrder_key" ON "lesson_bookmarks"("userId", "subjectCode", "lessonOrder");

-- CreateIndex
CREATE UNIQUE INDEX "chapter_content_cache_board_subjectSlug_grade_chapterId_lan_key" ON "chapter_content_cache"("board", "subjectSlug", "grade", "chapterId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "revision_notes_cache_board_subjectSlug_grade_chapterId_note_key" ON "revision_notes_cache"("board", "subjectSlug", "grade", "chapterId", "noteType", "language");

-- CreateIndex
CREATE INDEX "teaching_strategy_events_userId_topicSlug_idx" ON "teaching_strategy_events"("userId", "topicSlug");

-- CreateIndex
CREATE INDEX "teaching_strategy_events_userId_createdAt_idx" ON "teaching_strategy_events"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "visualization_cache_conceptKey_key" ON "visualization_cache"("conceptKey");

-- CreateIndex
CREATE INDEX "eb_concept_primaryDomain_idx" ON "eb_concept"("primaryDomain");

-- CreateIndex
CREATE INDEX "eb_concept_id_version_idx" ON "eb_concept"("id", "version");

-- CreateIndex
CREATE INDEX "eb_concept_edge_toConceptId_edgeKind_idx" ON "eb_concept_edge"("toConceptId", "edgeKind");

-- CreateIndex
CREATE INDEX "eb_concept_edge_fromConceptId_edgeKind_idx" ON "eb_concept_edge"("fromConceptId", "edgeKind");

-- CreateIndex
CREATE UNIQUE INDEX "eb_concept_edge_fromConceptId_toConceptId_edgeKind_key" ON "eb_concept_edge"("fromConceptId", "toConceptId", "edgeKind");

-- CreateIndex
CREATE INDEX "eb_concept_misconception_misconceptionId_idx" ON "eb_concept_misconception"("misconceptionId");

-- CreateIndex
CREATE INDEX "eb_module_curriculumId_orderIndex_idx" ON "eb_module"("curriculumId", "orderIndex");

-- CreateIndex
CREATE INDEX "eb_module_objective_moduleId_orderIndex_idx" ON "eb_module_objective"("moduleId", "orderIndex");

-- CreateIndex
CREATE INDEX "eb_asset_identity_conceptId_family_familyKind_language_grad_idx" ON "eb_asset_identity"("conceptId", "family", "familyKind", "language", "gradeBand", "status");

-- CreateIndex
CREATE INDEX "eb_asset_identity_conceptId_status_qualityScore_idx" ON "eb_asset_identity"("conceptId", "status", "qualityScore");

-- CreateIndex
CREATE INDEX "eb_asset_identity_status_idx" ON "eb_asset_identity"("status");

-- CreateIndex
CREATE INDEX "eb_asset_identity_costCents_idx" ON "eb_asset_identity"("costCents");

-- CreateIndex
CREATE UNIQUE INDEX "eb_asset_identity_conceptId_family_familyKind_language_grad_key" ON "eb_asset_identity"("conceptId", "family", "familyKind", "language", "gradeBand", "style", "version");

-- CreateIndex
CREATE INDEX "eb_explanation_contentHash_idx" ON "eb_explanation"("contentHash");

-- CreateIndex
CREATE INDEX "eb_visual_renderer_idx" ON "eb_visual"("renderer");

-- CreateIndex
CREATE INDEX "eb_visual_specHash_idx" ON "eb_visual"("specHash");

-- CreateIndex
CREATE INDEX "eb_probe_difficulty_idx" ON "eb_probe"("difficulty");

-- CreateIndex
CREATE INDEX "eb_source_segment_traceId_segmentIndex_idx" ON "eb_source_segment"("traceId", "segmentIndex");

-- CreateIndex
CREATE INDEX "eb_learner_concept_mastery_userId_language_decayedScore_idx" ON "eb_learner_concept_mastery"("userId", "language", "decayedScore");

-- CreateIndex
CREATE INDEX "eb_learner_active_misconception_userId_status_idx" ON "eb_learner_active_misconception"("userId", "status");

-- CreateIndex
CREATE INDEX "eb_evidence_event_assetId_occurredAt_idx" ON "eb_evidence_event"("assetId", "occurredAt");

-- CreateIndex
CREATE INDEX "eb_evidence_event_conceptId_occurredAt_idx" ON "eb_evidence_event"("conceptId", "occurredAt");

-- CreateIndex
CREATE INDEX "eb_evidence_event_userId_occurredAt_idx" ON "eb_evidence_event"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "eb_evidence_event_occurredAt_idx" ON "eb_evidence_event"("occurredAt");

-- CreateIndex
CREATE INDEX "eb_asset_score_assetId_windowEnd_idx" ON "eb_asset_score"("assetId", "windowEnd");

-- CreateIndex
CREATE UNIQUE INDEX "eb_brain_config_name_key" ON "eb_brain_config"("name");

-- CreateIndex
CREATE INDEX "eb_brain_config_name_version_idx" ON "eb_brain_config"("name", "version");

-- CreateIndex
CREATE INDEX "eb_experiment_assignment_experimentId_armId_idx" ON "eb_experiment_assignment"("experimentId", "armId");

-- CreateIndex
CREATE INDEX "concept_mastery_records_userId_masteryLevel_idx" ON "concept_mastery_records"("userId", "masteryLevel");

-- CreateIndex
CREATE INDEX "concept_mastery_records_userId_decayedScore_idx" ON "concept_mastery_records"("userId", "decayedScore");

-- CreateIndex
CREATE UNIQUE INDEX "brain_config_name_key" ON "brain_config"("name");

-- CreateIndex
CREATE INDEX "brain_config_name_effectiveFrom_idx" ON "brain_config"("name", "effectiveFrom");

-- CreateIndex
CREATE INDEX "active_misconceptions_userId_status_idx" ON "active_misconceptions"("userId", "status");

-- CreateIndex
CREATE INDEX "active_misconceptions_userId_topicSlug_idx" ON "active_misconceptions"("userId", "topicSlug");

-- CreateIndex
CREATE INDEX "asset_identity_conceptId_family_familyKind_language_gradeBa_idx" ON "asset_identity"("conceptId", "family", "familyKind", "language", "gradeBand", "status");

-- CreateIndex
CREATE INDEX "asset_identity_canonicalSlug_status_idx" ON "asset_identity"("canonicalSlug", "status");

-- CreateIndex
CREATE INDEX "asset_identity_status_qualityScore_idx" ON "asset_identity"("status", "qualityScore");

-- CreateIndex
CREATE INDEX "evidence_events_userId_conceptId_idx" ON "evidence_events"("userId", "conceptId");

-- CreateIndex
CREATE INDEX "evidence_events_userId_occurredAt_idx" ON "evidence_events"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "evidence_events_sessionId_occurredAt_idx" ON "evidence_events"("sessionId", "occurredAt");

-- CreateIndex
CREATE INDEX "evidence_events_conceptId_category_idx" ON "evidence_events"("conceptId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "evidence_records_userId_subjectSlug_topicSlug_type_engineKe_key" ON "evidence_records"("userId", "subjectSlug", "topicSlug", "type", "engineKey");

-- CreateIndex
CREATE UNIQUE INDEX "practice_sessions_idempotencyKey_key" ON "practice_sessions"("idempotencyKey");

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_xp" ADD CONSTRAINT "weekly_xp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_bookmarks" ADD CONSTRAINT "lesson_bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_concept_edge" ADD CONSTRAINT "eb_concept_edge_fromConceptId_fkey" FOREIGN KEY ("fromConceptId") REFERENCES "eb_concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_concept_edge" ADD CONSTRAINT "eb_concept_edge_toConceptId_fkey" FOREIGN KEY ("toConceptId") REFERENCES "eb_concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_concept_misconception" ADD CONSTRAINT "eb_concept_misconception_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "eb_concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_concept_misconception" ADD CONSTRAINT "eb_concept_misconception_misconceptionId_fkey" FOREIGN KEY ("misconceptionId") REFERENCES "eb_misconception"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_objective_concept" ADD CONSTRAINT "eb_objective_concept_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "eb_learning_objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_objective_concept" ADD CONSTRAINT "eb_objective_concept_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "eb_concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_module" ADD CONSTRAINT "eb_module_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "eb_curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_module_objective" ADD CONSTRAINT "eb_module_objective_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "eb_module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_module_objective" ADD CONSTRAINT "eb_module_objective_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "eb_learning_objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_asset_identity" ADD CONSTRAINT "eb_asset_identity_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "eb_concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_explanation" ADD CONSTRAINT "eb_explanation_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "eb_asset_identity"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_visual" ADD CONSTRAINT "eb_visual_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "eb_asset_identity"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_probe" ADD CONSTRAINT "eb_probe_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "eb_asset_identity"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_source_segment" ADD CONSTRAINT "eb_source_segment_traceId_fkey" FOREIGN KEY ("traceId") REFERENCES "eb_knowledge_acquisition_trace"("traceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eb_experiment_assignment" ADD CONSTRAINT "eb_experiment_assignment_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "eb_experiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concept_mastery_records" ADD CONSTRAINT "concept_mastery_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_misconceptions" ADD CONSTRAINT "active_misconceptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_identity" ADD CONSTRAINT "asset_identity_parentVersionId_fkey" FOREIGN KEY ("parentVersionId") REFERENCES "asset_identity"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "explanation_assets" ADD CONSTRAINT "explanation_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset_identity"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visual_assets" ADD CONSTRAINT "visual_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset_identity"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "probe_assets" ADD CONSTRAINT "probe_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset_identity"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

