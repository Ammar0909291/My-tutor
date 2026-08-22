/**
 * Which SERVER-ORDERED turn shapes does the filler detector classify as filler?
 *
 * detectFillerTurn fires on: <=30 words AND no '?' AND a known filler phrase.
 * The filler-phrase list includes "feel free to", "whenever you're ready",
 * "take your time", "we can continue", "no rush", "let's take one small step" —
 * which is the vocabulary of calming and closing, i.e. exactly the language the
 * server ORDERS in a close and in a recovery script.
 *
 * Run: npx tsx scripts/qa/probe-filler.ts
 */
import { detectFillerTurn } from '../../src/lib/teaching/conversationState'

/** Realistic turns, each labelled with what the server had ORDERED. */
const CASES: Array<[string, string]> = [
  // Genuine filler — MUST still be repaired.
  ['GENUINE FILLER', "Let's take one small step together. We can continue whenever you're ready."],
  ['GENUINE FILLER', 'Take your time, no rush. We can go at your own pace.'],

  // A close, as buildAffectCloseBlock orders ("encourage them to come back").
  ['CLOSE (ordered)', "You did really well spotting that the book stays put. Feel free to come back whenever you want to keep going."],
  ['CLOSE (ordered)', "Great work today on inertia. We'll continue next time — take your time."],

  // Recovery scripts: calming a distressed learner. No question by design.
  ['RECOVERY (ordered)', "That's okay. This one is genuinely tricky, and we can go slower. Let's take one small step together."],
  ['RECOVERY (ordered)', "You're not stupid — this trips up almost everyone. Take your time, there's no rush."],

  // Legitimate short concrete statements (already protected: no filler phrase).
  ['CONCRETE SHORT', 'An orbital is a region where electrons can be found.'],
  ['CONCRETE SHORT', 'Force equals mass times acceleration: F = ma.'],

  // A turn whose question lives in the MCQ tag (stripped before detection).
  ['MCQ LEAD-IN', "Let's check that. Feel free to pick whichever you think is right."],
]

let flagged = 0
for (const [kind, text] of CASES) {
  const filler = detectFillerTurn(text)
  if (filler) flagged++
  console.log(`${filler ? 'REPAIRED' : 'kept    '} | ${kind.padEnd(19)} | ${text.slice(0, 78)}`)
}
console.log(`\n${flagged}/${CASES.length} would be overwritten with the generic reflection question.`)
