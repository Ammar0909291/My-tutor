import { z } from 'zod'

/**
 * School-student branch of POST /api/onboarding's request-body validation.
 * Extracted verbatim from src/app/api/onboarding/route.ts so it can be
 * imported directly in tests without pulling in that route's other
 * module-scope imports (auth, db, curriculum catalog), which can't be
 * imported outside a running Next.js app.
 */
export const schoolOnboardingSchema = z.object({
  userType: z.literal('SCHOOL_STUDENT'),
  board: z.string(),
  grade: z.number().int().min(5).max(12),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).default('en'),
})
