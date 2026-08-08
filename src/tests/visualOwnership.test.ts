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
    expect(figureFor('bio.gen.dihybrid-cross').payload.renderer).not.toBe('scene')
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

describe('V2 is the only selector when it decided the turn', () => {
  it('every legacy pipeline is gated on v2OwnsVisual', () => {
    expect(ROUTE).toMatch(/const v2OwnsVisual = Boolean\(visualDecisionHoisted\)/)
    expect(ROUTE).toMatch(/if \(!v2OwnsVisual\) \{\s*try \{\s*detectedVisualSpec = planVisualTeaching/)
    expect(ROUTE).toMatch(/if \(!v2OwnsVisual && !detectedVisualSpec && !detectedSceneSpec && !parametricRouteMatched\)/)
    expect(ROUTE).toMatch(/if \(!v2OwnsVisual && !detectedVisualSpec && isParametricSceneGenerationEnabled\(\)\)/)
    expect(ROUTE).toMatch(/if \(!v2OwnsVisual && !detectedVisualSpec && !detectedSceneSpec && isAiSceneGenerationEnabled\(\)\)/)
    expect(ROUTE).toMatch(/const dvFlag = !v2OwnsVisual && isDynamicVisualizationEnabled\(\)/)
  })

  it('the legacy lesson-title visual guidance is not injected under V2', () => {
    // Two conflicting visual instructions in one prompt is how the tutor ended
    // up describing a figure the learner was not looking at.
    expect(ROUTE).toMatch(/if \(!isVisualResolverV2Enabled\(\)\) \{\s*systemPrompt \+= buildVisualIntelligenceBlock/)
  })

  it('the rollback switch still exists', () => {
    expect(ROUTE).toMatch(/isVisualResolverV2Enabled\(\)/)
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
