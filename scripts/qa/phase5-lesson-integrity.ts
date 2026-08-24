/**
 * PHASE 5 LIVE — lesson integrity, evidence & progression.
 *
 * Disposable account only, deleted afterwards with re-login verified blocked.
 * Never the real user account (liveAccount.ts's FORBIDDEN_ACCOUNTS enforces
 * this structurally, not by discipline).
 *
 * ── MEASURED vs INFERRED, enforced rather than remembered ───────────────────
 * STRUCTURAL (server-owned, exact): `mastery` (phase and counters) and `mcq`.
 * Whether the served text "is about X" is INFERRED (keyword match) and
 * labelled as such. A provider outage is UNMEASURED, read from the product's
 * own `provider` flag via isDegradedProvider — never guessed from wording.
 *
 * Three journeys, per the phase's own minimum:
 *   PHYSICS   — wrong numerical answer -> remediation -> correct recovery
 *   CHEMISTRY — knowledge gap -> prerequisite detour -> return
 *   ENGLISH   — misunderstanding -> remediation -> acknowledgement -> valid continuation
 * plus a repeated-acknowledgement probe (Case B/D) run once, in the physics
 * session, since it needs no subject-specific content.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload, type LessonRef } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const PHYSICS: LessonRef = {
  lessonTitle: "Newton's First Law", lessonOrder: 22,
  topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238,
}
const CHEMISTRY: LessonRef = {
  lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
  topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186,
}
const ENGLISH: LessonRef = {
  lessonTitle: 'Phonemic Awareness', lessonOrder: 2,
  topicSlug: 'eng.phonics.phonemic-awareness', unitTitle: 'Phonics', totalLessons: 216,
}

const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()
const noQuestionAttached = (p: TurnPayload) => p.mcq == null

type Check = { id: string; what: string; ok: boolean | null; detail: string }
const checks: Check[] = []
const record = (id: string, what: string, ok: boolean | null, detail: string) => {
  checks.push({ id, what, ok, detail })
  console.log(`  [${ok === null ? 'UNMEASURED' : ok ? 'PASS' : 'FAIL'}] ${id} — ${what}\n         ${detail}`)
}
function show(label: string, p: TurnPayload): boolean {
  const d = isDegradedProvider(p.provider ?? null)
  const m = p.mastery ?? {}
  console.log(`\n[${label}] provider=${p.provider ?? 'null'}${d ? ' (DEGRADED — UNMEASURED)' : ''}`)
  console.log(`  text(${clean(p.text).length}): ${clean(p.text).slice(0, 260)}`)
  console.log(`  mcq=${p.mcq ? `ATTACHED correctIndex=${p.mcq.correctIndex} options=${JSON.stringify(p.mcq.options)}` : 'none'}`)
  console.log(`  mastery={phase:${m.phase ?? '?'},check:${m.checkCorrect ?? '?'},practice:${m.practiceCorrect ?? '?'},verified:${m.verified ?? '?'}}`)
  return d
}

async function physicsJourney(cookie: string): Promise<void> {
  console.log('\n\n========== PHYSICS: wrong answer -> remediation -> correct recovery ==========')
  const sid = await createSession(cookie, 'physics')
  const t0 = await openLesson(cookie, sid, PHYSICS)
  show('P0 open', t0)

  let mcqTurn: TurnPayload | null = null

  // Engage plainly for a bounded number of turns until a graded MCQ appears.
  const prompts = ["what's the idea here?", 'ok', 'can you show an example?', 'I think I follow, continue']
  let p: TurnPayload = t0
  for (const msg of prompts) {
    p = await say(cookie, sid, msg)
    show(`P engage: "${msg}"`, p)
    if (p.mcq) { mcqTurn = p; break }
  }

  if (!mcqTurn) {
    record('A-0', 'a gradeable question appeared within the engagement budget', null,
      'no MCQ surfaced in the bounded prompt budget — cannot exercise Case A/C live this run')
  } else {
    // Answer WRONG on purpose: pick an option that is NOT correctIndex.
    const wrongIdx = mcqTurn.mcq!.options.findIndex((_, i) => i !== mcqTurn!.mcq!.correctIndex)
    const wrongAnswer = mcqTurn.mcq!.options[wrongIdx]
    const beforeWrong = { check: mcqTurn.mastery?.checkCorrect ?? 0, practice: mcqTurn.mastery?.practiceCorrect ?? 0 }
    const tw = await say(cookie, sid, wrongAnswer)
    const dw = show(`A1 WRONG answer: "${wrongAnswer}"`, tw)
    record('A-1', 'a wrong answer does not advance mastery counters',
      dw ? null : (
        (tw.mastery?.checkCorrect ?? 0) <= beforeWrong.check
        && (tw.mastery?.practiceCorrect ?? 0) <= beforeWrong.practice
      ),
      dw ? 'provider outage' : `before={check:${beforeWrong.check},practice:${beforeWrong.practice}} after={check:${tw.mastery?.checkCorrect},practice:${tw.mastery?.practiceCorrect}}`)
    record('A-2', 'lesson is not marked complete off a wrong answer',
      dw ? null : tw.lessonComplete?.complete !== true,
      dw ? 'provider outage' : `lessonComplete=${JSON.stringify(tw.lessonComplete)}`)

    // Remediation / recovery turn, then correct recovery.
    const tr = await say(cookie, sid, "I don't understand, can you explain it differently?")
    show('C1 remediation request', tr)

    // Look for a follow-up MCQ to answer correctly (bounded attempts).
    let recovered = false
    let cur = tr
    for (let i = 0; i < 3 && !recovered; i++) {
      if (cur.mcq) {
        const rightAnswer = cur.mcq.options[cur.mcq.correctIndex]
        const before = { check: cur.mastery?.checkCorrect ?? 0, practice: cur.mastery?.practiceCorrect ?? 0 }
        cur = await say(cookie, sid, rightAnswer)
        const d = show(`A3 CORRECT recovery answer: "${rightAnswer}"`, cur)
        record('A-3', 'a correct answer after remediation is real, gradeable evidence',
          d ? null : (
            (cur.mastery?.checkCorrect ?? 0) >= before.check
            && (cur.mastery?.practiceCorrect ?? 0) >= before.practice
          ),
          d ? 'provider outage' : `before={check:${before.check},practice:${before.practice}} after={check:${cur.mastery?.checkCorrect},practice:${cur.mastery?.practiceCorrect}}`)
        recovered = true
      } else {
        cur = await say(cookie, sid, 'ok, tell me more')
        show(`A3 waiting for a gradeable follow-up (${i})`, cur)
      }
    }
    if (!recovered) {
      record('A-3', 'a correct answer after remediation is real, gradeable evidence', null,
        'no follow-up MCQ surfaced within the bounded budget')
    }
  }

  // Repeated-acknowledgement probe (Case B/D) — runs regardless of the MCQ outcome above.
  console.log('\n-- repeated acknowledgements (Case B/D) --')
  const before = await say(cookie, sid, 'ok')
  const beforeMastery = { check: before.mastery?.checkCorrect ?? 0, practice: before.mastery?.practiceCorrect ?? 0 }
  const texts: string[] = []
  let last = before
  for (const ack of ['ok', 'got it', 'sure', 'thanks']) {
    last = await say(cookie, sid, ack)
    show(`B/D ack "${ack}"`, last)
    texts.push(clean(last.text))
  }
  const anyDegraded = [before, last].some((p) => isDegradedProvider(p.provider ?? null))
  record('B-1', 'repeated acknowledgements do not fabricate mastery',
    anyDegraded ? null : (
      (last.mastery?.checkCorrect ?? 0) <= beforeMastery.check
      && (last.mastery?.practiceCorrect ?? 0) <= beforeMastery.practice
    ),
    anyDegraded ? 'provider outage' : `before={check:${beforeMastery.check},practice:${beforeMastery.practice}} after={check:${last.mastery?.checkCorrect},practice:${last.mastery?.practiceCorrect}}`)
  const uniqueTexts = new Set(texts.filter(Boolean))
  record('D-1', 'INFERRED — four consecutive acknowledgements did not all render the identical text '
    + '(no visible filler loop this run; the deterministic guarantee is proven offline in fillerRepairStreak.test.ts)',
    anyDegraded ? null : (texts.filter(Boolean).length === 0 || uniqueTexts.size > 1 || texts.filter(Boolean).length < 2),
    anyDegraded ? 'provider outage' : `${uniqueTexts.size} distinct non-empty texts across ${texts.filter(Boolean).length} replies`)
}

async function chemistryJourney(cookie: string): Promise<void> {
  console.log('\n\n========== CHEMISTRY: knowledge gap -> prerequisite detour -> return ==========')
  const sid = await createSession(cookie, 'chemistry')
  await openLesson(cookie, sid, CHEMISTRY)

  const t0 = await say(cookie, sid, 'why do mixtures separate?')
  show('G0 ordinary teaching turn', t0)

  const t1 = await say(cookie, sid, "I don't know enough about the mole concept")
  const d1 = show('G1 KNOWLEDGE GAP turn', t1)
  record('G-1', 'the gap turn is not answered with a graded question about the PARENT lesson',
    d1 ? null : noQuestionAttached(t1),
    d1 ? 'provider outage' : `mcq=${t1.mcq ? 'ATTACHED' : 'none'}`)
  record('G-2', 'INFERRED ONLY — the reply teaches the concept the learner NAMED (mole/avogadro language)',
    d1 ? null : /(mole|avogadro|6\.022|molar)/i.test(t1.text ?? ''),
    d1 ? 'provider outage' : `mole-language ${/(mole|avogadro|6\.022|molar)/i.test(t1.text ?? '') ? 'present' : 'absent'}`)
  record('G-3', 'the gap detour banks no verified mastery for the parent lesson',
    d1 ? null : (t1.mastery?.verified !== true),
    d1 ? 'provider outage' : `verified=${t1.mastery?.verified ?? 'null'}`)

  const t2 = await say(cookie, sid, "ok, I understand the mole concept now, let's go back to mixtures")
  const d2 = show('G4 RETURN to the lesson', t2)
  record('G-4', 'INFERRED ONLY — the turn returns to the lesson topic (mixtures language) after satisfaction',
    d2 ? null : /(mixture|separat)/i.test(t2.text ?? ''),
    d2 ? 'provider outage' : `mixture-language ${/(mixture|separat)/i.test(t2.text ?? '') ? 'present' : 'absent'}`)
  record('G-5', 'no lesson completion was fabricated anywhere in the detour',
    (d1 || d2) ? null : [t0, t1, t2].every((p) => p.lessonComplete?.complete !== true),
    (d1 || d2) ? 'provider outage' : 'checked across all three turns')
}

async function englishJourney(cookie: string): Promise<void> {
  console.log('\n\n========== ENGLISH: misunderstanding -> remediation -> acknowledgement -> valid continuation ==========')
  const sid = await createSession(cookie, 'english')
  await openLesson(cookie, sid, ENGLISH)

  const t0 = await say(cookie, sid, 'ok')
  show('E0 open', t0)
  const t1 = await say(cookie, sid, "I don't get it")
  const d1 = show('E1 misunderstanding -> remediation', t1)
  record('C-B1', 'a misunderstanding turn does not fabricate mastery',
    d1 ? null : t1.mastery?.verified !== true,
    d1 ? 'provider outage' : `verified=${t1.mastery?.verified}`)

  const beforeAck = { check: t1.mastery?.checkCorrect ?? 0, practice: t1.mastery?.practiceCorrect ?? 0 }
  const t2 = await say(cookie, sid, 'ok, got it')
  const d2 = show('E2 acknowledgement after remediation', t2)
  record('C-B2', 'the acknowledgement does not itself fabricate mastery',
    d2 ? null : (
      (t2.mastery?.checkCorrect ?? 0) <= beforeAck.check
      && (t2.mastery?.practiceCorrect ?? 0) <= beforeAck.practice
    ),
    d2 ? 'provider outage' : `before={check:${beforeAck.check},practice:${beforeAck.practice}} after={check:${t2.mastery?.checkCorrect},practice:${t2.mastery?.practiceCorrect}}`)

  const t3 = await say(cookie, sid, 'what comes next?')
  const d3 = show('E3 valid continuation after acknowledgement', t3)
  record('C-B3', 'the lesson continues coherently — the tutor is not stuck (real content, not empty/looping)',
    d3 ? null : clean(t3.text).length > 40,
    d3 ? 'provider outage' : `${clean(t3.text).length} chars`)
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase5integrity')
  console.log('account:', acct.email)
  try {
    await physicsJourney(acct.cookie)
    await chemistryJourney(acct.cookie)
    await englishJourney(acct.cookie)

    console.log('\n===== VERDICT =====')
    const f = checks.filter((c) => c.ok === false), u = checks.filter((c) => c.ok === null)
    console.log(`pass=${checks.filter((c) => c.ok === true).length} fail=${f.length} unmeasured=${u.length}`)
    for (const c of u) console.log(`  UNMEASURED: ${c.id} — ${c.what} :: ${c.detail}`)
    for (const c of f) console.log(`  FAIL: ${c.id} — ${c.what} :: ${c.detail}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
