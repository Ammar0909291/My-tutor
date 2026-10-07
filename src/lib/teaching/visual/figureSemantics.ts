/**
 * Figure semantics — deterministic checks on the PHYSICS a figure states.
 *
 * Scope is deliberately narrow and honest: this verifies what can be established
 * by arithmetic and dimensional analysis alone, and says "cannot tell" for
 * everything else. It never guesses, never calls a model, and a figure it cannot
 * check is REVIEW_REQUIRED upstream — never PASS.
 *
 * WHAT IS CHECKED
 *   A figure label such as `P = W/t = 2943 J / 12 s = 245 W` is a CHAIN of
 *   claimed-equal expressions. Every link that can be evaluated (numbers, units,
 *   known symbols bound elsewhere in the same figure, g, π) is evaluated to an SI
 *   value with a dimension vector, and adjacent evaluable links must agree in
 *   both dimension and value. A slip in the arithmetic, or a unit slip
 *   (m/s written where m/s² belongs) is a contradiction the figure makes with
 *   itself — no reference answer needed.
 *
 * WHAT IS NOT: whether the geometry is right (directions, vectors, curve shapes)
 * — those need per-figure assertions, which the authored batches already have
 * (see physicsCoreScenesBatch*.test.ts) and which the audit counts as evidence.
 *
 * AMBIGUITY RULE. `m` is metres and mass, `g` gram and gravity, `h` hour and
 * height. A unit is therefore recognised ONLY when attached to a numeric literal
 * ("9.8 m/s²", "12 s") — a bare letter is a variable, never a unit. A variable is
 * evaluable only when the same figure binds it to ONE quantity ("m = 5 kg").
 */

// ── dimensions ───────────────────────────────────────────────────────────────

/** [kg, m, s, A, K, mol, cd] exponents. */
type Dim = [number, number, number, number, number, number, number]
const D = (kg = 0, m = 0, s = 0, A = 0, K = 0, mol = 0, cd = 0): Dim => [kg, m, s, A, K, mol, cd]
const ZERO = D()

interface Quantity { v: number; d: Dim }

const dimMul = (a: Dim, b: Dim): Dim => a.map((x, i) => x + b[i]) as Dim
const dimDiv = (a: Dim, b: Dim): Dim => a.map((x, i) => x - b[i]) as Dim
const dimPow = (a: Dim, n: number): Dim => a.map((x) => x * n) as Dim
const dimEq = (a: Dim, b: Dim): boolean => a.every((x, i) => Math.abs(x - b[i]) < 1e-9)

export function formatDim(d: Dim): string {
  const names = ['kg', 'm', 's', 'A', 'K', 'mol', 'cd']
  const parts = d.map((e, i) => (e === 0 ? '' : e === 1 ? names[i] : `${names[i]}^${e}`)).filter(Boolean)
  return parts.length ? parts.join('·') : '1'
}

// SI base + derived units. Value is the factor to the coherent SI unit.
const BASE_UNITS: Record<string, Quantity> = {
  m: { v: 1, d: D(0, 1) },
  g: { v: 1e-3, d: D(1) },
  s: { v: 1, d: D(0, 0, 1) },
  A: { v: 1, d: D(0, 0, 0, 1) },
  K: { v: 1, d: D(0, 0, 0, 0, 1) },
  mol: { v: 1, d: D(0, 0, 0, 0, 0, 1) },
  cd: { v: 1, d: D(0, 0, 0, 0, 0, 0, 1) },
  N: { v: 1, d: D(1, 1, -2) },
  J: { v: 1, d: D(1, 2, -2) },
  W: { v: 1, d: D(1, 2, -3) },
  Pa: { v: 1, d: D(1, -1, -2) },
  Hz: { v: 1, d: D(0, 0, -1) },
  V: { v: 1, d: D(1, 2, -3, -1) },
  Ω: { v: 1, d: D(1, 2, -3, -2) },
  C: { v: 1, d: D(0, 0, 1, 1) },
  F: { v: 1, d: D(-1, -2, 4, 2) },
  T: { v: 1, d: D(1, 0, -2, -1) },
  Wb: { v: 1, d: D(1, 2, -2, -1) },
  H: { v: 1, d: D(1, 2, -2, -2) },
  eV: { v: 1.602176634e-19, d: D(1, 2, -2) },
  L: { v: 1e-3, d: D(0, 3) },
}
// Whole-word units that are not prefix + base.
const WORD_UNITS: Record<string, Quantity> = {
  min: { v: 60, d: D(0, 0, 1) },
  h: { v: 3600, d: D(0, 0, 1) },
  hr: { v: 3600, d: D(0, 0, 1) },
  ohm: { v: 1, d: D(1, 2, -3, -2) },
  kWh: { v: 3.6e6, d: D(1, 2, -2) },
  atm: { v: 101325, d: D(1, -1, -2) },
}
const PREFIX: Record<string, number> = {
  p: 1e-12, n: 1e-9, µ: 1e-6, μ: 1e-6, u: 1e-6, m: 1e-3, c: 1e-2, d: 1e-1, k: 1e3, M: 1e6, G: 1e9,
}

function unitOf(token: string): Quantity | null {
  if (WORD_UNITS[token]) return WORD_UNITS[token]
  if (BASE_UNITS[token]) return BASE_UNITS[token]
  // prefix + base ("km", "mm", "µF", "kΩ"); never split a token that is itself a base unit.
  const p = token[0]
  if (token.length >= 2 && PREFIX[p] !== undefined && BASE_UNITS[token.slice(1)]) {
    const u = BASE_UNITS[token.slice(1)]
    return { v: u.v * PREFIX[p], d: u.d }
  }
  return null
}

// ── tokenising ───────────────────────────────────────────────────────────────

const SUPER: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' }
const VULGAR: Record<string, number> = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3 }

type Tok =
  | { t: 'num'; v: number }
  | { t: 'word'; s: string }
  | { t: 'op'; s: '+' | '-' | '*' | '/' | '^' | '(' | ')' | '√' }

function tokenize(src: string): Tok[] | null {
  const s = src
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => '^' + [...m].map((c) => SUPER[c]).join(''))
    .replace(/[−–]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/\s+/g, ' ')
    .trim()
  const out: Tok[] = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (c === ' ') { i++; continue }
    const num = /^(\d+(?:[.,]\d+)?|\.\d+)/.exec(s.slice(i))
    if (num) { out.push({ t: 'num', v: Number(num[1].replace(',', '.')) }); i += num[1].length; continue }
    if (VULGAR[c] !== undefined) { out.push({ t: 'num', v: VULGAR[c] }); i++; continue }
    if (c === 'π') { out.push({ t: 'num', v: Math.PI }); i++; continue }
    if ('+-*/^()√'.includes(c)) { out.push({ t: 'op', s: c as never }); i++; continue }
    const word = /^[A-Za-zΩµμ]+/.exec(s.slice(i))
    if (word) { out.push({ t: 'word', s: word[0] }); i += word[0].length; continue }
    return null // %, °, |, subscripts, anything else: not arithmetic
  }
  return out
}

// ── evaluation ───────────────────────────────────────────────────────────────

export type Bindings = Record<string, Quantity>

class Unevaluable extends Error {}

/**
 * Recursive-descent evaluator. A bare letter is a variable (looked up in
 * `bindings`); letters that follow a numeric literal are units. Juxtaposition
 * binds tighter than `/`, so "2943 J / 12 s" is (2943 J) / (12 s).
 */
function evaluate(tokens: Tok[], bindings: Bindings, preferVars: boolean, stripUnits = false): Quantity {
  let i = 0
  const peek = () => tokens[i]
  const isOp = (s: string) => peek()?.t === 'op' && (peek() as { s: string }).s === s

  function unitTail(base: Quantity): Quantity {
    // A number may carry a unit expression: m, kg, m/s², N·m, kg m. A "/"
    // continues the unit only when a unit (not a number) follows it.
    let q = base
    for (;;) {
      const t = peek()
      if (t?.t === 'word') {
        // Second reading of an ambiguous letter (`m`, `g`, `h`…): the figure
        // bound it as a variable, so after a number it is a factor, not a unit.
        if (preferVars && bindings[t.s]) return q
        const u = unitOf(t.s)
        // A word that is not a unit but IS a bound symbol ends the unit tail:
        // "2 m v" is two metres times the figure's `v`, read as units.
        if (!u && bindings[t.s]) return q
        if (!u) throw new Unevaluable(`unknown unit ${t.s}`)
        i++
        q = applyUnit(q, u, +1)
        continue
      }
      if (t?.t === 'op' && (t.s === '*' || t.s === '/')) {
        const nxt = tokens[i + 1]
        if (nxt?.t === 'word' && unitOf(nxt.s)) {
          const u = unitOf(nxt.s)!
          i += 2
          q = applyUnit(q, u, t.s === '/' ? -1 : +1)
          continue
        }
      }
      return q
    }
  }
  function applyUnit(q: Quantity, u: Quantity, sign: 1 | -1): Quantity {
    let exp = 1
    if (isOp('^')) {
      i++
      let neg = 1
      if (isOp('-')) { neg = -1; i++ }
      const n = peek()
      if (n?.t !== 'num') throw new Unevaluable('exponent')
      i++
      exp = neg * n.v
    }
    const e = sign * exp
    // stripUnits: the unit is consumed and ignored, so the NUMBER a label shows
    // ("1000 MJ" -> 1000) can be compared with a unit-less step of the same chain.
    if (stripUnits) return q
    return { v: q.v * Math.pow(u.v, e), d: dimMul(q.d, dimPow(u.d, e)) }
  }

  function atom(): Quantity {
    const t = peek()
    if (!t) throw new Unevaluable('end')
    if (t.t === 'op' && t.s === '(') {
      i++
      const q = expr()
      if (!isOp(')')) throw new Unevaluable('paren')
      i++
      return powerOf(q)
    }
    if (t.t === 'op' && t.s === '√') {
      i++
      const a = atom()
      if (a.v < 0) throw new Unevaluable('sqrt negative')
      return { v: Math.sqrt(a.v), d: dimPow(a.d, 0.5) }
    }
    if (t.t === 'op' && t.s === '-') { i++; const a = atom(); return { v: -a.v, d: a.d } }
    if (t.t === 'num') {
      i++
      return powerOf(unitTail({ v: t.v, d: ZERO }))
    }
    if (t.t === 'word') {
      const b = bindings[t.s]
      if (!b) throw new Unevaluable(`unbound ${t.s}`)
      i++
      return powerOf(b)
    }
    throw new Unevaluable('atom')
  }
  function powerOf(q: Quantity): Quantity {
    if (!isOp('^')) return q
    i++
    let neg = 1
    if (isOp('-')) { neg = -1; i++ }
    const n = peek()
    if (n?.t !== 'num') throw new Unevaluable('power')
    i++
    const e = neg * n.v
    return { v: Math.pow(q.v, e), d: dimPow(q.d, e) }
  }
  // juxtaposition: "2 π", "2π√(…)", "m g" (both bound) — implicit multiplication.
  function juxt(): Quantity {
    let q = atom()
    while (i < tokens.length) {
      const t = peek()
      const startsAtom = t.t === 'num' || t.t === 'word' || (t.t === 'op' && (t.s === '(' || t.s === '√'))
      if (!startsAtom) break
      const b = atom()
      q = { v: q.v * b.v, d: dimMul(q.d, b.d) }
    }
    return q
  }
  function term(): Quantity {
    let q = juxt()
    while (peek()?.t === 'op' && ((peek() as { s: string }).s === '*' || (peek() as { s: string }).s === '/')) {
      const op = (peek() as { s: string }).s
      i++
      const b = juxt()
      q = op === '*' ? { v: q.v * b.v, d: dimMul(q.d, b.d) } : { v: q.v / b.v, d: dimDiv(q.d, b.d) }
    }
    return q
  }
  function expr(): Quantity {
    let q = term()
    while (peek()?.t === 'op' && ((peek() as { s: string }).s === '+' || (peek() as { s: string }).s === '-')) {
      const op = (peek() as { s: string }).s
      i++
      const b = term()
      if (!dimEq(q.d, b.d)) throw new Unevaluable('adding unlike dimensions')
      q = { v: op === '+' ? q.v + b.v : q.v - b.v, d: q.d }
    }
    return q
  }

  const q = expr()
  if (i !== tokens.length) throw new Unevaluable('trailing')
  if (!Number.isFinite(q.v)) throw new Unevaluable('non-finite')
  return q
}

/** Evaluate one expression string, or null when it cannot be established. */
export function evaluateExpression(src: string, bindings: Bindings = DEFAULT_BINDINGS, stripUnits = false): Quantity | null {
  const tokens = tokenize(src)
  if (!tokens || tokens.length === 0) return null
  // Needs at least one numeric literal or a bound variable to mean anything.
  if (!tokens.some((t) => t.t === 'num' || (t.t === 'word' && bindings[t.s]))) return null
  const attempt = (preferVars: boolean): Quantity | null => {
    try {
      return evaluate(tokens, bindings, preferVars, stripUnits)
    } catch (e) {
      if (e instanceof Unevaluable) return null
      throw e
    }
  }
  // A letter the figure binds as a variable may ALSO be a unit ("2 m" — metres
  // or two masses?). Read it both ways; if both readings evaluate and disagree
  // the expression is ambiguous, and an ambiguous expression is not evidence.
  const units = attempt(false)
  const ambiguous = tokens.some((t) => t.t === 'word' && bindings[t.s] !== undefined)
  if (!ambiguous) return units
  const vars = attempt(true)
  if (units && vars) return dimEq(units.d, vars.d) && agrees(units.v, vars.v, 1e-9) ? units : null
  return units ?? vars
}

/** Constants a figure may use without stating them. */
export const DEFAULT_BINDINGS: Bindings = {}

/** The `g` entry collectBindings seeds, so a lone `g` can be told apart from a figure-bound one. */
const DEFAULT_G_QUANTITY: Quantity = { v: 9.8, d: D(0, 1, -2) }
function DEFAULT_G(b: Bindings): Quantity | undefined {
  return b.g && b.g.v === DEFAULT_G_QUANTITY.v && dimEq(b.g.d, DEFAULT_G_QUANTITY.d) ? b.g : undefined
}

// ── chains ───────────────────────────────────────────────────────────────────

export interface ChainResult {
  text: string
  /** Segments that evaluated, with their SI value and dimension. */
  evaluated: Array<{ expr: string; v: number; dim: string }>
  /** Adjacent evaluable segments that disagree. */
  contradictions: Array<{ a: string; b: string; reason: string; va: number; vb: number }>
  /** True when at least two segments could be compared. */
  checked: boolean
}

/** Relative tolerance between two claimed-equal values; rounding in a label is normal. */
export function agrees(a: number, b: number, tol: number): boolean {
  if (a === b) return true
  const scale = Math.max(Math.abs(a), Math.abs(b))
  if (scale === 0) return true
  return Math.abs(a - b) / scale <= tol
}

/**
 * `m = 5 kg` style single assignments across a figure's texts → bindings.
 * A symbol bound to two different quantities is ambiguous and dropped.
 */
export function collectBindings(texts: readonly string[], g = 9.8): Bindings {
  const seen = new Map<string, Quantity | null>()
  for (const raw of texts) {
    const m = /^\s*([A-Za-zα-ωΔ][A-Za-z0-9α-ω]*|[A-Za-z]_?[A-Za-z0-9]+)\s*=\s*(.+?)\s*$/.exec(raw)
    if (!m) continue
    const name = m[1]
    if (name.length > 3) continue
    if (/=/.test(m[2])) continue // a chain is not a plain assignment
    const q = evaluateExpression(m[2], {})
    if (!q) continue
    const prev = seen.get(name)
    if (prev === undefined) seen.set(name, q)
    else if (prev !== null && !(dimEq(prev.d, q.d) && agrees(prev.v, q.v, 1e-9))) seen.set(name, null)
  }
  const out: Bindings = { g: { v: g, d: D(0, 1, -2) } } // gravity unless the figure redefines g
  for (const [k, q] of seen) if (q) out[k] = q
  // Gravity may be stated in the figure; if so it wins (and 9.8 vs 9.81 both agree within tolerance).
  return out
}

/**
 * Check one text. Equalities are `=` and `≈`; comparisons, proportionality,
 * and anything with `±`, `%`, `°` or `|…|` are not arithmetic and are skipped.
 */
export function checkChain(text: string, bindings: Bindings, tol = 0.03): ChainResult {
  const res: ChainResult = { text, evaluated: [], contradictions: [], checked: false }
  if (/[<>≤≥≠∝±%°|]/.test(text) || /->|→/.test(text)) return res
  if (!/[=≈]/.test(text)) return res
  const approx = /≈/.test(text)
  const segs = text.split(/[=≈]/).map((x) => x.trim()).filter((x) => x.length > 0)
  if (segs.length < 2) return res
  // A chain keeps one statement; a label with a colon prefix ("x–t: x = t²") loses it.
  const cleaned = segs.map((s, idx) => (idx === 0 ? s.replace(/^.*?:\s*/, '') : s))
  const evals: Array<{ expr: string; q: Quantity; raw: Quantity | null; literal: boolean }> = []
  for (const expr of cleaned) {
    // A lone symbol the figure never bound is the DEFAULT g — a label such as
    // "g ≈ 8.7 m/s²" is an assignment (Earth's 9.8 does not apply), not a claim.
    if (/^[A-Za-z]$/.test(expr) && !(bindings[expr] && bindings[expr] !== DEFAULT_G(bindings))) continue
    const q = evaluateExpression(expr, bindings)
    if (q) {
      const literal = tokenize(expr)?.every((t) => t.t !== 'word') ?? false
      evals.push({ expr, q, raw: evaluateExpression(expr, bindings, true), literal })
      res.evaluated.push({ expr, v: q.v, dim: formatDim(q.d) })
    }
  }
  if (evals.length >= 2) {
    res.checked = true
    const t = approx ? Math.max(tol, 0.05) : tol
    for (let k = 1; k < evals.length; k++) {
      const a = evals[k - 1], b = evals[k]
      if (dimEq(a.q.d, b.q.d)) {
        if (!agrees(a.q.v, b.q.v, t)) {
          res.contradictions.push({ a: a.expr, b: b.expr, reason: `values differ (${a.q.v.toPrecision(4)} vs ${b.q.v.toPrecision(4)})`, va: a.q.v, vb: b.q.v })
        }
      } else if (a.literal && a.q.d.every((x) => x === 0) && b.raw) {
        // Units elided in a working line ("2 × 4 = 8 N"): the numbers must still agree.
        if (!agrees(a.q.v, b.raw.v, t)) {
          res.contradictions.push({ a: a.expr, b: b.expr, reason: `numbers differ (${a.q.v.toPrecision(4)} vs ${b.raw.v.toPrecision(4)})`, va: a.q.v, vb: b.raw.v })
        }
      } else if (b.literal && b.q.d.every((x) => x === 0) && a.raw) {
        if (!agrees(a.raw.v, b.q.v, t)) {
          res.contradictions.push({ a: a.expr, b: b.expr, reason: `numbers differ (${a.raw.v.toPrecision(4)} vs ${b.q.v.toPrecision(4)})`, va: a.raw.v, vb: b.q.v })
        }
      } else {
        res.contradictions.push({ a: a.expr, b: b.expr, reason: `dimensions differ (${formatDim(a.q.d)} vs ${formatDim(b.q.d)})`, va: a.q.v, vb: b.q.v })
      }
    }
  }
  return res
}

/** Run every text of one figure. */
export function checkFigureTexts(texts: readonly string[]): { results: ChainResult[]; checked: number; contradictions: number } {
  const bindings = collectBindings(texts)
  // One label may carry several statements ("a = 1.96 m/s²   T = 23.52 N");
  // wide gaps and semicolons separate them, and each is a chain of its own.
  const statements = texts.flatMap((t) => t.split(/\s{2,}|;/).map((x) => x.trim()).filter(Boolean))
  const results = statements.map((t) => checkChain(t, bindings))
  return {
    results,
    checked: results.filter((r) => r.checked).length,
    contradictions: results.reduce((n, r) => n + r.contradictions.length, 0),
  }
}
