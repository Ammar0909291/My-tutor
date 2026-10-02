/**
 * THE LEAD-IN PROMISED A QUESTION THE CARD WAS NOT.
 *
 * 2026-10-02 learner baseline (real account, chemistry, phone):
 *   - "Now let's see if you can recognize the same pattern in another number."
 *     card: accuracy vs precision of five boiling-point readings.
 *   - "Now you'll see a short question that checks whether this
 *     multiplication rule has landed."   card: sig figs in "4500 m".
 *   - "This distinction will be tested in the question that follows."
 *     card: whether an exact count of 3 bolts limits significant figures.
 *   - "Next, you'll apply the same ideas to a calculation problem that tests
 *     the addition-versus-multiplication rules."  card: scientific notation.
 * Earlier: "quiz lead-ins sometimes mismatch the quiz" (2026-09-28 QA log,
 * not fixed).
 *
 * The mechanism is an owner decision (G2, 2026-09-24): the model is NOT shown
 * the selected question, so it cannot solve it first. It is still told to
 * write a lead-in, so it guesses what the question checks. The question stays
 * hidden; a closing sentence that announces the coming question is replaced
 * by a neutral bridge that names no topic.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { neutraliseBlindLeadIn } from '@/lib/teaching/gateAssessmentRenderer'

const Q = 'A distance is recorded as 4500 m, with no decimal point. How many significant figures does that show?'
const NEUTRAL = /^(Let's check this one before we go further\.|Here's a question — take your time with it\.|Quick check\. Think it through before you choose\.|One to try\. There's no rush\.)$/

describe('a closing announcement of the hidden question is made neutral', () => {
  it('"checks whether this multiplication rule has landed" is replaced', () => {
    const text = 'So round 6.804 to 6.8.\n\nNow you\'ll see a short question that checks whether this multiplication rule has landed.'
    const out = neutraliseBlindLeadIn(text, Q)
    expect(out).toContain('So round 6.804 to 6.8.')
    expect(out).not.toMatch(/multiplication rule has landed/)
    expect(out.split('\n\n').pop()).toMatch(NEUTRAL)
  })

  it('"the same pattern in another number" is replaced, inside a paragraph too', () => {
    const text = "That's correct — 0.0450 g has three significant figures. Now let's see if you can recognize the same pattern in another number."
    const out = neutraliseBlindLeadIn(text, Q)
    expect(out).toMatch(/^That's correct — 0\.0450 g has three significant figures\. /)
    expect(out).not.toMatch(/same pattern/)
  })

  it('"will be tested in the question that follows" is replaced', () => {
    const text = 'Great — for multiplication keep the fewest significant figures. This distinction will be tested in the question that follows.'
    expect(neutraliseBlindLeadIn(text, Q)).not.toMatch(/will be tested/)
  })

  it('"a calculation problem that tests the addition-versus-multiplication rules" is replaced', () => {
    const text = "You've shown you can count significant figures.\n\nNext, you'll apply the same ideas to a calculation problem that tests the addition‑versus‑multiplication rules."
    expect(neutraliseBlindLeadIn(text, Q)).not.toMatch(/calculation problem/)
  })

  it('the same question always gets the same bridge', () => {
    const t = 'Good.\n\nNow try a quick check on this idea.'
    expect(neutraliseBlindLeadIn(t, Q)).toBe(neutraliseBlindLeadIn(t, Q))
  })
})

describe('teaching is never touched', () => {
  it('an imperative "check" inside the teaching stays', () => {
    const t = 'Check the decimal places of each measurement first. Then round the sum to the fewest decimal places.'
    expect(neutraliseBlindLeadIn(t, Q)).toBe(t)
  })

  it('a reply with no closing announcement is unchanged', () => {
    const t = 'Precision is how closely repeated readings agree. Accuracy is how close they are to the true value.'
    expect(neutraliseBlindLeadIn(t, Q)).toBe(t)
  })

  it('only the LAST sentence is considered', () => {
    const t = "Now let's see how the rule works for multiplication. Multiply, then keep the fewest significant figures."
    expect(neutraliseBlindLeadIn(t, Q)).toBe(t)
  })
})

describe('route wiring', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  it('applies only when the card on screen is the gate-selected (hidden) question', () => {
    const at = ROUTE.indexOf('neutraliseBlindLeadIn(cleanText')
    expect(at).toBeGreaterThan(-1)
    expect(ROUTE.slice(Math.max(0, at - 600), at)).toMatch(/gateMcqHoisted && mcqHoisted\.question === gateMcqHoisted\.question/)
  })
})
