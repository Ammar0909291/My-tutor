import { login } from './liveAccount'
import { createSession, say } from './liveSession'
async function main() {
  const c = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const s = await createSession(c, process.env.QA_SUBJECT ?? 'physics')
  const r = await say(c, s, process.env.QA_MSG ?? 'hello, what will we cover today?')
  console.log('provider=', (r as { provider?: string }).provider, 'chars=', (r.text ?? '').length)
}
main().catch((e) => { console.error(e); process.exit(1) })
