/**
 * Release blocker: visual-MEDIUM vocabulary must not hijack concept resolution.
 *
 * A learner in a Kinematics lesson typing "show me a graph" wants a
 * velocity-time graph. Before this fix the concept matcher resolved the word
 * to `math.disc.graph` — the graph-THEORY concept — started an excursion, and
 * the visual contract told the model a vertices-and-edges figure was correct.
 *
 * The words are genuinely ambiguous and no existing signal separated them:
 * "show me a graph" and "teach me graph" both produce
 * {math.disc.graph, EXACT_TITLE, confidence 0.95, 1 token}. The distinction is
 * how the word is USED, which is what these tests pin.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isMediumUsage } from '@/lib/teaching/visual/resolveVisualTarget'
import { detectLearnerRequest, VISUAL_MEDIUM_NOUNS } from '@/lib/teaching/masteryGate'

const KINEMATICS = 'phys.mech.kinematics-1d'
const VECTOR = 'math.linalg.vector'
const CALORIMETRY = 'phys.therm.calorimetry'

const decide = (message: string, lessonConceptId: string) =>
  resolveVisual({
    subject: 'physics', message, lessonConceptId,
    learnerRequest: detectLearnerRequest(message),
  })

describe('medium words never hijack the lesson concept', () => {
  it.each([
    'show me a graph', 'draw a graph', 'graph it', 'plot this',
    'show me a diagram', 'show me a picture', 'show me an image',
  ])('%j stays on the kinematics lesson, graphical, no excursion', (message) => {
    const d = decide(message, KINEMATICS)
    expect(d.conceptId).toBe(KINEMATICS)
    expect(d.excursion).toBe(false)
    expect(d.graphical).toBe(true)
  })

  it('the exact production blocker: "show me a graph" is not graph theory', () => {
    expect(decide('show me a graph', KINEMATICS).conceptId).not.toBe('math.disc.graph')
  })
})

describe('genuine concept requests still excurse', () => {
  it.each([
    'teach me graph theory', 'what is graph theory', 'teach me graph', 'explain graph theory',
  ])('%j resolves to the Graph concept', (message) => {
    const d = decide(message, KINEMATICS)
    expect(d.conceptId).toBe('math.disc.graph')
    expect(d.excursion).toBe(true)
  })

  it('Tree and Set remain teachable concepts — they are not medium words', () => {
    expect(decide('teach me trees', KINEMATICS).conceptId).toBe('cs.struct.trees')
    expect(decide('teach me sets', KINEMATICS).conceptId).toBe('cs.data.sets')
  })

  it('a real concept behind a medium word still wins the ranking', () => {
    // "show me vector graph" ranks {Graph, Graph, Vector}. Dropping the medium
    // matches must promote Vector rather than falling back to the lesson.
    expect(decide('show me vector graph', KINEMATICS).conceptId).toBe(VECTOR)
  })

  it('the original excursion bug stays fixed', () => {
    const d = decide('Teach me vector with diagram', CALORIMETRY)
    expect(d.conceptId).toBe(VECTOR)
    expect(d.excursion).toBe(true)
    expect(d.graphical).toBe(true)
  })

  it('a teaching cue elsewhere does not rescue a medium usage', () => {
    // "teach" is present, but it governs "vector", not "graph".
    expect(decide('teach me vector with graph', CALORIMETRY).conceptId).toBe(VECTOR)
  })
})

describe('isMediumUsage — the discriminator itself', () => {
  it('single medium noun with no teaching cue is medium usage', () => {
    expect(isMediumUsage('show me a graph', 'Graph')).toBe(true)
    expect(isMediumUsage('graph it', 'Graph')).toBe(true)
  })

  it('a teaching cue within the window makes it a topic', () => {
    expect(isMediumUsage('teach me graph', 'Graph')).toBe(false)
    expect(isMediumUsage('what is a graph', 'Graph')).toBe(false)
    expect(isMediumUsage('explain graph theory', 'Graph')).toBe(false)
  })

  it('multi-word titles are never medium usage', () => {
    expect(isMediumUsage('show me a graph coloring', 'Graph Coloring')).toBe(false)
    expect(isMediumUsage('show me the graph of a function', 'Graph of a Function')).toBe(false)
  })

  it('non-medium titles are never medium usage', () => {
    expect(isMediumUsage('teach me trees', 'Trees')).toBe(false)
    expect(isMediumUsage('teach me sets', 'Sets')).toBe(false)
    expect(isMediumUsage('show me a vector', 'Vector')).toBe(false)
  })

  it('the vocabulary has ONE source of truth', () => {
    // Defined in masteryGate beside DIAGRAM_RE, which is built from it.
    expect(VISUAL_MEDIUM_NOUNS).toContain('graph')
    expect(VISUAL_MEDIUM_NOUNS).toContain('chart')
    expect(VISUAL_MEDIUM_NOUNS).not.toContain('tree')
    expect(VISUAL_MEDIUM_NOUNS).not.toContain('set')
  })
})
