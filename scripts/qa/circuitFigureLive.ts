/**
 * LIVE VERIFICATION — the circuit figure as production actually serves it.
 *
 * Asks for the figure on the reported concept, then applies the SHIPPED
 * readability and leakage rules to the payload that came back over the wire.
 * The point is that these checks run against the served scene, not against a
 * locally rebuilt one: a fix that only holds offline is not a fix.
 */
import { login, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel } from './liveSession'
import { checkSceneLayoutAllViewports } from '../../src/lib/teaching/visual/layout'
import { deriveExplainer } from '../../src/lib/teaching/visual/explainer'
import { redactExplainer, stageView, withheldValues, redactText } from '../../src/lib/teaching/visual/sceneStage'
import type { SceneSpec } from '../../src/lib/teaching/sceneSpec'

function specOf(p: unknown): SceneSpec | null {
  const o = p as Record<string, unknown>
  for (const k of ['sceneSpec', 'visualSpec', 'visual']) {
    const v = o?.[k] as Record<string, unknown> | undefined
    if (v && Array.isArray(v.steps)) return v as unknown as SceneSpec
    if (v && typeof v === 'object') {
      for (const inner of Object.values(v)) {
        const i = inner as Record<string, unknown>
        if (i && Array.isArray(i.steps)) return i as unknown as SceneSpec
      }
    }
  }
  return null
}

async function main() {
  const cookie = await login(process.env.QA_EMAIL!, process.env.QA_PASSWORD!)
  const subject = process.env.QA_SUBJECT ?? 'physics'
  const slug = process.env.QA_SLUG ?? 'phys.elect.current-and-drift'
  const curr = await (await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie } })).json() as
    { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
  const l = (curr.lessons ?? []).find((x) => x.topicSlug === slug)
  if (!l) throw new Error(`${slug} not found`)

  const sessionId = await createSession(cookie, subject)
  await openLesson(cookie, sessionId, {
    lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: slug,
    unitTitle: l.unitTitle, totalLessons: (curr.lessons ?? []).length,
  })
  const turn = await say(cookie, sessionId, 'Show me a diagram of the circuit')
  console.log(`\nfigure attached: ${carriesFigure(turn)}  (${figureLabel(turn) ?? '-'})`)

  const spec = specOf(turn)
  if (!spec) { console.log('No SceneSpec on the wire — cannot check geometry from this payload.'); return }

  console.log(`scene: ${spec.title}  steps=${spec.steps.length}  camera=${spec.cameraDistance}`)
  const objs = spec.steps.flatMap((s) => s.objects)
  const labels = objs.filter((o) => o.type === 'label')
  console.log(`objects=${objs.length} labels=${labels.length} wires=${objs.filter((o) => o.type === 'bond').length}`)
  for (const lb of labels) console.log(`   ${String(lb.text)}  @ ${JSON.stringify(lb.position)}`)

  console.log('\nA. READABILITY')
  for (const r of checkSceneLayoutAllViewports(spec)) {
    console.log(`   ${r.viewport.padEnd(8)} ok=${r.ok} collisions=${r.violations.filter((v) => v.kind === 'label-collision').length} offscreen=${r.violations.filter((v) => v.kind === 'out-of-bounds').length}`)
  }
  const reach = (spec.cameraDistance ?? 0) / 2
  const outside = objs.filter((o) => [o.position, o.from, o.to].filter(Boolean)
    .some((p) => Math.abs((p as number[])[0]) >= reach || Math.abs((p as number[])[1]) >= reach))
  console.log(`   objects outside the frame: ${outside.length}`)

  console.log('\nB. ASSESS MODE — no leakage')
  const hidden = withheldValues(spec, 'assess')
  const ex = redactExplainer(deriveExplainer(spec), spec, 'assess')
  const view = stageView(spec, Infinity, 'assess')
  const prose = [ex.title, ex.givens, ex.result?.value,
    ...(ex.panels ?? []).flatMap((p) => [p.body, ...(p.lines ?? [])]),
    ex.insight?.note, ...(ex.insight?.bullets ?? []),
    redactText(view.narration ?? undefined, hidden)].filter(Boolean).join(' ')
  console.log(`   hidden in figure (${view.withheldCount}): ${JSON.stringify(hidden)}`)
  console.log(`   assess prose: ${JSON.stringify(prose)}`)
  const leaked = hidden.filter((v) => [...prose.matchAll(/-?\d+(?:\.\d+)?/g)].some((m) => Math.abs(Number(m[0]) - v) < 5e-3))
  console.log(`   LEAKED: ${JSON.stringify(leaked)}  ${leaked.length === 0 ? 'PASS' : 'FAIL'}`)

  console.log('\nC. NEGATIVE CONTROL — explain mode stays informative')
  const exp = redactExplainer(deriveExplainer(spec), spec, 'explain')
  console.log(`   explain title: ${JSON.stringify(exp.title)}`)
  console.log(`   explain states the result: ${JSON.stringify((exp.panels ?? [])[0]?.body ?? exp.result?.value ?? null)}`)
}
main().catch((e) => { console.error(e); process.exit(1) })
