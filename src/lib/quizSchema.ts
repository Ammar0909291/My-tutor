import { z } from 'zod'

/**
 * Request-body validation for /api/quiz/generate. Extracted verbatim from
 * src/app/api/quiz/generate/route.ts so it can be imported directly in
 * tests without pulling in that route's other module-scope imports (auth,
 * AI client), which can't be imported outside a running Next.js app.
 */
export const quizSchema = z.object({
  subject: z.string().min(1).max(200),
  topic: z.string().max(200).optional(),
  lang: z.enum(['ru', 'en', 'hi']).default('en'),
})
