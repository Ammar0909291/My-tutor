-- Persisted Active Lesson.
--
-- Additive and nullable. NULL means "no explicit lesson selection is in
-- effect", which is exactly how every row behaves today, so there is
-- deliberately NO backfill: existing learners keep resolving their lesson from
-- currentLesson / topic_progress until their next explicit navigation.
ALTER TABLE "student_progress" ADD COLUMN "activeLessonSlug" TEXT;
