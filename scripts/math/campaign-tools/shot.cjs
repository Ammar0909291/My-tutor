/**
 * Mathematics visual campaign — render figures in Chromium (2026-10-12).
 *
 * Needs the dev server:  nohup npx next dev -p 3000 > /tmp/next-dev.log 2>&1 &   (first render of a figure compiles it; allow ~30 s)
 * Renders the figure of each concept through the real /dev/physics-audit page (the same card the learner sees) and saves one PNG per
 * concept per width. The page shows the LAST stage, so what you see is the finished, cumulative figure.
 *
 *   node scripts/math/campaign-tools/shot.cjs "math.linalg.rank,math.linalg.dimension" [1026] [outDir]
 *
 * width 1026 = desktop card, 390 = phone. outDir defaults to /tmp/math-visual-shots. Env: BASE_URL (default http://localhost:3000),
 * CHROMIUM (default: the newest chromium-NNNN folder under /opt/pw-browsers). Never run `playwright install`.
 */
const fs = require('fs'), path = require('path')
const { chromium } = require(path.join(process.cwd(), 'node_modules/playwright'))
const ids = (process.argv[2] || '').split(',').filter(Boolean)
const widths = (process.argv[3] || '1026').split(',').map(Number)
const out = process.argv[4] || '/tmp/math-visual-shots'
const base = process.env.BASE_URL || 'http://localhost:3000'
const findChromium = () => { const root = '/opt/pw-browsers'; if (!fs.existsSync(root)) return undefined; const d = fs.readdirSync(root).filter((n) => /^chromium-\d+$/.test(n)).sort().pop(); return d ? path.join(root, d, 'chrome-linux/chrome') : undefined }
if (!ids.length) { console.error('usage: shot.cjs "<conceptId,conceptId,...>" [widths] [outDir]'); process.exit(2) }
fs.mkdirSync(out, { recursive: true })
;(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || findChromium(), args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--use-gl=angle'] })
  for (const id of ids) for (const fw of widths) {
    const vw = fw < 500 ? 390 : 1280, vh = fw < 500 ? 844 : 800
    const p = await b.newPage({ viewport: { width: vw, height: vh } })
    await p.goto(`${base}/dev/physics-audit?concept=${id}&fw=${fw}`, { timeout: 90000 })
    await p.waitForSelector('[data-audit-frame]', { timeout: 60000 })
    await p.waitForSelector('[data-scene-box] canvas', { timeout: 60000 }).catch(() => {})
    await p.waitForTimeout(6000)
    const el = await p.$('[data-audit-frame]')
    await el.screenshot({ path: path.join(out, `${id.replace(/\./g, '_')}_${fw}.png`) })
    await p.close(); console.log('shot', id, fw)
  }
  await b.close()
})()
