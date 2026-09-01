/**
 * THE SAME QUESTION, ON SCREEN, TWICE.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * When the model writes its question inline as prose AND emits the
 * `<!--MCQ-->` tag, `stripMcqTags` removes only the machine tag. The prose
 * copy survives into the message body, and `LessonScreen` then draws the
 * tappable widget from `activeMcq.question` + `activeMcq.options` underneath
 * it. The learner reads the question, then reads it again with buttons under
 * it.
 *
 * ── WHY THIS IS NOT A HYPOTHESIS ────────────────────────────────────────────
 * `appendMcqToHistoryText` exists BECAUSE the model does this — measured live
 * 2026-08-16, on `phys.meas.units`:
 *
 *   "Which of the following is the official SI base unit for mass?
 *    A) Gram  B) Kilogram  C) Pound  D) Newton"
 *
 * written as prose, with the tag emitted alongside it. That fix deduplicated
 * DURABLE HISTORY and its comment reasons the live turn away as "invisible
 * live — the API response carries the single prose copy and the client draws
 * its wizard from the `mcq` field." The client does draw the wizard from that
 * field, and it also renders the body. Both are on screen.
 *
 * ── WHICH COPY SURVIVES, AND WHY IT IS NOT A COIN TOSS ──────────────────────
 * The widget. It is the only GRADEABLE copy: `pendingMcq`/`gradeMcqAnswer`
 * key off the parsed tag, and a learner who answers the prose copy by typing
 * produces evidence nothing can grade — the entire subject of `proseMcqGuard`.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `dropDuplicatedMcqProse`, the real `parseMcqTag` on a verbatim
 * tagged turn, and the real route source for the wiring claim.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropDuplicatedMcqProse, parseMcqTag, appendMcqToHistoryText } from '@/lib/teaching/mcq'

const MCQ = {
  question: 'Which of the following is the official SI base unit for mass?',
  options: ['Gram', 'Kilogram', 'Pound', 'Newton'],
  correctIndex: 1,
}

describe('the production shape', () => {
  it('drops the prose copy and keeps the teaching above it', () => {
    const body =
      'The SI system fixes seven base units, and mass is one of them. Everything else is built from those.\n\n'
      + 'Which of the following is the official SI base unit for mass?\n\n'
      + 'A) Gram\nB) Kilogram\nC) Pound\nD) Newton'
    const out = dropDuplicatedMcqProse(body, MCQ)
    expect(out).not.toMatch(/official SI base unit/i)
    expect(out).not.toMatch(/^\s*[A-D]\)/m)
    expect(out).toContain('The SI system fixes seven base units')
    expect(out).toContain('Everything else is built from those')
  })

  it('splits a line, keeping the teaching sentence that shares it', () => {
    // Clause-level restraint, the same rule `stripCompletionClaims` and the D3
    // fix both settled on: removing a duplicated question must not take a
    // sentence of real teaching with it.
    const body =
      'Mass is measured in a base unit that already carries a prefix, which surprises people. '
      + 'Which of the following is the official SI base unit for mass?\n'
      + 'A) Gram\nB) Kilogram\nC) Pound\nD) Newton'
    const out = dropDuplicatedMcqProse(body, MCQ)
    expect(out).toContain('already carries a prefix')
    expect(out).not.toMatch(/official SI base unit/i)
    expect(out).not.toMatch(/Kilogram/)
  })

  it('follows the options through a blank line and through bullets', () => {
    // The model routinely separates the stem from the choices, and routinely
    // bullets them. Both were measured shapes; neither ends the block.
    const bulleted = 'Let us check that.\n\nWhich of the following is the official SI base unit for mass?\n'
      + '- A) Gram\n- B) Kilogram\n- C) Pound\n- D) Newton'
    const out = dropDuplicatedMcqProse(bulleted, MCQ)
    expect(out).toBe('Let us check that.')
  })

  it('a short lead-in is enough — the widget carries the question', () => {
    // A LENGTH FLOOR WAS THE WRONG TEST and measuring it said so: at 40 chars
    // this declined on the case above, which is a perfectly good turn.
    expect(dropDuplicatedMcqProse('Let us check that.\n\nWhich of the following is the official SI base unit for mass?\nA) Gram\nB) Kilogram', MCQ))
      .toBe('Let us check that.')
  })
})

describe('it never takes the turn down', () => {
  it('leaves the text alone when the duplicate IS the whole turn', () => {
    // The alternative is an empty message bubble, or inventing a lead-in the
    // tutor never wrote. A visible duplicate is the lesser harm, and this case
    // is left deliberately rather than by omission.
    const only = 'Which of the following is the official SI base unit for mass?\nA) Gram\nB) Kilogram'
    expect(dropDuplicatedMcqProse(only, MCQ)).toBe(only)
  })

  it('is a no-op when the question was never written in prose', () => {
    const teaching =
      'The SI system fixes seven base units, and mass is one of them. Everything else is built '
      + 'from those base units by multiplication and division.'
    expect(dropDuplicatedMcqProse(teaching, MCQ)).toBe(teaching)
  })

  it('is a no-op with no MCQ at all', () => {
    const t = 'Which of the following is the official SI base unit for mass?'
    expect(dropDuplicatedMcqProse(t, null)).toBe(t)
  })

  it('does not eat a DIFFERENT question that merely shares wording', () => {
    const body =
      'Which of the following is the official SI base unit for length?\n'
      + 'A) Metre\nB) Foot\n\nThink about that one for a moment before we go on.'
    expect(dropDuplicatedMcqProse(body, MCQ)).toBe(body)
  })

  it('is safe on empty input and idempotent', () => {
    expect(dropDuplicatedMcqProse('', MCQ)).toBe('')
    const body = 'Teaching first, at some length so a real word survives.\n\n'
      + 'Which of the following is the official SI base unit for mass?\nA) Gram\nB) Kilogram'
    const once = dropDuplicatedMcqProse(body, MCQ)
    expect(dropDuplicatedMcqProse(once, MCQ)).toBe(once)
  })
})

describe('end to end, from a tagged turn', () => {
  /** A turn written the way the defect was measured: prose copy AND tag. */
  const TAGGED =
    'The kilogram is the odd one out among the base units — it is the only one whose name '
    + 'carries a prefix.\n\n'
    + 'Which of the following is the official SI base unit for mass?\n'
    + 'A) Gram\nB) Kilogram\nC) Pound\nD) Newton\n'
    + '<!--MCQ q="Which of the following is the official SI base unit for mass?" '
    + 'a="Gram" b="Kilogram" c="Pound" d="Newton" correct="b"-->'

  it('the learner sees the question exactly once', () => {
    const { mcq, cleanText } = parseMcqTag(TAGGED)
    expect(mcq).not.toBeNull()
    // Tag-stripping alone leaves the duplicate — this is the state that shipped.
    expect(cleanText).toMatch(/official SI base unit/i)
    const body = dropDuplicatedMcqProse(cleanText, mcq)
    expect(body).not.toMatch(/official SI base unit/i)
    expect(body).toContain('the only one whose name carries a prefix')
    // The widget still has it, so nothing was lost to the learner.
    expect(mcq!.question).toBe(MCQ.question)
  })

  it('durable history then carries exactly one copy too', () => {
    // The dedup runs BEFORE the history append, so the append contributes the
    // single canonical copy it was always meant to rather than being
    // suppressed by its own duplication guard.
    const { mcq, cleanText } = parseMcqTag(TAGGED)
    const body = dropDuplicatedMcqProse(cleanText, mcq)
    const stored = appendMcqToHistoryText(body, mcq)
    const hits = stored.match(/official SI base unit/gi) ?? []
    expect(hits).toHaveLength(1)
    expect(stored).toContain('B) Kilogram')
  })
})

describe('the chat route applies it', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

  it('calls it on the turn text', () => {
    // Anchored on the CALL, not the identifier: structural tests in this
    // codebase have passed against an import while the call site was gone.
    expect(ROUTE).toMatch(/dropDuplicatedMcqProse\(cleanText,\s*mcqHoisted\)/)
  })

  it('runs BEFORE the message is persisted, so both copies agree', () => {
    // If it ran after, the response and durable history would disagree about
    // what was on the learner's screen — the exact class of defect
    // `mcqToServe` was extracted to prevent.
    const dedup = ROUTE.indexOf('dropDuplicatedMcqProse(cleanText, mcqHoisted)')
    const persist = ROUTE.indexOf('appendMcqToHistoryText(cleanText, mcqHoisted)')
    expect(dedup).toBeGreaterThan(0)
    expect(persist).toBeGreaterThan(0)
    expect(dedup).toBeLessThan(persist)
  })

  it('keys on this turn’s tagged probe, never on an echoed pending one', () => {
    // An echoed `pendingMcq` came from an earlier turn and cannot be
    // duplicated in this turn's prose; keying on it would strip teaching that
    // legitimately restates an outstanding question.
    expect(ROUTE).not.toMatch(/dropDuplicatedMcqProse\([^)]*pendingMcq/)
  })
})
