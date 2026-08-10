/**
 * The visualization ARCHITECTURE, not a list of examples.
 *
 * Three legitimate outcomes and nothing else:
 *   CURATED    a concept generator or curated binding exists
 *   GENERATED  the Visualization Engine built one for THIS concept and it
 *              passed semantic validation
 *   NONE       everything else — every rejection, every failure
 *
 * The invariant these tests defend is faithfulness, never coverage. The
 * retired invariant ("every concept must be graphical") is what produced a
 * quantum wavefunction for English phonics and a DNA diagram for
 * thermodynamics; it must not return through the engine.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import {
  generateConceptScene, validateGeneratedScene, isAnchoredToConcept,
  buildConceptScenePrompt, anchorReport, crossConceptChallenger,
} from '@/lib/teaching/visual/visualEngine'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { parseVisualSession } from '@/lib/teaching/visual/session'
import { getKnowledgeGraph, getAllNodes, getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import type { ArchetypeContext } from '@/lib/teaching/visual/archetypes'

// The critic is a separate gate with its own tests; these are about the
// payload path, so they supply a passing judge rather than a live model.
const passingCritic = async () => ({
  dimensions: {
    relevance: { verdict: 'pass' as const, reason: '' },
    correctness: { verdict: 'pass' as const, reason: '' },
    explanatoryValue: { verdict: 'pass' as const, reason: '' },
    grounding: { verdict: 'pass' as const, reason: '' },
    rendering: { verdict: 'pass' as const, reason: '' },
  },
  decision: 'promote' as const,
  confidence: 1,
  judged: true,
})


// ── fixtures ─────────────────────────────────────────────────────────────────

// M4 note: the engine fixture concept must have NO curated asset, or the
// resolver never reaches the engine. It was phys.therm.calorimetry until the
// M4 Physics pilot authored a real figure for that concept; it is now
// phys.mech.kinetic-energy, which is still genuinely assetless. The scene
// fixtures below were re-vocabularised to match, since the engine's anchor
// check compares the scene's own labels with the concept's KG text.
const CALORIMETRY = 'phys.mech.kinetic-energy'          // no curated visual
const PROJECTILE  = 'phys.mech.projectile-motion' // canonical generator
const NEWTON2     = 'phys.mech.newtons-second-law'// curated card
const PHONICS     = 'eng.phonics.phonemic-awareness'
const DIM         = 'phys.meas.dimensional-analysis'

const ctxFor = (conceptId: string): ArchetypeContext => {
  const n = getKGNode(conceptId)!
  return {
    conceptId, title: n.title, description: n.description ?? '',
    prerequisites: n.prerequisites ?? [], difficulty: n.difficulty,
  }
}

/** A scene that genuinely depicts kinetic energy, in its own vocabulary. */
const faithfulCalorimetryScene = (): SceneSpec => ({
  id: 'gen-kinetic-energy', title: 'Kinetic energy of a moving mass',
  sceneType: 'diagram', teachingGoal: 'Show how kinetic energy grows with speed.',
  steps: [
    { narration: 'A mass moves with some velocity.', objects: [
      { type: 'node', position: [-2, 0, 0], text: 'moving mass — kinetic energy' },
      { type: 'node', position: [2, 0, 0], text: 'faster mass — more kinetic energy' },
    ] },
    { narration: 'Kinetic energy depends on the square of the velocity.', objects: [
      { type: 'arrow', from: [-1.5, 0, 0], to: [1.5, 0, 0], text: 'velocity v' },
    ] },
  ],
})

/** Structurally fine, but about something else entirely — the archetype failure. */
const driftingScene = (): SceneSpec => ({
  id: 'gen-drift', title: 'Wave Function ψ(x)', sceneType: 'plot',
  teachingGoal: 'Show the probability density of a quantum particle.',
  steps: [
    { narration: 'The wavefunction oscillates inside the potential well.', objects: [
      { type: 'point', position: [0, 0, 0], text: 'psi' },
      { type: 'point', position: [1, 1, 0], text: 'probability density' },
    ] },
  ],
})

const engine = (scene: unknown) => ({
  enabled: () => true,
  // These tests exercise the generate-AND-SERVE path. Since the trust
  // lifecycle landed, eligibility alone yields a scene that is generated,
  // validated and HELD for review, so a test that wants to observe a served
  // figure must say the concept is trusted to serve.
  policy: 'auto' as const,
  critic: passingCritic,
  generate: async () => scene,
  cacheClient: {
    visualizationCache: {
      findUnique: async () => null,
      update: async () => undefined,
      create: async () => undefined,
    },
  },
})

// ── 1-5: the three outcomes ──────────────────────────────────────────────────

describe('the three legitimate outcomes', () => {
  it('1. curated stays curated — the engine is never consulted', async () => {
    let called = false
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: PROJECTILE, subject: 'physics', learnerRequest: 'diagram' },
      { ...engine(null), generate: async () => { called = true; return null } },
    )
    expect(d.source).toBe('registry')
    expect(d.provenance).toContain('generator:')
    expect(called).toBe(false)
  })

  it('1b. a curated CARD is also never replaced by generation', async () => {
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: NEWTON2, subject: 'physics', learnerRequest: 'diagram' },
      engine(faithfulCalorimetryScene()),
    )
    expect(d.source).toBe('registry')
    expect(d.payload?.renderer).toBe('card')
  })

  it('2. engine capable → runtime-generated visual', async () => {
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(faithfulCalorimetryScene()),
    )
    expect(d.source).toBe('generated')
    expect(d.graphical).toBe(true)
    expect(d.payload?.renderer).toBe('scene')
    expect(d.conceptId).toBe(CALORIMETRY)
    expect(d.provenance).toBe(`generated:${CALORIMETRY}:fresh`)
  })

  it('3. engine incapable (flag off) → no figure', async () => {
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      { ...engine(null), enabled: () => false },
    )
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toBe('no-figure:engine-flag-off')
  })

  it('4. generation failure → no figure, never a substitute', async () => {
    for (const failing of [
      { ...engine(null), generate: async () => null },
      { ...engine(null), generate: async () => { throw new Error('provider down') } },
    ]) {
      const d = await resolveVisualForTurn(
        { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
        failing,
      )
      expect(d.graphical).toBe(false)
      expect(d.payload).toBeNull()
      expect(d.provenance).toBe('no-figure:engine-generation-failed')
    }
  })

  it('5. semantic validation failure → no figure', async () => {
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(driftingScene()),
    )
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toBe('no-figure:engine-not-anchored-to-concept')
  })
})

// ── 6-10: the specific failures that motivated the architecture ──────────────

describe('the historical failures cannot recur', () => {
  it('6. an unrelated keyword cannot select another concept\'s visual', async () => {
    const d = await resolveVisualForTurn(
      { message: 'Show a free-body diagram of a block on an inclined plane.',
        lessonConceptId: DIM, subject: 'physics', learnerRequest: 'diagram' },
      engine(null),
    )
    expect(d.conceptId).toBe('phys.mech.free-body-diagram')
    expect(d.conceptId).not.toBe('math.geom.plane')
  })

  it('7. English phonics can never receive a physics/quantum figure', async () => {
    // Even when the engine hands one back, the anchor check rejects it.
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: PHONICS, subject: 'english', learnerRequest: 'diagram' },
      engine(driftingScene()),
    )
    expect(d.payload).toBeNull()
    expect(JSON.stringify(d)).not.toMatch(/quantum|wavefunction/i)
  })

  it('8. thermodynamics cannot receive a DNA figure', () => {
    const dna: SceneSpec = {
      id: 'x', title: 'DNA Base Pairing', sceneType: 'diagram',
      steps: [{ narration: 'Adenine pairs with thymine.', objects: [
        { type: 'node', position: [0, 0, 0], text: 'adenine' },
        { type: 'node', position: [1, 0, 0], text: 'thymine' },
      ] }],
    }
    const result = validateGeneratedScene(dna, ctxFor('phys.therm.first-law'))
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe('not-anchored-to-concept')
  })

  it('9. a mirror concept is a mirror, not the lens that shares its generator', async () => {
    // Same invariant as before — a shared generator must draw THIS concept's
    // case, never the kind default — asserted on phys.opt.mirrors, which still
    // carries the concave-mirror override. It was previously asserted on
    // phys.opt.reflection, whose binding B1 retired: that figure is an
    // image-construction diagram with no normal and no equal angles, so it
    // could not teach the laws of reflection.
    const d = await resolveVisualForTurn(
      // Asked directly on the concept: this test is about which CASE a shared
      // generator draws, not about concept targeting (covered in
      // visualOwnership.test.ts), so the target is set rather than matched.
      { message: 'Show me this with a ray diagram', lessonConceptId: 'phys.opt.mirrors',
        subject: 'physics', learnerRequest: 'diagram' },
      engine(null),
    )
    expect(d.conceptId).toBe('phys.opt.mirrors')
    const semantics = describeVisualPayload(d.payload)
    expect(semantics.elements.join(' ')).toMatch(/mirror/i)
    expect(semantics.caption).not.toMatch(/convex lens/i)
  })

  it('10. the inelastic concept never renders the elastic case', async () => {
    const d = await resolveVisualForTurn(
      { message: 'Show an inelastic collision.', lessonConceptId: DIM,
        subject: 'physics', learnerRequest: 'diagram' },
      engine(null),
    )
    expect(d.conceptId).toBe('phys.mech.collisions-inelastic')
    expect(describeVisualPayload(d.payload).caption).toMatch(/inelastic/i)
  })
})

// ── 11-13: the payload/contract invariants ───────────────────────────────────

describe('payload and contract invariants hold in both directions', () => {
  it('11+12. graphical and payload agree across every concept in every KG', () => {
    const violations: string[] = []
    for (const subject of ['mathematics', 'physics', 'chemistry', 'biology', 'computer_science', 'english'] as const) {
      const graph = getKnowledgeGraph(subject)
      if (!graph) continue
      for (const node of getAllNodes(graph)) {
        const d = resolveVisual({ message: '', lessonConceptId: node.id, subject, learnerRequest: 'diagram' })
        if (d.graphical !== (d.payload !== null)) violations.push(node.id)
        if (d.graphical && d.source !== 'registry' && d.source !== 'generated') violations.push(`${node.id}:${d.source}`)
      }
    }
    expect(violations).toEqual([])
  })

  it('11b+12b. the same holds for a generated decision', async () => {
    const accepted = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(faithfulCalorimetryScene()),
    )
    expect(accepted.graphical).toBe(true)
    expect(accepted.payload).not.toBeNull()

    const rejected = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(driftingScene()),
    )
    expect(rejected.graphical).toBe(false)
    expect(rejected.payload).toBeNull()
  })

  it('13. the tutor contract matches the ACCEPTED payload, and only it', async () => {
    const accepted = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(faithfulCalorimetryScene()),
    )
    const block = buildVisualContractBlock(accepted)
    expect(block).toContain('ALREADY BEING RENDERED')
    expect(block).toContain('moving mass')       // a label that is really drawn
    expect(block).toContain('velocity v')

    const rejected = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(driftingScene()),
    )
    const noBlock = buildVisualContractBlock(rejected)
    expect(noBlock).toContain('NO FIGURE IS ATTACHED')
    // A rejected figure must leave no trace in what the tutor is told.
    expect(noBlock).not.toMatch(/wave function|probability density/i)
  })
})

// ── 14-18: continuity, excursions, persistence ───────────────────────────────

describe('continuity is unchanged by the engine', () => {
  const p = (s: unknown) => (s ? parseVisualSession(JSON.parse(JSON.stringify(s))) : null)

  it('14. a visual request during an excursion keeps the excursion figure', async () => {
    const open = await resolveVisualForTurn(
      { message: 'Show projectile motion.', lessonConceptId: DIM, subject: 'physics', learnerRequest: 'diagram' },
      engine(null),
    )
    const answer = await resolveVisualForTurn(
      { message: 'ok', lessonConceptId: DIM, subject: 'physics',
        activeSession: p(open.session), lastAssistantAskedQuestion: true },
      engine(null),
    )
    expect(answer.conceptId).toBe(PROJECTILE)
    expect(answer.continuityReason).toBe('learner-answering-not-requesting')
  })

  it('15. "show me a graph" is a medium request, not graph theory', () => {
    const d = resolveVisual({ message: 'show me a graph', lessonConceptId: 'phys.mech.kinematics-1d', subject: 'physics', learnerRequest: 'diagram' })
    expect(d.conceptId).toBe('phys.mech.kinematics-1d')
  })

  it('16. an explicit concept request still excurses', () => {
    const d = resolveVisual({ message: 'explain photosynthesis with a diagram', lessonConceptId: DIM, subject: 'physics', learnerRequest: 'diagram' })
    expect(d.conceptId).toBe('bio.plant.photosynthesis')
    expect(d.excursion).toBe(true)
  })

  it('17. a lesson change clears the stale visual state', async () => {
    const open = await resolveVisualForTurn(
      { message: 'Show projectile motion.', lessonConceptId: DIM, subject: 'physics', learnerRequest: 'diagram' },
      engine(null),
    )
    const moved = await resolveVisualForTurn(
      { message: 'continue', lessonConceptId: 'phys.mech.momentum', subject: 'physics', activeSession: p(open.session) },
      engine(null),
    )
    expect(moved.continuityReason).toBe('lesson-changed')
    expect(moved.conceptId).toBe('phys.mech.momentum')
  })

  it('18. a generated visual survives the persistence round-trip', async () => {
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      engine(faithfulCalorimetryScene()),
    )
    const restored = p(d.session)
    expect(restored?.conceptId).toBe(CALORIMETRY)
    expect(restored?.renderer).toBe('scene')
    // …and the held turn re-derives the SAME concept rather than regenerating.
    const held = await resolveVisualForTurn(
      { message: 'ok', lessonConceptId: CALORIMETRY, subject: 'physics',
        activeSession: restored, lastAssistantAskedQuestion: true },
      engine(faithfulCalorimetryScene()),
    )
    expect(held.conceptId).toBe(CALORIMETRY)
  })
})

// ── 19-20: rejection details and legacy isolation ────────────────────────────

describe('malformed payloads and legacy isolation', () => {
  it('19. every malformed payload class is rejected with a named reason', () => {
    const ctx = ctxFor(CALORIMETRY)
    const cases: Array<[unknown, string]> = [
      [null, 'structurally-invalid'],
      [{ id: 'x' }, 'structurally-invalid'],
      [{ id: 'x', title: 'Calorimetry heat', sceneType: 'diagram', steps: [] }, 'structurally-invalid'],
      [{ id: 'x', title: 'Calorimetry heat transfer', sceneType: 'diagram',
         steps: [{ narration: 'n', objects: [{ type: 'bar', position: [0, 0, 0] }] }] }, 'nothing-drawable'],
      [{ id: 'x', title: 'Calorimetry heat transfer', sceneType: 'diagram',
         steps: [{ objects: [{ type: 'node', position: [0, 0, 0], text: 'hot body' },
                             { type: 'node', position: [1, 0, 0], text: 'cold body' }] }] }, 'no-narration'],
    ]
    for (const [raw, reason] of cases) {
      const r = validateGeneratedScene(raw, ctx)
      expect(r.ok, `expected rejection for ${reason}`).toBe(false)
      if (!r.ok) expect(r.reason).toBe(reason)
    }
  })

  it('19b. the anchor check is symmetric — it accepts a genuinely on-topic scene', () => {
    expect(isAnchoredToConcept(faithfulCalorimetryScene(), ctxFor(CALORIMETRY))).toBe(true)
    expect(isAnchoredToConcept(driftingScene(), ctxFor(CALORIMETRY))).toBe(false)
  })

  it('19c. a rejected scene is never written to the cache', async () => {
    let written = 0
    await generateConceptScene(ctxFor(CALORIMETRY), {
      enabled: () => true,
      critic: passingCritic,
      generate: async () => driftingScene(),
      cacheClient: { visualizationCache: {
        findUnique: async () => null,
        update: async () => undefined,
        create: async () => { written++; return undefined },
      } },
    })
    expect(written).toBe(0)
  })

  it('19d. a cached scene is re-validated, not trusted on age', async () => {
    // The cache holds a scene that no longer matches the concept — it must be
    // rejected exactly like a fresh one.
    const result = await generateConceptScene(ctxFor(CALORIMETRY), {
      enabled: () => true,
      critic: passingCritic,
      generate: async () => null,
      cacheClient: { visualizationCache: {
        findUnique: async () => ({ code: JSON.stringify(driftingScene()) }),
        update: async () => undefined,
        create: async () => undefined,
      } },
    })
    expect(result.ok).toBe(false)
  })

  it('20. the engine prompt is seeded from the CONCEPT, never from tutor prose', () => {
    const prompt = buildConceptScenePrompt(ctxFor(CALORIMETRY))
    expect(prompt).toContain(CALORIMETRY)
    expect(prompt).toContain(getKGNode(CALORIMETRY)!.title)
    // The instruction that makes refusal possible must be present.
    expect(prompt).toMatch(/return exactly: null/)
  })
})

// ── object-level anchoring (2026-08-08 hardening) ────────────────────────────
// The measured failure this closes: whole-scene lexical anchoring accepted
// 120/120 adversarial scenes — right title, wrong picture. The anchor is now
// computed only over the labels of objects the renderer actually paints.

describe('the semantic gate anchors on what is DRAWN, not what is SAID', () => {
  // validateGeneratedScene is pure — it compares a scene against a concept
  // context and never consults the registry — so this block keeps using
  // calorimetry's own vocabulary even though that concept now has a curated
  // figure and no longer reaches the engine in production.
  const ctx = ctxFor('phys.therm.calorimetry')
  const scene = (objects: unknown[], extra: Partial<SceneSpec> = {}): SceneSpec => ({
    id: 's', title: 'Calorimetry', sceneType: 'diagram',
    steps: [{ narration: 'Calorimetry in action.', objects: objects as never }],
    ...extra,
  })

  it('a title naming the concept proves nothing', () => {
    // Legal title, correct concept named, objects belonging to another concept.
    const r = validateGeneratedScene(scene([
      { type: 'node', position: [0, 0, 0], text: 'fermi' },
      { type: 'node', position: [1, 0, 0], text: 'dirac' },
    ]), ctx)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.reason).toBe('not-anchored-to-concept')
  })

  it('spamming the title is rejected before the anchor even runs', () => {
    // validateSceneSpec caps title length, so this fails structurally first —
    // both gates close the same door.
    const r = validateGeneratedScene(scene(
      [{ type: 'node', position: [0, 0, 0], text: 'fermi' },
       { type: 'node', position: [1, 0, 0], text: 'dirac' }],
      { title: Array(20).fill('Calorimetry').join(' ') },
    ), ctx)
    expect(r.ok).toBe(false)
  })

  it('narration naming the concept proves nothing', () => {
    const r = validateGeneratedScene({
      id: 's', title: 'Figure', sceneType: 'diagram',
      steps: [{ narration: 'Calorimetry. Calorimetry. Calorimetry measures heat exchange.',
        objects: [{ type: 'node', position: [0, 0, 0], text: 'fermi' },
                  { type: 'node', position: [1, 0, 0], text: 'dirac' }] }],
    }, ctx)
    expect(r.ok).toBe(false)
  })

  it('one matching object is not enough — two DISTINCT ones are required', () => {
    expect(validateGeneratedScene(scene([
      { type: 'node', position: [0, 0, 0], text: 'calorimetry' },
      { type: 'node', position: [1, 0, 0], text: 'fermi' },
    ]), ctx).ok).toBe(false)
    // …and repeating the same label is still one object.
    expect(validateGeneratedScene(scene([
      { type: 'node', position: [0, 0, 0], text: 'calorimetry' },
      { type: 'node', position: [1, 0, 0], text: 'Calorimetry' },
      { type: 'node', position: [2, 0, 0], text: 'fermi' },
    ]), ctx).ok).toBe(false)
  })

  it('objects the renderer skips cannot anchor anything', () => {
    // bar/surface hit SceneSpecRenderer's default branch and draw nothing.
    const r = validateGeneratedScene(scene([
      { type: 'bar', position: [0, 0, 0], text: 'calorimetry' },
      { type: 'surface', position: [1, 0, 0], text: 'heat exchange' },
      { type: 'node', position: [2, 0, 0], text: 'fermi' },
      { type: 'node', position: [3, 0, 0], text: 'dirac' },
    ]), ctx)
    expect(r.ok).toBe(false)
  })

  it('floating labels alone cannot anchor — the scene must contain geometry', () => {
    // Two concept labels and a single unrelated node: the scene has one
    // geometric object, which is a caption next to a dot, not a figure.
    const r = validateGeneratedScene(scene([
      { type: 'label', position: [0, 0, 0], text: 'calorimetry' },
      { type: 'label', position: [1, 0, 0], text: 'heat' },
      { type: 'node', position: [2, 0, 0], text: 'fermi' },
    ]), ctx)
    expect(r.ok).toBe(false)
    // Pure text, no geometry at all.
    expect(anchorReport(scene([
      { type: 'label', position: [0, 0, 0], text: 'calorimetry' },
      { type: 'label', position: [1, 0, 0], text: 'heat' },
    ]), ctx).geometricObjects).toBe(0)
  })

  it('does NOT reject a figure for putting its words on labels instead of geometry', () => {
    // THE MEASURED REGRESSION. The clause used to demand that the concept's
    // vocabulary sit in the `text` of a geometry-bearing object. Run against
    // this repository's own authored, browser-verified gold standard that
    // rejected 7 of 7 M4 pilot figures — because the authored corpus
    // deliberately captions with standalone `label` objects, exactly as
    // physicsPilot's authoring rules instruct ("Arrow/bond text is avoided:
    // it renders at the midpoint, on top of the thing it describes").
    //
    // A scene with real geometry, captioned the authored way, must pass.
    const r = validateGeneratedScene(scene([
      { type: 'node', position: [0, 0, 0] },
      { type: 'node', position: [1, 0, 0] },
      { type: 'arrow', from: [0, 0, 0], to: [1, 0, 0] },
      { type: 'label', position: [0, 1, 0], text: 'heat flows hot to cold' },
      { type: 'label', position: [1, 1, 0], text: 'calorimetry vessel' },
    ]), ctx)
    expect(r.ok, `rejected an authored-style figure: ${(r as { reason?: string }).reason}`).toBe(true)
  })

  it('a genuinely faithful scene still passes', () => {
    const r = validateGeneratedScene(scene([
      { type: 'node', position: [0, 0, 0], text: 'hot body' },
      { type: 'node', position: [1, 0, 0], text: 'cold body' },
      { type: 'arrow', from: [0, 0, 0], to: [1, 0, 0], text: 'heat exchange' },
    ]), ctx)
    expect(r.ok).toBe(true)
  })
})

describe('the negative cross-concept check', () => {
  it('rejects labels that belong to another concept far more than this one', () => {
    const ctx = ctxFor(CALORIMETRY)
    const stolen: SceneSpec = {
      id: 's', title: 'Calorimetry', sceneType: 'diagram',
      steps: [{ narration: 'x', objects: [
        { type: 'node', position: [0, 0, 0], text: 'heat' },
        { type: 'node', position: [1, 0, 0], text: 'projectile motion trajectory' },
        { type: 'arrow', from: [0, 0, 0], to: [1, 0, 0], text: 'projectile motion' },
      ] }],
    }
    const challenger = crossConceptChallenger(stolen, ctx)
    expect(challenger).not.toBeNull()
    expect(challenger!.score).toBeGreaterThanOrEqual(challenger!.targetScore + 2)
  })

  it('is deterministic and independent of index order', () => {
    const ctx = ctxFor(CALORIMETRY)
    const s: SceneSpec = {
      id: 's', title: 'x', sceneType: 'diagram',
      steps: [{ narration: 'x', objects: [
        { type: 'node', position: [0, 0, 0], text: 'projectile motion' },
        { type: 'node', position: [1, 0, 0], text: 'trajectory launch' },
      ] }],
    }
    const runs = new Set(Array.from({ length: 5 }, () => JSON.stringify(crossConceptChallenger(s, ctx))))
    expect(runs.size).toBe(1)
  })

  it('does not fire for a faithful scene whose neighbours share vocabulary', () => {
    // A correct catalysis figure must not lose to a more specific sibling.
    const ctx = ctxFor('chem.kinet.catalysis')
    const s: SceneSpec = {
      id: 's', title: 'Catalysis', sceneType: 'diagram',
      steps: [{ narration: 'x', objects: [
        { type: 'node', position: [0, 0, 0], text: 'catalysis' },
        { type: 'node', position: [1, 0, 0], text: 'catalyst' },
      ] }],
    }
    expect(crossConceptChallenger(s, ctx)).toBeNull()
  })
})

describe('purpose is passed to generation, representation is not', () => {
  it('the prompt carries the teaching purpose when known', () => {
    expect(buildConceptScenePrompt(ctxFor(CALORIMETRY), 'demonstrate'))
      .toMatch(/Teaching purpose for this turn: demonstrate/)
    expect(buildConceptScenePrompt(ctxFor(CALORIMETRY))).not.toMatch(/Teaching purpose/)
  })

  it('representation is never derived from the archetype keyword table', () => {
    // conceptRepresentations() is the table that gave English phonics a
    // wavefunction; feeding it back through the prompt would reintroduce it.
    const prompt = buildConceptScenePrompt(ctxFor(PHONICS), 'explain')
    expect(prompt).not.toMatch(/wave|quantum/i)
  })
})
