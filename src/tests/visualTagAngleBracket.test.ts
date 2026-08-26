/**
 * A stray `<` reached a learner, and in the worst shape it eats the lesson.
 *
 * OBSERVED IN PRODUCTION, full lesson on phys.mech.rotational-dynamics
 * (session cmtaiddvd…, 2026-08-26). The learner asked "can you show picture
 * please" and the stored assistant message — 160 chars, read back from the
 * database, not from a harness render — begins:
 *
 *   "<Look at the arm of 0.3 m where the 20 N force is applied; …"
 *
 * ROOT CAUSE. `parseVisualTag`'s stripper is
 *
 *   text.replace(/\bVISUAL:\s*[^\n]*\n?/i, '')
 *
 * and `\bVISUAL:` begins matching at the "V". The prompt asks for a bare
 * `VISUAL: <type>` line, but a model that wraps it in angle brackets —
 * `<VISUAL: torque_diagram>` — has only the tag body removed, and the opening
 * `<` is left in the learner-facing text.
 *
 * TWO SHAPES, and the second is not cosmetic:
 *   tag on its own line   -> a stray "<" survives next to the teaching
 *   tag then text on the SAME line -> `[^\n]*` runs to end of line and takes
 *                            the tutor's sentence with it, leaving "<" alone
 *
 * The fix consumes an optional leading `<` and an optional trailing `>` so the
 * whole hallucinated tag goes, and nothing else changes: a well-formed
 * `VISUAL: type` line strips exactly as before, and a line with no candidate
 * is still left untouched.
 */
import { describe, it, expect } from 'vitest'
import { parseVisualTag } from '@/lib/school/visuals/detectVisual'

const parse = (text: string) => parseVisualTag(text, 'physics' as never) as
  { cleanText: string } | null

describe('the well-formed tag is unchanged', () => {
  it('strips a bare VISUAL line and keeps the teaching', () => {
    const r = parse('Some teaching.\nVISUAL: torque_diagram')
    expect(r?.cleanText).toBe('Some teaching.')
  })

  it('still strips when the tag is mid-text', () => {
    const r = parse('VISUAL: torque_diagram\nSome teaching.')
    expect(r?.cleanText).toBe('Some teaching.')
  })
})

describe('an angle-bracketed tag leaves nothing behind', () => {
  it('does not leave a stray "<" after the teaching', () => {
    const r = parse('Some teaching.\n<VISUAL: torque_diagram>')
    expect(r?.cleanText).toBe('Some teaching.')
    expect(r?.cleanText).not.toContain('<')
  })

  it('does not eat the teaching that follows on the same line', () => {
    // the production shape, reduced: the tutor's sentence must survive
    const r = parse('<VISUAL: torque_diagram>Look at the arm of 0.3 m.')
    expect(r?.cleanText).toBe('Look at the arm of 0.3 m.')
  })

  it('handles the tag on its own line with teaching beneath', () => {
    const r = parse('<VISUAL: torque_diagram>\nLook at the arm of 0.3 m.')
    expect(r?.cleanText).toBe('Look at the arm of 0.3 m.')
  })

  it('is case-insensitive, like the existing pattern', () => {
    const r = parse('<visual: torque_diagram>Look at the arm.')
    expect(r?.cleanText).toBe('Look at the arm.')
  })

  it('never begins the learner-facing text with a bare angle bracket', () => {
    for (const t of [
      '<VISUAL: torque_diagram>Look at the arm.',
      '<VISUAL: torque_diagram>\nLook at the arm.',
      'Teaching.\n<VISUAL: torque_diagram>',
    ]) {
      const clean = parse(t)?.cleanText ?? ''
      expect(clean.startsWith('<')).toBe(false)
      expect(clean.endsWith('<')).toBe(false)
    }
  })
})

describe('nothing else is swept', () => {
  it('leaves ordinary prose containing "<" alone', () => {
    const r = parse('If a < b then the torque is smaller.\nVISUAL: torque_diagram')
    expect(r?.cleanText).toBe('If a < b then the torque is smaller.')
  })

  it('a malformed bare "VISUAL:" with no candidate is left untouched', () => {
    // Documented behaviour (detectVisual.ts): nothing tag-shaped to strip, so
    // no candidate and the text is returned as-is. The function always returns
    // an object — an earlier draft of this test wrongly expected null.
    const r = parse('Some teaching.\nVISUAL:')
    expect(r?.cleanText).toBe('Some teaching.\nVISUAL:')
  })
})
