/**
 * PLAIN-TEXT NOTATION THE LESSON SCREEN CAN SHOW.
 *
 * CHEM-129 (2026-10-05, chemistry real-learner run): cards read
 * "Fe^{2+} → Fe^{3+}" with options "Fe^{2+} / MnO_4^- / Mn^{2+}", and Q_sp,
 * K_n, Δn_gas — caret/brace markup outside any math delimiter, which the card
 * buttons and the bubble print literally (LessonScreen only typesets
 * \( \), \[ \] and $$ $$ through KaTeX).
 * CHEM-065: "example with numbers" replies held markdown pipe tables
 * (`| Element | Symbol | … |` / `|---|---|`), which renderMarkdown has no rule
 * for, so the learner sees the pipes and dashes.
 *
 * Both are rewritten into plain Unicode text here, server-side, so no UI
 * changes. Text inside a math delimiter or a code span is never touched — the
 * client renders those itself.
 */

const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '−': '⁻', '(': '⁽', ')': '⁾', 'n': 'ⁿ',
}
const SUB: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ',
}

const mapAll = (s: string, table: Record<string, string>): string | null => {
  let out = ''
  for (const ch of s) {
    const m = table[ch]
    if (m === undefined) return null
    out += m
  }
  return out
}

/** Spans the client renders itself (math, code) — kept byte-identical. */
const PROTECTED_RE = /(\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$|```[\s\S]*?```|`[^`\n]+`|https?:\/\/\S+)/g

function typesetPlain(s: string): string {
  return s
    // X^{2+}, X^{-}, 10^{-3}
    .replace(/\^\{([^{}\n]{1,8})\}/g, (m, body: string) => mapAll(body, SUP) ?? `^(${body})`)
    // X^2+, X^3-, X^-  (charge or a single power right after a symbol/digit/bracket)
    .replace(/(?<=[A-Za-z0-9)\]])\^([0-9]{0,2}[+\-−]|[0-9]{1,2}|[+\-−])(?![A-Za-z0-9{])/g, (m, body: string) => mapAll(body, SUP) ?? m)
    // X_{sp}, X_{2}, Δn_{gas}
    .replace(/(?<=[A-Za-z0-9)\]Δ])_\{([^{}\n]{1,8})\}/g, (m, body: string) => mapAll(body, SUB) ?? `(${body})`)
    // MnO_4, H_2O, (SO_4)_3 — a digit subscript right after a letter or bracket
    .replace(/(?<=[A-Za-z)\]])_([0-9]{1,3})(?![0-9])/g, (m, body: string) => mapAll(body, SUB) ?? m)
    // Q_sp, K_n, Δn_gas — a letter subscript on a symbol, never on a snake_case word
    .replace(/(?<![A-Za-z0-9_])((?:[A-Z][a-z]?)+|Δ?[A-Za-z])_([a-z]{1,4})(?![A-Za-z0-9_])/g,
      (m, base: string, body: string) => base + (mapAll(body, SUB) ?? `(${body})`))
}

/** Caret/brace notation outside math and code, as plain Unicode text. */
export function typesetCaretNotation(text: string): string {
  if (typeof text !== 'string' || (!text.includes('^') && !text.includes('_'))) return text
  return text.split(PROTECTED_RE).map((part, i) => (i % 2 === 1 ? part : typesetPlain(part))).join('')
}

const TABLE_ROW_RE = /^\s*\|.*\|\s*$/
const TABLE_SEP_RE = /^\s*\|?\s*:?-{2,}:?\s*(?:\|\s*:?-{2,}:?\s*)+\|?\s*$/

/**
 * A markdown pipe table as one plain line per row: "Sodium · Na · 496".
 * Only a real table is touched — a header row, a |---| separator, then rows.
 */
export function flattenPipeTables(text: string): string {
  if (typeof text !== 'string' || !text.includes('|')) return text
  const lines = text.split('\n')
  const out: string[] = []
  for (let i = 0; i < lines.length; i++) {
    if (TABLE_ROW_RE.test(lines[i]) && i + 1 < lines.length && TABLE_SEP_RE.test(lines[i + 1])) {
      const cells = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
      out.push(cells(lines[i]).filter(Boolean).join(' · '))
      i += 1
      while (i + 1 < lines.length && TABLE_ROW_RE.test(lines[i + 1])) {
        i += 1
        out.push(cells(lines[i]).filter(Boolean).join(' · '))
      }
      continue
    }
    out.push(lines[i])
  }
  return out.join('\n')
}

/** Both rewrites; what every learner-facing string passes through. */
export function plainNotation(text: string): string {
  return typesetCaretNotation(flattenPipeTables(text))
}
