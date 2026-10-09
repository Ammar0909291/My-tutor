/**
 * Regression pins for the 2026-10-08 Chemistry Visual Quality audit — every root cause that was found by
 * rendering the learner-facing chemistry figures in Chromium (1280px and 390px) and checking them against the
 * source (see docs/qa/CHEMISTRY_VISUAL_QUALITY_AUDIT.md). Each block names the defect it pins and how it was seen.
 */

import { describe, expect, it } from 'vitest'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { buildElectrochemicalCellScene, formatConcentration } from '@/lib/teaching/sceneGenerators/electrochemicalCell'
import { buildEnergyCycleScene } from '@/lib/teaching/sceneGenerators/energyCycle'
import { buildMoleculeScene, lookupMolecule } from '@/lib/teaching/sceneGenerators/moleculeGeometry.pure'
import { buildElectronShellScene, lookupElement } from '@/lib/teaching/sceneGenerators/electronShells.pure'
import { buildLatticeScene, lookupLattice } from '@/lib/teaching/sceneGenerators/crystalLattice.pure'
import { buildCoordinationComplexScene } from '@/lib/teaching/sceneGenerators/coordinationComplex'
import { chargeSuffix, metalChargeOf, parseChargeText } from '@/lib/text/chemSpecies.pure'
import { buildCellComparisonScene } from '@/lib/teaching/sceneGenerators/cellComparison'
import { containsRawLatex } from '@/lib/teaching/visual/figureCritic'
import { auditChemistryScene } from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { sceneTextObjects } from '@/lib/teaching/visual/layout'
import { stripUnbackedAsciiDiagram, isReactionChainLine } from '@/lib/teaching/asciiDiagramGuard'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'

const texts = (scene: SceneSpec): string[] => scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).filter(Boolean)
const labelAt = (scene: SceneSpec, needle: RegExp): SceneObject => {
  const o = scene.steps.flatMap((s) => s.objects).find((x) => needle.test(x.text ?? ''))
  if (!o) throw new Error(`no object matching ${needle}`)
  return o
}
const scene = (id: string): SceneSpec => {
  const s = buildCanonicalScene(null, id)
  if (!s) throw new Error(`no canonical scene for ${id}`)
  return s
}

// ── electrochemical cells ──────────────────────────────────────────────────────
describe('electrochemical cells', () => {
  it('a molten-salt cell says "in the melt", never "in solution" (chem.elect.electrolysis)', () => {
    // Seen: "Na+ in solution" / "Cl- in solution" on "Electrolysis of Molten NaCl" — water the cell excludes.
    const s = scene('chem.elect.electrolysis')
    expect(texts(s).join(' | ')).not.toMatch(/in solution/)
    expect(texts(s)).toContain('Na+ in the melt')
    expect(texts(s)).toContain('Cl- in the melt')
    expect(texts(s)).toContain('molten electrolyte')
  })

  it('an aqueous cell still says "in solution" (the default is unchanged)', () => {
    expect(texts(scene('chem.elect.galvanic-cell'))).toContain('Zn2+ in solution')
  })

  it('the concentrations that set the EMF are on the figure (Nernst and concentration cells)', () => {
    // Seen: the concentration cell "never draws concentrations" — an EMF the learner could not trace to a quantity.
    const nernst = texts(scene('chem.elect.nernst'))
    expect(nernst).toContain('Zn2+ in solution (1 M)')
    expect(nernst).toContain('Cu2+ in solution (0.01 M)')
    const conc = texts(scene('chem.elect.concentration-cell'))
    expect(conc).toContain('Cu2+ in solution (0.001 M)')
    expect(conc).toContain('Cu2+ in solution (1 M)')
  })

  it('formatConcentration prints what a learner writes', () => {
    expect([1, 1.0, 0.1, 0.01, 0.001, 2.5].map(formatConcentration)).toEqual(['1', '1', '0.1', '0.01', '0.001', '2.5'])
  })

  it('electroplating names the electrode "Cu (anode)", not "Cu (pure, impure at cathode) (anode)" (chem.elect.industrial)', () => {
    const t = texts(scene('chem.elect.industrial'))
    expect(t.join(' | ')).not.toMatch(/impure|\) \(anode\)/)
    expect(t).toContain('Cu (anode)')
    expect(t).toContain('object to be plated (cathode)')
  })

  it('the result line sits in its own lane BELOW the beakers, clear of the electrode names and the wire', () => {
    // Seen at 390px: the headline answer drawn on top of "Zn (anode)", "Cu (cathode)" and "e⁻ flow".
    const s = scene('chem.elect.galvanic-cell')
    const result = labelAt(s, /^Ecell = /)
    const ionLabels = s.steps.flatMap((st) => st.objects).filter((o) => /in solution/.test(o.text ?? ''))
    const anodeName = labelAt(s, /\(anode\)$/)
    expect(result.position![1]).toBeLessThan(Math.min(...ionLabels.map((o) => o.position![1])) - 1)
    expect(result.position![1]).toBeLessThan(anodeName.position![1])
  })

  it('every cell scene audits with no FAIL and is built by the same builder (no per-concept fork)', () => {
    for (const id of ['chem.elect.galvanic-cell', 'chem.thermo.cell-thermo', 'chem.elect.standard-electrode', 'chem.elect.nernst', 'chem.elect.concentration-cell', 'chem.elect.electrolysis', 'chem.elect.industrial', 'chem.elect.batteries']) {
      const r = auditChemistryScene(scene(id))
      expect(r.findings.filter((f) => f.severity === 'FAIL'), id).toEqual([])
    }
  })

  it('without `medium`, a molten title is still caught by the audit (the gate would refuse it)', () => {
    const bad = buildElectrochemicalCellScene({
      cellType: 'electrolytic', anode: { material: 'C (graphite)', ion: 'Cl-' }, cathode: { material: 'Fe (steel)', ion: 'Na+' },
      electronsTransferred: 2, externalVoltage: 4, name: 'Electrolysis of Molten NaCl',
    })
    expect(auditChemistryScene(bad).findings.map((f) => f.code)).toContain('E-ELEC-SOLUTION-FOR-MOLTEN')
  })
})

// ── decoration that names nothing must not sit on the data ──────────────────────
describe('spatial chemistry figures do not draw a meaningless x/y/z triad', () => {
  it('molecule, electron shells and lattice (kind-default generators) opt out of the axes', () => {
    expect(buildMoleculeScene(lookupMolecule('water')!).stage?.axes).toBe(false)
    expect(buildElectronShellScene(lookupElement('Na')!).stage?.axes).toBe(false)
    expect(buildLatticeScene(lookupLattice('fcc')!).stage?.axes).toBe(false)
  })

  it('coordination complexes and electrochemical cells (authored scenes) opt out too', () => {
    for (const id of ['chem.coord.werner', 'chem.coord.isomerism', 'chem.elect.galvanic-cell', 'chem.elect.electrolysis', 'chem.elect.batteries']) {
      expect(scene(id).stage?.axes, id).toBe(false)
    }
  })

  it('the grid is left as it was (only the lettered triad is removed)', () => {
    expect(buildMoleculeScene(lookupMolecule('water')!).stage?.grid).toBeUndefined()
  })
})

describe('electrolytic cells: the external-source line has its own lane above the electron-flow label', () => {
  for (const id of ['chem.elect.electrolysis', 'chem.elect.industrial']) {
    it(`${id}: "external source: N V" is above "e⁻ flow", and both clear of the electrode names`, () => {
      const s = scene(id)
      const source = labelAt(s, /^external source:/)
      const flow = labelAt(s, /^e⁻ flow$/)
      const anode = labelAt(s, /\(anode\)$/)
      expect(source.position![1]).toBeGreaterThan(flow.position![1] + 0.9)
      expect(source.position![1]).toBeGreaterThan(anode.position![1] + 1.2)
    })
  }
})

// ── energy cycles (Hess's law, Born–Haber, crystal field) ─────────────────────
describe('energy cycles lay their text out in separate lanes', () => {
  const born = scene('chem.thermo.bond-enthalpy')
  const hess = scene('chem.thermo.enthalpy')

  for (const [name, s] of [['Born–Haber', born], ['Hess', hess]] as const) {
    it(`${name}: the title is above the highest level, the path names are footers below the lowest level, the result is below the names`, () => {
      // Seen at 1280px: "Every path gives the same total…" drawn across "Direct", "Via ions" and the top level label
      // (24 label collisions at 1280px, 29 at 390px); and, after the result moved, the path names still sharing the top of
      // the ladder with the title and the two highest levels (desktop type is ~15.5px in the same ~290px canvas).
      const all = sceneTextObjects(s)
      const result = all.find((t) => /^Every path totals/.test(t.text))!
      const levels = all.filter((t) => t.object.color !== result.object.color && !/^(Direct|Via )/.test(t.text) && t.text !== s.title)
      const names = all.filter((t) => /^(Direct|Via )/.test(t.text))
      const title = all.find((t) => t.text === s.title)!
      const lowestLevel = Math.min(...levels.map((t) => t.position[1]))
      const highestLevel = Math.max(...levels.map((t) => t.position[1]))
      expect(names).toHaveLength(2)
      for (const n of names) expect(n.position[1]).toBeLessThan(lowestLevel - 0.5)
      expect(result.position[1]).toBeLessThan(Math.min(...names.map((n) => n.position[1])) - 1)
      expect(title.position[1]).toBeGreaterThan(highestLevel + 1.5)
    })

    it(`${name}: the result sentence is a statement (detail tier), not a heading, and prints a true minus`, () => {
      const result = sceneTextObjects(s).find((t) => /^Every path totals/.test(t.text))!
      expect(result.object.size).toBeLessThan(1.4)           // not the 1.75 heading tier that wrapped to three lines on a phone
      expect(result.text).toMatch(/totals −/)                // U+2212, like the step labels
      expect(result.text).not.toMatch(/totals -/)
    })
  }

  it('the generator keeps its consistency guarantee: paths that disagree are reported, not drawn as agreeing', () => {
    const s = buildEnergyCycleScene({
      title: 'T', startLabel: 'A', unit: 'kJ',
      paths: [
        { name: 'P1', steps: [{ label: 'B', delta: -10, deltaLabel: 'ΔH = −10' }] },
        { name: 'P2', steps: [{ label: 'B', delta: -7, deltaLabel: 'ΔH = −7' }] },
      ],
    })
    expect(texts(s).join(' | ')).toMatch(/Paths disagree — −10 kJ vs −7 kJ/)
    // …and the narration under it does not claim the opposite.
    expect(s.steps[s.steps.length - 1].narration).not.toMatch(/agree — that is Hess/)
    expect(s.steps[s.steps.length - 1].narration).toMatch(/do not agree/)
  })
})

// ── cell comparison (shared with Biology: the new layout is an explicit opt-in) ─
describe('cell comparison layout', () => {
  const group = (label: string) => ({ label, description: 'd', items: ['one item', 'another item'] })
  const four = [group('A'), group('B'), group('C'), group('D')]
  const xsOf = (s: SceneSpec) => s.steps.map((st) => st.objects[0].position![0])

  it('four groups with no opt-in stay on ONE row, byte for byte (every Biology comparison is unchanged)', () => {
    const s = buildCellComparisonScene({ conceptId: 'x.y.z', title: 'T', teachingGoal: 'g', groups: four })
    expect(xsOf(s)).toEqual([-8.25, -2.75, 2.75, 8.25])
    expect(s.cameraDistance).toBe(18)
    expect(new Set(s.steps.map((st) => st.objects[0].position![1])).size).toBe(1)
  })

  it('`gridFromGroups: 4` puts the same four groups on two rows of two, with the camera stepped back', () => {
    const s = buildCellComparisonScene({ conceptId: 'x.y.z', title: 'T', teachingGoal: 'g', groups: four, gridFromGroups: 4 })
    expect(new Set(xsOf(s)).size).toBe(2)
    expect(new Set(s.steps.map((st) => st.objects[0].position![1])).size).toBe(2)
    expect(s.cameraDistance).toBe(20)
  })

  it('five or more groups behave exactly as before whatever the opt-in default (grid from 5)', () => {
    const five = [...four, group('E')]
    const s = buildCellComparisonScene({ conceptId: 'x.y.z', title: 'T', teachingGoal: 'g', groups: five })
    expect(s.cameraDistance).toBe(20)
    // The original 3-column grid: three groups on the first row, two (centred) on the second.
    expect(xsOf(s)).toEqual([-6.5, 0, 6.5, -3.25, 3.25])
  })

  it('the four-group chemistry comparisons that overflowed a phone canvas opted in (real gases, phase diagram)', () => {
    for (const id of ['chem.state.real-gases', 'chem.state.phase-diagram']) {
      const s = scene(id)
      expect(new Set(s.steps.map((st) => st.objects[0].position![1])).size, id).toBe(2)
    }
  })

  it('the phase diagram lists all THREE regions it announces (solid, liquid, gas)', () => {
    // Seen: "every P–T point is solid, liquid or gas" … items: solid, gas — the liquid region was missing.
    const t = texts(scene('chem.state.phase-diagram'))
    expect(t.some((x) => /^solid:/.test(x))).toBe(true)
    expect(t.some((x) => /^liquid:/.test(x))).toBe(true)
    expect(t.some((x) => /^gas:/.test(x))).toBe(true)
  })
})

// ── a title may not promise what the figure does not draw ──────────────────────
describe('titles', () => {
  it('chem.coord.bonding does not claim to draw sp3d2 / d2sp3 hybridisation (it draws the octahedral geometry)', () => {
    const s = scene('chem.coord.bonding')
    expect(s.title).not.toMatch(/sp3d2|d2sp3|hybridi/i)
    expect(s.title).toMatch(/octahedral/i)
  })
})

// ── coordination complexes: the metal's charge is not the complex's ─────────────
describe('coordination complexes state the METAL\'s charge, derived from the ligands', () => {
  const def = (centralMetal: string, charge: string, ligands: { formula: string; count: number }[], geometry: 'octahedral' | 'square_planar', n: number) =>
    buildCoordinationComplexScene({ name: 'X', centralMetal, charge, geometry, ligands: ligands as never, coordinationNumber: n })

  it('hexaamminecobalt(III): overall 3+, neutral NH3 → "a central Co3+ ion"', () => {
    expect(def('Co', '3+', [{ formula: 'NH3', count: 6 }], 'octahedral', 6).steps[0].narration).toContain('a central Co3+ ion')
  })

  it('cisplatin: neutral overall, 2 NH3 + 2 Cl⁻ → the metal is Pt2+ (it used to say only "a central Pt ion")', () => {
    const s = def('Pt', '', [{ formula: 'NH3', count: 2 }, { formula: 'Cl', count: 2 }] as never, 'square_planar', 4)
    expect(s.steps[0].narration).toContain('a central Pt2+ ion')
  })

  it('[PtCl4]2−: overall 2−, four Cl⁻ → Pt2+, NOT "Pt2-" (the overall charge printed as the metal\'s)', () => {
    const s = def('Pt', '2-', [{ formula: 'Cl', count: 4 }], 'square_planar', 4)
    expect(s.steps[0].narration).toContain('a central Pt2+ ion')
    expect(s.steps[0].narration).not.toMatch(/Pt2-/)
    expect(auditChemistryScene(s).findings.filter((f) => f.severity === 'FAIL')).toEqual([])
  })

  it('an unknown ligand: nothing is claimed about the metal\'s charge', () => {
    const s = def('Fe', '2+', [{ formula: 'XYZ', count: 6 }], 'octahedral', 6)
    expect(s.steps[0].narration).toContain('a central Fe metal ion')
    expect(s.steps[0].narration).not.toMatch(/Fe\d?[+-]/)
  })

  it('metalChargeOf / parseChargeText / chargeSuffix', () => {
    expect(parseChargeText('3+')).toBe(3)
    expect(parseChargeText('2-')).toBe(-2)
    expect(parseChargeText('2−')).toBe(-2)
    expect(parseChargeText('+')).toBe(1)
    expect(parseChargeText('')).toBe(0)
    expect(parseChargeText('x')).toBeNull()
    expect([2, 1, -1, -2, 0].map(chargeSuffix)).toEqual(['2+', '+', '-', '2-', ''])
    expect(metalChargeOf('3-', [{ formula: 'CN', count: 6 }])).toBe(3)         // [Fe(CN)6]3−: Fe³⁺
    expect(metalChargeOf('x', [{ formula: 'Cl', count: 1 }])).toBeNull()
  })
})

// ── the critic's raw-LaTeX check ───────────────────────────────────────────────
describe('containsRawLatex (generated-figure critic, STATIC layer)', () => {
  it('rejects the chemistry markup that generated figures printed literally', () => {
    for (const bad of ['Fe^{2+}', 'SO_4^{2-}', 'K_{sp}', '\\ce{H2O}', 'A \\rightarrow B', 'A \\to B', '\\text{rate}', '$E_k$', '\\frac{1}{2}mv^2']) {
      expect(containsRawLatex(bad), bad).toBe(true)
    }
  })

  it('does NOT reject plain notation — including the `y = x^2` equations every quadratic graph carries', () => {
    // figureText() includes a graph's `equation`; flagging bare carets would reject every quadratic in every subject.
    for (const ok of ['y = x^2', 'y = x^2 + 3x - 4', 'E = 0.5*m*v^2', '10^-3 M', 'H2O', 'Zn2+ in solution', 'rate = k[A][B]', 'Kinetic Energy (J)']) {
      expect(containsRawLatex(ok), ok).toBe(false)
    }
  })
})

// ── the ASCII-art guard must not delete chemistry ───────────────────────────────
describe('asciiDiagramGuard: a one-line reaction chain is content, not a drawing', () => {
  const reply = (fenced: string) => `Here is the Contact Process:\n\n\`\`\`\n${fenced}\n\`\`\`\n\nEach arrow is one stage.`

  it('keeps "S → SO₂ → SO₃ → H₂SO₄" (it was deleted whole, leaving a dangling lead-in)', () => {
    const text = reply('S → SO₂ → SO₃ → H₂SO₄')
    const r = stripUnbackedAsciiDiagram(text, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(text)
  })

  it('keeps chains with coefficients, ions, states and ASCII arrows', () => {
    for (const chain of ['N₂ + 3H₂ → 2NH₃ → NO', 'Fe → Fe²⁺ → Fe³⁺', 'C(s) + O₂(g) --> CO₂(g) --> H₂CO₃(aq)', 'CH₄ ⇒ CO₂ → H₂O']) {
      expect(isReactionChainLine(chain), chain).toBe(true)
      expect(stripUnbackedAsciiDiagram(reply(chain), false).stripped, chain).toBe(false)
    }
  })

  it('still strips what the rule was written for: a drawn grammar sketch, labelled boxes, words between arrows', () => {
    for (const drawn of ['The dog → barks → loudly\n(subject) (verb) (adverb)', 'reactants → transition state → products', 'A → B → C', 'step 1 → step 2 → step 3']) {
      expect(stripUnbackedAsciiDiagram(reply(drawn), false).stripped, drawn).toBe(true)
    }
  })

  it('a chain needs real chemistry in it, and must be ONE line', () => {
    expect(isReactionChainLine('S → Cl → Na')).toBe(false)                    // bare symbols: nothing says it is a reaction
    expect(isReactionChainLine('SO₂ → SO₃\nSO₃ → H₂SO₄')).toBe(false)         // two lines is layout, not a chain
    expect(isReactionChainLine('SO₂')).toBe(false)                           // no arrow
  })

  it('box-drawing characters are still removed unconditionally, chain or not', () => {
    const r = stripUnbackedAsciiDiagram(reply('SO₂ ─→ SO₃ ─→ H₂SO₄'), true)
    expect(r.stripped).toBe(true)
  })
})
