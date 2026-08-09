/**
 * M4 — Physics visual authoring pilot.
 *
 * The seven concepts the visualization programme started from. Each was
 * measured, in Phase 0, being served a figure keyword-matched from the tutor's
 * own prose (a concave mirror for Total Internal Reflection, a two-cart
 * collision for Calorimetry, a projectile parabola for Viscosity). M1 removed
 * that path and left all seven with no figure, so the tutor fell back to
 * "imagine drawing…". This suite holds the authored replacements.
 *
 * It tests the whole chain the way production runs it — resolver → admission →
 * asset → contract — not the scene builders in isolation, because a scene that
 * is correct but unreachable teaches nobody.
 */

import { describe, expect, it } from 'vitest'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { admitVisualAsset } from '@/lib/teaching/visual/asset'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { visibleObjects, type SceneSpec } from '@/lib/teaching/sceneSpec'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'

/** Object types SceneSpecRenderer actually paints. bar/surface hit `default` and draw nothing. */
const DRAWN = new Set(['point', 'node', 'particle', 'vector', 'arrow', 'bond', 'label', 'path', 'trajectory'])

interface Pilot {
  id: string
  title: string
  /** Parts the figure MUST contain, matched against the objects' own label text. */
  mustDraw: string[]
}

const PILOT: Pilot[] = [
  {
    id: 'phys.opt.total-internal-reflection',
    title: 'Total Internal Reflection and Critical Angle',
    // Named as the figure now labels them (M4.1 shortened every label to a NAME).
    mustDraw: ['normal', 'glass', 'air', 'θ < θc', 'θ = θc', 'θ > θc', 'reflected back', 'sin θc'],
  },
  {
    id: 'phys.wave.transverse-waves',
    title: 'Transverse Waves',
    mustDraw: ['crest', 'trough', 'wavelength', 'wave travels', 'particle moves', '90°'],
  },
  {
    id: 'phys.wave.interference',
    title: 'Wave Interference',
    mustDraw: ['wave 1', 'wave 2', 'constructive', 'destructive', 'cancels', 'twice as tall'],
  },
  {
    id: 'phys.therm.calorimetry',
    title: 'Calorimetry',
    mustDraw: ['insulated', 'water', 'hot block', 'thermometer', 'heat flows hot', 'same T_f'],
  },
  {
    id: 'phys.therm.first-law',
    title: 'First Law of Thermodynamics',
    mustDraw: ['the system', 'Q in', 'W out', 'ΔU', 'ΔU = Q − W'],
  },
  {
    id: 'phys.mech.viscosity',
    title: "Viscosity and Stokes' Law",
    mustDraw: ['fixed plate', 'plate dragged', 'velocity gradient', 'η A (dv/dy)', 'THICK', 'THIN', 'steeper gradient'],
  },
  {
    id: 'phys.mech.surface-tension',
    title: 'Surface Tension and Capillarity',
    mustDraw: ['liquid surface', 'nothing pulls it up', 'tension along the surface', 'narrow tube', 'meniscus', 'liquid climbs'],
  },
]

const ask = (conceptId: string, message = 'explain with diagram') =>
  resolveVisual({ message, lessonConceptId: conceptId, subject: 'physics', learnerRequest: 'diagram' })

const sceneOf = (conceptId: string): SceneSpec => {
  const payload = ask(conceptId).payload
  if (!payload || payload.renderer !== 'scene') throw new Error(`${conceptId} has no scene`)
  return payload.sceneSpec
}

const drawnText = (spec: SceneSpec) =>
  visibleObjects(spec, Infinity)
    .filter((o) => DRAWN.has(o.type))
    .map((o) => o.text ?? '')
    .join(' | ')

describe('the pilot concepts exist and are the ones that failed', () => {
  it.each(PILOT)('$id is a real KG concept titled $title', ({ id, title }) => {
    expect(getKGNode(id)?.title).toBe(title)
  })

  it('none of them is a retired binding', () => {
    for (const { id } of PILOT) expect(isRetiredVisualBinding(id), id).toBe(false)
  })
})

describe('each pilot concept now resolves to its own figure', () => {
  it.each(PILOT)('$id renders a scene', ({ id }) => {
    const d = ask(id)
    expect(d.graphical).toBe(true)
    expect(d.payload?.renderer).toBe('scene')
    expect(d.source).toBe('registry')
  })

  it.each(PILOT)('$id — the asset is concept-scoped and concept-owned', ({ id }) => {
    const asset = ask(id).asset!
    expect(asset.conceptId).toBe(id)
    expect(asset.scope).toBe('concept')          // never a domain illustration
    expect(asset.provenance).toBe('generator')   // a human named THIS concept
    expect(asset.identity).toBe('declared')
  })

  it.each(PILOT)('$id passes admission against its own intent', ({ id, title }) => {
    const asset = ask(id).asset!
    const result = admitVisualAsset(
      { conceptId: id, conceptTitle: title, purpose: 'demonstrate', excursion: false, returnToConceptId: null },
      asset,
    )
    expect(result.ok).toBe(true)
  })

  it.each(PILOT)('$id produces a structurally valid scene', ({ id }) => {
    const result = validateSceneSpec(sceneOf(id))
    expect(result.valid, JSON.stringify(result.errors?.slice(0, 4))).toBe(true)
  })

  it.each(PILOT)('$id survives the async authority unchanged', async ({ id }) => {
    const d = await resolveVisualForTurn({
      message: 'give me a diagram', lessonConceptId: id, subject: 'physics', learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
    expect(d.asset?.conceptId).toBe(id)
  })
})

describe('each figure actually contains what the concept needs', () => {
  it.each(PILOT)('$id draws its required parts', ({ id, mustDraw }) => {
    // Case-insensitive: some parts are drawn as panel headings ("CONSTRUCTIVE").
    const text = drawnText(sceneOf(id)).toLowerCase()
    for (const part of mustDraw) {
      expect(text, `${id} is missing "${part}"`).toContain(part.toLowerCase())
    }
  })

  it.each(PILOT)('$id draws nothing the renderer would silently skip', ({ id }) => {
    // bar and surface return null from SceneSpecRenderer's switch. An object the
    // renderer drops but the contract describes is exactly how a tutor comes to
    // narrate something invisible.
    for (const obj of visibleObjects(sceneOf(id), Infinity)) {
      expect(DRAWN.has(obj.type), `${id} uses undrawable type ${obj.type}`).toBe(true)
    }
  })

  it.each(PILOT)('$id keeps its geometry inside the camera frame', ({ id }) => {
    for (const obj of visibleObjects(sceneOf(id), Infinity)) {
      for (const v of [obj.position, obj.from, obj.to, ...(obj.points ?? [])]) {
        if (!v) continue
        for (const n of v) expect(Math.abs(n), `${id} coordinate ${n} out of frame`).toBeLessThanOrEqual(6)
      }
    }
  })

  it('total internal reflection draws the parts the old mirror figure never had', () => {
    const text = drawnText(sceneOf('phys.opt.total-internal-reflection'))
    expect(text).toContain('normal')
    expect(text).toContain('glass')
    expect(text).toContain('all reflected back')
    // And it is NOT the concave-mirror image-construction figure.
    expect(text).not.toContain('concave mirror')
    expect(text).not.toContain('focal')
  })

  it('surface tension keeps the two phenomena distinguishable', () => {
    const text = drawnText(sceneOf('phys.mech.surface-tension'))
    expect(text).toContain('tension along the surface')   // surface tension
    expect(text).toContain('narrow tube')                 // capillarity
    expect(text).toContain('meniscus')
  })

  it('interference shows both outcomes, not one generic wave', () => {
    const text = drawnText(sceneOf('phys.wave.interference'))
    expect(text).toContain('twice as tall')
    expect(text).toContain('cancels to nothing')
  })

  it('viscosity shows the gradient and the comparison, not a single blob', () => {
    const text = drawnText(sceneOf('phys.mech.viscosity'))
    expect(text).toContain('velocity gradient')
    expect(text).toContain('steeper gradient')
  })
})

describe('the tutor is told the truth about each figure', () => {
  it.each(PILOT)('$id gets a concept contract, not NO FIGURE and not a domain illustration', ({ id, title }) => {
    const block = buildVisualContractBlock(ask(id))
    expect(block).toContain('A FIGURE IS ALREADY BEING RENDERED')
    expect(block).toContain(title)
    expect(block).not.toContain('NO FIGURE IS ATTACHED')
    expect(block).not.toContain('GENERAL ILLUSTRATION')
  })

  it.each(PILOT)('$id — the contract names only parts the figure really draws', ({ id }) => {
    const block = buildVisualContractBlock(ask(id))
    const named = /It contains EXACTLY these elements[^:]*: (.+?)\./s.exec(block)?.[1] ?? ''
    const real = drawnText(sceneOf(id))
    // Every quoted label the contract hands the model must exist in the payload.
    for (const quoted of named.match(/labelled "([^"]+)"/g) ?? []) {
      const text = /labelled "([^"]+)"/.exec(quoted)![1]
      expect(real, `${id}: contract names "${text}" which is not drawn`).toContain(text)
    }
  })

  it('no pilot contract invites the model to say "imagine"', () => {
    for (const { id } of PILOT) {
      const block = buildVisualContractBlock(ask(id))
      expect(block, id).toContain('Do NOT say "imagine"')
    }
  })
})

describe('NEGATIVE REGRESSIONS — the historical wrong visuals', () => {
  const forbidden: Array<[string, string[]]> = [
    ['phys.opt.total-internal-reflection', ['concave mirror', 'convex lens', 'focal length']],
    ['phys.therm.calorimetry', ['collision', 'projectile', 'trajectory', 'Launch']],
    ['phys.wave.interference', ['mirror', 'lens', 'focal']],
    ['phys.mech.viscosity', ['projectile', 'Launch', 'Peak', 'Range']],
    ['phys.mech.surface-tension', ['collision', 'projectile', 'torque', 'pendulum']],
    ['phys.therm.first-law', ['SI Units', 'number line', 'piston stroke']],
    ['phys.wave.transverse-waves', ['mirror', 'lens', 'refracted']],
  ]

  it.each(forbidden)('%s never draws any of %s', (conceptId, banned) => {
    const text = drawnText(sceneOf(conceptId)) + ' ' + sceneOf(conceptId).title
    for (const bad of banned) {
      expect(text.toLowerCase(), `${conceptId} drew "${bad}"`).not.toContain(bad.toLowerCase())
    }
  })

  it('a pilot asset cannot be admitted for a different concept', () => {
    const tir = ask('phys.opt.total-internal-reflection').asset!
    for (const other of PILOT.filter((p) => p.id !== tir.conceptId)) {
      const result = admitVisualAsset(
        { conceptId: other.id, conceptTitle: other.title, purpose: 'explain', excursion: false, returnToConceptId: null },
        tir,
      )
      expect(result.ok, `${tir.conceptId}'s asset was admitted for ${other.id}`).toBe(false)
    }
  })

  it('each pilot figure is distinct — none is a shared stand-in', () => {
    const seen = new Map<string, string>()
    for (const { id } of PILOT) {
      const key = JSON.stringify(sceneOf(id))
      const prior = seen.get(key)
      expect(prior, `${id} renders the same figure as ${prior}`).toBeUndefined()
      seen.set(key, id)
    }
  })

  it('the phrasing of the request does not change which figure appears', () => {
    for (const { id } of PILOT) {
      const a = ask(id, 'explain this')
      const b = ask(id, 'explain with diagram')
      const c = ask(id, 'give me a diagram')
      const d = ask(id, 'what does this diagram show?')
      for (const decision of [a, b, c, d]) {
        expect(decision.asset?.conceptId, id).toBe(id)
      }
      expect(b.payload).toEqual(c.payload)
    }
  })
})

describe('nothing outside the pilot changed', () => {
  it('existing faithful assets still resolve', () => {
    expect(ask('phys.mech.newtons-first-law').provenance).toBe('registry:phys.mech.newtons-first-law:three_newton_forces')
    expect(ask('phys.opt.mirrors').payload?.renderer).toBe('scene')
    expect(ask('phys.em.kirchhoffs-laws').asset?.scope).toBe('concept')
  })

  it('retired bindings are still retired', () => {
    expect(ask('phys.opt.reflection').graphical).toBe(false)
    expect(ask('bio.cell.apoptosis').graphical).toBe(false)
  })

  it('domain illustrations are still domain-scoped', () => {
    expect(ask('math.calc.limits').asset?.scope).toBe('domain')
  })
})

// ── M4.1 visual-quality regressions ─────────────────────────────────────────
// Each of these encodes a defect that browser inspection found and that no
// structural test caught. They are deterministic proxies, not a substitute for
// looking at the figure — the browser remains the final gate — but each one
// would have failed on the version that shipped in M4.

describe('M4.1 — visual quality invariants', () => {
  const labelsOf = (id: string) =>
    visibleObjects(sceneOf(id), Infinity).filter((o) => o.type === 'label')

  it.each(PILOT)('$id labels are NAMES, not sentences', ({ id }) => {
    // The canvas carries names; explanation is the tutor's job. A label long
    // enough to be a sentence is one the learner has to stop and read.
    for (const l of labelsOf(id)) {
      expect((l.text ?? '').length, `${id}: "${l.text}" is too long for a figure label`)
        .toBeLessThanOrEqual(34)
    }
  })

  it.each(PILOT)('$id has no two labels close enough to collide', ({ id }) => {
    // Deterministic proxy for the overlap the browser measures: labels render
    // horizontally, so a shared y band plus a small x gap is a collision.
    const ls = labelsOf(id)
    for (let i = 0; i < ls.length; i++) {
      for (let j = i + 1; j < ls.length; j++) {
        const a = ls[i].position!, b = ls[j].position!
        const dy = Math.abs(a[1] - b[1])
        const dx = Math.abs(a[0] - b[0])
        const tooClose = dy < 0.42 && dx < 1.9
        expect(tooClose, `${id}: "${ls[i].text}" and "${ls[j].text}" are too close (dx=${dx.toFixed(2)}, dy=${dy.toFixed(2)})`)
          .toBe(false)
      }
    }
  })

  it.each(PILOT)('$id uses the shared typographic tiers, not one flat size', ({ id }) => {
    const sizes = new Set(labelsOf(id).map((l) => l.size))
    expect(sizes.has(undefined), `${id} has an untiered label`).toBe(false)
    expect(sizes.size, `${id} uses only one type size`).toBeGreaterThan(1)
  })

  it.each(PILOT)('$id draws no dark-on-dark text', ({ id }) => {
    // The canvas is dark. The first pilot draft used slate-800 ink, which
    // rendered as invisible text the contract nonetheless described.
    for (const o of visibleObjects(sceneOf(id), Infinity)) {
      const c = o.color
      if (!c || !c.startsWith('#') || c.length !== 7) continue
      const lum = (parseInt(c.slice(1, 3), 16) * 0.299 + parseInt(c.slice(3, 5), 16) * 0.587 + parseInt(c.slice(5, 7), 16) * 0.114) / 255
      expect(lum, `${id}: ${c} on "${o.text ?? o.type}" is too dark for this canvas`).toBeGreaterThan(0.28)
    }
  })

  it('total internal reflection never contradicts itself', () => {
    // The M4 bug: steps are cumulative, so a step-4 label reading "no refracted
    // ray above the boundary" was on screen at the same time as step 2's
    // refracted ray. Any absence claim must name its own case or its own place.
    const texts = labelsOf('phys.opt.total-internal-reflection').map((l) => (l.text ?? '').toLowerCase())
    const absence = texts.filter((t) => /\bno\b|nothing|none/.test(t))
    expect(absence.length).toBeGreaterThan(0)          // it must still make the point
    for (const t of absence) {
      expect(t, `"${t}" claims absence for the whole figure`).toMatch(/here|③/)
    }
  })

  it('total internal reflection ray geometry matches the physics', () => {
    // θc = arcsin(n₂/n₁) = 41.8° for glass→air. The three cases must straddle
    // it, and the case-② refracted ray must genuinely lie along the boundary.
    const scene = sceneOf('phys.opt.total-internal-reflection')
    const arrows = visibleObjects(scene, Infinity).filter((o) => o.type === 'arrow')
    const grazing = arrows.find((a) => Math.abs((a.to?.[1] ?? 9)) < 0.12 && (a.to?.[0] ?? 0) > 1)
    expect(grazing, 'no ray grazing along the boundary').toBeTruthy()

    // Case ③ reflects: it must END BELOW the boundary, back inside the glass.
    const strike = 3.2
    const reflected = arrows.find((a) => Math.abs((a.from?.[0] ?? 0) - strike) < 0.01 && (a.to?.[1] ?? 0) < 0)
    expect(reflected, 'case ③ does not reflect back into the denser medium').toBeTruthy()

    // …and nothing is drawn above the boundary at ③'s strike point.
    // Rays only. A `bond` above the boundary at ③ is the NORMAL, which
    // correctly extends into both media and is not light.
    const RAY = new Set(['arrow', 'vector', 'path', 'trajectory'])
    const aboveAtC = visibleObjects(scene, Infinity).filter((o) =>
      RAY.has(o.type)
        && [o.position?.[0], o.to?.[0]].some((x) => x !== undefined && Math.abs(x - strike) < 0.6)
        && [o.position?.[1], o.to?.[1]].some((y) => y !== undefined && y > 0.3))
    expect(aboveAtC, 'a ray escapes above ③, contradicting total internal reflection').toHaveLength(0)
  })
})
