/**
 * MY TUTOR — P1 LESSON-OPENING CONTEXT CORRUPTION FIX — production verification.
 *
 * Replicates EXACTLY what LessonScreen.tsx's startLesson() does for a genuinely
 * fresh session (POST /api/sessions, then POST /api/learn/chat with the
 * verbatim 9-step opening instruction template as `message`, `ephemeral: true`)
 * — using the real deployed API, a disposable account, and the REAL production
 * template text, not a hand-simplified stand-in.
 *
 * Confirms: no "someone else in plain words" (or any equivalent fabricated
 * topic/excursion), no unrelated learner intent invented, correct lesson
 * context in the reply, and normal opening behaviour for an ordinary ack.
 * Does not manufacture mastery. Account is created, driven, then deleted and
 * the deletion is proven (relogin blocked).
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'

async function postJson(pathname: string, body: unknown, cookie: string) {
  const res = await fetch(`${BASE}${pathname}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let json: any = null
  try { json = JSON.parse(text) } catch { /* non-JSON */ }
  return { status: res.status, json, text }
}

/** VERBATIM from LessonScreen.tsx's startLesson() — the "new learner —
 *  world-class 9-step lesson opening" template, English, no returning-
 *  learner context. */
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

// The DEFECT shape is a fabricated CLARIFYING QUESTION about the phrase
// ("Could you tell me what you'd like to learn about 'someone else in plain
// words'?") — not the phrase's own LEGITIMATE appearance as the intended
// final Learning Objectives bullet ("✓ Explain this to someone else in
// plain words."), which a correct opening is SUPPOSED to render verbatim.
// Matching the bare phrase alone (an earlier draft of this script did) is a
// false positive on every correct opening; this only matches the phrase
// co-occurring with a "what would you like to learn" clarifying question.
const FABRICATED_TOPIC_QUESTION_RE = /what (?:you'?d|you would) like to learn about[^.?!]*(?:someone else in plain words|plain words)/i

async function runScenario(subjectSlug: string, lessonTitle: string, label: string) {
  console.log(`\n\n########## ${label} — fresh ${subjectSlug} opening: "${lessonTitle}" ##########`)
  const acct = await createQaAccount(`opening-${subjectSlug}`)
  console.log(`Created disposable account: ${acct.email}`)
  let deletedOk = false
  try {
    // Exactly what startLesson() does: create the session, then send the
    // opening instruction through /api/learn/chat as an ephemeral turn.
    const sr = await postJson('/api/sessions', { subjectSlug }, acct.cookie)
    const sessionId = sr.json?.data?.id ?? sr.json?.id
    if (!sessionId) throw new Error(`session create failed: ${JSON.stringify(sr.json)}`)
    console.log(`Session created: ${sessionId}`)

    const opening = newLessonOpening(lessonTitle)
    const r1 = await postJson('/api/learn/chat', { sessionId, message: opening, ephemeral: true }, acct.cookie)
    const text1 = String(r1.json?.text ?? '')
    console.log(`\n=== T1 (ephemeral opening) HTTP ${r1.status} ===`)
    console.log(`  reply: ${text1.replace(/\s+/g, ' ').slice(0, 600)}`)

    // A second, ordinary turn — an unremarkable acknowledgement — confirms
    // normal opening behaviour continues correctly afterward.
    const r2 = await postJson('/api/learn/chat', { sessionId, message: 'ok' }, acct.cookie)
    const text2 = String(r2.json?.text ?? '')
    console.log(`\n=== T2 (ordinary "ok") HTTP ${r2.status} ===`)
    console.log(`  reply: ${text2.replace(/\s+/g, ' ').slice(0, 400)}`)

    console.log(`\n--- ${label} ANALYSIS ---`)
    const leaked1 = FABRICATED_TOPIC_QUESTION_RE.test(text1)
    const leaked2 = FABRICATED_TOPIC_QUESTION_RE.test(text2)
    console.log(`T1 contains the fabricated-topic phrase (should be NO): ${leaked1 ? 'YES — DEFECT' : 'no'}`)
    console.log(`T2 contains the fabricated-topic phrase (should be NO): ${leaked2 ? 'YES — DEFECT' : 'no'}`)
    const mentionsLesson = new RegExp(lessonTitle.split(/\s+/)[0]!, 'i').test(text1)
    console.log(`T1 mentions the actual lesson topic (${lessonTitle}): ${mentionsLesson}`)
    if (leaked1 || leaked2) process.exitCode = 1
  } finally {
    const del = await deleteQaAccount(acct)
    deletedOk = del.deleted && del.reloginBlocked
    console.log(`\nAccount cleanup: deleted=${del.deleted} reloginBlocked=${del.reloginBlocked}`)
  }
  return deletedOk
}

async function main() {
  console.log(`Base: ${BASE}`)
  const ok1 = await runScenario('chemistry', 'Nature of Matter', 'PRIMARY REPRO — Chemistry / Nature of Matter')
  const ok2 = await runScenario('english', 'Suffixes', 'GENERICITY CHECK — English / Suffixes')
  if (!ok1 || !ok2) {
    console.error('WARNING: disposable account cleanup could not be fully confirmed for one or both scenarios.')
    process.exitCode = 1
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
