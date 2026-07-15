-- Persist which driver (memory | groq | yandex | fallback) generated each
-- ASSISTANT message, so the AI badge survives page reloads / history
-- restores instead of only existing for the in-memory turn just received.
-- Additive, nullable — existing rows read as NULL (no badge), matching the
-- "no false positives" rule for messages generated before this column
-- existed.
ALTER TABLE "messages" ADD COLUMN "provider" TEXT;
