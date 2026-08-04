-- Subject Prelude: records when a learner finished a subject's prelude.
-- Additive and nullable: existing rows read NULL (prelude not yet seen),
-- which is exactly the correct default for learners who predate the feature.
ALTER TABLE "student_progress" ADD COLUMN "preludeViewedAt" TIMESTAMP(3);
