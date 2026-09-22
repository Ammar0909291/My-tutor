/**
 * PHASE 2 — real production runtime QA for Biology, driven as an actual
 * learner against the deployed app (not a unit test, not a dry-run).
 *
 * Scope: verifies the invariant
 *   TEACH -> CHECK -> GRADE -> VERIFIED EVIDENCE -> MASTERY
 * and separately
 *   VISUAL EXISTS -> CORRECT CONCEPT -> GROUNDED NARRATION
 * for three Biology concepts:
 *   - bio.physio.homeostasis-thermoregulation (one of the three concepts
 *     just repaired at the asset-contract layer — this is the direct
 *     production check that the repair actually serves through the real
 *     lesson pipeline, not just that rows exist in the DB)
 *   - bio.physio.lymphatic-system-detail (the other repaired concept with
 *     zero pre-existing production content; has NO visual asset, so it
 *     doubles as the "never claim a visual that wasn't returned" check)
 *   - bio.plant.photosynthesis (has a genuine ACTIVE visual asset; used
 *     for the visual-grounding check)
 *
 * `mcq.correctIndex` is NOT trusted here (the route strips it from the
 * client-facing payload — see route.ts's `mcqForClient` comment), so this
 * harness answers using option TEXT it knows independently from the
 * canonical seed content, exactly as a learner who has read the material
 * would recognise the right wording — never by reading a leaked answer key.
 *
 * Uses a disposable QA account (register -> drive -> delete), never a real
 * account, and touches only Biology lessons.
 *
 * Run: npx tsx scripts/qa/biologyProductionRuntimeQa.ts
 */
import { writeFileSync } from 'node:fs'
import { createQaAccount, BASE } from './liveAccount'

// IMPORTANT: this script deliberately does NOT delete the QA account itself.
// TopicProgress/evidence/lesson_attempts rows key off userId with
// onDelete: Cascade, so deleting the account before an independent DB
// verification would destroy the exact evidence this run exists to check.
// Deletion is a separate, explicit follow-up step run only after the DB
// cross-check has read what it needs.

interface CurriculumLesson {
  topicSlug: string
  lessonTitle: string
  order: number
  unitTitle: string
}

interface ChatTurn {
  text?: string
  provider?: string | null
  mcq?: { question: string; options: string[] } | null
  visualSpec?: { type?: string; kind?: string; title?: string; conceptId?: string } | null
  visual?: unknown
  sceneSpec?: unknown
  mastery?: {
    phase?: string
    verified?: boolean
    checkCorrect?: number
    practiceCorrect?: number
  } | null
  lessonComplete?: { complete?: boolean } | null
  [k: string]: unknown
}

async function fetchCurriculum(cookie: string, subject: string): Promise<CurriculumLesson[]> {
  const r = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })
  if (!r.ok) throw new Error(`curriculum fetch failed: ${r.status}`)
  const d = (await r.json()) as { lessons?: CurriculumLesson[] }
  return d.lessons ?? []
}

async function startSession(cookie: string, subjectSlug: string): Promise<string> {
  const r = await fetch(`${BASE}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug }),
  })
  const d = (await r.json()) as { data?: { id?: string }; id?: string }
  const id = d.data?.id ?? d.id
  if (!id) throw new Error(`session create failed: ${JSON.stringify(d)}`)
  return id
}

async function initLesson(
  cookie: string, sessionId: string, lesson: CurriculumLesson, totalLessons: number,
): Promise<ChatTurn> {
  const r = await fetch(`${BASE}/api/learn/lesson-init`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      sessionId, mode: 'restart',
      lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
      topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle,
      totalLessons, completedLessons: [], teachingLanguage: 'en',
    }),
  })
  if (!r.ok) throw new Error(`lesson-init failed: ${r.status} ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as ChatTurn
}

async function chat(cookie: string, sessionId: string, message: string): Promise<ChatTurn> {
  const r = await fetch(`${BASE}/api/learn/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ sessionId, message }),
  })
  if (!r.ok) throw new Error(`chat failed: ${r.status} ${(await r.text()).slice(0, 300)}`)
  return (await r.json()) as ChatTurn
}

function log(line: string) { console.log(line) }
function short(s: string | undefined, n = 220): string {
  return (s ?? '').replace(/\s+/g, ' ').slice(0, n)
}
function claimsVisual(text: string | undefined): boolean {
  if (!text) return false
  return /\b(here'?s|see|look at|shown|showing|below is|the diagram|the figure|the animation|the visual|the illustration)\b.{0,40}\b(diagram|figure|animation|visual|illustration|graph|picture)\b/i.test(text)
    || /\b(diagram|figure|visual|illustration)\s+(above|below|shows|shown)\b/i.test(text)
}
function carriesFigure(p: ChatTurn): boolean {
  return Boolean(p.visualSpec) || Boolean(p.visual) || Boolean(p.sceneSpec)
}

const findings: string[] = []
function finding(f: string) { findings.push(f); log(`  !! FINDING: ${f}`) }

// ─── Canonical answer text, taken directly from the seed content already
// written to production (never invented for this test) ─────────────────────
const HOMEO_MCQ1_CORRECT = 'The response opposes the deviation, restoring the set point — a normal, healthy process'
const HOMEO_MCQ1_WRONG_MISCONCEPTION = 'Something is going wrong in the body'
const HOMEO_MISCONCEPTION_PROBE_CORRECT = 'Vasodilation is coordinated with sweating as part of the same heat-loss response triggered by the hypothalamus'
const HOMEO_SHORT_ANSWER_FULL = 'A set point, a deviation detector, and a counteracting negative-feedback response'
const HOMEO_SHORT_ANSWER_PARTIAL = 'It has a set point'

const LYMPH_MCQ1_CORRECT = "The lymphatic system's fluid-balance and immune-surveillance roles are separable"
const LYMPH_MISCONCEPTION_PROBE_CORRECT = 'Wrong — this is lymphedema, caused specifically by impaired lymphatic drainage, not a blood-vessel problem'
const LYMPH_SHORT_ANSWER_CORRECT = 'One-way, from peripheral tissues toward the central venous circulation'

const NUDGES = ['ok, i think i follow so far', 'can you give me a practice question', 'can you quiz me on this']

function pickReply(p: ChatTurn, nudgeIdx: { n: number }): string {
  if (p.mcq && Array.isArray(p.mcq.options)) {
    const q = p.mcq.question ?? ''
    if (/negative feedback.*tell you|physiological process is described as using/i.test(q)) return HOMEO_MCQ1_CORRECT
    if (/vasodilation occurring/i.test(q)) return HOMEO_MISCONCEPTION_PROBE_CORRECT
    if (/general structure.*thermoregulation and osmoregulation/i.test(q)) return HOMEO_SHORT_ANSWER_FULL
    if (/damaged lymphatic vessels/i.test(q)) return LYMPH_MCQ1_CORRECT
    if (/lymph node removal during cancer surgery/i.test(q)) return LYMPH_MISCONCEPTION_PROBE_CORRECT
    if (/direction does lymph flow/i.test(q)) return LYMPH_SHORT_ANSWER_CORRECT
    // Unrecognised probe: answer with the first option as a best-effort learner guess.
    return p.mcq.options[0]
  }
  const msg = NUDGES[nudgeIdx.n % NUDGES.length]
  nudgeIdx.n++
  return msg
}

interface ConceptResult {
  topicSlug: string
  openingHadFigure: boolean
  openingClaimedVisualInText: boolean
  turns: Array<{ n: number; sent: string; received: string; mastery?: ChatTurn['mastery']; figure: boolean; claimedVisual: boolean }>
  finalMastery?: ChatTurn['mastery']
  repeatAttemptMastery?: ChatTurn['mastery']
  sessionId: string
}

async function driveConcept(
  cookie: string, lessons: CurriculumLesson[], topicSlug: string, script: {
    wrongAnswer?: string; partialAnswer?: string; transferQuestion: string; maxTurns: number
  },
): Promise<ConceptResult> {
  const lesson = lessons.find((l) => l.topicSlug === topicSlug)
  if (!lesson) throw new Error(`No curriculum lesson found for ${topicSlug} (curriculum has ${lessons.length} biology lessons)`)
  log(`\n=== ${topicSlug} — "${lesson.lessonTitle}" (order ${lesson.order}, unit "${lesson.unitTitle}") ===`)

  const sessionId = await startSession(cookie, 'biology')
  const init = await initLesson(cookie, sessionId, lesson, lessons.length)
  const result: ConceptResult = {
    topicSlug, sessionId,
    openingHadFigure: carriesFigure(init),
    openingClaimedVisualInText: claimsVisual(init.text),
    turns: [],
  }
  log(`  [open] figure=${result.openingHadFigure} claimsVisualInText=${result.openingClaimedVisualInText}`)
  log(`  [open] ${short(init.text)}`)
  if (result.openingClaimedVisualInText && !result.openingHadFigure) {
    finding(`${topicSlug}: opening TEXT claims a visual ("${short(init.text, 100)}") but the API response carried NO visual/visualSpec/sceneSpec field.`)
  }

  // 1. A learner question, unprompted (tests explanation adapts to a real question).
  let p = await chat(cookie, sessionId, 'wait, can you explain that again in a simpler way?')
  result.turns.push({ n: 1, sent: '(learner question)', received: short(p.text), mastery: p.mastery, figure: carriesFigure(p), claimedVisual: claimsVisual(p.text) })
  log(`  [T1 learner-question] ${short(p.text)}`)
  if (claimsVisual(p.text) && !carriesFigure(p)) finding(`${topicSlug} T1: text claims a visual but none was returned.`)

  const nudgeIdx = { n: 0 }
  let wrongDone = !script.wrongAnswer
  let partialDone = !script.partialAnswer
  let turnCount = 1

  while (turnCount < script.maxTurns) {
    turnCount++
    let msg: string
    if (p.mcq && !wrongDone && script.wrongAnswer) {
      msg = script.wrongAnswer
      wrongDone = true
    } else if (p.mcq && !partialDone && script.partialAnswer) {
      msg = script.partialAnswer
      partialDone = true
    } else {
      msg = pickReply(p, nudgeIdx)
    }
    p = await chat(cookie, sessionId, msg)
    const figure = carriesFigure(p)
    const claimed = claimsVisual(p.text)
    result.turns.push({ n: turnCount, sent: msg, received: short(p.text), mastery: p.mastery, figure, claimedVisual: claimed })
    log(`  [T${turnCount}] learner: "${short(msg, 90)}"`)
    log(`  [T${turnCount}] tutor: ${short(p.text)}`)
    log(`  [T${turnCount}] mastery: phase=${p.mastery?.phase} verified=${p.mastery?.verified} check=${p.mastery?.checkCorrect} practice=${p.mastery?.practiceCorrect}`)
    if (claimed && !figure) finding(`${topicSlug} T${turnCount}: text claims a visual but none was returned.`)
    if (p.mastery?.verified === true || p.lessonComplete?.complete === true) break
  }
  result.finalMastery = p.mastery

  // Transfer/application question after mastery (or after the drive loop ends).
  const transferReply = await chat(cookie, sessionId, script.transferQuestion)
  log(`  [transfer] learner: "${script.transferQuestion}"`)
  log(`  [transfer] tutor: ${short(transferReply.text, 400)}`)
  result.turns.push({ n: turnCount + 1, sent: script.transferQuestion, received: short(transferReply.text, 400), mastery: transferReply.mastery, figure: carriesFigure(transferReply), claimedVisual: claimsVisual(transferReply.text) })

  // Repeated attempt: a fresh chat turn well after mastery, to check the
  // mastery signal doesn't regress or vanish on renewed interaction.
  const repeat = await chat(cookie, sessionId, 'can you remind me what we just covered?')
  result.repeatAttemptMastery = repeat.mastery
  log(`  [repeat] mastery: phase=${repeat.mastery?.phase} verified=${repeat.mastery?.verified} check=${repeat.mastery?.checkCorrect} practice=${repeat.mastery?.practiceCorrect}`)
  if (result.finalMastery?.verified === true && repeat.mastery?.verified !== true) {
    finding(`${topicSlug}: mastery was verified=true, but a later turn in the SAME session reports verified=${repeat.mastery?.verified} — mastery signal regressed.`)
  }

  return result
}

async function dbVerify(userEmail: string, topicSlugs: string[]): Promise<void> {
  log(`\n=== DB VERIFICATION (informational — run the paired Supabase query manually if this section is empty) ===`)
  log(`  user email: ${userEmail}`)
  log(`  topics: ${topicSlugs.join(', ')}`)
  log(`  (This script does not hold a DB credential itself; the calling session cross-checks`)
  log(`   topic_progress / evidence_events / lesson_attempts via the Supabase MCP tool`)
  log(`   immediately after this script exits, using this account's email to resolve userId.)`)
}

async function main() {
  log('Biology Phase-2 production runtime QA — disposable account, real API, real grading.')
  const acct = await createQaAccount('bio-runtime')
  log(`BASE=${BASE} account=${acct.email}`)
  const credsPath = '/tmp/claude-0/-home-user-My-tutor/83c1cdd9-48c9-5ef4-9f01-7d5ec45d053a/scratchpad/bio-qa-account.json'
  writeFileSync(credsPath, JSON.stringify({ email: acct.email, password: acct.password }, null, 2))
  log(`account credentials saved to ${credsPath} for post-verification cleanup`)

  const results: ConceptResult[] = []
  try {
    const lessons = await fetchCurriculum(acct.cookie, 'biology')
    log(`curriculum: ${lessons.length} biology lessons available`)

    results.push(await driveConcept(acct.cookie, lessons, 'bio.physio.homeostasis-thermoregulation', {
      wrongAnswer: HOMEO_MCQ1_WRONG_MISCONCEPTION,
      partialAnswer: HOMEO_SHORT_ANSWER_PARTIAL,
      transferQuestion: "A lizard is cold-blooded and can't generate heat internally the way we do. If negative feedback thermoregulation like ours needs internal heat-generating responses, what does that predict about what happens to a lizard's body temperature in a cold environment?",
      maxTurns: 18,
    }))

    results.push(await driveConcept(acct.cookie, lessons, 'bio.physio.lymphatic-system-detail', {
      wrongAnswer: undefined,
      partialAnswer: undefined,
      transferQuestion: 'If someone has their spleen removed entirely, would you expect the same kind of localised swelling as lymph node removal causes, or something different?',
      maxTurns: 14,
    }))

    // Visual grounding: photosynthesis has a genuine ACTIVE visual asset.
    const photo = lessons.find((l) => l.topicSlug === 'bio.plant.photosynthesis')
    if (!photo) {
      finding('bio.plant.photosynthesis: no curriculum lesson entry found at all — cannot run the visual-grounding check.')
    } else {
      log(`\n=== bio.plant.photosynthesis — visual grounding check ===`)
      const sessionId = await startSession(acct.cookie, 'biology')
      const init = await initLesson(acct.cookie, sessionId, photo, lessons.length)
      const figure = carriesFigure(init)
      const claimed = claimsVisual(init.text)
      log(`  [open] figure=${figure} claimsVisualInText=${claimed}`)
      log(`  [open] visualSpec=${JSON.stringify(init.visualSpec).slice(0, 200)}`)
      log(`  [open] ${short(init.text, 400)}`)
      if (!figure) {
        finding('bio.plant.photosynthesis: concept has an ACTIVE visual asset in production, but the opening lesson turn returned NO visual/visualSpec/sceneSpec field.')
      } else {
        const vsText = JSON.stringify(init.visualSpec ?? init.visual ?? init.sceneSpec).toLowerCase()
        if (!/photosynth/.test(vsText) && !/chloroplast|thylakoid|light.?dependent|calvin/.test(vsText)) {
          finding(`bio.plant.photosynthesis: a visual was returned but nothing in it (title/type/conceptId) identifies it as photosynthesis-specific: ${vsText.slice(0, 200)}`)
        }
      }
      if (claimed && !figure) finding('bio.plant.photosynthesis: opening text claims a visual but none was returned.')
    }

    log(`\n${'='.repeat(70)}\nSUMMARY\n${'='.repeat(70)}`)
    for (const r of results) {
      log(`${r.topicSlug}: finalMastery=${JSON.stringify(r.finalMastery)} repeatMastery=${JSON.stringify(r.repeatAttemptMastery)} sessionId=${r.sessionId}`)
    }
    log(`\nFindings: ${findings.length === 0 ? 'NONE' : ''}`)
    findings.forEach((f, i) => log(`  ${i + 1}. ${f}`))

    await dbVerify(acct.email, ['bio.physio.homeostasis-thermoregulation', 'bio.physio.lymphatic-system-detail', 'bio.plant.photosynthesis'])
    log(`\nACCOUNT EMAIL FOR DB CROSS-CHECK: ${acct.email}`)
    log(`ACCOUNT NOT YET DELETED — delete only after the DB cross-check, using the saved credentials at ${credsPath}.`)
  } catch (e) {
    log(`\nACCOUNT EMAIL (run failed, account still exists for inspection): ${acct.email}`)
    throw e
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
