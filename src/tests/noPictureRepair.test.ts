/**
 * A picture request that cannot be met must still get an explanation (visual/noPictureRepair.ts). The stubs below are the REAL replies
 * a learner received on production on 2026-10-20 (the text after the strips, as recorded on the wire by the learner-experience run):
 * each is "I don't have a picture for this one, so I'll explain it in words." followed by something that explains nothing.
 */
import { describe, it, expect } from 'vitest'
import {
  dropFigureTalk,
  pictureReplyIsNotAnExplanation, acceptNoPictureRepair, buildNoPictureRepairAppendix, withoutDiagramDebris, MIN_EXPLANATION_CHARS,
  judgeNoPictureRepair, dropQuestions, buildNoPictureSecondAttemptAppendix, dropOrphanFigureReferences,
} from '@/lib/teaching/visual/noPictureRepair'
import { stripPhantomVisualClaims, isPhantomVisualClaim } from '@/lib/teaching/visualRegistry'

const GREENS_STUB = `y\n \nThe closed curve C (the circle) is walked around counter‑clockwise, so the region D stays on your left as you move along C.`
const MECHANISM_STUB = `A + B ⇌ I (fast pre‑equilibrium)`
const SOCIO_STUB = `- **Social Factors**: the left box shows how things like class, gender, age, or identity can shape the way people speak—even when they live in the same neighborhood.\n- **Code‑Switching**: the right box shows a speaker who moves fluidly between languages or registers, choosing the one that fits the social situation.`
const CATALYSIS_STUB = `This picture walks through the three‑step heterogeneous mechanism: reactants adsorb on active sites, react on the surface, and the product desorbs, while the catalyst surface is regenerated.`
const IMAGINE_STUB = `Imagine this picture: the bold curve C encloses the region D, and the arrow indicates the required counter‑clockwise (positive) orientation.`

/** A real explanation in words (the heterogeneous-catalysis reply that followed, production 2026-10-20). */
const EXPLANATION = `In heterogeneous catalysis the whole reaction happens on the surface of a solid material. The process always follows three distinct steps. First, adsorption: reactant molecules approach the solid and become attached to specific locations on its surface called active sites, usually by a chemical bond. Second, the surface reaction: while the reactants are held at the active sites their atoms rearrange and form new bonds, and because the surface already shares electrons with them, breaking the original bonds needs less energy than in the gas phase, which is why the catalyst lowers the activation energy. Third, desorption: the new product molecules detach and go back into the surrounding phase, so the active site is free to start the cycle again.`

describe('a reply to an unmet picture request that explains nothing is detected', () => {
  it.each([
    ['Green\'s theorem: a stray axis letter and one sentence', GREENS_STUB],
    ['reaction mechanisms: one line of the mechanism', MECHANISM_STUB],
    ['sociolinguistics: describes boxes that do not exist', SOCIO_STUB],
    ['heterogeneous catalysis: "this picture walks through"', CATALYSIS_STUB],
    ['Green\'s theorem, second ask: "imagine this picture" and one sentence', IMAGINE_STUB],
    ['an empty reply', ''],
  ])('%s', (_name, text) => {
    expect(pictureReplyIsNotAnExplanation(text)).toBe(true)
  })

  it('a real explanation in words is left alone', () => {
    expect(EXPLANATION.length).toBeGreaterThan(MIN_EXPLANATION_CHARS)
    expect(pictureReplyIsNotAnExplanation(EXPLANATION)).toBe(false)
  })

  it('a long reply that is mostly a description of a figure that is not there is still not an explanation', () => {
    const long = Array.from({ length: 6 }, (_, i) => `The ${['left', 'right', 'top', 'bottom', 'first', 'second'][i]} box shows a different part of the idea and what it is called in detail.`).join(' ')
    expect(long.length).toBeGreaterThan(MIN_EXPLANATION_CHARS)
    expect(pictureReplyIsNotAnExplanation(long)).toBe(true)
  })
})

describe('stripPhantomVisualClaims removes a described figure that is not there (the widened detector)', () => {
  it('"This picture walks through …" and "the left box shows …" are phantom claims', () => {
    expect(isPhantomVisualClaim(CATALYSIS_STUB)).toBe(true)
    expect(isPhantomVisualClaim('the left box shows how class shapes speech.')).toBe(true)
    expect(isPhantomVisualClaim('The first arrow points to the intermediate.')).toBe(true)
  })
  it('ordinary teaching prose that merely contains those words is not', () => {
    for (const s of [
      'The left side of the equation is the rate.',
      'The first step is adsorption, and the second step is the surface reaction.',
      'Draw a box around the answer in your own notes.',
      'The right answer is the one that keeps the sum constant.',
      'A flow chart is a way to plan an algorithm.',
    ]) expect(isPhantomVisualClaim(s), s).toBe(false)
  })
  it('keeps the explanation around a removed sentence', () => {
    const text = `Adsorption holds the reactants on the surface. This picture walks through the three steps. Desorption then frees the product.`
    expect(stripPhantomVisualClaims(text)).toBe('Adsorption holds the reactants on the surface. Desorption then frees the product.')
  })
})

describe('the debris a stripped diagram leaves behind is removed before judging', () => {
  it('drops one- and two-character lines (an axis letter, a bullet) but keeps equation lines', () => {
    expect(withoutDiagramDebris('y\n \nx\nSome real sentence about the curve.')).toBe('Some real sentence about the curve.')
    expect(withoutDiagramDebris('A + B ⇌ I\n|\n→')).toContain('A + B ⇌ I')
  })
})

describe('the retry is accepted only when it is an explanation in words', () => {
  it('accepts a real explanation', () => { expect(acceptNoPictureRepair(EXPLANATION)).toBe(EXPLANATION) })
  it('keeps the explanation of a retry that tacks a question on, and drops the question', () => {
    expect(acceptNoPictureRepair(`${EXPLANATION} Does that make sense?`)).toBe(EXPLANATION)
    expect(dropQuestions('First paragraph here. Is it clear?\n\nSecond paragraph.')).toBe('First paragraph here.\n\nSecond paragraph.')
  })
  it('a retry that is only questions is refused with the reason "short"', () => {
    expect(judgeNoPictureRepair('What do you think a language family is? How would you test it? Why does it matter?')).toEqual({ text: null, reason: 'short' })
  })
  it('refuses with a named reason: fence, short, figure-talk', () => {
    expect(judgeNoPictureRepair(`${EXPLANATION}\n\n\`\`\`\nA --> B\n\`\`\``).reason).toBe('fence')
    expect(judgeNoPictureRepair(MECHANISM_STUB).reason).toBe('short')
    const talk = Array.from({ length: 6 }, (_, i) => `The ${['left', 'right', 'top', 'bottom', 'first', 'second'][i]} box shows a different part of the idea and what it is called in detail.`).join(' ')
    expect(judgeNoPictureRepair(talk).reason).toBe('figure-talk')
    expect(judgeNoPictureRepair(EXPLANATION).reason).toBe('ok')
  })
  it('the second attempt is stricter than the first', () => {
    const second = buildNoPictureSecondAttemptAppendix()
    expect(second).toContain(buildNoPictureRepairAppendix())
    expect(second).toMatch(/PREVIOUS ATTEMPT DID NOT COMPLY/)
    expect(second).toMatch(/first character must be a letter/)
  })
  it('rejects a retry that draws a fenced block', () => { expect(acceptNoPictureRepair(`${EXPLANATION}\n\n\`\`\`\nA --> B\n\`\`\``)).toBeNull() })
  it('rejects a retry that is itself a stub or still describes a figure', () => {
    expect(acceptNoPictureRepair(MECHANISM_STUB)).toBeNull()
    expect(acceptNoPictureRepair(SOCIO_STUB)).toBeNull()
  })
  it('the instruction forbids drawing, claiming a figure, and asking a question', () => {
    const a = buildNoPictureRepairAppendix()
    expect(a).toMatch(/IN WORDS/)
    expect(a).toMatch(/no ASCII or box art/)
    expect(a).toMatch(/Do NOT say or imply that a picture/)
    expect(a).toMatch(/Do NOT ask the learner a question/)
  })
})

describe('talk about a figure that is gone is detected beyond the phantom-claim list (production, 2026-10-20)', () => {
  const ACCENTS = `I can’t pull up a picture, so let me describe a simple visual layout in text that captures the systematic difference between two well‑known English accents.\n\nThis table lets you see the **systematic pattern**: the same sound rule (dropping post‑vocalic /r/) applies across many different words, not just one isolated case.`
  const APPLIED = `Imagine a simple flow that starts with a box labeled “Teaching method under review.” An arrow leads to a second box called “Check against acquisition‑research criteria,” which lists items such as meaningful input and communicative practice. From that box two arrows branch: one points to “Method meets criteria.”`
  const TREE = `Imagine a simple tree diagram that maps language families: at the very bottom write Proto‑World, and from that trunk draw three main branches upward.`
  it.each([['the table that was stripped', ACCENTS], ['imagine a flow of boxes and arrows', APPLIED], ['imagine a tree diagram and draw it', TREE]])('%s is not an explanation', (_n, text) => {
    expect(pictureReplyIsNotAnExplanation(text)).toBe(true)
  })
  it('a sentence introducing a table that IS in the reply is kept; one pointing at a vanished table is dropped', () => {
    expect(dropOrphanFigureReferences('This table lets you see the pattern.\n\n| a | b |\n| 1 | 2 |')).toContain('This table lets you see')
    expect(dropOrphanFigureReferences('The rule applies everywhere. This table lets you see the systematic pattern. That is why accents are rule-governed.')).toBe('The rule applies everywhere. That is why accents are rule-governed.')
    expect(dropOrphanFigureReferences('This table lets you see the pattern.')).toBe('This table lets you see the pattern.')   // never to an empty reply
  })
  it('axis-tick debris of a stripped plot is removed ("  100 |    *")', () => {
    expect(withoutDiagramDebris('Imagine the plot.\nIntensity\n 100 |                *\nThe right-most peak is the molecular ion.')).not.toMatch(/100 \|/)
  })
})

describe('a retry that explains in words but opens with talk about a diagram keeps the explanation and loses the talk (production, 2026-10-21)', () => {
  const RETRY = `I can’t display an actual picture, but imagine the following flow as a simple text diagram that shows how we evaluate a language‑teaching method against research findings: ${EXPLANATION}`
  it('dropFigureTalk removes the figure sentence and keeps the rest', () => {
    const out = dropFigureTalk(RETRY)
    expect(out).not.toMatch(/imagine the following flow/)
    expect(out).toContain('In heterogeneous catalysis')
  })
  it('judgeNoPictureRepair accepts it, without the figure sentence', () => {
    const v = judgeNoPictureRepair(RETRY)
    expect(v.reason).toBe('ok')
    expect(v.text).not.toMatch(/text diagram/)
  })
})
