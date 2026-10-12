/**
 * REAL /learn PAGE EVIDENCE — what the learner's browser shows, not only what
 * the API returned (Tutor Max final production closure, 2026-10-10).
 *
 * A disposable learner is onboarded and a lesson opened over the API; then the
 * deployed /learn page is loaded in Chromium with that learner's cookie and the
 * learner's messages are TYPED into the page's own composer and sent with its
 * own Send button. Each turn records the `/api/learn/chat` response the page
 * itself received, the text of the last tutor bubble as rendered, whether a
 * Quick Check card is visible with which options, and a screenshot. "@card-first"
 * / "@card-last" taps the card's first / last option in the page.
 *
 *   QA_SUBJECT=chemistry QA_SLUG=chem.elect.corrosion \
 *   QA_SAY='i dont understand this picture. what is it showing?|quiz me|@card-first' \
 *   QA_SHOTS=/tmp/.../shots npx tsx scripts/qa/learnPageEvidence.ts
 *
 * The account is deleted at the end and its re-login is proven refused.
 *
 * TLS in the cloud sandbox: the egress gateway re-signs every HTTPS connection
 * with the sandbox CA (in /root/.ccr/ca-bundle.crt, which Node trusts through
 * NODE_EXTRA_CA_CERTS); this Chromium build does not read it (ERR_CERT_AUTHORITY_INVALID).
 * Requests to the app are therefore made by Playwright on the Node side
 * (`route.fetch()`, certificate verified there) and handed to the page
 * unchanged — the page, its bundle, its cookies and its rendering are the
 * real ones. Nothing disables certificate checking.
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { createQaAccount, deleteQaAccount, BASE, type QaAccount } from './liveAccount'
import { createSession, openLesson } from './liveSession'
import { CHROMIUM_ARGS } from './physicsVisual/render'

const SUBJECT = process.env.QA_SUBJECT ?? 'chemistry'
const SLUG = process.env.QA_SLUG ?? ''
const SAY = (process.env.QA_SAY ?? '').split('|').map((s) => s.trim()).filter(Boolean)
const SHOTS = process.env.QA_SHOTS ?? '/tmp/learn-shots'
const WIDTH = Number(process.env.QA_WIDTH ?? 390)

let acct: QaAccount | null = null
async function main() {
  mkdirSync(SHOTS, { recursive: true })
  acct = await createQaAccount('learnpage')
  const cookie = acct.cookie
  console.log('account created (disposable)')
  const ob = await fetch(`${BASE}/api/onboarding`, {
    method: 'POST', headers: { 'content-type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug: SUBJECT, currentLevel: 'beginner', voiceChoice: 'male', teachingLanguage: 'en', selfDescription: `My English is not so good. I know basic ${SUBJECT}.` }),
  })
  if (!ob.ok) throw new Error(`onboarding ${ob.status}`)
  const lessons = ((await (await fetch(`${BASE}/api/curriculum?subject=${SUBJECT}`, { headers: { cookie } })).json()) as { lessons: Array<{ topicSlug: string; lessonTitle: string; order: number; unitTitle: string }> }).lessons
  const l = lessons.find((x) => x.topicSlug === SLUG)
  if (!l) throw new Error(`${SLUG} not in curriculum`)
  const sid = await createSession(cookie, SUBJECT, `learnpage-${Date.now()}`)
  await openLesson(cookie, sid, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: l.topicSlug, unitTitle: l.unitTitle, totalLessons: lessons.length })

  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium', args: CHROMIUM_ARGS })
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 1400 } })
  const host = new URL(BASE).host
  await ctx.route((u) => u.host === host, async (route) => {
    try { await route.fulfill({ response: await route.fetch({ timeout: 180_000 }) }) } catch { await route.abort() }
  })
  await ctx.addCookies(cookie.split(';').map((c) => { const [n, ...rest] = c.trim().split('='); return { name: n, value: rest.join('='), domain: new URL(BASE).hostname, path: '/', secure: true, httpOnly: false, sameSite: 'Lax' as const } }))
  const page = await ctx.newPage()
  const responses: Array<Record<string, unknown>> = []
  page.on('response', async (r) => {
    if (!r.url().includes('/api/learn/chat') || r.request().method() !== 'POST') return
    try { responses.push(await r.json() as Record<string, unknown>) } catch { /* non-JSON */ }
  })
  await page.goto(`${BASE}/learn?subject=${SUBJECT}`, { waitUntil: 'domcontentloaded', timeout: 90_000 })
  const composer = page.locator('textarea[placeholder="Write your question…"]')
  await composer.waitFor({ state: 'visible', timeout: 90_000 })
  await page.waitForTimeout(4_000)
  await page.screenshot({ path: `${SHOTS}/00-open.png`, fullPage: false })

  const rows: Array<Record<string, unknown>> = []
  let lastOptions: string[] = []
  for (let i = 0; i < SAY.length; i++) {
    const beat = SAY[i]
    const before = responses.length
    let said = beat
    if (beat.startsWith('@card')) {
      const opt = beat === '@card-first' ? lastOptions[0] : lastOptions[lastOptions.length - 1]
      if (!opt) { rows.push({ turn: i + 1, said: beat, error: 'no card on screen' }); continue }
      said = opt
      await page.getByRole('button', { name: opt, exact: false }).first().click({ timeout: 20_000 })
    } else {
      await composer.fill(beat)
      await page.getByRole('button', { name: 'Send' }).click({ timeout: 20_000 })
    }
    const t0 = Date.now()
    while (responses.length === before && Date.now() - t0 < 120_000) await page.waitForTimeout(500)
    // The page reveals the reply progressively; wait for the composer to be enabled again.
    await page.waitForFunction(() => !(document.querySelector('textarea') as HTMLTextAreaElement | null)?.disabled, null, { timeout: 120_000 }).catch(() => undefined)
    await page.waitForTimeout(6_000)
    const payload = responses[responses.length - 1] ?? null
    const mcq = (payload?.mcq ?? null) as { question?: string; options?: string[] } | null
    lastOptions = mcq?.options ?? []
    const shot = `${SHOTS}/${String(i + 1).padStart(2, '0')}.png`
    await page.screenshot({ path: shot, fullPage: false })
    const pageText = await page.evaluate(() => document.body.innerText)
    const optionsVisible = await Promise.all(lastOptions.map(async (o) => page.getByRole('button', { name: o, exact: false }).first().isVisible().catch(() => false)))
    const replyText = String(payload?.text ?? '')
    const firstLine = replyText.split('\n')[0].slice(0, 80)
    rows.push({
      turn: i + 1, said, shot,
      provider: payload?.provider ?? null,
      reply: replyText,
      replyRendered: firstLine ? pageText.includes(firstLine.slice(0, 50)) : null,
      card: mcq?.question ?? null,
      cardOptions: lastOptions,
      cardQuestionRendered: mcq?.question ? pageText.includes(mcq.question.slice(0, 50)) : null,
      cardOptionsVisible: optionsVisible,
      figure: Boolean(payload?.visual || payload?.visualSpec || payload?.sceneSpec || payload?.dynamicVisualizationCode),
    })
    console.log(JSON.stringify({ turn: i + 1, said, provider: payload?.provider ?? null, card: mcq?.question?.slice(0, 80) ?? null, rendered: rows[rows.length - 1].replyRendered, reply: replyText.slice(0, 160) }))
  }
  writeFileSync(`${SHOTS}/evidence.json`, JSON.stringify({ base: BASE, subject: SUBJECT, slug: SLUG, rows }, null, 2))
  await browser.close()
}

for (const sig of ['SIGTERM', 'SIGINT'] as const) process.on(sig, async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))); process.exit(130) })
main()
  .catch((e) => { console.error(String(e instanceof Error ? e.stack : e)); process.exitCode = 1 })
  .finally(async () => { if (acct) console.log('disposable account deleted:', JSON.stringify(await deleteQaAccount(acct))) })
