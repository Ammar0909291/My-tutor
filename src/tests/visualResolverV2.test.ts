import { describe, it, expect } from 'vitest'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { resolveVisualTarget } from '@/lib/teaching/visual/resolveVisualTarget'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { renderArchetype, ARCHETYPES, type ArchetypeContext } from '@/lib/teaching/visual/archetypes'
import { conceptRepresentations } from '@/lib/teaching/visual/conceptArchetype'
import { extractSteps, extractKeyTerms, extractComparisonPair } from '@/lib/teaching/visual/conceptText'
import { parseVisualSpec } from '@/lib/visuals/visualSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'

const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'biology', 'computer_science', 'english'] as const

function allConcepts() {
  const out: { id: string; title: string; subject: string }[] = []
  for (const subject of SUBJECTS) {
    const graph = getKnowledgeGraph(subject)
    if (!graph) continue
    for (const node of getAllNodes(graph)) out.push({ id: node.id, title: node.title, subject })
  }
  return out
}

// ── THE semantic safety invariant ────────────────────────────────────────────
// This replaces the former "every concept must be graphical" invariant, which
// was RETIRED on 2026-08-08 because it was the mechanism of the worst failure
// the product has produced. Guaranteeing a figure for all 1,775 concepts meant
// substituting one when nothing faithful existed:
//
//   phys.therm.calorimetry         -> "3D Data Visualization" stock card
//   eng.phonics.phonemic-awareness -> "Wave Function psi(x)" (a child learning
//                                     letter sounds, shown a quantum wavefunction)
//   phys.opt.reflection            -> "Geometry Shapes", while the tutor
//                                     described incident ray, reflected ray and
//                                     normal — none of which were on screen
//
// Coverage is no longer the invariant. FAITHFULNESS is: a concept either gets
// a figure that is genuinely its own, or it gets none. This test is strictly
// stronger — the old one permitted every failure above.
describe('Visual Resolver V2 — semantic safety invariant', () => {
  it('never fabricates a figure: every visual is curated or generated, or absent', () => {
    const fabricated: string[] = []
    const inconsistent: string[] = []
    for (const c of allConcepts()) {
      const d = resolveVisual({
        message: '',
        lessonConceptId: c.id,
        subject: c.subject,
        learnerRequest: 'diagram',
      })
      // A visual may ONLY come from a curated binding or a scene generator.
      if (d.graphical && d.source !== 'registry') fabricated.push(`${c.id} — source ${d.source}`)
      // graphical and payload must agree, always and in both directions.
      if (d.graphical !== (d.payload !== null)) inconsistent.push(`${c.id}`)
    }
    expect(fabricated, `concepts given a fabricated visual:\n${fabricated.slice(0, 20).join('\n')}`).toEqual([])
    expect(inconsistent, `graphical/payload disagreement:\n${inconsistent.slice(0, 20).join('\n')}`).toEqual([])
  })

  it('an unsupported concept receives NO visual, not a substitute', () => {
    // Calorimetry has no curated binding and no generator. It used to receive
    // the "3D Data Visualization" card. It must now receive nothing at all.
    const d = resolveVisual({
      message: '', lessonConceptId: 'phys.therm.calorimetry',
      subject: 'physics', learnerRequest: 'diagram',
    })
    expect(d.payload).toBeNull()
    expect(d.graphical).toBe(false)
    expect(d.source).toBe('none')
    expect(d.provenance).toContain('no-faithful-visual')
  })

  it('English phonics is never handed a physics figure', () => {
    // The single most damning case the archetype engine produced.
    const d = resolveVisual({
      message: '', lessonConceptId: 'eng.phonics.phonemic-awareness',
      subject: 'english', learnerRequest: 'diagram',
    })
    expect(d.payload).toBeNull()
    expect(JSON.stringify(d)).not.toMatch(/wave|quantum/i)
  })

  it('the curated corpus is still fully wired — coverage must not collapse', () => {
    let registry = 0
    for (const c of allConcepts()) {
      const d = resolveVisual({ message: '', lessonConceptId: c.id, subject: c.subject })
      if (d.source === 'registry') registry++
    }
    // Faithful coverage is 496/1775 today. This guards the opposite regression
    // from the one above: silently bypassing curated bindings and showing
    // nothing where a real, hand-verified figure exists.
    expect(registry).toBeGreaterThan(450)
  })

  it('never emits a payload the client cannot render', () => {
    for (const c of allConcepts()) {
      const d = resolveVisual({ message: '', lessonConceptId: c.id, subject: c.subject })
      if (d.payload?.renderer === 'spec') {
        expect(parseVisualSpec(d.payload.visualSpec), `${c.id} produced an invalid VisualSpec`).not.toBeNull()
      }
      if (d.payload?.renderer === 'scene') {
        const result = validateSceneSpec(d.payload.sceneSpec)
        expect(result.valid, `${c.id} produced an invalid SceneSpec: ${JSON.stringify(result.errors)}`).toBe(true)
      }
    }
  })
})

// ── determinism ──────────────────────────────────────────────────────────────
describe('Visual Resolver V2 — determinism', () => {
  it('returns byte-identical decisions across repeated calls', () => {
    const input = { message: 'teach me vectors with a diagram', lessonConceptId: 'phys.therm.calorimetry', subject: 'physics' as const }
    const first = JSON.stringify(resolveVisual(input))
    for (let i = 0; i < 25; i++) expect(JSON.stringify(resolveVisual(input))).toBe(first)
  })

  it('is a pure function of its input — no hidden per-call state', () => {
    const a = resolveVisual({ message: '', lessonConceptId: 'math.arith.fractions' })
    const b = resolveVisual({ message: '', lessonConceptId: 'phys.mech.newtons-first-law' })
    const aAgain = resolveVisual({ message: '', lessonConceptId: 'math.arith.fractions' })
    expect(JSON.stringify(aAgain)).toBe(JSON.stringify(a))
    expect(a.conceptId).not.toBe(b.conceptId)
  })
})

// ── concept excursion (the production failure this change exists to fix) ─────
describe('Visual Resolver V2 — concept excursions', () => {
  it('draws the concept the learner NAMED, not the lesson they are sitting in', () => {
    const d = resolveVisual({
      message: 'Teach me vectors with diagram.',
      lessonConceptId: 'phys.therm.calorimetry',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.excursion).toBe(true)
    expect(d.graphical).toBe(true)
    expect(d.representation).toBe('vector')
    expect(d.conceptId).not.toBe('phys.therm.calorimetry')
  })

  it('handles the noun form "visualization" identically to "diagram"', () => {
    const d = resolveVisual({
      message: 'Explain me vector with visualization',
      lessonConceptId: 'phys.therm.calorimetry',
      learnerRequest: 'diagram',
    })
    expect(d.representation).toBe('vector')
    expect(d.excursion).toBe(true)
  })

  it('stays on the lesson concept when the learner names nothing', () => {
    const d = resolveVisual({
      message: 'explain this again please',
      lessonConceptId: 'phys.therm.calorimetry',
      learnerRequest: 'explain_differently',
    })
    expect(d.excursion).toBe(false)
    expect(d.conceptId).toBe('phys.therm.calorimetry')
    // Calorimetry has no faithful figure, so none is attached — the assertion
    // that matters here is that the TARGET did not move, not that a picture
    // appeared.
    expect(d.payload).toBeNull()
  })

  it('target resolution reports its origin honestly', () => {
    const learner = resolveVisualTarget('what is a triangle', 'phys.therm.calorimetry')
    expect(learner?.origin).toBe('learner-request')
    const lesson = resolveVisualTarget('ok thanks', 'phys.therm.calorimetry')
    expect(lesson?.origin).toBe('lesson-concept')
  })
})

// ── NO FIGURE is a safe, honest outcome ──────────────────────────────────────
// Formerly "ASCII is the emergency path". Two things changed on 2026-08-08:
// no-figure is now the COMMON case rather than an emergency, and the contract
// no longer asks the model to compensate by drawing ASCII art — it asks it to
// teach in prose. What these tests protect is unchanged and is the only thing
// that ever mattered: the model must never be told a figure exists when it
// does not.
describe('Visual Resolver V2 — the no-figure contract', () => {
  it('returns no figure when no concept resolves at all', () => {
    const d = resolveVisual({ message: 'tell me a joke about pirates', lessonConceptId: null })
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toBe('no-figure:no-resolvable-concept')
  })

  it('a concept with no curated visual and no generator returns no figure', () => {
    const d = resolveVisual({ message: '', lessonConceptId: 'phys.therm.calorimetry', learnerRequest: 'diagram' })
    expect(d.source).toBe('none')
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
  })

  it('the contract NEVER claims a figure when none is attached', () => {
    for (const d of [
      resolveVisual({ message: '', lessonConceptId: 'phys.therm.calorimetry', learnerRequest: 'diagram' }),
      resolveVisual({ message: 'tell me a joke about pirates', lessonConceptId: null }),
    ]) {
      const block = buildVisualContractBlock(d)
      expect(block).toContain('NO FIGURE IS ATTACHED')
      expect(block).not.toContain('ALREADY BEING RENDERED')
      // The phrase appears only inside the prohibition, never as an instruction.
      expect(block).toMatch(/Do NOT say "look at the figure/)
      expect(block).toContain('shows your words and nothing else')
      // It must not tell the tutor to compensate with drawn output either.
      expect(block).not.toMatch(/ASCII/i)
    }
  })

  it('the contract still forbids ASCII when a real figure IS attached', () => {
    const d = resolveVisual({
      message: '', lessonConceptId: 'phys.mech.projectile-motion', learnerRequest: 'diagram',
    })
    const block = buildVisualContractBlock(d)
    expect(d.graphical).toBe(true)
    expect(block).toContain('ALREADY BEING RENDERED')
    expect(block).toContain('Do NOT draw an ASCII diagram')
  })
})

// ── canonical ownership (the 2026-08-02 production fix must survive) ─────────
describe('Visual Resolver V2 — canonical ownership', () => {
  it('exposes a legal visual set for registry-sourced card decisions', () => {
    for (const c of allConcepts().slice(0, 400)) {
      const d = resolveVisual({ message: '', lessonConceptId: c.id, subject: c.subject })
      if (d.source === 'registry' && d.payload.renderer === 'card') {
        expect(d.allowed, `${c.id} had no legal set`).toBeTruthy()
        expect(d.allowed!.length).toBeGreaterThan(0)
      }
    }
  })

  it('never returns more than one payload', () => {
    const d = resolveVisual({ message: '', lessonConceptId: 'math.arith.fractions' })
    // The payload is a discriminated union — one renderer, one value, by construction.
    expect(Object.keys(d.payload).filter((k) => k !== 'renderer')).toHaveLength(
      d.payload.renderer === 'ascii' ? 0 : 1,
    )
  })
})

// ── purpose precedes representation ──────────────────────────────────────────
describe('Visual Resolver V2 — purpose', () => {
  it('an explicit diagram request is always a demonstration', () => {
    const d = resolveVisual({ message: '', lessonConceptId: 'math.arith.fractions', learnerRequest: 'diagram' })
    expect(d.purpose).toBe('demonstrate')
  })

  it('deep remediation escalates to demonstration regardless of archetype default', () => {
    const d = resolveVisual({ message: '', lessonConceptId: 'math.arith.fractions', remediationTier: 4 })
    expect(d.purpose).toBe('demonstrate')
  })
})

// ── archetype engine ─────────────────────────────────────────────────────────
describe('Educational Archetype Engine', () => {
  const ctx: ArchetypeContext = {
    conceptId: 'test.demo.concept',
    title: 'Photosynthesis',
    description: 'Light is absorbed by chlorophyll; water is split; carbon dioxide is fixed; glucose is produced.',
    prerequisites: [],
  }

  it('every archetype can either draw or honestly decline', () => {
    for (const representation of Object.keys(ARCHETYPES) as (keyof typeof ARCHETYPES)[]) {
      const payload = renderArchetype(representation, ctx)
      if (payload) expect(['card', 'spec', 'scene']).toContain(payload.renderer)
    }
  })

  it('structural archetypes decline rather than fabricate on empty text', () => {
    const thin: ArchetypeContext = { conceptId: 'x.y.z', title: '', description: '', prerequisites: [] }
    expect(renderArchetype('comparison', thin)).toBeNull()
    expect(renderArchetype('process', thin)).toBeNull()
    expect(renderArchetype('hierarchy', thin)).toBeNull()
  })

  it('a real process becomes a valid process_flow spec', () => {
    const payload = renderArchetype('process', ctx)
    expect(payload?.renderer).toBe('spec')
    if (payload?.renderer === 'spec') expect(parseVisualSpec(payload.visualSpec)).not.toBeNull()
  })

  it('candidate representations always end in the universal tail', () => {
    const reps = conceptRepresentations(ctx)
    expect(reps.length).toBeGreaterThan(0)
    expect(reps[reps.length - 1]).toBe('labelled_figure')
  })
})

// ── deterministic text derivation ────────────────────────────────────────────
describe('conceptText derivation', () => {
  it('extracts an ordered process only when one genuinely exists', () => {
    expect(extractSteps('First this. Then that. Finally the other.').length).toBeGreaterThanOrEqual(2)
    expect(extractSteps('A single idea with no sequence')).toEqual([])
    expect(extractSteps('')).toEqual([])
  })

  it('extracts a comparison pair only on an explicit contrast marker', () => {
    expect(extractComparisonPair('Mass vs Weight', '')).not.toBeNull()
    expect(extractComparisonPair('Fractions', 'A part of a whole.')).toBeNull()
  })

  it('always yields labels for a real concept description', () => {
    const terms = extractKeyTerms('Subset', 'A set A is a subset of B if every element of A is also an element of B.')
    expect(terms.length).toBeGreaterThanOrEqual(2)
  })

  it('is deterministic', () => {
    const a = extractKeyTerms('Wave', 'Amplitude, wavelength and frequency describe a wave.')
    const b = extractKeyTerms('Wave', 'Amplitude, wavelength and frequency describe a wave.')
    expect(a).toEqual(b)
  })
})
