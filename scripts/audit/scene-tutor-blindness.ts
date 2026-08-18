/** What is the tutor actually told about each scene? */
import { ACTIVATED_SCENE_KINDS, buildCanonicalScene } from '../../src/lib/teaching/visual/conceptSceneParams'
import { describeVisualPayload } from '../../src/lib/teaching/visual/visualSemantics'

const rows: { kind: string; readable: string[]; geometry: string[] }[] = []
for (const kind of ACTIVATED_SCENE_KINDS) {
  const spec = buildCanonicalScene(kind)
  if (!spec) continue
  const s = describeVisualPayload({ renderer: 'scene', sceneSpec: spec } as never)
  rows.push({ kind, readable: s.readable, geometry: s.geometry })
}
const blind = rows.filter((r) => r.readable.length === 0)
console.log(`SCENES WHERE THE TUTOR CAN NAME NOTHING ON SCREEN: ${blind.length} of ${rows.length}\n`)
for (const r of blind) console.log(`  ${r.kind.padEnd(26)} tutor sees only: ${r.geometry.join(', ') || '(nothing)'}`)
console.log('\nSCENES WITH READABLE TEXT (for contrast):')
for (const r of rows.filter((x) => x.readable.length > 0).slice(0, 6)) {
  console.log(`  ${r.kind.padEnd(26)} ${r.readable.slice(0, 4).join(' | ')}`)
}
