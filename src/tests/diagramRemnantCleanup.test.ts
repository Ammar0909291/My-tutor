/**
 * WHAT A REMOVED TEXT DIAGRAM LEAVES BEHIND, ON A TURN WITH NO FIGURE.
 *
 * Production, 2026-09-24 (disposable QA accounts, deployed app): after the
 * honest "I don't have a picture for this one…" line, learners still read
 * pointers at a drawing that did not exist. Every case below is the model's
 * text as it reached the learner, minus that acknowledgement line (which the
 * route adds after these guards run).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { stripUnbackedFigureReferences, pointerOnlyFallback } from '@/lib/teaching/figureReference'
import { stripUnbackedAsciiDiagram, isStandaloneArtLine } from '@/lib/teaching/asciiDiagramGuard'

/** The route's order: reference check, diagram guard, reference check again. */
const clean = (text: string) => {
  const a = stripUnbackedFigureReferences(text, false)
  const b = stripUnbackedAsciiDiagram(a.text, false)
  const c = stripUnbackedFigureReferences(b.text, false)
  return { text: c.text, onlyPointer: a.onlyPointer === true || c.onlyPointer === true }
}
const POINTER = /\b(arrows?|layout)\b|---|\[Promoter\]|^\s*\*?[A-Z]\s*=/im

describe('production remnants are removed, and the teaching after them is kept', () => {
  it('photosynthesis: a stray label and "Follow the arrows from…"', () => {
    const out = clean('Light\n\nFollow the arrows from light energy to the production of glucose.').text
    expect(out).toBe('Trace the steps from light energy to the production of glucose.')
  })

  it('photosynthesis (run 2): the whole reply was one arrow sentence — its content survives', () => {
    const out = clean('Follow the arrows from water splitting at PSII through the electron transport chain to produce NADPH and ATP, then see how those molecules power the Calvin cycle to turn CO₂ into sugar.').text
    expect(out).toMatch(/^Trace the steps from water splitting at PSII/)
    expect(out).not.toMatch(POINTER)
  })

  it('transcription: a one-line text drawing with its caption, then an arrow pointer', () => {
    const t = 'DNA (double helix)\n5\'---[Promoter]------[Coding region]---[Poly‑A signal]---3\'\n\nFollow the arrow from the template strand, through RNA polymerase II, to see how the new RNA strand is synthesized in the 5′→3′ direction.'
    const out = clean(t).text
    expect(out).toBe('Trace the steps from the template strand, through RNA polymerase II, to see how the new RNA strand is synthesized in the 5′→3′ direction.')
  })

  it('transcription (run 2): "This layout shows…" becomes a plain statement; the question stays', () => {
    const t = 'This layout shows the sequence of events from the promoter region on the DNA all the way to the mature messenger RNA ready for export to the cytoplasm.\n\nWhat do you notice about the order of these steps?'
    const out = clean(t).text
    expect(out).toMatch(/^Here is the sequence of events from the promoter region/)
    expect(out).toContain('What do you notice about the order of these steps?')
  })

  it('nucleic-acid structure: the symbol legend of a removed drawing goes, the sentence it prefixed stays', () => {
    const t = '*P = phosphate, C = deoxyribose sugar; the two backbones run in opposite (antiparallel) directions and the letters in the middle are complementary base pairs (A pairs with T, G with C).'
    expect(clean(t).text).toBe('The two backbones run in opposite (antiparallel) directions and the letters in the middle are complementary base pairs (A pairs with T, G with C).')
  })

  it('word classes: a reply that is NOTHING but a pointer is flagged, not shipped', () => {
    const r = clean('Use this layout to picture where a word belongs based on what job it’s doing.')
    expect(r.onlyPointer).toBe(true)
    expect(pointerOnlyFallback('Overview of Word Classes', 'An introduction to the eight traditional parts of speech as functional categories of English words.'))
      .toBe('Overview of Word Classes — An introduction to the eight traditional parts of speech as functional categories of English words.')
  })
})

describe('nothing is touched when a figure IS on screen, or when there is no remnant', () => {
  it('with a figure on screen, arrows and layouts are real and stay', () => {
    const t = 'Follow the arrows from light energy to the production of glucose.'
    expect(stripUnbackedFigureReferences(t, true).text).toBe(t)
    const art = 'DNA\n5\'---[Promoter]---3\''
    expect(stripUnbackedAsciiDiagram(art, true).stripped).toBe(false)
  })

  it('ordinary prose using the same words is left alone', () => {
    for (const t of [
      'Follow the steps of the method carefully and check each unit.',
      'The layout of the periodic table reflects electron configuration trends.',
      'Set x = 2, y = 3 and substitute into the equation.',
      'A short arrow in the equation means the reaction is reversible.',
    ]) {
      expect(clean(t).text, t).toBe(t)
    }
  })

  it('an orphan short line is only dropped when a drawing was just removed around it', () => {
    const t = 'Key idea\n\nEnergy is conserved in every closed system.'
    expect(clean(t).text).toBe(t)
  })

  it('art-line detection: labels on connectors are art; tables, rules and prose are not', () => {
    expect(isStandaloneArtLine("5'---[Promoter]------[Coding region]---3'")).toBe(true)
    expect(isStandaloneArtLine('Reactants ---> Products')).toBe(true)
    expect(isStandaloneArtLine('| --- | --- |')).toBe(false)
    expect(isStandaloneArtLine('---')).toBe(false)
    expect(isStandaloneArtLine('+-------------------+')).toBe(false)
    expect(isStandaloneArtLine('The reaction goes from reactants --> products when heated strongly enough.')).toBe(false)
  })
})

describe('the route runs the reference check again after the diagram guard, and replaces a pointer-only turn', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('order: reference check -> diagram guard -> reference check on what it left', () => {
    const first = route.indexOf('const figures = stripUnbackedFigureReferences(cleanText, figureOnScreen)')
    const guard = route.indexOf('const asciiDiagram = stripUnbackedAsciiDiagram(cleanText, figureOnScreen)')
    const again = route.indexOf('const leftovers = stripUnbackedFigureReferences(cleanText, figureOnScreen)')
    expect(first).toBeGreaterThan(0)
    expect(guard).toBeGreaterThan(first)
    expect(again).toBeGreaterThan(guard)
  })
  it('a pointer-only turn is replaced from the KG, only when no figure is on screen', () => {
    expect(route).toMatch(/!figureOnScreen && \(figures\.onlyPointer \|\| leftovers\.onlyPointer \|\| cleanText\.trim\(\)\.length === 0\) && resolvedConceptId/)
    expect(route).toMatch(/cleanText = pointerOnlyFallback\(node\.title, node\.description\)/)
  })
})
