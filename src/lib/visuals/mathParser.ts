/**
 * Safe single-variable math expression parser — Visual Learning Sprint B.
 *
 * Compiles an expression in `x` into a pure JS function (x:number)=>number
 * WITHOUT eval/new Function. Implementation: tokenize → shunting-yard to RPN →
 * evaluate RPN. Only a whitelisted set of tokens is accepted:
 *   numbers, the variable `x`, operators + - * / ^, parentheses, unary minus.
 *
 * Targets Sprint B scope (linear y=mx+b, quadratic y=ax^2+bx+c) but the
 * evaluator is general arithmetic so future polynomial-ish forms also work.
 * Anything outside the whitelist → compile() returns null (fail-safe).
 */

type Token =
  | { t: 'num'; v: number }
  | { t: 'x' }
  | { t: 'op'; v: '+' | '-' | '*' | '/' | '^' }
  | { t: 'lp' }
  | { t: 'rp' }
  | { t: 'uminus' }

/** Strip a leading "y =", "f(x) =", normalize unicode, and add implicit `*`. */
function normalize(raw: string): string {
  let s = raw.trim().toLowerCase()
  s = s.replace(/^\s*y\s*=\s*/, '')
  s = s.replace(/^\s*f\s*\(\s*x\s*\)\s*=\s*/, '')
  // Unicode → ASCII
  s = s.replace(/²/g, '^2').replace(/³/g, '^3')
  s = s.replace(/[−–—]/g, '-') // unicode minus/dashes → hyphen
  s = s.replace(/\s+/g, '')
  // Implicit multiplication: 2x → 2*x, 3(x) → 3*(x), x( → x*(, )x → )*x,
  // )( → )*(, 2( → 2*(, x2 is invalid math input so left as-is (will error).
  s = s.replace(/(\d)(x)/g, '$1*$2')
  s = s.replace(/(\d)(\()/g, '$1*$2')
  s = s.replace(/(x)(\()/g, '$1*$2')
  s = s.replace(/(\))(x)/g, '$1*$2')
  s = s.replace(/(\))(\d)/g, '$1*$2')
  s = s.replace(/(\))(\()/g, '$1*$2')
  s = s.replace(/(x)(x)/g, '$1*$2') // x x → x*x (after space removal: xx)
  return s
}

function tokenize(s: string): Token[] | null {
  const tokens: Token[] = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (c >= '0' && c <= '9') {
      let j = i
      let dot = false
      while (j < s.length && ((s[j] >= '0' && s[j] <= '9') || (s[j] === '.' && !dot))) {
        if (s[j] === '.') dot = true
        j++
      }
      const v = Number(s.slice(i, j))
      if (!Number.isFinite(v)) return null
      tokens.push({ t: 'num', v })
      i = j
      continue
    }
    if (c === 'x') { tokens.push({ t: 'x' }); i++; continue }
    if (c === '(') { tokens.push({ t: 'lp' }); i++; continue }
    if (c === ')') { tokens.push({ t: 'rp' }); i++; continue }
    if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
      // Detect unary minus/plus: at start, or after another operator or '('
      const prev = tokens[tokens.length - 1]
      const unary = !prev || prev.t === 'op' || prev.t === 'lp' || prev.t === 'uminus'
      if (c === '-' && unary) { tokens.push({ t: 'uminus' }); i++; continue }
      if (c === '+' && unary) { i++; continue } // unary plus → no-op
      tokens.push({ t: 'op', v: c })
      i++
      continue
    }
    return null // any other character is not whitelisted
  }
  return tokens
}

const PREC: Record<string, number> = { '+': 2, '-': 2, '*': 3, '/': 3, '^': 4 }
const RIGHT_ASSOC = new Set(['^'])

/** Shunting-yard → RPN. Returns null on mismatched parens / malformed input. */
function toRPN(tokens: Token[]): Token[] | null {
  const out: Token[] = []
  const stack: Token[] = []
  for (const tok of tokens) {
    if (tok.t === 'num' || tok.t === 'x') {
      out.push(tok)
    } else if (tok.t === 'uminus') {
      stack.push(tok) // unary minus: highest-precedence prefix; pop on lower
    } else if (tok.t === 'op') {
      while (stack.length) {
        const top = stack[stack.length - 1]
        if (top.t === 'uminus') { out.push(stack.pop()!); continue }
        if (top.t === 'op') {
          const higher = PREC[top.v] > PREC[tok.v]
          const equalLeft = PREC[top.v] === PREC[tok.v] && !RIGHT_ASSOC.has(tok.v)
          if (higher || equalLeft) { out.push(stack.pop()!); continue }
        }
        break
      }
      stack.push(tok)
    } else if (tok.t === 'lp') {
      stack.push(tok)
    } else if (tok.t === 'rp') {
      let found = false
      while (stack.length) {
        const top = stack.pop()!
        if (top.t === 'lp') { found = true; break }
        out.push(top)
      }
      if (!found) return null // mismatched ')'
    }
  }
  while (stack.length) {
    const top = stack.pop()!
    if (top.t === 'lp' || top.t === 'rp') return null // mismatched '('
    out.push(top)
  }
  return out
}

function evalRPN(rpn: Token[], x: number): number {
  const st: number[] = []
  for (const tok of rpn) {
    if (tok.t === 'num') st.push(tok.v)
    else if (tok.t === 'x') st.push(x)
    else if (tok.t === 'uminus') {
      if (st.length < 1) return NaN
      st.push(-st.pop()!)
    } else if (tok.t === 'op') {
      if (st.length < 2) return NaN
      const b = st.pop()!
      const a = st.pop()!
      switch (tok.v) {
        case '+': st.push(a + b); break
        case '-': st.push(a - b); break
        case '*': st.push(a * b); break
        case '/': st.push(a / b); break
        case '^': st.push(Math.pow(a, b)); break
      }
    }
  }
  return st.length === 1 ? st[0] : NaN
}

export interface CompiledExpression {
  /** Evaluate at x. May return NaN/±Infinity (discontinuities) — caller skips. */
  eval: (x: number) => number
  /** The normalized source (post-implicit-multiplication), for debugging. */
  normalized: string
}

/**
 * Compile an equation string into a safe evaluator. Returns null if the
 * expression contains anything outside the whitelist or is malformed.
 */
export function compileExpression(equation: string): CompiledExpression | null {
  if (typeof equation !== 'string' || equation.length > 200) return null
  const normalized = normalize(equation)
  if (!normalized) return null
  const tokens = tokenize(normalized)
  if (!tokens || tokens.length === 0) return null
  const rpn = toRPN(tokens)
  if (!rpn || rpn.length === 0) return null
  // Validate by evaluating at a sample point; reject if it can't produce a number.
  const probe = evalRPN(rpn, 1)
  if (Number.isNaN(probe)) {
    // NaN at x=1 could be legitimate (e.g. 1/(x-1)); probe a second point.
    const probe2 = evalRPN(rpn, 2)
    if (Number.isNaN(probe2)) return null
  }
  return { eval: (x: number) => evalRPN(rpn, x), normalized }
}
