/**
 * chemSpecies — the chemical-species vocabulary shared by the figure audit and the
 * figure-text typesetter: a complete element table, a notation normaliser, a formula
 * parser and a species parser (coefficient · formula · charge · state), plus the
 * typesetter built on them.
 *
 * PURE. No imports, no I/O — it runs in the browser, in Node and in tests, and is
 * safe to pull into the client bundle (unlike the 2,600-line audit module that
 * originally contained this code, which is why it was extracted).
 *
 * Extracted verbatim from `visual/chemistryFigureAudit.pure.ts`; that module
 * re-exports every name it used to define, so its API did not change.
 */

export interface ElementInfo { z: number; symbol: string; name: string }

const ELEMENT_ROWS = (
  'H Hydrogen,He Helium,Li Lithium,Be Beryllium,B Boron,C Carbon,N Nitrogen,O Oxygen,F Fluorine,Ne Neon,' +
  'Na Sodium,Mg Magnesium,Al Aluminium,Si Silicon,P Phosphorus,S Sulfur,Cl Chlorine,Ar Argon,K Potassium,Ca Calcium,' +
  'Sc Scandium,Ti Titanium,V Vanadium,Cr Chromium,Mn Manganese,Fe Iron,Co Cobalt,Ni Nickel,Cu Copper,Zn Zinc,' +
  'Ga Gallium,Ge Germanium,As Arsenic,Se Selenium,Br Bromine,Kr Krypton,Rb Rubidium,Sr Strontium,Y Yttrium,Zr Zirconium,' +
  'Nb Niobium,Mo Molybdenum,Tc Technetium,Ru Ruthenium,Rh Rhodium,Pd Palladium,Ag Silver,Cd Cadmium,In Indium,Sn Tin,' +
  'Sb Antimony,Te Tellurium,I Iodine,Xe Xenon,Cs Caesium,Ba Barium,La Lanthanum,Ce Cerium,Pr Praseodymium,Nd Neodymium,' +
  'Pm Promethium,Sm Samarium,Eu Europium,Gd Gadolinium,Tb Terbium,Dy Dysprosium,Ho Holmium,Er Erbium,Tm Thulium,Yb Ytterbium,' +
  'Lu Lutetium,Hf Hafnium,Ta Tantalum,W Tungsten,Re Rhenium,Os Osmium,Ir Iridium,Pt Platinum,Au Gold,Hg Mercury,' +
  'Tl Thallium,Pb Lead,Bi Bismuth,Po Polonium,At Astatine,Rn Radon,Fr Francium,Ra Radium,Ac Actinium,Th Thorium,' +
  'Pa Protactinium,U Uranium,Np Neptunium,Pu Plutonium,Am Americium,Cm Curium,Bk Berkelium,Cf Californium,Es Einsteinium,Fm Fermium,' +
  'Md Mendelevium,No Nobelium,Lr Lawrencium,Rf Rutherfordium,Db Dubnium,Sg Seaborgium,Bh Bohrium,Hs Hassium,Mt Meitnerium,Ds Darmstadtium,' +
  'Rg Roentgenium,Cn Copernicium,Nh Nihonium,Fl Flerovium,Mc Moscovium,Lv Livermorium,Ts Tennessine,Og Oganesson'
).split(',')

export const ELEMENTS_TABLE: readonly ElementInfo[] = ELEMENT_ROWS.map((row, i) => {
  const [symbol, name] = row.split(' ')
  return { z: i + 1, symbol, name }
})

export const ELEMENT_BY_SYMBOL: ReadonlyMap<string, ElementInfo> = new Map(ELEMENTS_TABLE.map((e) => [e.symbol, e]))

const NAME_ALIASES: Record<string, string> = { aluminum: 'Al', sulphur: 'S', cesium: 'Cs' }

export function isElementSymbol(s: string): boolean { return ELEMENT_BY_SYMBOL.has(s) }

export function elementByName(name: string): ElementInfo | null {
  const lower = name.trim().toLowerCase()
  if (NAME_ALIASES[lower]) return ELEMENT_BY_SYMBOL.get(NAME_ALIASES[lower]) ?? null
  return ELEMENTS_TABLE.find((e) => e.name.toLowerCase() === lower) ?? null
}

/** body → charge of well-known polyatomic ions; resolves `SO42-` (SO₄²⁻) vs `NH4+` (NH₄⁺). */
const KNOWN_IONS: Readonly<Record<string, number>> = {
  NH4: 1, H3O: 1, OH: -1, NO3: -1, NO2: -1, SO4: -2, SO3: -2, CO3: -2, HCO3: -1, PO4: -3, HPO4: -2, H2PO4: -1,
  ClO4: -1, ClO3: -1, ClO2: -1, ClO: -1, MnO4: -1, Cr2O7: -2, CrO4: -2, CN: -1, SCN: -1, C2H3O2: -1, CH3COO: -1,
  S2O3: -2, HSO4: -1, HSO3: -1, C2O4: -2, Hg2: 2, N3: -1, O2: -1, H2O2: 0,
}

/** Organic / ligand abbreviations that appear inside formulas (PPh₃, Fe(Cp)₂, Pd(OAc)₂). Not elements, but not typos. */
const LIGAND_ABBREVIATIONS: ReadonlySet<string> = new Set(['Ph', 'Me', 'Et', 'Bu', 'Bn', 'Cy', 'Cp', 'Tf', 'Ms', 'Bz', 'Pyr', 'Py', 'En'])

export const SUB_CHARS: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-',
}
export const SUP_CHARS: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-',
}

/**
 * Normalise chemical script notation to ASCII so ONE grammar parses every style:
 * subscripts become plain digits, superscript runs become `^…`, every minus/dash
 * becomes `-`, and hydrate dots are unified. `SO₄²⁻` → `SO4^2-`, `Fe³⁺` → `Fe^3+`.
 */
export function normalizeChemScripts(s: string): string {
  return s
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, (run) => '^' + [...run].map((c) => SUP_CHARS[c] ?? c).join(''))
    .replace(/[₀₁₂₃₄₅₆₇₈₉₊₋]+/g, (run) => [...run].map((c) => SUB_CHARS[c] ?? c).join(''))
    .replace(/[−–—]/g, '-')
    .replace(/[·∙•]/g, '.')
}

/**
 * Charges of common ligands, keyed by the formula as a figure displays it. The ONE table: the coordination-complex
 * generator uses it to split a complex's overall charge between metal and ligands, and the chemistry audit uses it to
 * check that arithmetic.
 */
export const LIGAND_CHARGES: Readonly<Record<string, number>> = {
  NH3: 0, H2O: 0, CO: 0, NO: 0, PPh3: 0, py: 0, en: 0, Cl: -1, Br: -1, F: -1, I: -1, CN: -1, OH: -1, SCN: -1, NO2: -1, C2O4: -2, EDTA: -4,
}

/** "3+" → 3, "2-" → -2, "+" → 1, "" → 0; null when it is not a charge. */
export function parseChargeText(text: string): number | null {
  const t = text.trim().replace(/[−–]/g, '-')
  if (t === '') return 0
  const m = t.match(/^(\d*)([+-])$/)
  if (!m) return null
  return (m[2] === '-' ? -1 : 1) * (m[1] ? Number(m[1]) : 1)
}

/** 2 → "2+", 1 → "+", -1 → "-", -2 → "2-", 0 → "". */
export function chargeSuffix(n: number): string {
  if (n === 0) return ''
  return (Math.abs(n) === 1 ? '' : String(Math.abs(n))) + (n > 0 ? '+' : '-')
}

/**
 * The metal's charge in a complex: overall charge minus the ligands' charges. `null` when the overall charge is not
 * readable or ANY ligand is not in `LIGAND_CHARGES` — then nothing about the metal's charge is stated, rather than
 * guessing (the generator used to print the OVERALL charge as the metal's: "central Pt2- ion" for [PtCl₄]²⁻).
 */
export function metalChargeOf(overallCharge: string, ligands: ReadonlyArray<{ formula: string; count: number }>): number | null {
  const overall = parseChargeText(overallCharge)
  if (overall === null) return null
  let ligandTotal = 0
  for (const l of ligands) {
    const q = LIGAND_CHARGES[l.formula]
    if (q === undefined) return null
    ligandTotal += q * l.count
  }
  return overall - ligandTotal
}

/**
 * The inverse of typesetting, for verification: `Co³⁺` → `Co3+`, `NH₃` → `NH3`, `SO₄²⁻` → `SO42-`.
 * Unlike `normalizeChemScripts` (which makes `^` forms for the parser) this yields the compact ASCII
 * a figure author would type — the notation the audit's family verifiers' regexes are written against.
 * Minus signs and everything that is not a sub/superscript character are left alone.
 */
export function toAsciiNotation(s: string): string {
  return s
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, (run) => [...run].map((c) => SUP_CHARS[c] ?? c).join(''))
    .replace(/[₀₁₂₃₄₅₆₇₈₉₊₋]+/g, (run) => [...run].map((c) => SUB_CHARS[c] ?? c).join(''))
}

const sgn = (c: string): number => (c === '-' ? -1 : 1)

export interface ParsedFormula {
  atoms: Record<string, number>
  ok: boolean
  error: string | null
  unknownSymbols: string[]
  /** How many element symbols occurred (counts ignored) — a cheap "is this a formula" signal. */
  groups: number
}

export function addAtoms(into: Record<string, number>, from: Record<string, number>, mult: number): void {
  for (const [k, v] of Object.entries(from)) into[k] = (into[k] ?? 0) + v * mult
}

/** Parse an ASCII-normalised formula body such as `Ca(OH)2`, `[Ti(H2O)6]`, `CuSO4.5H2O`. */
export function parseFormulaBody(body: string): ParsedFormula {
  const unknown: string[] = []
  let groups = 0
  const parts = splitTopLevel(body, '.')
  const atoms: Record<string, number> = {}
  let error: string | null = null

  for (const [pi, partRaw] of parts.entries()) {
    let part = partRaw
    let mult = 1
    if (pi > 0) {
      const lead = part.match(/^(\d+)/)
      if (lead) { mult = Number(lead[1]); part = part.slice(lead[0].length) }
    }
    let i = 0
    const readInt = (): number | null => {
      const m = part.slice(i).match(/^\d+/)
      if (!m) return null
      i += m[0].length
      return Number(m[0])
    }
    const parseSeq = (close: string | null): Record<string, number> | null => {
      const acc: Record<string, number> = {}
      let any = false
      while (i < part.length) {
        const c = part[i]
        if (close && c === close) break
        if (c === ')' || c === ']') { error = `unbalanced '${c}'`; return null }
        // Fe(III), Rh(I), Ni(0): a parenthesised oxidation state, not a group of atoms.
        const ox = c === '(' ? part.slice(i).match(/^\((?:0|IV|VI{0,3}|IX|I{1,3}|X)\)/) : null
        if (ox && i > 0 && /[A-Za-z]/.test(part[i - 1])) { i += ox[0].length; continue }
        if (c === '(' || c === '[') {
          i++
          const inner = parseSeq(c === '(' ? ')' : ']')
          if (!inner) return null
          if (part[i] !== (c === '(' ? ')' : ']')) { error = `unclosed '${c}'`; return null }
          i++
          addAtoms(acc, inner, readInt() ?? 1)
          any = true
          continue
        }
        const m = part.slice(i).match(/^[A-Z][a-z]?/)
        if (!m) { error = `unexpected '${c}'`; return null }
        const sym = m[0]
        if (LIGAND_ABBREVIATIONS.has(sym) && !ELEMENT_BY_SYMBOL.has(sym)) {
          i += sym.length
          groups++
          acc[sym] = (acc[sym] ?? 0) + (readInt() ?? 1)
          any = true
          continue
        }
        if (sym.length === 2 && !ELEMENT_BY_SYMBOL.has(sym)) {
          // 'Cs' might be C + s? lowercase can never start an element, so a two-letter miss is an unknown symbol.
          if (ELEMENT_BY_SYMBOL.has(sym[0])) { unknown.push(sym); error = `unknown element symbol '${sym}'`; return null }
        }
        if (!ELEMENT_BY_SYMBOL.has(sym)) { unknown.push(sym); error = `unknown element symbol '${sym}'`; return null }
        i += sym.length
        groups++
        acc[sym] = (acc[sym] ?? 0) + (readInt() ?? 1)
        any = true
      }
      if (!any && !close) { error = 'empty formula'; return null }
      return acc
    }
    const seq = parseSeq(null)
    if (!seq || i < part.length) {
      if (!error) error = 'trailing characters'
      return { atoms: {}, ok: false, error, unknownSymbols: unknown, groups }
    }
    addAtoms(atoms, seq, mult)
  }
  return { atoms, ok: true, error: null, unknownSymbols: unknown, groups }
}

/** Split on `sep` outside (), []. */
function splitTopLevel(s: string, sep: string): string[] {
  const out: string[] = []
  let depth = 0
  let cur = ''
  for (const ch of s) {
    if (ch === '(' || ch === '[') depth++
    if (ch === ')' || ch === ']') depth--
    if (ch === sep && depth === 0) { out.push(cur); cur = ''; continue }
    cur += ch
  }
  out.push(cur)
  return out
}

export interface ParsedSpecies {
  raw: string
  coeff: number
  hasCoeff: boolean
  body: string
  atoms: Record<string, number>
  charge: number
  state: 's' | 'l' | 'g' | 'aq' | null
  isElectron: boolean
  ok: boolean
  /** The charge/subscript split was a guess (e.g. an unknown polyatomic `XY32-`). */
  ambiguous: boolean
  error: string | null
  unknownSymbols: string[]
  groups: number
  /** Enough chemistry in the token that it is plausibly a formula and not a word. */
  hasChemSignal: boolean
}

function coeffValue(c: string): number {
  if (c === '½') return 0.5
  if (c === '¼') return 0.25
  if (c === '¾') return 0.75
  if (c === '⅓') return 1 / 3
  if (c === '⅔') return 2 / 3
  if (c === '⅛') return 0.125
  if (c.includes('/')) { const [a, b] = c.split('/').map(Number); return b ? a / b : NaN }
  return Number(c)
}

const isMonatomic = (g: string): boolean => /^[A-Z][a-z]?$/.test(g) && ELEMENT_BY_SYMBOL.has(g)

/**
 * Parse one species: `2H2O(l)`, `Zn2+`, `SO₄²⁻`, `[Ti(H2O)6]3+`, `e⁻`, `½Cl2(g)`.
 * Charge/subscript ambiguity in compressed ASCII (`Zn2+`, `NH4+`, `SO42-`) is resolved by
 * monatomic-vs-polyatomic and a table of known ions; anything still unresolved is flagged.
 */
export function parseSpecies(rawIn: string): ParsedSpecies {
  const raw = rawIn.trim()
  const out: ParsedSpecies = {
    raw, coeff: 1, hasCoeff: false, body: '', atoms: {}, charge: 0, state: null, isElectron: false,
    ok: false, ambiguous: false, error: null, unknownSymbols: [], groups: 0, hasChemSignal: false,
  }
  let s = normalizeChemScripts(raw).replace(/\s+/g, ' ').trim()
  if (!s) { out.error = 'empty'; return out }

  const cm = s.match(/^(\d+\/\d+|\d+(?:\.\d+)?|[½¼¾⅓⅔⅛])\s*(?=[A-Za-z(\[])/)
  if (cm) { out.coeff = coeffValue(cm[1]); out.hasCoeff = true; s = s.slice(cm[0].length) }

  const sm = s.match(/\s?\((s|l|g|aq)\)$/)
  if (sm) { out.state = sm[1] as ParsedSpecies['state']; s = s.slice(0, sm.index).trim() }

  let m: RegExpMatchArray | null
  if ((m = s.match(/\^\s*(\d+)?([+-])$/))) {
    out.charge = sgn(m[2]) * (m[1] ? Number(m[1]) : 1)
    s = s.slice(0, m.index).trim()
  } else if ((m = s.match(/\^\s*([+-])(\d+)$/))) {
    out.charge = sgn(m[1]) * Number(m[2])
    s = s.slice(0, m.index).trim()
  } else if ((m = s.match(/^(.*\S) (\d*)([+-])$/)) && parseFormulaBody(m[1]).ok) {
    // 'SO4 2-' / 'Fe 3+': a space before the charge makes the digits unambiguously the charge.
    out.charge = sgn(m[3]) * (m[2] ? Number(m[2]) : 1)
    s = m[1]
  } else if ((m = s.match(/^(.*[A-Za-z)\]])(\s?)(\d*)([+-])$/))) {
    const [, g1, sp, digits, sign] = m
    if (digits === '') { out.charge = sgn(sign); s = g1 }
    else if (g1.endsWith(']') || sp === ' ' || isMonatomic(g1)) { out.charge = sgn(sign) * Number(digits); s = g1 }
    else {
      const bodyA = g1 + digits
      const a = KNOWN_IONS[bodyA]
      const bodyB = g1 + digits.slice(0, -1)
      const dB = Number(digits.slice(-1))
      const b = KNOWN_IONS[bodyB]
      if (a !== undefined && a === sgn(sign)) { out.charge = a; s = bodyA }
      else if (b !== undefined && b === sgn(sign) * dB) { out.charge = b; s = bodyB }
      else { out.ambiguous = true; out.charge = sgn(sign); s = bodyA }
    }
  }
  out.body = s

  if (s === 'e' && out.charge === -1) {
    out.isElectron = true
    out.ok = true
    out.hasChemSignal = true
    return out
  }
  const f = parseFormulaBody(s)
  out.atoms = f.atoms
  out.ok = f.ok
  out.error = f.error
  out.unknownSymbols = f.unknownSymbols
  out.groups = f.groups
  out.hasChemSignal =
    f.ok && (out.hasCoeff || /\d/.test(s) || out.charge !== 0 || out.state !== null || f.groups >= 2 || /[()[\]]/.test(s))
  return out
}
// ═══════════════════════════════════════════════════════════════════════════
// Typesetting — ASCII chemical notation → the Unicode the lesson screen shows
// ═══════════════════════════════════════════════════════════════════════════
//
// Figure text is drawn verbatim (`SceneLabel` prints `{text}`), so `Zn2+`, `NH3`
// and `H2(g)` reach a learner as typed while the tutor's own text and the cards
// are already typeset (`plainNotation`, CHEM-129). The rewrite is built ON the
// parser above — a token is rewritten only when it parses as a real species
// (every letter group an element, `hasChemSignal`, not ambiguous) — so it
// cannot turn a word, a quantity or a locant into a formula.
//
// What is deliberately left alone, because the ASCII form is genuinely ambiguous:
//   • `O2-` / `H2+` / `N2+` … an element that forms diatomics, one digit, a sign:
//     oxide vs superoxide, H₂⁺ vs H²⁺.  The parser's own `ambiguous` flag does not
//     cover this (it reads the digit as the charge), so it is guarded here.
//   • a lone `C2` / `T1` / `V2` with no charge, state or coefficient: a carbon
//     locant or a labelled quantity, not a molecule.  Only the elements that
//     exist as small molecules (H₂ N₂ O₂ O₃ F₂ Cl₂ Br₂ I₂ P₄ S₈) qualify.
//   • anything already carrying a Unicode sub/superscript.

const SUP_OUT: Readonly<Record<string, string>> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻',
}
const SUB_OUT: Readonly<Record<string, string>> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
}

/** Elements that form diatomic ions/molecules, so a lone `X2+` / `X2-` could be X₂± or X²±. */
const DIATOMIC_FORMERS: ReadonlySet<string> = new Set(['H', 'N', 'O', 'F', 'Cl', 'Br', 'I', 'P', 'S'])

/** The only bare `<element><digits>` shapes that are molecules rather than locants or quantities. */
const BARE_MOLECULES: ReadonlySet<string> = new Set(['H2', 'N2', 'O2', 'O3', 'F2', 'Cl2', 'Br2', 'I2', 'P4', 'S8'])

function chargeSup(charge: number): string {
  if (charge === 0) return ''
  const n = Math.abs(charge)
  return (n === 1 ? '' : [...String(n)].map((d) => SUP_OUT[d]).join('')) + (charge > 0 ? SUP_OUT['+'] : SUP_OUT['-'])
}

/** `SO4` → `SO₄`, `Ca(OH)2` → `Ca(OH)₂`, `CuSO4.5H2O` → `CuSO₄·5H₂O`. */
function subscriptBody(body: string): string {
  let out = ''
  let prev = ''
  for (const c of body) {
    if (c === '.') { out += '·'; prev = '.'; continue }
    if (/\d/.test(c) && (/[A-Za-z)\]]/.test(prev) || (/\d/.test(prev) && /[₀-₉]/.test(out.slice(-1))))) {
      out += SUB_OUT[c]
    } else {
      out += c
    }
    prev = c
  }
  return out
}

/**
 * One whitespace-free token, typeset — or `null` when it is not an ASCII-notation
 * species this module is sure about (already typeset, a word, ambiguous, …).
 */
export function typesetSpecies(core: string): string | null {
  // ¹ ² ³ live in Latin-1, outside the contiguous U+2070 block, so they are listed explicitly.
  if (!core || /[₀-₉⁰¹²³⁴-⁹⁺⁻]/.test(core)) return null
  if (/^e[-−]$/.test(core)) return 'e⁻'
  if (!/\d|[+\-−](?:\((?:s|l|g|aq)\))?$/.test(core)) return null

  const sp = parseSpecies(core)
  if (!sp.ok || !sp.hasChemSignal || sp.ambiguous) return null

  const cm = core.match(/^(\d+\/\d+|\d+(?:\.\d+)?|[½¼¾⅓⅔⅛])\s*(?=[A-Za-z(\[])/)
  const prefix = cm ? cm[0] : ''
  if (sp.isElectron) return prefix + 'e⁻'          // 2e-  →  2e⁻
  const afterPrefix = core.slice(prefix.length)

  // O2- / H2+ …: oxide-or-superoxide, H₂⁺-or-H²⁺ — not decidable from ASCII.
  const monoSign = afterPrefix.match(/^([A-Z][a-z]?)\d[+\-−]$/)
  if (monoSign && DIATOMIC_FORMERS.has(monoSign[1])) return null

  // A lone <element><digits> with nothing else is a molecule only for the known diatomics/allotropes.
  const bare = afterPrefix.match(/^([A-Z][a-z]?)(\d+)$/)
  if (bare && sp.charge === 0 && sp.state === null && !cm && !BARE_MOLECULES.has(bare[0])) return null

  const out = prefix + subscriptBody(sp.body) + chargeSup(sp.charge) + (sp.state ? `(${sp.state})` : '')
  return out === core ? null : out
}

/** Quotes and sentence punctuation that can sit around a formula without being part of it. */
const EDGE_PUNCT = /[\s"'“”‘’<>!?]/

function typesetPart(part: string): string {
  let a = 0
  let b = part.length
  while (a < b && EDGE_PUNCT.test(part[a])) a++
  while (b > a && (EDGE_PUNCT.test(part[b - 1]) || part[b - 1] === '.')) b--
  const lead = part.slice(0, a)
  const trail = part.slice(b)
  let core = part.slice(a, b)
  if (!core) return part

  const tried = typesetSpecies(core)
  if (tried !== null) return lead + tried + trail

  // "(NH3)" wrapping the whole token, or one unbalanced bracket from the surrounding prose.
  let pre = ''
  let post = ''
  if (core.length > 2 && ((core[0] === '(' && core.endsWith(')')) || (core[0] === '[' && core.endsWith(']')))) {
    const inner = core.slice(1, -1)
    const open = core[0]
    const close = core.at(-1) as string
    let depth = 0
    let wraps = true
    for (let i = 0; i < core.length; i++) {
      if (core[i] === open) depth++
      else if (core[i] === close) depth--
      if (depth === 0 && i < core.length - 1) { wraps = false; break }
    }
    if (wraps) { pre = open; post = close; core = inner }
  }
  if (!pre && core[0] === '(' && !core.includes(')')) { pre = '('; core = core.slice(1) }
  if (!post && core.endsWith(')') && !core.includes('(')) { post = ')'; core = core.slice(0, -1) }
  if (!pre && !post) return part
  const t = typesetSpecies(core)
  return t === null ? part : lead + pre + t + post + trail
}

/**
 * Typeset every ASCII-notation formula/ion in a string of figure text.
 * Everything that is not such a token — prose, numbers, units, arrows, already
 * typeset text — is returned byte-identical.
 */
export function typesetChemText(text: string): string {
  if (typeof text !== 'string' || !/\d|[+\-−]/.test(text) || !/[A-Za-z]/.test(text)) return text
  return text.replace(/\S+/g, (chunk) => {
    if (/^https?:\/\//.test(chunk)) return chunk
    return chunk.split(/([=–—,;:/]+)/).map((p, i) => (i % 2 === 1 ? p : typesetPart(p))).join('')
  })
}
