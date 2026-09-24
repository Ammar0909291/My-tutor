/**
 * PHYSICS — real production runtime QA, driven as an actual learner against
 * the deployed app (not a unit test, not a dry-run).
 *
 * Mirrors biologyProductionRuntimeQa.ts, with two differences that matter for
 * physics:
 *
 * 1. THE ANSWER KEY COMES FROM THE CANONICAL SEED CORPUS, not from the
 *    response. The route strips `correctIndex` from the learner-facing mcq
 *    (see route.ts's `mcqForClient`), so this harness looks each served stem
 *    up in SEED_PROBES/AUTHORED_PROBES/PHYSICS_BAND_GAP_PROBES/
 *    PHYSICS_DEPTH_PROBES — the same modules the cold-start bootstrap writes
 *    to production — and answers from the choice text it knows independently.
 *    A stem that is found under a DIFFERENT concept is a cross-concept leak;
 *    a stem found under a non-physics concept is subject contamination.
 *
 * 2. EVERY ANSWER IS SCORED AGAINST THE MASTERY COUNTERS. A wrong or
 *    misconception answer that moves checkCorrect/practiceCorrect is a
 *    false-accept (hard finding). A correct answer that moves nothing is
 *    recorded for inspection (it can be legitimate — e.g. a phase that does
 *    not count — so it is reported, not asserted).
 *
 * The learner writes lower-than-intermediate English with imperfect grammar,
 * gives wrong, partial, ambiguous and free-typed numeric answers, asks
 * follow-ups, requests a picture on visual concepts, and asks a transfer
 * question at the end.
 *
 * Disposable account only (register -> drive -> delete via liveAccount.ts).
 * The account is NOT deleted by default so the DB cross-check can read its
 * evidence first; pass --delete to remove it at the end of the run.
 *
 * Run: npx tsx scripts/qa/physicsProductionRuntimeQa.ts [--only=<conceptId>] [--delete]
 */
import { writeFileSync } from 'node:fs'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import type { SeedProbe } from '../../src/lib/teaching/assets/brainSeedAssets'
import { SEED_PROBES } from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { PHYSICS_BAND_GAP_PROBES } from '../../src/lib/teaching/assets/physicsBandGapAssets'
import { PHYSICS_DEPTH_PROBES } from '../../src/lib/teaching/assets/physicsDepthSeedAssets'

interface CurriculumLesson { topicSlug: string; lessonTitle: string; order: number; unitTitle: string }
interface Mastery {
  phase?: string; verified?: boolean; checkCorrect?: number; practiceCorrect?: number
  verifiedCheckCorrect?: number; verifiedPracticeCorrect?: number; unverifiedReason?: string | null
}
interface ChatTurn {
  success?: boolean; text?: string; provider?: string | null
  mcq?: { question: string; options: string[] } | null
  visual?: unknown; visualSpec?: unknown; sceneSpec?: unknown
  mastery?: Mastery | null
  lessonComplete?: { complete?: boolean } | null
  [k: string]: unknown
}

// ─── answer key ────────────────────────────────────────────────────────────
const CORPUS: SeedProbe[] = [...SEED_PROBES, ...AUTHORED_PROBES, ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES]
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
function lookup(question: string): SeedProbe[] {
  const q = norm(question)
  if (!q) return []
  const exact = CORPUS.filter((p) => norm(p.stem) === q)
  if (exact.length) return exact
  // the served question may carry a short lead-in; accept containment of a long stem
  return CORPUS.filter((p) => { const s = norm(p.stem); return s.length > 30 && (q.includes(s) || s.includes(q)) })
}

type AnswerIntent = 'correct' | 'misconception' | 'wrong' | 'ambiguous' | 'partial' | 'numeric-typed' | 'numeric-bare' | 'lead-wrong'

function correctChoice(p: SeedProbe) { return p.choices?.find((c) => c.isCorrect)?.text }
function wrongChoice(p: SeedProbe, preferMisconception: boolean) {
  const wrong = (p.choices ?? []).filter((c) => !c.isCorrect)
  return (preferMisconception ? wrong.find((c) => c.misconceptionId) : undefined) ?? wrong[0]
}
/** Leading numeric answer of a choice like "24 Ω" or "1.2 m/s² — ...". */
function leadingQuantity(text: string | undefined): string | null {
  if (!text) return null
  const m = text.match(/^(?:about\s+)?(-?\d[\d.,\s]*(?:×\s*10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹-]*)?\s*[A-Za-zΩ°µ/²³⁻¹\s]{0,14}?)(?:\s+—|$)/)
  return m ? m[1].trim() : null
}

// ─── api ─────────────────────────────────────────────────────────────────
async function api(cookie: string, path: string, body?: unknown): Promise<any> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`${BASE}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (r.status === 429 || r.status >= 500) {
      await new Promise((res) => setTimeout(res, 15_000 * (attempt + 1)))
      continue
    }
    if (!r.ok) throw new Error(`${path} failed ${r.status}: ${(await r.text()).slice(0, 300)}`)
    return r.json()
  }
  throw new Error(`${path} failed after retries`)
}

// ─── reporting ────────────────────────────────────────────────────────────
const findings: string[] = []
const notes: string[] = []
function finding(f: string) { findings.push(f); console.log(`  !! FINDING: ${f}`) }
function note(f: string) { notes.push(f); console.log(`  .. note: ${f}`) }
const short = (s: unknown, n = 260) => String(s ?? '').replace(/\s+/g, ' ').slice(0, n)
const carriesFigure = (p: ChatTurn) => Boolean(p.visualSpec) || Boolean(p.visual) || Boolean(p.sceneSpec)
function claimsVisual(text?: string): boolean {
  if (!text) return false
  return /\b(here'?s|see|look at|shown|showing|below is|in the (?:diagram|figure|picture))\b.{0,40}\b(diagram|figure|animation|visual|illustration|graph|picture|sketch)\b/i.test(text)
    || /\b(diagram|figure|visual|illustration|sketch|picture)\s+(above|below|shows|shown|on (?:your|the) screen)\b/i.test(text)
}
const FOREIGN_SUBJECT = /\b(photosynthesis|mitochondri|chlorophyll|DNA replication|noun|adjective|past tense|covalent bond|stoichiometr|mole ratio|titration)\b/i
const counters = (m?: Mastery | null) => (m?.checkCorrect ?? 0) + (m?.practiceCorrect ?? 0)

interface Plan {
  conceptId: string
  question: string          // low-English learner question after the opening
  answers: AnswerIntent[]   // intent for successive MCQs; 'correct' after the list runs out
  visualRequest?: string
  transfer: string
  maxTurns: number
}

const PLANS: Plan[] = [
  { conceptId: 'phys.mech.newtons-second-law',
    question: 'sorry my english not so good. force and mass, which one make it go more fast? i confuse',
    answers: ['misconception', 'numeric-typed', 'ambiguous', 'partial'],
    transfer: 'if i push car of 1000 kg with 500 N and friction is 100 N, what acceleration? i try: 0.5 m/s2 ?',
    maxTurns: 16 },
  { conceptId: 'phys.mech.projectile-motion',
    question: 'why the ball go curve? i think gravity pull it also sideway no?',
    answers: ['misconception', 'correct', 'numeric-typed'],
    visualRequest: 'can you show me picture of the ball path please',
    transfer: 'if i throw ball same speed but on the moon, it go more far or less far? why',
    maxTurns: 16 },
  { conceptId: 'phys.em.ohms-law',
    question: 'what is difference current and voltage? teacher say both but i dont get it',
    answers: ['misconception', 'numeric-typed', 'partial'],
    transfer: 'phone charger is 5 V and give 2 A. what is resistance? and is it ohmic?',
    maxTurns: 16 },
  { conceptId: 'phys.therm.specific-heat',
    question: 'hot thing have more heat inside yes? like fire spark very hot so have many heat',
    answers: ['misconception', 'numeric-typed', 'correct'],
    transfer: 'why sea near my city stay warm in night but sand is cold?',
    maxTurns: 16 },
  { conceptId: 'phys.opt.refraction',
    question: 'why pencil look broken in the water glass? is the pencil bend?',
    answers: ['misconception', 'wrong', 'numeric-typed'],
    visualRequest: 'please draw diagram of light going in water, i understand better with picture',
    transfer: 'light go from glass to air, it bend to normal or away? and what about the frequency',
    maxTurns: 16 },
  { conceptId: 'phys.em.faradays-law',
    question: 'magnet inside coil make electricity? even if magnet not move?',
    answers: ['misconception', 'numeric-typed', 'correct'],
    transfer: 'bicycle dynamo spin more fast, the light is more bright? why?',
    maxTurns: 16 },
  { conceptId: 'phys.wave.doppler-effect',
    question: 'ambulance sound change when it pass me. the ambulance change its sound?',
    answers: ['misconception', 'lead-wrong', 'correct'],
    visualRequest: 'can you show me picture of the waves from the ambulance please',
    transfer: 'if i run to the ambulance, i hear higher or lower sound? why',
    maxTurns: 16 },
  { conceptId: 'phys.mod.photoelectric-effect',
    question: 'if light is more bright the electron come out more fast right?',
    answers: ['misconception', 'correct', 'wrong'],
    transfer: 'red light very very strong on zinc, electron come out? zinc work function is 4.3 eV',
    maxTurns: 16 },
]

// SECOND PASS (--pass2): aimed at the three defects fixed on 2026-09-24.
const PASS2_PLANS: Plan[] = [
  { conceptId: 'phys.mech.newtons-second-law',
    question: 'i not good in physics. what is F in F = ma, only my push?',
    answers: ['numeric-bare', 'lead-wrong', 'numeric-bare', 'numeric-bare', 'correct'],
    transfer: 'box 10 kg, push 30 N, friction 10 N. acceleration is 2 m/s2 right?',
    maxTurns: 16 },
  { conceptId: 'phys.mech.projectile-motion',
    question: 'why the ball go curve? i think gravity pull it also sideway no?',
    answers: ['misconception', 'lead-wrong', 'numeric-bare'],
    transfer: 'if i throw ball same speed but on the moon, it go more far or less far? why',
    maxTurns: 16 },
  { conceptId: 'phys.mod.photoelectric-effect',
    question: 'if light is more bright the electron come out more fast right?',
    answers: ['misconception', 'wrong', 'lead-wrong', 'wrong', 'correct'],
    transfer: 'red light very very strong on zinc, electron come out? zinc work function is 4.3 eV',
    maxTurns: 18 },
]

// NUMERIC PASS (--numeric): every answer typed as a weak-English learner types a
// value — bare number or "i think <number> <unit without superscripts>".
const NUMERIC_PLANS: Plan[] = [
  { conceptId: 'phys.therm.specific-heat', question: 'how i calculate the heat? which formula?',
    answers: ['numeric-bare', 'numeric-bare', 'numeric-bare', 'numeric-bare', 'numeric-bare'],
    transfer: '2 kg water, heat it 10 C more, how much joule? i think 83720 J', maxTurns: 14 },
  { conceptId: 'phys.em.ohms-law', question: 'how i find resistance if i know volt and amp?',
    answers: ['numeric-bare', 'numeric-bare', 'numeric-bare', 'numeric-bare', 'numeric-bare'],
    transfer: 'lamp 230 V and 0.5 A, resistance is 460 ohm right?', maxTurns: 14 },
]

const NUDGES = [
  'ok i think i understand little bit. can you ask me question?',
  'ok. give me one question to check please',
  'yes i follow. next?',
]

interface AnswerRecord {
  conceptId: string; turn: number; stem: string; matchedConcept: string | null
  intent: AnswerIntent; sent: string; before: number; after: number
  phaseBefore?: string; phaseAfter?: string; replyHead: string
}
const answerLog: AnswerRecord[] = []

async function drive(cookie: string, lessons: CurriculumLesson[], plan: Plan) {
  const lesson = lessons.find((l) => l.topicSlug === plan.conceptId)
  if (!lesson) { finding(`${plan.conceptId}: no curriculum lesson with this topicSlug — concept unreachable from the curriculum`); return null }
  console.log(`\n=== ${plan.conceptId} — "${lesson.lessonTitle}" (unit "${lesson.unitTitle}", order ${lesson.order}) ===`)
  const s = await api(cookie, '/api/sessions', { subjectSlug: 'physics' })
  const sessionId: string = s.data?.id ?? s.id
  if (!sessionId) { finding(`${plan.conceptId}: session create failed ${short(JSON.stringify(s))}`); return null }

  let p: ChatTurn = await api(cookie, '/api/learn/lesson-init', {
    sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
    topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: lessons.length,
    completedLessons: [], teachingLanguage: 'en',
  })
  const transcript: Array<{ who: string; text: string; mcq?: ChatTurn['mcq']; mastery?: Mastery | null; figure?: boolean; visual?: string }> = []
  const record = (who: string, t: ChatTurn | string) => {
    if (typeof t === 'string') { transcript.push({ who, text: t }); return }
    transcript.push({ who, text: t.text ?? '', mcq: t.mcq, mastery: t.mastery, figure: carriesFigure(t),
      visual: carriesFigure(t) ? JSON.stringify({ visual: t.visual, visualSpec: t.visualSpec, sceneSpec: t.sceneSpec }).slice(0, 4000) : undefined })
  }
  record('tutor', p)
  console.log(`  [open] provider=${p.provider} figure=${carriesFigure(p)} mcq=${Boolean(p.mcq)} :: ${short(p.text)}`)

  // A figure stays in the scroll history once served, so a later reference to
  // it is legitimate. Only a claim made before ANY figure reached this lesson
  // is phantom; later references are listed as notes for a human to compare
  // against the served payload (recorded in the transcript's `visual`).
  let figureServed = false
  const check = (t: ChatTurn, label: string) => {
    if (carriesFigure(t)) figureServed = true
    if (claimsVisual(t.text) && !carriesFigure(t) && figureServed) note(`${plan.conceptId} ${label}: refers to an earlier figure — verify against its payload: "${short(t.text, 140)}"`)
    if (claimsVisual(t.text) && !carriesFigure(t) && !figureServed) finding(`${plan.conceptId} ${label}: text claims a figure but the response carried none — "${short(t.text, 140)}"`)
    if (FOREIGN_SUBJECT.test(t.text ?? '')) finding(`${plan.conceptId} ${label}: foreign-subject vocabulary in a physics turn — "${short((t.text ?? '').match(FOREIGN_SUBJECT)?.[0])}"`)
    if (t.mcq) {
      const hits = lookup(t.mcq.question)
      const foreign = hits.find((h) => !h.conceptId.startsWith('phys.'))
      if (foreign) finding(`${plan.conceptId} ${label}: served a NON-physics probe (${foreign.conceptId}): "${short(t.mcq.question, 120)}"`)
      else if (hits.length && !hits.some((h) => h.conceptId === plan.conceptId)) {
        note(`${plan.conceptId} ${label}: served probe belongs to ${hits.map((h) => h.conceptId).join(',')} (prerequisite/related?) — "${short(t.mcq.question, 100)}"`)
      }
    }
  }
  check(p, 'open')

  const say = async (msg: string, label: string) => {
    record('learner', msg)
    const before = p
    p = await api(cookie, '/api/learn/chat', { sessionId, message: msg })
    record('tutor', p)
    console.log(`  [${label}] learner: "${short(msg, 100)}"`)
    console.log(`  [${label}] tutor(${p.provider}) fig=${carriesFigure(p)} mcq=${p.mcq ? 'Y' : 'n'} phase=${p.mastery?.phase} c=${p.mastery?.checkCorrect}/${p.mastery?.practiceCorrect} v=${p.mastery?.verified} :: ${short(p.text)}`)
    check(p, label)
    return before
  }

  await say(plan.question, 'Q1')

  let answerIdx = 0
  let nudge = 0
  let visualAsked = false
  for (let turn = 2; turn <= plan.maxTurns; turn++) {
    if (p.mastery?.verified || p.lessonComplete?.complete) break
    if (plan.visualRequest && !visualAsked && turn === 4) {
      visualAsked = true
      const hadMcq = Boolean(p.mcq)
      await say(plan.visualRequest, `T${turn}-visual`)
      if (!carriesFigure(p)) note(`${plan.conceptId}: visual requested, none served (text: "${short(p.text, 160)}")`)
      else console.log(`  [visual] payload: ${short(JSON.stringify(p.visualSpec ?? p.sceneSpec ?? p.visual), 300)}`)
      if (hadMcq && !p.mcq) note(`${plan.conceptId}: pending MCQ disappeared from payload after a visual request`)
      continue
    }
    if (!p.mcq) { await say(NUDGES[nudge++ % NUDGES.length], `T${turn}`); continue }

    const hits = lookup(p.mcq.question)
    const probe = hits.find((h) => h.conceptId === plan.conceptId) ?? hits[0] ?? null
    const intent: AnswerIntent = answerIdx < plan.answers.length ? plan.answers[answerIdx] : 'correct'
    answerIdx++
    let msg: string
    let effective: AnswerIntent = intent
    const opts = p.mcq.options
    if (!probe) {
      // model-authored or unmatched stem: we have no independent key, so pick
      // the option text and record it as unscored
      msg = `i think ${opts[0]}`
      effective = 'ambiguous'
      note(`${plan.conceptId}: stem not in seed corpus (model-authored?) — "${short(p.mcq.question, 120)}" options=${JSON.stringify(opts).slice(0, 200)}`)
    } else if (intent === 'misconception' || intent === 'wrong') {
      const w = wrongChoice(probe, intent === 'misconception')
      msg = w ? w.text.split(' — ')[0] : 'i dont know'
      if (!w?.misconceptionId && intent === 'misconception') effective = 'wrong'
    } else if (intent === 'ambiguous') {
      msg = 'hmm maybe the first or the second one? not sure'
    } else if (intent === 'partial') {
      const c = correctChoice(probe) ?? ''
      msg = `because of the ${c.split(/[—,;(]/)[0].split(' ').slice(0, 3).join(' ')} ... i not know how to say rest`
    } else if (intent === 'numeric-bare') {
      // the value as a weak-English learner types it: no superscripts, no unit symbols
      const q = leadingQuantity(correctChoice(probe))?.match(/^-?[\d.]+/)?.[0]
      if (q) msg = Math.random() < 0.5 ? q : `i think ${q} ${(leadingQuantity(correctChoice(probe)) ?? '').replace(/^-?[\d.]+\s*/, '').replace(/²/g, '2').replace(/³/g, '3')}`.trim()
      else { msg = correctChoice(probe) ?? opts[0]; effective = 'correct' }
      if (q) effective = 'numeric-typed'
    } else if (intent === 'lead-wrong') {
      // only the answer half of a wrong option ("Toward the normal")
      const w = (probe.choices ?? []).find((c) => !c.isCorrect && c.text.includes(' — '))
      msg = w ? w.text.split(' — ')[0] : (wrongChoice(probe, false)?.text ?? 'i dont know')
      effective = 'wrong'
    } else if (intent === 'numeric-typed') {
      const q = leadingQuantity(correctChoice(probe))
      if (q) msg = `answer is ${q} i think`
      else { msg = correctChoice(probe) ?? opts[0]; effective = 'correct' }
    } else {
      msg = correctChoice(probe) ?? opts[0]
    }
    const b = await say(msg, `T${turn}-${effective}`)
    const rec: AnswerRecord = {
      conceptId: plan.conceptId, turn, stem: short(b.mcq?.question, 160),
      matchedConcept: probe?.conceptId ?? null, intent: effective, sent: msg,
      before: counters(b.mastery), after: counters(p.mastery),
      phaseBefore: b.mastery?.phase, phaseAfter: p.mastery?.phase, replyHead: short(p.text, 200),
    }
    answerLog.push(rec)
    if ((effective === 'wrong' || effective === 'misconception' || effective === 'ambiguous') && rec.after > rec.before && probe) {
      finding(`${plan.conceptId} T${turn}: FALSE ACCEPT — ${effective} answer "${short(msg, 80)}" moved counters ${rec.before}->${rec.after} on "${rec.stem}"`)
    }
    if ((effective === 'correct' || effective === 'numeric-typed') && probe && rec.after <= rec.before) {
      note(`${plan.conceptId} T${turn}: correct (${effective}) answer did not move counters (${rec.before}->${rec.after}, phase ${rec.phaseBefore}->${rec.phaseAfter}) — "${short(msg, 60)}" — tutor: "${short(p.text, 140)}"`)
    }
    if ((effective === 'wrong' || effective === 'misconception') && probe && rec.phaseBefore && ['GUIDE', 'CHECK', 'PRACTICE'].includes(rec.phaseBefore)
      && !/^not quite/i.test((p.text ?? '').trim()) && !/\b(not quite|not right|incorrect|the answer is)\b/i.test(p.text ?? '')) {
      note(`${plan.conceptId} T${turn}: wrong answer at ${rec.phaseBefore} got no stated verdict — "${short(p.text, 140)}"`)
    }
    if (effective === 'misconception' && probe && /\b(correct|exactly right|well done|that'?s right)\b/i.test((p.text ?? '').slice(0, 80))) {
      finding(`${plan.conceptId} T${turn}: tutor PRAISED a misconception answer — "${short(p.text, 160)}"`)
    }
  }
  const finalMastery = p.mastery
  await say(plan.transfer, 'transfer')
  const afterTransfer = p.mastery
  await say('can you remind me what we learn today? short please', 'recap')
  if (finalMastery?.verified && !p.mastery?.verified) finding(`${plan.conceptId}: verified mastery regressed within the same session`)
  return { conceptId: plan.conceptId, sessionId, finalMastery, afterTransfer, recapMastery: p.mastery, transcript }
}

async function main() {
  const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)
  const doDelete = process.argv.includes('--delete')
  const out = process.env.QA_OUT ?? 'physics-qa-run.json'
  console.log(`Physics production runtime QA — BASE=${BASE}`)
  const acct = await createQaAccount('phys-runtime')
  console.log(`account=${acct.email}`)
  // Disposable QA credentials only, written OUTSIDE the repo so the account can
  // be deleted after the DB cross-check (the evidence cascades on delete).
  if (process.env.QA_CREDS) writeFileSync(process.env.QA_CREDS, JSON.stringify({ email: acct.email, password: acct.password }))
  const results: unknown[] = []
  try {
    const cur = await api(acct.cookie, '/api/curriculum?subject=physics')
    const lessons: CurriculumLesson[] = cur.lessons ?? []
    console.log(`curriculum: ${lessons.length} physics lessons`)
    const foreignLessons = lessons.filter((l) => !l.topicSlug.startsWith('phys.'))
    if (foreignLessons.length) finding(`physics curriculum contains ${foreignLessons.length} non-physics topicSlugs: ${foreignLessons.slice(0, 5).map((l) => l.topicSlug).join(', ')}`)
    const plans = process.argv.includes('--pass2') ? PASS2_PLANS : process.argv.includes('--numeric') ? NUMERIC_PLANS : PLANS
    for (const plan of plans.filter((pl) => !only || pl.conceptId === only)) {
      try { results.push(await drive(acct.cookie, lessons, plan)) }
      catch (e) { finding(`${plan.conceptId}: run aborted — ${(e as Error).message}`) }
    }
    // reload: a fresh GET of progress after all sessions
    try {
      const prog = await api(acct.cookie, '/api/topic-progress?subject=physics')
      const rows: Array<{ topicSlug?: string; status?: string; masteryPct?: number }> = prog.data?.rows ?? prog.rows ?? prog.data ?? []
      console.log(`\n[reload] /api/topic-progress: ${short(JSON.stringify(prog), 1200)}`)
      if (Array.isArray(rows)) {
        const foreign = rows.filter((r) => r.topicSlug && !r.topicSlug.startsWith('phys.'))
        if (foreign.length) finding(`physics topic-progress holds non-physics rows: ${foreign.map((r) => r.topicSlug).join(', ')}`)
      }
    } catch (e) { note(`progress reload endpoint: ${(e as Error).message}`) }
  } finally {
    writeFileSync(out, JSON.stringify({ account: acct.email, base: BASE, findings, notes, answerLog, results }, null, 2))
    console.log(`\n${'='.repeat(70)}\nANSWERS`)
    for (const a of answerLog) console.log(`  ${a.conceptId} T${a.turn} ${a.intent.padEnd(13)} ${a.before}->${a.after} ${a.phaseBefore}->${a.phaseAfter} | ${short(a.sent, 50)}`)
    console.log(`\nFINDINGS (${findings.length})`); findings.forEach((f, i) => console.log(`  ${i + 1}. ${f}`))
    console.log(`\nNOTES (${notes.length})`); notes.forEach((f, i) => console.log(`  ${i + 1}. ${f}`))
    console.log(`\nACCOUNT: ${acct.email}  transcript: ${out}`)
    if (doDelete) console.log(`delete: ${JSON.stringify(await deleteQaAccount(acct))}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
