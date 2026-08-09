/**
 * Mathematical notation → speakable English.
 *
 * THE DEFECT THIS CLOSES. `cleanTextForTTS` normalises Unicode maths well
 * (Greek letters, superscripts, ≤ ≥ × ÷) but had no LaTeX layer at all, so
 * anything the model wrote in TeX reached the speech provider verbatim.
 * Measured before this module existed:
 *
 *   "$F = \eta A \frac{dv}{dy}$"  ->  "$F equals \eta A \frac{dv}{dy}$"
 *   "$\Delta U = Q - W$"          ->  "$\Delta U equals Q - W$"
 *   "$\theta > \theta_c$"         ->  "$\theta greater than \theta_c$"
 *   "\(x^{2} + y_{1}\)"           ->  "\(x^{2} plus y_{1}\)"
 *
 * — dollar signs, backslash commands and braces spoken as characters.
 *
 * ── STRUCTURE, NOT A SYMBOL DICTIONARY ──────────────────────────────────────
 * There is no table of mathematical symbols here and there must not be one.
 * Four structural facts about TeX do the work:
 *
 *   1. delimiters ($…$, \(…\), \[…\]) wrap maths and are never spoken;
 *   2. \command is a NAME — dropping the backslash yields the word a person
 *      says, so "\eta" speaks as "eta" and "\theta" as "theta" with no entry
 *      for either. Only the dozen commands that are OPERATORS rather than
 *      names need a spoken form, and that is what OPERATORS below is;
 *   3. ^ and _ attach an exponent or an index to what precedes them;
 *   4. \frac{a}{b} and a/b are the same relationship written two ways.
 *
 * ── NEVER INVENT MEANING ────────────────────────────────────────────────────
 * This module renders NOTATION, never physics. "dv/dy" becomes "the rate of
 * change of v with respect to y" because that is what the notation says — it
 * does NOT become "the velocity gradient", which is a fact about the concept,
 * not about the symbols. Where a figure has authored a phrase for a quantity,
 * that phrase reaches the tutor through the visual contract's own labels,
 * which is where meaning legitimately lives.
 *
 * Pure and synchronous. No I/O, no model, no network.
 */

/**
 * TeX commands that are OPERATORS — they denote a relation or an operation,
 * so the bare word would be wrong ("times", not "cdot"). Everything else,
 * including every Greek letter, is handled by rule 2 above and needs no entry.
 */
const OPERATORS: Record<string, string> = {
  times: ' times ',
  cdot: ' times ',
  div: ' divided by ',
  pm: ' plus or minus ',
  mp: ' minus or plus ',
  le: ' less than or equal to ',
  leq: ' less than or equal to ',
  ge: ' greater than or equal to ',
  geq: ' greater than or equal to ',
  ne: ' not equal to ',
  neq: ' not equal to ',
  approx: ' approximately equal to ',
  propto: ' proportional to ',
  to: ' leads to ',
  rightarrow: ' leads to ',
  infty: ' infinity ',
  degree: ' degrees ',
  circ: ' degrees ',
  cdots: ' and so on ',
  dots: ' and so on ',
  ldots: ' and so on ',
}

/** Commands that only affect layout — spoken as nothing at all. */
const LAYOUT = new Set([
  'left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'displaystyle', 'textstyle',
  'quad', 'qquad', 'text', 'mathrm', 'mathbf', 'mathit', 'operatorname', 'label',
])

/** Read one {…} group starting at `open`, returning its body and end index. */
function readGroup(s: string, open: number): { body: string; end: number } | null {
  if (s[open] !== '{') return null
  let depth = 0
  for (let i = open; i < s.length; i++) {
    if (s[i] === '{') depth++
    else if (s[i] === '}') {
      depth--
      if (depth === 0) return { body: s.slice(open + 1, i), end: i + 1 }
    }
  }
  return null
}

/** The argument after ^ or _ : a braced group, or the single next character. */
function readArgument(s: string, at: number): { body: string; end: number } | null {
  if (at >= s.length) return null
  const group = readGroup(s, at)
  if (group) return group
  return { body: s[at], end: at + 1 }
}

/** "2" -> "squared", "3" -> "cubed", anything else -> "to the power of …". */
function exponentPhrase(exp: string): string {
  const e = exp.trim().replace(/^\{|\}$/g, '').trim()
  if (e === '2') return ' squared '
  if (e === '3') return ' cubed '
  if (/^-\s*\d+$/.test(e)) return ` to the power of minus ${e.replace(/^-\s*/, '')} `
  return ` to the power of ${e} `
}

/**
 * DERIVATIVES read as relationships, not as letters.
 *
 * "dv/dy" spoken character by character is "d v over d y", which teaches
 * nothing. The notation itself states a rate of change, so that is what is
 * spoken. Requires BOTH sides to be d-prefixed, so an ordinary ratio ("m/s",
 * "3/4", "and/or") is untouched.
 */
function speakDerivatives(text: string): string {
  return text.replace(
    /\bd([a-zA-Z][a-zA-Z0-9]{0,3})\s*\/\s*d([a-zA-Z][a-zA-Z0-9]{0,3})\b/g,
    (_m, num: string, den: string) => `the rate of change of ${num} with respect to ${den}`,
  )
}

/** \frac{a}{b} -> "a over b"; the derivative form is recognised first. */
function expandFractions(text: string): string {
  let out = ''
  let i = 0
  while (i < text.length) {
    const idx = text.indexOf('\\frac', i)
    if (idx === -1) { out += text.slice(i); break }
    out += text.slice(i, idx)
    const num = readGroup(text, idx + 5)
    const den = num ? readGroup(text, num.end) : null
    if (!num || !den) { out += text.slice(idx, idx + 5); i = idx + 5; continue }
    const n = expandFractions(num.body).trim()
    const d = expandFractions(den.body).trim()
    // d-something over d-something is a derivative however it was written.
    const derivative = /^d([a-zA-Z][a-zA-Z0-9]{0,3})$/.exec(n)
    const wrt = /^d([a-zA-Z][a-zA-Z0-9]{0,3})$/.exec(d)
    out += derivative && wrt
      ? ` the rate of change of ${derivative[1]} with respect to ${wrt[1]} `
      : ` ${n} over ${d} `
    i = den.end
  }
  return out
}

/** \sqrt{x} / \sqrt[3]{x} -> spoken root. */
function expandRoots(text: string): string {
  return text
    .replace(/\\sqrt\s*\[\s*3\s*\]\s*\{([^{}]*)\}/g, ' the cube root of $1 ')
    .replace(/\\sqrt\s*\[\s*([^\]]*)\s*\]\s*\{([^{}]*)\}/g, ' the $1 root of $2 ')
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, ' the square root of $1 ')
    .replace(/\\sqrt\s+(\w+)/g, ' the square root of $1 ')
}

/** Apply ^ and _ , innermost first, so "x^{2}" and "y_{1}" read naturally. */
function expandScripts(text: string): string {
  let out = ''
  for (let i = 0; i < text.length;) {
    const c = text[i]
    if (c === '^' || c === '_') {
      const arg = readArgument(text, i + 1)
      if (!arg) { i++; continue }
      // An index is spoken as a bare token ("theta c"), matching how the
      // Unicode path already speaks "θc". Announcing "sub" would be noise.
      out += c === '^' ? exponentPhrase(arg.body) : ` ${arg.body.trim()} `
      i = arg.end
      continue
    }
    out += c
    i++
  }
  return out
}

/**
 * Inside a delimited maths span, "+" and "-" are ARITHMETIC.
 *
 * Outside one they are ambiguous — a hyphen joins words, a dash punctuates a
 * sentence — which is why cleanTextForTTS only ever spoke "-" between digits.
 * Within $…$ that ambiguity is gone, so the operators can be spoken, and they
 * carry meaning that silence would destroy: a voice that skips the dash in
 * "Q - W" says "Q W", which is a different physical claim.
 */
function speakArithmetic(math: string): string {
  return math
    .replace(/\s+-\s+/g, ' minus ')
    .replace(/\s+\+\s+/g, ' plus ')
}

/**
 * Strip TeX delimiters, keeping the maths inside them.
 *
 * `$` is deliberately handled here and not left to the currency rule in
 * cleanTextForTTS: that rule only fires on "$" immediately followed by digits,
 * so every other dollar sign survived to the provider.
 */
function stripDelimiters(text: string): string {
  return text
    .replace(/\$\$([\s\S]*?)\$\$/g, (_m, body: string) => ` ${speakArithmetic(body)} `)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_m, body: string) => ` ${speakArithmetic(body)} `)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_m, body: string) => ` ${speakArithmetic(body)} `)
    .replace(/\$([^$\n]*)\$/g, (_m, body: string) => ` ${speakArithmetic(body)} `)
    // An unpaired delimiter is markup too — never a word.
    .replace(/\\[[\]()]/g, ' ')
}

/** Is there anything here that a speech engine would read as markup? */
export function containsMathMarkup(text: string): boolean {
  return /\$|\\[a-zA-Z]+|\\[[\]()]|[{}]|(?<![a-zA-Z0-9])[_^]|\^\{|_\{/.test(text)
}

/**
 * Convert mathematical notation in `text` into words a voice can speak.
 *
 * Ordinary prose is returned unchanged: every rule below is anchored to a
 * TeX construct or to a derivative, so punctuation, hyphens and ordinary
 * slashes are never touched.
 */
export function speakifyMathNotation(text: string): string {
  if (!text) return text
  let t = text

  t = stripDelimiters(t)
  t = expandRoots(t)
  t = expandFractions(t)

  // Operators and layout commands, before the generic \word rule below so a
  // command with a spoken form is not reduced to its bare name.
  t = t.replace(/\\([a-zA-Z]+)/g, (whole, name: string) => {
    if (name in OPERATORS) return OPERATORS[name]
    if (LAYOUT.has(name)) return ' '
    // Rule 2: a command is a NAME. "\eta" -> "eta", "\theta" -> "theta".
    return ` ${name} `
  })

  t = expandScripts(t)
  t = speakDerivatives(t)

  // Braces carry grouping only; the grouping is gone once scripts are applied.
  t = t.replace(/[{}]/g, ' ')
  // A lone backslash (escaped punctuation, a stray command) is markup.
  t = t.replace(/\\(?=[^a-zA-Z])/g, ' ')

  return t.replace(/[ \t]{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()
}
