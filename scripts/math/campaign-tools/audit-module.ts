/**
 * Mathematics visual campaign — admission audit of one batch module (2026-10-12).
 *
 * Runs the same gates the tutor uses before it will show a figure, on every `build*Scene` a module exports:
 * the scene validator, the figure-audit blockers (SM-01 arithmetic labels, label budget, ...), the largest |coordinate|
 * (must be <= 5) and the number of objects per step (must be <= 50). Read-only; no browser, no DB.
 *
 *   npx tsx scripts/math/campaign-tools/audit-module.ts mathCoreScenesB31
 *
 * Healthy output per figure:  build…Scene {"valid":true,"errors":[]} [] max|coord| 4.2 objs/step 17,8,2
 * Anything in the second brackets is a blocker (a rejected label shows its rule, e.g. SM-01 "…": values differ).
 */
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'

async function main() {
  const mod = process.argv[2]
  if (!mod) { console.error('usage: audit-module.ts <moduleName, e.g. mathCoreScenesB31>'); process.exit(2) }
  const M = (await import(`@/lib/teaching/sceneGenerators/${mod}`)) as Record<string, unknown>
  let bad = 0
  for (const [name, fn] of Object.entries(M)) {
    if (!/^build/.test(name) || typeof fn !== 'function') continue
    const scene = (fn as () => { steps: Array<{ objects: Array<{ from?: number[]; to?: number[]; position?: number[]; points?: number[][] }> }> })()
    const v = validateSceneSpec(scene as never) as { valid?: boolean; ok?: boolean }
    const blockers = payloadBlockers({ renderer: 'scene', sceneSpec: scene } as never)
    let max = 0
    for (const st of scene.steps) for (const o of st.objects) for (const c of [o.from, o.to, o.position, ...(o.points ?? [])]) if (c) max = Math.max(max, ...c.map((n) => Math.abs(n)))
    const perStep = scene.steps.map((s) => s.objects.length)
    const ok = (v.valid ?? v.ok) === true && blockers.length === 0 && max <= 5 && perStep.every((n) => n <= 50)
    if (!ok) bad++
    console.log(name, JSON.stringify(v).slice(0, 160), JSON.stringify(blockers), 'max|coord|', max.toFixed(2), 'objs/step', perStep.join(','), ok ? '' : '  <-- FIX')
  }
  console.log(bad === 0 ? 'OK: every figure passes the admission gates' : `FAIL: ${bad} figure(s) need fixing`)
  if (bad > 0) process.exitCode = 1
}
void main()
