/**
 * A colour the tutor gives a part of the figure must be one the figure has.
 * Production case: bio.mol.dna-replication, 2026-09-24 — "helicase (the orange
 * block)" over a scene whose enzymes are violet dots.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { enforceFigureColours, familyOfHex, sceneColourFamilies } from '@/lib/teaching/visual/figureFidelity'
import { buildDNAReplicationScene } from '@/lib/teaching/sceneGenerators/dnaReplication'
import { ROLE, ROLE_LIGHT } from '@/lib/teaching/sceneGenerators/visualDesign'

const DNA = sceneColourFamilies(buildDNAReplicationScene())

describe('colour families are read from the scene itself', () => {
  it('the shared palette maps to the words a learner would use', () => {
    expect(familyOfHex(ROLE.input)).toBe('red')
    expect(familyOfHex(ROLE.output)).toBe('blue')
    expect(familyOfHex(ROLE.aid)).toBe('purple')
    expect(familyOfHex(ROLE.result)).toBe('green')
    expect(familyOfHex(ROLE_LIGHT.result)).toBe('green')
    expect(familyOfHex('#f59e0b')).toBe('orange')
    expect(familyOfHex('not-a-colour')).toBeNull()
  })

  it('the DNA replication figure has no orange and no yellow; its slate strands count as grey', () => {
    expect(DNA.has('orange')).toBe(false)
    expect(DNA.has('yellow')).toBe(false)
    expect(DNA.has('grey')).toBe(true)
    expect(DNA.has('purple')).toBe(true)
  })
})

describe('false colour claims about the figure are removed, the sentence kept', () => {
  it('the production sentence', () => {
    const t = 'You’ll see the two parental DNA strands labeled “parental DNA” that split apart at the “replication fork” where the enzyme **helicase** (the orange block) is unwinding the double helix.'
    const r = enforceFigureColours(t, DNA)
    expect(r.changed).toBe(true)
    expect(r.text).toBe('You’ll see the two parental DNA strands labeled “parental DNA” that split apart at the “replication fork” where the enzyme **helicase** is unwinding the double helix.')
    expect(r.removed).toEqual(['(the orange block)'])
  })

  it('an adjective and an "in <colour>" phrase', () => {
    expect(enforceFigureColours('In the diagram the yellow line is the template.', DNA).text)
      .toBe('In the diagram the line is the template.')
    expect(enforceFigureColours('The primers are shown in orange on the figure.', DNA).text)
      .toBe('The primers are shown on the figure.')
  })
})

describe('left alone', () => {
  it('true colours of the figure', () => {
    const t = 'In the diagram, the green arrows are the new strands and the purple dots are the enzymes; the red segments are primers.'
    expect(enforceFigureColours(t, DNA).changed).toBe(false)
  })
  it('colour about the world, not the figure', () => {
    for (const t of ['Red light has a longer wavelength than blue light.', 'Green plants make their own food.', 'White blood cells fight infection (orange juice has vitamin C).']) {
      expect(enforceFigureColours(t, DNA).text, t).toBe(t)
    }
  })
  it('unknown figure colours (a card or chart) change nothing', () => {
    expect(enforceFigureColours('The orange block in the diagram is helicase.', new Set()).changed).toBe(false)
  })
})

describe('route wiring', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  it('checks only an on-screen SCENE, after the figure-reference repairs', () => {
    const refs = route.indexOf('const leftovers = stripUnbackedFigureReferences(cleanText, figureOnScreen)')
    const fid = route.indexOf('enforceFigureColours(cleanText, sceneColourFamilies(payload.sceneSpec))')
    expect(refs).toBeGreaterThan(0)
    expect(fid).toBeGreaterThan(refs)
    expect(route).toMatch(/if \(onScreen && payload\?\.renderer === 'scene'\)/)
  })
})
