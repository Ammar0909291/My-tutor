-- Per-message lesson identity, closing the cross-lesson history-leak defect:
-- /api/sessions/history scoped only by (userId, subject), so a returning
-- learner's refresh merged EVERY lesson's messages (and their diagrams/MCQs)
-- into one undifferentiated thread. LearnSession cannot carry this fact — it
-- is (learner x chat session) and can span several lessons in either
-- direction — so the identity is stamped on the message itself.
--
-- Additive and nullable: every existing row keeps working unchanged and
-- simply has no lesson attribution (excluded from the lesson-scoped view,
-- same accepted trade-off as the visualSession/provider migrations before
-- it). Same key format LessonAttempt.lessonKey already uses (lessonKeyFor()
-- in src/lib/teaching/lessonAttempt.ts) — reused, not duplicated.
ALTER TABLE "messages" ADD COLUMN "lessonKey" TEXT;
CREATE INDEX "messages_lessonKey_idx" ON "messages"("lessonKey");
