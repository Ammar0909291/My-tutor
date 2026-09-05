import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import {
  checkRemediationOutput,
  mostRecentAssistantText,
  selectRemediationFallback,
  buildRemediationFallbackText,
  wouldRepeatPreviousTurn,
} from '@/lib/teaching/remediationOutputContract'

/**
 * P1 — THE HELD-CARD REPETITION LOOP.
 *
 * MEASURED (production, phys.stat.phase-transitions, 2026-09-05, real account,
 * studied as a below-intermediate-English learner). Four consecutive turns
 * returned the IDENTICAL "Heat a magnet…" paragraph, including the turn that
 * replied to "sir you say same thing again about magnet. i am asking different
 * question now … please answer this new question". Vercel runtime logs for that
 * window show, on every one of the four rejected repairs:
 *
 *     [remediation-floor] { heldOnCard: true, violation: 'went-beyond-card' }
 *     [remediation-floor] repaired { accepted: false,
 *                                    usedHeldCard: true,
 *                                    usedCurriculumSentence: false }
 *
 * `usedCurriculumSentence` was false all four times even though
 * `phys.stat.phase-transitions` carries a 285-character KG description, well
 * inside buildRemediationFallbackText's own 25–400 window. The swap that exists
 * to break exactly this loop never engaged.
 *
 * ROOT CAUSE — the input, not the rules. `route.ts` loads its window
 * `orderBy: { createdAt: 'desc' }` (newest first) and the one reader feeding the
 * repeat rules took `.slice(-1)[0]`: the LAST element of a newest-first array,
 * i.e. the OLDEST assistant message in a 30-message window. Fourteen sibling
 * readers in the same file use `.find(...)`/`[0]`; this was the single outlier.
 * Both consumers were therefore comparing against the wrong message, so neither
 * `checkRemediationOutput`'s `repeats-previous-turn` floor nor the fallback swap
 * could ever fire.
 *
 * These cases drive the REAL functions. The route wiring is pinned by source
 * assertions at the bottom, so the suite cannot pass while the route reverts to
 * reading the wrong end of the array.
 */

// The measured card (abridged to its shape; length is what matters to the floor).
const CARD = 'Heat a magnet and above a particular temperature it stops being magnetic — not '
  + 'gradually fading away over a wide range, but with the magnetisation reaching zero at one '
  + 'point and staying there. That quantity, zero in the disordered phase and growing below the '
  + 'transition, is the order parameter, and it is what a description of the transition is built '
  + 'around. The standard approach writes the free energy as a series in that quantity and lets '
  + 'the temperature control the sign of the leading term.'

// The real KG description for phys.stat.phase-transitions (285 chars).
const KG_SENTENCE = 'A phase transition is a discontinuous or singular change in macroscopic '
  + "properties at a critical point; Landau's mean-field theory expands the free energy in powers "
  + 'of an order parameter η: F = a₀ + a₂η² + a₄η⁴ + …, with the sign of a₂(T) distinguishing '
  + 'ordered from disordered phases.'

describe('the ordering defect itself — which message is "the previous turn"', () => {
  // route.ts loads newest-first; these fixtures mirror that exactly.
  const newestFirst = [
    { role: 'ASSISTANT', content: 'NEWEST assistant turn', createdAt: new Date('2026-09-05T12:40:00Z') },
    { role: 'USER', content: 'a learner message', createdAt: new Date('2026-09-05T12:39:00Z') },
    { role: 'ASSISTANT', content: 'OLDEST assistant turn', createdAt: new Date('2026-09-05T12:00:00Z') },
  ]

  it('returns the most recent assistant turn, not the oldest in the window', () => {
    expect(mostRecentAssistantText(newestFirst)).toBe('NEWEST assistant turn')
  })

  it('the OLD expression returned the oldest — the defect, reproduced', () => {
    const old = newestFirst.filter((m) => m.role === 'ASSISTANT').slice(-1)[0]?.content ?? null
    expect(old).toBe('OLDEST assistant turn')
    expect(old).not.toBe(mostRecentAssistantText(newestFirst))
  })

  it('is correct under the OPPOSITE ordering too — it reads createdAt, not an index', () => {
    const oldestFirst = [...newestFirst].reverse()
    expect(mostRecentAssistantText(oldestFirst)).toBe('NEWEST assistant turn')
  })

  it('ignores user turns, and returns null when there is no assistant turn yet', () => {
    expect(mostRecentAssistantText([{ role: 'USER', content: 'hi', createdAt: new Date() }])).toBeNull()
    expect(mostRecentAssistantText([])).toBeNull()
    expect(mostRecentAssistantText(null)).toBeNull()
  })

  it('degrades to array order when no timestamp is usable, and never throws', () => {
    expect(mostRecentAssistantText([
      { role: 'ASSISTANT', content: 'first' },
      { role: 'ASSISTANT', content: 'second' },
    ])).toBe('first')
    expect(mostRecentAssistantText([{ role: 'ASSISTANT', content: 'x', createdAt: 'not-a-date' }])).toBe('x')
    expect(() => mostRecentAssistantText([null as never, undefined as never])).not.toThrow()
  })

  it('with the fix, the repeats-previous-turn floor finally sees the repeat it was written for', () => {
    // The floor itself was always correct; it was never shown the right message.
    const wrongInput = newestFirst.filter((m) => m.role === 'ASSISTANT').slice(-1)[0]?.content ?? null
    const withOldReader = checkRemediationOutput({
      remediationTurn: false, recoveryTurn: false,
      text: 'NEWEST assistant turn'.padEnd(250, ' .'),  // over the 200-char unscoped floor
      previousAssistantText: wrongInput,
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(withOldReader.violation).toBeNull()          // could not fire

    const withFix = checkRemediationOutput({
      remediationTurn: false, recoveryTurn: false,
      text: 'NEWEST assistant turn'.padEnd(250, ' .'),
      previousAssistantText: 'NEWEST assistant turn'.padEnd(250, ' .'),
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(withFix.violation).toBe('repeats-previous-turn')
  })
})

describe('A — held card + rejected repair + valid curriculum sentence', () => {
  it('does NOT serve the card again; it serves the curriculum sentence instead', () => {
    const choice = selectRemediationFallback({
      heldCardText: CARD,
      conceptSentence: KG_SENTENCE,
      previousAssistantText: CARD,      // the card is what was just said
      conceptResolved: true,
    })
    expect(choice.source).toBe('curriculum-sentence')
    expect(choice.text).not.toBe(CARD)
    expect(choice.text).toContain(KG_SENTENCE)
    expect(choice.repeatUnavoidableReason).toBeNull()
  })

  it('serves the card normally when it is NOT what was just said', () => {
    const choice = selectRemediationFallback({
      heldCardText: CARD,
      conceptSentence: KG_SENTENCE,
      previousAssistantText: 'Something else entirely was said last turn.',
      conceptResolved: true,
    })
    expect(choice.source).toBe('held-card')
    expect(choice.text).toBe(CARD)
    expect(choice.repeatUnavoidableReason).toBeNull()
  })
})

describe('B — the learner says the tutor is repeating itself', () => {
  // No semantic detection of the complaint: the fix is driven purely by what was
  // last SERVED, so any turn arriving in this state gets a different source.
  it('a different source is chosen without reading the learner text at all', () => {
    const choice = selectRemediationFallback({
      heldCardText: CARD,
      conceptSentence: KG_SENTENCE,
      previousAssistantText: CARD,
      conceptResolved: true,
    })
    expect(choice.text).not.toBe(CARD)
    // No semantic detection exists to regress: the selector takes ONE options
    // object and no learner message, so it cannot be keyed on the complaint.
    expect(selectRemediationFallback.length).toBe(1)
  })
})

describe('C — a third consecutive repeat cannot happen while another source exists', () => {
  it('turn N serves the card, turn N+1 swaps, turn N+2 swaps back — never three in a row', () => {
    const served: string[] = []

    // Turn N: nothing repeated yet.
    const t1 = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: KG_SENTENCE,
      previousAssistantText: 'an earlier, different turn', conceptResolved: true,
    })
    served.push(t1.text!)

    // Turn N+1: the previous turn was the card.
    const t2 = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: KG_SENTENCE,
      previousAssistantText: served[0], conceptResolved: true,
    })
    served.push(t2.text!)

    // Turn N+2: the previous turn was the curriculum sentence.
    const t3 = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: KG_SENTENCE,
      previousAssistantText: served[1], conceptResolved: true,
    })
    served.push(t3.text!)

    // The measured production failure was served[0] === served[1] === served[2].
    expect(served[0]).not.toBe(served[1])
    expect(served[1]).not.toBe(served[2])
    expect(new Set(served).size).toBe(2)   // two trusted sources, alternating
    expect(served.every((s) => s.length > 0)).toBe(true)
  })
})

describe('D — no valid curriculum alternative: deterministic and observable', () => {
  it('unresolved concept is NAMED, and nothing is fabricated', () => {
    const choice = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: null,
      previousAssistantText: CARD, conceptResolved: false,
    })
    expect(choice.text).toBe(CARD)                       // still teaches
    expect(choice.source).toBe('held-card')
    expect(choice.repeatUnavoidableReason).toBe('unresolved-concept')
  })

  it('resolved concept with no KG description is NAMED', () => {
    const choice = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: '',
      previousAssistantText: CARD, conceptResolved: true,
    })
    expect(choice.repeatUnavoidableReason).toBe('no-kg-description')
  })

  it('a description the fallback builder refuses is NAMED, not silently dropped', () => {
    const tooShort = 'Too short.'
    expect(buildRemediationFallbackText(tooShort)).toBeNull()
    const choice = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: tooShort,
      previousAssistantText: CARD, conceptResolved: true,
    })
    expect(choice.repeatUnavoidableReason).toBe('sentence-rejected')
  })

  it('an alternative that would ITSELF repeat is NAMED distinctly', () => {
    const altText = buildRemediationFallbackText(KG_SENTENCE)!
    const choice = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: KG_SENTENCE,
      previousAssistantText: `${CARD}\n\n${altText}`,   // both already said
      conceptResolved: true,
    })
    expect(choice.repeatUnavoidableReason).toBe('alt-also-repeats')
  })

  it('nothing trusted at all: serves nothing rather than inventing', () => {
    const choice = selectRemediationFallback({
      heldCardText: null, conceptSentence: null,
      previousAssistantText: CARD, conceptResolved: false,
    })
    expect(choice.text).toBeNull()
    expect(choice.source).toBe('none')
  })
})

describe('E — legitimate repetition is still allowed', () => {
  it('a short acknowledgement repeated across turns is not a violation', () => {
    const r = checkRemediationOutput({
      remediationTurn: false, recoveryTurn: false,
      text: 'Correct!',
      previousAssistantText: 'Correct! Well done.',
      hasStructuredMcq: false, heldCardText: '',
    })
    expect(r.violation).toBeNull()
  })

  it('wouldRepeatPreviousTurn is unchanged — same containment test as before', () => {
    expect(wouldRepeatPreviousTurn(CARD, CARD)).toBe(true)
    expect(wouldRepeatPreviousTurn(CARD, 'unrelated text')).toBe(false)
    expect(wouldRepeatPreviousTurn(null, CARD)).toBe(false)
    expect(wouldRepeatPreviousTurn(CARD, null)).toBe(false)
  })

  it('the held card is still served on the FIRST hold — the hold itself is untouched', () => {
    const choice = selectRemediationFallback({
      heldCardText: CARD, conceptSentence: KG_SENTENCE,
      previousAssistantText: null,        // nothing served yet
      conceptResolved: true,
    })
    expect(choice.source).toBe('held-card')
    expect(choice.text).toBe(CARD)
  })
})

describe('F — route wiring, so the fix cannot silently revert', () => {
  const ROUTE = readFileSync(
    join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8',
  )

  it('the route reads the RECENT end of the window, via the shared helper', () => {
    expect(ROUTE).toContain('const previousAssistantText = mostRecentAssistantText(')
    // The defect, in its exact original shape, must not come back.
    expect(ROUTE).not.toContain('.filter((m) => m.role === MessageRole.ASSISTANT)\n            .slice(-1)[0]')
  })

  it('the route delegates fallback selection to the tested helper', () => {
    expect(ROUTE).toContain('choice = selectRemediationFallback({')
    expect(ROUTE).toContain('conceptResolved: conceptForFloor !== null')
  })

  it('the previously unproven path is instrumented on the existing log line', () => {
    expect(ROUTE).toContain('repeatUnavoidable: choice?.repeatUnavoidableReason ?? null')
  })

  it('the hold is still evidence-gated — remediationWindowOpen is untouched here', () => {
    // The fix must not have reached into the window's inputs.
    expect(ROUTE).toContain('const holding = !remediationTurn && remediationWindowOpen({')
    expect(ROUTE).toContain('correctAtCheck: conversationStateHoisted?.correctAtCheck ?? 0')
    expect(ROUTE).toContain('correctAtPractice: conversationStateHoisted?.correctAtPractice ?? 0')
  })

  it('normal remediation content still goes through checkRemediationOutput', () => {
    expect(ROUTE).toContain('const verdict = checkRemediationOutput({')
    expect(ROUTE).toContain('const stillViolating = checkRemediationOutput({')
  })
})
