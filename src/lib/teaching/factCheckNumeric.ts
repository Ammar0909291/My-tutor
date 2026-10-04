/**
 * PHASE 5 — FACT-CHECK GATE, NUMBERS (owner go-ahead 2026-10-04: "proposal
 * item 1, step 1"). The numeric check of the Physics Verifier programme
 * (V2 §4.2), built here beside `factCheck.ts`'s F1 rather than as a new
 * pipeline. Pure functions: nothing here is wired to a route yet — measuring
 * precision offline (step 2) and a production shadow (step 3) come first, by
 * the same 90%-precision serve bar `factCheck.ts` uses.
 *
 * WHY. Measured in a live lesson (phys.mod.lasers, 2026-10-04): the model's own
 * "real example" said a 1 W torch emits "roughly 10⁹ times more photons" than a
 * 5 mW laser — the power ratio is 200. Authored content was right; the free
 * prose around it was not, and nothing checked it.
 *
 * THREE DETECTORS, ALL ABSTAIN-BY-DEFAULT. Each returns a flag only when the
 * prose itself supplies everything needed to prove the number wrong; anything
 * it cannot parse, any unit it does not know, any comparison whose inputs are
 * not stated, passes untouched.
 *
 *  N1 arithmetic — a written calculation ("(12 − 6.2)/100 = 58 mA",
 *     "1240 ÷ 632.8 = 1.96 eV") is re-evaluated. The tolerance is the larger of
 *     2 % (5 % after "≈") and half a unit in the last stated digit, and a result
 *     that differs only by an SI prefix (×10³ⁿ), a percent (×10²) or minutes /
 *     hours is accepted — those are unit conversions, not errors.
 *  N2 ratio claims — "N times more/less/greater …" is compared with the ratio
 *     of two stated quantities of the same kind in the same or previous
 *     sentence. Allowed powers depend on the unit (length ¹ ² ³ ½, wavelength
 *     ⁴, temperature ⁴, speed ², time ²), so inverse-square, T⁴ and pendulum
 *     claims pass; flagged only when every allowed power misses by more than a
 *     factor of 2.5.
 *  N3 authored conflict — a quantity is flagged only when the same sentence
 *     shares at least two OTHER quantities (value and unit) with one authored
 *     sentence — the same setup — and its value matches none of that authored
 *     sentence's quantities in the same unit.
 */

// ── numbers and units ─────────────────────────────────────────────────────────

const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' }
const fromSup = (s: string) => s.split('').map((c) => SUP[c] ?? c).join('')

const PREFIX: Record<string, number> = { p: 1e-12, n: 1e-9, µ: 1e-6, μ: 1e-6, u: 1e-6, m: 1e-3, c: 1e-2, k: 1e3, M: 1e6, G: 1e9, T: 1e12 }
// Base symbols (case-sensitive). Value: canonical base name.
const BASE: Record<string, string> = {
  m: 'm', g: 'g', s: 's', A: 'A', V: 'V', W: 'W', J: 'J', N: 'N', Pa: 'Pa', Hz: 'Hz', Ω: 'Ω', C: 'C', F: 'F', H: 'H', T: 'T', K: 'K',
  eV: 'eV', L: 'L', mol: 'mol', Wb: 'Wb', Sv: 'Sv', Gy: 'Gy', Bq: 'Bq', VA: 'VA', D: 'D', pc: 'pc', ly: 'ly', '°': '°', '%': '%',
}
const SPECIAL: Record<string, [string, number]> = {
  min: ['s', 60], h: ['s', 3600], hr: ['s', 3600], day: ['s', 86400], days: ['s', 86400], kg: ['g', 1000], '°C': ['°C', 1],
  Mpc: ['pc', 1e6], kpc: ['pc', 1e3], AU: ['AU', 1],
}
const WORD_UNITS: Record<string, [string, number]> = {
  watt: ['W', 1], watts: ['W', 1], milliwatt: ['W', 1e-3], milliwatts: ['W', 1e-3], kilowatt: ['W', 1e3], kilowatts: ['W', 1e3], megawatt: ['W', 1e6],
  volt: ['V', 1], volts: ['V', 1], kilovolt: ['V', 1e3], amp: ['A', 1], amps: ['A', 1], ampere: ['A', 1], amperes: ['A', 1], milliamp: ['A', 1e-3],
  metre: ['m', 1], metres: ['m', 1], meter: ['m', 1], meters: ['m', 1], kilometre: ['m', 1e3], kilometres: ['m', 1e3], kilometer: ['m', 1e3], kilometers: ['m', 1e3],
  centimetre: ['m', 1e-2], centimetres: ['m', 1e-2], millimetre: ['m', 1e-3], millimetres: ['m', 1e-3], nanometre: ['m', 1e-9], nanometres: ['m', 1e-9],
  second: ['s', 1], seconds: ['s', 1], minute: ['s', 60], minutes: ['s', 60], hour: ['s', 3600], hours: ['s', 3600],
  kelvin: ['K', 1], joule: ['J', 1], joules: ['J', 1], newton: ['N', 1], newtons: ['N', 1], kilogram: ['g', 1e3], kilograms: ['g', 1e3], gram: ['g', 1], grams: ['g', 1],
  hertz: ['Hz', 1], ohm: ['Ω', 1], ohms: ['Ω', 1],
}

export interface Unit { base: string; factor: number }

/** One unit atom ("mA", "km", "eV", "°C") → base and SI factor, or null if unknown. */
function unitAtom(a: string): Unit | null {
  if (!a) return null
  if (SPECIAL[a]) return { base: SPECIAL[a][0], factor: SPECIAL[a][1] }
  if (BASE[a]) return { base: BASE[a], factor: 1 }
  if (a.length >= 2 && PREFIX[a[0]] !== undefined && BASE[a.slice(1)] && a.slice(1) !== '°' && a.slice(1) !== '%') return { base: BASE[a.slice(1)], factor: PREFIX[a[0]] }
  return null
}

/** A compound unit ("m/s²", "km/s/Mpc", "μs/day", "N·m") → base signature and factor. */
export function parseUnit(raw: string): Unit | null {
  const word = WORD_UNITS[raw.toLowerCase()]
  if (word) return { base: word[0], factor: word[1] }
  const parts = raw.split(/([/·])/)
  let base = ''
  let factor = 1
  let op = '·'
  for (const p of parts) {
    if (p === '/' || p === '·') { op = p; continue }
    const m = p.match(/^([^²³⁻¹⁰⁴⁵⁶⁷⁸⁹]+)([²³⁻¹⁰⁴⁵⁶⁷⁸⁹]*)$/)
    if (!m) return null
    const u = unitAtom(m[1])
    if (!u) return null
    const pow = m[2] ? Number(fromSup(m[2])) : 1
    if (!Number.isFinite(pow)) return null
    const f = Math.pow(u.factor, pow)
    factor = op === '/' ? factor / f : factor * f
    base += (base ? op : '') + u.base + (m[2] ?? '')
  }
  return base ? { base, factor } : null
}

// A number: digit groups ("13 600", "1,000"), decimals, "× 10¹⁶" / "x 10^16" /
// "e16" exponents, unicode minus. Captured in one regex so a mantissa and its
// power of ten are never split.
const NUM_SRC = String.raw`(?:[−-](?=\d))?(?:10[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+(?![\d.])|(?:\d{1,3}(?:[,   ]\d{3})+(?!\d)|\d+)(?:\.\d+)?(?:\s*[×x]\s*10(?:\^\s*[−-]?\d+|[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)|e[+−-]?\d+)?)`
const NUM_RE = new RegExp(NUM_SRC, 'y')

/** Value of a matched number string. */
export function numberValue(s: string): number {
  let t = s.replace(/[  , ]/g, '').replace(/−/g, '-')
  const bare = t.match(/^(-?)10([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)
  if (bare) return (bare[1] ? -1 : 1) * Math.pow(10, Number(fromSup(bare[2])))
  const pow = t.match(/[×x]10(?:\^([−-]?\d+)|([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))$/)
  if (pow) {
    const e = Number((pow[1] ?? fromSup(pow[2] ?? '')).replace(/−/g, '-'))
    t = t.slice(0, pow.index)
    return Number(t) * Math.pow(10, e)
  }
  return Number(t)
}

/** Half a unit in the last stated digit of a number string, relative to its value. */
function statedPrecision(s: string, value: number): number {
  if (!value) return 0
  const t = s.replace(/[  , ]/g, '').replace(/−/g, '-')
  if (/^-?10[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/.test(t)) return 0.5 // a bare power of ten is an order of magnitude
  const mant = t.match(/^-?(\d+)(?:\.(\d+))?/)
  if (!mant) return 0
  const powM = t.match(/[×x]10(?:\^([−-]?\d+)|([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))$|e([+−-]?\d+)$/)
  const e = powM ? Number((powM[1] ?? (powM[2] ? fromSup(powM[2]) : powM[3]) ?? '0').replace(/−/g, '-')) : 0
  let ulp: number
  if (mant[2]) ulp = Math.pow(10, -mant[2].length)
  else ulp = Math.pow(10, (mant[1].match(/0+$/)?.[0].length ?? 0)) // "20000" may be rounded to its leading digit
  return (0.5 * ulp * Math.pow(10, e)) / Math.abs(value)
}

// ── tokens ───────────────────────────────────────────────────────────────────

type Tok =
  | { k: 'num'; v: number; text: string; unit: Unit | null; unitText: string }
  | { k: 'op'; v: string }
  | { k: 'lp' } | { k: 'rp' }
  | { k: 'pow'; v: number }
  | { k: 'sqrt' }
  | { k: 'word'; v: string }

const VULGAR: Record<string, number> = { '½': 1 / 2, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 1 / 4, '¾': 3 / 4, '⅕': 1 / 5, '⅛': 1 / 8 }

const UNIT_AFTER = /^[  ]?([A-Za-zµμΩ°%][A-Za-zµμΩ°%·/²³⁻¹⁰⁴⁵⁶⁷⁸⁹]*)/

function tokenize(s: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (/\s/.test(c)) { i++; continue }
    NUM_RE.lastIndex = i
    const nm = /\d|[−-]/.test(c) ? NUM_RE.exec(s) : null
    // A leading minus is a number's sign only where an operand is expected.
    const prev = out[out.length - 1]
    const signAllowed = !prev || prev.k === 'op' || prev.k === 'lp' || prev.k === 'word'
    if (nm && nm.index === i && nm[0].length && (/\d/.test(c) || signAllowed)) {
      let j = i + nm[0].length
      let unit: Unit | null = null
      let unitText = ''
      const um = s.slice(j).match(UNIT_AFTER)
      if (um) {
        // "5‑milliwatt", "1-watt": a hyphenated unit word also counts.
        const u = parseUnit(um[1].replace(/[.,;:]+$/, ''))
        if (u) { unit = u; unitText = um[1]; j += um[0].length }
      } else {
        const hm = s.slice(j).match(/^[‑-]([a-z]+)/)
        if (hm && WORD_UNITS[hm[1]]) { unit = { base: WORD_UNITS[hm[1]][0], factor: WORD_UNITS[hm[1]][1] }; unitText = hm[1]; j += hm[0].length }
      }
      out.push({ k: 'num', v: numberValue(nm[0]), text: nm[0], unit, unitText })
      i = j
      continue
    }
    if ('+−-×x*·/÷^'.includes(c)) {
      // "x" is multiplication only between operands ("5 x 9.8"), never a word letter.
      if (c === 'x' && !(prev && (prev.k === 'num' || prev.k === 'rp'))) { const w = s.slice(i).match(/^[\p{L}\p{N}_']+/u)!; out.push({ k: 'word', v: w[0] }); i += w[0].length; continue }
      out.push({ k: 'op', v: c === '−' ? '-' : c === '×' || c === 'x' || c === '·' ? '*' : c === '÷' ? '/' : c })
      i++
      continue
    }
    if (c === '(') { out.push({ k: 'lp' }); i++; continue }
    if (c === ')') { out.push({ k: 'rp' }); i++; continue }
    if (c === '√') { out.push({ k: 'sqrt' }); i++; continue }
    if (VULGAR[c] !== undefined) { out.push({ k: 'num', v: VULGAR[c], text: c, unit: null, unitText: '' }); i++; continue }
    if (c === 'π') { out.push({ k: 'num', v: Math.PI, text: 'π', unit: null, unitText: '' }); i++; continue }
    if (/[²³]/.test(c)) { out.push({ k: 'pow', v: Number(fromSup(c)) }); i++; continue }
    const w = s.slice(i).match(/^[\p{L}\p{N}_'’]+/u)
    if (w) { out.push({ k: 'word', v: w[0] }); i += w[0].length; continue }
    out.push({ k: 'word', v: c }) // any other symbol breaks an expression
    i++
  }
  return out
}

// ── evaluation (recursive descent over a token slice) ─────────────────────────

interface Evaluated { value: number; ops: number; units: Unit[] }

function evaluate(toks: Tok[]): Evaluated | null {
  let i = 0
  let ops = 0
  const units: Unit[] = []
  const peek = () => toks[i]
  function primary(): number | null {
    const t = peek()
    if (!t) return null
    if (t.k === 'op' && t.v === '-') { i++; const v = primary(); return v === null ? null : -v }
    if (t.k === 'sqrt') { i++; ops++; const v = postfix(); return v === null || v < 0 ? null : Math.sqrt(v) }
    if (t.k === 'num') { i++; if (t.unit) units.push(t.unit); return t.v }
    if (t.k === 'lp') {
      i++
      const v = sum()
      if (v === null || peek()?.k !== 'rp') return null
      i++
      return v
    }
    return null
  }
  function postfix(): number | null {
    let v = primary()
    while (v !== null) {
      const t = peek()
      if (t?.k === 'pow') { i++; ops++; v = Math.pow(v, t.v); continue }
      if (t?.k === 'op' && t.v === '^') {
        i++; ops++
        const e = primary()
        if (e === null) return null
        v = Math.pow(v, e)
        continue
      }
      // Implicit product: "2π", "2 × π√(…)" is written as "2π√(…)".
      if (t && (t.k === 'sqrt' || (t.k === 'num' && t.text === 'π') || t.k === 'lp')) {
        const r = primary()
        if (r === null) return null
        ops++
        v *= r
        continue
      }
      break
    }
    return v
  }
  function product(): number | null {
    let v = postfix()
    while (v !== null) {
      const t = peek()
      if (t?.k !== 'op' || (t.v !== '*' && t.v !== '/')) break
      i++; ops++
      const r = postfix()
      if (r === null) return null
      v = t.v === '*' ? v * r : v / r
    }
    return v
  }
  function sum(): number | null {
    let v = product()
    while (v !== null) {
      const t = peek()
      if (t?.k !== 'op' || (t.v !== '+' && t.v !== '-')) break
      i++; ops++
      const r = product()
      if (r === null) return null
      v = t.v === '+' ? v + r : v - r
    }
    return v
  }
  const value = sum()
  if (value === null || i !== toks.length || !Number.isFinite(value)) return null
  return { value, ops, units }
}

const isExprTok = (t: Tok) => t.k !== 'word'

const FUNCS = /^(?:sin|cos|tan|sec|cosec|csc|cot|arcsin|arccos|arctan|log|ln|lg|exp|sqrt|abs)$/i

/**
 * Longest trailing run of expression tokens (balanced parentheses). Empty —
 * abstain — when a word is an operand of the run: a variable ("x + 4(−2)",
 * "8 corners × 1/8") or a function ("sqrt(32/2)", "sin 30°").
 */
function trailingExpr(toks: Tok[]): Tok[] {
  let start = toks.length
  while (start > 0 && isExprTok(toks[start - 1])) start--
  const before = toks[start - 1]
  const first = toks[start]
  if (before?.k === 'word' && first && (first.k !== 'num' || FUNCS.test(before.v))) return []
  let run = toks.slice(start)
  // Drop leading operators/unbalanced ")" left over from the cut.
  while (run.length && (run[0].k === 'op' && run[0].v !== '-' || run[0].k === 'rp')) run = run.slice(1)
  let depth = 0
  for (const t of run) { if (t.k === 'lp') depth++; if (t.k === 'rp') depth-- }
  while (depth > 0 && run.length && run[0].k === 'lp') { run = run.slice(1); depth-- }
  return run
}

/** Longest leading run of expression tokens; empty when it runs into a variable ("= 2 × v"). */
function leadingExpr(toks: Tok[]): Tok[] {
  let end = 0
  while (end < toks.length && isExprTok(toks[end])) end++
  let run = toks.slice(0, end)
  // "= 17 (one decimal place)": an opening parenthesis before words is an aside.
  while (run.length && run[run.length - 1].k === 'lp') run = run.slice(0, -1)
  const last = run[run.length - 1]
  if (last && (last.k === 'op' || last.k === 'sqrt')) return []
  return run
}

// ── flags ─────────────────────────────────────────────────────────────────────

export type NumericFlagKind = 'arithmetic' | 'ratio' | 'authored'
export interface NumericFlag {
  kind: NumericFlagKind
  sentence: string
  /** The number as written in the prose. */
  claimed: string
  /** What the prose's own inputs (or the authored sentence) give. */
  expected: string
  detail: string
}

// A decimal point ("9.8") never ends a sentence.
const sentencesOf = (prose: string) => (prose.match(/(?:[^.!?\n]|\.(?=\d))+(?:[.!?]|\n|$)/g) ?? []).map((s) => s.trim()).filter(Boolean)

const fmt = (v: number) => (Math.abs(v) >= 1e5 || (Math.abs(v) < 1e-3 && v !== 0) ? v.toExponential(2) : String(Math.round(v * 1000) / 1000))

/** Is `got` an acceptable statement of `exact`, allowing unit-conversion factors? */
function agrees(exact: number, got: number, tol: number, extraFactors: number[]): boolean {
  if (exact === 0 || got === 0) return Math.abs(exact - got) <= tol * Math.max(Math.abs(exact), Math.abs(got), 1e-12)
  const factors = [1, ...extraFactors]
  for (let k = -5; k <= 5; k++) if (k) factors.push(Math.pow(1000, k))
  return factors.some((f) => Math.abs(exact * f - got) <= tol * Math.abs(got))
}

/** N1 — re-evaluate every written calculation. */
export function checkArithmetic(prose: string): NumericFlag[] {
  const flags: NumericFlag[] = []
  for (const sentence of sentencesOf(prose)) {
    if (!/[=≈≃]/.test(sentence)) continue
    const parts = sentence.split(/([=≈≃])/)
    const segs: Tok[][] = []
    const rels: string[] = []
    for (const p of parts) { if (/^[=≈≃]$/.test(p)) rels.push(p); else segs.push(tokenize(p)) }
    for (let r = 0; r < rels.length; r++) {
      const lhs = trailingExpr(segs[r])
      const rhs = leadingExpr(segs[r + 1])
      if (!lhs.length || !rhs.length) continue
      const L = evaluate(lhs)
      const R = evaluate(rhs)
      // A bare number on the left is a definition or a unit conversion
      // ("1 eV = 1.6 × 10⁻¹⁹ J"), not arithmetic; the right must be one number.
      if (!L || !R || L.ops === 0 || R.ops !== 0) continue
      if (L.units.some((u) => u.base === '°')) continue // an angle inside trig, not arithmetic on degrees
      const rhsTok = rhs.find((t) => t.k === 'num') as Extract<Tok, { k: 'num' }>
      const approx = rels[r] !== '='
      const tol = Math.max(approx ? 0.05 : 0.02, statedPrecision(rhsTok.text, R.value))
      const extra: number[] = []
      const allUnits = [...L.units, ...R.units]
      if (allUnits.some((u) => u.base === '%') || /%/.test(rhsTok.unitText)) extra.push(100, 0.01)
      if (allUnits.some((u) => u.base === 's')) extra.push(60, 1 / 60, 3600, 1 / 3600)
      if (agrees(L.value, R.value, tol, extra)) continue
      flags.push({
        kind: 'arithmetic',
        sentence,
        claimed: rhsTok.text + (rhsTok.unitText ? ` ${rhsTok.unitText}` : ''),
        expected: fmt(L.value),
        detail: `${lhs.length} tokens evaluate to ${fmt(L.value)}, stated ${fmt(R.value)}`,
      })
    }
  }
  return flags
}

// Powers a ratio of two same-unit quantities may legitimately be raised to.
function allowedPowers(base: string): number[] {
  if (base === 'm') return [1, 2, 3, 0.5, 4] // length; 4 = Rayleigh λ⁴ (wavelengths in nm)
  if (base === 'K') return [1, 4]
  if (base === 's' || base === 'm/s') return [1, 2]
  if (base === 'A' || base === 'V') return [1, 2]
  return [1]
}

const RATIO_RE = new RegExp(String.raw`(${NUM_SRC}|10[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)\s*(?:times|×|-fold|‑fold)\s+(?:more|less|greater|larger|bigger|higher|lower|smaller|brighter|dimmer|faster|slower|stronger|weaker|longer|shorter|as)\b`, 'gi')

/** N2 — "N times more" against the ratio of two stated same-kind quantities. */
export function checkRatioClaims(prose: string): NumericFlag[] {
  const flags: NumericFlag[] = []
  const sents = sentencesOf(prose)
  for (let si = 0; si < sents.length; si++) {
    const sentence = sents[si]
    RATIO_RE.lastIndex = 0
    for (let m = RATIO_RE.exec(sentence); m; m = RATIO_RE.exec(sentence)) {
      const claimText = m[1]
      const claim = /^10[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/.test(claimText) ? Math.pow(10, Number(fromSup(claimText.slice(2)))) : numberValue(claimText)
      if (!(claim > 1)) continue
      // Quantities with units in this sentence and the one before, by base.
      const window = (si > 0 ? sents[si - 1] + ' ' : '') + sentence
      const byBase = new Map<string, number[]>()
      for (const t of tokenize(window)) {
        if (t.k !== 'num' || !t.unit || t.unit.base === '%' || t.unit.base === '°') continue
        const v = Math.abs(t.v * t.unit.factor)
        if (!v) continue
        const list = byBase.get(t.unit.base) ?? []
        if (!list.some((x) => Math.abs(x - v) <= 1e-9 * v)) list.push(v)
        byBase.set(t.unit.base, list)
      }
      // Exactly one kind with exactly two values — otherwise it is ambiguous.
      const pairs = [...byBase.entries()].filter(([, vs]) => vs.length === 2)
      if (pairs.length !== 1) continue
      const [base, [a, b]] = pairs[0]
      const ratio = Math.max(a, b) / Math.min(a, b)
      if (ratio <= 1) continue
      const off = Math.min(...allowedPowers(base).map((k) => Math.abs(Math.log10(claim) - k * Math.log10(ratio))))
      if (off <= Math.log10(2.5)) continue
      flags.push({
        kind: 'ratio',
        sentence,
        claimed: `${claimText} times`,
        expected: `about ${fmt(ratio)} (ratio of ${fmt(Math.max(a, b))} to ${fmt(Math.min(a, b))} ${base})`,
        detail: `claimed ×${fmt(claim)} vs stated quantities ×${fmt(ratio)}; no allowed power (${allowedPowers(base).join(', ')}) brings them within ×2.5`,
      })
    }
  }
  return flags
}

interface Quantity { v: number; base: string; text: string }
function quantities(sentence: string): Quantity[] {
  const out: Quantity[] = []
  for (const t of tokenize(sentence)) if (t.k === 'num' && t.unit) out.push({ v: t.v * t.unit.factor, base: t.unit.base, text: `${t.text} ${t.unitText}`.trim() })
  return out
}
const same = (a: number, b: number, tol: number) => Math.abs(a - b) <= tol * Math.max(Math.abs(a), Math.abs(b), 1e-30)

/** N3 — a quantity that contradicts an authored sentence describing the same setup. */
export function checkAgainstAuthored(prose: string, authored: string[]): NumericFlag[] {
  const ref = authored.flatMap(sentencesOf).map((s) => ({ s, q: quantities(s) })).filter((r) => r.q.length >= 3)
  if (!ref.length) return []
  const flags: NumericFlag[] = []
  for (const sentence of sentencesOf(prose)) {
    const q = quantities(sentence)
    if (q.length < 3) continue
    for (const cand of q) {
      for (const r of ref) {
        const anchors = q.filter((x) => x !== cand && r.q.some((y) => y.base === x.base && same(x.v, y.v, 0.01)))
        if (anchors.length < 2) continue
        const sameUnit = r.q.filter((y) => y.base === cand.base)
        if (!sameUnit.length || sameUnit.some((y) => same(cand.v, y.v, 0.05))) continue
        // The candidate's unit must not also be an anchor's unit with a
        // matching value elsewhere — that is a different role, not a conflict.
        if (sameUnit.length > 1 && anchors.some((x) => x.base === cand.base)) continue
        flags.push({
          kind: 'authored',
          sentence,
          claimed: cand.text,
          expected: sameUnit.map((y) => y.text).join(' / '),
          detail: `same setup as authored "${r.s.slice(0, 140)}" (shares ${anchors.map((x) => x.text).join(', ')})`,
        })
        break
      }
    }
  }
  return flags
}

/** All three checks. `authored` is the concept's authored prose (explanations, probe answers). */
export function checkNumericClaims(prose: string, authored: string[] = []): NumericFlag[] {
  if (!prose || !/\d/.test(prose)) return []
  return [...checkArithmetic(prose), ...checkRatioClaims(prose), ...checkAgainstAuthored(prose, authored)]
}
