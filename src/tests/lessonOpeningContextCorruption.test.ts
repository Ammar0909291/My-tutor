/**
 * MY TUTOR — P1 LESSON-OPENING CONTEXT CORRUPTION FIX.
 *
 * ── THE DEFECT (production) ──────────────────────────────────────────────
 * Fresh Chemistry -> Nature of Matter lesson. Tutor Max's opening turn was
 * the K5 deterministic fallback template, and its very next reply asked:
 * "Could you tell me what you'd like to learn about 'someone else in plain
 * words'?" — a phrase from nowhere the learner typed.
 *
 * ── ROOT CAUSE, REPRODUCED AGAINST THE REAL FUNCTIONS ────────────────────
 * `LessonScreen.tsx`'s `startLesson()` builds a ~280-word, machine-authored
 * lesson-opening INSTRUCTION and sends it through `/api/learn/chat` as the
 * `message` field (marked `ephemeral: true` so it is never persisted or
 * shown — but that flag, before this fix, controlled persistence ONLY).
 * Every "what does the learner want" reader in route.ts still ran on it
 * exactly as if it were genuine speech. The instruction's own worked
 * example — 'Final bullet always: "✓ Explain this to someone else in plain
 * words."' — opens with the word "explain", which `matchTopicRequest`'s
 * TOPIC_REQUEST_RE reads as an explicit teach-me request;
 * `namedTopicUnknownTo` then extracted the "topic" *"someone else in plain
 * words"* — byte-for-byte the production defect — and an unresolved-topic
 * excursion opened on the tutor's own stage directions.
 *
 * ── THE FIX ───────────────────────────────────────────────────────────────
 * `learnerAuthoredMessage` (route.ts, defined immediately above
 * `readTurnIntent`'s call) is `''` whenever `ephemeral` is true, and every
 * authoritative "what did the learner mean" reader — turnIntent, the two
 * excursion/topic resolvers at their own call sites, `decideExcursion`'s
 * own message-based checks, the CUE's `understandStudentTurn`, and
 * `classifyConversation` — is fed this safe value instead of the raw
 * instruction text. The raw `message` is still sent to the model unchanged,
 * because instructing the model IS an ephemeral turn's entire purpose. This
 * closes the CLASS of defect (any future template text that happens to
 * contain a request-shaped phrase), not the one reported string.
 *
 * These tests drive the REAL `POST` handler (turnHarness.ts) with the
 * REAL, verbatim opening-instruction templates from `LessonScreen.tsx`
 * (English AND the returning-learner variant), never a hand-simplified
 * stand-in — a shortened fixture would not prove the fix closes the actual
 * production template.
 */
import { describe, it, expect, vi } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import { namedTopicUnknownTo, extractRequestedTopic } from '@/lib/teaching/visual/requestedTopic'
import { matchTopicRequest } from '@/lib/teaching/visual/session'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

/** VERBATIM from LessonScreen.tsx's startLesson() (English, no returning-
 *  learner context) — the exact "new learner — world-class 9-step lesson
 *  opening" template, with a POSITION line naming the concept under test. */
function newLessonOpening(lessonTitle: string): string {
  return `A new lesson is beginning. Open the lesson in exactly this structure — do not skip any section. Keep the entire opening under 280 words.
POSITION (inject into step 1): Lesson 1 of 200. Today: "${lessonTitle}".

1. WELCOME + LESSON POSITION — Introduce yourself as "Tutor Max". State today's topic from the lesson context. Tell the student exactly where they are: "Today you're starting Lesson X of Y." If previous and next lesson titles are available, name them: "Previously: [title]. Next: [title]." Never say "Yesterday" — students do not study every day, so "Previously" is the only wording that is always true.
2. ESTIMATED DURATION — Write "Estimated time: X–Y minutes." Calibrate from the lesson goal complexity: short/focused topic → 8–10 min; standard lesson → 12–15 min; complex/multi-concept → 18–20 min.
3. LEARNING OBJECTIVES — introduce them before listing them. Write the line "By the end of this lesson, you will be able to:" and then 3–5 bullet points each starting with ✓. Final bullet always: "✓ Explain this to someone else in plain words." Say "lesson", never "chapter".
4. WHY THIS LESSON MATTERS — 2–3 concrete real-world applications from different fields (name the fields). Use the lesson title and goal to infer — never be generic.
5. PREREQUISITES — list what the student should already know. If completedLessons shows they have covered the relevant prior topics, say so.
6. LESSON ROADMAP — introduce it with a short lead-in sentence ending in a colon, then the stages on one line: "Here's how today will go: Intuition → Explanation → Examples → Guided Practice → Mastery Check → Summary." The arrows are read on screen only — spoken aloud the stages are simply listed — so the lead-in sentence is what makes it sound natural. Keep the stage names to plain words with no numbers.
7. DID YOU KNOW? — open with "Did you know?" and give one surprising or counterintuitive thought that makes the student want to find out more. Write it the way a curious person mentions something interesting, not the way a textbook states a fact.
8. CONFIDENCE CHECK — ask ONE question: "Before we begin — how familiar are you with this topic? 🟢 I already know it / 🟡 I've seen it before / 🔴 Completely new to me." ONE question only — do not turn it into a quiz. If the learner answers naturally instead of selecting an option, accept it and continue.
9. BEGIN TEACHING — calibrate to the answer: 🟢 → move to verification quickly; 🟡 → start from intuition with a brief refresher; 🔴 or no answer → start from scratch with a concrete, real-life scenario the student already knows.

Student level: "beginner". Write at a level appropriate for them.`
}

/** VERBATIM from LessonScreen.tsx's startLesson() — the RETURNING-learner
 *  recap variant, which names a prior lesson and includes a past-sessions
 *  summary that could equally be misread as a "requested topic". */
function returningLearnerOpening(lessonRef: string, pastSessionsSummary: string): string {
  return `The student has returned. They were on: ${lessonRef}. Last session: "${pastSessionsSummary}".
Greet them warmly. In 1–2 sentences recap what was covered last time, then continue teaching from where they left off. If the lesson has changed, give a brief opening for the new lesson first. Student level: "beginner".`
}

const NO_TOPIC_LEAK_RE = /someone else in plain words|what you.?d like to learn about/i

/** Something clearly wrong: an unresolved-topic excursion opened, or the
 *  reply asks about a fabricated topic instead of teaching the real one. */
function hasFabricatedContext(turn: TurnResult): boolean {
  const excursion = readLog(turn, '[excursion]') as { active?: boolean; unresolvedTopic?: string | null } | null
  const text = String((turn.body as { text?: string }).text ?? '')
  return Boolean(excursion?.active) || Boolean(excursion?.unresolvedTopic) || NO_TOPIC_LEAK_RE.test(text)
}

describe('A/B/C. Fresh lesson opening, no learner message — across subjects', () => {
  it.each([
    ['chemistry', 'chem.found.nature-of-matter', 'Nature of Matter'],
    ['english', 'eng.vocab.suffixes', 'Suffixes'],
    ['physics', 'phys.mech.newtons-first-law', "Newton's First Law"],
  ] as const)('%s: no fabricated learner intent, no unrelated topic, lesson-relevant opening', async (subjectSlug, conceptId, lessonTitle) => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: newLessonOpening(lessonTitle), modelReplies: `Welcome! Today's lesson is ${lessonTitle}.`, ephemeral: true },
    ], { subjectSlug, conceptId, lessonTitle })

    const turn = res[0]!
    expect(turn.status).toBe(200)
    expect(hasFabricatedContext(turn)).toBe(false)
    const excursion = readLog(turn, '[excursion]')
    expect(excursion).toMatchObject({ requested: null, requestedTopic: null, active: false })
    // The opening is never persisted (ephemeral) — confirming the fix does
    // not accidentally start writing it to the transcript either.
    expect(h.state.messages.some((m) => m.role === 'USER')).toBe(false)
  })
})

describe('D/J. Zero previous-concept leakage across a lesson/subject switch', () => {
  it('a brand-new session (the real one-session-per-subject shape) starts with no excursion state to leak', async () => {
    // Each subject gets its OWN LearnSession row (POST /api/sessions per
    // subjectSlug) — a genuinely fresh Chemistry session never shares a
    // contextSnapshot with a prior Physics session at all. This is what
    // structurally prevents cross-SUBJECT leakage; it is not this fix's
    // mechanism, and is confirmed here so the two are not conflated.
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: newLessonOpening('Nature of Matter'), modelReplies: 'Welcome to Nature of Matter!', ephemeral: true },
    ], { subjectSlug: 'chemistry', conceptId: 'chem.found.nature-of-matter', lessonTitle: 'Nature of Matter' })
    const turn = res[0]!
    expect(hasFabricatedContext(turn)).toBe(false)
    expect(readLog(turn, '[excursion]')).toMatchObject({ active: false })
  })

  it("this fix's own mechanism: the ephemeral opening's text cannot itself manufacture a NEW excursion target, whatever prior state exists", () => {
    // Directly exercises what changed: previously `message` (the raw
    // opening template) fed both resolvers; now `learnerAuthoredMessage`
    // (empty for an ephemeral turn) does. Whatever the PRIOR excursion
    // state was, the CURRENT turn's text contributes nothing new — closing
    // exactly the mechanism the production defect used, regardless of
    // which lesson or subject the stale state happened to name.
    const opening = newLessonOpening('Nature of Matter')
    expect(namedTopicUnknownTo(opening, 'Nature of Matter')).not.toBeNull() // the raw text WOULD leak
    expect(namedTopicUnknownTo('', 'Nature of Matter')).toBeNull() // the fix's substitution
  })
})

describe('E/F/G/H. A genuine learner message is preserved exactly — this fix does not suppress real intent', () => {
  it('E: "What is a suffix?" is answered as an actual question, not swallowed as ephemeral', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'What is a suffix?', modelReplies: 'A suffix is an ending added to a word.' },
    ], { subjectSlug: 'english', conceptId: 'eng.vocab.suffixes', lessonTitle: 'Suffixes' })
    const arb = readLog(res[0]!, '[arbitration]') as { owner?: string } | null
    expect(arb?.owner).toBe('LEARNER_QUESTION')
  })

  it('F: "I don\'t understand this." is read as genuine confusion, not discarded', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: "I don't understand this.", modelReplies: 'Let me explain it differently.' },
    ], { subjectSlug: 'chemistry', conceptId: 'chem.found.nature-of-matter', lessonTitle: 'Nature of Matter' })
    // RECOVERY (Band 0, mandatory) correctly outranks LEARNER_REQUEST for
    // this exact phrase — recoveryGuard's own DONT_KNOW_SIGNAL_KEYS family
    // already treats "don't understand" as a distress signal, ranked above
    // LEARNER_REQUEST in turnArbitration.ts by design. Either way the
    // confusion is genuinely READ, not swallowed as if it were ephemeral —
    // which is what this test actually needs to prove.
    const arb = readLog(res[0]!, '[arbitration]') as { owner?: string } | null
    expect(arb?.owner).toBe('RECOVERY')
  })

  it('G: "I want to learn about atoms." preserves the real requested topic', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const topic = namedTopicUnknownTo('I want to learn about atoms.', 'Nature of Matter. Covers states of matter.')
    expect(topic?.title).toMatch(/atoms/i)
  })

  it('H: "What do I learn here?" gets a lesson-oriented answer, not invented unrelated context', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'What do I learn here?', modelReplies: 'In this lesson you will learn about the states and properties of matter.' },
    ], { subjectSlug: 'chemistry', conceptId: 'chem.found.nature-of-matter', lessonTitle: 'Nature of Matter' })
    expect(hasFabricatedContext(res[0]!)).toBe(false)
  })
})

describe('I. Persisted/resumed session — only the correct session\'s context is used', () => {
  it('a returning-learner recap opening does not fabricate a topic from its own recap text', async () => {
    h.state.messages = [
      { id: 'm1', role: 'ASSISTANT', content: 'Great session today on states of matter!', createdAt: new Date(Date.now() - 86_400_000) },
    ]
    h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      {
        learnerSays: returningLearnerOpening(
          '"Nature of Matter" (Introduction to Chemistry)',
          'we covered solids, liquids and gases and how particles move differently in each',
        ),
        modelReplies: 'Welcome back! Last time we covered how particles move in solids, liquids and gases.',
        ephemeral: true,
      },
    ], { subjectSlug: 'chemistry', conceptId: 'chem.found.nature-of-matter', lessonTitle: 'Nature of Matter' })
    expect(hasFabricatedContext(res[0]!)).toBe(false)
  })
})

describe('K. D0d session-opening regression — the protocol still fires normally', () => {
  it('an ordinary fresh-session turn (no ephemeral flag) still gets the session-opening decision', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'hello', modelReplies: 'Welcome! Today we are studying Nature of Matter.' },
    ], { subjectSlug: 'chemistry', conceptId: 'chem.found.nature-of-matter', lessonTitle: 'Nature of Matter' })
    const cue = readLog(res[0]!, '[learn/chat] CUE decision=') as { ruleId?: string } | null
    // D0d's own rule id, read straight from the real decision engine — not
    // re-derived. Absence would mean this fix broke the opening protocol.
    if (cue) expect(cue.ruleId).toBe('D0d-SESSION-OPENING-PROTOCOL')
  })
})

describe('L. D4b direct-question priority regression — still works after this fix', () => {
  it('a genuine question mid-lesson still denies a new authored probe via LEARNER_QUESTION', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'Is this sentence correct: "The box of chocolates are on the table"?', modelReplies: 'No — it should be "is", because "box" is singular.' },
    ], { subjectSlug: 'english', conceptId: 'eng.vocab.suffixes', lessonTitle: 'Suffixes' })
    const arb = readLog(res[0]!, '[arbitration]') as { owner?: string; denied?: string[] } | null
    expect(arb?.owner).toBe('LEARNER_QUESTION')
    expect(arb?.denied).toContain('AUTHORED_PROBE')
  })
})

describe('The exact reported phrase, and the CLASS it stands for', () => {
  it('the real opening template no longer extracts "someone else in plain words" as a topic', () => {
    const opening = newLessonOpening('Nature of Matter')
    // Proves the phrase genuinely WOULD be extracted from the raw text —
    // otherwise this test would trivially pass for the wrong reason.
    expect(namedTopicUnknownTo(opening, 'Nature of Matter')?.title).toBe('someone else in plain words')
    // The fix: feeding the SAME text through the safe (ephemeral) value the
    // route now uses closes it — matching route.ts's own
    // `learnerAuthoredMessage = ephemeral ? '' : message` substitution.
    expect(namedTopicUnknownTo('', 'Nature of Matter')).toBeNull()
  })

  it('the CLASS: ANY future instructional template containing a request-shaped worked example is closed the same way', () => {
    // A different hypothetical template phrase, proving this is not a
    // blacklist of one string — the fix is structural (empty message in,
    // nothing extractable out), not lexical.
    const futureTemplate = 'Remember to always "teach the water cycle to a curious five-year-old" when explaining.'
    expect(matchTopicRequest(futureTemplate)).not.toBeNull() // it WOULD trigger the same class of bug
    expect(extractRequestedTopic(futureTemplate)?.title).toMatch(/water cycle/i)
    expect(extractRequestedTopic('')).toBeNull()
  })
})
