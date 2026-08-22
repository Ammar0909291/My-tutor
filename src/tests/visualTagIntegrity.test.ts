/**
 * P1 — Visual reference integrity (2026-08-22).
 *
 * ROOT CAUSE: `parseVisualTag` (src/lib/school/visuals/detectVisual.ts, the
 * one call site being route.ts's SUBJECT_LIBRARY / Tutor Max path) matched
 * only a SINGLE bare word after "VISUAL:" (`\bVISUAL:\s*(\w+)\b`) and its
 * strip regex used the exact same pattern. On a comma-separated reference —
 * "VISUAL: force_diagram, circuit_diagram" — the parser correctly read
 * `force_diagram` as the value, but only removed "VISUAL: force_diagram"
 * from the text, leaving ", circuit_diagram" — an unvalidated, unregistered
 * raw remainder — visible to the learner.
 *
 * FIX: the whole "VISUAL: ..." line is now matched and consumed as one unit.
 * Every comma-separated candidate is parsed, validated against the registry,
 * and the first valid one becomes `visual`; the entire line — valid and
 * invalid candidates alike — is removed from the learner-visible text, so
 * nothing tag-shaped can ever survive into `cleanText`.
 */
import { describe, it, expect } from 'vitest'
import { parseVisualTag } from '@/lib/school/visuals/detectVisual'
import { stripResidualMachineTags, hasResidualMachineTag } from '@/lib/teaching/residualTagSweep'

describe('parseVisualTag — valid references', () => {
  it('a valid single visual is extracted and stripped cleanly', () => {
    const r = parseVisualTag("Here's the idea.\nVISUAL: force_diagram")
    expect(r.visual).toBe('force_diagram')
    expect(r.cleanText).toBe("Here's the idea.")
    expect(r.cleanText).not.toContain('VISUAL')
  })

  it('valid comma-separated references: no dangling remainder (the defect)', () => {
    const r = parseVisualTag("Here's the idea.\nVISUAL: force_diagram, circuit_diagram")
    expect(r.visual).toBe('force_diagram')
    expect(r.cleanText).toBe("Here's the idea.")
    expect(r.cleanText).not.toContain(',')
    expect(r.cleanText).not.toContain('circuit_diagram')
  })

  it('comma-separated with no space after the comma parses safely too', () => {
    const r = parseVisualTag("Here's the idea.\nVISUAL: force_diagram,circuit_diagram")
    expect(r.visual).toBe('force_diagram')
    expect(r.cleanText).toBe("Here's the idea.")
  })
})

describe('parseVisualTag — invalid references', () => {
  it('a single invalid/hallucinated visual type is removed, not shown raw', () => {
    const r = parseVisualTag('Some text.\nVISUAL: nonexistent_type')
    expect(r.visual).toBeNull()
    expect(r.cleanText).toBe('Some text.')
    expect(r.cleanText).not.toContain('VISUAL')
    expect(r.cleanText).not.toContain('nonexistent_type')
  })

  it('mixed valid + invalid: the valid one is used, both are removed from text', () => {
    const r1 = parseVisualTag('Some text.\nVISUAL: nonexistent_type, force_diagram')
    expect(r1.visual).toBe('force_diagram')
    expect(r1.cleanText).toBe('Some text.')
    expect(r1.cleanText).not.toContain('nonexistent_type')

    const r2 = parseVisualTag('Some text.\nVISUAL: force_diagram, nonexistent_type')
    expect(r2.visual).toBe('force_diagram')
    expect(r2.cleanText).toBe('Some text.')
    expect(r2.cleanText).not.toContain('nonexistent_type')
  })
})

describe('parseVisualTag — malformed tags do not crash and never leak raw markup content', () => {
  it('a bare "VISUAL:" with nothing after it', () => {
    expect(() => parseVisualTag('Some text.\nVISUAL:')).not.toThrow()
    const r = parseVisualTag('Some text.\nVISUAL:')
    expect(r.visual).toBeNull()
  })

  it('a "VISUAL:" line of only commas/whitespace', () => {
    expect(() => parseVisualTag('Some text.\nVISUAL: , , ,')).not.toThrow()
    const r = parseVisualTag('Some text.\nVISUAL: , , ,')
    expect(r.visual).toBeNull()
  })

  it('empty and non-string-shaped input does not throw', () => {
    expect(() => parseVisualTag('')).not.toThrow()
    expect(parseVisualTag('').visual).toBeNull()
  })
})

describe('parseVisualTag — negative control: ordinary prose with "visual" is untouched', () => {
  it('lowercase "visual" mid-sentence never matches', () => {
    const r = parseVisualTag('This is a great visual aid for understanding gravity.')
    expect(r.visual).toBeNull()
    expect(r.cleanText).toBe('This is a great visual aid for understanding gravity.')
  })

  it('capitalized "VISUAL" with no colon never matches', () => {
    const r = parseVisualTag('The VISUAL representation helps a lot.')
    expect(r.visual).toBeNull()
    expect(r.cleanText).toBe('The VISUAL representation helps a lot.')
  })
})

describe('raw markup never reaches learner-visible text (defense in depth)', () => {
  it('an HTML-like <visual>...</visual> tag, if ever emitted, is stripped by the residual sweep', () => {
    const withRawTag = 'Here is the idea.\n<visual type="force_diagram">some payload</visual>\nMore text.'
    expect(hasResidualMachineTag(withRawTag)).toBe(true)
    const swept = stripResidualMachineTags(withRawTag)
    expect(swept).not.toContain('<visual')
    expect(swept).not.toContain('</visual>')
    expect(swept).toContain('Here is the idea.')
    expect(swept).toContain('More text.')
  })

  it('a self-closing <visual .../> tag is stripped too', () => {
    const withRawTag = 'Here is the idea.\n<visual type="force_diagram" />\nMore text.'
    const swept = stripResidualMachineTags(withRawTag)
    expect(swept).not.toContain('<visual')
  })

  it('a residual <!--VISUAL ...--> comment tag is stripped by stripResidualMachineTags', () => {
    const text = 'Here is the idea.\n<!--VISUAL type="three_crystal_lattice"-->'
    expect(hasResidualMachineTag(text)).toBe(true)
    const out = stripResidualMachineTags(text)
    expect(out).not.toContain('<!--')
    expect(out).not.toContain('VISUAL')
  })

  it('negative control: ordinary text with the word "visual" is unaffected by the sweep', () => {
    const text = 'This is a great visual aid for understanding gravity.'
    expect(hasResidualMachineTag(text)).toBe(false)
    expect(stripResidualMachineTags(text)).toBe(text)
  })
})
