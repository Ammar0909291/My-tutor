/**
 * WP-7 — the visual tier's two projections. The load-bearing assertions are
 * the boundary ones: VisualAvailability leaks no production identifier, and
 * every existing shape is unchanged when no intent is formed.
 */
import { describe, it, expect } from 'vitest'
import {
  VISUAL_PURPOSES, VISUAL_FORM_CLASSES, VISUAL_AVAILABILITY_VERSION,
  validateVisualIntent, a11yDescriptionSatisfies,
  publishVisualAvailability, emptyVisualAvailability,
  type VisualIntent,
} from '@/lib/teaching/visualIntent'
import { createRRMEntry, hasClaimBeenRendered } from '@/lib/teaching/renderedRealityModel'

const intent = (o: Partial<VisualIntent> = {}): VisualIntent => ({
  purpose: 'STRUCTURE-REVEAL',
  claim: 'A cell membrane has an inner and an outer layer.',
  ...o,
})

describe('WP-7 · VD-2 / VD-3 vocabularies', () => {
  it('closes the purpose set at the ten VP-A…VP-J values', () => {
    expect(VISUAL_PURPOSES).toHaveLength(10)
    expect(VISUAL_PURPOSES).toContain('CONTRAST-DISCRIMINATE')
    expect(VISUAL_PURPOSES).toContain('MANIPULATE-DISCOVER')
  })

  it('names form classes, never renderers', () => {
    for (const bad of ['scene_spec', 'visual_spec', 'dynamic_component', 'interactive_widget']) {
      expect(VISUAL_FORM_CLASSES as readonly string[]).not.toContain(bad)
    }
  })
})

describe('WP-7 · VH-1 — VisualIntent validation', () => {
  it('accepts a well-formed intent', () => {
    expect(validateVisualIntent(intent())).toEqual([])
  })

  it('rejects an intent whose claim cannot be written', () => {
    expect(validateVisualIntent(intent({ claim: '   ' }))).toEqual([
      expect.stringContaining('claim is required'),
    ])
  })

  it('requires mustVaryExactlyOne for CONTRAST-DISCRIMINATE', () => {
    const problems = validateVisualIntent(intent({ purpose: 'CONTRAST-DISCRIMINATE' }))
    expect(problems.join(' ')).toContain('mustVaryExactlyOne')
  })

  it('allows interaction only for LEARNER-CONSTRUCT / MANIPULATE-DISCOVER', () => {
    expect(validateVisualIntent(intent({ constraints: { interactionRequired: true } })).join(' '))
      .toContain('interactionRequired is true only')
    expect(validateVisualIntent(intent({
      purpose: 'MANIPULATE-DISCOVER', constraints: { interactionRequired: true },
    }))).toEqual([])
  })
})

describe('WP-7 · VH-3 — a11y instructional equivalence', () => {
  it('fails a label that passes the old present-and-non-empty bar', () => {
    const r = a11yDescriptionSatisfies(
      { a11yRequirement: 'The inner layer is continuous and the outer layer is punctuated by pores.' },
      'A diagram of a cell membrane.',
    )
    expect(r.satisfied).toBe(false)
    expect(r.reason).toContain('instructional equivalence')
  })

  it('accepts a description that carries the instructional content', () => {
    const r = a11yDescriptionSatisfies(
      { a11yRequirement: 'Inner layer continuous; outer layer has pores.' },
      'The inner layer runs unbroken around the cell, while the outer layer is interrupted by evenly spaced pores.',
    )
    expect(r.satisfied).toBe(true)
  })

  it('treats an unstated requirement as unmet, not as a pass', () => {
    expect(a11yDescriptionSatisfies({}, 'Some description').satisfied).toBe(false)
  })
})

describe('WP-7 · VH-7 — VisualAvailability boundary', () => {
  it('carries only form classes and the version', () => {
    const a = publishVisualAvailability({
      conceptId: 'bio.cell', formClassesAvailable: ['labelled-static-diagram', 'matrix'],
      formClassesGenerableInTurn: ['matrix'],
    })
    expect(Object.keys(a).sort()).toEqual(
      ['conceptId', 'formClassesAvailable', 'formClassesGenerableInTurn', 'projectionVersion'],
    )
    expect(a.projectionVersion).toBe(VISUAL_AVAILABILITY_VERSION)
  })

  it('drops anything that is not a known form class — no renderer can leak', () => {
    const a = publishVisualAvailability({
      conceptId: 'bio.cell',
      formClassesAvailable: ['labelled-static-diagram', 'scene_spec', 'asset:42', 'cache-key-9'],
    })
    expect(a.formClassesAvailable).toEqual(['labelled-static-diagram'])
  })

  it('keeps generable a subset of available', () => {
    const a = publishVisualAvailability({
      conceptId: 'bio.cell', formClassesAvailable: ['matrix'],
      formClassesGenerableInTurn: ['matrix', 'plot'],
    })
    expect(a.formClassesGenerableInTurn).toEqual(['matrix'])
  })

  it('distinguishes an empty projection from an absent one', () => {
    const e = emptyVisualAvailability('bio.cell')
    expect(e.formClassesAvailable).toEqual([])
    expect(e.projectionVersion).toBe(VISUAL_AVAILABILITY_VERSION)
  })
})

describe('WP-7 · VH-4 — RRM records the intent', () => {
  const base = {
    visualType: null, visualSpec: { kind: 'x' }, sceneSpec: null,
    dynamicVisualizationCode: null, responseVisual: null,
    matchedConcept: 'bio.cell', turnNumber: 3,
  }

  it('omits visualIntent entirely when no caller supplies one', () => {
    const e = createRRMEntry(base)!
    expect(e).not.toHaveProperty('visualIntent')
    expect(Object.keys(e).sort()).toEqual(
      ['matchedConcept', 'sourcePipeline', 'turnPosition', 'visualIdentity', 'visualSemantics'],
    )
  })

  it('records the intent when one is supplied', () => {
    const e = createRRMEntry({ ...base, visualIntent: intent() })!
    expect(e.visualIntent?.purpose).toBe('STRUCTURE-REVEAL')
  })

  it('answers "has this claim been made" — the query the log could not answer before', () => {
    const withIntent = createRRMEntry({ ...base, visualIntent: intent() })!
    const withoutIntent = createRRMEntry(base)!
    expect(hasClaimBeenRendered([withIntent], intent().claim)).toBe(true)
    expect(hasClaimBeenRendered([withoutIntent], intent().claim)).toBe(false)
    expect(hasClaimBeenRendered([withIntent], 'a different claim')).toBe(false)
  })
})
