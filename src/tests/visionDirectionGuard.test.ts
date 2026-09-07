/**
 * The emission-theory contract, pinned against the two production captures and
 * — the half that matters more — against the legitimate reflection sentences
 * that must survive untouched.
 */
import { describe, it, expect } from 'vitest'
import { repairVisionDirection, isEmissionTheoryClaim } from '@/lib/teaching/visionDirectionGuard'

const REFL = 'phys.opt.reflection'

/** Verbatim from production, 2026-09-07, real account. */
const PROD_RUN_1 =
  'When you stand in front of it, you can see your face because the light that leaves your eyes hits the smooth glass and bounces right back toward you.'
const PROD_RUN_2 =
  'When you stand in front of it, you see your own face because light from your eyes hits the mirror and is sent straight back toward you.'

describe('the two production captures are detected and corrected', () => {
  it('run 1 — "the light that leaves your eyes"', () => {
    const r = repairVisionDirection(PROD_RUN_1, REFL)
    expect(r.repaired).toHaveLength(1)
    expect(r.text).toContain('leaves your face')
    expect(r.text).not.toMatch(/leaves your eyes/i)
    // the sentence, the mirror example and the wording are otherwise intact
    expect(r.text).toContain('you can see your face because')
    expect(r.text).toContain('hits the smooth glass and bounces right back toward you')
  })

  it('run 2 — "light from your eyes"', () => {
    const r = repairVisionDirection(PROD_RUN_2, REFL)
    expect(r.repaired).toHaveLength(1)
    expect(r.text).toContain('from your face')
    expect(r.text).not.toMatch(/from your eyes/i)
    expect(r.text).toContain('hits the mirror and is sent straight back toward you')
  })

  it('the corrected sentence is TRUE physics, not merely different', () => {
    // Light really does leave your face, having reflected off it, and travel to
    // the mirror. That is the chain the lesson should teach.
    const r = repairVisionDirection(PROD_RUN_1, REFL)
    expect(r.text).toMatch(/light that leaves your face hits the smooth glass/i)
  })
})

describe('other emission-theory phrasings', () => {
  const CLAIMS = [
    'The light rays emitted by your eyes strike the mirror.',
    'Beams travelling from your eyes reach the glass and return.',
    'Light comes from the eyes and bounces back off the mirror.',
    'A ray of light exits your eye and reflects from the surface.',
    'The light sent out by your eyes is reflected straight back.',
  ]
  for (const s of CLAIMS) {
    it(`detects: ${s.slice(0, 46)}…`, () => {
      expect(isEmissionTheoryClaim(s)).toBe(true)
      expect(repairVisionDirection(s, REFL).repaired).toHaveLength(1)
      expect(repairVisionDirection(s, REFL).text).not.toMatch(/(?:from|by|out of|leaves|exits)\s+(?:your|the)?\s*eyes?\b/i)
    })
  }
})

describe('LEGITIMATE reflection teaching survives untouched', () => {
  // Every one of these puts the eye in the DESTINATION role, which is the
  // correct physics and the whole point of the lesson.
  const SAFE = [
    'The mirror reflects that light into your eyes, so you see your face.',
    'Light from the lamp bounces off your face and reaches your eyes.',
    'The reflected ray travels back to your eyes at an equal angle.',
    'Light enters your eyes after reflecting from the smooth surface.',
    'You see the image because light arrives at your eyes from the mirror.',
    'Your eyes detect the light that the mirror has reflected.',
    'The angle of incidence equals the angle of reflection, measured from the normal.',
    'A rough surface scatters light in many directions, so no image forms.',
    'Close your eyes and the room is dark — no light reaches them.',
    'Light from the window strikes the mirror and returns toward the observer.',
  ]
  for (const s of SAFE) {
    it(`does not fire: ${s.slice(0, 46)}…`, () => {
      expect(isEmissionTheoryClaim(s)).toBe(false)
      const r = repairVisionDirection(s, REFL)
      expect(r.repaired).toHaveLength(0)
      expect(r.text).toBe(s)
    })
  }
})

describe('scope — inert everywhere else', () => {
  it('does nothing for another concept, even on the exact defective sentence', () => {
    for (const other of ['phys.em.electric-field', 'phys.opt.mirrors', 'chem.elect.galvanic-cell', null, undefined]) {
      const r = repairVisionDirection(PROD_RUN_1, other)
      expect(r.repaired).toHaveLength(0)
      expect(r.text).toBe(PROD_RUN_1)
    }
  })

  it('preserves markdown structure — blank lines and list breaks survive', () => {
    const opening = [
      '**Reflection and Laws of Reflection**',
      '',
      'You can see your face because the light that leaves your eyes hits the mirror.',
      '',
      '- The angle of incidence equals the angle of reflection.',
      '- Both are measured from the normal.',
    ].join('\n')
    const r = repairVisionDirection(opening, REFL)
    expect(r.repaired).toHaveLength(1)
    expect(r.text).toContain('leaves your face')
    expect(r.text.split('\n')).toHaveLength(6)
    expect(r.text).toContain('- Both are measured from the normal.')
  })

  it('never throws, and empty input is returned unchanged', () => {
    expect(repairVisionDirection('', REFL).text).toBe('')
    expect(() => repairVisionDirection(PROD_RUN_1, REFL)).not.toThrow()
  })

  it('only the offending sentence in a paragraph is touched', () => {
    const para = `${PROD_RUN_1} The mirror reflects that light into your eyes at an equal angle.`
    const r = repairVisionDirection(para, REFL)
    expect(r.repaired).toHaveLength(1)
    expect(r.text).toContain('into your eyes at an equal angle')   // untouched
    expect(r.text).toContain('leaves your face')                    // repaired
  })
})

describe('the authored misconception_repair asset survives the guard', () => {
  it('a sentence that NAMES the misconception is not rewritten', () => {
    // If this ever fires, the guard is destroying the very asset that teaches
    // the correct model — the one way it could make a lesson worse.
    const quoting = 'Asked why you can see your face in a mirror, it feels natural to say "the light from my eyes hits the glass and comes back" — this is the EMISSION THEORY OF VISION, and it reverses the direction light actually travels.'
    expect(isEmissionTheoryClaim(quoting)).toBe(false)
    expect(repairVisionDirection(quoting, REFL).text).toBe(quoting)
  })

  // The companion assertion — that the REAL authored misconception_repair asset
  // passes through unchanged — is deliberately absent: registering that asset is
  // blocked by two pre-existing corpus invariants (see emissionTheoryCorpus.test.ts).
  // The synthetic case above pins the behaviour the asset will rely on when the
  // Curriculum Production Pipeline authors its blueprint entry.

  it('but a bare assertion with no refutation marker is STILL caught', () => {
    const bare = 'The light from your eyes hits the mirror and returns.'
    expect(isEmissionTheoryClaim(bare)).toBe(true)
  })
})
