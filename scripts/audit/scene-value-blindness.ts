/**
 * ARE THE TEACHING VALUES ON SCREEN, OR ONLY IN THE PAYLOAD?
 *
 * electricCircuit computed 10 Ω / 20 Ω / 1.2 A / 0.6 A, validated them, then
 * drew both resistors as identical dots: a `node` renders as position+radius+
 * colour, and `properties` reach neither the learner nor the tutor (fromScene
 * reads LABELS). This asks the same question of every other generator.
 *
 * A value is VISIBLE when it appears in some label's text. Anything numeric
 * sitting in `properties` and appearing in no label is invisible to both.
 */
import { ACTIVATED_SCENE_KINDS, buildCanonicalScene } from '../../src/lib/teaching/visual/conceptSceneParams'
import type { SceneSpec } from '../../src/lib/teaching/sceneSpec'

/** Numbers a learner would read as a quantity — not ids, flags or coordinates. */
function numericProps(spec: SceneSpec): { objId: string; key: string; value: number }[] {
  const out: { objId: string; key: string; value: number }[] = []
  for (const step of spec.steps ?? []) {
    for (const o of step.objects ?? []) {
      const p = o.properties as Record<string, unknown> | undefined
      if (!p) continue
      for (const [k, v] of Object.entries(p)) {
        if (typeof v === 'number' && Number.isFinite(v)) out.push({ objId: String(o.id ?? o.type), key: k, value: v })
      }
    }
  }
  return out
}

function labelText(spec: SceneSpec): string {
  return (spec.steps ?? [])
    .flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'label').map((o) => String(o.text ?? '')))
    .join(' | ')
}

/** Does this number appear in the label text, at any sane rounding? */
function visible(v: number, text: string): boolean {
  const cands = new Set<string>()
  for (const d of [0, 1, 2, 3]) {
    cands.add(v.toFixed(d))
    cands.add(String(Number(v.toFixed(d))))
  }
  cands.add(String(v))
  for (const c of cands) {
    if (!c || c === 'NaN') continue
    // Word-ish boundary so "2" does not match inside "12".
    if (new RegExp(`(^|[^\\d.])${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^\\d]|$)`).test(text)) return true
  }
  return false
}

const rows: { kind: string; props: number; hidden: number; labels: number; sample: string }[] = []
for (const kind of ACTIVATED_SCENE_KINDS) {
  let spec: SceneSpec | null = null
  try { spec = buildCanonicalScene(kind) } catch (e) { console.error(`  !! ${kind}: ${(e as Error).message}`); continue }
  if (!spec) { console.error(`  -- ${kind}: no canonical scene`); continue }
  const text = labelText(spec)
  const props = numericProps(spec)
  const hidden = props.filter((p) => !visible(p.value, text))
  const labels = (spec.steps ?? []).flatMap((s) => (s.objects ?? []).filter((o) => o.type === 'label')).length
  rows.push({
    kind, props: props.length, hidden: hidden.length, labels,
    sample: hidden.slice(0, 4).map((h) => `${h.objId}.${h.key}=${h.value}`).join(', '),
  })
}

rows.sort((a, b) => b.hidden - a.hidden)
console.log('kind'.padEnd(28), 'labels'.padStart(6), 'numeric'.padStart(8), 'HIDDEN'.padStart(7), '  examples')
for (const r of rows) {
  console.log(r.kind.padEnd(28), String(r.labels).padStart(6), String(r.props).padStart(8), String(r.hidden).padStart(7), '  ' + r.sample)
}
const tot = rows.reduce((a, r) => a + r.props, 0)
const hid = rows.reduce((a, r) => a + r.hidden, 0)
console.log(`\n${rows.length} scenes | ${tot} numeric properties | ${hid} invisible (${((hid / Math.max(tot,1)) * 100).toFixed(0)}%)`)
console.log(`${rows.filter((r) => r.hidden > 0).length} scenes carry at least one invisible value`)
console.log(`${rows.filter((r) => r.labels === 0).length} scenes carry NO labels at all`)
