/**
 * No authored stem may reach a learner with its authoring label on
 * (production 2026-09-30: "RETRIEVAL PRACTICE (P-3b style, lateral shift): For
 * the glass slab above …" served verbatim through the Quick check path).
 * Checked against EVERY stem in the seed corpus, so a new label format fails
 * here instead of in front of a learner.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { stripAuthoringLabel, dependsOnEarlierItem } from '@/lib/teaching/gateProbeContract'

const DIR = join(process.cwd(), 'src/lib/teaching/assets')
const STEMS: string[] = readdirSync(DIR)
  .filter((f) => f.endsWith('.ts'))
  .flatMap((f) => [...readFileSync(join(DIR, f), 'utf8').matchAll(/stem: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]))

// An upper-case label of 1–3 words (optionally with a parenthesised tag)
// followed by a colon at the very start — the shape every authoring label has.
// "YDSE:" (Young's double-slit experiment) is a physics abbreviation the question
// uses as its topic, not an authoring label — the one allowed exception.
const LABEL_SHAPE = /^\s*(?!YDSE:)[A-Z]{3,}(?:[ -][A-Z]{3,}){0,2}\s*(?:\([^)]*\)\s*)?:/

describe('authoring labels', () => {
  it('the corpus has stems to check', () => {
    expect(STEMS.length).toBeGreaterThan(1000)
  })

  it('no stem keeps a label after stripping', () => {
    const leaks = STEMS.map(stripAuthoringLabel).filter((s) => LABEL_SHAPE.test(s))
    expect(leaks.slice(0, 5)).toEqual([])
  })

  it('no stem keeps a grader\'s "Pass criterion" note', () => {
    const leaks = STEMS.map(stripAuthoringLabel).filter((s) => /pass criterion/i.test(s))
    expect(leaks.slice(0, 3)).toEqual([])
    expect(stripAuthoringLabel('YDSE: d=0.5 mm. Find β. Pass criterion (5-probe bank, 4/5 at threshold 0.80): all four parts correct.'))
      .toBe('YDSE: d=0.5 mm. Find β.')
  })

  it('the three labels found in production are stripped', () => {
    expect(stripAuthoringLabel('RETRIEVAL PRACTICE (P-3b style, lateral shift): Calculate the shift.')).toBe('Calculate the shift.')
    expect(stripAuthoringLabel('TRANSFER (P-3, proficient): A 5 cm slab…')).toBe('A 5 cm slab…')
    expect(stripAuthoringLabel('MASTERY GATE (P-5): Explain why.')).toBe('Explain why.')
  })
})

describe('follow-ups that depend on an earlier item', () => {
  it('the two physics follow-ups are detected', () => {
    expect(dependsOnEarlierItem('For the glass slab above (5 cm thick, n=1.6), calculate the lateral shift.')).toBe(true)
    expect(dependsOnEarlierItem('For the two-loop circuit above, find the power delivered by each battery.')).toBe(true)
  })

  it('ordinary uses of "above" are not', () => {
    for (const s of [
      'If you double the INTENSITY of UV light above the threshold frequency, what changes?',
      'one row’s pivot sits in the SAME column as the pivot in the row above it. Is this matrix in row echelon form?',
      'Phosphorus forms PCl5. Can nitrogen, directly above it, form NCl5?',
    ]) expect(dependsOnEarlierItem(s), s).toBe(false)
  })

  it('only a handful of corpus stems are affected', () => {
    const hits = STEMS.filter(dependsOnEarlierItem)
    expect(hits.length).toBeGreaterThan(0)
    expect(hits.length).toBeLessThan(10)
  })
})
