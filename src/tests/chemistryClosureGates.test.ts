/**
 * Chemistry visual closure (2026-10-09) — the gate repairs and the Tier-3 retirements, pinned.
 *
 *   1. `normalizeChemGraphSpec` / `repairChemistryPayload`: an equation graph with no `domain` is clipped to its axis
 *      quantity's physical range (no negative volume, pressure, concentration, molality, time); an author's domain,
 *      an unknown axis and an unrepairable curve are left alone.
 *   2. `verifyMolecularStructure`: D / T are hydrogen isotopes; a figure may draw several molecules and lone ions, each
 *      checked on its own (a 120° water is still caught); a neutral atom bonded to nothing still FAILS.
 *   3. The 16 cached production figures the closure review judged wrong are refused BY CONTENT, and the figures it
 *      judged right are admitted — read from the committed snapshot of the production cache.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  chemRangeRule, normalizeChemGraphSpec, validateGraphSpec, verifyMolecularStructure,
} from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { chemistryAdmissionFailure, repairChemistryPayload } from '@/lib/teaching/visual/chemistryAdmission'
import { admitVisualAsset, makeVisualAsset } from '@/lib/teaching/visual/asset'
import { validateGeneratedFigure } from '@/lib/teaching/visual/visualEngine'
import { kgTopicIdentity } from '@/lib/teaching/visual/topicIdentity'
import { figureFingerprint } from '@/lib/teaching/visual/verdictCache'
import { retiredAssetVerdict, isRetiredVisualBinding, RETIRED_GENERATED_FIGURES } from '@/lib/teaching/visual/retired'
import { bondOrderOf, parallelBondEnds, MULTI_BOND_SPACING } from '@/lib/teaching/visual/bondGeometry'
import { buildMoleculeScene, checkMoleculeConsistency, lonePairDirections, lookupMolecule } from '@/lib/teaching/sceneGenerators/moleculeGeometry.pure'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildLatticeScene, lookupLattice } from '@/lib/teaching/sceneGenerators/crystalLattice.pure'
import { shellOccupancy } from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { ATOM_MODEL } from '@/components/school/visuals/AtomicStructure3D'
import { SHELL_ELECTRONS_DRAWN } from '@/components/school/visuals/ElectronShells3D'
import { ELECTRONS_PER_ATOM_BEFORE, SHARED_PAIR_ELECTRONS } from '@/components/school/visuals/BondFormation3D'
import { LATTICE_STAGES } from '@/components/school/visuals/CrystalLattice3D'
import { OUTER as TETRAHEDRAL_ATOMS } from '@/components/school/visuals/MolecularShapes3D'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'

const graph = (over: Record<string, unknown>) => ({ type: 'graph', title: 't', xLabel: 'Volume (L)', yLabel: 'Pressure (atm)', equation: '10 / x', ...over })
const codes = (r: { findings: Array<{ code: string }> }) => r.findings.map((f) => f.code)

describe('graph domain repair (chemistry only)', () => {
  it("Boyle's law 10 / x: clipped to the positive volumes, lower end off the pole", () => {
    const fixed = normalizeChemGraphSpec(graph({}))
    expect(fixed.domain).toEqual([0.5, 10])
    expect(fixed.equation).toBe('10 / x')
    expect(codes(validateGraphSpec(fixed))).not.toContain('L-RANGE')
    expect(codes(validateGraphSpec(graph({})))).toContain('L-RANGE')
  })

  it("Henry's law 0.034 x and a second-order x^2 start at 0; a molality / time axis is covered by the new rules", () => {
    expect(normalizeChemGraphSpec(graph({ xLabel: 'Partial pressure of gas (atm)', yLabel: 'Concentration (mol/L)', equation: '0.034 * x' })).domain).toEqual([0, 10])
    expect(normalizeChemGraphSpec(graph({ xLabel: 'Concentration of A (M)', yLabel: 'Rate (M s^-1)', equation: 'x^2' })).domain).toEqual([0, 10])
    expect(normalizeChemGraphSpec(graph({ xLabel: 'Molality (mol/kg)', yLabel: 'Boiling point elevation (°C)', equation: 'y = 0.512 * x' })).domain).toEqual([0, 10])
    expect(chemRangeRule('Molality (mol/kg)')?.name).toBe('molality')
    expect(chemRangeRule('Time (s)')?.name).toBe('time')
    expect(chemRangeRule('Ionic strength (mol/kg)')?.name).toBe('ionic strength')
  })

  it('a bounded axis (pH, mole fraction) takes its whole physical range', () => {
    expect(normalizeChemGraphSpec(graph({ xLabel: 'pH', yLabel: 'Fraction ionised', equation: '1/(1+10^(7-x))' })).domain).toEqual([0, 14])
    expect(normalizeChemGraphSpec(graph({ xLabel: 'Mole fraction of A', yLabel: 'Vapour pressure (kPa)', equation: '20 * x' })).domain).toEqual([0, 1])
  })

  it("never touches an author's domain, an unknown axis, a non-graph or an unrepairable curve", () => {
    const own = graph({ domain: [1, 5] })
    expect(normalizeChemGraphSpec(own)).toBe(own)
    const unknown = graph({ xLabel: 'Position (m)', yLabel: 'psi' })
    expect(normalizeChemGraphSpec(unknown)).toBe(unknown)
    const flow = { type: 'process_flow', steps: [] }
    expect(normalizeChemGraphSpec(flow)).toBe(flow)
    const negativePressure = graph({ equation: '-x' })   // a negative pressure is not a domain problem
    expect(normalizeChemGraphSpec(negativePressure)).toBe(negativePressure)
  })

  it('repairs on every tier through makeVisualAsset — chemistry concepts only — and the gate then admits it', () => {
    const payload = { renderer: 'spec' as const, visualSpec: graph({}) as never }
    const chem = makeVisualAsset({ assetId: 'generated:chem.state.gas-laws:cached', conceptId: 'chem.state.gas-laws', conceptTitle: 'Gas Laws', representation: 'process' as never, payload, provenance: 'engine' as never })
    expect((chem.payload as { visualSpec: { domain?: number[] } }).visualSpec.domain).toEqual([0.5, 10])
    expect(chemistryAdmissionFailure('chem.state.gas-laws', chem.payload)).toBeNull()
    const physics = makeVisualAsset({ assetId: 'generated:phys.x:cached', conceptId: 'phys.thermo.ideal-gas', conceptTitle: 'Ideal gas', representation: 'process' as never, payload, provenance: 'engine' as never })
    expect((physics.payload as { visualSpec: { domain?: number[] } }).visualSpec.domain).toBeUndefined()
    expect(repairChemistryPayload('chem.x', { renderer: 'card', visualType: 'food_chain' } as never)).toEqual({ renderer: 'card', visualType: 'food_chain' })
  })
})

describe('molecular verifier: isotopes, several molecules, dangling atoms', () => {
  type O = SceneSpec['steps'][number]['objects'][number]
  const atom = (id: string, text: string, position: [number, number, number], charge?: string): O => ({ type: 'particle', id, text: charge ? `${text}${charge}` : text, position })
  const bond = (from: [number, number, number], to: [number, number, number]): O => ({ type: 'bond', from, to })
  const scene = (title: string, objects: O[]): SceneSpec => ({ id: 'x', title, sceneType: 'diagram', steps: [{ narration: 'n', objects }] } as unknown as SceneSpec)

  const xef2 = (dx: number): O[] => [atom(`Xe${dx}`, 'Xe', [dx, 0, 0]), atom(`Fa${dx}`, 'F', [dx - 1, 0, 0]), atom(`Fb${dx}`, 'F', [dx + 1, 0, 0]), bond([dx, 0, 0], [dx - 1, 0, 0]), bond([dx, 0, 0], [dx + 1, 0, 0])]
  const xef4 = (dx: number): O[] => [
    atom('Xe4', 'Xe', [dx, 0, 0]),
    ...([[-1, 1], [-1, -1], [1, 1], [1, -1]] as const).flatMap(([x, y], i) => [atom(`F4${i}`, 'F', [dx + x, y, 0]), bond([dx, 0, 0], [dx + x, y, 0])]),
  ]

  it('XeF₂ beside XeF₄ is two molecules, each verified — no E-DISCONNECTED', () => {
    const r = verifyMolecularStructure(scene('Group 18: Noble Gas Molecules', [...xef2(0), ...xef4(5)]))
    expect(codes(r)).not.toContain('E-DISCONNECTED')
    expect(r.verified.join('|')).toMatch(/2 separate molecule/)
  })

  it('a wrong angle inside one of several molecules is still caught (120° water next to a fine molecule)', () => {
    const water: O[] = [atom('O', 'O', [0, 3, 0]), atom('H1', 'H', [1, 3, 0]), atom('H2', 'H', [-0.5, 3.866, 0]), bond([0, 3, 0], [1, 3, 0]), bond([0, 3, 0], [-0.5, 3.866, 0])]
    expect(codes(verifyMolecularStructure(scene('Molecules', [...xef2(8), ...water])))).toContain('E-VSEPR-MISMATCH')
  })

  it('D and T are hydrogen isotopes, not unknown elements', () => {
    const d2o: O[] = [atom('O', 'O', [0, 0, 0]), atom('D1', 'D', [0.96, 0.25, 0]), atom('D2', 'D', [-0.96, 0.25, 0]), bond([0, 0, 0], [0.96, 0.25, 0]), bond([0, 0, 0], [-0.96, 0.25, 0])]
    const r = verifyMolecularStructure(scene('Heavy water', d2o))
    expect(codes(r)).not.toContain('E-ELEMENT')
    expect(codes(r)).not.toContain('E-VALENCE-EXCEEDED')
  })

  it('an ion beside a molecule is fine; a neutral non-noble atom bonded to nothing still FAILS', () => {
    expect(codes(verifyMolecularStructure(scene('XeF₂ and a calcium ion', [...xef2(0), atom('Ca', 'Ca', [6, 0, 0], '²⁺')])))).not.toContain('E-DISCONNECTED')
    expect(codes(verifyMolecularStructure(scene('XeF₂ and a stray atom', [...xef2(0), atom('Cl', 'Cl', [6, 0, 0])])))).toContain('E-DISCONNECTED')
  })
})

describe('the production Tier-3 figures, by content (snapshot of the verdict/figure cache, 2026-10-09)', () => {
  const rows = JSON.parse(readFileSync('docs/qa/chemistry-visual-audit/tier23-snapshot/figures.json', 'utf8')) as Array<{ conceptId: string; figure: unknown }>
  const build = (id: string) => {
    const f = rows.find((r) => r.conceptId === id)!
    const ctx = kgTopicIdentity(id)!
    const v = validateGeneratedFigure(f.figure, ctx, { requireAxisLabels: true })
    if (!v.ok) return { v: null as null, asset: null as null }
    const payload = v.figure.kind === 'scene' ? { renderer: 'scene' as const, sceneSpec: v.figure.scene } : { renderer: 'spec' as const, visualSpec: v.figure.spec }
    const asset = makeVisualAsset({ assetId: `generated:${id}:cached`, conceptId: id, conceptTitle: ctx.title, representation: 'process' as never, payload, provenance: 'engine' as never })
    return { v, asset }
  }

  const RETIRED = [
    'chem.found.matter', 'chem.atomic.quantum-mech-model', 'chem.bond.intermolecular', 'chem.state.molar-mass-gas', 'chem.equil.titration',
    'chem.sblock.water', 'chem.pblock.group15', 'chem.dblock.oxo-species', 'chem.org.hybridization', 'chem.org.electronic-effects',
    'chem.hyd.alkynes', 'chem.hyd.arenes', 'chem.carb.ketones', 'chem.nitro.amines', 'chem.bio.proteins', 'chem.hyd.polycyclic',
  ]
  it.each(RETIRED)('%s: the wrong cached figure is refused by content', (id) => {
    const { asset } = build(id)
    expect(asset, `${id} must still validate (retirement, not validation, is what stops it)`).not.toBeNull()
    expect(retiredAssetVerdict(id, { provenance: asset!.provenance, fingerprint: figureFingerprint(asset!.payload) })).toBe('retired-asset')
  })

  it('a regenerated figure with new content is judged afresh (the concept is not retired), and none of the 16 is a retired BINDING', () => {
    // The table names one figure by its content; it never retires the concept, so the semantic-moat register is untouched.
    expect(retiredAssetVerdict('chem.equil.titration', { provenance: 'engine', fingerprint: 'fNEWCONTENT' })).toBe('not-retired')
    // (Two of them already had a retired CARD binding before this closure; the closure added no binding row for any.)
    const ALREADY_RETIRED_CARD = ['chem.atomic.quantum-mech-model', 'chem.bond.intermolecular']
    for (const id of RETIRED) {
      expect(isRetiredVisualBinding(id), id).toBe(ALREADY_RETIRED_CARD.includes(id))
      expect(RETIRED_GENERATED_FIGURES[id]?.length, id).toBeGreaterThan(0)
    }
    expect(Object.keys(RETIRED_GENERATED_FIGURES).sort()).toEqual([...RETIRED].sort())
  })

  it.each([
    ['chem.state.gas-laws', [0.5, 10]], ['chem.sol.solubility', [0, 10]], ['chem.kinet.rate-law', [0, 10]], ['chem.sol.colligative', [0, 10]],
  ] as const)("%s: admitted, with the repaired domain %j", (id, domain) => {
    const { asset } = build(id)
    expect(asset).not.toBeNull()
    expect((asset!.payload as { visualSpec: { domain?: number[] } }).visualSpec.domain).toEqual(domain)
    expect(admitVisualAsset({ conceptId: id } as never, asset!)).toMatchObject({ ok: true })
  })

  it('the noble-gas molecules figure (two molecules) is admitted; the 120° water is refused by the gate', () => {
    expect(chemistryAdmissionFailure('chem.pblock.group18', build('chem.pblock.group18').asset!.payload)).toBeNull()
    expect(chemistryAdmissionFailure('chem.sblock.water', build('chem.sblock.water').asset!.payload)).toMatch(/E-VSEPR-MISMATCH/)
  })
})

describe('R2 — bond order and lone pairs are drawn', () => {
  const angle = (a: number[], b: number[]) => (Math.acos((a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (Math.hypot(...(a as [number, number, number])) * Math.hypot(...(b as [number, number, number])))) * 180) / Math.PI

  it('a bond of order 2 / 3 becomes 2 / 3 parallel sticks, centred on the axis; order 1 is byte-identical', () => {
    const from: [number, number, number] = [0, 0, 0], to: [number, number, number] = [8, 0, 0]
    expect(parallelBondEnds(from, to, 1)).toEqual([[from, to]])
    const two = parallelBondEnds(from, to, 2)
    expect(two).toHaveLength(2)
    expect(two[0][1][0] - two[0][0][0]).toBeCloseTo(8)          // same length as the bond, parallel to it
    expect(Math.abs(two[0][0][1] - two[1][0][1])).toBeCloseTo(MULTI_BOND_SPACING)   // offset in-plane (y), where the camera sees it
    expect(two[0][0][2]).toBeCloseTo(0)
    expect((two[0][0][1] + two[1][0][1]) / 2).toBeCloseTo(0)     // centred on the axis
    expect(parallelBondEnds(from, to, 3)).toHaveLength(3)
    // A bond along z offsets along x instead (never collapses onto its own axis).
    const z = parallelBondEnds([0, 0, 0], [0, 0, 8], 2)
    expect(Math.abs(z[0][0][0] - z[1][0][0])).toBeCloseTo(MULTI_BOND_SPACING)
    expect(parallelBondEnds(from, from, 2)).toEqual([[from, from]])   // degenerate: untouched, no NaN
    expect([bondOrderOf(undefined), bondOrderOf({ order: 2 }), bondOrderOf({ order: 3 }), bondOrderOf({ order: 7 }), bondOrderOf({ order: 'x' })]).toEqual([1, 2, 3, 1, 1])
  })

  it('lone pairs sit in the free VSEPR domains: AX₂E₂ tetrahedral (109.5° apart, ≥ 109° from each bond), AX₃E opposite the bonds', () => {
    const water = lookupMolecule('water')!
    const [a, b] = lonePairDirections(water)
    expect(angle(a, b)).toBeCloseTo(109.47, 1)
    const bonds = [[Math.sin((104.5 / 2) * Math.PI / 180), Math.cos((104.5 / 2) * Math.PI / 180), 0], [-Math.sin((104.5 / 2) * Math.PI / 180), Math.cos((104.5 / 2) * Math.PI / 180), 0]]
    for (const lp of [a, b]) for (const bd of bonds) expect(angle(lp, bd)).toBeGreaterThan(105)
    const [n] = lonePairDirections(lookupMolecule('ammonia')!)
    expect(n).toEqual([0, -1, 0])
    for (const none of ['methane', 'carbon dioxide', 'boron trifluoride']) expect(lonePairDirections(lookupMolecule(none)!), none).toEqual([])
  })

  it('every shipped molecule is still a valid, self-consistent scene — and CO₂ carries order 2 on both bonds', () => {
    for (const name of ['water', 'hydrogen sulfide', 'carbon dioxide', 'ammonia', 'methane', 'boron trifluoride']) {
      const def = lookupMolecule(name)!
      const scene = buildMoleculeScene(def)
      expect(validateSceneSpec(scene).valid, name).toBe(true)
      expect(checkMoleculeConsistency(scene, def), name).toEqual({ ok: true, errors: [] })
      const ids = scene.steps.flatMap((st) => st.objects.map((o) => o.id))
      expect(new Set(ids).size, `${name} ids unique`).toBe(ids.length)
      const lone = scene.steps.flatMap((st) => st.objects).filter((o) => o.properties?.kind === 'lone-pair')
      expect(lone, name).toHaveLength(def.lonePairs)
      const orders = scene.steps.flatMap((st) => st.objects).filter((o) => o.type === 'bond').map((o) => bondOrderOf(o.properties))
      expect(orders, name).toEqual(Array(def.count).fill(name === 'carbon dioxide' ? 2 : 1))
    }
  })

  it('R16: molecule and unit-cell figures draw no floor grid (it was the background behind the bottom label)', () => {
    for (const name of ['water', 'methane', 'ammonia']) expect(buildMoleculeScene(lookupMolecule(name)!).stage).toEqual({ grid: false, axes: false })
    for (const k of ['simple cubic', 'bcc', 'fcc']) expect(buildLatticeScene(lookupLattice(k)!).stage).toEqual({ grid: false, axes: false })
  })
})

describe('R19 — the four fixed React cards the payload audit cannot see are held to the periodic table', () => {
  const Z: Record<string, number> = { Mg: 12, Ar: 18 }

  it('the atomic-structure card draws ONE real neutral atom: protons = electrons and the aufbau shell filling for that Z', () => {
    expect(ATOM_MODEL.protons).toBe(Z[ATOM_MODEL.symbol])
    expect(ATOM_MODEL.shellElectrons.reduce((a, b) => a + b, 0)).toBe(ATOM_MODEL.protons)       // neutral
    expect([...ATOM_MODEL.shellElectrons]).toEqual(shellOccupancy(ATOM_MODEL.protons))           // 2, 8, 2 — not 2, 4, 4
    expect(ATOM_MODEL.neutrons).toBe(12)                                                         // magnesium-24
  })

  it('the electron-shell card draws argon: 2, 8, 8 (the aufbau filling of Z = 18)', () => {
    expect(SHELL_ELECTRONS_DRAWN).toEqual(shellOccupancy(Z.Ar))
  })

  it('the bond-formation card conserves electrons: one per atom before, a shared pair after', () => {
    expect(2 * ELECTRONS_PER_ATOM_BEFORE).toBe(SHARED_PAIR_ELECTRONS)
  })

  it('the molecular-shapes card draws a real tetrahedron: four equal bonds, every pair of bonds 109.47° apart (the 109.5° it labels)', () => {
    expect(TETRAHEDRAL_ATOMS).toHaveLength(4)
    const len = (v: number[]) => Math.hypot(v[0], v[1], v[2])
    for (const v of TETRAHEDRAL_ATOMS) expect(len(v)).toBeCloseTo(len(TETRAHEDRAL_ATOMS[0]), 6)
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
      const a = TETRAHEDRAL_ATOMS[i], b = TETRAHEDRAL_ATOMS[j]
      expect((Math.acos((a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (len(a) * len(b))) * 180) / Math.PI).toBeCloseTo(109.47, 1)
    }
  })

  it('the lattice card REPEATS its unit cell and then grows it (the "repeated" stage used to equal the unit cell)', () => {
    const n = (g: readonly number[]) => g[0] * g[1] * g[2]
    expect(n(LATTICE_STAGES.unitCell)).toBe(8)
    expect(n(LATTICE_STAGES.repeated)).toBeGreaterThan(n(LATTICE_STAGES.unitCell))
    expect(n(LATTICE_STAGES.growth)).toBeGreaterThan(n(LATTICE_STAGES.repeated))
  })
})

describe('R12 — the two concepts that had no figure each own a faithful one', () => {
  const text = (id: string) => buildCanonicalScene(null, id)!.steps.flatMap((st) => [st.narration ?? '', ...st.objects.map((o) => o.text ?? '')]).join(' | ')

  it.each(['chem.surface.colloids', 'chem.sblock.water'])('%s: resolves to its own scene and passes the chemistry gate', (id) => {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, subject: 'chemistry', learnerRequest: 'diagram' })
    expect(d.graphical).toBe(true)
    expect(d.provenance).toBe(`generator:${id}:concept-authored`)
    expect(chemistryAdmissionFailure(id, d.payload)).toBeNull()
  })

  it('colloids: the three-box model by particle size, the Tyndall and dialysis tests, and suspensions scatter light too', () => {
    const t = text('chem.surface.colloids')
    for (const s of ['homogeneous mixture of dissolved molecules or ions, mostly below about 1 nm', 'about 1–1000 nm', 'above about 1000 nm', 'shows Tyndall effect', 'no Tyndall effect',
      'pass ordinary filter paper but not a dialysis membrane', 'scatters light too', 'settles on standing', 'gelatin sol, gold sol']) expect(t).toContain(s)
  })

  it('water: 104.5° (not 120°), hydrogen bonding with its conditions, both kinds of hardness, D₂O, amphoteric', () => {
    const t = text('chem.sblock.water')
    for (const s of ['104.5°', 'two lone pairs', '0.917 vs 1.000 g/cm³', 'ice at 0 °C and water at 4 °C', '1 atm', 'Ca/Mg hydrogencarbonate', 'Ca/Mg sulfate and chloride', 'Na₂CO₃', 'D₂O', 'amphoteric', '101.4 °C']) expect(t).toContain(s)
    expect(t).not.toContain('120')
  })
})

describe('R12 follow-up — a cell is named by what it is, not by how many beakers it has', () => {
  const goal = (id: string) => buildCanonicalScene(null, id)!.teachingGoal ?? ''

  it('the zinc–carbon dry cell is a GALVANIC cell (it was taught as "an electrolytic cell")', () => {
    const g = goal('chem.elect.batteries')
    expect(g).toContain('a galvanic cell with one electrolyte')
    expect(g).not.toContain('electrolytic')
  })

  it('divided galvanic cells stay "divided galvanic" and the electrolytic cells stay "electrolytic"', () => {
    expect(goal('chem.elect.galvanic-cell')).toContain('a divided galvanic cell')
    for (const id of ['chem.elect.electrolysis', 'chem.elect.industrial']) expect(goal(id), id).toContain('an electrolytic cell')
  })
})
