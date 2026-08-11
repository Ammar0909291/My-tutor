/**
 * "CAN YOU GRAPH THIS?" — the form the learner asked for must reach the tutor.
 *
 * ── MEASURED IN PRODUCTION, 2026-08-11, Ohm's Law lesson ────────────────────
 *   "Can you graph this?"       -> curated `electric_circuit` scene
 *   "show me a graph of this"   -> the same circuit
 *   "can you draw a diagram"    -> the same circuit
 *   "show me an animation"      -> the same circuit
 *
 * Four different requests, one figure, and the word the learner chose reached
 * nothing at all.
 *
 * ── WHAT IS AND IS NOT FIXED HERE ───────────────────────────────────────────
 * The circuit is the RIGHT curated figure for Ohm's Law. It is not removed,
 * replaced, demoted, or reordered against any other tier — curated and approved
 * content keeps its authority, and a medium noun never overrides the hierarchy.
 *
 * What was actually harming the learner is the sentence that followed: the
 * tutor was told "a circuit of Ohm's Law is attached" and nothing else, so it
 * presented that circuit as the graph that had been asked for — axes, curve and
 * all. The mismatch is now DECLARED in the contract instead of resolved by
 * swapping figures: the learner gets the best figure the hierarchy has, plus
 * one honest clause saying it is not the form they asked for.
 *
 * ── ONLY UNMISTAKABLE FORMS COUNT ───────────────────────────────────────────
 * "diagram", "picture", "drawing", "image", "visualisation", "sketch" and
 * "illustration" are generic words for "something visual". They constrain
 * nothing and must report nothing, or every ordinary diagram request would
 * start producing an apology.
 */
import { describe, it, expect } from 'vitest'
import { requestedVisualForm, asksForAVisual } from '@/lib/teaching/masteryGate'
import { buildVisualContractBlock, figureMatchesRequestedForm } from '@/lib/teaching/visual/visualContract'
import type { VisualDecision } from '@/lib/teaching/visual/types'

describe('the form the learner named', () => {
  it.each([
    'Can you graph this?',
    'show me a graph of this',
    'is there a chart for this',
    'a graph would help',
    'can I see a plot of that',
    'graph it',
    'plot this',
  ])('reads %s as a plot request', message => {
    expect(requestedVisualForm(message)).toBe('plot')
  })

  it.each([
    'show me an animation',
    'is there a simulation of this',
    'can you show me an animation of it',
    'animate it',
  ])('reads %s as a motion request', message => {
    expect(requestedVisualForm(message)).toBe('motion')
  })

  it.each([
    // Generic media constrain nothing.
    'can you draw a diagram',
    'show me a picture',
    'show me a diagram',
    'any visual for this?',
    'sketch it for me',
    // Not requests at all.
    'the graph of my grades is going down',
    'picture this: a ball rolling',
    'I get the picture',
    'what is a bar chart',
    'explain it again',
    '',
  ])('reports no specific form for %s', message => {
    expect(requestedVisualForm(message)).toBeNull()
  })

  it('does not change whether a visual was requested at all', () => {
    // The form detector is downstream of this decision and must not move it.
    expect(asksForAVisual('can you draw a diagram')).toBe(true)
    expect(asksForAVisual('I get the picture')).toBe(false)
  })
})

describe('does the attached figure satisfy that form', () => {
  it.each([
    ['graph', 'plot', true],
    ['chart', 'plot', true],
    ['motion_graph', 'plot', true],
    ['circuit', 'plot', false],       // THE measured case
    ['crystal', 'plot', false],
    ['force_diagram', 'plot', false],
    ['pendulum', 'motion', true],
    ['projectile', 'motion', true],
    ['crystal', 'motion', false],
    ['circuit', 'motion', false],
  ] as const)('%s against a %s request', (representation, form, expected) => {
    expect(figureMatchesRequestedForm(representation, form)).toBe(expected)
  })

  it('never reports a mismatch when no specific form was asked for', () => {
    expect(figureMatchesRequestedForm('circuit', null)).toBe(true)
    expect(figureMatchesRequestedForm(null, null)).toBe(true)
  })

  it('an unknown representation cannot be claimed to match', () => {
    expect(figureMatchesRequestedForm(null, 'plot')).toBe(false)
  })
})

// A decision shaped like the real Ohm's Law one: a curated circuit scene.
function circuitDecision(): VisualDecision {
  return {
    conceptId: 'phys.em.ohms-law',
    conceptTitle: "Ohm's Law and Resistance",
    graphical: true,
    excursion: false,
    purpose: 'explain',
    representation: 'circuit',
    payload: { renderer: 'scene', sceneSpec: { kind: 'electric_circuit' } as never },
    allowed: [],
    provenance: 'generator:kind-default:electric_circuit',
    continuityReason: null,
    session: null,
    asset: {
      conceptId: 'phys.em.ohms-law',
      conceptTitle: "Ohm's Law and Resistance",
      representation: 'circuit',
      renderer: 'scene',
      scope: 'concept',
      provenance: 'curated',
      semantics: { elements: [], text: [] },
    } as never,
  } as unknown as VisualDecision
}

describe('the contract tells the tutor the truth about the form', () => {
  it('declares the mismatch when a graph was asked for and a circuit is attached', () => {
    const block = buildVisualContractBlock(circuitDecision(), { requestedForm: 'plot' })
    expect(block).toContain('FORM MISMATCH')
    expect(block).toContain('Do NOT call it a graph')
    // And it still serves the figure — the curated content is untouched.
    expect(block).toContain('A FIGURE IS ALREADY BEING RENDERED')
  })

  it('says nothing about form on an ordinary diagram request', () => {
    const block = buildVisualContractBlock(circuitDecision(), { requestedForm: null })
    expect(block).not.toContain('FORM MISMATCH')
  })

  it('says nothing when the figure IS the requested form', () => {
    const d = circuitDecision() as unknown as Record<string, unknown>
    ;(d.asset as Record<string, unknown>).representation = 'graph'
    const block = buildVisualContractBlock(d as unknown as VisualDecision, { requestedForm: 'plot' })
    expect(block).not.toContain('FORM MISMATCH')
  })

  it('the existing contract is byte-identical when no form is supplied', () => {
    // The parameter is optional and every pre-existing caller must be unchanged.
    expect(buildVisualContractBlock(circuitDecision(), {}))
      .toBe(buildVisualContractBlock(circuitDecision()))
  })
})
