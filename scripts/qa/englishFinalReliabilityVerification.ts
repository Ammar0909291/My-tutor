/**
 * ENGLISH FINAL RELIABILITY + TEACHING-INTEGRITY FIX — production verification.
 *
 * Drives one disposable throwaway account through a single English lesson,
 * deliberately shaped to touch as many of the eight required verification
 * scenarios as one real session reasonably can:
 *   1. a lesson that could previously end "pause" despite satisfied thresholds
 *   2. a Suffixes-like progress case (grammar/morphology concept, multiple
 *      correct answers in a row)
 *   3. a direct factual challenge ("that's not right...")
 *   4. a learner grammatical-error case (subject-verb agreement mistake)
 *   5. a repeated-probe case (several consecutive correct answers, watching
 *      for the same MCQ options being re-served)
 *   6. a no-figure request (English currently has zero ACTIVE visual assets,
 *      so this is the reachable case — see CLAUDE.md's AssetIdentity audit)
 *   7. a real-figure case — NOT reachable for English today (no ACTIVE
 *      VISUAL assets exist for any English concept); reported honestly,
 *      not faked
 *   8. a direct learner question, answered before any assessment pivot
 *
 * Reads and reports; does not assert pass/fail with a hardcoded rubric — the
 * report at the end interprets the transcript. Account is created, driven,
 * then deleted and the deletion is proven (relogin blocked), per this
 * project's own liveAccount.ts discipline.
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'

interface TurnResult {
  tag: string
  message: string
  status: number
  text: string
  provider: string | null
  mcq: { question?: string; options?: string[] } | null
  mastery: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  lessonComplete: boolean
  visual: boolean
  raw: any
}

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

async function chat(cookie: string, sessionId: string, tag: string, message: string): Promise<TurnResult> {
  const { status, json } = await postJson('/api/learn/chat', { sessionId, message }, cookie)
  const j = json ?? {}
  return {
    tag,
    message,
    status,
    text: String(j.text ?? j.message ?? ''),
    provider: j.provider ?? null,
    mcq: j.mcq ? { question: j.mcq.question, options: j.mcq.options } : null,
    mastery: j.mastery ?? null,
    lessonComplete: Boolean(j.lessonComplete?.complete),
    visual: Boolean(j.visual || j.visualSpec || j.sceneSpec || j.dynamicVisualizationCode),
    raw: j,
  }
}

function log(r: TurnResult) {
  console.log(`\n=== ${r.tag} (HTTP ${r.status}) ===`)
  console.log(`> learner: ${r.message}`)
  console.log(`  provider=${r.provider} visual=${r.visual} mcq=${r.mcq ? 'yes' : 'no'}`)
  if (r.mastery) console.log(`  mastery: phase=${r.mastery.phase} verified=${r.mastery.verified} check=${r.mastery.checkCorrect} practice=${r.mastery.practiceCorrect}`)
  console.log(`  lessonComplete=${r.lessonComplete}`)
  console.log(`  reply: ${r.text.replace(/\s+/g, ' ').slice(0, 500)}`)
  if (r.mcq?.options) console.log(`  mcq options: ${JSON.stringify(r.mcq.options)}`)
}

// Flags we scan every reply for — the concrete defects this task fixed.
const STAGE_LEAK_RE = /\bStage\s+\d+\b|\bObservation question\b|\bLesson\s+\d+\s+of\s+\d+\b/i
const FALSE_IMAGE_CLAIM_RE = /\b(here'?s?|this is|see)\s+(the|a|your)\s+(diagram|image|picture|figure)\b/i
const HONEST_NO_FIGURE_RE = /can'?t show you a rendered image|no rendered image is available|don'?t have (a|an) (image|diagram|figure)/i
const UNEXPLAINED_PAUSE_RE = /\bpause\b/i

async function main() {
  console.log(`Base: ${BASE}`)
  const acct = await createQaAccount('eng-reliability')
  console.log(`Created disposable account: ${acct.email}`)

  const results: TurnResult[] = []
  let deletedOk = false
  try {
    // 1. Session + curriculum lookup — prefer a grammar/morphology concept.
    const sr = await postJson('/api/sessions', { subjectSlug: 'english' }, acct.cookie)
    const sessionId = sr.json?.data?.id ?? sr.json?.id
    if (!sessionId) throw new Error(`session create failed: ${JSON.stringify(sr.json)}`)

    const curRes = await fetch(`${BASE}/api/curriculum?subject=english`, { headers: { cookie: acct.cookie } })
    const curriculum = await curRes.json() as any
    const lessons: any[] = curriculum.lessons ?? []
    let lesson = lessons.find((l) => /suffix/i.test(l.lessonTitle ?? '') || l.topicSlug?.startsWith('eng.morph.'))
    if (!lesson) lesson = lessons.find((l) => l.topicSlug?.startsWith('eng.gram.'))
    if (!lesson) lesson = lessons.find((l) => l.topicSlug?.startsWith('eng.'))
    if (!lesson) throw new Error('No English lesson found in curriculum response')
    console.log(`Selected lesson: ${lesson.topicSlug} — "${lesson.lessonTitle}" (order ${lesson.order}/${lessons.length})`)

    const init = await postJson('/api/learn/lesson-init', {
      sessionId, mode: 'restart',
      lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
      totalLessons: lessons.length, completedLessons: [],
      teachingLanguage: 'en',
    }, acct.cookie)
    console.log(`\n=== lesson-init (HTTP ${init.status}) ===`)
    console.log(`  reply: ${String(init.json?.text ?? '').replace(/\s+/g, ' ').slice(0, 500)}`)

    // Scenario 8 — direct learner question, answered before any pivot.
    results.push(await chat(acct.cookie, sessionId, 'S8-direct-question',
      `Before we go further — what exactly is a suffix, and how do I know when to add one?`))

    // Scenario 6 — no-figure request (English has no ACTIVE visual assets).
    results.push(await chat(acct.cookie, sessionId, 'S6-no-figure-request',
      `Can you show me a diagram or picture for this?`))

    // Scenario 4 — learner grammatical-error case (own mistake in their text).
    results.push(await chat(acct.cookie, sessionId, 'S4-grammar-error',
      `Ok, I think I understand. Is this sentence correct: "The box of chocolates are on the table"?`))

    // Scenario 3 — direct factual challenge.
    results.push(await chat(acct.cookie, sessionId, 'S3-claim-challenge',
      `That's not right, I read it differently — are you sure about that?`))

    // Scenario 2 / 5 — several correct answers in a row (progress + repeated probe watch).
    for (let i = 0; i < 6; i++) {
      results.push(await chat(acct.cookie, sessionId, `S2S5-progress-${i + 1}`,
        i === 0
          ? `Ok got it, thanks. Can you give me a question to check I understand?`
          : `I think the answer is the first option — that matches the rule you just explained.`))
      const last = results[results.length - 1]!
      if (last.lessonComplete) { console.log('  (lesson reported complete — stopping progress loop)'); break }
    }

    for (const r of results) log(r)

    // ---- Analysis -------------------------------------------------------
    console.log('\n\n================ ANALYSIS ================')
    const stageLeaks = results.filter((r) => STAGE_LEAK_RE.test(r.text))
    const falseImageClaims = results.filter((r) => FALSE_IMAGE_CLAIM_RE.test(r.text) && !r.visual)
    const honestNoFigure = results.filter((r) => HONEST_NO_FIGURE_RE.test(r.text))
    const unexplainedPauses = results.filter((r) => UNEXPLAINED_PAUSE_RE.test(r.text) && !/answered well|wasn't able to confirm|couldn't confirm|review/i.test(r.text))
    const optionSets = results.filter((r) => r.mcq?.options).map((r) => JSON.stringify([...r.mcq!.options!].sort()))
    const dupOptionSets = optionSets.filter((s, i) => optionSets.indexOf(s) !== i)

    console.log(`Internal stage/index leaks (should be 0): ${stageLeaks.length} — ${stageLeaks.map((r) => r.tag).join(', ')}`)
    console.log(`Claimed a real image with no visual payload attached (should be 0): ${falseImageClaims.length} — ${falseImageClaims.map((r) => r.tag).join(', ')}`)
    console.log(`Honest "no rendered image" acknowledgements: ${honestNoFigure.length} — ${honestNoFigure.map((r) => r.tag).join(', ')}`)
    console.log(`Bare/unexplained "pause" language (should be 0): ${unexplainedPauses.length} — ${unexplainedPauses.map((r) => r.tag).join(', ')}`)
    console.log(`Duplicate MCQ option sets served more than once: ${dupOptionSets.length}`)
    const finalMastery = [...results].reverse().find((r) => r.mastery)?.mastery
    console.log(`Final mastery snapshot: ${JSON.stringify(finalMastery)}`)
    console.log(`Any lessonComplete=true turn: ${results.some((r) => r.lessonComplete)}`)
  } finally {
    const del = await deleteQaAccount(acct)
    deletedOk = del.deleted && del.reloginBlocked
    console.log(`\nAccount cleanup: deleted=${del.deleted} reloginBlocked=${del.reloginBlocked}`)
  }

  if (!deletedOk) {
    console.error('WARNING: disposable account cleanup could not be fully confirmed.')
    process.exitCode = 1
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
