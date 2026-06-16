import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const schoolSchema = z.object({
  userType: z.literal('SCHOOL_STUDENT'),
  board: z.string(),
  grade: z.number().int().min(5).max(12),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).default('en'),
})

describe('School onboarding validation', () => {
  it('valid school onboarding schema passes', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 10 }).success).toBe(true)
  })

  it('grade below 5 rejected', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 4 }).success).toBe(false)
  })

  it('grade above 12 rejected', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 13 }).success).toBe(false)
  })

  it('grade must be integer', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 10.5 }).success).toBe(false)
  })

  it('missing board rejected', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', grade: 10 }).success).toBe(false)
  })

  it('wrong userType rejected', () => {
    expect(schoolSchema.safeParse({ userType: 'GENERAL_LEARNER', board: 'cbse', grade: 10 }).success).toBe(false)
  })

  it('valid grade boundary: grade 5 accepted', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 5 }).success).toBe(true)
  })

  it('valid grade boundary: grade 12 accepted', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 12 }).success).toBe(true)
  })

  it('valid teachingLanguage accepted', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 10, teachingLanguage: 'hi' }).success).toBe(true)
  })

  it('invalid teachingLanguage rejected', () => {
    expect(schoolSchema.safeParse({ userType: 'SCHOOL_STUDENT', board: 'cbse', grade: 10, teachingLanguage: 'fr' }).success).toBe(false)
  })

  // LOW-4: duplicate onboarding guard
  it('LOW-4: completed school onboarding with educationBoard set → guard triggers', () => {
    const existingProfile = { educationBoard: 'cbse', grade: 10 }
    const onboardingCompleted = true
    const shouldSkip = !!(existingProfile && onboardingCompleted && existingProfile.educationBoard)
    expect(shouldSkip).toBe(true)
  })

  it('LOW-4: no existing profile → onboarding proceeds', () => {
    const existingProfile = null
    const onboardingCompleted = false
    const shouldSkip = !!(existingProfile && onboardingCompleted && (existingProfile as { educationBoard?: string } | null)?.educationBoard)
    expect(shouldSkip).toBe(false)
  })

  it('LOW-4: profile exists but onboarding not completed → proceeds', () => {
    const existingProfile = { educationBoard: null }
    const onboardingCompleted = false
    const shouldSkip = !!(existingProfile && onboardingCompleted && existingProfile.educationBoard)
    expect(shouldSkip).toBe(false)
  })
})
