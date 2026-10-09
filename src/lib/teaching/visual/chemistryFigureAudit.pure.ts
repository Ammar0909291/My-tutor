/**
 * chemistryFigureAudit — deterministic CHEMISTRY-SEMANTIC validators for visual payloads.
 *
 * WHERE THIS SITS. `sceneSpecValidator.ts` answers "is this a well-formed SceneSpec";
 * `figureCritic.ts` STATIC layer answers "will it render and can the tutor speak from it";
 * `visualSemantics.ts` answers "what is literally on the screen". NONE of them asks
 * whether the CHEMISTRY on the screen is right: a molecule drawn with an impossible
 * valence, an equation that does not balance, an energy diagram whose arrow points up
 * for a negative ΔH, `CO²` for CO₂, or a bar chart whose title promises a dip the data
 * does not show all pass every existing check. This module is that missing layer.
 *
 * PURE. No `@/lib/ai`, no prisma, no network, no clock, no randomness — it only imports
 * type definitions, the pure SceneSpec validator and the pure expression compiler, so it
 * can run in a browser, a Node script or a test (same spirit as `sceneGeneratorPurity`).
 *
 * THE VERDICT RULE (the point of the module):
 *   FAIL             at least one finding is a clear, verifiable defect.
 *   REVIEW_REQUIRED  nothing is provably wrong, but the figure carries chemistry this
 *                    module cannot establish deterministically (reference data such as
 *                    E° or ΔH values, prose claims, a card renderer, a family with no
 *                    verifier) OR a finding is ambiguous.
 *   PASS             every claim this module recognised in the figure was checked and
 *                    held, and nothing claim-bearing was left unchecked.
 * PASS is therefore deliberately hard to earn: "I found no defect" is not "this is
 * correct". `unverified` lists exactly what kept a figure from PASS.
 *
 * VALIDATOR CODES (prefix = family):
 *   A  structural         A-SCHEMA A-DUPLICATE-ID A-NONFINITE A-EMPTY-LABEL A-EMPTY-NARRATION
 *                         A-PLACEHOLDER A-RAW-ID A-DEBUG-TEXT A-BROKEN-REF A-DANGLING-EDGE
 *   F  formula/notation   F-MOJIBAKE F-RAW-LATEX F-CASE F-UNKNOWN-ELEMENT F-STATE-SYMBOL
 *                         F-SUPERSCRIPT-SUBSCRIPT F-PAREN F-SUSPICIOUS-FORMULA F-ION-NO-CHARGE
 *                         F-NOTATION-MIX F-SAME-SPECIES-MIX F-MINUS-MIX F-ASCII-CARET F-DOUBLE-SIGN
 *   G  reaction schemes   G-ATOMS-UNBALANCED G-CHARGE-UNBALANCED G-SCHEMATIC G-AMBIGUOUS-PARSE
 *                         G-ARROW-NOT-REVERSIBLE G-ARROW-CONTRADICTS G-RESONANCE-ARROW G-COEFF
 *                         G-NO-CONDITIONS
 *   E  molecular struct.  E-ELEMENT E-DISCONNECTED E-VALENCE-EXCEEDED E-HYPERVALENT E-RADICAL
 *                         E-TM-NOT-CHECKABLE E-FORMULA-MISMATCH E-LABEL-MISMATCH E-ANGLE-LABEL
 *                         E-VSEPR-MISMATCH E-CHARGE-ARITHMETIC E-COORD-* E-ELEC-*
 *   H  mechanisms         H-ARROW-ENDPOINT H-ARROW-DIRECTION H-MECHANISM-UNVERIFIABLE
 *   I  periodic/element   I-SYMBOL-Z-NAME I-PLACEMENT I-CATEGORY I-SHELL-* I-TREND-* I-LATTICE-*
 *                         I-COLOR-ONLY
 *   J  equilibrium        J-SERIES J-NO-PLATEAU J-STOICH-SIGN J-STOICH-RATIO J-KEQ-CONTRADICTION
 *                         J-REVERSIBLE-ARROW
 *   K  energy profile     K-TS-NOT-ABOVE K-EA K-DH-MISMATCH K-EXO-ENDO K-CATALYST K-ARROW-SIGN
 *                         K-SCALE K-HESS-SUM K-LEVEL-NOT-CONSERVED
 *   L  graphs/charts      L-NONFINITE L-COLLAPSED L-AXIS-LABEL L-UNIT-MISSING L-RANGE L-NO-FEATURE
 *                         L-NOT-MONOTONIC L-BAR-* L-TREND-CLAIM
 *   P  process flow       P-DUPLICATE-STEP P-LIST-AS-PROCESS P-TOO-SHORT P-DANGLING-EDGE
 *   U  coverage           U-NO-VERIFIER U-CARD U-PROSE
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { validateSceneSpec } from '../sceneSpecValidator'
import { compileExpression } from '@/lib/visuals/mathParser'
import {
  ELEMENTS_TABLE, ELEMENT_BY_SYMBOL, isElementSymbol, elementByName, normalizeChemScripts, parseFormulaBody, parseSpecies,
  SUP_CHARS, addAtoms, LIGAND_CHARGES,
} from '@/lib/text/chemSpecies.pure'
import type { ElementInfo, ParsedFormula, ParsedSpecies } from '@/lib/text/chemSpecies.pure'
import { toAsciiNotation } from '@/lib/text/chemSpecies.pure'
import { mapSceneTexts } from './typesetSceneChemistry'

// The element table and the species parser live in `@/lib/text/chemSpecies.pure` (shared with the
// figure-text typesetter); they are re-exported so this module's public API is unchanged.
export { ELEMENTS_TABLE, ELEMENT_BY_SYMBOL, isElementSymbol, elementByName, normalizeChemScripts, parseFormulaBody, parseSpecies }
export type { ElementInfo, ParsedFormula, ParsedSpecies }

// ═══════════════════════════════════════════════════════════════════════════
// 0. Result vocabulary
// ═══════════════════════════════════════════════════════════════════════════

export type AuditVerdict = 'PASS' | 'FAIL' | 'REVIEW_REQUIRED'
export type FindingSeverity = 'FAIL' | 'REVIEW' | 'INFO'

export interface AuditFinding {
  code: string
  severity: FindingSeverity
  detail: string
  /** JSON-path-ish locator, e.g. `steps[2].objects[0].text`. */
  where: string
}

/** What every individual validator returns. */
export interface ValidatorResult {
  verdict: AuditVerdict
  findings: AuditFinding[]
}

/** What the aggregate `auditChemistry*` entry points return. */
export interface FigureAuditResult extends ValidatorResult {
  /** The detected figure family, e.g. `molecule`, `energy-cycle`, `bar-chart`. */
  family: string
  /** Claim classes that WERE checked deterministically and held. */
  verified: string[]
  /** Claim-bearing content that nothing here can establish — why a figure is not PASS. */
  unverified: string[]
}

export interface AuditContext {
  conceptId?: string
  /** The lesson is explicitly about balancing: an unbalanced scheme is then REVIEW, not FAIL. */
  unbalancedIntent?: boolean
  /** Promote the notation-consistency INFO findings to REVIEW. */
  strictNotation?: boolean
  /** Learner-facing variable `effect` strings of a parametric kind (claims the figure must support). */
  parametricEffects?: string[]
}

const fail = (code: string, detail: string, where: string): AuditFinding => ({ code, severity: 'FAIL', detail, where })
const review = (code: string, detail: string, where: string): AuditFinding => ({ code, severity: 'REVIEW', detail, where })
const info = (code: string, detail: string, where: string): AuditFinding => ({ code, severity: 'INFO', detail, where })

/** FAIL beats REVIEW beats PASS; INFO never changes a verdict. */
export function verdictOf(findings: readonly AuditFinding[], unverified: readonly string[] = []): AuditVerdict {
  if (findings.some((f) => f.severity === 'FAIL')) return 'FAIL'
  if (findings.some((f) => f.severity === 'REVIEW') || unverified.length > 0) return 'REVIEW_REQUIRED'
  return 'PASS'
}

export function resultOf(findings: AuditFinding[]): ValidatorResult {
  return { verdict: verdictOf(findings), findings }
}

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const round = (n: number, dp = 3): number => Math.round(n * 10 ** dp) / 10 ** dp

// ═══════════════════════════════════════════════════════════════════════════
// 1. Element reference data (minimal: symbol, Z, name; everything else derived)
// ═══════════════════════════════════════════════════════════════════════════
//
// No full periodic table exists in the repo (electronShells.pure holds Z=1–20 with shell
// counts, periodicTrends.pure holds 17 main-group elements with EN/radius). This is the
// minimal complete table — symbol, Z, name — and nothing else is typed by hand: group,
// period, block, category and valence-electron count are DERIVED from Z below.


export interface Placement { period: number; group: number | null; block: 's' | 'p' | 'd' | 'f' }

const PERIOD_END = [2, 10, 18, 36, 54, 86, 118]

/** Period / group / block from Z alone. Lanthanides and actinides have group null (f-block). */
export function placementOf(z: number): Placement | null {
  if (!Number.isInteger(z) || z < 1 || z > 118) return null
  const pi = PERIOD_END.findIndex((end) => z <= end)
  const period = pi + 1
  const start = pi === 0 ? 1 : PERIOD_END[pi - 1] + 1
  const off = z - start
  if (period === 1) return { period, group: off === 0 ? 1 : 18, block: 's' }
  if (period <= 3) return off < 2 ? { period, group: off + 1, block: 's' } : { period, group: off + 11, block: 'p' }
  if (period <= 5) {
    if (off < 2) return { period, group: off + 1, block: 's' }
    if (off < 12) return { period, group: off + 1, block: 'd' }
    return { period, group: off + 1, block: 'p' }
  }
  if (off < 2) return { period, group: off + 1, block: 's' }
  if (off < 17) return { period, group: null, block: 'f' }
  if (off < 26) return { period, group: off - 13, block: 'd' }
  return { period, group: off - 13, block: 'p' }
}

const METALLOIDS = new Set(['B', 'Si', 'Ge', 'As', 'Sb', 'Te'])
const POST_TRANSITION = new Set(['Al', 'Ga', 'In', 'Sn', 'Tl', 'Pb', 'Bi', 'Po', 'Nh', 'Fl', 'Mc', 'Lv'])
const OTHER_NONMETALS = new Set(['H', 'C', 'N', 'O', 'P', 'S', 'Se'])

/** Every category label that is an acceptable name for this element (lower-case). */
export function categoriesOf(z: number): string[] {
  const p = placementOf(z)
  const el = ELEMENTS_TABLE[z - 1]
  if (!p || !el) return []
  const out: string[] = []
  if (p.block === 'f') out.push(z >= 89 ? 'actinide' : 'lanthanide', 'inner transition metal', 'metal')
  else if (el.symbol === 'H') out.push('nonmetal', 'hydrogen')
  else if (p.group === 1) out.push('alkali metal', 'metal')
  else if (p.group === 2) out.push('alkaline earth metal', 'alkaline-earth metal', 'metal')
  else if (p.group === 17) out.push('halogen', 'nonmetal')
  else if (p.group === 18) out.push('noble gas', 'nonmetal')
  else if (p.block === 'd') out.push('transition metal', 'metal', ...(['Zn', 'Cd', 'Hg'].includes(el.symbol) ? ['post-transition metal'] : []))
  else if (METALLOIDS.has(el.symbol)) out.push('metalloid', 'semimetal')
  else if (POST_TRANSITION.has(el.symbol)) out.push('post-transition metal', 'metal', 'p-block metal')
  else if (OTHER_NONMETALS.has(el.symbol)) out.push('nonmetal')
  else if (el.symbol === 'At') out.push('halogen', 'metalloid')
  return out
}

/** Valence electrons for a main-group element (He = 2); null for d/f-block. */
export function valenceElectronsOf(z: number): number | null {
  const p = placementOf(z)
  if (!p || p.group === null || p.block === 'd') return null
  if (z === 2) return 2
  if (p.group <= 2) return p.group
  return p.group - 10
}

/** Typical valences of main-group elements (bond-order sums of neutral, closed-shell molecules). */
export const TYPICAL_VALENCES: Readonly<Record<string, readonly number[]>> = {
  H: [1], He: [0], Li: [1], Be: [2], B: [3], C: [4], N: [3], O: [2], F: [1], Ne: [0],
  Na: [1], Mg: [2], Al: [3], Si: [4], P: [3, 5], S: [2, 4, 6], Cl: [1, 3, 5, 7], Ar: [0],
  K: [1], Ca: [2], Ga: [3], Ge: [4], As: [3, 5], Se: [2, 4, 6], Br: [1, 3, 5, 7], Kr: [0, 2],
  Rb: [1], Sr: [2], In: [3], Sn: [2, 4], Sb: [3, 5], Te: [2, 4, 6], I: [1, 3, 5, 7], Xe: [0, 2, 4, 6, 8],
  Cs: [1], Ba: [2], Tl: [1, 3], Pb: [2, 4], Bi: [3, 5], At: [1],
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. Notation, species and equation parsing
// ═══════════════════════════════════════════════════════════════════════════


/** Common species, used (a) for case-defect detection and (b) to compare a drawn atom multiset to a named compound. */
export const COMMON_COMPOUNDS: Readonly<Record<string, string>> = {
  water: 'H2O', 'hydrogen peroxide': 'H2O2', 'carbon dioxide': 'CO2', 'carbon monoxide': 'CO', 'nitric oxide': 'NO',
  'nitrogen monoxide': 'NO', 'nitrogen dioxide': 'NO2', 'dinitrogen tetroxide': 'N2O4', 'nitrous oxide': 'N2O',
  ammonia: 'NH3', methane: 'CH4', ethane: 'C2H6', ethene: 'C2H4', ethylene: 'C2H4', ethyne: 'C2H2', acetylene: 'C2H2',
  propane: 'C3H8', butane: 'C4H10', benzene: 'C6H6', ethanol: 'C2H6O', methanol: 'CH4O', glucose: 'C6H12O6',
  'sodium chloride': 'NaCl', 'sodium hydroxide': 'NaOH', 'hydrochloric acid': 'HCl', 'hydrogen chloride': 'HCl',
  'sulfuric acid': 'H2SO4', 'sulphuric acid': 'H2SO4', 'nitric acid': 'HNO3', 'phosphoric acid': 'H3PO4',
  'acetic acid': 'C2H4O2', 'calcium carbonate': 'CaCO3', 'calcium hydroxide': 'Ca(OH)2', 'calcium oxide': 'CaO',
  'magnesium oxide': 'MgO', 'aluminium oxide': 'Al2O3', 'sulfur dioxide': 'SO2', 'sulphur dioxide': 'SO2',
  'sulfur trioxide': 'SO3', 'hydrogen sulfide': 'H2S', 'hydrogen sulphide': 'H2S', 'boron trifluoride': 'BF3',
  'hydrogen fluoride': 'HF', ozone: 'O3', 'potassium permanganate': 'KMnO4', 'silver nitrate': 'AgNO3',
  'copper sulfate': 'CuSO4', 'ammonium chloride': 'NH4Cl', 'sulfur hexafluoride': 'SF6', 'phosphorus pentachloride': 'PCl5',
  'xenon difluoride': 'XeF2', 'carbon tetrachloride': 'CCl4', 'sodium carbonate': 'Na2CO3', 'potassium hydroxide': 'KOH',
}

/** Formulas whose case is unambiguous enough to flag a mis-cased spelling (`nacl`, `Hcl`, `h2o`). */
const CANONICAL_FORMULAS: ReadonlySet<string> = new Set([
  ...Object.values(COMMON_COMPOUNDS), 'O2', 'N2', 'H2', 'Cl2', 'F2', 'Br2', 'I2', 'HBr', 'HI', 'KCl', 'KBr', 'NaBr',
  'NaF', 'LiF', 'CaCl2', 'MgCl2', 'FeCl3', 'CuO', 'Fe2O3', 'Fe3O4', 'ZnO', 'ZnS', 'Na2O', 'K2O', 'SiO2', 'P4O10', 'NaNO3',
  'KNO3', 'Na2SO4', 'CaSO4', 'BaSO4', 'AgCl', 'KI', 'PbI2', 'H2CO3', 'NaHCO3', 'CH3COOH', 'C2H5OH', 'CH3OH',
])




export type ArrowKind = 'forward' | 'reversible' | 'resonance'

const ARROW_RE = /(<=>|<->|⇌|⇄|⇆|⟷|↔|⟶|⟹|⇒|→|-->|->|=>)/g

function arrowKindOf(a: string): ArrowKind {
  if (a === '⇌' || a === '⇄' || a === '⇆' || a === '<=>' || a === '<->') return 'reversible'
  if (a === '↔' || a === '⟷') return 'resonance'
  return 'forward'
}

export interface ParsedEquation {
  text: string
  arrow: string
  arrowKind: ArrowKind
  /** Offset of the arrow in the source text (used to pick the sentence around it). */
  index: number
  lhs: ParsedSpecies[]
  rhs: ParsedSpecies[]
  /** Part of an arrow chain `A → B → C` (a pathway, not one balanced equation). */
  chain: boolean
  /** A side was cut short by something that is not a species (e.g. `CₙH₂ₙ₊₂ + O₂`): balance is not decidable. */
  incomplete: boolean
  atomsBalanced: boolean
  chargeBalanced: boolean
  atomDiff: Record<string, number>
  chargeDiff: number
  /** A species carries digits / a charge / a state / ≥ 2 elements — it is a chemical equation, not `B → C` or `A → 3C`. */
  chemSignal: boolean
  ambiguous: boolean
}

function expandToken(tok: string): string[] {
  if (/^[^+]+\+.+/.test(tok) && !/^\S+\+$/.test(tok)) {
    const parts = tok.split(/(?<=[A-Za-z0-9)\]])\+(?=[0-9½¼¾]?[A-Z([e])/)
    if (parts.length > 1 && parts.every((p) => parseSpecies(p).ok)) {
      return parts.flatMap((p, i) => (i === 0 ? [p] : ['+', p]))
    }
  }
  return [tok]
}

function tokenise(piece: string): string[] {
  return piece.split(/\s+/).filter(Boolean).flatMap((t) => expandToken(t))
}

const COEFF_ONLY = /^(\d+(?:\.\d+)?|\d+\/\d+|[½¼¾⅓⅔])$/
/** Things written after a `+` in an equation that are not species (energy, UV, heat …). */
const ADDENDS = /^(?:energy|heat|light|hν|hv|photons?|catalyst|Δ|ΔT|UV|IR|sunlight|electricity|work|ATP|ADP)$/i

/** A token is a species unless it is an all-caps word that is not a known compound (UV, NOW, PVC). */
function isSpeciesToken(cand: string): boolean {
  const p = parseSpecies(cand)
  if (!p.ok) return false
  const bare = cand.replace(/^\d+(?:\.\d+)?\s*/, '').replace(/^[½¼¾]\s*/, '')
  return !(/^[A-Z]{2,6}$/.test(bare) && !CANONICAL_FORMULAS.has(bare))
}

interface Run { run: string[]; consumedAll: boolean; truncated: boolean }

/** The species run that ENDS a text piece (left side of an arrow). */
function trailingRun(piece: string): Run {
  const toks = tokenise(piece)
  const run: string[] = []
  let i = toks.length - 1
  let expectSpecies = true
  let truncated = false
  while (i >= 0) {
    let t = toks[i]
    let opened = false
    if (/^\(/.test(t) && !t.includes(')')) { t = t.slice(1); opened = true }
    t = t.replace(/^[\s"'“”‘’<>]+/, '')
    if (expectSpecies) {
      let cand = t
      let consume = 1
      if (/^\d*[+-]$/.test(t) && t.length > 1 && i > 0) { cand = `${toks[i - 1]} ${t}`; consume = 2 }
      if (cand && isSpeciesToken(cand)) { run.unshift(cand); i -= consume; expectSpecies = false; if (opened) break; continue }
      if (run.length > 0 && !ADDENDS.test(t)) truncated = true
      break
    }
    if (t === '+') { i--; expectSpecies = true; continue }
    if (COEFF_ONLY.test(t) && run.length) { run[0] = t + ' ' + run[0]; i--; continue }
    break
  }
  return { run, consumedAll: i < 0 && run.length > 0, truncated }
}

/** The species run that STARTS a text piece (right side of an arrow). */
function leadingRun(piece: string): Run {
  const toks = tokenise(piece)
  const run: string[] = []
  let i = 0
  let expectSpecies = true
  let truncated = false
  while (i < toks.length) {
    let t = toks[i].replace(/^[\s"'“”‘’<>]+/, '')
    let closed = false
    if (/\)$/.test(t) && !t.includes('(')) { t = t.slice(0, -1); closed = true }
    if (/[,;:!?]$/.test(t)) { t = t.replace(/[,;:!?]+$/g, ''); closed = true }
    if (expectSpecies) {
      let cand = t
      let consume = 1
      if (COEFF_ONLY.test(t) && i + 1 < toks.length) { cand = `${t} ${toks[i + 1].replace(/[,;:!?)]+$/g, '')}`; consume = 2; if (/[)]$|[,;:!?]$/.test(toks[i + 1])) closed = true }
      else if (i + 1 < toks.length && /^\d*[+-]$/.test(toks[i + 1]) && toks[i + 1].length > 1) { cand = `${t} ${toks[i + 1]}`; consume = 2 }
      let ok = isSpeciesToken(cand)
      if (!ok && cand.endsWith('.')) { cand = cand.slice(0, -1); ok = isSpeciesToken(cand); closed = true }
      if (ok) { run.push(cand); i += consume; expectSpecies = false; if (closed) break; continue }
      if (run.length > 0 && !ADDENDS.test(t.replace(/[.]$/, ''))) truncated = true
      break
    }
    if (t === '+') { i++; expectSpecies = true; continue }
    break
  }
  return { run, consumedAll: i >= toks.length && run.length > 0, truncated }
}

function tally(species: ParsedSpecies[]): { atoms: Record<string, number>; charge: number } {
  const atoms: Record<string, number> = {}
  let charge = 0
  for (const sp of species) {
    addAtoms(atoms, sp.atoms, sp.coeff)
    charge += sp.coeff * sp.charge
  }
  return { atoms, charge }
}

/** A species that makes a string a CHEMICAL equation: digits, brackets, a charge, a state, or ≥ 2 elements. */
function carriesChemistry(s: ParsedSpecies): boolean {
  return s.ok && (/\d/.test(s.body) || s.charge !== 0 || s.state !== null || s.groups >= 2 || /[()[\]]/.test(s.body) || s.isElectron)
}

/** Find every chemical equation (an arrow flanked by species runs) in a piece of learner text. */
export function extractEquations(text: string): ParsedEquation[] {
  const arrows = [...text.matchAll(ARROW_RE)]
  if (!arrows.length) return []
  const pieces: string[] = []
  let last = 0
  for (const a of arrows) {
    pieces.push(text.slice(last, a.index))
    last = (a.index ?? 0) + a[0].length
  }
  pieces.push(text.slice(last))

  const eqs: ParsedEquation[] = []
  for (let k = 0; k < arrows.length; k++) {
    const left = trailingRun(pieces[k])
    const right = leadingRun(pieces[k + 1])
    if (!left.run.length || !right.run.length) continue
    const lhs = left.run.map(parseSpecies)
    const rhs = right.run.map(parseSpecies)
    const chain =
      (k > 0 && trailingRun(pieces[k]).consumedAll && pieces[k].trim().length > 0 && leadingRun(pieces[k]).consumedAll) ||
      (k < arrows.length - 1 && leadingRun(pieces[k + 1]).consumedAll)
    const l = tally(lhs)
    const r = tally(rhs)
    const keys = new Set([...Object.keys(l.atoms), ...Object.keys(r.atoms)])
    const atomDiff: Record<string, number> = {}
    for (const key of keys) {
      const d = round((r.atoms[key] ?? 0) - (l.atoms[key] ?? 0), 6)
      if (Math.abs(d) > 1e-6) atomDiff[key] = d
    }
    const chargeDiff = round(r.charge - l.charge, 6)
    eqs.push({
      text: `${left.run.join(' + ')} ${arrows[k][0]} ${right.run.join(' + ')}`,
      arrow: arrows[k][0],
      arrowKind: arrowKindOf(arrows[k][0]),
      index: arrows[k].index ?? 0,
      lhs, rhs, chain,
      incomplete: left.truncated || right.truncated,
      atomsBalanced: Object.keys(atomDiff).length === 0,
      chargeBalanced: Math.abs(chargeDiff) < 1e-6,
      atomDiff, chargeDiff,
      chemSignal: [...lhs, ...rhs].some(carriesChemistry),
      ambiguous: [...lhs, ...rhs].some((s) => s.ambiguous),
    })
  }
  return eqs
}

/** The sentence of `text` that contains offset `at` (formulas never contain ". "). */
export function sentenceAround(text: string, at: number): string {
  let s = 0
  let e = text.length
  const re = /[.!?;]\s+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const cut = m.index + m[0].length
    if (cut <= at) s = cut
    else { e = m.index + 1; break }
  }
  return text.slice(s, e)
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. Learner-visible text collection
// ═══════════════════════════════════════════════════════════════════════════

export interface TextItem {
  text: string
  where: string
  kind: 'title' | 'goal' | 'aria' | 'narration' | 'label' | 'explainer' | 'predict' | 'axis' | 'other'
  step?: number
  /** The narration of the step this label belongs to (context for arrow/claim checks). */
  stepNarration?: string
}

function pushIf(items: TextItem[], text: unknown, where: string, kind: TextItem['kind'], step?: number, stepNarration?: string): void {
  if (typeof text === 'string' && text.length > 0) items.push({ text, where, kind, step, stepNarration })
}

/** Every string a learner can read or hear from a scene, with a locator. */
export function collectSceneTexts(scene: SceneSpec): TextItem[] {
  const items: TextItem[] = []
  pushIf(items, scene.title, 'title', 'title')
  pushIf(items, scene.teachingGoal, 'teachingGoal', 'goal')
  pushIf(items, scene.ariaLabel, 'ariaLabel', 'aria')
  const ax = scene.stage?.axisLabels
  if (ax) for (const k of ['x', 'y', 'z'] as const) pushIf(items, ax[k], `stage.axisLabels.${k}`, 'axis')
  ;(scene.steps ?? []).forEach((step, i) => {
    const nar = typeof step?.narration === 'string' ? step.narration : undefined
    pushIf(items, nar, `steps[${i}].narration`, 'narration', i)
    ;(step?.objects ?? []).forEach((o, j) => pushIf(items, o?.text, `steps[${i}].objects[${j}].text`, 'label', i, nar))
    if (step?.predict) {
      pushIf(items, step.predict.question, `steps[${i}].predict.question`, 'predict', i)
      ;(step.predict.options ?? []).forEach((o, j) => pushIf(items, o, `steps[${i}].predict.options[${j}]`, 'predict', i))
    }
  })
  const ex = scene.explainer
  if (ex) {
    pushIf(items, ex.title, 'explainer.title', 'explainer')
    pushIf(items, ex.givens, 'explainer.givens', 'explainer')
    pushIf(items, ex.result?.expression, 'explainer.result.expression', 'explainer')
    pushIf(items, ex.result?.value, 'explainer.result.value', 'explainer')
    ;(ex.legend ?? []).forEach((l, i) => pushIf(items, l.label, `explainer.legend[${i}].label`, 'explainer'))
    ;(ex.panels ?? []).forEach((p, i) => {
      pushIf(items, p.heading, `explainer.panels[${i}].heading`, 'explainer')
      pushIf(items, p.body, `explainer.panels[${i}].body`, 'explainer')
      ;(p.lines ?? []).forEach((l, j) => pushIf(items, l, `explainer.panels[${i}].lines[${j}]`, 'explainer'))
    })
    pushIf(items, ex.insight?.heading, 'explainer.insight.heading', 'explainer')
    ;(ex.insight?.bullets ?? []).forEach((b, i) => pushIf(items, b, `explainer.insight.bullets[${i}]`, 'explainer'))
    pushIf(items, ex.insight?.note, 'explainer.insight.note', 'explainer')
  }
  return items
}

/** Every string of a generated/authored VisualSpec (graph / number_line / process_flow / geometry). */
export function collectSpecTexts(spec: Record<string, unknown>): TextItem[] {
  const items: TextItem[] = []
  for (const k of ['title', 'equation', 'xLabel', 'yLabel']) pushIf(items, spec[k], k, k.endsWith('Label') ? 'axis' : 'title')
  if (Array.isArray(spec.steps)) {
    ;(spec.steps as Array<Record<string, unknown> | string>).forEach((s, i) => {
      if (typeof s === 'string') pushIf(items, s, `steps[${i}]`, 'label')
      else { pushIf(items, s?.title, `steps[${i}].title`, 'label'); pushIf(items, s?.note, `steps[${i}].note`, 'label') }
    })
  }
  return items
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. A — STRUCTURAL
// ═══════════════════════════════════════════════════════════════════════════

const MOJIBAKE = /â€|Ã[\u0080-¿]|Â[ -¿]|ï¿½|�/
const RAW_ID = /\b(?:chem|phys|math|bio|cs|eng)\.[a-z0-9_]+\.[a-z0-9_-]+\b/
const INTERNAL_KIND = /\b(?:three_[a-z_]+|statistics_bar_chart|periodic_trends|electron_shells|electric_dipole|process_flow|number_line)\b/
const DEBUG_TEXT = /\b(?:console\.\w+|stack ?trace|TypeError|ReferenceError|Traceback|DEBUG)\b|\bat Object\.|\[object Object\]/
const PLACEHOLDER_WORD = /\b(?:TODO|FIXME|TBD|XXX|lorem ipsum|placeholder text)\b|\?\?\?/i
const PLACEHOLDER_VALUE = /(^|[^A-Za-z0-9_])(undefined|NaN|-?Infinity)(?![A-Za-z0-9_])/
const LATEX = /\\(?:frac|sqrt|cdot|times|alpha|beta|gamma|theta|pi|mu|Delta|sum|int|rightarrow|to|text|mathrm|ce)\b|\$[^$]+\$|\\\(|\\\[|\\ce\{|_\{|\^\{/

/** Learner-text checks that apply to ANY string: mojibake, LaTeX, placeholders, ids, debug text. */
export function scanLearnerText(item: TextItem): AuditFinding[] {
  const out: AuditFinding[] = []
  const t = item.text
  if (MOJIBAKE.test(t)) out.push(fail('F-MOJIBAKE', `corrupted Unicode (mojibake / U+FFFD) in "${clip(t)}"`, item.where))
  if (LATEX.test(t)) out.push(fail('F-RAW-LATEX', `raw LaTeX would be printed literally: "${clip(t)}"`, item.where))
  if (RAW_ID.test(t)) out.push(fail('A-RAW-ID', `internal concept id in learner text: "${clip(t)}"`, item.where))
  if (INTERNAL_KIND.test(t)) out.push(fail('A-RAW-ID', `internal renderer/kind identifier in learner text: "${clip(t)}"`, item.where))
  if (DEBUG_TEXT.test(t)) out.push(fail('A-DEBUG-TEXT', `debug/stack text in learner text: "${clip(t)}"`, item.where))
  if (PLACEHOLDER_WORD.test(t)) out.push(fail('A-PLACEHOLDER', `placeholder text: "${clip(t)}"`, item.where))
  if (PLACEHOLDER_VALUE.test(t)) out.push(fail('A-PLACEHOLDER', `non-value token (undefined / NaN / Infinity) in "${clip(t)}"`, item.where))
  if (/(?:^|[=:]\s*)null\s*$/i.test(t.trim())) out.push(fail('A-PLACEHOLDER', `"null" as a label value: "${clip(t)}"`, item.where))
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(t)) out.push(fail('F-MOJIBAKE', `control characters in "${clip(t)}"`, item.where))
  return out
}

function clip(s: string, n = 70): string { return s.length > n ? s.slice(0, n) + '…' : s }

/** Walk any value; report every non-finite number. */
function walkNumbers(v: unknown, path: string, out: AuditFinding[], seen = new Set<unknown>()): void {
  if (typeof v === 'number') {
    if (!Number.isFinite(v)) out.push(fail('A-NONFINITE', `non-finite number (${String(v)})`, path))
    return
  }
  if (!v || typeof v !== 'object' || seen.has(v)) return
  seen.add(v)
  if (Array.isArray(v)) v.forEach((x, i) => walkNumbers(x, `${path}[${i}]`, out, seen))
  else for (const [k, x] of Object.entries(v)) walkNumbers(x, path ? `${path}.${k}` : k, out, seen)
}

const REF_KEYS = ['from', 'to', 'source', 'target', 'ref', 'refs', 'atoms', 'ids', 'endpoints', 'connects', 'between', 'fromRef', 'toRef']

/** A — structural checks over a SceneSpec (schema + non-finite + ids/refs + placeholders). */
export function validateStructure(scene: SceneSpec): ValidatorResult {
  const out: AuditFinding[] = []
  const schema = validateSceneSpec(scene)
  for (const e of schema.errors) {
    out.push(fail(/^duplicate object id/.test(e.message) ? 'A-DUPLICATE-ID' : 'A-SCHEMA', e.message, e.path))
  }
  walkNumbers(scene, '', out)

  const ids = new Map<string, string>()
  const steps = Array.isArray(scene.steps) ? scene.steps : []
  steps.forEach((step, i) => {
    ;(step?.objects ?? []).forEach((o, j) => {
      if (typeof o?.id === 'string' && o.id) ids.set(o.id, `steps[${i}].objects[${j}]`)
    })
  })
  steps.forEach((step, i) => {
    if (typeof step?.narration === 'string' && step.narration.trim() === '') {
      out.push(review('A-EMPTY-NARRATION', 'step narration is blank — the learner (and tutor) get an empty beat', `steps[${i}].narration`))
    }
    for (const fid of step?.focus ?? []) {
      if (!ids.has(fid)) out.push(fail('A-BROKEN-REF', `step focus references id "${fid}" that no object defines`, `steps[${i}].focus`))
    }
    ;(step?.objects ?? []).forEach((o, j) => {
      if (o?.type === 'node' && typeof o.text === 'string' && o.text.trim() === '') {
        out.push(fail('A-EMPTY-LABEL', 'node carries an empty text label', `steps[${i}].objects[${j}].text`))
      }
      const props = o?.properties
      if (props && typeof props === 'object') {
        for (const k of REF_KEYS) {
          const val = (props as Record<string, unknown>)[k]
          const refs = typeof val === 'string' ? [val] : Array.isArray(val) ? val.filter((x): x is string => typeof x === 'string') : []
          for (const r of refs) {
            if (/^[A-Za-z][\w-]*$/.test(r) && !ids.has(r)) {
              out.push(fail('A-BROKEN-REF', `properties.${k} references id "${r}" that no object defines`, `steps[${i}].objects[${j}].properties.${k}`))
            }
          }
        }
      }
    })
  })
  const panels = scene.explainer?.panels ?? []
  panels.forEach((p, i) => {
    if (p.emphasis && !(p.lines ?? []).includes(p.emphasis)) {
      out.push(fail('A-BROKEN-REF', 'panel emphasis matches none of its lines', `explainer.panels[${i}].emphasis`))
    }
  })
  if (!scene.title || !String(scene.title).trim()) out.push(fail('A-EMPTY-LABEL', 'scene has no title', 'title'))

  // Dangling edges: in a process scene every arrow must start and end on a node.
  if (scene.sceneType === 'process') out.push(...danglingEdges(scene))

  for (const item of collectSceneTexts(scene)) out.push(...scanLearnerText(item))
  return resultOf(out)
}

function atPoint(p: Vec3 | undefined, q: Vec3, tol: number): boolean {
  return Array.isArray(p) && Math.hypot(p[0] - q[0], p[1] - q[1], (p[2] ?? 0) - (q[2] ?? 0)) <= tol
}

/** P/A — arrows whose endpoints land on no node of a process scene. */
function danglingEdges(scene: SceneSpec): AuditFinding[] {
  const out: AuditFinding[] = []
  const nodes: Array<{ pos: Vec3; r: number }> = []
  const arrows: Array<{ o: SceneObject; where: string }> = []
  scene.steps.forEach((step, i) => {
    step.objects.forEach((o, j) => {
      if ((o.type === 'node' || o.type === 'point' || o.type === 'particle') && o.position) nodes.push({ pos: o.position, r: Math.max(0.3, o.radius ?? 0.5) })
      if (o.type === 'arrow' || o.type === 'vector') arrows.push({ o, where: `steps[${i}].objects[${j}]` })
      if ((o.type === 'path' || o.type === 'trajectory') && o.id && /return|cycle|arrow/i.test(o.id) && o.points && o.points.length >= 2) {
        arrows.push({ o: { ...o, from: o.points[0], to: o.points[o.points.length - 1] }, where: `steps[${i}].objects[${j}]` })
      }
    })
  })
  for (const { o, where } of arrows) {
    for (const end of ['from', 'to'] as const) {
      const p = o[end]
      if (!p) continue
      if (!nodes.some((n) => atPoint(n.pos, p, n.r + 0.2))) {
        out.push(review('A-DANGLING-EDGE', `process arrow ${end} end (${p.join(', ')}) lands on no node`, `${where}.${end}`))
      }
    }
  }
  return out
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. F — FORMULA / NOTATION
// ═══════════════════════════════════════════════════════════════════════════

export type NotationStyle = 'unicode' | 'ascii' | 'plain'

/** How a formula token writes its scripts. */
export function notationStyleOf(raw: string): NotationStyle {
  if (/[₀-₉₊₋⁰¹²³⁴-⁹⁺⁻]/.test(raw)) return 'unicode'
  if (/\d|[+-]$|\^/.test(raw.replace(/^\d+(\.\d+)?/, ''))) return 'ascii'
  return 'plain'
}

export interface FormulaToken { raw: string; where: string; style: NotationStyle; species: ParsedSpecies }

/** Elements whose free form is a small molecule — a lone `O³`, `H²`, `P⁴` is a mis-typed O₃, H₂, P₄ (not a squared quantity). */
const MOLECULAR_ELEMENT_SUBSCRIPTS: Readonly<Record<string, readonly number[]>> = { H: [2], N: [2], O: [2, 3], F: [2], Cl: [2], Br: [2], I: [2], P: [4], S: [8] }

const STATE_NEAR_MISS = /^(S|L|G|AQ|Aq|aqu|aq\.|g\.|l\.|s\.|gas|liq|liquid|solid|sol|soln|ag|aqs|aqeous|aquous)$/

function trimCore(chunk: string): string {
  let c = chunk.replace(/^[\s"'“”‘’<>,;:!?]+/, '').replace(/[\s"'“”‘’<>,;:!?]+$/, '')
  c = c.replace(/\.$/, '')
  // a pair of brackets that wraps the whole token: "(Co2)" → "Co2"
  for (let guard = 0; guard < 3; guard++) {
    const open = c[0]
    const close = open === '(' ? ')' : open === '[' ? ']' : ''
    if (!close || !c.endsWith(close)) break
    let depth = 0
    let wrapsAll = true
    for (let i = 0; i < c.length; i++) {
      if (c[i] === open) depth++
      else if (c[i] === close) depth--
      if (depth === 0 && i < c.length - 1) { wrapsAll = false; break }
    }
    if (!wrapsAll) break
    c = c.slice(1, -1)
  }
  if (c.startsWith('(') && !c.includes(')')) c = c.slice(1)
  if (c.endsWith(')') && !c.includes('(')) c = c.slice(0, -1)
  if (c.startsWith('[') && !c.includes(']')) c = c.slice(1)
  if (c.endsWith(']') && !c.includes('[')) c = c.slice(0, -1)
  return c
}

/** Scan one string for formula tokens and formula defects. */
export function scanFormulaTokens(item: TextItem, nameFormulas: ReadonlySet<string>): { tokens: FormulaToken[]; findings: AuditFinding[] } {
  const tokens: FormulaToken[] = []
  const findings: AuditFinding[] = []
  const text = item.text

  // Equation / chain arrows split nothing here — tokens are whitespace chunks.
  for (const m of text.matchAll(/[^\s]+/g)) {
    const chunk = m[0]
    // "CH₂=CH₂", "NaCl–KCl", "H₂/Pt", "CO₂," — a formula ends where an '=', dash, slash or comma joins it to the next thing.
    const parts = /^[\d./]+$/.test(chunk) ? [chunk] : chunk.split(/[=–—,;:/]+/).filter(Boolean)
    for (const part of parts) {
      const core = trimCore(part)
      if (!core) continue
      if (!/[A-Z]/.test(core)) {
        // all lower-case: only `h2o`, `nacl`, `co2` style tokens that can be nothing but a mis-cased compound
        const bare = core.replace(/\((?:s|l|g|aq)\)$/, '').replace(/[⁺⁻+\-−]+$/, '')
        if (/^[a-z0-9]+$/.test(bare) && (/\d/.test(bare) || bare.length >= 3)) {
          const hitLower = [...CANONICAL_FORMULAS].find((f) => f.replace(/[^A-Za-z0-9]/g, '').toLowerCase() === bare)
          if (hitLower) findings.push(fail('F-CASE', `"${core}" is a mis-capitalised "${hitLower}" (element symbols are one capital plus at most one lower-case letter)`, item.where))
        }
        continue
      }

      // CO² / H²O / O³ / NH³: a superscript digit where a subscript belongs.
      if (/[A-Za-z)][²³¹⁴-⁹](?![⁺⁻])/.test(core)) {
        const fixed = core.replace(/[⁰¹²³⁴-⁹]/g, (c) => SUP_CHARS[c] ?? c)
        const p = parseSpecies(fixed)
        const lone = fixed.match(/^([A-Z][a-z]?)(\d)$/)
        const molecular = lone ? MOLECULAR_ELEMENT_SUBSCRIPTS[lone[1]]?.includes(Number(lone[2])) === true : false
        if (p.ok && (p.groups >= 2 || molecular)) {
          findings.push(fail('F-SUPERSCRIPT-SUBSCRIPT', `"${core}" uses a superscript digit where a subscript belongs (should be "${core.replace(/[⁰¹²³⁴-⁹]/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[Number(SUP_CHARS[c])] ?? c)}")`, item.where))
          continue
        }
      }
      if (core === 'HO') {
        findings.push(review('F-SUSPICIOUS-FORMULA', '"HO" is neither water (H₂O) nor hydroxide (OH⁻) — likely a dropped subscript or reversed hydroxide', item.where))
        continue
      }

      const sp = parseSpecies(core)
      if (sp.ok && sp.hasChemSignal) {
        // All-caps letter runs (NOW, SI, OK, HIV) are words unless they are a known compound (CO, NO, HF, KOH).
        if (/^[A-Z]{2,6}$/.test(core) && !CANONICAL_FORMULAS.has(core)) continue
        // Case defect against a compound the figure itself names (carbon dioxide + "Co2").
        const lower = core.toLowerCase()
        for (const f of nameFormulas) {
          if (f.toLowerCase() === lower && f !== core && f !== normalizeChemScripts(core)) {
            findings.push(fail('F-CASE', `"${core}" should be "${f}" — the figure names that compound but spells it with the wrong capitalisation`, item.where))
          }
        }
        tokens.push({ raw: core, where: item.where, style: notationStyleOf(core), species: sp })
        continue
      }
      if (!sp.ok) {
        const flat = normalizeChemScripts(core).replace(/\(([sglaq]+)\)$/i, '').replace(/[^A-Za-z0-9]/g, '')
        if (flat.length >= 3 || /\d/.test(flat)) {
          const hit = [...CANONICAL_FORMULAS].find((f) => f.replace(/[^A-Za-z0-9]/g, '').toLowerCase() === flat.toLowerCase())
          if (hit && flat !== hit.replace(/[^A-Za-z0-9]/g, '') && (/\d/.test(flat) || flat.length >= 3)) {
            findings.push(fail('F-CASE', `"${core}" is a mis-capitalised "${hit}" (element symbols are one capital plus at most one lower-case letter)`, item.where))
            continue
          }
        }
        if (/[₀-₉₊₋⁺⁻]/.test(core) && sp.unknownSymbols.length > 0 && /^[A-Z(\[]/.test(core)) {
          // Unicode subscripts are also used for QUANTITIES (M₁V₁, IE₁, [A]₀, Kb₂), so this can only be a note, never a verdict.
          findings.push(info('F-UNKNOWN-ELEMENT', `"${core}" is written like a formula but "${sp.unknownSymbols.join(', ')}" is not an element symbol (a quantity such as M₁ or IE₁?)`, item.where))
          continue
        }
        if (/[₀-₉]/.test(core) && /[()[\]]/.test(core) && sp.error && /unbalanced|unclosed/.test(sp.error)) {
          findings.push(fail('F-PAREN', `"${core}" has unbalanced brackets (${sp.error})`, item.where))
        }
      }
    }
  }

  // State symbols after a formula: (s) (l) (g) (aq) only.
  for (const m of text.matchAll(/([^\s(]+)\(([A-Za-z.]{1,8})\)/g)) {
    const [, beforeAll, inner] = m
    const before = beforeAll.split(/[[=,;:]/).pop() ?? beforeAll
    if (STATE_NEAR_MISS.test(inner)) {
      const p = parseSpecies(trimCore(before))
      if (p.ok && (p.hasChemSignal || p.groups >= 1) && /[A-Z]/.test(before)) {
        findings.push(fail('F-STATE-SYMBOL', `malformed state symbol "(${inner})" after "${before}" — use (s), (l), (g) or (aq)`, item.where))
      }
    }
  }
  if (/\^[-+\d]/.test(text) && /[A-Z][a-z]?\d*\^/.test(text)) {
    findings.push(info('F-ASCII-CARET', `caret notation would be printed literally: "${clip(text)}"`, item.where))
  }
  if (/\+\s-\s?\d/.test(text) || /-\s?-\s?\d/.test(text)) {
    findings.push(info('F-DOUBLE-SIGN', `adjacent operator and sign ("+ -") reads awkwardly: "${clip(text)}"`, item.where))
  }
  // "<element> ion" with no charge shown on that element.
  for (const m of text.matchAll(/\b([A-Z][a-z]?\d*)\s+(?:ions?|cations?|anions?)\b/g)) {
    const sym = m[1]
    if (isElementSymbol(sym.replace(/\d+$/, '')) && !/[+\-−⁺⁻]/.test(text.slice((m.index ?? 0), (m.index ?? 0) + sym.length + 2))) {
      findings.push(review('F-ION-NO-CHARGE', `"${m[0]}" names a species as an ion but writes no charge on ${sym}`, item.where))
    }
  }
  return { tokens, findings }
}

/** Compound names mentioned in the figure → the formulas they must be spelled as. */
function nameFormulasIn(items: readonly TextItem[]): Set<string> {
  const all = items.map((i) => i.text.toLowerCase()).join(' | ')
  const out = new Set<string>()
  for (const [name, formula] of Object.entries(COMMON_COMPOUNDS)) if (all.includes(name)) out.add(formula)
  return out
}

/** F — formula & notation scan across every learner-visible string of a figure. */
export function validateNotation(items: readonly TextItem[], ctx: AuditContext = {}): ValidatorResult {
  const out: AuditFinding[] = []
  const names = nameFormulasIn(items)
  const tokens: FormulaToken[] = []
  for (const item of items) {
    const r = scanFormulaTokens(item, names)
    tokens.push(...r.tokens)
    out.push(...r.findings)
  }
  const promote = (f: AuditFinding): AuditFinding => (ctx.strictNotation && f.severity === 'INFO' ? { ...f, severity: 'REVIEW' } : f)

  // The same species written two ways in one figure is an inconsistency; different species in different styles is only a style note.
  const bySpecies = new Map<string, Set<NotationStyle>>()
  const styles = new Set<NotationStyle>()
  for (const t of tokens) {
    if (t.style === 'plain') continue
    styles.add(t.style)
    const key = JSON.stringify(Object.entries(t.species.atoms).sort()) + '|' + t.species.charge
    const set = bySpecies.get(key) ?? new Set<NotationStyle>()
    set.add(t.style)
    bySpecies.set(key, set)
  }
  for (const [, set] of bySpecies) {
    if (set.size > 1) {
      const ex = tokens.filter((t) => t.style !== 'plain').filter((t) => JSON.stringify(Object.entries(t.species.atoms).sort()) + '|' + t.species.charge === [...bySpecies.keys()].find((k) => bySpecies.get(k) === set))
      out.push(review('F-SAME-SPECIES-MIX', `the same species is written in both Unicode and ASCII script notation: ${ex.slice(0, 3).map((e) => `"${e.raw}"`).join(' / ')}`, ex[0]?.where ?? ''))
    }
  }
  if (styles.size > 1) {
    const u = tokens.find((t) => t.style === 'unicode')
    const a = tokens.find((t) => t.style === 'ascii')
    out.push(promote(info('F-NOTATION-MIX', `figure mixes Unicode script notation (e.g. "${u?.raw}") with ASCII digit notation (e.g. "${a?.raw}")`, a?.where ?? '')))
  }

  // Minus signs: U+2212 vs ASCII hyphen as a sign / charge in one figure.
  let uni = 0
  let asc = 0
  let ascWhere = ''
  for (const item of items) {
    uni += (item.text.match(/−/g) ?? []).length
    const hy = item.text.match(/(?:^|[\s(=])-\d|[A-Za-z0-9)\]]-(?![A-Za-z0-9])/g) ?? []
    if (hy.length && !ascWhere) ascWhere = item.where
    asc += hy.length
  }
  if (uni > 0 && asc > 0) {
    out.push(promote(info('F-MINUS-MIX', `figure uses both the true minus sign U+2212 (${uni}×) and an ASCII hyphen as a sign/charge (${asc}×)`, ascWhere)))
  }
  return resultOf(out)
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. G — REACTION SCHEMES
// ═══════════════════════════════════════════════════════════════════════════

const EQUILIBRIUM_WORDS = /\b(?:equilibri(?:um|a)|reversible|reversibly|dynamic equilibrium)\b/i
const COMPLETION_WORDS = /\b(?:goes? to completion|irreversible|irreversibly|one-way|complete reaction|reaction is complete)\b/i
const CONDITION_WORDS = /\b(?:catalyst|heat|heated|°C|K\b|atm|kPa|pressure|temperature|light|UV|Δ|reflux|acid|base|solvent|electrolysis|ΔT)\b|\bhν\b/i

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }

/** G — balance, charge, coefficients and arrow-vs-claim for every equation found in the figure's text. */
export function validateReactionSchemes(items: readonly TextItem[], ctx: AuditContext = {}): ValidatorResult & { equations: number } {
  const out: AuditFinding[] = []
  let count = 0
  for (const item of items) {
    for (const eq of extractEquations(item.text)) {
      if (!eq.chemSignal) continue
      count++
      const context = `${sentenceAround(item.text, eq.index)} ${item.stepNarration ?? ''}`
      if (eq.chain) {
        out.push(info('G-SCHEMATIC', `arrow chain "${clip(eq.text)}" is a pathway, not a balanced equation`, item.where))
        continue
      }
      if (eq.incomplete) {
        out.push(info('G-AMBIGUOUS-PARSE', `"${clip(eq.text)}" is only part of the written scheme (a neighbouring term is not a parseable species), so balance is not decidable`, item.where))
        continue
      }
      if (eq.ambiguous) {
        out.push(review('G-AMBIGUOUS-PARSE', `charge/subscript split of a species in "${clip(eq.text)}" is ambiguous; balance not decidable`, item.where))
        continue
      }
      const complete = [...eq.lhs, ...eq.rhs].some((s) => s.hasCoeff || s.state !== null) || eq.lhs.length > 1 || eq.rhs.length > 1
      if (!eq.atomsBalanced) {
        const diff = Object.entries(eq.atomDiff).map(([a, d]) => `${a} ${d > 0 ? '+' : ''}${d}`).join(', ')
        const detail = `"${clip(eq.text)}" does not balance by atoms (right − left: ${diff})`
        if (ctx.unbalancedIntent) out.push(review('G-ATOMS-UNBALANCED', `${detail} — allowed: lesson is about balancing`, item.where))
        else if (complete) out.push(fail('G-ATOMS-UNBALANCED', detail, item.where))
        else out.push(review('G-SCHEMATIC', `${detail}; written as a bare conversion, so it may be intentionally schematic`, item.where))
      } else if (!eq.chargeBalanced) {
        const detail = `"${clip(eq.text)}" balances atoms but not charge (right − left: ${eq.chargeDiff > 0 ? '+' : ''}${eq.chargeDiff})`
        if (ctx.unbalancedIntent) out.push(review('G-CHARGE-UNBALANCED', detail, item.where))
        else if (complete) out.push(fail('G-CHARGE-UNBALANCED', detail, item.where))
        else out.push(review('G-SCHEMATIC', `${detail} (bare half-reaction without electrons)`, item.where))
      }
      // Coefficient sanity.
      for (const sp of [...eq.lhs, ...eq.rhs]) {
        if (sp.hasCoeff && (!(sp.coeff > 0) || sp.coeff > 20)) out.push(review('G-COEFF', `coefficient ${sp.coeff} on "${sp.raw}" is outside 1–20`, item.where))
        if (sp.hasCoeff && ![1, 2, 3, 4].some((d) => Math.abs(sp.coeff * d - Math.round(sp.coeff * d)) < 1e-9)) out.push(review('G-COEFF', `coefficient ${sp.coeff} on "${sp.raw}" is not a simple fraction`, item.where))
      }
      const ints = [...eq.lhs, ...eq.rhs].map((s) => s.coeff)
      // A half-reaction scaled to a common electron count (2Al → 2Al³⁺ + 6e⁻) legitimately shares a factor.
      const hasElectron = [...eq.lhs, ...eq.rhs].some((s) => s.isElectron)
      if (!hasElectron && ints.every((c) => Number.isInteger(c)) && ints.length > 1 && ints.reduce(gcd) > 1) {
        out.push(review('G-COEFF', `coefficients in "${clip(eq.text)}" share a common factor — not in lowest terms`, item.where))
      }
      // Arrow type vs the words around it.
      if (eq.arrowKind === 'forward' && EQUILIBRIUM_WORDS.test(context) && !COMPLETION_WORDS.test(context)) {
        out.push(review('G-ARROW-NOT-REVERSIBLE', `"${clip(eq.text)}" uses a one-way arrow but its text speaks of equilibrium/reversibility — use ⇌`, item.where))
      }
      if (eq.arrowKind === 'reversible' && COMPLETION_WORDS.test(context)) {
        out.push(fail('G-ARROW-CONTRADICTS', `"${clip(eq.text)}" uses ⇌ but its text says the reaction goes to completion / is irreversible`, item.where))
      }
      if (eq.arrowKind === 'resonance' && EQUILIBRIUM_WORDS.test(context)) {
        out.push(review('G-RESONANCE-ARROW', `"${clip(eq.text)}" uses the resonance arrow ↔ where ⇌ denotes equilibrium`, item.where))
      }
    }
  }
  // Named industrial processes should state their conditions.
  const all = items.map((i) => i.text).join(' ')
  if (count > 0 && /\b(?:Haber|Contact process|Ostwald|synthesis of|industrial)\b/i.test(all) && !CONDITION_WORDS.test(all)) {
    out.push(info('G-NO-CONDITIONS', 'a named process is drawn with equations but no conditions (catalyst / T / p) are stated', 'title'))
  }
  return { ...resultOf(out), equations: count }
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. E — MOLECULAR STRUCTURE (molecule / Lewis / coordination scenes)
// ═══════════════════════════════════════════════════════════════════════════

/** What a family verifier reports: findings plus the claim classes it did / did not establish. */
export interface FamilyReport {
  findings: AuditFinding[]
  verified: string[]
  unverified: string[]
}

const emptyReport = (): FamilyReport => ({ findings: [], verified: [], unverified: [] })

type V3 = readonly [number, number, number]
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const dot = (a: V3, b: V3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const norm = (a: V3): number => Math.hypot(a[0], a[1], a[2])
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
function angleDeg(a: V3, b: V3): number {
  const m = norm(a) * norm(b)
  if (m === 0) return NaN
  return (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / m))) * 180) / Math.PI
}

interface FlatObject { o: SceneObject; where: string; step: number }

function flatObjects(scene: SceneSpec): FlatObject[] {
  const out: FlatObject[] = []
  ;(scene.steps ?? []).forEach((step, i) => (step?.objects ?? []).forEach((o, j) => { if (o && typeof o === 'object') out.push({ o, where: `steps[${i}].objects[${j}]`, step: i }) }))
  return out
}

export interface AtomNode { idx: number; symbol: string; pos: Vec3; charge: number; where: string; text: string; id?: string }
export interface BondEdge { a: number; b: number; order: number; orderSpecified: boolean; where: string }
export interface MolGraph { atoms: AtomNode[]; bonds: BondEdge[]; nodes: FlatObject[] }

/** `O`, `N+`, `Cl-`, `Na^+` → {symbol, charge}; null if the text is not exactly one atom. */
export function parseAtomText(text: string): { symbol: string; charge: number } | null {
  const p = parseSpecies(text)
  if (!p.ok || p.isElectron || p.hasCoeff || p.state) return null
  const keys = Object.keys(p.atoms)
  if (keys.length !== 1 || p.atoms[keys[0]] !== 1 || p.body !== keys[0]) return null
  return { symbol: keys[0], charge: p.charge }
}

/** Build the atom/bond graph a scene draws: element-labelled nodes joined by `bond` objects (matched by coordinates). */
export function extractMolecularGraph(scene: SceneSpec): MolGraph {
  const objs = flatObjects(scene)
  const atoms: AtomNode[] = []
  const nodes: FlatObject[] = []
  for (const f of objs) {
    const { o } = f
    if ((o.type === 'node' || o.type === 'particle' || o.type === 'point') && o.position && typeof o.text === 'string') {
      nodes.push(f)
      const a = parseAtomText(o.text)
      if (a) atoms.push({ idx: atoms.length, symbol: a.symbol, charge: a.charge, pos: o.position, where: f.where, text: o.text, id: o.id })
    }
  }
  const find = (p: Vec3 | undefined): number => (p ? atoms.findIndex((a) => atPoint(a.pos, p, 0.01)) : -1)
  const bonds: BondEdge[] = []
  for (const { o, where } of objs) {
    if (o.type !== 'bond' || !o.from || !o.to) continue
    const a = find(o.from)
    const b = find(o.to)
    if (a < 0 || b < 0 || a === b) continue
    const ord = o.properties && typeof (o.properties as Record<string, unknown>).order === 'number' ? ((o.properties as Record<string, unknown>).order as number) : undefined
    bonds.push({ a, b, order: ord ?? 1, orderSpecified: ord !== undefined, where })
  }
  return { atoms, bonds, nodes }
}

function components(n: number, bonds: readonly BondEdge[]): number {
  const parent = Array.from({ length: n }, (_, i) => i)
  const root = (x: number): number => (parent[x] === x ? x : (parent[x] = root(parent[x])))
  for (const b of bonds) parent[root(b.a)] = root(b.b)
  return new Set(parent.map((_, i) => root(i))).size
}

/** VSEPR: (bonded domains, lone pairs on the centre) → geometry name and the legal bond-angle window. */
const VSEPR_TABLE: Record<string, { geometry: string; angle: [number, number] }> = {
  '2,0': { geometry: 'linear', angle: [179.5, 180.5] },
  '3,0': { geometry: 'trigonal planar', angle: [119.5, 120.5] },
  '2,1': { geometry: 'bent', angle: [100, 120] },
  '4,0': { geometry: 'tetrahedral', angle: [109, 110] },
  '3,1': { geometry: 'trigonal pyramidal', angle: [90, 109.6] },
  '2,2': { geometry: 'bent', angle: [89, 109.6] },
  '5,0': { geometry: 'trigonal bipyramidal', angle: [89, 181] },
  '4,1': { geometry: 'seesaw', angle: [85, 181] },
  '3,2': { geometry: 't-shaped', angle: [85, 181] },
  '2,3': { geometry: 'linear', angle: [179.5, 180.5] },
  '6,0': { geometry: 'octahedral', angle: [89, 181] },
  '5,1': { geometry: 'square pyramidal', angle: [85, 181] },
  '4,2': { geometry: 'square planar', angle: [89, 181] },
}

const GEOMETRY_WORDS = ['trigonal bipyramidal', 'trigonal pyramidal', 'trigonal planar', 'square pyramidal', 'square planar', 'tetrahedral', 'octahedral', 'seesaw', 't-shaped', 'linear', 'bent']

function geometryWordIn(text: string): string | null {
  const t = text.toLowerCase().replace(/_/g, ' ')
  return GEOMETRY_WORDS.find((g) => t.includes(g)) ?? null
}

/** Classify the geometry the COORDINATES draw around a centre. null when not recognisable. */
export function classifyDrawnGeometry(centre: V3, neighbours: readonly V3[]): string | null {
  const v = neighbours.map((p) => sub(p, centre))
  const n = v.length
  const angles: number[] = []
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) angles.push(angleDeg(v[i], v[j]))
  const near = (x: number, t: number, tol = 4): boolean => Math.abs(x - t) <= tol
  const coplanar = (): boolean => {
    if (n < 3) return true
    const nrm = cross(v[0], v[1])
    if (norm(nrm) < 1e-6) return v.every((x) => norm(cross(x, v[0])) < 1e-6 * Math.max(1, norm(x) * norm(v[0])) || true)
    return v.every((x) => Math.abs(dot(nrm, x)) / (norm(nrm) * Math.max(norm(x), 1e-9)) < 0.02)
  }
  if (n === 2) return near(angles[0], 180, 3) ? 'linear' : 'bent'
  if (n === 3) {
    if (coplanar()) {
      if (angles.some((a) => near(a, 180, 4))) return 't-shaped'
      return angles.every((a) => near(a, 120, 4)) ? 'trigonal planar' : null
    }
    return 'trigonal pyramidal'
  }
  if (n === 4) {
    if (angles.every((a) => near(a, 109.47, 6))) return 'tetrahedral'
    if (coplanar() && angles.every((a) => near(a, 90, 4) || near(a, 180, 4))) return 'square planar'
    if (angles.some((a) => near(a, 180, 8)) && angles.some((a) => near(a, 120, 8))) return 'seesaw'
    return null
  }
  if (n === 5) {
    const n180 = angles.filter((a) => near(a, 180, 4)).length
    if (n180 === 1 && angles.filter((a) => near(a, 120, 4)).length === 3) return 'trigonal bipyramidal'
    if (n180 === 2 && angles.every((a) => near(a, 90, 5) || near(a, 180, 5))) return 'square pyramidal'
    return null
  }
  if (n === 6) {
    const n180 = angles.filter((a) => near(a, 180, 4)).length
    return n180 === 3 && angles.every((a) => near(a, 90, 4) || near(a, 180, 4)) ? 'octahedral' : null
  }
  return null
}

/** Terminal-ligand bond order inferred from the ligand's own typical valence (H,F,Cl: 1; O,S: 2; N: 3). */
function ligandBondOrder(symbol: string): number | null {
  const v = TYPICAL_VALENCES[symbol]
  return v ? v[0] : null
}

/** E — verify a drawn molecule against valence, connectivity, formula, bond-angle label and VSEPR. */
export function verifyMolecularStructure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const g = extractMolecularGraph(scene)
  if (g.atoms.length < 2 || g.bonds.length < 1) {
    rep.unverified.push('no atom/bond graph could be extracted from this scene')
    return rep
  }

  // Candidate element-ish labels that are not elements.
  for (const f of g.nodes) {
    const t = (f.o.text ?? '').trim()
    if (/^[A-Z][a-z]?$/.test(t) && !isElementSymbol(t)) rep.findings.push(fail('E-ELEMENT', `"${t}" is not an element symbol`, f.where + '.text'))
  }

  const sums = g.atoms.map(() => 0)
  const deg = g.atoms.map(() => 0)
  for (const b of g.bonds) { sums[b.a] += b.order; sums[b.b] += b.order; deg[b.a]++; deg[b.b]++ }

  if (components(g.atoms.length, g.bonds) > 1) {
    rep.findings.push(fail('E-DISCONNECTED', `the drawn atoms form ${components(g.atoms.length, g.bonds)} separate pieces — a single molecule must be one connected component`, 'steps'))
  } else rep.verified.push('single-connected-component')

  const anyOrderKnown = g.bonds.some((b) => b.orderSpecified)
  let tm = false
  const radicals: string[] = []
  let valenceOk = true
  g.atoms.forEach((a, i) => {
    const el = ELEMENT_BY_SYMBOL.get(a.symbol)
    if (!el) return
    const V = valenceElectronsOf(el.z)
    if (V === null) { tm = true; return }
    const p = placementOf(el.z)!
    const nb = V - sums[i] - a.charge
    const around = 2 * sums[i] + nb
    if (nb < 0 || (p.period <= 2 && around > 8)) {
      valenceOk = false
      rep.findings.push(fail('E-VALENCE-EXCEEDED', `${a.symbol} (atom ${i}) has bond-order sum ${sums[i]} with formal charge ${a.charge}: ${nb < 0 ? 'more bonds than valence electrons' : `${around} electrons around a period-${p.period} atom`} — impossible valence`, a.where))
    } else if (p.period >= 3 && around > 8) {
      valenceOk = false
      rep.findings.push(review('E-HYPERVALENT', `${a.symbol} (atom ${i}) has ${around} electrons around it (expanded octet) — allowed for period ≥ 3 but not decidable here`, a.where))
    } else if (nb % 2 !== 0) {
      valenceOk = false
      radicals.push(`${a.symbol}#${i}`)
    }
  })
  if (radicals.length) {
    rep.findings.push(review('E-RADICAL', `${radicals.slice(0, 4).join(', ')} would carry an odd number of non-bonding electrons with these bond orders${anyOrderKnown ? '' : ' — bond order is not encoded (every bond is drawn as a single line), so double/triple bonds cannot be verified'}`, 'steps'))
  }
  if (tm) rep.findings.push(review('E-TM-NOT-CHECKABLE', 'a d/f-block atom is present — valence is not decidable by electron counting', 'steps'))
  if (valenceOk && !tm) rep.verified.push('valence/octet')

  // Centre of the molecule = highest degree.
  const ci = deg.indexOf(Math.max(...deg))
  const centre = g.atoms[ci]
  const nbrIdx = g.bonds.filter((b) => b.a === ci || b.b === ci).map((b) => (b.a === ci ? b.b : b.a))

  // Formula multiset vs the compound the figure names / writes.
  const items = collectSceneTexts(scene)
  const drawn: Record<string, number> = {}
  for (const a of g.atoms) drawn[a.symbol] = (drawn[a.symbol] ?? 0) + 1
  const titleText = `${scene.title ?? ''} ${scene.ariaLabel ?? ''}`.toLowerCase()
  const named = Object.entries(COMMON_COMPOUNDS).filter(([nm]) => titleText.includes(nm)).sort((a, b) => b[0].length - a[0].length)[0]
  const written = (scene.title ?? '').split(/\s+/).map(trimCore).map(parseSpecies).find((s) => s.ok && s.groups >= 1 && (/\d/.test(s.body) || s.groups >= 2))
  const expectedAtoms = named ? parseFormulaBody(named[1]).atoms : written?.atoms
  if (expectedAtoms) {
    const keys = new Set([...Object.keys(drawn), ...Object.keys(expectedAtoms)])
    const bad = [...keys].filter((k) => (drawn[k] ?? 0) !== (expectedAtoms[k] ?? 0))
    if (bad.length) {
      rep.findings.push(fail('E-FORMULA-MISMATCH', `the figure names ${named ? `"${named[0]}" (${named[1]})` : `"${written?.raw}"`} but draws ${Object.entries(drawn).map(([k, v]) => `${v} ${k}`).join(', ')}`, 'title'))
    } else rep.verified.push('atom-multiset-equals-formula')
  } else rep.unverified.push('no compound name/formula in the figure to compare the atom multiset with')

  // "central X atom" / "bonds to N Y atoms" in narration.
  for (const it of items.filter((i) => i.kind === 'narration')) {
    const cm = it.text.match(/central ([A-Z][a-z]?) atom/)
    if (cm && cm[1] !== centre.symbol) rep.findings.push(fail('E-LABEL-MISMATCH', `narration says the central atom is ${cm[1]} but the drawn centre is labelled ${centre.symbol}`, it.where))
    const bm = it.text.match(/bonds to (\d+) ([A-Z][a-z]?) atoms?/)
    if (bm) {
      const cnt = nbrIdx.filter((i) => g.atoms[i].symbol === bm[2]).length
      if (cnt !== Number(bm[1])) rep.findings.push(fail('E-LABEL-MISMATCH', `narration says ${bm[1]} ${bm[2]} atoms are bonded but ${cnt} are drawn`, it.where))
    }
  }

  // Geometry from first principles.
  const nbPos = nbrIdx.map((i) => g.atoms[i].pos as V3)
  const orders = g.bonds.filter((b) => b.a === ci || b.b === ci).map((b) => (b.orderSpecified ? b.order : ligandBondOrder(g.atoms[b.a === ci ? b.b : b.a].symbol)))
  const el = ELEMENT_BY_SYMBOL.get(centre.symbol)
  const V = el ? valenceElectronsOf(el.z) : null
  const drawnGeom = classifyDrawnGeometry(centre.pos as V3, nbPos)
  const titleGeom = geometryWordIn(scene.title ?? '')
  if (V !== null && orders.every((o): o is number => o !== null) && nbrIdx.length >= 2) {
    const sumOrd = (orders as number[]).reduce((a, b) => a + b, 0)
    const lp2 = V - sumOrd - centre.charge
    const lp = lp2 / 2
    const predicted = Number.isInteger(lp) && lp >= 0 ? VSEPR_TABLE[`${nbrIdx.length},${lp}`] : undefined
    if (predicted) {
      if (drawnGeom && drawnGeom !== predicted.geometry && !(predicted.geometry === 'bent' && drawnGeom === 'bent')) {
        rep.findings.push(fail('E-VSEPR-MISMATCH', `${centre.symbol} with ${nbrIdx.length} bonded atoms and ${lp} lone pair(s) is ${predicted.geometry} by VSEPR, but the coordinates draw ${drawnGeom}`, 'steps'))
      } else if (drawnGeom) rep.verified.push('vsepr-geometry-from-coordinates')
      if (titleGeom && titleGeom !== predicted.geometry) {
        rep.findings.push(fail('E-VSEPR-MISMATCH', `the title says ${titleGeom} but VSEPR for ${centre.symbol} (${nbrIdx.length} bonded, ${lp} lone pair(s)) is ${predicted.geometry}`, 'title'))
      } else if (titleGeom) rep.verified.push('title-geometry-matches-vsepr')
      const angs: number[] = []
      for (let i = 0; i < nbPos.length; i++) for (let j = i + 1; j < nbPos.length; j++) angs.push(angleDeg(sub(nbPos[i], centre.pos as V3), sub(nbPos[j], centre.pos as V3)))
      const minAng = Math.min(...angs)
      if (minAng < predicted.angle[0] - 0.01 || minAng > predicted.angle[1] + 0.01) {
        rep.findings.push(fail('E-VSEPR-MISMATCH', `drawn bond angle ${round(minAng, 1)}° is outside the ${predicted.angle[0]}–${predicted.angle[1]}° window VSEPR allows for ${predicted.geometry}`, 'steps'))
      } else rep.verified.push('bond-angle-in-vsepr-window')
      // The number printed on the figure must be the number that is drawn.
      for (const it of items) {
        const am = it.text.match(/(\d+(?:\.\d+)?)\s*°\s*bond angle/)
        if (am && it.kind === 'label') {
          if (Math.abs(Number(am[1]) - minAng) > 0.6) rep.findings.push(fail('E-ANGLE-LABEL', `label says ${am[1]}° but the drawn atoms make ${round(minAng, 1)}°`, it.where))
          else rep.verified.push('bond-angle-label-equals-drawn')
        }
      }
    } else rep.unverified.push(`VSEPR class (${nbrIdx.length} bonded, ${lp} lone pairs) is not in the lookup`)
  } else rep.unverified.push('centre atom / ligand valences not decidable for a VSEPR derivation')

  // Overall charge written on the figure vs formal charges drawn.
  const sumFormal = g.atoms.reduce((a, b) => a + b.charge, 0)
  const chargedWritten = (scene.title ?? '').split(/\s+/).map(trimCore).map(parseSpecies).find((s) => s.ok && s.charge !== 0 && s.groups >= 1)
  if (chargedWritten) {
    if (sumFormal !== chargedWritten.charge) rep.findings.push(fail('E-CHARGE-ARITHMETIC', `title writes "${chargedWritten.raw}" (charge ${chargedWritten.charge}) but the drawn formal charges sum to ${sumFormal}`, 'title'))
    else rep.verified.push('charge-arithmetic')
  }
  return rep
}

// ── coordination complexes ────────────────────────────────────────────────

const LIGAND_CHARGE = LIGAND_CHARGES
const LIGAND_STEM: Readonly<Record<string, string>> = { ammine: 'NH3', aqua: 'H2O', chloro: 'Cl', bromo: 'Br', fluoro: 'F', cyano: 'CN', carbonyl: 'CO', hydroxo: 'OH' }
const MULT_PREFIX: Readonly<Record<string, number>> = { mono: 1, di: 2, tri: 3, tetra: 4, penta: 5, hexa: 6 }
const ROMAN: Readonly<Record<string, number>> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 }

/** E — coordination complexes: ligand count, geometry from coordinates, cis/trans, name prefixes, charge arithmetic. */
export function verifyCoordinationComplex(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const centralF = objs.find((f) => f.o.id === 'central' && f.o.position)
  const ligands = objs.filter((f) => /^lig\d+$/.test(f.o.id ?? '') && f.o.position && typeof f.o.text === 'string')
  if (!centralF || !centralF.o.position || ligands.length < 2) {
    rep.unverified.push('central metal / ligand nodes not identifiable')
    return rep
  }
  const centre = centralF.o.position as V3
  const metal = parseAtomText(centralF.o.text ?? '')
  if (!metal) rep.findings.push(fail('E-ELEMENT', `central label "${centralF.o.text}" is not an element symbol`, centralF.where + '.text'))
  else {
    const el = ELEMENT_BY_SYMBOL.get(metal.symbol)
    if (el && placementOf(el.z)?.block !== 'd') rep.findings.push(review('E-COORD-CENTRE', `central atom ${metal.symbol} is not a d-block metal`, centralF.where + '.text'))
  }
  const formulas = ligands.map((l) => parseSpecies(l.o.text ?? ''))
  formulas.forEach((p, i) => { if (!p.ok) rep.findings.push(fail('E-COORD-LIGAND', `ligand label "${ligands[i].o.text}" is not a parseable formula (${p.error})`, ligands[i].where + '.text')) })

  const n = ligands.length
  const vecs = ligands.map((l) => sub(l.o.position as V3, centre))
  const angles: number[] = []
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) angles.push(angleDeg(vecs[i], vecs[j]))
  const near = (x: number, t: number): boolean => Math.abs(x - t) <= 1
  const planar = n < 3 || vecs.every((v) => Math.abs(v[2] - vecs[0][2]) < 0.01)
  const geomWord = geometryWordIn(scene.title ?? '')
  const drawn: string | null =
    n === 6 && angles.every((a) => near(a, 90) || near(a, 180)) && angles.filter((a) => near(a, 180)).length === 3 ? 'octahedral'
      : n === 4 && planar && angles.every((a) => near(a, 90) || near(a, 180)) ? 'square planar'
        : n === 4 && angles.every((a) => Math.abs(a - 109.47) < 3) ? 'tetrahedral' : null
  if (geomWord && drawn && geomWord !== drawn) rep.findings.push(fail('E-COORD-GEOMETRY', `title says ${geomWord} but the ${n} ligands are drawn ${drawn}`, 'title'))
  else if (geomWord && !drawn) rep.findings.push(fail('E-COORD-GEOMETRY', `title says ${geomWord} but the ${n} drawn ligand directions are not ${geomWord} (angles ${[...new Set(angles.map((a) => Math.round(a)))].join(', ')}°)`, 'steps'))
  else if (geomWord && drawn) rep.verified.push('coordination-geometry-from-coordinates')

  // Narration counts per ligand formula.
  const counts: Record<string, number> = {}
  for (const p of formulas) counts[p.raw] = (counts[p.raw] ?? 0) + 1
  for (const it of collectSceneTexts(scene).filter((i) => i.kind === 'narration')) {
    const one = it.text.match(/(\d+) ([A-Za-z0-9]+) ligands coordinate/)
    const two = it.text.match(/(\d+) ([A-Za-z0-9]+) and (\d+) ([A-Za-z0-9]+) ligands coordinate/)
    const claims = two ? [[two[2], Number(two[1])], [two[4], Number(two[3])]] : one ? [[one[2], Number(one[1])]] : []
    for (const [f, c] of claims as Array<[string, number]>) {
      if ((counts[f] ?? 0) !== c) rep.findings.push(fail('E-LABEL-MISMATCH', `narration says ${c} ${f} ligands but ${counts[f] ?? 0} are drawn`, it.where))
      else rep.verified.push('ligand-counts-match-narration')
    }
  }
  // Name prefix (hexaammine → 6 NH3).
  const nm = (scene.title ?? '').toLowerCase().match(/(mono|di|tri|tetra|penta|hexa)(ammine|aqua|chloro|bromo|fluoro|cyano|carbonyl|hydroxo)/)
  if (nm) {
    const f = LIGAND_STEM[nm[2]]
    if ((counts[f] ?? 0) !== MULT_PREFIX[nm[1]]) rep.findings.push(fail('E-COORD-NAME-COUNT', `name "${nm[0]}" implies ${MULT_PREFIX[nm[1]]} ${f} ligands but ${counts[f] ?? 0} are drawn`, 'title'))
    else rep.verified.push('name-prefix-matches-ligand-count')
  }
  // cis / trans.
  const iso = (scene.title ?? '').match(/\((cis|trans)\)/)?.[1]
  const groups = Object.keys(counts)
  if (iso && groups.length === 2) {
    const first = groups[0]
    const idx = formulas.map((p, i) => (p.raw === first ? i : -1)).filter((i) => i >= 0)
    if (idx.length === 2) {
      const a = angleDeg(vecs[idx[0]], vecs[idx[1]])
      const measured = near(a, 90) ? 'cis' : near(a, 180) ? 'trans' : null
      if (measured && measured !== iso) rep.findings.push(fail('E-COORD-ISOMER', `title says ${iso} but the two ${first} ligands are ${round(a, 0)}° apart (${measured})`, 'title'))
      else if (measured) rep.verified.push('cis-trans-from-coordinates')
      for (const it of collectSceneTexts(scene).filter((i) => i.kind === 'label')) {
        const lm = it.text.match(/^(cis|trans)-isomer: \S+ (adjacent|opposite)$/)
        if (lm && measured && ((lm[2] === 'adjacent') !== (measured === 'cis') || lm[1] !== measured)) {
          rep.findings.push(fail('E-COORD-ISOMER', `label "${it.text}" contradicts the drawn arrangement (${measured})`, it.where))
        }
      }
    }
  }
  // Oxidation state / charge arithmetic.
  const texts = collectSceneTexts(scene)
  const roman = (scene.title ?? '').match(/\(([IVX]+)\)/)?.[1]
  let stated: number | undefined
  for (const t of texts) {
    const a = t.text.match(/central ([A-Z][a-z]?)(\d*[+-]) (?:ion|atom)/)
    const b = t.text.match(/central ([A-Z][a-z]?) (?:ion|atom) \((\d*[+-])\)/)
    const m = a ?? b
    if (m) { stated = parseSpecies(`${m[1]}${m[2]}`).charge; break }
  }
  const ligandsKnown = formulas.every((p) => LIGAND_CHARGE[p.raw] !== undefined)
  if (roman && stated !== undefined) {
    if (ROMAN[roman] !== stated) rep.findings.push(fail('E-COORD-CHARGE', `name says oxidation state (${roman}) = ${ROMAN[roman]} but the metal is written with charge ${stated > 0 ? '+' : ''}${stated}`, 'title'))
    else rep.verified.push('oxidation-state-roman-numeral-matches-charge')
  }
  if (ligandsKnown && stated !== undefined) {
    const overall = stated + formulas.reduce((a, p) => a + (LIGAND_CHARGE[p.raw] ?? 0), 0)
    const complexCharge = texts.map((t) => t.text.match(/\]\s?(\d*[+-])/)?.[1]).find(Boolean)
    if (complexCharge !== undefined) {
      const c = parseSpecies(`X${complexCharge}`).charge
      if (c !== overall) rep.findings.push(fail('E-COORD-CHARGE', `metal ${stated} + ligands ${overall - stated} = ${overall}, but the complex is written with charge ${c}`, 'title'))
      else rep.verified.push('coordination-charge-arithmetic')
    }
  }
  return rep
}

// ═══════════════════════════════════════════════════════════════════════════
// 8. I — PERIODIC / ELEMENT VISUALS, SHELLS, LATTICE, COLOUR-ONLY ENCODING
// ═══════════════════════════════════════════════════════════════════════════

/** Electron count per principal shell by Madelung (n+l) filling — an independent derivation. Exact for Z ≤ 20. */
export function shellOccupancy(z: number): number[] {
  const order: Array<[number, number]> = []
  for (let nl = 1; nl <= 9; nl++) for (let l = 0; l < nl; l++) { const n = nl - l; if (n > l) order.push([n, l]) }
  order.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[0] - b[0])
  const shells: number[] = []
  let left = z
  for (const [n, l] of order) {
    if (left <= 0) break
    const take = Math.min(left, 2 * (2 * l + 1))
    shells[n - 1] = (shells[n - 1] ?? 0) + take
    left -= take
  }
  return shells.map((x) => x ?? 0)
}

/** Verify an electron-shell (Bohr) figure: name↔symbol↔Z, per-shell counts, nesting, valence label vs group. */
export function verifyElectronShellFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const tm = (scene.title ?? '').match(/^(.+?) \(([A-Z][a-z]?), Z=(\d+)\)(?: — electron configuration ([\d, ]+))?/)
  if (!tm) { rep.unverified.push('title does not follow "Name (Sym, Z=n)" so name/symbol/Z cannot be cross-checked'); return rep }
  const [, name, sym, zs, cfg] = tm
  const z = Number(zs)
  const byName = elementByName(name)
  const bySym = ELEMENT_BY_SYMBOL.get(sym)
  if (!bySym) rep.findings.push(fail('I-SYMBOL-Z-NAME', `"${sym}" is not an element symbol`, 'title'))
  else {
    if (bySym.z !== z) rep.findings.push(fail('I-SYMBOL-Z-NAME', `${sym} has atomic number ${bySym.z}, not ${z}`, 'title'))
    if (!byName) rep.findings.push(fail('I-SYMBOL-Z-NAME', `"${name}" is not an element name`, 'title'))
    else if (byName.symbol !== sym) rep.findings.push(fail('I-SYMBOL-Z-NAME', `${name} is ${byName.symbol}, not ${sym}`, 'title'))
    else if (bySym.z === z) rep.verified.push('symbol-z-name-consistent')
  }
  const nuc = objs.find((f) => f.o.id === 'nucleus')
  const nm = nuc?.o.text?.match(/^([A-Z][a-z]?) \((\d+)\+\)$/)
  if (nuc && nm) {
    if (nm[1] !== sym || Number(nm[2]) !== z) rep.findings.push(fail('I-SYMBOL-Z-NAME', `nucleus label "${nuc.o.text}" disagrees with the title (${sym}, Z=${z})`, nuc.where + '.text'))
    else rep.verified.push('nucleus-label-matches-z')
  }
  const electrons = objs.filter((f) => /^e\d+$/.test(f.o.id ?? '') && f.o.position)
  const nPos = (nuc?.o.position ?? [0, 0, 0]) as V3
  const perShell = new Map<number, number[]>()
  for (const e of electrons) {
    const s = Number((e.o.properties as Record<string, unknown> | undefined)?.shell)
    if (!Number.isFinite(s)) continue
    const r = Math.hypot(e.o.position![0] - nPos[0], e.o.position![1] - nPos[1])
    perShell.set(s, [...(perShell.get(s) ?? []), r])
  }
  const drawn = [...perShell.entries()].sort((a, b) => a[0] - b[0]).map(([, rs]) => rs.length)
  if (electrons.length !== z) rep.findings.push(fail('I-SHELL-COUNT', `${electrons.length} electrons are drawn for Z = ${z}`, 'steps'))
  else rep.verified.push('electron-count-equals-z')
  if (z <= 20) {
    const expected = shellOccupancy(z)
    if (drawn.length !== expected.length || drawn.some((d, i) => d !== expected[i])) rep.findings.push(fail('I-SHELL-COUNT', `drawn shell occupancy [${drawn}] differs from the Aufbau/Madelung occupancy [${expected}]`, 'steps'))
    else rep.verified.push('shell-occupancy-equals-aufbau')
    if (cfg) {
      const titled = cfg.split(',').map((x) => Number(x.trim())).filter((x) => Number.isFinite(x))
      if (titled.length !== expected.length || titled.some((d, i) => d !== expected[i])) rep.findings.push(fail('I-SHELL-COUNT', `title configuration ${cfg.trim()} differs from the Aufbau occupancy [${expected}]`, 'title'))
    }
  } else rep.unverified.push(`Z = ${z} > 20: Madelung exceptions (Cr, Cu, …) make shell occupancy a reference-data question`)
  const radii = [...perShell.entries()].sort((a, b) => a[0] - b[0]).map(([, rs]) => rs)
  if (radii.some((rs) => Math.max(...rs) - Math.min(...rs) > 0.4)) rep.findings.push(fail('I-SHELL-RING', 'electrons of one shell are not at one radius', 'steps'))
  for (let i = 1; i < radii.length; i++) if (!(radii[i][0] > radii[i - 1][0])) { rep.findings.push(fail('I-SHELL-RING', 'shells do not nest outward', 'steps')); break }
  const vl = objs.find((f) => f.o.id === 'valence')
  const vm = vl?.o.text?.match(/^(\d+) valence electrons?$/)
  if (vl && vm) {
    const v = Number(vm[1])
    const outer = drawn[drawn.length - 1]
    if (v !== outer) rep.findings.push(fail('I-SHELL-VALENCE', `valence label says ${v} but the outer shell holds ${outer}`, vl.where + '.text'))
    if ((v === 1) !== /electron$/.test(vl.o.text ?? '')) rep.findings.push(fail('I-SHELL-VALENCE', `"${vl.o.text}" has wrong singular/plural`, vl.where + '.text'))
    const fromGroup = bySym ? valenceElectronsOf(bySym.z) : null
    if (fromGroup !== null && z <= 20 && v !== (z === 2 ? 2 : fromGroup)) rep.findings.push(fail('I-SHELL-VALENCE', `${sym} is in group ${placementOf(z)?.group}: it has ${fromGroup} valence electrons, not ${v}`, vl.where + '.text'))
    else if (fromGroup !== null) rep.verified.push('valence-matches-group')
  }
  return rep
}

/** Trend direction decidable from placement alone (null when it is a data question). */
function trendRule(a: { period: number; group: number }, b: { period: number; group: number }): { largerRadius: 0 | 1; higherEN: 0 | 1 } | null {
  const pos = (g: number): number => (g <= 2 ? g : g - 10)
  const pa = pos(a.group)
  const pb = pos(b.group)
  if (a.period === b.period) { if (pa === pb) return null; return { largerRadius: pa < pb ? 0 : 1, higherEN: pa > pb ? 0 : 1 } }
  if (a.group === b.group) return { largerRadius: a.period > b.period ? 0 : 1, higherEN: a.period < b.period ? 0 : 1 }
  // diagonal dominance: lower AND not further right ⇒ larger radius, lower EN
  if (a.period > b.period && pa <= pb) return { largerRadius: 0, higherEN: 1 }
  if (b.period > a.period && pb <= pa) return { largerRadius: 1, higherEN: 0 }
  return null
}

/** Verify a "Periodic Trends: A vs B" figure against group/period derived from Z and the trend rules. */
export function verifyPeriodicTrendFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const labels = objs.filter((f) => f.o.id === 'element-1' || f.o.id === 'element-2')
  const el: Array<{ sym: string; period: number; group: number } | null> = [null, null]
  labels.forEach((f, i) => {
    const m = f.o.text?.match(/^([A-Z][a-z]?) \(period (\d+), group (\d+)\)$/)
    if (!m) return
    const e = ELEMENT_BY_SYMBOL.get(m[1])
    if (!e) { rep.findings.push(fail('I-SYMBOL-Z-NAME', `"${m[1]}" is not an element symbol`, f.where + '.text')); return }
    const pl = placementOf(e.z)!
    if (pl.period !== Number(m[2]) || pl.group !== Number(m[3])) rep.findings.push(fail('I-PLACEMENT', `${m[1]} (Z=${e.z}) sits in period ${pl.period}, group ${pl.group} — the figure says period ${m[2]}, group ${m[3]}`, f.where + '.text'))
    else rep.verified.push('group-period-from-z')
    el[i] = { sym: m[1], period: pl.period, group: pl.group ?? 0 }
  })
  const nar = collectSceneTexts(scene).filter((i) => i.kind === 'narration')
  for (const it of nar) {
    for (const m of it.text.matchAll(/([A-Z][a-z]+) \(([A-Z][a-z]?)\) is in period (\d+), group (\d+)/g)) {
      const e = ELEMENT_BY_SYMBOL.get(m[2])
      const byName = elementByName(m[1])
      if (!e || !byName || byName.symbol !== m[2]) rep.findings.push(fail('I-SYMBOL-Z-NAME', `"${m[1]} (${m[2]})" is not a matching name/symbol pair`, it.where))
      else {
        const pl = placementOf(e.z)!
        if (pl.period !== Number(m[3]) || pl.group !== Number(m[4])) rep.findings.push(fail('I-PLACEMENT', `narration places ${m[2]} in period ${m[3]}, group ${m[4]}; it is period ${pl.period}, group ${pl.group}`, it.where))
      }
    }
  }
  if (el[0] && el[1]) {
    const rel = el[0].period === el[1].period ? 'period' : el[0].group === el[1].group ? 'group' : 'none'
    const text = nar.map((n) => n.text).join(' ')
    const claims = /Across a period/.test(text) ? 'period' : /Down a group/.test(text) ? 'group' : /not in the same period or group/.test(text) ? 'none' : null
    if (claims && claims !== rel) rep.findings.push(fail('I-TREND-RELATION', `narration describes a ${claims === 'none' ? 'cross' : 'same-' + claims} comparison but the elements are ${rel === 'none' ? 'in neither the same period nor group' : 'in the same ' + rel}`, 'steps[1].narration'))
    else if (claims) rep.verified.push('trend-relation-text-matches-placement')
    const rule = trendRule(el[0], el[1])
    const lr = objs.find((f) => f.o.id === 'larger-radius')?.o.text?.match(/Larger atomic radius: ([A-Z][a-z]?)$/)?.[1]
    const en = objs.find((f) => f.o.id === 'higher-electronegativity')?.o.text?.match(/Higher electronegativity: ([A-Z][a-z]?)$/)?.[1]
    if (rule) {
      const expR = [el[0].sym, el[1].sym][rule.largerRadius]
      const expE = [el[0].sym, el[1].sym][rule.higherEN]
      if (lr && lr !== expR) rep.findings.push(fail('I-TREND-CLAIM', `"Larger atomic radius: ${lr}" contradicts the periodic trend (${expR} is lower/left of ${lr === el[0].sym ? el[1].sym : el[0].sym})`, 'steps[1]'))
      else if (lr) rep.verified.push('atomic-radius-claim-follows-trend')
      if (en && en !== expE) rep.findings.push(fail('I-TREND-CLAIM', `"Higher electronegativity: ${en}" contradicts the periodic trend (expected ${expE})`, 'steps[1]'))
      else if (en) rep.verified.push('electronegativity-claim-follows-trend')
    } else if (lr || en) rep.unverified.push(`${el[0].sym} vs ${el[1].sym}: radius/electronegativity order is not decidable from placement alone (needs measured data)`)
  } else rep.unverified.push('element labels not parseable')
  return rep
}

/** Cubic unit-cell figure: sharing rule (corner 1/8, face 1/2, body 1) vs the printed atoms-per-cell. */
export function verifyLatticeFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene).map((f) => f.o)
  const role = (o: SceneObject): string | undefined => (o.properties as Record<string, unknown> | undefined)?.role as string | undefined
  const corners = objs.filter((o) => role(o) === 'corner').length
  const faces = objs.filter((o) => role(o) === 'face').length
  const bodies = objs.filter((o) => role(o) === 'body').length
  if (corners === 0) { rep.unverified.push('no role-tagged lattice atoms'); return rep }
  const effective = corners / 8 + faces / 2 + bodies
  const shown = Number(objs.find((o) => o.id === 'count')?.text?.match(/^(\d+) atoms? \/ cell$/)?.[1])
  const titleN = Number((scene.title ?? '').match(/(\d+) atoms? per cell/)?.[1])
  if (corners !== 8) rep.findings.push(fail('I-LATTICE-COUNT', `${corners} corner atoms drawn; a cube has 8`, 'steps'))
  for (const [label, n] of [['label', shown], ['title', titleN]] as const) {
    if (Number.isFinite(n) && Math.abs(n - effective) > 1e-9) rep.findings.push(fail('I-LATTICE-COUNT', `${label} says ${n} atoms per cell but the sharing rule over ${corners} corner, ${faces} face, ${bodies} body atoms gives ${effective}`, label === 'title' ? 'title' : 'steps'))
  }
  const name = (scene.title ?? '').toLowerCase()
  const kind = faces === 6 ? 'face' : bodies === 1 ? 'body' : 'simple'
  const claimed = name.includes('face-centred') || name.includes('face-centered') ? 'face' : name.includes('body-centred') || name.includes('body-centered') ? 'body' : name.includes('simple') ? 'simple' : null
  if (claimed && claimed !== kind) rep.findings.push(fail('I-LATTICE-COUNT', `title names a ${claimed}-centred/simple cell but the drawn atoms make a ${kind} cell`, 'title'))
  else if (claimed) rep.verified.push('lattice-name-matches-geometry')
  if (!rep.findings.length) rep.verified.push('sharing-rule-atoms-per-cell')
  return rep
}

function hueFamily(hex: string | undefined): string | null {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return null
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max - min < 0.2) return null
  let h = 0
  if (max === r) h = ((g - b) / (max - min)) % 6
  else if (max === g) h = (b - r) / (max - min) + 2
  else h = (r - g) / (max - min) + 4
  h = (h * 60 + 360) % 360
  return h < 20 || h >= 340 ? 'red' : h < 45 ? 'orange' : h < 70 ? 'yellow' : h < 170 ? 'green' : h < 200 ? 'cyan' : h < 260 ? 'blue' : 'purple'
}

/** I — a category carried ONLY by hue: ≥ 2 colour families on unlabelled markers of the same size, none keyed by a labelled object. */
export function validateColorOnlyEncoding(scene: SceneSpec): ValidatorResult {
  const out: AuditFinding[] = []
  const objs = flatObjects(scene).map((f) => f.o)
  const keyed = new Set(objs.filter((o) => typeof o.text === 'string' && o.text.trim()).map((o) => hueFamily(o.color)).filter(Boolean))
  const bySize = new Map<string, Map<string, number>>()
  for (const o of objs) {
    if (!(o.type === 'node' || o.type === 'particle' || o.type === 'point') || (o.text && o.text.trim())) continue
    const fam = hueFamily(o.color)
    if (!fam) continue
    const key = String(o.radius ?? 'default')
    const m = bySize.get(key) ?? new Map<string, number>()
    m.set(fam, (m.get(fam) ?? 0) + 1)
    bySize.set(key, m)
  }
  for (const [size, fams] of bySize) {
    const unkeyed = [...fams.keys()].filter((f) => !keyed.has(f))
    if (fams.size >= 2 && unkeyed.length >= 2) {
      out.push(review('I-COLOR-ONLY', `unlabelled markers of radius ${size} are told apart only by colour (${[...fams.entries()].map(([f, n]) => `${f}×${n}`).join(', ')}); no label, legend or pattern keys them — a colour-blind learner cannot separate the categories`, 'steps'))
    }
  }
  return resultOf(out)
}

// ═══════════════════════════════════════════════════════════════════════════
// 9. H — MECHANISM ARROWS (electron pushing)
// ═══════════════════════════════════════════════════════════════════════════

const MECHANISM_WORDS = /\b(?:mechanism|curly arrow|electron[- ]pushing|nucleophilic attack|nucleophile attacks|SN1|SN2|E1cB|carbocation intermediate)\b/i

/**
 * H — electron-pushing arrows must start on an electron SOURCE (a lone pair or a bond) and end on an
 * ACCEPTING site (an atom, or the middle of a bond that forms). An arrow is recognised by
 * `properties.mechanism === 'curly'` (or id `curly*`); lone pairs by `properties.kind === 'lone-pair'`.
 * A mechanism-worded figure with no machine-readable arrows is REVIEW_REQUIRED.
 */
export function validateMechanismArrows(scene: SceneSpec): ValidatorResult {
  const out: AuditFinding[] = []
  const objs = flatObjects(scene)
  const prop = (o: SceneObject, k: string): unknown => (o.properties as Record<string, unknown> | undefined)?.[k]
  const arrows = objs.filter((f) => (f.o.type === 'arrow' || f.o.type === 'vector' || f.o.type === 'path') && (prop(f.o, 'mechanism') === 'curly' || /^curly/.test(f.o.id ?? '')))
  const g = extractMolecularGraph(scene)
  const lonePairs = objs.filter((f) => prop(f.o, 'kind') === 'lone-pair' && (f.o.position || f.o.from))
  const text = collectSceneTexts(scene).map((t) => t.text).join(' ')
  if (arrows.length === 0) {
    if (MECHANISM_WORDS.test(text)) out.push(review('H-MECHANISM-UNVERIFIABLE', 'the figure talks about a mechanism but carries no machine-readable electron-pushing arrows to verify', 'title'))
    return resultOf(out)
  }
  const sourceAt = (p: Vec3): 'lone-pair' | 'bond' | null => {
    if (lonePairs.some((l) => atPoint((l.o.position ?? l.o.from) as Vec3, p, 0.35))) return 'lone-pair'
    for (const b of g.bonds) {
      const m: Vec3 = [(g.atoms[b.a].pos[0] + g.atoms[b.b].pos[0]) / 2, (g.atoms[b.a].pos[1] + g.atoms[b.b].pos[1]) / 2, (g.atoms[b.a].pos[2] + g.atoms[b.b].pos[2]) / 2]
      if (atPoint(m, p, 0.45)) return 'bond'
    }
    return null
  }
  const sinkAt = (p: Vec3): 'atom' | 'bond' | null => {
    if (g.atoms.some((a) => atPoint(a.pos, p, 0.8))) return 'atom'
    return sourceAt(p) === 'bond' ? 'bond' : null
  }
  for (const { o, where } of arrows) {
    const from = (o.from ?? o.points?.[0]) as Vec3 | undefined
    const to = (o.to ?? o.points?.[o.points.length - 1]) as Vec3 | undefined
    if (!from || !to) { out.push(fail('H-ARROW-ENDPOINT', 'electron-pushing arrow has no start/end', where)); continue }
    const s = sourceAt(from)
    const t = sinkAt(to)
    if (!s) {
      // tail on an atom: legitimate only for a lone pair drawn as part of the atom label; otherwise wrong end
      const tailOnAtom = g.atoms.some((a) => atPoint(a.pos, from, 0.8))
      const headOnSource = sourceAt(to) !== null
      out.push(tailOnAtom && headOnSource
        ? fail('H-ARROW-DIRECTION', 'arrow tail is on an atom and its head on a lone pair / bond — the arrow runs from the electron SINK to the source (reversed)', where)
        : fail('H-ARROW-ENDPOINT', 'arrow tail is not on a lone pair or a bond (electrons must come from somewhere)', `${where}.from`))
    }
    if (!t) out.push(fail('H-ARROW-ENDPOINT', 'arrow head lands on no atom or bond', `${where}.to`))
  }
  return resultOf(out)
}

// ═══════════════════════════════════════════════════════════════════════════
// 10. J — EQUILIBRIUM / CONCENTRATION–TIME
// ═══════════════════════════════════════════════════════════════════════════

export interface ConcSeries {
  name: string
  role?: 'reactant' | 'product'
  /** Stoichiometric coefficient ν in the balanced equation. */
  coeff?: number
  x: number[]
  y: number[]
}

export interface EquilibriumOptions {
  /** The figure/title says it shows an equilibrium (so a plateau is required). */
  equilibriumStated?: boolean
  /** Equilibrium constant stated on the figure (Kc), when known. */
  keq?: number
}

/**
 * J — concentration-vs-time data: finite, increasing time, non-negative concentration, plateau at the
 * end, reactants fall while products rise in stoichiometric proportion, and Q(end) agrees with K.
 */
export function validateEquilibriumSeries(series: readonly ConcSeries[], opts: EquilibriumOptions = {}): ValidatorResult {
  const out: AuditFinding[] = []
  if (series.length === 0) return resultOf([review('J-SERIES', 'no concentration series to check', 'series')])
  const deltas: Array<{ s: ConcSeries; d: number; end: number; start: number }> = []
  for (const [si, s] of series.entries()) {
    const w = `series[${si}](${s.name})`
    if (s.x.length < 3 || s.x.length !== s.y.length) { out.push(fail('J-SERIES', 'a series needs ≥ 3 points and equal x/y lengths', w)); continue }
    if (![...s.x, ...s.y].every(isNum)) { out.push(fail('J-SERIES', 'series contains non-finite values', w)); continue }
    if (s.x.some((x, i) => i > 0 && !(x > s.x[i - 1]))) out.push(fail('J-SERIES', 'time axis is not strictly increasing', w))
    if (s.y.some((y) => y < -1e-9)) out.push(fail('J-SERIES', 'negative concentration', w))
    const ymax = Math.max(...s.y)
    const ymin = Math.min(...s.y)
    const span = s.x[s.x.length - 1] - s.x[0]
    const tailStart = s.x[s.x.length - 1] - 0.1 * span
    const tail = s.y.filter((_, i) => s.x[i] >= tailStart)
    const flat = (Math.max(...tail) - Math.min(...tail)) <= 0.03 * Math.max(ymax - ymin, 1e-12) || ymax - ymin < 1e-12
    if (!flat) out.push(opts.equilibriumStated ? fail('J-NO-PLATEAU', 'the curve is still changing over the last 10% of time — no plateau, so no equilibrium is shown', w) : info('J-NO-PLATEAU', 'curve has not levelled off by the end of the time axis', w))
    deltas.push({ s, d: s.y[s.y.length - 1] - s.y[0], end: s.y[s.y.length - 1], start: s.y[0] })
  }
  const tol = (x: number): number => 1e-9 + 0.01 * Math.abs(x)
  const reactants = deltas.filter((d) => d.s.role === 'reactant')
  const products = deltas.filter((d) => d.s.role === 'product')
  for (const r of reactants) if (r.d > tol(r.start)) out.push(fail('J-STOICH-SIGN', `reactant "${r.s.name}" RISES (${round(r.start, 4)} → ${round(r.end, 4)})`, `series(${r.s.name})`))
  for (const p of products) if (p.d < -tol(p.start)) out.push(fail('J-STOICH-SIGN', `product "${p.s.name}" FALLS (${round(p.start, 4)} → ${round(p.end, 4)})`, `series(${p.s.name})`))
  if (reactants.length && products.length && reactants.every((r) => r.d > 0) && products.every((p) => p.d > 0)) {
    out.push(fail('J-STOICH-SIGN', 'reactants and products all rise together — conservation of atoms forbids it', 'series'))
  }
  const withNu = deltas.filter((d) => isNum(d.s.coeff) && (d.s.coeff as number) > 0 && d.s.role)
  if (withNu.length >= 2) {
    const ext = withNu.map((d) => Math.abs(d.d) / (d.s.coeff as number))
    const ref = ext[0]
    if (ext.some((e) => Math.abs(e - ref) > 0.08 * Math.max(ref, 1e-12))) {
      out.push(fail('J-STOICH-RATIO', `changes in concentration are not in the ratio of the coefficients (extent per ν: ${ext.map((e) => round(e, 4)).join(', ')})`, 'series'))
    }
  }
  if (isNum(opts.keq) && opts.keq > 0 && reactants.length && products.length && withNu.length === deltas.length) {
    let logQ = 0
    let ok = true
    for (const d of deltas) {
      if (d.end <= 0) { ok = false; break }
      logQ += (d.s.role === 'product' ? 1 : -1) * (d.s.coeff as number) * Math.log10(d.end)
    }
    if (ok && Math.abs(logQ - Math.log10(opts.keq)) > 0.15) {
      out.push(fail('J-KEQ-CONTRADICTION', `Q at the end of the curve is 10^${round(logQ, 2)} but the stated K is 10^${round(Math.log10(opts.keq), 2)}`, 'series'))
    }
  }
  return resultOf(out)
}

/** J — pull concentration series out of a scene whose paths are tagged `properties.role` reactant/product. */
export function extractEquilibriumSeries(scene: SceneSpec): ConcSeries[] {
  const out: ConcSeries[] = []
  for (const { o } of flatObjects(scene)) {
    if ((o.type !== 'path' && o.type !== 'trajectory') || !o.points || o.points.length < 3) continue
    const props = (o.properties ?? {}) as Record<string, unknown>
    const hay = `${o.text ?? ''} ${o.id ?? ''} ${String(props.role ?? '')} ${String(props.species ?? '')}`
    const role = /reactant/i.test(hay) ? 'reactant' : /product/i.test(hay) ? 'product' : undefined
    if (!role) continue
    out.push({ name: String(props.species ?? o.text ?? o.id ?? role), role, coeff: typeof props.coeff === 'number' ? props.coeff : undefined, x: o.points.map((p) => p[0]), y: o.points.map((p) => p[1]) })
  }
  return out
}

// ═══════════════════════════════════════════════════════════════════════════
// 11. K — ENERGY PROFILES AND ENERGY CYCLES
// ═══════════════════════════════════════════════════════════════════════════

export interface EnergyProfileModel {
  reactant: number
  product: number
  ts: number
  tsCatalysed?: number
  productCatalysed?: number
  /** ΔH as printed on the figure. */
  deltaH?: number
  /** Ea as printed on the figure. */
  ea?: number
  claim?: 'exothermic' | 'endothermic'
}

/** K — reactant / product / transition-state levels, Ea, ΔH sign, exo/endo wording, catalyst behaviour. */
export function validateEnergyProfile(m: EnergyProfileModel): ValidatorResult {
  const out: AuditFinding[] = []
  const nums = [m.reactant, m.product, m.ts, m.tsCatalysed, m.productCatalysed, m.deltaH, m.ea].filter((x) => x !== undefined)
  if (!nums.every(isNum)) return resultOf([fail('K-EA', 'an energy level is not a finite number', 'profile')])
  const span = Math.max(Math.abs(m.ts - m.reactant), Math.abs(m.product - m.reactant), 1e-9)
  const tol = 0.02 * span
  if (!(m.ts > Math.max(m.reactant, m.product) + 1e-12)) out.push(fail('K-TS-NOT-ABOVE', `transition state (${m.ts}) must lie above BOTH reactants (${m.reactant}) and products (${m.product})`, 'profile.ts'))
  const ea = m.ts - m.reactant
  if (!(ea > 0)) out.push(fail('K-EA', `activation energy Ea = TS − reactants = ${round(ea, 4)} is not positive`, 'profile.ea'))
  if (isNum(m.ea) && Math.abs(m.ea - ea) > tol) out.push(fail('K-EA', `printed Ea ${m.ea} but the drawn levels give TS − reactants = ${round(ea, 4)}`, 'profile.ea'))
  const dH = m.product - m.reactant
  if (isNum(m.deltaH)) {
    if (Math.abs(m.deltaH - dH) > tol) out.push(fail('K-DH-MISMATCH', `printed ΔH ${m.deltaH} but products − reactants = ${round(dH, 4)}`, 'profile.deltaH'))
    if (Math.sign(m.deltaH) !== Math.sign(dH) && Math.abs(dH) > tol) out.push(fail('K-DH-MISMATCH', 'printed ΔH has the wrong sign for the drawn levels', 'profile.deltaH'))
  }
  if (m.claim === 'exothermic' && !(dH < 0)) out.push(fail('K-EXO-ENDO', `labelled exothermic but products (${m.product}) are not below reactants (${m.reactant})`, 'profile'))
  if (m.claim === 'endothermic' && !(dH > 0)) out.push(fail('K-EXO-ENDO', `labelled endothermic but products (${m.product}) are not above reactants (${m.reactant})`, 'profile'))
  if (isNum(m.tsCatalysed)) {
    if (!(m.tsCatalysed < m.ts - 1e-12)) out.push(fail('K-CATALYST', 'the catalysed transition state is not lower than the uncatalysed one — a catalyst lowers Ea', 'profile.tsCatalysed'))
    if (!(m.tsCatalysed > Math.max(m.reactant, m.product))) out.push(fail('K-TS-NOT-ABOVE', 'the catalysed transition state must still lie above reactants and products', 'profile.tsCatalysed'))
    if (isNum(m.productCatalysed) && Math.abs(m.productCatalysed - m.product) > 1e-9) out.push(fail('K-CATALYST', 'a catalyst must not change ΔH — the catalysed product level differs', 'profile.productCatalysed'))
  }
  return resultOf(out)
}

const EXO_WORDS = /\bexothermic\b/i
const ENDO_WORDS = /\bendothermic\b/i

/** K — wording about heat flow vs the sign of ΔH printed in the SAME string / step. */
export function validateThermoWording(items: readonly TextItem[]): ValidatorResult {
  const out: AuditFinding[] = []
  for (const it of items) {
    const ctx = `${it.text} ${it.stepNarration ?? ''}`
    const dh = ctx.match(/Δ\s?H[^=<>]{0,12}(=|>|<)\s*([+\-−]?)\s*(\d+(?:\.\d+)?)?/)
    let sign = 0
    if (dh) {
      if (dh[1] === '>') sign = 1
      else if (dh[1] === '<') sign = -1
      else if (dh[3] !== undefined && Number(dh[3]) !== 0) sign = dh[2] === '-' || dh[2] === '−' ? -1 : 1
    }
    const exo = EXO_WORDS.test(ctx) || /\b(?:releases?|gives? out|evolves?) heat\b/i.test(ctx)
    const endo = ENDO_WORDS.test(ctx) || /\b(?:absorbs?|takes? in) heat\b/i.test(ctx)
    if (exo && endo) continue
    if (sign > 0 && exo) out.push(fail('K-EXO-ENDO', `"${clip(ctx)}" says heat is released (exothermic) but ΔH is positive`, it.where))
    if (sign < 0 && endo) out.push(fail('K-EXO-ENDO', `"${clip(ctx)}" says heat is absorbed (endothermic) but ΔH is negative`, it.where))
  }
  return resultOf(out)
}

const UNIT_RE = /\b(?:kJ|J|kcal|cal|eV|MJ)(?:\s?\/\s?mol|·mol⁻¹|\s?mol⁻¹)?\b|kJ\/mol|J\/mol/

/** Parse a signed step value from a label like `ΔH1 = −110.5 kJ/mol` or `ionization IE = +496`. */
function stepValue(text: string): number | null {
  const norm = text.replace(/−/g, '-')
  const eq = norm.lastIndexOf('=')
  const tail = eq >= 0 ? norm.slice(eq + 1) : norm
  const m = tail.match(/([+-]?)\s*(\d+(?:\.\d+)?)/)
  if (!m) return null
  return (m[1] === '-' ? -1 : 1) * Number(m[2])
}

/** K — Hess / Born–Haber / crystal-field "energy cycle" figures. */
export function verifyEnergyCycleFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const arrows = objs.filter((f) => f.o.type === 'arrow' && f.o.from && f.o.to && Math.abs(f.o.from[0] - f.o.to[0]) < 1e-6)
  const labels = objs.filter((f) => f.o.type === 'label' && typeof f.o.text === 'string' && f.o.position)
  if (!arrows.length) { rep.unverified.push('no vertical step arrows to verify'); return rep }

  // A step label is the "= value" label level with the middle of its arrow, on EITHER side of the bar (the generator puts the
  // first column's labels to the left of its arrow and the rest to the right, clear of the bar) and within one column's reach.
  const STEP_LABEL_REACH = 7
  const stepLabelFor = (a: FlatObject): FlatObject | undefined => {
    const x = a.o.from![0]
    const mid = (a.o.from![1] + a.o.to![1]) / 2
    const near = (l: FlatObject) => Math.hypot(l.o.position![0] - x, 4 * (l.o.position![1] - mid))
    return labels
      .filter((l) => /=/.test(l.o.text ?? '') && Math.abs(l.o.position![0] - x) < STEP_LABEL_REACH && Math.abs(l.o.position![1] - mid) < 0.6)
      .sort((p, q) => near(p) - near(q))[0]
  }
  const steps = arrows.map((a) => {
    const lab = stepLabelFor(a)
    return { a, lab, dy: a.o.to![1] - a.o.from![1], x: a.o.from![0], value: lab ? stepValue(lab.o.text ?? '') : null }
  })

  // Sign and scale: the arrow must go up for a positive step and the drawn length must be proportional to the value.
  const scaled: number[] = []
  for (const s of steps) {
    if (s.value === null || s.value === 0) continue
    if (Math.sign(s.dy) !== Math.sign(s.value)) {
      rep.findings.push(fail('K-ARROW-SIGN', `arrow ${s.dy > 0 ? 'rises' : 'falls'} but its label "${s.lab?.o.text}" is ${s.value > 0 ? 'positive' : 'negative'}`, s.a.where))
    } else scaled.push(Math.abs(s.dy) / Math.abs(s.value))
  }
  if (scaled.length) {
    const med = [...scaled].sort((p, q) => p - q)[Math.floor(scaled.length / 2)]
    const off = steps.filter((s) => s.value !== null && s.value !== 0 && Math.sign(s.dy) === Math.sign(s.value) && Math.abs(Math.abs(s.dy) / Math.abs(s.value) - med) > 0.03 * med)
    for (const s of off) rep.findings.push(fail('K-SCALE', `step "${s.lab?.o.text}" is drawn ${round(Math.abs(s.dy), 2)} tall for ${s.value}: not on the scale of the other steps (${round(med, 4)} per unit)`, s.a.where))
    if (!rep.findings.some((f) => f.code === 'K-ARROW-SIGN' || f.code === 'K-SCALE')) rep.verified.push('arrow-direction-and-scale-match-labels')
  }

  // Hess: every column (path) between the same start and end has the same total.
  const cols = new Map<number, number[]>()
  for (const s of steps) if (s.value !== null) cols.set(round(s.x, 2), [...(cols.get(round(s.x, 2)) ?? []), s.value])
  const totals = [...cols.values()].map((v) => round(v.reduce((a, b) => a + b, 0), 6))
  if (totals.length > 1) {
    if (totals.some((t) => Math.abs(t - totals[0]) > 0.01)) rep.findings.push(fail('K-HESS-SUM', `paths between the same states have different totals (${totals.join(' vs ')}) — Hess's law is violated`, 'steps'))
    else rep.verified.push('hess-law-path-totals-agree')
    const head = labels.map((l) => l.o.text ?? '').find((t) => /same total/.test(t))
    const hv = head ? stepValue(head.replace(/\(.*\)/, '')) : null
    if (hv !== null && Math.abs(hv - totals[0]) > 0.01) rep.findings.push(fail('K-HESS-SUM', `heading claims the common total is ${hv} but the steps sum to ${totals[0]}`, 'steps'))
  }

  // Each level must be reachable from the previous one by conservation of atoms and charge.
  for (const [x] of cols) {
    const col = steps.filter((s) => round(s.x, 2) === x).sort((p, q) => Math.min(p.a.o.from![1], p.a.o.to![1]) - Math.min(q.a.o.from![1], q.a.o.to![1]))
    // A level is labelled over its own column, or ONCE between the columns when the paths share that state (start, common end).
    const levelAt = (y: number): string | undefined =>
      labels.filter((l) => Math.abs(l.o.position![0] - x) < 3.4 && Math.abs(l.o.position![1] - y) < 0.9 && !/=/.test(l.o.text ?? ''))
        .sort((p, q) => Math.abs(p.o.position![1] - y) - Math.abs(q.o.position![1] - y) || Math.abs(p.o.position![0] - x) - Math.abs(q.o.position![0] - x))[0]?.o.text
    const seq: Array<string | undefined> = [levelAt(col[0].a.o.from![1])]
    for (const s of col) seq.push(levelAt(s.a.o.to![1]))
    const sides = seq.map((t) => (t ? t.split(/\s+\+\s+/).map(parseSpecies) : null))
    for (let i = 1; i < sides.length; i++) {
      const a = sides[i - 1]
      const b = sides[i]
      if (!a || !b || !a.every((p) => p.ok) || !b.every((p) => p.ok)) continue
      const ta = tally(a)
      const tb = tally(b)
      const diff = [...new Set([...Object.keys(ta.atoms), ...Object.keys(tb.atoms)])].filter((k) => Math.abs((ta.atoms[k] ?? 0) - (tb.atoms[k] ?? 0)) > 1e-6)
      if (diff.length || Math.abs(ta.charge - tb.charge) > 1e-6) {
        rep.findings.push(fail('K-LEVEL-NOT-CONSERVED', `"${seq[i - 1]}" → "${seq[i]}" does not conserve ${diff.length ? 'atoms (' + diff.join(', ') + ')' : 'charge'}`, 'steps'))
      } else rep.verified.push('consecutive-levels-conserve-atoms-and-charge')
    }
  }

  // Units on the quantities.
  const numbered = steps.filter((s) => s.value !== null)
  const allText = collectSceneTexts(scene).map((t) => t.text).join(' | ')
  const withUnit = numbered.filter((s) => UNIT_RE.test(s.lab?.o.text ?? ''))
  if (numbered.length && withUnit.length === 0 && !UNIT_RE.test(allText.replace(/ΔH/g, ''))) {
    rep.findings.push(review('L-UNIT-MISSING', 'energy values are printed with no unit anywhere in the figure', 'steps'))
  } else if (numbered.length && withUnit.length < numbered.length) {
    rep.findings.push(info('L-UNIT-MISSING', `${numbered.length - withUnit.length} of ${numbered.length} energy labels carry no unit (the unit appears on only ${withUnit.length}): ${numbered.filter((s) => !UNIT_RE.test(s.lab?.o.text ?? '')).slice(0, 3).map((s) => `"${s.lab?.o.text}"`).join(', ')}`, numbered.find((s) => !UNIT_RE.test(s.lab?.o.text ?? ''))?.lab?.where ?? 'steps'))
  }

  // Crystal-field splitting: d-electron count must equal group − charge, and eg lies above t2g.
  const cft = (scene.title ?? '').match(/\[([A-Z][a-z]?)\(.*\)\d*\](\d*[+-])/)
  const dots = objs.filter((f) => f.o.type === 'node' && !f.o.text && (f.o.radius ?? 1) <= 0.12).length
  if (cft) {
    const el = ELEMENT_BY_SYMBOL.get(cft[1])
    const pl = el ? placementOf(el.z) : null
    const ch = parseSpecies(`${cft[1]}${cft[2]}`).charge
    if (pl && pl.block === 'd' && pl.group !== null) {
      const dn = pl.group - ch
      if (dn < 0 || dn > 10) rep.findings.push(fail('K-CFT-OCCUPANCY', `${cft[1]} with charge ${ch} cannot be d^${dn}`, 'title'))
      else if (dots !== dn) rep.findings.push(fail('K-CFT-OCCUPANCY', `${cft[1]}${cft[2]} is d${dn} but ${dots} electron dot(s) are drawn`, 'steps'))
      else rep.verified.push('crystal-field-d-electron-count')
    }
    const t2g = labels.find((l) => /t2g/.test(l.o.text ?? ''))
    const eg = labels.find((l) => /\beg\b/.test(l.o.text ?? ''))
    if (t2g && eg) {
      if (!(eg.o.position![1] > t2g.o.position![1])) rep.findings.push(fail('K-CFT-OCCUPANCY', 'in an octahedral field eg lies ABOVE t2g, but it is drawn below', 'steps'))
      else rep.verified.push('eg-above-t2g')
    }
  }
  rep.unverified.push('the energies themselves (ΔH, IE, EA, lattice energy, Δo) are measured reference data; only their internal consistency was checked')
  return rep
}

// ═══════════════════════════════════════════════════════════════════════════
// 12. L — GRAPHS, BAR CHARTS, UNITS · P — PROCESS FLOWS
// ═══════════════════════════════════════════════════════════════════════════

interface RangeRule { name: string; min?: number; max?: number }

/** Physically meaningful bounds implied by an axis label. */
export function chemRangeRule(label: string): RangeRule | null {
  const l = label.toLowerCase()
  if (/\bph\b/.test(l)) return { name: 'pH', min: -0.5, max: 14.5 }
  if (/mole fraction|\bχ\b/.test(l)) return { name: 'mole fraction', min: 0, max: 1 }
  if (/temperature|\bt\s*\(k\)|\(k\)|kelvin/.test(l) && /\(k\)|kelvin/.test(l)) return { name: 'temperature in K', min: 0 }
  if (/temperature/.test(l) && /°c|celsius/.test(l)) return { name: 'temperature in °C', min: -273.15 }
  if (/concentration|molarity|\[[^\]]+\]|mol\s?\/\s?l|mol\s?l⁻¹|mol\/dm/.test(l)) return { name: 'concentration', min: 0 }
  if (/pressure/.test(l)) return { name: 'pressure', min: 0 }
  if (/\bvolume\b/.test(l)) return { name: 'volume', min: 0 }
  if (/absorbance/.test(l)) return { name: 'absorbance', min: 0 }
  if (/transmittance/.test(l)) return { name: 'transmittance', min: 0, max: 100 }
  if (/\brate\b/.test(l)) return { name: 'rate', min: 0 }
  if (/yield|conversion/.test(l)) return { name: 'yield', min: 0, max: 100 }
  return null
}

const DIMENSIONLESS = /\bph\b|mole fraction|\blog\b|\bz\b|absorbance|ratio|fraction|equivalents?|extent|\bk\b(?!\))|\bq\b|conversion|compressibility/i
const HAS_UNIT = /\([^)]+\)|\[[^\]]*(?:m|s|k|j|pa|l|mol)[^\]]*\]|\b(?:mol|kg|g|m|s|k|j|kj|pa|atm|l|ev|nm|cm|ml|dm)\b/i

/** L — a labelled axis needs a name and (unless dimensionless) a unit. */
function axisLabelFindings(label: string | undefined, which: string, where: string): AuditFinding[] {
  if (!label || !label.trim()) return [review('L-AXIS-LABEL', `${which}-axis has no label`, where)]
  if (!DIMENSIONLESS.test(label) && !HAS_UNIT.test(label)) return [review('L-UNIT-MISSING', `${which}-axis label "${label}" states no unit`, where)]
  return []
}

/** L — an `equation` graph (the only graph form the VisualSpec schema has). */
export function validateGraphSpec(spec: Record<string, unknown>): ValidatorResult {
  const out: AuditFinding[] = []
  const eq = String(spec.equation ?? '')
  const compiled = compileExpression(eq)
  if (!compiled) return resultOf([fail('L-NONFINITE', `equation "${clip(eq)}" does not compile — the plot would be blank`, 'equation')])
  const domain = Array.isArray(spec.domain) && spec.domain.length === 2 && spec.domain.every(isNum) ? (spec.domain as [number, number]) : ([-10, 10] as [number, number])
  if (!(domain[1] > domain[0])) out.push(fail('L-COLLAPSED', `domain [${domain[0]}, ${domain[1]}] has no width`, 'domain'))
  const N = 240
  const xs: number[] = []
  const ys: number[] = []
  for (let i = 0; i <= N; i++) {
    const x = domain[0] + ((domain[1] - domain[0]) * i) / N
    const y = compiled.eval(x)
    if (Number.isFinite(y)) { xs.push(x); ys.push(y) }
  }
  if (ys.length < N * 0.5) return resultOf([...out, fail('L-NONFINITE', `equation is finite at only ${ys.length} of ${N + 1} sample points`, 'equation')])
  const ymin = Math.min(...ys)
  const ymax = Math.max(...ys)
  const range = ymax - ymin
  if (range <= 1e-9 * Math.max(1, Math.abs(ymax))) out.push(fail('L-COLLAPSED', 'the curve is constant over its whole domain — nothing to see', 'equation'))

  const xl = typeof spec.xLabel === 'string' ? spec.xLabel : undefined
  const yl = typeof spec.yLabel === 'string' ? spec.yLabel : undefined
  out.push(...axisLabelFindings(xl, 'x', 'xLabel'), ...axisLabelFindings(yl, 'y', 'yLabel'))
  const xr = xl ? chemRangeRule(xl) : null
  const yr = yl ? chemRangeRule(yl) : null
  if (xr && ((xr.min !== undefined && domain[0] < xr.min - 1e-9) || (xr.max !== undefined && domain[1] > xr.max + 1e-9))) {
    out.push(fail('L-RANGE', `x-axis is ${xr.name} but the domain [${domain[0]}, ${domain[1]}] leaves its meaningful range [${xr.min ?? '−∞'}, ${xr.max ?? '∞'}]`, 'domain'))
  }
  if (yr && ((yr.min !== undefined && ymin < yr.min - 1e-9) || (yr.max !== undefined && ymax > yr.max + 1e-9))) {
    out.push(fail('L-RANGE', `y-axis is ${yr.name} but the curve spans [${round(ymin, 3)}, ${round(ymax, 3)}], outside [${yr.min ?? '−∞'}, ${yr.max ?? '∞'}]`, 'equation'))
  }
  // Key-feature checks driven by the title.
  const title = String(spec.title ?? '')
  if (/titration|equivalence/i.test(title) && range > 0) {
    let best = 0
    let bx = 0
    for (let i = 1; i < xs.length; i++) {
      const d = Math.abs(ys[i] - ys[i - 1]) / Math.max(xs[i] - xs[i - 1], 1e-12)
      if (d > best) { best = d; bx = xs[i] }
    }
    const meanSlope = range / (domain[1] - domain[0])
    const rel = (bx - domain[0]) / (domain[1] - domain[0])
    if (best < 4 * meanSlope) out.push(review('L-NO-FEATURE', 'titration curve shows no sharp equivalence-point rise within its domain', 'equation'))
    else if (rel < 0.1 || rel > 0.9) out.push(review('L-NO-FEATURE', `steepest point (the equivalence point) sits at the very edge of the domain (${round(rel * 100, 0)}%) — the plateau after it is cut off`, 'domain'))
  }
  if (/equilibrium|plateau/i.test(title)) {
    const n = ys.length
    const tail = ys.slice(Math.floor(n * 0.9))
    if (Math.max(...tail) - Math.min(...tail) > 0.03 * range) out.push(review('L-NO-FEATURE', 'title promises an equilibrium/plateau but the curve is still changing at the right edge', 'equation'))
  }
  return resultOf(out)
}

/** L — number line: positive width, highlights inside, pH lines inside 0–14. */
export function validateNumberLineSpec(spec: Record<string, unknown>): ValidatorResult {
  const out: AuditFinding[] = []
  const start = Number(spec.start)
  const end = Number(spec.end)
  if (!isNum(start) || !isNum(end) || !(end > start)) return resultOf([fail('L-COLLAPSED', 'number line has no positive range', 'start/end')])
  const hl = Array.isArray(spec.highlight) ? (spec.highlight as unknown[]) : []
  if (hl.some((h) => !isNum(h))) out.push(fail('L-NONFINITE', 'a highlight is not a finite number', 'highlight'))
  const outside = hl.filter((h): h is number => isNum(h) && (h < start || h > end))
  if (outside.length) out.push(fail('L-RANGE', `highlights ${outside.join(', ')} lie outside [${start}, ${end}]`, 'highlight'))
  if (/\bph\b/i.test(String(spec.title ?? '')) && (start < -0.5 || end > 14.5)) out.push(fail('L-RANGE', `a pH line must stay within 0–14 (this one spans ${start} to ${end})`, 'start/end'))
  return resultOf(out)
}

/** P — sequence figures: step count, unique titles, list-not-process misuse. */
export function validateProcessFlowSpec(spec: Record<string, unknown>): ValidatorResult {
  const out: AuditFinding[] = []
  const steps = Array.isArray(spec.steps) ? (spec.steps as Array<Record<string, unknown> | string>) : []
  const titles = steps.map((s) => (typeof s === 'string' ? s : String(s?.title ?? '')))
  if (steps.length < 2) out.push(fail('P-TOO-SHORT', `a process needs at least two steps (has ${steps.length})`, 'steps'))
  titles.forEach((t, i) => { if (!t.trim()) out.push(fail('A-EMPTY-LABEL', 'process step has an empty title', `steps[${i}].title`)) })
  const seen = new Map<string, number>()
  titles.forEach((t, i) => {
    const k = t.trim().toLowerCase()
    if (!k) return
    if (seen.has(k)) out.push(review('P-DUPLICATE-STEP', `step ${i + 1} repeats the title of step ${(seen.get(k) ?? 0) + 1}: "${t}"`, `steps[${i}].title`))
    else seen.set(k, i)
  })
  if (LIST_TITLE.test(String(spec.title ?? ''))) {
    out.push(review('P-LIST-AS-PROCESS', `"${spec.title}" reads like a list/classification, but a process flow asserts an ORDER between its boxes`, 'title'))
  }
  return resultOf(out)
}

const LIST_TITLE = /\b(?:types? of|kinds? of|classes of|classification|characteristics? of|properties of|categories|list of|units|families|examples of)\b/i

/** P — a `process` SceneSpec: unique node labels, list-as-process misuse. */
export function validateProcessScene(scene: SceneSpec): ValidatorResult {
  const out: AuditFinding[] = []
  const nodes = flatObjects(scene).filter((f) => (f.o.type === 'node') && typeof f.o.text === 'string' && f.o.text.trim())
  const seen = new Map<string, string>()
  for (const f of nodes) {
    const k = (f.o.text ?? '').trim().toLowerCase()
    if (seen.has(k)) out.push(review('P-DUPLICATE-STEP', `two process nodes are both labelled "${f.o.text}"`, f.where))
    else seen.set(k, f.where)
  }
  if (LIST_TITLE.test(`${scene.title} ${scene.teachingGoal ?? ''}`)) out.push(review('P-LIST-AS-PROCESS', `"${scene.title}" reads like a list/classification but is drawn as an ordered process`, 'title'))
  return resultOf(out)
}

// ── bar charts (statistics_bar_chart generator, chemistry magnitude mode) ───

const R_GAS = 8.314

/** L — bar chart scenes: scale, zero baseline, label/value agreement, title claims, units, equipartition oracle. */
export function verifyBarChartFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const bars = objs.filter((f) => /^bar-\d+$/.test(f.o.id ?? '') && f.o.from && f.o.to).sort((a, b) => a.o.from![0] - b.o.from![0])
  if (bars.length < 2) { rep.unverified.push('no bar objects found'); return rep }
  const idx = (f: FlatObject): number => Number((f.o.id ?? '').split('-')[1])
  const cat = (i: number): string => objs.find((f) => f.o.id === `cat-${i}`)?.o.text ?? ''
  const cnt = (i: number): number => Number(objs.find((f) => f.o.id === `count-${i}`)?.o.text)
  const rows = bars.map((b) => ({ i: idx(b), b, h: b.o.to![1] - b.o.from![1], base: b.o.from![1], label: cat(idx(b)), value: cnt(idx(b)) }))

  if (rows.some((r) => !isNum(r.value))) { rep.findings.push(fail('L-BAR-VALUE', 'a bar has no readable count label', 'steps')); return rep }
  if (rows.some((r) => r.value < 0)) rep.findings.push(fail('L-RANGE', 'a bar value is negative', 'steps'))
  if (rows.some((r) => Math.abs(r.base - rows[0].base) > 1e-6)) rep.findings.push(fail('L-BAR-SCALE', 'bars do not share a baseline', 'steps'))
  const k = rows.map((r) => r.h / r.value)
  const kmed = [...k].sort((a, b) => a - b)[Math.floor(k.length / 2)]
  rows.forEach((r, n) => {
    if (Math.abs(k[n] - kmed) > 0.02 * kmed) rep.findings.push(fail('L-BAR-SCALE', `bar "${r.label}" is ${round(r.h, 2)} tall for value ${r.value}, not proportional to the other bars (a truncated or inconsistent scale misleads)`, r.b.where))
  })
  if (!rep.findings.some((f) => f.code === 'L-BAR-SCALE')) rep.verified.push('bar-heights-proportional-to-values-from-zero')

  // A number written inside the category label must be the bar's value.
  for (const r of rows) {
    const standalone = r.label.split(/\s+/).filter((t) => /^\d+(?:\.\d+)?$/.test(t))
    if (standalone.length && !standalone.some((t) => Math.abs(Number(t) - r.value) < 1e-9)) {
      rep.findings.push(fail('L-BAR-LABEL', `category label "${r.label}" quotes ${standalone.join('/')} but the bar's value is ${r.value}`, `steps (bar-${r.i})`))
    } else if (standalone.length) rep.verified.push('label-number-equals-bar-value')
  }
  const top = rows.reduce((a, b) => (b.value > a.value ? b : a))
  const largest = objs.find((f) => f.o.id === 'modeLabel')?.o.text?.match(/^largest: (.+)$/)?.[1]
  if (largest !== undefined && largest !== top.label) rep.findings.push(fail('L-BAR-LABEL', `"largest: ${largest}" but the tallest bar is "${top.label}"`, 'steps'))
  else if (largest !== undefined) rep.verified.push('largest-label-is-argmax')

  // Title claims about the shape of the data.
  const title = scene.title ?? ''
  if (/\b(?:rising|increasing|increases|grows|climbs)\b/i.test(title) && rows.length >= 3) {
    const up = rows.filter((r, n) => n > 0 && r.value > rows[n - 1].value).length
    if (!(rows[rows.length - 1].value > rows[0].value && up >= 0.6 * (rows.length - 1))) rep.findings.push(fail('L-TREND-CLAIM', `title says the values rise but only ${up} of ${rows.length - 1} steps go up`, 'title'))
    else rep.verified.push('title-trend-claim-holds')
  }
  if (/\b(?:falling|decreasing|decreases|declines|drops)\b/i.test(title) && rows.length >= 3) {
    const down = rows.filter((r, n) => n > 0 && r.value < rows[n - 1].value).length
    if (!(rows[rows.length - 1].value < rows[0].value && down >= 0.6 * (rows.length - 1))) rep.findings.push(fail('L-TREND-CLAIM', `title says the values fall but only ${down} of ${rows.length - 1} steps go down`, 'title'))
    else rep.verified.push('title-trend-claim-holds')
  }
  const dips = title.match(/dips? at ([A-Za-z0-9 ,]+?)(?:\)|:|$)/)
  if (dips) {
    for (const name of dips[1].split(/,| and /).map((s) => s.trim()).filter(Boolean)) {
      const n = rows.findIndex((r) => r.label.split(/\s+/)[0] === name)
      if (n <= 0) rep.findings.push(fail('L-TREND-CLAIM', `title claims a dip at "${name}" but no such category (or it is first)`, 'title'))
      else if (!(rows[n].value < rows[n - 1].value)) rep.findings.push(fail('L-TREND-CLAIM', `title claims a dip at ${name} but ${name} (${rows[n].value}) is not below the previous bar (${rows[n - 1].value})`, 'title'))
      else rep.verified.push('title-dip-claim-holds')
    }
  }

  // Units: stated somewhere, or the quantity is dimensionless.
  const all = collectSceneTexts(scene).map((t) => t.text).join(' | ')
  if (!HAS_UNIT.test(title) && !DIMENSIONLESS.test(all)) rep.findings.push(review('L-UNIT-MISSING', 'bar values are printed with no unit in the title or labels', 'title'))

  // Theory oracle: ideal-gas equipartition fixes molar heat capacities exactly.
  if (/heat capacit/i.test(title)) {
    let checked = 0
    for (const r of rows) {
      const m = r.label.match(/^(mon|mono|di)atomic C([vp])$/i)
      if (!m) continue
      const f = (m[1].toLowerCase().startsWith('mon') ? 1.5 : 2.5) + (m[2].toLowerCase() === 'p' ? 1 : 0)
      const exp = f * R_GAS
      checked++
      if (Math.abs(r.value - exp) > 0.01 * exp) rep.findings.push(fail('L-BAR-VALUE', `${r.label} = ${r.value} J/mol·K but equipartition gives ${round(exp, 2)} (${f}R)`, `steps (bar-${r.i})`))
    }
    if (checked === rows.length && !rep.findings.some((f) => f.code === 'L-BAR-VALUE')) rep.verified.push('heat-capacities-equal-equipartition-values')
    else if (checked < rows.length) rep.unverified.push('some heat-capacity bars are not covered by the equipartition oracle')
  } else {
    rep.unverified.push('bar values are measured reference data (boiling points, radii, ionisation energies, log K …); only their internal consistency was checked')
  }
  return rep
}

// ═══════════════════════════════════════════════════════════════════════════
// 13. Electrochemical cells, system boundaries, the first law
// ═══════════════════════════════════════════════════════════════════════════

const FARADAY_C = 96485

/** E — galvanic / electrolytic cell figures: EMF–ΔG–n arithmetic, spontaneity, flow direction, labels. */
export function verifyElectrochemicalCellFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const items = collectSceneTexts(scene)
  const num = (s: string): number => Number(s.replace('−', '-'))

  const res = items.map((i) => i.text.match(/E(?:cell)?\s*=\s*([+\-−]?\d+(?:\.\d+)?)\s*V\s*[,·]?\s*(non-spontaneous|spontaneous)(?:\s*[,·]?\s*ΔG\s*=\s*([+\-−]?\d+(?:\.\d+)?)\s*kJ\/mol)?/)).filter(Boolean)
  const external = items.some((i) => /external source/i.test(i.text))
  const anode = objs.find((f) => /\(anode\)$/.test(f.o.text ?? ''))
  const cathode = objs.find((f) => /\(cathode\)$/.test(f.o.text ?? ''))
  const flow = objs.find((f) => f.o.type === 'arrow' && f.o.from && f.o.to && f.o.color === '#22c55e')

  if (res.length) {
    const nums = new Set(res.map((m) => `${m![1]}|${m![2]}|${m![3] ?? ''}`.replace(/−/g, '-')))
    if (nums.size > 1) rep.findings.push(fail('E-ELEC-NFE', 'the heading and the narration quote different EMF / ΔG values', 'steps'))
    const m = res[0]!
    const E = num(m[1])
    const spont = m[2] === 'spontaneous'
    if ((E > 0) !== spont) rep.findings.push(fail('E-ELEC-SPONTANEITY', `E = ${m[1]} V is labelled "${m[2]}" — a positive EMF means spontaneous, a negative one non-spontaneous`, 'steps'))
    else rep.verified.push('emf-sign-matches-spontaneity')
    if (external && spont) rep.findings.push(fail('E-ELEC-SPONTANEITY', 'a cell driven by an external source cannot be labelled spontaneous', 'steps'))
    if (m[3] !== undefined) {
      const dG = num(m[3])
      if (Math.sign(dG) === Math.sign(E) && E !== 0) rep.findings.push(fail('E-ELEC-DG-SIGN', `ΔG = ${m[3]} kJ/mol has the same sign as E = ${m[1]} V; ΔG = −nFE has the opposite sign`, 'steps'))
      else if (E !== 0) {
        const n = (-dG * 1000) / (FARADAY_C * E)
        if (Math.abs(n - Math.round(n)) > 0.06 || Math.round(n) < 1) rep.findings.push(fail('E-ELEC-NFE', `ΔG = −nFE gives n = ${round(n, 3)} electrons from E = ${m[1]} V and ΔG = ${m[3]} kJ/mol — not a whole number`, 'steps'))
        else rep.verified.push('delta-g-equals-minus-nFE-with-integer-n')
      }
    }
  } else rep.unverified.push('no EMF / ΔG is printed, so the electrode identities and half-reactions cannot be checked against data')

  if (anode && cathode && flow?.o.from && flow.o.to) {
    const ax = anode.o.position![0]
    const cx = cathode.o.position![0]
    const movesRight = flow.o.to[0] > flow.o.from[0]
    if ((cx > ax) !== movesRight) rep.findings.push(fail('E-ELEC-FLOW-DIRECTION', 'the electron-flow arrow does not run from the anode to the cathode', flow.where))
    else rep.verified.push('electron-flow-runs-anode-to-cathode')
  }

  const title = scene.title ?? ''
  if (/molten/i.test(title)) {
    const bad = items.find((i) => /\bin solution\b/i.test(i.text))
    if (bad) rep.findings.push(fail('E-ELEC-SOLUTION-FOR-MOLTEN', `the cell is "${title}" (a molten salt has no solvent) but a label says "${bad.text}" — a melt is not a solution`, bad.where))
  }
  for (const f of objs) {
    const t = f.o.text ?? ''
    const am = t.match(/^(.*)\(anode\)$/)
    const cm = t.match(/^(.*)\(cathode\)$/)
    if (am && /\bat (?:the )?cathode\b/i.test(am[1])) rep.findings.push(fail('E-ELEC-ROLE-TEXT', `the ANODE label "${t}" talks about the cathode`, f.where + '.text'))
    if (cm && /\bat (?:the )?anode\b/i.test(cm[1])) rep.findings.push(fail('E-ELEC-ROLE-TEXT', `the CATHODE label "${t}" talks about the anode`, f.where + '.text'))
  }
  // Metal electrode and its own ion should be the same element.
  for (const [role, el] of [['anode', anode], ['cathode', cathode]] as const) {
    if (!el) continue
    const mat = (el.o.text ?? '').replace(/\s*\((?:anode|cathode)\)$/, '').trim()
    if (!isElementSymbol(mat)) continue
    const x = el.o.position![0]
    // "Zn²⁺ in solution", "Cu²⁺ in solution (0.001 M)", "Na⁺ in the melt" — the species, where it is, optionally how much.
    const ION_LABEL_TAIL = /\s+in (?:solution|the melt)(?: \([^)]*\))?$/
    const ion = objs.find((f) => ION_LABEL_TAIL.test(f.o.text ?? '') && Math.abs(f.o.position![0] - x) < 0.2)
    const ionSp = ion ? parseSpecies((ion.o.text ?? '').replace(ION_LABEL_TAIL, '')) : null
    // Only a reactive metal electrode shares its element with the cation of its half-cell; Pt / Au / C are inert and anions are never the electrode's own ion.
    if (ionSp?.ok && ionSp.charge > 0 && !['Pt', 'Au', 'C'].includes(mat) && !(mat in ionSp.atoms)) rep.findings.push(review('E-ELEC-ION-MISMATCH', `the ${role} is ${mat} but the ion in its half-cell is ${ionSp.raw}`, ion!.where + '.text'))
  }
  rep.unverified.push('standard potentials, electrode materials and half-reactions are reference data; only the arithmetic among the printed numbers was checked')
  return rep
}

const SYS_RULE: Record<string, { matter: boolean; energy: boolean }> = {
  open: { matter: true, energy: true }, closed: { matter: false, energy: true }, isolated: { matter: false, energy: false },
}

function boxBounds(scene: SceneSpec): { x0: number; x1: number; y0: number; y1: number } | null {
  const lines = flatObjects(scene).filter((f) => f.o.type === 'bond' && f.o.from && f.o.to && f.o.color === '#94a3b8')
  const horiz = lines.filter((f) => Math.abs(f.o.from![1] - f.o.to![1]) < 1e-6)
  const vert = lines.filter((f) => Math.abs(f.o.from![0] - f.o.to![0]) < 1e-6)
  if (horiz.length < 2 || vert.length < 2) return null
  const xs = vert.map((f) => f.o.from![0])
  const ys = horiz.map((f) => f.o.from![1])
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}

const insideBox = (p: Vec3, b: { x0: number; x1: number; y0: number; y1: number }, tol = 0.05): boolean => p[0] >= b.x0 - tol && p[0] <= b.x1 + tol && p[1] >= b.y0 - tol && p[1] <= b.y1 + tol

/** E — open / closed / isolated system diagrams. */
export function verifySystemBoundaryFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const kind = scene.id.match(/^chem-system-(open|closed|isolated)$/)?.[1]
  const titleKind = (scene.title ?? '').match(/^(Open|Closed|Isolated) System/i)?.[1].toLowerCase()
  if (!kind) { rep.unverified.push('not a recognised system-boundary id'); return rep }
  if (titleKind && titleKind !== kind) rep.findings.push(fail('E-SYS-TYPE', `title says ${titleKind} system but the figure is built as ${kind}`, 'title'))
  const rule = SYS_RULE[kind]
  const objs = flatObjects(scene)
  const texts = objs.map((f) => f.o.text ?? '')
  const has = (s: string): boolean => texts.some((t) => t === s)
  const matterArrows = has('matter in') || has('matter out')
  const energyArrows = has('heat in') || has('heat out')
  if (matterArrows !== rule.matter) rep.findings.push(fail('E-SYS-TYPE', `a ${kind} system ${rule.matter ? 'exchanges' : 'does not exchange'} matter, but matter arrows are ${matterArrows ? 'drawn' : 'absent'}`, 'steps'))
  if (energyArrows !== rule.energy) rep.findings.push(fail('E-SYS-TYPE', `a ${kind} system ${rule.energy ? 'exchanges' : 'does not exchange'} energy, but heat arrows are ${energyArrows ? 'drawn' : 'absent'}`, 'steps'))
  if (has('no matter exchange') === rule.matter) rep.findings.push(fail('E-SYS-TYPE', `the "no matter exchange" note is ${rule.matter ? 'present on' : 'missing from'} a ${kind} system`, 'steps'))
  if (has('no energy exchange') === rule.energy) rep.findings.push(fail('E-SYS-TYPE', `the "no energy exchange" note is ${rule.energy ? 'present on' : 'missing from'} a ${kind} system`, 'steps'))
  for (const it of collectSceneTexts(scene)) {
    const m = it.text.match(/An? (open|closed|isolated) system exchanges (both matter and energy|energy but not matter|neither matter nor energy)/)
    if (m) {
      const stated = m[2].startsWith('both') ? 'open' : m[2].startsWith('energy') ? 'closed' : 'isolated'
      if (m[1] !== stated) rep.findings.push(fail('E-SYS-TYPE', `"${m[0]}" mis-defines the ${m[1]} system`, it.where))
      if (m[1] !== kind) rep.findings.push(fail('E-SYS-TYPE', `the narration defines a ${m[1]} system but the figure is ${kind}`, it.where))
    }
  }
  const box = boxBounds(scene)
  if (box) {
    for (const f of objs.filter((o) => o.o.type === 'arrow' && o.o.from && o.o.to && /\b(in|out)$/.test(o.o.text ?? ''))) {
      const goesIn = /\bin$/.test(f.o.text ?? '')
      const ok = goesIn ? !insideBox(f.o.from!, box, -0.05) && insideBox(f.o.to!, box) : insideBox(f.o.from!, box) && !insideBox(f.o.to!, box, -0.05)
      if (!ok) rep.findings.push(fail('E-SYS-ARROW', `"${f.o.text}" arrow does not ${goesIn ? 'enter' : 'leave'} the system boundary`, f.where))
    }
    rep.verified.push('crossing-arrows-match-boundary-geometry')
  } else rep.unverified.push('system boundary box not found')
  if (!rep.findings.length) rep.verified.push('system-type-matches-matter-energy-exchange')
  return rep
}

/** E — ΔU = q + w with the IUPAC sign convention. */
export function verifyFirstLawFigure(scene: SceneSpec): FamilyReport {
  const rep = emptyReport()
  const objs = flatObjects(scene)
  const items = collectSceneTexts(scene)
  const q = objs.map((f) => f.o.text?.match(/^q = ([+\-−]?\d+(?:\.\d+)?)$/)).find(Boolean)
  const w = objs.map((f) => f.o.text?.match(/^w = ([+\-−]?\d+(?:\.\d+)?)$/)).find(Boolean)
  const du = objs.map((f) => f.o.text?.match(/^ΔU = ([+\-−]?\d+(?:\.\d+)?)$/)).find(Boolean)
  const n = (s: string): number => Number(s.replace('−', '-').replace('+', ''))
  if (!q || !w || !du) { rep.unverified.push('q / w / ΔU labels not found'); return rep }
  const qv = n(q[1])
  const wv = n(w[1])
  const dv = n(du[1])
  if (Math.abs(qv + wv - dv) > 0.0051) rep.findings.push(fail('E-FIRSTLAW-ARITHMETIC', `ΔU is printed ${dv} but q + w = ${qv} + ${wv} = ${round(qv + wv, 2)}`, 'steps'))
  else rep.verified.push('delta-u-equals-q-plus-w')
  for (const it of items) {
    const m = it.text.match(/ΔU = q \+ w = (-?\d+(?:\.\d+)?) \+ (-?\d+(?:\.\d+)?) = (-?\d+(?:\.\d+)?)/)
    if (m && (Number(m[1]) !== qv || Number(m[2]) !== wv || Number(m[3]) !== dv)) rep.findings.push(fail('E-FIRSTLAW-ARITHMETIC', `narration quotes ${m[1]} + ${m[2]} = ${m[3]} but the labels say q = ${qv}, w = ${wv}, ΔU = ${dv}`, it.where))
    if (/Positive means heat flows out/i.test(it.text) || /Positive means work is done by the system/i.test(it.text)) {
      rep.findings.push(fail('E-FIRSTLAW-SIGN', `"${it.text}" contradicts the sign convention (+ = into the system) the labels use`, it.where))
    }
  }
  const box = boxBounds(scene)
  if (box) {
    for (const [name, v] of [['q', qv], ['w', wv]] as const) {
      const f = objs.find((o) => o.o.type === 'arrow' && o.o.text?.startsWith(`${name} =`))
      if (!f?.o.from || !f.o.to) continue
      const enters = !insideBox(f.o.from, box, -0.05) && insideBox(f.o.to, box)
      const leaves = insideBox(f.o.from, box) && !insideBox(f.o.to, box, -0.05)
      if ((v > 0 && !enters) || (v < 0 && !leaves)) rep.findings.push(fail('E-FIRSTLAW-SIGN', `${name} = ${v} should ${v > 0 ? 'enter' : 'leave'} the system but the arrow ${enters ? 'enters' : leaves ? 'leaves' : 'does neither'}`, f.where))
      else rep.verified.push('arrow-direction-matches-sign')
    }
  }
  const all = items.map((i) => i.text).join(' | ')
  if (!UNIT_RE.test(all)) rep.findings.push(review('L-UNIT-MISSING', 'q, w and ΔU are energies but no unit (J or kJ) appears anywhere in the figure', 'steps'))
  return rep
}

// ═══════════════════════════════════════════════════════════════════════════
// 14. U — claims the title / learner-facing effect text makes but the drawing does not carry
// ═══════════════════════════════════════════════════════════════════════════

const CLAIM_TERMS: ReadonlyArray<readonly [RegExp, string, RegExp]> = [
  [/hybridi[sz]ation|\bsp\d*d?\d*\b|\bd\d*sp\d*\b/i, 'hybridisation', /hybrid|\bsp\d|\bd\d*sp/i],
  [/\borbitals?\b/i, 'orbitals', /orbital|\b[spdf]\b|\b[1-7][spdf]\b/i],
  [/\blone pairs?\b/i, 'lone pairs', /lone pair/i],
  [/\bresonance\b/i, 'resonance', /resonan/i],
  [/\bcatalyst\b/i, 'a catalyst', /catalys/i],
]

/** A term the title (or a parametric `effect` string) promises that no label or tagged object in the drawing carries. */
export function validateClaimsAreDrawn(scene: SceneSpec, claimSources: ReadonlyArray<{ text: string; where: string }>): ValidatorResult {
  const out: AuditFinding[] = []
  const drawnText = collectSceneTexts(scene).filter((t) => t.kind === 'label').map((t) => t.text).join(' | ')
  const tagged = flatObjects(scene).map((f) => JSON.stringify(f.o.properties ?? {})).join(' ')
  for (const src of claimSources) {
    for (const [claim, name, evidence] of CLAIM_TERMS) {
      if (claim.test(src.text) && !evidence.test(drawnText) && !evidence.test(tagged)) {
        out.push(review('U-CLAIM-NOT-DRAWN', `"${clip(src.text)}" promises ${name}, but no label or tagged object in the drawing shows ${name}`, src.where))
      }
    }
  }
  return resultOf(out)
}

// ═══════════════════════════════════════════════════════════════════════════
// 15. Aggregation: family detection and the public entry points
// ═══════════════════════════════════════════════════════════════════════════

export function detectFamily(scene: SceneSpec): string {
  const id = typeof scene?.id === 'string' ? scene.id : ''
  if (/^molecule-/.test(id)) return 'molecule'
  if (/^coord-/.test(id)) return 'coordination-complex'
  if (/^electron-shells-/.test(id)) return 'electron-shells'
  if (/^periodic-trends-/.test(id)) return 'periodic-trends'
  if (/^lattice-/.test(id)) return 'crystal-lattice'
  if (/^electrochemical-cell-/.test(id)) return 'electrochemical-cell'
  if (/^energy-cycle-/.test(id)) return 'energy-cycle'
  if (/^chem-system-/.test(id)) return 'system-boundary'
  if (/^chem-first-law$/.test(id)) return 'first-law'
  const flat = Array.isArray(scene?.steps) ? flatObjects(scene) : []
  if (flat.some((f) => /^bar-\d+$/.test(f.o.id ?? '')) && flat.some((f) => /^count-\d+$/.test(f.o.id ?? ''))) return 'bar-chart'
  if (/^cell-comparison-/.test(id)) return 'prose-comparison'
  if (/^cell-pathway-/.test(id)) return 'prose-pathway'
  if (/^cell-hub-/.test(id)) return 'prose-hub'
  if (/^cell-structure-/.test(id)) return 'prose-structure'
  if (scene?.sceneType === 'process') return 'prose-pathway'
  if (scene?.sceneType === 'comparison') return 'prose-comparison'
  if (Array.isArray(scene?.steps)) {
    const g = extractMolecularGraph(scene)
    if (g.atoms.length >= 2 && g.bonds.length >= 1) return 'molecule'
  }
  return 'unknown'
}

const PROSE_FAMILIES = new Set(['prose-comparison', 'prose-pathway', 'prose-hub', 'prose-structure'])

function dedupe(findings: AuditFinding[]): AuditFinding[] {
  const seen = new Set<string>()
  return findings.filter((f) => { const k = `${f.code}|${f.where}|${f.detail}`; if (seen.has(k)) return false; seen.add(k); return true })
}

function finish(family: string, findings: AuditFinding[], verified: string[], unverified: string[]): FigureAuditResult {
  const fs = dedupe(findings)
  const v = [...new Set(verified)]
  const u = [...new Set(unverified)]
  return { verdict: verdictOf(fs, u), findings: fs, family, verified: v, unverified: u }
}

/**
 * Audit one chemistry SceneSpec. Never throws: a validator that crashes yields REVIEW_REQUIRED
 * (`U-VALIDATOR-ERROR`), never PASS.
 */
export function auditChemistryScene(scene: SceneSpec, ctx: AuditContext = {}): FigureAuditResult {
  if (!scene || typeof scene !== 'object' || !Array.isArray(scene.steps)) {
    return finish('unknown', [fail('A-SCHEMA', 'not a SceneSpec (no steps array)', '(root)')], [], [])
  }
  const findings: AuditFinding[] = []
  const verified: string[] = []
  const unverified: string[] = []
  const guard = (name: string, fn: () => void): void => {
    try { fn() } catch (e) { findings.push(review('U-VALIDATOR-ERROR', `${name} threw: ${(e as Error).message}`, '(audit)')) }
  }
  const family = detectFamily(scene)
  // The family verifiers read labels with ASCII-notation regexes (`NH3`, `Co3+`). Figures are now served
  // typeset (`NH₃`, `Co³⁺`), and a regex that silently stops matching would turn a check into a no-op —
  // or, for a count, into a false FAIL. They therefore verify this notation-neutral view; the notation
  // validators below keep reading the scene exactly as the learner sees it.
  const view = mapSceneTexts(scene, toAsciiNotation)
  let items: TextItem[] = []
  guard('structure', () => { findings.push(...validateStructure(scene).findings); items = collectSceneTexts(scene) })
  guard('notation', () => findings.push(...validateNotation(items, ctx).findings))
  guard('reactions', () => findings.push(...validateReactionSchemes(items, ctx).findings))
  guard('thermo-wording', () => findings.push(...validateThermoWording(items).findings))
  guard('claims-drawn', () => findings.push(...validateClaimsAreDrawn(view, [
    { text: scene.title ?? '', where: 'title' },
    ...(ctx.parametricEffects ?? []).map((e, i) => ({ text: e, where: `parametric.effects[${i}]` })),
  ]).findings))
  guard('colour-only', () => findings.push(...validateColorOnlyEncoding(scene).findings))
  guard('mechanism', () => findings.push(...validateMechanismArrows(scene).findings))

  const family$ = (fn: () => FamilyReport): void => guard(family, () => { const r = fn(); findings.push(...r.findings); verified.push(...r.verified); unverified.push(...r.unverified) })
  switch (family) {
    case 'molecule': family$(() => verifyMolecularStructure(view)); break
    case 'coordination-complex': family$(() => verifyCoordinationComplex(view)); break
    case 'electron-shells': family$(() => verifyElectronShellFigure(view)); break
    case 'periodic-trends': family$(() => verifyPeriodicTrendFigure(view)); break
    case 'crystal-lattice': family$(() => verifyLatticeFigure(view)); break
    case 'electrochemical-cell': family$(() => verifyElectrochemicalCellFigure(view)); break
    case 'energy-cycle': family$(() => verifyEnergyCycleFigure(view)); break
    case 'system-boundary': family$(() => verifySystemBoundaryFigure(view)); break
    case 'first-law': family$(() => verifyFirstLawFigure(view)); break
    case 'bar-chart': family$(() => verifyBarChartFigure(view)); break
    default:
      if (PROSE_FAMILIES.has(family)) {
        guard('process', () => { if (scene.sceneType === 'process') findings.push(...validateProcessScene(view).findings) })
        unverified.push('prose chemistry statements (names, conditions, numbers, mechanisms) are not machine-checkable; a human must confirm them')
      } else {
        unverified.push('no deterministic chemistry verifier exists for this figure family')
      }
  }
  // Equilibrium series, if the scene happens to carry tagged concentration curves.
  guard('equilibrium', () => {
    const series = extractEquilibriumSeries(scene)
    if (series.length) findings.push(...validateEquilibriumSeries(series, { equilibriumStated: /equilibri/i.test(`${scene.title} ${scene.teachingGoal ?? ''}`) }).findings)
  })
  return finish(family, findings, verified, unverified)
}

/** Audit a VisualSpec (graph / number_line / process_flow / geometry). */
export function auditChemistrySpec(spec: unknown, ctx: AuditContext = {}): FigureAuditResult {
  if (!spec || typeof spec !== 'object') return finish('unknown', [fail('A-SCHEMA', 'not a VisualSpec object', '(root)')], [], [])
  const s = spec as Record<string, unknown>
  const type = String(s.type ?? 'unknown')
  const findings: AuditFinding[] = []
  const verified: string[] = []
  const unverified: string[] = []
  const guard = (name: string, fn: () => void): void => {
    try { fn() } catch (e) { findings.push(review('U-VALIDATOR-ERROR', `${name} threw: ${(e as Error).message}`, '(audit)')) }
  }
  const items = collectSpecTexts(s)
  walkNumbers(s, '', findings)
  for (const it of items) findings.push(...scanLearnerText(it))
  guard('notation', () => findings.push(...validateNotation(items, ctx).findings))
  guard('reactions', () => findings.push(...validateReactionSchemes(items, ctx).findings))
  guard('thermo-wording', () => findings.push(...validateThermoWording(items).findings))
  switch (type) {
    case 'graph':
      guard('graph', () => { const r = validateGraphSpec(s); findings.push(...r.findings); if (!r.findings.some((f) => f.severity === 'FAIL')) verified.push('graph-finite-non-collapsed-in-range') })
      unverified.push('whether the plotted curve is the right chemical law cannot be derived from the equation string')
      break
    case 'number_line':
      guard('number-line', () => findings.push(...validateNumberLineSpec(s).findings))
      unverified.push('the chemistry meaning of the highlighted values is not machine-checkable')
      break
    case 'process_flow':
      guard('process-flow', () => findings.push(...validateProcessFlowSpec(s).findings))
      unverified.push('the correctness of the step ORDER and of each step\'s chemistry is not machine-checkable')
      break
    default:
      unverified.push('no deterministic chemistry verifier exists for this VisualSpec type')
  }
  return finish(`spec:${type}`, findings, verified, unverified)
}

/** A card renderer (a hard-coded React component) has no payload to inspect. */
export function auditChemistryCard(visualType: string): FigureAuditResult {
  return finish(`card:${visualType}`, [review('U-CARD', `"${visualType}" is drawn by a fixed React component; its content cannot be inspected from the payload and must be reviewed in a rendered browser`, '(card)')], [], ['card renderer content is not part of the payload'])
}

export type AuditablePayload =
  | { renderer: 'scene'; sceneSpec: SceneSpec }
  | { renderer: 'spec'; visualSpec: unknown }
  | { renderer: 'card'; visualType: string }
  | { renderer: 'ascii' }

/** Audit whatever a `VisualDecision.payload` carries. */
export function auditChemistryPayload(p: AuditablePayload | null | undefined, ctx: AuditContext = {}): FigureAuditResult {
  if (!p) return finish('none', [], [], [])
  switch (p.renderer) {
    case 'scene': return auditChemistryScene(p.sceneSpec, ctx)
    case 'spec': return auditChemistrySpec(p.visualSpec, ctx)
    case 'card': return auditChemistryCard(p.visualType)
    default: return finish('ascii', [review('U-NO-VERIFIER', 'ASCII-art fallback figures are not machine-checkable', '(ascii)')], [], ['ASCII art'])
  }
}

/** Audit one entry of Worker A's `chem-manifest.json` (`payload: { field, value }`). */
export function auditManifestEntry(entry: { payload?: { field?: string; value?: unknown } }, ctx: AuditContext = {}): FigureAuditResult {
  const f = entry?.payload?.field
  const v = entry?.payload?.value
  if (f === 'sceneSpec') return auditChemistryScene(v as SceneSpec, ctx)
  if (f === 'visualSpec') return auditChemistrySpec(v, ctx)
  if (f === 'visual' || f === 'visualType') return auditChemistryCard(String(v))
  return finish('unknown', [review('U-NO-VERIFIER', `manifest entry has an unrecognised payload field "${String(f)}"`, 'payload.field')], [], ['unrecognised payload'])
}
