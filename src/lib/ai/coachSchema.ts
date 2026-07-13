import { z } from 'zod'

/**
 * Request-body validation for /api/coach. Extracted verbatim from
 * src/app/api/coach/route.ts so it can be imported directly in tests
 * without pulling in that route's other module-scope imports (auth,
 * AI client, rate limiting), some of which can't be imported outside a
 * running Next.js app.
 */
export const coachSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string().max(8000),
    })
  ).max(50),
})
