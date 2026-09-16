/**
 * DIMENSION ALGEBRA + EXPRESSION PARSER — the deterministic physics
 * verifier's dimensional slice, Batch 0.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5,
 * §6 Batch 0 ("Dimension algebra + parser, unconsumed... Unit tests only.
 * Zero route change."). Not consumed anywhere yet — no `route.ts` change,
 * no `dimensionalViolation` rule (that is §5.4, Batch 5).
 *
 * ── PURE, BY DESIGN, NOT BY DISCIPLINE ──────────────────────────────────────
 * Zero imports. Zero I/O. No `mathjs` (§1.2: it is a 650 KB browser bundle
 * paid for by the visual sandbox, not by the chat hot path — this module
 * needs no CAS at all, per §5's own framing). This is the "not K5, not a
 * CAS" guarantee (§5.1), enforced structurally by
 * `dimensionsPurity.test.ts`, not by convention.
 *
 * ── TOTAL FUNCTIONS, NEVER THROW ────────────────────────────────────────────
 * §5.1's whole design rests on "abstain by default": K5 was disabled because
 * a composed rule rejected a common shape by default. Every function here
 * that can fail (parsing, dimension lookup) returns a discriminated result
 * with a `reason`, never throws and never crashes on malformed input — the
 * `turnProgress.ts` C1-C4 precedent, restated for a parser instead of a
 * counter.
 *
 * ── THE TOKENIZATION RULE THAT MAKES §4.2's CORPUS PARSE, AND REJECTS §4.1's
 *    TWO NAMED FALSE POSITIVES, FOR THE SAME REASON ──────────────────────────
 * A bare symbol token is exactly ONE letter (`a`, `t`, `m`, `v`, `F`, `T`…),
 * optionally decorated with a leading `Δ` and/or a trailing subscript
 * (`μ₀`, `T_H`, `Q_C`) — a decorated run is ONE distinct symbol name, per
 * §4.1/§4.3 ("never conflate μ and μ₀"; `Δv`/`Δt` are their own listed
 * symbols, not `Δ` times `v`). Two undecorated single-letter symbols with NO
 * whitespace between them multiply implicitly — this is what makes `at`,
 * `mv`, `ma`, `mc²`, `μ₀nI` parse as products of single-letter quantities,
 * exactly as every equation in §4.2 is actually written (none of the ten
 * equations has a whitespace-separated implicit product — every implicit
 * multiplication in the real corpus is zero-whitespace-adjacent).
 *
 * Implicit multiplication is therefore deliberately NOT extended across
 * whitespace. This is not a special case bolted on for the negative
 * controls — it is the same "adjacency, not a word gap" rule stated
 * positively, and it has a direct, measured payoff: `min = 4 km in (1/30)
 * h` (§4.1, a unit-conversion SENTENCE, not an equation) fails to parse
 * because "4 km" is a NUMBER followed, across a space, by a would-be
 * symbol — there is no whitespace-gapped implicit-multiplication rule to
 * bridge it, so the top-level parser is left with unconsumed trailing
 * input and reports "cannot parse" rather than inventing a six-factor
 * product across an English sentence. `src = (concept: string` (§4.1,
 * TypeScript, not physics) fails for an unrelated, equally structural
 * reason: `:` is not a character this tokenizer recognises at all, so the
 * open paren after "concept" is never closed and the parse fails there.
 * Both negative controls are pinned by name in
 * `dimensionsParser.test.ts`, not merely gestured at.
 */

// ── §5.2's Dimension type, verbatim — canonical home. `dimensionBindings.ts`
// re-exports this rather than redeclaring it, so there is exactly one
// definition in the tree (see that file's own header for why). ──
export interface Dimension {
  readonly M: number
  readonly L: number
  readonly T: number
  readonly I: number
  readonly Θ: number
  readonly N: number
  readonly J: number
}

/** Every exponent zero — pure numbers, angles, and named dimensionless
 *  constants (π) reduce to this. */
export const DIMENSIONLESS: Dimension = Object.freeze({ M: 0, L: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0 })

// ── §5's four algebra operations. Component-wise over the 7 exponents. ──

/** Adds exponents component-wise — the dimension of a PRODUCT. */
export function multiply(a: Dimension, b: Dimension): Dimension {
  return {
    M: a.M + b.M, L: a.L + b.L, T: a.T + b.T,
    I: a.I + b.I, Θ: a.Θ + b.Θ, N: a.N + b.N, J: a.J + b.J,
  }
}

/** Subtracts exponents component-wise — the dimension of a QUOTIENT. */
export function divide(a: Dimension, b: Dimension): Dimension {
  return {
    M: a.M - b.M, L: a.L - b.L, T: a.T - b.T,
    I: a.I - b.I, Θ: a.Θ - b.Θ, N: a.N - b.N, J: a.J - b.J,
  }
}

/** Multiplies every exponent by `n` — a square is `power(x, 2)`, a square
 *  root is `power(x, 0.5)`. */
export function power(a: Dimension, n: number): Dimension {
  return {
    M: a.M * n, L: a.L * n, T: a.T * n,
    I: a.I * n, Θ: a.Θ * n, N: a.N * n, J: a.J * n,
  }
}

/** Exact equality across all 7 exponents — what "dimensionally consistent"
 *  ultimately reduces to. */
export function dimensionsEqual(a: Dimension, b: Dimension): boolean {
  return a.M === b.M && a.L === b.L && a.T === b.T
    && a.I === b.I && a.Θ === b.Θ && a.N === b.N && a.J === b.J
}

// ── The expression AST. Small and closed — this is a parser for §4.2's
// shapes, never a general CAS (§5.7 explicitly defers symbolic/CAS work). ──

export type Expr =
  | { readonly kind: 'symbol'; readonly name: string }
  | { readonly kind: 'number' }
  | { readonly kind: 'constant'; readonly name: 'π' }
  | { readonly kind: 'add'; readonly op: '+' | '-'; readonly left: Expr; readonly right: Expr }
  | { readonly kind: 'mul'; readonly left: Expr; readonly right: Expr }
  | { readonly kind: 'div'; readonly left: Expr; readonly right: Expr }
  | { readonly kind: 'pow'; readonly base: Expr; readonly exponent: number }
  | { readonly kind: 'sqrt'; readonly argument: Expr }

export interface ParsedEquation {
  readonly lhs: Expr
  readonly rhs: Expr
}

export type ParseResult =
  | { readonly ok: true; readonly equation: ParsedEquation }
  | { readonly ok: false; readonly reason: string }

// Recognised single-character numeric literals beyond plain digits. Only ½
// is in §4.2's corpus; kept as a lookup table (not a scattered special case)
// so a future equation needing ¼/¾ costs one entry, not a parser change.
const VULGAR_FRACTIONS: Readonly<Record<string, number>> = { '½': 0.5 }
const SUPERSCRIPT_DIGITS: Readonly<Record<string, string>> = {
  '²': '2', '³': '3', '¹': '1', '⁰': '0', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
}
const SUBSCRIPT_DIGITS: Readonly<Record<string, string>> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
}

function isLetter(ch: string): boolean {
  // Latin + Greek, both cases — covers every symbol in §4.2's corpus
  // (v,u,a,t,F,m,p,E,c,s,T,L,g,μ,B,n,I) without pulling in a Unicode
  // property escape whose runtime support this repo does not otherwise
  // depend on.
  return /^[A-Za-zΑ-ω]$/.test(ch)
}
function isSubscriptDigit(ch: string): boolean {
  return ch in SUBSCRIPT_DIGITS
}
function isSuperscriptDigit(ch: string): boolean {
  return ch in SUPERSCRIPT_DIGITS
}
function isDigit(ch: string): boolean {
  return ch >= '0' && ch <= '9'
}

/**
 * A single left-to-right scanner shared by the LHS and RHS parses. Tracks
 * its own position; every method either advances or reports failure —
 * nothing here throws.
 */
class Scanner {
  private pos = 0
  constructor(private readonly text: string) {}

  private peek(offset = 0): string | undefined {
    return this.text[this.pos + offset]
  }
  private skipWhitespace(): void {
    while (this.peek() !== undefined && /\s/.test(this.peek()!)) this.pos += 1
  }
  atEnd(): boolean {
    this.skipWhitespace()
    return this.pos >= this.text.length
  }
  /** Whether the NEXT token starts immediately (no whitespace) at the
   *  current position — the adjacency test implicit multiplication needs. */
  private adjacent(): boolean {
    return this.peek() !== undefined && !/\s/.test(this.peek()!)
  }

  /** True if a factor could start here (after skipping whitespace), without
   *  consuming anything. Used to decide whether '+'/'-' at this point is a
   *  binary operator or there is simply nothing left. */
  private canStartFactor(): boolean {
    this.skipWhitespace()
    const ch = this.peek()
    if (ch === undefined) return false
    return ch === '(' || ch === '√' || isDigit(ch) || ch in VULGAR_FRACTIONS || isLetter(ch)
  }

  parseEquationBody(): ParseResult {
    const lhs = this.parseExpr()
    if (lhs === null) return { ok: false, reason: this.error ?? 'cannot parse left-hand side' }
    this.skipWhitespace()
    if (this.peek() !== '=') return { ok: false, reason: 'expected a single top-level "=" between two sides' }
    this.pos += 1
    const rhs = this.parseExpr()
    if (rhs === null) return { ok: false, reason: this.error ?? 'cannot parse right-hand side' }
    if (!this.atEnd()) return { ok: false, reason: `unexpected trailing input: "${this.text.slice(this.pos)}"` }
    return { ok: true, equation: { lhs, rhs } }
  }

  private error: string | null = null
  private fail(reason: string): null {
    this.error = reason
    return null
  }

  // Expr := Term (('+' | '-') Term)*
  private parseExpr(): Expr | null {
    let left = this.parseTerm()
    if (left === null) return null
    for (;;) {
      this.skipWhitespace()
      const op = this.peek()
      if (op !== '+' && op !== '-') break
      this.pos += 1
      const right = this.parseTerm()
      if (right === null) return null
      left = { kind: 'add', op, left, right }
    }
    return left
  }

  // Term := Factor ( '/' Factor | '*' Factor | <adjacent-factor> )*
  private parseTerm(): Expr | null {
    let left = this.parseFactor()
    if (left === null) return null
    for (;;) {
      // Explicit '/' and '*' MAY have surrounding whitespace ("F / m" reads
      // the same as "F/m"), so whitespace is skipped before looking for
      // them — but only committed to (by leaving `this.pos` advanced) if
      // one is actually found.
      const beforeOperatorCheck = this.pos
      this.skipWhitespace()
      const op = this.peek()
      if (op === '/' || op === '*') {
        this.pos += 1
        const right = this.parseFactor()
        if (right === null) return null
        left = op === '/' ? { kind: 'div', left, right } : { kind: 'mul', left, right }
        continue
      }
      // No explicit operator: undo the whitespace-skip above and test RAW
      // adjacency instead. This restore is load-bearing — without it,
      // `adjacent()` would always see a non-whitespace character (the skip
      // already consumed the gap) and implicit multiplication would wrongly
      // bridge a whitespace-separated pair like "4 km". Implicit
      // multiplication is therefore only across ZERO whitespace, which is
      // the rule that makes "at"/"mv"/"mc²"/"μ₀nI" parse and "4 km" (a
      // space-separated, natural-language pair, §4.1) NOT parse. See this
      // file's own header.
      this.pos = beforeOperatorCheck
      if (this.adjacent() && this.canStartFactor()) {
        const right = this.parseFactor()
        if (right === null) return null
        left = { kind: 'mul', left, right }
        continue
      }
      break
    }
    return left
  }

  // Factor := Power
  private parseFactor(): Expr | null {
    return this.parsePower()
  }

  // Power := Atom ( '^' Number | <superscript-digits> )?
  private parsePower(): Expr | null {
    const base = this.parseAtom()
    if (base === null) return null
    // Superscript digits bind immediately, zero whitespace, directly after
    // the atom — "c²", "t²".
    let digits = ''
    while (this.peek() !== undefined && isSuperscriptDigit(this.peek()!)) {
      digits += SUPERSCRIPT_DIGITS[this.peek()!]
      this.pos += 1
    }
    if (digits.length > 0) {
      return { kind: 'pow', base, exponent: Number(digits) }
    }
    // Explicit "^n" form.
    if (this.peek() === '^') {
      this.pos += 1
      const n = this.parseNumberLiteralValue()
      if (n === null) return this.fail('expected a number after "^"')
      return { kind: 'pow', base, exponent: n }
    }
    return base
  }

  /** A bare numeric value for an exponent position — digits/decimal or a
   *  single vulgar fraction. Not a general expression: real notation never
   *  raises to a computed power. */
  private parseNumberLiteralValue(): number | null {
    const ch = this.peek()
    if (ch !== undefined && ch in VULGAR_FRACTIONS) {
      this.pos += 1
      return VULGAR_FRACTIONS[ch]
    }
    let digits = ''
    while (this.peek() !== undefined && (isDigit(this.peek()!) || this.peek() === '.')) {
      digits += this.peek()
      this.pos += 1
    }
    if (digits.length === 0) return null
    return Number(digits)
  }

  // Atom := Number | Constant | Symbol | Sqrt | '(' Expr ')'
  private parseAtom(): Expr | null {
    this.skipWhitespace()
    const ch = this.peek()
    if (ch === undefined) return this.fail('unexpected end of input')

    if (ch === '(') {
      this.pos += 1
      const inner = this.parseExpr()
      if (inner === null) return null
      this.skipWhitespace()
      if (this.peek() !== ')') return this.fail('unmatched "("')
      this.pos += 1
      return inner
    }

    if (ch === '√') {
      this.pos += 1
      this.skipWhitespace()
      if (this.peek() === '(') {
        this.pos += 1
        const inner = this.parseExpr()
        if (inner === null) return null
        this.skipWhitespace()
        if (this.peek() !== ')') return this.fail('unmatched "(" after "√"')
        this.pos += 1
        return { kind: 'sqrt', argument: inner }
      }
      // Bare radical — one atom only (its own exponent decoration included),
      // never a whole term: "√xy" is not in §4.2's corpus and is genuinely
      // ambiguous, so this deliberately does not try to resolve it.
      const argument = this.parsePower()
      if (argument === null) return null
      return { kind: 'sqrt', argument }
    }

    if (ch in VULGAR_FRACTIONS) {
      this.pos += 1
      return { kind: 'number' }
    }

    if (isDigit(ch)) {
      while (this.peek() !== undefined && (isDigit(this.peek()!) || this.peek() === '.')) this.pos += 1
      return { kind: 'number' }
    }

    if (ch === 'π') {
      this.pos += 1
      return { kind: 'constant', name: 'π' }
    }

    if (ch === 'Δ' || isLetter(ch)) {
      let name = ''
      if (ch === 'Δ') { name += 'Δ'; this.pos += 1 }
      const base = this.peek()
      if (base === undefined || !isLetter(base)) return this.fail('expected a letter after "Δ"')
      name += base
      this.pos += 1
      // Decoration: EITHER a run of Unicode subscript digits, OR an
      // underscore followed by alphanumerics ("T_H", "Q_C") — never both,
      // and never a second plain letter (that would be a new symbol, per
      // this file's own tokenization rule).
      if (this.peek() !== undefined && isSubscriptDigit(this.peek()!)) {
        while (this.peek() !== undefined && isSubscriptDigit(this.peek()!)) {
          name += SUBSCRIPT_DIGITS[this.peek()!]
          this.pos += 1
        }
      } else if (this.peek() === '_') {
        name += '_'
        this.pos += 1
        let sawOne = false
        while (this.peek() !== undefined && /[A-Za-z0-9]/.test(this.peek()!)) {
          name += this.peek()
          this.pos += 1
          sawOne = true
        }
        if (!sawOne) return this.fail('expected a subscript name after "_"')
      }
      return { kind: 'symbol', name }
    }

    return this.fail(`unexpected character "${ch}"`)
  }
}

/**
 * Parse a string as `LHS = RHS`. TOTAL — never throws. Anything outside
 * §4.2's shapes (including both §4.1 named non-equations) returns
 * `{ ok: false, reason }`, never a guess.
 */
export function parseEquation(text: string): ParseResult {
  try {
    return new Scanner(text).parseEquationBody()
  } catch {
    // Belt and braces: the scanner is hand-written to never throw, but a
    // parser that could crash the turn would violate §5.1's whole premise,
    // so a defensive catch converts anything unforeseen into an ordinary
    // "cannot parse" result rather than propagating.
    return { ok: false, reason: 'parser error' }
  }
}

// ── Dimension evaluation over a fully-bound expression. ──

/** Symbol name -> Dimension, valid within whatever scope the caller
 *  constructed it for. Batch 0 never populates a real one — see
 *  `dimensionBindings.ts`'s own header. */
export type SymbolBindings = Readonly<Record<string, Dimension>>

export type DimensionResult =
  | { readonly ok: true; readonly dimension: Dimension }
  | { readonly ok: false; readonly reason: string }

/**
 * Compute the dimension of a parsed expression under a full symbol
 * binding. TOTAL — an unbound symbol or an internally-inconsistent
 * addition (e.g. adding a length to a time) is a `{ ok: false }` result,
 * never a thrown error and never a guessed dimension. This is the
 * primitive Gate B (§5.3, Batch 3) will build "one unbound symbol ⇒
 * abstain" on top of — not implemented here, since Batch 0 ships the
 * primitive only.
 */
export function dimensionOf(expr: Expr, bindings: SymbolBindings): DimensionResult {
  switch (expr.kind) {
    case 'number':
      return { ok: true, dimension: DIMENSIONLESS }
    case 'constant':
      return { ok: true, dimension: DIMENSIONLESS }
    case 'symbol': {
      const dimension = bindings[expr.name]
      if (dimension === undefined) return { ok: false, reason: `unbound symbol "${expr.name}"` }
      return { ok: true, dimension }
    }
    case 'add': {
      const left = dimensionOf(expr.left, bindings)
      if (!left.ok) return left
      const right = dimensionOf(expr.right, bindings)
      if (!right.ok) return right
      if (!dimensionsEqual(left.dimension, right.dimension)) {
        return { ok: false, reason: 'inconsistent addition: both sides of + or - must share a dimension' }
      }
      return { ok: true, dimension: left.dimension }
    }
    case 'mul': {
      const left = dimensionOf(expr.left, bindings)
      if (!left.ok) return left
      const right = dimensionOf(expr.right, bindings)
      if (!right.ok) return right
      return { ok: true, dimension: multiply(left.dimension, right.dimension) }
    }
    case 'div': {
      const left = dimensionOf(expr.left, bindings)
      if (!left.ok) return left
      const right = dimensionOf(expr.right, bindings)
      if (!right.ok) return right
      return { ok: true, dimension: divide(left.dimension, right.dimension) }
    }
    case 'pow': {
      const base = dimensionOf(expr.base, bindings)
      if (!base.ok) return base
      return { ok: true, dimension: power(base.dimension, expr.exponent) }
    }
    case 'sqrt': {
      const argument = dimensionOf(expr.argument, bindings)
      if (!argument.ok) return argument
      return { ok: true, dimension: power(argument.dimension, 0.5) }
    }
  }
}

export interface EquationAnalysis {
  readonly parsed: boolean
  readonly reason?: string
  readonly equation?: ParsedEquation
  readonly lhs?: DimensionResult
  readonly rhs?: DimensionResult
}

/**
 * The single entry point a later gate (Batch 3+) composes on top of:
 * parse, then compute both sides' dimensions under a full binding. Never
 * throws; `parsed: false` covers every unparseable input, including both
 * §4.1 named non-equations.
 */
export function analyzeEquation(text: string, bindings: SymbolBindings): EquationAnalysis {
  const parseResult = parseEquation(text)
  if (!parseResult.ok) return { parsed: false, reason: parseResult.reason }
  return {
    parsed: true,
    equation: parseResult.equation,
    lhs: dimensionOf(parseResult.equation.lhs, bindings),
    rhs: dimensionOf(parseResult.equation.rhs, bindings),
  }
}
