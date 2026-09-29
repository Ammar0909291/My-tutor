/**
 * Learner replay — a repeatable, scripted version of the 2026-09-29 real-learner
 * QA run, so a Tutor Max fix can be CHECKED against the deployed app instead of
 * asserted from unit tests alone.
 *
 * Each scenario opens a real lesson on a DISPOSABLE account (created here and
 * deleted at the end, per CLAUDE.md account safety), sends the scripted learner
 * turns, and checks every reply against the defects that run found:
 *
 *   OFF_TOPIC      the reply teaches a concept the lesson is not about
 *                  ("focal length" → special relativity)
 *   BARE_WRONG     a wrong answer got "Not quite — the answer is: …" and nothing
 *                  that explains why
 *   IGNORED        a message with content was answered by stored text that
 *                  shares nothing with it (provider=memory)
 *
 * It reads, it does not fix. Exit code 1 when any check fails.
 *
 *   npx tsx scripts/qa/learnerReplay.ts            # all scenarios
 *   npx tsx scripts/qa/learnerReplay.ts lenses     # scenarios whose id contains "lenses"
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'

type Send = string | { pick: 'first' | 'last' }
interface Check {
  /** Words that must NOT appear (case-insensitive) — the off-topic signature. */
  offTopic?: string[]
  /** If the reply marks the answer wrong, it must also explain (≥ this many words after the verdict line). */
  wrongNeedsWhy?: number
  /** The reply must not be stored text. */
  notMemory?: boolean
}
interface Step { send: Send; check?: Check }
interface Scenario { id: string; subject: string; slug: string; steps: Step[] }

const SCENARIOS: Scenario[] = [
  {
    id: 'lenses-focal-length',
    subject: 'physics', slug: 'phys.opt.lenses',
    steps: [
      { send: 'the word look bigger. what is focal length? i dont know', check: { offTopic: ['speed of light', 'contraction', 'relativity', 'spaceship'] } },
      { send: 'what is P? power? you never teach power. i dont know', check: { offTopic: ['watt', 'joule', 'de/dt', 'energy per second'] } },
    ],
  },
  {
    id: 'newton-wrong-answer-explained',
    subject: 'physics', slug: 'phys.mech.newtons-second-law',
    steps: [
      { send: 'empty cart go more fast because it is light, less mass' },
      { send: 'ok i understand. give me question please' },
      // Answer whatever question is on screen with its LAST option; when that is
      // wrong, the reply must explain why, not only state the key.
      { send: { pick: 'last' }, check: { wrongNeedsWhy: 12 } },
      { send: { pick: 'last' }, check: { wrongNeedsWhy: 12 } },
    ],
  },
  {
    id: 'kirchhoff-practice-with-content',
    subject: 'physics', slug: 'phys.em.kirchhoffs-laws',
    steps: [
      { send: 'water come in and go out same amount. not stay inside' },
      { send: 'i see no arrow in picture. can you give me new question to practice?', check: { notMemory: true } },
    ],
  },
]

const WRONG_RE = /^\s*not quite\b/i

function checkReply(p: TurnPayload, c: Check | undefined): string[] {
  if (!c) return []
  const text = p.text ?? ''
  const fails: string[] = []
  for (const w of c.offTopic ?? []) if (text.toLowerCase().includes(w.toLowerCase())) fails.push(`OFF_TOPIC: reply mentions "${w}"`)
  if (c.wrongNeedsWhy && WRONG_RE.test(text)) {
    const rest = text.split('\n').slice(1).join(' ').trim()
    const words = rest.split(/\s+/).filter(Boolean).length
    if (words < c.wrongNeedsWhy) fails.push(`BARE_WRONG: only ${words} words after the verdict`)
  }
  if (c.notMemory && p.provider === 'memory') fails.push('IGNORED: served stored text (provider=memory)')
  return fails
}

async function main() {
  const filter = process.argv[2]
  const scenarios = SCENARIOS.filter((s) => !filter || s.id.includes(filter))
  const acct = await createQaAccount('replay')
  const failures: string[] = []
  try {
    for (const sc of scenarios) {
      const cur = await (await fetch(`${BASE}/api/curriculum?subject=${sc.subject}`, { headers: { cookie: acct.cookie } })).json() as { lessons?: Array<Record<string, unknown>> }
      const lessons = cur.lessons ?? []
      const l = lessons.find((x) => x.topicSlug === sc.slug)
      if (!l) { failures.push(`${sc.id}: lesson ${sc.slug} not found`); continue }
      const sid = await createSession(acct.cookie, sc.subject)
      let last: TurnPayload = await openLesson(acct.cookie, sid, {
        lessonTitle: String(l.lessonTitle), lessonOrder: Number(l.order ?? l.lessonOrder), topicSlug: sc.slug,
        unitTitle: String(l.unitTitle), totalLessons: lessons.length,
      })
      console.log(`\n=== ${sc.id}`)
      for (const [i, step] of sc.steps.entries()) {
        let msg: string
        if (typeof step.send === 'string') msg = step.send
        else {
          const opts = last.mcq?.options ?? []
          if (opts.length === 0) { console.log(`  [${i}] no question on screen — pick skipped`); continue }
          msg = step.send.pick === 'first' ? opts[0] : opts[opts.length - 1]
        }
        last = await say(acct.cookie, sid, msg)
        const fails = checkReply(last, step.check)
        console.log(`  [${i}] > ${msg.slice(0, 70)}\n      provider=${last.provider ?? '?'} ${fails.length ? 'FAIL ' + fails.join('; ') : 'ok'}\n      ${(last.text ?? '').replace(/\s+/g, ' ').slice(0, 220)}`)
        for (const f of fails) failures.push(`${sc.id}[${i}]: ${f}`)
      }
    }
  } finally {
    const d = await deleteQaAccount(acct)
    console.log(`\nQA account deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
  console.log(failures.length ? `\nFAILED (${failures.length}):\n  ${failures.join('\n  ')}` : '\nALL CHECKS PASSED')
  process.exit(failures.length ? 1 : 0)
}
main().catch((e) => { console.error('ERR', e instanceof Error ? e.message : e); process.exit(1) })
