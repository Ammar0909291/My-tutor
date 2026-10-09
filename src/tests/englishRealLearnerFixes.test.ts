/**
 * English real-learner run (2026-10-07, 216 lessons, ten accounts) —
 * docs/qa/ENGLISH_REAL_LEARNER_DEFECTS.md. Every string below is a reply or a
 * figure payload the run's learners actually received (production rows).
 * The run used the code before 532055e, so the shared mechanisms fixed there
 * (MATH-*) are asserted here against the English evidence too.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropQuestionSentences } from '@/lib/teaching/confirmBackRepair'
import { stripMetaTalk, stripEmpathyOpener, analogyCapReached } from '@/lib/teaching/reuseCaps'
import { isStubReply, looksLikeHandle, learnerWantsTeaching, restoreServerVerdict } from '@/lib/teaching/replyHygiene'
import { readableTextColor, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'
import { isNonNegativeAxis, isCountAxis } from '@/lib/visuals/graphAxis'
import { visibleCurveFraction } from '@/lib/visuals/graphView'
import { layoutStep } from '@/lib/visuals/processFlowLayout'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const SCENE_ENGINE = readFileSync('src/lib/teaching/visual/visualEngine.ts', 'utf8')
const SCENE_LABEL = readFileSync('src/components/school/visuals/SceneLabel.tsx', 'utf8')

const NAMED: Record<string, string> = { blue: '#0000ff', red: '#ff0000', purple: '#800080', navy: '#000080' }
function contrast(a0: string, b: string): number {
  const a = NAMED[a0] ?? a0
  const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const lum = (h: string) => {
    const [r, g, bl] = rgb(h).map((s) => (s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

describe('ENGL-012 a question inside quotation marks is example text, not a question to the learner', () => {
  it('#185: the experts\' quoted questions survive (production showed "” – they look for clues…")', () => {
    const raw = 'Imagine three experts standing in front of the same poem: a historian, a formalist, and a reader‑response scholar.\n\n'
      + '**Historian:** “What was happening when this was written?” – they look for clues about the era, events, and the writer’s background.\n\n'
      + '**Formalist:** “How do the words and rhyme work?” – they focus only on the words, meter, rhyme, and patterns inside the text.\n\n'
      + 'Which expert would you trust most?'
    const out = dropQuestionSentences(raw)
    expect(out).not.toMatch(/(^|\n)\s*”/)
    expect(out).toContain('“What was happening when this was written?” – they look for clues')
    expect(out).toContain('“How do the words and rhyme work?”')
    expect(out).not.toContain('Which expert would you trust most?')
  })
  it('#138: a numbered dialogue keeps its first line (production showed "1.” 2. Sam…")', () => {
    const out = dropQuestionSentences('Here’s Conversation A:\n1. Alex (Turn 1): “Hi, how are you?”\n2. Sam (Turn 2): “Fine, thanks.”')
    expect(out).toContain('1. Alex (Turn 1): “Hi, how are you?”')
  })
  it('a real question to the learner still goes (the card follows)', () => {
    expect(dropQuestionSentences('A noun names a thing. Can you find the noun in “The cat sat”?')).toBe('A noun names a thing.')
  })
})

describe('ENGL-014 the tutor\'s account of its own instruction goes', () => {
  it('#152 t8', () => {
    const r = stripMetaTalk('I’m sorry for the confusion—that placeholder was just a reminder to avoid repeating the exact same explanation we’ve already covered. Ethos is the speaker’s credibility: we trust a doctor talking about health because of their training.')
    expect(r.removed.length).toBe(1)
    expect(r.text).toMatch(/^Ethos is/)
  })
})

describe('ENGL-008 English caps analogies at one in four replies', () => {
  it('route passes 1 for english, as for mathematics', () => {
    // 2026-10-07 (CHEM-040 / CHEM-055): the cap of one now applies to every subject, english included.
    expect(ROUTE).toMatch(/caps\.analogyCapReached\(priorTutor, 1\)/)
    expect(analogyCapReached(['Imagine a train carrying words.', 'Print goes left to right.'], 1)).toBe(true)
  })
})

describe('ENGL-003 / ENGL-007 a graded card always gets its verdict', () => {
  it('the KG description alone (#2 t15) is given the server verdict', () => {
    const desc = 'The ability to identify and manipulate individual sounds (phonemes) in spoken words, independent of print.'
    expect(restoreServerVerdict(desc, true, null)).toMatch(/^That's right\./)
    expect(restoreServerVerdict(desc, false, 'Hear and change single sounds')).toMatch(/^Not quite — the answer is: Hear and change single sounds/)
  })
  it('route: the final guard runs after every fallback, before provenance', () => {
    const guard = ROUTE.indexOf('A GRADED CARD ALWAYS GETS ITS VERDICT (ENGL-003 / ENGL-007)')
    expect(guard).toBeGreaterThan(ROUTE.indexOf('THE TEACHING FLOOR (MATH-004'))
    expect(guard).toBeGreaterThan(ROUTE.indexOf("event: 'question-announced-but-never-delivered'"))
    expect(guard).toBeLessThan(ROUTE.indexOf('PHASE 0: TURN DECISION PROVENANCE'))
  })
})

describe('shared 532055e fixes hold on the English evidence', () => {
  it('ENGL-011: "test", "test10" are handles, never names', () => {
    for (const h of ['test', 'test10', 'test 10']) expect(looksLikeHandle(h), h).toBe(true)
  })
  it('ENGL-005: a second stock empathy opener within four replies goes', () => {
    const prev = 'I hear you’re feeling stuck, so let’s look at the same picture again, step by step, a little slower.'
    const cur = 'I hear you’re feeling stuck, so let’s try once more. Print goes from left to right and from the top of the page to the bottom.'
    expect(stripEmpathyOpener(cur, 'explain again', [prev]).stripped).toBe(true)
  })
  it('ENGL-006 / ENGL-010 / ENGL-015: the learner\'s English triggers count as help turns', () => {
    const none = { request: false, practice: false }
    for (const m of ['i dont know', 'i dont understand', 'why?']) expect(learnerWantsTeaching(m, none), m).toBe(true)
    expect(learnerWantsTeaching('next question please', { request: false, practice: true })).toBe(true)
  })
  it('ENGL-006: comfort only is a stub; ENGL-010: a reply of nothing but a counter-question is a stub', () => {
    expect(isStubReply('I hear you—it’s okay to feel stuck.')).toBe(true)
    expect(isStubReply('What do you notice about the verb in “She walks to school every morning”?')).toBe(true)
  })
  it('ENGL-013: the "no picture" rewrite checks the figure already shown', () => {
    expect(ROUTE).toMatch(/if \(!figureOnScreen && figureQuestionHoisted && !figureShownForConcept\)/)
  })
})

describe('ENGL-017 figures a weak reader can read', () => {
  it('#48 Semantic Fields: "blue"/"red"/"purple" label text clears 4.5:1 on the dark board and the light panel', () => {
    for (const c of ['blue', 'red', 'purple', 'navy', '#0000ff', '#5B2C83']) {
      expect(contrast(readableTextColor(c, 'dark'), '#243329'), c).toBeGreaterThanOrEqual(4.5)
      expect(contrast(readableTextColor(c, 'light'), '#faf7ee'), c).toBeGreaterThanOrEqual(4.5)
    }
  })
  it('readable colours and unknown spellings are left as authored', () => {
    expect(readableTextColor('#e2e8f0', 'dark')).toBe('#e2e8f0')
    expect(readableTextColor('var(--x)', 'dark')).toBe('var(--x)')
    expect(themeColor('blue', 'dark')).toBe('blue') // mesh colours unchanged
  })
  it('SceneLabel — the one leaf every label goes through — applies the floor', () => {
    expect(SCENE_LABEL).toMatch(/color: readableTextColor\(color, theme === 'light' \? 'light' : 'dark'\)/)
  })
  it('#23 Intonation: a time x-axis with no domain opens on 0…10', () => {
    expect(isNonNegativeAxis('Time (s)')).toBe(true)
    expect(isNonNegativeAxis('Pitch (Hz)')).toBe(false)
    expect(isCountAxis('Time (s)')).toBe(false)
    expect(SCENE_ENGINE).toMatch(/isNonNegativeAxis\(spec\.xLabel\)\) spec = \{ \.\.\.spec, domain: \[0, 10\] \}/)
  })
  it('#23: the cached "0.5x + 200" pitch graph is empty in its view and is refused', () => {
    expect(visibleCurveFraction('0.5x + 200', [0, 10])).toBe(0)
  })
})

describe('ENGL-016 process-flow (MATH-013 renderer) on an English step', () => {
  it('#1 Print Directionality: the title starts right of the badge and wraps', () => {
    const l = layoutStep({ title: 'Begin at the top left corner of the page.', note: 'Read each line from left to right, then sweep back to the start of the next line' }, 210)
    expect(l.textX).toBeGreaterThanOrEqual(30)
    expect(l.noteLines.length).toBeGreaterThan(1)
    const maxTitle = Math.floor(l.textW / 7)
    for (const line of l.titleLines) expect(line.length).toBeLessThanOrEqual(maxTitle)
  })
})
