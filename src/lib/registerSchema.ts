import { z } from 'zod'

/**
 * Request-body validation for POST /api/auth/register. Extracted verbatim
 * from src/app/api/auth/register/route.ts so it can be imported directly
 * in tests without pulling in that route's other module-scope imports
 * (bcryptjs, db, email, rate limiting), which can't be imported outside a
 * running Next.js app.
 */
export const registerSchema = z.object({
  // LOW-1: trim before length check so "  A " (3 chars, 1 non-space) is rejected.
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  referralCode: z.string().optional(),
})
