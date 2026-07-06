/**
 * PHASE 5 — Input bounds tests.
 * Validates Zod schemas directly without hitting routes or DB.
 */
import { describe, it, expect } from 'vitest'
import { coachSchema } from '@/lib/ai/coachSchema'
import { settingsSchema } from '@/lib/settingsSchema'
import { quizSchema } from '@/lib/quizSchema'
import { practiceSubmitSchema as practiceSchema } from '@/lib/practiceSubmitSchema'

// All four schemas below now import the real production schemas
// (src/lib/ai/coachSchema.ts, src/lib/settingsSchema.ts,
// src/lib/quizSchema.ts, src/lib/practiceSubmitSchema.ts — each extracted
// out of its respective route) instead of hand-copied local replicas.
// Investigated settingsSchema specifically: the old local replica here had
// only 2 of the real schema's 4 fields (missing country, voiceSpeed) with
// no comment, other test, or design convention anywhere suggesting that
// was an intentional subset — genuine replica-drift, not a deliberate
// scope choice. Fixed by importing the real schema; the describe blocks
// below cover the previously-untested country/voiceSpeed bounds.
// Investigated quizSchema and practiceSchema separately: both were exact,
// field-for-field matches to their real schemas (confirmed by direct
// whitespace-normalized diff against the current route files, re-read
// fresh rather than assumed — practiceSchema's route had already been
// refactored twice in earlier QA passes, though not its schema) — no
// drift, nothing missing. Extracted anyway for the same reason coachSchema
// was: an un-imported duplicate that happens to be accurate today is
// exactly how settingsSchema's drift started.

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

describe('Settings country bounds', () => {
  it('accepts each valid country literal', () => {
    expect(() => settingsSchema.parse({ country: 'ru' })).not.toThrow()
    expect(() => settingsSchema.parse({ country: 'in' })).not.toThrow()
    expect(() => settingsSchema.parse({ country: 'global' })).not.toThrow()
  })

  it('rejects a country value outside the enum', () => {
    expect(() => settingsSchema.parse({ country: 'us' })).toThrow()
  })

  it('country is optional', () => {
    expect(() => settingsSchema.parse({})).not.toThrow()
  })
})

describe('Settings voiceSpeed bounds', () => {
  it('accepts each valid voiceSpeed literal', () => {
    for (const speed of [0.5, 0.75, 1.0, 1.25, 1.5]) {
      expect(() => settingsSchema.parse({ voiceSpeed: speed })).not.toThrow()
    }
  })

  it('rejects a voiceSpeed value not in the fixed set', () => {
    expect(() => settingsSchema.parse({ voiceSpeed: 2.0 })).toThrow()
  })

  it('voiceSpeed is optional', () => {
    expect(() => settingsSchema.parse({})).not.toThrow()
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
