/** Does the registry's visual type agree with the scene actually generated? */
import { readFileSync } from 'fs'
import { buildCanonicalScene } from '../../src/lib/teaching/visual/conceptSceneParams'

const SRC = readFileSync('src/lib/teaching/visualRegistry.ts', 'utf8')
const rows = [...SRC.matchAll(/'([a-z_]+\.[a-z0-9.\-]+)':\s*\{\s*primary:\s*'([a-z_0-9]+)'[^}]*?sceneGenerator:\s*'([a-z_0-9]+)'/gi)]
console.log('concept'.padEnd(36), 'registry primary'.padEnd(24), 'scene kind')
let suspicious = 0
for (const m of rows) {
  const [, concept, primary, kind] = m
  const spec = buildCanonicalScene(kind, concept)
  const sceneTitle = spec?.title ?? '(none)'
  // A crude but honest signal: does the registry's primary word appear anywhere
  // in the generated scene's own title/goal? Not proof, but it surfaces pairs
  // worth reading.
  const hay = `${sceneTitle} ${spec?.teachingGoal ?? ''}`.toLowerCase()
  const stem = primary.replace(/^three_/, '').split('_')[0]
  const agrees = hay.includes(stem)
  if (!agrees) { suspicious++; console.log(concept.padEnd(36), primary.padEnd(24), kind, '   <-- ', sceneTitle.slice(0, 46)) }
}
console.log(`\n${rows.length} concepts bind BOTH a registry primary and a scene generator; ${suspicious} where the primary word does not appear in the scene it actually builds.`)
