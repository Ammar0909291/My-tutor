import { z } from 'zod'

/**
 * Request-body validation for PATCH /api/settings. Extracted verbatim from
 * src/app/api/settings/route.ts so it can be imported directly in tests
 * without pulling in that route's other module-scope imports (auth, db),
 * which can't be imported outside a running Next.js app.
 */
export const settingsSchema = z.object({
  voiceId: z.string().max(100).optional(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).optional(),
  country: z.enum(['ru', 'in', 'global']).optional(),
  voiceSpeed: z.union([
    z.literal(0.5), z.literal(0.75), z.literal(1.0), z.literal(1.25), z.literal(1.5),
  ]).optional(),
})
