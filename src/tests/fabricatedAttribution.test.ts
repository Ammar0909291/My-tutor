/**
 * THE TUTOR TOLD THE LEARNER WHAT THEY HAD SAID, AND IT WAS NOT TRUE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production, `phys.mech.friction`, 2026-09-01, real account, studied as a
 * learner. Turn one. The learner's ENTIRE message was "harder". The reply, in
 * full:
 *
 *   "So you're saying the book is harder to slide when you press it down
 *    BECAUSE THE NORMAL FORCE INCREASES. Is that right?"
 *
 * The learner had not said that and had never heard the term — one turn later
 * they wrote "i dont really know what normal force means". The tutor supplied
 * the reasoning, attributed it to the learner, and asked them to confirm it.
 *
 * A learner who says yes has then "demonstrated" an understanding the TUTOR
 * supplied, and every downstream reader — SIGNAL, ladder, misconception ledger
 * — records it as theirs. Hollow advancement, manufactured rather than
 * claimed, at OBSERVE: the rung whose entire job is finding out what the
 * learner actually thinks.
 *
 * ── THE ASSERTION THAT KEEPS THIS FROM BECOMING A NEW DEFECT ────────────────
 * Two turns later in the SAME session the tutor made the same move honestly —
 * the learner really had given the reason — and that turn must survive
 * untouched. Both are here, verbatim, and the guard has to tell them apart.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `stripFabricatedAttribution` and the real route source.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { stripFabricatedAttribution } from '@/lib/teaching/attributionGuard'

describe('the two production turns, which the guard must tell apart', () => {
  it('strips the reasoning the learner never gave', () => {
    const r = stripFabricatedAttribution(
      "So you're saying the book is harder to slide when you press it down because the normal force increases. Is that right?",
      'harder',
    )
    expect(r.removed).toBe('because the normal force increases')
    expect(r.text).toBe("So you're saying the book is harder to slide when you press it down. Is that right?")
  })

  it('leaves the reasoning the learner DID give completely alone', () => {
    // Same session, same move, honest this time. If this ever strips, the
    // guard is deleting a learner's own words — worse than the defect.
    const tutor = "You're thinking the normal force would be smaller when you lift the book because your hand isn't pushing on it anymore. Is that right?"
    const r = stripFabricatedAttribution(tutor, 'smaller? because your hand isnt pushing on it anymore')
    expect(r.removed).toBeNull()
    expect(r.text).toBe(tutor)
  })
})

describe('one shared content word is enough to count as a paraphrase', () => {
  it('a reworded but faithful restatement survives', () => {
    // The cost of being wrong here is deleting a learner's actual reasoning,
    // which is far worse than letting one invention through — so the bar for
    // "supported" is deliberately low.
    const tutor = "So you're saying it is harder because you are pushing more. Is that right?"
    expect(stripFabricatedAttribution(tutor, 'it feels harder to push').removed).toBeNull()
  })

  it('matches across a crude stem, so pushing/push are the same word', () => {
    const tutor = "You're thinking it slides because the surfaces are rough. Is that right?"
    expect(stripFabricatedAttribution(tutor, 'the surface feels rough').removed).toBeNull()
  })
})

describe('it cannot fire on ordinary teaching', () => {
  for (const [label, tutor] of [
    ['no attribution frame at all', 'Friction grows because the normal force increases. Press harder and it grows.'],
    ['a causal explanation the tutor is making itself', 'The book is harder to slide because the surfaces are pressed together more firmly.'],
    ['an attribution with no causal clause', "So you're saying it is harder to slide. Is that right?"],
  ] as const) {
    it(`${label}`, () => {
      const r = stripFabricatedAttribution(tutor, 'harder')
      expect(r.removed).toBeNull()
      expect(r.text).toBe(tutor)
    })
  }

  it('keeps the teaching that surrounds a mid-turn attribution', () => {
    const r = stripFabricatedAttribution(
      'Good. So you are saying the book resists more because the coefficient of friction changes. Now let us look at the surfaces themselves.',
      'harder',
    )
    expect(r.removed).toBe('because the coefficient of friction changes')
    expect(r.text).toContain('Good.')
    expect(r.text).toContain('Now let us look at the surfaces themselves.')
    expect(r.text).not.toContain('coefficient')
  })
})

describe('it never leaves a broken turn', () => {
  it('declines when stripping would leave a fragment', () => {
    const tutor = "You're thinking because the coefficient rises."
    expect(stripFabricatedAttribution(tutor, 'yes').text).toBe(tutor)
  })

  it('declines on a clause too short to judge', () => {
    const tutor = "So you're saying it is harder because friction. Is that right?"
    expect(stripFabricatedAttribution(tutor, 'harder').removed).toBeNull()
  })

  it('is safe on empty and non-string input', () => {
    expect(stripFabricatedAttribution('', 'x').text).toBe('')
    expect(stripFabricatedAttribution(null as unknown as string, 'x').removed).toBeNull()
    expect(stripFabricatedAttribution('So you are saying X because Y happened.', null as unknown as string).removed).toBeNull()
  })

  it('is idempotent', () => {
    const once = stripFabricatedAttribution(
      "So you're saying the book is harder to slide when you press it down because the normal force increases. Is that right?",
      'harder',
    ).text
    expect(stripFabricatedAttribution(once, 'harder').text).toBe(once)
  })
})

describe('the chat route applies it', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('calls it against the learner message, not the prompt', () => {
    // Anchored on the CALL and on BOTH arguments: checking it against
    // anything other than what the learner actually typed would make the
    // whole guard meaningless.
    expect(ROUTE).toMatch(/stripFabricatedAttribution\(cleanText,\s*message\)/)
  })

  it('is wrapped, so a guard failure cannot take the turn down', () => {
    const at = ROUTE.indexOf('stripFabricatedAttribution(cleanText, message)')
    expect(at).toBeGreaterThan(0)
    const before = ROUTE.slice(0, at)
    expect(before.lastIndexOf('try {')).toBeGreaterThan(before.lastIndexOf('} catch'))
  })
})
