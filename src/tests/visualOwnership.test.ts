/**
 * Part 1 runtime fix — the requested concept determines the figure, and V2 is
 * the only selector in a normal production turn.
 *
 * Two defect classes are pinned here:
 *
 *  1. ONE canonical parameter set per generator KIND meant several concepts
 *     shared a generator and were drawn as a different case entirely —
 *     reflection rendered as a convex LENS, the inelastic-collision concept
 *     rendered as an ELASTIC collision, meiosis rendered as mitosis.
 *  2. The legacy pipelines (planVisualTeaching / buildSceneSpec / parametric /
 *     AI scene / dynamic engine) ran on every turn and were merely overwritten
 *     afterwards, so prose keyword-matching still participated in production.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES, ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { sceneStepCount } from '@/lib/teaching/sceneSpec'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

const figureFor = (conceptId: string) =>
  resolveVisual({ message: 'explain this with a diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' })

describe('the concept, not the generator kind, decides the figure', () => {
  it('reflection draws a mirror, not a lens', () => {
    const scene = buildCanonicalScene('ray_optics', 'phys.opt.reflection')
    expect(scene?.title.toLowerCase()).toContain('mirror')
    expect(scene?.title.toLowerCase()).not.toContain('lens')
    // …while refraction keeps the lens default.
    expect(buildCanonicalScene('ray_optics', 'phys.opt.refraction')?.title.toLowerCase()).toContain('lens')
  })

  it('the inelastic concept draws an inelastic collision', () => {
    const scene = buildCanonicalScene('collision', 'phys.mech.collisions-inelastic')
    expect(scene?.title.toLowerCase()).toContain('inelastic')
    // …and the elastic concept is still the elastic case, not "inelastic".
    const elastic = buildCanonicalScene('collision', 'phys.mech.collisions-elastic')?.title.toLowerCase()
    expect(elastic).toContain('elastic')
    expect(elastic).not.toContain('inelastic')
  })

  it('meiosis draws meiosis', () => {
    expect(buildCanonicalScene('cell_division', 'bio.cell.meiosis')?.title.toLowerCase()).toContain('meiosis')
    expect(buildCanonicalScene('cell_division', 'bio.cell.mitosis')?.title.toLowerCase()).toContain('mitosis')
  })

  it('a concept the generator cannot draw faithfully gets no scene at all', () => {
    // A dihybrid cross drawn as a single-gene Punnett square teaches the wrong
    // thing; falling through to the card is the correct answer.
    expect(buildCanonicalScene('punnett_square', 'bio.gen.dihybrid-cross')).toBeNull()
    // No generator and no curated card for this concept => no figure at all,
    // rather than a single-gene Punnett square standing in for a dihybrid one.
    expect(figureFor('bio.gen.dihybrid-cross').payload?.renderer).not.toBe('scene')
  })

  it('an unmapped concept still gets its kind default', () => {
    expect(buildCanonicalScene('vector', 'phys.meas.vector-addition')?.title).toContain('Vector Addition')
    expect(buildCanonicalScene('vector', null)?.title).toContain('Vector Addition')
    expect(buildCanonicalScene(null, 'phys.meas.vector-addition')).toBeNull()
  })

  it('every override resolves to a real scene or a deliberate null', () => {
    for (const conceptId of CONCEPT_SCENE_OVERRIDES) {
      const scene = buildCanonicalScene('ray_optics', conceptId)
      if (scene) expect(scene.steps.length).toBeGreaterThan(0)
    }
  })
})

describe('a staged scene really has stages', () => {
  it('every activated generator produces at least one narrated stage', () => {
    for (const kind of ACTIVATED_SCENE_KINDS) {
      const scene = buildCanonicalScene(kind)
      expect(scene, kind).not.toBeNull()
      expect(sceneStepCount(scene!), kind).toBeGreaterThan(0)
      expect(scene!.steps.some((s) => (s.narration ?? '').trim().length > 0), kind).toBe(true)
    }
  })

  it('the physics scenes a learner actually asks for are multi-stage', () => {
    for (const kind of ['projectile', 'collision', 'vector', 'ray_optics', 'circular']) {
      expect(sceneStepCount(buildCanonicalScene(kind)!), kind).toBeGreaterThan(1)
    }
  })
})

describe('the resolver is the only runtime visual authority (M1)', () => {
  // These assertions used to require that each legacy pipeline was GATED on
  // `v2OwnsVisual`. M1 replaced gating with removal, so they now require the
  // strictly stronger property: the pipelines are not in the route at all.
  // A gate can be inverted by a flag or skipped by an early throw; an absent
  // call cannot.

  // Only executable code counts — every one of these names still appears in
  // the route's comments, which is where the history is deliberately recorded.
  const CODE = ROUTE.split('\n')
    .filter((line) => !line.trim().startsWith('//') && !line.trim().startsWith('*'))
    .join('\n')

  it('no legacy prose-seeded pipeline is invoked by the route', () => {
    for (const call of [
      'planVisualTeaching(',
      'routeSceneGenerator(',
      'generateRoutedScene(',
      'buildSceneSpec(',
      'generateSceneSpec(',
      'generateVisualizationCode(',
      'decideVisualization(',
    ]) {
      expect(CODE, `${call} must not run at request time`).not.toContain(call)
    }
  })

  it('the v2OwnsVisual switch between authorities is gone', () => {
    expect(CODE).not.toContain('v2OwnsVisual')
    expect(CODE).not.toContain('isVisualResolverV2Enabled')
    expect(CODE).not.toContain('parametricRouteMatched')
    expect(CODE).not.toContain('legacySceneConceptId')
  })

  it('the legacy lesson-title visual guidance is never injected', () => {
    // Two conflicting visual instructions in one prompt is how the tutor ended
    // up describing a figure the learner was not looking at. The Visual
    // Contract is now the only visual instruction, unconditionally.
    expect(CODE).not.toContain('buildVisualIntelligenceBlock')
  })

  it('the authority clamp is unconditional and clears every channel first', () => {
    // The clamp used to be `if (visualDecisionHoisted)`, so a turn on which the
    // resolver never ran kept whatever the legacy pipelines had produced.
    expect(CODE).not.toMatch(/if \(visualDecisionHoisted\) \{/)
    expect(CODE).toMatch(
      /const decision = visualDecisionHoisted\s*\n\s*const llmTag[^\n]*\n\s*responseVisual = null\s*\n\s*detectedVisualSpec = null\s*\n\s*detectedSceneSpec = null\s*\n\s*dynamicVisualizationCode = null/,
    )
  })

  it('the resolver failure path fails closed to a no-figure decision', () => {
    expect(CODE).toMatch(/noFigureDecision\('resolver-error'/)
  })

  it('the visual channels have exactly one writer', () => {
    // Assignments to a visual channel, excluding their declarations. Every one
    // must live inside the clamp: 3 clears + 2 payload assignments, and
    // responseVisual's clear + its card-case refinement.
    const assignments = CODE.split('\n').filter((l) =>
      /^\s*(detectedVisualSpec|detectedSceneSpec|dynamicVisualizationCode) = /.test(l),
    )
    expect(assignments).toHaveLength(5)
  })
})

describe('incidental vocabulary never hijacks the figure', () => {
  const ask = (message: string, lessonConceptId: string) =>
    resolveVisual({ message, lessonConceptId, learnerRequest: 'diagram' })

  it('"inclined plane" does not become a geometry excursion', () => {
    // math.geom.plane is an EXACT_TITLE match at 0.95 and outranked
    // phys.mech.free-body-diagram at 0.85 until this guard.
    const d = ask('Show me a free-body diagram of a block on a rough inclined plane.', 'phys.mech.newtons-laws')
    expect(d.conceptId).toBe('phys.mech.free-body-diagram')
  })

  it('"ray diagrams" does not become math.geom.ray', () => {
    const d = ask('Show how light refracts through a convex lens using ray diagrams.', 'phys.opt.lenses')
    expect(d.conceptId).toBe('phys.opt.lenses')
    expect(d.payload.renderer).toBe('scene')
  })

  it('optical reflection is not the geometric transformation', () => {
    const d = ask('Show me how reflection works with a diagram.', 'phys.opt.reflection')
    expect(d.conceptId).toBe('phys.opt.reflection')
    expect(d.provenance).toContain('ray_optics')
  })

  it('the lesson topic under a shorter name stays on the lesson', () => {
    const d = ask('Teach me vectors with a visualization.', 'phys.meas.scalars-vectors')
    expect(d.conceptId).toBe('phys.meas.scalars-vectors')
    expect(d.excursion).toBe(false)
  })

  it('a genuine excursion still works', () => {
    // The documented case: a named concept outranks the lesson.
    expect(ask('Teach me vectors with a diagram.', 'phys.therm.calorimetry').excursion).toBe(true)
    expect(ask('explain photosynthesis with a diagram', 'phys.therm.calorimetry').conceptId)
      .toBe('bio.plant.photosynthesis')
  })

  it('the medium-vs-topic rule is unchanged', () => {
    expect(ask('show me a graph', 'phys.mech.kinematics-1d').conceptId).toBe('phys.mech.kinematics-1d')
    expect(ask('what is a graph', 'phys.mech.kinematics-1d').conceptId).toBe('math.disc.graph')
  })
})

describe('PRODUCTION 2026-08-08 — a physics word must get its physics concept', () => {
  // Observed in a live Dimensional Analysis lesson: "Show reflection using a
  // ray diagram" rendered the "Geometry Shapes" card (triangle, rectangle,
  // circle) while the tutor said "a ray of light coming in (the incident ray)
  // hits the surface" — a figure with no ray, no surface and no normal,
  // described as though it had all three. math.geom.reflection is an
  // EXACT_TITLE match at 0.95; phys.opt.reflection ("Reflection and Laws of
  // Reflection") was never even a candidate.
  const ask = (message: string, lessonConceptId: string) =>
    resolveVisual({ message, lessonConceptId, subject: 'physics', learnerRequest: 'diagram' })

  const DIMENSIONAL = 'phys.meas.dimensional-analysis'

  it('"Show reflection using a ray diagram" reaches optical reflection', () => {
    const d = ask('Show reflection using a ray diagram', DIMENSIONAL)
    expect(d.conceptId).toBe('phys.opt.reflection')
    expect(d.payload.renderer).toBe('scene')
    expect(d.provenance).toContain('ray_optics')
  })

  it('the whole matrix resolves inside physics from an unrelated lesson', () => {
    expect(ask('Show me the vector visualization.', DIMENSIONAL).conceptId).toBe('phys.meas.scalars-vectors')
    expect(ask('Explain vector addition with a visualization.', DIMENSIONAL).conceptId).toBe('phys.meas.vector-addition')
    expect(ask('Show a free-body diagram of a block on an inclined plane.', DIMENSIONAL).conceptId).toBe('phys.mech.free-body-diagram')
    expect(ask('Show projectile motion.', DIMENSIONAL).conceptId).toBe('phys.mech.projectile-motion')
    expect(ask('Show an inelastic collision.', DIMENSIONAL).conceptId).toBe('phys.mech.collisions-inelastic')
  })

  it('a subject with no local reading still excurses across subjects', () => {
    // The rule must not trap a learner inside their subject.
    expect(ask('explain photosynthesis with a diagram', DIMENSIONAL).conceptId).toBe('bio.plant.photosynthesis')
  })
})
