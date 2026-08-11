/**
 * Single-dollar maths → the delimiter the renderer actually typesets.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * Measured on screen, in production, in a real lesson:
 *
 *   "Look at the equation on your screen, $T = 2\pi\sqrt{\frac{L}{g}}$
 *    (T equals two pi times the square root of L over g), where $L$ is the
 *    length in metres and $g$ is the acceleration due to gravity."
 *
 * The learner read the backslashes. The one line carrying the physics was the
 * one line they could not read.
 *
 * ── WHY, AND WHY NOT A SECOND MATH SYSTEM ───────────────────────────────────
 * The app already renders maths with KaTeX (LessonScreen). It supports `$$…$$`
 * for display and `\(…\)` for inline, and DELIBERATELY does not support single
 * `$…$`, because that collides with ordinary currency ("it costs $5 and $10"
 * has two dollar signs and no maths). That decision is correct and is left
 * alone.
 *
 * The gap was never the renderer. It is that models overwhelmingly write
 * inline maths as `$…$`, so tutor text and renderer disagreed about the
 * convention. This module translates one into the other, deterministically,
 * on the server, before the text is stored or sent — so the EXISTING renderer
 * does the typesetting and nothing new renders anything.
 *
 * ── THE CURRENCY GUARD ──────────────────────────────────────────────────────
 * A `$…$` span converts only on positive evidence that it is maths:
 *
 *   a TeX command      $\frac{1}{2}mv^2$     -> contains a backslash
 *   a script           $v_0$, $x^2$          -> contains ^ or _
 *   a bare symbol      $E$, $g$, $q_0$       -> letters, no digits alone
 *   an equation        $T = 2L$              -> a relation between symbols
 *
 * and never when the content is a plain amount ($5, $10.50, $1,000), which is
 * the only case the renderer's original objection was about.
 *
 * Pure and synchronous. No I/O, no model.
 */

/** Content between two `$` that is unambiguously mathematics, not money. */
function looksLikeMath(inner: string): boolean {
  const s = inner.trim()
  if (!s || s.length > 200) return false
  if (s.includes('\n')) return false

  // Money: digits, separators and an optional currency word. Never maths.
  if (/^[\d.,]+$/.test(s)) return false
  if (/^[\d.,]+\s*(?:usd|dollars?|per\s+\w+)?$/i.test(s)) return false

  // Positive evidence, in order of strength.
  if (s.includes('\\')) return true                     // \frac, \pi, \sqrt…
  if (/[\^_]/.test(s)) return true                      // v_0, x^2
  if (/^[A-Za-z][A-Za-z0-9]{0,2}$/.test(s)) return true // E, KE, q0
  // A relation or operation between things, at least one of which is a symbol.
  if (/[=<>≤≥≠+\-*/×÷]/.test(s) && /[A-Za-z]/.test(s)) return true
  return false
}

/**
 * Rewrite inline `$…$` spans as `\(…\)`.
 *
 * `$$…$$` is left exactly as it is — the renderer already typesets it as
 * display maths, and touching it would change layout.
 */
export function normalizeMathDelimiters(text: string): string {
  if (!text || !text.includes('$')) return text

  const out: string[] = []
  let i = 0
  while (i < text.length) {
    // Display maths: copy the whole block through untouched.
    if (text.startsWith('$$', i)) {
      const end = text.indexOf('$$', i + 2)
      if (end === -1) { out.push(text.slice(i)); break }
      out.push(text.slice(i, end + 2))
      i = end + 2
      continue
    }

    if (text[i] === '$') {
      // Find the closing single `$` on the same line.
      let end = -1
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '\n') break
        if (text[j] === '$') { end = j; break }
      }
      if (end !== -1) {
        const inner = text.slice(i + 1, end)
        if (looksLikeMath(inner)) {
          out.push(`\\(${inner.trim()}\\)`)
          i = end + 1
          continue
        }
      }
    }

    out.push(text[i])
    i++
  }
  return out.join('')
}

/**
 * Does learner-visible prose still contain raw TeX a renderer would print
 * rather than typeset? The regression guard — after normalization, nothing
 * should answer true.
 */
export function containsRawLatex(text: string): boolean {
  const s = text ?? ''
  // A backslash command sitting outside any math delimiter.
  const stripped = s
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\\\([\s\S]*?\\\)/g, ' ')
    .replace(/\\\[[\s\S]*?\\\]/g, ' ')
  if (/\\(?:frac|sqrt|pi|theta|alpha|beta|gamma|delta|Delta|sum|int|times|cdot|leq|geq|neq|approx|infty|vec|hat|bar|text|mathrm|left|right)\b/.test(stripped)) return true
  // A surviving single-dollar span that reads as maths.
  const m = /\$([^$\n]{1,200})\$/.exec(stripped)
  return m ? looksLikeMath(m[1]) : false
}
