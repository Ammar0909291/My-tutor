/**
 * bio.mol.dna-replication — a replication fork, not a base-pairing ladder.
 *
 * The concept was served the dna_structure generator's shared instance (a
 * static Watson-Crick ladder with a GC-content label), demoted in scope.ts as
 * "no replication fork". It now owns an authored figure drawn only from the KG
 * description and its Educational Brain entry. These tests pin that it is the
 * figure served, that its geometry says what the concept says, and that
 * nothing else moved.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { describeVisualTurn, tierOf } from '@/lib/teaching/visual/turnRecord'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { checkSceneLayoutAllViewports, fitSceneToFrame } from '@/lib/teaching/visual/layout'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { figureFingerprint } from '@/lib/teaching/visual/fingerprint'
import { buildDNAReplicationScene, DNA_REPLICATION_SCENE_ID } from '@/lib/teaching/sceneGenerators/dnaReplication'

const ID = 'bio.mol.dna-replication'
const resolve = (request: boolean) => resolveVisual({
  message: request ? 'can you show me a diagram of this please' : 'ok, go on',
  lessonConceptId: ID,
  subject: 'biology',
  learnerRequest: request ? 'diagram' : null,
})
const sceneOf = (d: ReturnType<typeof resolveVisual>): SceneSpec =>
  (d.payload as { sceneSpec: SceneSpec }).sceneSpec
const objects = (s: SceneSpec): SceneObject[] => s.steps.flatMap((st) => st.objects)
const texts = (s: SceneSpec): string[] => objects(s).map((o) => o.text ?? '').filter(Boolean)

describe('1-2. the concept resolves to its own replication-fork figure', () => {
  it('Tier 0, concept-authored, concept scope', () => {
    const d = resolve(false)
    expect(d.graphical).toBe(true)
    expect(tierOf(d)).toBe('tier0-generator')
    expect(d.asset?.provenance).toBe('generator')
    expect(d.asset?.scope).toBe('concept')
    expect(d.provenance).toBe(`generator:${ID}:dna_structure`)
    expect(sceneOf(d).id).toBe(DNA_REPLICATION_SCENE_ID)
    expect(CONCEPT_SCENE_OVERRIDES).toContain(ID)
  })

  it('the base-pairing ladder does NOT win for this concept', () => {
    const s = sceneOf(resolve(true))
    expect(s.id).not.toMatch(/^dna-structure-/)
    expect(texts(s).some((t) => /GC content/i.test(t))).toBe(false)
    // The demotion that described the ladder is gone with it.
    expect(INSUFFICIENT_FOR_CONCEPT.has(ID)).toBe(false)
  })

  it('9. an explicit diagram request returns the identical figure', () => {
    expect(figureFingerprint(resolve(true).payload)).toBe(figureFingerprint(resolve(false).payload))
  })
})

describe('3. structurally valid, framed and legible', () => {
  const scene = buildDNAReplicationScene()

  it('passes the SceneSpec structural validator', () => {
    expect(validateSceneSpec(scene)).toEqual({ valid: true, errors: [] })
  })

  it('no label collides or leaves the frame at desktop, tablet or mobile (all labels shown)', () => {
    for (const report of checkSceneLayoutAllViewports(fitSceneToFrame(scene))) {
      expect(report.violations, report.viewport).toEqual([])
    }
  })

  it('fits the tutor contract whole: <= 6 stages and <= 14 distinct texts, so nothing drawn goes unmentioned', () => {
    expect(scene.steps.length).toBeLessThanOrEqual(6)
    expect(new Set(texts(scene)).size).toBeLessThanOrEqual(14)
    const contract = buildVisualContractBlock(resolve(true))
    for (const t of new Set(texts(scene))) expect(contract, t).toContain(`"${t}"`)
  })
})

describe('4. the geometry says what the concept says', () => {
  const scene = buildDNAReplicationScene()
  const objs = objects(scene)
  const arrows = objs.filter((o) => o.type === 'arrow' && o.from && o.to)
  // New DNA is the green role; the fork is at the left, moving left.
  const newStrand = arrows.filter((a) => a.color === '#22c55e')
  const top = newStrand.filter((a) => a.from![1] > 0)
  const bottom = newStrand.filter((a) => a.from![1] < 0)
  const primers = objs.filter((o) => o.type === 'bond' && o.color === '#ef4444')

  it('names every component the KG description lists, and nothing it does not', () => {
    const t = new Set(texts(scene))
    for (const need of ['helicase', 'DNA polymerase', 'primase', 'ligase', 'leading strand', 'lagging strand',
      'Okazaki fragments', 'RNA primer', 'replication fork', 'template', 'parental DNA', 'semiconservative', '3′', '5′']) {
      expect(t.has(need), need).toBe(true)
    }
    for (const absent of [/topoisomerase/i, /single.?strand/i, /clamp/i, /GC content/i]) {
      expect(texts(scene).some((x) => absent.test(x)), String(absent)).toBe(false)
    }
  })

  it('the templates are antiparallel: 3′ over 5′ at the parental end, 5′ over 3′ at the far end', () => {
    const at = (t: string) => objs.filter((o) => o.type === 'label' && o.text === t).map((o) => o.position!)
    const left3 = at('3′').find((p) => p[0] < 0)!, left5 = at('5′').find((p) => p[0] < 0)!
    const right5 = at('5′').find((p) => p[0] > 0)!, right3 = at('3′').find((p) => p[0] > 0)!
    expect(left3[1]).toBeGreaterThan(left5[1])   // top strand starts 3′
    expect(right5[1]).toBeGreaterThan(right3[1]) // and ends 5′
  })

  it('leading strand: ONE continuous piece whose growing 3′ end points at the fork', () => {
    expect(top).toHaveLength(1)
    expect(top[0].to![0]).toBeLessThan(top[0].from![0])
  })

  it('lagging strand: several Okazaki fragments, each built AWAY from the fork', () => {
    expect(bottom.length).toBeGreaterThanOrEqual(2)
    for (const a of bottom) expect(a.to![0]).toBeGreaterThan(a.from![0])
  })

  it('primers: one on the leading strand, one per unfinished lagging fragment, each at a 5′ start', () => {
    const topPrimers = primers.filter((p) => p.from![1] > 0)
    const bottomPrimers = primers.filter((p) => p.from![1] < 0)
    expect(topPrimers).toHaveLength(1)
    // The leading primer sits at the strand's 5′ end — the arrow's tail.
    expect(Math.min(topPrimers[0].from![0], topPrimers[0].to![0])).toBeCloseTo(top[0].from![0], 5)
    // Every lagging primer ends exactly where a fragment begins (its 5′ end).
    expect(bottomPrimers.length).toBeGreaterThanOrEqual(1)
    expect(bottomPrimers.length).toBeLessThan(bottom.length) // the oldest primer is already replaced
    for (const p of bottomPrimers) {
      const end = Math.max(p.from![0], p.to![0])
      expect(bottom.some((a) => Math.abs(a.from![0] - end) < 1e-9), `primer ending at ${end}`).toBe(true)
    }
  })

  it('each stage narration carries the mechanism, in the EB order', () => {
    const n = scene.steps.map((s) => s.narration ?? '')
    expect(n[0]).toMatch(/helicase/i)
    expect(n[1]).toMatch(/opposite directions/i)
    expect(n[2]).toMatch(/existing 3′ end/)
    expect(n[3]).toMatch(/leading strand/i)
    expect(n[4]).toMatch(/Okazaki/)
    // The direction and the primer order, stated outright: production QA
    // (2026-09-24) had the tutor say fragments are extended "toward the fork",
    // with the next primer "further back" — both backwards.
    expect(n[4]).toMatch(/grows away/)
    expect(n[4]).toMatch(/primer laid nearer the fork/)
    expect(n[4]).toMatch(/ligase/)
    expect(n[5]).toMatch(/semiconservative/i)
  })
})

describe('5-6. nothing else moved', () => {
  it('no wrong-domain fallback: not a food_chain, not a domain card, not retired', () => {
    for (const d of [resolve(false), resolve(true)]) {
      expect(d.representation).toBe('dna')
      expect(d.asset?.provenance).not.toBe('domain-default')
      expect(d.payload?.renderer).toBe('scene')
    }
    expect(isRetiredVisualBinding(ID)).toBe(false)
  })

  it('the dna_structure generator stays bound, and its shared instance is unchanged', () => {
    expect(getConceptSceneGenerator(ID)).toBe('dna_structure')
    expect(buildCanonicalScene('dna_structure')?.id).toMatch(/^dna-structure-/)
  })

  it('the other molecular-biology DNA concepts still without a fix resolve exactly as before (no figure)', () => {
    // bio.mol.nucleic-acid-structure and bio.mol.transcription were given
    // their own Tier 0 scenes by the concurrent Biology visual coverage
    // campaign (2026-09-25) after the same live sweep that motivated this
    // file found them stuck too — see bioVisualCoverageCampaign.test.ts.
    // That is a real, intended change to their resolution, not a
    // regression of this test's own DNA-replication fix.
    for (const id of ['bio.mol.dna-damage-repair', 'bio.mol.chromatin-structure-genome-organization']) {
      expect(resolveVisual({ message: '', lessonConceptId: id }).provenance, id).toBe('no-figure:no-faithful-visual')
    }
  })

  it('8. no cross-subject or cross-concept leakage: only this concept, in any KG, is served this figure', () => {
    const holders: string[] = []
    for (const dir of ['mathematics', 'physics', 'chemistry', 'computer-science', 'biology', 'english']) {
      const f = `docs/${dir}/kg/graph.json`
      if (!existsSync(f)) continue
      const g = JSON.parse(readFileSync(f, 'utf8'))
      const cs: Array<{ id: string }> = Array.isArray(g.concepts) ? g.concepts : Object.values(g.concepts ?? g)
      for (const c of cs) {
        const d = resolveVisual({ message: '', lessonConceptId: c.id })
        if (d.payload?.renderer === 'scene' && sceneOf(d).id === DNA_REPLICATION_SCENE_ID) holders.push(c.id)
      }
    }
    expect(holders).toEqual([ID])
  })
})

describe('10. telemetry reports the provenance actually served', () => {
  it('VISUAL_TURN names the concept-authored Tier 0 scene, and served follows the response', () => {
    const d = resolve(true)
    expect(describeVisualTurn(d, { sceneSpec: sceneOf(d) }, true)).toMatchObject({
      concept: ID, tier: 'tier0-generator', assetId: `generator:${ID}:dna_structure`,
      representation: 'dna', scope: 'concept', renderer: 'scene', served: true, retirement: 'none',
    })
    expect(describeVisualTurn(d, {}, false).served).toBe(false)
  })
})
