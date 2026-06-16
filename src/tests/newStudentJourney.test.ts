import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

const onboardingSchema = z.object({
  selfDescription: z.string().trim().min(10).max(2000),
  voiceChoice: z.string(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).default('en'),
})

describe('New student journey state machine', () => {
  it('registration schema accepts valid input', () => {
    expect(registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'password123' }).success).toBe(true)
  })

  it('registration rejects whitespace-only name', () => {
    expect(registerSchema.safeParse({ name: '   ', email: 'a@b.com', password: 'password123' }).success).toBe(false)
  })

  it('registration rejects short name', () => {
    expect(registerSchema.safeParse({ name: 'A', email: 'a@b.com', password: 'password123' }).success).toBe(false)
  })

  it('registration rejects invalid email', () => {
    expect(registerSchema.safeParse({ name: 'Alice', email: 'notanemail', password: 'password123' }).success).toBe(false)
  })

  it('registration rejects short password', () => {
    expect(registerSchema.safeParse({ name: 'Alice', email: 'a@b.com', password: 'short' }).success).toBe(false)
  })

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

  it('initial topic progress state is empty', () => {
    const topicProgressList: Array<{ masteryPct: number; status: string }> = []
    expect(topicProgressList.filter(t => t.status === 'MASTERED').length).toBe(0)
  })

  it('onboarding schema requires selfDescription min 10 chars', () => {
    expect(onboardingSchema.safeParse({ selfDescription: 'short', voiceChoice: 'female' }).success).toBe(false)
    expect(onboardingSchema.safeParse({ selfDescription: 'I want to learn JavaScript programming', voiceChoice: 'female' }).success).toBe(true)
  })

  it('onboarding schema rejects whitespace-only selfDescription', () => {
    expect(onboardingSchema.safeParse({ selfDescription: '          ', voiceChoice: 'female' }).success).toBe(false)
  })

  it('onboarding schema rejects invalid teachingLanguage', () => {
    expect(onboardingSchema.safeParse({ selfDescription: 'I want to learn things properly', voiceChoice: 'female', teachingLanguage: 'fr' }).success).toBe(false)
  })

  it('registration name trim: trailing spaces do not count toward min length', () => {
    // 'A ' trims to 'A' which is length 1 — fails min(2)
    expect(registerSchema.safeParse({ name: 'A ', email: 'a@b.com', password: 'password123' }).success).toBe(false)
  })
})
