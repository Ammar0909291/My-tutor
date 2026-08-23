/**
 * BETA STABILITY GATE — the three remaining student-facing imperfections,
 * reproduced live before anything is decided about them.
 *
 * 1. Closing-turn DANGLING LEAD-IN. After the CLOSING guard withholds a
 *    question, does the turn still announce one it never asks?
 * 2. Lesson-opening CONSISTENCY: is the lesson NAME present, and is the lesson
 *    NUMBER correct — in EN, RU and HI.
 * 3. ASCII IMAGERY when a real figure is already attached and the learner
 *    asks to be shown a diagram.
 *
 * Each check reports the offending text, never just a boolean: three wrong QA
 * verdicts in this repo's history were harness bugs, not product bugs.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type LessonRef, type TurnPayload } from './liveSession'

/** Announces a question ("here's a question", "let me ask you...") — used only
 *  together with "and the turn contains no '?' at all". */
const ANNOUNCES_QUESTION = /\b(here'?s|here is|now)\s+(a|one|your|the)\s+(quick\s+)?(check\s+|practice\s+|final\s+)?question\b|\blet me ask you\b|\bi have a question\b|\btry this question\b/i
/** Fenced blocks and box-drawing/arrow art — the ASCII-diagram signature. */
const CODE_FENCE = /```/
const BOX_ART = /[┌┐└┘─│├┤┬┴┼╔╗╚╝═║▲▼◄►↑↓←→]|(?:^|\n)\s*[|/\\_]{2,}/

const LESSONS: Record<string, LessonRef> = {
  newton: { lessonTitle: "Newton's First Law", lessonOrder: 22, topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  angular: { lessonTitle: 'Angular Kinematics', lessonOrder: 39, topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238 },
  integers: { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 },
  critical: { lessonTitle: 'Critical Points', lessonOrder: 408, topicSlug: 'math.calc.critical-points', unitTitle: 'Calculus', totalLessons: 908 },
  phonemic: { lessonTitle: 'Phonemic Awareness', lessonOrder: 2, topicSlug: 'eng.phonics.phonemic-awareness', unitTitle: 'Phonics', totalLessons: 216 },
}
const SUBJECT: Record<string, string> = {
  newton: 'physics', angular: 'physics', integers: 'mathematics', critical: 'mathematics', phonemic: 'english',
}

const one = (t: string) => t.replace(/\s+/g, ' ').trim()

/** Any number written in the opening that is presented as the lesson's own
 *  position. Returns every candidate so a wrong one cannot hide behind a right
 *  one (e.g. "Lesson 78 of 908: Critical Points" — 78 is wrong, 908 is right). */
function lessonNumbersClaimed(text: string): number[] {
  const out: number[] = []
  for (const m of text.matchAll(/\b(?:lesson|урок|अध्याय|paath)\s*[№#]?\s*(\d{1,4})/gi)) out.push(Number(m[1]))
  return out
}

async function main(): Promise<void> {
  const acct = await createQaAccount('beta')
  console.log(`account: ${acct.email}\n`)
  let danglingLeadIn = 0, stopTurns = 0
  let missingName = 0, wrongNumber = 0, noNumber = 0, openings = 0
  let asciiWithFigure = 0, diagramAsks = 0

  try {
    // ── 1. CLOSING-TURN DANGLING LEAD-IN ─────────────────────────────────
    console.log('='.repeat(72))
    console.log('1. CLOSING-TURN DANGLING LEAD-IN')
    console.log('='.repeat(72))
    for (const key of ['newton', 'integers', 'phonemic', 'newton', 'integers', 'phonemic', 'newton', 'integers', 'phonemic', 'critical', 'angular', 'phonemic'] as const) {
      const sid = await createSession(acct.cookie, SUBJECT[key])
      await openLesson(acct.cookie, sid, LESSONS[key])
      let last: TurnPayload | null = null
      // Reach the gate: at OBSERVE no probe is attachable, so a stop there
      // could never have produced a lead-in in the first place.
      for (const t of ['ok', 'I think I follow so far', 'yes that makes sense', 'what next?']) {
        last = await say(acct.cookie, sid, t)
      }
      const p = await say(acct.cookie, sid, "i'm done for today, thanks")
      const text = one(p.text ?? '')
      stopTurns++
      const dangling = ANNOUNCES_QUESTION.test(text) && !text.includes('?') && !p.mcq
      if (dangling) danglingLeadIn++
      console.log(`${dangling ? 'DANGLING' : 'ok      '} ${SUBJECT[key].padEnd(12)} phase=${String(last?.mastery?.phase ?? '?').padEnd(9)} mcq=${p.mcq ? 'YES' : 'no'}`)
      console.log(`         "${text.slice(0, 220)}"`)
    }

    // ── 2. LESSON-OPENING CONSISTENCY, EN + RU + HI ──────────────────────
    console.log(`\n${'='.repeat(72)}`)
    console.log('2. LESSON-OPENING CONSISTENCY (name present, number correct)')
    console.log('='.repeat(72))
    for (const lang of ['en', 'ru', 'hi'] as const) {
      for (const key of ['critical', 'integers', 'angular', 'phonemic', 'critical', 'integers', 'angular', 'phonemic'] as const) {
        const lesson = LESSONS[key]
        const sid = await createSession(acct.cookie, SUBJECT[key])
        const p = await openLesson(acct.cookie, sid, lesson, lang)
        const text = one(p.text ?? '')
        openings++
        // NAME: the lesson title, or (ru/hi) a translation — so the check is
        // "does the opening identify the lesson", judged from the title's own
        // distinctive words where the exact string cannot survive translation.
        const key1 = lesson.lessonTitle.split(/[\s'’]+/).filter((w) => w.length > 4)
        const named = text.toLowerCase().includes(lesson.lessonTitle.toLowerCase())
          || key1.some((w) => text.toLowerCase().includes(w.toLowerCase()))
        const nums = lessonNumbersClaimed(text)
        const bad = nums.filter((n) => n !== lesson.lessonOrder && n !== lesson.totalLessons)
        // ABSENT is not the same as CORRECT. The first version of this check
        // counted an opening with no number at all as "num-ok", which would
        // have reported a false PASS for the hi Integers opening
        // ("**Lesson: Integers**", no number anywhere).
        const absent = nums.length === 0
        if (!named) missingName++
        if (bad.length) wrongNumber++
        if (absent) noNumber++
        // Reported, never judged here: which script the reply is written in.
        // Language policy is not this gate's to decide.
        const cyr = /[\u0400-\u04FF]/.test(text), dev = /[\u0900-\u097F]/.test(text)
        const script = cyr ? 'cyrillic' : dev ? 'devanagari' : 'latin'
        console.log(`${named ? 'named  ' : 'NO-NAME'} ${bad.length ? 'BAD-NUM' : absent ? 'NO-NUM ' : 'num-ok '} ${lang}/${script.padEnd(10)} ${lesson.lessonTitle.padEnd(20)} claimed=${JSON.stringify(nums)} expect=${lesson.lessonOrder}/${lesson.totalLessons}`)
        console.log(`         "${text.slice(0, 170)}"`)
      }
    }

    // ── 3. ASCII IMAGERY WHILE A REAL FIGURE IS ATTACHED ─────────────────
    console.log(`\n${'='.repeat(72)}`)
    console.log('3. "show me a diagram" WITH A REAL FIGURE ALREADY ATTACHED')
    console.log('='.repeat(72))
    for (const key of ['angular', 'critical', 'newton', 'integers', 'angular', 'critical', 'phonemic', 'newton', 'integers', 'angular', 'critical', 'phonemic'] as const) {
      const sid = await createSession(acct.cookie, SUBJECT[key])
      await openLesson(acct.cookie, sid, LESSONS[key])
      const first = await say(acct.cookie, sid, 'ok')
      const held = carriesFigure(first)
      const p = await say(acct.cookie, sid, 'show me a diagram')
      const text = p.text ?? ''
      const ascii = CODE_FENCE.test(text) || BOX_ART.test(text)
      const figureNow = carriesFigure(p) || held
      diagramAsks++
      if (ascii && figureNow) {
        asciiWithFigure++
        console.log(`ASCII+FIGURE ${key} — figure=${figureLabel(p) ?? figureLabel(first) ?? 'held'}`)
        console.log(`   ${one(text).slice(0, 300)}`)
      } else {
        console.log(`ok           ${key.padEnd(10)} figureHeld=${held} figureNow=${carriesFigure(p)} ascii=${ascii}`)
        console.log(`   ${one(text).slice(0, 170)}`)
      }
    }

    console.log(`\n${'─'.repeat(72)}`)
    console.log(`1. dangling lead-in on a closing turn : ${danglingLeadIn}/${stopTurns}`)
    console.log(`2. openings missing the lesson name   : ${missingName}/${openings}`)
    console.log(`2. openings claiming a wrong number   : ${wrongNumber}/${openings}`)
    console.log(`2. openings with NO lesson number     : ${noNumber}/${openings}`)
    console.log(`3. ASCII art while a figure is present: ${asciiWithFigure}/${diagramAsks}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\ncleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
