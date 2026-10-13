/**
 * periodicTrends — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Curated reference data: main-group elements with a defined Pauling EN ────

interface ElementTrendDef {
  symbol: string
  name: string
  period: number
  group: number
  /** Pauling-scale electronegativity. */
  electronegativity: number
  /**
   * CALCULATED atomic radius, picometres (Clementi, Raimondi & Reinhardt, J. Chem. Phys. 47, 1300 (1967)). Verified
   * 2026-10-09: all 17 values equal the "calculated" column of the standard data table; they are NOT covalent radii
   * (this comment used to say they were) and NOT Slater's empirical radii.
   */
  atomicRadiusPm: number
  /** Covalent radius, picometres (Cordero et al., Dalton Trans. 2008, 2832; sp³ carbon). The scale most intro courses use. */
  covalentRadiusPm: number
}

export const ELEMENTS: ElementTrendDef[] = [
  { symbol: 'H', name: 'Hydrogen', period: 1, group: 1, electronegativity: 2.20, atomicRadiusPm: 53, covalentRadiusPm: 31 },
  { symbol: 'Li', name: 'Lithium', period: 2, group: 1, electronegativity: 0.98, atomicRadiusPm: 167, covalentRadiusPm: 128 },
  { symbol: 'Be', name: 'Beryllium', period: 2, group: 2, electronegativity: 1.57, atomicRadiusPm: 112, covalentRadiusPm: 96 },
  { symbol: 'B', name: 'Boron', period: 2, group: 13, electronegativity: 2.04, atomicRadiusPm: 87, covalentRadiusPm: 84 },
  { symbol: 'C', name: 'Carbon', period: 2, group: 14, electronegativity: 2.55, atomicRadiusPm: 67, covalentRadiusPm: 76 },
  { symbol: 'N', name: 'Nitrogen', period: 2, group: 15, electronegativity: 3.04, atomicRadiusPm: 56, covalentRadiusPm: 71 },
  { symbol: 'O', name: 'Oxygen', period: 2, group: 16, electronegativity: 3.44, atomicRadiusPm: 48, covalentRadiusPm: 66 },
  { symbol: 'F', name: 'Fluorine', period: 2, group: 17, electronegativity: 3.98, atomicRadiusPm: 42, covalentRadiusPm: 57 },
  { symbol: 'Na', name: 'Sodium', period: 3, group: 1, electronegativity: 0.93, atomicRadiusPm: 190, covalentRadiusPm: 166 },
  { symbol: 'Mg', name: 'Magnesium', period: 3, group: 2, electronegativity: 1.31, atomicRadiusPm: 145, covalentRadiusPm: 141 },
  { symbol: 'Al', name: 'Aluminium', period: 3, group: 13, electronegativity: 1.61, atomicRadiusPm: 118, covalentRadiusPm: 121 },
  { symbol: 'Si', name: 'Silicon', period: 3, group: 14, electronegativity: 1.90, atomicRadiusPm: 111, covalentRadiusPm: 111 },
  { symbol: 'P', name: 'Phosphorus', period: 3, group: 15, electronegativity: 2.19, atomicRadiusPm: 98, covalentRadiusPm: 107 },
  { symbol: 'S', name: 'Sulfur', period: 3, group: 16, electronegativity: 2.58, atomicRadiusPm: 88, covalentRadiusPm: 105 },
  { symbol: 'Cl', name: 'Chlorine', period: 3, group: 17, electronegativity: 3.16, atomicRadiusPm: 79, covalentRadiusPm: 102 },
  { symbol: 'K', name: 'Potassium', period: 4, group: 1, electronegativity: 0.82, atomicRadiusPm: 243, covalentRadiusPm: 203 },
  { symbol: 'Ca', name: 'Calcium', period: 4, group: 2, electronegativity: 1.00, atomicRadiusPm: 194, covalentRadiusPm: 176 },
]

const ELEMENT_BY_SYMBOL = new Map(ELEMENTS.map((e) => [e.symbol, e]))

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface PeriodicTrendParams {
  element1Symbol: string
  element2Symbol: string
}

export function validatePeriodicTrendParams(raw: unknown): PeriodicTrendParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.element1Symbol !== 'string' || typeof o.element2Symbol !== 'string') return null
  if (!ELEMENT_BY_SYMBOL.has(o.element1Symbol) || !ELEMENT_BY_SYMBOL.has(o.element2Symbol)) return null
  if (o.element1Symbol === o.element2Symbol) return null
  return { element1Symbol: o.element1Symbol, element2Symbol: o.element2Symbol }
}

// ── Deterministic comparison (real curated data; never LLM-generated) ────────

interface TrendComparison {
  e1: ElementTrendDef
  e2: ElementTrendDef
  relationship: 'same-period' | 'same-group' | 'unrelated'
  largerRadiusSymbol: string
  /**
   * The larger radius by COVALENT radii. Equal to `largerRadiusSymbol` for all but 8 unordered pairs (H–O, H–F, Li–Mg,
   * Be–Si, Be–P, Be–S, Be–Cl, B–Cl), where the calculated and covalent scales disagree — a learner told only "H has the
   * larger atomic radius" would be contradicted by the textbook radii they are given. For those the figure says so.
   */
  largerCovalentRadiusSymbol: string
  higherElectronegativitySymbol: string
}

function compare(params: PeriodicTrendParams): TrendComparison {
  const e1 = ELEMENT_BY_SYMBOL.get(params.element1Symbol)!
  const e2 = ELEMENT_BY_SYMBOL.get(params.element2Symbol)!
  const relationship: TrendComparison['relationship'] =
    e1.period === e2.period ? 'same-period' : e1.group === e2.group ? 'same-group' : 'unrelated'
  const largerRadiusSymbol = e1.atomicRadiusPm >= e2.atomicRadiusPm ? e1.symbol : e2.symbol
  const largerCovalentRadiusSymbol = e1.covalentRadiusPm >= e2.covalentRadiusPm ? e1.symbol : e2.symbol
  const higherElectronegativitySymbol = e1.electronegativity >= e2.electronegativity ? e1.symbol : e2.symbol
  return { e1, e2, relationship, largerRadiusSymbol, largerCovalentRadiusSymbol, higherElectronegativitySymbol }
}

const relationshipExplanation: Record<TrendComparison['relationship'], string> = {
  'same-period': 'Across a period, atomic radius shrinks and electronegativity rises with increasing nuclear charge.',
  'same-group': 'Down a group, atomic radius grows (extra electron shells) and electronegativity falls.',
  unrelated: 'These elements are not in the same period or group, so no single periodic trend connects them directly.',
}

/** Do the calculated and covalent radius scales agree on which element is larger? (All but 8 pairs do.) */
export function radiusScalesAgree(c: { largerRadiusSymbol: string; largerCovalentRadiusSymbol: string }): boolean {
  return c.largerRadiusSymbol === c.largerCovalentRadiusSymbol
}

/** The label under the comparison: the plain claim when the scales agree, the honest scale-dependent one when they do not. */
function largerRadiusText(c: TrendComparison): string {
  return radiusScalesAgree(c)
    ? `Larger atomic radius: ${c.largerRadiusSymbol}`
    : `Larger atomic radius depends on the scale: ${c.largerRadiusSymbol} (calculated), ${c.largerCovalentRadiusSymbol} (covalent)`
}

function radiusSentence(c: TrendComparison): string {
  return radiusScalesAgree(c)
    ? `${c.largerRadiusSymbol} has the larger atomic radius`
    : `which atom has the larger radius depends on the scale: calculated (orbital-based) radii make ${c.largerRadiusSymbol} larger, covalent (bond-length) radii make ${c.largerCovalentRadiusSymbol} larger`
}

/** Build a 2-step periodic-trends SceneSpec: both elements' data, then the derived comparison. */
export function buildPeriodicTrendScene(params: PeriodicTrendParams): SceneSpec {
  const c = compare(params)

  const elementObjects: SceneObject[] = [
    { type: 'label', id: 'element-1', position: [-6, 0, 0] as Vec3, text: `${c.e1.symbol} (period ${c.e1.period}, group ${c.e1.group})`, color: '#3b82f6' },
    { type: 'label', id: 'element-2', position: [6, 0, 0] as Vec3, text: `${c.e2.symbol} (period ${c.e2.period}, group ${c.e2.group})`, color: '#22c55e' },
  ]

  const comparisonObjects: SceneObject[] = [
    { type: 'label', id: 'larger-radius', position: [0, round(-4), 0] as Vec3, text: largerRadiusText(c), color: '#f59e0b' },
    { type: 'label', id: 'higher-electronegativity', position: [0, round(-7), 0] as Vec3, text: `Higher electronegativity: ${c.higherElectronegativitySymbol}`, color: '#ef4444' },
  ]

  return {
    id: `periodic-trends-${c.e1.symbol}-${c.e2.symbol}`,
    title: `Periodic Trends: ${c.e1.symbol} vs ${c.e2.symbol}`,
    sceneType: 'comparison',
    teachingGoal: 'Compare two elements\' atomic radius and electronegativity and connect the difference to their position in the periodic table.',
    cameraDistance: 24,
    ariaLabel: `A comparison of ${c.e1.name} and ${c.e2.name}'s atomic radius and electronegativity, based on their periodic table positions.`,
    steps: [
      {
        narration: `${c.e1.name} (${c.e1.symbol}) is in period ${c.e1.period}, group ${c.e1.group}. ${c.e2.name} (${c.e2.symbol}) is in period ${c.e2.period}, group ${c.e2.group}.`,
        objects: elementObjects,
      },
      {
        narration: `${relationshipExplanation[c.relationship]} Here, ${radiusSentence(c)}, and ${c.higherElectronegativitySymbol} has the higher electronegativity.`,
        objects: comparisonObjects,
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkPeriodicTrendConsistency(spec: SceneSpec, params: PeriodicTrendParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const c = compare(params)

  const radiusLabel = objs.find((o) => o.id === 'larger-radius')
  const expectedRadiusText = largerRadiusText(c)
  if (radiusLabel?.text !== expectedRadiusText) {
    errors.push(`larger-radius text "${radiusLabel?.text}" does not match re-derived "${expectedRadiusText}"`)
  }

  const enLabel = objs.find((o) => o.id === 'higher-electronegativity')
  const expectedEnText = `Higher electronegativity: ${c.higherElectronegativitySymbol}`
  if (enLabel?.text !== expectedEnText) {
    errors.push(`higher-electronegativity text "${enLabel?.text}" does not match re-derived "${expectedEnText}"`)
  }

  return { ok: errors.length === 0, errors }
}

