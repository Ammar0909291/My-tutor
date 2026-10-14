/**
 * SUBSCRIPTS AND SUPERSCRIPTS IN FIGURE TEXT.
 *
 * Authored figure text uses the plain-text conventions a teacher types: `T_h`, `Q_c`, `x_1`, `e^(iθ)`, `10^-3`. The label
 * layer drew those characters literally, so a learner read "T_h = 500 K: heat in" and "e^(iπ) = −1" — correct, but
 * unmistakably a keyboard's notation (live, 2026-10-14, Carnot Cycle and Euler's Formula). Unicode has no subscript "c" or
 * "h"-less forms for most letters, so rewriting the strings cannot fix it; drawing the script is a presentation job.
 *
 * What counts as a script is deliberately narrow, so ordinary text is NEVER touched:
 *   subscript    `_` directly after ONE symbol (a lone letter, Greek letter, digit or closing bracket that does not itself
 *                follow a letter) and then `{...}` or a short alphanumeric run:   T_h   Q_c   x_1   v_0   K_sp   a_{n+1}
 *                `snake_case_name`, `file_name` and `a_b_c` words are left alone (the base letter follows a letter).
 *   superscript  `^` then `(...)`, `{...}`, or a signed alphanumeric run:   e^(iθ)   x^2   10^-3   e^iπ
 *                (a `^` followed by a space or the end of the text stays a literal caret).
 * A string with no script returns a single plain segment, so the caller can render it exactly as before.
 *
 * Pure. No React.
 */

export type ScriptKind = 'plain' | 'sub' | 'sup'
export interface ScriptSegment { kind: ScriptKind; text: string }

const SYMBOL = 'A-Za-z\\u0391-\\u03A9\\u03B1-\\u03C9\\d\\)\\]'
const NOT_LETTER_BEFORE = '(?<![A-Za-z_\\u0391-\\u03A9\\u03B1-\\u03C9])'
// base symbol, "_", then {group} | run of alphanumerics (digits and letters only; stops at space, "/", "=", "+", …)
const SUB_RE = new RegExp(`${NOT_LETTER_BEFORE}([${SYMBOL}])_(\\{[^}]{1,12}\\}|[A-Za-z0-9\\u03B1-\\u03C9]{1,4}(?![A-Za-z0-9_\\u03B1-\\u03C9]))`, 'g')
// "^" then (group) | {group} | signed run
const SUP_RE = /\^(\([^()]{1,14}\)|\{[^}]{1,14}\}|[+\-\u2212]?[A-Za-z0-9\u03B1-\u03C9\u0391-\u03A9]{1,4}(?![A-Za-z0-9_\u03B1-\u03C9\u0391-\u03A9]))/g

function strip(group: string): string {
  const inner = group.startsWith('(') || group.startsWith('{') ? group.slice(1, -1) : group
  return inner
}

/** Splits `text` into plain / subscript / superscript runs, in order, covering every character except the markers. */
export function splitScripts(text: string): ScriptSegment[] {
  if (typeof text !== 'string' || (!text.includes('_') && !text.includes('^'))) return [{ kind: 'plain', text }]

  type Hit = { start: number; end: number; kind: 'sub' | 'sup'; text: string }
  const hits: Hit[] = []
  for (const m of text.matchAll(SUB_RE)) {
    const start = m.index!
    // the base symbol stays plain; only the part after "_" becomes the subscript
    hits.push({ start: start + 1, end: start + m[0].length, kind: 'sub', text: strip(m[2]) })
  }
  for (const m of text.matchAll(SUP_RE)) {
    hits.push({ start: m.index!, end: m.index! + m[0].length, kind: 'sup', text: strip(m[1]) })
  }
  if (hits.length === 0) return [{ kind: 'plain', text }]
  hits.sort((a, b) => a.start - b.start)

  const out: ScriptSegment[] = []
  let cursor = 0
  for (const h of hits) {
    if (h.start < cursor) continue // overlapping hit: first one wins
    if (h.start > cursor) out.push({ kind: 'plain', text: text.slice(cursor, h.start) })
    out.push({ kind: h.kind, text: h.text })
    cursor = h.end
  }
  if (cursor < text.length) out.push({ kind: 'plain', text: text.slice(cursor) })
  return out
}

/** True when `text` contains at least one script (so a caller can skip the wrapper for everything else). */
export function hasScripts(text: string): boolean {
  return splitScripts(text).some((s) => s.kind !== 'plain')
}
