const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

// Renders the candy EagleMascot 'logo' mark (src/components/ui/candy/Mascot.tsx)
// on a candy-purple rounded square, used for the PWA manifest icons and the
// browser-tab favicon (src/app/icon.png). Replaces the old flat-color
// placeholder PNGs with the actual approved mascot artwork.
const MASCOT_LOGO_SVG = `
<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(50,52)">
    <path d="M -38 -4 Q -46 8 -38 20 Q -30 18 -26 8 Q -30 -1 -38 -4 Z" fill="#6B4A2B" />
    <path d="M 38 -4 Q 46 8 38 20 Q 30 18 26 8 Q 30 -1 38 -4 Z" fill="#6B4A2B" />
    <path d="M 0 6 Q -22 5 -21 26 Q -20 40 0 40 Q 20 40 21 26 Q 22 5 0 6 Z" fill="#7A5230" />
    <circle cx="0" cy="-12" r="22" fill="#FFFFFF" />
    <path d="M -22 -12 Q -22 -32 0 -33 Q 22 -32 22 -12 Q 17 -22 0 -22 Q -17 -22 -22 -12 Z" fill="#F0F0F0" />
    <ellipse cx="-9" cy="-15" rx="7.5" ry="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="0.8" />
    <ellipse cx="9" cy="-15" rx="7.5" ry="8" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="0.8" />
    <circle cx="-8" cy="-14" r="4.3" fill="#3C2A1A" />
    <circle cx="10" cy="-14" r="4.3" fill="#3C2A1A" />
    <circle cx="-6.5" cy="-15.5" r="1.5" fill="#FFFFFF" />
    <circle cx="11.5" cy="-15.5" r="1.5" fill="#FFFFFF" />
    <path d="M -15 -20 Q -9 -24 -2 -21" stroke="#D4A017" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 2 -21 Q 9 -24 15 -20" stroke="#D4A017" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M -5 -9 Q 0 -10 5 -9 L 3 0 Q 0 4 -3 0 Z" fill="#F5A623" />
    <path d="M -3 0 Q 0 4 3 0 Q 0 2 -3 0 Z" fill="#D4881A" />
  </g>
</svg>
`

function pageHtml(size, radiusPct) {
  return `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;}
    .tile{width:${size}px;height:${size}px;background:#8B5CF6;border-radius:${radiusPct}%;display:flex;align-items:center;justify-content:center;overflow:hidden;}
    .mark{width:${Math.round(size * 0.74)}px;height:${Math.round(size * 0.74)}px;}
  </style></head><body>
    <div class="tile"><div class="mark">${MASCOT_LOGO_SVG}</div></div>
  </body></html>`
}

async function renderIcon(browser, size, outPath, radiusPct) {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  await page.setContent(pageHtml(size, radiusPct))
  await page.locator('.tile').screenshot({ path: outPath })
  await page.close()
}

async function main() {
  // Fall back to an explicit chrome-linux build if the default Playwright
  // lookup can't find one (e.g. this sandbox ships chromium without the
  // headless_shell variant Playwright tries first).
  const pinned = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  const browser = await chromium.launch(fs.existsSync(pinned) ? { executablePath: pinned } : {})
  const outDir = path.join(__dirname, '../public/icons')
  fs.mkdirSync(outDir, { recursive: true })
  // PWA manifest icons use "any maskable" — keep corners square so OS masking
  // (circle/squircle) doesn't clip the mark unpredictably.
  await renderIcon(browser, 192, path.join(outDir, 'icon-192.png'), 0)
  await renderIcon(browser, 512, path.join(outDir, 'icon-512.png'), 0)
  // Browser-tab favicon — slight rounding reads better at small sizes.
  await renderIcon(browser, 64, path.join(__dirname, '../src/app/icon.png'), 22)
  await browser.close()
  console.log('Icons generated: icon-192.png, icon-512.png, src/app/icon.png')
}

main()
