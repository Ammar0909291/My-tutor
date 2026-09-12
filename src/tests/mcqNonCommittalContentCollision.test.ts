/**
 * ENG-D02 (real-student English audit, 2026-09-11) — a hedge word occurring
 * as CONTENT WITHIN an option's own text must never defeat an otherwise-
 * unambiguous verbatim answer.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────
 * `eng.vocab.context-clues` (order 30, T7) has an authored ADULT-band probe
 * (`englishAdultBandBatch2.ts`, `CONTEXT_CLUES_ADULT`) whose CORRECT option
 * is: 'No — this new context contradicts "unsure"; the guess should be
 * revised toward "firm/unyielding" — a context-clue guess is a working
 * hypothesis, not a locked-in answer'. The learner typed the label plus the
 * option's own text verbatim ("A) <that exact sentence>") and was told "I
 * couldn't tell which option your answer matched — tap the choice you mean
 * from the list below," despite the message containing nothing but that
 * option's own words.
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────
 * `resolveMcqChoice` ran `NON_COMMITTAL.test(message)` (the "not sure / no
 * idea / can't decide" hedge detector) BEFORE its own documented "0. EXACT
 * MATCH — RUNS FIRST, AND THE ORDER IS THE POINT" rule. The option's own
 * text quotes the word "unsure", which `NON_COMMITTAL` matches as if the
 * LEARNER were hedging — even a bare TAP of this exact option (no label,
 * no typing) was silently refused, because tapping sends the option text
 * verbatim and `resolveMcqChoice` never reached rule 0 to see the match.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────
 * `NON_COMMITTAL` now runs AFTER rule 0 (whole-message exact match) and a
 * new, narrowly-scoped rule 0b (a label stripped from the START of the
 * message, with what remains an EXACT match to exactly one option). Both
 * of ENG-D02's reported shapes — a bare tap and a "A) <verbatim>" typed
 * reply — are fixed by the SAME reorder; nothing about rule 0a (the
 * "labelled letter, anywhere in the sentence" reasoning-fragment rule) is
 * touched, so a genuine hedge-plus-guess ("not sure, maybe A") still
 * refuses exactly as before.
 */
import { describe, it, expect } from 'vitest'
import { resolveMcqChoice, type TutorMCQ } from '@/lib/teaching/mcq'
import { ENGLISH_ADULT_BAND_BATCH_2 } from '@/lib/teaching/assets/englishAdultBandBatch2'

/** The REAL authored probe production actually serves — not a hand-copy. */
const contextCluesProbes = ENGLISH_ADULT_BAND_BATCH_2.filter(
  (p) => p.conceptId === 'eng.vocab.context-clues',
)
const adamantProbe = contextCluesProbes.find((p) => String(p.stem).includes('adamant'))
if (!adamantProbe) throw new Error('fixture probe not found — has englishAdultBandBatch2.ts changed?')

const CORRECT_TEXT = String(
  adamantProbe.choices.find((c) => c.isCorrect === true)?.text ?? '',
)
const WRONG_TEXT = String(
  adamantProbe.choices.find((c) => c.isCorrect !== true)?.text ?? '',
)

const mcq: TutorMCQ = {
  question: String(adamantProbe.stem),
  options: adamantProbe.choices.map((c) => String(c.text)),
  correctIndex: adamantProbe.choices.findIndex((c) => c.isCorrect === true),
}

describe('ENG-D02 — a bare tap of the real authored option resolves (was silently refused)', () => {
  it('sanity: the real corpus probe actually contains a NON_COMMITTAL trigger word in its correct option', () => {
    expect(CORRECT_TEXT).toContain('unsure')
    expect(mcq.correctIndex).toBe(0)
  })

  it('a plain TAP of the correct option (exactly what LessonScreen sends) now grades correctly', () => {
    expect(resolveMcqChoice(CORRECT_TEXT, mcq)).toBe(mcq.correctIndex)
  })

  it('a plain TAP of the wrong option (no hedge word) is unaffected — still grades to itself', () => {
    const wrongIndex = mcq.options.findIndex((o) => o === WRONG_TEXT)
    expect(resolveMcqChoice(WRONG_TEXT, mcq)).toBe(wrongIndex)
  })
})

describe('ENG-D02 — the typed "A) <verbatim option>" shape now resolves (the exact reported case)', () => {
  it('a leading letter-and-paren label in front of the verbatim correct option resolves', () => {
    expect(resolveMcqChoice(`A) ${CORRECT_TEXT}`, mcq)).toBe(mcq.correctIndex)
  })

  it('a leading letter-and-period label resolves the same way', () => {
    expect(resolveMcqChoice(`A. ${CORRECT_TEXT}`, mcq)).toBe(mcq.correctIndex)
  })

  it('a bracketed label resolves the same way', () => {
    expect(resolveMcqChoice(`(A) ${CORRECT_TEXT}`, mcq)).toBe(mcq.correctIndex)
  })

  it('a MISMATCHED label (content still wins — the content is the strongest signal, exactly rule 0\'s own philosophy) still resolves to the option whose TEXT was quoted', () => {
    // The learner labelled it "B" but typed option A's exact words — the
    // corpus only has 2 options here, so this exercises the general case
    // without asserting a specific interaction beyond "content wins."
    expect(resolveMcqChoice(`B) ${CORRECT_TEXT}`, mcq)).toBe(mcq.correctIndex)
  })
})

describe('ENG-D02 — negative controls: nothing about the hedge detector or rule 0a weakens', () => {
  it('a genuine hedge with no verbatim content still refuses', () => {
    expect(resolveMcqChoice('not sure, maybe A', mcq)).toBeNull()
  })

  it('a bare "I don\'t know" still refuses', () => {
    expect(resolveMcqChoice("i dont know", mcq)).toBeNull()
  })

  it('an ambiguous two-letter hedge still refuses', () => {
    expect(resolveMcqChoice('A or B, i am not sure', mcq)).toBeNull()
  })

  it('a short reasoned guess with a label still resolves via rule 0a, unaffected by the reorder', () => {
    expect(resolveMcqChoice('A, because that makes more sense', mcq)).toBe(0)
  })

  it('an ordinary sentence beginning with a letter A-D word is NOT mistaken for a label (the new rule 0b must not fire on "According...")', () => {
    expect(resolveMcqChoice('According to the passage, the meaning should be revised', mcq)).toBeNull()
  })

  it('an ordinary sentence beginning with "Do you..." is NOT mistaken for a label', () => {
    expect(resolveMcqChoice('Do you think context clues are reliable here?', mcq)).toBeNull()
  })

  it('a label followed by a SHORT reasoned fragment (not the full option text) still falls through to rule 0a rather than false-matching rule 0b', () => {
    // "A, because it's bigger" — after stripping "A, " the remainder
    // ("because it's bigger") is not any option's full text, so rule 0b
    // must not fire; rule 0a's ordinary labelled-letter handling still
    // resolves it correctly.
    expect(resolveMcqChoice('A, because it makes more sense', mcq)).toBe(0)
  })
})
