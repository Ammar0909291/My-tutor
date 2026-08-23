/**
 * Lesson-opening CONSISTENCY, EN + RU + HI.
 *
 * Two questions only, both cheap (one provider call per sample):
 *   · is the lesson NAME present?
 *   · is the lesson NUMBER correct — counting ABSENT separately from WRONG,
 *     because the first version of this check treated "no number at all" as
 *     "num-ok" and would have reported a false PASS for the observed
 *     "**Lesson: Integers**" opening.
 *
 * The reply's script (latin/cyrillic/devanagari) is RECORDED, never judged:
 * teaching-language policy is not this gate's to decide.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, type LessonRef } from './liveSession'

const LESSONS: Array<[string, LessonRef]> = [
  ['mathematics', { lessonTitle: 'Critical Points', lessonOrder: 408, topicSlug: 'math.calc.critical-points', unitTitle: 'Calculus', totalLessons: 908 }],
  ['mathematics', { lessonTitle: 'Integers', lessonOrder: 78, topicSlug: 'math.found.integers', unitTitle: 'Mathematical Foundations', totalLessons: 908 }],
  ['physics', { lessonTitle: 'Angular Kinematics', lessonOrder: 39, topicSlug: 'phys.mech.angular-kinematics', unitTitle: 'Classical Mechanics', totalLessons: 238 }],
  ['english', { lessonTitle: 'Phonemic Awareness', lessonOrder: 2, topicSlug: 'eng.phonics.phonemic-awareness', unitTitle: 'Phonics', totalLessons: 216 }],
]

function claimed(text: string): number[] {
  const out: number[] = []
  for (const m of text.matchAll(/(?:lesson|урок|पाठ|paath)\s*[№#]?\s*(\d{1,4})/giu)) out.push(Number(m[1]))
  return out
}

async function main(): Promise<void> {
  const acct = await createQaAccount('opencons')
  console.log(`account: ${acct.email}\n`)
  let noName = 0, wrong = 0, absent = 0, n = 0
  try {
    for (let round = 0; round < 2; round++) {
      for (const lang of ['en', 'ru', 'hi'] as const) {
        for (const [subject, lesson] of LESSONS) {
          const sid = await createSession(acct.cookie, subject)
          const p = await openLesson(acct.cookie, sid, lesson, lang)
          const text = (p.text ?? '').replace(/\s+/g, ' ').trim()
          n++
          // A TRANSLATED title is still a named lesson. The ASCII-only version
          // of this check reported the ru openings «Урок 408: Критические
          // точки» and «Урок 1: Целые числа» as NO-NAME, which was a harness
          // limitation and not a product defect — both name the lesson
          // perfectly well in Russian. So "named" means: the opening states a
          // lesson identity at all, which for these purposes is the title in
          // any script following the Lesson/Урок/पाठ label, or the English
          // title verbatim.
          const words = lesson.lessonTitle.split(/[\s'’]+/).filter((w) => w.length > 4)
          const named = text.toLowerCase().includes(lesson.lessonTitle.toLowerCase())
            || words.some((w) => text.toLowerCase().includes(w.toLowerCase()))
            || /(?:lesson|урок|पाठ)\s*[№#]?\s*\d{0,4}\s*[:—–-]\s*\S/iu.test(text)
          const nums = claimed(text)
          const bad = nums.filter((x) => x !== lesson.lessonOrder && x !== lesson.totalLessons)
          const none = nums.length === 0
          if (!named) noName++
          if (bad.length) wrong++
          if (none) absent++
          const script = /[Ѐ-ӿ]/.test(text) ? 'cyr' : /[ऀ-ॿ]/.test(text) ? 'dev' : 'lat'
          console.log(`${named ? 'named  ' : 'NO-NAME'} ${bad.length ? 'WRONG-NUM' : none ? 'NO-NUM   ' : 'num-ok   '} ${lang}/${script} ${lesson.lessonTitle.padEnd(19)} claimed=${JSON.stringify(nums)} expect=${lesson.lessonOrder}/${lesson.totalLessons}`)
          console.log(`        "${text.slice(0, 120)}"`)
        }
      }
    }
    console.log(`\nopenings missing the lesson NAME : ${noName}/${n}`)
    console.log(`openings with a WRONG number     : ${wrong}/${n}`)
    console.log(`openings with NO number at all   : ${absent}/${n}`)
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch((e) => { console.error('FAILED:', e instanceof Error ? e.message : e); process.exit(1) })
