/**
 * Pure-function tests for the automatic Knowledge Growth pipeline (Phase 5):
 * lesson decomposition, probe extraction, candidate validation, and the
 * capture-health tracker. No Prisma, no DB — matching this suite's existing
 * DB-independent convention.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { decomposeLesson } from '@/lib/teaching/assets/lessonDecomposition'
import { extractProbes } from '@/lib/teaching/assets/probeExtraction'
import { validateExplanationCandidate, validateProbeCandidate } from '@/lib/teaching/assets/validation'
import { captureTracker } from '@/lib/teaching/assets/captureTracker'

describe('decomposeLesson', () => {
  it('returns the whole lesson as core_explanation when no headings are present', () => {
    const sections = decomposeLesson('Gravity pulls objects toward the center of the Earth.')
    expect(sections).toEqual([
      { familyKind: 'core_explanation', content: 'Gravity pulls objects toward the center of the Earth.' },
    ])
  })

  it('never invents a section that is not labelled in the text', () => {
    const sections = decomposeLesson('Gravity is a force. It affects everything with mass.')
    expect(sections.some((s) => s.familyKind === 'summary')).toBe(false)
    expect(sections.some((s) => s.familyKind === 'faq')).toBe(false)
  })

  it('splits out a labelled Summary section from the core explanation', () => {
    const lesson = [
      'Gravity is a force that pulls objects toward the Earth.',
      '',
      '**Summary:**',
      'Gravity always pulls mass toward mass.',
    ].join('\n')
    const sections = decomposeLesson(lesson)
    expect(sections).toEqual([
      { familyKind: 'core_explanation', content: 'Gravity is a force that pulls objects toward the Earth.' },
      { familyKind: 'summary', content: 'Gravity always pulls mass toward mass.' },
    ])
  })

  it('supports an inline heading with content on the same line', () => {
    const lesson = 'Explaining velocity.\n\nMemory trick: think "VD" for Velocity = Distance/time.'
    const sections = decomposeLesson(lesson)
    expect(sections).toContainEqual({ familyKind: 'memory_trick', content: 'think "VD" for Velocity = Distance/time.' })
  })

  it('extracts multiple labelled sections in document order', () => {
    const lesson = [
      'Core idea: momentum is mass times velocity.',
      '',
      'Real-world example:',
      'A truck has more momentum than a bicycle at the same speed.',
      '',
      'FAQ:',
      'Q: Is momentum a vector? A: Yes.',
      '',
      'Common misconception:',
      'Momentum is not the same as force.',
    ].join('\n')
    const sections = decomposeLesson(lesson)
    expect(sections.map((s) => s.familyKind)).toEqual([
      'core_explanation', 'real_world_example', 'faq', 'common_misconception_note',
    ])
  })

  it('skips a heading whose body is empty rather than emitting a blank asset', () => {
    const lesson = 'Some explanation text.\n\nSummary:\n\nFAQ:\nWhy does this matter? Because physics.'
    const sections = decomposeLesson(lesson)
    expect(sections.some((s) => s.familyKind === 'summary')).toBe(false)
    expect(sections.some((s) => s.familyKind === 'faq')).toBe(true)
  })
})

describe('extractProbes', () => {
  it('extracts an MCQ with lettered options and an explicit answer line', () => {
    const lesson = [
      'What is the SI unit of force?',
      'A) Joule',
      'B) Newton',
      'C) Watt',
      'D) Pascal',
      'Answer: B',
    ].join('\n')
    const probes = extractProbes(lesson)
    expect(probes).toHaveLength(1)
    expect(probes[0].probeKind).toBe('mcq')
    expect(probes[0].stem).toBe('What is the SI unit of force?')
    expect(probes[0].choices).toHaveLength(4)
    expect(probes[0].choices?.find((c) => c.text === 'Newton')?.isCorrect).toBe(true)
    expect(probes[0].choices?.filter((c) => c.isCorrect)).toHaveLength(1)
  })

  it('detects the correct choice from an inline (correct) marker', () => {
    const lesson = ['Which planet is closest to the sun?', 'A) Venus', 'B) Mercury (correct)', 'C) Earth'].join('\n')
    const probes = extractProbes(lesson)
    expect(probes[0].choices?.find((c) => c.text === 'Mercury')?.isCorrect).toBe(true)
  })

  it('reclassifies a two-option True/False option block as true_false', () => {
    const lesson = ['The Earth is flat.', 'A) True', 'B) False', 'Answer: B'].join('\n')
    const probes = extractProbes(lesson)
    expect(probes).toHaveLength(1)
    expect(probes[0].probeKind).toBe('true_false')
    expect(probes[0].correctValue).toBe('false')
  })

  it('extracts an inline True/False question with no option lines', () => {
    const lesson = 'Water boils at 100C at sea level? (True/False)\nAnswer: True'
    const probes = extractProbes(lesson)
    expect(probes).toEqual([{ probeKind: 'true_false', stem: 'Water boils at 100C at sea level?', correctValue: 'true' }])
  })

  it('extracts a fill-in-the-blank sentence with its answer', () => {
    const lesson = 'The formula for velocity is distance divided by ____.\nAnswer: time'
    const probes = extractProbes(lesson)
    expect(probes).toEqual([{ probeKind: 'fill_blank', stem: 'The formula for velocity is distance divided by ____.', correctValue: 'time' }])
  })

  it('extracts a labelled short-answer question with a sample answer', () => {
    const lesson = 'Short answer: Why does a feather fall slower than a rock in air?\nSample answer: Air resistance affects the feather more.'
    const probes = extractProbes(lesson)
    expect(probes).toEqual([{
      probeKind: 'short_answer',
      stem: 'Why does a feather fall slower than a rock in air?',
      correctValue: 'Air resistance affects the feather more.',
    }])
  })

  it('returns nothing when the lesson contains no recognizable assessment pattern', () => {
    expect(extractProbes('Gravity is a force that pulls objects toward the Earth.')).toEqual([])
  })

  it('does not double-count a single option block as more than one probe', () => {
    const lesson = ['What is 2 + 2?', 'A) 3', 'B) 4', 'C) 5'].join('\n')
    expect(extractProbes(lesson)).toHaveLength(1)
  })
})

describe('validateExplanationCandidate', () => {
  const base = { conceptId: 'phys.mech.velocity', language: 'en', familyKind: 'core_explanation', content: 'Gravity pulls objects toward the Earth with a constant acceleration.' }

  it('accepts a well-formed candidate', () => {
    expect(validateExplanationCandidate(base)).toEqual({ valid: true })
  })

  it('rejects an unsupported language', () => {
    expect(validateExplanationCandidate({ ...base, language: 'fr' })).toMatchObject({ valid: false })
  })

  it('rejects an unknown concept id', () => {
    expect(validateExplanationCandidate({ ...base, conceptId: 'phys.not.a.real.concept.xyz' })).toMatchObject({ valid: false })
  })

  it('rejects an invalid explanation kind', () => {
    expect(validateExplanationCandidate({ ...base, familyKind: 'not_a_real_kind' })).toMatchObject({ valid: false })
  })

  it('rejects content shorter than the minimum length', () => {
    expect(validateExplanationCandidate({ ...base, content: 'Too short.' })).toMatchObject({ valid: false })
  })

  it('rejects placeholder content', () => {
    expect(validateExplanationCandidate({ ...base, content: 'TODO: write this explanation later please' })).toMatchObject({ valid: false })
  })

  it('rejects degenerate repeated-word content', () => {
    expect(validateExplanationCandidate({ ...base, content: 'the the the the the the the the' })).toMatchObject({ valid: false })
  })
})

describe('validateProbeCandidate', () => {
  const base = { conceptId: 'phys.mech.velocity', language: 'en', probeKind: 'mcq', stem: 'What causes objects to fall?', choices: [{ text: 'Gravity', isCorrect: true }, { text: 'Magnetism', isCorrect: false }] }

  it('accepts a well-formed mcq candidate', () => {
    expect(validateProbeCandidate(base)).toEqual({ valid: true })
  })

  it('rejects an mcq with fewer than 2 choices', () => {
    expect(validateProbeCandidate({ ...base, choices: [{ text: 'Gravity', isCorrect: true }] })).toMatchObject({ valid: false })
  })

  it('rejects an mcq with no correct choice marked', () => {
    expect(validateProbeCandidate({ ...base, choices: [{ text: 'Gravity', isCorrect: false }, { text: 'Magnetism', isCorrect: false }] })).toMatchObject({ valid: false })
  })

  it('accepts a true_false candidate without choices', () => {
    expect(validateProbeCandidate({ conceptId: 'phys.mech.velocity', language: 'en', probeKind: 'true_false', stem: 'Gravity is a force.' })).toEqual({ valid: true })
  })

  it('rejects a stem shorter than the minimum length', () => {
    expect(validateProbeCandidate({ ...base, stem: 'Why?' })).toMatchObject({ valid: false })
  })

  it('rejects an invalid probe kind', () => {
    expect(validateProbeCandidate({ ...base, probeKind: 'essay' })).toMatchObject({ valid: false })
  })
})

describe('captureTracker', () => {
  beforeEach(() => captureTracker._reset())

  it('starts at zero with a 0% success rate', () => {
    expect(captureTracker.stats()).toMatchObject({ totalAttempts: 0, successRate: 0, duplicateRejectionRate: 0 })
  })

  it('computes success rate as (inserted + versioned) / totalAttempts', () => {
    captureTracker.record({ action: 'inserted', assetId: 'a1' })
    captureTracker.record({ action: 'versioned', assetId: 'a2', parentVersionId: 'a1' })
    captureTracker.record({ action: 'skipped-duplicate', matchedAssetId: 'a1' })
    captureTracker.record({ action: 'rejected', reason: 'too short' })
    const stats = captureTracker.stats()
    expect(stats.totalAttempts).toBe(4)
    expect(stats.successRate).toBe(50)
    expect(stats.duplicateRejectionRate).toBe(25)
    expect(stats.rejected).toBe(1)
  })

  it('recordRejection increments rejected without needing a CaptureOutcome', () => {
    captureTracker.recordRejection()
    expect(captureTracker.stats()).toMatchObject({ totalAttempts: 1, rejected: 1 })
  })
})
