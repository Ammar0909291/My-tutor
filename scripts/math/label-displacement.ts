/**
 * Mathematics visual campaign — label displacement report (2026-10-12).
 *
 * Runs the production label solver (`placeSceneLabels`) on every figure a batch module exports and lists the labels
 * it had to push away from where the figure puts them. A label that moves a long way usually means a line, dot or
 * neighbouring label sits too close to it: in a table or ruler that makes an entry read as belonging to the wrong
 * cell. Two hosts are checked: a 570 x 370 card (what the Chromium audit renders at 1026 px) and the 390 px phone host.
 * Read-only: no network, no DB, no browser.
 *
 *   npx tsx scripts/math/label-displacement.ts mathCoreScenesB30        # report labels moved more than 14 px
 *   npx tsx scripts/math/label-displacement.ts mathCoreScenesB30 30     # a different threshold
 *   npx tsx scripts/math/label-displacement.ts all 9999                 # only labels the solver could not place at all
 *
 * Campaign rule: NOTHING may be unresolved on either host (that would be a label with no safe place at all). A move over
 * the threshold on the card host is a REVIEW item, not a failure: long captions legitimately travel to free space, but a
 * short entry in a table, ruler or Cayley table that moves is read as belonging to the wrong cell — fix the spacing or
 * move the nearby line/dot (batch 30 did exactly that for its tables). Measured 2026-10-12 over batches 1-30: 0
 * unresolved anywhere; batches 1-29 still list many long captions as review items (candidates for the Mathematics
 * render audit queued in docs/history/mathematics-visual-campaign.md). Phone-host moves are information only.
 */
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { placeSceneLabels, VIEWPORTS, type Viewport } from '@/lib/teaching/visual/layout'

const CARD: Viewport = { name: 'desktop', browserWidth: 1280, hostWidth: 570, hostHeight: 370 }
const [, , target = 'all', thrArg = '14'] = process.argv
const threshold = Number(thrArg)
const dir = join(process.cwd(), 'src/lib/teaching/sceneGenerators')
const modules = target === 'all' ? readdirSync(dir).filter((f) => /^mathCoreScenes.*\.ts$/.test(f)).map((f) => f.replace(/\.ts$/, '')) : [target]

async function main() {
  let unresolved = 0, review = 0
  for (const mod of modules) {
    const M = (await import(`@/lib/teaching/sceneGenerators/${mod}`)) as Record<string, unknown>
    for (const [name, fn] of Object.entries(M)) {
      if (!/^build/.test(name) || typeof fn !== 'function') continue
      const scene = (fn as () => Parameters<typeof placeSceneLabels>[0])()
      const parts: string[] = []
      for (const vp of [CARD, VIEWPORTS[2]]) {
        const r = placeSceneLabels(scene, vp)
        const moved = r.labels.filter((l) => l.movedPx > threshold || !l.ok)
        unresolved += r.unresolved
        if (vp === CARD && moved.length > 0) review++
        if (moved.length || r.unresolved) parts.push(`${vp === CARD ? 'card' : 'phone'}: ${moved.length} moved > ${threshold}px, ${r.unresolved} unresolved [${moved.slice(0, 8).map((l) => `${l.text}:${Math.round(l.movedPx)}`).join(' ')}]`)
      }
      if (parts.length) console.log(`${mod} ${name.replace(/^build|Scene$/g, '')} | ${parts.join(' | ')}`)
    }
  }
  console.log(`${unresolved === 0 ? 'OK' : 'FAIL'}: ${unresolved} unresolved labels; ${review} figures have card-host labels moved more than ${threshold}px (review items)`)
  if (unresolved > 0) process.exitCode = 1
}
void main()
