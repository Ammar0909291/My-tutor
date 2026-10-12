/**
 * Targeted factual defect closure (2026-10-11) — pure modules.
 *
 * BIO-024: "give me example" on bio.behav.innate-behavior-instinct produced
 * the three-spined stickleback with the sign stimulus "a female with a bright
 * red belly" (production 2026-10-05; again 2026-10-10 on 9a0cee7a, f32eeb04 and
 * 3e7bdcc4). No lesson source covers sticklebacks and the lesson objective
 * (KG line + Educational Brain Core Understanding) does not need them, so no
 * example is added: the unsupported named claim never reaches the learner as
 * fact — the reply becomes the lesson's own authored example.
 *
 * Innate false positive: production 3e7bdcc4 ("explain simpler") removed an
 * accurate analogy sentence — "That whole, pre‑programmed routine is the **fixed
 * action pattern** on the right side of the figure (the courtship display,
 * nest‑building example)." — via the ungrounded-correction rule
 * (`rejected: ungrounded-correction-8`).
 */
import { describe, it, expect } from 'vitest'
import {
  decideGroundedEdits, resolveNamedClaims, pickSourceExample, applyGroundedEdits, splitSentences,
  GROUNDED_CHECK_SYSTEM_PROMPT, NAMED_EXAMPLE_LEAD, NAMED_EXAMPLE_REPEAT_LEAD, pickSourceExampleWithStatus, UNCOVERED_EXAMPLE_NOTE, isExampleTurn, qualifyUncovered, parseCheckerAnswer,
} from '@/lib/teaching/groundedProseCheck'
import { BIOLOGY_EXTENSION_EXPLANATIONS, BIOLOGY_EXTENSION_PROBES } from '@/lib/teaching/assets/biologyExtensionSeedAssets'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const INNATE = 'bio.behav.innate-behavior-instinct'
const node = getKGNode(INNATE)!
/** The checker's sources exactly as the route builds them (KG line + ACTIVE explanations + probes). */
const SOURCES = [
  `${node.title}: ${node.description}`,
  ...BIOLOGY_EXTENSION_EXPLANATIONS.filter((e) => e.conceptId === INNATE).map((e) => e.content),
  ...BIOLOGY_EXTENSION_PROBES.filter((p) => p.conceptId === INNATE).map((p) => `Question: ${p.stem} Correct answer: ${p.correctValue}`),
]
const notStub = () => false

/** The model's reply on the real /learn page, production 3e7bdcc4 (biology-3e7bdcc4-evidence.json turn 1, without the C-1 note). */
const STICKLEBACK = 'Imagine a male three‑spined stickleback fish swimming in a shallow pond. When it spots a female with a bright red belly—this red colour is the **sign stimulus**—the male instantly launches a stereotyped courtship display: it darts toward the female, flares its dorsal spines, and circles her in a precise sequence. Once the display starts, the fish continues the whole pattern even if the female moves away; the behaviour is largely unmodifiable and runs to completion.\n\nIn the figure you see on your screen, the orange box labeled **“Fixed action pattern”** (top right) matches this example. The text “E.g. courtship display, nest‑building” is exactly what we’re watching with the stickleback: a complex, coordinated series of actions that is triggered by a specific sign stimulus (the red belly) and then proceeds automatically.\n\nFor contrast, the blue box **“Simple reflex”** (top left) shows the knee‑jerk reflex. That is a single‑muscle response to a tap on the patellar tendon, requiring only a direct neural loop and no extended sequence. Unlike the stickleback’s courtship, the reflex stops as soon as the stimulus ends.'
/** What a checker following the prompt returns for it: the stickleback sentences are facts about a named organism. */
const STICKLEBACK_CLAIMS = [
  { sentence: 1, verdict: 'unsupported' as const, named: true },
  { sentence: 2, verdict: 'unsupported' as const, named: true },
  { sentence: 3, verdict: 'supported' as const, named: true }, // "supported" with no verbatim quote
  { sentence: 5, verdict: 'unsupported' as const, named: true },
  { sentence: 8, verdict: 'unsupported' as const, named: true },
]

describe('BIO-024 — the stickleback claim never reaches the learner as fact', () => {
  it('the lesson objective does not require sticklebacks (no authored source mentions them)', () => {
    expect(SOURCES.join(' ')).not.toMatch(/stickleback/i)
    expect(node.description).toMatch(/sign stimuli as the triggers that release them/)
  })
  it('the checker is asked to tag named real-world facts, and the flag is parsed', () => {
    expect(GROUNDED_CHECK_SYSTEM_PROMPT).toMatch(/set "named": true on that sentence/)
    expect(parseCheckerAnswer('{"claims":[{"sentence":2,"verdict":"unsupported","named":true}]}')).toEqual([
      { sentence: 2, verdict: 'unsupported', source_quote: undefined, correction: undefined, doubtful: false, named: true },
    ])
  })
  it('named, unsupported sentences are collected (and not left to the qualifier)', () => {
    const d = decideGroundedEdits(STICKLEBACK, STICKLEBACK_CLAIMS, SOURCES)
    expect(d.named).toHaveLength(5)
    expect(d.named.join(' ')).toMatch(/female with a bright red belly/)
    expect(d.uncovered).toEqual([])
    expect(d.edits).toEqual([])
  })
  it('the authored example is the core explanation — never a probe (that would give its answer away)', () => {
    const ex = pickSourceExample(SOURCES)!
    expect(ex).toMatch(/like the knee-jerk reflex/)
    expect(ex).toMatch(/like an elaborate courtship display or nest-building sequence/)
    expect(ex).toMatch(/specific sign stimulus/)
    expect(ex.startsWith('Question:')).toBe(false)
    expect(pickSourceExample(SOURCES.filter((s) => s.startsWith('Question:')))).toBeNull()
  })
  it('the reply becomes the lesson\'s own example: no red belly, no stickleback, objective covered', () => {
    const d = decideGroundedEdits(STICKLEBACK, STICKLEBACK_CLAIMS, SOURCES)
    const r = resolveNamedClaims(STICKLEBACK, d.named, pickSourceExample(SOURCES), notStub)
    expect(r.action).toBe('replaced')
    expect(r.text).not.toMatch(/red belly|stickleback/i)
    expect(r.text.startsWith(NAMED_EXAMPLE_LEAD)).toBe(true)
    // aligned with the objective: FAP + sign stimulus + reflex contrast + genetic basis
    for (const re of [/fixed action pattern|FAP/i, /sign stimulus/, /knee-jerk reflex/, /courtship display/, /heritable trait shaped by natural selection/]) expect(r.text).toMatch(re)
  })
  it('production d10f8a09: "give me another example" gets the other authored example, then says honestly there is no other', () => {
    const first = pickSourceExampleWithStatus(SOURCES, [])
    const second = pickSourceExampleWithStatus(SOURCES, [`${NAMED_EXAMPLE_LEAD}\n\n${first.text}`])
    expect(second.repeat).toBe(false)
    expect(second.text).not.toBe(first.text)
    expect(second.text).toMatch(/like a full courtship display/) // the misconception-repair explanation
    const third = pickSourceExampleWithStatus(SOURCES, [first.text!, second.text!])
    expect(third.repeat).toBe(true)
    const r = resolveNamedClaims(STICKLEBACK, ['x'], third.text, notStub, third.repeat)
    expect(r.text.startsWith(NAMED_EXAMPLE_REPEAT_LEAD)).toBe(true)
  })
  it('even if the checker tags only the first false sentence, the repeated "(the red belly)" goes too', () => {
    const d = decideGroundedEdits(STICKLEBACK, [{ sentence: 2, verdict: 'unsupported', named: true }], SOURCES)
    const r = resolveNamedClaims(STICKLEBACK, d.named, pickSourceExample(SOURCES), notStub)
    expect(r.text).not.toMatch(/red belly/)
  })
  it('without an authored example, named sentences are removed within the limits; beyond them the C-1 note still applies', () => {
    const one = 'For example, a peacock fans its tail for a peahen. A fixed action pattern is a multi-step sequence released by a specific sign stimulus, and once it starts it runs to completion largely independent of feedback, which is why it looks the same every time.'
    const r1 = resolveNamedClaims(one, ['For example, a peacock fans its tail for a peahen.'], null, notStub)
    expect(r1.action).toBe('removed')
    expect(r1.text).not.toMatch(/peacock/)
    const d = decideGroundedEdits(STICKLEBACK, STICKLEBACK_CLAIMS, SOURCES)
    expect(resolveNamedClaims(STICKLEBACK, d.named, null, notStub).action).toBe('kept-no-source')
  })
  it('hedged named sentences and named claims the sources support verbatim are not touched', () => {
    const t = 'Many birds may court with a display of colourful feathers. A fixed action pattern is substantially more complex, coordinated, and multi-step.'
    const d = decideGroundedEdits(t, [
      { sentence: 1, verdict: 'unsupported', named: true },
      { sentence: 2, verdict: 'supported', named: true, source_quote: 'A fixed action pattern is substantially more complex, coordinated, and multi-step' },
    ], SOURCES)
    expect(d.named).toEqual([])
  })
  it('without the named tag the C-1 behaviour is unchanged (qualified, not replaced)', () => {
    const d = decideGroundedEdits(STICKLEBACK, STICKLEBACK_CLAIMS.map(({ named: _n, ...c }) => c), SOURCES)
    expect(d.named).toEqual([])
    expect(d.uncovered.length).toBeGreaterThanOrEqual(2)
    expect(isExampleTurn(STICKLEBACK, 'give me example')).toBe(true)
    expect(qualifyUncovered(STICKLEBACK, d.uncovered[0]).text).toContain(UNCOVERED_EXAMPLE_NOTE)
  })
})

/** The "explain simpler" reply as the model wrote it (production 3e7bdcc4, redrive-3e7bdcc4-bio.txt + the removed sentence 8). */
const CAKE = 'I see this is still confusing, so let’s try a everyday‑life picture.\n\nThink of a **smoke alarm** in your kitchen. When smoke reaches the sensor, the alarm **immediately** goes off and you hear a loud beep—that’s like the **simple reflex** on the left side of the figure (the knee‑jerk reflex). It’s a direct, one‑step response to a stimulus, with no extra steps in between.\n\nNow picture a **birthday cake‑cutting ceremony**. First, someone lights the candles (the **sign stimulus**). Once the candles are lit, a whole sequence follows automatically: people sing “Happy Birthday,” the cake is cut, the frosting is served, and the party continues, even if the lights change or someone talks. That whole, pre‑programmed routine is the **fixed action pattern** on the right side of the figure (the courtship display, nest‑building example). The key is that the specific sign stimulus (the lit candles) triggers a long, stereotyped behavior that runs to completion largely on its own.'
const REMOVED_8 = 'That whole, pre‑programmed routine is the **fixed action pattern** on the right side of the figure (the courtship display, nest‑building example).'

describe('Innate false positive — an accurate analogy sentence is kept', () => {
  it('the reconstruction is exact: sentence 8 is the sentence production removed', () => {
    const seg = splitSentences(CAKE).find((s) => s.index === 8)!
    expect(seg.text).toBe(REMOVED_8)
  })
  it('production\'s verdict (contradicted, correction not grounded) no longer removes it inside an analogy passage', () => {
    const claim = { sentence: 8, verdict: 'contradicted' as const, source_quote: 'like an elaborate courtship display or nest-building sequence', correction: 'That whole routine is like a fixed action pattern, comparable to an elaborate courtship display in animals.' }
    const d = decideGroundedEdits(CAKE, [claim], SOURCES)
    expect(d.edits).toEqual([])
    expect(d.rejected).toEqual(['ungrounded-correction-8', 'analogy-kept-8'])
    expect(d.uncovered).toEqual([REMOVED_8]) // uncertainty preserved, not treated as false
    // with no quote at all the result is the same
    expect(decideGroundedEdits(CAKE, [{ sentence: 8, verdict: 'contradicted' }], SOURCES).edits).toEqual([])
  })
  it('the checker is told an analogy (and its mapping onto the idea or figure) is not a factual claim', () => {
    expect(GROUNDED_CHECK_SYSTEM_PROMPT).toMatch(/sentence that maps such an\nanalogy onto the lesson's idea or its figure, is "not_factual"/)
  })
  it('PAIRED: the same unverifiable contradiction outside an analogy passage is still removed', () => {
    const plain = 'Fixed action patterns are learned by watching parents, so each bird performs them differently. A reflex is a direct response.'
    const d = decideGroundedEdits(plain, [{ sentence: 1, verdict: 'contradicted', correction: 'Fixed action patterns are innate.' }], SOURCES)
    expect(d.edits).toEqual([{ sentence: 'Fixed action patterns are learned by watching parents, so each bird performs them differently.', action: 'removed' }])
  })
  it('PAIRED: a doubted, unsupported claim inside an analogy passage is still removed', () => {
    const d = decideGroundedEdits(CAKE, [{ sentence: 7, verdict: 'unsupported', doubtful: true }], SOURCES)
    expect(d.edits.map((e) => e.action)).toEqual(['removed'])
  })
  it('PAIRED: a named real-world claim in an "Imagine …" passage is not shielded as an analogy', () => {
    const d = decideGroundedEdits(STICKLEBACK, [{ sentence: 2, verdict: 'contradicted', correction: 'x', named: true }], SOURCES)
    expect(d.named).toHaveLength(1)
    expect(d.rejected).not.toContain('analogy-kept-2')
  })
  it('the kept reply still passes the removal limits unchanged', () => {
    expect(applyGroundedEdits(CAKE, [], notStub)).toEqual({ text: CAKE, reason: 'no-edits' })
  })
})
