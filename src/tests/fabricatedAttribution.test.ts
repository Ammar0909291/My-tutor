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

/**
 * THE MIRROR — the other tail of the same measurement.
 *
 * The fabrication guard above catches an attribution whose reasoning the
 * learner NEVER gave. This catches the opposite: an attribution made of the
 * learner's own words, ending in a request to confirm it, as the entire turn.
 *
 * FOUR VERBATIM INSTANCES, THREE LESSONS, ONE DAY — all 2026-09-01, real
 * account, studied as a learner. Cost, measured: in friction run 1 the learner
 * answered correctly WITH correct reasoning at T3 and was not told they were
 * right until T6, after demanding a verdict twice.
 */
import { isMirrorTurn, buildMirrorReplyDirective } from '@/lib/teaching/attributionGuard'

describe('the four measured mirrors', () => {
  const CASES: Array<[string, string, string]> = [
    ['friction r1 T1', 'harder',
      "So you're saying the book is harder to slide when you press it down because the normal force increases. Is that right?"],
    ['friction r1 T3', 'smaller? because your hand isnt pushing on it anymore',
      "You're thinking the normal force would be smaller when you lift the book because your hand isn't pushing on it anymore. Is that right?"],
    ['friction r3 T4', 'like i said, 10 kg times 10 = 100 N, and on a flat table the normal force equals the weight',
      "So you're saying the normal force is 100 N because the book's weight (10 kg × 10 m/s²) equals 100 N, and on a flat table the normal force balances that weight—did I get that right?"],
    ['damped T1', 'it slows down because of air and friction i guess. the swings get smaller each time',
      "So you're saying the swing slows because of air resistance and friction, and its swings get smaller each time—am I right?"],
  ]
  for (const [name, learner, tutor] of CASES) {
    it(`fires on ${name}`, () => {
      expect(isMirrorTurn(tutor, learner).isMirror).toBe(true)
    })
  }

  it('overlap is REPORTED, never gated — measuring settled that', () => {
    // Across the four real mirrors overlap ranges 0.13 to 0.79: r1 T1 scores
    // lowest because the learner's whole answer was the single word "harder",
    // so every other word in the restatement is necessarily the tutor's. A 0.6
    // gate — the first version — rejected half the real instances.
    const low = isMirrorTurn(CASES[0][2], CASES[0][1])
    const high = isMirrorTurn(CASES[2][2], CASES[2][1])
    expect(low.overlap).toBeLessThan(0.3)
    expect(high.overlap).toBeGreaterThan(0.6)
    expect(low.isMirror && high.isMirror).toBe(true)
  })
})

describe('what the mirror detector must NOT touch', () => {
  for (const [label, learner, tutor] of [
    ['plain teaching with no attribution frame', 'harder',
      'Friction grows with the normal force. Press harder and it grows.'],
    ['a genuine diagnostic question', 'harder',
      'How did you calculate the normal force on the box?'],
    ['an attribution with no request to confirm', 'harder',
      "So you're saying the book is harder to slide when you press it down."],
    ['a confirmation followed by real content', 'harder',
      "So you're saying it is harder. That is right, and the reason is that the normal force rises when you press, which raises the maximum static friction."],
  ] as const) {
    it(`stays quiet: ${label}`, () => {
      expect(isMirrorTurn(tutor, learner).isMirror).toBe(false)
    })
  }

  it('a deliberate elicitation that then TEACHES is not a mirror', () => {
    // Restating a misconception to surface it is a real teaching move. The
    // END ANCHOR on the confirmation request is what separates them: a turn
    // that goes on to teach puts the confirm mid-turn.
    expect(isMirrorTurn(
      "So you're saying heavier objects fall faster — is that right? Let us test it: a hammer and a feather in a vacuum land together, which is the whole point.",
      'heavier things fall faster',
    ).isMirror).toBe(false)
  })

  it('three sentences is not a mirror, even ending in a confirm', () => {
    expect(isMirrorTurn(
      "So you're saying the swing slows because of air. Air is part of it. The pivot friction matters more — is that right?",
      'it slows because of air',
    ).isMirror).toBe(false)
  })

  it('is safe on empty and non-string input', () => {
    expect(isMirrorTurn('', 'x').isMirror).toBe(false)
    expect(isMirrorTurn(null as unknown as string, 'x').isMirror).toBe(false)
    expect(isMirrorTurn('So you are saying X. Is that right?', null as unknown as string).isMirror).toBe(false)
  })
})

describe('the directive, and what it deliberately is not', () => {
  it('is empty unless a mirror was detected — costs nothing normally', () => {
    expect(buildMirrorReplyDirective(false)).toBe('')
  })

  it('demands a verdict and forbids another restatement', () => {
    const d = buildMirrorReplyDirective(true)
    expect(d).toMatch(/right or wrong/i)
    expect(d).toMatch(/do NOT restate/i)
    expect(d).toMatch(/do not ask them to tell you/i)
  })

  it('the route consults the detector on the PRIOR assistant turn', () => {
    const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')
    expect(ROUTE).toMatch(/isMirrorTurn\(/)
    expect(ROUTE).toMatch(/buildMirrorReplyDirective\(true\)/)
    expect(ROUTE).toMatch(/prior-turn-was-a-mirror/)
  })
})
