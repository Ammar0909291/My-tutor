/**
 * PHASE D — "SAY IT AGAIN" IS NOT A NEW SUBJECT.
 *
 * MEASURED IN PRODUCTION, on two independent lessons, driving the real product
 * as a genuinely weak learner. On phys.mech.orbital-mechanics the student typed
 *
 *     "please explain one more time simple words"
 *
 * and the runtime extracted the TOPIC "one more time simple words", opened an
 * unresolved-topic excursion on it, and the tutor spent the remainder of the
 * lesson teaching how to explain things simply — a shoelace, a bicycle wheel, a
 * steering wheel, a board game. Circular Orbital Mechanics was never mentioned
 * again. The lesson ran to the 22-turn cap at check=0 practice=0 and could not
 * close.
 *
 * The identical derail then happened on phys.qm.quantum-tunneling, where the
 * tutor went further and began GRADING the learner on it:
 *
 *     "**Teaching "one more time simple words"** 1. **What it means** …"
 *     "You're right—C is the correct "one more time simple words" version."
 *
 * This is the third instance of one defect class. `DISCOURSE_NOUNS` already
 * carries the scars of the other two — "what that looks like" (four turns of
 * frozen ladder) and "real-life example of this" (lesson split in half). An
 * open excursion PAUSES the lesson, so every graded correct answer afterwards
 * counts for nothing. That is why a phrasing bug costs a whole lesson.
 *
 * WHY THE FIX IS A PHRASE AND NOT MORE WORDS IN THE SET. Measured before
 * choosing: the words that survive the existing guard are `time`, `word` and
 * `more`. Adding `time` to the leading-connective set turns "explain time
 * dilation" into "dilation" and makes bare "explain time" name NOTHING — and
 * time is a real physics topic. A leading PHRASE cannot do that, because
 * "explain time" does not begin with "one more time".
 *
 * Both halves of the fix are completions of rules that already exist, not new
 * machinery: `LEADING_CONNECTIVES` already trims `again`, `more` and `simply`;
 * `DISCOURSE_NOUNS` already holds `simple`, `briefly` and `real`.
 */
import { describe, it, expect } from 'vitest'
import { namedTopicUnknownTo, extractRequestedTopic } from '@/lib/teaching/visual/requestedTopic'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

/** The lesson text the guard compares against, from the REAL knowledge graph —
 *  the same two concepts the production failure was measured on. */
function taughtTextFor(conceptId: string): string {
  const n = getKGNode(conceptId)
  expect(n, `${conceptId} must exist in the KG`).toBeTruthy()
  return `${n!.title} ${n!.description ?? ''}`
}

const ORBITAL = taughtTextFor('phys.mech.orbital-mechanics')
const TUNNELING = taughtTextFor('phys.qm.quantum-tunneling')

describe('the production derail, reproduced and closed', () => {
  it('the exact utterance that broke orbital mechanics names NO topic', () => {
    expect(namedTopicUnknownTo('please explain one more time simple words', ORBITAL)).toBeNull()
  })

  it('and the same utterance in the quantum-tunneling lesson', () => {
    expect(namedTopicUnknownTo('please explain one more time simple words', TUNNELING)).toBeNull()
  })

  it('every phrasing of the same request names nothing', () => {
    for (const said of [
      'please explain one more time simple words',
      'explain one more time',
      'can you explain one more time',
      'explain it one more time please',
      'sir explain one more time',
      'say it once more',
      'one more time please',
      'explain in simple words',
      'say it in simple words',
      'tell me in your own words',
      'just one more time',
    ]) {
      expect(namedTopicUnknownTo(said, ORBITAL), `should name nothing: ${said}`).toBeNull()
    }
  })

  it('the whole weak-learner script the harness drives opens no excursion', () => {
    // Every line the Phase D harness types between questions. Any ONE of these
    // naming a topic costs the lesson, so the whole set is pinned.
    for (const said of [
      'sir i not understand this',
      'ok but why it happen like that',
      'sorry sir can you say more simple',
      'hmm i think i get little bit',
      'can you show picture please',
      'ok sir',
      'i am bit confused sir',
      'please explain one more time simple words',
      'sir can you give me one question to try',
      'i want practice please',
      'give me one more question sir',
    ]) {
      expect(namedTopicUnknownTo(said, ORBITAL), `weak-learner line opened a topic: ${said}`).toBeNull()
    }
  })
})

// ── NEGATIVE CONTROLS ───────────────────────────────────────────────────────
//
// The fix is worthless if it silences real topic requests. `time` and `word`
// were both measured as single-word additions and REJECTED for exactly these
// cases; they are pinned so a future "simplification" cannot reintroduce them.
describe('NEGATIVE CONTROL — real topic requests still name their topic', () => {
  const OFF_LESSON = 'Circular Orbital Mechanics balances gravitational attraction with centripetal acceleration.'

  it('a bare "explain time" still names time — the case that rules out the word list', () => {
    const r = extractRequestedTopic('explain time', 1, true)
    expect(r?.title).toBe('time')
    expect(namedTopicUnknownTo('explain time', 'Photosynthesis in green plants')).not.toBeNull()
  })

  it('topics that merely BEGIN with a trimmed word survive intact', () => {
    expect(extractRequestedTopic('explain time dilation', 1, true)?.title).toBe('time dilation')
    expect(extractRequestedTopic('what is time period', 1, true)?.title).toBe('time period')
  })

  it('topics containing "word" survive — one real word is enough', () => {
    for (const [said, title] of [
      ['teach me about sight words', 'sight words'],
      ['explain simple machines', 'simple machines'],
    ] as const) {
      expect(extractRequestedTopic(said, 1, true)?.title).toBe(title)
      expect(namedTopicUnknownTo(said, OFF_LESSON), said).not.toBeNull()
    }
  })

  it('PRE-EXISTING, not caused here: "word problems" already named nothing', () => {
    // Measured against the unmodified module by stashing this change: it
    // returned null there too, because `problem` is already a discourse noun
    // and `word` is already covered. Pinned as the BASELINE so nobody later
    // reads it as a regression introduced by the phrase strip — and recorded as
    // a real pre-existing limitation, out of Phase D's scope to change.
    expect(extractRequestedTopic('explain word problems', 1, true)?.title).toBe('word problems')
    expect(namedTopicUnknownTo('explain word problems', OFF_LESSON)).toBeNull()
  })

  it('the off-lesson questions an excursion EXISTS to take still open one', () => {
    for (const said of [
      'explain quantum tunneling',
      'what causes friction',
      'teach me about moles',
      'how does a catalyst work',
      'explain Kubernetes pod scheduling',
    ]) {
      expect(namedTopicUnknownTo(said, OFF_LESSON), `should still name a topic: ${said}`).not.toBeNull()
    }
  })

  it('a request that names the CURRENT topic still stays in the lesson', () => {
    // Filter 3 is unchanged: one shared content word means "about this".
    expect(namedTopicUnknownTo('explain orbital speed again', ORBITAL)).toBeNull()
    expect(namedTopicUnknownTo('why does gravitational attraction matter', ORBITAL)).toBeNull()
  })
})

describe('the phrase strip is anchored, so it cannot eat a real topic', () => {
  it('only strips at the FRONT of the named phrase', () => {
    // "one more time" appearing later in a genuine topic is untouched.
    const r = extractRequestedTopic('explain the period of one more time zone', 1, true)
    expect(r?.title).toContain('period')
  })

  it('does not fire on a topic that merely contains the word "one"', () => {
    expect(extractRequestedTopic('explain one dimensional motion', 1, true)?.title)
      .toBe('one dimensional motion')
  })
})
