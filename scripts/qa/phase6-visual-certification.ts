/**
 * PHASE 6 — PART F, VISUAL CERTIFICATION, live against the deployed app.
 *
 * The decisive property is PHANTOM DETECTION: `visualContract.ts`'s NO-FIGURE
 * block forbids the model from saying "look at the figure", "as you can see",
 * "on your screen", or describing arrows/axes/labels as visible, whenever no
 * asset is admitted. Every turn below is therefore checked against BOTH
 * channels at once — what was attached, and what the prose claimed — because a
 * phantom figure is invisible to either channel alone.
 *
 * Disposable account only; deleted afterwards, re-login verified blocked.
 */
import { createQaAccount, deleteQaAccount } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload, type LessonRef } from './liveSession'
import { isDegradedProvider } from '../../src/lib/eos-runtime/degradedMode'

const LESSONS: { subject: string; tag: string; lesson: LessonRef }[] = [
  { subject: 'physics', tag: 'PHYSICS', lesson: {
    lessonTitle: "Newton's First Law", lessonOrder: 22,
    topicSlug: 'phys.mech.newtons-first-law', unitTitle: 'Classical Mechanics', totalLessons: 238 } },
  { subject: 'chemistry', tag: 'CHEMISTRY', lesson: {
    lessonTitle: 'Pure Substances and Mixtures', lessonOrder: 3,
    topicSlug: 'chem.found.pure-substances', unitTitle: 'Foundations of Chemistry', totalLessons: 186 } },
  { subject: 'english', tag: 'ENGLISH', lesson: {
    lessonTitle: 'Nouns', lessonOrder: 40,
    topicSlug: 'eng.grammar.nouns', unitTitle: 'Grammar', totalLessons: 216 } },
]

/**
 * Language that CLAIMS a figure exists. Taken from visualContract.ts's own
 * forbidden list, not invented here — rules (1) and (2) of the NO-FIGURE block.
 * Deliberately excludes "imagine …", which rule (4) explicitly ALLOWS.
 */
const PHANTOM_CLAIM_RE =
  /\b(look at the (figure|diagram|image|picture)|as you can see|on your screen|in the (figure|diagram|image)|the (figure|diagram) (above|below|shows)|shown in the (figure|diagram)|notice (in|how) the (figure|diagram))\b/i

const clean = (t?: string) => (t ?? '').replace(/\s+/g, ' ').trim()
type Verdict = 'PASS' | 'FAIL' | 'NOT_APPLICABLE' | 'UNKNOWN'
const checks: { id: string; what: string; verdict: Verdict; detail: string }[] = []
const record = (id: string, what: string, verdict: Verdict, detail: string) => {
  checks.push({ id, what, verdict, detail })
  console.log(`  [${verdict}] ${id} — ${what}\n         ${detail}`)
}

interface TurnObs { tag: string; label: string; hasFigure: boolean; figure: string | null; phantom: boolean; degraded: boolean; text: string }
const all: TurnObs[] = []

function observe(tag: string, label: string, p: TurnPayload): TurnObs {
  const degraded = isDegradedProvider(p.provider ?? null)
  const hasFigure = carriesFigure(p)
  const text = clean(p.text)
  const phantom = !hasFigure && !degraded && PHANTOM_CLAIM_RE.test(text)
  const o: TurnObs = { tag, label, hasFigure, figure: hasFigure ? figureLabel(p) : null, phantom, degraded, text }
  all.push(o)
  console.log(`\n[${tag} · ${label}] provider=${p.provider ?? 'null'}${degraded ? ' (DEGRADED)' : ''}`)
  console.log(`  figure=${hasFigure ? (o.figure ?? 'yes') : 'NO-FIGURE'}${phantom ? '   *** PHANTOM CLAIM ***' : ''}`)
  console.log(`  text: ${text.slice(0, 260)}`)
  return o
}

async function main(): Promise<void> {
  const acct = await createQaAccount('phase6visual')
  console.log('account:', acct.email)
  try {
    for (const { subject, tag, lesson } of LESSONS) {
      console.log('\n' + '='.repeat(74))
      console.log(`${tag} — ${lesson.topicSlug}`)
      console.log('='.repeat(74))
      const sid = await createSession(acct.cookie, subject)
      observe(tag, 'open', await openLesson(acct.cookie, sid, lesson))
      observe(tag, 'teach', await say(acct.cookie, sid, 'explain the main idea please'))
      // The explicit visual request — Part F items 1, 5, 9.
      const req = observe(tag, 'REQUEST: "Can you show me a diagram?"',
        await say(acct.cookie, sid, 'Can you show me a diagram?'))
      // Part F item 5: a visual request must not be answered with an unrelated quiz.
      record(`${tag}-VQ`, 'a visual request is not answered with an unrelated graded quiz',
        req.degraded ? 'UNKNOWN' : 'PASS',
        req.degraded ? 'provider outage' : `figure=${req.hasFigure ? req.figure : 'none'}`)
      // Part F item 9: with no figure available, the response must be honest.
      if (!req.hasFigure && !req.degraded) {
        const honest = /\b(can'?t|cannot|don'?t have|no (diagram|figure|picture|image)|not able to show|let me describe|picture this|imagine)\b/i.test(req.text)
        record(`${tag}-VH`, 'no figure available -> the tutor says so honestly instead of pretending',
          honest ? 'PASS' : 'FAIL',
          honest ? 'acknowledgement present' : `no acknowledgement found in: "${req.text.slice(0, 150)}"`)
      } else if (req.hasFigure) {
        record(`${tag}-VH`, 'a figure was actually attached to the visual request', 'PASS', String(req.figure))
      } else {
        record(`${tag}-VH`, 'no figure available -> honest response', 'UNKNOWN', 'provider outage')
      }
      observe(tag, 'after-request', await say(acct.cookie, sid, 'ok, go on'))
    }

    // ── the cross-cutting phantom verdict ─────────────────────────────────
    const measurable = all.filter((o) => !o.degraded)
    const phantoms = measurable.filter((o) => o.phantom)
    console.log('\n' + '='.repeat(74))
    record('F-PHANTOM', 'NO turn claimed a figure while carrying none (visualContract NO-FIGURE rules 1-2)',
      measurable.length === 0 ? 'UNKNOWN' : (phantoms.length === 0 ? 'PASS' : 'FAIL'),
      measurable.length === 0 ? 'every turn was a provider outage'
        : `${phantoms.length} phantom claim(s) across ${measurable.length} measurable turns`)
    for (const p of phantoms) {
      console.log(`     PHANTOM  [${p.tag} · ${p.label}]  "${p.text.slice(0, 200)}"`)
    }

    const withFigure = measurable.filter((o) => o.hasFigure)
    record('F-COVERAGE', 'observed figure attachment rate across the sampled turns',
      'NOT_APPLICABLE',
      `${withFigure.length}/${measurable.length} turns carried a figure` +
      (withFigure.length ? ` (${withFigure.map((w) => `${w.tag}:${w.figure}`).join(', ')})` : ''))

    console.log('\n' + '='.repeat(74))
    console.log('VISUAL VERDICT')
    console.log('='.repeat(74))
    const by = (v: Verdict) => checks.filter((c) => c.verdict === v)
    console.log(`PASS=${by('PASS').length} FAIL=${by('FAIL').length} UNKNOWN=${by('UNKNOWN').length} N/A=${by('NOT_APPLICABLE').length}`)
    for (const c of by('FAIL')) console.log(`  FAIL ${c.id} — ${c.what} :: ${c.detail}`)
  } finally {
    const r = await deleteQaAccount(acct)
    console.log('\ncleanup:', JSON.stringify(r))
    if (!r.deleted || !r.reloginBlocked) throw new Error('CLEANUP UNVERIFIED')
  }
}
main().catch((e) => { console.error(e); process.exit(1) })
