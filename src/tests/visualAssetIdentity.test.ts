/**
 * M2 — the Visual Asset identity boundary.
 *
 * M1 gave the runtime one authority and made its failure produce no figure.
 * It did not answer WHOSE figure is attached: the decision carried a conceptId
 * and, separately, a payload, and nothing checked that the two agreed.
 *
 * These tests hold the boundary that answers it. They test identity only —
 * whether a figure is a GOOD depiction of its concept is M3's question, and
 * the previous lexical-overlap experiment is why it is not attempted here.
 */

import { describe, expect, it } from 'vitest'
import {
  admitVisualAsset,
  makeVisualAsset,
  IDENTITY_STRENGTH,
  type VisualAsset,
  type VisualIntent,
} from '@/lib/teaching/visual/asset'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const intent = (conceptId: string, conceptTitle = 'X'): VisualIntent => ({
  conceptId,
  conceptTitle,
  purpose: 'explain',
  excursion: false,
  returnToConceptId: null,
})

const cardAsset = (conceptId: string, conceptTitle = 'X'): VisualAsset =>
  makeVisualAsset({
    assetId: `registry:${conceptId}:three_newton_forces`,
    conceptId,
    conceptTitle,
    representation: 'force_diagram',
    payload: { renderer: 'card', visualType: 'three_newton_forces' },
    provenance: 'curated',
  })

const sceneOf = (steps: SceneSpec['steps']): SceneSpec => ({
  id: 's', title: 'T', sceneType: 'diagram', steps,
})

// ── A. IDENTITY ──────────────────────────────────────────────────────────────

describe('A. identity', () => {
  it('same concept is admitted', () => {
    const result = admitVisualAsset(intent('phys.mech.newtons-first-law'), cardAsset('phys.mech.newtons-first-law'))
    expect(result.ok).toBe(true)
  })

  it('different concept is rejected', () => {
    const result = admitVisualAsset(intent('phys.opt.total-internal-reflection'), cardAsset('phys.opt.mirrors'))
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('identity-mismatch')
    expect(result.detail).toContain('phys.opt.mirrors')
  })

  it('an asset with no conceptId is rejected rather than adopted', () => {
    const orphan = { ...cardAsset('x'), conceptId: '' }
    const result = admitVisualAsset(intent('phys.mech.newtons-first-law'), orphan)
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('missing-identity')
  })

  it('a missing asset is a rejection, never a pass-through', () => {
    expect(admitVisualAsset(intent('phys.mech.newtons-first-law'), null).ok).toBe(false)
  })
})

// ── B. SIBLING CONCEPTS ──────────────────────────────────────────────────────

describe('B. sibling concepts — titles are not identity', () => {
  it('identical titles in different subjects do not match', () => {
    // The real hazard: 'Dynamic Programming' exists in both mathematics and
    // computer science. Title equality would admit one for the other.
    const csAsset = makeVisualAsset({
      assetId: 'registry:cs.algo.dynamic-programming:three_algorithm_visualization',
      conceptId: 'cs.algo.dynamic-programming',
      conceptTitle: 'Dynamic Programming',
      representation: 'algorithm',
      payload: { renderer: 'card', visualType: 'three_algorithm_visualization' },
      provenance: 'curated',
    })
    const result = admitVisualAsset(intent('math.opt.dynamic-programming', 'Dynamic Programming'), csAsset)
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('identity-mismatch')
  })

  it('a shared prefix is not identity either', () => {
    const sibling = cardAsset('phys.opt.reflection')
    expect(admitVisualAsset(intent('phys.opt.total-internal-reflection'), sibling).ok).toBe(false)
  })

  it('a concept is not its own domain prefix', () => {
    expect(admitVisualAsset(intent('math.arith.long-division'), cardAsset('math.arith')).ok).toBe(false)
  })
})

// ── C. PROSE ─────────────────────────────────────────────────────────────────

describe('C. prose in the asset proves nothing', () => {
  it('an asset naming the requested concept in its text is still rejected', () => {
    const impostor = makeVisualAsset({
      assetId: 'generated:phys.opt.mirrors:fresh',
      conceptId: 'phys.opt.mirrors',
      conceptTitle: 'Total Internal Reflection and Critical Angle',   // the requested concept's words
      representation: 'ray_optics',
      payload: {
        renderer: 'scene',
        sceneSpec: sceneOf([{
          narration: 'Total internal reflection past the critical angle.',
          objects: [{ type: 'vector', text: 'incident ray' }, { type: 'label', text: 'critical angle' }],
        }]),
      },
      provenance: 'engine',
    })
    // Every word matches. The conceptId does not.
    const result = admitVisualAsset(intent('phys.opt.total-internal-reflection'), impostor)
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('identity-mismatch')
  })
})

// ── D. RENDERER ──────────────────────────────────────────────────────────────

describe('D. renderer', () => {
  it('an asset whose declared renderer disagrees with its payload is rejected', () => {
    const inconsistent = { ...cardAsset('phys.mech.newtons-first-law'), renderer: 'scene' as const }
    const result = admitVisualAsset(intent('phys.mech.newtons-first-law'), inconsistent)
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('renderer-payload-mismatch')
  })

  it('an empty scene is rejected — a renderer with nothing to draw is not a figure', () => {
    const empty = makeVisualAsset({
      assetId: 'generated:c:fresh',
      conceptId: 'c', conceptTitle: 'C',
      representation: 'labelled_figure',
      payload: { renderer: 'scene', sceneSpec: sceneOf([{ objects: [] }]) },
      provenance: 'engine',
    })
    const result = admitVisualAsset(intent('c'), empty)
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('malformed-payload')
  })

  it('the retired ascii renderer can never be admitted', () => {
    const ascii = makeVisualAsset({
      assetId: 'x', conceptId: 'c', conceptTitle: 'C',
      representation: 'labelled_figure',
      payload: { renderer: 'ascii' },
      provenance: 'curated',
    })
    expect(admitVisualAsset(intent('c'), ascii).ok).toBe(false)
  })

  it('the renderer is the asset’s own, never chosen beside it', () => {
    const asset = cardAsset('phys.mech.newtons-first-law')
    expect(asset.renderer).toBe(asset.payload.renderer)
  })
})

// ── E. CACHE ─────────────────────────────────────────────────────────────────

describe('E. a cache hit is not an identity', () => {
  it('a cached asset for concept B is rejected when concept A was requested', () => {
    // The engine caches per concept key and re-validates, but the payload it
    // returns carries no identity of its own. Admission is what stops a scene
    // stored for one concept being served for another.
    const cachedForB = makeVisualAsset({
      assetId: 'generated:phys.therm.calorimetry:cached',
      conceptId: 'phys.therm.calorimetry',
      conceptTitle: 'Calorimetry',
      representation: 'labelled_figure',
      payload: {
        renderer: 'scene',
        sceneSpec: sceneOf([{ objects: [{ type: 'node', text: 'calorimeter' }, { type: 'label', text: 'ΔQ' }] }]),
      },
      provenance: 'engine',
    })
    const result = admitVisualAsset(intent('phys.therm.first-law'), cachedForB)
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('identity-mismatch')
  })

  it('a structurally valid, parseable, cache-keyed payload still needs identity', () => {
    const wellFormed = makeVisualAsset({
      assetId: 'generated:a:cached',
      conceptId: 'concept.a', conceptTitle: 'A',
      representation: 'labelled_figure',
      payload: { renderer: 'scene', sceneSpec: sceneOf([{ objects: [{ type: 'point' }, { type: 'point' }] }]) },
      provenance: 'engine',
    })
    // Parses, validates, renders — and belongs to someone else.
    expect(admitVisualAsset(intent('concept.b'), wellFormed).ok).toBe(false)
  })
})

// ── F. CURATED ───────────────────────────────────────────────────────────────

describe('F. curated visuals still work, unchanged', () => {
  it('a curated card resolves with declared identity', () => {
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.newtons-first-law',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.payload?.renderer).toBe('card')
    expect(d.asset?.conceptId).toBe('phys.mech.newtons-first-law')
    expect(d.asset?.provenance).toBe('curated')
    expect(d.asset?.identity).toBe('declared')
    expect(d.provenance).toBe('registry:phys.mech.newtons-first-law:three_newton_forces')
  })

  it('a concept-authored scene resolves with declared identity', () => {
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.opt.mirrors',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.payload?.renderer).toBe('scene')
    expect(d.asset?.conceptId).toBe('phys.opt.mirrors')
    expect(d.asset?.provenance).toBe('generator')
    expect(d.asset?.identity).toBe('declared')
  })

  it('the payload and the asset are one value, never two', () => {
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.newtons-first-law',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.payload).toBe(d.asset?.payload)
  })
})

// ── Derived identity is labelled, not hidden (the M3 hand-off) ───────────────

describe('derived identity is visible and counted', () => {
  it('a domain-prefix binding is admitted but marked derived', () => {
    // math.arith.* -> number_line is a PREFIX rule: it names the domain, not
    // this concept. M2 keeps it (deleting coverage is out of scope) and labels
    // it, so M3 can find every one of them.
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'math.arith.long-division',
      subject: 'mathematics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.asset?.provenance).toBe('domain-default')
    expect(d.asset?.identity).toBe('derived')
    expect(d.asset?.assetId).toContain('domain-default')
  })

  it('a generator kind-default is admitted but marked derived', () => {
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.momentum',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.asset?.provenance).toBe('generator-default')
    expect(d.asset?.identity).toBe('derived')
  })

  it('the strength table has no unclassified provenance', () => {
    for (const [provenance, strength] of Object.entries(IDENTITY_STRENGTH)) {
      expect(['declared', 'derived'], provenance).toContain(strength)
    }
    // Every provenance the union declares must be classified — an unlisted one
    // would default to nothing and silently lose its identity strength.
    expect(Object.keys(IDENTITY_STRENGTH)).toHaveLength(6)
    expect(IDENTITY_STRENGTH['engine-runtime-topic']).toBe('declared')
  })
})

// ── G/H. NO VISUAL + TUTOR CONTRACT ──────────────────────────────────────────

describe('G/H. the tutor is told about the admitted asset, or about nothing', () => {
  it('no admitted asset yields the NO FIGURE contract', () => {
    // Assetless fixture: TIR gained an authored figure in the M4 pilot.
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.kinetic-energy',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.asset).toBeNull()
    expect(buildVisualContractBlock(d)).toContain('NO FIGURE IS ATTACHED')
  })

  it('an admitted asset names ITS OWN concept in the contract', () => {
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.newtons-first-law',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    const block = buildVisualContractBlock(d)
    expect(block).toContain('A FIGURE IS ALREADY BEING RENDERED')
    expect(block).toContain(d.asset!.conceptTitle)
  })

  it('the contract follows the ASSET when the request disagrees with it', () => {
    // Forced divergence: a decision whose conceptTitle says one thing and whose
    // admitted asset says another. Admission makes this unreachable in
    // production; the test proves which side the contract reads.
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.newtons-first-law',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    const tampered = { ...d, conceptTitle: 'Total Internal Reflection', conceptId: 'phys.opt.total-internal-reflection' }
    const block = buildVisualContractBlock(tampered)
    expect(block).toContain(d.asset!.conceptTitle)
    expect(block).not.toContain('Total Internal Reflection')
  })

  it('a decision with a payload but no admitted asset is treated as NO FIGURE', () => {
    const d = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.newtons-first-law',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    const unadmitted = { ...d, asset: null }
    expect(buildVisualContractBlock(unadmitted)).toContain('NO FIGURE IS ATTACHED')
  })
})

// ── Regression lock: concept A never receives concept B's asset ──────────────

describe('regression lock — the Phase 0 concepts', () => {
  const PHASE_0 = [
    'phys.opt.total-internal-reflection',
    'phys.therm.calorimetry',
    'phys.therm.first-law',
    'phys.wave.transverse-waves',
    'phys.mech.viscosity',
    'phys.mech.surface-tension',
    'phys.wave.interference',
  ] as const

  it.each(PHASE_0)('%s never receives another concept’s asset', (conceptId) => {
    const d = resolveVisual({
      message: 'explain this with a ray diagram, it is like a mirror',
      lessonConceptId: conceptId,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    // Either no figure (today's honest answer) or a figure that is genuinely
    // this concept's. Never a figure belonging to something else.
    if (d.asset) expect(d.asset.conceptId).toBe(conceptId)
    else expect(d.graphical).toBe(false)
  })

  it('every admitted asset in the curriculum belongs to the concept asked for', () => {
    // The invariant, swept across every concept that currently gets a figure.
    const ids = [
      'phys.mech.newtons-first-law', 'phys.opt.reflection', 'phys.opt.mirrors',
      'math.arith.long-division', 'math.geom.circle-theorems', 'chem.bond.covalent-bond',
      'bio.cell.meiosis', 'cs.algo.sorting-algorithms', 'phys.mech.momentum',
    ]
    for (const id of ids) {
      const d = resolveVisual({ message: 'diagram please', lessonConceptId: id, learnerRequest: 'diagram' })
      if (d.asset) expect(d.asset.conceptId, id).toBe(id)
    }
  })
})
