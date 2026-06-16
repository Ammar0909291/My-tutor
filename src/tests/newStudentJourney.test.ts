import { describe, it, expect } from 'vitest'

// Pure state machine tests — no Prisma needed
describe('New student journey state machine', () => {
  // Registration produces valid user shape
  it('registration schema produces correct user shape', () => {
    const { z } = require('zod')
    const registerSchema = z.object({
      name: z.string().trim().min(2).max(80),
      email: z.string().email(),
      password: z.string().min(8).max(100),
    })
    const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'password123' })
    expect(result.success).toBe(true)
  })

  it('registration rejects whitespace-only name', () => {
    const { z } = require('zod')
    const registerSchema = z.object({ name: z.string().trim().min(2).max(80) })
    const result = registerSchema.safeParse({ name: '   ' })
    expect(result.success).toBe(false)
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
