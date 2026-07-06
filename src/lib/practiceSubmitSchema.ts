import { z } from 'zod'

/**
 * Request-body validation for /api/practice/submit. Extracted verbatim
 * from src/app/api/practice/submit/route.ts so it can be imported
 * directly in tests without pulling in that route's other module-scope
 * imports (auth, db), which can't be imported outside a running Next.js
 * app.
 */
export const practiceSubmitSchema = z.object({
  subjectSlug: z.string().min(1),
  topicSlug: z.string().min(1),
  questions: z.array(z.object({
    question: z.string(),
    correctIndex: z.number().optional(),
  })).max(100).default([]),
  correct: z.array(z.boolean()).min(1).max(100),
  idempotencyKey: z.string().max(128).optional(),
})
