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

/**
 * THE PARAPHRASE CASE — measured live on 2026-09-01, on the real account,
 * against the build that shipped the first version of this fix.
 *
 * That version keyed entirely on the question text being literally present,
 * and it walked straight past two real duplications in one lesson, because
 * the model PARAPHRASED its own stem between the prose copy and the tag. The
 * learner read the question and all four choices twice, on the deploy that
 * was supposed to have fixed exactly that.
 *
 * The stems differ and the OPTIONS do not, which is the whole point: a model
 * rewrites its question freely and reproduces its answer choices exactly,
 * because changing an option would change the item.
 *
 * Both turns below are VERBATIM, including the dash that differs between the
 * prose copy and the served option — the reason the match folds punctuation.
 */
describe('the paraphrase case, from the live run that caught it', () => {
  const T8_BODY = [
    'I see you chose 40 N. Let\u2019s check what the forces actually do in this situation. ',
    'Which of the following best explains the friction force on the 10 kg box when a 20 N horizontal push is applied and the box stays still? ',
    '',
    'A) 20 N \u2013 static friction matches the push to keep it still (below the 40 N maximum) ',
    'B) 40 N \u2013 friction always equals \u03bc_s \u00d7 N ',
    'C) 0 N \u2013 there is no friction when the box is stationary ',
    'D) 10 N \u2013 friction equals half the weight',
  ].join('\n')
  const T8_MCQ = {
    // NOTE the stem is a paraphrase of the prose one, not a copy.
    question: 'What is the friction force on the 10 kg box when a 20 N horizontal push is applied and it does not move?',
    options: [
      '20 N \u2013 static friction matches the push to keep it still (below the 40 N maximum)',
      '40 N \u2013 friction always equals \u03bc_s \u00d7 N',
      '0 N \u2013 there is no friction when the box is stationary',
      '10 N \u2013 friction equals half the weight',
    ],
    correctIndex: 0,
  }

  it('strips the duplicated block the first version missed', () => {
    const out = dropDuplicatedMcqProse(T8_BODY, T8_MCQ)
    expect(out).not.toMatch(/^\s*[A-D]\)/m)
    expect(out).not.toMatch(/Which of the following best explains/i)
    expect(out).toContain('I see you chose 40 N')
    expect(out).toContain('what the forces actually do')
  })

  it('takes the lead-in question with the block, since its choices are gone', () => {
    // "Which of the following…?" is not teaching once the options are removed.
    expect(dropDuplicatedMcqProse(T8_BODY, T8_MCQ)).not.toMatch(/\?/)
  })

  const T10_BODY = [
    'You\u2019re right \u2013 let\u2019s work it out together. ',
    'On a 30\u00b0 incline the weight of the 5 kg block is mg = 5 \u00d7 10 = 50 N. ',
    'So the correct choice would be a bit above 21 N, not any of the options given. ',
    'Now let\u2019s see if you can apply the same idea to a new situation.',
    '',
    'A 4 kg block rests on a 45\u00b0 slope. The coefficient of static friction between the block and the slope is 0.4. What is the maximum static friction force that can act on the block? ',
    'A) 5.7 N ',
    'B) 11.3 N ',
    'C) 14.1 N ',
    'D) 20.0 N',
  ].join('\n')
  const T10_MCQ = {
    question: 'A 4 kg block rests on a 45\u00b0 slope with \u03bc_s = 0.4. What is the maximum static friction force that can act on the block?',
    options: ['5.7 N', '11.3 N', '14.1 N', '20.0 N'],
    correctIndex: 1,
  }

  it('keeps every line of real teaching above the block', () => {
    const out = dropDuplicatedMcqProse(T10_BODY, T10_MCQ)
    expect(out).not.toMatch(/^\s*[A-D]\)/m)
    expect(out).toContain('let\u2019s work it out together')
    expect(out).toContain('a bit above 21 N')
    expect(out).toContain('apply the same idea to a new situation')
  })

  it('matches across a differing dash, which is why punctuation is folded', () => {
    // The widget carried "20 N \u2014 static friction…" and the prose "20 N \u2013 …".
    const body = 'Here we go.\n\nA) 20 N \u2014 static friction matches the push to keep it still (below the 40 N maximum)\nB) 40 N \u2014 friction always equals \u03bc_s \u00d7 N'
    expect(dropDuplicatedMcqProse(body, T8_MCQ)).toBe('Here we go.')
  })
})

describe('two matching option lines is the threshold, and it matters', () => {
  const mcq = { question: 'Which unit is mass?', options: ['Gram', 'Kilogram', 'Pound'], correctIndex: 1 }

  it('one coincidental option-shaped line is not an options block', () => {
    // A paragraph can produce a single line starting "A) …"; two consecutive
    // lines matching SERVED choices cannot.
    const t = 'Consider a block on a slope.\nA) is a label I used mid-sentence, not a choice.\nThe normal force is mg cos theta.'
    expect(dropDuplicatedMcqProse(t, mcq)).toBe(t)
  })

  it('a lettered list about something else entirely survives', () => {
    const t = 'There are two kinds:\nA) static friction, before it slides\nB) kinetic friction, once it slides\nBoth depend on the normal force.'
    expect(dropDuplicatedMcqProse(t, mcq)).toBe(t)
  })

  it('but two lines carrying the served choices do go', () => {
    const t = 'Let us check.\n\nA) Gram\nB) Kilogram\nC) Pound'
    expect(dropDuplicatedMcqProse(t, mcq)).toBe('Let us check.')
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
