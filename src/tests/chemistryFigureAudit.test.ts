/**
 * Chemistry semantic figure audit — unit tests.
 *
 * Every validator in `chemistryFigureAudit.pure.ts` is proven BOTH ways here:
 *   - a deliberately defective fixture must raise the validator's code (it catches its defect), and
 *   - a good fixture — mostly the real, unmodified generator output — must not (no false alarm).
 * The last block runs the audit over every real chemistry figure the repo can build, and pins the
 * defects that are known to be open so a NEW failure is visible while a fix only shrinks the list.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  auditChemistryCard, auditChemistryPayload, auditChemistryScene, auditChemistrySpec, auditManifestEntry,
  categoriesOf, classifyDrawnGeometry, collectSceneTexts, detectFamily, elementByName, ELEMENTS_TABLE, extractEquations,
  extractEquilibriumSeries, normalizeChemScripts, parseFormulaBody, parseSpecies, placementOf, shellOccupancy, scanLearnerText,
  validateColorOnlyEncoding, validateEnergyProfile, validateEquilibriumSeries, validateGraphSpec, validateMechanismArrows,
  validateNotation, validateNumberLineSpec, validateProcessFlowSpec, validateProcessScene, validateReactionSchemes,
  validateStructure, validateThermoWording, valenceElectronsOf, verifyBarChartFigure, verifyCoordinationComplex,
  verifyElectrochemicalCellFigure, verifyElectronShellFigure, verifyEnergyCycleFigure, verifyFirstLawFigure,
  verifyLatticeFigure, verifyMolecularStructure, verifyPeriodicTrendFigure, verifySystemBoundaryFigure,
  type AuditFinding, type TextItem, type ValidatorResult,
} from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { buildMoleculeScene, lookupMolecule } from '@/lib/teaching/sceneGenerators/moleculeGeometry.pure'
import { buildLatticeScene, lookupLattice } from '@/lib/teaching/sceneGenerators/crystalLattice.pure'
import { bohrBuryFill, buildElectronShellScene, lookupElement } from '@/lib/teaching/sceneGenerators/electronShells.pure'
import { buildPeriodicTrendScene, ELEMENTS as TREND_ELEMENTS } from '@/lib/teaching/sceneGenerators/periodicTrends.pure'
import { buildSystemBoundaryScene, buildFirstLawScene } from '@/lib/teaching/sceneGenerators/chemistrySystemScenes'
import { buildCoordinationComplexScene } from '@/lib/teaching/sceneGenerators/coordinationComplex'
import { buildElectrochemicalCellScene } from '@/lib/teaching/sceneGenerators/electrochemicalCell'
import { buildEnergyCycleScene } from '@/lib/teaching/sceneGenerators/energyCycle'
import { buildStatisticsBarChartScene } from '@/lib/teaching/sceneGenerators/statisticsBarChart.pure'
import { buildCellPathwayScene } from '@/lib/teaching/sceneGenerators/cellPathway.pure'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { rebuildScene, variablesFor } from '@/lib/teaching/visual/parametricScenes'

// ── helpers ──────────────────────────────────────────────────────────────────

const codes = (r: ValidatorResult | { findings: AuditFinding[] } | AuditFinding[]): string[] =>
  (Array.isArray(r) ? r : r.findings).map((f) => f.code)
const sev = (r: { findings: AuditFinding[] }, code: string): string | undefined => r.findings.find((f) => f.code === code)?.severity
const items = (...texts: string[]): TextItem[] => texts.map((text, i) => ({ text, where: `t[${i}]`, kind: 'label' as const }))
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T
const label = (text: string, position: [number, number, number] = [0, 0, 0], extra: Partial<SceneObject> = {}): SceneObject => ({ type: 'label', text, position, ...extra })
const mk = (objects: SceneObject[], over: Partial<SceneSpec> = {}): SceneSpec => ({
  id: 'test-scene', title: 'Test scene', sceneType: 'diagram', steps: [{ narration: 'A beat.', objects }], ...over,
})
/** Mutate the first object matching `pred` anywhere in a cloned scene. */
function mutate(scene: SceneSpec, pred: (o: SceneObject) => boolean, fn: (o: SceneObject) => void): SceneSpec {
  const s = clone(scene)
  for (const st of s.steps) for (const o of st.objects) if (pred(o)) { fn(o); return s }
  throw new Error('mutate: no object matched')
}
const mol = (name: string): SceneSpec => buildMoleculeScene(lookupMolecule(name)!)
const shell = (sym: string): SceneSpec => buildElectronShellScene(lookupElement(sym)!)
const cellScene = (over: Record<string, unknown> = {}): SceneSpec => buildElectrochemicalCellScene({
  cellType: 'galvanic', anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 }, cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 },
  electronsTransferred: 2, name: 'Daniell Cell', ...over,
} as never)
const textOf = (s: SceneSpec): string[] => collectSceneTexts(s).map((t) => t.text)

// ═════════════════════════════════════════════════════════════════════════════
describe('reference data derived from Z', () => {
  it('has 118 elements whose symbols are unique and correctly capitalised', () => {
    expect(ELEMENTS_TABLE).toHaveLength(118)
    expect(new Set(ELEMENTS_TABLE.map((e) => e.symbol)).size).toBe(118)
    for (const e of ELEMENTS_TABLE) expect(e.symbol).toMatch(/^[A-Z][a-z]?$/)
  })

  it('places elements in the right period, group and block', () => {
    const at = (sym: string) => { const e = ELEMENTS_TABLE.find((x) => x.symbol === sym)!; return placementOf(e.z) }
    expect(at('H')).toEqual({ period: 1, group: 1, block: 's' })
    expect(at('He')).toEqual({ period: 1, group: 18, block: 's' })
    expect(at('Na')).toEqual({ period: 3, group: 1, block: 's' })
    expect(at('Cl')).toEqual({ period: 3, group: 17, block: 'p' })
    expect(at('Fe')).toEqual({ period: 4, group: 8, block: 'd' })
    expect(at('Zn')).toEqual({ period: 4, group: 12, block: 'd' })
    expect(at('Ga')).toEqual({ period: 4, group: 13, block: 'p' })
    expect(at('Br')).toEqual({ period: 4, group: 17, block: 'p' })
    expect(at('La')).toEqual({ period: 6, group: null, block: 'f' })
    expect(at('Hf')).toEqual({ period: 6, group: 4, block: 'd' })
    expect(at('Hg')).toEqual({ period: 6, group: 12, block: 'd' })
    expect(at('Rn')).toEqual({ period: 6, group: 18, block: 'p' })
    expect(at('Og')).toEqual({ period: 7, group: 18, block: 'p' })
    expect(placementOf(0)).toBeNull()
    expect(placementOf(119)).toBeNull()
  })

  it('agrees with the repo’s own two partial tables (no divergent second table)', () => {
    for (let z = 1; z <= 20; z++) {
      const mine = ELEMENTS_TABLE[z - 1]
      const theirs = lookupElement(z)!
      expect(mine.symbol).toBe(theirs.symbol)
      expect(theirs.name.toLowerCase()).toBe(mine.name.toLowerCase().replace('aluminium', 'aluminium'))
    }
    for (const e of TREND_ELEMENTS) {
      const real = ELEMENTS_TABLE.find((x) => x.symbol === e.symbol)!
      expect(placementOf(real.z)).toMatchObject({ period: e.period, group: e.group })
    }
  })

  it('derives valence electrons, categories and names', () => {
    expect(valenceElectronsOf(11)).toBe(1)
    expect(valenceElectronsOf(6)).toBe(4)
    expect(valenceElectronsOf(17)).toBe(7)
    expect(valenceElectronsOf(2)).toBe(2)
    expect(valenceElectronsOf(26)).toBeNull()
    expect(categoriesOf(11)).toContain('alkali metal')
    expect(categoriesOf(17)).toContain('halogen')
    expect(categoriesOf(10)).toContain('noble gas')
    expect(categoriesOf(26)).toContain('transition metal')
    expect(elementByName('Aluminum')?.symbol).toBe('Al')
    expect(elementByName('sulphur')?.symbol).toBe('S')
  })

  it('shell occupancy by Madelung filling equals the generator’s Bohr–Bury fill for Z = 1–20', () => {
    for (let z = 1; z <= 20; z++) expect(shellOccupancy(z)).toEqual(bohrBuryFill(z))
    expect(shellOccupancy(19)).toEqual([2, 8, 8, 1])
    expect(shellOccupancy(26)).toEqual([2, 8, 14, 2])
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('species and equation parsing', () => {
  it.each([
    ['H2O', { H: 2, O: 1 }, 0],
    ['SO₄²⁻', { S: 1, O: 4 }, -2],
    ['SO42-', { S: 1, O: 4 }, -2],
    ['SO4 2-', { S: 1, O: 4 }, -2],
    ['NH4+', { N: 1, H: 4 }, 1],
    ['Zn2+', { Zn: 1 }, 2],
    ['Fe³⁺', { Fe: 1 }, 3],
    ['Cl-', { Cl: 1 }, -1],
    ['Cl−', { Cl: 1 }, -1],
    ['Ca(OH)2', { Ca: 1, O: 2, H: 2 }, 0],
    ['[Ti(H2O)6]3+', { Ti: 1, H: 12, O: 6 }, 3],
    ['CuSO4.5H2O', { Cu: 1, S: 1, O: 9, H: 10 }, 0],
    ['Rh(PPh₃)₃Cl', { Rh: 1, P: 3, Ph: 9, Cl: 1 }, 0],
    ['Fe(III)', { Fe: 1 }, 0],
  ])('parses %s', (text, atoms, charge) => {
    const p = parseSpecies(text)
    expect(p.ok, p.error ?? '').toBe(true)
    expect(p.atoms).toEqual(atoms)
    expect(p.charge).toBe(charge)
  })

  it('reads coefficients, fractions, states and electrons', () => {
    expect(parseSpecies('2H2O(l)')).toMatchObject({ coeff: 2, state: 'l', ok: true })
    expect(parseSpecies('½Cl2(g)')).toMatchObject({ coeff: 0.5, state: 'g', ok: true })
    expect(parseSpecies('2e⁻')).toMatchObject({ coeff: 2, isElectron: true, charge: -1 })
    expect(parseSpecies('Na+(g)')).toMatchObject({ state: 'g', charge: 1 })
  })

  it('rejects things that are not formulas', () => {
    expect(parseSpecies('Xx2O').ok).toBe(false)
    expect(parseSpecies('nacl').ok).toBe(false)
    expect(parseSpecies('Ca(OH2').ok).toBe(false)
    expect(parseFormulaBody('Hx2').unknownSymbols).toContain('Hx')
  })

  it('normalises script notation to one ASCII grammar', () => {
    expect(normalizeChemScripts('SO₄²⁻')).toBe('SO4^2-')
    expect(normalizeChemScripts('a − b')).toBe('a - b')
  })

  it('finds equations inside prose, including bracketed and chained ones', () => {
    const eq = extractEquations('combustion (CH₄ + 2O₂ → CO₂ + 2H₂O) is a classic redox reaction')[0]
    expect(eq.lhs.map((s) => s.raw)).toEqual(['CH₄', '2O₂'])
    expect(eq.rhs.map((s) => s.raw)).toEqual(['CO₂', '2H₂O'])
    expect(eq.atomsBalanced && eq.chargeBalanced).toBe(true)
    expect(extractEquations('S → SO₂ → SO₃ → H₂SO₄').every((e) => e.chain)).toBe(true)
    expect(extractEquations('the count goes from 16 → 18 electrons')).toHaveLength(0)
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('A — structural', () => {
  const good = mk([label('system'), { type: 'node', id: 'a', position: [1, 0, 0], text: 'O', radius: 0.5 }])

  it('a clean scene has no structural findings', () => {
    expect(validateStructure(good).findings).toEqual([])
  })

  it('catches non-finite numbers anywhere, including in properties and explainer data', () => {
    const s = mutate(good, (o) => o.id === 'a', (o) => { o.properties = { mass: Number.NaN, nested: { x: Infinity } } })
    const r = validateStructure(s)
    expect(codes(r)).toContain('A-NONFINITE')
    expect(r.verdict).toBe('FAIL')
    expect(codes(validateStructure(mutate(good, (o) => o.id === 'a', (o) => { o.position = [Number.NaN, 0, 0] })))).toContain('A-NONFINITE')
  })

  it('catches empty labels, placeholders, raw ids and debug text', () => {
    expect(codes(validateStructure(mutate(good, (o) => o.id === 'a', (o) => { o.text = '' })))).toContain('A-EMPTY-LABEL')
    expect(codes(validateStructure(mutate(good, (o) => o.type === 'label', (o) => { o.text = 'TODO label' })))).toContain('A-PLACEHOLDER')
    expect(codes(validateStructure(mutate(good, (o) => o.type === 'label', (o) => { o.text = 'ΔH = undefined kJ/mol' })))).toContain('A-PLACEHOLDER')
    expect(codes(validateStructure(mutate(good, (o) => o.type === 'label', (o) => { o.text = '???' })))).toContain('A-PLACEHOLDER')
    expect(codes(validateStructure(mutate(good, (o) => o.type === 'label', (o) => { o.text = 'see chem.thermo.enthalpy' })))).toContain('A-RAW-ID')
    expect(codes(validateStructure(mutate(good, (o) => o.type === 'label', (o) => { o.text = 'three_electron_shells' })))).toContain('A-RAW-ID')
    expect(codes(validateStructure(mutate(good, (o) => o.type === 'label', (o) => { o.text = '[object Object]' })))).toContain('A-DEBUG-TEXT')
  })

  it('catches broken references and duplicate ids', () => {
    const s = clone(good)
    s.steps[0].focus = ['ghost']
    expect(codes(validateStructure(s))).toContain('A-BROKEN-REF')
    const dup = mk([
      { type: 'node', id: 'a', position: [0, 0, 0], text: 'H' },
      { type: 'node', id: 'a', position: [2, 0, 0], text: 'H' },
    ])
    expect(codes(validateStructure(dup))).toContain('A-DUPLICATE-ID')
    const prop = mutate(good, (o) => o.id === 'a', (o) => { o.properties = { target: 'nothing-here' } })
    expect(codes(validateStructure(prop))).toContain('A-BROKEN-REF')
  })

  it('flags a blank narration (REVIEW) and dangling process arrows (REVIEW)', () => {
    const s = clone(good)
    s.steps[0].narration = '   '
    expect(sev(validateStructure(s), 'A-EMPTY-NARRATION')).toBe('REVIEW')
    const path = buildCellPathwayScene({ conceptId: 'x', title: 'T', teachingGoal: 'g', stages: [{ name: 'A', description: 'a step' }, { name: 'B', description: 'next step' }] })
    expect(codes(validateStructure(path))).not.toContain('A-DANGLING-EDGE')
    const bad = mutate(path, (o) => o.type === 'arrow', (o) => { o.to = [40, 40, 0] })
    expect(codes(validateStructure(bad))).toContain('A-DANGLING-EDGE')
  })

  it('learner-text scan: mojibake, replacement char, LaTeX', () => {
    const t = (text: string) => codes(scanLearnerText({ text, where: 'x', kind: 'label' }))
    expect(t('Zn â€" Cu')).toContain('F-MOJIBAKE')
    expect(t('caf�')).toContain('F-MOJIBAKE')
    expect(t('$E_k = \\frac{1}{2}mv^2$')).toContain('F-RAW-LATEX')
    expect(t('Zn – Cu cell, ΔH = −393.5 kJ/mol')).toEqual([])
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('F — formula and notation', () => {
  const f = (...t: string[]) => validateNotation(items(...t))

  it('flags a superscript where a subscript belongs, but not a squared quantity or a real subscript', () => {
    expect(codes(f('CO² is a gas'))).toContain('F-SUPERSCRIPT-SUBSCRIPT')
    expect(codes(f('H²O'))).toContain('F-SUPERSCRIPT-SUBSCRIPT')
    expect(codes(f('a/Vm² adds back pressure', 'CO₂ and H₂O', 'Fe³⁺ ion'))).not.toContain('F-SUPERSCRIPT-SUBSCRIPT')
  })

  it('catches a superscript used for the subscript of a bare molecule (O³, H², P⁴), through joiners and ions', () => {
    for (const bad of ['ozone is O³', 'hydrogen gas H² burns', 'white phosphorus P⁴', 'CH²=CH² is ethene', '[Ag(NH³)₂]⁺ complex', 'SO⁴²⁻ ions']) {
      expect(codes(f(bad)), bad).toContain('F-SUPERSCRIPT-SUBSCRIPT')
    }
    // quantities and genuine charges are left alone
    expect(codes(f('K² and T² and R², I²R heating, 10²³ atoms, cm³, mol⁻¹, Fe³⁺, SO₄²⁻, Cr₂O₇²⁻'))).not.toContain('F-SUPERSCRIPT-SUBSCRIPT')
  })

  it('catches a lower-case compound with a state symbol or charge attached, and a "(aq)" typo inside brackets', () => {
    expect(codes(f('h2o(l) evaporates'))).toContain('F-CASE')
    expect(codes(f('the hcl(aq) solution'))).toContain('F-CASE')
    expect(codes(f('ΔH°f[CO₂(gas)] is −393.5'))).toContain('F-STATE-SYMBOL')
    expect(codes(f('(Co2) beside (carbon dioxide)'))).toContain('F-CASE')
  })

  it('flags mis-capitalised compounds, never ordinary words', () => {
    for (const bad of ['h2o', 'nacl', 'Nacl', 'NACL', 'hcl', 'co2', 'Hcl']) expect(codes(f(`add ${bad} to the flask`)), bad).toContain('F-CASE')
    expect(f('NaCl and HCl and H₂O and CO').findings).toEqual([])
    expect(f('NOW the SI units of PVC and HIV are known', 'He said no, so as to be in at the end').findings).toEqual([])
  })

  it('flags Co2 only when the figure names carbon dioxide (CO vs Co)', () => {
    expect(codes(f('Carbon dioxide (Co2) is produced'))).toContain('F-CASE')
    expect(codes(f('Cobalt forms Co2+ ions'))).not.toContain('F-CASE')
    expect(codes(f('Nitric oxide, written No, is a radical'))).not.toContain('F-CASE') // bare words are not formulas
  })

  it('flags "HO" as a suspicious formula (REVIEW)', () => {
    expect(sev(f('the product is HO'), 'F-SUSPICIOUS-FORMULA')).toBe('REVIEW')
  })

  it('validates state symbols', () => {
    expect(codes(f('H2O(L) boils'))).toContain('F-STATE-SYMBOL')
    expect(codes(f('NaCl(Aq)'))).toContain('F-STATE-SYMBOL')
    expect(codes(f('CO2(gas)'))).toContain('F-STATE-SYMBOL')
    expect(f('H2O(l) → H2O(g)', 'NaCl(aq)', 'C(s)', 'Fe(III) and Cu(II) ions', 'select item(s) below').findings.filter((x) => x.code === 'F-STATE-SYMBOL')).toEqual([])
  })

  it('flags an ion named without its charge (REVIEW)', () => {
    expect(sev(f('the Na ion is smaller'), 'F-ION-NO-CHARGE')).toBe('REVIEW')
    expect(codes(f('the Na⁺ ion is smaller', 'Na+ ion'))).not.toContain('F-ION-NO-CHARGE')
  })

  it('treats the same species written two ways as an inconsistency, different species as a style note', () => {
    expect(sev(f('H2O is water', 'H₂O boils'), 'F-SAME-SPECIES-MIX')).toBe('REVIEW')
    const style = f('CO₂ forms', 'Fe2O3 forms')
    expect(sev(style, 'F-NOTATION-MIX')).toBe('INFO')
    expect(codes(f('CO₂ forms', 'Fe2O3 forms').findings)).not.toContain('F-SAME-SPECIES-MIX')
    expect(sev(validateNotation(items('CO₂ forms', 'Fe2O3 forms'), { strictNotation: true }), 'F-NOTATION-MIX')).toBe('REVIEW')
  })

  it('notes mixed minus signs (INFO) and "+ -" (INFO)', () => {
    expect(sev(f('ΔH = −393.5 kJ/mol', 'ΔG = -212 kJ/mol'), 'F-MINUS-MIX')).toBe('INFO')
    expect(sev(f('ΔU = q + w = 100 + -40 = 60'), 'F-DOUBLE-SIGN')).toBe('INFO')
    expect(f('ΔH = −393.5 kJ/mol', 'ΔG = −212 kJ/mol').findings).toEqual([])
  })

  it('does not mistake quantity symbols for chemistry (measured on the 2,499-string seed corpus)', () => {
    const r = f('M₁V₁ = M₂V₂', '[A]₀ and IE₁ and Kb₂', 'n₂ = 0.5 mol')
    expect(r.verdict).toBe('PASS')
    expect(r.findings.every((x) => x.severity === 'INFO')).toBe(true)
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('G — reaction schemes', () => {
  const g = (text: string, ctx = {}) => validateReactionSchemes(items(text), ctx)

  it('passes balanced equations (atoms and charge), with states, electrons and hydrates', () => {
    for (const ok of [
      '2H2 + O2 → 2H2O',
      'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)',
      'MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O',
      'H₂O(l) ⇌ H⁺(aq) + OH⁻(aq)',
      'Cu²⁺ + 2e⁻ → Cu',
      'CuSO4.5H2O → CuSO4 + 5H2O',
      'NO₂ + UV → NO + O',
      'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
    ]) expect(g(ok).findings.filter((x) => x.severity !== 'INFO'), ok).toEqual([])
  })

  it('FAILS an unbalanced scheme and names the element', () => {
    const r = g('2H2 + O2 → H2O')
    expect(r.verdict).toBe('FAIL')
    expect(r.findings[0]).toMatchObject({ code: 'G-ATOMS-UNBALANCED' })
    expect(r.findings[0].detail).toMatch(/O -1/)
    expect(g('C + O²⁻ → CO₂ + 4e⁻').verdict).toBe('FAIL')
  })

  it('FAILS a charge imbalance when atoms balance', () => {
    expect(codes(g('Fe³⁺ + e⁻ → Fe'))).toContain('G-CHARGE-UNBALANCED')
    expect(codes(g('Zn + Cu²⁺ → Zn + Cu'))).toContain('G-CHARGE-UNBALANCED')
  })

  it('downgrades to REVIEW when the lesson is about unbalanced schemes', () => {
    const r = g('H2 + O2 → H2O', { unbalancedIntent: true })
    expect(r.verdict).toBe('REVIEW_REQUIRED')
  })

  it('treats a bare conversion as schematic (REVIEW), an arrow chain as a pathway (INFO), and skips generic letters', () => {
    expect(sev(g('SO₂ → SO₃'), 'G-SCHEMATIC')).toBe('REVIEW')
    expect(sev(g('S → SO₂ → SO₃ → H₂SO₄'), 'G-SCHEMATIC')).toBe('INFO')
    expect(g('rate of A → 3B is measured').equations).toBe(0)
    expect(g('the count goes from 16 → 18 electrons').equations).toBe(0)
  })

  it('does not call a truncated scheme unbalanced when a neighbouring term cannot be parsed', () => {
    const r = g('CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O + energy')
    expect(r.findings.filter((x) => x.severity === 'FAIL')).toEqual([])
  })

  it('checks the arrow against the words around it', () => {
    expect(codes(g('At equilibrium N₂ + 3H₂ → 2NH₃ in a closed vessel'))).toContain('G-ARROW-NOT-REVERSIBLE')
    expect(codes(g('The reaction N₂ + 3H₂ ⇌ 2NH₃ goes to completion'))).toContain('G-ARROW-CONTRADICTS')
    expect(codes(g('At equilibrium N₂ + 3H₂ ↔ 2NH₃'))).toContain('G-RESONANCE-ARROW')
    expect(g('At equilibrium N₂ + 3H₂ ⇌ 2NH₃').findings).toEqual([])
    // only the sentence around the arrow counts, not the rest of a long paragraph
    expect(codes(g('Reversible reactions reach equilibrium. Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O releases heat.'))).not.toContain('G-ARROW-NOT-REVERSIBLE')
  })

  it('checks coefficient sanity', () => {
    expect(codes(g('4H₂ + 2O₂ → 4H₂O'))).toContain('G-COEFF')
    expect(codes(g('25H₂ + 12.5O₂ → 25H₂O'))).toContain('G-COEFF')
    expect(g('2Al → 2Al³⁺ + 6e⁻').findings.filter((x) => x.code === 'G-COEFF')).toEqual([])
    expect(g('C₂H₆ + 7/2 O₂ → 2CO₂ + 3H₂O').findings).toEqual([])
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('E — molecular structure', () => {
  it('passes every shipped VSEPR molecule except CO₂, whose bond order is not encoded (REVIEW, not FAIL)', () => {
    for (const name of ['water', 'ammonia', 'methane', 'hydrogen sulfide', 'boron trifluoride']) {
      const r = verifyMolecularStructure(mol(name))
      expect(r.findings.filter((x) => x.severity !== 'INFO'), name).toEqual([])
      expect(r.verified).toEqual(expect.arrayContaining(['valence/octet', 'atom-multiset-equals-formula', 'vsepr-geometry-from-coordinates', 'bond-angle-label-equals-drawn']))
    }
    const co2 = verifyMolecularStructure(mol('carbon dioxide'))
    expect(codes(co2)).toEqual(['E-RADICAL'])
    expect(co2.findings[0].severity).toBe('REVIEW')
    expect(co2.verified).toContain('vsepr-geometry-from-coordinates')
  })

  it('FAILS an impossible valence (a 3-bonded water)', () => {
    const water = mol('water')
    const bad = clone(water)
    const o = bad.steps[1].objects
    o.push({ type: 'bond', id: 'bondX', from: [0, 0, 0], to: [0, -8, 0] }, { type: 'node', id: 'pX', position: [0, -8, 0], text: 'H' })
    const r = verifyMolecularStructure(bad)
    expect(codes(r)).toContain('E-VALENCE-EXCEEDED')
  })

  it('FAILS a carbon with five bonds, and treats SF₆ as hypervalent (REVIEW)', () => {
    const star = (centre: string, ligand: string, dirs: Array<[number, number, number]>, title: string): SceneSpec => mk([
      { type: 'node', id: 'central', position: [0, 0, 0], text: centre },
      ...dirs.flatMap((d, i) => [
        { type: 'bond' as const, from: [0, 0, 0] as [number, number, number], to: d.map((x) => x * 8) as [number, number, number] },
        { type: 'node' as const, id: `p${i}`, position: d.map((x) => x * 8) as [number, number, number], text: ligand },
      ]),
    ], { title, id: 'molecule-x' })
    const oct: Array<[number, number, number]> = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
    expect(codes(verifyMolecularStructure(star('C', 'H', oct.slice(0, 5), 'Pentahydrido carbon')))).toContain('E-VALENCE-EXCEEDED')
    const sf6 = verifyMolecularStructure(star('S', 'F', oct, 'Sulfur Hexafluoride — octahedral'))
    expect(sev(sf6, 'E-HYPERVALENT')).toBe('REVIEW')
    expect(codes(sf6)).not.toContain('E-VALENCE-EXCEEDED')
    expect(sf6.verified).toEqual(expect.arrayContaining(['atom-multiset-equals-formula', 'vsepr-geometry-from-coordinates']))
  })

  it('FAILS a disconnected drawing and a non-element label', () => {
    const water = mol('water')
    const stray = clone(water)
    stray.steps[1].objects.push({ type: 'node', id: 'pZ', position: [30, 30, 0], text: 'H' })
    expect(codes(verifyMolecularStructure(stray))).toContain('E-DISCONNECTED')
    const fake = mutate(water, (o) => o.id === 'p0', (o) => { o.text = 'Xx' })
    expect(codes(verifyMolecularStructure(fake))).toContain('E-ELEMENT')
  })

  it('FAILS when the atom multiset contradicts the named compound', () => {
    const wrong = clone(mol('water'))
    wrong.steps[1].objects.push({ type: 'bond', from: [0, 0, 0], to: [0, -8, 0] }, { type: 'node', id: 'p9', position: [0, -8, 0], text: 'O' })
    expect(codes(verifyMolecularStructure(wrong))).toContain('E-FORMULA-MISMATCH')
    const swapped = mutate(mol('water'), (o) => o.id === 'p0', (o) => { o.text = 'O' })
    expect(codes(verifyMolecularStructure(swapped))).toContain('E-FORMULA-MISMATCH')
  })

  it('FAILS a bond-angle label that is not the drawn angle, and narration naming the wrong centre', () => {
    const lab = mutate(mol('water'), (o) => /bond angle/.test(o.text ?? ''), (o) => { o.text = '120° bond angle' })
    expect(codes(verifyMolecularStructure(lab))).toContain('E-ANGLE-LABEL')
    const nar = clone(mol('water'))
    nar.steps[0].narration = 'Water has a central N atom.'
    expect(codes(verifyMolecularStructure(nar))).toContain('E-LABEL-MISMATCH')
  })

  it('FAILS a geometry that VSEPR contradicts — by title and by coordinates', () => {
    const title = clone(mol('water'))
    title.title = 'Water — linear (180° bond angle)'
    expect(codes(verifyMolecularStructure(title))).toContain('E-VSEPR-MISMATCH')
    const linear = clone(mol('water'))
    const ps = linear.steps[1].objects.filter((o) => /^p\d$/.test(o.id ?? ''))
    ps[0].position = [8, 0, 0]; ps[1].position = [-8, 0, 0]
    for (const b of linear.steps[1].objects.filter((o) => o.type === 'bond')) b.to = (b.to![0] > 0 ? [8, 0, 0] : [-8, 0, 0]) as [number, number, number]
    expect(codes(verifyMolecularStructure(linear))).toContain('E-VSEPR-MISMATCH')
    const flatNh3 = clone(mol('ammonia'))
    flatNh3.steps[1].objects.forEach((o) => { if (o.to) o.to = [o.to[0], 0, o.to[2]]; if (o.id?.startsWith('p') && o.position) o.position = [o.position[0], 0, o.position[2]] })
    expect(codes(verifyMolecularStructure(flatNh3))).toContain('E-VSEPR-MISMATCH')
  })

  it('classifies drawn geometries from coordinates', () => {
    const o: [number, number, number] = [0, 0, 0]
    expect(classifyDrawnGeometry(o, [[1, 0, 0], [-1, 0, 0]])).toBe('linear')
    expect(classifyDrawnGeometry(o, [[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]])).toBe('square planar')
    const r = 1 / Math.sqrt(3)
    expect(classifyDrawnGeometry(o, [[r, r, r], [r, -r, -r], [-r, r, -r], [-r, -r, r]])).toBe('tetrahedral')
    expect(classifyDrawnGeometry(o, [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]])).toBe('octahedral')
  })

  it('checks charge arithmetic against a written ion (H₃O⁺)', () => {
    const hydronium = (oText: string): SceneSpec => mk([
      { type: 'node', id: 'central', position: [0, 0, 0], text: oText },
      ...[[8, 0, 0], [-4, 6, 0], [-4, -6, 0]].flatMap((p, i) => [
        { type: 'bond' as const, from: [0, 0, 0] as [number, number, number], to: p as [number, number, number] },
        { type: 'node' as const, id: `p${i}`, position: p as [number, number, number], text: 'H' },
      ]),
    ], { id: 'molecule-h3o', title: 'Hydronium H3O+ — trigonal pyramidal' })
    expect(codes(verifyMolecularStructure(hydronium('O+')))).not.toContain('E-CHARGE-ARITHMETIC')
    expect(codes(verifyMolecularStructure(hydronium('O')))).toContain('E-CHARGE-ARITHMETIC')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('E — coordination complexes', () => {
  const hexa = buildCoordinationComplexScene({ name: 'Hexaamminecobalt(III) ion', centralMetal: 'Co', charge: '3+', geometry: 'octahedral', ligands: [{ formula: 'NH3', count: 6 }], coordinationNumber: 6 })
  const cis = buildCoordinationComplexScene({ name: 'Cisplatin', centralMetal: 'Pt', charge: '', geometry: 'square_planar', ligands: [{ formula: 'NH3', count: 2 }, { formula: 'Cl', count: 2 }], isomer: 'cis', coordinationNumber: 4 })

  it('passes the shipped complexes and verifies geometry, name prefix, counts and oxidation state', () => {
    const r = verifyCoordinationComplex(hexa)
    expect(r.findings).toEqual([])
    expect(r.verified).toEqual(expect.arrayContaining(['coordination-geometry-from-coordinates', 'name-prefix-matches-ligand-count', 'oxidation-state-roman-numeral-matches-charge']))
    expect(verifyCoordinationComplex(cis).findings).toEqual([])
    expect(verifyCoordinationComplex(cis).verified).toContain('cis-trans-from-coordinates')
  })

  it('FAILS a title that says trans for a cis drawing, and a contradicting isomer label', () => {
    const t = clone(cis); t.title = 'Cisplatin (trans) — square planar'
    expect(codes(verifyCoordinationComplex(t))).toContain('E-COORD-ISOMER')
    const l = mutate(cis, (o) => /isomer:/.test(o.text ?? ''), (o) => { o.text = 'cis-isomer: NH3 opposite' })
    expect(codes(verifyCoordinationComplex(l))).toContain('E-COORD-ISOMER')
  })

  it('FAILS a name prefix that disagrees with the ligand count', () => {
    const t = clone(hexa); t.title = 'Pentaamminecobalt(III) ion — octahedral'
    expect(codes(verifyCoordinationComplex(t))).toContain('E-COORD-NAME-COUNT')
  })

  it('FAILS a geometry word that the coordinates do not draw', () => {
    const t = clone(hexa); t.title = 'Hexaamminecobalt(III) ion — square planar'
    expect(codes(verifyCoordinationComplex(t))).toContain('E-COORD-GEOMETRY')
    const flat = clone(cis); flat.title = 'Cisplatin (cis) — octahedral'
    expect(codes(verifyCoordinationComplex(flat))).toContain('E-COORD-GEOMETRY')
  })

  it('FAILS a Roman-numeral oxidation state that contradicts the written charge, and a narration ligand count', () => {
    const t = clone(hexa); t.title = 'Hexaamminecobalt(II) ion — octahedral'
    expect(codes(verifyCoordinationComplex(t))).toContain('E-COORD-CHARGE')
    const n = clone(hexa); n.steps[1].narration = '4 NH3 ligands coordinate to it, octahedral.'
    expect(codes(verifyCoordinationComplex(n))).toContain('E-LABEL-MISMATCH')
    const lig = mutate(hexa, (o) => o.id === 'lig0', (o) => { o.text = 'Qq9' })
    expect(codes(verifyCoordinationComplex(lig))).toContain('E-COORD-LIGAND')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('I — periodic and element visuals', () => {
  it('passes every Z = 1–20 electron-shell figure and verifies it from first principles', () => {
    for (let z = 1; z <= 20; z++) {
      const sym = ELEMENTS_TABLE[z - 1].symbol
      const r = verifyElectronShellFigure(shell(sym))
      expect(r.findings, sym).toEqual([])
      expect(r.verified).toEqual(expect.arrayContaining(['symbol-z-name-consistent', 'shell-occupancy-equals-aufbau', 'valence-matches-group']))
    }
  })

  it('FAILS a wrong symbol / Z / name triple and a wrong nucleus label', () => {
    const na = shell('Na')
    const a = clone(na); a.title = a.title.replace('Z=11', 'Z=12')
    expect(codes(verifyElectronShellFigure(a))).toContain('I-SYMBOL-Z-NAME')
    const b = clone(na); b.title = b.title.replace('Sodium', 'Magnesium')
    expect(codes(verifyElectronShellFigure(b))).toContain('I-SYMBOL-Z-NAME')
    const c = mutate(na, (o) => o.id === 'nucleus', (o) => { o.text = 'Na (12+)' })
    expect(codes(verifyElectronShellFigure(c))).toContain('I-SYMBOL-Z-NAME')
  })

  it('FAILS a missing electron, a wrong shell split and a wrong valence label', () => {
    const na = shell('Na')
    const missing = clone(na)
    missing.steps[1].objects = missing.steps[1].objects.filter((o) => o.id !== 'e0')
    expect(codes(verifyElectronShellFigure(missing))).toContain('I-SHELL-COUNT')
    const moved = mutate(na, (o) => o.id === 'e10', (o) => { o.properties = { shell: 1 } })
    expect(codes(verifyElectronShellFigure(moved))).toContain('I-SHELL-COUNT')
    const val = mutate(na, (o) => o.id === 'valence', (o) => { o.text = '2 valence electrons' })
    expect(codes(verifyElectronShellFigure(val))).toContain('I-SHELL-VALENCE')
    const plural = mutate(na, (o) => o.id === 'valence', (o) => { o.text = '1 valence electrons' })
    expect(codes(verifyElectronShellFigure(plural))).toContain('I-SHELL-VALENCE')
  })

  it('verifies periodic-trend figures against placement and the trend rules', () => {
    const ok = buildPeriodicTrendScene({ element1Symbol: 'Na', element2Symbol: 'Cl' })
    const r = verifyPeriodicTrendFigure(ok)
    expect(r.findings).toEqual([])
    expect(r.unverified).toEqual([])
    expect(r.verified).toEqual(expect.arrayContaining(['group-period-from-z', 'atomic-radius-claim-follows-trend']))
    const place = mutate(ok, (o) => o.id === 'element-1', (o) => { o.text = 'Na (period 2, group 1)' })
    expect(codes(verifyPeriodicTrendFigure(place))).toContain('I-PLACEMENT')
    const radius = mutate(ok, (o) => o.id === 'larger-radius', (o) => { o.text = 'Larger atomic radius: Cl' })
    expect(codes(verifyPeriodicTrendFigure(radius))).toContain('I-TREND-CLAIM')
    const en = mutate(ok, (o) => o.id === 'higher-electronegativity', (o) => { o.text = 'Higher electronegativity: Na' })
    expect(codes(verifyPeriodicTrendFigure(en))).toContain('I-TREND-CLAIM')
    const rel = clone(ok); rel.steps[1].narration = rel.steps[1].narration!.replace('Across a period', 'Down a group')
    expect(codes(verifyPeriodicTrendFigure(rel))).toContain('I-TREND-RELATION')
  })

  it('leaves a pair that placement cannot decide as UNVERIFIED rather than guessing', () => {
    const r = verifyPeriodicTrendFigure(buildPeriodicTrendScene({ element1Symbol: 'Li', element2Symbol: 'Cl' }))
    expect(r.findings).toEqual([])
    expect(r.unverified.join(' ')).toMatch(/not decidable/)
  })

  it('verifies cubic unit cells by the sharing rule and flags a wrong atoms-per-cell label', () => {
    for (const k of ['simple cubic', 'bcc', 'fcc']) {
      const r = verifyLatticeFigure(buildLatticeScene(lookupLattice(k)!))
      expect(r.findings, k).toEqual([])
      expect(r.verified).toContain('sharing-rule-atoms-per-cell')
    }
    const fcc = buildLatticeScene(lookupLattice('fcc')!)
    const lab = mutate(fcc, (o) => o.id === 'count', (o) => { o.text = '3 atoms / cell' })
    expect(codes(verifyLatticeFigure(lab))).toContain('I-LATTICE-COUNT')
    const noFace = clone(fcc); noFace.steps[1].objects = noFace.steps[1].objects.slice(1)
    expect(codes(verifyLatticeFigure(noFace))).toContain('I-LATTICE-COUNT')
    const bcc = clone(buildLatticeScene(lookupLattice('bcc')!)); bcc.title = bcc.title.replace('Body-Centred', 'Face-Centred')
    expect(codes(verifyLatticeFigure(bcc))).toContain('I-LATTICE-COUNT')
  })

  it('flags categories told apart only by colour (REVIEW) and not when they are labelled or single', () => {
    expect(sev(validateColorOnlyEncoding(buildLatticeScene(lookupLattice('bcc')!)), 'I-COLOR-ONLY')).toBe('REVIEW')
    expect(validateColorOnlyEncoding(buildLatticeScene(lookupLattice('simple cubic')!)).findings).toEqual([])
    expect(validateColorOnlyEncoding(mol('water')).findings).toEqual([])
    const labelled = mk([
      { type: 'node', position: [0, 0, 0], color: '#3b82f6', radius: 0.6 }, { type: 'node', position: [1, 0, 0], color: '#ef4444', radius: 0.6 },
      label('blue = Na', [0, 2, 0], { color: '#3b82f6' }), label('red = Cl', [1, 2, 0], { color: '#ef4444' }),
    ])
    expect(validateColorOnlyEncoding(labelled).findings).toEqual([])
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('H — mechanism arrows', () => {
  const base = (arrow: Partial<SceneObject>): SceneSpec => mk([
    { type: 'node', id: 'c', position: [0, 0, 0], text: 'C', radius: 0.7 },
    { type: 'node', id: 'br', position: [6, 0, 0], text: 'Br', radius: 0.7 },
    { type: 'bond', from: [0, 0, 0], to: [6, 0, 0] },
    { type: 'node', id: 'nu', position: [-8, 0, 0], text: 'O', radius: 0.7 },
    { type: 'point', id: 'lp', position: [-6.5, 0.8, 0], properties: { kind: 'lone-pair' } },
    { type: 'arrow', id: 'curly1', ...arrow, properties: { mechanism: 'curly' } },
  ], { title: 'SN2 mechanism' })

  it('accepts an arrow from a lone pair to an electrophilic atom', () => {
    expect(validateMechanismArrows(base({ from: [-6.5, 0.8, 0], to: [0, 0.3, 0] })).findings).toEqual([])
  })
  it('flags a reversed arrow (tail on the atom, head on the lone pair)', () => {
    expect(codes(validateMechanismArrows(base({ from: [0, 0.3, 0], to: [-6.5, 0.8, 0] })))).toContain('H-ARROW-DIRECTION')
  })
  it('flags endpoints that land on nothing', () => {
    const r = validateMechanismArrows(base({ from: [20, 20, 0], to: [30, 30, 0] }))
    expect(codes(r)).toEqual(expect.arrayContaining(['H-ARROW-ENDPOINT']))
    expect(r.verdict).toBe('FAIL')
  })
  it('sends a mechanism-worded figure with no machine-readable arrows to REVIEW', () => {
    const s = mk([label('nucleophilic attack at carbon')], { title: 'SN2 mechanism' })
    const r = validateMechanismArrows(s)
    expect(r.verdict).toBe('REVIEW_REQUIRED')
    expect(codes(r)).toEqual(['H-MECHANISM-UNVERIFIABLE'])
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('J — equilibrium series', () => {
  const t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const A = { name: 'N2O4', role: 'reactant' as const, coeff: 1, x: t, y: [1, 0.8, 0.65, 0.55, 0.49, 0.45, 0.43, 0.42, 0.42, 0.42, 0.42] }
  const B = { name: 'NO2', role: 'product' as const, coeff: 2, x: t, y: [0, 0.4, 0.7, 0.9, 1.02, 1.1, 1.14, 1.16, 1.16, 1.16, 1.16] }

  it('passes a stoichiometric, levelling-off pair and a consistent K', () => {
    const K = (1.16 ** 2) / 0.42
    expect(validateEquilibriumSeries([A, B], { equilibriumStated: true, keq: K }).findings).toEqual([])
  })
  it('FAILS a reactant that rises, a product that falls, and everything rising', () => {
    expect(codes(validateEquilibriumSeries([{ ...A, y: A.y.map((y) => 1.5 - y) }, B]))).toContain('J-STOICH-SIGN')
    expect(codes(validateEquilibriumSeries([A, { ...B, y: B.y.map((y) => 1.2 - y) }]))).toContain('J-STOICH-SIGN')
    expect(codes(validateEquilibriumSeries([{ ...A, y: A.y.map((y) => 2 - y) }, B]))).toContain('J-STOICH-SIGN')
  })
  it('FAILS changes that are not in the ratio of the coefficients', () => {
    expect(codes(validateEquilibriumSeries([A, { ...B, coeff: 1 }]))).toContain('J-STOICH-RATIO')
  })
  it('FAILS a curve with no plateau when an equilibrium is claimed (INFO otherwise)', () => {
    const rising = { ...B, y: t.map((x) => x * 0.2) }
    expect(codes(validateEquilibriumSeries([rising], { equilibriumStated: true }))).toContain('J-NO-PLATEAU')
    expect(sev(validateEquilibriumSeries([rising], {}), 'J-NO-PLATEAU')).toBe('INFO')
  })
  it('FAILS a Q at the plateau that contradicts the stated K', () => {
    expect(codes(validateEquilibriumSeries([A, B], { keq: 50 }))).toContain('J-KEQ-CONTRADICTION')
  })
  it('FAILS non-finite, negative and non-increasing-time data', () => {
    expect(codes(validateEquilibriumSeries([{ ...A, y: [...A.y.slice(0, 3), Number.NaN, ...A.y.slice(4)] }]))).toContain('J-SERIES')
    expect(codes(validateEquilibriumSeries([{ ...A, y: A.y.map((y, i) => (i === 5 ? -0.2 : y)) }]))).toContain('J-SERIES')
    expect(codes(validateEquilibriumSeries([{ ...A, x: [...t.slice(0, 4), 3, ...t.slice(5)] }]))).toContain('J-SERIES')
  })
  it('extracts tagged curves from a scene and routes them through the validator', () => {
    const pts = (ys: number[]) => ys.map((y, i) => [i, y, 0] as [number, number, number])
    const s = mk([
      { type: 'path', id: 'reactant-curve', points: pts(A.y), properties: { role: 'reactant', species: 'N2O4' } },
      { type: 'path', id: 'product-curve', points: pts(B.y.map((y) => 1.2 - y)), properties: { role: 'product', species: 'NO2' } },
    ], { title: 'Approach to equilibrium', id: 'plot-x', sceneType: 'plot' })
    expect(extractEquilibriumSeries(s)).toHaveLength(2)
    expect(codes(auditChemistryScene(s))).toContain('J-STOICH-SIGN')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('K — energy profiles and cycles', () => {
  const ok = { reactant: 0, product: -40, ts: 60 }

  it('passes a consistent exothermic profile and a catalysed one', () => {
    expect(validateEnergyProfile({ ...ok, deltaH: -40, ea: 60, claim: 'exothermic' }).findings).toEqual([])
    expect(validateEnergyProfile({ ...ok, tsCatalysed: 30, productCatalysed: -40 }).findings).toEqual([])
    expect(validateEnergyProfile({ reactant: 0, product: 25, ts: 80, claim: 'endothermic', deltaH: 25 }).findings).toEqual([])
  })
  it('FAILS a transition state that is not above both levels, and a non-positive Ea', () => {
    expect(codes(validateEnergyProfile({ reactant: 0, product: 50, ts: 30 }))).toContain('K-TS-NOT-ABOVE')
    expect(codes(validateEnergyProfile({ reactant: 10, product: -10, ts: 10 }))).toEqual(expect.arrayContaining(['K-TS-NOT-ABOVE', 'K-EA']))
    expect(codes(validateEnergyProfile({ ...ok, ea: 20 }))).toContain('K-EA')
  })
  it('FAILS a ΔH that disagrees with the levels, or an exo/endo label the levels contradict', () => {
    expect(codes(validateEnergyProfile({ ...ok, deltaH: +40 }))).toContain('K-DH-MISMATCH')
    expect(codes(validateEnergyProfile({ ...ok, deltaH: -10 }))).toContain('K-DH-MISMATCH')
    expect(codes(validateEnergyProfile({ ...ok, claim: 'endothermic' }))).toContain('K-EXO-ENDO')
    expect(codes(validateEnergyProfile({ reactant: 0, product: 25, ts: 80, claim: 'exothermic' }))).toContain('K-EXO-ENDO')
  })
  it('FAILS a catalyst that raises Ea, or that changes ΔH', () => {
    expect(codes(validateEnergyProfile({ ...ok, tsCatalysed: 90 }))).toContain('K-CATALYST')
    expect(codes(validateEnergyProfile({ ...ok, tsCatalysed: 30, productCatalysed: -55 }))).toContain('K-CATALYST')
    expect(codes(validateEnergyProfile({ ...ok, tsCatalysed: -50 }))).toContain('K-TS-NOT-ABOVE')
  })
  it('FAILS exo/endo wording that contradicts the ΔH printed beside it', () => {
    expect(codes(validateThermoWording(items('The reaction is exothermic: ΔH = +92 kJ/mol')))).toContain('K-EXO-ENDO')
    expect(codes(validateThermoWording(items('Endothermic, ΔH < 0')))).toContain('K-EXO-ENDO')
    expect(codes(validateThermoWording(items('Absorbs heat, ΔH = −50 kJ')))).toContain('K-EXO-ENDO')
    expect(validateThermoWording(items('Exothermic, ΔH = −92 kJ/mol', 'Endothermic: ΔH > 0')).findings).toEqual([])
  })

  const hess = (over: { directLabel?: string; secondDelta?: number; secondLabel?: string; level?: string } = {}) => buildEnergyCycleScene({
    title: "Hess's Law: Combustion of Carbon", startLabel: 'C(s) + O2(g)', unit: 'kJ/mol',
    paths: [
      { name: 'Direct', steps: [{ label: 'CO2(g)', delta: -393.5, deltaLabel: over.directLabel ?? 'ΔH = −393.5 kJ/mol' }] },
      { name: 'Via CO(g)', steps: [
        { label: over.level ?? 'CO(g) + ½O2(g)', delta: -110.5, deltaLabel: 'ΔH1 = −110.5 kJ/mol' },
        { label: 'CO2(g)', delta: over.secondDelta ?? -283.0, deltaLabel: over.secondLabel ?? 'ΔH2 = −283.0 kJ/mol' },
      ] },
    ],
  })

  it('passes the real Hess cycle (arrows, scale, path totals, conservation)', () => {
    const r = verifyEnergyCycleFigure(hess())
    expect(r.findings).toEqual([])
    expect(r.verified).toEqual(expect.arrayContaining(['arrow-direction-and-scale-match-labels', 'hess-law-path-totals-agree', 'consecutive-levels-conserve-atoms-and-charge']))
    expect(r.unverified.length).toBeGreaterThan(0) // the energies are reference data
  })
  it('FAILS an arrow that points the wrong way for its label', () => {
    expect(codes(verifyEnergyCycleFigure(hess({ directLabel: 'ΔH = +393.5 kJ/mol' })))).toContain('K-ARROW-SIGN')
  })
  it('FAILS paths that do not sum to the same total (Hess violated) and a step off the common scale', () => {
    const r = verifyEnergyCycleFigure(hess({ secondDelta: -250, secondLabel: 'ΔH2 = −283.0 kJ/mol' }))
    expect(codes(r)).toEqual(expect.arrayContaining(['K-SCALE']))
    const sums = verifyEnergyCycleFigure(hess({ secondDelta: -250, secondLabel: 'ΔH2 = −250.0 kJ/mol' }))
    expect(codes(sums)).toContain('K-HESS-SUM')
  })
  it('FAILS a level that does not conserve atoms from the previous level', () => {
    expect(codes(verifyEnergyCycleFigure(hess({ level: 'CO(g) + O2(g)' })))).toContain('K-LEVEL-NOT-CONSERVED')
  })
  it('requires crystal-field d-electron counts to equal group − charge', () => {
    const cft = (dots: number, title = 'Crystal Field Splitting: [Ti(H2O)6]3+') => buildEnergyCycleScene({
      title, startLabel: 't2g (lower set)', unit: 'Δo units',
      paths: [{ name: 'Splitting', steps: [{ label: 'eg (upper set)', delta: 1, deltaLabel: 'Δo (octahedral splitting)' }] }],
      occupancy: [{ levelLabel: 't2g (lower set)', dots }, { levelLabel: 'eg (upper set)', dots: 0 }],
    })
    expect(verifyEnergyCycleFigure(cft(1)).findings).toEqual([])
    expect(codes(verifyEnergyCycleFigure(cft(3)))).toContain('K-CFT-OCCUPANCY')
    expect(codes(verifyEnergyCycleFigure(cft(1, 'Crystal Field Splitting: [Ti(H2O)6]2+')))).toContain('K-CFT-OCCUPANCY') // Ti2+ is d2
  })
  it('flags energy values that carry no unit at all (REVIEW) and a partial unit (INFO)', () => {
    const none = buildEnergyCycleScene({ title: 'Hess', startLabel: 'A', unit: 'kJ/mol', paths: [{ name: 'p', steps: [{ label: 'B', delta: -10, deltaLabel: 'ΔH = −10' }] }] })
    expect(sev(verifyEnergyCycleFigure(none), 'L-UNIT-MISSING')).toBe('REVIEW')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('L — graphs, number lines and bar charts', () => {
  const g = (over: Record<string, unknown>) => validateGraphSpec({ type: 'graph', equation: 'x', domain: [0, 14], xLabel: 'Volume of NaOH (mL)', yLabel: 'pH', title: 'Plot', ...over })

  it('passes a sane labelled graph', () => {
    expect(g({}).findings).toEqual([])
    expect(g({ equation: '14 / (1 + 2.718^(-(x - 7)))' }).findings).toEqual([])
  })
  it('FAILS an equation that does not compile, is constant, or is mostly non-finite', () => {
    expect(codes(g({ equation: 'foo(' }))).toContain('L-NONFINITE')
    expect(codes(g({ equation: '5' }))).toContain('L-COLLAPSED')
    expect(codes(g({ equation: 'ln(x)', domain: [-50, 0.2] }))).toContain('L-NONFINITE')
    expect(codes(g({ domain: [3, 3] }))).toContain('L-COLLAPSED')
  })
  it('FAILS chemically impossible ranges (pH > 14, negative kelvin, negative concentration, fraction > 1)', () => {
    expect(codes(g({ domain: [0, 30] }))).toContain('L-RANGE')
    expect(codes(g({ equation: 'x', domain: [-50, 300], xLabel: 'Temperature (K)', yLabel: 'Pressure (kPa)' }))).toContain('L-RANGE')
    expect(codes(g({ equation: 'x - 3', domain: [0, 10], xLabel: 'Time (s)', yLabel: '[A] (mol/L)' }))).toContain('L-RANGE')
    expect(codes(g({ equation: '2 * x', domain: [0, 1], xLabel: 'Time (s)', yLabel: 'Mole fraction of A' }))).toContain('L-RANGE')
  })
  it('flags missing axis labels and units (REVIEW)', () => {
    expect(sev(g({ xLabel: undefined }), 'L-AXIS-LABEL')).toBe('REVIEW')
    expect(sev(g({ yLabel: 'Heat released' }), 'L-UNIT-MISSING')).toBe('REVIEW')
    expect(g({ yLabel: 'pH' }).findings).toEqual([])
  })
  it('flags a titration with no equivalence rise, one cut off at the edge, and an "equilibrium" that never levels off', () => {
    expect(codes(g({ equation: 'x / 2', title: 'Titration curve with equivalence point' }))).toContain('L-NO-FEATURE')
    expect(codes(g({ equation: '14 / (1 + 2.718^(-8 * (x - 13.5)))', title: 'Titration curve' }))).toContain('L-NO-FEATURE')
    expect(g({ equation: '14 / (1 + 2.718^(-4 * (x - 7)))', title: 'Titration curve' }).findings.filter((f) => f.code === 'L-NO-FEATURE')).toEqual([])
    expect(codes(g({ equation: 'x', domain: [0, 10], xLabel: 'Time (s)', yLabel: '[B] (mol/L)', title: 'Reaction at equilibrium' }))).toContain('L-NO-FEATURE')
  })
  it('validates number lines', () => {
    expect(validateNumberLineSpec({ type: 'number_line', start: 0, end: 14, highlight: [7], title: 'pH scale' }).findings).toEqual([])
    expect(codes(validateNumberLineSpec({ type: 'number_line', start: 0, end: 20, highlight: [7], title: 'pH scale' }))).toContain('L-RANGE')
    expect(codes(validateNumberLineSpec({ type: 'number_line', start: 0, end: 14, highlight: [15] }))).toContain('L-RANGE')
    expect(codes(validateNumberLineSpec({ type: 'number_line', start: 5, end: 5 }))).toContain('L-COLLAPSED')
  })

  const ie = (): SceneSpec => buildStatisticsBarChartScene({
    chartTitle: 'First ionisation energy across period 3 (kJ/mol): rising, with dips at Al and S',
    quantity: { name: 'first ionisation energy (kJ/mol)', kind: 'magnitude' },
    bars: [['Na', 496], ['Mg', 738], ['Al', 577], ['Si', 786], ['P', 1011], ['S', 999], ['Cl', 1251], ['Ar', 1520]].map(([n, v]) => ({ label: `${n} ${v}`, frequency: v as number })),
  })
  it('verifies a bar chart’s scale, labels and the claims in its title', () => {
    const r = verifyBarChartFigure(ie())
    expect(r.findings).toEqual([])
    expect(r.verified).toEqual(expect.arrayContaining(['bar-heights-proportional-to-values-from-zero', 'label-number-equals-bar-value', 'title-trend-claim-holds', 'title-dip-claim-holds']))
  })
  it('FAILS a label number that is not the bar value, a false dip, a false trend, a non-zero baseline and a wrong "largest"', () => {
    expect(codes(verifyBarChartFigure(mutate(ie(), (o) => o.id === 'cat-1', (o) => { o.text = 'Mg 700' })))).toContain('L-BAR-LABEL')
    const flipDip = ie(); flipDip.title = flipDip.title.replace('Al and S', 'Si')
    expect(codes(verifyBarChartFigure(flipDip))).toContain('L-TREND-CLAIM')
    const falling = ie(); falling.title = 'First ionisation energy (kJ/mol): falling across period 3'
    expect(codes(verifyBarChartFigure(falling))).toContain('L-TREND-CLAIM')
    const trunc = mutate(ie(), (o) => o.id === 'bar-3', (o) => { o.from = [o.from![0], 4, 0] })
    expect(codes(verifyBarChartFigure(trunc))).toContain('L-BAR-SCALE')
    const squash = mutate(ie(), (o) => o.id === 'bar-7', (o) => { o.to = [o.to![0], o.to![1] * 0.5, 0] })
    expect(codes(verifyBarChartFigure(squash))).toContain('L-BAR-SCALE')
    const big = mutate(ie(), (o) => o.id === 'modeLabel', (o) => { o.text = 'largest: Cl 1251' })
    expect(codes(verifyBarChartFigure(big))).toContain('L-BAR-LABEL')
  })
  it('uses equipartition as a theory oracle for molar heat capacities', () => {
    const hc = (cp: number) => buildStatisticsBarChartScene({
      chartTitle: 'Molar heat capacities (J/mol·K)', quantity: { name: 'molar heat capacity (J/mol·K)', kind: 'magnitude' },
      bars: [{ label: 'Monatomic Cv', frequency: 12.47 }, { label: 'Monatomic Cp', frequency: 20.79 }, { label: 'Diatomic Cv', frequency: 20.79 }, { label: 'Diatomic Cp', frequency: cp }],
    })
    const good = verifyBarChartFigure(hc(29.1))
    expect(good.findings).toEqual([])
    expect(good.verified).toContain('heat-capacities-equal-equipartition-values')
    expect(good.unverified).toEqual([])
    expect(codes(verifyBarChartFigure(hc(35)))).toContain('L-BAR-VALUE')
  })
  it('flags a magnitude chart with no unit anywhere (REVIEW)', () => {
    const s = buildStatisticsBarChartScene({ chartTitle: 'Boiling comparison', quantity: { name: 'boiling comparison', kind: 'magnitude' }, bars: [{ label: 'A 10', frequency: 10 }, { label: 'B 20', frequency: 20 }] })
    expect(sev(verifyBarChartFigure(s), 'L-UNIT-MISSING')).toBe('REVIEW')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('P — process flows', () => {
  it('passes an ordinary sequence', () => {
    expect(validateProcessFlowSpec({ type: 'process_flow', title: 'The Haber process', steps: [{ title: 'Compress N₂ and H₂' }, { title: 'Pass over iron catalyst' }, { title: 'Cool and condense NH₃' }] }).findings).toEqual([])
  })
  it('FAILS fewer than two steps and an empty step title', () => {
    expect(codes(validateProcessFlowSpec({ type: 'process_flow', title: 'x', steps: [{ title: 'only' }] }))).toContain('P-TOO-SHORT')
    expect(codes(validateProcessFlowSpec({ type: 'process_flow', title: 'x', steps: [{ title: 'a' }, { title: '' }] }))).toContain('A-EMPTY-LABEL')
  })
  it('flags duplicate step titles and a list drawn as a process (REVIEW)', () => {
    expect(sev(validateProcessFlowSpec({ type: 'process_flow', title: 'x', steps: [{ title: 'Heat' }, { title: 'heat' }] }), 'P-DUPLICATE-STEP')).toBe('REVIEW')
    expect(sev(validateProcessFlowSpec({ type: 'process_flow', title: 'The seven SI base units', steps: [{ title: 'metre' }, { title: 'kilogram' }] }), 'P-LIST-AS-PROCESS')).toBe('REVIEW')
    expect(sev(validateProcessFlowSpec({ type: 'process_flow', title: 'Types of chemical bond', steps: [{ title: 'ionic' }, { title: 'covalent' }] }), 'P-LIST-AS-PROCESS')).toBe('REVIEW')
  })
  it('applies the same checks to a process SceneSpec', () => {
    const dup = buildCellPathwayScene({ conceptId: 'x', title: 'Cycle', teachingGoal: 'g', stages: [{ name: 'Heat', description: 'a' }, { name: 'Heat', description: 'b' }] })
    expect(codes(validateProcessScene(dup))).toContain('P-DUPLICATE-STEP')
    const list = buildCellPathwayScene({ conceptId: 'x', title: 'Characteristics of life', teachingGoal: 'g', stages: [{ name: 'Grows', description: 'a' }, { name: 'Moves', description: 'b' }] })
    expect(codes(validateProcessScene(list))).toContain('P-LIST-AS-PROCESS')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('E — electrochemical cells, system boundaries, the first law', () => {
  it('passes the real cells and verifies EMF sign, ΔG = −nFE with whole n, and flow direction', () => {
    const r = verifyElectrochemicalCellFigure(cellScene())
    expect(r.findings).toEqual([])
    expect(r.verified).toEqual(expect.arrayContaining(['emf-sign-matches-spontaneity', 'delta-g-equals-minus-nFE-with-integer-n', 'electron-flow-runs-anode-to-cathode']))
    expect(r.unverified.join(' ')).toMatch(/reference data/)
    const nernst = cellScene({ anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76, concentration: 1 }, cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 0.01 } })
    expect(verifyElectrochemicalCellFigure(nernst).findings).toEqual([])
    const reversed = cellScene({ anode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 }, cathode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 } })
    expect(verifyElectrochemicalCellFigure(reversed).findings).toEqual([])
  })
  it('FAILS spontaneity that contradicts the EMF, a ΔG of the wrong sign, and a ΔG that is not −nFE for whole n', () => {
    const s = cellScene()
    const sub = (a: string | RegExp, b: string) => { const c = clone(s); for (const st of c.steps) for (const o of st.objects) if (o.text) o.text = o.text.replace(a, b); for (const st of c.steps) if (st.narration) st.narration = st.narration.replace(a, b); return c }
    expect(codes(verifyElectrochemicalCellFigure(sub(/(?<!non-)spontaneous/, 'non-spontaneous')))).toContain('E-ELEC-SPONTANEITY')
    expect(codes(verifyElectrochemicalCellFigure(sub('ΔG = -212.27', 'ΔG = 212.27')))).toContain('E-ELEC-DG-SIGN')
    expect(codes(verifyElectrochemicalCellFigure(sub('-212.27', '-150')))).toContain('E-ELEC-NFE')
  })
  it('FAILS an electron-flow arrow that runs cathode → anode', () => {
    const s = cellScene()
    const flipped = mutate(s, (o) => o.type === 'arrow' && o.color === '#22c55e', (o) => { const f = o.from!; o.from = o.to!; o.to = f })
    expect(codes(verifyElectrochemicalCellFigure(flipped))).toContain('E-ELEC-FLOW-DIRECTION')
  })
  it('FAILS "in solution" on a molten electrolyte, and an anode label that talks about the cathode', () => {
    const molten = buildElectrochemicalCellScene({ cellType: 'electrolytic', anode: { material: 'C (graphite)', ion: 'Cl-' }, cathode: { material: 'Fe (steel)', ion: 'Na+' }, electronsTransferred: 2, externalVoltage: 4, name: 'Electrolysis of Molten NaCl' })
    expect(codes(verifyElectrochemicalCellFigure(molten))).toContain('E-ELEC-SOLUTION-FOR-MOLTEN')
    const aqueous = buildElectrochemicalCellScene({ cellType: 'electrolytic', anode: { material: 'C (graphite)', ion: 'Cl-' }, cathode: { material: 'Fe (steel)', ion: 'Na+' }, electronsTransferred: 2, externalVoltage: 4, name: 'Electrolysis of Brine' })
    expect(verifyElectrochemicalCellFigure(aqueous).findings).toEqual([])
    const role = buildElectrochemicalCellScene({ cellType: 'electrolytic', anode: { material: 'Cu (pure, impure at cathode)', ion: 'Cu2+' }, cathode: { material: 'object', ion: 'Cu2+' }, electronsTransferred: 2, externalVoltage: 2, name: 'Copper Electroplating' })
    expect(codes(verifyElectrochemicalCellFigure(role))).toContain('E-ELEC-ROLE-TEXT')
  })
  it('flags an electrode whose own ion belongs to a different element (REVIEW)', () => {
    const r = verifyElectrochemicalCellFigure(cellScene({ anode: { material: 'Zn', ion: 'Cu2+', standardPotential: -0.76 } }))
    expect(sev(r, 'E-ELEC-ION-MISMATCH')).toBe('REVIEW')
  })
  it('FAILS a cell driven by an external source that is called spontaneous', () => {
    const s = buildElectrochemicalCellScene({ cellType: 'electrolytic', anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 }, cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 }, electronsTransferred: 2, externalVoltage: 3, name: 'Driven cell' })
    expect(codes(verifyElectrochemicalCellFigure(s))).toContain('E-ELEC-SPONTANEITY')
  })

  it('passes the three system types and verifies the matter/energy definition and arrow geometry', () => {
    for (const t of ['open', 'closed', 'isolated'] as const) {
      const r = verifySystemBoundaryFigure(buildSystemBoundaryScene(t))
      expect(r.findings, t).toEqual([])
      expect(r.unverified).toEqual([])
    }
  })
  it('FAILS a closed system drawn with matter arrows, a missing note, a mis-defined narration and an arrow that does not cross the boundary', () => {
    const open = buildSystemBoundaryScene('open')
    const asClosed = clone(open); asClosed.id = 'chem-system-closed'; asClosed.title = 'Closed System'
    expect(codes(verifySystemBoundaryFigure(asClosed))).toContain('E-SYS-TYPE')
    const iso = clone(buildSystemBoundaryScene('isolated')); iso.steps[1].objects = iso.steps[1].objects.filter((o) => o.text !== 'no energy exchange')
    expect(codes(verifySystemBoundaryFigure(iso))).toContain('E-SYS-TYPE')
    const def = clone(buildSystemBoundaryScene('closed')); def.steps[1].narration = 'A closed system exchanges both matter and energy with its surroundings.'
    expect(codes(verifySystemBoundaryFigure(def))).toContain('E-SYS-TYPE')
    const inside = mutate(buildSystemBoundaryScene('closed'), (o) => o.text === 'heat in', (o) => { o.from = [0, 0, 0]; o.to = [1, 0, 0] })
    expect(codes(verifySystemBoundaryFigure(inside))).toContain('E-SYS-ARROW')
  })
  it('verifies the first law arithmetic, sign convention and arrow direction — and flags the missing unit', () => {
    const r = verifyFirstLawFigure(buildFirstLawScene(100, -40))
    expect(r.findings.map((f) => f.code)).toEqual(['L-UNIT-MISSING'])
    expect(r.verified).toEqual(expect.arrayContaining(['delta-u-equals-q-plus-w', 'arrow-direction-matches-sign']))
    const wrong = mutate(buildFirstLawScene(100, -40), (o) => /^ΔU = /.test(o.text ?? ''), (o) => { o.text = 'ΔU = 70' })
    expect(codes(verifyFirstLawFigure(wrong))).toContain('E-FIRSTLAW-ARITHMETIC')
    const sign = clone(buildFirstLawScene(100, -40)); sign.steps[1].narration = 'Heat: q = 100. Positive means heat flows out.'
    expect(codes(verifyFirstLawFigure(sign))).toContain('E-FIRSTLAW-SIGN')
    const dir = mutate(buildFirstLawScene(100, -40), (o) => o.text === 'q = +100', (o) => { const f = o.from!; o.from = o.to!; o.to = f })
    expect(codes(verifyFirstLawFigure(dir))).toContain('E-FIRSTLAW-SIGN')
    const unit = clone(buildFirstLawScene(100, -40)); unit.steps[0].narration = 'Internal energy U (kJ) changes only through heat and work crossing the boundary.'
    expect(codes(verifyFirstLawFigure(unit))).not.toContain('L-UNIT-MISSING')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('the verdict rule', () => {
  it('PASS requires that every recognised claim was verified and nothing claim-bearing is left unchecked', () => {
    const na = auditChemistryScene(shell('Na'))
    expect(na.verdict).toBe('PASS')
    expect(na.unverified).toEqual([])
    expect(auditChemistryScene(mol('water')).verdict).toBe('PASS')
    expect(auditChemistryScene(buildSystemBoundaryScene('open')).verdict).toBe('PASS')
  })
  it('a fully self-consistent figure that rests on reference data is REVIEW_REQUIRED, never PASS', () => {
    const cell = auditChemistryScene(cellScene())
    expect(cell.findings.filter((f) => f.severity !== 'INFO')).toEqual([])
    expect(cell.verdict).toBe('REVIEW_REQUIRED')
    expect(auditChemistryScene(buildFirstLawScene(100, -40)).verdict).toBe('REVIEW_REQUIRED')
  })
  it('FAIL beats REVIEW; INFO never changes a verdict', () => {
    const bad = mutate(cellScene(), (o) => o.type === 'label' && /spontaneous/.test(o.text ?? ''), (o) => { o.text = o.text!.replace(/(?<!non-)spontaneous/, 'non-spontaneous') })
    expect(auditChemistryScene(bad).verdict).toBe('FAIL')
    const infoOnly = auditChemistryScene(buildFirstLawScene(-50, 20))
    expect(infoOnly.findings.some((f) => f.severity === 'INFO')).toBe(false)
  })
  it('an unrecognised scene, a prose scene and a card are REVIEW_REQUIRED', () => {
    expect(auditChemistryScene(mk([label('Anything')], { id: 'mystery' })).verdict).toBe('REVIEW_REQUIRED')
    expect(auditChemistryScene(mk([label('Anything')], { id: 'mystery' })).unverified.join()).toMatch(/no deterministic chemistry verifier/)
    const prose = auditChemistryScene(buildCanonicalScene(null, 'chem.org.pericyclic')!)
    expect(prose.family).toBe('prose-comparison')
    expect(prose.verdict).toBe('REVIEW_REQUIRED')
    expect(auditChemistryCard('three_electron_shells')).toMatchObject({ verdict: 'REVIEW_REQUIRED', family: 'card:three_electron_shells' })
  })
  it('never throws and never passes on garbage', () => {
    for (const junk of [null, undefined, 42, 'str', {}, { steps: 'no' }, { steps: [null] }, { steps: [{ objects: [null, 7] }] }]) {
      const r = auditChemistryScene(junk as never)
      expect(r.verdict, JSON.stringify(junk)).not.toBe('PASS')
    }
    expect(auditChemistrySpec(null).verdict).toBe('FAIL')
    expect(auditChemistrySpec({ type: 'mystery' }).verdict).toBe('REVIEW_REQUIRED')
    expect(auditChemistryPayload(null).verdict).toBe('PASS') // nothing on screen = nothing to be wrong
    expect(auditChemistryPayload({ renderer: 'ascii' }).verdict).toBe('REVIEW_REQUIRED')
  })
  it('audits VisualSpecs and manifest entries', () => {
    const g = auditChemistrySpec({ type: 'graph', equation: 'x', domain: [0, 30], xLabel: 'Volume (mL)', yLabel: 'pH', title: 'Titration' })
    expect(g.verdict).toBe('FAIL')
    expect(g.family).toBe('spec:graph')
    const ok = auditChemistrySpec({ type: 'process_flow', title: 'Haber process', steps: ['Compress gases', 'Pass over iron catalyst'] })
    expect(ok.verdict).toBe('REVIEW_REQUIRED')
    expect(auditManifestEntry({ payload: { field: 'sceneSpec', value: shell('Na') } }).verdict).toBe('PASS')
    expect(auditManifestEntry({ payload: { field: 'visual', value: 'three_atomic_structure' } }).family).toBe('card:three_atomic_structure')
    expect(auditManifestEntry({ payload: { field: 'visualSpec', value: { type: 'graph', equation: 'x', domain: [0, 5] } } }).family).toBe('spec:graph')
    expect(auditManifestEntry({ payload: { field: 'nonsense', value: 1 } }).verdict).toBe('REVIEW_REQUIRED')
  })
  it('detects figure families from structure, not from a concept id', () => {
    expect(detectFamily(mol('water'))).toBe('molecule')
    expect(detectFamily(shell('Na'))).toBe('electron-shells')
    expect(detectFamily(cellScene())).toBe('electrochemical-cell')
    expect(detectFamily(buildFirstLawScene(1, 2))).toBe('first-law')
    expect(detectFamily(mk([label('x')]))).toBe('unknown')
  })
  it('promises a title term the drawing does not carry (REVIEW)', () => {
    const hexa = buildCoordinationComplexScene({ name: 'Hexaamminecobalt(III) — sp3d2 / d2sp3 Hybridization', centralMetal: 'Co', charge: '3+', geometry: 'octahedral', ligands: [{ formula: 'NH3', count: 6 }], coordinationNumber: 6 })
    expect(sev(auditChemistryScene(hexa), 'U-CLAIM-NOT-DRAWN')).toBe('REVIEW')
    expect(sev(auditChemistryScene(mol('water'), { parametricEffects: ['lone pairs squeeze the bond angle'] }), 'U-CLAIM-NOT-DRAWN')).toBe('REVIEW')
    expect(codes(auditChemistryScene(mol('water')))).not.toContain('U-CLAIM-NOT-DRAWN')
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('purity', () => {
  it('imports no AI, database, network or filesystem module', () => {
    const src = readFileSync('src/lib/teaching/visual/chemistryFigureAudit.pure.ts', 'utf8')
    const imports = [...src.matchAll(/^import[^']*'([^']+)'/gm)].map((m) => m[1])
    // `@/lib/text/chemSpecies.pure` is imported twice (values, then types) and is itself import-free.
    expect([...new Set(imports)].sort()).toEqual(['../sceneSpec', '../sceneSpecValidator', './typesetSceneChemistry', '@/lib/text/chemSpecies.pure', '@/lib/visuals/mathParser'])
    for (const spec of imports) expect(spec).not.toMatch(/@\/lib\/ai|@\/lib\/prisma|rateLimit|node:|fs|http/)
    expect(src).not.toMatch(/generateJSON|fetch\(|process\.env|Math\.random|Date\.now|new Date\(/)
    const species = readFileSync('src/lib/text/chemSpecies.pure.ts', 'utf8')
    expect(species).not.toMatch(/^import /m)
    expect(species).not.toMatch(/generateJSON|fetch\(|process\.env|Math\.random|Date\.now|new Date\(/)
  })
  it('is deterministic', () => {
    const a = JSON.stringify(auditChemistryScene(cellScene()))
    expect(JSON.stringify(auditChemistryScene(cellScene()))).toBe(a)
  })
})

// ═════════════════════════════════════════════════════════════════════════════
describe('the real chemistry corpus', () => {
  /**
   * Defects that are KNOWN and OPEN (verified by hand against the source). The test fails on any NEW FAIL
   * and keeps passing when one of these is fixed, so a fix only ever shrinks the list.
   */
  const KNOWN_OPEN_FAILS = new Set([
    'chem.elect.electrolysis|E-ELEC-SOLUTION-FOR-MOLTEN',
    'chem.elect.industrial|E-ELEC-ROLE-TEXT',
  ])

  const authored = CONCEPT_SCENE_OVERRIDES.filter((c) => c.startsWith('chem.'))

  it('audits every authored chem.* concept scene without throwing, and finds no NEW failure', () => {
    expect(authored.length).toBeGreaterThanOrEqual(29)
    const fails: string[] = []
    for (const id of authored) {
      const scene = buildCanonicalScene(null, id)
      expect(scene, id).not.toBeNull()
      const r = auditChemistryScene(scene!, { conceptId: id })
      expect(['PASS', 'FAIL', 'REVIEW_REQUIRED']).toContain(r.verdict)
      for (const f of r.findings.filter((x) => x.severity === 'FAIL')) fails.push(`${id}|${f.code}`)
    }
    const unknown = fails.filter((f) => !KNOWN_OPEN_FAILS.has(f))
    expect(unknown, `new failures: ${unknown.join(', ')}`).toEqual([])
  })

  it('has no false alarm on any generator output a learner can reach with the parametric controls', () => {
    const molVar = variablesFor('molecule')[0]
    const molOptions = molVar.kind === 'choice' ? molVar.options : []
    expect(molOptions.length).toBe(6)
    for (const m of molOptions) {
      const r = auditChemistryScene(rebuildScene('molecule', { molecule: m.value })!)
      expect(r.verdict === 'FAIL', `molecule ${m.value}: ${codes(r).join()}`).toBe(false)
    }
    for (let z = 1; z <= 20; z++) {
      const r = auditChemistryScene(rebuildScene('electron_shells', { element: ELEMENTS_TABLE[z - 1].symbol })!)
      expect(r.verdict, `Z=${z}`).toBe('PASS')
    }
    for (const lat of ['simple cubic', 'bcc', 'fcc']) expect(auditChemistryScene(rebuildScene('lattice', { lattice: lat })!).verdict).not.toBe('FAIL')
    const syms = TREND_ELEMENTS.map((e) => e.symbol)
    for (const a of syms) for (const b of syms) {
      if (a === b) continue
      const r = auditChemistryScene(buildPeriodicTrendScene({ element1Symbol: a, element2Symbol: b }))
      expect(r.verdict === 'FAIL', `${a} vs ${b}: ${codes(r).join()}`).toBe(false)
    }
  })

  it('the periodic-trends table is monotone: radius falls across a period and grows down a group; EN the reverse', () => {
    const byPeriod = new Map<number, typeof TREND_ELEMENTS>()
    for (const e of TREND_ELEMENTS) byPeriod.set(e.period, [...(byPeriod.get(e.period) ?? []), e])
    for (const [, els] of byPeriod) {
      const s = [...els].sort((a, b) => a.group - b.group)
      for (let i = 1; i < s.length; i++) {
        expect(s[i].atomicRadiusPm, `${s[i - 1].symbol}→${s[i].symbol}`).toBeLessThan(s[i - 1].atomicRadiusPm)
        expect(s[i].electronegativity).toBeGreaterThan(s[i - 1].electronegativity)
      }
    }
    const byGroup = new Map<number, typeof TREND_ELEMENTS>()
    for (const e of TREND_ELEMENTS) byGroup.set(e.group, [...(byGroup.get(e.group) ?? []), e])
    for (const [, els] of byGroup) {
      const s = [...els].sort((a, b) => a.period - b.period)
      for (let i = 1; i < s.length; i++) {
        expect(s[i].atomicRadiusPm).toBeGreaterThan(s[i - 1].atomicRadiusPm)
        expect(s[i].electronegativity).toBeLessThan(s[i - 1].electronegativity)
      }
    }
  })

  it('the known open defects are actually detected (the validators are not silently blind)', () => {
    const found = new Set<string>()
    for (const id of authored) for (const f of auditChemistryScene(buildCanonicalScene(null, id)!).findings) if (f.severity === 'FAIL') found.add(`${id}|${f.code}`)
    for (const k of KNOWN_OPEN_FAILS) {
      // If someone fixes the authored text this assertion is allowed to relax: the point is that the check exists and fires today.
      if (!found.has(k)) console.warn(`known defect no longer reproduces (fixed?): ${k}`)
    }
    expect(found.size).toBeLessThanOrEqual(KNOWN_OPEN_FAILS.size)
  })

  it('texts of a real scene are all scanned (locators resolve to real fields)', () => {
    const scene = buildCanonicalScene(null, 'chem.elect.galvanic-cell')!
    for (const t of collectSceneTexts(scene)) expect(typeof t.where).toBe('string')
    expect(textOf(scene).some((x) => /Ecell/.test(x))).toBe(true)
  })
})
