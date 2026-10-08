/**
 * PRODUCTION VERIFICATION for the Physics visual audit — over the wire.
 *
 * Chromium cannot reach the deployed app from the sandbox (see liveAccount.ts), so
 * the browser render audit (scripts/qa/physicsVisual) cannot be pointed at
 * production. What CAN be proven from here is that production SERVES the figures
 * the audit rendered: for a representative set of the figures that were repaired,
 * ask the real app for a diagram as a real learner would and compare the scene it
 * sends with what `resolveVisual` produces from this checkout, then apply the
 * shipped data rules (`payloadBlockers`, `auditSceneData`, `auditGraph`) to the
 * scene that came over the wire.
 *
 * Disposable account only (register -> drive -> delete via liveAccount.ts).
 *
 *   npx tsx scripts/qa/physicsProductionVisualVerify.ts [--out file.json]
 */
import { writeFileSync } from 'node:fs'
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
import { createSession, openLesson, say, carriesFigure, figureLabel, type TurnPayload } from './liveSession'
import { resolveVisual } from '../../src/lib/teaching/visual/resolveVisual'
import { auditGraph, auditSceneData, payloadBlockers } from '../../src/lib/teaching/visual/figureAudit'
import type { SceneSpec } from '../../src/lib/teaching/sceneSpec'

const CONCEPTS = [
  'phys.meas.vector-addition', 'phys.mech.kinematics-1d', 'phys.em.electric-dipole', 'phys.mech.torque',
  'phys.mech.newtons-second-law', 'phys.wave.pendulum', 'phys.mod.bohr-model', 'phys.mech.variation-of-g',
  'phys.em.moving-coil-galvanometer', 'phys.mech.orbital-mechanics',
]

function sceneOf(p: unknown): SceneSpec | null {
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

interface Row {
  conceptId: string; figureOnWire: boolean; label: string | null
  kind: 'scene' | 'card' | 'none'; sameAsAudited: boolean | null; blockers: string[]; dataFails: string[]; note?: string
}

async function main() {
  const out = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null
  const acct = await createQaAccount('physvis')
  const rows: Row[] = []
  try {
    const curr = await (await fetch(`${BASE}/api/curriculum?subject=physics`, { headers: { cookie: acct.cookie } })).json() as
      { lessons?: { unitTitle: string; lessonTitle: string; order: number; topicSlug: string }[] }
    const lessons = curr.lessons ?? []
    for (const id of CONCEPTS) {
      const l = lessons.find((x) => x.topicSlug === id)
      if (!l) { rows.push({ conceptId: id, figureOnWire: false, label: null, kind: 'none', sameAsAudited: null, blockers: [], dataFails: [], note: 'lesson not in production curriculum' }); continue }
      const sessionId = await createSession(acct.cookie, 'physics')
      await openLesson(acct.cookie, sessionId, { lessonTitle: l.lessonTitle, lessonOrder: l.order, topicSlug: id, unitTitle: l.unitTitle, totalLessons: lessons.length })
      const turn: TurnPayload = await say(acct.cookie, sessionId, 'Show me a diagram')
      const wire = sceneOf(turn)
      const local = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'physics' } as never)
      const localScene = local.payload?.renderer === 'scene' ? local.payload.sceneSpec : null
      const row: Row = {
        conceptId: id, figureOnWire: carriesFigure(turn), label: figureLabel(turn),
        kind: wire ? 'scene' : carriesFigure(turn) ? 'card' : 'none',
        sameAsAudited: wire && localScene ? JSON.stringify(wire.steps) === JSON.stringify(localScene.steps) : null,
        blockers: [], dataFails: [],
      }
      if (wire) {
        row.blockers = payloadBlockers({ renderer: 'scene', sceneSpec: wire } as never).map((b) => String(b))
        row.dataFails = [...auditSceneData(wire), ...auditGraph(wire).findings].filter((f) => f.severity === 'FAIL').map((f) => `${f.id} ${f.message}`)
      }
      rows.push(row)
      console.log(`${id.padEnd(36)} wire=${row.kind.padEnd(5)} same-as-audited=${String(row.sameAsAudited).padEnd(5)} blockers=${row.blockers.length} dataFails=${row.dataFails.length}  ${row.label ?? ''}`)
    }
  } finally {
    const r = await deleteQaAccount(acct)
    console.log(`disposable account deleted=${r.deleted}`)
  }
  if (out) writeFileSync(out, JSON.stringify({ base: BASE, at: new Date().toISOString(), rows }, null, 1))
}
main().catch((e) => { console.error(e); process.exit(1) })
