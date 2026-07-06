/**
 * PHASE 5 — Input bounds tests.
 * Validates Zod schemas directly without hitting routes or DB.
 */
import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { coachSchema } from '@/lib/ai/coachSchema'

// NOTE: coachSchema above now imports the real schema from
// src/lib/ai/coachSchema.ts (extracted out of src/app/api/coach/route.ts).
// quizSchema/settingsSchema/practiceSchema below are still local replicas —
// out of scope for this pass (one schema at a time); note settingsSchema
// in particular is already missing two real fields (country, voiceSpeed)
// present in src/app/api/settings/route.ts's schema, a pre-existing drift
// for a future investigation.

// Quiz schema (from /api/quiz/generate/route.ts)
const quizSchema = z.object({
  subject: z.string().min(1).max(200),
  topic: z.string().max(200).optional(),
  lang: z.enum(['ru', 'en', 'hi']).default('en'),
})

// Settings schema (from /api/settings/route.ts)
const settingsSchema = z.object({
  voiceId: z.string().max(100).optional(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).optional(),
})

// Practice schema (from /api/practice/submit/route.ts)
const practiceSchema = z.object({
  subjectSlug: z.string().min(1),
  topicSlug: z.string().min(1),
  questions: z.array(z.object({ question: z.string(), correctIndex: z.number().optional() })).max(100).default([]),
  correct: z.array(z.boolean()).min(1).max(100),
  idempotencyKey: z.string().max(128).optional(),
})

describe('Coach message bounds', () => {
  it('accepts valid messages array', () => {
    const payload = { messages: [{ role: 'user', content: 'hello' }] }
    expect(() => coachSchema.parse(payload)).not.toThrow()
  })

  it('rejects messages array exceeding 50 items', () => {
    const payload = { messages: Array.from({ length: 51 }, () => ({ role: 'user', content: 'x' })) }
    expect(() => coachSchema.parse(payload)).toThrow()
  })

  it('rejects message content exceeding 8000 chars', () => {
    const payload = { messages: [{ role: 'user', content: 'a'.repeat(8001) }] }
    expect(() => coachSchema.parse(payload)).toThrow()
  })

  it('accepts content at exactly 8000 chars', () => {
    const payload = { messages: [{ role: 'user', content: 'a'.repeat(8000) }] }
    expect(() => coachSchema.parse(payload)).not.toThrow()
  })
})

describe('Quiz generation bounds', () => {
  it('accepts valid subject within 200 chars', () => {
    expect(() => quizSchema.parse({ subject: 'math' })).not.toThrow()
  })

  it('rejects subject exceeding 200 chars', () => {
    expect(() => quizSchema.parse({ subject: 'a'.repeat(201) })).toThrow()
  })

  it('rejects empty subject', () => {
    expect(() => quizSchema.parse({ subject: '' })).toThrow()
  })

  it('rejects topic exceeding 200 chars', () => {
    expect(() => quizSchema.parse({ subject: 'math', topic: 'a'.repeat(201) })).toThrow()
  })
})

describe('Settings voiceId bounds', () => {
  it('accepts voiceId within 100 chars', () => {
    expect(() => settingsSchema.parse({ voiceId: 'female' })).not.toThrow()
  })

  it('rejects voiceId exceeding 100 chars', () => {
    expect(() => settingsSchema.parse({ voiceId: 'a'.repeat(101) })).toThrow()
  })
})

describe('Practice submit array bounds', () => {
  it('accepts correct array within 100', () => {
    const payload = { subjectSlug: 's', topicSlug: 't', correct: Array(100).fill(true) }
    expect(() => practiceSchema.parse(payload)).not.toThrow()
  })

  it('rejects correct array exceeding 100', () => {
    const payload = { subjectSlug: 's', topicSlug: 't', correct: Array(101).fill(true) }
    expect(() => practiceSchema.parse(payload)).toThrow()
  })

  it('rejects empty correct array', () => {
    const payload = { subjectSlug: 's', topicSlug: 't', correct: [] }
    expect(() => practiceSchema.parse(payload)).toThrow()
  })

  it('accepts idempotencyKey within 128 chars', () => {
    const payload = { subjectSlug: 's', topicSlug: 't', correct: [true], idempotencyKey: 'k'.repeat(128) }
    expect(() => practiceSchema.parse(payload)).not.toThrow()
  })

  it('rejects idempotencyKey exceeding 128 chars', () => {
    const payload = { subjectSlug: 's', topicSlug: 't', correct: [true], idempotencyKey: 'k'.repeat(129) }
    expect(() => practiceSchema.parse(payload)).toThrow()
  })
})
