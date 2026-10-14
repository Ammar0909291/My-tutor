/**
 * MATHEMATICS LABEL-ASSOCIATION REVIEW (card-host label-displacement backlog, batches 1-29).
 *
 * `label-displacement.ts` lists every label the production solver (`placeSceneLabels`, 570 x 370 card host) had to move more than 14 px — 218 figures /
 * 483 labels for batches 1-29. A move is only a problem if it breaks the label's ASSOCIATION with the thing it names. This tool measures that:
 *   - a moved label is ATTACHED when its authored anchor sat within 30 px of some drawn geometry (a dot, line, curve or bar end); otherwise it is a free
 *     caption and where it ends up does not change what it names;
 *   - an attached label KEEPS ITS ASSOCIATION when, after the move, it is still within 75 px (about two text lines) of that same geometry.
 * The rest is a reviewed list: `REVIEWED_FAR` holds the attached labels that moved further than 75 px, each looked at in the real Chromium render
 * (docs/qa/MATHEMATICS_VISUAL_QUALITY_REPORT.md, "Card-host label-displacement review").
 *
 *   npx tsx scripts/math/labelAssociation.ts            # table + the figures whose attached labels moved far
 */
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { placeSceneLabels, type Viewport } from '@/lib/teaching/visual/layout'

export const CARD: Viewport = { name: 'desktop', browserWidth: 1280, hostWidth: 570, hostHeight: 370 }
export const MAX_BATCH = 29
export const ATTACHED_PX = 30
export const FAR_PX = 75

export interface MovedLabel { mod: string; id: string; text: string; moved: number; attached: boolean; d0: number; d1: number; onGeometry: boolean }

export async function analyse(): Promise<{ figures: number; labels: MovedLabel[] }> {
  const dir = join(process.cwd(), 'src/lib/teaching/sceneGenerators')
  const mods = readdirSync(dir).filter((f) => /^mathCoreScenesB\d+\.ts$/.test(f)).map((f) => f.replace(/\.ts$/, '')).filter((m) => Number(m.replace(/\D/g, '')) <= MAX_BATCH)
  const labels: MovedLabel[] = []
  let figures = 0
  for (const mod of mods) {
    const M = (await import(`@/lib/teaching/sceneGenerators/${mod}`)) as Record<string, any>
    for (const [name, fn] of Object.entries(M)) {
      if (!/^build/.test(name) || typeof fn !== 'function') continue
      const scene = fn()
      const r = placeSceneLabels(scene, CARD)
      if (!r.labels.some((l: any) => l.movedPx > 14)) continue
      figures++
      const labelsW = scene.steps.flatMap((s: any) => s.objects).filter((o: any) => o.type === 'label' || (o.text && o.type !== 'label'))
      let scale = 0
      for (const l of r.labels) {
        const w = labelsW.find((o: any) => o.text === l.text)
        if (w && w.position && Math.abs(w.position[0]) > 1) { scale = (l.anchorX - CARD.hostWidth / 2) / w.position[0]; break }
      }
      if (!scale) continue
      const toPx = (p: number[]) => [CARD.hostWidth / 2 + p[0] * scale, CARD.hostHeight / 2 - p[1] * scale]
      const geo: Array<{ pts: number[][] }> = []
      for (const st of scene.steps) for (const o of st.objects) {
        if (o.type === 'label') continue
        const pts: number[][] = []
        if (o.from && o.to) for (let i = 0; i <= 12; i++) pts.push(toPx([o.from[0] + ((o.to[0] - o.from[0]) * i) / 12, o.from[1] + ((o.to[1] - o.from[1]) * i) / 12]))
        else if (o.points?.length) for (const p of o.points) pts.push(toPx(p))
        else if (o.position) pts.push(toPx(o.position))
        if (pts.length) geo.push({ pts })
      }
      const dmin = (g: { pts: number[][] }, x: number, y: number) => Math.min(...g.pts.map((p) => Math.hypot(p[0] - x, p[1] - y)))
      for (const l of r.labels) {
        if (l.movedPx <= 14) continue
        let best: { pts: number[][] } | null = null, bd = Infinity
        for (const g of geo) { const d = dmin(g, l.anchorX, l.anchorY); if (d < bd) { bd = d; best = g } }
        labels.push({ mod, id: scene.id, text: l.text, moved: Math.round(l.movedPx), attached: bd <= ATTACHED_PX, d0: Math.round(bd), d1: best ? Math.round(dmin(best, l.x, l.y)) : Infinity, onGeometry: Boolean(l.onGeometry) })
      }
    }
  }
  return { figures, labels }
}

/** The attached labels that moved further than FAR_PX from what they name, as "<scene id> | <label text>". */
export const farLabels = (labels: MovedLabel[]) => labels.filter((l) => l.attached && l.d1 > FAR_PX).map((l) => `${l.id} | ${l.text}`).sort()

async function main() {
  const { figures, labels } = await analyse()
  const attached = labels.filter((l) => l.attached)
  console.log(`${figures} figures, ${labels.length} moved labels; ${attached.length} attached, ${labels.length - attached.length} free captions; ${labels.filter((l) => l.onGeometry).length} end on geometry`)
  console.log(`attached labels now > ${FAR_PX}px from their object: ${farLabels(labels).length}`)
  for (const f of farLabels(labels)) console.log('  ' + f)
}
if (process.argv[1] && process.argv[1].endsWith('labelAssociation.ts')) void main()
