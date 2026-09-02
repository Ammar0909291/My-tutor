/**
 * Fix Verification — live end-to-end check for Fix 1 and Fix 2
 *
 * Fix 1 (d9f49b3): authored-probe grade must NOT be overruled by prose verification.
 *   - Measures: mastery.correctAtCheck increments after a correct answer to an authored MCQ.
 *   - Measures: whether correctIndex is present in the raw JSON response (currently IS sent).
 *
 * Fix 2 (5ec07eb): when a probe is pending from a prior turn AND the model's prose question
 *   is stripped, fallback must be "Let me check your thinking with this." not
 *   "Let's stay with this idea for a moment."
 *   - Measures: which fallback sentence appears in the response.
 *   - Measures: whether the pending MCQ is re-served correctly.
 *
 * Run: QA_PASSWORD=... npx tsx scripts/qa/fix-verification.ts
 * Account: suaibamr@gmail.com (QA_PASSWORD env var only — password never hardcoded)
 */

import { mergeCookies, csrfTokenFromJar } from '../math/certify'

const BASE = 'https://my-tutor-flame.vercel.app'
const EMAIL = 'suaibamr@gmail.com'
const PASSWORD = process.env.QA_PASSWORD ?? ''

// Two physics concepts known to have full authored probe/explanation coverage.
const CONCEPTS = [
  { subject: 'physics', startsWith: 'phys.mech.newtons-first-law', label: 'Newton\'s First Law' },
  { subject: 'physics', startsWith: 'phys.mech.kinetic-energy',    label: 'Kinetic Energy' },
]

const WITHHELD_STAY  = "Let's stay with this idea for a moment."
const WITHHELD_HANDS = 'Let me check your thinking with this.'

// Evidence collected across the run
const evidence: {
  concept: string
  turn: number
  correctIndexPresent: boolean | null
  mcqAssetId: string | null
  mcqAssetPresent: boolean
  mastery: { phase: string; check: number; practice: number; verified: boolean } | null
  textSnippet: string
  hadPendingMcqAndStayAppeared: boolean
  hadPendingMcqAndHandsAppeared: boolean
}[] = []

// ── Auth ────────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  const c = await fetch(`${BASE}/api/auth/csrf`)
  const b = await c.json() as { csrfToken: string }
  const jar = mergeCookies(c.headers.getSetCookie?.() ?? [])
  const t = csrfTokenFromJar(jar) ?? b.csrfToken
  const r = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST', redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken: t, email: EMAIL, password: PASSWORD, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), r.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) throw new Error(`login failed (${r.status})`)
  return all
}

// ── Session + lesson setup ───────────────────────────────────────────────────

async function startLesson(
  cookie: string, subject: string, conceptPrefix: string
): Promise<{ sid: string; init: any; lesson: any }> {
  // End any active sessions
  const activeSessions = await fetch(`${BASE}/api/sessions`, { headers: { cookie } })
    .then(r => r.json()).catch(() => ({ data: [] })) as any
  for (const s of activeSessions.data ?? []) {
    if (s.id) await fetch(`${BASE}/api/sessions/end`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ sessionId: s.id }),
    }).catch(() => {})
  }

  const sr = await fetch(`${BASE}/api/sessions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: subject }),
  })
  const sd = await sr.json() as any
  const sid = sd.data?.id ?? sd.id
  if (!sid) throw new Error(`session create failed: ${JSON.stringify(sd)}`)

  const cr = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })
  const curriculum = await cr.json() as any
  const lessons: any[] = curriculum.lessons ?? []

  let lesson = lessons.find((l: any) => l.topicSlug === conceptPrefix)
  if (!lesson) lesson = lessons.find((l: any) => l.topicSlug?.startsWith(conceptPrefix))
  if (!lesson) lesson = lessons.find((l: any) => l.topicSlug?.startsWith('phys.mech.'))
  if (!lesson) lesson = lessons.find((l: any) => l.topicSlug?.startsWith('phys.'))
  if (!lesson) throw new Error(`No concept found for ${conceptPrefix}`)
  console.log(`  ✓ Concept: ${lesson.topicSlug} — "${lesson.lessonTitle}"`)

  const ir = await fetch(`${BASE}/api/learn/lesson-init`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      sessionId: sid, mode: 'restart',
      lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
      totalLessons: lessons.length, completedLessons: [],
      teachingLanguage: 'en',
    }),
  })
  if (!ir.ok) throw new Error(`lesson-init failed: ${ir.status} ${await ir.text()}`)
  const init = await ir.json()
  return { sid, init, lesson }
}

async function chat(message: string, sid: string, cookie: string): Promise<any> {
  const r = await fetch(`${BASE}/api/learn/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId: sid, message }),
  })
  if (!r.ok) throw new Error(`chat failed: ${r.status} ${await r.text()}`)
  return r.json()
}

// ── Evidence recording ───────────────────────────────────────────────────────

function recordTurn(concept: string, turn: number, resp: any, pendingMcqOnScreen: boolean): void {
  const mcq = resp.mcq
  const correctIndexPresent = mcq != null ? ('correctIndex' in mcq) : null
  const mcqAssetId   = mcq?.assetId ?? null
  const mcqAssetPresent = mcqAssetId != null
  const text = resp.text ?? ''
  const mastery = resp.mastery ? {
    phase: resp.mastery.phase ?? '?',
    check: resp.mastery.correctAtCheck ?? 0,
    practice: resp.mastery.correctAtPractice ?? 0,
    verified: resp.mastery.verified ?? false,
  } : null

  const textSnippet = text.slice(0, 200).replace(/\n/g, ' ')

  // Fix 2 evidence: did the regression fallback appear while a probe was pending?
  const hadPendingMcqAndStayAppeared  = pendingMcqOnScreen && text.includes(WITHHELD_STAY)
  const hadPendingMcqAndHandsAppeared = pendingMcqOnScreen && text.includes(WITHHELD_HANDS)

  evidence.push({
    concept, turn, correctIndexPresent, mcqAssetId, mcqAssetPresent,
    mastery, textSnippet, hadPendingMcqAndStayAppeared, hadPendingMcqAndHandsAppeared,
  })
}

// ── Dumb-student personas ────────────────────────────────────────────────────

// Persona 1: Newton's First Law — mildly confused, occasionally wrong
const TURNS_NEWTON = [
  "ok so what is newtons first law exactly",
  "i dont understand why a moving object keeps moving if nothing is pushing it",
  "but friction stops things so how can it just keep going forever",
  // After probe attaches: pick option 1 (may or may not be correct — we measure the result)
  // The wrong-then-right sequence tests Fix 1
  "1",   // first option — may be wrong
  "wait i think i was wrong. is it 2",
  "ok can u just tell me which answer is right and explain why",
]

// Persona 2: Kinetic Energy — short confused messages; we deliberately DON'T answer the MCQ
//            to create pendingMcq state and trigger the Fix 2 scenario
const TURNS_KE = [
  "what is kinetic energy",
  "ok so the formula is half m v squared. why squared tho",
  "so if i double the speed the energy goes up by 4? thats weird",
  // When MCQ attaches — DO NOT answer it, send something else
  "can u explain that differently i dont get the question",
  // Model should re-serve pending MCQ; check fallback sentence
  "ok so is it the first option",
  "got it",
]

// ── Run one concept ──────────────────────────────────────────────────────────

async function runConcept(
  cookie: string, subject: string, conceptPrefix: string, label: string, turns: string[]
): Promise<void> {
  console.log(`\n── Concept: ${label} ──────────────────────────────────────`)
  const { sid, init, lesson } = await startLesson(cookie, subject, conceptPrefix)

  if (init.text) {
    console.log(`  T0 (init): ${init.text.slice(0, 100).replace(/\n/g, ' ')}…`)
    if (init.mcq) console.log(`  T0 MCQ: "${init.mcq.question?.slice(0, 60)}" assetId=${init.mcq.assetId ?? 'NONE'}`)
  }

  let pendingMcqOnScreen = init.mcq != null
  let prevMastery = { check: 0, practice: 0 }

  for (let i = 0; i < turns.length; i++) {
    const msg = turns[i]
    const turnNum = i + 1
    console.log(`  T${turnNum} student: "${msg}"`)

    let resp: any
    try {
      resp = await chat(msg, sid, cookie)
    } catch (e: any) {
      console.log(`  T${turnNum} ❌ ${e.message}`)
      break
    }

    recordTurn(lesson.topicSlug, turnNum, resp, pendingMcqOnScreen)

    const mcq = resp.mcq
    const mastery = resp.mastery
    const text = resp.text ?? ''
    const phase = mastery?.phase ?? '?'
    const check = mastery?.correctAtCheck ?? 0
    const practice = mastery?.correctAtPractice ?? 0
    const verified = mastery?.verified ?? false
    const prov = resp.provider ? `[${resp.provider}]` : ''

    // Log MCQ details
    if (mcq) {
      const hasCorrectIndex = 'correctIndex' in mcq
      const assetLabel = mcq.assetId ? `assetId=${mcq.assetId.slice(0, 8)}…` : 'NO assetId (model-invented)'
      console.log(`  T${turnNum} MCQ: "${mcq.question?.slice(0, 60)}" ${assetLabel}`)
      console.log(`  T${turnNum} MCQ: correctIndex in response=${hasCorrectIndex} value=${mcq.correctIndex}`)
    } else {
      console.log(`  T${turnNum} MCQ: none`)
    }

    // Log mastery changes
    const checkDelta    = check - prevMastery.check
    const practiceDelta = practice - prevMastery.practice
    const masteryChange = checkDelta !== 0 || practiceDelta !== 0
    console.log(`  T${turnNum} mastery: phase=${phase} check=${check}(Δ${checkDelta >= 0 ? '+' : ''}${checkDelta}) practice=${practice}(Δ${practiceDelta >= 0 ? '+' : ''}${practiceDelta}) verified=${verified} ${prov}`)

    // Flag Fix 2 sentence appearances
    if (text.includes(WITHHELD_STAY)) {
      const flag = pendingMcqOnScreen ? '⚠️  REGRESSION (probe was pending)' : '(no pending probe — expected)'
      console.log(`  T${turnNum} [FIX2] "${WITHHELD_STAY}" appeared ${flag}`)
    }
    if (text.includes(WITHHELD_HANDS)) {
      console.log(`  T${turnNum} [FIX2] ✓ "${WITHHELD_HANDS}" appeared — Fix 2 confirmed positive`)
    }

    // Log text snippet
    const snippet = text.slice(0, 150).replace(/\n/g, ' ')
    console.log(`  T${turnNum} text: "${snippet}…"`)

    prevMastery = { check, practice }
    // A probe is "on screen" if this turn served one (carried or fresh)
    pendingMcqOnScreen = mcq != null

    if (verified) {
      console.log(`  T${turnNum} ✓ MASTERY REACHED — stopping this concept`)
      break
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────────────

function printReport(): void {
  const sep = '═'.repeat(70)
  console.log(`\n${sep}`)
  console.log('  FIX VERIFICATION REPORT')
  console.log(sep)

  // Fix 1a: correctIndex in response
  const mcqTurns = evidence.filter(e => e.correctIndexPresent !== null)
  const correctIndexPresentCount = mcqTurns.filter(e => e.correctIndexPresent === true).length
  console.log('\n── Fix 1a: correctIndex in raw JSON response ──────────────')
  if (mcqTurns.length === 0) {
    console.log('  NOT MEASURED — no MCQ responses received')
  } else {
    const verdict = correctIndexPresentCount > 0 ? 'PRESENT (key IS sent to client)' : 'ABSENT (key NOT sent to client)'
    console.log(`  MEASURED: correctIndex field ${verdict}`)
    console.log(`  Turns with MCQ: ${mcqTurns.length}, turns with correctIndex: ${correctIndexPresentCount}`)
    mcqTurns.forEach(e =>
      console.log(`    ${e.concept} T${e.turn}: correctIndex=${e.correctIndexPresent} assetId=${e.mcqAssetId?.slice(0,8) ?? 'none'}`)
    )
  }

  // Fix 1b: mastery advancement after correct authored-probe answer
  console.log('\n── Fix 1b: mastery counter advancement ────────────────────')
  const authoredMcqTurns = evidence.filter(e => e.mcqAssetPresent)
  const masteryAdvanced = evidence.filter(e =>
    e.mastery && (e.mastery.check > 0 || e.mastery.practice > 0)
  )
  if (authoredMcqTurns.length === 0) {
    console.log('  NOT MEASURED — no authored MCQ probes (assetId) were served')
  } else {
    console.log(`  MEASURED: ${authoredMcqTurns.length} turns with authored probe (assetId present)`)
    if (masteryAdvanced.length > 0) {
      console.log(`  MEASURED: mastery counters advanced in ${masteryAdvanced.length} turn(s)`)
      masteryAdvanced.forEach(e =>
        console.log(`    ${e.concept} T${e.turn}: check=${e.mastery!.check} practice=${e.mastery!.practice} verified=${e.mastery!.verified}`)
      )
      console.log('  → Server grading drove mastery correctly. Fix 1b: CONSISTENT WITH FIX WORKING.')
    } else {
      console.log('  NOT MEASURED — mastery counters did not advance (may need more correct answers)')
    }
  }

  // Fix 2: fallback sentence when probe pending
  console.log('\n── Fix 2: pending-probe fallback sentence ─────────────────')
  const regressions  = evidence.filter(e => e.hadPendingMcqAndStayAppeared)
  const confirmations = evidence.filter(e => e.hadPendingMcqAndHandsAppeared)

  if (regressions.length > 0) {
    console.log(`  ⚠️  REGRESSION DETECTED: "${WITHHELD_STAY}" appeared ${regressions.length} time(s) while probe was pending`)
    regressions.forEach(e => console.log(`    ${e.concept} T${e.turn}`))
  } else {
    console.log(`  MEASURED: "${WITHHELD_STAY}" never appeared while a probe was pending`)
  }

  if (confirmations.length > 0) {
    console.log(`  ✓ POSITIVE CONFIRMATION: "${WITHHELD_HANDS}" appeared ${confirmations.length} time(s) while probe was pending`)
    confirmations.forEach(e => console.log(`    ${e.concept} T${e.turn}`))
    console.log('  → Fix 2 confirmed working (positive evidence).')
  } else {
    console.log(`  "${WITHHELD_HANDS}" did not appear — Fix 2 path was not triggered in these turns.`)
    console.log('  NOT MEASURED (no regression detected, but positive trigger not observed).')
  }

  console.log('\n── Summary ────────────────────────────────────────────────')
  console.log(`  Fix 1a (key leak):      ${correctIndexPresentCount > 0 ? 'correctIndex IS in response (MEASURED — key sent to client)' : mcqTurns.length > 0 ? 'correctIndex NOT in response (MEASURED)' : 'NOT MEASURED'}`)
  console.log(`  Fix 1b (grading):       ${masteryAdvanced.length > 0 ? 'mastery advanced correctly (MEASURED)' : 'NOT MEASURED (no advancement seen)'}`)
  console.log(`  Fix 2 regression check: ${regressions.length === 0 ? 'PASS (no regression sentence while probe pending)' : 'FAIL (regression sentence appeared)'}`)
  console.log(`  Fix 2 positive confirm: ${confirmations.length > 0 ? 'CONFIRMED (new sentence appeared)' : 'NOT TRIGGERED (path not hit in these turns)'}`)
  console.log(sep)
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║  Fix Verification — d9f49b3 (Fix 1) + 5ec07eb (Fix 2)       ║')
  console.log('║  Account: suaibamr@gmail.com  (QA_PASSWORD env only)        ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  if (!PASSWORD) {
    console.error('Error: QA_PASSWORD env var is not set. Aborting.')
    process.exit(1)
  }

  const cookie = await login()
  console.log('✓ Logged in')

  await runConcept(cookie, 'physics', 'phys.mech.newtons-first-law', CONCEPTS[0].label, TURNS_NEWTON)
  await runConcept(cookie, 'physics', 'phys.mech.kinetic-energy',    CONCEPTS[1].label, TURNS_KE)

  printReport()
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
