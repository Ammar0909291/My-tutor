/**
 * ENG-D04, ENG-D16 and the stop-request gap — the three remaining English
 * defects that reproduced against the real modules.
 *
 * Every case below was MEASURED failing before the fix, not inferred from the
 * register's prose. The negative controls matter more than the positives here:
 * both fixes widen a detector, and a detector that fires on ordinary speech is
 * worse than one that misses.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { stripResidualMachineTags, hasResidualMachineTag } from '@/lib/teaching/residualTagSweep'
import { asksForAVisual, VISUAL_MEDIUM_NOUNS } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import { engagesPendingOptions, type TutorMCQ } from '@/lib/teaching/mcq'

// The leak exactly as the register records it (eng.grammar.word-order, T5).
const D04_LEAK =
  '<--ATTEMPT channel="verbal" representation="diagram" concreteness="iconic" '
  + 'entry="definition-first" granularity="whole" agency="tutor-does" scaffold="2" '
  + 'hint="H0" difficulty="2" paceRate="2" paceDensity="2" paceWait="1" '
  + 'loadBudget="2" loadDecomposition="whole" interleaving="blocked"-->\n'
  + 'Word order in English follows Subject-Verb-Object.'

describe('ENG-D04: a malformed comment opener is still machine markup', () => {
  it('strips the production leak and keeps the teaching', () => {
    const out = stripResidualMachineTags(D04_LEAK)
    expect(out).not.toContain('ATTEMPT')
    expect(out).not.toContain('paceDensity')
    expect(out).toContain('Word order in English follows Subject-Verb-Object.')
  })

  it('the detector is no longer blind to it', () => {
    // This is the half that made the leak invisible to the repo's own assertion.
    expect(hasResidualMachineTag(D04_LEAK)).toBe(true)
  })

  it.each([
    ['<--SIGNAL correctness="true"-->hello', 'SIGNAL'],
    ['<!-ATTEMPT scaffold="2"-->hi', 'ATTEMPT'],
    ['<!--ATTEMPT scaffold="2"-->hi', 'ATTEMPT'],
  ])('strips opener variant %j', (text, token) => {
    expect(stripResidualMachineTags(text)).not.toContain(token)
  })

  // NEGATIVE CONTROLS — the widening must not reach prose.
  it.each([
    'The arrow <-- points back to the subject.',
    'Use <-- back in the margin when you revise.',
    'In maths, a < b means a is less than b.',
    'Write x <- 5 to assign in R.',
  ])('leaves prose untouched: %j', (text) => {
    expect(stripResidualMachineTags(text)).toBe(text.trimEnd())
    expect(hasResidualMachineTag(text)).toBe(false)
  })

  it('a lowercase comment is not machine markup', () => {
    const t = '<!-- a note to myself -->'
    expect(stripResidualMachineTags(t)).toBe(t.trimEnd())
  })
})

describe('ENG-D16: "can i see a visual" is a request', () => {
  const requests = [
    'can i see a visual',
    'is there a visual',
    'do you have a visual',
    'a visual would help',
    'give me a visual',
    'i need a visual',
    'can we see a visual',
    'show me a visual',
  ]
  it.each(requests)('%j asks for a visual', (m) => {
    expect(asksForAVisual(m)).toBe(true)
  })

  it('the turn intent now reports it, which is what the arbitration ladder reads', () => {
    // The ladder already suppresses AUTHORED_PROBE under LEARNER_REQUEST; the
    // defect was that the rung never fired, so a gate MCQ attached instead with
    // no acknowledgement the learner had asked for anything.
    expect(readTurnIntent('can i see a visual').learnerRequest).toBe('diagram')
    expect(readTurnIntent('can i see a diagram').learnerRequest).toBe('diagram')
  })

  // THE BOUNDARY masteryGate.test.ts PINS, re-asserted here so this fix cannot
  // later be widened past it by accident. "any visual for this?" therefore
  // stays FALSE — known residue, reported in the module and the register.
  it.each(['visual', 'any visuals?', 'any visual for this?'])(
    'bare/"any" form stays with the planner matcher: %j',
    (m) => expect(asksForAVisual(m)).toBe(false),
  )

  // NEGATIVE CONTROLS — 'visual' is an ordinary adjective.
  it.each([
    'i am a visual learner',
    'the visual was confusing',
    'i understand the visual now',
    'this visual makes sense',
    'visual memory is interesting',
    'i get the picture',
    'picture this: a ball rolling',
  ])('does NOT read %j as a request', (m) => {
    expect(asksForAVisual(m)).toBe(false)
  })

  it('the shared medium-noun vocabulary was NOT widened', () => {
    // masteryGate's own note forbids adding bare 'visual' to this list, which
    // the visual TARGET resolver shares to tell a medium from a concept title.
    // The fix lives in the request frames instead, exactly as 'visually' does.
    expect(VISUAL_MEDIUM_NOUNS as readonly string[]).not.toContain('visual')
    expect(VISUAL_MEDIUM_NOUNS as readonly string[]).not.toContain('visuals')
  })
})

describe('a stop request is not an ungradeable answer attempt', () => {
  const probe: TutorMCQ = {
    question: 'Which word is the verb?',
    options: ['The word dog', 'The word seems', 'The word happy', 'There is no verb'],
    correctIndex: 1,
  }

  it('reads as wantsToStop, which the guard now excludes', () => {
    expect(readTurnIntent('I am done for today').wantsToStop).toBe(true)
  })

  it('and engages no option, so it was already refused by the positive term', () => {
    // Both halves are asserted so a future change to either one cannot silently
    // reopen the defect while the other still happens to cover it.
    expect(engagesPendingOptions('I am done for today', probe)).toBe(false)
  })

  it('route excludes it explicitly', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    const at = src.indexOf('const genuineUnmappedAttempt')
    expect(at).toBeGreaterThan(0)
    const block = src.slice(at, at + 4000)
    expect(block).toContain('&& !turnIntent.wantsToStop')
  })
})

// The RAW stored production message tail, read out of `messages` for
// eng.writing.supporting-details order 113 T9 (2026-09-12). Verbatim.
const RAW = 'Take a look — the example is right there to check it out. \n\n🎉 \n[!--ATTEMPT channel="verbal" representation="concrete-object" concreteness="iconic" entry="example-first" granularity="whole" agency="tutor-does" scaffold="2" hint="H0" difficulty="0" paceRate="1" paceDensity="1" paceWait="0" loadBudget="1" loadDecomposition="whole" interleaving="blocked" -->]'

describe('ENG-D04 residual — the bracket-wrapped opener, from raw stored output', () => {
  it('strips it, leaving no trailing bracket', () => {
    const out = stripResidualMachineTags(RAW)
    expect(out).not.toContain('ATTEMPT')
    expect(out).not.toContain('[!--')
    expect(out.trimEnd()).not.toMatch(/\]$/)
    expect(out).toContain('the example is right there to check it out')
  })
  it('is reported as dirty by the detector', () => {
    expect(hasResidualMachineTag(RAW)).toBe(true)
  })
  it('negative controls: ordinary brackets survive', () => {
    for (const t of [
      'See [Chapter 2](https://example.com) for more.',
      'The citation [A] refers to Austen.',
      'Options: [a] cat [b] dog',
      'Use the [brackets] carefully.',
      'A range like [0, 1] is inclusive.',
      'He said "wait -- I see it now" and stopped.',
    ]) {
      expect(hasResidualMachineTag(t)).toBe(false)
      expect(stripResidualMachineTags(t)).toBe(t)
    }
  })
})
