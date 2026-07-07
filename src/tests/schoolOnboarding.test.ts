import { describe, it, expect } from 'vitest'
import { schoolOnboardingSchema as schoolSchema } from '@/lib/schoolOnboardingSchema'
import { shouldSkipSchoolOnboarding } from '@/lib/schoolOnboardingGuard'

// NOTE: schoolSchema above now imports the real schema from
// src/lib/schoolOnboardingSchema.ts (extracted out of
// src/app/api/onboarding/route.ts). Verified an exact, field-for-field
// match via an automated diff directly against both file contents before
// extracting. The LOW-4 tests below now import the real
// shouldSkipSchoolOnboarding() decision, extracted from
// handleSchoolStudent's `existing && user?.onboardingCompleted &&
// existing.educationBoard` guard — the two DB lookups feeding it and the
// enclosing transaction remain in the route.

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
    const existingProfile = { educationBoard: 'cbse' }
    expect(shouldSkipSchoolOnboarding(existingProfile, true)).toBe(true)
  })

  it('LOW-4: no existing profile → onboarding proceeds', () => {
    expect(shouldSkipSchoolOnboarding(null, false)).toBe(false)
  })

  it('LOW-4: profile exists but onboarding not completed → proceeds', () => {
    const existingProfile = { educationBoard: null }
    expect(shouldSkipSchoolOnboarding(existingProfile, false)).toBe(false)
  })

  it('LOW-4: profile exists, onboarding completed, but educationBoard not yet set → proceeds', () => {
    const existingProfile = { educationBoard: null }
    expect(shouldSkipSchoolOnboarding(existingProfile, true)).toBe(false)
  })
})
