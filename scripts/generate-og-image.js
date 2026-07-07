const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

// Generates public/og-image.png (1200x630, the standard Open Graph / Twitter
// card size) so shared links render a branded preview instead of a blank
// card. Reuses the approved EagleMascot 'hero' SVG (src/components/ui/candy/
// Mascot.tsx) and the candy purple/pink gradient — same technique as
// generate-icons.js, no new visual design.
const MASCOT_HERO_SVG = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(100,98)">
    <ellipse cx="0" cy="72" rx="46" ry="8" fill="#000000" opacity="0.12" />
    <path d="M -72 -6 Q -88 14 -72 36 Q -58 33 -48 16 Q -56 1 -72 -6 Z" fill="#6B4A2B" />
    <path d="M -70 0 Q -80 16 -72 30 M -62 -2 Q -70 16 -64 31 M -56 3 Q -62 18 -58 30" stroke="#523619" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M 72 -6 Q 88 14 72 36 Q 58 33 48 16 Q 56 1 72 -6 Z" fill="#6B4A2B" />
    <path d="M 70 0 Q 80 16 72 30 M 62 -2 Q 70 16 64 31 M 56 3 Q 62 18 58 30" stroke="#523619" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M 0 14 Q -38 12 -36 46 Q -34 72 0 72 Q 34 72 36 46 Q 38 12 0 14 Z" fill="#7A5230" />
    <path d="M 0 26 Q -22 26 -22 48 Q -22 67 0 67 Q 22 67 22 48 Q 22 26 0 26 Z" fill="#C9A876" />
    <path d="M -10 64 Q -14 73 -17 72 Q -15 67 -12 63 Z" fill="#F5A623" />
    <path d="M -5 66 Q -6 75 -9 75 Q -8 69 -6 64 Z" fill="#F5A623" />
    <path d="M 10 64 Q 14 73 17 72 Q 15 67 12 63 Z" fill="#F5A623" />
    <path d="M 5 66 Q 6 75 9 75 Q 8 69 6 64 Z" fill="#F5A623" />
    <circle cx="0" cy="-17" r="38" fill="#FFFFFF" />
    <path d="M -38 -17 Q -38 -54 0 -55 Q 38 -54 38 -17 Q 29 -34 0 -35 Q -29 -34 -38 -17 Z" fill="#F0F0F0" />
    <path d="M -27 -27 Q -37 -37 -33 -47 Q -24 -43 -20 -33 Z" fill="#FFFFFF" />
    <path d="M 27 -27 Q 37 -37 33 -47 Q 24 -43 20 -33 Z" fill="#FFFFFF" />
    <ellipse cx="-15" cy="-22" rx="13" ry="13.5" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" />
    <ellipse cx="15" cy="-22" rx="13" ry="13.5" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" />
    <circle cx="-13" cy="-21" r="7.5" fill="#3C2A1A" />
    <circle cx="17" cy="-21" r="7.5" fill="#3C2A1A" />
    <circle cx="-10.5" cy="-23.5" r="2.5" fill="#FFFFFF" />
    <circle cx="19.5" cy="-23.5" r="2.5" fill="#FFFFFF" />
    <path d="M -26 -31 Q -15 -37 -4 -32" stroke="#D4A017" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M 4 -32 Q 15 -37 26 -31" stroke="#D4A017" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M -8 -14 Q 0 -16 8 -14 L 5 0 Q 0 7 -5 0 Z" fill="#F5A623" />
    <path d="M -8 -14 Q 0 -16 8 -14 L 6.5 -7 Q 0 -5 -6.5 -7 Z" fill="#FFB84D" />
    <path d="M -5 0 Q 0 7 5 0 Q 0 3 -5 0 Z" fill="#D4881A" />
  </g>
</svg>
`

const WIDTH = 1200
const HEIGHT = 630

const html = `<!doctype html><html><head><style>
  html,body{margin:0;padding:0;}
  .card{
    width:${WIDTH}px;height:${HEIGHT}px;display:flex;align-items:center;
    background:linear-gradient(135deg,#8B5CF6 0%,#FF5FA2 100%);
    font-family:Arial,sans-serif;overflow:hidden;position:relative;
  }
  .text{flex:1;padding:0 0 0 90px;color:#fff;}
  .title{font-size:84px;font-weight:800;margin:0;letter-spacing:-1px;}
  .subtitle{font-size:32px;font-weight:600;margin:18px 0 0;opacity:0.92;max-width:560px;line-height:1.3;}
  .mark{width:420px;height:420px;flex-shrink:0;margin-right:60px;filter:drop-shadow(0 18px 40px rgba(0,0,0,0.18));}
</style></head><body>
  <div class="card">
    <div class="text">
      <p class="title">My Tutor</p>
      <p class="subtitle">Your personal AI tutor for programming, math, science &amp; languages</p>
    </div>
    <div class="mark">${MASCOT_HERO_SVG}</div>
  </div>
</body></html>`

async function main() {
  const pinned = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  const browser = await chromium.launch(fs.existsSync(pinned) ? { executablePath: pinned } : {})
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  await page.setContent(html)
  const outPath = path.join(__dirname, '../public/og-image.png')
  await page.locator('.card').screenshot({ path: outPath })
  await browser.close()
  console.log(`OG image generated: ${outPath}`)
}

main()
