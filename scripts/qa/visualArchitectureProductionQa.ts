/**
 * VISUAL ARCHITECTURE — production QA across the visual lifecycle paths.
 *
 * For each path: open the concept's lesson on a disposable account, ask
 * explicitly for a diagram, then send a plain turn. Records what the RESPONSE
 * actually carries (visual / visualSpec / sceneSpec) and what the tutor SAID,
 * so it can be set against the server's own `[learn/chat] VISUAL_TURN=` and
 * `TURN_EVENT=` lines for the same turns (read from the deployment's logs
 * after the run) — the three must agree.
 *
 * Disposable account only; deleted at the end unless --keep.
 * Run: npx tsx scripts/qa/visualArchitectureProductionQa.ts [--keep]
 */
import { writeFileSync } from 'node:fs'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'

interface Path { path: string; subject: string; conceptId: string; expect: string; requestTwice?: boolean }

const PATHS: Path[] = [
  { path: 'A deterministic Tier 0 (concept-authored scene)', subject: 'biology', conceptId: 'bio.cell.apoptosis', expect: 'scene served; representation not food_chain' },
  { path: 'A deterministic Tier 0 (generator kind)', subject: 'physics', conceptId: 'phys.mech.projectile-motion', expect: 'scene served' },
  { path: 'B curated Tier 1 (exact card)', subject: 'physics', conceptId: 'phys.qm.particle-in-box', expect: 'card potential_well served' },
  { path: 'B domain Tier 1 (general illustration)', subject: 'mathematics', conceptId: 'math.calc.limits', expect: 'card coordinate_plane, introduced as general illustration' },
  { path: 'Tier 2 approved stored figure', subject: 'chemistry', conceptId: 'chem.found.stoichiometry', expect: 'approved figure served (tier2-approved)' },
  { path: 'C generated Tier 3 (+ I cache hit on 2nd request)', subject: 'physics', conceptId: 'phys.therm.specific-heat', expect: 'generated figure or an honest no-figure reason; never a claim without a figure', requestTwice: true },
  { path: 'D retired (no replacement)', subject: 'physics', conceptId: 'phys.em.lc-circuits', expect: 'no figure; "I don\'t have a picture"; no figure claim' },
  { path: 'D retired (concept-authored retired scene)', subject: 'physics', conceptId: 'phys.opt.reflection', expect: 'no figure; retired concave-mirror scene NOT served' },
  { path: 'E replaced (formerly retired, replacement authored)', subject: 'biology', conceptId: 'bio.cell.cell-cycle', expect: 'replacement scene served, not food_chain' },
  { path: 'G no-suitable-form candidate', subject: 'english', conceptId: 'eng.grammar.parts-of-speech', expect: 'figure or honest no-figure; no claim without a figure' },
  { path: 'H critic-reject cached candidate', subject: 'physics', conceptId: 'phys.em.energy-capacitor', expect: 'no rejected figure served; retry only on request' },
]

const FIGURE_CLAIM = /\b(look at|see|shown|showing|in the (?:diagram|figure|picture|graph))\b.{0,40}\b(diagram|figure|picture|graph|illustration|sketch)\b|\b(diagram|figure|picture|graph|sketch)\s+(above|below|beside|shows|on your screen)\b/i

async function api(cookie: string, path: string, body?: unknown): Promise<any> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`${BASE}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (r.status === 429 || r.status >= 500) { await new Promise((res) => setTimeout(res, 15_000 * (attempt + 1))); continue }
    if (!r.ok) throw new Error(`${path} ${r.status}: ${(await r.text()).slice(0, 200)}`)
    return r.json()
  }
  throw new Error(`${path} failed after retries`)
}

function carried(p: any) {
  const kind = p.sceneSpec ? `scene:${p.sceneSpec.id ?? p.sceneSpec.title}` : p.visualSpec ? `spec:${p.visualSpec.type}:${p.visualSpec.title ?? ''}` : p.visual ? `card:${p.visual}` : 'none'
  return { served: kind !== 'none', kind }
}

async function main() {
  const keep = process.argv.includes('--keep')
  const acct = await createQaAccount('visual-arch')
  console.log(`BASE=${BASE} account=${acct.email} start=${new Date().toISOString()}`)
  const results: unknown[] = []
  const curricula: Record<string, any[]> = {}
  try {
    for (const p of PATHS) {
      curricula[p.subject] ??= (await api(acct.cookie, `/api/curriculum?subject=${p.subject}`)).lessons ?? []
      const lesson = curricula[p.subject].find((l: any) => l.topicSlug === p.conceptId)
      if (!lesson) { console.log(`\n### ${p.path} — ${p.conceptId}: NOT IN ${p.subject} CURRICULUM`); results.push({ ...p, error: 'no lesson' }); continue }
      const s = await api(acct.cookie, '/api/sessions', { subjectSlug: p.subject })
      const sessionId = s.data?.id ?? s.id
      const open = await api(acct.cookie, '/api/learn/lesson-init', {
        sessionId, mode: 'restart', lessonTitle: lesson.lessonTitle, lessonOrder: lesson.order,
        topicSlug: lesson.topicSlug, unitTitle: lesson.unitTitle, totalLessons: curricula[p.subject].length,
        completedLessons: [], teachingLanguage: 'en',
      })
      const turns: Array<Record<string, unknown>> = []
      const record = (label: string, sent: string, r: any) => {
        const c = carried(r)
        const text = String(r.text ?? '')
        const claim = FIGURE_CLAIM.test(text)
        const t = { label, sent, at: new Date().toISOString(), ...c, claimsFigure: claim, noPictureLine: /don't have a picture/i.test(text), text: text.slice(0, 400) }
        turns.push(t)
        console.log(`  [${label}] served=${c.served} ${c.kind} claim=${claim} :: ${text.replace(/\s+/g, ' ').slice(0, 170)}`)
      }
      console.log(`\n### ${p.path} — ${p.conceptId} (expect: ${p.expect})`)
      record('open', '(lesson-init)', open)
      const asks = p.requestTwice ? 2 : 1
      for (let i = 0; i < asks; i++) {
        const msg = 'can you show me a diagram of this please'
        record(`request${i + 1}`, msg, await api(acct.cookie, '/api/learn/chat', { sessionId, message: msg }))
      }
      record('plain', 'ok i understand, go on', await api(acct.cookie, '/api/learn/chat', { sessionId, message: 'ok i understand, go on' }))
      results.push({ ...p, sessionId, turns })
    }
  } finally {
    const out = process.env.QA_OUT ?? 'visual-arch-qa.json'
    writeFileSync(out, JSON.stringify({ account: acct.email, base: BASE, results }, null, 2))
    console.log(`\nend=${new Date().toISOString()} transcript=${out}`)
    if (!keep) console.log(`delete: ${JSON.stringify(await deleteQaAccount(acct))}`)
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
