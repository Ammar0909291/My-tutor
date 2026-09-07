/**
 * Two fresh production openings of phys.opt.reflection, checked for the exact
 * false claim. Reads and reports; the assertion is the caller's.
 */
import { login } from './liveAccount'
import { createSession, openLesson } from './liveSession'
import { isEmissionTheoryClaim } from '@/lib/teaching/visionDirectionGuard'
import fs from 'fs'

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const { BASE } = await import('./liveAccount')
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const l = (curr.lessons ?? []).find((x) => x.topicSlug === 'phys.opt.reflection')!
  const out: unknown[] = []
  for (let i = 1; i <= 2; i++) {
    const sessionId = await createSession(cookie, 'physics')
    const open = await openLesson(cookie, sessionId, {
      lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: 'phys.opt.reflection',
      unitTitle: l.unitTitle, totalLessons: (curr.lessons ?? []).length,
    })
    const text = (open.text ?? '').replace(/\s+/g, ' ')
    const sentences = text.split(/(?<=[.!?;])\s+/)
    out.push({
      opening: i,
      // the crude phrase check a human would do
      RAW_PHRASE_PRESENT: /(?:leaves?|from|out of|emitted by|sent out by)\s+(?:your|the|my|our)?\s*eyes?\b/i.test(text),
      // the guard's own predicate, applied to what the learner received
      GUARD_PREDICATE_FIRES: sentences.some((s) => isEmissionTheoryClaim(s)),
      mentionsFaceAsSource: /(?:leaves?|from|off)\s+(?:your|the)\s+face/i.test(text),
      first400: text.slice(0, 400),
    })
    process.stdout.write(`opening ${i} captured\n`)
  }
  fs.writeFileSync(process.env.QA_OUT ?? '/tmp/refl.json', JSON.stringify(out, null, 1))
  console.log(JSON.stringify(out.map((o) => ({ ...(o as Record<string, unknown>), first400: undefined })), null, 1))
}
main().catch((e) => { console.error('FAILED:', (e as Error).message); process.exit(1) })
