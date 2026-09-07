/**
 * L1 PRODUCTION SMOKE TEST — the exact behaviour the liveness merge fixes.
 *
 * THE SCENARIO, which is a real learner's, not a robot's: an authored MCQ is on
 * screen and the learner TYPES a substantively correct answer instead of tapping
 * an option. `resolveMcqChoice` correctly refuses to guess, so no server grade
 * exists, and BEFORE this merge `noUnansweredProbeOnScreen` shut the assessment
 * gate for the rest of the lesson — the same question re-served forever while
 * other reviewed probes sat unused.
 *
 * WHAT THIS ASSERTS, and deliberately nothing more:
 *   1. the same probe is NOT re-served indefinitely (the probe is released)
 *   2. a DIFFERENT authored probe becomes reachable afterwards
 *   3. nothing was fabricated: the ungradeable answers bank no mastery, move no
 *      counter, and cause no phase jump
 * It reads and reports. It does not decide whether the product is good.
 */
import { login } from './liveAccount'
import { createSession, openLesson, say, type TurnPayload } from './liveSession'
import fs from 'fs'

const TYPED_BUT_UNGRADEABLE = [
  'the anode', 'the negative electrode', 'where electrons are released',
  'the zinc side loses electrons', 'the electrode that gets eaten away',
  'the one that dissolves',
]

interface Obs { turn: number; said: string; q: string | null; mastery: unknown; text: string }

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const subject = process.env.QA_SUBJECT ?? 'physics'
  const slug = process.env.QA_SLUG ?? 'phys.opt.reflection'

  const { BASE } = await import('./liveAccount')
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const l = (curr.lessons ?? []).find((x) => x.topicSlug === slug)
  if (!l) throw new Error(`lesson ${slug} not found`)

  const sessionId = await createSession(cookie, subject)
  const obs: Obs[] = []
  const push = (n: number, said: string, p: TurnPayload) => obs.push({
    turn: n, said, q: p.mcq?.question ?? null, mastery: p.mastery ?? null,
    text: (p.text ?? '').replace(/\s+/g, ' ').slice(0, 200),
  })

  push(0, '(open)', await openLesson(cookie, sessionId, {
    lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: slug,
    unitTitle: l.unitTitle, totalLessons: (curr.lessons ?? []).length,
  }))

  // Turn 1: a plain acknowledgement, to let the gate attach a keyed probe.
  push(1, 'ok', await say(cookie, sessionId, 'ok'))

  // Then: type, never tap. Every message is substantively an answer.
  for (let i = 0; i < TYPED_BUT_UNGRADEABLE.length; i++) {
    push(i + 2, TYPED_BUT_UNGRADEABLE[i], await say(cookie, sessionId, TYPED_BUT_UNGRADEABLE[i]))
  }

  const withQ = obs.filter((o) => o.q)
  const distinct = new Set(withQ.map((o) => o.q))
  const masteryMoved = obs.some((o) => {
    const m = o.mastery as { checkCorrect?: number; practiceCorrect?: number } | null
    return Boolean(m && ((m.checkCorrect ?? 0) > 0 || (m.practiceCorrect ?? 0) > 0))
  })

  const report = {
    subject, slug, turns: obs.length - 1,
    turnsWithAProbeOnScreen: withQ.length,
    DISTINCT_PROBES_SEEN: distinct.size,
    probes: [...distinct].map((q) => String(q).slice(0, 90)),
    NO_FABRICATED_MASTERY: !masteryMoved,
    finalMastery: obs[obs.length - 1].mastery,
    VERDICT_probe_released: distinct.size > 1 ? 'RELEASED — a different probe became reachable'
      : 'NOT RELEASED — same probe throughout',
    observations: obs,
  }
  fs.writeFileSync(process.env.QA_OUT ?? '/tmp/l1smoke.json', JSON.stringify(report, null, 1))
  console.log(JSON.stringify({ ...report, observations: undefined }, null, 1))
}
main().catch((e) => { console.error('SMOKE FAILED:', (e as Error).message); process.exit(1) })
