import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { CONFIRMS_CORRECT } from '@/lib/teaching/answerConfirmation'

/**
 * THE SCORER AND THE ENFORCER MUST USE THE SAME DETECTOR.
 *
 * `answerConfirmation.ts` says of itself: "The detector is the same one
 * rubricScore.ts scores with, deliberately, so the thing that measures the
 * criterion and the thing that enforces it cannot drift apart."
 *
 * That is the right design and the claim is structurally FALSE as written.
 * They are two separate regex literals in two files — `CONFIRMS_CORRECT` in
 * src/lib/teaching/answerConfirmation.ts and `CONFIRMS` in
 * scripts/qa/rubricScore.ts. Measured 2026-08-31 they are identical, so nothing
 * is broken today; but nothing PREVENTS them diverging, and the day they do,
 * criterion 5 moves for a reason that has nothing to do with any learner.
 *
 * The failure would be silent and it would be believed: a widened scorer
 * pattern raises the measured rate without changing a single reply, and a
 * widened enforcer pattern LOWERS the real confirmation rate — it stops
 * prepending on phrasings it now thinks already confirm — while the scorer
 * still counts them. The two errors are opposite and neither shows up as a
 * test failure anywhere else.
 *
 * This is the same class of guard as `replayDrift.test.ts`: the repo's own
 * documented risk is "replica drift", where a test or a tool holds a COPY of
 * production logic and the copy silently stops matching.
 *
 * The honest fix is for the scorer to IMPORT the exported constant. It does not,
 * because scripts/qa runs standalone. Until it does, this test is the seam.
 */
describe('the C5 detector has exactly one definition in effect', () => {
  const scorer = readFileSync('scripts/qa/rubricScore.ts', 'utf8')

  /** Pull the alternatives out of a `new RegExp([...].join('|'), 'i')` block. */
  const alternativesFrom = (source: string, declName: string): string[] => {
    const start = source.indexOf(`const ${declName} = new RegExp([`)
    expect(start, `${declName} not found — was it renamed?`).toBeGreaterThan(-1)
    const end = source.indexOf("].join('|')", start)
    expect(end, `${declName} is no longer a join('|') list`).toBeGreaterThan(start)
    return source
      .slice(start, end)
      .match(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g)!
      .map((lit) => lit.slice(1, -1))
      // The two files quote identically-meaning literals with different quote
      // characters ('\\bcorrect\\b' vs "\\bcorrect\\b"). Compare MEANING.
      .map((lit) => lit.replace(/\\'/g, "'"))
  }

  it('the scorer and the enforcer list the same alternatives, in the same order', () => {
    const enforcer = readFileSync('src/lib/teaching/answerConfirmation.ts', 'utf8')
    const a = alternativesFrom(enforcer, 'CONFIRMS_CORRECT')
    const b = alternativesFrom(scorer, 'CONFIRMS')
    expect(a.length).toBeGreaterThan(10)
    expect(b).toEqual(a)
  })

  it('both accept the phrasings the tutor actually produces', () => {
    // Every one of these is quoted in answerConfirmation.ts or rubricScore.ts
    // as a reply the model really emitted.
    for (const s of [
      "That's right. Let me check your thinking with this.",
      'Correct — well done.',
      'Yes, exactly right.',
      'Great, you picked the correct restoring-force rule!',
      "You're right-gravity just shifts the equilibrium",
    ]) expect(CONFIRMS_CORRECT.test(s), s).toBe(true)
  })

  it('neither treats "the right-hand side" as praise', () => {
    // The documented reason there is no bare \brigh\b alternative.
    expect(CONFIRMS_CORRECT.test('Move it to the right-hand side of the equation.')).toBe(false)
    expect(CONFIRMS_CORRECT.test('The right side grows faster.')).toBe(false)
  })
})
