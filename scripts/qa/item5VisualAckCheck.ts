import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure } from './liveSession'

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const subject = 'physics'
  const slug = 'phys.mech.newtons-first-law'
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const lessons = curr.lessons ?? []
  const l = lessons.find((x) => x.topicSlug === slug) ?? lessons[0]
  const sessionId = await createSession(cookie, subject)
  await openLesson(cookie, sessionId, {
    lessonTitle: l!.lessonTitle, lessonOrder: l!.order, topicSlug: l!.topicSlug,
    unitTitle: l!.unitTitle, totalLessons: lessons.length,
  })
  const r = await say(cookie, sessionId, 'Can you show me a diagram of this?')
  console.log('figure attached:', carriesFigure(r))
  console.log('=== FULL TEXT ===')
  console.log(r.text)
}
main().catch((e) => { console.error(e); process.exit(1) })
