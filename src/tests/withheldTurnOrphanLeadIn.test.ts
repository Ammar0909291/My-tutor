/**
 * THE TUTOR TOLD THE LEARNER TO ANSWER A QUESTION THAT WAS NOT THERE.
 *
 * ── MEASURED IN PRODUCTION ──────────────────────────────────────────────────
 * Session cmtapm78v… (chem.bond.polar-molecules, 2026-08-26). The whole stored
 * assistant message, 37 characters, was:
 *
 *     "Please answer the following question:"
 *
 * and nothing followed it — no prose question, no MCQ widget. The learner
 * answered "ok sir", because there was nothing else to do.
 *
 * Sixteen production turns have this exact shape (9 of them since 2026-08-19):
 * "Here is a question to check your understanding:" ×7, "Quick question:",
 * "Try this quick practice question:", "Here's a practice problem for you:",
 * "Here's a quick check:", "Sure! Let's do a quick check:" …
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────────
 * `withholdUngradedGateQuestion` correctly removes a mastery question with no
 * server answer key. `dropAnswerableContent` removes it PARAGRAPH-WISE, and
 * `askedAnswerableQuestion` — correctly — does not consider "Please answer the
 * following question:" a question: it asks nothing. So the introduction to the
 * removed question survived the removal of the question.
 *
 * The withhold then reported `kept.length > 0` and served it. A sentence whose
 * only purpose is to announce something that no longer exists is worse than
 * the placeholder it displaced: the placeholder claims nothing, this makes a
 * promise the turn cannot keep.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * A line that ENDS in a colon is, by construction, an introduction to what
 * follows. When the withhold has just removed what followed, and no MCQ widget
 * is attached to take its place, that trailing line is dropped too — and if
 * that empties the turn, the existing continuation is used exactly as before.
 *
 * It is deliberately trailing-line-scoped, not paragraph-scoped: real teaching
 * routinely shares a paragraph with the lead-in ("That's right — the cross
 * product is zero.\nNow, here's a quick check for you:"), and that teaching
 * must survive.
 *
 * NOT applied when a structured MCQ is attached: there, a colon lead-in is
 * correct, because the widget genuinely does follow it.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

const PLACEHOLDER = "Let's stay with this idea for a moment."
const gate = { phase: 'CHECK' as const, hasStructuredMcq: false }

describe('the production shapes, verbatim', () => {
  const shapes = [
    'Please answer the following question:',
    'Here is a question to check your understanding:',
    'Here’s a quick multiple‑choice question to test that idea:',
    'Here’s a quick question for you:',
    'Quick question:',
    'Try this quick practice question:',
    'Here’s a practice problem for you:',
    'Here’s a quick check:',
    'Sure! Let’s do a quick check:',
  ]

  for (const lead of shapes) {
    it(`never ships "${lead.slice(0, 34)}…" with nothing after it`, () => {
      const r = withholdUngradedGateQuestion({
        ...gate,
        text: `${lead}\n\nWhich molecule is non-polar?\nA) CH4\nB) H2O`,
      })
      expect(r.withheld).toBe(true)
      expect(r.text.trim().endsWith(':')).toBe(false)
      expect(r.text).toBe(PLACEHOLDER)
    })
  }
})

describe('teaching that shares the turn is kept', () => {
  it('drops only the trailing lead-in line, not the sentence above it', () => {
    const r = withholdUngradedGateQuestion({
      ...gate,
      text: 'That’s right — because the two vectors are parallel, their cross product is zero.\nNow, here’s a quick check for you:\n\nWhat is the cross product of two parallel vectors?',
    })
    expect(r.text).toContain('cross product is zero')
    expect(r.text.trim().endsWith(':')).toBe(false)
    expect(r.text).not.toContain('What is the cross product')
  })

  it('keeps a full teaching paragraph that happens to precede a lead-in', () => {
    const r = withholdUngradedGateQuestion({
      ...gate,
      text: 'A dipole is a separation of charge across a bond.\n\nHere is a question:\n\nWhich bond is most polar?\nA) C-H\nB) H-F',
    })
    expect(r.text).toContain('A dipole is a separation of charge')
    expect(r.text.trim().endsWith(':')).toBe(false)
  })

  it('reports the grade when dropping the lead-in empties the turn', () => {
    const r = withholdUngradedGateQuestion({
      ...gate,
      text: 'Here is a question to check your understanding:\n\nWhich is non-polar?\nA) CH4\nB) H2O',
      justGraded: { correct: true },
    })
    expect(r.text.toLowerCase()).toMatch(/right|correct/)
    expect(r.text.trim().endsWith(':')).toBe(false)
  })
})

describe('a colon that is not an orphan is left alone', () => {
  it('does not fire when a structured MCQ genuinely follows', () => {
    // provider=gate's own lead-in ends in a colon and the widget IS attached.
    const text = 'Quick check on Polarity and Dipole Moment:'
    const r = withholdUngradedGateQuestion({
      text, phase: 'CHECK', hasStructuredMcq: true,
      attachedMcqQuestion: 'Which molecule is non-polar?',
    })
    expect(r.text).toBe(text)
  })

  it('leaves a colon mid-text alone when real content follows it', () => {
    const text = 'Two forces matter here: dipole-dipole and dispersion. Both are electrostatic.'
    const r = withholdUngradedGateQuestion({ ...gate, text })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('leaves a turn that withholds nothing completely untouched', () => {
    const text = 'Polarity comes from an uneven share of electrons:\n- unequal electronegativity\n- an unsymmetrical shape'
    const r = withholdUngradedGateQuestion({ ...gate, text })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('a non-gate phase is untouched even with an orphan lead-in', () => {
    const text = 'Here is a question:\n\nWhat is a dipole?'
    const r = withholdUngradedGateQuestion({ ...gate, phase: 'OBSERVE', text })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })
})

describe('no turn is ever emptied', () => {
  it('every withheld result still carries text', () => {
    for (const text of [
      'Quick question:\n\nWhat is a dipole?',
      'Here is a question:',
      ':',
      'Answer this:\n\nWhy is water bent?\nA) lone pairs\nB) charge',
    ]) {
      const r = withholdUngradedGateQuestion({ ...gate, text })
      expect(r.text.trim().length).toBeGreaterThan(0)
    }
  })
})
