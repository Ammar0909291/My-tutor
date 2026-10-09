/**
 * Chemistry figure text is typeset (CVD-23, the 2026-10-08 Chemistry Visual Quality
 * audit): the figures printed `Zn2+ in solution`, `NH3`, `H2(g)`, `Cl-` as typed while
 * the tutor's text and the cards were already `Zn²⁺`, `NH₃`, `H₂`, `Cl⁻`.
 *
 * Two layers are pinned: the per-token rewrite (`typesetChemText`, built on the species
 * parser — it must fire on real species and on NOTHING else) and the scene-level mapper
 * (`typesetSceneChemistry` — only learner-visible text changes, nothing is mutated).
 */

import { describe, expect, it } from 'vitest'
import { typesetChemText, typesetSpecies } from '@/lib/text/chemSpecies.pure'
import { typesetSceneChemistry } from '@/lib/teaching/visual/typesetSceneChemistry'
import { collectSceneTexts } from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { getAllNodes, getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

describe('typesetChemText — rewrites real species', () => {
  const cases: Array<[string, string]> = [
    ['Zn2+ in solution', 'Zn²⁺ in solution'],
    ['Cu2+', 'Cu²⁺'],
    ['Co3+', 'Co³⁺'],
    ['Cl- in solution', 'Cl⁻ in solution'],
    ['Na+ in solution', 'Na⁺ in solution'],
    ['H+ in solution', 'H⁺ in solution'],
    ['NH4+ in solution', 'NH₄⁺ in solution'],
    ['SO42-', 'SO₄²⁻'],
    ['NO3-', 'NO₃⁻'],
    ['Cr2O72-', 'Cr₂O₇²⁻'],
    ['NH3', 'NH₃'],
    ['H2O 373 K', 'H₂O 373 K'],
    ['CO2(g)', 'CO₂(g)'],
    ['C(s) + O2(g)', 'C(s) + O₂(g)'],
    ['Na(s) + ½Cl2(g)', 'Na(s) + ½Cl₂(g)'],
    ['2H2 + O2 -> 2H2O', '2H₂ + O₂ -> 2H₂O'],
    ['Na+(g) + e− + Cl(g)', 'Na⁺(g) + e⁻ + Cl(g)'],
    ['Na+(g) + Cl−(g)', 'Na⁺(g) + Cl⁻(g)'],
    ['[Cu(NH3)4]2+ (monodentate)', '[Cu(NH₃)₄]²⁺ (monodentate)'],
    ['Crystal Field Splitting: [Ti(H2O)6]3+', 'Crystal Field Splitting: [Ti(H₂O)₆]³⁺'],
    ['Ca(OH)2', 'Ca(OH)₂'],
    ['CuSO4.5H2O', 'CuSO₄·5H₂O'],
    ['"H2O 373 K"', '"H₂O 373 K"'],
    ['Pt, H2(g) (cathode)', 'Pt, H₂(g) (cathode)'],
    ['Zinc anode (Zn2+).', 'Zinc anode (Zn²⁺).'],
    ['6 NH3 ligands', '6 NH₃ ligands'],
    ['H2SO4 and HNO3', 'H₂SO₄ and HNO₃'],
  ]
  for (const [raw, want] of cases) {
    it(`${JSON.stringify(raw)} → ${JSON.stringify(want)}`, () => {
      expect(typesetChemText(raw)).toBe(want)
    })
  }
})

describe('typesetChemText — leaves everything else byte-identical', () => {
  const untouched = [
    // already typeset
    'Zn²⁺ in solution', 'H₂O', 'SO₄²⁻', 'e⁻', 'Fe³⁺', 'H²',
    // prose, numbers, units, quantities
    'Show that the final state is the same by every path', 'ΔH = -393.5 kJ/mol', 'Step 2: add heat', 'pH 7',
    'Cell EMF is 0.76 volts, spontaneous.', '25 °C and 1.0 atm', 'x = 3, y = -2', '1:1 ratio', '10-3 M',
    // carbon locants / labelled quantities are not molecules
    'C2 of the chain', 'P1 and P2', 'T1 < T2', 'V1', 'K1',
    // ambiguous diatomic-former + one digit + sign: oxide vs superoxide, H₂⁺ vs H²⁺
    'O2-', 'H2+',
    // orbital labels, generic symbols that are not elements
    'sp3d2', 't2g', 'Ln3+', 'M2+',
    // words that look chemical
    'NOW', 'OK', 'Co', 'No', 'CO', 'Pa', 'kPa', 'mol/L',
    // a URL
    'https://example.com/H2O',
  ]
  for (const s of untouched) {
    it(`unchanged: ${JSON.stringify(s)}`, () => {
      expect(typesetChemText(s)).toBe(s)
    })
  }

  it('is idempotent', () => {
    for (const [raw] of [['Zn2+ and NH4+ with SO42-'], ['2H2 + O2 -> 2H2O'], ['[Cu(NH3)4]2+']]) {
      const once = typesetChemText(raw)
      expect(typesetChemText(once)).toBe(once)
    }
  })

  it('typesetSpecies returns null for text it is not sure about', () => {
    for (const s of ['water', 'H2O2x', 'Xx2', '3D', '2A', '1s2', 'O2-', 'C2', '']) expect(typesetSpecies(s)).toBeNull()
  })
})

// ── scene level ────────────────────────────────────────────────────────────────
function scene(): SceneSpec {
  return {
    id: 'electrochemical-cell-daniell-cell',
    title: 'Daniell cell: Zn + Cu2+ -> Zn2+ + Cu',
    sceneType: 'diagram',
    teachingGoal: 'Show Zn2+ and Cu2+ in solution',
    ariaLabel: 'A cell with Zn2+ ions',
    stage: { axisLabels: { x: 'time', y: '[Cu2+] (M)' } },
    steps: [
      {
        narration: 'Zn2+ in solution leaves the anode.',
        objects: [
          { type: 'label', id: 'ion-label', position: [0, 1, 0], text: 'Zn2+ in solution', color: '#2563eb' },
          { type: 'node', id: 'n0', position: [0, 0, 0], radius: 0.3, color: '#16a34a' },
        ],
        predict: { question: 'Where does NH3 go?', options: ['to NH3', 'nowhere'] },
      },
    ],
    explainer: {
      title: 'Zn2+ / Cu2+ couple',
      givens: 'E° = 1.10 V, [Zn2+] = 1.0 M',
      result: { expression: 'Cu2+ + 2e- -> Cu', value: '+0.34 V' },
      legend: [{ label: 'Zn2+', color: '#2563eb', shape: 'dot' }],
      panels: [{ heading: 'At the cathode', body: 'Cu2+ gains electrons.', lines: ['Cu2+ + 2e- -> Cu'] }],
      insight: { heading: 'Why', bullets: ['SO42- is a spectator'], note: 'H2O is the solvent' },
    },
  } as unknown as SceneSpec
}

describe('typesetSceneChemistry', () => {
  it('typesets every learner-visible string the audit lists', () => {
    const out = typesetSceneChemistry(scene())
    const texts = collectSceneTexts(out).map((t) => t.text)
    expect(texts.length).toBeGreaterThan(10)
    for (const t of texts) {
      expect(t).not.toMatch(/Zn2\+|Cu2\+|NH3|SO42-|H2O|e- /)
    }
    expect(out.title).toContain('Zn²⁺')
    expect(out.steps[0].objects[0].text).toBe('Zn²⁺ in solution')
    expect(out.steps[0].predict?.options?.[0]).toBe('to NH₃')
    expect(out.explainer?.panels?.[0].lines?.[0]).toBe('Cu²⁺ + 2e⁻ -> Cu')
    expect(out.stage?.axisLabels?.y).toBe('[Cu²⁺] (M)')
  })

  it('changes nothing but text: ids, colours, coordinates, radii survive', () => {
    const before = scene()
    const out = typesetSceneChemistry(before)
    const strip = (s: SceneSpec) => JSON.stringify(s, (k, v) => (typeof v === 'string' && /[A-Za-z]/.test(v) && !/^#|^[a-z0-9-]+$/.test(v) ? '<text>' : v))
    expect(strip(out)).toBe(strip(before))
    expect(out.steps[0].objects[0]).toMatchObject({ type: 'label', id: 'ion-label', position: [0, 1, 0], color: '#2563eb' })
    expect(out.steps[0].objects[1]).toMatchObject({ type: 'node', id: 'n0', radius: 0.3, color: '#16a34a' })
  })

  it('does not mutate its input', () => {
    const before = scene()
    const frozen = JSON.stringify(before)
    typesetSceneChemistry(before)
    expect(JSON.stringify(before)).toBe(frozen)
  })

  it('returns the SAME object when there is nothing to typeset (stable identity)', () => {
    const once = typesetSceneChemistry(scene())
    expect(typesetSceneChemistry(once)).toBe(once)
    const plain = { id: 'x', title: 'A simple pendulum', sceneType: 'diagram', steps: [{ narration: 'It swings.', objects: [{ type: 'label', text: 'bob', position: [0, 0, 0] }] }] } as unknown as SceneSpec
    expect(typesetSceneChemistry(plain)).toBe(plain)
  })
})

// ── the real corpus ─────────────────────────────────────────────────────────────
describe('typesetSceneChemistry over every chemistry scene the resolver serves', () => {
  const scenes: Array<{ id: string; scene: SceneSpec }> = []
  for (const node of getAllNodes(getKnowledgeGraph('chemistry'))) {
    const d = resolveVisual({ message: '', lessonConceptId: node.id, subject: 'chemistry' })
    const sc = d.payload && d.payload.renderer === 'scene' ? d.payload.sceneSpec : null
    if (sc) scenes.push({ id: node.id, scene: sc })
  }

  it('finds the authored chemistry scenes (guards the enumeration itself)', () => {
    expect(scenes.length).toBeGreaterThanOrEqual(30)
  })

  it('leaves no ASCII ion/formula token in learner text, and never alters a number or a word', () => {
    const residual: string[] = []
    for (const { id, scene: sc } of scenes) {
      const out = typesetSceneChemistry(sc)
      const a = collectSceneTexts(sc)
      const b = collectSceneTexts(out)
      expect(b.length).toBe(a.length)
      a.forEach((item, i) => {
        // The rewrite may only turn digits/signs into script characters: stripping every
        // script character from both sides, and the ASCII digits and signs they replace, must
        // leave the same letters, spaces and punctuation.
        const norm = (s: string) => s.replace(/[₀-₉⁰¹²³⁴-⁹⁺⁻·]/g, '').replace(/[0-9+\-−.]/g, '')
        expect(norm(b[i].text), `${id} ${item.where}`).toBe(norm(item.text))
        for (const tok of b[i].text.match(/\S+/g) ?? []) {
          if (/[A-Z][a-z]?\d/.test(tok) && !/[₀-₉⁰¹²³⁴-⁹⁺⁻]/.test(tok) && typesetSpecies(tok.replace(/^[("'“\[]+|[)"'”.,;:\]]+$/g, '')) !== null) residual.push(`${id}: ${tok}`)
        }
      })
    }
    expect(residual).toEqual([])
  })
})
