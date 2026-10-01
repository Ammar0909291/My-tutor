/**
 * AN OPTION'S OWN TEXT MUST NOT REPEAT ITS OWN LETTER LABEL.
 *
 * ── THE DEFECT, REPRODUCED LIVE ─────────────────────────────────────────────
 * Driving `chem.*` Pericyclic Reactions on a real account (2026-09-20), asked
 * for "a fresh multiple-choice practice question on this", the tutor's reply
 * read:
 *
 *   Which of the following reactions is thermally allowed by Woodward–Hoffmann
 *   rules?
 *
 *   A) A [2+2] cycloaddition of two alkenes
 *   B) B Diels–Alder reaction of cyclopentadiene with maleic anhydride
 *   C) C Electrocyclic ring opening of cyclobutene to butadiene
 *   D) D Sigmatropic [1,3] shift of a hydrogen in 1,3-butadiene
 *
 * EVERY option's own text repeats its line's letter as the first word —
 * "A) A ...", "B) B ...", "C) C ...", "D) D ...". Not a rendering bug: the
 * lettering (`A)`, `B)`, ...) is applied once, by the code that turns a
 * model-authored `TutorMCQ.options` array into a lettered list, but the
 * MODEL's own option VALUES already carried a redundant leading letter token
 * — almost certainly an artifact of composing each option against its own
 * `{"a": "...", "b": "...", ...}` JSON key and echoing the key's letter into
 * the value as well as into the (correctly, once) lettered prose.
 *
 * ── WHY THIS REQUIRES ALL OPTIONS TO AGREE, NOT JUST ONE ────────────────────
 * A single option starting with its own letter as a real word is not always
 * a defect: "A) A cyclic diene forms..." legitimately starts with the
 * indefinite article "A", and chemistry content can legitimately start an
 * option with a real letter-label of its own ("C) C-H bond formation...").
 * Stripping on a single match risks deleting real content in exactly the
 * subject this shipped from.
 *
 * The reproduced case's real signal is not any ONE option — it is that EVERY
 * option in the set shows the identical pattern. A coincidence where a
 * cyclic-diene option happens to start with "A " AND a completely unrelated
 * option happens to start with "B " AND so on, across every option in the
 * same question, is negligible; a systemic labelling artifact reproducing
 * across the whole set is exactly what was measured. So this only fires when
 * ALL detected lettered option lines (2 or more) show the pattern together —
 * a single matching line with the rest clean is left untouched.
 */

/** A lettered option line: `A) `, `B) `, etc. at the start of the line. */
const OPTION_LETTER_LINE_RE = /^([A-D])\)\s*(.*)$/

/** The option's own text starts with its line's letter, repeated as a
 *  standalone token (`\b` after the letter rules out "Add", "Compound", etc.
 *  — a real word that merely starts with the same letter). */
function optionRepeatsOwnLetter(letter: string, value: string): boolean {
  const re = new RegExp(`^${letter}\\b\\s*`, '')
  return re.test(value)
}

export interface DuplicatedOptionLetterResult {
  text: string
  stripped: boolean
}

export function stripDuplicatedOptionLetter(text: string): DuplicatedOptionLetterResult {
  if (typeof text !== 'string' || text.length === 0) {
    return { text, stripped: false }
  }
  const lines = text.split('\n')
  const optionLineIdx: number[] = []
  const letters: string[] = []
  const values: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(OPTION_LETTER_LINE_RE)
    if (!m) continue
    optionLineIdx.push(i)
    letters.push(m[1])
    values.push(m[2])
  }
  // Need at least two lettered option lines to treat agreement as a signal —
  // one line alone is exactly the ambiguous case the module header describes.
  if (optionLineIdx.length < 2) return { text, stripped: false }
  const allRepeat = letters.every((letter, i) => optionRepeatsOwnLetter(letter, values[i]))
  if (!allRepeat) return { text, stripped: false }

  const repaired = [...lines]
  for (let k = 0; k < optionLineIdx.length; k++) {
    const letter = letters[k]
    const value = values[k]
    const fixedValue = value.replace(new RegExp(`^${letter}\\b\\s*`), '')
    repaired[optionLineIdx[k]] = `${letter}) ${fixedValue}`
  }
  return { text: repaired.join('\n'), stripped: true }
}
