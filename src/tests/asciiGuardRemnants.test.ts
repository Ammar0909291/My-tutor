/**
 * R10 (Chemistry visual closure, 2026-10-09) — the three remnants of a removed drawing that the ASCII guard let through,
 * measured on the real function: an unfenced +---+ box, an unfenced Lewis structure, and orphan strokes ("|", "v") glued to
 * the sentence after them — plus a real half-equation that Pass 5 deleted as if it were a drawing. Each case below is
 * paired with the ordinary text that must NOT be touched.
 */
import { describe, expect, it } from 'vitest'
import { stripUnbackedAsciiDiagram, isStandaloneArtLine } from '@/lib/teaching/asciiDiagramGuard'

const run = (t: string, figure = false) => stripUnbackedAsciiDiagram(t, figure)

describe('a drawn +---+ box goes, with the lead-in that pointed at it', () => {
  it('two edges and a row, unfenced', () => {
    const t = 'Here is the cell:\n\n+--------+--------+\n|   Zn   |   Cu   |\n+--------+--------+\n\nZinc is oxidised at the anode.'
    expect(run(t).text).toBe('Zinc is oxidised at the anode.')
  })
  it('a box with an arrow label on its edge ("+------+ ← Glass")', () => {
    expect(run('Here is a sketch of the glass:\n\n+-------------------+ ← Glass\n|                   |\n+-------------------+\n\nWater molecules move.').text).toBe('Water molecules move.')
  })
  it('is left alone when a real figure is on screen (figure-gated like Passes 3-5)', () => {
    const t = 'Here is the cell:\n\n+--------+--------+\n|   Zn   |   Cu   |\n+--------+--------+\n\nZinc is oxidised.'
    expect(run(t, true).text).toBe(t)
  })
  it('a markdown table and a horizontal rule are never a box', () => {
    const table = 'Compare:\n\n| Metal | E° (V) |\n|---|---|\n| Zn | −0.76 |\n| Cu | +0.34 |\n\nCopper is the cathode.'
    expect(run(table).text).toBe(table)
    expect(run('Part one\n\n---\n\nPart two').text).toBe('Part one\n\n---\n\nPart two')
  })
})

describe('an unfenced Lewis structure goes; a sentence about one stays', () => {
  it('dot form: H : O : H over its lone-pair dots', () => {
    expect(run('The Lewis structure of water is:\n\n  H : O : H\n    ..\n\nTwo lone pairs sit on the oxygen.').text).toBe('Two lone pairs sit on the oxygen.')
  })
  it('colon form :O::C::O:', () => {
    expect(run('Carbon dioxide:\n\n:O::C::O:\n\nHas two double bonds.').text).toBe('Has two double bonds.')
  })
  it('skeletal form with a stem', () => {
    expect(run('Ammonia looks like this:\n\n      H\n      |\n  H - N - H\n\nOne lone pair is on N.').text).toBe('One lone pair is on N.')
  })
  it('prose that mentions bonds, and a reaction on its own line, are untouched', () => {
    const prose = 'Water has two O–H bonds and two lone pairs, so it is bent.'
    expect(run(prose).text).toBe(prose)
    const eq = 'The overall change is:\n\nN2 + 3H2 -> 2NH3\n\nAmmonia forms.'
    expect(run(eq).text).toBe(eq)
  })
})

describe('orphan strokes are peeled off the sentence they were glued to', () => {
  it('"|" and "v" above prose', () => {
    expect(run('|\nv\nThe next step is nucleophilic attack.').text).toBe('The next step is nucleophilic attack.')
  })
  it('a lone "v" with no stroke above it is a symbol, not an arrow head', () => {
    const t = 'v\nis the speed of the wave.'
    expect(run(t).text).toBe(t)
  })
  it('a bullet list, a table row and a numbered step are never peeled', () => {
    const t = '- first\n- second\n\n| a | b |\n\n1. step one'
    expect(run(t).text).toBe(t)
  })
})

describe('a reaction on one line is content, not a drawing (Pass 5)', () => {
  it('Zn --> Zn2+ + 2e- survives with no figure attached', () => {
    const t = 'At the anode:\n\nZn --> Zn2+ + 2e-\n\nOxidation happens at the anode.'
    expect(run(t).text).toBe(t)
    expect(isStandaloneArtLine('Zn --> Zn2+ + 2e-')).toBe(false)
  })
  it("a drawn process line with bracketed labels is still art", () => {
    expect(isStandaloneArtLine("5'---[Promoter]------[Coding region]---[Poly-A signal]---3'")).toBe(true)
  })
})
