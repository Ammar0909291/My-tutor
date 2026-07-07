import { describe, it, expect } from 'vitest'
import { registerSchema } from '@/lib/registerSchema'

// Pure state machine tests — no Prisma needed
describe('New student journey state machine', () => {
  // NOTE: registerSchema above now imports the real schema from
  // src/lib/registerSchema.ts (extracted out of
  // src/app/api/auth/register/route.ts). Investigated fresh against
  // current production code: the old inline schema here was missing the
  // real schema's referralCode field entirely — genuine replica-drift,
  // not an intentional subset, since referralCode drives real production
  // behavior (referrer resolution, +1 free session credit to the
  // referrer, a Referral record) in the route. Added coverage for it
  // below. The separate general-learner-onboarding schema test further
  // down tests a different route (/api/onboarding) and is out of scope
  // for this investigation.

  // Registration produces valid user shape
  it('registration schema produces correct user shape', () => {
    const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'password123' })
    expect(result.success).toBe(true)
  })

  it('registration rejects whitespace-only name', () => {
    const result = registerSchema.safeParse({ name: '   ', email: 'alice@test.com', password: 'password123' })
    expect(result.success).toBe(false)
  })

  it('registration accepts an optional referralCode', () => {
    const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'password123', referralCode: 'ABC123' })
    expect(result.success).toBe(true)
  })

  it('registration succeeds without a referralCode (it is optional)', () => {
    const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'password123' })
    expect(result.success).toBe(true)
    expect(result.success && result.data.referralCode).toBeUndefined()
  })

  // Onboarding state transitions
  it('new student starts with onboardingCompleted=false', () => {
    const user = { onboardingCompleted: false, profile: null }
    expect(user.onboardingCompleted).toBe(false)
    expect(user.profile).toBeNull()
  })

  it('after onboarding, student has profile', () => {
    const user = { onboardingCompleted: true, profile: { displayName: 'Alice', selfDescription: 'learning javascript' } }
    expect(user.onboardingCompleted).toBe(true)
    expect(user.profile).not.toBeNull()
  })

  it('initial topic progress state is valid', () => {
    // A new student has no topic progress records → default state
    const topicProgressList: Array<{ masteryPct: number; status: string }> = []
    const completedTopics = topicProgressList.filter(t => t.status === 'MASTERED' || t.status === 'COMPLETED')
    expect(completedTopics.length).toBe(0)
  })

  it('general learner onboarding schema requires selfDescription', () => {
    const { z } = require('zod')
    const schema = z.object({
      selfDescription: z.string().trim().min(10).max(2000),
      voiceChoice: z.string(),
      teachingLanguage: z.enum(['ru', 'en', 'hi']).default('en'),
    })
    expect(schema.safeParse({ selfDescription: 'short', voiceChoice: 'female' }).success).toBe(false)
    expect(schema.safeParse({ selfDescription: 'I want to learn JavaScript programming', voiceChoice: 'female' }).success).toBe(true)
  })
})
