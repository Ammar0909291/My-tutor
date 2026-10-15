/**
 * TWO TUTOR-TEXT DEFECTS FROM THE 2026-10-14 LIVE CHECKS (Test7 account, production).
 *
 * D5  "ask me a multiple choice question" → the tutor wrote "I'm sorry—I can't give a multiple-choice question…" while the
 *     Quick Check panel opened with a question. The model is (rightly) told never to write a card, so it refuses; the app
 *     attaches its own reviewed card anyway. The refusal is now replaced by one line introducing the card.
 * D6  "the green arc labelled θ = 90°" over a torque figure whose arc is grey (green is only the torque label). The colour
 *     fidelity check asked only "is green anywhere on screen?". It now also asks "is green on THAT kind of part?".
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { QUIZ_CARD_INTRO, QUIZ_UNANSWERED_LEAD, quizRequestNotice, replaceQuizRefusal } from '@/lib/teaching/quizRequest'
import { enforceFigureColours, enforcePartColours, sceneColourFamilies } from '@/lib/teaching/visual/figureFidelity'
import { buildTorqueScene } from '@/lib/teaching/sceneGenerators/torqueDiagram.pure'
import { buildCarnotScene } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB15'

const REFUSAL = 'I’m sorry—I can’t give a multiple-choice question right now, but here is a short prompt to think about instead.'
const BODY = 'Take a look at the Carnot-cycle diagram: the pressure-versus-volume (P–V) loop has four segments.'

describe('D5 — a refusal of a card the app attaches', () => {
  it('REPRODUCTION: the old behaviour passed the refusal through next to a served card', () => {
    // (the unchanged-text branch is what shipped: quizRequestNotice returned the reply as-is when a new card was attached)
    const out = quizRequestNotice({ cardAttached: true, cardIsTheUnansweredOne: false, poolExhausted: false, conceptTitle: 'Carnot Cycle', reply: `${REFUSAL}\n\n${BODY}` })
    expect(out.reason).toBe('card-served')
    expect(out.text).not.toContain('multiple-choice')   // fixed: it no longer says so
  })

  it('replaces the refusal paragraph with one line introducing the card and keeps the rest', () => {
    const out = replaceQuizRefusal(`${REFUSAL}\n\n${BODY}`)
    expect(out.changed).toBe(true)
    expect(out.text).toBe(`${QUIZ_CARD_INTRO}\n\n${BODY}`)
  })

  it.each([
    "I'm sorry, I can't give you a quiz question here.",
    'Unfortunately I am unable to ask a multiple choice question at the moment.',
    'Sorry — I cannot provide an MCQ.',
    'I can’t do a quick check right now.',
  ])('recognises a refusal: %s', (r) => {
    expect(replaceQuizRefusal(`${r}\n\nMore teaching here.`).text.startsWith(QUIZ_CARD_INTRO)).toBe(true)
  })

  it('leaves alone anything that is not a short refusal about a quiz', () => {
    for (const t of [
      'Quizzes help you remember things, so we will practise this idea.',
      'I am sorry you found that confusing. Let us try again with a simpler example.',
      'Multiple-choice questions are a good way to check understanding.',
      `I'm sorry — I can't give a multiple-choice question ${'because the reason is long and winding, '.repeat(12)}so here is more.`,
    ]) {
      expect(replaceQuizRefusal(t), t.slice(0, 40)).toEqual({ text: t, changed: false })
    }
  })

  it('is idempotent and never touches an empty reply', () => {
    const once = replaceQuizRefusal(`${REFUSAL}\n\n${BODY}`).text
    expect(replaceQuizRefusal(once)).toEqual({ text: once, changed: false })
    expect(replaceQuizRefusal('')).toEqual({ text: '', changed: false })
  })

  it('a card attached this turn: the refusal becomes the intro; a re-offered card gets only its own lead (no second intro)', () => {
    const served = quizRequestNotice({ cardAttached: true, cardIsTheUnansweredOne: false, poolExhausted: false, conceptTitle: 'X', reply: `${REFUSAL}\n\n${BODY}` })
    expect(served.changed).toBe(true)
    expect(served.text.startsWith(QUIZ_CARD_INTRO)).toBe(true)
    const again = quizRequestNotice({ cardAttached: true, cardIsTheUnansweredOne: true, poolExhausted: false, conceptTitle: 'X', reply: `${REFUSAL}\n\n${BODY}` })
    expect(again.text.startsWith(QUIZ_UNANSWERED_LEAD)).toBe(true)
    expect(again.text).not.toContain(QUIZ_CARD_INTRO)
    expect(again.text).not.toMatch(/sorry|multiple-choice/i)
    expect(again.text).toContain(BODY)
  })

  it('NO card attached: the honest "I don\'t have a practice question" lead is unchanged (the refusal is then true)', () => {
    const out = quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: false, conceptTitle: 'X', reply: `${REFUSAL}\n\n${BODY}` })
    expect(out.reason).toBe('no-card-available')
    expect(out.text).toContain("I don't have a practice question I can give you")
  })

  it('the route still calls quizRequestNotice and uses its text only when it changed something', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain('quizRequestNotice({')
    expect(route).toMatch(/if \(notice\.changed\) \{[\s\S]{0,400}cleanText = notice\.text/)
  })
})

describe('D6 — a colour given to a kind of part must be a colour that kind of part has', () => {
  const torque = buildTorqueScene({ leverLength: 2, force: 10, angleDeg: 90 })

  it('REPRODUCTION: the old check let "the green arc" through (green IS on screen — as the torque label)', () => {
    const claim = 'The pivot is the grey mark, and the angle is marked by (the green arc labelled “θ = 90°”) at the end.'
    const old = enforceFigureColours(claim, sceneColourFamilies(torque))
    expect(old.changed).toBe(false)
    expect(sceneColourFamilies(torque).has('green')).toBe(true)
  })

  it('drops the wrong colour and keeps the part: "the green arc" -> "the arc"', () => {
    const out = enforcePartColours('The angle is marked by (the green arc labelled “θ = 90°”) at the end.', torque)
    expect(out.changed).toBe(true)
    expect(out.text).toBe('The angle is marked by (the arc labelled “θ = 90°”) at the end.')
    expect(out.removed).toEqual(['the green arc'])
  })

  it('leaves a TRUE colour claim alone (the force arrow is red-family, the arc is grey)', () => {
    const t = 'The red arrow is the force and the grey arc is the angle.'
    expect(enforcePartColours(t, torque)).toEqual({ text: t, changed: false, removed: [] })
  })

  it('works across the figure: a wrong arrow colour is removed, a right one kept', () => {
    const out = enforcePartColours('In the figure, the blue arrow shows the force. The red arrow is the same force.', torque)
    expect(out.text).toBe('In the figure, the arrow shows the force. The red arrow is the same force.')
  })

  it('leaves ambiguous nouns, colours used about the world, and scenes without that kind of part alone', () => {
    for (const t of [
      'The green line marks the lever.',                     // "line" is ambiguous (bond / path / vector)
      'In the diagram, the green box is the pivot.',          // "box" is not a part noun here
      'Green plants make food. The blue sky is lit by the sun.', // the world, not the figure
    ]) expect(enforcePartColours(t, torque), t).toEqual({ text: t, changed: false, removed: [] })
    // The Carnot scene has arrows (heading arrowheads), curves and dots but no scene "sphere" objects drawn as a different kind
    const carnot = buildCarnotScene()
    const curveFamilies = [...new Set(carnot.steps.flatMap((s) => s.objects).filter((o) => o.type === 'path' || o.type === 'trajectory').map((o) => o.color))]
    expect(curveFamilies.length).toBeGreaterThan(1)
  })

  it('a missing scene or empty text is a no-op', () => {
    expect(enforcePartColours('The green arc.', null)).toEqual({ text: 'The green arc.', changed: false, removed: [] })
    expect(enforcePartColours('', torque).changed).toBe(false)
  })

  it('the route applies it right after the existing check, to scene figures only', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    const i = route.indexOf('enforcePartColours(cleanText, payload.sceneSpec)')
    expect(i).toBeGreaterThan(route.indexOf('enforceFigureColours(cleanText'))
    expect(route.slice(i - 900, i)).toContain("payload?.renderer === 'scene'")
  })
})
