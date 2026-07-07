/**
 * Periodic-trends scene generator (26th parametric generator), closing the
 * "Periodic table / periodicity trends" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md.
 *
 * Like electronShells.ts, this is DATA-driven, not formula-driven: atomic
 * radius and Pauling electronegativity are curated, textbook-fixed reference
 * values (Z = 1-20, main-group elements with a defined electronegativity —
 * noble gases are excluded since they have none on the Pauling scale). The
 * LLM only EXTRACTS which two elements are meant; code looks up their real
 * values and compares them, correct by construction (never invented).
 *
 * Same architecture as the other generators: extractPeriodicTrendParams
 * (LLM, isolated) → validatePeriodicTrendParams (pure) →
 * buildPeriodicTrendScene (pure, deterministic lookup + comparison) →
 * checkPeriodicTrendConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
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
  /** Covalent atomic radius, picometers. */
  atomicRadiusPm: number
}

const ELEMENTS: ElementTrendDef[] = [
  { symbol: 'H', name: 'Hydrogen', period: 1, group: 1, electronegativity: 2.20, atomicRadiusPm: 53 },
  { symbol: 'Li', name: 'Lithium', period: 2, group: 1, electronegativity: 0.98, atomicRadiusPm: 167 },
  { symbol: 'Be', name: 'Beryllium', period: 2, group: 2, electronegativity: 1.57, atomicRadiusPm: 112 },
  { symbol: 'B', name: 'Boron', period: 2, group: 13, electronegativity: 2.04, atomicRadiusPm: 87 },
  { symbol: 'C', name: 'Carbon', period: 2, group: 14, electronegativity: 2.55, atomicRadiusPm: 67 },
  { symbol: 'N', name: 'Nitrogen', period: 2, group: 15, electronegativity: 3.04, atomicRadiusPm: 56 },
  { symbol: 'O', name: 'Oxygen', period: 2, group: 16, electronegativity: 3.44, atomicRadiusPm: 48 },
  { symbol: 'F', name: 'Fluorine', period: 2, group: 17, electronegativity: 3.98, atomicRadiusPm: 42 },
  { symbol: 'Na', name: 'Sodium', period: 3, group: 1, electronegativity: 0.93, atomicRadiusPm: 190 },
  { symbol: 'Mg', name: 'Magnesium', period: 3, group: 2, electronegativity: 1.31, atomicRadiusPm: 145 },
  { symbol: 'Al', name: 'Aluminium', period: 3, group: 13, electronegativity: 1.61, atomicRadiusPm: 118 },
  { symbol: 'Si', name: 'Silicon', period: 3, group: 14, electronegativity: 1.90, atomicRadiusPm: 111 },
  { symbol: 'P', name: 'Phosphorus', period: 3, group: 15, electronegativity: 2.19, atomicRadiusPm: 98 },
  { symbol: 'S', name: 'Sulfur', period: 3, group: 16, electronegativity: 2.58, atomicRadiusPm: 88 },
  { symbol: 'Cl', name: 'Chlorine', period: 3, group: 17, electronegativity: 3.16, atomicRadiusPm: 79 },
  { symbol: 'K', name: 'Potassium', period: 4, group: 1, electronegativity: 0.82, atomicRadiusPm: 243 },
  { symbol: 'Ca', name: 'Calcium', period: 4, group: 2, electronegativity: 1.00, atomicRadiusPm: 194 },
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
  higherElectronegativitySymbol: string
}

function compare(params: PeriodicTrendParams): TrendComparison {
  const e1 = ELEMENT_BY_SYMBOL.get(params.element1Symbol)!
  const e2 = ELEMENT_BY_SYMBOL.get(params.element2Symbol)!
  const relationship: TrendComparison['relationship'] =
    e1.period === e2.period ? 'same-period' : e1.group === e2.group ? 'same-group' : 'unrelated'
  const largerRadiusSymbol = e1.atomicRadiusPm >= e2.atomicRadiusPm ? e1.symbol : e2.symbol
  const higherElectronegativitySymbol = e1.electronegativity >= e2.electronegativity ? e1.symbol : e2.symbol
  return { e1, e2, relationship, largerRadiusSymbol, higherElectronegativitySymbol }
}

const relationshipExplanation: Record<TrendComparison['relationship'], string> = {
  'same-period': 'Across a period, atomic radius shrinks and electronegativity rises with increasing nuclear charge.',
  'same-group': 'Down a group, atomic radius grows (extra electron shells) and electronegativity falls.',
  unrelated: 'These elements are not in the same period or group, so no single periodic trend connects them directly.',
}

/** Build a 2-step periodic-trends SceneSpec: both elements' data, then the derived comparison. */
export function buildPeriodicTrendScene(params: PeriodicTrendParams): SceneSpec {
  const c = compare(params)

  const elementObjects: SceneObject[] = [
    { type: 'label', id: 'element-1', position: [-6, 0, 0] as Vec3, text: `${c.e1.symbol} (period ${c.e1.period}, group ${c.e1.group})`, color: '#3b82f6' },
    { type: 'label', id: 'element-2', position: [6, 0, 0] as Vec3, text: `${c.e2.symbol} (period ${c.e2.period}, group ${c.e2.group})`, color: '#22c55e' },
  ]

  const comparisonObjects: SceneObject[] = [
    { type: 'label', id: 'larger-radius', position: [0, round(-4), 0] as Vec3, text: `Larger atomic radius: ${c.largerRadiusSymbol}`, color: '#f59e0b' },
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
        narration: `${relationshipExplanation[c.relationship]} Here, ${c.largerRadiusSymbol} has the larger atomic radius, and ${c.higherElectronegativitySymbol} has the higher electronegativity.`,
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
  const expectedRadiusText = `Larger atomic radius: ${c.largerRadiusSymbol}`
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

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────

function buildExtractionPrompt(text: string): string {
  const symbols = ELEMENTS.map((e) => e.symbol).join(', ')
  return `Read the explanation below and extract the two elements being compared for a periodic-trend question (atomic radius / electronegativity), if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isPeriodicTrend": true|false, "element1Symbol": "<symbol>", "element2Symbol": "<symbol>"}
- isPeriodicTrend is false if the text is not about comparing two main-group elements' periodic trends.
- Each symbol must be one of: ${symbols} (these are the only elements with curated reference data). If either element mentioned isn't in this list, set isPeriodicTrend to false.`
}

/**
 * Extract validated periodic-trend parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractPeriodicTrendParams(text: string): Promise<PeriodicTrendParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isPeriodicTrend !== true) return null
  return validatePeriodicTrendParams(raw)
}
